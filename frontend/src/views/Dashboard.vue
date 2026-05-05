<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../api'
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle
} from 'lucide-vue-next'

const authStore = useAuthStore()
const stats = ref({
  totalStudents: 0,
  totalCourses: 0,
  totalSubjects: 0,
  averageGrade: 0,
  activity: []
})
const events = ref([])
const loading = ref(true)
const currentTime = ref(new Date())

const updateTime = () => {
  currentTime.value = new Date()
}

let timer

const formatTime = (date) => {
  const diff = new Date() - new Date(date)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora mismo'
  if (mins < 60) return `Hace ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours} h`
  return new Date(date).toLocaleDateString()
}

onMounted(async () => {
  timer = setInterval(updateTime, 1000)
  try {
    const [statsRes, eventsRes] = await Promise.all([
      api.get('/stats'),
      api.get('/academic/events')
    ])
    stats.value = statsRes.data
    events.value = eventsRes.data
  } catch (err) {
    console.error('Error fetching data')
  } finally {
    loading.value = false
  }
})

import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="dashboard">
    <header class="welcome-section">
      <div class="welcome-text">
        <h1>Bienvenido, {{ authStore.user?.email.split('@')[0] }} 👋</h1>
        <p>Aquí tienes un resumen de la actividad escolar para hoy.</p>
      </div>
      <div class="date-display glass-card">
        <Clock :size="20" />
        <div class="time-block">
          <span class="date">{{ currentTime.toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          <span class="time">{{ currentTime.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</span>
        </div>
      </div>
    </header>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card glass-card">
        <div class="stat-icon students">
          <Users :size="24" />
        </div>
        <div class="stat-content">
          <span class="stat-label">Total Estudiantes</span>
          <h2 class="stat-value">{{ stats.totalStudents }}</h2>
          <span class="stat-trend positive">
            <TrendingUp :size="14" /> +{{ stats.totalStudents }} nuevos
          </span>
        </div>
      </div>

      <div class="stat-card glass-card">
        <div class="stat-icon courses">
          <BookOpen :size="24" />
        </div>
        <div class="stat-content">
          <span class="stat-label">Cursos Activos</span>
          <h2 class="stat-value">{{ stats.totalCourses }}</h2>
          <span class="stat-desc">Gestión 2024</span>
        </div>
      </div>

      <div class="stat-card glass-card">
        <div class="stat-icon grades">
          <GraduationCap :size="24" />
        </div>
        <div class="stat-content">
          <span class="stat-label">Promedio General</span>
          <h2 class="stat-value">{{ stats.averageGrade }}%</h2>
          <span class="stat-trend" :class="stats.averageGrade >= 51 ? 'positive' : 'negative'">
            {{ stats.averageGrade >= 51 ? 'Rendimiento Óptimo' : 'Bajo Rendimiento' }}
          </span>
        </div>
      </div>

      <div class="stat-card glass-card">
        <div class="stat-icon subjects">
          <CheckCircle :size="24" />
        </div>
        <div class="stat-content">
          <span class="stat-label">Materias</span>
          <h2 class="stat-value">{{ stats.totalSubjects }}</h2>
          <span class="stat-desc">Curriculum Base</span>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <section class="main-panel glass-card">
        <div class="panel-header">
          <h3>Actividad Reciente</h3>
          <button class="btn-text">Ver todo</button>
        </div>
        <div class="activity-list">
          <div v-for="item in stats.activity" :key="item.id" class="activity-item">
            <div class="activity-indicator" :class="item.indicator"></div>
            <div class="activity-info">
              <p><strong>{{ item.type }}:</strong> {{ item.description }}</p>
              <span>{{ formatTime(item.date) }}</span>
            </div>
          </div>
          <div v-if="stats.activity.length === 0" class="empty-state">
            No hay actividad reciente.
          </div>
        </div>
      </section>

      <section class="side-panel glass-card">
        <h3>Calendario Académico</h3>
        <div class="calendar-preview">
          <div v-for="e in events" :key="e.id" class="event-item">
            <div class="event-date">
              {{ new Date(e.date).getDate() }}<br>
              {{ new Date(e.date).toLocaleString('es-BO', { month: 'short' }).toUpperCase() }}
            </div>
            <div class="event-details">
              <p>{{ e.title }}</p>
              <span>{{ e.description || 'Evento programado' }}</span>
            </div>
          </div>
          <div v-if="events.length === 0" class="empty-events">
            No hay eventos próximos.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-text h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.welcome-text p {
  color: var(--text-muted);
}

.date-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
}

.time-block {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.time-block .date {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: capitalize;
}

.time-block .time {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  font-family: monospace;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.students { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
.stat-icon.courses { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.stat-icon.grades { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.stat-icon.subjects { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  display: block;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.25rem 0;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-trend.positive { color: #10b981; }
.stat-trend.negative { color: #ef4444; }

.stat-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

.main-panel, .side-panel {
  padding: 1.5rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
}

.activity-indicator {
  width: 4px;
  height: 40px;
  border-radius: 4px;
}

.activity-indicator.success { background: #10b981; }
.activity-indicator.info { background: #6366f1; }
.activity-indicator.warning { background: #f59e0b; }

.activity-info p {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.activity-info span {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.event-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
}

.event-date {
  background: var(--primary);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  font-size: 0.75rem;
  min-width: 45px;
}

.event-details p {
  font-size: 0.9rem;
  font-weight: 600;
}

.event-details span {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
