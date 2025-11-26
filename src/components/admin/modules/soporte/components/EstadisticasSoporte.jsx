import React, { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  MessageSquare,
  CheckCircle,
  XCircle,
  Users,
  Star,
  Download,
  Calendar,
  Filter,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Award,
  Zap
} from 'lucide-react'

const EstadisticasSoporte = () => {
  const [dateRange, setDateRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  const stats = {
    totalTickets: 1245,
    ticketsChange: 12.5,
    avgResponseTime: '18 min',
    responseTimeChange: -8.3,
    avgResolutionTime: '2.5 horas',
    resolutionTimeChange: -15.2,
    satisfaction: 4.7,
    satisfactionChange: 5.1,
    firstContactResolution: 78,
    fcrChange: 3.2
  }

  const ticketsByStatus = [
    { status: 'Abiertos', count: 45, color: 'bg-red-500' },
    { status: 'En Progreso', count: 32, color: 'bg-yellow-500' },
    { status: 'Resueltos', count: 156, color: 'bg-green-500' },
    { status: 'Cerrados', count: 1012, color: 'bg-gray-500' }
  ]

  const ticketsByPriority = [
    { priority: 'Urgente', count: 12, color: 'bg-red-500' },
    { priority: 'Alta', count: 28, color: 'bg-orange-500' },
    { priority: 'Media', count: 35, color: 'bg-yellow-500' },
    { priority: 'Baja', count: 50, color: 'bg-blue-500' }
  ]

  const agentPerformance = [
    { name: 'Ana López', tickets: 245, resolved: 198, satisfaction: 4.8, avgTime: '15 min' },
    { name: 'Pedro Martínez', tickets: 189, resolved: 156, satisfaction: 4.6, avgTime: '20 min' },
    { name: 'Sofía Ramírez', tickets: 156, resolved: 134, satisfaction: 4.7, avgTime: '25 min' },
    { name: 'Miguel Hernández', tickets: 78, resolved: 65, satisfaction: 4.5, avgTime: '30 min' }
  ]

  const ticketsByCategory = [
    { category: 'Acceso', count: 234, percentage: 18.8 },
    { category: 'Pago', count: 189, percentage: 15.2 },
    { category: 'Certificados', count: 156, percentage: 12.5 },
    { category: 'Contenido', count: 145, percentage: 11.6 },
    { category: 'Técnico', count: 123, percentage: 9.9 },
    { category: 'General', count: 398, percentage: 32.0 }
  ]

  const handleExportReport = (format) => {
    alert(`Exportando reporte en formato ${format}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Estadísticas de Soporte</h2>
          <p className="text-white/70">Métricas y análisis de rendimiento</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="1y">Último año</option>
          </select>
          <button
            onClick={() => handleExportReport('PDF')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.ticketsChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.ticketsChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.ticketsChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.totalTickets.toLocaleString()}</p>
          <p className="text-white/70 text-sm">Total Tickets</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-6 h-6 text-yellow-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.responseTimeChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {stats.responseTimeChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.responseTimeChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.avgResponseTime}</p>
          <p className="text-white/70 text-sm">Tiempo de Respuesta</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.resolutionTimeChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {stats.resolutionTimeChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.resolutionTimeChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.avgResolutionTime}</p>
          <p className="text-white/70 text-sm">Tiempo de Resolución</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <Star className="w-6 h-6 text-purple-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.satisfactionChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.satisfactionChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.satisfactionChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.satisfaction}/5</p>
          <p className="text-white/70 text-sm">Satisfacción</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tickets por Estado */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Tickets por Estado
          </h3>
          <div className="space-y-4">
            {ticketsByStatus.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/90 text-sm">{item.status}</span>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all`}
                    style={{ width: `${(item.count / ticketsByStatus.reduce((sum, i) => sum + i.count, 0)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets por Prioridad */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Tickets por Prioridad
          </h3>
          <div className="space-y-4">
            {ticketsByPriority.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/90 text-sm">{item.priority}</span>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all`}
                    style={{ width: `${(item.count / ticketsByPriority.reduce((sum, i) => sum + i.count, 0)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rendimiento de Agentes */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          Rendimiento de Agentes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/70 text-sm font-semibold">Agente</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Tickets</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Resueltos</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Tasa</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Satisfacción</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Tiempo Promedio</th>
              </tr>
            </thead>
            <tbody>
              {agentPerformance.map((agent, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{agent.name}</td>
                  <td className="py-3 px-4 text-center text-white/90">{agent.tickets}</td>
                  <td className="py-3 px-4 text-center text-green-400 font-semibold">{agent.resolved}</td>
                  <td className="py-3 px-4 text-center text-white/90">
                    {((agent.resolved / agent.tickets) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/90">{agent.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-white/90">{agent.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tickets por Categoría */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Tickets por Categoría
        </h3>
        <div className="space-y-3">
          {ticketsByCategory.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/90 text-sm">{item.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-xs">{item.percentage}%</span>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Resolución en Primer Contacto
            </h3>
            <span className={`flex items-center gap-1 text-xs ${stats.fcrChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.fcrChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.fcrChange)}%
            </span>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-white mb-2">{stats.firstContactResolution}%</p>
            <p className="text-white/70 text-sm">Tickets resueltos en el primer contacto</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Tendencias
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-sm">Tickets esta semana</span>
              <span className="text-green-400 font-semibold">+12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-sm">Tiempo de respuesta</span>
              <span className="text-green-400 font-semibold">-8.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-sm">Satisfacción del cliente</span>
              <span className="text-green-400 font-semibold">+5.1%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-sm">Tasa de resolución</span>
              <span className="text-green-400 font-semibold">+3.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstadisticasSoporte

