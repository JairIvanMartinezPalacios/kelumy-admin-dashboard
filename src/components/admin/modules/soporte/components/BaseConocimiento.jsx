import React, { useState, useMemo } from 'react'
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  Folder,
  FolderOpen,
  Download,
  Upload,
  Share2,
  Copy,
  X,
  Save,
  Tag,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Filter,
  Grid,
  List,
  Image as ImageIcon,
  Video,
  File,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Archive,
  FolderPlus,
  FilePlus
} from 'lucide-react'

const BaseConocimiento = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [expandedFolders, setExpandedFolders] = useState(new Set(['tutoriales', 'guias']))

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Guía de inicio rápido para nuevos usuarios',
      content: 'Esta guía te ayudará a comenzar con nuestra plataforma...',
      category: 'Tutoriales',
      folder: 'tutoriales',
      tags: ['inicio', 'guía', 'nuevos usuarios'],
      views: 2340,
      helpful: 1890,
      author: 'Ana López',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      status: 'published',
      featured: true,
      type: 'article'
    },
    {
      id: 2,
      title: 'Cómo configurar tu perfil',
      content: 'Aprende a personalizar tu perfil y configuraciones...',
      category: 'Guías',
      folder: 'guias',
      tags: ['perfil', 'configuración'],
      views: 1567,
      helpful: 1234,
      author: 'Pedro Martínez',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15',
      status: 'published',
      featured: false,
      type: 'article'
    },
    {
      id: 3,
      title: 'Video: Introducción a los cursos',
      content: 'Video tutorial sobre cómo navegar por los cursos...',
      category: 'Videos',
      folder: 'videos',
      tags: ['video', 'cursos', 'tutorial'],
      views: 3456,
      helpful: 2789,
      author: 'Sofía Ramírez',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12',
      status: 'published',
      featured: true,
      type: 'video'
    }
  ])

  const folders = [
    { id: 'tutoriales', name: 'Tutoriales', icon: BookOpen, count: 12 },
    { id: 'guias', name: 'Guías', icon: FileText, count: 8 },
    { id: 'videos', name: 'Videos', icon: Video, count: 15 },
    { id: 'faqs', name: 'FAQs', icon: FileText, count: 25 },
    { id: 'recursos', name: 'Recursos', icon: Folder, count: 5 }
  ]

  const categories = ['Todas', 'Tutoriales', 'Guías', 'Videos', 'FAQs', 'Recursos']

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = filterCategory === 'all' || article.category === filterCategory
      
      return matchesSearch && matchesCategory
    })
  }, [articles, searchTerm, filterCategory])

  const stats = useMemo(() => {
    return {
      total: articles.length,
      published: articles.filter(a => a.status === 'published').length,
      views: articles.reduce((sum, a) => sum + a.views, 0),
      helpful: articles.reduce((sum, a) => sum + a.helpful, 0)
    }
  }, [articles])

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(folderId)) {
        newSet.delete(folderId)
      } else {
        newSet.add(folderId)
      }
      return newSet
    })
  }

  const handleCreateArticle = () => {
    setShowCreateModal(true)
  }

  const handleDeleteArticle = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      setArticles(prev => prev.filter(a => a.id !== id))
      alert('Artículo eliminado exitosamente')
    }
  }

  const handleExportArticle = (id) => {
    alert(`Exportando artículo ${id}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Base de Conocimiento</h2>
          <p className="text-white/70">Gestiona artículos, guías y recursos de ayuda</p>
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
            onClick={() => alert('Exportando base de conocimiento...')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleCreateArticle}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Artículo</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total Artículos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.published}</span>
          </div>
          <p className="text-white/70 text-xs">Publicados</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-bold text-cyan-400">{stats.views.toLocaleString()}</span>
          </div>
          <p className="text-white/70 text-xs">Visualizaciones</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <span className="text-2xl font-bold text-pink-400">{stats.helpful.toLocaleString()}</span>
          </div>
          <p className="text-white/70 text-xs">Útiles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Carpetas */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Carpetas</h3>
              <button className="p-1.5 hover:bg-white/10 rounded-lg">
                <FolderPlus className="w-4 h-4 text-white/70" />
              </button>
            </div>
            <div className="space-y-1">
              {folders.map(folder => {
                const Icon = folder.icon
                const isExpanded = expandedFolders.has(folder.id)
                return (
                  <div key={folder.id}>
                    <button
                      onClick={() => toggleFolder(folder.id)}
                      className="w-full flex items-center justify-between p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <FolderOpen className="w-4 h-4 text-white/70" />
                        ) : (
                          <Folder className="w-4 h-4 text-white/70" />
                        )}
                        <span className="text-white/90 text-sm">{folder.name}</span>
                      </div>
                      <span className="text-white/60 text-xs">{folder.count}</span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filtros */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'Todas' ? 'all' : cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de artículos */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map(article => (
                <div
                  key={article.id}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  onClick={() => setSelectedItem(article)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      {article.type === 'video' ? (
                        <Video className="w-5 h-5 text-purple-400" />
                      ) : (
                        <FileText className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                    {article.featured && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{article.content}</p>
                  <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                    <span>{article.category}</span>
                    <span>{article.views} vistas</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white/5 text-white/70 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleExportArticle(article.id); }}
                      className="p-1.5 hover:bg-white/10 rounded-lg"
                    >
                      <Download className="w-4 h-4 text-white/70" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); alert('Editando artículo...'); }}
                      className="p-1.5 hover:bg-blue-500/20 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteArticle(article.id); }}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredArticles.map(article => (
                <div
                  key={article.id}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  onClick={() => setSelectedItem(article)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {article.type === 'video' ? (
                          <Video className="w-5 h-5 text-purple-400" />
                        ) : (
                          <FileText className="w-5 h-5 text-purple-400" />
                        )}
                        <h3 className="text-white font-semibold">{article.title}</h3>
                        {article.featured && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <p className="text-white/70 text-sm mb-3">{article.content}</p>
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span>{article.category}</span>
                        <span>{article.views} vistas</span>
                        <span>{article.helpful} útiles</span>
                        <span>Por {article.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleExportArticle(article.id); }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <Download className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); alert('Editando artículo...'); }}
                        className="p-2 hover:bg-blue-500/20 rounded-lg"
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteArticle(article.id); }}
                        className="p-2 hover:bg-red-500/20 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Crear Artículo */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowCreateModal(false)}
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
                Nuevo Artículo
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Título *
                  </label>
                  <input
                    type="text"
                    placeholder="Título del artículo..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Contenido *
                  </label>
                  <textarea
                    rows={12}
                    placeholder="Escribe el contenido del artículo..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      Categoría
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      {categories.filter(c => c !== 'Todas').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Folder className="w-4 h-4" />
                      Carpeta
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Tag className="w-4 h-4" />
                    Etiquetas (separadas por comas)
                  </label>
                  <input
                    type="text"
                    placeholder="inicio, guía, tutorial"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert('Artículo creado exitosamente')
                      setShowCreateModal(false)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Crear Artículo
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

export default BaseConocimiento

