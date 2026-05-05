import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { public: true }
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/estudiantes',
      name: 'estudiantes',
      component: () => import('../views/Students.vue')
    },
    {
      path: '/notas',
      name: 'notas',
      component: () => import('../views/Grades.vue')
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: () => import('../views/Reports.vue')
    },
    {
      path: '/asistencia',
      name: 'asistencia',
      component: () => import('../views/Attendance.vue')
    },
    {
      path: '/academico',
      name: 'academico',
      component: () => import('../views/Academic.vue')
    },
    {
      path: '/centralizadores',
      name: 'centralizadores',
      component: () => import('../views/Centralizers.vue')
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/Users.vue')
    },
    {
      path: '/colegio',
      name: 'colegio',
      component: () => import('../views/SchoolSettings.vue')
    },
    {
      path: '/super-admin/colegios',
      name: 'super-admin-colegios',
      component: () => import('../views/SuperAdminSchools.vue')
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  
  if (!to.meta.public && !authStore.user) {
    return { name: 'login' }
  }

  return true
})

export default router
