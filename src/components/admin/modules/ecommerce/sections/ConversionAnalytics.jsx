// ========================================
// ANÁLISIS DE CONVERSIÓN - Embudo de Ventas y Métricas
// ========================================

import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  XCircle,
  ArrowDown,
  BarChart3,
  Target,
  Zap,
  Filter,
  Calendar,
  Download
} from 'lucide-react'

const ConversionAnalytics = () => {
  const [dateRange, setDateRange] = useState('month')
  const [isVisible, setIsVisible] = useState(false)
  const [funnelAnimated, setFunnelAnimated] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => setFunnelAnimated(true), 300)
  }, [])

  const funnelData = [
    { stage: 'Visitantes', count: 10000, percentage: 100, color: 'blue' },
    { stage: 'Interesados', count: 3500, percentage: 35, color: 'purple' },
    { stage: 'Agregado al Carrito', count: 1200, percentage: 12, color: 'pink' },
    { stage: 'Iniciado Checkout', count: 800, percentage: 8, color: 'orange' },
    { stage: 'Completado', count: 450, percentage: 4.5, color: 'green' }
  ]

  const conversionMetrics = {
    overallRate: 4.5,
    cartAbandonment: 33.3,
    checkoutCompletion: 56.25,
    averageTimeToPurchase: '12 min',
    topConvertingSource: 'Google Ads',
    topConvertingCourse: 'React Avanzado'
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500 border-blue-500/30',
      purple: 'from-purple-500 to-violet-500 border-purple-500/30',
      pink: 'from-pink-500 to-rose-500 border-pink-500/30',
      orange: 'from-orange-500 to-amber-500 border-orange-500/30',
      green: 'from-green-500 to-emerald-500 border-green-500/30'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Estilos de animación avanzados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes widthExpand {
          from {
            width: 0%;
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .funnel-bar {
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .metric-card {
          animation-delay: calc(var(--index) * 0.1s);
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-8px) scale(1.02);
        }
      `}</style>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div 
          className={`group relative bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-2 card-hover-effect metric-card ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ '--index': 0 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/30 group-hover:scale-150 transition-all duration-700"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Tasa de Conversión</p>
              <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 group-hover:rotate-12 transition-all duration-300">
                <Target className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{conversionMetrics.overallRate}%</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400 animate-bounce" />
              <p className="text-green-400 text-xs">+2.3% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div 
          className={`group relative bg-gradient-to-br from-red-500/10 to-rose-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-2 card-hover-effect metric-card ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ '--index': 1 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-400/10 rounded-full blur-2xl group-hover:bg-red-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Abandono de Carrito</p>
              <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-all">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{conversionMetrics.cartAbandonment}%</p>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-red-400" />
              <p className="text-red-400 text-xs">-1.2% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Completación Checkout</p>
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{conversionMetrics.checkoutCompletion}%</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-400" />
              <p className="text-blue-400 text-xs">+5.1% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-purple-500/10 to-violet-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/10 rounded-full blur-2xl group-hover:bg-purple-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Tiempo Promedio</p>
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{conversionMetrics.averageTimeToPurchase}</p>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-purple-400" />
              <p className="text-purple-400 text-xs">-3 min vs mes anterior</p>
            </div>
          </div>
        </div>
      </div>

        {/* Embudo de Conversión */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInScale' : ''}`} style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <BarChart3 size={20} className="text-purple-400" />
            Embudo de Conversión
          </h3>
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="week" className="bg-gray-800">Última Semana</option>
              <option value="month" className="bg-gray-800">Último Mes</option>
              <option value="quarter" className="bg-gray-800">Último Trimestre</option>
            </select>
            <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {funnelData.map((stage, index) => {
            const colorClasses = getColorClasses(stage.color)
            const isLast = index === funnelData.length - 1
            
            return (
              <div key={stage.stage} className="relative">
                <div className="flex items-center gap-4">
                  <div className="w-32 sm:w-40 text-right">
                    <p className="text-white font-medium text-sm sm:text-base">{stage.stage}</p>
                    <p className="text-white/60 text-xs">{stage.count.toLocaleString()} usuarios</p>
                  </div>
                  
                  <div className="flex-1 relative">
                    <div 
                      className={`h-12 sm:h-16 rounded-xl bg-gradient-to-r ${colorClasses} border-2 flex items-center justify-end pr-4 transition-all duration-700 hover:scale-105 funnel-bar ${funnelAnimated ? '' : ''}`} 
                      style={{ 
                        width: funnelAnimated ? `${stage.percentage}%` : '0%',
                        transition: `width 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`
                      }}
                    >
                      <span className="text-white font-bold text-sm sm:text-base animate-bounce">{stage.percentage}%</span>
                    </div>
                  </div>
                </div>
                
                {!isLast && (
                  <div className="flex justify-center my-2">
                    <ArrowDown className="w-5 h-5 text-white/40" />
                    <span className="text-white/40 text-xs ml-2">
                      {((funnelData[index + 1].count / stage.count) * 100).toFixed(1)}% continúan
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Fuentes de Conversión */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-400" />
            Top Fuentes de Conversión
          </h3>
          <div className="space-y-3">
            {[
              { source: 'Google Ads', conversions: 180, rate: 5.2 },
              { source: 'Facebook Ads', conversions: 120, rate: 4.1 },
              { source: 'Email Marketing', conversions: 95, rate: 6.8 },
              { source: 'Búsqueda Orgánica', conversions: 55, rate: 3.2 }
            ].map((item, index) => (
              <div key={item.source} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{item.source}</span>
                  <span className="text-green-400 font-bold">{item.rate}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.conversions / 180) * 100}%` }}
                  ></div>
                </div>
                <p className="text-white/60 text-xs mt-1">{item.conversions} conversiones</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <ShoppingCart size={20} className="text-purple-400" />
            Cursos con Mayor Conversión
          </h3>
          <div className="space-y-3">
            {[
              { course: 'React Avanzado', conversions: 145, rate: 8.5 },
              { course: 'JavaScript ES6+', conversions: 98, rate: 6.2 },
              { course: 'Node.js Master', conversions: 87, rate: 5.8 },
              { course: 'Vue.js Completo', conversions: 72, rate: 4.9 }
            ].map((item, index) => (
              <div key={item.course} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{item.course}</span>
                  <span className="text-purple-400 font-bold">{item.rate}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.conversions / 145) * 100}%` }}
                  ></div>
                </div>
                <p className="text-white/60 text-xs mt-1">{item.conversions} conversiones</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversionAnalytics

