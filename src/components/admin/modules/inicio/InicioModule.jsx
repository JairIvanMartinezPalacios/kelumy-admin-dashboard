// ========================================
// MÓDULO DE INICIO - Dashboard Principal
// ========================================
// Este componente muestra la vista general del dashboard de administración
// con métricas clave, gráficos y resumen de la plataforma

import React from 'react'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Award, 
  ShoppingCart,
  Activity,
  BarChart3
} from 'lucide-react'
import AnalyticsDashboard from '../../../charts/AnalyticsDashboard'

const InicioModule = () => {
  // ========================================
  // DATOS DE MÉTRICAS - Información de ejemplo
  // ========================================
  
  const metrics = [
    { title: 'Usuarios Activos', value: '2,847', change: '+12%', icon: Users, color: 'primary-600' },
    { title: 'Cursos Publicados', value: '156', change: '+8%', icon: BookOpen, color: 'primary-500' },
    { title: 'Ingresos Mensuales', value: '$45,230', change: '+23%', icon: DollarSign, color: 'primary-700' },
    { title: 'Tasa de Conversión', value: '3.2%', change: '+0.4%', icon: TrendingUp, color: 'secondary-500' },
    { title: 'Certificados Emitidos', value: '1,234', change: '+15%', icon: Award, color: 'primary-400' },
    { title: 'Ventas del Mes', value: '89', change: '+7%', icon: ShoppingCart, color: 'primary-800' }
  ]

  // ========================================
  // FUNCIÓN AUXILIAR - Mapeo de colores
  // ========================================
  
  const getColorClasses = (color) => {
    const colors = {
      'primary-400': 'bg-primary-400 text-white',
      'primary-500': 'bg-primary-500 text-white',
      'primary-600': 'bg-primary-600 text-white',
      'primary-700': 'bg-primary-700 text-white',
      'primary-800': 'bg-primary-800 text-white',
      'secondary-500': 'bg-secondary-500 text-white',
      'secondary-600': 'bg-secondary-600 text-white'
    }
    return colors[color] || 'bg-primary-500 text-white'
  }

  // ========================================
  // RENDERIZADO
  // ========================================

  return (
    <div className="w-full">
      {/* Título principal */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Panel de Control</h2>
        <p className="text-white/70">Vista general de la plataforma Kelumy</p>
      </div>
      
      {/* Cuadrícula de métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-xl shadow-md flex items-center justify-between ${getColorClasses(metric.color)}`}
          >
            <div>
              <p className="text-sm font-medium opacity-80">{metric.title}</p>
              <p className="text-3xl font-bold mt-1">{metric.value}</p>
              <p className="text-sm opacity-90">{metric.change}</p>
            </div>
            <metric.icon className="w-10 h-10 opacity-70" />
          </div>
        ))}
      </div>
      
      {/* Sección de gráficos y analíticas */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-6 h-6 text-white mr-3" />
          <h3 className="text-xl font-semibold text-white">Analíticas Clave</h3>
        </div>
        <AnalyticsDashboard />
      </div>

      {/* Actividad reciente */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-6">
          <Activity className="w-6 h-6 text-white mr-3" />
          <h3 className="text-xl font-semibold text-white">Actividad Reciente</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium">Nuevo usuario registrado</p>
                <p className="text-white/70 text-sm">Juan Pérez se registró hace 2 horas</p>
              </div>
            </div>
            <span className="text-white/60 text-sm">Hace 2h</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Nuevo curso publicado</p>
                <p className="text-white/70 text-sm">"JavaScript Avanzado" por Dr. María González</p>
              </div>
            </div>
            <span className="text-white/60 text-sm">Hace 4h</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Certificado emitido</p>
                <p className="text-white/70 text-sm">Ana Martínez completó "React Fundamentals"</p>
              </div>
            </div>
            <span className="text-white/60 text-sm">Hace 1 día</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InicioModule
