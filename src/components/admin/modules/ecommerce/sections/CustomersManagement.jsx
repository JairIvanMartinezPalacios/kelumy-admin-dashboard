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
  UserX,
  Save,
  X,
  Clock,
  User,
  CheckCircle,
  UserPlus,
  Package
} from 'lucide-react'

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  // Estado para el formulario de cliente
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'active',
    tier: 'bronze'
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Bloquear scroll del body cuando hay un modal abierto
  useEffect(() => {
    if (showAddModal || selectedCustomer) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showAddModal, selectedCustomer])

  const [customers, setCustomers] = useState([
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
      registrationDate: '2023-06-15',
      history: [
        { id: 'ORD-001', date: '2024-01-20', amount: 450, items: 2, status: 'completed' },
        { id: 'ORD-005', date: '2023-12-15', amount: 1200, items: 4, status: 'completed' }
      ]
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
      registrationDate: '2023-08-20',
      history: [
        { id: 'ORD-002', date: '2024-01-18', amount: 380, items: 1, status: 'completed' }
      ]
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
      registrationDate: '2023-11-05',
      history: []
    }
  ])

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing && selectedCustomer) {
      // Editar cliente existente
      const updatedCustomers = customers.map(c => 
        c.id === selectedCustomer.id ? { ...c, ...formData } : c
      )
      setCustomers(updatedCustomers)
      setSelectedCustomer(null)
      setIsEditing(false)
    } else {
      // Agregar nuevo cliente
      const newCustomer = {
        ...formData,
        id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
        totalSpent: 0,
        ordersCount: 0,
        lastPurchase: new Date().toISOString().split('T')[0],
        loyaltyPoints: 0,
        avgOrderValue: 0,
        favoriteCategory: 'N/A',
        registrationDate: new Date().toISOString().split('T')[0],
        history: []
      }
      setCustomers([...customers, newCustomer])
    }
    setShowAddModal(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'active',
      tier: 'bronze'
    })
  }

  const handleEditClick = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
      status: customer.status,
      tier: customer.tier
    })
    setSelectedCustomer(customer)
    setIsEditing(true)
    setShowAddModal(true)
  }

  const handleDeleteClick = (customerId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      setCustomers(customers.filter(c => c.id !== customerId))
      if (selectedCustomer && selectedCustomer.id === customerId) {
        setSelectedCustomer(null)
      }
    }
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-fadeInScale { animation: fadeInScale 0.5s ease-out forwards; opacity: 0; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; opacity: 0; }
        .card-hover-effect { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .card-hover-effect:hover { transform: translateY(-8px) scale(1.02); }
      `}</style>

      {/* Métricas de Clientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div 
          className={`group relative bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 overflow-hidden ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ animationDelay: '0s' }}
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
          style={{ animationDelay: '0.1s' }}
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
          style={{ animationDelay: '0.2s' }}
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
              {formatCurrency(customers.length > 0 ? customers.reduce((acc, c) => acc + c.avgOrderValue, 0) / customers.length : 0)}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="text-purple-400 text-xs">Por cliente</p>
            </div>
          </div>
        </div>

        <div 
          className={`group relative bg-gradient-to-br from-pink-500/10 to-rose-500/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1 overflow-hidden ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ animationDelay: '0.3s' }}
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

      {/* Filtros y Acciones */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg w-full max-w-full ${isVisible ? 'animate-fadeInScale' : ''}`} style={{ animationDelay: '0.4s', maxWidth: '100%' }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
            <div className="relative group flex-1">
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
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-white/20">
              <Download size={18} />
              <span className="hidden sm:inline">Exportar</span>
            </button>
            <button 
              onClick={() => {
                setIsEditing(false)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  location: '',
                  status: 'active',
                  tier: 'bronze'
                })
                setShowAddModal(true)
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
            >
              <Plus size={18} />
              <span>Nuevo Cliente</span>
            </button>
          </div>
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditClick(customer)
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                      title="Editar"
                    >
                      <Edit size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(customer.id)
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30"
                      title="Eliminar"
                    >
                      <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal de Agregar/Editar Cliente - Optimizado */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md animate-fadeInScale overflow-hidden"
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
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-2xl h-[85vh] shadow-2xl animate-scaleIn flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-8 pb-4 border-b border-white/20 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl">
                  <UserPlus size={24} className="text-purple-300" />
                </div>
                <h3 className="text-white font-bold text-2xl">{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-all hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            
            {/* Contenido con scroll invisible */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <form onSubmit={handleSubmit} className="space-y-5 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                    <User size={14} />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:bg-white/15"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                    <Mail size={14} />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:bg-white/15"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                    <Phone size={14} />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+52 123 456 7890"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:bg-white/15"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                    <MapPin size={14} />
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ciudad, País"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:bg-white/15"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                    <CheckCircle size={14} />
                    Estado
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:bg-white/15"
                  >
                    <option value="active" className="bg-gray-800">✓ Activo</option>
                    <option value="inactive" className="bg-gray-800">✗ Inactivo</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-semibold flex items-center gap-2">
                    <Award size={14} />
                    Nivel
                  </label>
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:bg-white/15"
                  >
                    <option value="bronze" className="bg-gray-800">🥉 Bronce</option>
                    <option value="silver" className="bg-gray-800">🥈 Plata</option>
                    <option value="gold" className="bg-gray-800">🥇 Oro</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all border border-white/30"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 duration-300"
                >
                {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
              </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalles del Cliente */}
      {selectedCustomer && !showAddModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md animate-fadeInScale overflow-hidden"
          onClick={() => setSelectedCustomer(null)}
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
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-5xl h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-fadeInScale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header mejorado */}
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl">{selectedCustomer.name}</h3>
                  <p className="text-white/70 text-sm flex items-center gap-2 mt-1">
                    <span>{selectedCustomer.id}</span>
                    <span className="text-white/50">•</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierInfo(selectedCustomer.tier).color}`}>
                      {getTierInfo(selectedCustomer.tier).label}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditClick(selectedCustomer)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all hover:scale-105"
                  title="Editar cliente"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2.5 hover:bg-white/20 rounded-xl transition-all hover:rotate-90 duration-300"
                  title="Cerrar"
                >
                  <X size={20} className="text-white/70 hover:text-white" />
                </button>
              </div>
            </div>
            
            {/* Contenido con scroll invisible */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna izquierda - Información personal y lealtad */}
                <div className="space-y-6">
                  {/* Información Personal */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                    <UserCheck size={18} className="text-purple-400" />
                      </div>
                    Información Personal
                  </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail size={16} className="text-white/50 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white/60 text-xs mb-1">Email</p>
                          <p className="text-white font-medium text-sm break-all">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={16} className="text-white/50 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white/60 text-xs mb-1">Teléfono</p>
                          <p className="text-white font-medium text-sm">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-white/50 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white/60 text-xs mb-1">Ubicación</p>
                          <p className="text-white font-medium text-sm">{selectedCustomer.location}</p>
                        </div>
                    </div>
                      <div className="flex items-start gap-3">
                        <Calendar size={16} className="text-white/50 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white/60 text-xs mb-1">Miembro desde</p>
                          <p className="text-white font-medium text-sm">{new Date(selectedCustomer.registrationDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    </div>
                  </div>
                </div>

                  {/* Nivel de Lealtad */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Award size={18} className="text-yellow-400" />
                      </div>
                    Nivel de Lealtad
                  </h4>
                    <div className="text-center py-3">
                      <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-base font-bold mb-3 ${getTierInfo(selectedCustomer.tier).color} bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30`}>
                        {React.createElement(getTierInfo(selectedCustomer.tier).icon, { size: 20 })}
                      {getTierInfo(selectedCustomer.tier).label}
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-xl">
                        <p className="text-white/60 text-xs mb-1">Puntos Acumulados</p>
                        <p className="text-white font-bold text-2xl">{selectedCustomer.loyaltyPoints.toLocaleString()}</p>
                      </div>
                  </div>
                </div>
              </div>

                {/* Columna derecha - Estadísticas e historial */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Estadísticas principales */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30 text-center shadow-lg">
                      <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <p className="text-white/70 text-xs mb-1">Total Gastado</p>
                      <p className="text-white font-bold text-xl">{formatCurrency(selectedCustomer.totalSpent)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30 text-center shadow-lg">
                      <ShoppingBag className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-white/70 text-xs mb-1">Pedidos</p>
                      <p className="text-white font-bold text-xl">{selectedCustomer.ordersCount}</p>
                  </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30 text-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <p className="text-white/70 text-xs mb-1">Ticket Promedio</p>
                      <p className="text-white font-bold text-xl">{formatCurrency(selectedCustomer.avgOrderValue)}</p>
                  </div>
                </div>

                  {/* Historial de Compras */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 shadow-lg">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Clock size={18} className="text-blue-400" />
                      </div>
                    Historial de Compras
                  </h4>
                  <div className="space-y-3">
                    {selectedCustomer.history && selectedCustomer.history.length > 0 ? (
                      selectedCustomer.history.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 group">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                                <Package size={18} className="text-blue-400" />
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm mb-1">{order.id}</p>
                                <p className="text-white/60 text-xs flex items-center gap-2">
                                  <Calendar size={12} />
                                  {new Date(order.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold text-base mb-1">{formatCurrency(order.amount)}</p>
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                                <CheckCircle size={12} />
                                {order.status}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
                          <p className="text-white/60 text-sm">No hay historial de compras disponible</p>
                        </div>
                    )}
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

export default CustomersManagement
