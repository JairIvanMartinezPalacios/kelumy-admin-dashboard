import React, { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  Star,
  Users,
  Activity,
  Target,
  Award,
  Zap
} from 'lucide-react'

const AnaliticasProductos = () => {
  const [dateRange, setDateRange] = useState('30d')

  const stats = {
    totalRevenue: 1250000,
    revenueChange: 15.5,
    totalSales: 1245,
    salesChange: 12.3,
    avgOrderValue: 1004,
    avgOrderChange: 2.8,
    conversionRate: 3.2,
    conversionChange: 0.5
  }

  const topProducts = [
    { name: 'Curso Completo de React y Next.js', sales: 245, revenue: 734755, views: 1234, conversion: 19.9 },
    { name: 'Suscripción Premium Mensual', sales: 312, revenue: 311688, views: 890, conversion: 35.1 },
    { name: 'Certificado Digital Profesional', sales: 156, revenue: 77844, views: 567, conversion: 27.5 },
    { name: 'Libro Físico: Guía de E-commerce', sales: 78, revenue: 46722, views: 345, conversion: 22.6 }
  ]

  const salesByCategory = [
    { category: 'Cursos Online', sales: 567, revenue: 1701000, percentage: 45.5 },
    { category: 'Suscripciones', sales: 312, revenue: 311688, percentage: 25.0 },
    { category: 'Certificados', sales: 156, revenue: 77844, percentage: 12.5 },
    { category: 'Libros', sales: 78, revenue: 46722, percentage: 6.3 },
    { category: 'Plantillas', sales: 45, revenue: 89955, percentage: 3.6 },
    { category: 'Otros', sales: 87, revenue: 108791, percentage: 7.0 }
  ]

  const handleExportReport = (format) => {
    alert(`Exportando reporte en formato ${format}...`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analíticas de Productos</h2>
          <p className="text-white/70">Métricas y análisis de rendimiento de productos</p>
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
            <DollarSign className="w-6 h-6 text-green-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.revenueChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.revenueChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.revenueChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{formatPrice(stats.totalRevenue)}</p>
          <p className="text-white/70 text-sm">Ingresos Totales</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <ShoppingCart className="w-6 h-6 text-blue-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.salesChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.salesChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.salesChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.totalSales}</p>
          <p className="text-white/70 text-sm">Ventas Totales</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-6 h-6 text-purple-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.avgOrderChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.avgOrderChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.avgOrderChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{formatPrice(stats.avgOrderValue)}</p>
          <p className="text-white/70 text-sm">Ticket Promedio</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-6 h-6 text-pink-400" />
            <span className={`flex items-center gap-1 text-xs ${stats.conversionChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.conversionChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(stats.conversionChange)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.conversionRate}%</p>
          <p className="text-white/70 text-sm">Tasa de Conversión</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventas por Categoría */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Ventas por Categoría
          </h3>
          <div className="space-y-4">
            {salesByCategory.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/90 text-sm">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-xs">{item.percentage}%</span>
                    <span className="text-white font-semibold">{item.sales} ventas</span>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-white/60 text-xs mt-1">{formatPrice(item.revenue)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Top */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            Productos Más Vendidos
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-start justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-white font-medium text-sm">{product.name}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/60 ml-8">
                    <span className="flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      {product.sales} ventas
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {product.views} vistas
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {product.conversion}% conv.
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formatPrice(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de rendimiento */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Rendimiento de Productos
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/70 text-sm font-semibold">Producto</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Ventas</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Ingresos</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Vistas</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Conversión</th>
                <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Calificación</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-center text-white/90">{product.sales}</td>
                  <td className="py-3 px-4 text-center text-white/90 font-semibold">{formatPrice(product.revenue)}</td>
                  <td className="py-3 px-4 text-center text-white/90">{product.views}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-400 font-semibold">{product.conversion}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/90">4.8</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnaliticasProductos

