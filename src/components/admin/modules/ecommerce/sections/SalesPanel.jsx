// ========================================
// PANEL DE VENTAS - Resumen de Ingresos y Gráficas
// ========================================

import React, { useState, useEffect, useRef } from 'react'
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  BarChart3,
  LineChart,
  PieChart,
  Search,
  FileSpreadsheet,
  FileText,
  File,
  CreditCard
} from 'lucide-react'

// Componente para animar números
const CountUp = ({ end, duration = 2000, prefix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      // Easing function: easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCount(ease * end)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return (
    <span>
      {prefix}{new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(count)}
    </span>
  )
}

const SalesPanel = () => {
  const [dateFilter, setDateFilter] = useState('month')
  const [courseFilter, setCourseFilter] = useState('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all')
  const [showCustomDateRange, setShowCustomDateRange] = useState(false)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const exportMenuRef = useRef(null)

  // Cerrar menú de exportación al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false)
      }
    }
    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showExportMenu])

  // Datos de ejemplo
  const salesData = {
    daily: 1250,
    weekly: 8750,
    monthly: 45230,
    projection: 52000
  }

  const revenueData = [
    { day: 'Lun', amount: 3200 },
    { day: 'Mar', amount: 4100 },
    { day: 'Mié', amount: 3800 },
    { day: 'Jue', amount: 4500 },
    { day: 'Vie', amount: 5200 },
    { day: 'Sáb', amount: 4800 },
    { day: 'Dom', amount: 3900 }
  ]

  const paymentMethodsData = [
    { method: 'Stripe', amount: 25000, percentage: 55 },
    { method: 'PayPal', amount: 12000, percentage: 27 },
    { method: 'MercadoPago', amount: 5000, percentage: 11 },
    { method: 'OXXO Pay', amount: 3230, percentage: 7 }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  // Funciones de exportación
  const handleExport = (format) => {
    const data = {
      salesData,
      revenueData,
      paymentMethodsData,
      filters: {
        dateFilter,
        courseFilter,
        paymentMethodFilter,
        customStartDate,
        customEndDate
      }
    }

    if (format === 'excel') {
      // Simular exportación a Excel
      const csv = convertToCSV(data)
      downloadFile(csv, 'ventas-kelumy.csv', 'text/csv')
    } else if (format === 'pdf') {
      // Simular exportación a PDF
      alert('Exportando a PDF... La funcionalidad completa requiere integración con librería PDF')
      downloadFile(JSON.stringify(data, null, 2), 'ventas-kelumy.pdf', 'application/pdf')
    } else if (format === 'csv') {
      const csv = convertToCSV(data)
      downloadFile(csv, 'ventas-kelumy.csv', 'text/csv')
    }
    setShowExportMenu(false)
  }

  const convertToCSV = (data) => {
    let csv = 'Fecha,Ingresos Diarios,Ingresos Semanales,Ingresos Mensuales,Proyección\n'
    csv += `${new Date().toLocaleDateString()},${data.salesData.daily},${data.salesData.weekly},${data.salesData.monthly},${data.salesData.projection}\n\n`
    csv += 'Día,Ingresos\n'
    data.revenueData.forEach(item => {
      csv += `${item.day},${item.amount}\n`
    })
    csv += '\nMétodo de Pago,Monto,Porcentaje\n'
    data.paymentMethodsData.forEach(item => {
      csv += `${item.method},${item.amount},${item.percentage}%\n`
    })
    return csv
  }

  const downloadFile = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Resumen de Ingresos con diseño mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Tarjeta Ingresos Diarios */}
        <div className="group relative bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '0ms' }}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Ingresos Diarios</p>
              <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all group-hover:scale-110">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              <CountUp end={salesData.daily} prefix="$" />
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-green-400 text-xs">Ventas del día actual</p>
            </div>
          </div>
        </div>

        {/* Tarjeta Ingresos Semanales */}
        <div className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '100ms' }}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Ingresos Semanales</p>
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all group-hover:scale-110">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              <CountUp end={salesData.weekly} prefix="$" />
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <p className="text-blue-400 text-xs">Comparativa semanal</p>
            </div>
          </div>
        </div>

        {/* Tarjeta Ingresos Mensuales */}
        <div className="group relative bg-gradient-to-br from-purple-500/10 to-violet-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '200ms' }}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/10 rounded-full blur-2xl group-hover:bg-purple-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Ingresos Mensuales</p>
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all group-hover:scale-110">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              <CountUp end={salesData.monthly} prefix="$" />
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="text-purple-400 text-xs">Progreso del mes</p>
            </div>
          </div>
        </div>

        {/* Tarjeta Proyección */}
        <div className="group relative bg-gradient-to-br from-pink-500/10 to-rose-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1 animate-slideUp" style={{ animationDelay: '300ms' }}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-400/10 rounded-full blur-2xl group-hover:bg-pink-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Proyección</p>
              <div className="p-2 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-all group-hover:scale-110">
                <BarChart3 className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              <CountUp end={salesData.projection} prefix="$" />
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <p className="text-pink-400 text-xs">Basada en tendencias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda con diseño mejorado */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 w-full max-w-full shadow-lg animate-slideUp" style={{ animationDelay: '400ms' }}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 flex-wrap">
          <div className="flex-1 min-w-0 relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar por curso..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm transition-all hover:bg-white/15"
            />
          </div>
          
          <div className="flex flex-col gap-2 flex-shrink-0">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value)
                setShowCustomDateRange(e.target.value === 'custom')
              }}
              className="px-3 sm:px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm transition-all hover:bg-white/15"
            >
              <option value="day" className="bg-gray-800">Hoy</option>
              <option value="week" className="bg-gray-800">Esta Semana</option>
              <option value="month" className="bg-gray-800">Este Mes</option>
              <option value="custom" className="bg-gray-800">Personalizado</option>
            </select>
            {showCustomDateRange && (
              <div className="flex gap-2 animate-fadeIn">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                  placeholder="Fecha inicio"
                />
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                  placeholder="Fecha fin"
                />
              </div>
            )}
          </div>

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 sm:px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm flex-shrink-0 transition-all hover:bg-white/15"
          >
            <option value="all" className="bg-gray-800">Todos los Cursos</option>
            <option value="react" className="bg-gray-800">React</option>
            <option value="javascript" className="bg-gray-800">JavaScript</option>
            <option value="nodejs" className="bg-gray-800">Node.js</option>
          </select>

          <select
            value={paymentMethodFilter}
            onChange={(e) => setPaymentMethodFilter(e.target.value)}
            className="px-3 sm:px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm flex-shrink-0 transition-all hover:bg-white/15"
          >
            <option value="all" className="bg-gray-800">Todos los Métodos</option>
            <option value="stripe" className="bg-gray-800">Stripe</option>
            <option value="paypal" className="bg-gray-800">PayPal</option>
            <option value="mercadopago" className="bg-gray-800">MercadoPago</option>
            <option value="oxxo" className="bg-gray-800">OXXO Pay</option>
          </select>

          <div className="relative flex-shrink-0" ref={exportMenuRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 sm:px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 text-sm whitespace-nowrap shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Exp</span>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl z-10 w-full sm:w-auto min-w-[180px] animate-fadeIn">
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/20 flex items-center gap-3 text-sm rounded-t-xl transition-all group"
                >
                  <div className="p-1.5 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                    <FileSpreadsheet size={16} className="text-green-400" />
                  </div>
                  <span>Exportar a Excel</span>
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/20 flex items-center gap-3 text-sm transition-all group"
                >
                  <div className="p-1.5 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-all">
                    <FileText size={16} className="text-red-400" />
                  </div>
                  <span>Exportar a PDF</span>
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/20 flex items-center gap-3 text-sm rounded-b-xl transition-all group"
                >
                  <div className="p-1.5 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                    <File size={16} className="text-blue-400" />
                  </div>
                  <span>Exportar a CSV</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gráficas Dinámicas con diseño mejorado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full max-w-full">
        {/* Gráfica de Barras - Ingresos por Día */}
        <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 animate-slideUp" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2 text-lg">
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all group-hover:scale-110">
                <BarChart3 size={20} className="text-purple-400" />
              </div>
              Ingresos por Día
            </h3>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-3">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group/bar">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 via-purple-500 to-pink-500 rounded-t-xl transition-all duration-300 hover:opacity-90 hover:scale-105 relative overflow-hidden"
                  style={{ 
                    height: `${(item.amount / 6000) * 100}%`,
                    transformOrigin: 'bottom',
                    animation: `growBar 1s ease-out forwards ${index * 100 + 600}ms`
                  }}
                  title={formatCurrency(item.amount)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-white/70 text-xs mt-2 group-hover/bar:text-white transition-colors">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfica de Líneas - Tendencias Temporales */}
        <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 animate-slideUp" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2 text-lg">
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all group-hover:scale-110">
                <LineChart size={20} className="text-blue-400" />
              </div>
              Tendencias Temporales
            </h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-white/5 rounded-xl relative overflow-hidden">
            {/* Simulación de gráfica de líneas animada */}
            <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 50" preserveAspectRatio="none">
              <path 
                d="M0,40 Q10,35 20,38 T40,20 T60,25 T80,10 T100,5" 
                fill="none" 
                stroke="rgba(59, 130, 246, 0.5)" 
                strokeWidth="2"
                className="animate-drawPath"
              />
              <path 
                d="M0,40 Q10,35 20,38 T40,20 T60,25 T80,10 T100,5 L100,50 L0,50 Z" 
                fill="url(#blueGradient)" 
                className="animate-fadeIn"
                style={{ animationDelay: '1s' }}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="text-center relative z-10">
              <div className="p-4 bg-blue-500/10 rounded-full mb-4 mx-auto w-fit animate-bounce-slow">
                <LineChart size={48} className="text-blue-400" />
              </div>
              <p className="text-white/80 text-sm font-medium">Gráfica de líneas interactiva</p>
              <p className="text-white/50 text-xs mt-2">Comparativa de períodos anteriores</p>
            </div>
          </div>
        </div>

        {/* Gráfica de Pastel - Ingresos por Método de Pago */}
        <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 lg:col-span-2 hover:border-pink-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 animate-slideUp" style={{ animationDelay: '700ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2 text-lg">
              <div className="p-2 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-all group-hover:scale-110">
                <PieChart size={20} className="text-pink-400" />
              </div>
              Ingresos por Método de Pago
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48 group-hover:scale-105 transition-transform duration-500">
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                  {paymentMethodsData.map((item, index) => {
                    const offset = paymentMethodsData.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0)
                    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={colors[index]}
                        strokeWidth="8"
                        strokeDasharray={`${item.percentage * 2.513} 251.3`}
                        strokeDashoffset={-offset * 2.513}
                        className="animate-drawCircle"
                        style={{ 
                          animationDelay: `${800 + index * 200}ms`,
                          transformOrigin: 'center',
                          opacity: 0,
                          animationFillMode: 'forwards'
                        }}
                      />
                    )
                  })}
                </svg>
                {/* Texto central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-xl animate-fadeIn" style={{ animationDelay: '1.5s' }}>Total</span>
                  <span className="text-white/60 text-sm animate-fadeIn" style={{ animationDelay: '1.7s' }}>100%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 flex flex-col justify-center">
              {paymentMethodsData.map((item, index) => {
                const colors = ['bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500']
                const shadowColors = ['shadow-purple-500/50', 'shadow-pink-500/50', 'shadow-yellow-500/50', 'shadow-green-500/50']
                return (
                  <div 
                    key={index} 
                    className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all animate-slideRight"
                    style={{ animationDelay: `${800 + index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-lg ${colors[index]} shadow-lg ${shadowColors[index]} group-hover/item:scale-110 transition-transform`} />
                      <span className="text-white text-sm font-medium group-hover/item:text-white/90">{item.method}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-base">{formatCurrency(item.amount)}</p>
                      <p className="text-white/60 text-xs">{item.percentage}%</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Gráfica Comparativa - Períodos Anteriores */}
        <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 lg:col-span-2 hover:border-green-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 animate-slideUp" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2 text-lg">
              <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all group-hover:scale-110">
                <BarChart3 size={20} className="text-green-400" />
              </div>
              Comparativa de Períodos
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Este Mes', value: 45230, change: '+23%', color: 'green' },
              { label: 'Mes Anterior', value: 36780, change: '+15%', color: 'blue' },
              { label: 'Este Año', value: 425000, change: '+45%', color: 'purple' },
              { label: 'Año Anterior', value: 293000, change: '+12%', color: 'pink' }
            ].map((period, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                <p className="text-white/60 text-xs mb-2">{period.label}</p>
                <p className="text-white font-bold text-xl mb-1">${period.value.toLocaleString()}</p>
                <span className={`text-${period.color}-400 text-xs flex items-center gap-1`}>
                  <TrendingUp size={12} />
                  {period.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 animate-slideUp" style={{ animationDelay: '900ms' }}>
        {/* Tasa de Conversión */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold text-sm">Tasa de Conversión</h4>
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <TrendingUp size={18} className="text-cyan-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">3.8%</p>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '38%' }}></div>
          </div>
          <p className="text-cyan-400 text-xs">+0.5% vs mes anterior</p>
        </div>

        {/* Valor Promedio de Pedido */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold text-sm">Valor Promedio</h4>
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <DollarSign size={18} className="text-yellow-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">$347</p>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-yellow-400 text-xs">Por pedido completado</p>
        </div>

        {/* Total de Transacciones */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-indigo-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold text-sm">Transacciones</h4>
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <CreditCard size={18} className="text-indigo-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">1,247</p>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
          </div>
          <p className="text-indigo-400 text-xs">Este mes</p>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes growBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        @keyframes drawCircle {
          from { stroke-dashoffset: 251.3; opacity: 1; }
          to { opacity: 1; }
        }

        @keyframes drawPath {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideUp {
          opacity: 0; /* Start hidden */
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slideRight {
          animation: slideRight 0.5s ease-out forwards;
        }

        .animate-drawCircle {
          animation: drawCircle 1s ease-out forwards;
        }

        .animate-drawPath {
          animation: drawPath 2s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default SalesPanel
