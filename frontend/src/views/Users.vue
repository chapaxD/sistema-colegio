<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'
import { UserPlus, Trash2, Mail, Shield, User as UserIcon, Loader2 } from 'lucide-vue-next'

const users = ref([])
const loading = ref(false)
const saving = ref(false)
const newUser = ref({
  email: '',
  role: 'TEACHER',
  firstName: '',
  lastName: ''
})

const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.get('/users')
    users.value = res.data
  } catch (err) {
    console.error('Error loading users')
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const registerUser = async () => {
  saving.value = true
  try {
    await api.post('/users', newUser.value)
    newUser.value = { email: '', role: 'TEACHER', firstName: '', lastName: '' }
    fetchData()
  } catch (err) {
    alert(err.response?.data?.message || 'Error al registrar usuario')
  } finally {
    saving.value = false
  }
}

const deleteUser = async (id) => {
  if (confirm('¿Está seguro de eliminar este usuario?')) {
    try {
      await api.delete(`/users/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar usuario')
    }
  }
}
</script>

<template>
  <div class="users-view">
    <h1 class="page-title">Gestión de Usuarios</h1>

    <div class="grid-layout">
      <!-- Formulario de Registro -->
      <div class="form-section glass-card">
        <div class="section-header">
          <UserPlus :size="24" class="icon-primary" />
          <h3>Registrar Nuevo Usuario</h3>
        </div>
        
        <form @submit.prevent="registerUser" class="user-form">
          <div class="form-group">
            <label>Correo Electrónico</label>
            <div class="input-with-icon">
              <Mail :size="18" />
              <input v-model="newUser.email" type="email" placeholder="correo@ejemplo.com" class="input-field" required />
            </div>
          </div>



          <div class="form-group">
            <label>Rol de Usuario</label>
            <select v-model="newUser.role" class="input-field">
              <option value="TEACHER">Docente</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div v-if="newUser.role === 'TEACHER'" class="teacher-fields">
            <div class="form-group">
              <label>Nombres</label>
              <input v-model="newUser.firstName" type="text" placeholder="Ej: Juan" class="input-field" required />
            </div>
            <div class="form-group">
              <label>Apellidos</label>
              <input v-model="newUser.lastName" type="text" placeholder="Ej: Pérez" class="input-field" required />
            </div>
          </div>

          <div class="info-note">
            <p>La contraseña se asignará automáticamente según el rol:</p>
            <ul>
              <li><strong>ADMIN:</strong> admin123</li>
              <li><strong>DOCENTE:</strong> profe123</li>
            </ul>
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="saving">
            <Loader2 v-if="saving" class="animate-spin" :size="18" />
            <span v-else>Crear Usuario</span>
          </button>
        </form>
      </div>

      <!-- Lista de Usuarios -->
      <div class="list-section glass-card">
        <div class="section-header">
          <UserIcon :size="24" class="icon-primary" />
          <h3>Usuarios del Sistema</h3>
        </div>

        <div v-if="loading" class="loading-state">
          <Loader2 class="animate-spin" :size="32" />
        </div>

        <div v-else class="users-grid">
          <div v-for="u in users" :key="u.id" class="user-card">
            <div class="user-avatar">
              {{ u.email[0].toUpperCase() }}
            </div>
            <div class="user-info">
              <span class="u-email">{{ u.email }}</span>
              <div class="u-role-badge" :class="u.role.toLowerCase()">
                <Shield v-if="u.role === 'ADMIN'" :size="12" />
                {{ u.role === 'ADMIN' ? 'Administrador' : 'Docente' }}
              </div>
              <p v-if="u.teacher" class="u-name">
                {{ u.teacher.firstName }} {{ u.teacher.lastName }}
              </p>
            </div>
            <button @click="deleteUser(u.id)" class="btn-icon delete" title="Eliminar">
              <Trash2 :size="18" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-note {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.8rem;
}

.info-note p {
  margin-bottom: 0.25rem;
  color: var(--primary);
  font-weight: 600;
}

.info-note ul {
  list-style: none;
  padding-left: 0.5rem;
}

.info-note li {
  color: var(--text-muted);
}

.input-with-icon {
  position: relative;
}

.input-with-icon svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.input-with-icon input {
  padding-left: 3rem;
}

.teacher-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.75rem;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.user-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
}

.user-card:hover {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.05);
}

.user-avatar {
  width: 48px;
  height: 48px;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.u-email {
  font-weight: 600;
  font-size: 0.95rem;
}

.u-role-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  width: fit-content;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.u-role-badge.admin { background: rgba(239, 68, 68, 0.1); color: #f87171; }
.u-role-badge.teacher { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }

.u-name {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

.loading-state {
  padding: 5rem;
  text-align: center;
}
</style>
