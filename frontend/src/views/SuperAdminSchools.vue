<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'
import { Plus, Building, Users, BookOpen, MapPin, Phone, Shield, ExternalLink, Search, Pencil, Trash2, X, GraduationCap, ShieldAlert, Key } from 'lucide-vue-next'

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
  adminPassword: '',
  licenseExpiry: '',
  licenseStatus: 'ACTIVE'
})

const isEditing = ref(false)
const editingId = ref(null)

const openCreateModal = () => {
  isEditing.value = false
  editingId.value = null
  newSchool.value = {
    name: '',
    slug: '',
    address: '',
    phone: '',
    adminEmail: '',
    adminPassword: '',
    licenseExpiry: '',
    licenseStatus: 'ACTIVE'
  }
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
    licenseExpiry: school.licenseExpiry ? new Date(school.licenseExpiry).toISOString().split('T')[0] : '',
    licenseStatus: school.licenseStatus || 'ACTIVE',
    adminEmail: '', 
    adminPassword: ''
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
        phone: newSchool.value.phone,
        licenseExpiry: newSchool.value.licenseExpiry,
        licenseStatus: newSchool.value.licenseStatus
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

const deleteSchool = async (id) => {
  if (confirm('¿ESTÁ TOTALMENTE SEGURO? Se eliminarán todos los datos del colegio (estudiantes, notas, etc). Esta acción es irreversible.')) {
    try {
      await api.delete(`/schools/${id}`)
      fetchSchools()
    } catch (err) {
      alert('Error al eliminar el colegio')
    }
  }
}

const getLicenseBadge = (school) => {
  if (school.licenseStatus === 'SUSPENDED') return 'status-suspended'
  if (!school.licenseExpiry) return 'status-active'
  const expiry = new Date(school.licenseExpiry)
  const today = new Date()
  const diff = expiry.getTime() - today.getTime()
  const days = Math.ceil(diff / (1000 * 3600 * 24))
  
  if (days < 0) return 'status-expired'
  if (days < 15) return 'status-warning'
  return 'status-active'
}

const formatStatus = (school) => {
  if (school.licenseStatus === 'SUSPENDED') return 'Suspendido'
  if (!school.licenseExpiry) return 'Activo (Vitalicio)'
  const expiry = new Date(school.licenseExpiry)
  const today = new Date()
  if (expiry < today) return 'Licencia Vencida'
  return `Vence el ${expiry.toLocaleDateString()}`
}

const promptResetPassword = async (school) => {
  const newPassword = prompt(`Ingrese la nueva contraseña para el administrador de ${school.name}:`, 'admin123')
  if (newPassword) {
    try {
      await api.post(`/schools/${school.id}/reset-password`, { password: newPassword })
      alert('Contraseña actualizada exitosamente')
    } catch (err) {
      alert('Error al actualizar contraseña')
    }
  }
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
      <button @click="openCreateModal" class="btn btn-primary">
        <Plus :size="20" />
        <span>Nuevo Colegio</span>
      </button>
    </header>

    <div class="stats-grid">
      <div class="glass-card stat-card">
        <Building class="stat-icon" :size="24" />
        <div class="stat-info">
          <span class="stat-value">{{ schools.length }}</span>
          <span class="stat-label">Colegios Registrados</span>
        </div>
      </div>
      <div class="glass-card stat-card">
        <Users class="stat-icon" :size="24" />
        <div class="stat-info">
          <span class="stat-value">{{ schools.reduce((acc, s) => acc + (s._count?.users || 0), 0) }}</span>
          <span class="stat-label">Total Usuarios Globales</span>
        </div>
      </div>
      <div class="glass-card stat-card">
        <GraduationCap class="stat-icon" :size="24" />
        <div class="stat-info">
          <span class="stat-value">{{ schools.reduce((acc, s) => acc + (s._count?.students || 0), 0) }}</span>
          <span class="stat-label">Estudiantes en Red</span>
        </div>
      </div>
      <div class="glass-card stat-card">
        <ShieldAlert class="stat-icon warning" :size="24" />
        <div class="stat-info">
          <span class="stat-value text-warning">{{ schools.filter(s => getLicenseBadge(s) === 'status-warning').length }}</span>
          <span class="stat-label">Vencen pronto</span>
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
              <th>Licencia / Estado</th>
              <th>Stats (U/E/C)</th>
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
                    <span class="school-admin-email" title="Email del Administrador">
                      <Users :size="12" /> {{ school.users?.[0]?.email || 'Sin admin' }}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div class="license-info">
                  <span class="badge" :class="getLicenseBadge(school)">
                    {{ formatStatus(school) }}
                  </span>
                  <span class="slug-text">{{ school.slug }}</span>
                </div>
              </td>
              <td>
                <div class="stats-pills">
                  <span title="Usuarios">{{ school._count?.users || 0 }} U</span>
                  <span title="Estudiantes">{{ school._count?.students || 0 }} E</span>
                  <span title="Cursos">{{ school._count?.courses || 0 }} C</span>
                </div>
              </td>
              <td>
                <div class="actions">
                  <button @click="promptResetPassword(school)" class="btn-icon" title="Restablecer Contraseña">
                    <Key :size="18" />
                  </button>
                  <button @click="openEditModal(school)" class="btn-icon" title="Editar Colegio">
                    <Pencil :size="18" />
                  </button>
                  <button @click="deleteSchool(school.id)" class="btn-icon delete" title="Eliminar Colegio">
                    <Trash2 :size="18" />
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

            <div class="form-row mt-4">
              <div class="form-group">
                <label>Vencimiento de Licencia</label>
                <input v-model="newSchool.licenseExpiry" type="date" />
              </div>
              <div class="form-group">
                <label>Estado de Licencia</label>
                <select v-model="newSchool.licenseStatus" class="select-field">
                  <option value="ACTIVE">Activo</option>
                  <option value="SUSPENDED">Suspendido / Bloqueado</option>
                </select>
              </div>
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
            <button type="button" @click="showModal = false" class="btn btn-outline">Cancelar</button>
            <button type="submit" class="btn btn-primary">
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

.school-admin-email {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--primary);
  margin-top: 0.25rem;
  opacity: 0.8;
}

.school-admin-email svg {
  opacity: 0.6;
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

.license-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.slug-text {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-family: monospace;
}

.stats-pills {
  display: flex;
  gap: 0.4rem;
}

.stats-pills span {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  color: var(--text-muted);
}

/* Status Badges */
.badge.status-active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.badge.status-warning {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.badge.status-expired {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.badge.status-suspended {
  background: rgba(107, 114, 128, 0.1);
  color: #9ca3af;
}

.stat-icon.warning { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
.stat-icon.danger { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
.text-warning { color: #f59e0b; }
.text-danger { color: #ef4444; }

.select-field {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
  cursor: pointer;
}

.mt-4 { margin-top: 1rem; }

.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
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

@keyframes modalScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>

