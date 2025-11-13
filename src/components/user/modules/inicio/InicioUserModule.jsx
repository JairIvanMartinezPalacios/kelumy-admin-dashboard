// ========================================
// MÓDULO DE INICIO USUARIO - Dashboard Principal del Estudiante
// ========================================
// Este componente muestra la vista principal del dashboard del estudiante
// con cursos activos, progreso, notificaciones y recomendaciones

import React from 'react'
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  Star,
  Play,
  Calendar,
  Users,
  Target,
  Trophy,
  Clock3
} from 'lucide-react'

const InicioUserModule = () => {
  // ========================================
  // DATOS DE EJEMPLO
  // ========================================
  
  const cursosActivos = [
    {
      id: 1,
      titulo: 'JavaScript Avanzado',
      progreso: 75,
      leccionActual: 'Closures y Scope',
      tiempoEstimado: '2h 30min',
      siguienteLeccion: 'Async/Await',
      instructor: 'Dr. María González',
      imagen: '/img/curso-js.jpg'
    },
    {
      id: 2,
      titulo: 'React Fundamentals',
      progreso: 45,
      leccionActual: 'Componentes Funcionales',
      tiempoEstimado: '1h 45min',
      siguienteLeccion: 'Props y State',
      instructor: 'Ing. Carlos López',
      imagen: '/img/curso-react.jpg'
    },
    {
      id: 3,
      titulo: 'Python para Data Science',
      progreso: 20,
      leccionActual: 'Introducción a Pandas',
      tiempoEstimado: '3h 15min',
      siguienteLeccion: 'Análisis de Datos',
      instructor: 'Dra. Ana Martínez',
      imagen: '/img/curso-python.jpg'
    }
  ]

  const logrosRecientes = [
    {
      id: 1,
      titulo: 'Primer Curso Completado',
      descripcion: 'Completaste tu primer curso en la plataforma',
      fecha: '2024-10-18',
      icono: Trophy,
      color: 'text-yellow-400'
    },
    {
      id: 2,
      titulo: 'Racha de 7 Días',
      descripcion: 'Has estudiado 7 días consecutivos',
      fecha: '2024-10-17',
      icono: Target,
      color: 'text-green-400'
    },
    {
      id: 3,
      titulo: 'Primera Certificación',
      descripcion: 'Obtuviste tu primera certificación',
      fecha: '2024-10-15',
      icono: Award,
      color: 'text-purple-400'
    }
  ]

  const proximosEventos = [
    {
      id: 1,
      titulo: 'Webinar: Introducción a Machine Learning',
      fecha: '2024-10-25',
      hora: '18:00',
      tipo: 'Webinar'
    },
    {
      id: 2,
      titulo: 'Sesión de Q&A con Instructores',
      fecha: '2024-10-28',
      hora: '16:00',
      tipo: 'Q&A'
    },
    {
      id: 3,
      titulo: 'Taller: Proyectos Prácticos',
      fecha: '2024-11-02',
      hora: '10:00',
      tipo: 'Taller'
    }
  ]

  const estadisticas = [
    { label: 'Cursos Completados', valor: '3', icon: Award, color: 'text-yellow-400' },
    { label: 'Horas Estudiadas', valor: '127h', icon: Clock, color: 'text-blue-400' },
    { label: 'Certificados', valor: '2', icon: Star, color: 'text-purple-400' },
    { label: 'Racha Actual', valor: '12 días', icon: Target, color: 'text-green-400' }
  ]

  return (
    <div className="w-full">
      {/* Header de bienvenida */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido de vuelta!</h2>
        <p className="text-white/70">Continúa tu aprendizaje desde donde lo dejaste</p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {estadisticas.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.valor}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cursos Activos */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-400" />
                Cursos Activos
              </h3>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Ver todos
              </button>
            </div>
            
            <div className="space-y-4">
              {cursosActivos.map((curso) => (
                <div key={curso.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">{curso.titulo}</h4>
                      <p className="text-white/70 text-sm mb-2">por {curso.instructor}</p>
                      <p className="text-white/80 text-sm mb-3">Lección actual: {curso.leccionActual}</p>
                      
                      {/* Barra de progreso */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-white/70 mb-1">
                          <span>Progreso</span>
                          <span>{curso.progreso}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${curso.progreso}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <div className="flex items-center">
                            <Clock3 className="w-4 h-4 mr-1" />
                            <span>{curso.tiempoEstimado}</span>
                          </div>
                          <div className="flex items-center">
                            <Play className="w-4 h-4 mr-1" />
                            <span>Siguiente: {curso.siguienteLeccion}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Continuar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Derecho */}
        <div className="space-y-6">
          {/* Logros Recientes */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
              Logros Recientes
            </h3>
            <div className="space-y-3">
              {logrosRecientes.map((logro) => (
                <div key={logro.id} className="flex items-start space-x-3">
                  <logro.icono className={`w-5 h-5 mt-1 ${logro.color}`} />
                  <div>
                    <p className="text-white font-medium text-sm">{logro.titulo}</p>
                    <p className="text-white/70 text-xs">{logro.descripcion}</p>
                    <p className="text-white/50 text-xs">{logro.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximos Eventos */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-green-400" />
              Próximos Eventos
            </h3>
            <div className="space-y-3">
              {proximosEventos.map((evento) => (
                <div key={evento.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-white font-medium text-sm">{evento.titulo}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/70 text-xs">{evento.fecha} - {evento.hora}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      evento.tipo === 'Webinar' ? 'bg-blue-500/20 text-blue-300' :
                      evento.tipo === 'Q&A' ? 'bg-green-500/20 text-green-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {evento.tipo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Star className="w-6 h-6 mr-3 text-purple-400" />
              Recomendado para Ti
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-white font-medium text-sm">Node.js Backend</p>
                <p className="text-white/70 text-xs mb-2">Complementa tu conocimiento de JavaScript</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Nivel: Intermedio</span>
                  <button className="text-purple-400 hover:text-purple-300 text-xs">Ver curso</button>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-white font-medium text-sm">Git y GitHub</p>
                <p className="text-white/70 text-xs mb-2">Control de versiones para desarrolladores</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Nivel: Principiante</span>
                  <button className="text-purple-400 hover:text-purple-300 text-xs">Ver curso</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InicioUserModule
