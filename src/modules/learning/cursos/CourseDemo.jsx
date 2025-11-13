// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Play,           // Icono de play para iniciar demostración
  ArrowRight,     // Icono de flecha derecha para navegación
  CheckCircle,    // Icono de check para características completadas
  Star,           // Icono de estrella para calificaciones
  Users,          // Icono de usuarios para estudiantes
  Clock,          // Icono de reloj para duración
  Award,          // Icono de premio para certificados
  BookOpen,       // Icono de libro para cursos
  Target,         // Icono de objetivo para metas
  Settings        // Icono de configuración para ajustes
} from 'lucide-react'

// Importa el componente CourseCategories para la demostración
import CourseCategories from './CourseCategories'

// ========================================
// COMPONENTE PRINCIPAL - CourseDemo
// ========================================

// Define el componente funcional CourseDemo que proporciona una demostración interactiva
// del sistema de gestión de cursos por categorías con funcionalidades avanzadas
const CourseDemo = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar si se muestra la demostración completa o la página de introducción
  // false: página de introducción, true: demostración completa del sistema
  const [showDemo, setShowDemo] = useState(false)
  
  if (showDemo) {
    return <CourseCategories />
  }
  
  return (
    <div className="p-6">
      {/* Encabezado de demostración */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Gestión de Cursos por Categorías
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explora la nueva funcionalidad de cursos organizados por categorías con niveles y valoraciones
        </p>
        <button
          onClick={() => setShowDemo(true)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
        >
          <Play size={24} />
          Iniciar Demostración
        </button>
      </div>
      
      {/* Características principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target size={32} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Categorías Organizadas</h3>
          <p className="text-gray-600">
            Cursos organizados en Ciencias, Tecnología y Educación para fácil navegación
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Niveles de Dificultad</h3>
          <p className="text-gray-600">
            Básico, Intermedio y Avanzado con contenido específico para cada nivel
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={32} className="text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Sistema de Valoraciones</h3>
          <p className="text-gray-600">
            Reseñas con estrellas y comentarios de estudiantes que completaron el curso
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={32} className="text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Contenido Detallado</h3>
          <p className="text-gray-600">
            Información completa: duración, sesiones, lecturas, actividades y proyectos
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Gestión de Contenido</h3>
          <p className="text-gray-600">
            Módulo completo para editar y actualizar cada sección del curso
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Ordenamiento Inteligente</h3>
          <p className="text-gray-600">
            Cursos ordenados por demanda, calificación, precio o fecha de creación
          </p>
        </div>
      </div>
      
      {/* Flujo de demostración */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Flujo de la Demostración
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Selecciona Categoría</h3>
            <p className="text-sm text-gray-600">
              Elige entre Ciencias, Tecnología o Educación
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Explora Cursos</h3>
            <p className="text-sm text-gray-600">
              Ve la lista de cursos con filtros y ordenamiento
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Detalles del Curso</h3>
            <p className="text-sm text-gray-600">
              Información completa y niveles de dificultad
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              4
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gestiona Contenido</h3>
            <p className="text-sm text-gray-600">
              Edita y actualiza cada sección del curso
            </p>
          </div>
        </div>
      </div>
      
      {/* Ejemplos de cursos */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Ejemplos de Cursos Disponibles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Curso de Ciencias */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mb-4 flex items-center justify-center">
              <BookOpen size={48} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Física Cuántica Avanzada</h3>
            <p className="text-gray-600 text-sm mb-4">
              Explora los principios fundamentales de la mecánica cuántica
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                4.9 (89)
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                1,247
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                60h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-600">$599</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                Ciencias
              </span>
            </div>
          </div>
          
          {/* Curso de Tecnología */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg mb-4 flex items-center justify-center">
              <BookOpen size={48} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inteligencia Artificial y ML</h3>
            <p className="text-gray-600 text-sm mb-4">
              Domina las técnicas de IA y ML para crear sistemas inteligentes
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                4.8 (156)
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                2,156
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                45h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-600">$499</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                Tecnología
              </span>
            </div>
          </div>
          
          {/* Curso de Educación */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-green-500 to-green-700 rounded-lg mb-4 flex items-center justify-center">
              <BookOpen size={48} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Metodologías Pedagógicas</h3>
            <p className="text-gray-600 text-sm mb-4">
              Aprende las mejores prácticas educativas del siglo XXI
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                4.7 (67)
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                892
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                30h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-600">$299</span>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                Educación
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botón para iniciar demostración */}
      <div className="text-center mt-12">
        <button
          onClick={() => setShowDemo(true)}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
        >
          <Play size={24} />
          Iniciar Demostración Completa
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default CourseDemo
