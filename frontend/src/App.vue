<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { 
  LayoutDashboard, Users, BookOpen, FileText, Settings, 
  LogOut, CalendarCheck, Sun, Moon, Menu, X, User as UserIcon, Building, ShieldCheck
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const isDark = ref(localStorage.getItem('theme') !== 'light')
const isSidebarOpen = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  isSidebarOpen.value = false
})

onMounted(() => {
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
})
</script>

<template>
  <div class="app-container">
    <!-- Overlay for mobile sidebar -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="toggleSidebar"></div>

    <!-- Sidebar -->
    <aside v-if="$route.name !== 'login'" class="sidebar glass-card" :class="{ 'is-open': isSidebarOpen }">
      <div class="logo">
        <div class="logo-icon">{{ authStore.user?.schoolName ? authStore.user.schoolName.substring(0, 2).toUpperCase() : 'SC' }}</div>
        <div class="school-info">
          <span class="school-name">{{ authStore.user?.schoolName || 'Sistema Colegio' }}</span>
        </div>
        <button class="close-sidebar mobile-only" @click="toggleSidebar">
          <X :size="20" />
        </button>
      </div>
      
      <nav class="nav-menu">
        <RouterLink to="/" class="nav-item" active-class="active">
          <LayoutDashboard :size="20" />
          <span>Dashboard</span>
        </RouterLink>
        <RouterLink to="/estudiantes" class="nav-item" active-class="active">
          <Users :size="20" />
          <span>Estudiantes</span>
        </RouterLink>

        <!-- Secciones de Docente -->
        <RouterLink to="/asistencia" class="nav-item" active-class="active">
          <CalendarCheck :size="20" />
          <span>Asistencia</span>
        </RouterLink>
        <RouterLink to="/notas" class="nav-item" active-class="active">
          <BookOpen :size="20" />
          <span>Notas</span>
        </RouterLink>
        <RouterLink to="/reportes" class="nav-item" active-class="active">
          <FileText :size="20" />
          <span>Reportes</span>
        </RouterLink>
        <RouterLink to="/centralizadores" class="nav-item" active-class="active">
          <FileText :size="20" />
          <span>Centralizadores</span>
        </RouterLink>

        <!-- Secciones de Administrador -->
        <RouterLink v-if="authStore.user?.role === 'ADMIN'" to="/usuarios" class="nav-item" active-class="active">
          <Settings :size="20" />
          <span>Usuarios</span>
        </RouterLink>

        <RouterLink to="/academico" class="nav-item" active-class="active">
          <component :is="authStore.user?.role === 'ADMIN' ? Settings : UserIcon" :size="20" />
          <span>{{ authStore.user?.role === 'ADMIN' ? 'Configuración' : 'Mi Perfil' }}</span>
        </RouterLink>

        <RouterLink to="/colegio" class="nav-item" active-class="active">
          <Building :size="20" />
          <span>Perfil del Colegio</span>
        </RouterLink>

        <!-- Secciones de Super Admin -->
        <div v-if="authStore.user?.role === 'SUPER_ADMIN'" class="nav-section-title">ADMINISTRACIÓN GLOBAL</div>
        <RouterLink v-if="authStore.user?.role === 'SUPER_ADMIN'" to="/super-admin/colegios" class="nav-item" active-class="active">
          <ShieldCheck :size="20" />
          <span>Gestión de Colegios</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button @click="toggleTheme" class="nav-item theme-toggle">
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
          <span>Modo {{ isDark ? 'Claro' : 'Oscuro' }}</span>
        </button>
        <button @click="authStore.logout()" class="nav-item logout">
          <LogOut :size="20" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content" :class="{ 'full-width': $route.name === 'login' }">
      <header v-if="$route.name !== 'login'" class="top-bar glass-card">
        <div class="header-left">
          <button class="menu-btn mobile-only" @click="toggleSidebar">
            <Menu :size="24" />
          </button>
          <div class="breadcrumb no-mobile">Panel / {{ $route.name }}</div>
        </div>

        <div class="user-profile">
          <div class="user-info no-mobile">
            <span class="user-name">{{ authStore.user?.email.split('@')[0] }}</span>
            <span class="user-role">{{ authStore.user?.role }}</span>
          </div>
          <div class="avatar">{{ authStore.user?.email?.[0]?.toUpperCase() }}</div>
        </div>
      </header>
      
      <div class="content-wrapper">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  padding: 1rem;
  gap: 1rem;
  transition: all 0.3s ease;
}

.sidebar {
  width: 260px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  height: calc(100vh - 2rem);
  position: sticky;
  top: 1rem;
  z-index: 100;
  transition: transform 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  color: var(--primary);
  overflow: hidden;
}

.logo-icon {
  background: var(--primary);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.school-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.school-name {
  font-size: 1rem;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
  font-size: 0.95rem;
}

.nav-item:hover, .nav-item.active {
  background: rgba(99, 102, 241, 0.1);
  color: var(--text-main);
}

.nav-item.active {
  color: var(--primary);
  font-weight: 600;
}

.nav-section-title {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  letter-spacing: 0.05em;
}

.logout:hover {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.1);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.top-bar {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-btn {
  background: transparent;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.breadcrumb {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.avatar {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.content-wrapper {
  flex: 1;
}

.mobile-only { display: none; }

@media (max-width: 768px) {
  .app-container {
    padding: 0;
    gap: 0;
    display: block; /* Stack instead of flex */
  }

  .mobile-only { display: block; }
  .no-mobile { display: none; }

  .sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    bottom: 0;
    height: 100vh;
    border-radius: 0;
    width: 280px;
    z-index: 1000;
  }

  .sidebar.is-open {
    left: 0;
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 900;
  }

  .main-content {
    padding: 0.5rem;
    width: 100%;
    min-height: 100vh;
  }

  .top-bar {
    border-radius: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .logo {
    justify-content: space-between;
  }

  .close-sidebar {
    background: transparent;
    border: none;
    color: var(--text-muted);
  }
}
</style>
