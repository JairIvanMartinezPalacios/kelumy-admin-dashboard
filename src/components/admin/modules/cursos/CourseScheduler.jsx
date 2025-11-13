// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado, efectos y optimización
import React, { useState, useEffect, useMemo } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Calendar,      // Icono de calendario para programación
  Clock,         // Icono de reloj para horarios
  Play,          // Icono de play para iniciar
  Pause,         // Icono de pausa para detener
  Settings,      // Icono de configuración para ajustes
  Bell,          // Icono de campana para notificaciones
  Users,         // Icono de usuarios para audiencia
  BookOpen,      // Icono de libro para cursos
  Crown,         // Icono de corona para planes premium
  Star,          // Icono de estrella para destacados
  Zap,           // Icono de rayo para lanzamientos
  CheckCircle,   // Icono de check para completado
  AlertCircle,   // Icono de alerta para advertencias
  Eye,           // Icono de ojo para vista previa
  Edit,          // Icono de editar para modificar
  Trash2,        // Icono de basura para eliminar
  Plus,          // Icono de más para agregar
  Filter,        // Icono de filtro para filtrar
  Search,        // Icono de búsqueda para buscar
  Download,      // Icono de descarga para exportar
  RefreshCw,     // Icono de actualizar para refrescar
  ChevronDown,   // Icono de chevron abajo para expandir
  ChevronUp,     // Icono de chevron arriba para contraer
  Send,          // Icono de enviar para notificaciones
  Mail,          // Icono de correo para email
  Smartphone,    // Icono de smartphone para móvil
  Globe,         // Icono de globo para público
  Lock,          // Icono de candado para privado
  Unlock,        // Icono de desbloqueo para público
  TrendingUp,    // Icono de tendencia para popularidad
  BarChart3      // Icono de gráfico para analytics
} from 'lucide-react'

// ========================================
// COMPONENTE - CourseScheduler
// ========================================

// Define el componente funcional CourseScheduler que gestiona el lanzamiento progresivo de cursos
// Implementa el modelo Netflix-style con liberación escalonada según planes de suscripción
const CourseScheduler = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar la vista activa en la interfaz
  // 'schedule': programación, 'courses': cursos, 'notifications': notificaciones, 'settings': configuración
  const [activeView, setActiveView] = useState('schedule')
  
  // Estados para el sistema de programación automática
  const [schedulerStatus, setSchedulerStatus] = useState('active')      // Estado: 'active', 'paused', 'stopped'
  const [nextRelease, setNextRelease] = useState('2024-02-15')          // Próxima fecha de lanzamiento
  const [releaseFrequency, setReleaseFrequency] = useState('monthly')   // Frecuencia: 'weekly', 'monthly', 'custom'
  
  // Estados para control de modales y edición
  const [showCreateSchedule, setShowCreateSchedule] = useState(false)       // Modal de crear programación
  const [showNotificationSettings, setShowNotificationSettings] = useState(false) // Modal de configuración de notificaciones
  const [editingCourse, setEditingCourse] = useState(null)                  // Curso en edición
  
  // Estados para funcionalidad de búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('')                          // Término de búsqueda
  const [statusFilter, setStatusFilter] = useState('all')                   // Filtro por estado del curso
  const [planFilter, setPlanFilter] = useState('all')                       // Filtro por plan de suscripción
  
  // ========================================
  // DATOS DE CURSOS PROGRAMADOS
  // ========================================
  
  const [scheduledCourses, setScheduledCourses] = useState([
    {
      id: 1,
      title: 'React Avanzado: Patrones y Mejores Prácticas',
      instructor: 'Dr. Ana García',
      category: 'tecnologia',
      level: 'avanzado',
      duration: '8h 30m',
      students: 0,
      status: 'scheduled', // 'scheduled', 'released', 'paused', 'cancelled'
      releaseDate: '2024-02-15T10:00:00Z',
      earlyAccessDate: '2024-02-08T10:00:00Z', // Para Plan Pro
      delayedAccessDate: '2024-02-22T10:00:00Z', // Para Plan Intermedio
      plans: {
        pro: { access: 'immediate', notified: true },
        intermedio: { access: 'delayed', notified: true },
        basico: { access: 'none', notified: false }
      },
      notifications: {
        email: { sent: 0, scheduled: 2 },
        push: { sent: 0, scheduled: 2 },
        inApp: { sent: 0, scheduled: 2 }
      },
      content: {
        videos: 12,
        quizzes: 8,
        exercises: 15,
        materials: 25
      },
      tags: ['React', 'JavaScript', 'Frontend', 'Patrones'],
      description: 'Aprende los patrones más avanzados de React y las mejores prácticas para aplicaciones escalables.'
    },
    {
      id: 2,
      title: 'Machine Learning con Python: De Cero a Experto',
      instructor: 'Prof. Carlos Mendoza',
      category: 'ciencias',
      level: 'intermedio',
      duration: '12h 45m',
      students: 0,
      status: 'scheduled',
      releaseDate: '2024-03-01T10:00:00Z',
      earlyAccessDate: '2024-02-24T10:00:00Z',
      delayedAccessDate: '2024-03-08T10:00:00Z',
      plans: {
        pro: { access: 'immediate', notified: true },
        intermedio: { access: 'delayed', notified: true },
        basico: { access: 'none', notified: false }
      },
      notifications: {
        email: { sent: 0, scheduled: 2 },
        push: { sent: 0, scheduled: 2 },
        inApp: { sent: 0, scheduled: 2 }
      },
      content: {
        videos: 18,
        quizzes: 12,
        exercises: 20,
        materials: 35
      },
      tags: ['Python', 'Machine Learning', 'Data Science', 'AI'],
      description: 'Domina las técnicas de Machine Learning desde los conceptos básicos hasta implementaciones avanzadas.'
    },
    {
      id: 3,
      title: 'Diseño UX/UI: Principios y Herramientas Modernas',
      instructor: 'Diseñadora Laura Vega',
      category: 'educacion',
      level: 'basico',
      duration: '6h 20m',
      students: 0,
      status: 'released',
      releaseDate: '2024-01-15T10:00:00Z',
      earlyAccessDate: '2024-01-08T10:00:00Z',
      delayedAccessDate: '2024-01-22T10:00:00Z',
      plans: {
        pro: { access: 'immediate', notified: true },
        intermedio: { access: 'delayed', notified: true },
        basico: { access: 'none', notified: false }
      },
      notifications: {
        email: { sent: 2, scheduled: 0 },
        push: { sent: 2, scheduled: 0 },
        inApp: { sent: 2, scheduled: 0 }
      },
      content: {
        videos: 10,
        quizzes: 6,
        exercises: 12,
        materials: 18
      },
      tags: ['UX', 'UI', 'Design', 'Figma'],
      description: 'Aprende los fundamentos del diseño de experiencia de usuario y las herramientas más utilizadas en la industria.'
    }
  ])
  
  // ========================================
  // DATOS DE NOTIFICACIONES
  // ========================================
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      courseId: 1,
      type: 'email',
      title: 'Nuevo curso disponible: React Avanzado',
      message: '¡Ya está disponible el curso de React Avanzado! Accede ahora con tu plan Pro.',
      scheduledFor: '2024-02-15T10:00:00Z',
      status: 'scheduled',
      recipients: {
        pro: 120,
        intermedio: 680,
        basico: 0
      }
    },
    {
      id: 2,
      courseId: 1,
      type: 'push',
      title: 'Nuevo curso: React Avanzado',
      message: 'Aprende patrones avanzados de React. ¡Disponible ahora!',
      scheduledFor: '2024-02-15T10:00:00Z',
      status: 'scheduled',
      recipients: {
        pro: 120,
        intermedio: 0,
        basico: 0
      }
    },
    {
      id: 3,
      courseId: 3,
      type: 'email',
      title: 'Curso liberado: Diseño UX/UI',
      message: 'El curso de Diseño UX/UI ya está disponible para tu plan.',
      scheduledFor: '2024-01-15T10:00:00Z',
      status: 'sent',
      recipients: {
        pro: 120,
        intermedio: 680,
        basico: 0
      }
    }
  ])
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    const colorMap = {
      'scheduled': 'text-blue-400 bg-blue-500/20 border border-blue-400/30',
      'released': 'text-green-400 bg-green-500/20 border border-green-400/30',
      'paused': 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30',
      'cancelled': 'text-red-400 bg-red-500/20 border border-red-400/30'
    }
    return colorMap[status] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    const textMap = {
      'scheduled': 'Programado',
      'released': 'Liberado',
      'paused': 'Pausado',
      'cancelled': 'Cancelado'
    }
    return textMap[status] || 'Desconocido'
  }
  
  // Función para obtener el color del nivel
  const getLevelColor = (level) => {
    const colorMap = {
      'basico': 'text-green-400 bg-green-500/20 border border-green-400/30',
      'intermedio': 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30',
      'avanzado': 'text-red-400 bg-red-500/20 border border-red-400/30'
    }
    return colorMap[level] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para obtener el color de la categoría
  const getCategoryColor = (category) => {
    const colorMap = {
      'tecnologia': 'text-blue-400 bg-blue-500/20 border border-blue-400/30',
      'ciencias': 'text-purple-400 bg-purple-500/20 border border-purple-400/30',
      'educacion': 'text-green-400 bg-green-500/20 border border-green-400/30'
    }
    return colorMap[category] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Función para calcular días hasta liberación
  const getDaysUntilRelease = (releaseDate) => {
    const now = new Date()
    const release = new Date(releaseDate)
    const diffTime = release - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para tarjetas de estadísticas
  const StatCard = ({ title, value, change, icon: Icon, color = 'purple' }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-2xl font-semibold text-white mt-1 drop-shadow-sm">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20 border border-${color}-400/30`}>
          <Icon size={24} className={`text-${color}-400`} />
        </div>
      </div>
    </div>
  )
  
  // Componente para tarjetas de cursos programados
  const CourseCard = ({ course, index }) => {
    const daysUntil = getDaysUntilRelease(course.releaseDate)
    const isReleased = course.status === 'released'
    const isScheduled = course.status === 'scheduled'
    
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg hover:bg-white/15 hover:shadow-2xl transition-all duration-300">
        {/* Encabezado */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-sm line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-white/80 mb-2">{course.instructor}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                {course.category}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                {course.level}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                {getStatusText(course.status)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
              <Eye size={16} />
            </button>
            <button className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors">
              <Edit size={16} />
            </button>
            <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Información del curso */}
        <div className="mb-4">
          <p className="text-sm text-white/70 mb-3 line-clamp-2">{course.description}</p>
          
          {/* Estadísticas de contenido */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-white">{course.content.videos}</p>
              <p className="text-xs text-white/70">Videos</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-white">{course.content.quizzes}</p>
              <p className="text-xs text-white/70">Quizzes</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-white">{course.content.exercises}</p>
              <p className="text-xs text-white/70">Ejercicios</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-white">{course.content.materials}</p>
              <p className="text-xs text-white/70">Materiales</p>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Fechas de liberación */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Liberación:</span>
            <span className="text-white font-medium">{formatDate(course.releaseDate)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Acceso Temprano (Pro):</span>
            <span className="text-white font-medium">{formatDate(course.earlyAccessDate)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Acceso Retrasado (Intermedio):</span>
            <span className="text-white font-medium">{formatDate(course.delayedAccessDate)}</span>
          </div>
        </div>
        
        {/* Acceso por planes */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white/90 mb-2">Acceso por Plan:</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Crown size={14} className="text-yellow-400" />
                <span className="text-xs text-white/80">Pro</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                course.plans.pro.access === 'immediate' 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
              }`}>
                {course.plans.pro.access === 'immediate' ? 'Inmediato' : 'No'}
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star size={14} className="text-purple-400" />
                <span className="text-xs text-white/80">Intermedio</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                course.plans.intermedio.access === 'delayed' 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
              }`}>
                {course.plans.intermedio.access === 'delayed' ? 'Retrasado' : 'No'}
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <BookOpen size={14} className="text-blue-400" />
                <span className="text-xs text-white/80">Básico</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                course.plans.basico.access === 'none' 
                  ? 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                  : 'bg-green-500/20 text-green-400 border border-green-400/30'
              }`}>
                No
              </span>
            </div>
          </div>
        </div>
        
        {/* Notificaciones */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white/90 mb-2">Notificaciones:</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Mail size={14} className="text-blue-400" />
                <span className="text-xs text-white/80">Email</span>
              </div>
              <div className="text-xs text-white/70">
                {course.notifications.email.sent}/{course.notifications.email.sent + course.notifications.email.scheduled}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Smartphone size={14} className="text-green-400" />
                <span className="text-xs text-white/80">Push</span>
              </div>
              <div className="text-xs text-white/70">
                {course.notifications.push.sent}/{course.notifications.push.sent + course.notifications.push.scheduled}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bell size={14} className="text-purple-400" />
                <span className="text-xs text-white/80">In-App</span>
              </div>
              <div className="text-xs text-white/70">
                {course.notifications.inApp.sent}/{course.notifications.inApp.sent + course.notifications.inApp.scheduled}
              </div>
            </div>
          </div>
        </div>
        
        {/* Contador de días */}
        {isScheduled && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-3">
              <p className="text-sm text-white/80 mb-1">Días hasta liberación:</p>
              <p className="text-2xl font-bold text-white">{daysUntil}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  // Componente para la vista de programación
  const ScheduleView = () => (
    <div className="space-y-6">
      {/* Encabezado con controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Programación de Cursos</h2>
          <p className="text-white/80 drop-shadow-md">Gestiona la liberación progresiva de contenido</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateSchedule(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <Plus size={16} />
            Programar Curso
          </button>
          <button
            onClick={() => setShowNotificationSettings(true)}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Bell size={16} />
            Notificaciones
          </button>
        </div>
      </div>
      
      {/* Estado del scheduler */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${
              schedulerStatus === 'active' ? 'bg-green-400' : 
              schedulerStatus === 'paused' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>
            <div>
              <h3 className="text-lg font-semibold text-white">Scheduler de Cursos</h3>
              <p className="text-white/70">
                Estado: {schedulerStatus === 'active' ? 'Activo' : 
                        schedulerStatus === 'paused' ? 'Pausado' : 'Detenido'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-500/20 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300">
              <Play size={16} />
            </button>
            <button className="px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all duration-300">
              <Pause size={16} />
            </button>
            <button className="px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300">
              <Settings size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-white/70">Próxima liberación</p>
            <p className="text-lg font-semibold text-white">{formatDate(nextRelease)}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-white/70">Frecuencia</p>
            <p className="text-lg font-semibold text-white capitalize">{releaseFrequency}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-white/70">Cursos programados</p>
            <p className="text-lg font-semibold text-white">{scheduledCourses.filter(c => c.status === 'scheduled').length}</p>
          </div>
        </div>
      </div>
      
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Cursos Programados"
          value={scheduledCourses.filter(c => c.status === 'scheduled').length}
          change={12.5}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Cursos Liberados"
          value={scheduledCourses.filter(c => c.status === 'released').length}
          change={8.3}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Notificaciones Enviadas"
          value={notifications.filter(n => n.status === 'sent').length}
          change={15.2}
          icon={Bell}
          color="purple"
        />
        <StatCard
          title="Usuarios Notificados"
          value={notifications.reduce((sum, n) => sum + Object.values(n.recipients).reduce((a, b) => a + b, 0), 0)}
          change={22.1}
          icon={Users}
          color="yellow"
        />
      </div>
      
      {/* Lista de cursos programados */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white drop-shadow-sm">Cursos Programados</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scheduledCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="space-y-6 min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#e9d1e6]/15 via-transparent to-[#d0008b]/25"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#a82ba0]/20 via-transparent to-[#e9d1e6]/10"></div>
      
      {/* Partículas flotantes */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400/40 rounded-full kelumy-float"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-pink-400/50 rounded-full kelumy-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-300/60 rounded-full kelumy-float delay-2000"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-300/45 rounded-full kelumy-pulse delay-500"></div>
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-500/50 rounded-full kelumy-float delay-700"></div>
      <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-pink-500/40 rounded-full kelumy-pulse delay-300"></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-purple-400/55 rounded-full kelumy-float delay-1200"></div>
      <div className="absolute bottom-1/3 right-10 w-4 h-4 bg-pink-400/45 rounded-full kelumy-pulse delay-800"></div>
      
      <div className="relative z-10 p-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Programador de Cursos</h1>
          <p className="text-white/80 drop-shadow-md">Liberación progresiva de contenido tipo Netflix</p>
        </div>
        
        {/* Navegación por pestañas */}
        <div className="border-b border-white/20">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'schedule', label: 'Programación', icon: Calendar },
              { id: 'courses', label: 'Cursos', icon: BookOpen },
              { id: 'notifications', label: 'Notificaciones', icon: Bell },
              { id: 'settings', label: 'Configuración', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeView === tab.id
                      ? 'border-purple-500 text-white drop-shadow-sm'
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
        
        {/* Contenido de las pestañas */}
        <div className="min-h-96">
          {activeView === 'schedule' && <ScheduleView />}
          {activeView === 'courses' && <div className="text-white">Cursos (Próximamente)</div>}
          {activeView === 'notifications' && <div className="text-white">Notificaciones (Próximamente)</div>}
          {activeView === 'settings' && <div className="text-white">Configuración (Próximamente)</div>}
        </div>
      </div>
    </div>
  )
}

export default CourseScheduler
