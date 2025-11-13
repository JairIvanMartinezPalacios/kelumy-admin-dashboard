// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y los hooks useState, useEffect y useMemo para manejo de estado, efectos y memoización
import React, { useState, useEffect, useMemo } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Crown,          // Icono de corona para planes premium
  Star,           // Icono de estrella para planes destacados
  Zap,            // Icono de rayo para planes rápidos
  CheckCircle,    // Icono de check para características incluidas
  X,              // Icono de X para características no incluidas
  CreditCard,     // Icono de tarjeta de crédito para pagos
  Calendar,       // Icono de calendario para facturación
  Users,          // Icono de usuarios para suscriptores
  BookOpen,       // Icono de libro para cursos incluidos
  Award,          // Icono de premio para certificaciones
  Shield,         // Icono de escudo para seguridad
  Clock,          // Icono de reloj para duración de plan
  DollarSign,     // Icono de dólar para precios
  TrendingUp,     // Icono de tendencia para crecimiento
  Settings,       // Icono de configuración para ajustes
  Plus,           // Icono de agregar para crear planes
  Edit,           // Icono de editar para modificar planes
  Trash2,         // Icono de eliminar para borrar planes
  Eye,            // Icono de vista para ver detalles
  BarChart3,      // Icono de gráfico para analytics
  Download,       // Icono de descarga para exportar reportes
  RefreshCw,      // Icono de actualizar para refrescar datos
  Filter,         // Icono de filtros para ordenar planes
  ChevronDown,    // Icono de flecha abajo para desplegar
  ChevronUp,      // Icono de flecha arriba para contraer
  AlertCircle,    // Icono de alerta para problemas
  Info,           // Icono de información para detalles
  Gift,           // Icono de regalo para promociones
  Sparkles        // Icono de brillos para características especiales
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - SubscriptionManagement
// ========================================

// Define el componente funcional SubscriptionManagement que gestiona planes de suscripción
// Incluye funcionalidades para planes, usuarios, analytics y configuración de suscripciones
const SubscriptionManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué vista está activa en la interfaz
  // 'plans': planes, 'users': usuarios, 'analytics': analytics, 'settings': configuración
  const [activeView, setActiveView] = useState('plans')
  
  // Estados para controlar la visibilidad de modales
  const [showCreatePlan, setShowCreatePlan] = useState(false)        // Modal de crear plan
  const [showEditPlan, setShowEditPlan] = useState(false)           // Modal de editar plan
  const [showUserDetails, setShowUserDetails] = useState(false)     // Modal de detalles de usuario
  const [editingPlan, setEditingPlan] = useState(null)              // Plan en edición
  const [selectedUser, setSelectedUser] = useState(null)           // Usuario seleccionado
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('')         // Término de búsqueda
  const [statusFilter, setStatusFilter] = useState('all')  // Filtro por estado de suscripción
  const [planFilter, setPlanFilter] = useState('all')      // Filtro por tipo de plan
  
  // Estado para estadísticas del sistema de suscripciones
  const [stats, setStats] = useState({
    totalSubscribers: 1250,    // Total de suscriptores activos
    monthlyRevenue: 45000,     // Ingresos mensuales en USD
    activePlans: 4,           // Número de planes activos
    conversionRate: 12.5      // Tasa de conversión en porcentaje
  })
  
  // ========================================
  // DATOS ESTÁTICOS - Planes de suscripción
  // ========================================
  
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 'basico',
      name: 'Plan Básico',
      description: 'Perfecto para comenzar tu aprendizaje',
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      period: 'monthly', // 'monthly', 'yearly', 'lifetime'
      yearlyPrice: 299.99,
      yearlyDiscount: 17,
      features: [
        'Acceso a 5 cursos del catálogo',
        'Contenido en video HD',
        'Acceso a la comunidad básica',
        'Soporte por email',
        'Certificados digitales básicos',
        'Acceso móvil incluido'
      ],
      restrictions: {
        maxCourses: 5,
        hasCertificates: true,
        hasCommunityAccess: true,
        hasPrioritySupport: false,
        hasEarlyAccess: false,
        hasAdvancedAnalytics: false
      },
      isActive: true,
      subscribers: 450,
      revenue: 13500,
      color: 'blue',
      icon: BookOpen,
      popular: false
    },
    {
      id: 'intermedio',
      name: 'Plan Intermedio',
      description: 'Para estudiantes comprometidos con su crecimiento',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      period: 'monthly',
      yearlyPrice: 599.99,
      yearlyDiscount: 17,
      features: [
        'Acceso a 15 cursos del catálogo',
        'Contenido en video 4K',
        'Acceso a la comunidad completa',
        'Soporte prioritario 24/7',
        'Certificados digitales avanzados',
        'Acceso a webinars exclusivos',
        'Materiales descargables',
        'Progreso detallado'
      ],
      restrictions: {
        maxCourses: 15,
        hasCertificates: true,
        hasCommunityAccess: true,
        hasPrioritySupport: true,
        hasEarlyAccess: true,
        hasAdvancedAnalytics: true
      },
      isActive: true,
      subscribers: 680,
      revenue: 40800,
      color: 'purple',
      icon: Star,
      popular: true
    },
    {
      id: 'pro',
      name: 'Plan Pro',
      description: 'La experiencia completa de aprendizaje',
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      period: 'monthly',
      yearlyPrice: 999.99,
      yearlyDiscount: 17,
      features: [
        'Acceso ilimitado a TODOS los cursos',
        'Contenido en video 4K + audio premium',
        'Acceso VIP a la comunidad',
        'Soporte personalizado 24/7',
        'Certificados digitales premium',
        'Acceso inmediato a nuevos cursos',
        'Mentorías 1:1 mensuales',
        'Materiales exclusivos',
        'Analíticas avanzadas',
        'API de integración'
      ],
      restrictions: {
        maxCourses: -1, // -1 = ilimitado
        hasCertificates: true,
        hasCommunityAccess: true,
        hasPrioritySupport: true,
        hasEarlyAccess: true,
        hasAdvancedAnalytics: true
      },
      isActive: true,
      subscribers: 120,
      revenue: 12000,
      color: 'gold',
      icon: Crown,
      popular: false
    },
    {
      id: 'lifetime',
      name: 'Pago Único - Acceso de por Vida',
      description: 'Una sola vez, acceso para siempre',
      price: 1999.99,
      originalPrice: 2999.99,
      discount: 33,
      period: 'lifetime',
      yearlyPrice: null,
      yearlyDiscount: null,
      features: [
        'Acceso ilimitado a TODOS los cursos',
        'Contenido en video 4K + audio premium',
        'Acceso VIP a la comunidad',
        'Soporte personalizado de por vida',
        'Certificados digitales premium',
        'Acceso inmediato a nuevos cursos',
        'Mentorías 1:1 ilimitadas',
        'Materiales exclusivos',
        'Analíticas avanzadas',
        'API de integración',
        'Sin renovaciones, sin sorpresas'
      ],
      restrictions: {
        maxCourses: -1,
        hasCertificates: true,
        hasCommunityAccess: true,
        hasPrioritySupport: true,
        hasEarlyAccess: true,
        hasAdvancedAnalytics: true
      },
      isActive: true,
      subscribers: 45,
      revenue: 89995,
      color: 'emerald',
      icon: Gift,
      popular: false
    }
  ])
  
  // ========================================
  // DATOS DE USUARIOS SUSCRIPTORES
  // ========================================
  
  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      name: 'María González',
      email: 'maria@email.com',
      plan: 'intermedio',
      status: 'active',
      startDate: '2024-01-15',
      nextBilling: '2024-02-15',
      totalSpent: 359.94,
      coursesCompleted: 8,
      lastActivity: '2024-01-20',
      paymentMethod: 'stripe',
      country: 'México'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      plan: 'pro',
      status: 'active',
      startDate: '2023-11-10',
      nextBilling: '2024-02-10',
      totalSpent: 1199.88,
      coursesCompleted: 15,
      lastActivity: '2024-01-21',
      paymentMethod: 'paypal',
      country: 'España'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana@email.com',
      plan: 'basico',
      status: 'cancelled',
      startDate: '2023-12-01',
      nextBilling: null,
      totalSpent: 29.99,
      coursesCompleted: 3,
      lastActivity: '2024-01-10',
      paymentMethod: 'mercadopago',
      country: 'Argentina'
    },
    {
      id: 4,
      name: 'Luis Fernández',
      email: 'luis@email.com',
      plan: 'lifetime',
      status: 'active',
      startDate: '2023-09-05',
      nextBilling: null,
      totalSpent: 1999.99,
      coursesCompleted: 22,
      lastActivity: '2024-01-21',
      paymentMethod: 'stripe',
      country: 'Colombia'
    }
  ])
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para obtener el color del plan
  const getPlanColor = (planId) => {
    const plan = subscriptionPlans.find(p => p.id === planId)
    const colorMap = {
      'blue': 'from-blue-500 to-blue-600',
      'purple': 'from-purple-500 to-purple-600',
      'gold': 'from-yellow-500 to-orange-500',
      'emerald': 'from-emerald-500 to-green-600'
    }
    return colorMap[plan?.color] || 'from-gray-500 to-gray-600'
  }
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    const colorMap = {
      'active': 'text-green-400 bg-green-500/20 border border-green-400/30',
      'cancelled': 'text-red-400 bg-red-500/20 border border-red-400/30',
      'paused': 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30',
      'expired': 'text-gray-400 bg-gray-500/20 border border-gray-400/30'
    }
    return colorMap[status] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    const textMap = {
      'active': 'Activo',
      'cancelled': 'Cancelado',
      'paused': 'Pausado',
      'expired': 'Expirado'
    }
    return textMap[status] || 'Desconocido'
  }
  
  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para tarjetas de estadísticas
  const StatCard = ({ title, value, change, icon: Icon, color = 'purple' }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-2xl font-semibold text-white mt-1 drop-shadow-sm">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20 border border-${color}-400/30`}>
          <Icon size={24} className={`text-${color}-400`} />
        </div>
      </div>
    </div>
  )
  
  // Componente para tarjetas de planes
  const PlanCard = ({ plan, index }) => {
    const Icon = plan.icon
    const isPopular = plan.popular
    
    return (
      <div className={`relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-lg hover:bg-white/15 hover:shadow-2xl transition-all duration-300 ${isPopular ? 'ring-2 ring-purple-400/50' : ''}`}>
        {/* Badge de popular */}
        {isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
              Más Popular
            </div>
          </div>
        )}
        
        {/* Icono y nombre */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${getPlanColor(plan.id)} flex items-center justify-center mb-4 shadow-lg`}>
            <Icon size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-sm">{plan.name}</h3>
          <p className="text-white/80 drop-shadow-sm">{plan.description}</p>
        </div>
        
        {/* Precio */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold text-white drop-shadow-sm">
              {formatCurrency(plan.price)}
            </span>
            <span className="text-white/60">/mes</span>
          </div>
          {plan.originalPrice && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-white/60 line-through">
                {formatCurrency(plan.originalPrice)}
              </span>
              <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm border border-red-500/30">
                -{plan.discount}%
              </span>
            </div>
          )}
          {plan.yearlyPrice && (
            <p className="text-sm text-white/70 mt-2">
              Anual: {formatCurrency(plan.yearlyPrice)} (Ahorra {plan.yearlyDiscount}%)
            </p>
          )}
        </div>
        
        {/* Características */}
        <div className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/90 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-center">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-2xl font-bold text-white">{plan.subscribers}</p>
            <p className="text-xs text-white/70">Suscriptores</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-2xl font-bold text-white">{formatCurrency(plan.revenue)}</p>
            <p className="text-xs text-white/70">Ingresos</p>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
            Editar Plan
          </button>
          <button className="px-4 py-3 bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300">
            <Eye size={18} />
          </button>
          <button className="px-4 py-3 bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300">
            <BarChart3 size={18} />
          </button>
        </div>
      </div>
    )
  }
  
  // Componente para la vista de planes
  const PlansView = () => (
    <div className="space-y-6">
      {/* Encabezado con botón de crear */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Planes de Suscripción</h2>
          <p className="text-white/80 drop-shadow-md">Gestiona los planes disponibles para tus usuarios</p>
        </div>
        <button
          onClick={() => setShowCreatePlan(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center gap-2"
        >
          <Plus size={20} />
          Crear Nuevo Plan
        </button>
      </div>
      
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Suscriptores"
          value={stats.totalSubscribers.toLocaleString()}
          change={8.3}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Ingresos Mensuales"
          value={formatCurrency(stats.monthlyRevenue)}
          change={15.2}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Planes Activos"
          value={stats.activePlans}
          change={0}
          icon={Crown}
          color="purple"
        />
        <StatCard
          title="Tasa de Conversión"
          value={`${stats.conversionRate}%`}
          change={2.1}
          icon={TrendingUp}
          color="yellow"
        />
      </div>
      
      {/* Lista de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {subscriptionPlans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>
    </div>
  )
  
  // Componente para la vista de usuarios
  const UsersView = () => (
    <div className="space-y-6">
      {/* Encabezado con filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar usuarios por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
          />
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          <option value="all" className="bg-gray-800">Todos los estados</option>
          <option value="active" className="bg-gray-800">Activos</option>
          <option value="cancelled" className="bg-gray-800">Cancelados</option>
          <option value="paused" className="bg-gray-800">Pausados</option>
        </select>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          <option value="all" className="bg-gray-800">Todos los planes</option>
          <option value="basico" className="bg-gray-800">Básico</option>
          <option value="intermedio" className="bg-gray-800">Intermedio</option>
          <option value="pro" className="bg-gray-800">Pro</option>
          <option value="lifetime" className="bg-gray-800">Lifetime</option>
        </select>
      </div>
      
      {/* Lista de usuarios */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Usuario</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Próximo Pago</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Total Gastado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {subscribers.map((user) => {
                const plan = subscriptionPlans.find(p => p.id === user.plan)
                return (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-white/70">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(user.plan)} text-white`}>
                        {plan?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/80">
                      {user.nextBilling ? formatDate(user.nextBilling) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/80">
                      {formatCurrency(user.totalSpent)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="space-y-6 min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#e9d1e6]/15 via-transparent to-[#d0008b]/25"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#a82ba0]/20 via-transparent to-[#e9d1e6]/10"></div>
      
      {/* Partículas flotantes */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400/40 rounded-full kelumy-float"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-pink-400/50 rounded-full kelumy-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-300/60 rounded-full kelumy-float delay-2000"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-300/45 rounded-full kelumy-pulse delay-500"></div>
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-500/50 rounded-full kelumy-float delay-700"></div>
      <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-pink-500/40 rounded-full kelumy-pulse delay-300"></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-purple-400/55 rounded-full kelumy-float delay-1200"></div>
      <div className="absolute bottom-1/3 right-10 w-4 h-4 bg-pink-400/45 rounded-full kelumy-pulse delay-800"></div>
      
      <div className="relative z-10 p-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Gestión de Suscripciones</h1>
          <p className="text-white/80 drop-shadow-md">Administra planes, usuarios y pagos de la plataforma</p>
        </div>
        
        {/* Navegación por pestañas */}
        <div className="border-b border-white/20">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'plans', label: 'Planes', icon: Crown },
              { id: 'users', label: 'Usuarios', icon: Users },
              { id: 'analytics', label: 'Analíticas', icon: BarChart3 },
              { id: 'settings', label: 'Configuración', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeView === tab.id
                      ? 'border-purple-500 text-white drop-shadow-sm'
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
        
        {/* Contenido de las pestañas */}
        <div className="min-h-96">
          {activeView === 'plans' && <PlansView />}
          {activeView === 'users' && <UsersView />}
          {activeView === 'analytics' && <div className="text-white">Analíticas (Próximamente)</div>}
          {activeView === 'settings' && <div className="text-white">Configuración (Próximamente)</div>}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionManagement
