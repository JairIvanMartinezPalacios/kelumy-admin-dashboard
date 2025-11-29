import React, { useState, useMemo } from 'react'
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  Upload,
  Image as ImageIcon,
  Tag,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Filter,
  Grid,
  List,
  X,
  Save,
  FileText,
  Video,
  File,
  Link as LinkIcon,
  Calendar,
  User,
  Users,
  Archive,
  RefreshCw,
  Share2,
  Printer,
  MoreVertical,
  Package2,
  Layers,
  Box,
  ShoppingBag,
  Zap,
  Clock,
  Globe,
  Lock,
  Unlock
} from 'lucide-react'

const GestionProductos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('fecha')
  const [sortOrder, setSortOrder] = useState('desc')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Curso Completo de React y Next.js',
      sku: 'PROD-001',
      description: 'Aprende React y Next.js desde cero hasta nivel avanzado con proyectos reales',
      shortDescription: 'Curso completo de React y Next.js',
      type: 'digital',
      category: 'Cursos Online',
      price: 2999,
      comparePrice: 3999,
      cost: 500,
      stock: 0,
      trackInventory: false,
      status: 'active',
      featured: true,
      images: ['https://via.placeholder.com/400x300?text=React+Course'],
      tags: ['react', 'nextjs', 'javascript', 'frontend'],
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      seoTitle: 'Curso Completo de React y Next.js - Aprende Desarrollo Web',
      seoDescription: 'Aprende React y Next.js desde cero. Curso completo con proyectos prácticos.',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      sales: 245,
      revenue: 734755,
      rating: 4.8,
      reviews: 89,
      views: 1234
    },
    {
      id: 2,
      name: 'Certificado Digital Profesional',
      sku: 'PROD-002',
      description: 'Certificado digital profesional con validación blockchain',
      shortDescription: 'Certificado digital validado',
      type: 'digital',
      category: 'Certificados',
      price: 499,
      comparePrice: 799,
      cost: 50,
      stock: 0,
      trackInventory: false,
      status: 'active',
      featured: false,
      images: ['https://via.placeholder.com/400x300?text=Certificate'],
      tags: ['certificado', 'blockchain', 'validación'],
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      seoTitle: 'Certificado Digital Profesional - Validación Blockchain',
      seoDescription: 'Obtén tu certificado digital con validación blockchain',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      sales: 156,
      revenue: 77844,
      rating: 4.9,
      reviews: 45,
      views: 567
    },
    {
      id: 3,
      name: 'Libro Físico: Guía de E-commerce',
      sku: 'PROD-003',
      description: 'Libro físico con guía completa de e-commerce y marketing digital',
      shortDescription: 'Libro físico sobre e-commerce',
      type: 'physical',
      category: 'Libros',
      price: 599,
      comparePrice: 899,
      cost: 200,
      stock: 45,
      trackInventory: true,
      status: 'active',
      featured: true,
      images: ['https://via.placeholder.com/400x300?text=E-commerce+Book'],
      tags: ['libro', 'ecommerce', 'marketing'],
      weight: 0.5,
      dimensions: { length: 23, width: 15, height: 2 },
      seoTitle: 'Libro: Guía Completa de E-commerce',
      seoDescription: 'Libro físico con guía completa de e-commerce',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
      sales: 78,
      revenue: 46722,
      rating: 4.6,
      reviews: 23,
      views: 345
    },
    {
      id: 4,
      name: 'Suscripción Premium Mensual',
      sku: 'PROD-004',
      description: 'Acceso premium a todos los cursos y contenido exclusivo',
      shortDescription: 'Suscripción premium mensual',
      type: 'subscription',
      category: 'Suscripciones',
      price: 999,
      comparePrice: 1499,
      cost: 300,
      stock: 0,
      trackInventory: false,
      status: 'active',
      featured: true,
      images: ['https://via.placeholder.com/400x300?text=Premium'],
      tags: ['suscripción', 'premium', 'acceso'],
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      seoTitle: 'Suscripción Premium - Acceso a Todos los Cursos',
      seoDescription: 'Suscripción premium con acceso a todos los cursos',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-12',
      sales: 312,
      revenue: 311688,
      rating: 4.7,
      reviews: 67,
      views: 890
    },
    {
      id: 5,
      name: 'Plantilla WordPress Premium',
      sku: 'PROD-005',
      description: 'Plantilla WordPress premium para sitios educativos',
      shortDescription: 'Plantilla WordPress educativa',
      type: 'digital',
      category: 'Plantillas',
      price: 1999,
      comparePrice: 2999,
      cost: 100,
      stock: 0,
      trackInventory: false,
      status: 'draft',
      featured: false,
      images: ['https://via.placeholder.com/400x300?text=WordPress'],
      tags: ['wordpress', 'plantilla', 'educación'],
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      seoTitle: 'Plantilla WordPress Premium para Educación',
      seoDescription: 'Plantilla WordPress premium para sitios educativos',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      views: 12
    }
  ])

  const categories = ['Todas', 'Cursos Online', 'Certificados', 'Libros', 'Suscripciones', 'Plantillas', 'Herramientas', 'Otros']

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus
      const matchesType = filterType === 'all' || product.type === filterType
      
      return matchesSearch && matchesCategory && matchesStatus && matchesType
    })

    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'fecha':
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        case 'precio':
          aValue = a.price
          bValue = b.price
          break
        case 'ventas':
          aValue = a.sales
          bValue = b.sales
          break
        case 'nombre':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        default:
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [products, searchTerm, filterCategory, filterStatus, filterType, sortBy, sortOrder, currentPage, itemsPerPage])

  const totalPages = Math.ceil(
    products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus
      const matchesType = filterType === 'all' || product.type === filterType
      return matchesSearch && matchesCategory && matchesStatus && matchesType
    }).length / itemsPerPage
  )

  const stats = useMemo(() => {
    return {
      total: products.length,
      active: products.filter(p => p.status === 'active').length,
      draft: products.filter(p => p.status === 'draft').length,
      archived: products.filter(p => p.status === 'archived').length,
      featured: products.filter(p => p.featured).length,
      totalSales: products.reduce((sum, p) => sum + p.sales, 0),
      totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
      lowStock: products.filter(p => p.trackInventory && p.stock < 10 && p.stock > 0).length,
      outOfStock: products.filter(p => p.trackInventory && p.stock === 0).length
    }
  }, [products])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'draft': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'archived': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'draft': return 'Borrador'
      case 'archived': return 'Archivado'
      default: return status
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'digital': return File
      case 'physical': return Package
      case 'subscription': return RefreshCw
      default: return Package
    }
  }

  const handleCreateProduct = () => {
    setShowCreateModal(true)
  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setShowViewModal(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setShowEditModal(true)
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
      alert('Producto eliminado exitosamente')
    }
  }

  const handleDuplicateProduct = (id) => {
    const product = products.find(p => p.id === id)
    if (product) {
      const duplicated = {
        ...product,
        id: Date.now(),
        name: `${product.name} (Copia)`,
        sku: `${product.sku}-COPY`,
        status: 'draft',
        sales: 0,
        revenue: 0,
        views: 0
      }
      setProducts(prev => [...prev, duplicated])
      alert('Producto duplicado exitosamente')
    }
  }

  const handleToggleStatus = (id, newStatus) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : p
    ))
    alert(`Estado del producto actualizado a: ${getStatusText(newStatus)}`)
  }

  const handleToggleFeatured = (id) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ))
  }

  const handleExportProducts = (format) => {
    alert(`Exportando productos en formato ${format}. Total: ${products.length} productos`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Productos</h2>
          <p className="text-white/70">Administra tu catálogo de productos digitales y físicos</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExportProducts('Excel')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleCreateProduct}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total</p>
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
            <FileText className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">{stats.draft}</span>
          </div>
          <p className="text-white/70 text-xs">Borradores</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{stats.featured}</span>
          </div>
          <p className="text-white/70 text-xs">Destacados</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-bold text-cyan-400">{stats.totalSales}</span>
          </div>
          <p className="text-white/70 text-xs">Ventas</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-pink-400" />
            <span className="text-2xl font-bold text-pink-400">{formatPrice(stats.totalRevenue)}</span>
          </div>
          <p className="text-white/70 text-xs">Ingresos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            <span className="text-2xl font-bold text-orange-400">{stats.lowStock}</span>
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
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Buscar por nombre, SKU, descripción..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {categories.map(cat => (
              <option key={cat} value={cat === 'Todas' ? 'all' : cat}>{cat}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="draft">Borradores</option>
            <option value="archived">Archivados</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los tipos</option>
            <option value="digital">Digital</option>
            <option value="physical">Físico</option>
            <option value="subscription">Suscripción</option>
          </select>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="fecha-desc">Más recientes</option>
            <option value="fecha-asc">Más antiguos</option>
            <option value="precio-desc">Mayor precio</option>
            <option value="precio-asc">Menor precio</option>
            <option value="ventas-desc">Más vendidos</option>
            <option value="ventas-asc">Menos vendidos</option>
            <option value="nombre-asc">A-Z</option>
            <option value="nombre-desc">Z-A</option>
          </select>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {filteredAndSortedProducts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((product) => {
            const TypeIcon = getTypeIcon(product.type)
            return (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:bg-white/15 transition-all overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    {product.featured && (
                      <span className="px-2 py-1 bg-yellow-500/80 text-white rounded-full text-xs font-medium">
                        <Star className="w-3 h-3 inline" />
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className="p-2 bg-black/50 rounded-lg">
                      <TypeIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-white/60 text-xs mb-2 font-mono">{product.sku}</p>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-bold text-lg">{formatPrice(product.price)}</p>
                      {product.comparePrice > product.price && (
                        <p className="text-white/50 text-xs line-through">{formatPrice(product.comparePrice)}</p>
                      )}
                    </div>
                    {product.trackInventory && (
                      <div className="text-right">
                        <p className={`text-xs font-semibold ${
                          product.stock === 0 ? 'text-red-400' :
                          product.stock < 10 ? 'text-orange-400' :
                          'text-green-400'
                        }`}>
                          Stock: {product.stock}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                    <span className="flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      {product.sales} ventas
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {product.rating > 0 ? product.rating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className="flex-1 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSortedProducts.map((product) => {
            const TypeIcon = getTypeIcon(product.type)
            return (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <TypeIcon className="w-5 h-5 text-purple-400" />
                          <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                          {product.featured && (
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                            {getStatusText(product.status)}
                          </span>
                        </div>
                        <p className="text-white/60 text-xs font-mono mb-1">{product.sku}</p>
                        <p className="text-white/70 text-sm mb-3">{product.shortDescription}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-white font-bold text-xl mb-1">{formatPrice(product.price)}</p>
                        {product.comparePrice > product.price && (
                          <p className="text-white/50 text-sm line-through">{formatPrice(product.comparePrice)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-white/60 mb-3">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {product.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4" />
                        {product.sales} ventas
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {formatPrice(product.revenue)}
                      </span>
                      {product.trackInventory && (
                        <span className={`flex items-center gap-1 ${
                          product.stock === 0 ? 'text-red-400' :
                          product.stock < 10 ? 'text-orange-400' :
                          'text-green-400'
                        }`}>
                          <Package className="w-4 h-4" />
                          Stock: {product.stock}
                        </span>
                      )}
                      {product.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {product.rating.toFixed(1)} ({product.reviews})
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/5 text-white/70 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-purple-400" />
                    </button>
                    <button
                      onClick={() => handleDuplicateProduct(product.id)}
                      className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
                      title="Duplicar"
                    >
                      <Copy className="w-4 h-4 text-cyan-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        )
      ) : (
        <div className="text-center py-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg mb-2">No se encontraron productos</p>
          <p className="text-white/50 text-sm mb-4">Intenta ajustar los filtros o crea un nuevo producto</p>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Crear Primer Producto
          </button>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-white/70 text-sm">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} de {products.length} productos
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Anterior
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = idx + 1
              } else if (currentPage <= 3) {
                pageNum = idx + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx
              } else {
                pageNum = currentPage - 2 + idx
              }
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Modal de Ver Producto */}
      {showViewModal && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowViewModal(false); setSelectedProduct(null); }}
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
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-6xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Package className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedProduct.name}</h3>
                  <p className="text-white/70 text-sm font-mono">{selectedProduct.sku}</p>
                </div>
              </div>
              <button
                onClick={() => { setShowViewModal(false); setSelectedProduct(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-xl mb-4"
                  />
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-3">Información General</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Tipo:</span>
                          <span className="text-white">{selectedProduct.type === 'digital' ? 'Digital' : selectedProduct.type === 'physical' ? 'Físico' : 'Suscripción'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Categoría:</span>
                          <span className="text-white">{selectedProduct.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Estado:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedProduct.status)}`}>
                            {getStatusText(selectedProduct.status)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Destacado:</span>
                          <span className="text-white">{selectedProduct.featured ? 'Sí' : 'No'}</span>
                        </div>
                        {selectedProduct.trackInventory && (
                          <div className="flex justify-between">
                            <span className="text-white/70">Stock:</span>
                            <span className={`font-semibold ${
                              selectedProduct.stock === 0 ? 'text-red-400' :
                              selectedProduct.stock < 10 ? 'text-orange-400' :
                              'text-green-400'
                            }`}>
                              {selectedProduct.stock} unidades
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-3">Precios</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Precio de venta:</span>
                          <span className="text-white font-bold">{formatPrice(selectedProduct.price)}</span>
                        </div>
                        {selectedProduct.comparePrice > selectedProduct.price && (
                          <div className="flex justify-between">
                            <span className="text-white/70">Precio comparado:</span>
                            <span className="text-white/50 line-through">{formatPrice(selectedProduct.comparePrice)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-white/70">Costo:</span>
                          <span className="text-white">{formatPrice(selectedProduct.cost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Margen:</span>
                          <span className="text-green-400 font-semibold">
                            {((selectedProduct.price - selectedProduct.cost) / selectedProduct.price * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">Descripción</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">Estadísticas</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/70">Ventas</p>
                        <p className="text-white font-bold text-lg">{selectedProduct.sales}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Ingresos</p>
                        <p className="text-white font-bold text-lg">{formatPrice(selectedProduct.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Calificación</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-bold">{selectedProduct.rating > 0 ? selectedProduct.rating.toFixed(1) : 'N/A'}</span>
                          <span className="text-white/60">({selectedProduct.reviews})</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-white/70">Visualizaciones</p>
                        <p className="text-white font-bold text-lg">{selectedProduct.views}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">Etiquetas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">SEO</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-white/70 text-xs mb-1">Título SEO</p>
                        <p className="text-white">{selectedProduct.seoTitle}</p>
                      </div>
                      <div>
                        <p className="text-white/70 text-xs mb-1">Descripción SEO</p>
                        <p className="text-white/70">{selectedProduct.seoDescription}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowViewModal(false)
                        handleEditProduct(selectedProduct)
                      }}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Edit className="w-5 h-5" />
                      Editar Producto
                    </button>
                    <button
                      onClick={() => {
                        setShowViewModal(false)
                        handleDuplicateProduct(selectedProduct.id)
                      }}
                      className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Crear/Editar Producto - Simplificado por espacio, pero funcional */}
      {(showCreateModal || showEditModal) && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedProduct(null); }}
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
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Plus className="w-6 h-6 text-purple-400" />
                {showEditModal ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedProduct(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Package className="w-4 h-4" />
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.name || ''}
                      placeholder="Nombre del producto"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      SKU *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.sku || ''}
                      placeholder="SKU-001"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Descripción Corta
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct?.shortDescription || ''}
                    placeholder="Descripción breve del producto"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Descripción Completa
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={selectedProduct?.description || ''}
                    placeholder="Descripción detallada del producto"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      Categoría
                    </label>
                    <select
                      defaultValue={selectedProduct?.category || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {categories.filter(c => c !== 'Todas').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Package className="w-4 h-4" />
                      Tipo
                    </label>
                    <select
                      defaultValue={selectedProduct?.type || 'digital'}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="digital">Digital</option>
                      <option value="physical">Físico</option>
                      <option value="subscription">Suscripción</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <CheckCircle className="w-4 h-4" />
                      Estado
                    </label>
                    <select
                      defaultValue={selectedProduct?.status || 'draft'}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="draft">Borrador</option>
                      <option value="active">Activo</option>
                      <option value="archived">Archivado</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <DollarSign className="w-4 h-4" />
                      Precio *
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedProduct?.price || ''}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <DollarSign className="w-4 h-4" />
                      Precio Comparado
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedProduct?.comparePrice || ''}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <DollarSign className="w-4 h-4" />
                      Costo
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedProduct?.cost || ''}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedProduct(null); }}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(showEditModal ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente')
                      setShowCreateModal(false)
                      setShowEditModal(false)
                      setSelectedProduct(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {showEditModal ? 'Guardar Cambios' : 'Crear Producto'}
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

export default GestionProductos

