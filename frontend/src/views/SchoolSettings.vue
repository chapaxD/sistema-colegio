<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'
import { Save, Building, MapPin, Phone, Info, CheckCircle, UserPlus } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const loading = ref(false)
const saving = ref(false)
const school = ref({
  name: '',
  address: '',
  phone: ''
})
const message = ref({ type: '', text: '' })

const fetchSchool = async () => {
  loading.value = true
  try {
    const response = await api.get('/schools/my')
    school.value = response.data
  } catch (error) {
    console.error('Error fetching school:', error)
    message.value = { type: 'error', text: 'No se pudo cargar la información del colegio' }
  } finally {
    loading.value = false
  }
}

const updateSchool = async () => {
  if (authStore.user?.role !== 'ADMIN') return
  
  saving.value = true
  message.value = { type: '', text: '' }
  try {
    await api.patch('/schools/my', school.value)
    message.value = { type: 'success', text: 'Datos del colegio actualizados correctamente' }
    
    // Actualizar el nombre en el store para que se vea en el sidebar
    authStore.user.schoolName = school.value.name
    localStorage.setItem('user', JSON.stringify(authStore.user))
  } catch (error) {
    console.error('Error updating school:', error)
    message.value = { type: 'error', text: 'Error al actualizar los datos' }
  } finally {
    saving.value = false
  }
}

onMounted(fetchSchool)
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-title">
        <Building class="icon-primary" :size="32" />
        <div>
          <h1>Perfil del Colegio</h1>
          <p>Gestiona la información institucional y la identidad del colegio</p>
        </div>
      </div>
    </header>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando información...</p>
    </div>

    <div v-else class="content-grid">
      <div class="glass-card settings-card">
        <div class="card-header">
          <Info :size="20" />
          <h2>Información General</h2>
        </div>

        <form @submit.prevent="updateSchool" class="settings-form">
          <div class="form-group">
            <label>Nombre de la Institución</label>
            <div class="input-wrapper">
              <Building class="input-icon" :size="18" />
              <input 
                v-model="school.name" 
                type="text" 
                placeholder="Nombre oficial del colegio"
                :disabled="authStore.user?.role !== 'ADMIN'"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label>Dirección</label>
            <div class="input-wrapper">
              <MapPin class="input-icon" :size="18" />
              <input 
                v-model="school.address" 
                type="text" 
                placeholder="Ej: Av. Principal #123, Zona Sur"
                :disabled="authStore.user?.role !== 'ADMIN'"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Nombre del Director(a)</label>
            <div class="input-wrapper">
              <UserPlus class="input-icon" :size="18" />
              <input 
                v-model="school.directorName" 
                type="text" 
                placeholder="Ej: Lic. Magda Zeballos"
                :disabled="authStore.user?.role !== 'ADMIN'"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Nivel Educativo</label>
            <div class="input-wrapper">
              <Info class="input-icon" :size="18" />
              <input 
                v-model="school.educationalLevel" 
                type="text" 
                placeholder="Ej: Primaria Comunitaria Vocacional"
                :disabled="authStore.user?.role !== 'ADMIN'"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Teléfono de Contacto</label>
            <div class="input-wrapper">
              <Phone class="input-icon" :size="18" />
              <input 
                v-model="school.phone" 
                type="text" 
                placeholder="Número de teléfono o celular"
                :disabled="authStore.user?.role !== 'ADMIN'"
              />
            </div>
          </div>

          <div v-if="message.text" :class="['alert', message.type]">
            <CheckCircle v-if="message.type === 'success'" :size="18" />
            <span>{{ message.text }}</span>
          </div>

          <div class="form-actions" v-if="authStore.user?.role === 'ADMIN'">
            <button type="submit" class="btn-primary" :disabled="saving">
              <Save v-if="!saving" :size="20" />
              <div v-else class="btn-spinner"></div>
              <span>{{ saving ? 'Guardando...' : 'Guardar Cambios' }}</span>
            </button>
          </div>
          
          <div v-else class="readonly-notice">
            <Info :size="18" />
            <p>Solo los administradores pueden modificar estos datos.</p>
          </div>
        </form>
      </div>

      <div class="glass-card preview-card">
        <div class="card-header">
          <Building :size="20" />
          <h2>Vista Previa</h2>
        </div>
        
        <div class="school-preview">
          <div class="preview-logo">
            {{ school.name ? school.name.substring(0, 2).toUpperCase() : 'SC' }}
          </div>
          <h3 class="preview-name">{{ school.name || 'Nombre del Colegio' }}</h3>
          <div class="preview-details">
            <div class="detail-item">
              <MapPin :size="16" />
              <span>{{ school.address || 'Dirección no especificada' }}</span>
            </div>
            <div class="detail-item">
              <UserPlus :size="16" />
              <span>Dir: {{ school.directorName || 'Director no asignado' }}</span>
            </div>
            <div class="detail-item">
              <Info :size="16" />
              <span>{{ school.educationalLevel || 'Nivel no especificado' }}</span>
            </div>
            <div class="detail-item">
              <Phone :size="16" />
              <span>{{ school.phone || 'Sin teléfono' }}</span>
            </div>
          </div>
        </div>
        
        <div class="notice-card">
          <p>Esta información se mostrará en los reportes oficiales, centralizadores y boletines generados por el sistema.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  animation: fadeIn 0.5s ease-out;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.header-title h1 {
  font-size: 2rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.25rem;
}

.header-title p {
  color: var(--text-muted);
}

.icon-primary {
  color: var(--primary);
  background: rgba(99, 102, 241, 0.1);
  padding: 0.75rem;
  border-radius: 1rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
}

.settings-card, .preview-card {
  padding: 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  color: var(--primary);
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
}

input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.alert {
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

.alert.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.alert.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.form-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  font-weight: 600;
}

.readonly-notice {
  background: rgba(255, 152, 0, 0.1);
  color: #ff9800;
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

/* Preview Card Styles */
.school-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: rgba(99, 102, 241, 0.03);
  border-radius: 1.5rem;
  border: 1px dashed var(--border-color);
  margin-bottom: 2rem;
}

.preview-logo {
  width: 80px;
  height: 80px;
  background: var(--primary-gradient);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
}

.preview-name {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.preview-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.notice-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  border-left: 4px solid var(--primary);
}

.notice-card p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-muted);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(99, 102, 241, 0.1);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.btn-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
