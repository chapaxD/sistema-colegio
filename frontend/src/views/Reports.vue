<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import { useAuthStore } from '../stores/auth'
import { Search, Printer, FileText, Loader2, Download, FileDown } from 'lucide-vue-next'

const authStore = useAuthStore()

const searchQuery = ref('')
const students = ref([])
const selectedStudent = ref(null)
const report = ref(null)
const loading = ref(false)
const searching = ref(false)
const generatingPDF = ref(false)
const error = ref('')

const settings = ref({
  schoolName: 'GUALBERTO VILLARROEL III',
  teacherName: 'AMALIA YARVI',
  directorName: 'LIC. AIDA YARVI FLORES',
  level: 'PRIMARIA',
  year: '2026'
})

const loadSettings = async () => {
  const saved = localStorage.getItem('school_settings')
  if (saved) settings.value = JSON.parse(saved)

  // Override teacher name if user is a teacher
  if (authStore.user?.role === 'TEACHER') {
    try {
      const profile = await api.get('/academic/teachers/me')
      if (profile.data) {
        settings.value.teacherName = `${profile.data.firstName} ${profile.data.lastName}`
      }
    } catch (err) {
      console.error('Error fetching teacher profile', err)
    }
  }
}

onMounted(() => {
  loadSettings()
})

const searchStudents = async () => {
  if (searchQuery.value.length < 3) return
  searching.value = true
  try {
    const res = await api.get('/students')
    students.value = res.data.filter(s => 
      s.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.rude.includes(searchQuery.value)
    ).sort((a, b) => a.lastName.localeCompare(b.lastName))
  } catch (err) {
    console.error('Error buscando estudiantes')
  } finally {
    searching.value = false
  }
}

const generateReport = async (student) => {
  selectedStudent.value = student
  loading.value = true
  report.value = null
  error.value = ''
  try {
    loadSettings() // Recargar por si acaso
    const res = await api.get(`/grades/report/${student.id}?year=${settings.value.year}`)
    report.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al generar el boletín. Verifique la gestión académica.'
    console.error('Error generando reporte', err)
  } finally {
    loading.value = false
  }
}

const printReport = () => {
  generatePDF()
}

const generatePDF = () => {
  if (!report.value) return
  
  const subjectsHtml = Object.entries(report.value.subjects).map(([name, data]) => `
    <tr>
      <td style="text-align: left; font-weight: 600;">${name}</td>
      <td class="score-cell">${data.t1 || '-'}</td>
      <td class="score-cell">${data.t2 || '-'}</td>
      <td class="score-cell">${data.t3 || '-'}</td>
      <td class="score-cell final" style="color: ${data.average >= 51 ? '#10b981' : '#ef4444'}">${data.average}</td>
    </tr>
  `).join('')

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Boletín - ${selectedStudent.value.lastName}</title>
  <style>
    @page { size: letter; margin: 0.5in; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
    .school-info h2 { margin: 0; color: #4338ca; font-size: 1.4rem; }
    .school-info p { margin: 2px 0; font-size: 0.9rem; color: #64748b; }
    .title-block { text-align: right; }
    .title-block h1 { margin: 0; font-size: 1.6rem; color: #1e293b; }
    .title-block p { margin: 2px 0; font-weight: bold; color: #6366f1; }
    
    .meta-section { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .meta-item { font-size: 0.95rem; }
    .meta-item strong { color: #475569; }
    
    table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
    th { background: #6366f1; color: white; padding: 10px; font-size: 0.85rem; text-transform: uppercase; border: 1px solid #4338ca; }
    td { padding: 10px; border: 1px solid #e2e8f0; text-align: center; font-size: 0.9rem; }
    tr:nth-child(even) { background: #f8fafc; }
    .score-cell { font-weight: bold; width: 80px; }
    .final { background: #eef2ff !important; font-size: 1.1rem; }
    
    .footer { display: flex; justify-content: space-between; margin-top: 60px; }
    .sign-block { text-align: center; width: 30%; }
    .sign-line { border-top: 1px solid #94a3b8; margin-bottom: 8px; }
    .sign-block p { margin: 2px 0; font-size: 0.85rem; color: #475569; }
    .sign-block .name { font-weight: bold; color: #1e293b; }
  </style>
</head>
<body>
  <div class="header">
    <div class="school-info">
      <h2>UNIDAD EDUCATIVA "${settings.value.schoolName}"</h2>
      <p>Nivel: ${settings.value.level}</p>
      <p>Gestión: ${settings.value.year}</p>
    </div>
    <div class="title-block">
      <h1>BOLETÍN DE CALIFICACIONES</h1>
      <p>${settings.value.year}</p>
    </div>
  </div>

  <div class="meta-section">
    <div class="meta-item"><strong>Estudiante:</strong> ${report.value.student}</div>
    <div class="meta-item"><strong>Curso:</strong> ${report.value.course}</div>
    <div class="meta-item"><strong>RUDE:</strong> ${selectedStudent.value.rude}</div>
    <div class="meta-item"><strong>Fecha Emisión:</strong> ${new Date().toLocaleDateString()}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="text-align: left;">ÁREAS DE SABERES Y CONOCIMIENTOS</th>
        <th>1º Trim</th>
        <th>2º Trim</th>
        <th>3º Trim</th>
        <th>Prom. Final</th>
      </tr>
    </thead>
    <tbody>
      ${subjectsHtml}
    </tbody>
  </table>

  <div class="footer">
    <div class="sign-block">
      <div class="sign-line"></div>
      <p class="name">${settings.value.teacherName}</p>
      <p>Docente de Grado</p>
    </div>
    <div class="sign-block">
      <div class="sign-line"></div>
      <p class="name">${settings.value.directorName}</p>
      <p>Director(a)</p>
    </div>
    <div class="sign-block">
      <div class="sign-line"></div>
      <p>Sello Unidad Educativa</p>
    </div>
  </div>
  <script>window.onload = () => window.print()<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=800')
  win.document.write(html)
  win.document.close()
}
</script>

<template>
  <div class="reports-view">
    <h1 class="page-title no-print">Generación de Boletines</h1>

    <div class="search-section glass-card no-print">
      <div class="search-group">
        <label>Buscar Estudiante</label>
        <div class="search-input-wrapper">
          <Search class="search-icon" :size="20" />
          <input 
            v-model="searchQuery" 
            @input="searchStudents"
            type="text" 
            placeholder="Ingrese RUDE o nombres..."
            class="input-field"
          />
        </div>
      </div>

      <div v-if="students.length > 0" class="results-list">
        <div 
          v-for="s in students" 
          :key="s.id" 
          @click="generateReport(s)"
          class="result-item"
          :class="{ active: selectedStudent?.id === s.id }"
        >
          <div class="result-info">
            <span class="student-name">{{ s.lastName }} {{ s.firstName }}</span>
            <span class="student-rude">RUDE: {{ s.rude }}</span>
          </div>
          <FileText :size="18" />
        </div>
      </div>
      <div v-else-if="searchQuery.length >= 3 && !searching" class="no-results">
        No se encontraron estudiantes.
      </div>

      <div v-if="loading" class="searching-overlay">
        <Loader2 class="animate-spin" :size="32" />
        <p>Generando boletín...</p>
      </div>

      <div v-if="error" class="error-toast">
        {{ error }}
      </div>
    </div>

    <!-- Boletín Imprimible -->
    <div v-if="report" class="report-container">
      <div class="report-actions no-print">
        <button @click="generatePDF" class="btn btn-outline">
          <Printer :size="20" />
          Imprimir
        </button>
        <button @click="generatePDF" class="btn btn-primary">
          <FileDown :size="20" />
          Descargar PDF
        </button>
      </div>

      <div class="table-container">
        <div class="bulletin glass-card printable">
        <header class="bulletin-header">
          <div class="school-info">
            <h2>UNIDAD EDUCATIVA "{{ settings.schoolName }}"</h2>
            <p>Nivel: {{ settings.level }}</p>
          </div>
          <div class="bulletin-title">
            <h1>BOLETÍN DE CALIFICACIONES</h1>
            <p>GESTIÓN ACADÉMICA {{ settings.year }}</p>
          </div>
        </header>

        <section class="student-meta">
          <div class="meta-row">
            <div class="meta-item"><strong>Estudiante:</strong> {{ report.student }}</div>
            <div class="meta-item"><strong>Curso:</strong> {{ report.course }}</div>
          </div>
          <div class="meta-row">
            <div class="meta-item"><strong>Nivel:</strong> {{ settings.level }}</div>
            <div class="meta-item"><strong>RUDE:</strong> {{ selectedStudent.rude }}</div>
          </div>
        </section>

        <table class="bulletin-table">
          <thead>
            <tr>
              <th>ÁREAS DE SABERES Y CONOCIMIENTOS</th>
              <th>1er Trimestre</th>
              <th>2do Trimestre</th>
              <th>3er Trimestre</th>
              <th>PROMEDIO FINAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, subject) in report.subjects" :key="subject">
              <td class="subject-name">{{ subject }}</td>
              <td class="score-cell">{{ data.t1 || '-' }}</td>
              <td class="score-cell">{{ data.t2 || '-' }}</td>
              <td class="score-cell">{{ data.t3 || '-' }}</td>
              <td class="score-cell final">{{ data.average }}</td>
            </tr>
          </tbody>
        </table>

        <footer class="bulletin-footer">
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>{{ settings.teacherName }}</p>
            <p>Docente de Grado</p>
          </div>
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>{{ settings.directorName }}</p>
            <p>Firma Director(a)</p>
          </div>
          <div class="sign-block">
            <div class="sign-line"></div>
            <p>Sello de la Unidad Educativa</p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.reports-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-section {
  padding: 1.5rem;
  max-width: 600px;
}

.search-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-input-wrapper input {
  padding-left: 3rem;
}

.results-list {
  margin-top: 1rem;
  border-top: 1px solid var(--border);
  max-height: 300px;
  overflow-y: auto;
}

.result-item {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.result-item:hover, .result-item.active {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
}

.result-info {
  display: flex;
  flex-direction: column;
}

.student-name { font-weight: 600; }
.student-rude { font-size: 0.75rem; color: var(--text-muted); }

.searching-overlay {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--primary);
}

.error-toast {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-radius: 0.75rem;
  border: 1px solid #ef4444;
  font-size: 0.9rem;
}

.report-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.report-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.bulletin {
  background: var(--bg-card);
  color: var(--text-main);
  padding: 3rem;
  border: 2px solid var(--border);
}

.bulletin-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--border);
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.school-info h2 { font-size: 1.1rem; }
.school-info p { font-size: 0.8rem; }

.bulletin-title { text-align: right; }
.bulletin-title h1 { font-size: 1.5rem; color: var(--text-main); }

.student-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.meta-row {
  display: flex;
  gap: 2rem;
}

@media (max-width: 768px) {
  .meta-row {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.bulletin-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 3rem;
}

.bulletin-table th, .bulletin-table td {
  border: 1px solid var(--border);
  padding: 0.75rem;
  text-align: center;
  color: var(--text-main);
}

.bulletin-table th {
  background: rgba(99, 102, 241, 0.1) !important;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--primary) !important;
}

.subject-name {
  text-align: left !important;
  font-weight: 600;
  width: 40%;
}

.final { 
  font-weight: 800; 
  background: var(--bg-input) !important;
  color: var(--primary) !important;
}

.bulletin-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
}

.sign-block {
  text-align: center;
  width: 30%;
}

.sign-line {
  border-top: 1px solid var(--border);
  margin-bottom: 0.5rem;
}

.sign-block p { font-size: 0.75rem; }

/* Print Mode */
@media print {
  .no-print { display: none !important; }
  .printable {
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    background: white !important;
  }
  .printable * { color: black !important; border-color: #000 !important; }
  .bulletin-table th { background: #eee !important; }
  body { background: white !important; }
  .app-container { padding: 0 !important; }
}
</style>
