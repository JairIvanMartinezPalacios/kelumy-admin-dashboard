import React, { useState, useMemo } from 'react'
import {
  Folder,
  FolderOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Tag,
  Package,
  TrendingUp,
  BarChart3,
  X,
  Save,
  Upload,
  Download,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  FileText,
  Settings,
  CheckCircle
} from 'lucide-react'

const GestionCategorias = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Cursos Online',
      slug: 'cursos-online',
      description: 'Cursos y capacitaciones en línea',
      parentId: null,
      image: 'https://via.placeholder.com/200x200?text=Cursos',
      productsCount: 45,
      status: 'active',
      seoTitle: 'Cursos Online - Aprende desde casa',
      seoDescription: 'Explora nuestra amplia gama de cursos online',
      createdAt: '2024-01-01',
      subcategories: [
        {
          id: 11,
          name: 'Programación',
          slug: 'programacion',
          description: 'Cursos de programación y desarrollo',
          parentId: 1,
          image: null,
          productsCount: 23,
          status: 'active',
          seoTitle: 'Cursos de Programación',
          seoDescription: 'Aprende a programar desde cero',
          createdAt: '2024-01-05'
        },
        {
          id: 12,
          name: 'Diseño',
          slug: 'diseno',
          description: 'Cursos de diseño gráfico y UX/UI',
          parentId: 1,
          image: null,
          productsCount: 15,
          status: 'active',
          seoTitle: 'Cursos de Diseño',
          seoDescription: 'Aprende diseño gráfico y UX/UI',
          createdAt: '2024-01-05'
        }
      ]
    },
    {
      id: 2,
      name: 'Certificados',
      slug: 'certificados',
      description: 'Certificados digitales y físicos',
      parentId: null,
      image: 'https://via.placeholder.com/200x200?text=Certificados',
      productsCount: 12,
      status: 'active',
      seoTitle: 'Certificados Profesionales',
      seoDescription: 'Obtén certificados validados',
      createdAt: '2024-01-02'
    },
    {
      id: 3,
      name: 'Libros',
      slug: 'libros',
      description: 'Libros físicos y digitales',
      parentId: null,
      image: 'https://via.placeholder.com/200x200?text=Libros',
      productsCount: 8,
      status: 'active',
      seoTitle: 'Libros y Publicaciones',
      seoDescription: 'Libros físicos y digitales',
      createdAt: '2024-01-03'
    },
    {
      id: 4,
      name: 'Suscripciones',
      slug: 'suscripciones',
      description: 'Planes de suscripción y membresías',
      parentId: null,
      image: 'https://via.placeholder.com/200x200?text=Suscripciones',
      productsCount: 5,
      status: 'active',
      seoTitle: 'Planes de Suscripción',
      seoDescription: 'Accede a contenido exclusivo',
      createdAt: '2024-01-04'
    }
  ])

  const filteredCategories = useMemo(() => {
    const flattenCategories = (cats) => {
      let result = []
      cats.forEach(cat => {
        result.push(cat)
        if (cat.subcategories && cat.subcategories.length > 0) {
          result = result.concat(flattenCategories(cat.subcategories))
        }
      })
      return result
    }

    const allCategories = flattenCategories(categories)
    return allCategories.filter(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [categories, searchTerm])

  const stats = useMemo(() => {
    const flattenCategories = (cats) => {
      let result = []
      cats.forEach(cat => {
        result.push(cat)
        if (cat.subcategories && cat.subcategories.length > 0) {
          result = result.concat(flattenCategories(cat.subcategories))
        }
      })
      return result
    }

    const allCategories = flattenCategories(categories)
    return {
      total: allCategories.length,
      active: allCategories.filter(c => c.status === 'active').length,
      totalProducts: allCategories.reduce((sum, c) => sum + c.productsCount, 0)
    }
  }, [categories])

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const handleCreateCategory = () => {
    setShowCreateModal(true)
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setShowEditModal(true)
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      const deleteCategory = (cats) => {
        return cats.filter(cat => {
          if (cat.id === id) return false
          if (cat.subcategories && cat.subcategories.length > 0) {
            cat.subcategories = deleteCategory(cat.subcategories)
          }
          return true
        })
      }
      setCategories(deleteCategory(categories))
      alert('Categoría eliminada exitosamente')
    }
  }

  const renderCategory = (category, level = 0) => {
    const hasSubcategories = category.subcategories && category.subcategories.length > 0
    const isExpanded = expandedCategories.has(category.id)

    return (
      <div key={category.id} className="mb-2">
        <div
          className={`bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all ${
            level > 0 ? 'ml-6' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {hasSubcategories && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-white/70" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/70" />
                  )}
                </button>
              )}
              {!hasSubcategories && <div className="w-6" />}
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              ) : (
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Folder className="w-6 h-6 text-purple-400" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-white font-semibold">{category.name}</h3>
                <p className="text-white/60 text-xs font-mono">{category.slug}</p>
                {category.description && (
                  <p className="text-white/70 text-sm mt-1">{category.description}</p>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {category.productsCount} productos
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                  category.status === 'active' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                }`}>
                  {category.status === 'active' ? 'Activa' : 'Inactiva'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => handleEditCategory(category)}
                className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                title="Editar"
              >
                <Edit className="w-4 h-4 text-blue-400" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
        {hasSubcategories && isExpanded && (
          <div className="mt-2">
            {category.subcategories.map(subcat => renderCategory(subcat, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Categorías</h2>
          <p className="text-white/70">Organiza tus productos en categorías y subcategorías</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exportando categorías...')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleCreateCategory}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Categoría</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Folder className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total Categorías</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.active}</span>
          </div>
          <p className="text-white/70 text-xs">Activas</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{stats.totalProducts}</span>
          </div>
          <p className="text-white/70 text-xs">Total Productos</p>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Lista de categorías */}
      {categories.length > 0 ? (
        <div className="space-y-2">
          {categories.map(category => renderCategory(category))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <Folder className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg mb-2">No hay categorías</p>
          <p className="text-white/50 text-sm mb-4">Crea tu primera categoría para organizar tus productos</p>
          <button
            onClick={handleCreateCategory}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Crear Primera Categoría
          </button>
        </div>
      )}

      {/* Modal de Crear/Editar Categoría */}
      {(showCreateModal || showEditModal) && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedCategory(null); }}
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
                <Folder className="w-6 h-6 text-purple-400" />
                {showEditModal ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedCategory(null); }}
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
                    Nombre de la Categoría *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCategory?.name || ''}
                    placeholder="Nombre de la categoría"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedCategory?.description || ''}
                    placeholder="Descripción de la categoría"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Folder className="w-4 h-4" />
                    Categoría Padre
                  </label>
                  <select
                    defaultValue={selectedCategory?.parentId || ''}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Ninguna (Categoría principal)</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedCategory(null); }}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(showEditModal ? 'Categoría actualizada exitosamente' : 'Categoría creada exitosamente')
                      setShowCreateModal(false)
                      setShowEditModal(false)
                      setSelectedCategory(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {showEditModal ? 'Guardar Cambios' : 'Crear Categoría'}
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

export default GestionCategorias

