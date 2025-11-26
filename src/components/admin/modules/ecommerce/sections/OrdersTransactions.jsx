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
  ChevronRight,
  X,
  AlertCircle,
  MoreVertical
} from 'lucide-react'

const OrdersTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Bloquear scroll del body cuando hay un modal abierto
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedOrder])

  // Estados de pedidos según el diagrama
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+52 55 1234 5678',
      address: 'Av. Reforma 123, CDMX',
      courses: [
        { title: 'Curso React Avanzado', price: 299, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop' },
        { title: 'Curso JavaScript ES6+', price: 199, image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=100&h=100&fit=crop' }
      ],
      total: 498,
      status: 'pagado',
      paymentMethod: 'Stripe - Tarjeta',
      date: '2024-01-20T10:30:00',
      transactionId: 'txn_123456789',
      history: [
        { status: 'creado', date: '2024-01-20T10:30:00', note: 'Pedido creado por el sistema' },
        { status: 'pagado', date: '2024-01-20T10:31:15', note: 'Pago confirmado vía Stripe' }
      ]
    },
    {
      id: 'ORD-002',
      customer: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+52 55 9876 5432',
      address: 'Calle 5 de Mayo 45, GDL',
      courses: [
        { title: 'Curso Node.js', price: 349, image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop' }
      ],
      total: 349,
      status: 'pendiente',
      paymentMethod: 'PayPal',
      date: '2024-01-19T14:20:00',
      transactionId: 'txn_987654321',
      history: [
        { status: 'creado', date: '2024-01-19T14:20:00', note: 'Pedido creado por el sistema' },
        { status: 'pendiente', date: '2024-01-19T14:20:30', note: 'Esperando confirmación de PayPal' }
      ]
    },
    {
      id: 'ORD-003',
      customer: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+52 55 5555 1234',
      address: 'Av. Constitución 789, MTY',
      courses: [
        { title: 'Bundle Frontend Completo', price: 799, image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=100&h=100&fit=crop' }
      ],
      total: 799,
      status: 'cancelado',
      paymentMethod: 'MercadoPago',
      date: '2024-01-18T09:15:00',
      transactionId: 'txn_456789123',
      history: [
        { status: 'creado', date: '2024-01-18T09:15:00', note: 'Pedido creado por el sistema' },
        { status: 'cancelado', date: '2024-01-18T09:45:00', note: 'Cancelado por el usuario' }
      ]
    },
    {
      id: 'ORD-004',
      customer: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+52 55 4444 5678',
      address: 'Blvd. Kukulcán 12, CUN',
      courses: [
        { title: 'Curso Vue.js', price: 249, image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=100&h=100&fit=crop' },
        { title: 'Curso TypeScript', price: 299, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=100&h=100&fit=crop' }
      ],
      total: 548,
      status: 'reembolsado',
      paymentMethod: 'OXXO Pay',
      date: '2024-01-17T16:00:00',
      transactionId: 'txn_789123456',
      history: [
        { status: 'creado', date: '2024-01-17T16:00:00', note: 'Pedido creado por el sistema' },
        { status: 'pagado', date: '2024-01-17T16:30:00', note: 'Pago confirmado en tienda' },
        { status: 'reembolsado', date: '2024-01-18T10:00:00', note: 'Reembolso solicitado por soporte' }
      ]
    },
    {
      id: 'ORD-005',
      customer: 'Pedro Sánchez',
      email: 'pedro.sanchez@email.com',
      phone: '+52 55 3333 9876',
      address: 'Calle 60 400, MID',
      courses: [
        { title: 'Curso Python', price: 399, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop' }
      ],
      total: 399,
      status: 'en_proceso',
      paymentMethod: 'Stripe - Tarjeta',
      date: '2024-01-20T11:00:00',
      transactionId: 'txn_321654987',
      history: [
        { status: 'creado', date: '2024-01-20T11:00:00', note: 'Pedido creado por el sistema' },
        { status: 'en_proceso', date: '2024-01-20T11:01:00', note: 'Procesando pago con el banco' }
      ]
    }
  ])

  const getStatusInfo = (status) => {
    const statusMap = {
      pagado: { 
        icon: CheckCircle, 
        color: 'text-green-400 bg-green-500/20 border-green-500/30',
        label: 'Pagado',
        description: 'Transacción completada exitosamente',
        actions: ['reembolsar', 'reenviar_recibo']
      },
      pendiente: { 
        icon: Clock, 
        color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
        label: 'Pendiente',
        description: 'Esperando confirmación de pago',
        actions: ['marcar_pagado', 'cancelar']
      },
      cancelado: { 
        icon: XCircle, 
        color: 'text-red-400 bg-red-500/20 border-red-500/30',
        label: 'Cancelado',
        description: 'Pedido cancelado por usuario',
        actions: ['restaurar']
      },
      reembolsado: { 
        icon: RefreshCw, 
        color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
        label: 'Reembolsado',
        description: 'Dinero devuelto al cliente',
        actions: []
      },
      en_proceso: { 
        icon: RefreshCw, 
        color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
        label: 'En Proceso',
        description: 'Procesando el pago',
        actions: ['verificar_estado']
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

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          history: [
            ...order.history,
            { 
              status: newStatus, 
              date: new Date().toISOString(), 
              note: `Estado actualizado manualmente a ${newStatus}` 
            }
          ]
        }
      }
      return order
    }))
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({
        ...prev,
        status: newStatus,
        history: [
          ...prev.history,
          { 
            status: newStatus, 
            date: new Date().toISOString(), 
            note: `Estado actualizado manualmente a ${newStatus}` 
          }
        ]
      }))
    }
  }

  // Función para ordenar
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1)
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; opacity: 0; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out forwards; opacity: 0; }
        .card-hover-effect { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .card-hover-effect:hover { transform: translateY(-4px) scale(1.01); }
      `}</style>

      {/* Barra de búsqueda y filtros */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInUp' : ''}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar por ID, email, cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm transition-all hover:bg-white/15"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-sm transition-all hover:bg-white/15"
          >
            <option value="all" className="bg-gray-800">Todos los Estados</option>
            <option value="pagado" className="bg-gray-800">Pagado</option>
            <option value="pendiente" className="bg-gray-800">Pendiente</option>
            <option value="en_proceso" className="bg-gray-800">En Proceso</option>
            <option value="cancelado" className="bg-gray-800">Cancelado</option>
            <option value="reembolsado" className="bg-gray-800">Reembolsado</option>
          </select>

          <button className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105">
            <Download size={18} />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Encabezados de ordenamiento */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hidden md:grid grid-cols-4 gap-4 text-sm text-white/70 font-medium">
        <button onClick={() => handleSort('date')} className="flex items-center gap-2 hover:text-white transition-colors text-left">
          <span>Fecha</span>
          {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </button>
        <button onClick={() => handleSort('customer')} className="flex items-center gap-2 hover:text-white transition-colors text-left">
          <span>Cliente</span>
          {sortField === 'customer' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </button>
        <button onClick={() => handleSort('total')} className="flex items-center gap-2 hover:text-white transition-colors text-left">
          <span>Monto</span>
          {sortField === 'total' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </button>
        <button onClick={() => handleSort('status')} className="flex items-center gap-2 hover:text-white transition-colors text-left">
          <span>Estado</span>
          {sortField === 'status' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </button>
      </div>

      {/* Listado de Pedidos */}
      <div className="space-y-3">
        {filteredAndSortedOrders.map((order, index) => {
          const statusInfo = getStatusInfo(order.status)
          const StatusIcon = statusInfo.icon

          return (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer card-hover-effect ${isVisible ? 'animate-slideInRight' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${statusInfo.color}`}>
                    <StatusIcon size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold">{order.id}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/80 text-sm">{formatDate(order.date)}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                      <span className="text-white/60">{order.customer}</span>
                      <span className="hidden sm:inline text-white/20">|</span>
                      <span className="text-white/60">{order.courses.length} items</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-6">
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{formatCurrency(order.total)}</p>
                    <p className="text-white/40 text-xs">{order.paymentMethod}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 ${statusInfo.color}`}>
                    {statusInfo.label}
                  </div>
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
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all text-sm ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
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

      {/* Modal de Detalles del Pedido */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md animate-scaleIn overflow-hidden"
          onClick={() => setSelectedOrder(null)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-5xl h-[85vh] shadow-2xl flex flex-col animate-scaleIn overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal - Mejorado */}
            <div className="p-6 border-b border-white/20 flex items-center justify-between bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40 backdrop-blur-xl flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${getStatusInfo(selectedOrder.status).color} shadow-lg`}>
                  {React.createElement(getStatusInfo(selectedOrder.status).icon, { size: 28 })}
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl flex items-center gap-2">
                    Pedido {selectedOrder.id}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusInfo(selectedOrder.status).color}`}>
                      {getStatusInfo(selectedOrder.status).label}
                    </span>
                  </h3>
                  <p className="text-white/70 text-sm mt-1">Realizado el {formatDate(selectedOrder.date)}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>

            {/* Contenido con scroll invisible */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna Principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Productos - Mejorado */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                  <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FileText size={20} className="text-purple-400" />
                    </div>
                    Detalles de la Compra
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.courses.map((course, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] border border-white/10">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden flex-shrink-0 shadow-lg">
                          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white font-semibold text-base">{course.title}</h5>
                          <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Licencia Individual
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">{formatCurrency(course.price)}</p>
                          <p className="text-white/50 text-xs mt-1">MXN</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t-2 border-white/20 flex justify-between items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl">
                      <span className="text-white/80 font-semibold text-lg">Total Pagado</span>
                      <span className="text-white font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {formatCurrency(selectedOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Historial - Mejorado */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                  <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Clock size={20} className="text-blue-400" />
                    </div>
                    Línea de Tiempo
                  </h4>
                  <div className="relative pl-6 border-l-2 border-gradient-to-b from-purple-500 to-pink-500 space-y-6">
                    {selectedOrder.history.map((event, idx) => (
                      <div key={idx} className="relative animate-slideInRight" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className={`absolute -left-[29px] top-0 w-4 h-4 rounded-full ${getStatusInfo(event.status).color.split(' ')[1].replace('/20', '')} ring-4 ring-gray-900 shadow-lg`} />
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-semibold">{getStatusInfo(event.status).label}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(event.status).color}`}>
                              {event.status}
                            </span>
                          </div>
                          <p className="text-white/50 text-xs mb-2 flex items-center gap-1">
                            <Clock size={12} />
                            {formatDate(event.date)}
                          </p>
                          <p className="text-white/70 text-sm bg-white/5 p-3 rounded-lg border-l-4 border-purple-500/50">
                            {event.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Acciones Rápidas - Mejorado */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                    Acciones
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.status === 'pendiente' && (
                      <button 
                        onClick={() => handleStatusChange(selectedOrder.id, 'pagado')}
                        className="w-full py-3 bg-gradient-to-r from-green-500/30 to-green-600/30 hover:from-green-500/40 hover:to-green-600/40 text-green-300 rounded-xl transition-all text-sm font-semibold border border-green-500/50 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/20 hover:scale-105 duration-300"
                      >
                        <CheckCircle size={18} />
                        Confirmar Pago
                      </button>
                    )}
                    {selectedOrder.status !== 'cancelado' && selectedOrder.status !== 'reembolsado' && (
                      <button 
                        onClick={() => handleStatusChange(selectedOrder.id, 'cancelado')}
                        className="w-full py-3 bg-gradient-to-r from-red-500/30 to-red-600/30 hover:from-red-500/40 hover:to-red-600/40 text-red-300 rounded-xl transition-all text-sm font-semibold border border-red-500/50 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/20 hover:scale-105 duration-300"
                      >
                        <XCircle size={18} />
                        Cancelar Pedido
                      </button>
                    )}
                    <button 
                      onClick={() => alert(`Descargando factura para pedido ${selectedOrder.id}...`)}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all text-sm font-semibold border border-white/30 flex items-center justify-center gap-2 hover:scale-105 duration-300"
                    >
                      <Download size={18} />
                      Descargar Factura
                    </button>
                    <button 
                      onClick={() => alert(`Reenviando email de confirmación a ${selectedOrder.email}...`)}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all text-sm font-semibold border border-white/30 flex items-center justify-center gap-2 hover:scale-105 duration-300"
                    >
                      <Mail size={18} />
                      Reenviar Email
                    </button>
                  </div>
                </div>

                {/* Info Cliente - Mejorado */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <User size={20} className="text-pink-400" />
                    </div>
                    Cliente
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="text-white font-semibold text-base">{selectedOrder.customer}</p>
                      <p className="text-white/70 text-sm mt-1 flex items-center gap-1">
                        <Mail size={14} />
                        {selectedOrder.email}
                      </p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Teléfono</p>
                      <p className="text-white text-sm font-medium">{selectedOrder.phone}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Dirección de Facturación</p>
                      <p className="text-white text-sm font-medium leading-relaxed">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>

                {/* Info Pago - Mejorado */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <CreditCard size={20} className="text-yellow-400" />
                    </div>
                    Información de Pago
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Método de Pago</p>
                      <p className="text-white text-sm font-semibold">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/30">
                      <p className="text-white/50 text-xs mb-2 uppercase tracking-wide">ID de Transacción</p>
                      <p className="text-white text-xs font-mono bg-black/30 p-2 rounded border border-white/10 break-all">
                        {selectedOrder.transactionId}
                      </p>
                    </div>
                  </div>
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

export default OrdersTransactions
