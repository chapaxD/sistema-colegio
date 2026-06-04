<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Printer, Save, Search, FileDown, Upload } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import api from '../api'

const authStore = useAuthStore()
const toast = useToast()
const courses = ref([])
const years = ref([])
const selectedCourseId = ref('')
const selectedYearId = ref('')
const schoolName = ref('')
const teacherName = ref('')
const rows = ref([])
const saving = ref(false)
const loading = ref(false)
const importInput = ref(null)
const importing = ref(false)

const INSTRUCCION_OPTIONS = [
  '', 'Primaria', 'Secundaria', 'Técnico Medio', 'Técnico Superior',
  'Licenciatura', 'Maestría', 'Doctorado', 'Ninguna'
]

const saveAll = async () => {
  const rowsWithStudent = rows.value.filter(r => r.studentId)
  if (rowsWithStudent.length === 0) {
    toast.warning('No hay estudiantes para guardar.')
    return
  }
  saving.value = true
  let errors = 0
  for (const row of rowsWithStudent) {
    try {
      await api.patch(`/students/${row.studentId}`, {
        tutorRelation: row.tutorRelation,
        tutorName: row.tutorName,
        tutorCi: row.tutorCi,
        tutorOcupacion: row.tutorOcupacion,
        tutorInstruccion: row.tutorInstruccion,
        tutorBirthDate: row.tutorBirthDate || undefined,
        address: row.address,
        phone: row.phone,
      })
    } catch {
      errors++
    }
  }
  saving.value = false
  if (errors === 0) {
    toast.success(`Datos guardados correctamente (${rowsWithStudent.length} estudiantes)`)
  } else {
    toast.error(`Se guardaron con ${errors} errores`)
  }
}

onMounted(async () => {
  try {
    const [c, y, school] = await Promise.all([
      api.get('/academic/courses'),
      api.get('/academic/years'),
      api.get('/schools/my')
    ])
    courses.value = c.data
    years.value = y.data
    schoolName.value = school.data?.name || ''
    teacherName.value = authStore.user?.teacherName || authStore.user?.email || ''

    if (years.value.length > 0) {
      selectedYearId.value = years.value[0].id
    }
  } catch (err) {
    console.error('Error cargando datos', err)
  }
})

const selectedCourse = computed(() =>
  courses.value.find(c => c.id.toString() === selectedCourseId.value)
)

const selectedYear = computed(() =>
  years.value.find(y => y.id.toString() === selectedYearId.value.toString())
)

const formatDateInput = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.split('T')[0]
}

const formatDateDisplay = (dateStr) => {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`
  return dateStr
}

const loadStudents = async () => {
  if (!selectedCourseId.value) return
  loading.value = true
  try {
    const res = await api.get('/students')
    const students = res.data.filter(s =>
      s.isActive && s.enrollments?.some(e => e.courseId.toString() === selectedCourseId.value)
    )
    students.sort((a, b) => a.lastName.localeCompare(b.lastName))

    rows.value = students.map((s, i) => ({
      n: i + 1,
      studentId: s.id,
      fullName: `${s.lastName} ${s.firstName}`,
      tutorRelation: s.tutorRelation || '',
      tutorName: s.tutorName || '',
      tutorCi: s.tutorCi || '',
      tutorOcupacion: s.tutorOcupacion || '',
      tutorInstruccion: s.tutorInstruccion || '',
      tutorBirthDate: s.tutorBirthDate ? formatDateInput(s.tutorBirthDate) : '',
      address: s.address || '',
      phone: s.phone || '',
    }))

    const emptyNeeded = Math.max(0, 35 - rows.value.length)
    for (let i = 0; i < emptyNeeded; i++) {
      rows.value.push({
        n: rows.value.length + 1,
        studentId: null,
        fullName: '',
        tutorRelation: '',
        tutorName: '',
        tutorCi: '',
        tutorOcupacion: '',
        tutorInstruccion: '',
        tutorBirthDate: '',
        address: '',
        phone: '',
      })
    }
  } catch (err) {
    console.error('Error cargando estudiantes', err)
  }
  loading.value = false
}

const exportToExcel = () => {
  const courseName = selectedCourse.value
    ? `${selectedCourse.value.level} ${selectedCourse.value.parallel}`
    : 'Tutor'

  const data = rows.value.map((r, i) => ({
    'N°': i + 1,
    'ESTUDIANTE': r.fullName,
    'PADRE O MADRE TUTOR': r.tutorRelation,
    'NOMBRE Y APELLIDO DEL PADRE': r.tutorName,
    'C.I.': r.tutorCi,
    'OCUPACION': r.tutorOcupacion,
    'MAYOR GRADO DE INSTRUCCIÓN ALCANZADO': r.tutorInstruccion,
    'FECHA DE NACIMIENTO': r.tutorBirthDate ? formatDateDisplay(r.tutorBirthDate) : '',
    'DIRECCION': r.address,
    'Nº DE CELULAR ACTUAL': r.phone,
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Datos Tutor')
  XLSX.writeFile(wb, `DatosTutor_${courseName}.xlsx`)
}

const handleImportFile = (e) => {
  const file = e.target.files[0]
  if (!file) return
  importing.value = true
  const reader = new FileReader()
  reader.onload = (evt) => {
    try {
      const wb = XLSX.read(evt.target.result, { type: 'binary' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const excelRows = XLSX.utils.sheet_to_json(ws)

      let updated = 0
      for (const excelRow of excelRows) {
        const name = (excelRow['ESTUDIANTE'] || '').toString().trim().toLowerCase()
        const match = rows.value.find(r => r.fullName.toLowerCase() === name)
        if (match) {
          if (excelRow['PADRE O MADRE TUTOR'] !== undefined) match.tutorRelation = excelRow['PADRE O MADRE TUTOR'].toString()
          if (excelRow['NOMBRE Y APELLIDO DEL PADRE'] !== undefined) match.tutorName = excelRow['NOMBRE Y APELLIDO DEL PADRE'].toString()
          if (excelRow['C.I.'] !== undefined) match.tutorCi = excelRow['C.I.'].toString()
          if (excelRow['OCUPACION'] !== undefined) match.tutorOcupacion = excelRow['OCUPACION'].toString()
          if (excelRow['MAYOR GRADO DE INSTRUCCIÓN ALCANZADO'] !== undefined) match.tutorInstruccion = excelRow['MAYOR GRADO DE INSTRUCCIÓN ALCANZADO'].toString()
          if (excelRow['FECHA DE NACIMIENTO'] !== undefined) match.tutorBirthDate = excelRow['FECHA DE NACIMIENTO'].toString()
          if (excelRow['DIRECCION'] !== undefined) match.address = excelRow['DIRECCION'].toString()
          if (excelRow['Nº DE CELULAR ACTUAL'] !== undefined) match.phone = excelRow['Nº DE CELULAR ACTUAL'].toString()
          updated++
        }
      }
      if (updated > 0) {
        toast.success(`${updated} estudiante(s) actualizados desde Excel. Presiona "Guardar" para confirmar.`)
      } else {
        toast.warning('No se encontraron coincidencias. Verifica que los nombres coincidan.')
      }
    } catch {
      toast.error('Error al leer el archivo Excel.')
    }
    importing.value = false
    if (importInput.value) importInput.value.value = ''
  }
  reader.readAsBinaryString(file)
}

const downloadPDF = () => {
  const courseName = selectedCourse.value
    ? `${selectedCourse.value.level} "${selectedCourse.value.parallel}"`
    : 'DatosTutor'
  const year = selectedYear.value?.year || new Date().getFullYear()

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' })

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('DATOS DEL PADRE, MADRE O TUTOR', doc.internal.pageSize.getWidth() / 2, 14, { align: 'center' })

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`UNIDAD EDUCATIVA: ${schoolName.value}`, 14, 22)
  doc.text(`CURSO: ${courseName}`, doc.internal.pageSize.getWidth() / 2, 22)
  doc.text(`GESTIÓN: ${year}`, doc.internal.pageSize.getWidth() - 14, 22, { align: 'right' })

  const head = [['N°', 'ESTUDIANTE', 'PADRE/\nMADRE/\nTUTOR', 'NOMBRE Y APELLIDO DEL PADRE', 'C.I.', 'OCUPACIÓN', 'GRADO DE\nINSTRUCCIÓN', 'FECHA DE\nNACIMIENTO', 'DIRECCIÓN', 'CELULAR']]
  const body = rows.value.map((r, i) => [
    i + 1,
    r.fullName,
    r.tutorRelation,
    r.tutorName,
    r.tutorCi,
    r.tutorOcupacion,
    r.tutorInstruccion,
    formatDateDisplay(r.tutorBirthDate),
    r.address,
    r.phone
  ])

  autoTable(doc, {
    head,
    body,
    startY: 30,
    styles: { fontSize: 7, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.2 },
    headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      2: { cellWidth: 16, halign: 'center' },
      4: { cellWidth: 18, halign: 'center' },
      7: { cellWidth: 22, halign: 'center' },
      9: { cellWidth: 18, halign: 'center' },
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
  })

  doc.save(`DatosTutor_${courseName}_${year}.pdf`)
}

const printTable = () => {
  const courseName = selectedCourse.value
    ? `${selectedCourse.value.level} "${selectedCourse.value.parallel}"`
    : '___________'
  const year = selectedYear.value?.year || new Date().getFullYear()

  const tableRows = rows.value.map((r, i) => `
    <tr>
      <td class="center">${i + 1}</td>
      <td>${r.fullName}</td>
      <td class="center">${r.tutorRelation}</td>
      <td>${r.tutorName}</td>
      <td class="center">${r.tutorCi}</td>
      <td>${r.tutorOcupacion}</td>
      <td class="center">${r.tutorInstruccion}</td>
      <td class="center">${formatDateDisplay(r.tutorBirthDate)}</td>
      <td>${r.address}</td>
      <td class="center">${r.phone}</td>
    </tr>`).join('')

  const win = window.open('', '_blank', 'width=1300,height=900')
  win.document.write(`
    <html><head><title>Datos del Padre, Madre o Tutor</title>
    <style>
      @page { size: landscape; margin: 10mm; }
      body { font-family: Arial, sans-serif; font-size: 10px; margin: 0; }
      h2 { text-align: center; font-size: 13px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; }
      .meta-block { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 8px; }
      .meta-block span { flex: 1; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 3px 4px; text-align: left; font-size: 9px; }
      th { background: #e0e0e0; font-weight: bold; text-align: center; }
      tr { height: 20px; }
      .center { text-align: center; }
    </style></head><body>
    <h2>Datos del Padre, Madre o Tutor</h2>
    <div class="meta-block">
      <span><strong>UNIDAD EDUCATIVA:</strong> ${schoolName.value}</span>
      <span><strong>CURSO:</strong> ${courseName}</span>
      <span><strong>GESTIÓN:</strong> ${year}</span>
    </div>
    <table>
      <thead><tr>
        <th style="width:28px">N°</th>
        <th>ESTUDIANTE</th>
        <th style="width:60px">PADRE O MADRE TUTOR</th>
        <th>NOMBRE Y APELLIDO DEL PADRE</th>
        <th style="width:65px">C.I.</th>
        <th>OCUPACION</th>
        <th style="width:80px">MAYOR GRADO DE INSTRUCCIÓN ALCANZADO</th>
        <th style="width:70px">FECHA DE NACIMIENTO</th>
        <th>DIRECCION</th>
        <th style="width:70px">Nº DE CELULAR ACTUAL</th>
      </tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
    </body></html>
  `)
  win.document.close()
  win.focus()
  win.print()
}
</script>

<template>
  <div class="tutordata-view">
    <div class="page-header">
      <h1 class="page-title">Datos del Padre, Madre o Tutor</h1>
      <div class="header-actions">
        <button @click="saveAll" class="btn btn-primary" :disabled="!selectedCourseId || saving || loading">
          <Save :size="18" />
          {{ saving ? 'Guardando...' : 'Guardar Datos' }}
        </button>
        <button @click="exportToExcel" class="btn btn-outline" :disabled="!selectedCourseId || rows.length === 0">
          <FileDown :size="18" />
          Exportar Excel
        </button>
        <button @click="importInput.click()" class="btn btn-outline" :disabled="!selectedCourseId || importing">
          <Upload :size="18" />
          {{ importing ? 'Importando...' : 'Importar Excel' }}
        </button>
        <input ref="importInput" type="file" accept=".xlsx,.xls" style="display:none" @change="handleImportFile" />
        <button @click="downloadPDF" class="btn btn-outline" :disabled="!selectedCourseId || rows.length === 0">
          <FileDown :size="18" />
          Descargar PDF
        </button>
        <button @click="printTable" class="btn btn-outline" :disabled="!selectedCourseId || rows.length === 0">
          <Printer :size="18" />
          Imprimir
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters-card glass-card">
      <div class="filters-row">
        <div class="form-group">
          <label>Curso</label>
          <select v-model="selectedCourseId" class="input-field" @change="loadStudents">
            <option value="">-- Seleccione un curso --</option>
            <option v-for="c in courses" :key="c.id" :value="c.id.toString()">
              {{ c.level }} "{{ c.parallel }}"
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Unidad Educativa</label>
          <input v-model="schoolName" type="text" class="input-field" placeholder="Nombre del colegio" />
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state glass-card">
      <p>Cargando estudiantes...</p>
    </div>

    <div v-else-if="rows.length > 0" class="table-wrapper glass-card">
      <p class="table-hint">Puedes editar directamente cualquier celda de la tabla antes de imprimir.</p>
      <div class="table-scroll">
        <table class="tutor-table">
          <thead>
            <tr>
              <th style="width:36px">N°</th>
              <th style="min-width:180px">ESTUDIANTE</th>
              <th style="width:85px">PADRE O MADRE TUTOR</th>
              <th style="min-width:180px">NOMBRE Y APELLIDO DEL PADRE</th>
              <th style="width:80px">C.I.</th>
              <th style="min-width:130px">OCUPACIÓN</th>
              <th style="width:110px">MAYOR GRADO DE INSTRUCCIÓN</th>
              <th style="width:105px">FECHA DE NACIMIENTO</th>
              <th style="min-width:150px">DIRECCIÓN</th>
              <th style="width:90px">Nº CELULAR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i" :class="{ 'row-filled': row.fullName }">
              <td class="n-cell">{{ i + 1 }}</td>
              <td><input v-model="row.fullName" type="text" class="cell-input" /></td>
              <td>
                <select v-model="row.tutorRelation" class="cell-input">
                  <option value=""></option>
                  <option value="Padre">Padre</option>
                  <option value="Madre">Madre</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Abuelo/a">Abuelo/a</option>
                </select>
              </td>
              <td><input v-model="row.tutorName" type="text" class="cell-input" /></td>
              <td><input v-model="row.tutorCi" type="text" class="cell-input" /></td>
              <td><input v-model="row.tutorOcupacion" type="text" class="cell-input" /></td>
              <td>
                <select v-model="row.tutorInstruccion" class="cell-input">
                  <option v-for="opt in INSTRUCCION_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
                </select>
              </td>
              <td><input v-model="row.tutorBirthDate" type="date" class="cell-input" /></td>
              <td><input v-model="row.address" type="text" class="cell-input" /></td>
              <td><input v-model="row.phone" type="text" class="cell-input" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else-if="!selectedCourseId" class="empty-hint glass-card">
      <Search :size="40" />
      <p>Selecciona un curso para cargar el cuadro de datos del tutor.</p>
    </div>
  </div>
</template>

<style scoped>
.tutordata-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filters-card {
  padding: 1.25rem;
}

.filters-row {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.filters-row .form-group {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filters-row label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-wrapper {
  padding: 1rem;
  overflow: hidden;
}

.table-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.table-scroll {
  overflow-x: auto;
}

.tutor-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1100px;
}

.tutor-table th {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  font-weight: 700;
  font-size: 0.72rem;
  text-align: center;
  padding: 0.6rem 0.4rem;
  border: 1px solid var(--border);
  line-height: 1.3;
}

.tutor-table td {
  border: 1px solid var(--border);
  padding: 2px 3px;
  height: 30px;
}

.n-cell {
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.cell-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 0.82rem;
  padding: 2px 4px;
  height: 100%;
  box-sizing: border-box;
}

.cell-input:focus {
  background: rgba(99, 102, 241, 0.08);
  border-radius: 4px;
}

select.cell-input {
  background-color: var(--bg-select);
  color: var(--text-main);
  cursor: pointer;
}

select.cell-input option {
  background-color: var(--bg-select);
  color: var(--text-main);
}

.row-filled {
  background: rgba(255, 255, 255, 0.02);
}

.loading-state {
  padding: 3rem;
  text-align: center;
  color: var(--text-muted);
}

.empty-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--text-muted);
  text-align: center;
}
</style>
