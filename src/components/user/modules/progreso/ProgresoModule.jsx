// ========================================
// MÓDULO DE PROGRESO - Seguimiento del Progreso de Aprendizaje
// ========================================
// Este componente muestra el progreso del estudiante en sus cursos
// incluyendo estadísticas, gráficos y análisis de rendimiento

import React, { useState } from 'react'
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  Calendar,
  BookOpen,
  Star,
  Trophy,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

const ProgresoModule = () => {
  const [activeTab, setActiveTab] = useState('resumen')

  // Datos de ejemplo de progreso
  const estadisticasGenerales = [
    {
      titulo: 'Cursos Completados',
      valor: '5',
      cambio: '+2 este mes',
      icono: Trophy,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      titulo: 'Horas Estudiadas',
      valor: '127h',
      cambio: '+15h esta semana',
      icono: Clock,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      titulo: 'Racha Actual',
      valor: '12 días',
      cambio: 'Récord personal',
      icono: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      titulo: 'Certificados',
      valor: '3',
      cambio: '+1 este mes',
      icono: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ]

  const progresoPorCurso = [
    {
      id: 1,
      titulo: 'JavaScript Avanzado',
      progreso: 75,
      leccionesCompletadas: 15,
      totalLecciones: 20,
      tiempoEstudiado: '18h 30min',
      ultimaActividad: 'Hace 2 días',
      promedioCalificaciones: 4.8,
      instructor: 'Dr. María González'
    },
    {
      id: 2,
      titulo: 'React Fundamentals',
      progreso: 45,
      leccionesCompletadas: 9,
      totalLecciones: 20,
      tiempoEstudiado: '12h 15min',
      ultimaActividad: 'Hace 1 semana',
      promedioCalificaciones: 4.6,
      instructor: 'Ing. Carlos López'
    },
    {
      id: 3,
      titulo: 'Python para Data Science',
      progreso: 20,
      leccionesCompletadas: 4,
      totalLecciones: 20,
      tiempoEstudiado: '6h 45min',
      ultimaActividad: 'Hace 3 días',
      promedioCalificaciones: 4.9,
      instructor: 'Dra. Ana Martínez'
    }
  ]

  const actividadSemanal = [
    { dia: 'Lun', horas: 2.5, cursos: 2 },
    { dia: 'Mar', horas: 1.8, cursos: 1 },
    { dia: 'Mié', horas: 3.2, cursos: 3 },
    { dia: 'Jue', horas: 2.1, cursos: 2 },
    { dia: 'Vie', horas: 4.0, cursos: 2 },
    { dia: 'Sáb', horas: 2.8, cursos: 3 },
    { dia: 'Dom', horas: 1.5, cursos: 1 }
  ]

  const logrosObtenidos = [
    {
      id: 1,
      titulo: 'Primer Curso Completado',
      descripcion: 'Completaste tu primer curso en la plataforma',
      fecha: '2024-10-18',
      icono: Trophy,
      color: 'text-yellow-400',
      tipo: 'Logro Especial'
    },
    {
      id: 2,
      titulo: 'Racha de 7 Días',
      descripcion: 'Has estudiado 7 días consecutivos',
      fecha: '2024-10-17',
      icono: Target,
      color: 'text-green-400',
      tipo: 'Consistencia'
    },
    {
      id: 3,
      titulo: '100 Horas Estudiadas',
      descripcion: 'Has alcanzado las 100 horas de estudio',
      fecha: '2024-10-15',
      icono: Clock,
      color: 'text-blue-400',
      tipo: 'Dedicación'
    },
    {
      id: 4,
      titulo: 'Primera Certificación',
      descripcion: 'Obtuviste tu primera certificación',
      fecha: '2024-10-12',
      icono: Award,
      color: 'text-purple-400',
      tipo: 'Excelencia'
    }
  ]

  const tabs = [
    { id: 'resumen', label: 'Resumen', icon: BarChart3 },
    { id: 'cursos', label: 'Por Curso', icon: BookOpen },
    { id: 'actividad', label: 'Actividad', icon: Activity },
    { id: 'logros', label: 'Logros', icon: Trophy }
  ]

  const getProgresoColor = (progreso) => {
    if (progreso >= 80) return 'from-green-500 to-emerald-600'
    if (progreso >= 60) return 'from-blue-500 to-cyan-600'
    if (progreso >= 40) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Mi Progreso</h2>
        <p className="text-white/70">Sigue tu evolución y logros en el aprendizaje</p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estadisticasGenerales.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} backdrop-blur-sm rounded-xl p-6 border border-white/20`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">{stat.titulo}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.valor}</p>
                <p className="text-green-400 text-sm mt-1">{stat.cambio}</p>
              </div>
              <stat.icono className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
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
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de las tabs */}
      {activeTab === 'resumen' && (
        <div className="space-y-8">
          {/* Gráfico de progreso general */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-400" />
              Progreso General
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-2">
                      <span>Progreso Promedio</span>
                      <span>67%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-2">
                      <span>Objetivo Mensual</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Próximos Objetivos</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <span className="text-white text-sm">Completar JavaScript Avanzado</span>
                    <span className="text-blue-400 text-sm">75%</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <span className="text-white text-sm">Alcanzar 150 horas de estudio</span>
                    <span className="text-green-400 text-sm">85%</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <span className="text-white text-sm">Obtener 5 certificados</span>
                    <span className="text-purple-400 text-sm">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de tiempo */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-green-400" />
              Resumen de Tiempo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">127h</p>
                <p className="text-white/70 text-sm">Tiempo Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">18h</p>
                <p className="text-white/70 text-sm">Esta Semana</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">2.5h</p>
                <p className="text-white/70 text-sm">Promedio Diario</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cursos' && (
        <div className="space-y-6">
          {progresoPorCurso.map((curso) => (
            <div key={curso.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{curso.titulo}</h3>
                  <p className="text-white/70 mb-4">por {curso.instructor}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-white/70 text-sm">Lecciones</p>
                      <p className="text-white font-semibold">{curso.leccionesCompletadas}/{curso.totalLecciones}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Tiempo Estudiado</p>
                      <p className="text-white font-semibold">{curso.tiempoEstudiado}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Promedio</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white font-semibold">{curso.promedioCalificaciones}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white/70 mb-2">
                      <span>Progreso del curso</span>
                      <span>{curso.progreso}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${getProgresoColor(curso.progreso)} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm">Última actividad: {curso.ultimaActividad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'actividad' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-purple-400" />
            Actividad Semanal
          </h3>
          <div className="space-y-4">
            {actividadSemanal.map((dia, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-white font-medium w-12">{dia.dia}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span>{dia.horas}h estudiadas</span>
                      <span>{dia.cursos} cursos</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                        style={{ width: `${(dia.horas / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logros' && (
        <div className="bg-white/10 backdrop-blقدم-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
            Logros Obtenidos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {logrosObtenidos.map((logro) => (
              <div key={logro.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <logro.icono className={`w-6 h-6 mt-1 ${logro.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{logro.titulo}</h4>
                      <span className="text-xs text-white/60">{logro.fecha}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">{logro.descripcion}</p>
                    <span className="inline-block px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
                      {logro.tipo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgresoModule
