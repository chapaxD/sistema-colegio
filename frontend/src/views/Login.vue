<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { LogIn, Mail, Lock, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/')
  } else {
    error.value = authStore.error
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card glass-card">
      <div class="login-header">
        <div class="logo-circle">SC</div>
        <h1>Sistema Colegio</h1>
        <p>Bienvenido de nuevo, por favor inicia sesión</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Email</label>
          <div class="input-wrapper">
            <Mail class="input-icon" :size="18" />
            <input 
              v-model="email" 
              type="email" 
              placeholder="correo@ejemplo.com"
              class="input-field"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <div class="input-wrapper">
            <Lock class="input-icon" :size="18" />
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••"
              class="input-field"
            />
          </div>
        </div>

        <div v-if="error" class="error-msg">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="authStore.loading">
          <Loader2 v-if="authStore.loading" class="animate-spin" :size="20" />
          <LogIn v-else :size="20" />
          {{ authStore.loading ? 'Entrando...' : 'Iniciar Sesión' }}
        </button>
      </form>
      
      <div class="login-footer">
        <p>© 2026 Gestión Académica Bolivia</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top left, #1e293b 0%, #0f172a 100%);
  padding: 1.5rem;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-circle {
  width: 64px;
  height: 64px;
  background: var(--primary);
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
}

.login-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.login-form {
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
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.input-field {
  padding-left: 3rem !important;
}

.login-btn {
  width: 100%;
  justify-content: center;
  padding: 0.875rem;
  font-size: 1rem;
  margin-top: 1rem;
}

.error-msg {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
}

.login-footer {
  margin-top: 2.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
