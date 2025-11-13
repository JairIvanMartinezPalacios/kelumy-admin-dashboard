// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  ShoppingCart,     // Icono de carrito para órdenes y ventas
  DollarSign,       // Icono de dinero para ingresos y precios
  TrendingUp,       // Icono de tendencia para crecimiento de ventas
  Package,          // Icono de paquete para productos y inventario
  Users,            // Icono de usuarios para clientes
  CreditCard,       // Icono de tarjeta para pagos
  BarChart3,        // Icono de gráfico para analytics y reportes
  Plus,             // Icono de agregar para crear nuevos elementos
  Search,           // Icono de búsqueda para filtrar contenido
  Filter,           // Icono de filtros para ordenar y filtrar
  Eye,              // Icono de vista para ver detalles
  Edit,             // Icono de editar para modificar elementos
  Trash2,           // Icono de eliminar para borrar elementos
  Download,         // Icono de descargar para exportar datos
  Calendar,         // Icono de calendario para fechas y programación
  CheckCircle,      // Icono de completado para órdenes finalizadas
  Clock,            // Icono de pendiente para órdenes en proceso
  AlertCircle,      // Icono de error para problemas y alertas
  RefreshCw,        // Icono de actualizar para refrescar datos
  MoreVertical      // Icono de más opciones para menús contextuales
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - EcommerceManagement
// ========================================

// Define el componente funcional EcommerceManagement que gestiona todas las operaciones de comercio electrónico
// Incluye gestión de órdenes, productos, inventario, pagos y analytics de ventas
const EcommerceManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué subsección está activa en la interfaz
  // 'orders': órdenes, 'products': productos, 'inventory': inventario, 'payments': pagos, 'analytics': analytics
  const [activeTab, setActiveTab] = useState('orders')
  
  // Estados para funcionalidad de búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('')           // Término de búsqueda por nombre, ID o cliente
  const [statusFilter, setStatusFilter] = useState('all')     // Filtro por estado: 'all', 'pending', 'completed', 'cancelled'
  const [dateFilter, setDateFilter] = useState('all')        // Filtro por fecha: 'all', 'today', 'week', 'month', 'custom'
  
  // ========================================
  // DATOS DE EJEMPLO - Datos de e-commerce
  // ========================================
  
  const orders = [
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      email: 'juan.perez@email.com',
      products: ['Curso React', 'Curso JavaScript'],
      total: 598,
      status: 'completed',
      paymentMethod: 'Tarjeta de Crédito',
      date: '2024-01-20',
      shippingAddress: 'Ciudad de México, México'
    },
    {
      id: 'ORD-002',
      customer: 'María García',
      email: 'maria.garcia@email.com',
      products: ['Curso Node.js'],
      total: 299,
      status: 'pending',
      paymentMethod: 'PayPal',
      date: '2024-01-19',
      shippingAddress: 'Madrid, España'
    },
    {
      id: 'ORD-003',
      customer: 'Carlos López',
      email: 'carlos.lopez@email.com',
      products: ['Bundle Frontend Completo'],
      total: 799,
      status: 'processing',
      paymentMethod: 'Transferencia',
      date: '2024-01-18',
      shippingAddress: 'Buenos Aires, Argentina'
    }
  ]
  
  const products = [
    {
      id: 1,
      name: 'Curso de React',
      price: 299,
      category: 'Programación',
      stock: 100,
      sales: 450,
      status: 'active',
      image: '/images/react-course.jpg'
    },
    {
      id: 2,
      name: 'Curso de JavaScript',
      price: 199,
      category: 'Programación',
      stock: 150,
      sales: 320,
      status: 'active',
      image: '/images/javascript-course.jpg'
    },
    {
      id: 3,
      name: 'Bundle Frontend Completo',
      price: 799,
      category: 'Bundle',
      stock: 50,
      sales: 120,
      status: 'active',
      image: '/images/frontend-bundle.jpg'
    }
  ]
  
  const analytics = {
    totalRevenue: 125000,
    monthlyRevenue: 25000,
    totalOrders: 1250,
    averageOrderValue: 100,
    conversionRate: 3.2,
    topProducts: [
      { name: 'Curso React', sales: 450, revenue: 134550 },
      { name: 'Bundle Frontend', sales: 120, revenue: 95880 },
      { name: 'Curso JavaScript', sales: 320, revenue: 63680 }
    ]
  }
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado'
      case 'pending': return 'Pendiente'
      case 'processing': return 'Procesando'
      case 'cancelled': return 'Cancelado'
      case 'active': return 'Activo'
      case 'inactive': return 'Inactivo'
      default: return 'Desconocido'
    }
  }
  
  // Función para obtener el icono del estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'pending': return Clock
      case 'processing': return RefreshCw
      case 'cancelled': return AlertCircle
      case 'active': return CheckCircle
      case 'inactive': return XCircle
      default: return Clock
    }
  }
  
  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para la lista de pedidos
  const OrdersList = () => {
    const filteredOrders = orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    
    return (
      <div className="space-y-4">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="completed">Completados</option>
            <option value="pending">Pendientes</option>
            <option value="processing">Procesando</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>
        
        {/* Lista de pedidos */}
        <div className="grid gap-4">
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status)
            
            return (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <StatusIcon size={12} className="inline mr-1" />
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><strong>Cliente:</strong> {order.customer}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Método de pago:</strong> {order.paymentMethod}</p>
                      </div>
                      <div>
                        <p><strong>Productos:</strong> {order.products.join(', ')}</p>
                        <p><strong>Total:</strong> {formatCurrency(order.total)}</p>
                        <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  // Componente para la lista de productos
  const ProductsList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Productos</h3>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Agregar Producto
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-lg font-bold text-primary-600">{formatCurrency(product.price)}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>Stock: {product.stock} unidades</p>
              <p>Ventas: {product.sales}</p>
              <p>Estado: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                {getStatusText(product.status)}
              </span></p>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                <Edit size={14} />
                Editar
              </button>
              <button className="btn-secondary text-sm py-2 px-3">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
  // Componente para analíticas
  const AnalyticsView = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analytics.totalRevenue)}</p>
            </div>
            <DollarSign size={24} className="text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pedidos Totales</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.totalOrders}</p>
            </div>
            <ShoppingCart size={24} className="text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analytics.averageOrderValue)}</p>
            </div>
            <TrendingUp size={24} className="text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa de Conversión</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.conversionRate}%</p>
            </div>
            <BarChart3 size={24} className="text-orange-600" />
          </div>
        </div>
      </div>
      
      {/* Productos más vendidos */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Más Vendidos</h3>
        <div className="space-y-4">
          {analytics.topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.sales} ventas</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                <p className="text-sm text-gray-600">Ingresos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  
  // ========================================
  // CONFIGURACIÓN DE PESTAÑAS - Navegación
  // ========================================
  
  const tabs = [
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'analytics', label: 'Analíticas', icon: BarChart3 }
  ]
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">E-commerce y Ventas</h1>
        <p className="text-gray-600">Gestiona pedidos, productos y analíticas de ventas</p>
      </div>
      
      {/* Navegación por pestañas */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* Contenido de las pestañas */}
      <div className="min-h-96">
        {activeTab === 'orders' && <OrdersList />}
        {activeTab === 'products' && <ProductsList />}
        {activeTab === 'analytics' && <AnalyticsView />}
      </div>
    </div>
  )
}

export default EcommerceManagement
