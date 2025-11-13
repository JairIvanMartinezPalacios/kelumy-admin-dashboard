// ========================================
// PEDIDOS Y TRANSACCIONES - Gestión completa
// ========================================

import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Filter,
  Eye,
  Download,
  Mail,
  MessageCircle,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  FileText,
  User,
  Calendar,
  DollarSign,
  CreditCard,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const OrdersTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const itemsPerPage = 20

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Estados de pedidos según el diagrama
  const orders = [
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+52 55 1234 5678',
      courses: [
        { title: 'Curso React Avanzado', price: 299 },
        { title: 'Curso JavaScript ES6+', price: 199 }
      ],
      total: 498,
      status: 'pagado',
      paymentMethod: 'Stripe - Tarjeta',
      date: '2024-01-20T10:30:00',
      transactionId: 'txn_123456789',
      history: [
        { status: 'creado', date: '2024-01-20T10:30:00' },
        { status: 'pagado', date: '2024-01-20T10:31:15' }
      ]
    },
    {
      id: 'ORD-002',
      customer: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+52 55 9876 5432',
      courses: [
        { title: 'Curso Node.js', price: 349 }
      ],
      total: 349,
      status: 'pendiente',
      paymentMethod: 'PayPal',
      date: '2024-01-19T14:20:00',
      transactionId: 'txn_987654321',
      history: [
        { status: 'creado', date: '2024-01-19T14:20:00' },
        { status: 'pendiente', date: '2024-01-19T14:20:30' }
      ]
    },
    {
      id: 'ORD-003',
      customer: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+52 55 5555 1234',
      courses: [
        { title: 'Bundle Frontend Completo', price: 799 }
      ],
      total: 799,
      status: 'cancelado',
      paymentMethod: 'MercadoPago',
      date: '2024-01-18T09:15:00',
      transactionId: 'txn_456789123',
      history: [
        { status: 'creado', date: '2024-01-18T09:15:00' },
        { status: 'cancelado', date: '2024-01-18T09:45:00' }
      ]
    },
    {
      id: 'ORD-004',
      customer: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+52 55 4444 5678',
      courses: [
        { title: 'Curso Vue.js', price: 249 },
        { title: 'Curso TypeScript', price: 299 }
      ],
      total: 548,
      status: 'reembolsado',
      paymentMethod: 'OXXO Pay',
      date: '2024-01-17T16:00:00',
      transactionId: 'txn_789123456',
      history: [
        { status: 'creado', date: '2024-01-17T16:00:00' },
        { status: 'pagado', date: '2024-01-17T16:30:00' },
        { status: 'reembolsado', date: '2024-01-18T10:00:00' }
      ]
    },
    {
      id: 'ORD-005',
      customer: 'Pedro Sánchez',
      email: 'pedro.sanchez@email.com',
      phone: '+52 55 3333 9876',
      courses: [
        { title: 'Curso Python', price: 399 }
      ],
      total: 399,
      status: 'en_proceso',
      paymentMethod: 'Stripe - Tarjeta',
      date: '2024-01-20T11:00:00',
      transactionId: 'txn_321654987',
      history: [
        { status: 'creado', date: '2024-01-20T11:00:00' },
        { status: 'en_proceso', date: '2024-01-20T11:01:00' }
      ]
    }
  ]

  const getStatusInfo = (status) => {
    const statusMap = {
      pagado: { 
        icon: CheckCircle, 
        color: 'text-green-400 bg-green-500/20 border-green-500/30',
        label: 'Pagado',
        description: 'Transacción completada exitosamente'
      },
      pendiente: { 
        icon: Clock, 
        color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
        label: 'Pendiente',
        description: 'Esperando confirmación de pago'
      },
      cancelado: { 
        icon: XCircle, 
        color: 'text-red-400 bg-red-500/20 border-red-500/30',
        label: 'Cancelado',
        description: 'Pedido cancelado por usuario'
      },
      reembolsado: { 
        icon: RefreshCw, 
        color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
        label: 'Reembolsado',
        description: 'Dinero devuelto al cliente'
      },
      en_proceso: { 
        icon: RefreshCw, 
        color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
        label: 'En Proceso',
        description: 'Procesando el pago'
      }
    }
    return statusMap[status] || statusMap.pendiente
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Función para ordenar
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1) // Resetear a primera página al cambiar ordenamiento
  }

  // Filtrar, ordenar y paginar pedidos
  const { filteredAndSortedOrders, totalPages, totalFiltered } = useMemo(() => {
    // Filtrar
    let filtered = orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    const totalFiltered = filtered.length

    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue
      
      switch (sortField) {
        case 'date':
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
          break
        case 'total':
          aValue = a.total
          bValue = b.total
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'customer':
          aValue = a.customer.toLowerCase()
          bValue = b.customer.toLowerCase()
          break
        default:
          aValue = a.id
          bValue = b.id
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    // Paginar
    const totalPages = Math.ceil(totalFiltered / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage)

    return { filteredAndSortedOrders: paginated, totalPages, totalFiltered }
  }, [orders, searchTerm, statusFilter, sortField, sortDirection, currentPage, itemsPerPage])

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
            transform: scale(0.95);
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
        
        .order-card {
          animation-delay: calc(var(--index) * 0.05s);
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-4px) scale(1.01);
        }
      `}</style>

      {/* Barra de búsqueda y filtros */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInUp' : ''}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar por ID, email, cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all" className="bg-gray-800">Todos los Estados</option>
            <option value="pagado" className="bg-gray-800">Pagado</option>
            <option value="pendiente" className="bg-gray-800">Pendiente</option>
            <option value="en_proceso" className="bg-gray-800">En Proceso</option>
            <option value="cancelado" className="bg-gray-800">Cancelado</option>
            <option value="reembolsado" className="bg-gray-800">Reembolsado</option>
          </select>

          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Encabezados de ordenamiento */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/70">
          <button
            onClick={() => handleSort('date')}
            className="flex items-center gap-2 hover:text-white transition-colors text-left"
          >
            <span>Fecha</span>
            {sortField === 'date' && (
              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
          <button
            onClick={() => handleSort('customer')}
            className="flex items-center gap-2 hover:text-white transition-colors text-left"
          >
            <span>Cliente</span>
            {sortField === 'customer' && (
              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
          <button
            onClick={() => handleSort('total')}
            className="flex items-center gap-2 hover:text-white transition-colors text-left"
          >
            <span>Monto</span>
            {sortField === 'total' && (
              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
          <button
            onClick={() => handleSort('status')}
            className="flex items-center gap-2 hover:text-white transition-colors text-left"
          >
            <span>Estado</span>
            {sortField === 'status' && (
              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Listado de Pedidos */}
      <div className="space-y-4">
        {filteredAndSortedOrders.map((order, index) => {
          const statusInfo = getStatusInfo(order.status)
          const StatusIcon = statusInfo.icon

          return (
            <div
              key={order.id}
              className={`bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 card-hover-effect order-card ${isVisible ? 'animate-slideInRight' : ''}`}
              style={{ '--index': index }}
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Información Principal */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">{order.id}</h3>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 ${statusInfo.color}`}>
                          <StatusIcon size={14} />
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">{statusInfo.description}</p>
                    </div>
                  </div>

                  {/* Información del Cliente */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/80">
                        <User size={16} />
                        <span className="text-sm"><strong>Cliente:</strong> {order.customer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Mail size={16} />
                        <span className="text-sm">{order.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="text-sm">{order.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/80">
                        <DollarSign size={16} />
                        <span className="text-sm"><strong>Total:</strong> {formatCurrency(order.total)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <CreditCard size={16} />
                        <span className="text-sm"><strong>Método:</strong> {order.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Calendar size={16} />
                        <span className="text-sm">{formatDate(order.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cursos Incluidos */}
                  <div className="mb-4">
                    <p className="text-white/80 text-sm font-medium mb-2">Cursos Incluidos:</p>
                    <div className="space-y-1">
                      {order.courses.map((course, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-white/70 bg-white/5 rounded px-3 py-2">
                          <span>{course.title}</span>
                          <span>{formatCurrency(course.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Historial de Cambios */}
                  <div className="mb-4">
                    <p className="text-white/80 text-sm font-medium mb-2">Historial de Cambios:</p>
                    <div className="space-y-1">
                      {order.history.map((item, idx) => (
                        <div key={idx} className="text-xs text-white/60 flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          <span>{getStatusInfo(item.status).label}</span>
                          <span className="text-white/40">•</span>
                          <span>{formatDate(item.date)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Acciones Disponibles */}
                <div className="flex flex-col gap-2 lg:min-w-[200px]">
                  <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm border border-white/20">
                    <RefreshCw size={16} />
                    Reembolsar
                  </button>
                  <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm border border-white/20">
                    <FileText size={16} />
                    Descargar Factura
                  </button>
                  <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm border border-white/20">
                    <Mail size={16} />
                    Reenviar Confirmación
                  </button>
                  <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm border border-white/20">
                    <MessageCircle size={16} />
                    Contactar Cliente
                  </button>
                  {order.status === 'pendiente' && (
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                      <CheckCircle size={16} />
                      Marcar como Pagado
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="text-white/70 text-sm">
          Mostrando {totalFiltered > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} - {Math.min(currentPage * itemsPerPage, totalFiltered)} de {totalFiltered} pedidos
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-1 text-sm"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-all text-sm ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-1 text-sm"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrdersTransactions

