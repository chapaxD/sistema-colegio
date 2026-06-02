<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Printer, Save, Search, FileDown, Upload } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'
import * as XLSX from 'xlsx'
import api from '../api'

const authStore = useAuthStore()
const toast = useToast()
const courses = ref([])
const years = ref([])
const selectedCourseId = ref('')
const selectedYearId = ref('')
const schoolName = ref('')
const teacherName = ref('')
const filiacionRows = ref([])
const saving = ref(false)
const loading = ref(false)
const importInput = ref(null)
const importing = ref(false)

const exportToExcel = () => {
  const courseName = selectedCourse.value
    ? `${selectedCourse.value.level} ${selectedCourse.value.parallel}`
    : 'Filiacion'

  const data = filiacionRows.value.map((r, i) => ({
    'N°': i + 1,
    'NOMBRE Y APELLIDO': r.fullName,
    'FECHA NAC.': r.birthDate ? formatDateDisplay(r.birthDate) : '',
    'C.I.': r.ci,
    'TUTOR/PADRE/MADRE': r.tutorRelation,
    'C.I. TUTOR': r.tutorCi,
    'NOMBRE DEL TUTOR': r.tutorName,
    'CELULAR': r.phone,
    'DIRECCIÓN': r.address
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Filiación')
  XLSX.writeFile(wb, `Filiacion_${courseName}.xlsx`)
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
      const rows = XLSX.utils.sheet_to_json(ws)

      let updated = 0
      for (const excelRow of rows) {
        const name = (excelRow['NOMBRE Y APELLIDO'] || '').toString().trim().toLowerCase()
        const match = filiacionRows.value.find(r => r.fullName.toLowerCase() === name)
        if (match) {
          if (excelRow['C.I.'] !== undefined) match.ci = excelRow['C.I.'].toString()
          if (excelRow['TUTOR/PADRE/MADRE'] !== undefined) match.tutorRelation = excelRow['TUTOR/PADRE/MADRE'].toString()
          if (excelRow['C.I. TUTOR'] !== undefined) match.tutorCi = excelRow['C.I. TUTOR'].toString()
          if (excelRow['NOMBRE DEL TUTOR'] !== undefined) match.tutorName = excelRow['NOMBRE DEL TUTOR'].toString()
          if (excelRow['CELULAR'] !== undefined) match.phone = excelRow['CELULAR'].toString()
          if (excelRow['DIRECCIÓN'] !== undefined) match.address = excelRow['DIRECCIÓN'].toString()
          updated++
        }
      }
      if (updated > 0) {
        toast.success(`${updated} estudiante(s) actualizados desde Excel. Presiona "Guardar" para confirmar.`)
      } else {
        toast.warning('No se encontraron coincidencias. Verifica que los nombres estén exactamente igual.')
      }
    } catch {
      toast.error('Error al leer el archivo Excel.')
    }
    importing.value = false
    if (importInput.value) importInput.value.value = ''
  }
  reader.readAsBinaryString(file)
}

const saveAll = async () => {
  const rowsWithStudent = filiacionRows.value.filter(r => r.studentId)
  if (rowsWithStudent.length === 0) {
    toast.warning('No hay estudiantes para guardar.')
    return
  }
  saving.value = true
  let errors = 0
  for (const row of rowsWithStudent) {
    try {
      await api.patch(`/students/${row.studentId}`, {
        ci: row.ci,
        tutorName: row.tutorName,
        tutorCi: row.tutorCi,
        tutorRelation: row.tutorRelation,
        address: row.address,
        phone: row.phone,
        birthDate: row.birthDate || undefined
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

const loadStudents = async () => {
  if (!selectedCourseId.value) return
  loading.value = true
  try {
    const res = await api.get('/students')
    const students = res.data.filter(s =>
      s.isActive && s.enrollments?.some(e => e.courseId.toString() === selectedCourseId.value)
    )
    students.sort((a, b) => a.lastName.localeCompare(b.lastName))

    // Si ya hay filas guardadas, conservar los datos extras; si no, crear desde estudiantes
    filiacionRows.value = students.map((s, i) => ({
      n: i + 1,
      studentId: s.id,
      fullName: `${s.lastName} ${s.firstName}`,
      birthDate: s.birthDate ? formatDateInput(s.birthDate) : '',
      ci: s.ci || '',
      tutorRelation: s.tutorRelation || '',
      tutorCi: s.tutorCi || '',
      tutorName: s.tutorName || '',
      phone: s.phone || '',
      address: s.address || ''
    }))

    // Rellenar hasta 35 filas vacías
    const emptyNeeded = Math.max(0, 35 - filiacionRows.value.length)
    for (let i = 0; i < emptyNeeded; i++) {
      filiacionRows.value.push({
        n: filiacionRows.value.length + 1,
        studentId: null,
        fullName: '',
        birthDate: '',
        ci: '',
        tutorRelation: '',
        tutorCi: '',
        tutorName: '',
        phone: '',
        address: ''
      })
    }
  } catch (err) {
    console.error('Error cargando estudiantes', err)
  }
  loading.value = false
}

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

const printFiliacion = () => {
  const courseName = selectedCourse.value
    ? `${selectedCourse.value.level} "${selectedCourse.value.parallel}"`
    : '___________'
  const year = selectedYear.value?.year || new Date().getFullYear()

  const rows = filiacionRows.value.map((r, i) => `
    <tr>
      <td class="center">${i + 1}</td>
      <td>${r.fullName}</td>
      <td class="center">${formatDateDisplay(r.birthDate)}</td>
      <td class="center">${r.ci}</td>
      <td class="center">${r.tutorRelation}</td>
      <td class="center">${r.tutorCi}</td>
      <td>${r.tutorName}</td>
      <td class="center">${r.phone}</td>
      <td>${r.address}</td>
    </tr>`).join('')

  const win = window.open('', '_blank', 'width=1200,height=850')
  win.document.write(`
    <html><head><title>Cuadro de Filiación</title>
    <style>
      @page { size: landscape; margin: 10mm; }
      body { font-family: Arial, sans-serif; font-size: 10px; margin: 0; }
      h2 { text-align: center; font-size: 13px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; }
      .meta-block { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 8px; }
      .meta-block span { flex: 1; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #000; padding: 3px 4px; text-align: left; font-size: 9.5px; }
      th { background: #e0e0e0; font-weight: bold; text-align: center; }
      tr { height: 20px; }
      .center { text-align: center; }
    </style></head><body>
    <h2>Filiación de los Estudiantes</h2>
    <div class="meta-block">
      <span><strong>UNIDAD EDUCATIVA:</strong> ${schoolName.value}</span>
      <span><strong>CURSO:</strong> ${courseName}</span>
    </div>
    <div class="meta-block">
      <span><strong>PROFESORA/PROFESOR:</strong> ${teacherName.value}</span>
      <span><strong>GESTIÓN:</strong> ${year}</span>
    </div>
    <table>
      <thead><tr>
        <th style="width:28px">N°</th>
        <th>NOMBRE Y APELLIDO</th>
        <th style="width:70px">FECHA NAC.</th>
        <th style="width:65px">C.I.</th>
        <th style="width:65px">TUTOR/<br>PADRE/MADRE</th>
        <th style="width:65px">C.I.<br>TUTOR</th>
        <th>NOMBRE DEL PADRE,<br>MADRE O TUTOR</th>
        <th style="width:65px">CELULAR</th>
        <th>DIRECCIÓN</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </body></html>
  `)
  win.document.close()
  win.focus()
  win.print()
}
</script>

<template>
  <div class="filiacion-view">
    <div class="page-header">
      <h1 class="page-title">Cuadro de Filiación</h1>
      <div class="header-actions">
        <button @click="saveAll" class="btn btn-primary" :disabled="!selectedCourseId || saving || loading">
          <Save :size="18" />
          {{ saving ? 'Guardando...' : 'Guardar Datos' }}
        </button>
        <button @click="exportToExcel" class="btn btn-outline" :disabled="!selectedCourseId || filiacionRows.length === 0">
          <FileDown :size="18" />
          Exportar Excel
        </button>
        <button @click="importInput.click()" class="btn btn-outline" :disabled="!selectedCourseId || importing">
          <Upload :size="18" />
          {{ importing ? 'Importando...' : 'Importar Excel' }}
        </button>
        <input ref="importInput" type="file" accept=".xlsx,.xls" style="display:none" @change="handleImportFile" />
        <button @click="printFiliacion" class="btn btn-outline" :disabled="!selectedCourseId || filiacionRows.length === 0">
          <Printer :size="18" />
          Imprimir / PDF
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
        <div class="form-group">
          <label>Profesor/a</label>
          <input v-model="teacherName" type="text" class="input-field" placeholder="Nombre del docente" />
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state glass-card">
      <p>Cargando estudiantes...</p>
    </div>

    <div v-else-if="filiacionRows.length > 0" class="table-wrapper glass-card">
      <p class="table-hint">Puedes editar directamente cualquier celda de la tabla antes de imprimir.</p>
      <div class="table-scroll">
        <table class="filiacion-table">
          <thead>
            <tr>
              <th style="width:36px">N°</th>
              <th style="min-width:180px">NOMBRE Y APELLIDO</th>
              <th style="width:100px">FECHA NAC.</th>
              <th style="width:90px">C.I.</th>
              <th style="width:90px">TUTOR /<br>PADRE / MADRE</th>
              <th style="width:90px">C.I. TUTOR</th>
              <th style="min-width:180px">NOMBRE DEL PADRE,<br>MADRE O TUTOR</th>
              <th style="width:90px">CELULAR</th>
              <th style="min-width:150px">DIRECCIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in filiacionRows" :key="i" :class="{ 'row-filled': row.fullName }">
              <td class="n-cell">{{ i + 1 }}</td>
              <td><input v-model="row.fullName" type="text" class="cell-input" /></td>
              <td><input v-model="row.birthDate" type="date" class="cell-input" /></td>
              <td><input v-model="row.ci" type="text" class="cell-input" /></td>
              <td>
                <select v-model="row.tutorRelation" class="cell-input">
                  <option value=""></option>
                  <option value="Padre">Padre</option>
                  <option value="Madre">Madre</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Abuelo/a">Abuelo/a</option>
                </select>
              </td>
              <td><input v-model="row.tutorCi" type="text" class="cell-input" /></td>
              <td><input v-model="row.tutorName" type="text" class="cell-input" /></td>
              <td><input v-model="row.phone" type="text" class="cell-input" /></td>
              <td><input v-model="row.address" type="text" class="cell-input" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else-if="!selectedCourseId" class="empty-hint glass-card">
      <Search :size="40" />
      <p>Selecciona un curso para cargar el cuadro de filiación.</p>
    </div>
  </div>
</template>

<style scoped>
.filiacion-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
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

.filiacion-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.filiacion-table th {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  font-weight: 700;
  font-size: 0.72rem;
  text-align: center;
  padding: 0.6rem 0.4rem;
  border: 1px solid var(--border);
  line-height: 1.3;
}

.filiacion-table td {
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
