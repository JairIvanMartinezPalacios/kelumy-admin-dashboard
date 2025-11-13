// ========================================
// CUPONES Y PROMOCIONES - Gestión completa
// ========================================

import React, { useState, useEffect } from 'react'
import {
  Ticket,
  Plus,
  Search,
  Calendar,
  Users,
  TrendingUp,
  Edit,
  Trash2,
  Copy,
  BarChart3
} from 'lucide-react'

const CouponsPromotions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const coupons = [
    {
      id: 'DESC20',
      code: 'DESC20',
      type: 'percentage',
      value: 20,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      totalUses: 150,
      maxUses: 1000,
      usesPerUser: 1,
      courses: 'all',
      status: 'active',
      conversions: 45,
      revenue: 12500
    },
    {
      id: 'FIXED500',
      code: 'FIXED500',
      type: 'fixed',
      value: 500,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      totalUses: 25,
      maxUses: 100,
      usesPerUser: 1,
      courses: 'specific',
      status: 'active',
      conversions: 18,
      revenue: 8500
    }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
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
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-4px) scale(1.01);
        }
        
        .coupon-card {
          animation-delay: calc(var(--index) * 0.1s);
        }
      `}</style>

      {/* Crear Cupón */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInUp' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Plus size={20} />
            Crear Nuevo Cupón
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Tipo de Descuento</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="percentage" className="bg-gray-800">Porcentaje (10%, 20%, 30%)</option>
              <option value="fixed" className="bg-gray-800">Monto Fijo ($100, $500 MXN)</option>
            </select>
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Valor</label>
            <input
              type="number"
              placeholder="20 o 500"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Código</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código automático o personalizado"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20">
                Generar
              </button>
            </div>
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Asignación de Cursos</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="all" className="bg-gray-800">Todos los Cursos</option>
              <option value="specific" className="bg-gray-800">Cursos Específicos</option>
              <option value="category" className="bg-gray-800">Por Categoría</option>
            </select>
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Código Personalizado por Cliente</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
              />
              <span className="text-white/70 text-sm">Permitir códigos personalizados</span>
            </div>
            <input
              type="text"
              placeholder="Email del cliente para código personalizado"
              className="w-full mt-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Exclusión de Cursos en Oferta</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
              <span className="text-white/70 text-sm">Excluir cursos que ya están en oferta</span>
            </div>
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Fecha de Inicio</label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Fecha de Expiración</label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Límite de Usos Totales</label>
            <input
              type="number"
              placeholder="1000"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Límite de Usos por Usuario</label>
            <input
              type="number"
              placeholder="1"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
          Crear Cupón
        </button>
      </div>

        {/* Lista de Cupones */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInScale' : ''}`} style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar cupones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 transition-all hover:bg-white/15"
            />
          </div>
        </div>

        <div className="space-y-3">
          {coupons.map((coupon, index) => (
            <div
              key={coupon.id}
              className={`bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-500 card-hover-effect coupon-card ${isVisible ? 'animate-slideInRight' : ''}`}
              style={{ '--index': index }}
            >
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold text-lg">{coupon.code}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      coupon.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {coupon.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70">
                    <p><strong>Descuento:</strong> {coupon.type === 'percentage' ? `${coupon.value}%` : formatCurrency(coupon.value)}</p>
                    <p><strong>Vigencia:</strong> {coupon.startDate} - {coupon.endDate}</p>
                    <p><strong>Usos:</strong> {coupon.totalUses} / {coupon.maxUses}</p>
                    <p><strong>Cursos:</strong> {coupon.courses === 'all' ? 'Todos' : 'Específicos'}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:min-w-[200px]">
                  <div className="bg-white/5 rounded-lg p-3 mb-2">
                    <p className="text-white/70 text-xs mb-1">Conversiones</p>
                    <p className="text-white font-semibold">{coupon.conversions}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 mb-2">
                    <p className="text-white/70 text-xs mb-1">Ingresos Generados</p>
                    <p className="text-white font-semibold">{formatCurrency(coupon.revenue)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 text-sm">
                      <Edit size={14} className="inline mr-1" />
                      Editar
                    </button>
                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 text-sm">
                      <Copy size={14} />
                    </button>
                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 text-sm">
                      <BarChart3 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking y Analítica */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
          <TrendingUp size={20} />
          Tracking y Analítica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Uso de Cupones</p>
            <p className="text-2xl font-bold text-white">175</p>
            <p className="text-green-400 text-xs mt-1">Total de usos</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Conversiones</p>
            <p className="text-2xl font-bold text-white">63</p>
            <p className="text-blue-400 text-xs mt-1">36% tasa de conversión</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">ROI Promedio</p>
            <p className="text-2xl font-bold text-white">4.2x</p>
            <p className="text-purple-400 text-xs mt-1">Retorno de inversión</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponsPromotions

