<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'
import { Plus, Building, Users, BookOpen, MapPin, Phone, Shield, ExternalLink, Search, Pencil, X } from 'lucide-vue-next'

const schools = ref([])
const loading = ref(false)
const showModal = ref(false)
const searchQuery = ref('')

const newSchool = ref({
  name: '',
  slug: '',
  address: '',
  phone: '',
  adminEmail: '',
  adminPassword: ''
})

const isEditing = ref(false)
const editingId = ref(null)

const openCreateModal = () => {
  isEditing.value = false
  editingId.value = null
  newSchool.value = { name: '', slug: '', address: '', phone: '', adminEmail: '', adminPassword: '' }
  showModal.value = true
}

const openEditModal = (school) => {
  isEditing.value = true
  editingId.value = school.id
  newSchool.value = {
    name: school.name,
    slug: school.slug,
    address: school.address || '',
    phone: school.phone || '',
    adminEmail: '', // No editamos el email del admin desde aquí por seguridad
    adminPassword: '' // No editamos el password desde aquí
  }
  showModal.value = true
}

const fetchSchools = async () => {
  loading.value = true
  try {
    const response = await api.get('/schools')
    schools.value = response.data
  } catch (error) {
    console.error('Error fetching schools:', error)
  } finally {
    loading.value = false
  }
}

const saveSchool = async () => {
  try {
    if (isEditing.value) {
      // Para editar, solo mandamos los campos institucionales
      const updateData = {
        name: newSchool.value.name,
        slug: newSchool.value.slug,
        address: newSchool.value.address,
        phone: newSchool.value.phone
      }
      await api.patch(`/schools/${editingId.value}`, updateData)
    } else {
      await api.post('/schools', newSchool.value)
    }
    
    showModal.value = false
    fetchSchools()
    // Reset form
    newSchool.value = { name: '', slug: '', address: '', phone: '', adminEmail: '', adminPassword: '' }
  } catch (error) {
    alert(error.response?.data?.message || 'Error al procesar colegio')
  }
}

const generateSlug = () => {
  newSchool.value.slug = newSchool.value.name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

onMounted(fetchSchools)
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-title">
        <Shield class="icon-primary" :size="32" />
        <div>
          <h1>Gestión Global de Colegios</h1>
          <p>Administra todas las instituciones registradas en la plataforma</p>
        </div>
      </div>
      <button @click="openCreateModal" class="btn-primary">
        <Plus :size="20" />
        <span>Nuevo Colegio</span>
      </button>
    </header>

    <div class="stats-grid">
      <div class="glass-card stat-card">
        <Building class="stat-icon" :size="24" />
        <div class="stat-info">
          <span class="stat-value">{{ schools.length }}</span>
          <span class="stat-label">Colegios Activos</span>
        </div>
      </div>
    </div>

    <div class="glass-card table-card">
      <div class="table-header">
        <div class="search-wrapper">
          <Search :size="18" />
          <input v-model="searchQuery" type="text" placeholder="Buscar colegio por nombre o slug..." />
        </div>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Colegio</th>
              <th>Identificador (Slug)</th>
              <th>Usuarios</th>
              <th>Estudiantes</th>
              <th>Cursos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="school in schools" :key="school.id">
              <td>
                <div class="school-cell">
                  <div class="school-logo">{{ school.name.substring(0, 2).toUpperCase() }}</div>
                  <div class="school-meta">
                    <span class="school-name">{{ school.name }}</span>
                    <span class="school-address">{{ school.address || 'Sin dirección' }}</span>
                  </div>
                </div>
              </td>
              <td><span class="badge">{{ school.slug }}</span></td>
              <td>{{ school._count?.users || 0 }}</td>
              <td>{{ school._count?.students || 0 }}</td>
              <td>{{ school._count?.courses || 0 }}</td>
              <td>
                <div class="actions">
                  <button @click="openEditModal(school)" class="btn-icon" title="Editar Colegio">
                    <Pencil :size="18" />
                  </button>
                  <button class="btn-icon" title="Ver Detalles">
                    <ExternalLink :size="18" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Nuevo Colegio -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <div>
            <h2>{{ isEditing ? 'Editar Colegio' : 'Registrar Nuevo Colegio' }}</h2>
            <p class="modal-subtitle">{{ isEditing ? 'Actualiza la información institucional del colegio' : 'Configura los datos iniciales y la cuenta del administrador' }}</p>
          </div>
          <button @click="showModal = false" class="btn-close">
            <X :size="24" />
          </button>
        </div>
        
        <form @submit.prevent="saveSchool" class="modal-form">
          <div class="form-section">
            <h3>Datos Institucionales</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Nombre del Colegio</label>
                <input v-model="newSchool.name" @input="generateSlug" type="text" required placeholder="Ej: Colegio Grigotá" />
              </div>
              <div class="form-group">
                <label>Slug (Identificador URL)</label>
                <input v-model="newSchool.slug" type="text" required placeholder="ej: colegio-grigota" />
              </div>
            </div>
            <div class="form-group">
              <label>Dirección</label>
              <input v-model="newSchool.address" type="text" placeholder="Dirección completa" />
            </div>
          </div>

          <div v-if="!isEditing" class="form-section">
            <h3>Cuenta del Administrador Inicial</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Correo Electrónico</label>
                <input v-model="newSchool.adminEmail" type="email" required placeholder="admin@colegio.com" />
              </div>
              <div class="form-group">
                <label>Contraseña Temporal</label>
                <input v-model="newSchool.adminPassword" type="password" required placeholder="********" />
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">
              {{ isEditing ? 'Guardar Cambios' : 'Crear Institución' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title h1 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.header-title p {
  color: var(--text-muted);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
}

.stat-icon {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  padding: 1rem;
  border-radius: 1rem;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.table-card {
  padding: 0;
  overflow: hidden;
}

.table-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
}

.search-wrapper svg {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
}

.search-wrapper input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.8rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.school-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.school-logo {
  width: 40px;
  height: 40px;
  background: var(--primary-gradient);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 0.9rem;
}

.school-meta {
  display: flex;
  flex-direction: column;
}

.school-name {
  font-weight: 600;
  color: var(--text-main);
}

.school-address {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.badge {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
}

.modal-content {
  width: 100%;
  max-width: 650px;
  padding: 2.5rem;
  animation: modalScale 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.btn-close {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.modal-subtitle {
  color: var(--text-muted);
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.form-group input {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
}

@keyframes modalScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
