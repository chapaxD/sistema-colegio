<script setup>
import { onMounted, ref, watch } from 'vue'
import api from '../api'
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, Save, Loader2, Info, FileText, Printer } from 'lucide-vue-next'

const courses = ref([])
const subjects = ref([])
const selectedCourse = ref('')
const selectedSubject = ref('')
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedMonth = ref(new Date().getMonth() + 1)

const students = ref([])
const loading = ref(false)
const generatingPDF = ref(false)
const saving = ref(false)
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
    const [coursesRes, subjectsRes] = await Promise.all([
      api.get('/academic/courses'),
      api.get('/academic/subjects')
    ])
    courses.value = coursesRes.data
    subjects.value = subjectsRes.data

    const saved = localStorage.getItem('school_settings')
    if (saved) settings.value = JSON.parse(saved)
  } catch (err) {
    console.error('Error loading data')
  }
})

const fetchStudents = async () => {
  if (!selectedCourse.value || !selectedSubject.value) return
  
  loading.value = true
  try {
    // 1. Obtener alumnos, datos de escuela y asignación
    const [studentsRes, attendanceRes, schoolRes, assignmentRes] = await Promise.all([
      api.get('/students'),
      api.get(`/attendance?courseId=${selectedCourse.value}&subjectId=${selectedSubject.value}&date=${selectedDate.value}`),
      api.get('/schools/my'),
      api.get(`/academic/assignments/lookup?courseId=${selectedCourse.value}&subjectId=${selectedSubject.value}`)
    ])

    // Actualizar datos institucionales
    if (schoolRes.data) {
      settings.value.schoolName = schoolRes.data.name
      settings.value.directorName = schoolRes.data.directorName || 'Lic. Magda Zeballos'
      settings.value.level = schoolRes.data.educationalLevel || 'Primaria Comunitaria Vocacional'
    }

    // Determinar nombre del docente
    if (assignmentRes.data?.teacher) {
      const t = assignmentRes.data.teacher
      settings.value.teacherName = `${t.firstName} ${t.lastName}`
    } else {
      settings.value.teacherName = 'DOCENTE DE ÁREA'
    }

    const courseStudents = studentsRes.data.filter(s => 
      s.enrollments.some(e => e.courseId === parseInt(selectedCourse.value))
    )
    
    // 3. Mapear estados
    students.value = courseStudents.map(s => {
      const enrollment = s.enrollments.find(e => e.courseId === parseInt(selectedCourse.value))
      const record = attendanceRes.data.find(a => a.enrollmentId === enrollment.id)
      return {
        id: s.id,
        enrollmentId: enrollment.id,
        firstName: s.firstName,
        lastName: s.lastName,
        fullName: `${s.lastName} ${s.firstName}`,
        status: record ? record.status : 'PRESENT' // Por defecto presente
      }
    }).sort((a, b) => {
      const lastSort = (a.lastName || '').localeCompare(b.lastName || '')
      if (lastSort !== 0) return lastSort
      return (a.firstName || '').localeCompare(b.firstName || '')
    })
  } catch (err) {
    console.error('Error fetching students')
  } finally {
    loading.value = false
  }
}

watch([selectedCourse, selectedSubject, selectedDate], fetchStudents)

const saveAttendance = async () => {
  saving.value = true
  try {
    await api.post('/attendance/batch', {
      date: selectedDate.value,
      subjectId: parseInt(selectedSubject.value),
      items: students.value.map(s => ({
        enrollmentId: s.enrollmentId,
        status: s.status
      }))
    })
    message.value = { text: 'Asistencia guardada correctamente', type: 'success' }
    setTimeout(() => message.value = { text: '', type: '' }, 3000)
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Error al guardar asistencia'
    message.value = { text: errorMsg, type: 'error' }
    setTimeout(() => message.value = { text: '', type: '' }, 5000)
  } finally {
    saving.value = false
  }
}

const setAllStatus = (status) => {
  students.value.forEach(s => s.status = status)
}

const generateMonthlyPDF = async () => {
  if (!selectedCourse.value || !selectedSubject.value) {
    alert('Seleccione curso y materia primero')
    return
  }

  generatingPDF.value = true
  try {
    const year = settings.value.year
    const monthNames = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
    const monthName = monthNames[selectedMonth.value - 1]
    const subjectName = subjects.value.find(s => s.id === parseInt(selectedSubject.value))?.name || ''
    const course = courses.value.find(c => c.id === parseInt(selectedCourse.value))
    const courseName = course ? `${course.level} "${course.parallel}"` : ''

    const res = await api.get(`/attendance/monthly?courseId=${selectedCourse.value}&subjectId=${selectedSubject.value}&year=${year}&month=${selectedMonth.value}`)

    const daysInMonth = new Date(year, selectedMonth.value, 0).getDate()
    const report = {}
    res.data.forEach(att => {
      const name = `${att.enrollment.student.lastName} ${att.enrollment.student.firstName}`
      if (!report[name]) report[name] = { 
        name, 
        lastName: att.enrollment.student.lastName,
        firstName: att.enrollment.student.firstName,
        days: Array(daysInMonth).fill('-') 
      }
      const day = new Date(att.date).getUTCDate()
      report[name].days[day - 1] = att.status === 'ABSENT' ? 'F' : att.status === 'EXCUSED' ? 'L' : 'P'
    })
    const attendanceData = Object.values(report).sort((a, b) => {
      const lastSort = (a.lastName || '').localeCompare(b.lastName || '')
      if (lastSort !== 0) return lastSort
      return (a.firstName || '').localeCompare(b.firstName || '')
    })

    // Day header cells
    const dayCells = Array.from({ length: daysInMonth }, (_, i) =>
      `<th style="border:1px solid #000;padding:2px;width:14px;font-size:6.5pt;text-align:center;background:#e0e7ff;color:#3730a3;">${i + 1}</th>`
    ).join('')

    // Body rows
    const bodyRows = attendanceData.map((s, idx) => {
      const rowBg = idx % 2 === 0 ? '#ffffff' : '#f9fafb'
      const presentes = s.days.filter(x => x === 'P').length
      const faltas   = s.days.filter(x => x === 'F').length
      const licencias = s.days.filter(x => x === 'L').length
      const dayCellValues = s.days.map(d => {
        let color = ''
        if (d === 'F') color = 'color:#991b1b;font-weight:900;'
        if (d === 'L') color = 'color:#92400e;font-weight:700;'
        if (d === 'P') color = 'color:#166534;'
        return `<td style="border:1px solid #ccc;text-align:center;padding:1px;font-size:7pt;${color}">${d}</td>`
      }).join('')
      return `<tr style="background:${rowBg};">
        <td style="border:1px solid #ccc;text-align:center;padding:2px;font-size:7.5pt;">${idx + 1}</td>
        <td style="border:1px solid #ccc;padding:3px;font-weight:700;white-space:nowrap;font-size:7.5pt;">${s.name}</td>
        ${dayCellValues}
        <td style="border:1px solid #555;text-align:center;padding:2px;font-weight:900;font-size:8pt;background:#dcfce7;color:#166534;">${presentes}</td>
        <td style="border:1px solid #555;text-align:center;padding:2px;font-weight:900;font-size:8pt;background:#fee2e2;color:#991b1b;">${faltas}</td>
        <td style="border:1px solid #555;text-align:center;padding:2px;font-weight:900;font-size:8pt;background:#fef9c3;color:#92400e;">${licencias}</td>
      </tr>`
    }).join('')

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Control de Asistencia - ${monthName} ${year}</title>
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
  <h1>Control de Asistencia Mensual</h1>
  <p class="subtitle">${monthName} ${year}</p>
  <div class="meta">
    <div><strong>UNIDAD EDUCATIVA:</strong> ${settings.value.schoolName}</div>
    <div><strong>NIVEL:</strong> ${settings.value.level}</div>
    <div><strong>MES:</strong> ${monthName} ${year}</div>
    <div><strong>ÁREA/MATERIA:</strong> ${subjectName}</div>
    <div><strong>DOCENTE:</strong> ${settings.value.teacherName}</div>
    <div><strong>GRADO/CURSO:</strong> ${courseName}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="border:1px solid #000;width:8mm;background:#f2f2f2;padding:3px;font-size:7pt;">Nº</th>
        <th style="border:1px solid #000;width:40mm;text-align:left;background:#f2f2f2;padding:3px;font-size:7pt;">APELLIDOS Y NOMBRES</th>
        ${dayCells}
        <th style="border:1px solid #000;width:10mm;background:#dcfce7;color:#166534;padding:3px;font-size:7pt;font-weight:700;">P</th>
        <th style="border:1px solid #000;width:10mm;background:#fee2e2;color:#991b1b;padding:3px;font-size:7pt;font-weight:700;">F</th>
        <th style="border:1px solid #000;width:10mm;background:#fef9c3;color:#92400e;padding:3px;font-size:7pt;font-weight:700;">L</th>
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

    const win = window.open('', '_blank', 'width=1100,height=700')
    win.document.write(html)
    win.document.close()
  } catch (err) {
    console.error(err)
    alert('Error al generar reporte')
  } finally {
    generatingPDF.value = false
  }
}
</script>

<template>
  <div class="attendance-view">
    <div class="page-header">
      <h1 class="page-title">Control de Asistencia</h1>
      <div class="quick-actions" v-if="students.length > 0">
        <button @click="setAllStatus('PRESENT')" class="btn btn-outline success">Todo Presente</button>
        <button @click="setAllStatus('ABSENT')" class="btn btn-outline danger">Todo Falta</button>
      </div>
    </div>

    <div class="filters-bar glass-card">
      <div class="filter-group">
        <label>Fecha</label>
        <div class="date-input-wrapper">
          <CalendarIcon class="input-icon" :size="18" />
          <input v-model="selectedDate" type="date" class="input-field" />
        </div>
      </div>
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
      <div class="filter-group" style="width: 120px;">
        <label>Mes Reporte</label>
        <select v-model="selectedMonth" class="input-field">
          <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
      <div class="action-buttons">
        <button @click="saveAttendance" class="btn btn-primary" :disabled="saving || students.length === 0">
          <Loader2 v-if="saving" class="animate-spin" :size="18" />
          <Save v-else :size="18" />
          Guardar
        </button>
        <button @click="generateMonthlyPDF" class="btn btn-outline" :disabled="generatingPDF || students.length === 0">
          <Printer :size="18" />
          Imprimir
        </button>
        <button @click="generateMonthlyPDF" class="btn btn-outline" :disabled="generatingPDF || students.length === 0">
          <FileText :size="18" />
          PDF Mensual
        </button>
      </div>
    </div>

    <div v-if="message.text" class="message-toast" :class="message.type">
      {{ message.text }}
    </div>

    <div class="table-container glass-card">
      <div v-if="loading" class="loading-state">
        <Loader2 class="animate-spin" :size="40" />
        <p>Cargando alumnos...</p>
      </div>

      <table v-else-if="students.length > 0" class="attendance-table">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th class="text-center">Estado de Asistencia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in students" :key="s.id">
            <td class="student-name">{{ s.fullName }}</td>
            <td class="status-options">
              <div 
                class="status-btn present" 
                :class="{ active: s.status === 'PRESENT' }"
                @click="s.status = 'PRESENT'"
              >
                <CheckCircle :size="18" /> Presente
              </div>
              <div 
                class="status-btn absent" 
                :class="{ active: s.status === 'ABSENT' }"
                @click="s.status = 'ABSENT'"
              >
                <XCircle :size="18" /> Falta
              </div>
              <div 
                class="status-btn excused" 
                :class="{ active: s.status === 'EXCUSED' }"
                @click="s.status = 'EXCUSED'"
              >
                <Clock :size="18" /> Licencia
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <p>Seleccione los filtros para tomar asistencia.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.attendance-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quick-actions {
  display: flex;
  gap: 0.75rem;
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
  width: 180px;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.date-input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.date-input-wrapper .input-field {
  padding-left: 2.5rem;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
}

.attendance-table th, .attendance-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  text-align: left;
}

.attendance-table th {
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.student-name {
  font-weight: 600;
  color: var(--text-main);
}

.status-options {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.status-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.status-btn.active.present {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border-color: #10b981;
}

.status-btn.active.absent {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border-color: #ef4444;
}

.status-btn.active.excused {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border-color: #f59e0b;
}

.status-btn:not(.active):hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--text-muted);
}

.message-toast {
  padding: 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-align: center;
}

.message-toast.success { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; }
.message-toast.error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; }

.loading-state, .empty-state {
  padding: 4rem;
  text-align: center;
  color: var(--text-muted);
}

.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
