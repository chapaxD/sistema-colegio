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
  birthDate: null,
  courseId: '',
  academicYearId: ''
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
    if (years.value.length > 0) {
      newStudent.value.academicYearId = years.value[0].id
    }
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
    newStudent.value = { 
      rude: '', 
      firstName: '', 
      lastName: '', 
      gender: 'M', 
      phone: '', 
      birthDate: null,
      courseId: '',
      academicYearId: years.value[0]?.id || ''
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  editingId.value = null
  newStudent.value = { rude: '', firstName: '', lastName: '', gender: 'M', phone: '', birthDate: null }
}

const groupedStudents = computed(() => {
  const groups = {}
  
  // 1. Filtrar primero por búsqueda y estado inactivo
  let list = studentStore.students
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(s => 
      s.rude.includes(q) || 
      s.lastName.toLowerCase().includes(q) || 
      s.firstName.toLowerCase().includes(q)
    )
  }

  // 2. Si hay un filtro de curso activo, solo mostramos ese grupo
  if (selectedCourseFilter.value) {
    if (selectedCourseFilter.value === 'UNENROLLED') {
      const unenrolled = list.filter(s => !s.enrollments || s.enrollments.length === 0)
      return { 'Pendientes / Reservas': unenrolled.sort((a, b) => a.lastName.localeCompare(b.lastName)) }
    }
    
    const courseId = parseInt(selectedCourseFilter.value)
    const course = courses.value.find(c => c.id === courseId)
    const courseName = course ? `${course.level} ${course.parallel}` : 'Curso Seleccionado'
    const studentsInCourse = list.filter(s => s.enrollments?.some(e => e.courseId === courseId))
    return { [courseName]: studentsInCourse.sort((a, b) => a.lastName.localeCompare(b.lastName)) }
  }

  // 3. Si no hay filtro, agrupar todos
  list.forEach(student => {
    let groupName = 'Sin Inscripción'
    if (student.enrollments?.length > 0) {
      const mainEnroll = student.enrollments[0]
      groupName = `${mainEnroll.course.level} ${mainEnroll.course.parallel}`
    }
    
    if (!groups[groupName]) groups[groupName] = []
    groups[groupName].push(student)
  })

  // Ordenar estudiantes dentro de cada grupo y ordenar los nombres de los grupos
  const sortedGroups = {}
  Object.keys(groups).sort().forEach(key => {
    sortedGroups[key] = groups[key].sort((a, b) => a.lastName.localeCompare(b.lastName))
  })
  
  return sortedGroups
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
    const genderKey = findKey(firstRow, ['GENERO', 'SEXO', 'GENDER'])
    const phoneKey = findKey(firstRow, ['CELULAR', 'TELEFONO', 'PHONE', 'CONTACTO'])

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
            const gender = (genderKey ? (row[genderKey] || 'M') : 'M').toString().toUpperCase().charAt(0)
            const phone = (phoneKey ? (row[phoneKey] || '') : '').toString().trim()

            const createRes = await api.post('/students', { 
              rude, 
              firstName, 
              lastName,
              gender: ['M', 'F'].includes(gender) ? gender : 'M',
              phone
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
    { RUDE: '(Opcional)', APELLIDOS: 'Perez Gomez', NOMBRES: 'Juan Alberto', GENERO: 'M', CELULAR: '70000000' },
    { RUDE: '', APELLIDOS: 'Rojas Mamani', NOMBRES: 'Maria Elena', GENERO: 'F', CELULAR: '60000000' }
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

      <div class="course-buttons-nav">
        <button 
          @click="selectedCourseFilter = ''" 
          class="nav-btn" 
          :class="{ active: selectedCourseFilter === '' }"
        >
          Todos
        </button>
        <button 
          @click="selectedCourseFilter = 'UNENROLLED'" 
          class="nav-btn orange" 
          :class="{ active: selectedCourseFilter === 'UNENROLLED' }"
        >
          Pendientes / Reservas
        </button>
        <button 
          v-for="c in courses" 
          :key="c.id" 
          @click="selectedCourseFilter = c.id.toString()" 
          class="nav-btn"
          :class="{ active: selectedCourseFilter === c.id.toString() }"
        >
          {{ c.level }} {{ c.parallel }}
        </button>
      </div>
    </div>

    <div class="table-container glass-card">
      <div v-if="studentStore.loading" class="loading-state">
        <Loader2 class="animate-spin" :size="40" />
        <p>Cargando lista de estudiantes...</p>
      </div>

      <div v-else>
        <div v-for="(students, courseName) in groupedStudents" :key="courseName" class="course-group-section">
          <div class="course-header-banner">
            <Layers :size="18" />
            <span>{{ courseName }}</span>
            <span class="count-badge">{{ students.length }} Alumnos</span>
          </div>
          
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 150px;">RUDE</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th style="width: 80px;" class="text-center">Género</th>
                <th style="width: 120px;">Celular</th>
                <th style="width: 150px;">Fecha Nac.</th>
                <th style="width: 120px;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students" :key="student.id">
                <td class="font-bold">{{ student.rude }}</td>
                <td>{{ student.lastName }}</td>
                <td>{{ student.firstName }}</td>
                <td class="text-center">
                  <span class="badge-mini" :class="student.gender === 'M' ? 'blue' : 'pink'">
                    {{ student.gender }}
                  </span>
                </td>
                <td>{{ student.phone || '-' }}</td>
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
            </tbody>
          </table>
        </div>

        <div v-if="Object.keys(groupedStudents).length === 0" class="empty-state-container">
          <div class="empty-state glass-card">
            <Search :size="48" />
            <p>No se encontraron estudiantes con los filtros actuales.</p>
          </div>
        </div>
      </div>
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

          <div class="form-section-divider" v-if="!isEditing"></div>
          
          <div class="form-group" v-if="!isEditing">
            <label>Inscribir directamente en (Opcional)</label>
            <select v-model="newStudent.courseId" class="input-field highlight">
              <option value="">-- No inscribir aún --</option>
              <option v-for="c in courses" :key="c.id" :value="c.id">
                {{ c.level }} "{{ c.parallel }}"
              </option>
            </select>
            <p class="input-hint">El estudiante será inscrito automáticamente en la gestión {{ years[0]?.year }}</p>
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
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.course-buttons-nav {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
}

.course-buttons-nav::-webkit-scrollbar {
  height: 4px;
}

.course-buttons-nav::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}

.nav-btn {
  white-space: nowrap;
  padding: 0.6rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: rgba(99, 102, 241, 0.08);
  color: var(--primary);
  border-color: var(--primary);
}

.nav-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.nav-btn.orange:hover {
  color: #f59e0b;
  border-color: #f59e0b;
}

.nav-btn.orange.active {
  background: #f59e0b;
  color: white;
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 400px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
  pointer-events: none;
  opacity: 0.6;
}

.search-wrapper .input-field {
  padding-left: 2.8rem;
  width: 100%;
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

.badge-mini {
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 800;
}
.badge-mini.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.badge-mini.pink { background: rgba(ec, 72, 153, 0.1); color: #ec4899; }

.form-section-divider {
  height: 1px;
  background: var(--border);
  margin: 1.5rem 0;
  opacity: 0.5;
}

.input-field.highlight {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.05);
}

.input-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.4rem;
}

.text-center { text-align: center; }

.course-group-section {
  margin-bottom: 2rem;
}

.course-header-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(99, 102, 241, 0.1);
  border-left: 4px solid var(--primary);
  border-radius: 0 0.75rem 0.75rem 0;
  margin-bottom: 1rem;
  color: var(--primary);
  font-weight: 700;
  font-size: 1.1rem;
}

.count-badge {
  margin-left: auto;
  font-size: 0.8rem;
  background: var(--primary);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
}

.empty-state-container {
  padding: 4rem;
  display: flex;
  justify-content: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--text-muted);
  width: 100%;
  max-width: 400px;
}

.action-btn.enroll:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }
</style>
