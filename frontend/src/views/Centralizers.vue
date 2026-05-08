<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import api from '../api'
import { useAuthStore } from '../stores/auth'
import { Printer, Loader2, Info, ChevronRight, FileSpreadsheet, FileText } from 'lucide-vue-next'
import jsPDF from 'jspdf'

const authStore = useAuthStore()
import autoTable from 'jspdf-autotable'

const activeTab = ref('trimester') // 'trimester' or 'annual'
const courses = ref([])
const subjects = ref([])
const selectedCourse = ref('')
const selectedSubject = ref('')
const selectedPeriod = ref(1)

const data = ref(null)
const selectedSubjectIds = ref([])
const loading = ref(false)
const generatingPDF = ref(false)

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

    const savedSettings = localStorage.getItem('school_settings')
    if (savedSettings) {
      settings.value = JSON.parse(savedSettings)
    }

    // Override teacher name if user is a teacher
    if (authStore.user?.role === 'TEACHER') {
      try {
        const profile = await api.get('/academic/teachers/me')
        if (profile.data) {
          settings.value.teacherName = `${profile.data.firstName} ${profile.data.lastName}`
        }
      } catch (err) {
        console.error('Error fetching teacher profile', err)
      }
    }
  } catch (err) {
    console.error('Error loading initial data')
  }
})

const fetchData = async () => {
  if (!selectedCourse.value) return
  
  loading.value = true
  try {
    const [schoolRes] = await Promise.all([
      api.get('/schools/my')
    ])

    if (schoolRes.data) {
      settings.value.schoolName = schoolRes.data.name
      settings.value.directorName = schoolRes.data.directorName || 'Lic. Magda Zeballos'
      settings.value.level = schoolRes.data.educationalLevel || 'Primaria Comunitaria Vocacional'
    }

    if (activeTab.value === 'trimester') {
      const [res, assignmentRes] = await Promise.all([
        api.get(`/grades/centralizer/trimester?courseId=${selectedCourse.value}&period=${selectedPeriod.value}`),
        // No hay subjectId único en centralizador general, así que usamos el perfil o el primero
        api.get(`/academic/assignments/lookup?courseId=${selectedCourse.value}`)
      ])
      
      // Determinar docente para centralizador
      if (assignmentRes.data?.teacher) {
        settings.value.teacherName = `${assignmentRes.data.teacher.firstName} ${assignmentRes.data.teacher.lastName}`
      }

      // Ordenar estudiantes
      res.data.students.sort((a, b) => {
        const lastSort = (a.lastName || '').localeCompare(b.lastName || '')
        if (lastSort !== 0) return lastSort
        return (a.firstName || '').localeCompare(b.firstName || '')
      })
      
      data.value = res.data
      
      // Inicializar selección si está vacía
      if (selectedSubjectIds.value.length === 0) {
        selectedSubjectIds.value = res.data.subjects.map(s => s.id)
      }
    } else {
      const url = `/grades/centralizer/annual?courseId=${selectedCourse.value}${selectedSubject.value ? '&subjectId=' + selectedSubject.value : ''}`
      const res = await api.get(url)
      
      // Ordenar estudiantes
      res.data.sort((a, b) => {
        const lastSort = (a.lastName || '').localeCompare(b.lastName || '')
        if (lastSort !== 0) return lastSort
        return (a.firstName || '').localeCompare(b.firstName || '')
      })

      data.value = res.data
    }
  } catch (err) {
    console.error('Error fetching centralizer data')
  } finally {
    loading.value = false
  }
}

watch([selectedCourse, selectedSubject, selectedPeriod, activeTab], fetchData)

const printCentralizer = () => {
  window.print()
}

const downloadPDF = () => {
  if (!data.value) return

  const isTrimester = activeTab.value === 'trimester'
  const subjectList = isTrimester ? filteredSubjects.value : []
  const students = isTrimester ? data.value.students : data.value

  const title = isTrimester
    ? `CENTRALIZADOR ${selectedPeriod.value}ER TRIMESTRE`
    : 'CENTRALIZADOR ANUAL'

  // Subject header cells — indigo band matching the app primary color
  const subjectHeaders = isTrimester
    ? subjectList.map(s => `
        <th style="writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;
          width:20px;max-width:20px;height:30mm;font-size:6.5pt;font-weight:700;
          vertical-align:bottom;padding:3px 2px;border:1px solid #000;
          background:#e0e7ff;color:#3730a3;">
          ${abbreviateSubject(s.name)}
        </th>`).join('')
    : `<th style="border:1px solid #000;padding:4px;background:#e0e7ff;color:#3730a3;font-size:7pt;width:18mm;">1º Trim.</th>
       <th style="border:1px solid #000;padding:4px;background:#e0e7ff;color:#3730a3;font-size:7pt;width:18mm;">2º Trim.</th>
       <th style="border:1px solid #000;padding:4px;background:#e0e7ff;color:#3730a3;font-size:7pt;width:18mm;">3º Trim.</th>`

  // Body rows
  const bodyRows = students.map((st, idx) => {
    const scoreCells = isTrimester
      ? subjectList.map(s => `<td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${st.grades[s.id] !== undefined ? st.grades[s.id] : '-'}</td>`).join('')
      : `<td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${st.t1 !== undefined ? st.t1 : '-'}</td>
         <td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${st.t2 !== undefined ? st.t2 : '-'}</td>
         <td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${st.t3 !== undefined ? st.t3 : '-'}</td>`
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f9fafb'
    const avg = st.average
    const avgColor = avg >= 51 ? '#166534' : '#991b1b'
    const statusBg = st.status === 'APROBADO' ? '#dcfce7' : '#fee2e2'
    const statusColor = st.status === 'APROBADO' ? '#166534' : '#991b1b'
    return `<tr style="background:${rowBg};">
      <td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${idx + 1}</td>
      <td style="border:1px solid #ccc;padding:3px;font-weight:700;white-space:nowrap;font-size:7.5pt;">${st.fullName}</td>
      ${scoreCells}
      <td style="border:1px solid #555;text-align:center;padding:3px;font-weight:900;font-size:9pt;color:${avgColor};background:#eff6ff;">${avg}</td>
      <td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7pt;font-weight:700;background:${statusBg};color:${statusColor};">${st.status}</td>
    </tr>`
  }).join('')

  // Signature section
  const signatures = `
    <div style="margin-top:14mm;display:flex;justify-content:space-between;padding:0 5mm;">
      <div style="text-align:center;width:55mm;">
        <div style="border-top:1px solid #000;margin-bottom:3px;"></div>
        <p style="font-size:7.5pt;font-weight:700;">${settings.value.teacherName}</p>
        <p style="font-size:7.5pt;">Docente de Área</p>
      </div>
      <div style="text-align:center;width:55mm;">
        <div style="border-top:1px solid #000;margin-bottom:3px;"></div>
        <p style="font-size:7.5pt;font-weight:700;">${settings.value.directorName}</p>
        <p style="font-size:7.5pt;">Director(a)</p>
      </div>
      <div style="text-align:center;width:55mm;">
        <div style="border-top:1px solid #000;margin-bottom:3px;"></div>
        <p style="font-size:7.5pt;font-weight:700;">SELLO</p>
        <p style="font-size:7.5pt;">Unidad Educativa</p>
      </div>
    </div>`

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; font-size:8pt; color:#000; background:#fff; }
    .doc { padding: 8mm 10mm; }
    h1 { text-align:center; font-size:12pt; text-transform:uppercase; margin-bottom:3px; }
    .subtitle { text-align:center; font-size:9pt; font-weight:bold; margin-bottom:8px; color:#444; }
    .meta { display:grid; grid-template-columns:repeat(3,1fr); gap:2px 8px; font-size:7.5pt;
            margin-bottom:8px; padding-bottom:6px; border-bottom:1.5px solid #000; }
    .meta strong { font-weight:700; }
    table { width:100%; border-collapse:collapse; }
    @page { size: letter portrait; margin: 8mm; }
    @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  </style>
</head>
<body>
<div class="doc">
  <h1>${title}</h1>
  <p class="subtitle">GESTIÓN ${settings.value.year}</p>
  <div class="meta">
    <div><strong>UNIDAD EDUCATIVA:</strong> ${settings.value.schoolName}</div>
    <div><strong>DOCENTE:</strong> ${settings.value.teacherName}</div>
    <div><strong>DIRECTOR(A):</strong> ${settings.value.directorName}</div>
    <div><strong>NIVEL:</strong> ${settings.value.level}</div>
    <div><strong>GESTIÓN:</strong> ${settings.value.year}</div>
    <div><strong>GRADO:</strong> ${currentCourseLabel.value}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="border:1px solid #000;width:8mm;background:#f2f2f2;padding:4px;font-size:7pt;">Nº</th>
        <th style="border:1px solid #000;width:42mm;text-align:left;background:#f2f2f2;padding:4px;font-size:7pt;">NÓMINA DE ESTUDIANTES</th>
        ${subjectHeaders}
        <th style="border:1px solid #000;width:14mm;background:#bfdbfe;color:#1e40af;padding:4px;font-size:7pt;font-weight:700;">PROM.</th>
        <th style="border:1px solid #000;width:20mm;background:#f2f2f2;padding:4px;font-size:7pt;">SITUACIÓN ACADÉMICA</th>
      </tr>
    </thead>
    <tbody>${bodyRows}</tbody>
  </table>
  ${signatures}
</div>
<script>window.onload = () => window.print()<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=700')
  win.document.write(html)
  win.document.close()
}

const currentCourseLabel = computed(() => {
  const c = courses.value.find(c => c.id === parseInt(selectedCourse.value))
  return c ? `${c.level} "${c.parallel}"` : ''
})

const currentSubjectLabel = computed(() => {
  const s = subjects.value.find(s => s.id === parseInt(selectedSubject.value))
  return s ? s.name : 'GENERAL'
})

const filteredSubjects = computed(() => {
  if (!data.value || !data.value.subjects) return []
  return data.value.subjects.filter(s => selectedSubjectIds.value.includes(s.id))
})

const toggleSubject = (id) => {
  const index = selectedSubjectIds.value.indexOf(id)
  if (index === -1) selectedSubjectIds.value.push(id)
  else selectedSubjectIds.value.splice(index, 1)
}

const abbreviateSubject = (name) => {
  const dict = {
    'CIENCIAS NATURALES': 'C. NATURAL',
    'COMUNICACIÓN Y LENGUAJES': 'COMUNIC. LEN',
    'COMUNICACIÓN Y LENGUAJE': 'COMUNIC. LEN',
    'CIENCIAS SOCIALES': 'C. SOCIALES',
    'ARTES PLÁSTICAS Y VISUALES': 'A. PLÁSTICAS',
    'ARTES PLÁSTICAS': 'A. PLÁSTICAS',
    'EDUCACIÓN FÍSICA Y DEPORTES': 'E. FÍSICA',
    'EDUCACIÓN FÍSICA': 'E. FÍSICA',
    'EDUCACIÓN MUSICAL': 'E. MUSICAL',
    'MATEMÁTICA': 'MATEMÁTICA',
    'TÉCNICA TECNOLÓGICA': 'TÉCN. TECNOL',
    'VALORES, ESPIRITUALIDAD Y RELIGIONES': 'VALORES',
    'VALORES': 'VALORES'
  }
  const upper = name.toUpperCase().trim()
  return dict[upper] || name
}
</script>

<template>
  <div class="centralizers-view">
    <div class="page-header no-print">
      <h1 class="page-title">Centralizadores de Calificaciones</h1>
      <div class="tab-selector">
        <button @click="activeTab = 'trimester'" :class="{ active: activeTab === 'trimester' }">
          Trimestral
        </button>
        <button @click="activeTab = 'annual'" :class="{ active: activeTab === 'annual' }">
          Anual
        </button>
      </div>
    </div>

    <div class="filters-bar glass-card no-print">
      <div class="filter-group">
        <label>Curso</label>
        <select v-model="selectedCourse" class="input-field">
          <option value="">Seleccionar curso</option>
          <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} - {{ c.parallel }}</option>
        </select>
      </div>
      
      <div v-if="activeTab === 'trimester'" class="filter-group">
        <label>Trimestre</label>
        <select v-model="selectedPeriod" class="input-field">
          <option v-for="p in [1, 2, 3]" :key="p" :value="p">{{ p }}º Trimestre</option>
        </select>
      </div>

      <div v-if="activeTab === 'annual'" class="filter-group">
        <label>Materia (Opcional)</label>
        <select v-model="selectedSubject" class="input-field">
          <option value="">PROMEDIO GENERAL</option>
          <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>

      <div class="actions-group">
        <button @click="downloadPDF" class="btn btn-outline" :disabled="!data">
          <Printer :size="18" />
          Imprimir
        </button>
        <button @click="downloadPDF" class="btn btn-primary" :disabled="!data || generatingPDF">
          <Loader2 v-if="generatingPDF" class="animate-spin" :size="18" />
          <FileText v-else :size="18" />
          Descargar PDF
        </button>
      </div>
    </div>

    <!-- Selector de materias (solo para trimestral) -->
    <div v-if="activeTab === 'trimester' && data" class="subject-selector glass-card no-print">
      <label>Materias a mostrar:</label>
      <div class="subject-tags">
        <button 
          v-for="s in data.subjects" 
          :key="s.id" 
          @click="toggleSubject(s.id)"
          :class="{ active: selectedSubjectIds.includes(s.id) }"
          class="subject-tag"
        >
          {{ s.name }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state no-print">
      <Loader2 class="animate-spin" :size="40" />
      <p>Generando centralizador...</p>
    </div>

    <div v-else-if="data" class="centralizer-container">
      <!-- Formato Impresión Trimestral -->
      <div v-if="activeTab === 'trimester'" class="centralizer-document printable">
        <div class="doc-header">
          <div class="title">CENTRALIZADOR {{ selectedPeriod }}ER TRIMESTRE</div>
          <div class="meta-grid">
            <div class="meta-item"><strong>UNIDAD EDUCATIVA:</strong> {{ settings.schoolName }}</div>
            <div class="meta-item"><strong>DOCENTE:</strong> {{ settings.teacherName }}</div>
            <div class="meta-item"><strong>DIRECTOR(A):</strong> {{ settings.directorName }}</div>
            <div class="meta-item"><strong>NIVEL:</strong> {{ settings.level }}</div>
            <div class="meta-item"><strong>GESTIÓN:</strong> {{ settings.year }}</div>
            <div class="meta-item"><strong>GRADO:</strong> {{ currentCourseLabel }}</div>
          </div>
        </div>

        <table class="report-table">
          <thead>
            <tr>
              <th rowspan="2">Nº</th>
              <th rowspan="2" class="name-col">NÓMINA DE ESTUDIANTES</th>
              <th v-for="s in filteredSubjects" :key="s.id" class="subject-col">
                {{ abbreviateSubject(s.name) }}
              </th>
              <th rowspan="2" class="avg-col">PROMEDIO</th>
              <th rowspan="2">Situación Académica</th>
            </tr>
            <tr>
              <!-- Fila vacía para los encabezados rotados si es necesario -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in data.students" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td class="name-cell">{{ student.fullName }}</td>
              <td v-for="s in filteredSubjects" :key="s.id" class="score-cell">
                {{ student.grades[s.id] !== undefined ? student.grades[s.id] : '-' }}
              </td>
              <td class="avg-cell">{{ student.average }}</td>
              <td class="status-cell">
                <span class="status-badge" :class="student.status.toLowerCase()">{{ student.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="bulletin-footer">
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>{{ settings.teacherName }}</p>
            <p>Docente de Área</p>
          </div>
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>{{ settings.directorName }}</p>
            <p>Director(a)</p>
          </div>
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>SELLO</p>
            <p>Unidad Educativa</p>
          </div>
        </div>
      </div>

      <!-- Formato Impresión Anual -->
      <div v-else class="centralizer-document printable">
        <div class="doc-header">
          <div class="title">CENTRALIZADOR ANUAL</div>
          <div class="meta-grid">
            <div class="meta-item"><strong>UNIDAD EDUCATIVA:</strong> {{ settings.schoolName }}</div>
            <div class="meta-item"><strong>ÁREA:</strong> {{ currentSubjectLabel }}</div>
            <div class="meta-item"><strong>NIVEL:</strong> {{ settings.level }}</div>
            <div class="meta-item"><strong>DOCENTE:</strong> {{ settings.teacherName }}</div>
            <div class="meta-item"><strong>DIRECTOR(A):</strong> {{ settings.directorName }}</div>
            <div class="meta-item"><strong>GRADO:</strong> {{ currentCourseLabel }}</div>
            <div class="meta-item"><strong>GESTIÓN:</strong> {{ settings.year }}</div>
          </div>
        </div>

        <table class="report-table">
          <thead>
            <tr>
              <th rowspan="2">Nº</th>
              <th rowspan="2" class="name-col">NÓMINA DE ESTUDIANTES</th>
              <th colspan="3">TRIMESTRES</th>
              <th rowspan="2">PROM. ANUAL</th>
              <th rowspan="2">Situación Académica</th>
            </tr>
            <tr>
              <th>1º TRIM.</th>
              <th>2º TRIM.</th>
              <th>3º TRIM.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in data" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td class="name-cell">{{ student.fullName }}</td>
              <td class="score-cell">{{ student.t1 !== undefined ? student.t1 : '-' }}</td>
              <td class="score-cell">{{ student.t2 !== undefined ? student.t2 : '-' }}</td>
              <td class="score-cell">{{ student.t3 !== undefined ? student.t3 : '-' }}</td>
              <td class="avg-cell">{{ student.average }}</td>
              <td class="status-cell" :class="student.status.toLowerCase()">
                {{ student.status }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="bulletin-footer">
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>{{ settings.teacherName }}</p>
            <p>Docente de Área</p>
          </div>
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>{{ settings.directorName }}</p>
            <p>Director(a)</p>
          </div>
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>SELLO</p>
            <p>Unidad Educativa</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state no-print">
      <FileSpreadsheet :size="48" />
      <p>Seleccione un curso para generar el centralizador.</p>
    </div>
  </div>
</template>

<style scoped>
.centralizers-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-selector {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem;
  border-radius: 0.75rem;
  gap: 0.25rem;
}

.tab-selector button {
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.tab-selector button.active {
  background: var(--primary);
  color: white;
}

.filters-bar {
  padding: 1.25rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
}

.subject-selector {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.subject-selector label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.subject-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.subject-tag {
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.subject-tag:hover {
  background: rgba(99, 102, 241, 0.1);
}

.subject-tag.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 180px;
}

.actions-group {
  display: flex;
  gap: 0.75rem;
}

/* ── On-screen document card ────────────────────────────────── */
.centralizer-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.centralizer-document {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  overflow-x: auto;
  box-shadow: var(--shadow);
}

/* ── Document header ─────────────────────────────────────────── */
.doc-header {
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.doc-header .title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem 2rem;
  font-size: 0.8rem;
}

.meta-item {
  color: var(--text-muted);
}

.meta-item strong {
  color: var(--text-main);
  font-weight: 700;
  margin-right: 0.25rem;
}

/* ── Table ───────────────────────────────────────────────────── */
.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}

.report-table thead tr {
  background: var(--bg-main) !important;
}

.report-table th {
  background: transparent !important;
  color: var(--text-muted) !important;
  border: none !important;
  border-bottom: 2px solid var(--border) !important;
  padding: 0.6rem 0.4rem;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.03em;
}

.report-table tbody tr {
  background: transparent !important;
  transition: background 0.15s;
}

.report-table tbody tr:nth-child(even) {
  background: var(--bg-main) !important;
}

.report-table tbody tr:hover {
  background: rgba(99,102,241,0.1) !important;
}

.report-table td {
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  padding: 0.5rem 0.4rem;
  text-align: center;
  color: var(--text-main) !important;
  background: transparent !important;
}

.name-col { width: 200px; min-width: 160px; }
.name-cell {
  text-align: left !important;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
}

.subject-col {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-orientation: mixed;
  white-space: nowrap;
  padding: 6px 4px !important;
  font-size: 0.62rem;
  font-weight: 700;
  width: 28px;
  min-width: 28px;
  max-width: 28px;
  vertical-align: bottom;
  color: var(--text-main) !important;
  background: transparent !important;
}

.avg-col { width: 60px; }
.avg-cell {
  font-weight: 900;
  font-size: 0.9rem;
  color: var(--text-main) !important;
}

.score-cell { width: 30px; color: var(--text-muted, #aaa) !important; }

.status-cell {
  font-weight: 700;
  font-size: 0.72rem;
}

.status-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.status-badge.aprobado, .status-cell.aprobado {
  background: rgba(39,174,96,0.15);
  color: #2ecc71 !important;
}

.status-badge.reprobado, .status-cell.reprobado {
  background: rgba(192,57,43,0.15);
  color: #e74c3c !important;
}

/* ── Loading / Empty ─────────────────────────────────────────── */
.loading-state, .empty-state {
  padding: 5rem;
  text-align: center;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* ── Print overrides ─────────────────────────────────────────── */
@media print {
  .no-print { display: none !important; }
  .centralizers-view { gap: 0; }
  body, * { background: white !important; color: black !important; }
  .app-container { padding: 0 !important; }
  .main-content { padding: 0 !important; }
}
</style>
