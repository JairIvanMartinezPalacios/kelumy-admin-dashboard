// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado y efectos
import React, { useState, useMemo, useCallback, useEffect } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  BookOpen,    // Icono de libro abierto para cursos
  Plus,        // Icono de más para agregar nuevos elementos
  Search,      // Icono de lupa para búsqueda
  Filter,      // Icono de filtro para filtrar contenido
  BarChart3,   // Icono de gráfico para analytics
  Upload,      // Icono de subida para carga de archivos
  DollarSign,  // Icono de dólar para precios y finanzas
  Settings,    // Icono de configuración para ajustes
  Eye,         // Icono de ojo para vista previa
  Edit,        // Icono de editar para modificar contenido
  Trash2,      // Icono de basura para eliminar
  Copy,        // Icono de copiar para duplicar
  Star,        // Icono de estrella para calificaciones
  Clock,       // Icono de reloj para duración
  CheckCircle, // Icono de check para completado
  Play,        // Icono de play para reproducir
  Users,       // Icono de usuarios para estudiantes
  Award,       // Icono de premio para certificados
  TrendingUp,  // Icono de tendencia para métricas
  Calendar,    // Icono de calendario para fechas
  Target,      // Icono de objetivo para metas
  Zap,         // Icono de rayo para destacados
  Atom,        // Icono de átomo para ciencias
  Laptop,      // Icono de laptop para tecnología
  GraduationCap, // Icono de graduación para educación
  ChevronRight, // Icono de chevron derecha para navegación
  X,           // Icono de X para cerrar
  Check,       // Icono de check para confirmar
  FileText,    // Icono de documento para descripción
  User,        // Icono de usuario para instructor
  AlertCircle,  // Icono de alerta para información
  Download     // Icono de descarga para exportaciones
} from 'lucide-react'

// Importa los subcomponentes especializados del módulo de cursos
import CourseEditor from './CourseEditor'           // Editor de contenido de cursos
import CourseMaterials from './CourseMaterials'     // Gestión de materiales y recursos
import CoursePricing from './CoursePricing'         // Gestión de precios y promociones
import CourseAnalytics from './CourseAnalytics'     // Analytics y métricas de cursos
import CourseCategories from './CourseCategories'   // Categorización y organización
import CourseInfoView from './CourseInfoView'       // Vista detallada de información del curso
import CourseLevelsView from './CourseLevelsView'   // Vista de niveles y dificultad

// ========================================
// COMPONENTE PRINCIPAL - CourseManagement
// ========================================

// Define el componente funcional CourseManagement que actúa como el centro de control
// para la gestión integral de cursos en la plataforma KELUMY
const CourseManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar la pestaña activa en la interfaz
  // 'overview': vista general, 'courses': lista de cursos, 'categories': categorías
  const [activeTab, setActiveTab] = useState('overview')
  
  // Estado para el término de búsqueda en tiempo real
  // Se actualiza con cada tecla presionada en el campo de búsqueda
  const [searchTerm, setSearchTerm] = useState('')
  
  // Estado para el término de búsqueda con debounce (retraso)
  // Se actualiza después de que el usuario deje de escribir por 300ms
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  
  // Estado para el filtro de estado de los cursos
  // 'all': todos, 'published': publicados, 'draft': borradores, 'archived': archivados
  const [statusFilter, setStatusFilter] = useState('all')
  
  // Estado para el curso seleccionado actualmente
  // Contiene toda la información del curso cuando se selecciona uno
  const [selectedCourse, setSelectedCourse] = useState(null)
  
  // Estado para controlar la visibilidad del modal de información del curso
  // true: modal visible, false: modal oculto
  const [showCourseInfo, setShowCourseInfo] = useState(false)
  
  // Estado para controlar la visibilidad del modal de niveles del curso
  // true: modal visible, false: modal oculto
  const [showCourseLevels, setShowCourseLevels] = useState(false)
  
  // Estado para controlar el modal de crear nuevo curso
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false)
  
  // Estado para el formulario de nuevo curso
  const [newCourseData, setNewCourseData] = useState({
    title: '',
    description: '',
    category: 'ciencias',
    level: 'Principiante',
    duration: '',
    price: '',
    instructor: ''
  })
  
  // Estado para resaltar métricas en el panel de resumen por estado
  const [overviewStatusFilter, setOverviewStatusFilter] = useState('all')
  
  // ========================================
  // DATOS ESTÁTICOS - Categorías y cursos de ejemplo
  // ========================================
  
  // Array que define las categorías principales de cursos disponibles
  // Cada categoría incluye: id único, nombre, icono, colores, descripción y conteo de cursos
  const categories = [
    {
      id: 'ciencias',                           // Identificador único de la categoría
      name: 'Ciencias',                         // Nombre visible de la categoría
      icon: Atom,                               // Componente de icono para la categoría
      color: 'from-blue-500 to-blue-700',       // Gradiente de colores para la categoría
      description: 'Matemáticas, física, química y ciencias naturales', // Descripción detallada
      courseCount: 6                            // Número de cursos en esta categoría
    },
    {
      id: 'tecnologia',                         // Identificador único de la categoría
      name: 'Tecnología',                       // Nombre visible de la categoría
      icon: Laptop,                             // Componente de icono para la categoría
      color: 'from-green-500 to-green-700',     // Gradiente de colores para la categoría
      description: 'Programación, desarrollo web y tecnología digital', // Descripción detallada
      courseCount: 5                            // Número de cursos en esta categoría
    },
    {
      id: 'educacion',                          // Identificador único de la categoría
      name: 'Educación',                        // Nombre visible de la categoría
      icon: GraduationCap,                      // Componente de icono para la categoría
      color: 'from-purple-500 to-purple-700',   // Gradiente de colores para la categoría
      description: 'Metodologías pedagógicas y desarrollo docente', // Descripción detallada
      courseCount: 5                            // Número de cursos en esta categoría
    }
  ]
  
  // Array que contiene todos los cursos disponibles en la plataforma
  // Cada curso incluye información completa: datos básicos, métricas, precios y estado
  const allCourses = [
    // ========================================
    // CURSOS DE CIENCIAS - Matemáticas, física, química
    // ========================================
    {
      id: 1,                                          // Identificador único del curso
      title: 'Cálculo Diferencial e Integral',        // Título del curso
      description: 'Domina los conceptos fundamentales del cálculo diferencial e integral', // Descripción detallada
      instructor: 'Dr. María González',               // Nombre del instructor
      category: 'ciencias',                           // Categoría del curso
      level: 'Intermedio',                            // Nivel de dificultad
      duration: '40 horas',                           // Duración total del curso
      students: 1250,                                 // Número de estudiantes inscritos
      rating: 4.7,                                    // Calificación promedio (1-5)
      price: 199,                                     // Precio actual en USD
      originalPrice: 399,                             // Precio original antes del descuento
      discount: 50,                                   // Porcentaje de descuento aplicado
      status: 'published',                            // Estado: published, draft, archived
      featured: true,                                 // Si el curso está destacado
      image: '/images/calculo-course.jpg',            // URL de la imagen del curso
      createdAt: '2024-01-15',                        // Fecha de creación
      lastUpdated: '2024-01-20',                      // Última fecha de actualización
      completionRate: 78,                             // Porcentaje de finalización de estudiantes
      revenue: 248750                                 // Ingresos generados por el curso
    },
    {
      id: 2,
      title: 'Física General',
      description: 'Fundamentos de mecánica, termodinámica y electromagnetismo',
      instructor: 'Dr. Carlos Ruiz',
      category: 'ciencias',
      level: 'Intermedio',
      duration: '35 horas',
      students: 980,
      rating: 4.6,
      price: 179,
      originalPrice: 359,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/fisica-course.jpg',
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18',
      completionRate: 72,
      revenue: 175420
    },
    {
      id: 3,
      title: 'Química General',
      description: 'Principios fundamentales de química orgánica e inorgánica',
      instructor: 'Dra. Ana Martínez',
      category: 'ciencias',
      level: 'Principiante',
      duration: '30 horas',
      students: 750,
      rating: 4.5,
      price: 159,
      originalPrice: 319,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/quimica-course.jpg',
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-15',
      completionRate: 68,
      revenue: 119250
    },
    {
      id: 4,
      title: 'Álgebra Lineal',
      description: 'Matrices, vectores y transformaciones lineales',
      instructor: 'Dr. Luis Herrera',
      category: 'ciencias',
      level: 'Avanzado',
      duration: '32 horas',
      students: 650,
      rating: 4.8,
      price: 189,
      originalPrice: 379,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/algebra-course.jpg',
      createdAt: '2024-01-01',
      lastUpdated: '2024-01-12',
      completionRate: 75,
      revenue: 122850
    },
    {
      id: 5,
      title: 'Ecuaciones Diferenciales',
      description: 'Resolución de ecuaciones diferenciales ordinarias y parciales',
      instructor: 'Dr. Roberto Silva',
      category: 'ciencias',
      level: 'Avanzado',
      duration: '28 horas',
      students: 420,
      rating: 4.9,
      price: 219,
      originalPrice: 439,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/ecuaciones-course.jpg',
      createdAt: '2023-12-28',
      lastUpdated: '2024-01-08',
      completionRate: 82,
      revenue: 91980
    },
    {
      id: 6,
      title: 'Inglés para Ciencias',
      description: 'Desarrollo de habilidades comunicativas en inglés para ciencias',
      instructor: 'Prof. Sarah Johnson',
      category: 'ciencias',
      level: 'Intermedio',
      duration: '25 horas',
      students: 580,
      rating: 4.4,
      price: 149,
      originalPrice: 299,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/ingles-course.jpg',
      createdAt: '2023-12-25',
      lastUpdated: '2024-01-05',
      completionRate: 70,
      revenue: 86420
    },
    
    // Cursos de Tecnología
    {
      id: 7,
      title: 'Inteligencia Artificial',
      description: 'Fundamentos de IA, machine learning y deep learning',
      instructor: 'Dr. Alex Chen',
      category: 'tecnologia',
      level: 'Avanzado',
      duration: '50 horas',
      students: 2100,
      rating: 4.9,
      price: 399,
      originalPrice: 799,
      discount: 50,
      status: 'published',
      featured: true,
      image: '/images/ia-course.jpg',
      createdAt: '2024-01-12',
      lastUpdated: '2024-01-22',
      completionRate: 85,
      revenue: 837900
    },
    {
      id: 8,
      title: 'Base de Datos',
      description: 'Diseño y administración de bases de datos relacionales y NoSQL',
      instructor: 'Ing. Patricia López',
      category: 'tecnologia',
      level: 'Intermedio',
      duration: '35 horas',
      students: 1650,
      rating: 4.7,
      price: 279,
      originalPrice: 559,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/bd-course.jpg',
      createdAt: '2024-01-08',
      lastUpdated: '2024-01-18',
      completionRate: 78,
      revenue: 460350
    },
    {
      id: 9,
      title: 'Páginas Web',
      description: 'Desarrollo frontend con HTML, CSS y JavaScript moderno',
      instructor: 'Dev. Miguel Torres',
      category: 'tecnologia',
      level: 'Principiante',
      duration: '30 horas',
      students: 1950,
      rating: 4.6,
      price: 199,
      originalPrice: 399,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/web-course.jpg',
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-15',
      completionRate: 72,
      revenue: 388050
    },
    {
      id: 10,
      title: 'Programación y Desarrollo de Aplicaciones',
      description: 'Desarrollo full-stack con las tecnologías más demandadas',
      instructor: 'Dev. Laura García',
      category: 'tecnologia',
      level: 'Intermedio',
      duration: '45 horas',
      students: 1800,
      rating: 4.8,
      price: 349,
      originalPrice: 699,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/programacion-course.jpg',
      createdAt: '2024-01-02',
      lastUpdated: '2024-01-12',
      completionRate: 80,
      revenue: 628200
    },
    {
      id: 11,
      title: 'Ciberseguridad y Protección Digital',
      description: 'Fundamentos de seguridad informática y protección de datos',
      instructor: 'Sec. David Kim',
      category: 'tecnologia',
      level: 'Avanzado',
      duration: '40 horas',
      students: 1200,
      rating: 4.9,
      price: 329,
      originalPrice: 659,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/cybersecurity-course.jpg',
      createdAt: '2023-12-30',
      lastUpdated: '2024-01-10',
      completionRate: 88,
      revenue: 394800
    },
    
    // Cursos de Educación
    {
      id: 12,
      title: 'Gestión Socioemocional',
      description: 'Estrategias para el desarrollo emocional en el aula',
      instructor: 'Psic. Elena Vargas',
      category: 'educacion',
      level: 'Intermedio',
      duration: '25 horas',
      students: 850,
      rating: 4.7,
      price: 179,
      originalPrice: 359,
      discount: 50,
      status: 'published',
      featured: true,
      image: '/images/socioemocional-course.jpg',
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-25',
      completionRate: 75,
      revenue: 152150
    },
    {
      id: 13,
      title: 'Gamificación',
      description: 'Integración de elementos de juego en la educación',
      instructor: 'Prof. Carlos Mendez',
      category: 'educacion',
      level: 'Principiante',
      duration: '20 horas',
      students: 720,
      rating: 4.5,
      price: 149,
      originalPrice: 299,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/gamificacion-course.jpg',
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-22',
      completionRate: 70,
      revenue: 107280
    },
    {
      id: 14,
      title: 'Laboratorios Creativos',
      description: 'Diseño de espacios de aprendizaje innovadores',
      instructor: 'Arq. María Fernández',
      category: 'educacion',
      level: 'Intermedio',
      duration: '22 horas',
      students: 650,
      rating: 4.6,
      price: 169,
      originalPrice: 339,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/laboratorios-course.jpg',
      createdAt: '2024-01-12',
      lastUpdated: '2024-01-20',
      completionRate: 68,
      revenue: 109850
    },
    {
      id: 15,
      title: 'Evaluación y Retroalimentación Efectiva',
      description: 'Metodologías modernas de evaluación educativa',
      instructor: 'Dr. Roberto Sánchez',
      category: 'educacion',
      level: 'Avanzado',
      duration: '28 horas',
      students: 580,
      rating: 4.8,
      price: 199,
      originalPrice: 399,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/evaluacion-course.jpg',
      createdAt: '2024-01-08',
      lastUpdated: '2024-01-18',
      completionRate: 82,
      revenue: 115420
    },
    {
      id: 16,
      title: 'Diseña tu Plan de Trabajo',
      description: 'Planificación estratégica y gestión de proyectos educativos',
      instructor: 'Mg. Ana Rodríguez',
      category: 'educacion',
      level: 'Intermedio',
      duration: '24 horas',
      students: 690,
      rating: 4.7,
      price: 189,
      originalPrice: 379,
      discount: 50,
      status: 'published',
      featured: false,
      image: '/images/plan-trabajo-course.jpg',
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-15',
      completionRate: 76,
      revenue: 130410
    }
  ]
  
  const getDurationHours = (duration) => {
    if (typeof duration === 'number') return duration
    if (typeof duration === 'string') {
      const match = duration.match(/\d+/)
      return match ? parseInt(match[0], 10) : 0
    }
    return 0
  }

  const totalStudents = useMemo(
    () => allCourses.reduce((sum, course) => sum + course.students, 0),
    [allCourses]
  )

  const totalRevenue = useMemo(
    () => allCourses.reduce((sum, course) => sum + course.revenue, 0),
    [allCourses]
  )

  const averageRating = useMemo(
    () => (allCourses.reduce((sum, course) => sum + course.rating, 0) / allCourses.length).toFixed(1),
    [allCourses]
  )

  const averageCompletion = useMemo(
    () => Math.round(allCourses.reduce((sum, course) => sum + course.completionRate, 0) / allCourses.length),
    [allCourses]
  )

  const featuredCount = useMemo(
    () => allCourses.filter(course => course.featured).length,
    [allCourses]
  )

  const totalHours = useMemo(
    () => allCourses.reduce((sum, course) => sum + getDurationHours(course.duration), 0),
    [allCourses]
  )

  const instructorPerformance = useMemo(() => {
    const stats = {}
    allCourses.forEach(course => {
      if (!stats[course.instructor]) {
        stats[course.instructor] = {
          instructor: course.instructor,
          students: 0,
          revenue: 0,
          ratingSum: 0,
          courses: 0
        }
      }
      stats[course.instructor].students += course.students
      stats[course.instructor].revenue += course.revenue
      stats[course.instructor].ratingSum += course.rating
      stats[course.instructor].courses += 1
    })
    return Object.values(stats)
      .map(item => ({
        ...item,
        avgRating: (item.ratingSum / item.courses).toFixed(1)
      }))
      .sort((a, b) => b.students - a.students)
  }, [allCourses])

  const courseActivity = useMemo(() => [
    {
      id: 1,
      title: 'Precio actualizado',
      course: allCourses[0]?.title || 'Nuevo curso MQ',
      time: 'Hace 2 horas',
      description: `Precio ajustado a $${allCourses[0]?.price || 0}`,
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-500/15'
    },
    {
      id: 2,
      title: 'Nuevo módulo publicado',
      course: allCourses[4]?.title || 'Programa avanzado',
      time: 'Hace 5 horas',
      description: 'Se agregó el módulo "Integrales aplicadas"',
      icon: Upload,
      color: 'text-purple-300',
      bg: 'bg-purple-500/15'
    },
    {
      id: 3,
      title: 'Reseñas destacadas',
      course: allCourses[7]?.title || 'Curso destacado',
      time: 'Hace 1 día',
      description: '15 estudiantes calificaron con 5 ⭐',
      icon: Star,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/15'
    },
    {
      id: 4,
      title: 'Objetivo alcanzado',
      course: allCourses[10]?.title || 'Programa estratégico',
      time: 'Hace 2 días',
      description: 'Se superó la meta de inscripciones del mes',
      icon: Target,
      color: 'text-cyan-300',
      bg: 'bg-cyan-500/15'
    }
  ], [allCourses])

  const conversionMetrics = useMemo(() => {
    const visits = 35000
    const leads = 12800
    const trials = 4800
    const purchases = totalStudents
    return { visits, leads, trials, purchases }
  }, [totalStudents])

  const conversionSteps = useMemo(() => {
    const { visits, leads, trials, purchases } = conversionMetrics
    const base = visits || 1
    return [
      { label: 'Visitas', value: visits, percentage: 100, color: 'from-purple-500 to-pink-500' },
      { label: 'Leads captados', value: leads, percentage: Math.round((leads / base) * 100), color: 'from-pink-500 to-orange-500' },
      { label: 'Pruebas activas', value: trials, percentage: Math.round((trials / base) * 100), color: 'from-orange-500 to-amber-500' },
      { label: 'Compras confirmadas', value: purchases, percentage: Math.round((purchases / base) * 100), color: 'from-emerald-500 to-green-500' }
    ]
  }, [conversionMetrics])
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio (memoizadas)
  // ========================================
  
  // Función memoizada para obtener los colores del badge de estado
  // Retorna clases CSS de Tailwind para diferentes estados de curso
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-500/20 border border-green-400/30'    // Verde para publicado
      case 'draft': return 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30'      // Amarillo para borrador
      case 'archived': return 'text-white/70 bg-white/10 border border-white/20'              // Gris para archivado
      default: return 'text-white/70 bg-white/10 border border-white/20'                      // Por defecto gris
    }
  }, [])
  
  // Función memoizada para obtener el texto del estado en español
  // Convierte el estado técnico a texto legible para el usuario
  const getStatusText = useCallback((status) => {
    switch (status) {
      case 'published': return 'Publicado'      // Estado: curso disponible públicamente
      case 'draft': return 'Borrador'           // Estado: curso en desarrollo
      case 'archived': return 'Archivado'       // Estado: curso archivado/descontinuado
      default: return 'Desconocido'             // Estado no reconocido
    }
  }, [])
  
  // Función memoizada para obtener el icono correspondiente al estado
  // Retorna el componente de icono apropiado para cada estado
  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case 'published': return CheckCircle      // Icono de check para publicado
      case 'draft': return Clock                // Icono de reloj para borrador
      case 'archived': return Trash2            // Icono de basura para archivado
      default: return Clock                     // Por defecto reloj
    }
  }, [])
  
  // Función memoizada para obtener los colores del badge de nivel de dificultad
  // Retorna clases CSS de Tailwind para diferentes niveles de curso
  const getLevelColor = useCallback((level) => {
    switch (level) {
      case 'Principiante': return 'text-green-400 bg-green-500/20 border border-green-400/30'  // Verde para principiante
      case 'Intermedio': return 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30'  // Amarillo para intermedio
      case 'Avanzado': return 'text-red-400 bg-red-500/20 border border-red-400/30'             // Rojo para avanzado
      default: return 'text-white/70 bg-white/10 border border-white/20'                        // Por defecto gris
    }
  }, [])
  
  // Función memoizada para filtrar cursos basado en búsqueda y estado
  // Optimiza el rendimiento al recalcular solo cuando cambian las dependencias
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      // Verifica si el término de búsqueda coincide con título, instructor o categoría
      const matchesSearch = course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           course.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      // Verifica si el estado del curso coincide con el filtro seleccionado
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter
      // Retorna true si ambos filtros coinciden
      return matchesSearch && matchesStatus
    })
  }, [allCourses, debouncedSearchTerm, statusFilter])
  
  // Estadísticas agregadas por estado del curso
  const courseStatusStats = useMemo(() => {
    const mapStats = (list) => ({
      count: list.length,
      students: list.reduce((sum, course) => sum + course.students, 0),
      revenue: list.reduce((sum, course) => sum + course.revenue, 0)
    })
    
    const published = allCourses.filter(course => course.status === 'published')
    const draft = allCourses.filter(course => course.status === 'draft')
    const archived = allCourses.filter(course => course.status === 'archived')
    
    return {
      total: allCourses.length || 1,
      published: mapStats(published),
      draft: mapStats(draft),
      archived: mapStats(archived)
    }
  }, [allCourses])
  
  // Top de cursos por ingresos
  const topCoursesByRevenue = useMemo(() => {
    return [...allCourses]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }, [allCourses])
  
  // Actividad reciente basada en la última actualización de cada curso
  const recentCourseActivities = useMemo(() => {
    return [...allCourses]
      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
      .slice(0, 5)
      .map((course, index) => ({
        id: `${course.id}-${index}`,
        courseTitle: course.title,
        timestamp: new Date(course.lastUpdated).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
        action: index % 2 === 0 ? 'Actualización de contenido' : 'Nuevo estudiante inscrito',
        type: index % 2 === 0 ? 'update' : 'enrollment',
        value: index % 2 === 0 ? `$${course.price}` : `+${Math.max(1, Math.floor(course.students * 0.03))} alumnos`
      }))
  }, [allCourses])
  
  // ========================================
  // EFECTOS - useEffect para efectos secundarios
  // ========================================
  
  // Efecto para implementar debounce en la búsqueda
  // Evita realizar búsquedas excesivas mientras el usuario está escribiendo
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)  // Actualiza el término de búsqueda con debounce
    }, 300) // Retraso de 300ms
    
    // Cleanup: cancela el timer anterior si el componente se desmonta o cambia searchTerm
    return () => clearTimeout(timer)
  }, [searchTerm])
  
  // ========================================
  // FUNCIONES DE MANEJO DE EVENTOS - useCallback para optimización
  // ========================================
  
  // Función memoizada para manejar cambios en el campo de búsqueda
  // Actualiza el estado searchTerm con el valor ingresado por el usuario
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])
  
  // Función memoizada para manejar cambios en el filtro de estado
  // Actualiza el filtro de estado según la selección del usuario
  const handleStatusFilterChange = useCallback((e) => {
    setStatusFilter(e.target.value)
  }, [])
  
  // Función memoizada para manejar cambios de pestañas
  // Cambia la pestaña activa en la interfaz de usuario
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
  }, [])
  
  // Función memoizada para mostrar información detallada de un curso
  // Abre el modal con la información completa del curso seleccionado
  const handleViewCourseInfo = useCallback((course) => {
    setSelectedCourse(course)
    setShowCourseInfo(true)
  }, [])
  
  // Función memoizada para cerrar el modal de información del curso
  // Limpia el estado y cierra el modal
  const handleBackFromCourseInfo = useCallback(() => {
    setShowCourseInfo(false)      // Oculta el modal
    setSelectedCourse(null)       // Limpia el curso seleccionado
  }, [])
  
  // Función memoizada para editar un curso desde el modal de información
  // Cierra el modal y navega al editor de cursos
  const handleEditFromCourseInfo = useCallback(() => {
    setShowCourseInfo(false)      // Oculta el modal de información
    setActiveTab('editor')        // Cambia a la pestaña del editor
  }, [])
  
  // Función memoizada para mostrar los niveles de un curso
  // Abre el modal con la información de niveles del curso seleccionado
  const handleViewCourseLevels = useCallback((course) => {
    setSelectedCourse(course)     // Establece el curso seleccionado
    setShowCourseLevels(true)     // Muestra el modal de niveles
  }, [])
  
  // Función memoizada para cerrar el modal de niveles del curso
  // Limpia el estado y cierra el modal
  const handleBackFromCourseLevels = useCallback(() => {
    setShowCourseLevels(false)    // Oculta el modal
    setSelectedCourse(null)       // Limpia el curso seleccionado
  }, [])
  
  // Función memoizada para editar un curso desde el modal de niveles
  // Cierra el modal y navega al editor de cursos
  const handleEditFromCourseLevels = useCallback(() => {
    setShowCourseLevels(false)    // Oculta el modal de niveles
    setActiveTab('editor')        // Cambia a la pestaña del editor
  }, [])
  
  // Función para abrir el modal de crear nuevo curso
  const handleOpenCreateCourseModal = useCallback(() => {
    setShowCreateCourseModal(true)
    setNewCourseData({
      title: '',
      description: '',
      category: 'ciencias',
      level: 'Principiante',
      duration: '',
      price: '',
      instructor: ''
    })
  }, [])
  
  // Función para cerrar el modal de crear nuevo curso
  const handleCloseCreateCourseModal = useCallback(() => {
    setShowCreateCourseModal(false)
  }, [])
  
  // Función para manejar cambios en el formulario de nuevo curso
  const handleNewCourseChange = useCallback((field, value) => {
    setNewCourseData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])
  
  // Función para crear un nuevo curso
  const handleCreateCourse = useCallback((e) => {
    e.preventDefault()
    // Aquí se implementaría la lógica para crear el curso
    console.log('Creando curso:', newCourseData)
    setShowCreateCourseModal(false)
    setActiveTab('editor')
    setSelectedCourse({
      id: Date.now(),
      ...newCourseData,
      students: 0,
      rating: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    })
  }, [newCourseData])
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes memoizados
  // ========================================
  
  // Componente memoizado para renderizar un curso individual
  // Optimiza el rendimiento al evitar re-renderizados innecesarios
  const CourseItem = React.memo(({ course }) => {
    // Obtiene el icono correspondiente al estado del curso
    const StatusIcon = getStatusIcon(course.status)
    
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 group shadow-lg">
        <div className="flex gap-6">
          {/* Imagen del curso */}
          <div className="w-48 h-32 bg-white/5 backdrop-blur-sm rounded-lg flex-shrink-0 relative overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <BookOpen size={32} className="text-white" />
            </div>
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                <StatusIcon size={12} className="inline mr-1" />
                {getStatusText(course.status)}
              </span>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center gap-2 text-white text-xs">
                <Play size={12} />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
          
          {/* Información del curso */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2 drop-shadow-sm">
                  {course.title}
                </h3>
                <p className="text-white/80 mb-3 line-clamp-2 drop-shadow-sm">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {course.students.toLocaleString()} estudiantes
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    {course.rating} ({course.completionRate}% completado)
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(course.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {/* Precio */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-purple-400">{`$${course.price}`}</span>
                  <span className="text-sm text-white/60 line-through">{`$${course.originalPrice}`}</span>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                    -{course.discount}%
                  </span>
                </div>
                <p className="text-sm text-white/70">{`$${course.revenue.toLocaleString()} en ventas`}</p>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-white/90">Instructor: {course.instructor}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className="text-white/70">{course.category}</span>
              </div>
              
              {/* Acciones */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleViewCourseInfo(course)}
                  className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-all duration-200"
                  title="Ver información detallada"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => handleViewCourseLevels(course)}
                  className="p-2 text-white/60 hover:text-pink-400 hover:bg-pink-500/20 rounded-lg transition-all duration-200"
                  title="Ver niveles del curso"
                >
                  <Target size={18} />
                </button>
                <button 
                  onClick={() => {
                    setSelectedCourse(course)
                    setActiveTab('editor')
                  }}
                  className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                  title="Editar curso"
                >
                  <Edit size={18} />
                </button>
                <button className="p-2 text-white/60 hover:text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200">
                  <Copy size={18} />
                </button>
                <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  
  // Agregar displayName para mejor debugging
  CourseItem.displayName = 'CourseItem'
  
  // Componente para el dashboard de cursos
  const CourseOverview = () => {
    const statusFilters = [
      { id: 'all', label: 'Todos' },
      { id: 'published', label: 'Publicados' },
      { id: 'draft', label: 'Borradores' },
      { id: 'archived', label: 'Archivados' }
    ]
    
    const statusCards = [
      {
        id: 'published',
        label: 'Cursos publicados',
        description: 'Disponibles para los estudiantes',
        icon: CheckCircle,
        accent: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
        data: courseStatusStats.published
      },
      {
        id: 'draft',
        label: 'Cursos en borrador',
        description: 'Pendientes de publicación',
        icon: Clock,
        accent: 'from-amber-500/30 via-amber-500/10 to-transparent',
        data: courseStatusStats.draft
      },
      {
        id: 'archived',
        label: 'Cursos archivados',
        description: 'Fuera del catálogo activo',
        icon: Trash2,
        accent: 'from-purple-500/20 via-purple-500/5 to-transparent',
        data: courseStatusStats.archived
      }
    ]
    
    const totalStudentsByStatus = courseStatusStats.published.students + courseStatusStats.draft.students + courseStatusStats.archived.students
    const totalRevenueByStatus = courseStatusStats.published.revenue + courseStatusStats.draft.revenue + courseStatusStats.archived.revenue
    
    const activityTypeMeta = {
      update: {
        label: 'Actualización',
        badge: 'bg-blue-500/15 text-blue-200',
        icon: Edit
      },
      enrollment: {
        label: 'Inscripción',
        badge: 'bg-green-500/15 text-green-200',
        icon: Users
      }
    }
    
    const highlightedStatus = overviewStatusFilter === 'all'
      ? {
          label: 'Todos los cursos',
          count: courseStatusStats.total,
          students: totalStudentsByStatus,
          revenue: totalRevenueByStatus
        }
      : {
          label: statusCards.find(card => card.id === overviewStatusFilter)?.label || '',
          count: courseStatusStats[overviewStatusFilter].count,
          students: courseStatusStats[overviewStatusFilter].students,
          revenue: courseStatusStats[overviewStatusFilter].revenue
        };
    
    return (
      <div className="space-y-8">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Total Cursos</p>
              <p className="text-3xl font-bold text-white drop-shadow-lg">{allCourses.length}</p>
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                +2 este mes
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen size={28} className="text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-400">Estudiantes Activos</p>
              <p className="text-3xl font-bold text-white drop-shadow-lg">
                {totalStudents.toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                +15% este mes
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users size={28} className="text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-400">Ingresos Totales</p>
              <p className="text-3xl font-bold text-white drop-shadow-lg">
                {`$${totalRevenue.toLocaleString()}`}
              </p>
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                +23% este mes
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <DollarSign size={28} className="text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-400">Calificación Promedio</p>
              <p className="text-3xl font-bold text-white drop-shadow-lg">
                {averageRating}
              </p>
              <p className="text-xs text-yellow-400 mt-1 flex items-center gap-1">
                <Star size={12} className="fill-yellow-400" />
                Excelente
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Award size={28} className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
              <Target size={24} className="text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Tasa de Finalización</p>
              <p className="text-2xl font-bold text-white">
                {averageCompletion}%
              </p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(averageCompletion, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Zap size={24} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Cursos Destacados</p>
              <p className="text-2xl font-bold text-white">
                {featuredCount}
              </p>
            </div>
          </div>
          <p className="text-xs text-white/60">
            {Math.round((featuredCount / allCourses.length) * 100)}% del total
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Clock size={24} className="text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Horas de Contenido</p>
              <p className="text-2xl font-bold text-white">
                {totalHours}h
              </p>
            </div>
          </div>
          <p className="text-xs text-white/60">
            Promedio: {Math.round(totalHours / allCourses.length)}h por curso
          </p>
        </div>
      </div>

      {/* Panel de estados */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-white/60">Visión rápida</p>
            <h3 className="text-2xl font-bold text-white drop-shadow-sm">Estado de los cursos</h3>
            <p className="text-white/70 text-sm mt-1">
              {`${highlightedStatus.label}: ${highlightedStatus.count} cursos · ${highlightedStatus.students.toLocaleString()} estudiantes · $${highlightedStatus.revenue.toLocaleString()} USD`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map(filterOption => (
              <button
                key={filterOption.id}
                onClick={() => setOverviewStatusFilter(filterOption.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  overviewStatusFilter === filterOption.id
                    ? 'bg-white/20 text-white border-white/40 shadow-lg'
                    : 'text-white/60 border-white/20 hover:border-white/40'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusCards.map(card => {
            const Icon = card.icon
            const percentage = Math.round((card.data.count / courseStatusStats.total) * 100)
            return (
              <div
                key={card.id}
                className={`relative overflow-hidden bg-white/5 border border-white/15 rounded-xl p-5 transition-all duration-300 ${
                  overviewStatusFilter === card.id ? 'ring-2 ring-white/40' : 'hover:bg-white/10'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-40 pointer-events-none`}></div>
                <div className="relative flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-white/70">{card.label}</p>
                    <p className="text-3xl font-bold text-white drop-shadow-lg">{card.data.count}</p>
                    <p className="text-xs text-white/60 mt-1">{card.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon size={22} className="text-white" />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                    <span>Participación</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-white to-white/50 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/70">
                    <span>{card.data.students.toLocaleString()} estudiantes</span>
                    <span>{`$${card.data.revenue.toLocaleString()}`}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Insights estratégicos */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Embudo de conversión</h3>
              <p className="text-sm text-white/60">Seguimiento mensual MQ+</p>
            </div>
            <span className="text-xs text-white/50">Últimos 30 días</span>
          </div>
          <div className="space-y-4">
            {conversionSteps.map(step => (
              <div key={step.label}>
                <div className="flex items-center justify-between text-sm text-white/80 mb-1">
                  <span>{step.label}</span>
                  <span className="font-semibold">{step.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${step.color}`}
                    style={{ width: `${Math.min(step.percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white/50 mt-1">{step.percentage}% del total</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Rendimiento por instructor</h3>
            <p className="text-sm text-white/60">Top 3 instructores</p>
          </div>
          <button className="text-xs text-purple-300 hover:text-white transition-colors">Ver todos</button>
        </div>
          <div className="space-y-4">
            {instructorPerformance.slice(0, 3).map((item, index) => (
              <div
                key={item.instructor}
                className={`flex items-center justify-between ${index !== 0 ? 'pt-4 border-t border-white/10' : ''}`}
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.instructor}</p>
                  <p className="text-xs text-white/60">{item.courses} cursos • {item.avgRating}⭐</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-purple-300">{item.students.toLocaleString()} est.</p>
                  <p className="text-xs text-white/50">{`$${item.revenue.toLocaleString()} en ventas`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Actividad reciente</h3>
              <p className="text-sm text-white/60">Movimientos del equipo</p>
            </div>
            <button className="text-xs text-purple-300 hover:text-white transition-colors">Ver historial</button>
          </div>
          <div className="space-y-4">
            {courseActivity.map(activity => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center`}>
                    <Icon size={18} className={activity.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{activity.title}</p>
                    <p className="text-xs text-white/50">{activity.course} • {activity.time}</p>
                    <p className="text-xs text-white/60 mt-1">{activity.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Actividad operativa y rendimiento */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-sm">Actividad operativa</h3>
              <p className="text-sm text-white/60">Últimos movimientos en el catálogo</p>
            </div>
            <button className="text-xs text-white/60 hover:text-white flex items-center gap-1">
              Ver historial
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {recentCourseActivities.map((activity) => {
              const meta = activityTypeMeta[activity.type]
              const ActivityIcon = meta.icon
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <ActivityIcon size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-white">{activity.courseTitle}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${meta.badge}`}>
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-sm text-white/70">{activity.action} · {activity.value}</p>
                  </div>
                  <span className="text-xs text-white/50">{activity.timestamp}</span>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-sm">Top cursos por ingresos</h3>
              <p className="text-sm text-white/60">Comparativa de los últimos 30 días</p>
            </div>
            <button className="text-xs text-white/60 hover:text-white flex items-center gap-1">
              Exportar
              <Download size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-white/60">
                  <th className="py-2 font-medium">Curso</th>
                  <th className="py-2 font-medium">Estudiantes</th>
                  <th className="py-2 font-medium">Rating</th>
                  <th className="py-2 font-medium">Ingresos</th>
                  <th className="py-2 font-medium">Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {topCoursesByRevenue.map((course, index) => (
                  <tr key={course.id} className="border-t border-white/10 text-white/80">
                    <td className="py-3">
                      <div>
                        <p className="font-semibold text-white flex items-center gap-2">
                          <span className="text-xs text-white/50">#{index + 1}</span>
                          {course.title}
                        </p>
                        <p className="text-xs text-white/50">{course.category}</p>
                      </div>
                    </td>
                    <td className="py-3">{course.students.toLocaleString()}</td>
                    <td className="py-3 flex items-center gap-1 text-white">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      {course.rating}
                    </td>
                    <td className="py-3">{`$${course.revenue.toLocaleString()}`}</td>
                    <td className="py-3 text-white/60">
                      {new Date(course.lastUpdated).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Gráficos de tendencias y analíticas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Gráfico de crecimiento de estudiantes */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Crecimiento de Estudiantes</h3>
              <p className="text-sm text-white/60">Últimos 6 meses</p>
            </div>
            <TrendingUp size={20} className="text-green-400" />
          </div>
          <div className="space-y-3">
            {[
              { month: 'Junio', students: 1200, growth: 12 },
              { month: 'Julio', students: 1450, growth: 20 },
              { month: 'Agosto', students: 1680, growth: 15 },
              { month: 'Septiembre', students: 2100, growth: 25 },
              { month: 'Octubre', students: 2450, growth: 16 },
              { month: 'Noviembre', students: totalStudents, growth: 18 }
            ].map((data, index) => {
              const maxStudents = totalStudents
              const percentage = (data.students / maxStudents) * 100
              return (
                <div key={data.month} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80 font-medium">{data.month}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{data.students.toLocaleString()}</span>
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <TrendingUp size={12} />
                        +{data.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Distribución por categorías */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Distribución por Categorías</h3>
              <p className="text-sm text-white/60">Cursos y estudiantes</p>
            </div>
            <BarChart3 size={20} className="text-purple-400" />
          </div>
          <div className="space-y-4">
            {categories.map(category => {
              const categoryCourses = allCourses.filter(c => c.category === category.id)
              const categoryStudents = categoryCourses.reduce((sum, c) => sum + c.students, 0)
              const percentage = (categoryStudents / totalStudents) * 100
              const Icon = category.icon
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <Icon size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{categoryStudents.toLocaleString()}</p>
                      <p className="text-xs text-white/60">{categoryCourses.length} cursos</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/50">{percentage.toFixed(1)}% del total</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Métricas de engagement */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Métricas de Engagement</h3>
              <p className="text-sm text-white/60">Indicadores clave de rendimiento</p>
            </div>
            <Target size={20} className="text-pink-400" />
          </div>
          <div className="space-y-6">
            {[
              {
                label: 'Tasa de Inscripción',
                value: 78,
                target: 85,
                color: 'from-blue-500 to-cyan-500',
                icon: Users
              },
              {
                label: 'Satisfacción del Estudiante',
                value: 92,
                target: 90,
                color: 'from-green-500 to-emerald-500',
                icon: Star
              },
              {
                label: 'Retención de Cursos',
                value: 85,
                target: 80,
                color: 'from-purple-500 to-pink-500',
                icon: Target
              },
              {
                label: 'Tiempo Promedio de Estudio',
                value: 68,
                target: 75,
                color: 'from-orange-500 to-red-500',
                icon: Clock
              }
            ].map(metric => {
              const MetricIcon = metric.icon
              const isAboveTarget = metric.value >= metric.target
              
              return (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MetricIcon size={16} className="text-white/70" />
                      <span className="text-sm text-white/80">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{metric.value}%</span>
                      {isAboveTarget ? (
                        <TrendingUp size={14} className="text-green-400" />
                      ) : (
                        <span className="text-xs text-white/50">Meta: {metric.target}%</span>
                      )}
                    </div>
                  </div>
                  <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-500`}
                      style={{ width: `${metric.value}%` }}
                    />
                    {/* Indicador de meta */}
                    <div
                      className="absolute top-0 h-full w-0.5 bg-white/50"
                      style={{ left: `${metric.target}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Comparativa de ingresos */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Ingresos por Nivel</h3>
              <p className="text-sm text-white/60">Comparativa de rendimiento</p>
            </div>
            <DollarSign size={20} className="text-yellow-400" />
          </div>
          <div className="space-y-4">
            {['Principiante', 'Intermedio', 'Avanzado'].map(level => {
              const levelCourses = allCourses.filter(c => c.level === level)
              const levelRevenue = levelCourses.reduce((sum, c) => sum + c.revenue, 0)
              const levelStudents = levelCourses.reduce((sum, c) => sum + c.students, 0)
              const avgRevenue = levelCourses.length > 0 ? levelRevenue / levelCourses.length : 0
              const percentage = (levelRevenue / totalRevenue) * 100
              
              return (
                <div key={level} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{level}</p>
                      <p className="text-xs text-white/60">{levelCourses.length} cursos • {levelStudents.toLocaleString()} estudiantes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-purple-400">{`$${levelRevenue.toLocaleString()}`}</p>
                      <p className="text-xs text-white/60">Prom: {`$${Math.round(avgRevenue).toLocaleString()}`}</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/50">{percentage.toFixed(1)}% de los ingresos totales</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tabla de rendimiento de cursos destacados */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white drop-shadow-sm">Top Cursos por Rendimiento</h3>
            <p className="text-sm text-white/60 mt-1">Cursos con mejor desempeño este mes</p>
          </div>
          <button 
            onClick={() => setActiveTab('all-courses')}
            className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-200 flex items-center gap-2"
          >
            Ver todos
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Curso</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Estudiantes</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Rating</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Finalización</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Ingresos</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {allCourses
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
                .map((course, index) => (
                  <tr 
                    key={course.id} 
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => handleViewCourseInfo(course)}
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white line-clamp-1">{course.title}</p>
                          <p className="text-xs text-white/60">{course.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users size={14} className="text-green-400" />
                        <span className="text-sm font-semibold text-white">{course.students.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-white">{course.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-semibold text-white">{course.completionRate}%</span>
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className="text-sm font-bold text-purple-400">{`$${course.revenue.toLocaleString()}`}</span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex items-center justify-center">
                        <TrendingUp size={16} className="text-green-400" />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cursos destacados */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-8 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white drop-shadow-sm">Cursos Destacados</h3>
          <button 
            onClick={() => setActiveTab('all-courses')}
            className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-200"
          >
            Ver todos
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {allCourses.filter(course => course.featured).map((course) => (
            <div key={course.id} className="group cursor-pointer">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl h-56 mb-5 relative overflow-hidden border border-white/20 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <BookOpen size={56} className="text-white" />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-yellow-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-yellow-400/30 shadow-lg">
                    DESTACADO
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <Play size={18} />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors drop-shadow-sm">
                  {course.title}
                </h4>
                <p className="text-sm text-white/80 line-clamp-2 drop-shadow-sm leading-relaxed">{course.description}</p>
                
                <div className="flex items-center gap-5 text-sm text-white/70">
                  <div className="flex items-center gap-1.5">
                    <Users size={16} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={16} />
                    <span>{course.completionRate}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-purple-400">{`$${course.price}`}</span>
                    <span className="text-sm text-white/60 line-through">{`$${course.originalPrice}`}</span>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full border border-red-500/30 font-medium">
                      -{course.discount}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewCourseInfo(course)}
                      className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-all duration-200"
                      title="Ver información"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedCourse(course)
                        setActiveTab('editor')
                      }}
                      className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                      title="Editar curso"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }
  
  // Componente para mostrar todos los cursos por categorías en columnas
  const AllCoursesView = () => {
    const [viewMode, setViewMode] = React.useState('grid') // 'grid' o 'list'
    const [sortBy, setSortBy] = React.useState('recent') // 'recent', 'popular', 'rating', 'revenue'
    const [filterLevel, setFilterLevel] = React.useState('all') // 'all', 'Principiante', 'Intermedio', 'Avanzado'
    
    const sortedAndFilteredCourses = React.useMemo(() => {
      let courses = [...allCourses]
      
      // Filtrar por nivel
      if (filterLevel !== 'all') {
        courses = courses.filter(course => course.level === filterLevel)
      }
      
      // Ordenar
      switch (sortBy) {
        case 'popular':
          courses.sort((a, b) => b.students - a.students)
          break
        case 'rating':
          courses.sort((a, b) => b.rating - a.rating)
          break
        case 'revenue':
          courses.sort((a, b) => b.revenue - a.revenue)
          break
        case 'recent':
        default:
          courses.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
          break
      }
      
      return courses
    }, [sortBy, filterLevel])
    
    return (
    <div className="space-y-6">
      {/* Barra de filtros y controles */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-white/70" />
              <span className="text-sm font-medium text-white/80">Filtros:</span>
            </div>
            
            {/* Filtro por nivel */}
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
            >
              <option value="all">Todos los niveles</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
            
            {/* Ordenar por */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
            >
              <option value="recent">Más recientes</option>
              <option value="popular">Más populares</option>
              <option value="rating">Mejor calificados</option>
              <option value="revenue">Mayor ingreso</option>
            </select>
            
            <span className="text-sm text-white/60">
              {sortedAndFilteredCourses.length} curso{sortedAndFilteredCourses.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {/* Selector de vista */}
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-purple-500/30 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Cuadrícula
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-500/30 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((category, categoryIndex) => {
          const Icon = category.icon
          const categoryCourses = allCourses.filter(course => course.category === category.id)
          
          return (
            <div 
              key={category.id} 
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              {/* Encabezado de la categoría */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">{category.name}</h3>
                  <p className="text-sm text-white/80 drop-shadow-sm">{category.description}</p>
                  <span className="text-xs text-white/70">{categoryCourses.length} cursos</span>
                </div>
              </div>
              
              {/* Lista de cursos */}
              <div className="space-y-3">
                {categoryCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="group p-4 border border-white/20 rounded-lg hover:border-purple-400/50 hover:bg-white/5 hover:shadow-lg transition-all duration-200 bg-white/5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors drop-shadow-sm">
                          {course.title}
                        </h4>
                        <p className="text-sm text-white/80 mb-2 line-clamp-2 drop-shadow-sm">
                          {course.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-white/70">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {course.students} estudiantes
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-400" />
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      
                      {/* Botones de acción */}
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleViewCourseInfo(course)}
                          className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-all duration-200"
                          title="Ver información detallada"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleViewCourseLevels(course)}
                          className="p-2 text-white/60 hover:text-pink-400 hover:bg-pink-500/20 rounded-lg transition-all duration-200"
                          title="Ver niveles del curso"
                        >
                          <Target size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCourse(course)
                            setActiveTab('editor')
                          }}
                          className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                          title="Editar curso"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCourse(course)
                            setActiveTab('materials')
                          }}
                          className="p-2 text-white/60 hover:text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200"
                          title="Gestionar materiales"
                        >
                          <Upload size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCourse(course)
                            setActiveTab('pricing')
                          }}
                          className="p-2 text-white/60 hover:text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-all duration-200"
                          title="Configurar precios"
                        >
                          <DollarSign size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Precio */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-purple-400">{`$${course.price}`}</span>
                        <span className="text-sm text-white/40 line-through">{`$${course.originalPrice}`}</span>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                          -{course.discount}%
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/60">{`$${course.revenue.toLocaleString()} en ventas`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
  }
  
  // Componente para la lista de cursos
  const CourseList = () => (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
              type="text"
              placeholder="Buscar cursos por título, instructor o categoría..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
        </div>
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todos los estados</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
          <option value="archived">Archivados</option>
        </select>
      </div>
      
      {/* Lista de cursos */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
  
  // ========================================
  // CONFIGURACIÓN DE PESTAÑAS - Navegación
  // ========================================
  
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'categories', label: 'Por Categorías', icon: Target },
    { id: 'all-courses', label: 'Todos los Cursos', icon: BookOpen },
    { id: 'editor', label: 'Editor', icon: Edit },
    { id: 'materials', label: 'Materiales', icon: Upload },
    { id: 'pricing', label: 'Precios', icon: DollarSign },
    { id: 'analytics', label: 'Analíticas', icon: TrendingUp }
  ]
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  // Si se está mostrando la vista de información del curso
  if (showCourseInfo && selectedCourse) {
    return (
      <CourseInfoView 
        course={selectedCourse}
        onBack={handleBackFromCourseInfo}
        onEdit={handleEditFromCourseInfo}
      />
    )
  }
  
  // Si se está mostrando la vista de niveles del curso
  if (showCourseLevels && selectedCourse) {
    return (
      <CourseLevelsView 
        course={selectedCourse}
        onBack={handleBackFromCourseLevels}
        onEdit={handleEditFromCourseLevels}
      />
    )
  }
  
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
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
      
      <div className="relative z-10">
      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Gestión de Cursos</h1>
              <p className="text-white/80 drop-shadow-md">Crea, edita y administra tus cursos online con las mejores herramientas</p>
          </div>
            <button 
              onClick={handleOpenCreateCourseModal}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center gap-2 px-6 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:from-purple-700 hover:to-pink-700"
            >
            <Plus size={20} />
            Crear Nuevo Curso
          </button>
        </div>
        
        {/* Barra de búsqueda mejorada */}
        <div className="mt-6 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              placeholder="Buscar cursos por título, instructor, categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all shadow-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {/* Sugerencias de búsqueda */}
          {searchTerm && debouncedSearchTerm && (
            <div className="absolute mt-2 w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
              {allCourses
                .filter(course => 
                  course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                  course.instructor.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                  course.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
                .slice(0, 5)
                .map(course => (
                  <button
                    key={course.id}
                    onClick={() => {
                      handleViewCourseInfo(course)
                      setSearchTerm('')
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{course.title}</p>
                      <p className="text-xs text-white/60">{course.instructor} • {course.category}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Users size={12} />
                      <span>{course.students}</span>
                    </div>
                  </button>
                ))}
              {allCourses.filter(course => 
                course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                course.instructor.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                course.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
              ).length === 0 && (
                <div className="px-4 py-6 text-center text-white/60">
                  <p className="text-sm">No se encontraron cursos</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Navegación por pestañas */}
      <div className="mb-8">
          <div className="border-b border-white/20">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all duration-300 ${
                    activeTab === tab.id
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
      </div>
      
      {/* Contenido de las pestañas */}
      <div className="min-h-96">
        {activeTab === 'overview' && <CourseOverview />}
        {activeTab === 'categories' && <CourseCategories />}
        {activeTab === 'all-courses' && <AllCoursesView />}
        {activeTab === 'editor' && (
          <CourseEditor 
            course={selectedCourse}
            onSave={() => {}}
            onCancel={() => setActiveTab('all-courses')}
          />
        )}
        {activeTab === 'materials' && <CourseMaterials courseId={selectedCourse?.id} />}
        {activeTab === 'pricing' && <CoursePricing courseId={selectedCourse?.id} />}
        {activeTab === 'analytics' && <CourseAnalytics courseId={selectedCourse?.id} />}
        </div>
      </div>
      
      {/* Modal de Crear Nuevo Curso */}
      {showCreateCourseModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md animate-fade-in overflow-hidden"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-[#1e081d] via-purple-900/20 to-[#1e081d] border border-white/30 rounded-3xl w-[90vw] max-w-3xl h-[85vh] shadow-2xl animate-scale-in flex flex-col overflow-hidden"
          >
            
            {/* Modal Header - Optimizado */}
            <div className="px-8 py-6 border-b border-white/20 flex items-center justify-between bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <Plus size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Crear Nuevo Curso</h3>
                  <p className="text-sm text-white/70 mt-1">Completa la información básica del curso</p>
                </div>
              </div>
              <button 
                onClick={handleCloseCreateCourseModal}
                className="text-white/60 hover:text-white transition-all p-2.5 hover:bg-white/20 rounded-xl hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>

            {/* Modal Body - Optimizado con scroll invisible */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <form onSubmit={handleCreateCourse} className="p-8 space-y-6">
              
              {/* Título del curso */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <div className="p-1.5 bg-purple-500/20 rounded-lg">
                    <BookOpen size={16} className="text-purple-400" />
                  </div>
                  Título del curso *
                </label>
                <input
                  type="text"
                  required
                  value={newCourseData.title}
                  onChange={(e) => handleNewCourseChange('title', e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/15 transition-all hover:bg-white/15"
                  placeholder="Ej. Introducción a la Inteligencia Artificial"
                />
              </div>

              {/* Descripción */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/20 rounded-lg">
                    <FileText size={16} className="text-blue-400" />
                  </div>
                  Descripción breve *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newCourseData.description}
                  onChange={(e) => handleNewCourseChange('description', e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/15 transition-all resize-none hover:bg-white/15"
                  placeholder="Describe brevemente de qué trata el curso..."
                />
              </div>

              {/* Grid de 2 columnas - Optimizado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Categoría */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                    <div className="p-1.5 bg-green-500/20 rounded-lg">
                      <Target size={16} className="text-green-400" />
                    </div>
                    Categoría *
                  </label>
                  <select
                    required
                    value={newCourseData.category}
                    onChange={(e) => handleNewCourseChange('category', e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/15 transition-all hover:bg-white/15"
                  >
                    <option value="ciencias" className="bg-gray-900">🔬 Ciencias</option>
                    <option value="tecnologia" className="bg-gray-900">💻 Tecnología</option>
                    <option value="educacion" className="bg-gray-900">📚 Educación</option>
                    <option value="arte" className="bg-gray-900">🎨 Arte y Diseño</option>
                    <option value="negocios" className="bg-gray-900">💼 Negocios</option>
                    <option value="idiomas" className="bg-gray-900">🌍 Idiomas</option>
                  </select>
                </div>

                {/* Nivel */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-500/20 rounded-lg">
                      <Award size={16} className="text-yellow-400" />
                    </div>
                    Nivel *
                  </label>
                  <select
                    required
                    value={newCourseData.level}
                    onChange={(e) => handleNewCourseChange('level', e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/15 transition-all hover:bg-white/15"
                  >
                    <option value="Principiante" className="bg-gray-900">🌱 Principiante</option>
                    <option value="Intermedio" className="bg-gray-900">🚀 Intermedio</option>
                    <option value="Avanzado" className="bg-gray-900">⚡ Avanzado</option>
                  </select>
                </div>

                {/* Duración */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                    <div className="p-1.5 bg-orange-500/20 rounded-lg">
                      <Clock size={16} className="text-orange-400" />
                    </div>
                    Duración (horas) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newCourseData.duration}
                    onChange={(e) => handleNewCourseChange('duration', e.target.value)}
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/15 transition-all hover:bg-white/15"
                    placeholder="Ej. 40"
                  />
                </div>

                {/* Precio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <DollarSign size={16} />
                    Precio (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={newCourseData.price}
                    onChange={(e) => handleNewCourseChange('price', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                    placeholder="Ej. 199.99"
                  />
                </div>
              </div>

              {/* Instructor */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  <User size={16} />
                  Instructor *
                </label>
                <input
                  type="text"
                  required
                  value={newCourseData.instructor}
                  onChange={(e) => handleNewCourseChange('instructor', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                  placeholder="Ej. Dr. María González"
                />
              </div>

              {/* Nota informativa */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-300 font-medium mb-1">Información importante</p>
                  <p className="text-xs text-blue-200/80">
                    Después de crear el curso, podrás agregar contenido detallado, materiales, 
                    configurar precios avanzados y mucho más en el editor de cursos.
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseCreateCourseModal}
                  className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Crear y Continuar
                </button>
              </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseManagement