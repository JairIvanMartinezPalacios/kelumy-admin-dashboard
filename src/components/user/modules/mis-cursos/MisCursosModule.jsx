// ========================================
// MÓDULO DE MIS CURSOS - Gestión de Cursos del Estudiante
// ========================================
// Este componente maneja la visualización y gestión de cursos del estudiante
// incluyendo cursos inscritos, disponibles y completados

import React, { useState } from 'react'
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Award, 
  Search,
  Filter,
  Eye,
  Download,
  Calendar,
  Users,
  Trophy
} from 'lucide-react'

const MisCursosModule = () => {
  const [activeTab, setActiveTab] = useState('inscritos')
  const [filtroCategoria, setFiltroCategoria] = useState('todos')

  // Datos de ejemplo de cursos
  const cursosInscritos = [
    {
      id: 1,
      titulo: 'JavaScript Avanzado',
      descripcion: 'Domina JavaScript moderno con ES6+, async/await, y patrones avanzados',
      instructor: 'Dr. María González',
      progreso: 75,
      duracion: '40 horas',
      nivel: 'Avanzado',
      categoria: 'Programación',
      imagen: '/img/curso-js.jpg',
      rating: 4.8,
      estudiantes: 1247,
      ultimaActividad: 'Hace 2 días',
      siguienteLeccion: 'Closures y Scope',
      tiempoEstimado: '2h 30min'
    },
    {
      id: 2,
      titulo: 'React Fundamentals',
      descripcion: 'Aprende React desde cero con proyectos prácticos',
      instructor: 'Ing. Carlos López',
      progreso: 45,
      duracion: '25 horas',
      nivel: 'Intermedio',
      categoria: 'Programación',
      imagen: '/img/curso-react.jpg',
      rating: 4.6,
      estudiantes: 892,
      ultimaActividad: 'Hace 1 semana',
      siguienteLeccion: 'Componentes Funcionales',
      tiempoEstimado: '1h 45min'
    },
    {
      id: 3,
      titulo: 'Python para Data Science',
      descripcion: 'Análisis de datos con Python, Pandas y NumPy',
      instructor: 'Dra. Ana Martínez',
      progreso: 20,
      duracion: '35 horas',
      nivel: 'Intermedio',
      categoria: 'Data Science',
      imagen: '/img/curso-python.jpg',
      rating: 4.9,
      estudiantes: 654,
      ultimaActividad: 'Hace 3 días',
      siguienteLeccion: 'Introducción a Pandas',
      tiempoEstimado: '3h 15min'
    }
  ]

  const cursosCompletados = [
    {
      id: 4,
      titulo: 'HTML y CSS Básico',
      descripcion: 'Fundamentos de desarrollo web frontend',
      instructor: 'Prof. Luis Rodríguez',
      progreso: 100,
      duracion: '15 horas',
      nivel: 'Principiante',
      categoria: 'Web Development',
      imagen: '/img/curso-html.jpg',
      rating: 4.7,
      fechaCompletado: '2024-10-15',
      certificado: true,
      tiempoEstudiado: '18 horas'
    },
    {
      id: 5,
      titulo: 'Git y GitHub',
      descripcion: 'Control de versiones para desarrolladores',
      instructor: 'Ing. Sofía Pérez',
      progreso: 100,
      duracion: '12 horas',
      nivel: 'Principiante',
      categoria: 'Herramientas',
      imagen: '/img/curso-git.jpg',
      rating: 4.8,
      fechaCompletado: '2024-09-28',
      certificado: true,
      tiempoEstudiado: '14 horas'
    }
  ]

  const cursosDisponibles = [
    {
      id: 6,
      titulo: 'Node.js Backend Development',
      descripcion: 'Desarrollo de APIs y servidores con Node.js',
      instructor: 'Dr. Miguel Torres',
      duracion: '30 horas',
      nivel: 'Intermedio',
      categoria: 'Backend',
      imagen: '/img/curso-node.jpg',
      rating: 4.9,
      estudiantes: 1234,
      precio: '$299 MXN',
      descuento: '20%',
      precioOriginal: '$374 MXN'
    },
    {
      id: 7,
      titulo: 'Machine Learning con Python',
      descripcion: 'Introducción al machine learning y algoritmos',
      instructor: 'Dra. Elena Vargas',
      duracion: '45 horas',
      nivel: 'Avanzado',
      categoria: 'Data Science',
      imagen: '/img/curso-ml.jpg',
      rating: 4.7,
      estudiantes: 567,
      precio: '$399 MXN',
      descuento: '15%',
      precioOriginal: '$469 MXN'
    }
  ]

  const tabs = [
    { id: 'inscritos', label: 'Mis Cursos', icon: BookOpen, count: cursosInscritos.length },
    { id: 'completados', label: 'Completados', icon: Award, count: cursosCompletados.length },
    { id: 'disponibles', label: 'Explorar', icon: Star, count: cursosDisponibles.length }
  ]

  const categorias = ['todos', 'Programación', 'Web Development', 'Data Science', 'Backend', 'Herramientas']

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'Principiante': return 'bg-green-500/20 text-green-300'
      case 'Intermedio': return 'bg-yellow-500/20 text-yellow-300'
      case 'Avanzado': return 'bg-red-500/20 text-red-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const renderCursosInscritos = () => (
    <div className="space-y-6">
      {cursosInscritos.map((curso) => (
        <div key={curso.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Imagen del curso */}
            <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            
            {/* Información del curso */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{curso.titulo}</h3>
                  <p className="text-white/70 mb-2">{curso.descripcion}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>por {curso.instructor}</span>
                    <span>•</span>
                    <span>{curso.duracion}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getNivelColor(curso.nivel)}`}>
                      {curso.nivel}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{curso.rating}</span>
                  <span className="text-white/60 text-sm">({curso.estudiantes})</span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Progreso del curso</span>
                  <span>{curso.progreso}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${curso.progreso}%` }}
                  ></div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-6 text-sm text-white/70 mb-4 md:mb-0">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Última actividad: {curso.ultimaActividad}</span>
                  </div>
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-1" />
                    <span>Siguiente: {curso.siguienteLeccion}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Continuar
                  </button>
                  <button className="p-2 text-white/70 hover:text-white transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderCursosCompletados = () => (
    <div className="space-y-6">
      {cursosCompletados.map((curso) => (
        <div key={curso.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center relative">
              <Trophy className="w-12 h-12 text-white" />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                100%
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{curso.titulo}</h3>
                  <p className="text-white/70 mb-2">{curso.descripcion}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>por {curso.instructor}</span>
                    <span>•</span>
                    <span>Completado el {curso.fechaCompletado}</span>
                    <span>•</span>
                    <span>Tiempo estudiado: {curso.tiempoEstudiado}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{curso.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {curso.certificado && (
                    <div className="flex items-center text-green-400">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="text-sm">Certificado disponible</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Ver Certificado
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Repasar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderCursosDisponibles = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cursosDisponibles.map((curso) => (
        <div key={curso.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 relative">
            <BookOpen className="w-16 h-16 text-white" />
            {curso.descuento && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                -{curso.descuento}
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2">{curso.titulo}</h3>
          <p className="text-white/70 text-sm mb-3">{curso.descripcion}</p>
          
          <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
            <span>por {curso.instructor}</span>
            <span>•</span>
            <span>{curso.duracion}</span>
            <span>•</span>
            <span className={`px-2 py-1 rounded-full text-xs ${getNivelColor(curso.nivel)}`}>
              {curso.nivel}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm">{curso.rating}</span>
              <span className="text-white/60 text-sm">({curso.estudiantes} estudiantes)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">{curso.precio}</span>
              {curso.precioOriginal && (
                <span className="text-white/60 line-through text-sm">{curso.precioOriginal}</span>
              )}
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Inscribirse
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Mis Cursos</h2>
        <p className="text-white/70">Gestiona tus cursos y explora nuevas oportunidades de aprendizaje</p>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-8 border border-white/20">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtros (solo para cursos disponibles) */}
      {activeTab === 'disponibles' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white/60" />
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria === 'todos' ? 'Todas las categorías' : categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Contenido de las tabs */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        {activeTab === 'inscritos' && renderCursosInscritos()}
        {activeTab === 'completados' && renderCursosCompletados()}
        {activeTab === 'disponibles' && renderCursosDisponibles()}
      </div>
    </div>
  )
}

export default MisCursosModule
