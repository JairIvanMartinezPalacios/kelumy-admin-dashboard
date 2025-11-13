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
  ChevronRight // Icono de chevron derecha para navegación
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
                  <span className="text-2xl font-bold text-purple-400">${course.price}</span>
                  <span className="text-sm text-white/60 line-through">${course.originalPrice}</span>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                    -{course.discount}%
                  </span>
                </div>
                <p className="text-sm text-white/70">${course.revenue.toLocaleString()} en ventas</p>
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
  const CourseOverview = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Cursos</p>
              <p className="text-3xl font-bold text-blue-900">{allCourses.length}</p>
              <p className="text-xs text-blue-600 mt-1">+2 este mes</p>
            </div>
            <BookOpen size={32} className="text-blue-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Estudiantes Activos</p>
              <p className="text-3xl font-bold text-green-900">
                {allCourses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1">+15% este mes</p>
            </div>
            <Users size={32} className="text-green-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Ingresos Totales</p>
              <p className="text-3xl font-bold text-purple-900">
                ${allCourses.reduce((sum, course) => sum + course.revenue, 0).toLocaleString()}
              </p>
              <p className="text-xs text-purple-600 mt-1">+23% este mes</p>
            </div>
            <DollarSign size={32} className="text-purple-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Calificación Promedio</p>
              <p className="text-3xl font-bold text-orange-900">
                {(allCourses.reduce((sum, course) => sum + course.rating, 0) / allCourses.length).toFixed(1)}
              </p>
              <p className="text-xs text-orange-600 mt-1">⭐ Excelente</p>
            </div>
            <Award size={32} className="text-orange-600" />
          </div>
        </div>
      </div>
      
      {/* Cursos destacados */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white drop-shadow-sm">Cursos Destacados</h3>
            <button className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-200">
            Ver todos
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.filter(course => course.featured).map((course) => (
            <div key={course.id} className="group cursor-pointer">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg h-48 mb-4 relative overflow-hidden border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <BookOpen size={48} className="text-white" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-yellow-400/30">
                    DESTACADO
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Play size={16} />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-white group-hover:text-purple-300 transition-colors drop-shadow-sm">
                  {course.title}
                </h4>
                <p className="text-sm text-white/80 line-clamp-2 drop-shadow-sm">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>{course.completionRate}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-purple-400">${course.price}</span>
                    <span className="text-sm text-white/60 line-through">${course.originalPrice}</span>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                      -{course.discount}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-white/60 hover:text-purple-400 transition-colors duration-200">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-white/60 hover:text-blue-400 transition-colors duration-200">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  
  // Componente para mostrar todos los cursos por categorías en columnas
  const AllCoursesView = () => (
    <div className="space-y-8">
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
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="Editar curso"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCourse(course)
                            setActiveTab('materials')
                          }}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Gestionar materiales"
                        >
                          <Upload size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCourse(course)
                            setActiveTab('pricing')
                          }}
                          className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                          title="Configurar precios"
                        >
                          <DollarSign size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Precio */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary-600">${course.price}</span>
                        <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          -{course.discount}%
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">${course.revenue.toLocaleString()} en ventas</p>
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
    <div className="p-6 min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
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
        <div className="flex items-center justify-between">
          <div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Gestión de Cursos</h1>
              <p className="text-white/80 drop-shadow-md">Crea, edita y administra tus cursos online con las mejores herramientas</p>
          </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center gap-2 px-6 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20">
            <Plus size={20} />
            Crear Nuevo Curso
          </button>
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
    </div>
  )
}

export default CourseManagement