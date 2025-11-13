// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState } from 'react'
import {
  BarChart3,        // Panel de Ventas
  ShoppingCart,     // Pedidos y Transacciones
  CreditCard,       // Métodos de Pago
  FileText,         // Facturación
  Ticket,           // Cupones y Promociones
  Package,          // Bundles y Paquetes
  Repeat,           // Suscripciones y Membresías
  Users,            // Gestión de Clientes
  TrendingUp,        // Análisis de Conversión
  Bell,             // Notificaciones
  FileBarChart,     // Reportes Avanzados
  TrendingUp as TrendUpIcon,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Download,
  Plus,
  Settings
} from 'lucide-react'

// Importar componentes de cada sección
import SalesPanel from './sections/SalesPanel'
import OrdersTransactions from './sections/OrdersTransactions'
import PaymentMethods from './sections/PaymentMethods'
import BillingMexico from './sections/BillingMexico'
import CouponsPromotions from './sections/CouponsPromotions'
import BundlesPackages from './sections/BundlesPackages'
import SubscriptionsMemberships from './sections/SubscriptionsMemberships'
import CustomersManagement from './sections/CustomersManagement'
import ConversionAnalytics from './sections/ConversionAnalytics'
import NotificationsAlerts from './sections/NotificationsAlerts'
import AdvancedReports from './sections/AdvancedReports'

// ========================================
// COMPONENTE PRINCIPAL - EcommerceModule
// ========================================

const EcommerceModule = () => {
  const [activeSection, setActiveSection] = useState('sales')

  // Configuración de secciones según el diagrama + funcionalidades adicionales
  const sections = [
    {
      id: 'sales',
      label: 'Panel de Ventas',
      icon: BarChart3,
      priority: 'CORE',
      component: SalesPanel
    },
    {
      id: 'orders',
      label: 'Pedidos y Transacciones',
      icon: ShoppingCart,
      priority: 'CORE',
      component: OrdersTransactions
    },
    {
      id: 'customers',
      label: 'Gestión de Clientes',
      icon: Users,
      priority: 'CORE',
      component: CustomersManagement
    },
    {
      id: 'conversion',
      label: 'Análisis de Conversión',
      icon: TrendingUp,
      priority: 'CORE',
      component: ConversionAnalytics
    },
    {
      id: 'payments',
      label: 'Métodos de Pago',
      icon: CreditCard,
      priority: 'CORE',
      component: PaymentMethods
    },
    {
      id: 'billing',
      label: 'Facturación (México)',
      icon: FileText,
      priority: 'CORE',
      component: BillingMexico
    },
    {
      id: 'coupons',
      label: 'Cupones y Promociones',
      icon: Ticket,
      priority: 'SECOND',
      component: CouponsPromotions
    },
    {
      id: 'bundles',
      label: 'Bundles y Paquetes',
      icon: Package,
      priority: 'SECOND',
      component: BundlesPackages
    },
    {
      id: 'subscriptions',
      label: 'Suscripciones y Membresías',
      icon: Repeat,
      priority: 'CORE',
      component: SubscriptionsMemberships
    },
    {
      id: 'notifications',
      label: 'Notificaciones y Alertas',
      icon: Bell,
      priority: 'CORE',
      component: NotificationsAlerts
    },
    {
      id: 'reports',
      label: 'Reportes Avanzados',
      icon: FileBarChart,
      priority: 'SECOND',
      component: AdvancedReports
    }
  ]

  const activeSectionData = sections.find(s => s.id === activeSection)
  const ActiveComponent = activeSectionData?.component

  return (
    <div className="p-3 sm:p-4 md:p-6 min-h-screen relative overflow-x-hidden w-full" style={{background: '#1e081d', maxWidth: '100vw'}}>
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#e9d1e6]/15 via-transparent to-[#d0008b]/25 pointer-events-none"></div>
      {/* Puntos decorativos */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full blur-sm"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400/20 rounded-full blur-sm"></div>
      <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-300/25 rounded-full blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-full overflow-x-hidden" style={{maxWidth: '100%'}}>
        {/* Encabezado mejorado */}
        <div className="mb-8 relative">
          <div className="inline-block">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 mb-2 drop-shadow-lg animate-gradient">
              🛒 E-commerce y Ventas
            </h1>
            <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full w-full"></div>
          </div>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mt-3 drop-shadow-md">
            Gestión integral de ventas, pagos, facturación y suscripciones
          </p>
        </div>

        {/* Contenedor unificado con tabs horizontales compactos */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full" style={{maxWidth: '100%'}}>
          {/* Tabs horizontales compactos */}
          <div className="border-b border-white/10 overflow-x-auto">
            <nav className="flex overflow-x-auto scrollbar-hide min-w-0">
              {sections.map((section, index) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                const isFirst = index === 0
                const isLast = index === sections.length - 1
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      group relative flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 font-semibold text-sm sm:text-base
                      transition-all duration-300 whitespace-nowrap flex-shrink-0
                      ${isFirst ? 'rounded-tl-2xl' : ''}
                      ${isLast ? 'rounded-tr-2xl' : ''}
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon size={18} className={`flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="relative z-10">{section.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30"></div>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Contenido de la sección activa */}
          <div className="p-4 sm:p-6 w-full overflow-x-hidden min-w-0" style={{maxWidth: '100%'}}>
            <div className="animate-fadeIn w-full overflow-x-hidden" style={{maxWidth: '100%'}}>
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default EcommerceModule
