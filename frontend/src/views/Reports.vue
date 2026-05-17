<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import { useAuthStore } from '../stores/auth'
import { Search, Printer, FileText, Loader2, Download, FileDown, Trash2, Save } from 'lucide-vue-next'

const authStore = useAuthStore()

const searchQuery = ref('')
const students = ref([])
const selectedStudent = ref(null)
const report = ref(null)
const loading = ref(false)
const searching = ref(false)
const generatingPDF = ref(false)
const error = ref('')

const activeTab = ref('bulletin')
const courses = ref([])
const selectedCourse = ref('')
const selectedTrimester = ref(1)
const pedagogicalData = ref(null)
const manualData = ref({
  area: '',
  avance: '',
  aprovechamiento: '',
  logros: '',
  dificultades: '',
  sugerencias: '',
  learningIssuesIds: [],
  selectedSubjectsIds: [],
  difficultiesList: [], // { studentId, fullName, subjects: '', notes: '' }
  subjectAvance: {},
  reportDate: new Date().toISOString().split('T')[0]
})

const settings = ref({
  schoolName: '',
  teacherName: '',
  directorName: '',
  level: '',
  year: new Date().getFullYear().toString()
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

  // Load courses
  try {
    const [coursesRes, schoolRes] = await Promise.all([
      api.get('/academic/courses'),
      api.get('/schools/my')
    ])
    courses.value = coursesRes.data
    if (schoolRes.data) {
      settings.value.schoolName = schoolRes.data.name
      settings.value.directorName = schoolRes.data.directorName || 'Director(a) no asignado(a)'
      settings.value.level = schoolRes.data.educationalLevel || ''
    }
  } catch (err) {
    console.error('Error loading school or courses data')
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
    <div class="meta-item"><strong>Fecha Emisión:</strong> ${new Date().toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
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

const printAllBulletins = async () => {
  if (!selectedCourse.value) {
    alert('Por favor seleccione un curso primero')
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await api.get(`/grades/report-course/${selectedCourse.value}?year=${settings.value.year}`)
    if (res.data.length === 0) {
      alert('No hay estudiantes inscritos en este curso')
      return
    }
    generateBatchPDF(res.data)
  } catch (err) {
    error.value = 'Error al obtener los reportes del curso'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const generateBatchPDF = (reports) => {
  const pages = []
  for (let i = 0; i < reports.length; i += 2) {
    const r1 = reports[i]
    const r2 = reports[i + 1]

    pages.push(`
      <div class="page">
        ${renderSingleBulletinHtml(r1)}
        ${r2 ? renderSingleBulletinHtml(r2) : ''}
      </div>
    `)
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Boletines - ${reports[0].course}</title>
  <style>
    @page { size: letter; margin: 0; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; margin: 0; padding: 0; }
    .page { 
      height: 1056px; 
      width: 816px;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
    .bulletin-container {
      height: 50%;
      padding: 0.4in 0.5in;
      box-sizing: border-box;
      border-bottom: 1px dashed #cbd5e1;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .bulletin-container:last-child { border-bottom: none; }
    
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; border-bottom: 2px solid #6366f1; padding-bottom: 5px; }
    .school-info h2 { margin: 0; color: #4338ca; font-size: 1.1rem; }
    .school-info p { margin: 1px 0; font-size: 0.8rem; color: #64748b; }
    .title-block { text-align: right; }
    .title-block h1 { margin: 0; font-size: 1.2rem; color: #1e293b; }
    .title-block p { margin: 1px 0; font-weight: bold; color: #6366f1; font-size: 0.8rem; }
    
    .meta-section { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; }
    .meta-item { font-size: 0.85rem; }
    .meta-item strong { color: #475569; }
    
    table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
    th { background: #6366f1; color: white; padding: 5px; font-size: 0.7rem; text-transform: uppercase; border: 1px solid #4338ca; }
    td { padding: 5px; border: 1px solid #e2e8f0; text-align: center; font-size: 0.75rem; }
    tr:nth-child(even) { background: #f8fafc; }
    .score-cell { font-weight: bold; width: 50px; }
    .final { background: #eef2ff !important; font-size: 0.85rem; }
    
    .footer { display: flex; justify-content: space-between; margin-top: auto; padding-top: 5px; }
    .sign-block { text-align: center; width: 30%; }
    .sign-line { border-top: 1px solid #94a3b8; margin-bottom: 3px; }
    .sign-block p { margin: 1px 0; font-size: 0.7rem; color: #475569; }
    .sign-block .name { font-weight: bold; color: #1e293b; }
  </style>
</head>
<body>
  ${pages.join('')}
  <script>window.onload = () => window.print()<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=800')
  win.document.write(html)
  win.document.close()
}

const renderSingleBulletinHtml = (report) => {
  const subjectsHtml = Object.entries(report.subjects).map(([name, data]) => `
    <tr>
      <td style="text-align: left; font-weight: 600;">${name}</td>
      <td class="score-cell">${data.t1 || '-'}</td>
      <td class="score-cell">${data.t2 || '-'}</td>
      <td class="score-cell">${data.t3 || '-'}</td>
      <td class="score-cell final" style="color: ${data.average >= 51 ? '#10b981' : '#ef4444'}">${data.average}</td>
    </tr>
  `).join('')

  return `
    <div class="bulletin-container">
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
        <div class="meta-item"><strong>Estudiante:</strong> ${report.student}</div>
        <div class="meta-item"><strong>Curso:</strong> ${report.course}</div>
        <div class="meta-item"><strong>RUDE:</strong> ${report.rude || 'S/N'}</div>
        <div class="meta-item"><strong>Fecha Emisión:</strong> ${new Date().toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
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
    </div>
  `
}

const fetchPedagogicalData = async () => {
  if (!selectedCourse.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await api.get(`/grades/pedagogical/${selectedCourse.value}?period=${selectedTrimester.value}`)
    pedagogicalData.value = res.data

    // Cargar datos guardados si existen
    if (res.data.savedReport) {
      const saved = res.data.savedReport;
      manualData.value.area = saved.area || '';
      manualData.value.avance = saved.avance || '';
      manualData.value.aprovechamiento = saved.aprovechamiento || '';
      manualData.value.logros = saved.logros || '';
      manualData.value.dificultades = saved.dificultades || '';
      manualData.value.sugerencias = saved.sugerencias || '';
      if (saved.subjectsData) {
        manualData.value.subjectAvance = saved.subjectsData;
        manualData.value.selectedSubjectsIds = Object.keys(saved.subjectsData).map(id => parseInt(id));
      }
    } else {
      // Reset si no hay guardado
      manualData.value.area = '';
      manualData.value.avance = '';
      manualData.value.aprovechamiento = '';
      manualData.value.logros = '';
      manualData.value.dificultades = '';
      manualData.value.sugerencias = '';
      manualData.value.selectedSubjectsIds = res.data.subjects.map(s => s.id);
      manualData.value.subjectAvance = {};
      res.data.subjects.forEach(s => {
        manualData.value.subjectAvance[s.id] = { prog: '100', avan: '0', pend: '100' };
      });
    }

    // Cargar dificultades guardadas o inicializar con reprobados
    if (res.data.savedDifficulties && res.data.savedDifficulties.length > 0) {
      manualData.value.difficultiesList = res.data.savedDifficulties;
    } else if (res.data.reprobados) {
      manualData.value.difficultiesList = res.data.reprobados.map(s => ({
        studentId: s.id,
        fullName: s.fullName,
        subjects: s.subjects || '',
        notes: ''
      }));
    } else {
      manualData.value.difficultiesList = [];
    }
  } catch (err) {
    error.value = 'Error al cargar datos del curso'
  } finally {
    loading.value = false
  }
}

const savePedagogicalReport = async () => {
  if (!selectedCourse.value) return;
  loading.value = true;
  try {
    const subjectsData = {};
    manualData.value.selectedSubjectsIds.forEach(id => {
      subjectsData[id] = manualData.value.subjectAvance[id];
    });

    await api.post('/grades/pedagogical/save', {
      courseId: selectedCourse.value,
      period: selectedTrimester.value,
      area: manualData.value.area,
      avance: manualData.value.avance,
      aprovechamiento: manualData.value.aprovechamiento,
      logros: manualData.value.logros,
      dificultades: manualData.value.dificultades,
      sugerencias: manualData.value.sugerencias,
      subjectsData
    });
    alert('Reporte guardado correctamente');
  } catch (err) {
    console.error(err);
    alert('Error al guardar el reporte');
  } finally {
    loading.value = false;
  }
}

const saveLearningDifficulties = async () => {
  if (!selectedCourse.value) return;
  loading.value = true;
  try {
    await api.post('/grades/difficulties/save', {
      period: selectedTrimester.value,
      difficulties: manualData.value.difficultiesList
    });
    alert('Dificultades guardadas correctamente');
  } catch (err) {
    console.error(err);
    alert('Error al guardar dificultades');
  } finally {
    loading.value = false;
  }
}

const addDifficultyRow = () => {
  manualData.value.difficultiesList.push({
    studentId: Date.now(),
    fullName: '',
    subjects: '',
    notes: ''
  })
}

const removeDifficultyRow = (index) => {
  manualData.value.difficultiesList.splice(index, 1)
}

const printDifficultiesReport = () => {
  const course = courses.value.find(c => c.id === parseInt(selectedCourse.value))
  const courseName = course ? `${course.level} ${course.parallel}` : ''

  const rows = manualData.value.difficultiesList.map((item, idx) => `
    <tr>
      <td style="border:1px solid #000;padding:8px;text-align:center;">${idx + 1}</td>
      <td style="border:1px solid #000;padding:8px;text-align:left;font-weight:bold;font-size:10pt;">${item.fullName.toUpperCase()}</td>
      <td style="border:1px solid #000;padding:8px;text-align:center;font-size:9pt;">${item.subjects.toUpperCase()}</td>
      <td style="border:1px solid #000;padding:8px;text-align:left;font-size:9pt;white-space:pre-wrap;">${item.notes}</td>
    </tr>
  `).join('')

  const displayDate = new Date(manualData.value.reportDate + 'T12:00:00').toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const teacherName = settings.value.teacherName || '__________________________';
  const directorLabel = settings.value.directorName.startsWith('Lic.') ? settings.value.directorName : `Lic. ${settings.value.directorName}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 20mm; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #000; }
    .header-img { width: 100%; margin-bottom: 20px; }
    .main-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; margin-bottom: 30px; text-transform: uppercase; }
    
    .memo-info { margin-bottom: 25px; }
    .memo-row { display: flex; margin-bottom: 5px; }
    .memo-label { width: 80px; font-weight: bold; }
    .memo-value { flex: 1; border-bottom: 1px solid #000; padding-left: 10px; }
    
    .intro-text { text-align: justify; margin-bottom: 20px; }
    .intro-text p { margin-bottom: 15px; }
    
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { border: 1px solid #000; padding: 10px; background: #f2f2f2; font-size: 10pt; }
    td { border: 1px solid #000; padding: 10px; vertical-align: top; }
    
    .footer-signs { margin-top: 60px; display: flex; justify-content: space-around; }
    .sign-box { text-align: center; width: 40%; }
    .sign-line { border-top: 1px solid #000; margin-bottom: 5px; }
  </style>
</head>
<body>
  <div class="main-title">INFORME DE ESTUDIANTES CON DIFICULTADES DE APRENDIZAJES</div>

  <div class="memo-info">
    <div class="memo-row"><span class="memo-label">A:</span> <div class="memo-value">${directorLabel} / DIRECTORA DE LA U.E. ${settings.value.schoolName}</div></div>
    <div class="memo-row"><span class="memo-label">DE:</span> <div class="memo-value">Prof. ${teacherName}</div></div>
    <div class="memo-row"><span class="memo-label">REF.:</span> <div class="memo-value">INFORME DE ESTUDIANTES CON DIFICULTADES DE APRENDIZAJE ${selectedTrimester.value}º TRIMESTRE</div></div>
    <div class="memo-row"><span class="memo-label">FECHA:</span> <div class="memo-value">${displayDate}</div></div>
  </div>

  <div class="intro-text">
    <p>Tengo a bien informar sobre el desarrollo pedagógico del ${selectedTrimester.value}º trimestre:</p>
    <p>Elevo el presente informe sobre los estudiantes con dificultades en el ${selectedTrimester.value}º Trimestre, de acuerdo a las instructivas emanadas de su autoridad.</p>
    <p>Los estudiantes que figuran en lista adjunta presentan problemas de aprendizaje, pese que durante el trimestre se fue reforzando con diferentes estrategias y adaptaciones curriculares que coadyuven el aprendizaje del estudiante, también es de conocimiento de los padres / madres de familia ya que se les informó de forma oportuna y constante; sin embargo presentan dificultades y no corresponde para la aprobación trimestral ya que no cumplen con los perfiles de salida en la asignatura correspondiente.</p>
    <p>Adjunto una nómina de estudiantes para fines consiguientes:</p>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 40px;">Nº</th>
        <th>NOMBRE COMPLETO</th>
        <th style="width: 140px;">ÁREA / ASIGNATURA</th>
        <th>DIFICULTADES</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="footer-signs">
    <div class="sign-box">
      <div class="sign-line"></div>
      <p><strong>${teacherName}</strong></p>
      <p>PROFESOR(A)</p>
    </div>
    <div class="sign-box">
      <div class="sign-line"></div>
      <p><strong>${settings.value.directorName}</strong></p>
      <p>DIRECTOR(A)</p>
    </div>
  </div>

  <script>window.onload = () => window.print()<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=800')
  win.document.write(html)
  win.document.close()
}

const printPedagogical = () => {
  if (!pedagogicalData.value) return

  const course = courses.value.find(c => c.id === parseInt(selectedCourse.value))
  const courseName = course ? `${course.level} ${course.parallel}` : ''

  // Página 1: Atrasos
  const attendanceRows = pedagogicalData.value.attendanceIssues.map((item, idx) => `
    <tr>
      <td style="border:1px solid #000;padding:5px;">${idx + 1}</td>
      <td style="border:1px solid #000;padding:5px;text-align:left;">${item.fullName}</td>
      <td style="border:1px solid #000;padding:5px;">${item.phone}</td>
    </tr>
  `).join('')
  const emptyAttendance = Array(Math.max(0, 8 - pedagogicalData.value.attendanceIssues.length)).fill('<tr><td style="border:1px solid #000;height:25px;"></td><td style="border:1px solid #000;"></td><td style="border:1px solid #000;"></td></tr>').join('')

  // Página 2: Problemas de Aprendizaje
  // Buscamos en todas las fuentes de datos posibles para no perder ningún alumno seleccionado
  const allPossibleStudents = [
    ...(pedagogicalData.value.strugglingStudents || []),
    ...(pedagogicalData.value.attendanceIssues || []),
    ...(pedagogicalData.value.reprobados || []),
    ...(pedagogicalData.value.allStudents || [])
  ]

  const learningIssuesRows = (manualData.value.learningIssuesIds || [])
    .map((id, idx) => {
      const student = allPossibleStudents.find(s => Number(s.id) === Number(id))
      if (!student) return ''
      return `
        <tr>
          <td style="border:1px solid #000;padding:5px;">${idx + 1}</td>
          <td style="border:1px solid #000;padding:5px;text-align:left;">${student.fullName}</td>
          <td style="border:1px solid #000;padding:5px;">${student.phone || 'S/N'}</td>
        </tr>
      `
    }).join('')
  const emptyLearning = Array(Math.max(0, 8 - manualData.value.learningIssuesIds.length)).fill('<tr><td style="border:1px solid #000;height:25px;"></td><td style="border:1px solid #000;"></td><td style="border:1px solid #000;"></td></tr>').join('')

  // Página 2: Reprobados
  const reprobadosRows = pedagogicalData.value.reprobados.map((item, idx) => `
    <tr>
      <td style="border:1px solid #000;padding:5px;">${idx + 1}</td>
      <td style="border:1px solid #000;padding:5px;text-align:left;">${item.fullName}</td>
      <td style="border:1px solid #000;padding:5px;">${item.phone}</td>
    </tr>
  `).join('')
  const emptyReprobados = Array(Math.max(0, 8 - pedagogicalData.value.reprobados.length)).fill('<tr><td style="border:1px solid #000;height:25px;"></td><td style="border:1px solid #000;"></td><td style="border:1px solid #000;"></td></tr>').join('')

  // Página 2: Avance Programático
  const subjectRows = pedagogicalData.value.subjects
    .filter(s => manualData.value.selectedSubjectsIds.includes(s.id))
    .map(s => {
      const data = manualData.value.subjectAvance[s.id] || { prog: '', avan: '', pend: '' }
      const total = data.avan || '0'
      return `
      <tr>
        <td style="border:1px solid #000;padding:5px;text-align:left;font-size:8pt;">${s.name.toUpperCase()}</td>
        <td style="border:1px solid #000;padding:5px;">${data.prog}%</td>
        <td style="border:1px solid #000;padding:5px;">${data.avan}%</td>
        <td style="border:1px solid #000;padding:5px;">${data.pend}%</td>
        <td style="border:1px solid #000;padding:5px;font-weight:bold;">${data.avan}%</td>
      </tr>
    `
    }).join('')

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 15mm; }
    body { font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.3; color: #000; }
    .page-break { page-break-before: always; }
    .header { text-align: center; margin-bottom: 20px; }
    .header h1 { font-size: 14pt; text-decoration: underline; margin-bottom: 5px; }
    .header h2 { font-size: 12pt; text-decoration: underline; margin-bottom: 15px; }
    
    .meta-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 10px; margin-bottom: 15px; }
    .meta-item { border-bottom: 1px dotted #000; padding-bottom: 2px; }
    .meta-item strong { font-weight: bold; }
    
    table.full-table { width: 100%; border-collapse: collapse; text-align: center; font-size: 9pt; margin-bottom: 20px; }
    table.full-table th { border: 1px solid #000; padding: 5px; background: #eee; text-transform: uppercase; }
    table.full-table td { border: 1px solid #000; padding: 5px; }

    .main-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; border: 1px solid #000; margin-bottom: 20px; }
    .grid-col { border-right: 1px solid #000; min-height: 250px; }
    .grid-col:last-child { border-right: none; }
    .grid-header { font-weight: bold; text-align: center; padding: 5px; border-bottom: 1px solid #000; background: #eee; text-transform: uppercase; }
    .grid-content { padding: 8px; white-space: pre-wrap; font-size: 9pt; }
    
    .footer { margin-top: 40px; display: flex; justify-content: space-around; }
    .sign-block { text-align: center; width: 45%; }
    .sign-line { border-top: 1px solid #000; margin-bottom: 5px; }
    .section-title { font-weight: bold; text-align: center; font-size: 10pt; margin-bottom: 8px; text-transform: uppercase; margin-top: 20px; }
  </style>
</head>
<body>
  <!-- PAGINA 1 -->
  <div class="header">
    <h1>INFORME PEDAGOGICO</h1>
    <h2>${selectedTrimester.value}º TRIMESTRE</h2>
  </div>

  <div class="meta-grid">
    <div class="meta-item"><strong>UNIDAD EDUCATIVA:</strong> ${settings.value.schoolName}</div>
    <div class="meta-item"><strong>DIRECTORA:</strong> ${settings.value.directorName}</div>
    <div class="meta-item"><strong>PROFESOR(A):</strong> ${settings.value.teacherName}</div>
    <div class="meta-item"><strong>CURSO:</strong> ${courseName}</div>
    <div class="meta-item"><strong>AREA:</strong> ${manualData.value.area || 'GENERAL'}</div>
    <div class="meta-item"><strong>GESTIÓN:</strong> ${settings.value.year}</div>
  </div>

  <div class="meta-item" style="margin-bottom: 10px;"><strong>PORCENTAJE DE AVANCE GENERAL:</strong> ${manualData.value.avance || '..........'} %</div>
  <div class="meta-item" style="margin-bottom: 20px;"><strong>PORCENTAJE DE APROVECHAMIENTO DEL ALUMNADO:</strong> ${manualData.value.aprovechamiento || '..........'} %</div>

  <div style="display: flex; justify-content: space-between; margin-bottom: 15px; gap: 20px;">
    <table style="width: 48%; border-collapse: collapse; font-size: 8pt; text-align: center;">
      <thead><tr><th colspan="3" style="border:1px solid #000;">ALUMNOS INSCRITOS</th></tr><tr><th style="border:1px solid #000;">V</th><th style="border:1px solid #000;">M</th><th style="border:1px solid #000;">T</th></tr></thead>
      <tbody><tr><td style="border:1px solid #000;">${pedagogicalData.value.stats.enrolled.males}</td><td style="border:1px solid #000;">${pedagogicalData.value.stats.enrolled.females}</td><td style="border:1px solid #000;">${pedagogicalData.value.stats.enrolled.total}</td></tr></tbody>
    </table>
    <table style="width: 48%; border-collapse: collapse; font-size: 8pt; text-align: center;">
      <thead><tr><th colspan="3" style="border:1px solid #000;">ALUMNOS EFECTIVOS</th></tr><tr><th style="border:1px solid #000;">V</th><th style="border:1px solid #000;">M</th><th style="border:1px solid #000;">T</th></tr></thead>
      <tbody><tr><td style="border:1px solid #000;">${pedagogicalData.value.stats.effective.males}</td><td style="border:1px solid #000;">${pedagogicalData.value.stats.effective.females}</td><td style="border:1px solid #000;">${pedagogicalData.value.stats.effective.total}</td></tr></tbody>
    </table>
  </div>

  <div class="main-grid">
    <div class="grid-col"><div class="grid-header">LOGROS</div><div class="grid-content">${manualData.value.logros}</div></div>
    <div class="grid-col"><div class="grid-header">DIFICULTADES</div><div class="grid-content">${manualData.value.dificultades}</div></div>
    <div class="grid-col"><div class="grid-header">SUGERENCIAS</div><div class="grid-content">${manualData.value.sugerencias}</div></div>
  </div>

  <div class="section-title">ALUMNOS QUE SIEMPRE LLEGAN ATRASADOS A CLASE O QUE FALTAN CONSECUTIVAMENTE</div>
  <table class="full-table">
    <thead><tr><th style="width: 40px;">Nº</th><th>NOMBRE COMPLETO</th><th style="width: 150px;">CELULAR</th></tr></thead>
    <tbody>${attendanceRows}${emptyAttendance}</tbody>
  </table>

  <div class="footer">
    <div class="sign-block"><div class="sign-line"></div><p><strong>${settings.value.teacherName}</strong></p><p>PROFESOR(A)</p></div>
    <div class="sign-block"><div class="sign-line"></div><p><strong>${settings.value.directorName}</strong></p><p>DIRECTOR(A)</p></div>
  </div>

  <!-- PAGINA 2 -->
  <div class="page-break"></div>
  <div class="section-title">NÓMINA DE ALUMNOS CON PROBLEMA DE APRENDIZAJE Y DIFICULTADES LEVE</div>
  <table class="full-table">
    <thead><tr><th style="width: 40px;">Nº</th><th>NOMBRE COMPLETO</th><th style="width: 150px;">CELULAR</th></tr></thead>
    <tbody>${learningIssuesRows}${emptyLearning}</tbody>
  </table>

  <div class="section-title">NÓMINA DE ALUMNOS REPROBADOS</div>
  <table class="full-table">
    <thead><tr><th style="width: 40px;">Nº</th><th>NOMBRE COMPLETO</th><th style="width: 150px;">CELULAR</th></tr></thead>
    <tbody>${reprobadosRows}${emptyReprobados}</tbody>
  </table>

  <div class="section-title">AVANCE GENERAL TRIMESTRAL</div>
  <table class="full-table" style="font-size: 8pt;">
    <thead>
      <tr>
        <th>ÁREAS / ASIGNATURAS</th>
        <th style="width: 100px;">TEMAS PROGRAMADOS %</th>
        <th style="width: 100px;">TEMAS AVANZADOS %</th>
        <th style="width: 100px;">TEMAS PENDIENTES %</th>
        <th style="width: 100px;">ESTADO FINAL %</th>
      </tr>
    </thead>
    <tbody>${subjectRows}</tbody>
  </table>

  <div class="footer">
    <div class="sign-block"><div class="sign-line"></div><p><strong>${settings.value.teacherName}</strong></p><p>PROFESOR(A)</p></div>
    <div class="sign-block"><div class="sign-line"></div><p><strong>${settings.value.directorName}</strong></p><p>DIRECTOR(A)</p></div>
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
    <div class="tabs-header no-print">
      <button @click="activeTab = 'bulletin'" :class="{ active: activeTab === 'bulletin' }">Boletines
        Individuales</button>
      <button @click="activeTab = 'pedagogical'" :class="{ active: activeTab === 'pedagogical' }">Informe Pedagógico por
        Curso</button>
      <button @click="activeTab = 'difficulties'" :class="{ active: activeTab === 'difficulties' }">Dificultades de
        Aprendizaje</button>
    </div>

    <div v-if="activeTab === 'bulletin'" class="search-section glass-card no-print">
      <div class="bulletin-actions-grid">
        <div class="search-group">
          <label>Impresión Masiva por Curso</label>
          <div class="flex items-center gap-4">
            <select v-model="selectedCourse" class="input-field" style="max-width: 300px;">
              <option value="">Seleccione un curso</option>
              <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} - {{ c.parallel }}</option>
            </select>
            <button @click="printAllBulletins" class="btn btn-primary" :disabled="!selectedCourse || loading"
              style="white-space: nowrap;">
              <Printer :size="18" />
              Imprimir Todo (2 por hoja)
            </button>
          </div>
        </div>

        <div class="divider"></div>

        <div class="search-group">
          <label>Buscar Estudiante Individual</label>
          <div class="search-input-wrapper">
            <Search class="search-icon" :size="20" />
            <input v-model="searchQuery" @input="searchStudents" type="text" placeholder="Ingrese RUDE o nombres..."
              class="input-field" />
          </div>
        </div>
      </div>

      <div v-if="students.length > 0" class="results-list">
        <div v-for="s in students" :key="s.id" @click="generateReport(s)" class="result-item"
          :class="{ active: selectedStudent?.id === s.id }">
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

    <div v-if="activeTab === 'pedagogical'" class="pedagogical-config glass-card no-print">
      <div class="config-grid">
        <div class="form-group">
          <label>Curso</label>
          <select v-model="selectedCourse" @change="fetchPedagogicalData" class="input-field">
            <option value="">Seleccione un curso</option>
            <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} - {{ c.parallel }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Trimestre</label>
          <select v-model="selectedTrimester" class="input-field">
            <option :value="1">1º Trimestre</option>
            <option :value="2">2º Trimestre</option>
            <option :value="3">3º Trimestre</option>
          </select>
        </div>
        <div class="form-group">
          <label>Área (Opcional)</label>
          <input v-model="manualData.area" type="text" class="input-field" placeholder="Ej: MATEMÁTICA" />
        </div>
        <div class="form-group">
          <label>Fecha del Informe</label>
          <input v-model="manualData.reportDate" type="date" class="input-field" />
        </div>
      </div>

      <div v-if="pedagogicalData" class="manual-fields mt-6">
        <div class="form-row">
          <div class="form-group">
            <label>% Avance General</label>
            <input v-model="manualData.avance" type="text" class="input-field" placeholder="100" />
          </div>
          <div class="form-group">
            <label>% Aprovechamiento</label>
            <input v-model="manualData.aprovechamiento" type="text" class="input-field" placeholder="85" />
          </div>
        </div>
        <div class="form-group">
          <label>Logros</label>
          <textarea v-model="manualData.logros" class="input-field" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Dificultades</label>
          <textarea v-model="manualData.dificultades" class="input-field" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Sugerencias</label>
          <textarea v-model="manualData.sugerencias" class="input-field" rows="3"></textarea>
        </div>

        <div class="learning-issues-selector glass-card p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-800">Alumnos con Dificultades de Aprendizaje (Reprobados)</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">* Se muestran alumnos con materias reprobadas (notas menores a 51).</p>
          <div class="issues-list grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            <div v-for="s in pedagogicalData.reprobados" :key="s.id" class="issue-item flex items-center gap-2">
              <input type="checkbox" :id="'learn-' + s.id" :value="s.id" v-model="manualData.learningIssuesIds" />
              <label :for="'learn-' + s.id" class="text-xs truncate cursor-pointer">{{ s.fullName }}</label>
            </div>
          </div>
          <div v-if="!pedagogicalData.reprobados?.length" class="text-xs text-muted py-2 text-center">
            No se detectaron alumnos con materias reprobadas (notas menores a 51).
          </div>
        </div>

        <div class="avance-subjects mt-6">
          <h3 class="text-sm font-bold mb-1">Avance Programático por Materia</h3>
          <div class="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg mb-4">
            <p class="text-[11px] text-blue-200">
              <strong>Guía de llenado:</strong> Indique el porcentaje de temas avanzados respecto al total planificado.
              Ejemplo: <strong>100%</strong> Programado, <strong>85%</strong> Avanzado, el sistema calculará el
              <strong>15%</strong> Pendiente automáticamente.
            </p>
          </div>
          <div class="avance-table-wrapper overflow-x-auto">
            <table class="mini-table">
              <thead>
                <tr>
                  <th style="width: 40px;"></th>
                  <th>Área / Asignatura</th>
                  <th style="width: 100px;">Programado %</th>
                  <th style="width: 100px;">Avanzado %</th>
                  <th style="width: 100px;">Pendiente %</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in pedagogicalData.subjects" :key="s.id"
                  :class="{ 'opacity-40': !manualData.selectedSubjectsIds.includes(s.id) }">
                  <td><input type="checkbox" :value="s.id" v-model="manualData.selectedSubjectsIds" /></td>
                  <td class="text-xs font-semibold">{{ s.name }}</td>
                  <td><input v-model="manualData.subjectAvance[s.id].prog" class="mini-input"
                      :disabled="!manualData.selectedSubjectsIds.includes(s.id)" /></td>
                  <td>
                    <input v-model="manualData.subjectAvance[s.id].avan"
                      @input="manualData.subjectAvance[s.id].pend = 100 - parseInt(manualData.subjectAvance[s.id].avan || 0)"
                      class="mini-input highlight" :disabled="!manualData.selectedSubjectsIds.includes(s.id)" />
                  </td>
                  <td><input v-model="manualData.subjectAvance[s.id].pend" class="mini-input disabled" disabled /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="actions mt-4 flex gap-4">
          <button @click="savePedagogicalReport" class="btn btn-secondary flex-1">
            <Save :size="20" />
            Guardar Reporte
          </button>
          <button @click="printPedagogical" class="btn btn-primary flex-1">
            <Printer :size="20" />
            Imprimir Informe Pedagógico
          </button>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'difficulties'" class="difficulties-section glass-card no-print">
      <div class="config-grid mb-6">
        <div class="form-group">
          <label>Curso</label>
          <select v-model="selectedCourse" @change="fetchPedagogicalData" class="input-field">
            <option value="">Seleccione un curso</option>
            <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.level }} - {{ c.parallel }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Trimestre</label>
          <select v-model="selectedTrimester" @change="fetchPedagogicalData" class="input-field">
            <option :value="1">1º Trimestre</option>
            <option :value="2">2º Trimestre</option>
            <option :value="3">3º Trimestre</option>
          </select>
        </div>
        <div class="form-group">
          <label>Fecha del Informe</label>
          <input v-model="manualData.reportDate" type="date" class="input-field" />
        </div>
      </div>

      <div v-if="pedagogicalData" class="difficulties-editor">
        <h3 class="text-lg font-bold mb-4">Nómina de Estudiantes con Dificultades</h3>

        <div class="difficulties-table-wrapper">
          <table class="mini-table">
            <thead>
              <tr>
                <th style="width: 250px;">Estudiante</th>
                <th style="width: 150px;">Área / Asignatura</th>
                <th>Descripción de Dificultades</th>
                <th style="width: 50px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in manualData.difficultiesList" :key="idx">
                <td>
                  <input v-model="item.fullName" class="mini-input" placeholder="Nombre completo" />
                </td>
                <td>
                  <input v-model="item.subjects" class="mini-input" placeholder="MAT - FIS" />
                </td>
                <td>
                  <textarea v-model="item.notes" class="mini-input" rows="2"
                    placeholder="Describa la dificultad..."></textarea>
                </td>
                <td>
                  <button @click="removeDifficultyRow(idx)" class="btn-delete" title="Eliminar fila">
                    <Trash2 :size="14" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex gap-4 mt-6">
          <button @click="addDifficultyRow" class="btn btn-outline">
            + Añadir Alumno
          </button>
          <button @click="saveLearningDifficulties" class="btn btn-secondary flex-1">
            <Save :size="20" />
            Guardar Dificultades
          </button>
          <button @click="printDifficultiesReport" class="btn btn-primary flex-1">
            <Printer :size="20" />
            Generar e Imprimir Informe
          </button>
        </div>
      </div>

      <div v-if="loading" class="searching-overlay">
        <Loader2 class="animate-spin" :size="32" />
        <p>Cargando datos...</p>
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

.tabs-header {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
}

.tabs-header button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tabs-header button.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  background: rgba(99, 102, 241, 0.05);
}

.pedagogical-config {
  padding: 2rem;
  max-width: 800px;
}

.config-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.manual-fields {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

textarea.input-field {
  resize: vertical;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.p-4 {
  padding: 1rem;
}

.w-full {
  width: 100%;
}

.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.font-bold {
  font-weight: 700;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-2 {
  gap: 0.5rem;
}

.max-h-40 {
  max-height: 10rem;
}

.overflow-y-auto {
  overflow-y: auto;
}

.items-center {
  align-items: center;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-table {
  width: 100%;
  border-collapse: collapse;
}

.mini-table th,
.mini-table td {
  border: 1px solid var(--border);
  padding: 0.25rem;
  text-align: center;
}

.mini-table th {
  font-size: 0.7rem;
  background: rgba(99, 102, 241, 0.05);
}

.mini-input {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-main);
  text-align: center;
  font-size: 0.8rem;
  padding: 0.125rem;
}

.mini-input:focus {
  background: rgba(255, 255, 255, 0.05);
  outline: none;
}

.mini-input.highlight {
  border: 1px solid var(--primary);
  background: rgba(99, 102, 241, 0.05);
  border-radius: 4px;
}

.mini-input.disabled {
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-muted);
  cursor: not-allowed;
}

.btn-delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #ef4444;
  color: white;
}

.search-section {
  padding: 1.5rem;
  max-width: 800px;
}

.bulletin-actions-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 0.5rem 0;
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

.result-item:hover,
.result-item.active {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
}

.result-info {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-weight: 600;
}

.student-rude {
  font-size: 0.75rem;
  color: var(--text-muted);
}

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

.school-info h2 {
  font-size: 1.1rem;
}

.school-info p {
  font-size: 0.8rem;
}

.bulletin-title {
  text-align: right;
}

.bulletin-title h1 {
  font-size: 1.5rem;
  color: var(--text-main);
}

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

.bulletin-table th,
.bulletin-table td {
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

.sign-block p {
  font-size: 0.75rem;
}

/* Print Mode */
@media print {
  .no-print {
    display: none !important;
  }

  .printable {
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    background: white !important;
  }

  .printable * {
    color: black !important;
    border-color: #000 !important;
  }

  .bulletin-table th {
    background: #eee !important;
  }

  body {
    background: white !important;
  }

  .app-container {
    padding: 0 !important;
  }
}
</style>
