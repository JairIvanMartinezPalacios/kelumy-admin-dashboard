import React, { useState, useMemo } from 'react'
import {
  Package,
  Search,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  BarChart3,
  XCircle,
  CheckCircle,
  Clock,
  Filter,
  ArrowUp,
  ArrowDown,
  FileText,
  ShoppingCart,
  DollarSign,
  Activity
} from 'lucide-react'

const InventarioStock = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('stock')
  const [sortOrder, setSortOrder] = useState('asc')

  const [inventory, setInventory] = useState([
    {
      id: 1,
      productName: 'Libro Físico: Guía de E-commerce',
      sku: 'PROD-003',
      currentStock: 45,
      reservedStock: 5,
      availableStock: 40,
      minStock: 10,
      maxStock: 100,
      cost: 200,
      totalValue: 9000,
      status: 'in_stock',
      lastUpdated: '2024-01-20',
      location: 'Almacén A - Estante 3',
      supplier: 'Editorial XYZ',
      reorderPoint: 15
    },
    {
      id: 2,
      productName: 'Certificado Impreso Premium',
      sku: 'PROD-006',
      currentStock: 8,
      reservedStock: 2,
      availableStock: 6,
      minStock: 10,
      maxStock: 50,
      cost: 50,
      totalValue: 400,
      status: 'low_stock',
      lastUpdated: '2024-01-19',
      location: 'Almacén B - Estante 1',
      supplier: 'Impresora ABC',
      reorderPoint: 10
    },
    {
      id: 3,
      productName: 'Material Didáctico Físico',
      sku: 'PROD-007',
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      minStock: 5,
      maxStock: 30,
      cost: 150,
      totalValue: 0,
      status: 'out_of_stock',
      lastUpdated: '2024-01-18',
      location: 'Almacén A - Estante 5',
      supplier: 'Proveedor DEF',
      reorderPoint: 5
    }
  ])

  const filteredAndSortedInventory = useMemo(() => {
    let filtered = inventory.filter(item => {
      const matchesSearch = 
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus
      
      return matchesSearch && matchesStatus
    })

    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'stock':
          aValue = a.currentStock
          bValue = b.currentStock
          break
        case 'value':
          aValue = a.totalValue
          bValue = b.totalValue
          break
        case 'product':
          aValue = a.productName.toLowerCase()
          bValue = b.productName.toLowerCase()
          break
        default:
          aValue = a.currentStock
          bValue = b.currentStock
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [inventory, searchTerm, filterStatus, sortBy, sortOrder])

  const stats = useMemo(() => {
    return {
      totalProducts: inventory.length,
      inStock: inventory.filter(i => i.status === 'in_stock').length,
      lowStock: inventory.filter(i => i.status === 'low_stock').length,
      outOfStock: inventory.filter(i => i.status === 'out_of_stock').length,
      totalValue: inventory.reduce((sum, i) => sum + i.totalValue, 0),
      totalUnits: inventory.reduce((sum, i) => sum + i.currentStock, 0),
      needReorder: inventory.filter(i => i.currentStock <= i.reorderPoint).length
    }
  }, [inventory])

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'low_stock': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'out_of_stock': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'in_stock': return 'En Stock'
      case 'low_stock': return 'Stock Bajo'
      case 'out_of_stock': return 'Sin Stock'
      default: return status
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const handleAdjustStock = (id, adjustment) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.currentStock + adjustment)
        const newStatus = newStock === 0 ? 'out_of_stock' :
                         newStock <= item.reorderPoint ? 'low_stock' : 'in_stock'
        return {
          ...item,
          currentStock: newStock,
          availableStock: Math.max(0, newStock - item.reservedStock),
          totalValue: newStock * item.cost,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        }
      }
      return item
    }))
    alert(`Stock ajustado exitosamente`)
  }

  const handleExportInventory = (format) => {
    alert(`Exportando inventario en formato ${format}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Inventario y Stock</h2>
          <p className="text-white/70">Gestiona el inventario de productos físicos</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Abriendo herramienta de importación...')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Importar</span>
          </button>
          <button
            onClick={() => handleExportInventory('Excel')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.totalProducts}</span>
          </div>
          <p className="text-white/70 text-xs">Total Productos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.inStock}</span>
          </div>
          <p className="text-white/70 text-xs">En Stock</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">{stats.lowStock}</span>
          </div>
          <p className="text-white/70 text-xs">Stock Bajo</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-2xl font-bold text-red-400">{stats.outOfStock}</span>
          </div>
          <p className="text-white/70 text-xs">Sin Stock</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{stats.totalUnits}</span>
          </div>
          <p className="text-white/70 text-xs">Unidades Totales</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-bold text-cyan-400">{formatPrice(stats.totalValue)}</span>
          </div>
          <p className="text-white/70 text-xs">Valor Total</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-2xl font-bold text-orange-400">{stats.needReorder}</span>
          </div>
          <p className="text-white/70 text-xs">Requieren Pedido</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Buscar por producto o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los estados</option>
            <option value="in_stock">En Stock</option>
            <option value="low_stock">Stock Bajo</option>
            <option value="out_of_stock">Sin Stock</option>
          </select>
        </div>
        <div className="mt-4">
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="stock-asc">Stock: Menor a Mayor</option>
            <option value="stock-desc">Stock: Mayor a Menor</option>
            <option value="value-desc">Valor: Mayor a Menor</option>
            <option value="value-asc">Valor: Menor a Mayor</option>
            <option value="product-asc">Producto: A-Z</option>
            <option value="product-desc">Producto: Z-A</option>
          </select>
        </div>
      </div>

      {/* Tabla de inventario */}
      {filteredAndSortedInventory.length > 0 ? (
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/70 text-sm font-semibold">Producto</th>
                  <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Stock Actual</th>
                  <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Disponible</th>
                  <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Mínimo</th>
                  <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Costo Unitario</th>
                  <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Valor Total</th>
                  <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Estado</th>
                  <th className="text-center py-3 px-4 text-white/70 text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedInventory.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white font-medium">{item.productName}</p>
                      <p className="text-white/60 text-xs font-mono">{item.sku}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-bold ${
                      item.currentStock === 0 ? 'text-red-400' :
                      item.currentStock <= item.reorderPoint ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {item.currentStock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-white/90">{item.availableStock}</td>
                  <td className="py-3 px-4 text-center text-white/90">{item.minStock}</td>
                  <td className="py-3 px-4 text-center text-white/90">{formatPrice(item.cost)}</td>
                  <td className="py-3 px-4 text-center text-white font-semibold">{formatPrice(item.totalValue)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAdjustStock(item.id, 1)}
                        className="p-1.5 bg-green-500/20 border border-green-500/30 text-green-300 rounded hover:bg-green-500/30 transition-colors"
                        title="Aumentar stock"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAdjustStock(item.id, -1)}
                        className="p-1.5 bg-red-500/20 border border-red-500/30 text-red-300 rounded hover:bg-red-500/30 transition-colors"
                        title="Disminuir stock"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Editando inventario de ${item.productName}...`)}
                        className="p-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded hover:bg-blue-500/30 transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg mb-2">No hay productos en inventario</p>
          <p className="text-white/50 text-sm">Los productos físicos aparecerán aquí cuando agregues control de stock</p>
        </div>
      )}
    </div>
  )
}

export default InventarioStock

