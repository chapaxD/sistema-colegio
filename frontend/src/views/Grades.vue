<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import api from '../api'
import { useAuthStore } from '../stores/auth'
import { Save, Plus, Minus, Trash2, Loader2, Info, ChevronRight, ChevronLeft, FileText, Printer } from 'lucide-vue-next'
import html2pdf from 'html2pdf.js'

const authStore = useAuthStore()

const courses = ref([])
const subjects = ref([])
const selectedCourse = ref('')
const selectedSubject = ref('')
const selectedTrimester = ref(1)

const students = ref([])
const evaluations = ref([]) // Dinámicas (SER, SABER, HACER)
const dimensionScores = ref([]) // Fijas (AUTO)

const loading = ref(false)
const generatingPDF = ref(false)
const saving = ref(false)
const syncDimensions = ref(false)
const isDirectMode = ref(false)
const message = ref({ text: '', type: '' })

const settings = ref({
  schoolName: 'GUALBERTO VILLARROEL III',
  teacherName: 'AMALIA YARVI',
  directorName: 'LIC. AIDA YARVI FLORES',
  level: 'PRIMARIA',
  year: '2026'
})

onMounted(async () => {
  try {
    const [c, s] = await Promise.all([
      api.get('/academic/courses'),
      api.get('/academic/subjects')
    ])
    courses.value = c.data
    subjects.value = s.data

    const saved = localStorage.getItem('school_settings')
    if (saved) settings.value = JSON.parse(saved)
  } catch (err) {
    console.error('Error loading data')
  }
})

const fetchData = async () => {
  if (!selectedCourse.value || !selectedSubject.value) return
  
  loading.value = true
  try {
    const [studentsRes, evalsRes, dimsRes, gradesRes, schoolRes, assignmentRes] = await Promise.all([
      api.get('/students'),
      api.get(`/grades/evaluations?courseId=${selectedCourse.value}&subjectId=${selectedSubject.value}&period=${selectedTrimester.value}`),
      api.get(`/grades/dimensions?courseId=${selectedCourse.value}&subjectId=${selectedSubject.value}&period=${selectedTrimester.value}`),
      api.get(`/grades/final?courseId=${selectedCourse.value}&subjectId=${selectedSubject.value}&period=${selectedTrimester.value}`),
      api.get('/schools/my'),
      api.get(`/academic/assignments/lookup?courseId=${selectedCourse.value}&subjectId=${selectedSubject.value}`)
    ])
    
    evaluations.value = evalsRes.data
    dimensionScores.value = dimsRes.data
    const finalGrades = gradesRes.data

    // Actualizar configuración institucional dinámicamente para los reportes
    if (schoolRes.data) {
      settings.value.schoolName = schoolRes.data.name
      settings.value.directorName = schoolRes.data.directorName || 'Lic. Magda Zeballos'
      settings.value.level = schoolRes.data.educationalLevel || 'Primaria Comunitaria Vocacional'
    }

    // Determinar nombre del docente (Asignación > Perfil propio > Fallback)
    if (assignmentRes.data?.teacher) {
      const t = assignmentRes.data.teacher
      settings.value.teacherName = `${t.firstName} ${t.lastName}`
    } else if (authStore.user?.role === 'TEACHER') {
      try {
        const profile = await api.get('/academic/teachers/me')
        if (profile.data) {
          settings.value.teacherName = `${profile.data.firstName} ${profile.data.lastName}`
        }
      } catch (err) {}
    } else {
      settings.value.teacherName = 'DOCENTE DE ÁREA'
    }
    
    // Mapear estudiantes con sus notas
    students.value = studentsRes.data.filter(s => 
      s.enrollments.some(e => e.courseId === parseInt(selectedCourse.value))
    ).map(s => {
      // Priorizar inscripción de la gestión actual o la más reciente
      const enrollment = s.enrollments
        .filter(e => e.courseId === parseInt(selectedCourse.value))
        .sort((a, b) => (b.academicYear?.year || 0) - (a.academicYear?.year || 0))[0];

      if (!enrollment) return null;

      const dims = dimensionScores.value.find(d => d.enrollmentId === enrollment.id) || { ser: 0, autoSer: 0 }
      const gradeObj = finalGrades.find(g => g.enrollmentId === enrollment.id)
      
      return {
        id: s.id,
        enrollmentId: enrollment.id,
        firstName: s.firstName,
        lastName: s.lastName,
        fullName: `${s.lastName} ${s.firstName}`,
        ser: dims.ser,
        autoSer: dims.autoSer,
        finalScore: gradeObj ? gradeObj.score : 0,
        evaluations: evaluations.value.map(ev => {
          const scoreObj = ev.scores.find(sc => sc.enrollmentId === enrollment.id)
          return {
            evaluationId: ev.id,
            dimension: ev.dimension,
            score: scoreObj ? scoreObj.score : 0
          }
        })
      }
    }).sort((a, b) => {
      const lastSort = (a.lastName || '').localeCompare(b.lastName || '')
      if (lastSort !== 0) return lastSort
      return (a.firstName || '').localeCompare(b.firstName || '')
    })
  } catch (err) {
    console.error('Error fetching data')
  } finally {
    loading.value = false
  }
}

watch([selectedCourse, selectedSubject, selectedTrimester], fetchData)

const addEvaluation = async (dimension) => {
  const title = prompt(`Nombre de la nueva evaluación para ${dimension}:`)
  if (!title) return

  try {
    await api.post('/grades/evaluations', {
      title,
      dimension,
      courseId: parseInt(selectedCourse.value),
      subjectId: parseInt(selectedSubject.value),
      period: selectedTrimester.value
    })
    fetchData()
  } catch (err) {
    alert('Error al crear evaluación')
  }
}

const removeEvaluation = async (dimension) => {
  const evals = evaluations.value.filter(e => e.dimension === dimension)
  if (evals.length === 0) return
  
  const lastEval = evals[evals.length - 1]
  if (confirm(`¿Estás seguro de eliminar la evaluación "${lastEval.title}" y todas sus notas?`)) {
    try {
      await api.delete(`/grades/evaluations/${lastEval.id}`)
      fetchData()
    } catch (err) {
      alert('Error al eliminar la evaluación')
    }
  }
}

const saveAll = async () => {
  saving.value = true
  try {
    for (const s of students.value) {
      if (!isDirectMode.value) {
        // 1. Guardar Dimensiones Fijas (AUTO)
        await api.post('/grades/dimensions', {
          enrollmentId: s.enrollmentId,
          subjectId: parseInt(selectedSubject.value),
          period: selectedTrimester.value,
          ser: s.ser,
          autoSer: s.autoSer,
          syncAll: syncDimensions.value
        })
        
        // 2. Guardar Notas de Evaluaciones (SER, SABER, HACER)
        for (const ev of s.evaluations) {
          await api.post('/grades/evaluations/score', {
            evaluationId: ev.evaluationId,
            enrollmentId: s.enrollmentId,
            score: ev.score,
            syncAll: syncDimensions.value && ev.dimension === 'SER'
          })
        }
      }

      // 3. Guardar Calificación Final Trimestral
      await api.post('/grades/register', {
        enrollmentId: s.enrollmentId,
        subjectId: parseInt(selectedSubject.value),
        period: selectedTrimester.value,
        score: getFinalScore(s)
      })
    }
    message.value = { text: 'Registro guardado exitosamente', type: 'success' }
    setTimeout(() => message.value = { text: '', type: '' }, 3000)
    fetchData() 
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Error al guardar notas'
    message.value = { text: errorMsg, type: 'error' }
    setTimeout(() => message.value = { text: '', type: '' }, 5000)
  } finally {
    saving.value = false
  }
}

// Cálculos dinámicos con escalado oficial
const getSerAvg = (student) => {
  const scores = student.evaluations.filter(e => e.dimension === 'SER')
  if (scores.length === 0) return Math.min(student.ser || 0, 10)
  const avg = scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length
  return Math.round(avg)
}

const getSaberAvg = (student) => {
  const scores = student.evaluations.filter(e => e.dimension === 'SABER')
  if (scores.length === 0) return 0
  const avg = scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length
  return Math.round(avg)
}

const getHacerAvg = (student) => {
  const scores = student.evaluations.filter(e => e.dimension === 'HACER')
  if (scores.length === 0) return 0
  const avg = scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length
  return Math.round(avg)
}

const getAutoAvg = (student) => {
  return Math.min(student.autoSer || 0, 5)
}

const getFinalScore = (student) => {
  if (isDirectMode.value) return student.finalScore
  return getSerAvg(student) + getSaberAvg(student) + getHacerAvg(student) + getAutoAvg(student)
}

const clampValue = (obj, field, max) => {
  if (obj[field] > max) obj[field] = max
  if (obj[field] < 0) obj[field] = 0
}

const serEvals = computed(() => evaluations.value.filter(e => e.dimension === 'SER'))
const saberEvals = computed(() => evaluations.value.filter(e => e.dimension === 'SABER'))
const hacerEvals = computed(() => evaluations.value.filter(e => e.dimension === 'HACER'))

const generatePDF = () => {
  if (!selectedCourse.value || !selectedSubject.value) return

  const subjectName = subjects.value.find(s => s.id === parseInt(selectedSubject.value))?.name || ''
  const course = courses.value.find(c => c.id === parseInt(selectedCourse.value))
  const courseName = course ? `${course.level} "${course.parallel}"` : ''

  const serCols = serEvals.value.map(ev =>
    `<th style="border:1px solid #000;padding:3px 2px;width:24px;background:#dbeafe;font-size:6.5pt;">${ev.title.substring(0, 4)}</th>`
  ).join('')
  const saberCols = saberEvals.value.map(ev =>
    `<th style="border:1px solid #000;padding:3px 2px;width:24px;background:#dbeafe;font-size:6.5pt;">${ev.title.substring(0, 4)}</th>`
  ).join('')
  const hacerCols = hacerEvals.value.map(ev =>
    `<th style="border:1px solid #000;padding:3px 2px;width:24px;background:#dcfce7;font-size:6.5pt;">${ev.title.substring(0, 4)}</th>`
  ).join('')

  const bodyRows = students.value.map((s, idx) => {
    const serCells = serEvals.value.map(ev => {
      const score = s.evaluations.find(e => e.evaluationId === ev.id)?.score ?? 0
      return `<td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${score}</td>`
    }).join('')
    const saberCells = saberEvals.value.map(ev => {
      const score = s.evaluations.find(e => e.evaluationId === ev.id)?.score ?? 0
      return `<td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${score}</td>`
    }).join('')
    const hacerCells = hacerEvals.value.map(ev => {
      const score = s.evaluations.find(e => e.evaluationId === ev.id)?.score ?? 0
      return `<td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${score}</td>`
    }).join('')
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f9fafb'
    const final = getFinalScore(s)
    const finalColor = final >= 51 ? '#166534' : '#991b1b'
    return `<tr style="background:${rowBg};">
      <td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${idx + 1}</td>
      <td style="border:1px solid #ccc;padding:3px;font-weight:700;white-space:nowrap;font-size:7.5pt;">${s.fullName}</td>
      ${serEvals.value.length === 0 ? `<td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;background:#eff6ff;">${s.ser}</td>` : serCells}
      <td style="border:1px solid #ccc;text-align:center;padding:2px;font-weight:bold;font-size:7.5pt;background:#dbeafe;">${getSerAvg(s)}</td>
      ${saberCells}
      <td style="border:1px solid #ccc;text-align:center;padding:2px;font-weight:bold;font-size:7.5pt;background:#bfdbfe;">${getSaberAvg(s)}</td>
      ${hacerCells}
      <td style="border:1px solid #ccc;text-align:center;padding:2px;font-weight:bold;font-size:7.5pt;background:#bbf7d0;">${getHacerAvg(s)}</td>
      <td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;background:#fef9c3;">${s.autoSer}</td>
      <td style="border:1px solid #555;text-align:center;padding:3px;font-weight:900;font-size:9pt;color:${finalColor};background:#f0fdf4;">${final}</td>
    </tr>`
  }).join('')

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro de Evaluación - ${subjectName}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; font-size: 8pt; color: #000; background: #fff; }
    .doc { padding: 8mm 10mm; }
    h1 { text-align:center; font-size:12pt; text-transform:uppercase; margin-bottom:3px; }
    .subtitle { text-align:center; font-size:9pt; font-weight:bold; margin-bottom:8px; color:#444; }
    .meta { display:grid; grid-template-columns:repeat(3,1fr); gap:2px 8px; font-size:7.5pt; margin-bottom:8px; padding-bottom:6px; border-bottom:1.5px solid #000; }
    .meta strong { font-weight:700; }
    table { width:100%; border-collapse:collapse; }
    th { background:#f2f2f2; font-weight:bold; text-align:center; padding:4px 2px; border:1px solid #000; font-size:7pt; }
    .dim-ser  { background:#dbeafe; color:#1e3a8a; }
    .dim-saber { background:#bbf7d0; color:#14532d; }  
    .dim-hacer { background:#dcfce7; color:#166534; }
    .dim-auto { background:#fef08a; color:#713f12; }
    .dim-final { background:#e5e7eb; color:#111; }
    .sigs { margin-top:14mm; display:flex; justify-content:space-around; }
    .sig { text-align:center; width:55mm; }
    .sig-line { border-top:1px solid #000; margin-bottom:3px; }
    .sig p { font-size:7.5pt; }
    @page { size: letter landscape; margin: 8mm; }
    @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  </style>
</head>
<body>
<div class="doc">
  <h1>Registro de Evaluación Centralizador</h1>
  <p class="subtitle">${selectedTrimester.value}º TRIMESTRE &mdash; GESTIÓN ${settings.value.year}</p>
  <div class="meta">
    <div><strong>UNIDAD EDUCATIVA:</strong> ${settings.value.schoolName}</div>
    <div><strong>NIVEL:</strong> ${settings.value.level}</div>
    <div><strong>GRADO/CURSO:</strong> ${courseName}</div>
    <div><strong>ÁREA/MATERIA:</strong> ${subjectName}</div>
    <div><strong>DOCENTE:</strong> ${settings.value.teacherName}</div>
    <div><strong>DIRECTOR(A):</strong> ${settings.value.directorName}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th rowspan="2" style="border:1px solid #000;width:18px;">Nº</th>
        <th rowspan="2" style="border:1px solid #000;text-align:left;width:150px;">APELLIDOS Y NOMBRES</th>
        <th colspan="${serEvals.value.length + 1}" class="dim-ser" style="border:1px solid #000;">SER (10)</th>
        <th colspan="${saberEvals.value.length + 1}" class="dim-saber" style="border:1px solid #000;">SABER (45)</th>
        <th colspan="${hacerEvals.value.length + 1}" class="dim-hacer" style="border:1px solid #000;">HACER (40)</th>
        <th class="dim-auto" style="border:1px solid #000;">AUTOE. (5)</th>
        <th rowspan="2" class="dim-final" style="border:1px solid #000;width:30px;">FINAL</th>
      </tr>
      <tr>
        ${serEvals.value.length === 0 ? `<th style="border:1px solid #000;width:24px;background:#eff6ff;font-size:6.5pt;">Pts</th>` : serCols}
        <th style="border:1px solid #000;width:24px;background:#dbeafe;font-size:6.5pt;">✓</th>
        ${saberCols}
        <th style="border:1px solid #000;width:24px;background:#bbf7d0;font-size:6.5pt;">✓</th>
        ${hacerCols}
        <th style="border:1px solid #000;width:24px;background:#bbf7d0;font-size:6.5pt;">✓</th>
        <th style="border:1px solid #000;width:24px;background:#fef9c3;font-size:6.5pt;">Pts</th>
      </tr>
    </thead>
    <tbody>${bodyRows}</tbody>
  </table>

  <div class="sigs">
    <div class="sig">
      <div class="sig-line"></div>
      <p><strong>${settings.value.teacherName}</strong></p>
      <p>Docente de Área</p>
    </div>
    <div class="sig">
      <div class="sig-line"></div>
      <p><strong>${settings.value.directorName}</strong></p>
      <p>Director(a)</p>
    </div>
  </div>
</div>
<script>window.onload = () => window.print()<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=1000,height=700')
  win.document.write(html)
  win.document.close()
}
</script>

<template>
  <div class="detailed-grades">
    <div class="page-header">
      <h1 class="page-title">Registro de Evaluación Centralizador</h1>
      <div class="period-selector">
        <button v-for="p in [1,2,3]" :key="p" @click="selectedTrimester = p" :class="{ active: selectedTrimester === p }">
          {{ p }}º Trimestre
        </button>
      </div>
    </div>

    <div class="filters-bar glass-card">
      <div class="filter-group">
        <label>Curso</label>
        <select v-model="selectedCourse" class="input-field">
          <option value="">Seleccionar curso</option>
          <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} - {{ c.parallel }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Materia</label>
        <select v-model="selectedSubject" class="input-field">
          <option value="">Seleccionar materia</option>
          <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>
      <div class="filter-group" style="width: auto; flex-direction: row; align-items: center; gap: 0.5rem; padding-bottom: 0.5rem;">
        <input type="checkbox" v-model="syncDimensions" id="sync-dim" />
        <label for="sync-dim" style="font-size: 0.8rem; cursor: pointer; color: var(--primary);">
          Sincronizar SER/AUTO
        </label>
      </div>
      <div class="filter-group" style="width: auto; flex-direction: row; align-items: center; gap: 0.5rem; padding-bottom: 0.5rem;">
        <input type="checkbox" v-model="isDirectMode" id="direct-mode" />
        <label for="direct-mode" style="font-size: 0.8rem; cursor: pointer; color: var(--primary); font-weight: bold;">
          MODO DIRECTO (Solo Nota Final)
        </label>
      </div>
      <div class="action-buttons">
        <button @click="saveAll" class="btn btn-primary" :disabled="saving || students.length === 0">
          <Loader2 v-if="saving" class="animate-spin" :size="18" />
          <Save v-else :size="18" />
          Guardar Todo
        </button>
        <button @click="generatePDF" class="btn btn-outline" :disabled="generatingPDF || students.length === 0">
          <Printer :size="18" />
          Imprimir
        </button>
        <button @click="generatePDF" class="btn btn-outline" :disabled="generatingPDF || students.length === 0">
          <FileText :size="18" />
          PDF
        </button>
      </div>
    </div>

    <div class="table-container glass-card">
      <div v-if="loading" class="loading-state">
        <Loader2 class="animate-spin" :size="40" />
        <p>Cargando centralizador...</p>
      </div>

      <div v-if="selectedCourse && selectedSubject && selectedTrimester" class="table-container glass-card">
        <table class="ley-070-table">
          <thead>
            <tr>
              <th rowspan="2" class="sticky-col">Nº Apellidos y Nombres</th>
              <template v-if="!isDirectMode">
                <th :colspan="serEvals.length === 0 ? 2 : serEvals.length + 1" class="dim-header ser">
                  SER (10)
                  <button @click="addEvaluation('SER')" class="add-col-btn"><Plus :size="14" /></button>
                  <button @click="removeEvaluation('SER')" class="add-col-btn minus" v-if="serEvals.length > 0"><Minus :size="14" /></button>
                </th>
                <th :colspan="saberEvals.length === 0 ? 2 : saberEvals.length + 1" class="dim-header saber">
                  SABER (45) 
                  <button @click="addEvaluation('SABER')" class="add-col-btn"><Plus :size="14" /></button>
                  <button @click="removeEvaluation('SABER')" class="add-col-btn minus" v-if="saberEvals.length > 0"><Minus :size="14" /></button>
                </th>
                <th :colspan="hacerEvals.length === 0 ? 2 : hacerEvals.length + 1" class="dim-header hacer">
                  HACER (40)
                  <button @click="addEvaluation('HACER')" class="add-col-btn"><Plus :size="14" /></button>
                  <button @click="removeEvaluation('HACER')" class="add-col-btn minus" v-if="hacerEvals.length > 0"><Minus :size="14" /></button>
                </th>
                <th class="dim-header auto">AUTOEVALUACIÓN (5)</th>
              </template>
              <th :rowspan="isDirectMode ? 2 : 1" class="final-header" :style="{ width: isDirectMode ? '150px' : 'auto' }">
                CALIFICACIÓN TRIMESTRAL
              </th>
            </tr>
            <tr v-if="!isDirectMode">
              <th v-if="serEvals.length === 0" class="sub-col">Puntaje</th>
              <th v-for="ev in serEvals" :key="ev.id" class="sub-col rotated">
                <div class="vertical-text">{{ ev.title }}</div>
              </th>
              <th class="sub-col avg">Prom.</th>

              <th v-if="saberEvals.length === 0" class="sub-col">Puntaje</th>
              <th v-for="ev in saberEvals" :key="ev.id" class="sub-col rotated">
                <div class="vertical-text">{{ ev.title }}</div>
              </th>
              <th class="sub-col avg">Prom.</th>

              <th v-if="hacerEvals.length === 0" class="sub-col">Puntaje</th>
              <th v-for="ev in hacerEvals" :key="ev.id" class="sub-col rotated">
                <div class="vertical-text">{{ ev.title }}</div>
              </th>
              <th class="sub-col avg">Prom.</th>
              <th class="sub-col">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(s, index) in students" :key="s.id">
              <td class="sticky-col name-cell">
                <span class="index">{{ index + 1 }}</span> {{ s.fullName }}
              </td>
              <template v-if="!isDirectMode">
                <td v-if="serEvals.length === 0">
                  <input v-model.number="s.ser" type="number" min="0" max="10" @input="clampValue(s, 'ser', 10)" class="cell-input" />
                </td>
                <td v-for="ev in serEvals" :key="ev.id">
                  <input v-model.number="s.evaluations.find(e => e.evaluationId === ev.id).score" type="number" min="0" max="10" @input="clampValue(s.evaluations.find(e => e.evaluationId === ev.id), 'score', 10)" class="cell-input" />
                </td>
                <td class="avg-val">{{ getSerAvg(s) }}</td>
                <td v-for="ev in saberEvals" :key="ev.id">
                  <input v-model.number="s.evaluations.find(e => e.evaluationId === ev.id).score" type="number" min="0" max="45" @input="clampValue(s.evaluations.find(e => e.evaluationId === ev.id), 'score', 45)" class="cell-input" />
                </td>
                <td v-if="saberEvals.length === 0">
                  <input type="number" disabled class="cell-input" placeholder="-" />
                </td>
                <td class="avg-val saber-avg">{{ getSaberAvg(s) }}</td>
                <td v-for="ev in hacerEvals" :key="ev.id">
                  <input v-model.number="s.evaluations.find(e => e.evaluationId === ev.id).score" type="number" min="0" max="40" @input="clampValue(s.evaluations.find(e => e.evaluationId === ev.id), 'score', 40)" class="cell-input" />
                </td>
                <td v-if="hacerEvals.length === 0">
                  <input type="number" disabled class="cell-input" placeholder="-" />
                </td>
                <td class="avg-val hacer-avg">{{ getHacerAvg(s) }}</td>
                <td><input v-model.number="s.autoSer" type="number" min="0" max="5" @input="clampValue(s, 'autoSer', 5)" class="cell-input" /></td>
              </template>
              
              <td v-if="isDirectMode">
                <input v-model.number="s.finalScore" type="number" min="0" max="100" @input="clampValue(s, 'finalScore', 100)" class="cell-input" style="width: 80px; font-size: 1.2rem;" />
              </td>
              <td v-else class="final-score" :class="{ danger: getFinalScore(s) < 51 }">
                {{ getFinalScore(s) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-state">
        <Info :size="48" />
        <p>Seleccione curso y materia para visualizar la planilla centralizadora.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detailed-grades {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.period-selector {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem;
  border-radius: 0.75rem;
  gap: 0.25rem;
}

.period-selector button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.period-selector button.active {
  background: var(--primary);
  color: white;
}

.filters-bar {
  padding: 1.25rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 220px;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.scroll-wrapper {
  overflow: auto;
  max-height: calc(100vh - 300px);
}

.ley-070-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.85rem;
  color: var(--text-main);
}

.ley-070-table th, .ley-070-table td {
  border: 1px solid var(--border);
  text-align: center;
  padding: 0;
}

.dim-header {
  padding: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.ser { background: rgba(59, 130, 246, 0.1); }
.saber { background: rgba(139, 92, 246, 0.1); }
.hacer { background: rgba(236, 72, 153, 0.1); }
.auto { background: rgba(16, 185, 129, 0.1); }
.final-header { background: var(--primary); padding: 1rem; color: white !important; }

.sub-col {
  padding: 0.25rem;
  font-size: 0.7rem;
  background: var(--bg-main);
}

.avg { font-weight: 800; color: var(--primary); }

.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  white-space: nowrap;
}

.sticky-col {
  position: sticky;
  left: 0;
  background: var(--bg-card);
  z-index: 20;
  padding: 0.75rem 1rem !important;
  text-align: left !important;
  min-width: 250px;
}

@media (max-width: 768px) {
  .sticky-col {
    position: static !important;
    min-width: 180px;
    font-size: 0.85rem;
  }
}

.name-cell {
  white-space: nowrap;
}

.index {
  color: var(--text-muted);
  margin-right: 0.5rem;
  font-size: 0.75rem;
}

.cell-input {
  width: 45px;
  height: 40px;
  background: transparent;
  border: none;
  color: var(--text-main);
  text-align: center;
  font-weight: 600;
  outline: none;
}

.cell-input:focus {
  background: rgba(255, 255, 255, 0.1);
}

.avg-val {
  background: rgba(255, 255, 255, 0.03);
  font-weight: 700;
  width: 45px;
}

.final-score {
  font-weight: 900;
  font-size: 1.1rem;
  color: #10b981;
}

.final-score.danger {
  color: #ef4444;
}

.add-col-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 2px 4px;
  margin-left: 0.5rem;
}

.add-col-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.loading-state, .empty-state {
  padding: 5rem;
  text-align: center;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
