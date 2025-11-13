// ========================================
// SUSCRIPCIONES Y MEMBRESÍAS - Gestión de Planes
// ========================================

import React, { useState, useEffect } from 'react'
import {
  Repeat,
  Plus,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  TrendingUp,
  Crown,
  Star,
  Zap
} from 'lucide-react'

const SubscriptionsMemberships = () => {
  const [activeTab, setActiveTab] = useState('plans')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: 340,
      period: 'month',
      courses: 15,
      icon: Star,
      color: 'from-blue-600 to-cyan-600',
      features: ['15 cursos', 'Acceso básico', 'Soporte por email']
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: 680,
      period: 'month',
      courses: 50,
      icon: Crown,
      color: 'from-purple-600 to-pink-600',
      features: ['50+ cursos', 'Acceso completo', 'Soporte prioritario', 'Eventos exclusivos']
    },
    {
      id: 'enterprise',
      name: 'Plan Enterprise',
      price: 1780,
      period: 'month',
      users: 10,
      icon: Zap,
      color: 'from-orange-600 to-red-600',
      features: ['10 usuarios', 'Cursos ilimitados', 'Soporte dedicado', 'Webinars privados']
    }
  ]

  const memberships = [
    {
      id: 'MEM-001',
      user: 'Juan Pérez',
      email: 'juan.perez@email.com',
      plan: 'Plan Premium',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      nextBilling: '2024-02-01',
      paymentMethod: 'Stripe'
    },
    {
      id: 'MEM-002',
      user: 'María García',
      email: 'maria.garcia@email.com',
      plan: 'Plan Básico',
      status: 'expired',
      startDate: '2023-12-01',
      endDate: '2024-01-01',
      nextBilling: null,
      paymentMethod: 'PayPal'
    },
    {
      id: 'MEM-003',
      user: 'Carlos López',
      email: 'carlos.lopez@email.com',
      plan: 'Plan Enterprise',
      status: 'suspended',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      nextBilling: '2024-02-15',
      paymentMethod: 'MercadoPago'
    }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  const getStatusInfo = (status) => {
    const statusMap = {
      active: { icon: CheckCircle, color: 'text-green-400 bg-green-500/20', label: 'Activo' },
      expired: { icon: Clock, color: 'text-red-400 bg-red-500/20', label: 'Vencido' },
      suspended: { icon: AlertCircle, color: 'text-yellow-400 bg-yellow-500/20', label: 'Suspendido' },
      grace: { icon: Clock, color: 'text-blue-400 bg-blue-500/20', label: 'Período de Gracia' }
    }
    return statusMap[status] || statusMap.active
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
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-6px) scale(1.02);
        }
        
        .plan-card {
          animation-delay: calc(var(--index) * 0.1s);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Contenedor unificado con tabs horizontales compactos */}
      <div className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full max-w-full ${isVisible ? 'animate-fadeInScale' : ''}`}>
        <div className="border-b border-white/10 overflow-x-auto">
          <nav className="flex overflow-x-auto scrollbar-hide min-w-0">
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 rounded-tl-2xl ${
                activeTab === 'plans'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Repeat size={18} />
              Planes de Suscripción
            </button>
            <button
              onClick={() => setActiveTab('memberships')}
              className={`flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 rounded-tr-2xl ${
                activeTab === 'memberships'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={18} />
              Gestión de Membresías
            </button>
          </nav>
        </div>

        {/* Contenido de las pestañas */}
        <div className="p-4 sm:p-6 w-full max-w-full overflow-x-hidden min-w-0">
          {activeTab === 'plans' && (
            <div className="space-y-6">
          {/* Planes de Suscripción */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.id}
                  className={`bg-gradient-to-br ${plan.color} rounded-xl p-6 border border-white/20 card-hover-effect plan-card ${isVisible ? 'animate-fadeInUp' : ''}`}
                  style={{ '--index': index }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="px-2 py-1 bg-white/20 rounded text-xs text-white font-medium">
                      {plan.period === 'month' ? 'Mensual' : 'Anual'}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-white/80 text-3xl font-bold">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-white/60 text-sm">/{plan.period === 'month' ? 'mes' : 'año'}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/90 text-sm">
                        <CheckCircle size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.courses && (
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <CheckCircle size={16} />
                        <span>{plan.courses} cursos disponibles</span>
                      </div>
                    )}
                    {plan.users && (
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <CheckCircle size={16} />
                        <span>{plan.users} usuarios incluidos</span>
                      </div>
                    )}
                  </div>
                  <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium">
                    {plan.id === 'enterprise' ? 'Contactar Ventas' : 'Seleccionar Plan'}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Planes Anuales con Descuento */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Planes Anuales con Descuento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => {
                const annualPrice = Math.round(plan.price * 12 * 0.85) // 15% descuento
                return (
                  <div key={plan.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/70 text-sm mb-1">{plan.name}</p>
                    <p className="text-white font-semibold text-lg">{formatCurrency(annualPrice)}</p>
                    <p className="text-green-400 text-xs mt-1">15% de descuento</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
          )}

          {activeTab === 'memberships' && (
            <div className="space-y-6">
              {/* Gestión de Membresías */}
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Users size={20} />
                  Membresías Activas
                </h3>

            <div className="space-y-3">
              {memberships.map((membership) => {
                const statusInfo = getStatusInfo(membership.status)
                const StatusIcon = statusInfo.icon

                return (
                  <div
                    key={membership.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-semibold">{membership.user}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                            <StatusIcon size={12} />
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70">
                          <p><strong>Email:</strong> {membership.email}</p>
                          <p><strong>Plan:</strong> {membership.plan}</p>
                          <p><strong>Inicio:</strong> {membership.startDate}</p>
                          <p><strong>Fin:</strong> {membership.endDate}</p>
                          {membership.nextBilling && (
                            <p><strong>Próximo Cobro:</strong> {membership.nextBilling}</p>
                          )}
                          <p><strong>Método de Pago:</strong> {membership.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 lg:min-w-[150px]">
                        {membership.status === 'suspended' && (
                          <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all border border-green-500/30 text-sm">
                            Reactivar
                          </button>
                        )}
                        {membership.status === 'expired' && (
                          <button className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-all border border-purple-500/30 text-sm">
                            Renovar
                          </button>
                        )}
                        <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 text-sm">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Renovación Automática */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Repeat size={20} />
              Renovación Automática
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Recordatorios de Pago</p>
                <p className="text-white">Enviar recordatorio 3 días antes del vencimiento</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Reintentos Automáticos</p>
                <p className="text-white">3 intentos automáticos de cobro antes de suspender</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Período de Gracia</p>
                <p className="text-white">7 días adicionales después del vencimiento</p>
              </div>
            </div>
          </div>

          {/* Beneficios por Nivel */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Crown size={20} />
              Beneficios por Nivel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Contenido Exclusivo</h4>
                <p className="text-white/70 text-sm">Acceso a cursos y materiales exclusivos según el plan</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Eventos Especiales</h4>
                <p className="text-white/70 text-sm">Webinars y eventos exclusivos para miembros</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Soporte Prioritario</h4>
                <p className="text-white/70 text-sm">Atención prioritaria según el nivel de membresía</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Descuentos Adicionales</h4>
                <p className="text-white/70 text-sm">Descuentos especiales en compras adicionales</p>
              </div>
            </div>
          </div>
        </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionsMemberships

