// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado y optimización de rendimiento
import React, { useState, useMemo, useCallback } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  DollarSign,    // Icono de dólar para precios y monetización
  Percent,       // Icono de porcentaje para descuentos
  Tag,           // Icono de etiqueta para precios y etiquetado
  Calendar,      // Icono de calendario para fechas de promociones
  Package,       // Icono de paquete para bundles y ofertas
  Plus,          // Icono de más para agregar elementos
  Edit,          // Icono de editar para modificar precios
  Trash2,        // Icono de basura para eliminar
  Copy,          // Icono de copiar para duplicar precios
  Eye,           // Icono de ojo para vista previa
  Save,          // Icono de guardar para confirmar cambios
  X,             // Icono de X para cerrar o cancelar
  CheckCircle,   // Icono de check para confirmaciones
  Clock,         // Icono de reloj para tiempo limitado
  AlertCircle,   // Icono de alerta para advertencias
  TrendingUp,    // Icono de tendencia para analytics
  Users,         // Icono de usuarios para audiencia
  ShoppingCart,  // Icono de carrito para ventas
  Search,        // Icono de búsqueda para filtrar
  Filter,        // Icono de filtro para ordenar
  ArrowUpDown,   // Icono de flechas para ordenamiento
  Zap,           // Icono de rayo para ofertas especiales
  Target,        // Icono de objetivo para metas
  Star,          // Icono de estrella para destacados
  BookOpen,      // Icono de libro para cursos
  ChevronDown,   // Icono de chevron abajo para dropdowns
  ChevronRight,  // Icono de chevron derecha para navegación
  Settings,      // Icono de configuración para ajustes
  BarChart3      // Icono de gráfico para estadísticas
} from 'lucide-react'

// ========================================
// COMPONENTE - CoursePricing
// ========================================

// Define el componente funcional CoursePricing que gestiona precios, descuentos y promociones
// Recibe props: courseId (identificador del curso para cargar información de precios)
const CoursePricing = ({ courseId }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar la vista activa en la interfaz
  // 'courses': gestión de precios por curso, 'discounts': descuentos, 'coupons': cupones, 'bundles': paquetes
  const [activeView, setActiveView] = useState('courses')
  
  // Estados para funcionalidad de búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('')           // Término de búsqueda para cursos
  const [statusFilter, setStatusFilter] = useState('all')    // Filtro por estado del curso
  const [categoryFilter, setCategoryFilter] = useState('all') // Filtro por categoría
  
  // Estados para control de modales y edición
  const [showModal, setShowModal] = useState(false)          // Controla la visibilidad del modal
  const [modalType, setModalType] = useState('')             // Tipo de modal: 'course', 'discount', 'coupon', 'bundle'
  const [editingItem, setEditingItem] = useState(null)       // Item que se está editando
  
  // Estados para selección múltiple y acciones en lote
  const [selectedCourses, setSelectedCourses] = useState(new Set()) // Cursos seleccionados
  const [showBulkActions, setShowBulkActions] = useState(false)     // Mostrar acciones en lote
  
  // ========================================
  // DATOS DE EJEMPLO - Cursos y precios
  // ========================================
  
  const categories = [
    { id: 'ciencias', name: 'Ciencias', color: 'blue' },
    { id: 'tecnologia', name: 'Tecnología', color: 'green' },
    { id: 'educacion', name: 'Educación', color: 'purple' }
  ]
  
  const [courses, setCourses] = useState([
    // Cursos de Ciencias
    {
      id: 1,
      title: 'Cálculo Diferencial e Integral',
      category: 'ciencias',
      instructor: 'Dr. María González',
      status: 'published',
      students: 1250,
      revenue: 248750,
      rating: 4.7,
      tags: ['matemáticas', 'cálculo', 'universidad'],
      levels: {
        basico: {
          name: 'Básico',
          price: 99,
          originalPrice: 199,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 450,
          revenue: 44550,
          topics: [
            'Introducción al cálculo',
            'Límites y continuidad',
            'Derivadas básicas',
            'Aplicaciones de derivadas',
            'Integrales indefinidas'
          ],
          activities: 8,
          quizzes: 3,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 149,
          originalPrice: 299,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 350,
          revenue: 52150,
          topics: [
            'Técnicas de integración',
            'Integrales definidas',
            'Aplicaciones de integrales',
            'Sucesiones y series',
            'Cálculo multivariable'
          ],
          activities: 12,
          quizzes: 5,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 199,
          originalPrice: 399,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 450,
          revenue: 89550,
          topics: [
            'Ecuaciones diferenciales',
            'Cálculo vectorial',
            'Análisis complejo',
            'Optimización',
            'Aplicaciones avanzadas'
          ],
          activities: 15,
          quizzes: 7,
          exams: 3
        }
      }
    },
    {
      id: 2,
      title: 'Física General',
      category: 'ciencias',
      instructor: 'Dr. Carlos Ruiz',
      status: 'published',
      students: 980,
      revenue: 175420,
      rating: 4.6,
      tags: ['física', 'mecánica', 'universidad'],
      levels: {
        basico: {
          name: 'Básico',
          price: 89,
          originalPrice: 179,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 350,
          revenue: 31150,
          topics: [
            'Mecánica básica',
            'Cinemática',
            'Dinámica',
            'Trabajo y energía',
            'Movimiento circular'
          ],
          activities: 6,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 129,
          originalPrice: 259,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 300,
          revenue: 38700,
          topics: [
            'Termodinámica',
            'Ondas y vibraciones',
            'Óptica geométrica',
            'Electricidad básica',
            'Magnetismo'
          ],
          activities: 10,
          quizzes: 4,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 169,
          originalPrice: 339,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 330,
          revenue: 55770,
          topics: [
            'Física cuántica',
            'Relatividad',
            'Física nuclear',
            'Astrofísica',
            'Física moderna'
          ],
          activities: 12,
          quizzes: 6,
          exams: 3
        }
      }
    },
    {
      id: 3,
      title: 'Química General',
      category: 'ciencias',
      instructor: 'Dra. Ana Martínez',
      status: 'published',
      students: 750,
      revenue: 119250,
      rating: 4.5,
      tags: ['química', 'orgánica', 'universidad'],
      levels: {
        basico: {
          name: 'Básico',
          price: 79,
          originalPrice: 159,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 280,
          revenue: 22120,
          topics: [
            'Estructura atómica',
            'Enlaces químicos',
            'Estados de la materia',
            'Reacciones químicas',
            'Estequiometría'
          ],
          activities: 5,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 119,
          originalPrice: 239,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 250,
          revenue: 29750,
          topics: [
            'Química orgánica básica',
            'Hidrocarburos',
            'Grupos funcionales',
            'Reacciones orgánicas',
            'Química inorgánica'
          ],
          activities: 8,
          quizzes: 3,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 159,
          originalPrice: 319,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 220,
          revenue: 34980,
          topics: [
            'Química analítica',
            'Espectroscopía',
            'Química física',
            'Bioquímica',
            'Química ambiental'
          ],
          activities: 11,
          quizzes: 5,
          exams: 3
        }
      }
    },
    {
      id: 4,
      title: 'Álgebra Lineal',
      category: 'ciencias',
      instructor: 'Dr. Luis Herrera',
      status: 'published',
      students: 650,
      revenue: 122850,
      rating: 4.8,
      tags: ['matemáticas', 'álgebra', 'universidad'],
      levels: {
        basico: {
          name: 'Básico',
          price: 99,
          originalPrice: 199,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 220,
          revenue: 21780,
          topics: [
            'Vectores en R² y R³',
            'Operaciones con matrices',
            'Sistemas de ecuaciones lineales',
            'Determinantes',
            'Espacios vectoriales básicos'
          ],
          activities: 7,
          quizzes: 3,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 149,
          originalPrice: 299,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 200,
          revenue: 29800,
          topics: [
            'Transformaciones lineales',
            'Valores y vectores propios',
            'Diagonalización',
            'Formas cuadráticas',
            'Espacios con producto interno'
          ],
          activities: 10,
          quizzes: 4,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 199,
          originalPrice: 399,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 230,
          revenue: 45770,
          topics: [
            'Descomposición de matrices',
            'Aplicaciones en geometría',
            'Optimización lineal',
            'Análisis numérico',
            'Aplicaciones en ciencias'
          ],
          activities: 13,
          quizzes: 6,
          exams: 3
        }
      }
    },
    {
      id: 5,
      title: 'Ecuaciones Diferenciales',
      category: 'ciencias',
      instructor: 'Dr. Roberto Silva',
      status: 'published',
      students: 420,
      revenue: 91980,
      rating: 4.9,
      tags: ['matemáticas', 'ecuaciones', 'avanzado'],
      levels: {
        basico: {
          name: 'Básico',
          price: 119,
          originalPrice: 239,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 150,
          revenue: 17850,
          topics: [
            'Ecuaciones de primer orden',
            'Ecuaciones separables',
            'Ecuaciones lineales',
            'Aplicaciones básicas',
            'Métodos numéricos simples'
          ],
          activities: 6,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 179,
          originalPrice: 359,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 140,
          revenue: 25060,
          topics: [
            'Ecuaciones de segundo orden',
            'Sistemas de ecuaciones',
            'Transformada de Laplace',
            'Series de potencias',
            'Aplicaciones en física'
          ],
          activities: 9,
          quizzes: 4,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 239,
          originalPrice: 479,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 130,
          revenue: 31070,
          topics: [
            'Ecuaciones parciales',
            'Métodos de separación de variables',
            'Análisis de estabilidad',
            'Teoría de bifurcaciones',
            'Aplicaciones avanzadas'
          ],
          activities: 12,
          quizzes: 6,
          exams: 3
        }
      }
    },
    {
      id: 6,
      title: 'Inglés para Ciencias',
      category: 'ciencias',
      instructor: 'Prof. Sarah Johnson',
      status: 'published',
      students: 580,
      revenue: 86420,
      rating: 4.4,
      tags: ['inglés', 'ciencias', 'idiomas'],
      levels: {
        basico: {
          name: 'Básico',
          price: 69,
          originalPrice: 139,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 200,
          revenue: 13800,
          topics: [
            'Vocabulario científico básico',
            'Lectura de artículos simples',
            'Presentaciones orales',
            'Escritura académica básica',
            'Comprensión auditiva'
          ],
          activities: 4,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 99,
          originalPrice: 199,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 190,
          revenue: 18810,
          topics: [
            'Lectura de papers científicos',
            'Escritura de abstracts',
            'Presentaciones técnicas',
            'Debates científicos',
            'Traducción técnica'
          ],
          activities: 6,
          quizzes: 3,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 129,
          originalPrice: 259,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 190,
          revenue: 24510,
          topics: [
            'Publicación científica',
            'Revisión de artículos',
            'Conferencias internacionales',
            'Redacción de tesis',
            'Comunicación profesional'
          ],
          activities: 8,
          quizzes: 4,
          exams: 3
        }
      }
    },
    
    // Cursos de Tecnología
    {
      id: 7,
      title: 'Inteligencia Artificial',
      category: 'tecnologia',
      instructor: 'Dr. Alex Chen',
      status: 'published',
      students: 2100,
      revenue: 837900,
      rating: 4.9,
      tags: ['IA', 'machine learning', 'avanzado'],
      levels: {
        basico: {
          name: 'Básico',
          price: 199,
          originalPrice: 399,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 700,
          revenue: 139300,
          topics: [
            'Introducción a la IA',
            'Algoritmos básicos',
            'Python para IA',
            'Machine Learning básico',
            'Proyectos simples'
          ],
          activities: 10,
          quizzes: 4,
          exams: 2
        },
        intermedio: {
          name: 'Intermedio',
          price: 299,
          originalPrice: 599,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 650,
          revenue: 194350,
          topics: [
            'Deep Learning',
            'Redes neuronales',
            'Computer Vision',
            'NLP básico',
            'Proyectos intermedios'
          ],
          activities: 15,
          quizzes: 6,
          exams: 3
        },
        avanzado: {
          name: 'Avanzado',
          price: 399,
          originalPrice: 799,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 750,
          revenue: 299250,
          topics: [
            'IA Generativa',
            'Reinforcement Learning',
            'IA Ética',
            'Investigación en IA',
            'Proyectos avanzados'
          ],
          activities: 20,
          quizzes: 8,
          exams: 4
        }
      }
    },
    {
      id: 8,
      title: 'Base de Datos',
      category: 'tecnologia',
      instructor: 'Ing. Patricia López',
      status: 'published',
      students: 1650,
      revenue: 460350,
      rating: 4.7,
      tags: ['bases de datos', 'SQL', 'intermedio'],
      levels: {
        basico: {
          name: 'Básico',
          price: 129,
          originalPrice: 259,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 550,
          revenue: 70950,
          topics: [
            'Conceptos básicos de BD',
            'SQL básico',
            'Diseño de tablas',
            'Consultas simples',
            'MySQL básico'
          ],
          activities: 8,
          quizzes: 3,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 199,
          originalPrice: 399,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 500,
          revenue: 99500,
          topics: [
            'SQL avanzado',
            'Índices y optimización',
            'Transacciones',
            'PostgreSQL',
            'NoSQL básico'
          ],
          activities: 12,
          quizzes: 5,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 279,
          originalPrice: 559,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 600,
          revenue: 167400,
          topics: [
            'Arquitectura de BD',
            'Big Data',
            'MongoDB',
            'Redis',
            'Administración avanzada'
          ],
          activities: 16,
          quizzes: 7,
          exams: 3
        }
      }
    },
    {
      id: 9,
      title: 'Páginas Web',
      category: 'tecnologia',
      instructor: 'Dev. Miguel Torres',
      status: 'published',
      students: 1950,
      revenue: 388050,
      rating: 4.6,
      tags: ['web', 'frontend', 'principiante'],
      levels: {
        basico: {
          name: 'Básico',
          price: 99,
          originalPrice: 199,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 700,
          revenue: 69300,
          topics: [
            'HTML5 básico',
            'CSS3 básico',
            'JavaScript básico',
            'Responsive design',
            'Proyectos simples'
          ],
          activities: 6,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 149,
          originalPrice: 299,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 600,
          revenue: 89400,
          topics: [
            'React básico',
            'Vue.js básico',
            'APIs REST',
            'Git y GitHub',
            'Proyectos intermedios'
          ],
          activities: 10,
          quizzes: 4,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 199,
          originalPrice: 399,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 650,
          revenue: 129350,
          topics: [
            'React avanzado',
            'Next.js',
            'TypeScript',
            'Testing',
            'Proyectos avanzados'
          ],
          activities: 14,
          quizzes: 6,
          exams: 3
        }
      }
    },
    {
      id: 10,
      title: 'Programación y Desarrollo de Aplicaciones',
      category: 'tecnologia',
      instructor: 'Dev. Laura García',
      status: 'published',
      students: 1800,
      revenue: 628200,
      rating: 4.8,
      tags: ['programación', 'full-stack', 'intermedio'],
      levels: {
        basico: {
          name: 'Básico',
          price: 149,
          originalPrice: 299,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 600,
          revenue: 89400,
          topics: [
            'Fundamentos de programación',
            'Python básico',
            'Estructuras de datos',
            'Algoritmos básicos',
            'Proyectos simples'
          ],
          activities: 8,
          quizzes: 3,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 229,
          originalPrice: 459,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 550,
          revenue: 125950,
          topics: [
            'Desarrollo web full-stack',
            'Node.js',
            'Bases de datos',
            'APIs',
            'Proyectos intermedios'
          ],
          activities: 12,
          quizzes: 5,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 329,
          originalPrice: 659,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 650,
          revenue: 213850,
          topics: [
            'Arquitectura de software',
            'Microservicios',
            'DevOps',
            'Cloud computing',
            'Proyectos avanzados'
          ],
          activities: 16,
          quizzes: 7,
          exams: 3
        }
      }
    },
    {
      id: 11,
      title: 'Ciberseguridad y Protección Digital',
      category: 'tecnologia',
      instructor: 'Sec. David Kim',
      status: 'published',
      students: 1200,
      revenue: 394800,
      rating: 4.9,
      tags: ['ciberseguridad', 'seguridad', 'avanzado'],
      levels: {
        basico: {
          name: 'Básico',
          price: 179,
          originalPrice: 359,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 400,
          revenue: 71600,
          topics: [
            'Conceptos básicos de seguridad',
            'Amenazas comunes',
            'Protección de contraseñas',
            'Navegación segura',
            'Herramientas básicas'
          ],
          activities: 7,
          quizzes: 3,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 259,
          originalPrice: 519,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 350,
          revenue: 90650,
          topics: [
            'Análisis de vulnerabilidades',
            'Penetration testing',
            'Redes seguras',
            'Criptografía básica',
            'Incident response'
          ],
          activities: 11,
          quizzes: 5,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 359,
          originalPrice: 719,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 450,
          revenue: 161550,
          topics: [
            'Hacking ético avanzado',
            'Forensia digital',
            'Criptografía avanzada',
            'Seguridad en la nube',
            'Auditorías de seguridad'
          ],
          activities: 15,
          quizzes: 7,
          exams: 3
        }
      }
    },
    
    // Cursos de Educación
    {
      id: 12,
      title: 'Gestión Socioemocional',
      category: 'educacion',
      instructor: 'Psic. Elena Vargas',
      status: 'published',
      students: 850,
      revenue: 152150,
      rating: 4.7,
      tags: ['educación', 'socioemocional', 'docentes'],
      levels: {
        basico: {
          name: 'Básico',
          price: 89,
          originalPrice: 179,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 300,
          revenue: 26700,
          topics: [
            'Inteligencia emocional básica',
            'Autoconocimiento',
            'Regulación emocional',
            'Habilidades sociales',
            'Comunicación efectiva'
          ],
          activities: 5,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 129,
          originalPrice: 259,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 275,
          revenue: 35475,
          topics: [
            'Gestión de conflictos',
            'Liderazgo emocional',
            'Trabajo en equipo',
            'Resolución de problemas',
            'Aplicación en el aula'
          ],
          activities: 8,
          quizzes: 3,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 179,
          originalPrice: 359,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 275,
          revenue: 49225,
          topics: [
            'Intervención socioemocional',
            'Programas de bienestar',
            'Evaluación emocional',
            'Investigación en el área',
            'Implementación institucional'
          ],
          activities: 11,
          quizzes: 5,
          exams: 3
        }
      }
    },
    {
      id: 13,
      title: 'Gamificación',
      category: 'educacion',
      instructor: 'Prof. Carlos Mendez',
      status: 'published',
      students: 720,
      revenue: 107280,
      rating: 4.5,
      tags: ['educación', 'gamificación', 'innovación'],
      levels: {
        basico: {
          name: 'Básico',
          price: 79,
          originalPrice: 159,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 250,
          revenue: 19750,
          topics: [
            'Conceptos básicos de gamificación',
            'Elementos de juego',
            'Mecánicas básicas',
            'Diseño de experiencias',
            'Herramientas simples'
          ],
          activities: 4,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 119,
          originalPrice: 239,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 235,
          revenue: 27965,
          topics: [
            'Diseño de sistemas de puntos',
            'Badges y logros',
            'Narrativas educativas',
            'Competencias saludables',
            'Aplicación en diferentes materias'
          ],
          activities: 7,
          quizzes: 3,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 159,
          originalPrice: 319,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 235,
          revenue: 37365,
          topics: [
            'Gamificación avanzada',
            'Tecnologías emergentes',
            'Análisis de datos',
            'Investigación en gamificación',
            'Implementación institucional'
          ],
          activities: 10,
          quizzes: 4,
          exams: 3
        }
      }
    },
    {
      id: 14,
      title: 'Laboratorios Creativos',
      category: 'educacion',
      instructor: 'Arq. María Fernández',
      status: 'published',
      students: 650,
      revenue: 109850,
      rating: 4.6,
      tags: ['educación', 'creatividad', 'espacios'],
      levels: {
        basico: {
          name: 'Básico',
          price: 89,
          originalPrice: 179,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 220,
          revenue: 19580,
          topics: [
            'Diseño de espacios educativos',
            'Elementos básicos',
            'Colores y materiales',
            'Iluminación educativa',
            'Proyectos simples'
          ],
          activities: 5,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 129,
          originalPrice: 259,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 215,
          revenue: 27735,
          topics: [
            'Tecnología en espacios',
            'Flexibilidad y adaptabilidad',
            'Sostenibilidad',
            'Accesibilidad',
            'Proyectos intermedios'
          ],
          activities: 8,
          quizzes: 3,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 169,
          originalPrice: 339,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 215,
          revenue: 36335,
          topics: [
            'Arquitectura educativa avanzada',
            'Innovación en espacios',
            'Investigación en diseño',
            'Implementación de proyectos',
            'Evaluación de espacios'
          ],
          activities: 11,
          quizzes: 5,
          exams: 3
        }
      }
    },
    {
      id: 15,
      title: 'Evaluación y Retroalimentación Efectiva',
      category: 'educacion',
      instructor: 'Dr. Roberto Sánchez',
      status: 'published',
      students: 580,
      revenue: 115420,
      rating: 4.8,
      tags: ['educación', 'evaluación', 'metodología'],
      levels: {
        basico: {
          name: 'Básico',
          price: 99,
          originalPrice: 199,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 200,
          revenue: 19800,
          topics: [
            'Tipos de evaluación',
            'Criterios de evaluación',
            'Rúbricas básicas',
            'Retroalimentación constructiva',
            'Herramientas simples'
          ],
          activities: 6,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 149,
          originalPrice: 299,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 190,
          revenue: 28310,
          topics: [
            'Evaluación formativa',
            'Portafolios digitales',
            'Autoevaluación y coevaluación',
            'Tecnología en evaluación',
            'Aplicación en diferentes contextos'
          ],
          activities: 9,
          quizzes: 4,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 199,
          originalPrice: 399,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 190,
          revenue: 37810,
          topics: [
            'Evaluación por competencias',
            'Big data en educación',
            'IA en evaluación',
            'Investigación en evaluación',
            'Políticas educativas'
          ],
          activities: 12,
          quizzes: 6,
          exams: 3
        }
      }
    },
    {
      id: 16,
      title: 'Diseña tu Plan de Trabajo',
      category: 'educacion',
      instructor: 'Mg. Ana Rodríguez',
      status: 'published',
      students: 690,
      revenue: 130410,
      rating: 4.7,
      tags: ['educación', 'planificación', 'gestión'],
      levels: {
        basico: {
          name: 'Básico',
          price: 89,
          originalPrice: 179,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 230,
          revenue: 20470,
          topics: [
            'Planificación básica',
            'Objetivos SMART',
            'Cronogramas simples',
            'Recursos básicos',
            'Seguimiento básico'
          ],
          activities: 5,
          quizzes: 2,
          exams: 1
        },
        intermedio: {
          name: 'Intermedio',
          price: 129,
          originalPrice: 259,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 230,
          revenue: 29670,
          topics: [
            'Gestión de proyectos',
            'Metodologías ágiles',
            'Herramientas digitales',
            'Trabajo en equipo',
            'Evaluación de proyectos'
          ],
          activities: 8,
          quizzes: 3,
          exams: 2
        },
        avanzado: {
          name: 'Avanzado',
          price: 179,
          originalPrice: 359,
          discount: 50,
          isDiscountActive: true,
          discountStartDate: '2024-01-01',
          discountEndDate: '2024-12-31',
          students: 230,
          revenue: 41170,
          topics: [
            'Liderazgo educativo',
            'Innovación en gestión',
            'Análisis de datos',
            'Investigación en gestión',
            'Implementación institucional'
          ],
          activities: 11,
          quizzes: 5,
          exams: 3
        }
      }
    }
  ])
  
  // Estado para cupones
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: 'WELCOME20',
      description: 'Descuento de bienvenida para nuevos usuarios',
      type: 'percentage',
      value: 20,
      minAmount: 100,
      maxUses: 1000,
      usedCount: 245,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
      applicableCourses: 'all',
      category: 'general'
    },
    {
      id: 2,
      code: 'STUDENT50',
      description: 'Descuento especial para estudiantes',
      type: 'percentage',
      value: 50,
      minAmount: 200,
      maxUses: 500,
      usedCount: 89,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      isActive: true,
      applicableCourses: 'all',
      category: 'estudiantes'
    },
    {
      id: 3,
      code: 'TECH30',
      description: 'Descuento para cursos de tecnología',
      type: 'percentage',
      value: 30,
      minAmount: 150,
      maxUses: 200,
      usedCount: 45,
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      isActive: true,
      applicableCourses: 'tecnologia',
      category: 'tecnología'
    },
    {
      id: 4,
      code: 'FIXED100',
      description: 'Descuento fijo de $100',
      type: 'fixed',
      value: 100,
      minAmount: 300,
      maxUses: 100,
      usedCount: 23,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      isActive: false,
      applicableCourses: 'all',
      category: 'general'
    }
  ])
  
  // Estado para bundles
  const [bundles, setBundles] = useState([
    {
      id: 1,
      name: 'Paquete Completo de Ciencias',
      description: 'Todos los cursos de ciencias con descuento especial',
      courses: [1, 2, 3, 4, 5, 6],
      originalPrice: 2154,
      bundlePrice: 1077,
      discount: 50,
      isActive: true,
      sales: 45,
      category: 'ciencias',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 2,
      name: 'Master en Tecnología',
      description: 'Curso completo de desarrollo tecnológico',
      courses: [7, 8, 9, 10, 11],
      originalPrice: 3115,
      bundlePrice: 1558,
      discount: 50,
      isActive: true,
      sales: 32,
      category: 'tecnologia',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 3,
      name: 'Especialización en Educación',
      description: 'Formación completa para educadores',
      courses: [12, 13, 14, 15, 16],
      originalPrice: 1775,
      bundlePrice: 888,
      discount: 50,
      isActive: true,
      sales: 28,
      category: 'educacion',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
  ])
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Filtrar cursos
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [courses, searchTerm, statusFilter, categoryFilter])
  
  // Obtener color de categoría
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    const colorMap = {
      'blue': 'bg-blue-500/20 text-blue-400 border border-blue-400/30',
      'green': 'bg-green-500/20 text-green-400 border border-green-400/30',
      'purple': 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
    }
    return colorMap[category?.color] || 'bg-white/10 text-white/70 border border-white/20'
  }
  
  // Obtener color de estado
  const getStatusColor = (status) => {
    const colorMap = {
      'published': 'text-green-400 bg-green-500/20 border border-green-400/30',
      'draft': 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30',
      'archived': 'text-white/70 bg-white/10 border border-white/20'
    }
    return colorMap[status] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Obtener texto de estado
  const getStatusText = (status) => {
    const textMap = {
      'published': 'Publicado',
      'draft': 'Borrador',
      'archived': 'Archivado'
    }
    return textMap[status] || 'Desconocido'
  }
  
  // Obtener icono de estado
  const getStatusIcon = (status) => {
    const iconMap = {
      'published': CheckCircle,
      'draft': Clock,
      'archived': AlertCircle
    }
    return iconMap[status] || Clock
  }
  
  // Calcular descuento
  const calculateDiscount = (basePrice, currentPrice) => {
    return Math.round(((basePrice - currentPrice) / basePrice) * 100)
  }
  
  // Aplicar descuento por porcentaje a un nivel específico
  const applyPercentageDiscount = (courseId, levelKey, percentage) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const level = course.levels[levelKey]
        if (level) {
          const discountAmount = (level.originalPrice * percentage) / 100
          const newPrice = level.originalPrice - discountAmount
          return {
            ...course,
            levels: {
              ...course.levels,
              [levelKey]: {
                ...level,
                price: newPrice,
                discount: percentage
              }
            }
          }
        }
      }
      return course
    }))
  }
  
  // Aplicar descuento por cantidad fija a un nivel específico
  const applyFixedDiscount = (courseId, levelKey, amount) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const level = course.levels[levelKey]
        if (level) {
          const newPrice = Math.max(0, level.originalPrice - amount)
          const discount = calculateDiscount(level.originalPrice, newPrice)
          return {
            ...course,
            levels: {
              ...course.levels,
              [levelKey]: {
                ...level,
                price: newPrice,
                discount: discount
              }
            }
          }
        }
      }
      return course
    }))
  }
  
  // Aplicar descuento masivo a todos los niveles de un curso
  const applyBulkDiscountToCourse = (courseId, type, value) => {
    const levelKeys = ['basico', 'intermedio', 'avanzado']
    levelKeys.forEach(levelKey => {
      if (type === 'percentage') {
        applyPercentageDiscount(courseId, levelKey, value)
      } else {
        applyFixedDiscount(courseId, levelKey, value)
      }
    })
  }
  
  // Toggle selección de curso
  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(courseId)) {
        newSet.delete(courseId)
      } else {
        newSet.add(courseId)
      }
      return newSet
    })
  }
  
  // Seleccionar todos los cursos
  const selectAllCourses = () => {
    setSelectedCourses(new Set(filteredCourses.map(course => course.id)))
  }
  
  // Deseleccionar todos los cursos
  const deselectAllCourses = () => {
    setSelectedCourses(new Set())
  }
  
  // Aplicar descuento masivo
  const applyBulkDiscount = (type, value) => {
    selectedCourses.forEach(courseId => {
      applyBulkDiscountToCourse(courseId, type, value)
    })
    setSelectedCourses(new Set())
    setShowBulkActions(false)
  }
  
  // ========================================
  // COMPONENTES INTERNOS
  // ========================================
  
  // Componente para la vista de cursos
  const CoursesView = () => (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
            <input
            type="text"
            placeholder="Buscar cursos por título, instructor o tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
            />
          </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          <option value="all" className="bg-gray-800">Todos los estados</option>
          <option value="published" className="bg-gray-800">Publicados</option>
          <option value="draft" className="bg-gray-800">Borradores</option>
          <option value="archived" className="bg-gray-800">Archivados</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          <option value="all" className="bg-gray-800">Todas las categorías</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
          </div>
          
        {/* Acciones masivas */}
        {selectedCourses.size > 0 && (
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-400">
                  {selectedCourses.size} curso(s) seleccionado(s)
                </span>
              <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                  {showBulkActions ? 'Ocultar acciones' : 'Mostrar acciones'}
              </button>
            </div>
              <button
                onClick={deselectAllCourses}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                Deseleccionar todo
              </button>
          </div>
          
          {showBulkActions && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => applyBulkDiscount('percentage', 20)}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Aplicar 20% descuento
              </button>
              <button
                onClick={() => applyBulkDiscount('percentage', 30)}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Aplicar 30% descuento
              </button>
              <button
                onClick={() => applyBulkDiscount('percentage', 50)}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Aplicar 50% descuento
              </button>
              <button
                onClick={() => applyBulkDiscount('fixed', 50)}
                className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
              >
                Descuento fijo $50
              </button>
              <button
                onClick={() => applyBulkDiscount('fixed', 100)}
                className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
              >
                Descuento fijo $100
              </button>
        </div>
          )}
        </div>
      )}
      
      {/* Lista de cursos */}
      <div className="space-y-4">
        {filteredCourses.map((course) => {
          const StatusIcon = getStatusIcon(course.status)
          const category = categories.find(cat => cat.id === course.category)
          
          return (
            <div key={course.id} className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                {/* Checkbox de selección */}
            <input
              type="checkbox"
                  checked={selectedCourses.has(course.id)}
                  onChange={() => toggleCourseSelection(course.id)}
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10"
                />
                
                  {/* Información del curso */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
              <div>
                        <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-sm">{course.title}</h3>
                        <p className="text-sm text-white/80 mb-2 drop-shadow-sm">{course.instructor}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                            {category?.name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                            <StatusIcon size={12} className="inline mr-1" />
                            {getStatusText(course.status)}
                          </span>
              </div>
              </div>
                      
                      {/* Estadísticas generales */}
                      <div className="text-right">
                        <p className="text-sm text-white/70">${course.revenue.toLocaleString()} en ventas</p>
                        <p className="text-sm text-white/70">{course.students} estudiantes totales</p>
            </div>
        </div>
                  
                  {/* Niveles con precios */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/90 mb-3">Niveles y Precios</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {Object.entries(course.levels).map(([levelKey, level]) => (
                        <div key={levelKey} className="border border-white/20 rounded-lg p-3 hover:border-purple-400/50 transition-colors bg-white/5 backdrop-blur-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">{level.name}</span>
                            <span className="text-xs text-white/70">{level.students} estudiantes</span>
      </div>
      
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-purple-400">${level.price}</span>
                            <span className="text-sm text-white/60 line-through">${level.originalPrice}</span>
                            <span className="px-1 py-0.5 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30">
                              -{level.discount}%
                            </span>
                          </div>
                          
                          <div className="text-xs text-white/70 mb-2">
                            {level.activities} actividades • {level.quizzes} quizzes • {level.exams} exámenes
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            ${level.revenue.toLocaleString()} en ventas
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Acciones */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(course)
                        setModalType('course')
                        setShowModal(true)
                      }}
                      className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 flex items-center gap-2"
                    >
                      <Edit size={14} />
                      Editar Curso
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(course)
                        setModalType('levels')
                        setShowModal(true)
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Settings size={14} />
                      Gestionar Niveles
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(course)
                        setModalType('discount')
                        setShowModal(true)
                      }}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <Percent size={14} />
                      Descuentos
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 flex items-center gap-2">
                      <Copy size={14} />
                      Duplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
  
  // Componente para la vista de cupones
  const CouponsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Cupones de Descuento</h3>
          <button
            onClick={() => {
              setEditingItem(null)
            setModalType('coupon')
            setShowModal(true)
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
          Crear Cupón
          </button>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => {
          const StatusIcon = getStatusIcon(coupon.isActive)
            return (
            <div key={coupon.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                  <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{coupon.code}</h4>
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                  </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(coupon.isActive)}`}>
                    <StatusIcon size={12} className="inline mr-1" />
                  {getStatusText(coupon.isActive)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">
                    {coupon.type === 'percentage' ? 'Porcentaje' : 'Cantidad Fija'}
                  </span>
                  </div>
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valor:</span>
                  <span className="font-medium text-primary-600">
                    {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                  </span>
                  </div>
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usos:</span>
                  <span className="font-medium">
                    {coupon.usedCount}/{coupon.maxUses}
                  </span>
                  </div>
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Válido hasta:</span>
                  <span className="font-medium">
                    {new Date(coupon.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                    <Edit size={14} />
                    Editar
                  </button>
                  <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                    <Copy size={14} />
                    Duplicar
                  </button>
                  <button className="btn-secondary text-sm py-2 px-3">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
  )
  
  // Componente para la vista de bundles
  const BundlesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Bundles de Cursos</h3>
          <button
            onClick={() => {
              setEditingItem(null)
            setModalType('bundle')
            setShowModal(true)
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
          Crear Bundle
          </button>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => {
          const StatusIcon = getStatusIcon(bundle.isActive)
          const category = categories.find(cat => cat.id === bundle.category)
            return (
            <div key={bundle.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                  <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{bundle.name}</h4>
                  <p className="text-sm text-gray-600">{bundle.description}</p>
                  </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bundle.isActive)}`}>
                    <StatusIcon size={12} className="inline mr-1" />
                  {getStatusText(bundle.isActive)}
                  </span>
                </div>
                
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Categoría:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(bundle.category)}`}>
                    {category?.name}
                    </span>
                  </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio Original:</span>
                  <span className="line-through">${bundle.originalPrice}</span>
                  </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio Bundle:</span>
                  <span className="font-semibold text-primary-600">${bundle.bundlePrice}</span>
                  </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuento:</span>
                  <span className="text-green-600">{bundle.discount}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ventas:</span>
                  <span className="flex items-center gap-1">
                    <ShoppingCart size={14} />
                    {bundle.sales}
                    </span>
                  </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cursos incluidos:</span>
                  <span className="font-medium">{bundle.courses.length}</span>
                  </div>
                </div>
                
              <div className="flex gap-2">
                  <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                    <Edit size={14} />
                    Editar
                  </button>
                  <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                    <Copy size={14} />
                    Duplicar
                  </button>
                  <button className="btn-secondary text-sm py-2 px-3">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
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
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Gestión de Precios</h2>
          <p className="text-white/80 drop-shadow-md">Administra precios, descuentos, cupones y bundles de todos los cursos</p>
        </div>
        
        {/* Navegación por pestañas */}
        <div className="border-b border-white/20">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'courses', label: 'Cursos', icon: BookOpen },
              { id: 'coupons', label: 'Cupones', icon: Tag },
              { id: 'bundles', label: 'Bundles', icon: Package }
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
          {activeView === 'courses' && <CoursesView />}
          {activeView === 'coupons' && <CouponsView />}
          {activeView === 'bundles' && <BundlesView />}
        </div>
      </div>
    </div>
  )
}

export default CoursePricing
