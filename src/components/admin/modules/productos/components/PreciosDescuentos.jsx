import React, { useState, useMemo } from 'react'
import {
  DollarSign,
  Percent,
  Tag,
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Users,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Filter,
  BarChart3,
  X,
  Save,
  FileText
} from 'lucide-react'

const PreciosDescuentos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: 'Descuento Black Friday',
      code: 'BLACKFRIDAY2024',
      type: 'percentage',
      value: 30,
      minPurchase: 1000,
      maxDiscount: 5000,
      startDate: '2024-11-25',
      endDate: '2024-11-30',
      status: 'scheduled',
      usageLimit: 1000,
      usedCount: 0,
      applicableTo: 'all',
      products: [],
      categories: [],
      description: 'Descuento especial para Black Friday',
      createdAt: '2024-11-01'
    },
    {
      id: 2,
      name: 'Descuento Estudiantes',
      code: 'ESTUDIANTE20',
      type: 'percentage',
      value: 20,
      minPurchase: 0,
      maxDiscount: null,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      usageLimit: null,
      usedCount: 245,
      applicableTo: 'categories',
      products: [],
      categories: ['Cursos Online'],
      description: 'Descuento para estudiantes en cursos online',
      createdAt: '2024-01-01'
    },
    {
      id: 3,
      name: 'Descuento Fijo $100',
      code: 'AHORRA100',
      type: 'fixed',
      value: 100,
      minPurchase: 500,
      maxDiscount: 100,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'active',
      usageLimit: 500,
      usedCount: 156,
      applicableTo: 'products',
      products: ['PROD-001', 'PROD-002'],
      categories: [],
      description: 'Descuento fijo de $100 en productos seleccionados',
      createdAt: '2024-01-10'
    }
  ])

  const filteredDiscounts = useMemo(() => {
    return discounts.filter(discount => {
      const matchesSearch = 
        discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.code.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || discount.status === filterStatus
      
      return matchesSearch && matchesStatus
    })
  }, [discounts, searchTerm, filterStatus])

  const stats = useMemo(() => {
    const now = new Date()
    return {
      total: discounts.length,
      active: discounts.filter(d => d.status === 'active').length,
      scheduled: discounts.filter(d => d.status === 'scheduled').length,
      expired: discounts.filter(d => {
        if (d.status === 'expired') return true
        return new Date(d.endDate) < now && d.status !== 'expired'
      }).length,
      totalUsed: discounts.reduce((sum, d) => sum + d.usedCount, 0),
      totalSavings: discounts.reduce((sum, d) => sum + (d.usedCount * (d.type === 'percentage' ? 50 : d.value)), 0)
    }
  }, [discounts])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'scheduled': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'expired': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      case 'disabled': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'scheduled': return 'Programado'
      case 'expired': return 'Expirado'
      case 'disabled': return 'Deshabilitado'
      default: return status
    }
  }

  const handleCreateDiscount = () => {
    setShowCreateModal(true)
  }

  const handleEditDiscount = (discount) => {
    setSelectedDiscount(discount)
    setShowEditModal(true)
  }

  const handleDeleteDiscount = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este descuento?')) {
      setDiscounts(prev => prev.filter(d => d.id !== id))
      alert('Descuento eliminado exitosamente')
    }
  }

  const handleToggleStatus = (id, newStatus) => {
    setDiscounts(prev => prev.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ))
    alert(`Estado del descuento actualizado a: ${getStatusText(newStatus)}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Precios y Descuentos</h2>
          <p className="text-white/70">Gestiona descuentos, cupones y promociones</p>
        </div>
        <button
          onClick={handleCreateDiscount}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Descuento</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Tag className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total Descuentos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.active}</span>
          </div>
          <p className="text-white/70 text-xs">Activos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-blue-400">{stats.scheduled}</span>
          </div>
          <p className="text-white/70 text-xs">Programados</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-5 h-5 text-gray-400" />
            <span className="text-2xl font-bold text-gray-400">{stats.expired}</span>
          </div>
          <p className="text-white/70 text-xs">Expirados</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{stats.totalUsed}</span>
          </div>
          <p className="text-white/70 text-xs">Usos Totales</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-pink-400" />
            <span className="text-2xl font-bold text-pink-400">{formatPrice(stats.totalSavings)}</span>
          </div>
          <p className="text-white/70 text-xs">Ahorro Total</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="scheduled">Programados</option>
            <option value="expired">Expirados</option>
            <option value="disabled">Deshabilitados</option>
          </select>
        </div>
      </div>

      {/* Lista de descuentos */}
      {filteredDiscounts.length > 0 ? (
        <div className="space-y-3">
          {filteredDiscounts.map((discount) => (
          <div
            key={discount.id}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-semibold text-lg">{discount.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(discount.status)}`}>
                    {getStatusText(discount.status)}
                  </span>
                </div>
                <p className="text-white/60 text-xs font-mono mb-2">Código: {discount.code}</p>
                <p className="text-white/70 text-sm mb-3">{discount.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Descuento</p>
                    <p className="text-white font-bold text-lg">
                      {discount.type === 'percentage' ? `${discount.value}%` : formatPrice(discount.value)}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Válido hasta</p>
                    <p className="text-white">{new Date(discount.endDate).toLocaleDateString('es-MX')}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Usos</p>
                    <p className="text-white">
                      {discount.usedCount} {discount.usageLimit ? `/ ${discount.usageLimit}` : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Aplicable a</p>
                    <p className="text-white capitalize">{discount.applicableTo === 'all' ? 'Todos' : discount.applicableTo}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleEditDiscount(discount)}
                  className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDeleteDiscount(discount.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <Tag className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg mb-2">No hay descuentos</p>
          <p className="text-white/50 text-sm mb-4">Crea tu primer descuento o cupón para atraer más clientes</p>
          <button
            onClick={handleCreateDiscount}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Crear Primer Descuento
          </button>
        </div>
      )}

      {/* Modal de Crear/Editar Descuento */}
      {(showCreateModal || showEditModal) && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedDiscount(null); }}
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
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-2xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Tag className="w-6 h-6 text-purple-400" />
                {showEditModal ? 'Editar Descuento' : 'Nuevo Descuento'}
              </h3>
              <button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedDiscount(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Tag className="w-4 h-4" />
                    Nombre del Descuento *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDiscount?.name || ''}
                    placeholder="Ej: Descuento Black Friday"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Código del Cupón *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDiscount?.code || ''}
                    placeholder="BLACKFRIDAY2024"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Percent className="w-4 h-4" />
                      Tipo
                    </label>
                    <select
                      defaultValue={selectedDiscount?.type || 'percentage'}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="percentage">Porcentaje (%)</option>
                      <option value="fixed">Cantidad Fija ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <DollarSign className="w-4 h-4" />
                      Valor *
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedDiscount?.value || ''}
                      placeholder="30"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Calendar className="w-4 h-4" />
                      Fecha Inicio
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedDiscount?.startDate || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Calendar className="w-4 h-4" />
                      Fecha Fin
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedDiscount?.endDate || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedDiscount(null); }}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(showEditModal ? 'Descuento actualizado exitosamente' : 'Descuento creado exitosamente')
                      setShowCreateModal(false)
                      setShowEditModal(false)
                      setSelectedDiscount(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {showEditModal ? 'Guardar Cambios' : 'Crear Descuento'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PreciosDescuentos

