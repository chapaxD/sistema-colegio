<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useStudentStore } from '../stores/student'
import { Plus, Search, UserPlus, Trash2, Edit3, Loader2, Link, FileUp, RefreshCw } from 'lucide-vue-next'
import api from '../api'
import * as XLSX from 'xlsx'

const studentStore = useStudentStore()
const showModal = ref(false)
const showEnrollModal = ref(false)
const showImportModal = ref(false)
const showInactive = ref(false)
const importCourseId = ref('')
const searchQuery = ref('')
const courses = ref([])
const years = ref([])

const isEditing = ref(false)
const editingId = ref(null)
const selectedStudent = ref(null)
const selectedCourseFilter = ref('')
const enrollmentData = ref({
  courseId: '',
  academicYearId: ''
})

const newStudent = ref({
  rude: '',
  firstName: '',
  lastName: '',
  gender: 'M',
  phone: '',
  birthDate: null
})

onMounted(async () => {
  studentStore.fetchStudents()
  try {
    const [c, y] = await Promise.all([
      api.get('/academic/courses'),
      api.get('/academic/years')
    ])
    courses.value = c.data
    years.value = y.data
  } catch (err) {
    console.error('Error loading academic data')
  }
})

const openModal = (student = null) => {
  if (student) {
    isEditing.value = true
    editingId.value = student.id
    newStudent.value = {
      rude: student.rude,
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender || 'M',
      phone: student.phone || '',
      birthDate: student.birthDate ? student.birthDate.split('T')[0] : ''
    }
  } else {
    isEditing.value = false
    editingId.value = null
    newStudent.value = { rude: '', firstName: '', lastName: '', gender: 'M', phone: '', birthDate: null }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  editingId.value = null
  newStudent.value = { rude: '', firstName: '', lastName: '', gender: 'M', phone: '', birthDate: null }
}

const filteredStudents = computed(() => {
  let list = studentStore.students
  
  if (selectedCourseFilter.value) {
    list = list.filter(s => 
      s.enrollments?.some(e => e.courseId === parseInt(selectedCourseFilter.value))
    )
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(s => 
      s.rude.includes(q) || 
      s.lastName.toLowerCase().includes(q) || 
      s.firstName.toLowerCase().includes(q)
    )
  }
  
  return list.sort((a, b) => a.lastName.localeCompare(b.lastName))
})

const openEnrollModal = (student) => {
  selectedStudent.value = student
  showEnrollModal.value = true
}

const closeEnrollModal = () => {
  showEnrollModal.value = false
  selectedStudent.value = null
  enrollmentData.value = { courseId: '', academicYearId: '' }
}

const saveStudent = async () => {
  let success = false
  
  // Si no hay RUDE, generar uno automático determinista basado en el nombre
  if (!newStudent.value.rude) {
    const clean = (s) => (s || '').toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/gi, "").toUpperCase()
    const genRude = `GEN-${clean(newStudent.value.lastName)}-${clean(newStudent.value.firstName)}`
    newStudent.value.rude = genRude
  }

  // Limpiar campos vacíos antes de enviar
  const payload = { ...newStudent.value }
  if (!payload.birthDate) delete payload.birthDate

  if (isEditing.value) {
    success = await studentStore.updateStudent(editingId.value, payload)
  } else {
    success = await studentStore.addStudent(payload)
  }
  
  if (success) {
    closeModal()
  }
}

const confirmEnroll = async () => {
  try {
    await api.post('/academic/enroll', {
      studentId: selectedStudent.value.id,
      courseId: parseInt(enrollmentData.value.courseId),
      academicYearId: parseInt(enrollmentData.value.academicYearId)
    })
    alert('Operación realizada exitosamente')
    closeEnrollModal()
    studentStore.fetchStudents() // Recargar para ver el curso actualizado
  } catch (err) {
    alert('Error al inscribir estudiante')
  }
}

const confirmDelete = async (id) => {
  if (confirm('¿Estás seguro de eliminar a este estudiante?')) {
    await studentStore.deleteStudent(id)
  }
}

const fileInput = ref(null)

const triggerExcelUpload = () => {
  fileInput.value.click()
}

const handleExcelUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (!importCourseId.value) {
    alert('Por favor seleccione un curso primero')
    event.target.value = null
    return
  }

  const reader = new FileReader()
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(worksheet)

    if (json.length === 0) {
      alert('El archivo está vacío o no tiene el formato correcto.')
      return
    }

    // Mapeo flexible de columnas
    const findKey = (row, keywords) => {
      const keys = Object.keys(row)
      return keys.find(k => keywords.some(kw => k.toUpperCase().includes(kw)))
    }

    const findKeys = (row, keywords) => {
      const keys = Object.keys(row)
      return keys.filter(k => keywords.some(kw => k.toUpperCase().includes(kw)))
    }

    const firstRow = json[0]
    const rudeKey = findKey(firstRow, ['RUDE', 'CODIGO', 'ID'])
    const lastKeys = findKeys(firstRow, ['APELLIDO', 'LASTNAME', 'PATERNO', 'MATERNO'])
    const firstKeys = findKeys(firstRow, ['NOMBRE', 'FIRSTNAME', 'NOMBRES'])

    if (firstKeys.length === 0 || lastKeys.length === 0) {
      alert(`No se pudieron detectar las columnas de nombres. 
Columnas detectadas en el Excel: ${Object.keys(firstRow).join(', ')}
Asegúrese de que el Excel tenga encabezados como "Apellidos" y "Nombres".`)
      studentStore.loading = false
      return
    }

    if (confirm(`Se han detectado ${json.length} estudiantes.\nColumnas detectadas:\n- Apellidos: ${lastKeys.join(', ')}\n- Nombres: ${firstKeys.join(', ')}\n\n¿Desea procesarlos para el curso seleccionado?`)) {
      studentStore.loading = true
      let countNew = 0
      let countExisting = 0
      
      const currentYearId = years.value.length > 0 
        ? [...years.value].sort((a, b) => b.year - a.year)[0]?.id 
        : null

      if (!currentYearId) {
        alert('No hay gestiones académicas registradas.')
        studentStore.loading = false
        return
      }

      let countErrors = 0

      for (let i = 0; i < json.length; i++) {
        const row = json[i]
        let rude = (rudeKey ? (row[rudeKey] || '') : '').toString().trim()
        
        // Unir todos los valores encontrados para apellidos y nombres (para manejar Paterno/Materno separado)
        const lastName = lastKeys.map(k => (row[k] || '').toString().trim()).filter(v => v).join(' ')
        const firstName = firstKeys.map(k => (row[k] || '').toString().trim()).filter(v => v).join(' ')
        
        if (!rude && firstName && lastName) {
          // Generar un RUDE determinista basado en el nombre para evitar duplicados al re-importar
          const clean = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/gi, "").toUpperCase()
          rude = `GEN-${clean(lastName)}-${clean(firstName)}`
        }

        if (rude && firstName && lastName) {
          try {
            const createRes = await api.post('/students', { 
              rude, 
              firstName, 
              lastName
            })
            
            const student = createRes.data
            const studentId = student.id
            
            if (student.isExisting) {
              countExisting++
            } else {
              countNew++
            }            
            await api.post('/academic/enroll', {
              studentId,
              courseId: parseInt(importCourseId.value),
              academicYearId: currentYearId
            })
            
          } catch (err) {
            console.error('Error al procesar fila:', row, err)
            countErrors++
          }
        }
      }
      
      const importedCourse = importCourseId.value
      alert(`Proceso completado.\n- Nuevos: ${countNew}\n- Ya existentes: ${countExisting}\n- Errores: ${countErrors}\nLos estudiantes han sido procesados e inscritos.`)
      
      showImportModal.value = false
      importCourseId.value = ''
      // Cambiar el filtro al curso importado para que el usuario vea los resultados
      selectedCourseFilter.value = importedCourse
      studentStore.fetchStudents(showInactive.value)
    }
    studentStore.loading = false
  }
  reader.readAsArrayBuffer(file)
  event.target.value = null
}

const downloadTemplate = () => {
  const data = [
    { RUDE: '(Opcional)', APELLIDOS: 'Perez Gomez', NOMBRES: 'Juan Alberto' },
    { RUDE: '', APELLIDOS: 'Rojas Mamani', NOMBRES: 'Maria Elena' }
  ]
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Estudiantes")
  XLSX.writeFile(wb, "Plantilla_Estudiantes.xlsx")
}

watch(showInactive, (newVal) => {
  studentStore.fetchStudents(newVal)
})

const reactivateStudent = async (id) => {
  if (confirm('¿Desea reactivar a este estudiante?')) {
    await studentStore.updateStudent(id, { isActive: true })
    studentStore.fetchStudents(showInactive.value)
  }
}
</script>

<template>
  <div class="students-view">
    <div class="page-header">
      <h1 class="page-title">Gestión de Estudiantes</h1>
      <div class="header-actions">
        <input 
          type="file" 
          ref="fileInput" 
          style="display: none" 
          accept=".xlsx, .xls" 
          @change="handleExcelUpload" 
        />
        <button @click="showImportModal = true" class="btn btn-outline" :disabled="studentStore.loading">
          <FileUp :size="20" />
          Importar por Curso
        </button>
        <div class="inactive-toggle">
          <input type="checkbox" v-model="showInactive" id="show-inactive" />
          <label for="show-inactive">Ver alumnos dados de baja</label>
        </div>
        <button @click="openModal()" class="btn btn-primary" :disabled="studentStore.loading">
          <UserPlus :size="20" />
          Registrar Estudiante
        </button>
      </div>
    </div>
    <div class="actions-bar glass-card">
      <div class="search-wrapper">
        <Search class="search-icon" :size="18" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por RUDE o nombre..."
          class="input-field"
        />
      </div>

      <div class="filter-group">
        <label class="sr-only">Filtrar por Curso</label>
        <select v-model="selectedCourseFilter" class="input-field course-filter">
          <option value="">Todos los Cursos</option>
          <option v-for="c in courses" :key="c.id" :value="c.id">
            {{ c.level }} - {{ c.parallel }}
          </option>
        </select>
      </div>
    </div>

    <div class="table-container glass-card">
      <div v-if="studentStore.loading" class="loading-state">
        <Loader2 class="animate-spin" :size="40" />
        <p>Cargando lista de estudiantes...</p>
      </div>

      <table v-else class="data-table">
        <thead>
          <tr>
            <th>RUDE</th>
            <th>Apellidos</th>
            <th>Nombres</th>
            <th>Curso</th>
            <th>Fecha Nac.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.id">
            <td class="font-bold">{{ student.rude }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.firstName }}</td>
            <td>
              <div v-if="!student.isActive" class="badge danger">INACTIVO</div>
              <div v-else-if="student.enrollments?.length" class="badge success">
                {{ student.enrollments[0].course.level }} - {{ student.enrollments[0].course.parallel }}
              </div>
              <span v-else class="badge gray">No inscrito</span>
            </td>
            <td>{{ student.birthDate ? new Date(student.birthDate).toLocaleDateString() : 'N/A' }}</td>
            <td class="actions-cell">
              <template v-if="student.isActive">
                <button @click="openEnrollModal(student)" class="action-btn enroll" :title="student.enrollments?.length ? 'Cambiar de Curso' : 'Inscribir en Curso'">
                  <RefreshCw v-if="student.enrollments?.length" :size="18" />
                  <Link v-else :size="18" />
                </button>
                <button @click="openModal(student)" class="action-btn edit" title="Editar">
                  <Edit3 :size="18" />
                </button>
                <button @click="confirmDelete(student.id)" class="action-btn delete" title="Dar de Baja">
                  <Trash2 :size="18" />
                </button>
              </template>
              <template v-else>
                <button @click="reactivateStudent(student.id)" class="action-btn enroll" title="Reactivar">
                  <Plus :size="18" />
                </button>
              </template>
            </td>
          </tr>
          <tr v-if="studentStore.students.length === 0">
            <td colspan="5" class="empty-state">No hay estudiantes registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Registro -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content glass-card">
        <h2 class="modal-title">{{ isEditing ? 'Editar Estudiante' : 'Registrar Estudiante' }}</h2>
        <form @submit.prevent="saveStudent" class="student-form">
          <div class="form-group">
            <label>RUDE (Opcional)</label>
            <input v-model="newStudent.rude" type="text" class="input-field" placeholder="Dejar vacío para generar uno" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Apellidos</label>
              <input v-model="newStudent.lastName" type="text" class="input-field" required />
            </div>
            <div class="form-group">
              <label>Nombres</label>
              <input v-model="newStudent.firstName" type="text" class="input-field" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Género</label>
              <select v-model="newStudent.gender" class="input-field" required>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div class="form-group">
              <label>Celular / Teléfono</label>
              <input v-model="newStudent.phone" type="text" class="input-field" placeholder="70000000" />
            </div>
          </div>
          <div class="form-group">
            <label>Fecha de Nacimiento</label>
            <input v-model="newStudent.birthDate" type="date" class="input-field" />
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Actualizar' : 'Guardar' }} Estudiante</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Inscripción -->
    <div v-if="showEnrollModal" class="modal-overlay">
      <div class="modal-content glass-card">
        <h2 class="modal-title">Inscribir Estudiante</h2>
        <p class="mb-4">Estudiante: <strong>{{ selectedStudent?.lastName }} {{ selectedStudent?.firstName }}</strong></p>
        <form @submit.prevent="confirmEnroll" class="student-form">
          <div class="form-group">
            <label>Seleccionar Curso</label>
            <select v-model="enrollmentData.courseId" class="input-field" required>
              <option value="">Seleccione un curso</option>
              <option v-for="c in courses" :key="c.id" :value="c.id">
                {{ c.level }} - {{ c.parallel }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Seleccionar Gestión</label>
            <select v-model="enrollmentData.academicYearId" class="input-field" required>
              <option value="">Seleccione una gestión</option>
              <option v-for="y in years" :key="y.id" :value="y.id">
                {{ y.year }}
              </option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeEnrollModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Inscribir Alumno</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Importación -->
    <div v-if="showImportModal" class="modal-overlay">
      <div class="modal-content glass-card">
        <h2 class="modal-title">Importar Estudiantes desde Excel</h2>
        <div class="student-form">
          <div class="form-group">
            <label>1. Seleccionar Curso de Destino</label>
            <select v-model="importCourseId" class="input-field" required>
              <option value="">Seleccione un curso</option>
              <option v-for="c in courses" :key="c.id" :value="c.id">
                {{ c.level }} - {{ c.parallel }}
              </option>
            </select>
          </div>
          <div class="form-group" v-if="importCourseId">
            <label>2. Cargar Archivo (.xlsx)</label>
            <input 
              type="file" 
              class="input-field" 
              accept=".xlsx, .xls" 
              @change="handleExcelUpload" 
            />
            <p class="text-xs mt-2 text-muted">Columnas necesarias: NOMBRES, APELLIDOS. (RUDE es opcional)</p>
          </div>
          <div class="modal-actions">
            <button type="button" @click="downloadTemplate" class="btn btn-outline info">
              <FileUp :size="16" />
              Descargar Plantilla
            </button>
            <button type="button" @click="showImportModal = false" class="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.students-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.inactive-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0 0.5rem;
}

.inactive-toggle input {
  cursor: pointer;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.actions-bar {
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.course-filter {
  min-width: 200px;
}

.table-container {
  padding: 1rem;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 1rem;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.font-bold { font-weight: 600; color: var(--primary); }

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
}

.action-btn.edit:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }
.action-btn.delete:hover { color: var(--danger); background: rgba(239, 68, 68, 0.1); }

.loading-state, .empty-state {
  padding: 4rem;
  text-align: center;
  color: var(--text-muted);
}

.animate-spin {
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
}

.modal-title {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.student-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
}

.mb-4 { margin-bottom: 1rem; }

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.success { background: rgba(16, 185, 129, 0.1); color: var(--success); }
.badge.gray { background: rgba(148, 163, 184, 0.1); color: var(--text-muted); }

.action-btn.enroll:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }
</style>
