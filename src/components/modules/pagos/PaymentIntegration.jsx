// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y los hooks useState y useEffect para manejo de estado y efectos del componente
import React, { useState, useEffect } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  CreditCard,     // Icono de tarjeta de crédito para métodos de pago
  DollarSign,     // Icono de dólar para transacciones y dinero
  Shield,         // Icono de escudo para seguridad de pagos
  CheckCircle,    // Icono de check para transacciones exitosas
  AlertCircle,    // Icono de alerta para transacciones fallidas
  Clock,          // Icono de reloj para transacciones pendientes
  TrendingUp,     // Icono de tendencia para crecimiento de ingresos
  Users,          // Icono de usuarios para clientes
  BarChart3,      // Icono de gráfico para analytics financieros
  Settings,       // Icono de configuración para ajustes de pagos
  RefreshCw,      // Icono de actualizar para refrescar datos
  Download,       // Icono de descarga para exportar reportes
  Eye,            // Icono de vista para ver detalles de transacciones
  Edit,           // Icono de editar para modificar configuraciones
  Trash2,         // Icono de eliminar para borrar elementos
  Plus,           // Icono de agregar para crear métodos de pago
  Filter,         // Icono de filtros para ordenar transacciones
  Search,         // Icono de búsqueda para filtrar transacciones
  ChevronDown,    // Icono de flecha abajo para desplegar
  ChevronUp,      // Icono de flecha arriba para contraer
  Zap,            // Icono de rayo para pagos instantáneos
  Crown,          // Icono de corona para planes premium
  Star,           // Icono de estrella para favoritos
  BookOpen,       // Icono de libro para cursos
  Calendar,       // Icono de calendario para fechas
  Bell,           // Icono de campana para notificaciones
  Mail,           // Icono de correo para confirmaciones
  Smartphone      // Icono de móvil para pagos móviles
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - PaymentIntegration
// ========================================

// Define el componente funcional PaymentIntegration que gestiona la integración de pagos
// Incluye funcionalidades para métodos de pago, transacciones, reembolsos y analytics financieros
const PaymentIntegration = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué vista está activa en la interfaz
  // 'overview': resumen, 'transactions': transacciones, 'methods': métodos, 'settings': configuración
  const [activeView, setActiveView] = useState('overview')
  
  // Estados para controlar la visibilidad de modales
  const [showCreateMethod, setShowCreateMethod] = useState(false)           // Modal de crear método de pago
  const [showTransactionDetails, setShowTransactionDetails] = useState(false) // Modal de detalles de transacción
  const [showRefundModal, setShowRefundModal] = useState(false)             // Modal de reembolso
  const [selectedTransaction, setSelectedTransaction] = useState(null)      // Transacción seleccionada
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('')         // Término de búsqueda
  const [statusFilter, setStatusFilter] = useState('all')  // Filtro por estado de transacción
  const [methodFilter, setMethodFilter] = useState('all')  // Filtro por método de pago
  const [dateRange, setDateRange] = useState('30d')        // Rango de fechas para filtros
  
  // ========================================
  // DATOS ESTÁTICOS - Métodos de pago
  // ========================================
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'stripe',
      name: 'Stripe',
      type: 'card',
      status: 'active',
      description: 'Procesamiento de tarjetas de crédito y débito',
      icon: CreditCard,
      color: 'blue',
      config: {
        publicKey: 'pk_live_...',
        secretKey: 'sk_live_...',
        webhookSecret: 'whsec_...',
        currency: 'USD',
        supportedCountries: ['US', 'MX', 'ES', 'AR', 'CO'],
        fees: {
          percentage: 2.9,
          fixed: 0.30
        }
      },
      stats: {
        transactions: 1250,
        volume: 45000,
        successRate: 98.5,
        avgProcessingTime: 2.3
      },
      lastSync: '2024-01-21T10:30:00Z'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'wallet',
      status: 'active',
      description: 'Pagos a través de PayPal y tarjetas',
      icon: Shield,
      color: 'blue',
      config: {
        clientId: 'AeA1QIX...',
        clientSecret: 'ELgRr...',
        sandbox: false,
        currency: 'USD',
        supportedCountries: ['US', 'MX', 'ES', 'AR', 'CO'],
        fees: {
          percentage: 3.4,
          fixed: 0.30
        }
      },
      stats: {
        transactions: 680,
        volume: 25000,
        successRate: 97.2,
        avgProcessingTime: 3.1
      },
      lastSync: '2024-01-21T10:25:00Z'
    },
    {
      id: 'mercadopago',
      name: 'MercadoPago',
      type: 'local',
      status: 'active',
      description: 'Solución de pagos para Latinoamérica',
      icon: DollarSign,
      color: 'green',
      config: {
        accessToken: 'APP_USR_...',
        publicKey: 'APP_USR_...',
        webhookSecret: 'webhook_...',
        currency: 'USD',
        supportedCountries: ['AR', 'BR', 'MX', 'CO', 'CL', 'PE'],
        fees: {
          percentage: 4.9,
          fixed: 0.00
        }
      },
      stats: {
        transactions: 420,
        volume: 18000,
        successRate: 96.8,
        avgProcessingTime: 4.2
      },
      lastSync: '2024-01-21T10:20:00Z'
    }
  ])
  
  // ========================================
  // DATOS DE TRANSACCIONES
  // ========================================
  
  const [transactions, setTransactions] = useState([
    {
      id: 'txn_001',
      userId: 1,
      userName: 'María González',
      userEmail: 'maria@email.com',
      plan: 'intermedio',
      amount: 59.99,
      currency: 'USD',
      method: 'stripe',
      status: 'completed',
      type: 'subscription',
      description: 'Suscripción Plan Intermedio - Febrero 2024',
      createdAt: '2024-01-21T10:30:00Z',
      processedAt: '2024-01-21T10:30:15Z',
      paymentId: 'pi_3O...',
      fees: 2.04,
      netAmount: 57.95,
      country: 'México',
      metadata: {
        courseId: null,
        subscriptionId: 'sub_123',
        trialEnd: null
      }
    },
    {
      id: 'txn_002',
      userId: 2,
      userName: 'Carlos Rodríguez',
      userEmail: 'carlos@email.com',
      plan: 'pro',
      amount: 99.99,
      currency: 'USD',
      method: 'paypal',
      status: 'completed',
      type: 'subscription',
      description: 'Suscripción Plan Pro - Febrero 2024',
      createdAt: '2024-01-21T09:15:00Z',
      processedAt: '2024-01-21T09:15:30Z',
      paymentId: 'PAY-5W...',
      fees: 3.70,
      netAmount: 96.29,
      country: 'España',
      metadata: {
        courseId: null,
        subscriptionId: 'sub_124',
        trialEnd: null
      }
    },
    {
      id: 'txn_003',
      userId: 3,
      userName: 'Ana Martínez',
      userEmail: 'ana@email.com',
      plan: 'lifetime',
      amount: 1999.99,
      currency: 'USD',
      method: 'mercadopago',
      status: 'completed',
      type: 'one_time',
      description: 'Pago Único - Acceso de por Vida',
      createdAt: '2024-01-20T14:45:00Z',
      processedAt: '2024-01-20T14:45:45Z',
      paymentId: 'MP-123...',
      fees: 97.99,
      netAmount: 1902.00,
      country: 'Argentina',
      metadata: {
        courseId: null,
        subscriptionId: null,
        trialEnd: null
      }
    },
    {
      id: 'txn_004',
      userId: 4,
      userName: 'Luis Fernández',
      userEmail: 'luis@email.com',
      plan: 'basico',
      amount: 29.99,
      currency: 'USD',
      method: 'stripe',
      status: 'failed',
      type: 'subscription',
      description: 'Suscripción Plan Básico - Febrero 2024',
      createdAt: '2024-01-20T16:20:00Z',
      processedAt: null,
      paymentId: null,
      fees: 0,
      netAmount: 0,
      country: 'Colombia',
      metadata: {
        courseId: null,
        subscriptionId: 'sub_125',
        trialEnd: null,
        failureReason: 'Insufficient funds'
      }
    },
    {
      id: 'txn_005',
      userId: 5,
      userName: 'Sofia Herrera',
      userEmail: 'sofia@email.com',
      plan: 'intermedio',
      amount: 59.99,
      currency: 'USD',
      method: 'paypal',
      status: 'refunded',
      type: 'subscription',
      description: 'Suscripción Plan Intermedio - Enero 2024 (Reembolsado)',
      createdAt: '2024-01-15T11:30:00Z',
      processedAt: '2024-01-15T11:30:20Z',
      refundedAt: '2024-01-18T09:15:00Z',
      paymentId: 'PAY-4X...',
      fees: 0,
      netAmount: 0,
      country: 'México',
      metadata: {
        courseId: null,
        subscriptionId: 'sub_126',
        trialEnd: null,
        refundReason: 'Customer request'
      }
    }
  ])
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    const colorMap = {
      'completed': 'text-green-400 bg-green-500/20 border border-green-400/30',
      'pending': 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30',
      'failed': 'text-red-400 bg-red-500/20 border border-red-400/30',
      'refunded': 'text-gray-400 bg-gray-500/20 border border-gray-400/30',
      'cancelled': 'text-red-400 bg-red-500/20 border border-red-400/30'
    }
    return colorMap[status] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    const textMap = {
      'completed': 'Completado',
      'pending': 'Pendiente',
      'failed': 'Fallido',
      'refunded': 'Reembolsado',
      'cancelled': 'Cancelado'
    }
    return textMap[status] || 'Desconocido'
  }
  
  // Función para obtener el color del método de pago
  const getMethodColor = (method) => {
    const colorMap = {
      'stripe': 'text-blue-400 bg-blue-500/20 border border-blue-400/30',
      'paypal': 'text-blue-400 bg-blue-500/20 border border-blue-400/30',
      'mercadopago': 'text-green-400 bg-green-500/20 border border-green-400/30'
    }
    return colorMap[method] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para obtener el texto del método de pago
  const getMethodText = (method) => {
    const textMap = {
      'stripe': 'Stripe',
      'paypal': 'PayPal',
      'mercadopago': 'MercadoPago'
    }
    return textMap[method] || 'Desconocido'
  }
  
  // Función para formatear moneda
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }
  
  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
  
  // Componente para tarjetas de métodos de pago
  const PaymentMethodCard = ({ method, index }) => {
    const Icon = method.icon
    
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg hover:bg-white/15 hover:shadow-2xl transition-all duration-300">
        {/* Encabezado */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color === 'blue' ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600'} flex items-center justify-center shadow-lg`}>
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white drop-shadow-sm">{method.name}</h3>
              <p className="text-sm text-white/80">{method.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              method.status === 'active' 
                ? 'text-green-400 bg-green-500/20 border border-green-400/30'
                : 'text-red-400 bg-red-500/20 border border-red-400/30'
            }`}>
              {method.status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
            <button className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>
        
        {/* Configuración */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white/90 mb-2">Configuración:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-white/70">Moneda:</p>
              <p className="text-white font-medium">{method.config.currency}</p>
            </div>
            <div>
              <p className="text-white/70">Países:</p>
              <p className="text-white font-medium">{method.config.supportedCountries.length}</p>
            </div>
            <div>
              <p className="text-white/70">Comisión:</p>
              <p className="text-white font-medium">{method.config.fees.percentage}% + ${method.config.fees.fixed}</p>
            </div>
            <div>
              <p className="text-white/70">Última sincronización:</p>
              <p className="text-white font-medium">{formatDate(method.lastSync)}</p>
            </div>
          </div>
        </div>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{method.stats.transactions.toLocaleString()}</p>
            <p className="text-xs text-white/70">Transacciones</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{formatCurrency(method.stats.volume)}</p>
            <p className="text-xs text-white/70">Volumen</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{method.stats.successRate}%</p>
            <p className="text-xs text-white/70">Tasa de éxito</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{method.stats.avgProcessingTime}s</p>
            <p className="text-xs text-white/70">Tiempo promedio</p>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
            Configurar
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300">
            <Eye size={16} />
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    )
  }
  
  // Componente para la vista de resumen
  const OverviewView = () => (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">Integración de Pagos</h2>
        <p className="text-white/80 drop-shadow-md">Gestiona métodos de pago y transacciones</p>
      </div>
      
      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos Totales"
          value={formatCurrency(transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0))}
          change={12.5}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Transacciones"
          value={transactions.length.toLocaleString()}
          change={8.3}
          icon={CreditCard}
          color="blue"
        />
        <StatCard
          title="Tasa de Éxito"
          value={`${((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100).toFixed(1)}%`}
          change={2.1}
          icon={CheckCircle}
          color="purple"
        />
        <StatCard
          title="Métodos Activos"
          value={paymentMethods.filter(m => m.status === 'active').length}
          change={0}
          icon={Shield}
          color="yellow"
        />
      </div>
      
      {/* Métodos de pago */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-sm">Métodos de Pago</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method, index) => (
            <PaymentMethodCard key={method.id} method={method} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
  
  // Componente para la vista de transacciones
  const TransactionsView = () => (
    <div className="space-y-6">
      {/* Encabezado con filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar transacciones por usuario o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          <option value="all" className="bg-gray-800">Todos los estados</option>
          <option value="completed" className="bg-gray-800">Completadas</option>
          <option value="pending" className="bg-gray-800">Pendientes</option>
          <option value="failed" className="bg-gray-800">Fallidas</option>
          <option value="refunded" className="bg-gray-800">Reembolsadas</option>
        </select>
        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          <option value="all" className="bg-gray-800">Todos los métodos</option>
          <option value="stripe" className="bg-gray-800">Stripe</option>
          <option value="paypal" className="bg-gray-800">PayPal</option>
          <option value="mercadopago" className="bg-gray-800">MercadoPago</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        >
          <option value="7d" className="bg-gray-800">Últimos 7 días</option>
          <option value="30d" className="bg-gray-800">Últimos 30 días</option>
          <option value="90d" className="bg-gray-800">Últimos 90 días</option>
          <option value="1y" className="bg-gray-800">Último año</option>
        </select>
      </div>
      
      {/* Lista de transacciones */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Usuario</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Método</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{transaction.userName}</div>
                      <div className="text-sm text-white/70">{transaction.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-400/30">
                      {transaction.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{formatCurrency(transaction.amount, transaction.currency)}</div>
                      <div className="text-xs text-white/70">Neto: {formatCurrency(transaction.netAmount, transaction.currency)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(transaction.method)}`}>
                      {getMethodText(transaction.method)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/80">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      {transaction.status === 'completed' && (
                        <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                          <RefreshCw size={16} />
                        </button>
                      )}
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
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Integración de Pagos</h1>
          <p className="text-white/80 drop-shadow-md">Stripe, PayPal y MercadoPago integrados</p>
        </div>
        
        {/* Navegación por pestañas */}
        <div className="border-b border-white/20">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Resumen', icon: BarChart3 },
              { id: 'transactions', label: 'Transacciones', icon: CreditCard },
              { id: 'methods', label: 'Métodos', icon: Shield },
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
          {activeView === 'overview' && <OverviewView />}
          {activeView === 'transactions' && <TransactionsView />}
          {activeView === 'methods' && <div className="text-white">Métodos (Próximamente)</div>}
          {activeView === 'settings' && <div className="text-white">Configuración (Próximamente)</div>}
        </div>
      </div>
    </div>
  )
}

export default PaymentIntegration
