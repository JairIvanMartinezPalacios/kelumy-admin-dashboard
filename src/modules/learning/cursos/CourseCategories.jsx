// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado y optimización de rendimiento
import React, { useState, useMemo, useCallback } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  BookOpen,      // Icono de libro para cursos
  Plus,          // Icono de más para agregar elementos
  Search,        // Icono de búsqueda para filtrar
  Filter,        // Icono de filtro para ordenar
  BarChart3,     // Icono de gráfico para analytics
  Upload,        // Icono de subida para carga de archivos
  DollarSign,    // Icono de dólar para precios
  Settings,      // Icono de configuración para ajustes
  Eye,           // Icono de ojo para vista previa
  Edit,          // Icono de editar para modificar
  Trash2,        // Icono de basura para eliminar
  Copy,          // Icono de copiar para duplicar
  Star,          // Icono de estrella para calificaciones
  Clock,         // Icono de reloj para duración
  CheckCircle,   // Icono de check para completado
  Play,          // Icono de play para reproducir
  Users,         // Icono de usuarios para estudiantes
  Award,         // Icono de premio para certificados
  TrendingUp,    // Icono de tendencia para popularidad
  Calendar,      // Icono de calendario para fechas
  Target,        // Icono de objetivo para metas
  Zap,           // Icono de rayo para destacados
  Lock,          // Icono de candado para privado
  Unlock,        // Icono de desbloqueo para público
  Video,         // Icono de video para contenido multimedia
  FileText,      // Icono de archivo para documentos
  Clipboard,     // Icono de portapapeles para listas
  Lightbulb,     // Icono de bombilla para ideas
  Atom,          // Icono de átomo para ciencias
  Laptop,        // Icono de laptop para tecnología
  GraduationCap, // Icono de graduación para educación
  ChevronRight,  // Icono de chevron derecha para navegación
  ChevronLeft,   // Icono de chevron izquierda para navegación
  ArrowLeft,     // Icono de flecha izquierda para retroceso
  X,             // Icono de X para cerrar
  Info           // Icono de información para detalles
} from 'lucide-react'

// Importa estilos CSS para animaciones personalizadas
import '../../../styles/animations.css'

// Importa subcomponentes especializados del módulo de cursos
import ContentManagement from './ContentManagement'      // Gestión de contenido educativo
import CourseRating from './CourseRating'                // Sistema de calificaciones
import CourseRecommendations from './CourseRecommendations' // Recomendaciones personalizadas

// ========================================
// COMPONENTE PRINCIPAL - CourseCategories
// ========================================

// Define el componente funcional CourseCategories que gestiona la organización y categorización de cursos
// Proporciona funcionalidades para crear, editar y organizar categorías y cursos por áreas de conocimiento
const CourseCategories = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estados para selección y navegación
  const [selectedCategory, setSelectedCategory] = useState(null)    // Categoría seleccionada actualmente
  const [selectedCourse, setSelectedCourse] = useState(null)        // Curso seleccionado actualmente
  const [selectedLevel, setSelectedLevel] = useState('basico')      // Nivel de dificultad seleccionado
  
  // Estados para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('')                  // Término de búsqueda
  const [sortBy, setSortBy] = useState('demand')                    // Criterio de ordenamiento: 'demand', 'price', 'rating', 'newest'
  
  // Estados para control de modales y vistas
  const [showContentManagement, setShowContentManagement] = useState(false)  // Modal de gestión de contenido
  const [showRating, setShowRating] = useState(false)                        // Modal de calificaciones
  const [showRecommendations, setShowRecommendations] = useState(false)      // Modal de recomendaciones
  const [showCreateCategory, setShowCreateCategory] = useState(false)        // Modal de crear categoría
  const [showCreateCourse, setShowCreateCourse] = useState(false)            // Modal de crear curso
  
  // Estados para edición y formularios
  const [editingCategory, setEditingCategory] = useState(null)               // Categoría en edición
  const [categoryForm, setCategoryForm] = useState({                        // Datos del formulario de categoría
    name: '',                                                                // Nombre de la categoría
    description: '',                                                         // Descripción de la categoría
    color: 'from-blue-500 to-blue-700',                                     // Gradiente de colores
    icon: 'Atom'                                                             // Icono de la categoría
  })
  const [courseForm, setCourseForm] = useState({                            // Datos del formulario de curso
    title: '',                                                               // Título del curso
    description: '',                                                         // Descripción del curso
    instructor: '',                                                          // Instructor del curso
    level: 'basico',                                                         // Nivel de dificultad
    duration: '',                                                            // Duración estimada
    price: '',
    originalPrice: '',
    tags: []
  })

  // Estado para controlar la vista (administrador o estudiante)
  const [viewMode, setViewMode] = useState('admin') // 'admin' o 'student'
  
  
  // Estados para simular compra y verificación
  const [purchasedCourses, setPurchasedCourses] = useState(new Set()) // IDs de cursos comprados
  const [isPurchasing, setIsPurchasing] = useState(false) // Estado de compra en proceso
  const [purchaseSuccess, setPurchaseSuccess] = useState(false) // Compra exitosa
  const [showPurchaseModal, setShowPurchaseModal] = useState(false) // Modal de compra
  
  // ========================================
  // DATOS DE EJEMPLO - Categorías y cursos
  // ========================================
  
  const [categories, setCategories] = useState([
    {
      id: 'ciencias',
      name: 'Ciencias',
      icon: Atom,
      color: 'from-blue-500 to-blue-700',
      description: 'Explora el fascinante mundo de las ciencias naturales',
      courseCount: 6
    },
    {
      id: 'tecnologia',
      name: 'Tecnología',
      icon: Laptop,
      color: 'from-purple-500 to-purple-700',
      description: 'Domina las últimas tecnologías y herramientas digitales',
      courseCount: 5
    },
    {
      id: 'educacion',
      name: 'Educación',
      icon: GraduationCap,
      color: 'from-green-500 to-green-700',
      description: 'Desarrolla habilidades pedagógicas y metodologías educativas',
      courseCount: 5
    }
  ])
  
  const courses = [
    {
      id: 1,
      title: 'Cálculo Diferencial e Integral',
      description: 'Fundamentos del cálculo matemático: límites, derivadas e integrales',
      instructor: 'Dr. Carlos Mendoza',
      category: 'ciencias',
      level: 'intermedio',
      duration: '45 horas',
      students: 2156,
      rating: 4.8,
      totalRatings: 156,
      status: 'published',
      featured: true,
      image: '/images/calculo.jpg',
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20',
      completionRate: 78,
      revenue: 860400,
      tags: ['Matemáticas', 'Cálculo', 'Universidad'],
      educationLevel: 'universidad',
      sessions: 18,
      levels: {
        basico: {
          title: 'Fundamentos del Cálculo',
          description: 'Introducción a límites, continuidad y derivadas básicas',
          price: 99,
          originalPrice: 199,
          discount: 50,
          topics: [
            'Límites y continuidad',
            'Derivadas de funciones elementales',
            'Reglas de derivación',
            'Aplicaciones de la derivada'
          ],
          duration: '15 horas',
          sessions: 6,
          readings: 8,
          activities: 12,
          evaluations: 2,
          projects: 1,
          unlocked: true,
          students: 750,
          revenue: 74250
        },
        intermedio: {
          title: 'Cálculo Integral',
          description: 'Técnicas de integración y aplicaciones',
          price: 149,
          originalPrice: 299,
          discount: 50,
          topics: [
            'Integral indefinida y definida',
            'Técnicas de integración',
            'Aplicaciones de la integral',
            'Ecuaciones diferenciales básicas'
          ],
          duration: '20 horas',
          sessions: 8,
          readings: 12,
          activities: 18,
          evaluations: 3,
          projects: 2,
          unlocked: false,
          students: 650,
          revenue: 96850
        },
        avanzado: {
          title: 'Cálculo Multivariable',
          description: 'Funciones de varias variables y cálculo vectorial',
          price: 199,
          originalPrice: 399,
          discount: 50,
          topics: [
            'Funciones de varias variables',
            'Derivadas parciales',
            'Integrales múltiples',
            'Teorema de Green y Stokes'
          ],
          duration: '25 horas',
          sessions: 10,
          readings: 15,
          activities: 22,
          evaluations: 4,
          projects: 3,
          unlocked: false,
          students: 756,
          revenue: 150444
        }
      }
    },
    {
      id: 2,
      title: 'Física General',
      description: 'Principios fundamentales de la física: mecánica, termodinámica y ondas',
      instructor: 'Dra. Ana García',
      category: 'ciencias',
      level: 'basico',
      duration: '40 horas',
      students: 1892,
      rating: 4.7,
      totalRatings: 134,
      status: 'published',
      featured: true,
      image: '/images/fisica.jpg',
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18',
      completionRate: 82,
      revenue: 660800,
      tags: ['Física', 'Mecánica', 'Fundamentos'],
      educationLevel: 'universidad',
      sessions: 16,
      levels: {
        basico: {
          title: 'Mecánica Clásica',
          description: 'Movimiento, fuerzas y leyes de Newton',
          price: 89,
          originalPrice: 179,
          discount: 50,
          topics: [
            'Cinemática y dinámica',
            'Leyes de Newton',
            'Trabajo y energía',
            'Momento lineal y angular'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 6,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: true,
          students: 650,
          revenue: 57850
        },
        intermedio: {
          title: 'Termodinámica y Ondas',
          description: 'Calor, temperatura y propagación de ondas',
          price: 129,
          originalPrice: 259,
          discount: 50,
          topics: [
            'Temperatura y calor',
            'Primera y segunda ley de la termodinámica',
            'Movimiento ondulatorio',
            'Sonido y luz'
          ],
          duration: '16 horas',
          sessions: 6,
          readings: 10,
          activities: 14,
          evaluations: 3,
          projects: 2,
          unlocked: false,
          students: 580,
          revenue: 74820
        },
        avanzado: {
          title: 'Física Moderna',
          description: 'Relatividad y mecánica cuántica básica',
          price: 169,
          originalPrice: 339,
          discount: 50,
          topics: [
            'Relatividad especial',
            'Mecánica cuántica básica',
            'Estructura atómica',
            'Física nuclear'
          ],
          duration: '18 horas',
          sessions: 7,
          readings: 12,
          activities: 16,
          evaluations: 3,
          projects: 2,
          unlocked: false,
          students: 662,
          revenue: 111878
        }
      }
    },
    {
      id: 3,
      title: 'Química General',
      description: 'Fundamentos de la química: estructura atómica, enlaces y reacciones',
      instructor: 'Dr. Luis Rodríguez',
      category: 'ciencias',
      level: 'basico',
          duration: '35 horas',
      students: 1456,
      rating: 4.6,
      totalRatings: 98,
      price: 299,
      originalPrice: 449,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/quimica.jpg',
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-15',
      completionRate: 75,
      revenue: 435600,
      tags: ['Química', 'Átomos', 'Reacciones'],
      educationLevel: 'universidad',
          sessions: 14,
      levels: {
        basico: {
          title: 'Estructura Atómica',
          description: 'Átomos, electrones y tabla periódica',
          topics: [
            'Estructura del átomo',
            'Configuración electrónica',
            'Tabla periódica',
            'Enlaces químicos'
          ],
          duration: '10 horas',
          sessions: 4,
          readings: 6,
          activities: 8,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Reacciones Químicas',
          description: 'Balanceo, estequiometría y equilibrio',
          topics: [
            'Balanceo de ecuaciones',
            'Estequiometría',
            'Equilibrio químico',
            'Cinética química'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 12,
          evaluations: 2,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Química Orgánica',
          description: 'Compuestos de carbono y sus reacciones',
          topics: [
            'Hidrocarburos',
            'Grupos funcionales',
            'Reacciones orgánicas',
            'Polímeros y biomoléculas'
          ],
          duration: '18 horas',
          sessions: 7,
          readings: 12,
          activities: 16,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 4,
      title: 'Álgebra Lineal',
      description: 'Vectores, matrices, espacios vectoriales y transformaciones lineales',
      instructor: 'Dra. María López',
      category: 'ciencias',
      level: 'intermedio',
      duration: '38 horas',
      students: 1234,
      rating: 4.5,
      totalRatings: 87,
      price: 379,
      originalPrice: 549,
      discount: 31,
      status: 'published',
      featured: false,
      image: '/images/algebra-lineal.jpg',
      createdAt: '2024-01-20',
      lastUpdated: '2024-01-22',
      completionRate: 71,
      revenue: 468000,
      tags: ['Matemáticas', 'Vectores', 'Matrices'],
      educationLevel: 'universidad',
      sessions: 15,
      levels: {
        basico: {
          title: 'Vectores y Matrices',
          description: 'Operaciones básicas con vectores y matrices',
          topics: [
            'Vectores en R² y R³',
            'Operaciones con matrices',
            'Determinantes',
            'Sistemas de ecuaciones lineales'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Espacios Vectoriales',
          description: 'Subespacios, bases y dimensiones',
          topics: [
            'Espacios vectoriales',
            'Subespacios',
            'Bases y dimensión',
            'Cambio de base'
          ],
          duration: '14 horas',
          sessions: 6,
          readings: 10,
          activities: 12,
          evaluations: 2,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Transformaciones Lineales',
          description: 'Aplicaciones lineales y diagonalización',
          topics: [
            'Transformaciones lineales',
            'Valores y vectores propios',
            'Diagonalización',
            'Formas cuadráticas'
          ],
          duration: '18 horas',
          sessions: 7,
          readings: 12,
          activities: 16,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 5,
      title: 'Ecuaciones Diferenciales',
      description: 'Resolución de ecuaciones diferenciales ordinarias y parciales',
      instructor: 'Dr. Roberto Silva',
      category: 'ciencias',
      level: 'avanzado',
      duration: '42 horas',
      students: 892,
      rating: 4.4,
      totalRatings: 65,
      price: 449,
      originalPrice: 649,
      discount: 31,
      status: 'published',
      featured: false,
      image: '/images/ecuaciones-diferenciales.jpg',
      createdAt: '2024-01-25',
      lastUpdated: '2024-01-28',
      completionRate: 68,
      revenue: 400800,
      tags: ['Matemáticas', 'Ecuaciones', 'Avanzado'],
      educationLevel: 'universidad',
      sessions: 17,
      levels: {
        basico: {
          title: 'Ecuaciones de Primer Orden',
          description: 'Métodos de resolución para EDOs de primer orden',
          topics: [
            'Ecuaciones separables',
            'Ecuaciones lineales',
            'Ecuaciones exactas',
            'Aplicaciones'
          ],
          duration: '14 horas',
          sessions: 6,
          readings: 10,
          activities: 12,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Ecuaciones de Orden Superior',
          description: 'EDOs lineales de orden superior y sistemas',
          topics: [
            'Ecuaciones lineales homogéneas',
            'Método de coeficientes indeterminados',
            'Variación de parámetros',
            'Sistemas de EDOs'
          ],
          duration: '16 horas',
          sessions: 7,
          readings: 12,
          activities: 14,
          evaluations: 3,
          projects: 2,
          unlocked: false
        },
        avanzado: {
          title: 'Ecuaciones en Derivadas Parciales',
          description: 'EDPs y métodos de resolución',
          topics: [
            'EDPs de primer orden',
            'EDPs de segundo orden',
            'Método de separación de variables',
            'Series de Fourier'
          ],
          duration: '20 horas',
          sessions: 8,
          readings: 15,
          activities: 18,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 6,
      title: 'Inglés para Ciencias',
      description: 'Desarrollo de habilidades en inglés técnico para ciencias humanistas y sociales',
      instructor: 'Prof. Sarah Johnson',
      category: 'ciencias',
      level: 'intermedio',
      duration: '30 horas',
      students: 1678,
      rating: 4.7,
      totalRatings: 112,
      price: 279,
      originalPrice: 399,
      discount: 30,
      status: 'published',
      featured: true,
      image: '/images/ingles-ciencias.jpg',
      createdAt: '2024-01-12',
      lastUpdated: '2024-01-19',
      completionRate: 85,
      revenue: 468000,
      tags: ['Inglés', 'Ciencias', 'Técnico'],
      educationLevel: 'universidad',
      sessions: 12,
      levels: {
        basico: {
          title: 'Vocabulario Técnico',
          description: 'Terminología científica en inglés',
          topics: [
            'Vocabulario de ciencias naturales',
            'Términos de ciencias sociales',
            'Expresiones académicas',
            'Lectura de textos científicos'
          ],
          duration: '8 horas',
          sessions: 3,
          readings: 5,
          activities: 8,
          evaluations: 1,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Comunicación Científica',
          description: 'Escritura y presentación de trabajos científicos',
          topics: [
            'Estructura de papers científicos',
            'Abstracts y resúmenes',
            'Presentaciones orales',
            'Debate académico'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Investigación y Publicación',
          description: 'Metodología de investigación en inglés',
          topics: [
            'Metodología de investigación',
            'Revisión de literatura',
            'Citas y referencias',
            'Publicación académica'
          ],
          duration: '16 horas',
          sessions: 6,
          readings: 10,
          activities: 12,
          evaluations: 2,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 7,
      title: 'Inteligencia Artificial',
      description: 'Fundamentos y aplicaciones prácticas de la inteligencia artificial moderna',
      instructor: 'Dr. Carlos Rodríguez',
      category: 'tecnologia',
      level: 'intermedio',
      duration: '50 horas',
      students: 2847,
      rating: 4.9,
      totalRatings: 189,
      price: 599,
      originalPrice: 899,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/inteligencia-artificial.jpg',
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18',
      completionRate: 82,
      revenue: 1705800,
      tags: ['IA', 'Machine Learning', 'Python', 'Algoritmos'],
      educationLevel: 'universidad',
      sessions: 20,
      levels: {
        basico: {
          title: 'Fundamentos de IA',
          description: 'Introducción a los conceptos básicos de inteligencia artificial',
          topics: [
            'Historia y evolución de la IA',
            'Tipos de aprendizaje automático',
            'Algoritmos de clasificación básicos',
            'Introducción a Python para IA'
          ],
          duration: '16 horas',
          sessions: 6,
          readings: 10,
          activities: 12,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Machine Learning Práctico',
          description: 'Implementación práctica de algoritmos de ML',
          topics: [
            'Regresión lineal y logística',
            'Árboles de decisión y bosques aleatorios',
            'Redes neuronales básicas',
            'Validación y evaluación de modelos'
          ],
          duration: '20 horas',
          sessions: 8,
          readings: 12,
          activities: 15,
          evaluations: 3,
          projects: 2,
          unlocked: false
        },
        avanzado: {
          title: 'Deep Learning y Redes Neuronales',
          description: 'Técnicas avanzadas de deep learning y redes neuronales profundas',
          topics: [
            'Redes neuronales convolucionales (CNN)',
            'Redes neuronales recurrentes (RNN)',
            'Transformers y atención',
            'Aplicaciones en visión computacional y NLP'
          ],
          duration: '24 horas',
          sessions: 10,
          readings: 15,
          activities: 20,
          evaluations: 4,
          projects: 3,
          unlocked: false
        }
      }
    },
    {
      id: 8,
      title: 'Base de Datos',
      description: 'Diseño, implementación y administración de sistemas de base de datos',
      instructor: 'Ing. María González',
      category: 'tecnologia',
      level: 'intermedio',
      duration: '40 horas',
      students: 1923,
      rating: 4.7,
      totalRatings: 134,
      price: 449,
      originalPrice: 649,
      discount: 31,
      status: 'published',
      featured: true,
      image: '/images/base-datos.jpg',
      createdAt: '2024-01-12',
      lastUpdated: '2024-01-20',
      completionRate: 79,
      revenue: 864000,
      tags: ['SQL', 'MySQL', 'PostgreSQL', 'NoSQL'],
      educationLevel: 'universidad',
      sessions: 16,
      levels: {
        basico: {
          title: 'Fundamentos de Base de Datos',
          description: 'Conceptos básicos y diseño de bases de datos relacionales',
          topics: [
            'Modelo relacional y normalización',
            'Diseño de esquemas de base de datos',
            'SQL básico (SELECT, INSERT, UPDATE, DELETE)',
            'Índices y optimización básica'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Administración de Base de Datos',
          description: 'Gestión avanzada y administración de sistemas de base de datos',
          topics: [
            'Transacciones y concurrencia',
            'Backup y recuperación',
            'Seguridad y permisos',
            'Monitoreo y performance tuning'
          ],
          duration: '16 horas',
          sessions: 6,
          readings: 10,
          activities: 12,
          evaluations: 3,
          projects: 2,
          unlocked: false
        },
        avanzado: {
          title: 'Bases de Datos NoSQL',
          description: 'Bases de datos no relacionales y big data',
          topics: [
            'MongoDB y bases de datos documentales',
            'Redis y bases de datos en memoria',
            'Cassandra y bases de datos distribuidas',
            'Big Data y Apache Hadoop'
          ],
          duration: '18 horas',
          sessions: 7,
          readings: 12,
          activities: 15,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 9,
      title: 'Páginas Web',
      description: 'Desarrollo frontend y backend para crear sitios web modernos y responsivos',
      instructor: 'Lic. Ana Martínez',
      category: 'tecnologia',
      level: 'basico',
      duration: '35 horas',
      students: 3456,
      rating: 4.6,
      totalRatings: 234,
      price: 349,
      originalPrice: 499,
      discount: 30,
      status: 'published',
      featured: true,
      image: '/images/paginas-web.jpg',
      createdAt: '2024-01-08',
      lastUpdated: '2024-01-16',
      completionRate: 85,
      revenue: 1206000,
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
      educationLevel: 'universidad',
      sessions: 14,
      levels: {
        basico: {
          title: 'HTML y CSS Básico',
          description: 'Fundamentos del desarrollo web frontend',
          topics: [
            'HTML5 semántico y estructura',
            'CSS3 y estilos modernos',
            'Flexbox y Grid Layout',
            'Responsive design básico'
          ],
          duration: '10 horas',
          sessions: 4,
          readings: 6,
          activities: 8,
          evaluations: 1,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'JavaScript y Interactividad',
          description: 'Programación frontend con JavaScript moderno',
          topics: [
            'JavaScript ES6+ y DOM',
            'Eventos y manipulación de elementos',
            'AJAX y APIs',
            'Frameworks básicos (jQuery)'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Frameworks Modernos',
          description: 'React, Vue.js y desarrollo web avanzado',
          topics: [
            'React.js y componentes',
            'Vue.js y aplicaciones SPA',
            'Node.js y backend básico',
            'Deployment y hosting'
          ],
          duration: '18 horas',
          sessions: 7,
          readings: 12,
          activities: 15,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 10,
      title: 'Programación y Desarrollo de Aplicaciones',
      description: 'Desarrollo completo de aplicaciones web y móviles con las mejores prácticas',
      instructor: 'Dr. Luis Silva',
      category: 'tecnologia',
      level: 'avanzado',
      duration: '60 horas',
      students: 1678,
      rating: 4.8,
      totalRatings: 156,
      price: 699,
      originalPrice: 999,
      discount: 30,
      status: 'published',
      featured: true,
      image: '/images/programacion-apps.jpg',
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-22',
      completionRate: 76,
      revenue: 1173000,
      tags: ['Programación', 'Apps', 'Full Stack', 'DevOps'],
      educationLevel: 'universidad',
      sessions: 24,
      levels: {
        basico: {
          title: 'Fundamentos de Programación',
          description: 'Conceptos básicos y paradigmas de programación',
          topics: [
            'Algoritmos y estructuras de datos',
            'Paradigmas de programación (OOP, Funcional)',
            'Control de versiones con Git',
            'Testing y debugging'
          ],
          duration: '18 horas',
          sessions: 7,
          readings: 10,
          activities: 12,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Desarrollo Full Stack',
          description: 'Frontend, backend y bases de datos integradas',
          topics: [
            'Arquitectura de aplicaciones web',
            'APIs REST y GraphQL',
            'Autenticación y autorización',
            'Integración frontend-backend'
          ],
          duration: '22 horas',
          sessions: 9,
          readings: 14,
          activities: 18,
          evaluations: 3,
          projects: 2,
          unlocked: false
        },
        avanzado: {
          title: 'Aplicaciones Móviles y Cloud',
          description: 'Desarrollo móvil y despliegue en la nube',
          topics: [
            'React Native y desarrollo móvil',
            'Cloud computing (AWS, Azure)',
            'Microservicios y contenedores',
            'CI/CD y DevOps'
          ],
          duration: '26 horas',
          sessions: 10,
          readings: 16,
          activities: 20,
          evaluations: 4,
          projects: 3,
          unlocked: false
        }
      }
    },
    {
      id: 11,
      title: 'Ciberseguridad y Protección Digital',
      description: 'Protección de sistemas, redes y datos contra amenazas cibernéticas',
      instructor: 'Ing. Roberto Castro',
      category: 'tecnologia',
      level: 'avanzado',
      duration: '45 horas',
      students: 1234,
      rating: 4.9,
      totalRatings: 98,
      price: 799,
      originalPrice: 1199,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/ciberseguridad.jpg',
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-25',
      completionRate: 71,
      revenue: 985000,
      tags: ['Seguridad', 'Hacking Ético', 'Redes', 'Criptografía'],
      educationLevel: 'universidad',
      sessions: 18,
      levels: {
        basico: {
          title: 'Fundamentos de Ciberseguridad',
          description: 'Conceptos básicos y amenazas comunes',
          topics: [
            'Tipos de amenazas cibernéticas',
            'Vulnerabilidades comunes',
            'Herramientas básicas de seguridad',
            'Políticas de seguridad'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Hacking Ético y Penetration Testing',
          description: 'Técnicas de evaluación de seguridad',
          topics: [
            'Metodologías de penetration testing',
            'Herramientas de análisis de vulnerabilidades',
            'Explotación de vulnerabilidades',
            'Reportes de seguridad'
          ],
          duration: '18 horas',
          sessions: 7,
          readings: 12,
          activities: 15,
          evaluations: 3,
          projects: 2,
          unlocked: false
        },
        avanzado: {
          title: 'Seguridad Avanzada y Forense',
          description: 'Técnicas avanzadas de protección y análisis forense',
          topics: [
            'Criptografía avanzada',
            'Análisis forense digital',
            'Seguridad en la nube',
            'Compliance y regulaciones'
          ],
          duration: '20 horas',
          sessions: 8,
          readings: 14,
          activities: 18,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 12,
      title: 'Gestión Socioemocional',
      description: 'Desarrolla habilidades para el manejo de emociones y relaciones en el aula',
      instructor: 'Psic. María Elena Ruiz',
      category: 'educacion',
      level: 'basico',
      duration: '25 horas',
      students: 1456,
      rating: 4.8,
      totalRatings: 98,
      price: 279,
      originalPrice: 399,
      discount: 30,
      status: 'published',
      featured: true,
      image: '/images/gestion-socioemocional.jpg',
      createdAt: '2024-01-20',
      lastUpdated: '2024-01-22',
      completionRate: 87,
      revenue: 406000,
      tags: ['Emociones', 'Aula', 'Docentes', 'Relaciones'],
      educationLevel: 'formativo',
      sessions: 10,
      levels: {
        basico: {
          title: 'Fundamentos de la Inteligencia Emocional',
          description: 'Conceptos básicos de gestión emocional en el contexto educativo',
          topics: [
            'Autoconocimiento y autorregulación emocional',
            'Empatía y habilidades sociales',
            'Comunicación asertiva en el aula',
            'Manejo de conflictos estudiantiles'
          ],
          duration: '8 horas',
          sessions: 3,
          readings: 5,
          activities: 6,
          evaluations: 1,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Estrategias de Intervención',
          description: 'Técnicas prácticas para la gestión socioemocional en el aula',
          topics: [
            'Detección de problemas emocionales',
            'Técnicas de relajación y mindfulness',
            'Dinámicas grupales para el desarrollo emocional',
            'Colaboración con familias'
          ],
          duration: '10 horas',
          sessions: 4,
          readings: 6,
          activities: 8,
          evaluations: 2,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Programas de Prevención',
          description: 'Diseño e implementación de programas socioemocionales',
          topics: [
            'Diseño de programas preventivos',
            'Evaluación de impacto socioemocional',
            'Liderazgo en bienestar estudiantil',
            'Redes de apoyo y recursos comunitarios'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 13,
      title: 'Gamificación',
      description: 'Integra elementos de juego en el proceso de enseñanza-aprendizaje',
      instructor: 'Lic. Carlos Mendoza',
      category: 'educacion',
      level: 'intermedio',
      duration: '30 horas',
      students: 1892,
      rating: 4.6,
      totalRatings: 134,
      price: 349,
      originalPrice: 499,
      discount: 30,
      status: 'published',
      featured: true,
      image: '/images/gamificacion.jpg',
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-25',
      completionRate: 83,
      revenue: 660800,
      tags: ['Juegos', 'Motivación', 'Aprendizaje', 'Tecnología'],
      educationLevel: 'formativo',
      sessions: 12,
      levels: {
        basico: {
          title: 'Fundamentos de la Gamificación',
          description: 'Conceptos básicos y elementos de juego en educación',
          topics: [
            'Psicología del juego y motivación',
            'Elementos de gamificación (puntos, badges, niveles)',
            'Mecánicas de juego aplicadas a la educación',
            'Diseño de experiencias lúdicas'
          ],
          duration: '10 horas',
          sessions: 4,
          readings: 6,
          activities: 8,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Herramientas Digitales',
          description: 'Plataformas y herramientas para implementar gamificación',
          topics: [
            'Kahoot, Quizizz y herramientas interactivas',
            'Classcraft y plataformas de gamificación',
            'Creación de contenido gamificado',
            'Evaluación gamificada'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Diseño de Sistemas Gamificados',
          description: 'Creación de sistemas completos de gamificación educativa',
          topics: [
            'Diseño de narrativas educativas',
            'Sistemas de recompensas y progresión',
            'Gamificación colaborativa',
            'Medición de impacto y mejora continua'
          ],
          duration: '15 horas',
          sessions: 6,
          readings: 10,
          activities: 12,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 14,
      title: 'Laboratorios Creativos',
      description: 'Espacios de experimentación e innovación pedagógica',
      instructor: 'Dra. Ana Patricia López',
      category: 'educacion',
      level: 'intermedio',
      duration: '35 horas',
      students: 1234,
      rating: 4.7,
      totalRatings: 89,
      price: 399,
      originalPrice: 599,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/laboratorios-creativos.jpg',
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-23',
      completionRate: 79,
      revenue: 492000,
      tags: ['Creatividad', 'Innovación', 'Experimentación', 'STEAM'],
      educationLevel: 'formativo',
      sessions: 14,
      levels: {
        basico: {
          title: 'Fundamentos de la Creatividad',
          description: 'Desarrollo del pensamiento creativo y divergente',
          topics: [
            'Teorías de la creatividad',
            'Técnicas de pensamiento divergente',
            'Ambientes que fomentan la creatividad',
            'Resolución creativa de problemas'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Diseño de Laboratorios',
          description: 'Creación y gestión de espacios de experimentación',
          topics: [
            'Diseño de espacios creativos',
            'Materiales y recursos para laboratorios',
            'Metodologías STEAM',
            'Proyectos interdisciplinarios'
          ],
          duration: '14 horas',
          sessions: 6,
          readings: 10,
          activities: 12,
          evaluations: 2,
          projects: 2,
          unlocked: false
        },
        avanzado: {
          title: 'Innovación Pedagógica',
          description: 'Implementación de metodologías innovadoras',
          topics: [
            'Design thinking en educación',
            'Metodologías maker y DIY',
            'Integración de tecnología creativa',
            'Evaluación de proyectos creativos'
          ],
          duration: '16 horas',
          sessions: 6,
          readings: 12,
          activities: 15,
          evaluations: 3,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 15,
      title: 'Evaluación y Retroalimentación Efectiva',
      description: 'Desarrolla estrategias de evaluación formativa y retroalimentación constructiva',
      instructor: 'Dr. Roberto García',
      category: 'educacion',
      level: 'intermedio',
      duration: '28 horas',
      students: 1678,
      rating: 4.8,
      totalRatings: 112,
      price: 329,
      originalPrice: 469,
      discount: 30,
      status: 'published',
      featured: true,
      image: '/images/evaluacion-retroalimentacion.jpg',
      createdAt: '2024-01-12',
      lastUpdated: '2024-01-20',
      completionRate: 85,
      revenue: 552000,
      tags: ['Evaluación', 'Retroalimentación', 'Formativa', 'Rúbricas'],
      educationLevel: 'formativo',
      sessions: 11,
      levels: {
        basico: {
          title: 'Fundamentos de la Evaluación',
          description: 'Conceptos básicos de evaluación educativa',
          topics: [
            'Tipos de evaluación (diagnóstica, formativa, sumativa)',
            'Objetivos de aprendizaje y competencias',
            'Criterios de evaluación',
            'Instrumentos de evaluación básicos'
          ],
          duration: '8 horas',
          sessions: 3,
          readings: 6,
          activities: 8,
          evaluations: 1,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Retroalimentación Constructiva',
          description: 'Técnicas para dar retroalimentación efectiva',
          topics: [
            'Principios de la retroalimentación efectiva',
            'Técnicas de retroalimentación oral y escrita',
            'Rúbricas y criterios claros',
            'Autoevaluación y coevaluación'
          ],
          duration: '12 horas',
          sessions: 5,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Evaluación por Competencias',
          description: 'Implementación de evaluación auténtica y por competencias',
          topics: [
            'Diseño de evaluaciones auténticas',
            'Portafolios y evidencias de aprendizaje',
            'Evaluación de competencias transversales',
            'Uso de tecnología en la evaluación'
          ],
          duration: '14 horas',
          sessions: 5,
          readings: 10,
          activities: 12,
          evaluations: 2,
          projects: 2,
          unlocked: false
        }
      }
    },
    {
      id: 16,
      title: 'Diseña tu Plan de Trabajo',
      description: 'Herramientas para la planificación y organización del trabajo docente',
      instructor: 'Lic. Patricia Hernández',
      category: 'educacion',
      level: 'basico',
      duration: '20 horas',
      students: 2134,
      rating: 4.5,
      totalRatings: 156,
      price: 249,
      originalPrice: 349,
      discount: 29,
      status: 'published',
      featured: true,
      image: '/images/plan-trabajo.jpg',
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18',
      completionRate: 91,
      revenue: 532000,
      tags: ['Planificación', 'Organización', 'Productividad', 'Gestión'],
      educationLevel: 'formativo',
      sessions: 8,
      levels: {
        basico: {
          title: 'Fundamentos de la Planificación',
          description: 'Conceptos básicos de planificación educativa',
          topics: [
            'Elementos de un plan de trabajo',
            'Objetivos SMART y cronogramas',
            'Recursos y materiales necesarios',
            'Herramientas de planificación básicas'
          ],
          duration: '6 horas',
          sessions: 2,
          readings: 4,
          activities: 6,
          evaluations: 1,
          projects: 1,
          unlocked: true
        },
        intermedio: {
          title: 'Herramientas Digitales',
          description: 'Uso de tecnología para la planificación docente',
          topics: [
            'Google Classroom y Google Workspace',
            'Aplicaciones de planificación y productividad',
            'Calendarios digitales y recordatorios',
            'Colaboración en línea con colegas'
          ],
          duration: '8 horas',
          sessions: 3,
          readings: 6,
          activities: 8,
          evaluations: 1,
          projects: 1,
          unlocked: false
        },
        avanzado: {
          title: 'Gestión de Proyectos Educativos',
          description: 'Planificación de proyectos complejos y colaborativos',
          topics: [
            'Metodologías ágiles en educación',
            'Gestión de equipos de trabajo',
            'Evaluación y mejora continua',
            'Liderazgo en proyectos educativos'
          ],
          duration: '10 horas',
          sessions: 4,
          readings: 8,
          activities: 10,
          evaluations: 2,
          projects: 1,
          unlocked: false
        }
      }
    }
  ]
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  const getEducationLevelText = useCallback((level) => {
    switch (level) {
      case 'formativo': return 'Formativo (Bachillerato)'
      case 'universidad': return 'Universidad'
      default: return 'No especificado'
    }
  }, [])
  
  const getEducationLevelColor = useCallback((level) => {
    switch (level) {
      case 'formativo': return 'text-green-600 bg-green-100'
      case 'universidad': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }, [])
  
  const getLevelColor = useCallback((level) => {
    switch (level) {
      case 'basico': return 'text-green-600 bg-green-100'
      case 'intermedio': return 'text-yellow-600 bg-yellow-100'
      case 'avanzado': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }, [])
  
  const getLevelText = useCallback((level) => {
    switch (level) {
      case 'basico': return 'Básico'
      case 'intermedio': return 'Intermedio'
      case 'avanzado': return 'Avanzado'
      default: return 'No especificado'
    }
  }, [])
  
  // ========================================
  // FUNCIONES DE GESTIÓN DE CATEGORÍAS
  // ========================================
  
  const handleCreateCategory = useCallback(() => {
    setEditingCategory(null)
    setCategoryForm({
      name: '',
      description: '',
      color: 'from-blue-500 to-blue-700',
      icon: 'Atom'
    })
    setShowCreateCategory(true)
  }, [])
  
  const handleEditCategory = useCallback((category) => {
    setEditingCategory(category)
    setCategoryForm({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon.name || 'Atom'
    })
    setShowCreateCategory(true)
  }, [])
  
  const handleDeleteCategory = useCallback((categoryId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
      if (selectedCategory?.id === categoryId) {
        setSelectedCategory(null)
      }
    }
  }, [selectedCategory])
  
  const handleSaveCategory = useCallback(() => {
    if (!categoryForm.name.trim() || !categoryForm.description.trim()) {
      alert('Por favor completa todos los campos requeridos')
      return
    }
    
    const iconMap = {
      'Atom': Atom,
      'Laptop': Laptop,
      'GraduationCap': GraduationCap,
      'BookOpen': BookOpen,
      'Target': Target,
      'Zap': Zap
    }
    
    const newCategory = {
      id: editingCategory ? editingCategory.id : `category_${Date.now()}`,
      name: categoryForm.name.trim(),
      description: categoryForm.description.trim(),
      color: categoryForm.color,
      icon: iconMap[categoryForm.icon] || Atom,
      courseCount: editingCategory ? editingCategory.courseCount : 0
    }
    
    if (editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id ? newCategory : cat
      ))
    } else {
      setCategories(prev => [...prev, newCategory])
    }
    
    setShowCreateCategory(false)
    setEditingCategory(null)
    setCategoryForm({
      name: '',
      description: '',
      color: 'from-blue-500 to-blue-700',
      icon: 'Atom'
    })
  }, [categoryForm, editingCategory])
  
  const handleCancelCategory = useCallback(() => {
    setShowCreateCategory(false)
    setEditingCategory(null)
    setCategoryForm({
      name: '',
      description: '',
      color: 'from-blue-500 to-blue-700',
      icon: 'Atom'
    })
  }, [])
  
  // ========================================
  // FUNCIONES DE SIMULACIÓN DE COMPRA
  // ========================================
  
  // Función para simular la compra de un curso/nivel
  const handlePurchaseCourse = async (courseId, levelKey = null) => {
    setIsPurchasing(true)
    setShowPurchaseModal(true)
    
    // Simular proceso de compra (3 segundos)
    setTimeout(() => {
      if (levelKey) {
        // Compra por nivel específico
        setPurchasedCourses(prev => {
          const newSet = new Set(prev)
          newSet.add(`${courseId}-${levelKey}`)
          return newSet
        })
      } else {
        // Compra del curso completo
        setPurchasedCourses(prev => new Set([...prev, courseId]))
      }
      setIsPurchasing(false)
      setPurchaseSuccess(true)
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setShowPurchaseModal(false)
        setPurchaseSuccess(false)
      }, 2000)
    }, 3000)
  }
  
  // Función para verificar si un curso está comprado
  const isCoursePurchased = (courseId) => {
    return purchasedCourses.has(courseId)
  }
  
  // Función para obtener el estado de desbloqueo de un nivel
  const getLevelUnlockStatus = (level, courseId) => {
    if (viewMode === 'admin') {
      return true // Admin ve todo
    }
    
    if (isCoursePurchased(courseId)) {
      return true // Curso completo comprado, todos los niveles desbloqueados
    }
    
    // Verificar si el nivel específico está comprado
    if (purchasedCourses.has(`${courseId}-${level}`)) {
      return true
    }
    
    // Todos los niveles son seleccionables para compra
    // Solo el contenido se bloquea hasta la compra
    return true
  }

  // ========================================
  // FUNCIONES DE GESTIÓN DE CURSOS
  // ========================================
  
  const handleCreateCourse = useCallback(() => {
    setCourseForm({
      title: '',
      description: '',
      instructor: '',
      level: 'basico',
      duration: '',
      price: '',
      originalPrice: '',
      tags: []
    })
    setShowCreateCourse(true)
  }, [])
  
  const handleSaveCourse = useCallback(() => {
    if (!courseForm.title.trim() || !courseForm.description.trim() || !courseForm.instructor.trim()) {
      alert('Por favor completa todos los campos requeridos')
      return
    }
    
    const newCourse = {
      id: Date.now(),
      title: courseForm.title.trim(),
      description: courseForm.description.trim(),
      instructor: courseForm.instructor.trim(),
      category: selectedCategory?.id || 'general',
      level: courseForm.level,
      duration: courseForm.duration || '0 horas',
      students: 0,
      rating: 0,
      totalRatings: 0,
      price: parseFloat(courseForm.price) || 0,
      originalPrice: parseFloat(courseForm.originalPrice) || parseFloat(courseForm.price) || 0,
      discount: courseForm.originalPrice ? Math.round(((parseFloat(courseForm.originalPrice) - parseFloat(courseForm.price)) / parseFloat(courseForm.originalPrice)) * 100) : 0,
      status: 'draft',
      featured: false,
      image: '/images/default-course.jpg',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      completionRate: 0,
      revenue: 0,
      tags: courseForm.tags,
      educationLevel: 'universidad',
      sessions: 0,
      levels: {
        basico: {
          title: 'Nivel Básico',
          description: 'Conceptos fundamentales',
          topics: ['Introducción al tema'],
          duration: '10 horas',
          sessions: 4,
          readings: 5,
          activities: 8,
          evaluations: 1,
          projects: 1
        }
      }
    }
    
    // Aquí normalmente se enviaría a una API
    console.log('Nuevo curso creado:', newCourse)
    alert('Curso creado exitosamente')
    
    setShowCreateCourse(false)
    setCourseForm({
      title: '',
      description: '',
      instructor: '',
      level: 'basico',
      duration: '',
      price: '',
      originalPrice: '',
      tags: []
    })
  }, [courseForm, selectedCategory])
  
  const handleCancelCourse = useCallback(() => {
    setShowCreateCourse(false)
    setCourseForm({
      title: '',
      description: '',
      instructor: '',
      level: 'basico',
      duration: '',
      price: '',
      originalPrice: '',
      tags: []
    })
  }, [])
  
  // Filtrar cursos por categoría
  const filteredCourses = useMemo(() => {
    if (!selectedCategory) return []
    
    let filtered = courses.filter(course => course.category === selectedCategory.id)
    
    // Aplicar búsqueda
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'demand':
          return b.students - a.students
        case 'price':
          return a.price - b.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return 0
      }
    })
    
    return filtered
  }, [selectedCategory, searchTerm, sortBy])
  
  // ========================================
  // COMPONENTES INTERNOS
  // ========================================
  
  
  // Componente para mostrar las categorías
  const CategoryGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => {
        const Icon = category.icon
        return (
          <div
            key={category.id}
            className="group bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:border-purple-400/50 animate-fade-in-up hover:scale-105 shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div 
            onClick={() => setSelectedCategory(category)}
                className="cursor-pointer flex-1"
          >
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <Icon size={32} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors drop-shadow-sm">
              {category.name}
            </h3>
            
            <p className="text-white/80 mb-4 line-clamp-2 drop-shadow-sm">
              {category.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">
                {category.courseCount} cursos disponibles
              </span>
              <ChevronRight size={20} className="text-white/60 group-hover:text-purple-400 transition-colors" />
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditCategory(category)
                  }}
                  className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                  title="Editar categoría"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteCategory(category.id)
                  }}
                  className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Eliminar categoría"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
  
  // Componente para mostrar la lista de cursos de una categoría
  const CourseList = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-down">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 focus:scale-105"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 focus:scale-105"
        >
          <option value="demand">Ordenar por demanda</option>
          <option value="rating">Ordenar por calificación</option>
          <option value="price">Ordenar por precio</option>
          <option value="newest">Más recientes</option>
        </select>
      </div>
      
      {/* Lista de cursos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="group cursor-pointer bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-300 animate-fade-in-up hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Imagen del curso */}
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${categories.find(c => c.id === course.category)?.color} flex items-center justify-center`}>
                <BookOpen size={48} className="text-white" />
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {getLevelText(course.level)}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2 text-white text-sm">
                  <Play size={16} />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
            
            {/* Información del curso */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                {course.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {course.students.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  {course.rating} ({course.totalRatings})
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {course.sessions} sesiones
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary-600">${course.price}</span>
                  <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    -{course.discount}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEducationLevelColor(course.educationLevel)}`}>
                    {getEducationLevelText(course.educationLevel)}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {course.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
  // Componente para mostrar los detalles de un curso
  const CourseDetails = () => {
    if (!selectedCourse) return null
    
    const currentLevel = selectedCourse.levels[selectedLevel]
    const isPurchased = isCoursePurchased(selectedCourse.id)
    const isLevelUnlocked = getLevelUnlockStatus(selectedLevel, selectedCourse.id)
    
    // Configuración de contenido freemium
    const maxFreeTopics = 2 // Máximo 2 temas gratuitos por nivel
    const isLevelPurchased = purchasedCourses.has(`${selectedCourse.id}-${selectedLevel}`)
    const isStudentUnpurchased = viewMode === 'student' && !isPurchased && !isLevelPurchased
    
    // Función para determinar si un tema es gratuito
    const isTopicFree = (topicIndex) => {
      if (viewMode === 'admin') return true // Admin ve todo
      if (isPurchased) return true // Curso completo comprado, todo es gratuito
      if (purchasedCourses.has(`${selectedCourse.id}-${selectedLevel}`)) return true // Nivel específico comprado
      return topicIndex < maxFreeTopics // Solo los primeros 2 temas son gratuitos
    }
    
    // Función para determinar si el contenido (lecturas, actividades, etc.) es gratuito
    const isContentFree = (contentType) => {
      if (viewMode === 'admin') return true // Admin ve todo
      if (isPurchased) return true // Curso completo comprado, todo es gratuito
      if (purchasedCourses.has(`${selectedCourse.id}-${selectedLevel}`)) return true // Nivel específico comprado
      return false // Sin comprar, todo el contenido está bloqueado
    }
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Encabezado del curso */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-slide-in-up">
          <div className="flex items-start justify-between mb-4">
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver a la lista
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Star size={18} />
                Ver Valoraciones
              </button>
              <button
                onClick={() => setShowContentManagement(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Settings size={18} />
                Gestionar Contenido
              </button>
            </div>
          </div>
          
          <div className="flex gap-6">
            {/* Imagen del curso */}
            <div className="w-64 h-48 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${categories.find(c => c.id === selectedCourse.category)?.color} flex items-center justify-center`}>
                <BookOpen size={64} className="text-white" />
              </div>
            </div>
            
            {/* Información del curso */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCourse.title}
              </h1>
              
              <p className="text-gray-600 mb-4 text-lg">
                {selectedCourse.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {selectedCourse.students.toLocaleString()} estudiantes
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500" />
                  {selectedCourse.rating} ({selectedCourse.totalRatings} valoraciones)
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {selectedCourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Play size={16} />
                  {selectedCourse.sessions} sesiones
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(selectedCourse.level)}`}>
                  {getLevelText(selectedCourse.level)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEducationLevelColor(selectedCourse.educationLevel)}`}>
                  {getEducationLevelText(selectedCourse.educationLevel)}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {selectedCourse.instructor}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Niveles del curso */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-slide-in-up animation-delay-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-fade-in">Niveles del Curso</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(selectedCourse.levels).map(([levelKey, level], index) => {
              const isUnlocked = getLevelUnlockStatus(levelKey, selectedCourse.id)
              const isSelected = selectedLevel === levelKey
              return (
                <div
                  key={levelKey}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedLevel(levelKey)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{level.title}</h3>
                    {purchasedCourses.has(`${selectedCourse.id}-${levelKey}`) && (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle size={16} />
                        <span>Comprado</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary-600">${level.price}</span>
                      <span className="text-sm text-gray-500 line-through">${level.originalPrice}</span>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                        -{level.discount}%
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{level.students} estudiantes</div>
                      <div className="text-xs text-gray-400">${level.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    {level.duration} • {level.sessions} sesiones • {level.activities} actividades
                  </div>
                  
                  {isSelected && (
                    <div className="flex items-center gap-2 text-primary-600 text-sm font-medium">
                      <CheckCircle size={16} />
                      Nivel Seleccionado
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Contenido del nivel seleccionado */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {currentLevel.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {currentLevel.description}
              </p>
            </div>
            
            {/* Temas del curso */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Temas que se verán:</h4>
              <ul className="space-y-2">
                 {currentLevel.topics.map((topic, index) => {
                   const isFree = isTopicFree(index)
                   return (
                     <li key={index} className={`flex items-center gap-2 p-2 rounded-lg ${
                       isFree ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                     }`}>
                       {isFree ? (
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                       ) : (
                         <Lock size={16} className="text-gray-400 flex-shrink-0" />
                       )}
                       <span className={`flex-1 ${isFree ? 'text-gray-900' : 'text-gray-500'}`}>
                    {topic}
                       </span>
                       {!isFree && isStudentUnpurchased && (
                         <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                           Bloqueado
                         </span>
                       )}
                       {isFree && isStudentUnpurchased && (
                         <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                           Gratis
                         </span>
                       )}
                  </li>
                   )
                 })}
              </ul>
                {isStudentUnpurchased && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Vista Previa</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Solo los primeros 2 temas son gratuitos. Compra el curso para desbloquear todo el contenido.
                    </p>
                  </div>
                )}
            </div>
            
            {/* Estadísticas del nivel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Clock size={24} className="text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{currentLevel.duration}</div>
                <div className="text-sm text-gray-500">Duración</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Play size={24} className="text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{currentLevel.sessions}</div>
                <div className="text-sm text-gray-500">Sesiones</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <FileText size={24} className="text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{currentLevel.readings}</div>
                <div className="text-sm text-gray-500">Lecturas</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Clipboard size={24} className="text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{currentLevel.activities}</div>
                <div className="text-sm text-gray-500">Actividades</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenido del curso */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 animate-slide-in-up animation-delay-300">
              <div className="flex items-center justify-between mb-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900">Contenido del Curso</h2>
                <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg animate-scale-in animation-delay-400 ${
                  viewMode === 'admin' 
                    ? 'text-gray-600 bg-blue-50' 
                    : 'text-gray-600 bg-green-50'
                }`}>
                  {viewMode === 'admin' ? <Settings size={16} /> : <Users size={16} />}
                  <span>
                    {viewMode === 'admin' 
                      ? 'Vista de Administrador - Todos los contenidos visibles' 
                      : 'Vista de Estudiante - Contenido desbloqueado progresivamente'
                    }
                  </span>
                </div>
              </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Lecturas */}
                <div className={`border rounded-lg p-4 animate-fade-in-up hover:scale-105 transition-all duration-300 ${
                  viewMode === 'admin' 
                    ? (isLevelUnlocked ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50')
                    : (isContentFree('readings') ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50')
                }`} style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-2 mb-2">
                    <FileText size={20} className={
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? "text-green-600" : "text-orange-500")
                        : (isContentFree('readings') ? "text-green-600" : "text-gray-400")
                    } />
                    <h3 className={`font-semibold ${
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-700')
                        : (isContentFree('readings') ? 'text-gray-900' : 'text-gray-500')
                    }`}>Lecturas</h3>
              </div>
                  <div className={`text-2xl font-bold mb-1 ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-600')
                      : (isContentFree('readings') ? 'text-gray-900' : 'text-gray-400')
                  }`}>
                    {viewMode === 'admin' 
                      ? currentLevel.readings 
                      : (isContentFree('readings') 
                          ? `1 de ${currentLevel.readings} (Gratis)` 
                          : '0 de ' + currentLevel.readings + ' (Bloqueado)')
                    }
                  </div>
                  <div className={`text-sm ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-500' : 'text-orange-600')
                      : (isContentFree('readings') ? 'text-gray-500' : 'text-gray-400')
                  }`}>
                    {viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'Materiales de estudio' : 'Materiales bloqueados (Admin puede ver)')
                      : (isContentFree('readings') 
                          ? 'Materiales de estudio' 
                          : 'Materiales bloqueados')
                    }
                  </div>
              <div className="mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      {viewMode === 'admin' ? (
                        isLevelUnlocked ? (
                          <>
                  <Unlock size={14} className="text-green-500" />
                            <span className="text-green-600">Desbloqueado</span>
                          </>
                        ) : (
                          <>
                            <Lock size={14} className="text-orange-500" />
                            <span className="text-orange-600">Bloqueado (Admin)</span>
                          </>
                        )
                      ) : (
                        isContentFree('readings') ? (
                          <>
                            <Unlock size={14} className="text-green-500" />
                            <span className="text-green-600">Gratis</span>
                          </>
                        ) : (
                          <>
                  <Lock size={14} className="text-gray-400" />
                            <span className="text-gray-500">Bloqueado</span>
                          </>
                        )
                      )}
                </div>
              </div>
            </div>
            
            {/* Actividades */}
                <div className={`border rounded-lg p-4 animate-fade-in-up hover:scale-105 transition-all duration-300 ${
                  viewMode === 'admin' 
                    ? (isLevelUnlocked ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50')
                    : (isContentFree('activities') ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50')
                }`} style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 mb-2">
                    <Clipboard size={20} className={
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? "text-green-600" : "text-orange-500")
                        : (isContentFree('activities') ? "text-green-600" : "text-gray-400")
                    } />
                    <h3 className={`font-semibold ${
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-700')
                        : (isContentFree('activities') ? 'text-gray-900' : 'text-gray-500')
                    }`}>Actividades</h3>
              </div>
                  <div className={`text-2xl font-bold mb-1 ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-600')
                      : (isContentFree('activities') ? 'text-gray-900' : 'text-gray-400')
                  }`}>
                    {viewMode === 'admin' 
                      ? currentLevel.activities 
                      : (isContentFree('activities') 
                          ? `1 de ${currentLevel.activities} (Gratis)` 
                          : '0 de ' + currentLevel.activities + ' (Bloqueado)')
                    }
                  </div>
                  <div className={`text-sm ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-500' : 'text-orange-600')
                      : (isContentFree('activities') ? 'text-gray-500' : 'text-gray-400')
                  }`}>
                    {viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'Ejercicios prácticos' : 'Ejercicios bloqueados (Admin puede ver)')
                      : (isContentFree('activities') 
                          ? 'Ejercicios prácticos' 
                          : 'Ejercicios bloqueados')
                    }
                  </div>
              <div className="mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      {viewMode === 'admin' ? (
                        isLevelUnlocked ? (
                          <>
                  <Unlock size={14} className="text-green-500" />
                            <span className="text-green-600">Desbloqueado</span>
                          </>
                        ) : (
                          <>
                            <Lock size={14} className="text-orange-500" />
                            <span className="text-orange-600">Bloqueado (Admin)</span>
                          </>
                        )
                      ) : (
                        isContentFree('activities') ? (
                          <>
                            <Unlock size={14} className="text-green-500" />
                            <span className="text-green-600">Gratis</span>
                          </>
                        ) : (
                          <>
                  <Lock size={14} className="text-gray-400" />
                            <span className="text-gray-500">Bloqueado</span>
                          </>
                        )
                      )}
                </div>
              </div>
            </div>
            
            {/* Evaluaciones */}
                <div className={`border rounded-lg p-4 animate-fade-in-up hover:scale-105 transition-all duration-300 ${
                  viewMode === 'admin' 
                    ? (isLevelUnlocked ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50')
                    : 'border-gray-200 bg-gray-50' // Evaluaciones siempre bloqueadas para estudiantes sin comprar
                }`} style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-2 mb-2">
                    <Award size={20} className={
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? "text-green-600" : "text-orange-500")
                        : "text-gray-400"
                    } />
                    <h3 className={`font-semibold ${
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-700')
                        : 'text-gray-500'
                    }`}>Evaluaciones</h3>
              </div>
                  <div className={`text-2xl font-bold mb-1 ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-600')
                      : 'text-gray-400'
                  }`}>
                    {viewMode === 'admin' 
                      ? currentLevel.evaluations 
                      : '0 de ' + currentLevel.evaluations + ' (Bloqueado)'
                    }
                  </div>
                  <div className={`text-sm ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-500' : 'text-orange-600')
                      : 'text-gray-400'
                  }`}>
                    {viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'Exámenes y pruebas' : 'Exámenes bloqueados (Admin puede ver)')
                      : 'Exámenes bloqueados'
                    }
                  </div>
              <div className="mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      {viewMode === 'admin' ? (
                        isLevelUnlocked ? (
                          <>
                            <Unlock size={14} className="text-green-500" />
                            <span className="text-green-600">Desbloqueado</span>
                          </>
                        ) : (
                          <>
                            <Lock size={14} className="text-orange-500" />
                            <span className="text-orange-600">Bloqueado (Admin)</span>
                          </>
                        )
                      ) : (
                        <>
                  <Lock size={14} className="text-gray-400" />
                          <span className="text-gray-500">Bloqueado</span>
                        </>
                      )}
                </div>
              </div>
            </div>
            
            {/* Proyectos */}
                <div className={`border rounded-lg p-4 animate-fade-in-up hover:scale-105 transition-all duration-300 ${
                  viewMode === 'admin' 
                    ? (isLevelUnlocked ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50')
                    : 'border-gray-200 bg-gray-50' // Proyectos siempre bloqueados para estudiantes sin comprar
                }`} style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={20} className={
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? "text-green-600" : "text-orange-500")
                        : "text-gray-400"
                    } />
                    <h3 className={`font-semibold ${
                      viewMode === 'admin' 
                        ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-700')
                        : 'text-gray-500'
                    }`}>Proyectos</h3>
              </div>
                  <div className={`text-2xl font-bold mb-1 ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-900' : 'text-orange-600')
                      : 'text-gray-400'
                  }`}>
                    {viewMode === 'admin' 
                      ? currentLevel.projects 
                      : '0 de ' + currentLevel.projects + ' (Bloqueado)'
                    }
                  </div>
                  <div className={`text-sm ${
                    viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'text-gray-500' : 'text-orange-600')
                      : 'text-gray-400'
                  }`}>
                    {viewMode === 'admin' 
                      ? (isLevelUnlocked ? 'Trabajos finales' : 'Proyectos bloqueados (Admin puede ver)')
                      : 'Proyectos bloqueados'
                    }
                  </div>
              <div className="mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      {viewMode === 'admin' ? (
                        isLevelUnlocked ? (
                          <>
                            <Unlock size={14} className="text-green-500" />
                            <span className="text-green-600">Desbloqueado</span>
                          </>
                        ) : (
                          <>
                            <Lock size={14} className="text-orange-500" />
                            <span className="text-orange-600">Bloqueado (Admin)</span>
                          </>
                        )
                      ) : (
                        <>
                  <Lock size={14} className="text-gray-400" />
                          <span className="text-gray-500">Bloqueado</span>
                        </>
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Precio y compra */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200 p-6 animate-slide-in-up animation-delay-400">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isPurchased || isLevelPurchased ? '¡Nivel Comprado!' : '¿Listo para comenzar?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isPurchased 
                  ? 'Tienes acceso completo al curso. ¡Disfruta aprendiendo!'
                  : isLevelPurchased
                  ? `Tienes acceso completo al nivel ${currentLevel.title}. ¡Disfruta aprendiendo!`
                  : `Adquiere el nivel ${currentLevel.title} para desbloquear su contenido completo`
                }
              </p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary-600 animate-scale-in animation-delay-500">
                  {isPurchased || isLevelPurchased ? '✓ Comprado' : `$${currentLevel.price}`}
                </span>
                {!isPurchased && !isLevelPurchased && (
                  <>
                    <span className="text-lg text-gray-500 line-through animate-fade-in animation-delay-600">${currentLevel.originalPrice}</span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full animate-bounce-in animation-delay-700">
                  -{currentLevel.discount}% descuento
                </span>
                  </>
                )}
              </div>
            </div>
            {!isPurchased && !isLevelPurchased ? (
              <button 
                onClick={() => handlePurchaseCourse(selectedCourse.id, selectedLevel)}
                disabled={isPurchasing}
                className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105 animate-scale-in animation-delay-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPurchasing ? 'Procesando...' : `Comprar ${currentLevel.title}`}
            </button>
            ) : (
              <div className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg animate-scale-in animation-delay-800">
                ✓ Acceso Completo
          </div>
            )}
          </div>
        </div>
        
        {/* Recomendaciones relacionadas */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-slide-in-up animation-delay-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-fade-in">Cursos Relacionados</h2>
          <CourseRecommendations 
            purchasedCourses={Array.from(purchasedCourses)}
            completedCourses={[]}
            userInterests={[]}
            currentCourse={selectedCourse}
          />
        </div>
      </div>
    )
  }
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 animate-slide-in-left drop-shadow-lg">Cursos por Categorías</h1>
            <p className="text-white/80 animate-slide-in-left animation-delay-100 drop-shadow-md">Explora nuestros cursos organizados por áreas de conocimiento</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Toggle de vista */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 animate-scale-in animation-delay-200">
              <button
                onClick={() => setViewMode('admin')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'admin'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings size={16} />
                Administrador
              </button>
              <button
                onClick={() => setViewMode('student')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'student'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users size={16} />
                Estudiante
              </button>
            </div>
            <button 
              onClick={() => setShowRecommendations(true)}
              className="btn-secondary flex items-center gap-2 px-6 py-3 text-lg animate-scale-in animation-delay-200 hover:scale-105 transition-transform duration-200"
            >
              <Target size={20} />
              Recomendaciones
            </button>
            <button 
              onClick={selectedCategory ? handleCreateCourse : handleCreateCategory}
              className="btn-primary flex items-center gap-2 px-6 py-3 text-lg animate-scale-in animation-delay-300 hover:scale-105 transition-transform duration-200"
            >
            <Plus size={20} />
              {selectedCategory ? 'Crear Curso' : 'Crear Categoría'}
          </button>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="min-h-96">
        {!selectedCategory && <div className="animate-fade-in"><CategoryGrid /></div>}
        {selectedCategory && !selectedCourse && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 mb-6 animate-slide-in-down">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft size={20} />
                Volver a categorías
              </button>
              <div className="flex items-center gap-3 animate-fade-in-left animation-delay-100">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center animate-scale-in animation-delay-200`}>
                  <selectedCategory.icon size={24} className="text-white" />
                </div>
                <div className="animate-slide-in-right animation-delay-300">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                  <p className="text-gray-600">{selectedCategory.description}</p>
                </div>
              </div>
            </div>
            <CourseList />
          </div>
        )}
        {selectedCourse && <div className="animate-fade-in"><CourseDetails /></div>}
      </div>
      
      {/* Módulo de gestión de contenido */}
      {showContentManagement && (
        <ContentManagement
          course={selectedCourse}
          onClose={() => setShowContentManagement(false)}
          onSave={() => {
            // Aquí iría la lógica para guardar los cambios
            console.log('Guardando cambios del curso...')
            setShowContentManagement(false)
          }}
        />
      )}
      
      {/* Módulo de valoraciones */}
      {showRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-scale-in">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Valoraciones del Curso</h2>
                  <p className="text-gray-600">{selectedCourse?.title || 'Curso sin título'}</p>
                </div>
                <button
                  onClick={() => setShowRating(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <CourseRating
                courseId={selectedCourse?.id}
                onRatingSubmit={(ratingData) => {
                  console.log('Nueva valoración:', ratingData)
                  // Aquí iría la lógica para guardar la valoración
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para crear/editar categorías */}
      {showCreateCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-scale-in">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCategory ? 'Editar Categoría' : 'Crear Nueva Categoría'}
                </h2>
                <button
                  onClick={handleCancelCategory}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
              {/* Formulario */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la categoría *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Matemáticas, Programación, Arte..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe brevemente qué tipo de cursos incluye esta categoría..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color del tema
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'Azul', value: 'from-blue-500 to-blue-700' },
                      { name: 'Púrpura', value: 'from-purple-500 to-purple-700' },
                      { name: 'Verde', value: 'from-green-500 to-green-700' },
                      { name: 'Rojo', value: 'from-red-500 to-red-700' },
                      { name: 'Naranja', value: 'from-orange-500 to-orange-700' },
                      { name: 'Rosa', value: 'from-pink-500 to-pink-700' }
                    ].map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setCategoryForm(prev => ({ ...prev, color: color.value }))}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          categoryForm.color === color.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-8 rounded bg-gradient-to-br ${color.value}`}></div>
                        <span className="text-sm text-gray-600 mt-1">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icono
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {[
                      { name: 'Atom', icon: Atom },
                      { name: 'Laptop', icon: Laptop },
                      { name: 'GraduationCap', icon: GraduationCap },
                      { name: 'BookOpen', icon: BookOpen },
                      { name: 'Target', icon: Target },
                      { name: 'Zap', icon: Zap }
                    ].map((iconOption) => {
                      const IconComponent = iconOption.icon
                      return (
                        <button
                          key={iconOption.name}
                          onClick={() => setCategoryForm(prev => ({ ...prev, icon: iconOption.name }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            categoryForm.icon === iconOption.name
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <IconComponent size={24} className="text-gray-600" />
                          <span className="text-xs text-gray-600 mt-1">{iconOption.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancelCategory}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCategory}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  {editingCategory ? 'Actualizar Categoría' : 'Crear Categoría'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de compra */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md my-4 sm:my-8 flex flex-col animate-scale-in">
            <div className="p-6 text-center">
              {isPurchasing ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Procesando Compra...</h3>
                  <p className="text-gray-600">Verificando pago y desbloqueando contenido</p>
                </>
              ) : purchaseSuccess ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">¡Compra Exitosa!</h3>
                  <p className="text-gray-600">El curso ha sido desbloqueado. ¡Disfruta aprendiendo!</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Modal de recomendaciones */}
      {showRecommendations && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-6xl my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-scale-in border border-white/30 relative overflow-hidden">
            {/* Efectos de fondo líquido */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e9d1e6]/20 via-transparent to-[#d0008b]/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#a82ba0]/10 via-transparent to-[#e9d1e6]/15"></div>

            {/* Doble espacio visual para separar el modal de recomendaciones del header */}
            <div style={{ height: '4.5rem' }}></div>
            <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 p-4 sm:p-6 rounded-t-3xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Recomendaciones Personalizadas</h2>
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90 group"
                >
                  <X size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
              <CourseRecommendations 
                purchasedCourses={Array.from(purchasedCourses)}
                completedCourses={[]}
                userInterests={[]}
                currentCourse={selectedCourse}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear/editar cursos */}
      {showCreateCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-scale-in">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Crear Nuevo Curso
                </h2>
                <button
                  onClick={handleCancelCourse}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
              {/* Formulario */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título del curso *
                    </label>
                    <input
                      type="text"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ej: Introducción a React"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor *
                    </label>
                    <input
                      type="text"
                      value={courseForm.instructor}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, instructor: e.target.value }))}
                      placeholder="Nombre del instructor"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nivel
                    </label>
                    <select
                      value={courseForm.level}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="basico">Básico</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duración
                    </label>
                    <input
                      type="text"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="Ej: 30 horas"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio *
                    </label>
                    <input
                      type="number"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio original
                    </label>
                    <input
                      type="number"
                      value={courseForm.originalPrice}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600">
                      {selectedCategory ? selectedCategory.name : 'Sin categoría'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe el contenido y objetivos del curso..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              
              {/* Botones de acción */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancelCourse}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCourse}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  Crear Curso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseCategories
