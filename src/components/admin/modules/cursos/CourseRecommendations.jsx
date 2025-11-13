// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado, efectos y optimización
import React, { useState, useEffect, useMemo } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  BookOpen,      // Icono de libro para cursos
  Star,          // Icono de estrella para calificaciones
  Clock,         // Icono de reloj para duración
  Users,         // Icono de usuarios para estudiantes
  TrendingUp,    // Icono de tendencia para popularidad
  ArrowRight,    // Icono de flecha derecha para navegación
  CheckCircle,   // Icono de check para completado
  Lock,          // Icono de candado para contenido premium
  Play,          // Icono de play para reproducir
  Award,         // Icono de premio para certificados
  Target,        // Icono de objetivo para metas
  Zap,           // Icono de rayo para destacados
  Atom,          // Icono de átomo para ciencias
  Laptop,        // Icono de laptop para tecnología
  GraduationCap, // Icono de graduación para educación
  ChevronRight,  // Icono de chevron derecha para navegación
  ChevronLeft    // Icono de chevron izquierda para navegación
} from 'lucide-react'

// Importa estilos CSS para animaciones personalizadas
import '../../../../styles/animations.css'

// ========================================
// COMPONENTE PRINCIPAL - CourseRecommendations
// ========================================

// Define el componente funcional CourseRecommendations que proporciona recomendaciones personalizadas de cursos
// Recibe props: purchasedCourses (cursos comprados), completedCourses (cursos completados), 
// userInterests (intereses del usuario), currentCourse (curso actual)
const CourseRecommendations = ({ 
  purchasedCourses = [],    // Array de cursos que el usuario ha comprado
  completedCourses = [],    // Array de cursos que el usuario ha completado
  userInterests = [],       // Array de intereses/categorías preferidas del usuario
  currentCourse = null      // Curso actualmente visualizado (opcional)
}) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado que contiene las recomendaciones generadas para el usuario
  const [recommendations, setRecommendations] = useState([])
  
  // Estado para controlar el indicador de carga mientras se generan recomendaciones
  const [loading, setLoading] = useState(false)
  
  // Estado para filtrar recomendaciones por categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // ========================================
  // DATOS DE CURSOS DISPONIBLES
  // ========================================
  
  const allCourses = [
    // Cursos de Ciencias
    {
      id: 1,
      title: 'Cálculo Diferencial e Integral',
      category: 'ciencias',
      categoryName: 'Ciencias',
      categoryIcon: Atom,
      categoryColor: 'from-blue-500 to-blue-700',
      instructor: 'Dr. Carlos Mendoza',
      level: 'intermedio',
      duration: '45 horas',
      students: 2156,
      rating: 4.8,
      totalRatings: 156,
      price: 399,
      originalPrice: 599,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/calculo.jpg',
      tags: ['Matemáticas', 'Cálculo', 'Universidad'],
      educationLevel: 'universidad',
      sessions: 18,
      completionRate: 78,
      revenue: 860400,
      difficulty: 'intermedio',
      prerequisites: ['Álgebra básica', 'Trigonometría'],
      skills: ['Análisis matemático', 'Resolución de problemas', 'Pensamiento crítico'],
      relatedCourses: [2, 4, 5], // IDs de cursos relacionados
      popularity: 95,
      trending: true
    },
    {
      id: 2,
      title: 'Física General',
      category: 'ciencias',
      categoryName: 'Ciencias',
      categoryIcon: Atom,
      categoryColor: 'from-blue-500 to-blue-700',
      instructor: 'Dra. Ana García',
      level: 'basico',
      duration: '40 horas',
      students: 1892,
      rating: 4.7,
      totalRatings: 134,
      price: 349,
      originalPrice: 499,
      discount: 30,
      status: 'published',
      featured: true,
      image: '/images/fisica.jpg',
      tags: ['Física', 'Mecánica', 'Fundamentos'],
      educationLevel: 'universidad',
      sessions: 16,
      completionRate: 82,
      revenue: 660800,
      difficulty: 'basico',
      prerequisites: ['Matemáticas básicas'],
      skills: ['Análisis físico', 'Resolución de problemas', 'Pensamiento científico'],
      relatedCourses: [1, 3, 6],
      popularity: 88,
      trending: false
    },
    {
      id: 3,
      title: 'Química General',
      category: 'ciencias',
      categoryName: 'Ciencias',
      categoryIcon: Atom,
      categoryColor: 'from-blue-500 to-blue-700',
      instructor: 'Dr. Luis Rodríguez',
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
      tags: ['Química', 'Átomos', 'Reacciones'],
      educationLevel: 'universidad',
      sessions: 14,
      completionRate: 75,
      revenue: 435600,
      difficulty: 'basico',
      prerequisites: ['Matemáticas básicas', 'Física básica'],
      skills: ['Análisis químico', 'Laboratorio', 'Pensamiento analítico'],
      relatedCourses: [2, 4, 6],
      popularity: 72,
      trending: false
    },
    {
      id: 4,
      title: 'Álgebra Lineal',
      category: 'ciencias',
      categoryName: 'Ciencias',
      categoryIcon: Atom,
      categoryColor: 'from-blue-500 to-blue-700',
      instructor: 'Dr. Miguel Herrera',
      level: 'intermedio',
      duration: '38 horas',
      students: 1234,
      rating: 4.9,
      totalRatings: 89,
      price: 379,
      originalPrice: 569,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/algebra.jpg',
      tags: ['Matemáticas', 'Álgebra', 'Matrices'],
      educationLevel: 'universidad',
      sessions: 15,
      completionRate: 85,
      revenue: 468000,
      difficulty: 'intermedio',
      prerequisites: ['Cálculo básico', 'Geometría'],
      skills: ['Análisis matricial', 'Resolución de sistemas', 'Pensamiento abstracto'],
      relatedCourses: [1, 5, 7],
      popularity: 68,
      trending: true
    },
    {
      id: 5,
      title: 'Ecuaciones Diferenciales',
      category: 'ciencias',
      categoryName: 'Ciencias',
      categoryIcon: Atom,
      categoryColor: 'from-blue-500 to-blue-700',
      instructor: 'Dr. Roberto Silva',
      level: 'avanzado',
      duration: '42 horas',
      students: 890,
      rating: 4.9,
      totalRatings: 67,
      price: 439,
      originalPrice: 659,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/ecuaciones.jpg',
      tags: ['Matemáticas', 'Ecuaciones', 'Avanzado'],
      educationLevel: 'universidad',
      sessions: 17,
      completionRate: 78,
      revenue: 390000,
      difficulty: 'avanzado',
      prerequisites: ['Cálculo integral', 'Álgebra lineal'],
      skills: ['Análisis diferencial', 'Modelado matemático', 'Resolución avanzada'],
      relatedCourses: [1, 4, 7],
      popularity: 45,
      trending: false
    },
    {
      id: 6,
      title: 'Inglés para Ciencias',
      category: 'ciencias',
      categoryName: 'Ciencias',
      categoryIcon: Atom,
      categoryColor: 'from-blue-500 to-blue-700',
      instructor: 'Prof. Sarah Johnson',
      level: 'intermedio',
      duration: '30 horas',
      students: 2100,
      rating: 4.4,
      totalRatings: 145,
      price: 299,
      originalPrice: 449,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/ingles.jpg',
      tags: ['Inglés', 'Ciencias', 'Idiomas'],
      educationLevel: 'universidad',
      sessions: 12,
      completionRate: 88,
      revenue: 630000,
      difficulty: 'intermedio',
      prerequisites: ['Inglés básico'],
      skills: ['Comunicación científica', 'Lectura técnica', 'Escritura académica'],
      relatedCourses: [1, 2, 3],
      popularity: 92,
      trending: true
    },
    
    // Cursos de Tecnología
    {
      id: 7,
      title: 'Inteligencia Artificial',
      category: 'tecnologia',
      categoryName: 'Tecnología',
      categoryIcon: Laptop,
      categoryColor: 'from-purple-500 to-purple-700',
      instructor: 'Dr. Alex Chen',
      level: 'avanzado',
      duration: '60 horas',
      students: 3200,
      rating: 4.9,
      totalRatings: 245,
      price: 799,
      originalPrice: 1199,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/ia.jpg',
      tags: ['IA', 'Machine Learning', 'Avanzado'],
      educationLevel: 'universidad',
      sessions: 24,
      completionRate: 72,
      revenue: 2556800,
      difficulty: 'avanzado',
      prerequisites: ['Programación Python', 'Matemáticas avanzadas'],
      skills: ['Machine Learning', 'Deep Learning', 'Análisis de datos'],
      relatedCourses: [8, 9, 10],
      popularity: 98,
      trending: true
    },
    {
      id: 8,
      title: 'Base de Datos',
      category: 'tecnologia',
      categoryName: 'Tecnología',
      categoryIcon: Laptop,
      categoryColor: 'from-purple-500 to-purple-700',
      instructor: 'Ing. Patricia López',
      level: 'intermedio',
      duration: '35 horas',
      students: 2800,
      rating: 4.7,
      totalRatings: 189,
      price: 559,
      originalPrice: 839,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/bd.jpg',
      tags: ['Bases de Datos', 'SQL', 'Intermedio'],
      educationLevel: 'universidad',
      sessions: 14,
      completionRate: 85,
      revenue: 1565200,
      difficulty: 'intermedio',
      prerequisites: ['Programación básica'],
      skills: ['SQL', 'Diseño de BD', 'Optimización'],
      relatedCourses: [7, 9, 11],
      popularity: 85,
      trending: false
    },
    {
      id: 9,
      title: 'Páginas Web',
      category: 'tecnologia',
      categoryName: 'Tecnología',
      categoryIcon: Laptop,
      categoryColor: 'from-purple-500 to-purple-700',
      instructor: 'Dev. Miguel Torres',
      level: 'basico',
      duration: '40 horas',
      students: 4500,
      rating: 4.6,
      totalRatings: 312,
      price: 399,
      originalPrice: 599,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/web.jpg',
      tags: ['Web', 'Frontend', 'Principiante'],
      educationLevel: 'universidad',
      sessions: 16,
      completionRate: 78,
      revenue: 1795500,
      difficulty: 'basico',
      prerequisites: ['Conocimientos básicos de computación'],
      skills: ['HTML/CSS', 'JavaScript', 'Diseño web'],
      relatedCourses: [8, 10, 11],
      popularity: 95,
      trending: true
    },
    {
      id: 10,
      title: 'Programación y Desarrollo de Aplicaciones',
      category: 'tecnologia',
      categoryName: 'Tecnología',
      categoryIcon: Laptop,
      categoryColor: 'from-purple-500 to-purple-700',
      instructor: 'Dev. Laura García',
      level: 'intermedio',
      duration: '50 horas',
      students: 3600,
      rating: 4.8,
      totalRatings: 267,
      price: 699,
      originalPrice: 1049,
      discount: 33,
      status: 'published',
      featured: true,
      image: '/images/programacion.jpg',
      tags: ['Programación', 'Full-stack', 'Intermedio'],
      educationLevel: 'universidad',
      sessions: 20,
      completionRate: 80,
      revenue: 2516400,
      difficulty: 'intermedio',
      prerequisites: ['Programación básica', 'Bases de datos'],
      skills: ['Desarrollo full-stack', 'APIs', 'Arquitectura de software'],
      relatedCourses: [7, 8, 9, 11],
      popularity: 90,
      trending: true
    },
    {
      id: 11,
      title: 'Ciberseguridad y Protección Digital',
      category: 'tecnologia',
      categoryName: 'Tecnología',
      categoryIcon: Laptop,
      categoryColor: 'from-purple-500 to-purple-700',
      instructor: 'Sec. David Kim',
      level: 'avanzado',
      duration: '45 horas',
      students: 1800,
      rating: 4.9,
      totalRatings: 134,
      price: 659,
      originalPrice: 989,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/cyber.jpg',
      tags: ['Ciberseguridad', 'Seguridad', 'Avanzado'],
      educationLevel: 'universidad',
      sessions: 18,
      completionRate: 76,
      revenue: 1186200,
      difficulty: 'avanzado',
      prerequisites: ['Redes de computadoras', 'Programación'],
      skills: ['Análisis de seguridad', 'Penetration testing', 'Gestión de riesgos'],
      relatedCourses: [8, 9, 10],
      popularity: 65,
      trending: false
    },
    
    // Cursos de Educación
    {
      id: 12,
      title: 'Gestión Socioemocional',
      category: 'educacion',
      categoryName: 'Educación',
      categoryIcon: GraduationCap,
      categoryColor: 'from-green-500 to-green-700',
      instructor: 'Psic. Elena Vargas',
      level: 'intermedio',
      duration: '30 horas',
      students: 1200,
      rating: 4.7,
      totalRatings: 89,
      price: 359,
      originalPrice: 539,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/socioemocional.jpg',
      tags: ['Educación', 'Socioemocional', 'Docentes'],
      educationLevel: 'universidad',
      sessions: 12,
      completionRate: 85,
      revenue: 430800,
      difficulty: 'intermedio',
      prerequisites: ['Psicología básica'],
      skills: ['Inteligencia emocional', 'Gestión de conflictos', 'Liderazgo'],
      relatedCourses: [13, 14, 15],
      popularity: 70,
      trending: false
    },
    {
      id: 13,
      title: 'Gamificación',
      category: 'educacion',
      categoryName: 'Educación',
      categoryIcon: GraduationCap,
      categoryColor: 'from-green-500 to-green-700',
      instructor: 'Prof. Carlos Mendez',
      level: 'basico',
      duration: '25 horas',
      students: 980,
      rating: 4.5,
      totalRatings: 67,
      price: 299,
      originalPrice: 449,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/gamificacion.jpg',
      tags: ['Educación', 'Gamificación', 'Innovación'],
      educationLevel: 'universidad',
      sessions: 10,
      completionRate: 82,
      revenue: 293020,
      difficulty: 'basico',
      prerequisites: ['Pedagogía básica'],
      skills: ['Diseño de juegos', 'Motivación', 'Innovación educativa'],
      relatedCourses: [12, 14, 16],
      popularity: 60,
      trending: true
    },
    {
      id: 14,
      title: 'Laboratorios Creativos',
      category: 'educacion',
      categoryName: 'Educación',
      categoryIcon: GraduationCap,
      categoryColor: 'from-green-500 to-green-700',
      instructor: 'Arq. María Fernández',
      level: 'intermedio',
      duration: '28 horas',
      students: 750,
      rating: 4.6,
      totalRatings: 45,
      price: 339,
      originalPrice: 509,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/laboratorios.jpg',
      tags: ['Educación', 'Creatividad', 'Espacios'],
      educationLevel: 'universidad',
      sessions: 11,
      completionRate: 78,
      revenue: 254250,
      difficulty: 'intermedio',
      prerequisites: ['Diseño básico', 'Pedagogía'],
      skills: ['Diseño de espacios', 'Creatividad', 'Innovación'],
      relatedCourses: [12, 13, 15],
      popularity: 55,
      trending: false
    },
    {
      id: 15,
      title: 'Evaluación y Retroalimentación Efectiva',
      category: 'educacion',
      categoryName: 'Educación',
      categoryIcon: GraduationCap,
      categoryColor: 'from-green-500 to-green-700',
      instructor: 'Dr. Roberto Sánchez',
      level: 'avanzado',
      duration: '32 horas',
      students: 650,
      rating: 4.8,
      totalRatings: 52,
      price: 399,
      originalPrice: 599,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/evaluacion.jpg',
      tags: ['Educación', 'Evaluación', 'Metodología'],
      educationLevel: 'universidad',
      sessions: 13,
      completionRate: 80,
      revenue: 259350,
      difficulty: 'avanzado',
      prerequisites: ['Metodología de investigación', 'Estadística básica'],
      skills: ['Evaluación educativa', 'Análisis de datos', 'Metodología'],
      relatedCourses: [12, 14, 16],
      popularity: 48,
      trending: false
    },
    {
      id: 16,
      title: 'Diseña tu Plan de Trabajo',
      category: 'educacion',
      categoryName: 'Educación',
      categoryIcon: GraduationCap,
      categoryColor: 'from-green-500 to-green-700',
      instructor: 'Mg. Ana Rodríguez',
      level: 'intermedio',
      duration: '26 horas',
      students: 890,
      rating: 4.7,
      totalRatings: 71,
      price: 379,
      originalPrice: 569,
      discount: 33,
      status: 'published',
      featured: false,
      image: '/images/plan.jpg',
      tags: ['Educación', 'Planificación', 'Gestión'],
      educationLevel: 'universidad',
      sessions: 10,
      completionRate: 88,
      revenue: 337310,
      difficulty: 'intermedio',
      prerequisites: ['Gestión básica'],
      skills: ['Planificación', 'Gestión de proyectos', 'Liderazgo'],
      relatedCourses: [12, 13, 15],
      popularity: 62,
      trending: false
    }
  ]
  
  // ========================================
  // ALGORITMO DE RECOMENDACIONES
  // ========================================
  
  const generateRecommendations = useMemo(() => {
    if (!purchasedCourses.length && !completedCourses.length) {
      // Si no hay historial, recomendar cursos populares y trending
      return allCourses
        .filter(course => course.trending || course.popularity > 80)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 6)
    }
    
    const recommendations = []
    const seenCourses = new Set([...purchasedCourses, ...completedCourses])
    
    // 1. Cursos relacionados a los comprados/completados
    purchasedCourses.forEach(courseId => {
      const course = allCourses.find(c => c.id === courseId)
      if (course && course.relatedCourses) {
        course.relatedCourses.forEach(relatedId => {
          if (!seenCourses.has(relatedId)) {
            const relatedCourse = allCourses.find(c => c.id === relatedId)
            if (relatedCourse) {
              recommendations.push({
                ...relatedCourse,
                reason: `Relacionado con ${course.title}`,
                score: 95
              })
            }
          }
        })
      }
    })
    
    // 2. Cursos de la misma categoría
    const userCategories = purchasedCourses.map(courseId => {
      const course = allCourses.find(c => c.id === courseId)
      return course?.category
    }).filter(Boolean)
    
    const categoryCounts = userCategories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {})
    
    const favoriteCategory = Object.keys(categoryCounts).reduce((a, b) => 
      categoryCounts[a] > categoryCounts[b] ? a : b, 'ciencias'
    )
    
    allCourses
      .filter(course => 
        course.category === favoriteCategory && 
        !seenCourses.has(course.id) &&
        !recommendations.some(r => r.id === course.id)
      )
      .forEach(course => {
        recommendations.push({
          ...course,
          reason: `Más cursos de ${course.categoryName}`,
          score: 85
        })
      })
    
    // 3. Cursos del siguiente nivel de dificultad
    const userLevels = purchasedCourses.map(courseId => {
      const course = allCourses.find(c => c.id === courseId)
      return course?.difficulty
    }).filter(Boolean)
    
    const levelProgression = {
      'basico': 'intermedio',
      'intermedio': 'avanzado',
      'avanzado': 'avanzado'
    }
    
    const nextLevel = levelProgression[userLevels[0]] || 'intermedio'
    
    allCourses
      .filter(course => 
        course.difficulty === nextLevel && 
        !seenCourses.has(course.id) &&
        !recommendations.some(r => r.id === course.id)
      )
      .forEach(course => {
        recommendations.push({
          ...course,
          reason: `Siguiente nivel: ${course.difficulty}`,
          score: 80
        })
      })
    
    // 4. Cursos trending y populares
    allCourses
      .filter(course => 
        (course.trending || course.popularity > 85) && 
        !seenCourses.has(course.id) &&
        !recommendations.some(r => r.id === course.id)
      )
      .forEach(course => {
        recommendations.push({
          ...course,
          reason: 'Tendencia popular',
          score: 75
        })
      })
    
    // 5. Cursos con habilidades complementarias
    const userSkills = purchasedCourses.flatMap(courseId => {
      const course = allCourses.find(c => c.id === courseId)
      return course?.skills || []
    })
    
    allCourses
      .filter(course => 
        course.skills.some(skill => userSkills.includes(skill)) && 
        !seenCourses.has(course.id) &&
        !recommendations.some(r => r.id === course.id)
      )
      .forEach(course => {
        recommendations.push({
          ...course,
          reason: 'Habilidades complementarias',
          score: 70
        })
      })
    
    // Ordenar por score y tomar los mejores
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
  }, [purchasedCourses, completedCourses])
  
  // ========================================
  // FUNCIONES AUXILIARES
  // ========================================
  
  const getLevelColor = (level) => {
    const colors = {
      basico: 'bg-green-500/20 text-green-400 border border-green-400/30',
      intermedio: 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30',
      avanzado: 'bg-red-500/20 text-red-400 border border-red-400/30'
    }
    return colors[level] || 'bg-white/10 text-white/70 border border-white/20'
  }
  
  const getLevelText = (level) => {
    const texts = {
      basico: 'Básico',
      intermedio: 'Intermedio',
      avanzado: 'Avanzado'
    }
    return texts[level] || level
  }
  
  const getDifficultyColor = (difficulty) => {
    const colors = {
      basico: 'text-green-600',
      intermedio: 'text-yellow-600',
      avanzado: 'text-red-600'
    }
    return colors[difficulty] || 'text-gray-600'
  }
  
  const getCategoryIcon = (category) => {
    const icons = {
      ciencias: Atom,
      tecnologia: Laptop,
      educacion: GraduationCap
    }
    return icons[category] || BookOpen
  }
  
  const getCategoryColor = (category) => {
    const colors = {
      ciencias: 'from-blue-500/80 to-blue-700/80',
      tecnologia: 'from-purple-500/80 to-purple-700/80',
      educacion: 'from-green-500/80 to-green-700/80'
    }
    return colors[category] || 'from-gray-500/80 to-gray-700/80'
  }
  
  // ========================================
  // RENDERIZADO
  // ========================================
  
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in drop-shadow-lg">
          Recomendaciones para ti
        </h2>
        <p className="text-white/80 animate-fade-in animation-delay-100 drop-shadow-md">
          Basado en tu historial de aprendizaje y preferencias
        </p>
      </div>
      
      {/* Filtros */}
      <div className="flex justify-center">
        <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1 animate-scale-in animation-delay-200 border border-white/20">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedCategory('ciencias')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'ciencias'
                ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Ciencias
          </button>
          <button
            onClick={() => setSelectedCategory('tecnologia')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'tecnologia'
                ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Tecnología
          </button>
          <button
            onClick={() => setSelectedCategory('educacion')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'educacion'
                ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Educación
          </button>
        </div>
      </div>
      
      {/* Lista de recomendaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generateRecommendations
          .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
          .map((course, index) => {
            const CategoryIcon = getCategoryIcon(course.category)
            const isPurchased = purchasedCourses.includes(course.id)
            const isCompleted = completedCourses.includes(course.id)
            
            return (
              <div
                key={course.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Encabezado del curso */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(course.category)} flex items-center justify-center`}>
                    <CategoryIcon size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    {isPurchased && (
                      <div className="flex items-center gap-1 text-green-400 text-sm mb-1">
                        <CheckCircle size={16} />
                        <span>Comprado</span>
                      </div>
                    )}
                    {isCompleted && (
                      <div className="flex items-center gap-1 text-blue-400 text-sm mb-1">
                        <Award size={16} />
                        <span>Completado</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400" />
                      <span className="text-sm font-medium text-white">{course.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Información del curso */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 drop-shadow-sm">
                    {course.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-3 line-clamp-2 drop-shadow-sm">
                    {course.instructor}
                  </p>
                  
                  {/* Razón de recomendación */}
                  {course.reason && (
                    <div className="mb-3 p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Target size={14} className="text-blue-400" />
                        <span className="text-xs text-blue-300 font-medium">
                          {course.reason}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                      {getLevelText(course.level)}
                    </span>
                    <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20">
                      {course.categoryName}
                    </span>
                  </div>
                </div>
                
                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play size={14} />
                    <span>{course.sessions} sesiones</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>{course.completionRate}% completado</span>
                  </div>
                </div>
                
                {/* Precio y acción */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-purple-400">
                      ${course.price}
                    </span>
                    <span className="text-sm text-white/60 line-through">
                      ${course.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                      -{course.discount}%
                    </span>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20">
                    {isPurchased ? 'Ver Curso' : 'Ver Detalles'}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )
          })}
      </div>
      
      {/* Mensaje si no hay recomendaciones */}
      {generateRecommendations.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="text-white/60 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2 drop-shadow-sm">
            No hay recomendaciones disponibles
          </h3>
          <p className="text-white/70 drop-shadow-sm">
            Completa algunos cursos para recibir recomendaciones personalizadas
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseRecommendations
