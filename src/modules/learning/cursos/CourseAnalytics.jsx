// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  BarChart3,     // Icono de gráfico de barras para visualización de datos
  TrendingUp,    // Icono de tendencia ascendente para crecimiento
  Users,         // Icono de usuarios para estudiantes
  DollarSign,    // Icono de dólar para ingresos y finanzas
  Eye,           // Icono de ojo para visualizaciones
  Clock,         // Icono de reloj para tiempo y duración
  Star,          // Icono de estrella para calificaciones
  Award,         // Icono de premio para certificados
  Download,      // Icono de descarga para exportar datos
  Calendar,      // Icono de calendario para fechas
  Filter,        // Icono de filtro para filtrar datos
  RefreshCw,     // Icono de actualizar para refrescar datos
  Target,        // Icono de objetivo para metas
  Activity,      // Icono de actividad para métricas dinámicas
  BookOpen,      // Icono de libro para cursos
  CheckCircle,   // Icono de check para completado
  AlertCircle,   // Icono de alerta para advertencias
  Play,          // Icono de play para reproducción
  Pause,         // Icono de pausa para detener
  SkipForward,   // Icono de avanzar para saltar
  RotateCcw,     // Icono de rotar para reiniciar
  ShoppingCart   // Icono de carrito para ventas
} from 'lucide-react'

// ========================================
// COMPONENTE - CourseAnalytics
// ========================================

// Define el componente funcional CourseAnalytics que proporciona análisis detallados de cursos
// Recibe props: courseId (identificador del curso para cargar sus métricas y estadísticas)
const CourseAnalytics = ({ courseId }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar el período de análisis seleccionado
  // '7d': 7 días, '30d': 30 días, '90d': 90 días, '1y': 1 año
  const [timeRange, setTimeRange] = useState('30d')
  
  // Estado que contiene todos los datos de analíticas del curso
  // Incluye métricas de overview, inscripciones, engagement, ingresos y retroalimentación
  const [analyticsData] = useState({
    overview: {
      totalStudents: 1250,
      activeStudents: 890,
      completionRate: 78.5,
      averageRating: 4.8,
      totalRevenue: 45000,
      monthlyRevenue: 8500
    },
    enrollment: {
      daily: [
        { date: '2024-01-01', count: 12 },
        { date: '2024-01-02', count: 18 },
        { date: '2024-01-03', count: 15 },
        { date: '2024-01-04', count: 22 },
        { date: '2024-01-05', count: 28 },
        { date: '2024-01-06', count: 35 },
        { date: '2024-01-07', count: 42 }
      ]
    },
    engagement: {
      averageTimeSpent: '2h 45m',
      completionRate: 78.5,
      dropOffPoints: [
        { lesson: 'Lección 3', dropOffRate: 15.2 },
        { lesson: 'Lección 7', dropOffRate: 22.8 },
        { lesson: 'Lección 12', dropOffRate: 18.5 }
      ],
      mostWatchedLessons: [
        { title: 'Introducción a React', views: 1200, completion: 95 },
        { title: 'Componentes Funcionales', views: 1100, completion: 88 },
        { title: 'Hooks en React', views: 1050, completion: 82 }
      ]
    },
    revenue: {
      bySource: [
        { source: 'Directo', amount: 25000, percentage: 55.6 },
        { source: 'Google Ads', amount: 12000, percentage: 26.7 },
        { source: 'Redes Sociales', amount: 5000, percentage: 11.1 },
        { source: 'Referidos', amount: 3000, percentage: 6.7 }
      ]
    },
    students: {
      demographics: {
        ageGroups: [
          { range: '18-25', count: 320, percentage: 25.6 },
          { range: '26-35', count: 450, percentage: 36.0 },
          { range: '36-45', count: 280, percentage: 22.4 },
          { range: '46+', count: 200, percentage: 16.0 }
        ],
        countries: [
          { country: 'México', count: 450, percentage: 36.0 },
          { country: 'España', count: 280, percentage: 22.4 },
          { country: 'Argentina', count: 200, percentage: 16.0 },
          { country: 'Colombia', count: 150, percentage: 12.0 },
          { country: 'Otros', count: 170, percentage: 13.6 }
        ]
      },
      progress: [
        { name: 'Juan Pérez', progress: 100, lastAccess: '2024-01-15' },
        { name: 'María García', progress: 85, lastAccess: '2024-01-14' },
        { name: 'Carlos López', progress: 72, lastAccess: '2024-01-13' },
        { name: 'Ana Martínez', progress: 60, lastAccess: '2024-01-12' },
        { name: 'Luis Rodríguez', progress: 45, lastAccess: '2024-01-11' }
      ]
    }
  })
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para formatear números
  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-ES').format(num)
  }
  
  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  // Función para obtener el color según el valor
  const getValueColor = (value, type = 'positive') => {
    if (type === 'positive') {
      return value >= 0 ? 'text-green-400' : 'text-red-400'
    }
    return 'text-white/70'
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para tarjetas de métricas
  const MetricCard = ({ title, value, change, icon: Icon, color = 'primary' }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-2xl font-semibold text-white mt-1 drop-shadow-sm">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${getValueColor(change)}`}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20 border border-${color}-400/30`}>
          <Icon size={24} className={`text-${color}-600`} />
        </div>
      </div>
    </div>
  )
  
  // Componente para gráficos simples (placeholder)
  const SimpleChart = ({ data, type = 'bar' }) => (
    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <BarChart3 size={32} className="text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">
          {type === 'bar' ? 'Gráfico de Barras' : 'Gráfico de Líneas'}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {data.length} puntos de datos
        </p>
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
        {/* Encabezado con controles */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white drop-shadow-lg">Analíticas del Curso</h2>
            <p className="text-white/80 drop-shadow-md">Métricas de rendimiento y engagement de estudiantes</p>
          </div>
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
            >
              <option value="7d" className="bg-gray-800">Últimos 7 días</option>
              <option value="30d" className="bg-gray-800">Últimos 30 días</option>
              <option value="90d" className="bg-gray-800">Últimos 90 días</option>
              <option value="1y" className="bg-gray-800">Último año</option>
            </select>
            <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center gap-2">
              <RefreshCw size={16} />
            Actualizar
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>
      
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Estudiantes"
          value={formatNumber(analyticsData.overview.totalStudents)}
          change={12.5}
          icon={Users}
          color="primary"
        />
        <MetricCard
          title="Estudiantes Activos"
          value={formatNumber(analyticsData.overview.activeStudents)}
          change={8.3}
          icon={Activity}
          color="green"
        />
        <MetricCard
          title="Tasa de Finalización"
          value={`${analyticsData.overview.completionRate}%`}
          change={5.2}
          icon={Award}
          color="blue"
        />
        <MetricCard
          title="Ingresos Totales"
          value={formatCurrency(analyticsData.overview.totalRevenue)}
          change={23.1}
          icon={DollarSign}
          color="purple"
        />
      </div>
      
      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inscripciones */}
        <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
            <TrendingUp size={20} />
            Inscripciones por Período
          </h3>
          <SimpleChart data={analyticsData.enrollment.daily} type="line" />
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <p className="text-white/70">Esta semana</p>
              <p className="text-xl font-semibold text-purple-400">+{analyticsData.enrollment.daily.reduce((sum, day) => sum + day.count, 0)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70">Promedio diario</p>
              <p className="text-xl font-semibold text-white drop-shadow-sm">
                {Math.round(analyticsData.enrollment.daily.reduce((sum, day) => sum + day.count, 0) / analyticsData.enrollment.daily.length)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Ingresos */}
        <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
            <DollarSign size={20} />
            Ingresos por Fuente
          </h3>
          <div className="space-y-3">
            {analyticsData.revenue.bySource.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-white/80">{source.source}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white w-16 text-right drop-shadow-sm">
                    {formatCurrency(source.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Engagement y Progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Puntos de Abandono */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            Puntos de Abandono
          </h3>
          <div className="space-y-3">
            {analyticsData.engagement.dropOffPoints.map((point, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{point.lesson}</span>
                <span className="text-sm font-semibold text-red-600">{point.dropOffRate}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Lecciones Más Vistas */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye size={20} />
            Lecciones Más Vistas
          </h3>
          <div className="space-y-3">
            {analyticsData.engagement.mostWatchedLessons.map((lesson, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                  <p className="text-xs text-gray-600">{lesson.views} vistas</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{lesson.completion}%</p>
                  <p className="text-xs text-gray-600">completado</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Demografía de Estudiantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grupos de Edad */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={20} />
            Grupos de Edad
          </h3>
          <div className="space-y-3">
            {analyticsData.students.demographics.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{group.range} años</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {group.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Países */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={20} />
            Distribución por País
          </h3>
          <div className="space-y-3">
            {analyticsData.students.demographics.countries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{country.country}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {country.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Progreso de Estudiantes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          Progreso de Estudiantes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Estudiante</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Progreso</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Último Acceso</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.students.progress.map((student, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(student.lastAccess).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                        <Play size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CourseAnalytics
