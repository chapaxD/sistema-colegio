<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'
import { useAuthStore } from '../stores/auth'
import { Book, Layers, Plus, Save, Trash2, Calendar, Clock, GripVertical, Users, User, ArrowUpRight } from 'lucide-vue-next'

const authStore = useAuthStore()

const courses = ref([])
const subjects = ref([])
const years = ref([])
const events = ref([])
const teachers = ref([])
const assignments = ref([])
const activeTab = ref(authStore.user?.role === 'TEACHER' ? 'profile' : 'courses')

const newCourse = ref({ level: '', parallel: '' })
const newSubject = ref({ name: '' })
const newYear = ref({ year: new Date().getFullYear() })
const newEvent = ref({ title: '', date: '', description: '' })
const newAssignment = ref({ teacherId: '', subjectId: '', courseId: '', academicYearId: '' })
const assignToAll = ref(false)
const editingItem = ref(null) // { type: 'course'|'subject', id, data }
const teacherProfile = ref({ firstName: '', lastName: '' })
const promotionData = ref({ sourceCourseId: '', sourceYearId: '', targetCourseId: '', targetYearId: '' })
const promoting = ref(false)
const passwordData = ref({ newPassword: '', confirmPassword: '' })
const changingPassword = ref(false)

const schoolSettings = ref({
  schoolName: '',
  directorName: '',
  level: '',
  year: ''
})

onMounted(async () => {
  if (authStore.user?.role === 'TEACHER') {
    activeTab.value = 'profile'
  }
  fetchData()
})

const fetchData = async () => {
  try {
    const [c, s, y, e, t, asg] = await Promise.all([
      api.get('/academic/courses'),
      api.get('/academic/subjects'),
      api.get('/academic/years'),
      api.get('/academic/events'),
      api.get('/academic/teachers'),
      api.get('/academic/assignments')
    ])
    courses.value = c.data
    subjects.value = s.data
    years.value = y.data
    events.value = e.data
    teachers.value = t.data
    assignments.value = asg.data

    if (years.value.length > 0) {
      newAssignment.value.academicYearId = years.value[0].id
    }

    // Cargar datos de la escuela
    const schoolRes = await api.get('/schools/my')
    if (schoolRes.data) {
      schoolSettings.value = {
        schoolName: schoolRes.data.name,
        directorName: schoolRes.data.directorName,
        level: schoolRes.data.educationalLevel,
        year: '2026' // TODO: Get from active year
      }
    }

    // Load teacher profile
    try {
      const profile = await api.get('/academic/teachers/me')
      if (profile.data) {
        teacherProfile.value = profile.data
      }
    } catch (err) {
      console.error('Error fetching teacher profile', err)
    }
  } catch (err) {
    console.error('Error fetching academic data')
  }
}

const addAssignment = async () => {
  if (!newAssignment.value.teacherId || !newAssignment.value.subjectId || (!newAssignment.value.courseId && !assignToAll.value) || !newAssignment.value.academicYearId) {
    alert('Complete todos los campos de la asignación (incluyendo la gestión)')
    return
  }

  try {
    const payload = assignToAll.value ? {
      teacherId: parseInt(newAssignment.value.teacherId),
      subjectId: parseInt(newAssignment.value.subjectId),
      courseIds: courses.value.map(c => c.id),
      academicYearId: parseInt(newAssignment.value.academicYearId)
    } : {
      ...newAssignment.value,
      teacherId: parseInt(newAssignment.value.teacherId),
      subjectId: parseInt(newAssignment.value.subjectId),
      courseId: parseInt(newAssignment.value.courseId),
      academicYearId: parseInt(newAssignment.value.academicYearId)
    }

    console.log('Sending assignment payload:', payload)

    if (assignToAll.value) {
      await api.post('/academic/assignments/batch', payload)
    } else {
      await api.post('/academic/assignments', payload)
    }

    fetchData()
    assignToAll.value = false
  } catch (err) {
    console.error('Error in addAssignment:', err)
    const msg = err.response?.data?.message || 'Error al crear asignación'
    alert(msg)
  }
}

const deleteAssignment = async (id) => {
  if (confirm('¿Eliminar esta asignación?')) {
    await api.delete(`/academic/assignments/${id}`)
    fetchData()
  }
}

const addCourse = async () => {
  await api.post('/academic/courses', newCourse.value)
  newCourse.value = { level: '', parallel: '' }
  fetchData()
}

const addSubject = async () => {
  await api.post('/academic/subjects', newSubject.value)
  newSubject.value = { name: '' }
  fetchData()
}

const addYear = async () => {
  await api.post('/academic/years', newYear.value)
  fetchData()
}

const addEvent = async () => {
  await api.post('/academic/events', newEvent.value)
  newEvent.value = { title: '', date: '', description: '' }
  fetchData()
}

const deleteEvent = async (id) => {
  if (confirm('¿Eliminar este evento?')) {
    await api.delete(`/academic/events/${id}`)
    fetchData()
  }
}

const deleteCourse = async (course) => {
  if (confirm(`¿Está totalmente seguro de eliminar el curso "${course.level} ${course.parallel}"? Se perderán las inscripciones y registros vinculados.`)) {
    try {
      await api.delete(`/academic/courses/${course.id}`)
      fetchData()
    } catch (err) {
      alert('No se pudo eliminar el curso. Verifique que no tenga alumnos inscritos.')
    }
  }
}

const deleteSubject = async (subject) => {
  if (confirm(`¿Está seguro de eliminar la materia "${subject.name}"?`)) {
    try {
      await api.delete(`/academic/subjects/${subject.id}`)
      fetchData()
    } catch (err) {
      alert('No se pudo eliminar la materia. Verifique que no tenga notas registradas.')
    }
  }
}

const startEdit = (type, item) => {
  editingItem.value = { type, id: item.id, data: { ...item } }
}

const saveEdit = async () => {
  const { type, id, data } = editingItem.value
  try {
    if (type === 'course') {
      const { level, parallel } = data
      await api.post(`/academic/courses/${id}`, { level, parallel })
    } else {
      const { name } = data
      await api.post(`/academic/subjects/${id}`, { name })
    }
    editingItem.value = null
    fetchData()
  } catch (err) {
    alert('Error al actualizar')
  }
}


// Drag-to-reorder subjects
const dragIndex = ref(null)
const savingOrder = ref(false)

const onDragStart = (index) => {
  dragIndex.value = index
}

const onDrop = (targetIndex) => {
  if (dragIndex.value === null || dragIndex.value === targetIndex) return
  const arr = [...subjects.value]
  const [moved] = arr.splice(dragIndex.value, 1)
  arr.splice(targetIndex, 0, moved)
  subjects.value = arr
  dragIndex.value = null
}

const saveSubjectOrder = async () => {
  savingOrder.value = true
  try {
    await api.post('/academic/subjects/reorder', {
      orderedIds: subjects.value.map(s => s.id)
    })
    alert('Orden guardado correctamente')
  } catch (err) {
    alert('Error al guardar el orden')
  } finally {
    savingOrder.value = false
  }
}

const updateProfile = async () => {
  try {
    await api.patch('/academic/teachers/me', teacherProfile.value)
    alert('Perfil actualizado')
  } catch (err) {
    alert('Error al actualizar perfil')
  }
}

const executePromotion = async () => {
  if (!promotionData.value.sourceCourseId || !promotionData.value.sourceYearId || !promotionData.value.targetCourseId || !promotionData.value.targetYearId) {
    alert('Por favor complete todos los campos de promoción')
    return
  }

  if (promotionData.value.sourceCourseId === promotionData.value.targetCourseId && promotionData.value.sourceYearId === promotionData.value.targetYearId) {
    alert('El curso y gestión de origen no pueden ser iguales al destino')
    return
  }

  promoting.value = true
  try {
    const res = await api.post('/academic/promote', {
      sourceCourseId: parseInt(promotionData.value.sourceCourseId),
      sourceYearId: parseInt(promotionData.value.sourceYearId),
      targetCourseId: parseInt(promotionData.value.targetCourseId),
      targetYearId: parseInt(promotionData.value.targetYearId)
    })
    alert(`Promoción exitosa: ${res.data.count} estudiantes inscritos en el nuevo curso.`)
    promotionData.value = { sourceCourseId: '', sourceYearId: '', targetCourseId: '', targetYearId: '' }
  } catch (err) {
    const msg = err.response?.data?.message || 'Error al realizar la promoción'
    alert(msg)
  } finally {
    promoting.value = false
  }
}

const changePassword = async () => {
  if (!passwordData.value.newPassword || passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    alert('Las contraseñas no coinciden o están vacías')
    return
  }

  changingPassword.value = true
  try {
    await api.patch('/auth/change-password', { password: passwordData.value.newPassword })
    alert('Contraseña actualizada correctamente')
    passwordData.value = { newPassword: '', confirmPassword: '' }
  } catch (err) {
    alert('Error al cambiar la contraseña')
  } finally {
    changingPassword.value = false
  }
}
</script>

<template>
  <div class="academic-view">
    <h1 class="page-title">Configuración Académica</h1>

    <div class="tabs-nav glass-card">
      <button @click="activeTab = 'courses'" :class="{ active: activeTab === 'courses' }">
        <Layers :size="18" /> Cursos
      </button>
      <button @click="activeTab = 'subjects'" :class="{ active: activeTab === 'subjects' }">
        <Book :size="18" /> Materias
      </button>
      <button @click="activeTab = 'assignments'" :class="{ active: activeTab === 'assignments' }"
        v-if="authStore.user?.role === 'ADMIN'">
        <Users :size="18" /> Asignaciones
      </button>
      <button @click="activeTab = 'years'" :class="{ active: activeTab === 'years' }"
        v-if="authStore.user?.role === 'ADMIN'">
        <Calendar :size="18" /> Gestiones
      </button>
      <button @click="activeTab = 'promotion'" :class="{ active: activeTab === 'promotion' }"
        v-if="authStore.user?.role === 'ADMIN'">
        <ArrowUpRight :size="18" /> Promoción
      </button>

      <button @click="activeTab = 'profile'" :class="{ active: activeTab === 'profile' }">
        <User :size="18" /> Mis Datos
      </button>

      <button @click="activeTab = 'events'" :class="{ active: activeTab === 'events' }">
        <Clock :size="18" /> Calendario
      </button>

    </div>

    <div class="tab-content">
      <!-- Cursos -->
      <div v-if="activeTab === 'courses'" class="grid-layout">
        <div class="form-section glass-card" v-if="authStore.user?.role === 'ADMIN'">
          <h3>Nuevo Curso</h3>
          <form @submit.prevent="addCourse" class="academic-form">
            <div class="form-group">
              <label>Grado / Nivel</label>
              <input v-model="newCourse.level" type="text" placeholder="Ej: 1ro de Primaria" class="input-field"
                required />
            </div>
            <div class="form-group">
              <label>Paralelo</label>
              <input v-model="newCourse.parallel" type="text" placeholder="Ej: A" class="input-field" required />
            </div>
            <button type="submit" class="btn btn-primary">
              <Plus :size="18" /> Agregar Curso
            </button>
          </form>
        </div>
        <div class="list-section glass-card">
          <h3>Cursos Registrados</h3>
          <div class="items-list">
            <div v-for="c in courses" :key="c.id" class="item-card">
              <div class="item-info" @click="authStore.user?.role === 'ADMIN' ? startEdit('course', c) : null">
                <strong>{{ c.level }}</strong>
                <span>Paralelo: {{ c.parallel }}</span>
              </div>
              <button v-if="authStore.user?.role === 'ADMIN'" @click="deleteCourse(c)" class="btn-icon delete">
                <Trash2 :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Materias -->
      <div v-if="activeTab === 'subjects'" class="grid-layout">
        <div class="form-section glass-card" v-if="authStore.user?.role === 'ADMIN'">
          <h3>Nueva Materia</h3>
          <form @submit.prevent="addSubject" class="academic-form">
            <div class="form-group">
              <label>Nombre de la Materia</label>
              <input v-model="newSubject.name" type="text" placeholder="Ej: Matemáticas" class="input-field" required />
            </div>
            <button type="submit" class="btn btn-primary">
              <Plus :size="18" /> Agregar Materia
            </button>
          </form>
        </div>
        <div class="list-section glass-card">
          <div class="list-header">
            <h3>Materias Registradas</h3>
            <button v-if="authStore.user?.role === 'ADMIN'" @click="saveSubjectOrder" class="btn btn-primary sm"
              :disabled="savingOrder">
              <Save :size="16" /> {{ savingOrder ? 'Guardando...' : 'Guardar Orden' }}
            </button>
          </div>
          <p class="drag-hint" v-if="authStore.user?.role === 'ADMIN'">Arrastra las materias para cambiar su orden</p>
          <div class="items-list">
            <div v-for="(s, index) in subjects" :key="s.id" class="item-card draggable" draggable="true"
              @dragstart="onDragStart(index)" @dragover.prevent @drop="onDrop(index)"
              :class="{ 'drag-over': dragIndex === index }">
              <div class="drag-handle" v-if="authStore.user?.role === 'ADMIN'">
                <GripVertical :size="18" />
              </div>
              <span class="subject-name" @click="authStore.user?.role === 'ADMIN' ? startEdit('subject', s) : null">{{
                s.name }}</span>
              <button v-if="authStore.user?.role === 'ADMIN'" @click="deleteSubject(s)" class="btn-icon delete">
                <Trash2 :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Asignaciones -->
      <div v-if="activeTab === 'assignments'" class="grid-layout">
        <div class="form-section glass-card">
          <h3>Nueva Asignación</h3>
          <p class="section-desc">Vincule un docente con una materia y curso específico.</p>
          <form @submit.prevent="addAssignment" class="academic-form">
            <div class="form-group">
              <label>Docente</label>
              <select v-model="newAssignment.teacherId" class="input-field" required>
                <option value="">Seleccione Docente</option>
                <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.lastName }} {{ t.firstName }}</option>
              </select>
            </div>
            <div class="form-group" v-if="!assignToAll">
              <label>Curso</label>
              <select v-model="newAssignment.courseId" class="input-field" :required="!assignToAll">
                <option value="">Seleccione Curso</option>
                <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} "{{ c.parallel }}"</option>
              </select>
            </div>
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="assignToAll" />
                <span>Asignar a todos los cursos</span>
              </label>
            </div>
            <div class="form-group">
              <label>Materia</label>
              <select v-model="newAssignment.subjectId" class="input-field" required>
                <option value="">Seleccione Materia</option>
                <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Gestión</label>
              <select v-model="newAssignment.academicYearId" class="input-field" required>
                <option v-for="y in years" :key="y.id" :value="y.id">{{ y.year }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              <Plus :size="18" /> Crear Asignación
            </button>
          </form>
        </div>
        <div class="list-section glass-card">
          <h3>Docentes Asignados</h3>
          <div class="items-list">
            <div v-for="asg in assignments" :key="asg.id" class="item-card asg-card">
              <div class="item-info">
                <strong>{{ asg.teacher.lastName }} {{ asg.teacher.firstName }}</strong>
                <div class="asg-details">
                  <span class="badge course">{{ asg.course.level }} {{ asg.course.parallel }}</span>
                  <span class="badge subject">{{ asg.subject.name }}</span>
                </div>
              </div>
              <button @click="deleteAssignment(asg.id)" class="btn-icon delete">
                <Trash2 :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Gestiones -->
      <div v-if="activeTab === 'years'" class="grid-layout">
        <div class="form-section glass-card">
          <h3>Nueva Gestión Anual</h3>
          <form @submit.prevent="addYear" class="academic-form">
            <div class="form-group">
              <label>Año</label>
              <input v-model.number="newYear.year" type="number" class="input-field" required />
            </div>
            <button type="submit" class="btn btn-primary">
              <Plus :size="18" /> Iniciar Gestión
            </button>
          </form>
        </div>
        <div class="list-section glass-card">
          <h3>Años Registrados</h3>
          <div class="items-list">
            <div v-for="y in years" :key="y.id" class="item-card">
              <span>Gestión {{ y.year }}</span>
              <span class="badge success">Activo</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Promoción -->
      <div v-if="activeTab === 'promotion'" class="grid-layout">
        <div class="form-section glass-card full-width">
          <h3>Promoción Masiva de Estudiantes</h3>
          <p class="section-desc">Esta herramienta permite inscribir a todos los estudiantes de un curso directamente al
            curso siguiente para la nueva gestión.</p>

          <div class="promotion-grid">
            <div class="promotion-column">
              <h4>
                <div class="step-badge">1</div> Origen (Actual)
              </h4>
              <div class="form-group">
                <label>Gestión de Origen</label>
                <select v-model="promotionData.sourceYearId" class="input-field">
                  <option value="">Seleccione Gestión</option>
                  <option v-for="y in years" :key="y.id" :value="y.id">{{ y.year }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Curso de Origen</label>
                <select v-model="promotionData.sourceCourseId" class="input-field">
                  <option value="">Seleccione Curso</option>
                  <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} "{{ c.parallel }}"</option>
                </select>
              </div>
            </div>

            <div class="promotion-divider">
              <ArrowUpRight :size="32" />
            </div>

            <div class="promotion-column">
              <h4>
                <div class="step-badge">2</div> Destino (Próximo)
              </h4>
              <div class="form-group">
                <label>Gestión de Destino</label>
                <select v-model="promotionData.targetYearId" class="input-field">
                  <option value="">Seleccione Gestión</option>
                  <option v-for="y in years" :key="y.id" :value="y.id">{{ y.year }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Curso de Destino</label>
                <select v-model="promotionData.targetCourseId" class="input-field">
                  <option value="">Seleccione Curso</option>
                  <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} "{{ c.parallel }}"</option>
                </select>
              </div>
            </div>
          </div>

          <div class="promotion-actions">
            <div class="warning-box">
              <strong>Atención:</strong> Se crearán nuevas inscripciones para todos los estudiantes del curso de origen
              en el curso de destino. No se duplicarán si ya existen.
            </div>
            <button @click="executePromotion" class="btn btn-primary lg" :disabled="promoting">
              <Loader2 v-if="promoting" class="animate-spin" :size="20" />
              <ArrowUpRight v-else :size="20" />
              Ejecutar Promoción de Estudiantes
            </button>
          </div>
        </div>
      </div>

      <!-- Perfil Usuario -->
      <div v-if="activeTab === 'profile'" class="grid-layout">
        <div class="form-section glass-card">
          <h3>{{ authStore.user?.role === 'ADMIN' ? 'Perfil del Administrador' : 'Mis Datos Profesionales' }}</h3>
          <p class="section-desc">
            {{ authStore.user?.role === 'ADMIN' 
               ? 'Gestione su información de identidad y firma institucional.' 
               : 'Actualice su información personal que aparecerá en los boletines.' }}
          </p>
          <form @submit.prevent="updateProfile" class="academic-form">
            <div class="form-group">
              <label>Nombres</label>
              <input v-model="teacherProfile.firstName" type="text" class="input-field" required />
            </div>
            <div class="form-group">
              <label>Apellidos</label>
              <input v-model="teacherProfile.lastName" type="text" class="input-field" required />
            </div>
            <button type="submit" class="btn btn-primary">
              <Save :size="18" /> Guardar Perfil
            </button>
          </form>
        </div>
        <div class="list-section glass-card">
          <h3>Seguridad de la Cuenta</h3>
          <p class="section-desc">Cambie su contraseña de acceso al sistema.</p>
          <form @submit.prevent="changePassword" class="academic-form">
            <div class="form-group">
              <label>Nueva Contraseña</label>
              <input v-model="passwordData.newPassword" type="password" class="input-field" placeholder="••••••••"
                required />
            </div>
            <div class="form-group">
              <label>Confirmar Contraseña</label>
              <input v-model="passwordData.confirmPassword" type="password" class="input-field" placeholder="••••••••"
                required />
            </div>
            <button type="submit" class="btn btn-outline w-full" :disabled="changingPassword">
              <Loader2 v-if="changingPassword" class="animate-spin" :size="18" />
              <span v-else>Actualizar Contraseña</span>
            </button>
          </form>

          <div class="preview-box mt-6">
            <p><strong>{{ authStore.user?.role === 'ADMIN' ? 'Administrador:' : 'Docente:' }}</strong> {{ teacherProfile.lastName }} {{ teacherProfile.firstName }}</p>
            <p><strong>Usuario:</strong> {{ authStore.user?.email }}</p>
            <p><strong>Estado:</strong> Activo</p>
          </div>
        </div>
      </div>

      <!-- Calendario -->
      <div v-if="activeTab === 'events'" class="grid-layout">
        <div class="form-section glass-card">
          <h3>Nuevo Evento / Fecha</h3>
          <form @submit.prevent="addEvent" class="academic-form">
            <div class="form-group">
              <label>Título del Evento</label>
              <input v-model="newEvent.title" type="text" placeholder="Ej: Reunión de Padres" class="input-field"
                required />
            </div>
            <div class="form-group">
              <label>Fecha</label>
              <input v-model="newEvent.date" type="date" class="input-field" required />
            </div>
            <div class="form-group">
              <label>Descripción (Opcional)</label>
              <textarea v-model="newEvent.description" class="input-field"
                placeholder="Detalles del evento..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              <Plus :size="18" /> Programar Evento
            </button>
          </form>
        </div>
        <div class="list-section glass-card">
          <h3>Próximos Eventos</h3>
          <div class="items-list">
            <div v-for="e in events" :key="e.id" class="item-card event-card">
              <div class="event-info">
                <div class="event-date-badge">
                  {{ new Date(e.date).toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
                </div>
                <strong>{{ e.title }}</strong>
                <p>{{ e.description }}</p>
              </div>
              <button @click="deleteEvent(e.id)" class="btn-icon delete">
                <Trash2 :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>

    <!-- Modal de Edición (Cursos / Materias) -->
    <div v-if="editingItem" class="modal-overlay" @click.self="editingItem = null">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h2>Editar {{ editingItem.type === 'course' ? 'Curso' : 'Materia' }}</h2>
          <button @click="editingItem = null" class="btn-close">
            <Plus :size="24" style="transform: rotate(45deg)" />
          </button>
        </div>

        <form @submit.prevent="saveEdit" class="academic-form mt-4">
          <div v-if="editingItem.type === 'course'">
            <div class="form-group">
              <label>Nivel / Grado</label>
              <input v-model="editingItem.data.level" class="input-field" required />
            </div>
            <div class="form-group">
              <label>Paralelo</label>
              <input v-model="editingItem.data.parallel" class="input-field" required />
            </div>
          </div>

          <div v-else>
            <div class="form-group">
              <label>Nombre de la Materia</label>
              <input v-model="editingItem.data.name" class="input-field" required />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" @click="editingItem = null" class="btn btn-outline">Cancelar</button>
            <button type="submit" class="btn btn-primary">
              <Save :size="18" /> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.academic-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tabs-nav {
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  flex-wrap: wrap; /* Permitir que bajen si no caben */
}

@media (max-width: 768px) {
  .tabs-nav {
    flex-wrap: nowrap; /* En móvil muy pequeño, mejor scroll horizontal */
    padding-bottom: 1rem;
  }
}

.tabs-nav::-webkit-scrollbar {
  height: 4px;
}
.tabs-nav::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}

.tabs-nav button {
  white-space: nowrap;
  flex-shrink: 0;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  font-weight: 600;
}

.tabs-nav button.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr !important;
  }
  
  .tabs-nav button {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    flex: 1 1 auto;
    justify-content: center;
  }
}

.grid-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

.form-section,
.list-section {
  padding: 1.5rem;
}

.form-section h3,
.list-section h3 {
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
}

.academic-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.items-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.item-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-card {
  flex-direction: row;
  align-items: flex-start;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.event-date-badge {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.event-info p {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-info span {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.btn-icon.delete:hover {
  color: var(--danger);
}

.badge {
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  border-radius: 4px;
}

.badge.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

textarea.input-field {
  min-height: 80px;
  resize: vertical;
}

.edit-mode {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
}

.input-field.sm {
  padding: 0.4rem;
  font-size: 0.8rem;
}

.btn.sm {
  padding: 0.4rem;
}

.item-info {
  cursor: pointer;
}

.item-info:hover strong {
  color: var(--primary);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.list-header h3 {
  margin: 0;
}

.drag-hint {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin: 0 0 0.75rem;
}

.item-card.draggable {
  cursor: grab;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-card.draggable:active {
  cursor: grabbing;
}

.item-card.drag-over {
  border: 2px dashed var(--primary);
  background: rgba(var(--primary-rgb, 99, 102, 241), 0.08);
}

.drag-handle {
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.order-num {
  font-size: 0.8rem;
  color: var(--text-muted);
  min-width: 1.5rem;
  font-weight: 600;
}

.subject-name {
  flex: 1;
  cursor: pointer;
}

.subject-name:hover {
  color: var(--primary);
}

.asg-card {
  padding: 1rem;
}

.asg-details {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.course {
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
}

.badge.subject {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.section-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.checkbox-group {
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-main);
  user-select: none;
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary);
}

.full-width {
  grid-column: 1 / -1;
}

.promotion-grid {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
}

.promotion-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.promotion-column h4 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.step-badge {
  background: var(--primary);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
}

.promotion-divider {
  color: var(--text-muted);
  opacity: 0.5;
}

.promotion-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.warning-box {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #f59e0b;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  max-width: 500px;
  text-align: center;
}

.btn.lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .promotion-grid {
    flex-direction: column;
  }

  .promotion-divider {
    transform: rotate(90deg);
  }
}

.btn-close {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
}

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
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  animation: modalScale 0.2s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@keyframes modalScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-muted);
}

.btn-icon:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  transform: translateY(-2px);
}

.btn-icon.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
}
.account-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.mb-4 { margin-bottom: 1rem; }

.preview-box p {
  margin-bottom: 0.5rem;
}
</style>
