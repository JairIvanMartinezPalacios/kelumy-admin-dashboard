// ========================================
// GESTIÓN DE CLIENTES - Clientes Recurrentes y Análisis
// ========================================

import React, { useState, useEffect } from 'react'
import {
  Users,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Eye,
  MessageCircle,
  Download,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react'

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const customers = [
    {
      id: 'CUST-001',
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+52 55 1234 5678',
      location: 'Ciudad de México',
      totalSpent: 2497,
      ordersCount: 8,
      lastPurchase: '2024-01-20',
      status: 'active',
      loyaltyPoints: 1250,
      tier: 'gold',
      avgOrderValue: 312,
      favoriteCategory: 'Frontend',
      registrationDate: '2023-06-15'
    },
    {
      id: 'CUST-002',
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+52 55 9876 5432',
      location: 'Guadalajara',
      totalSpent: 1899,
      ordersCount: 5,
      lastPurchase: '2024-01-18',
      status: 'active',
      loyaltyPoints: 950,
      tier: 'silver',
      avgOrderValue: 380,
      favoriteCategory: 'Backend',
      registrationDate: '2023-08-20'
    },
    {
      id: 'CUST-003',
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+52 55 5555 1234',
      location: 'Monterrey',
      totalSpent: 549,
      ordersCount: 2,
      lastPurchase: '2023-12-10',
      status: 'inactive',
      loyaltyPoints: 275,
      tier: 'bronze',
      avgOrderValue: 275,
      favoriteCategory: 'Full Stack',
      registrationDate: '2023-11-05'
    }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  const getTierInfo = (tier) => {
    const tiers = {
      gold: { color: 'text-yellow-300 bg-yellow-500/30 border-yellow-400/50 shadow-yellow-500/20', label: 'Oro', icon: Award },
      silver: { color: 'text-slate-200 bg-slate-400/30 border-slate-300/50 shadow-slate-400/20', label: 'Plata', icon: Star },
      bronze: { color: 'text-orange-300 bg-orange-500/30 border-orange-400/50 shadow-orange-500/20', label: 'Bronce', icon: Star }
    }
    return tiers[tier] || tiers.bronze
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0" style={{ maxWidth: '100%' }}>
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
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .metric-card {
          animation-delay: calc(var(--index) * 0.1s);
        }
      `}</style>

      {/* Métricas de Clientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div 
          className={`group relative bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 overflow-hidden ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ '--index': 0 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Total Clientes</p>
              <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                <Users className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{customers.length}</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-green-400 text-xs">Clientes registrados</p>
            </div>
          </div>
        </div>

        <div 
          className={`group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 overflow-hidden ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ '--index': 1 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Clientes Activos</p>
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                <UserCheck className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {customers.filter(c => c.status === 'active').length}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <p className="text-blue-400 text-xs">Últimos 30 días</p>
            </div>
          </div>
        </div>

        <div 
          className={`group relative bg-gradient-to-br from-purple-500/10 to-violet-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 overflow-hidden ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ '--index': 2 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/10 rounded-full blur-2xl group-hover:bg-purple-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Valor Promedio</p>
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {formatCurrency(customers.reduce((acc, c) => acc + c.avgOrderValue, 0) / customers.length)}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="text-purple-400 text-xs">Por cliente</p>
            </div>
          </div>
        </div>

        <div 
          className={`group relative bg-gradient-to-br from-pink-500/10 to-rose-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1 overflow-hidden ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ '--index': 3 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-400/10 rounded-full blur-2xl group-hover:bg-pink-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-xs sm:text-sm font-medium">Tasa de Retención</p>
              <div className="p-2 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-all">
                <TrendingUp className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">78%</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <p className="text-pink-400 text-xs">Clientes recurrentes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg w-full max-w-full ${isVisible ? 'animate-fadeInScale' : ''}`} style={{ animationDelay: '0.4s', maxWidth: '100%' }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm transition-all hover:bg-white/15"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm transition-all hover:bg-white/15"
          >
            <option value="all" className="bg-gray-800">Todos los Estados</option>
            <option value="active" className="bg-gray-800">Activos</option>
            <option value="inactive" className="bg-gray-800">Inactivos</option>
          </select>

          <button className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105">
            <Download size={18} />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>

        {/* Lista de Clientes */}
        <div className="space-y-3 w-full max-w-full" style={{ maxWidth: '100%' }}>
          {filteredCustomers.map((customer, index) => {
            const tierInfo = getTierInfo(customer.tier)
            const TierIcon = tierInfo.icon

            return (
              <div
                key={customer.id}
                className={`group bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-500 cursor-pointer card-hover-effect ${isVisible ? 'animate-slideInRight' : ''}`}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{customer.name}</h4>
                        <p className="text-white/60 text-sm">{customer.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border shadow-lg ${tierInfo.color}`}>
                        <TierIcon size={14} />
                        {tierInfo.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-white/60 text-xs mb-1">Total Gastado</p>
                        <p className="text-white font-semibold">{formatCurrency(customer.totalSpent)}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Pedidos</p>
                        <p className="text-white font-semibold">{customer.ordersCount}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Puntos Lealtad</p>
                        <p className="text-white font-semibold">{customer.loyaltyPoints.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Última Compra</p>
                        <p className="text-white font-semibold">{new Date(customer.lastPurchase).toLocaleDateString('es-MX')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30">
                      <Eye size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
                      <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30">
                      <Mail size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal de Detalles del Cliente */}
      {selectedCustomer && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInScale"
          onClick={() => setSelectedCustomer(null)}
        >
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeInScale shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl">Detalles del Cliente</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <Trash2 size={20} className="text-white" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">Nombre</p>
                  <p className="text-white font-semibold">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Email</p>
                  <p className="text-white font-semibold">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Teléfono</p>
                  <p className="text-white font-semibold">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Ubicación</p>
                  <p className="text-white font-semibold">{selectedCustomer.location}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/20">
                <h4 className="text-white font-semibold mb-3">Estadísticas</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/60 text-xs mb-1">Total Gastado</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(selectedCustomer.totalSpent)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/60 text-xs mb-1">Pedidos Totales</p>
                    <p className="text-white font-bold text-lg">{selectedCustomer.ordersCount}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/60 text-xs mb-1">Valor Promedio</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(selectedCustomer.avgOrderValue)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/60 text-xs mb-1">Puntos Lealtad</p>
                    <p className="text-white font-bold text-lg">{selectedCustomer.loyaltyPoints.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomersManagement

