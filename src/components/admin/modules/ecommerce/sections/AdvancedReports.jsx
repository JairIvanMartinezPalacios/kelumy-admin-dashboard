// ========================================
// REPORTES AVANZADOS - Reportes Personalizados
// ========================================

import React, { useState, useEffect } from 'react'
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Plus,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Settings,
  Eye
} from 'lucide-react'

const AdvancedReports = () => {
  const [selectedReport, setSelectedReport] = useState(null)
  const [reportType, setReportType] = useState('sales')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const reportTemplates = [
    {
      id: 1,
      name: 'Reporte de Ventas Mensual',
      type: 'sales',
      description: 'Análisis completo de ventas del mes',
      icon: DollarSign,
      lastGenerated: '2024-01-20'
    },
    {
      id: 2,
      name: 'Análisis de Clientes',
      type: 'customers',
      description: 'Segmentación y comportamiento de clientes',
      icon: Users,
      lastGenerated: '2024-01-19'
    },
    {
      id: 3,
      name: 'Rendimiento de Cursos',
      type: 'courses',
      description: 'Ventas y popularidad por curso',
      icon: ShoppingCart,
      lastGenerated: '2024-01-18'
    },
    {
      id: 4,
      name: 'Análisis de Conversión',
      type: 'conversion',
      description: 'Embudo de ventas y tasas de conversión',
      icon: TrendingUp,
      lastGenerated: '2024-01-17'
    }
  ]

  const customReports = [
    {
      id: 1,
      name: 'Ventas por Método de Pago',
      createdAt: '2024-01-15',
      schedule: 'Mensual'
    },
    {
      id: 2,
      name: 'Clientes VIP - Análisis',
      createdAt: '2024-01-10',
      schedule: 'Semanal'
    }
  ]

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Crear Nuevo Reporte */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Plus size={20} className="text-purple-400" />
            Crear Nuevo Reporte
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Tipo de Reporte</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            >
              <option value="sales" className="bg-gray-800">Ventas</option>
              <option value="customers" className="bg-gray-800">Clientes</option>
              <option value="courses" className="bg-gray-800">Cursos</option>
              <option value="conversion" className="bg-gray-800">Conversión</option>
              <option value="financial" className="bg-gray-800">Financiero</option>
            </select>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Período</label>
            <select className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm">
              <option value="week" className="bg-gray-800">Última Semana</option>
              <option value="month" className="bg-gray-800">Último Mes</option>
              <option value="quarter" className="bg-gray-800">Último Trimestre</option>
              <option value="year" className="bg-gray-800">Último Año</option>
              <option value="custom" className="bg-gray-800">Personalizado</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-white/70 text-sm mb-2 block">Filtros Adicionales</label>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 text-white/70 text-sm">
                <input type="checkbox" className="rounded" />
                Incluir gráficas
              </label>
              <label className="flex items-center gap-2 text-white/70 text-sm">
                <input type="checkbox" className="rounded" />
                Incluir comparativas
              </label>
              <label className="flex items-center gap-2 text-white/70 text-sm">
                <input type="checkbox" className="rounded" />
                Exportar a Excel
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <button className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30">
              <FileText size={18} />
              Generar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Plantillas de Reportes */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <FileText size={20} className="text-blue-400" />
          Plantillas de Reportes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((template, index) => {
            const Icon = template.icon
            return (
              <div
                key={template.id}
                className={`group bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-500 cursor-pointer card-hover-effect report-card ${isVisible ? 'animate-slideInRight' : ''}`}
                onClick={() => setSelectedReport(template)}
                style={{ '--index': index }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                    <Icon size={20} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{template.name}</h4>
                    <p className="text-white/60 text-xs mb-2">{template.description}</p>
                    <p className="text-white/40 text-xs">
                      Última generación: {new Date(template.lastGenerated).toLocaleDateString('es-MX')}
                    </p>
                  </div>
                  <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reportes Personalizados */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Settings size={20} className="text-green-400" />
            Reportes Personalizados Guardados
          </h3>
        </div>

        <div className="space-y-3">
          {customReports.map((report) => (
            <div
              key={report.id}
              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold mb-1">{report.name}</h4>
                  <div className="flex items-center gap-4 text-white/60 text-xs">
                    <span>Creado: {new Date(report.createdAt).toLocaleDateString('es-MX')}</span>
                    <span>Programado: {report.schedule}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20">
                    <Download size={18} />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-red-500/20 text-white rounded-lg transition-all border border-white/20">
                    <Settings size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdvancedReports

