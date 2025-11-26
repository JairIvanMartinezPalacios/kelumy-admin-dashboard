import React, { useState, useMemo } from 'react'
import {
  HelpCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  Tag,
  Star,
  TrendingUp,
  Download,
  Upload,
  Copy,
  X,
  Save,
  FileText,
  CheckCircle,
  AlertCircle,
  Filter,
  Grid,
  List,
  ArrowUp,
  ArrowDown,
  BookOpen,
  MessageSquare,
  BarChart3
} from 'lucide-react'

const GestionFAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [selectedFAQ, setSelectedFAQ] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [viewMode, setViewMode] = useState('list')
  const [sortBy, setSortBy] = useState('popularidad')
  const [sortOrder, setSortOrder] = useState('desc')

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: '¿Cómo puedo acceder a mis cursos?',
      answer: 'Para acceder a tus cursos, inicia sesión en tu cuenta y ve a la sección "Mis Cursos". Allí encontrarás todos los cursos en los que estás inscrito. Haz clic en el curso que deseas ver y comenzarás a aprender.',
      category: 'Acceso',
      tags: ['acceso', 'cursos', 'inicio'],
      views: 1250,
      helpful: 892,
      notHelpful: 45,
      status: 'published',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-18',
      author: 'Ana López',
      featured: true
    },
    {
      id: 2,
      question: '¿Cómo puedo recuperar mi contraseña?',
      answer: 'Si olvidaste tu contraseña, ve a la página de inicio de sesión y haz clic en "¿Olvidaste tu contraseña?". Ingresa tu correo electrónico y recibirás un enlace para restablecer tu contraseña. El enlace expira en 24 horas.',
      category: 'Cuenta',
      tags: ['contraseña', 'seguridad', 'cuenta'],
      views: 890,
      helpful: 654,
      notHelpful: 23,
      status: 'published',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      author: 'Pedro Martínez',
      featured: true
    },
    {
      id: 3,
      question: '¿Puedo descargar los materiales del curso?',
      answer: 'Sí, la mayoría de los cursos permiten descargar materiales como PDFs, presentaciones y recursos adicionales. Busca el botón de descarga junto a cada material en la sección de recursos del curso.',
      category: 'Contenido',
      tags: ['descarga', 'materiales', 'recursos'],
      views: 567,
      helpful: 423,
      notHelpful: 12,
      status: 'published',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-10',
      author: 'Sofía Ramírez',
      featured: false
    },
    {
      id: 4,
      question: '¿Cómo obtengo mi certificado?',
      answer: 'Para obtener tu certificado, debes completar al menos el 80% del curso y aprobar el examen final con una calificación mínima de 70%. Una vez cumplidos estos requisitos, podrás descargar tu certificado desde la sección "Certificados" en tu perfil.',
      category: 'Certificados',
      tags: ['certificado', 'completar', 'examen'],
      views: 1234,
      helpful: 987,
      notHelpful: 34,
      status: 'published',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
      author: 'Ana López',
      featured: true
    },
    {
      id: 5,
      question: '¿Puedo solicitar un reembolso?',
      answer: 'Sí, puedes solicitar un reembolso dentro de los primeros 30 días después de la compra, siempre que no hayas completado más del 25% del curso. Para solicitar un reembolso, ve a "Mis Compras" y selecciona la opción de reembolso.',
      category: 'Pagos',
      tags: ['reembolso', 'pago', 'devolución'],
      views: 456,
      helpful: 321,
      notHelpful: 15,
      status: 'published',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-05',
      author: 'Pedro Martínez',
      featured: false
    },
    {
      id: 6,
      question: '¿Los cursos tienen fecha de expiración?',
      answer: 'La mayoría de los cursos tienen acceso de por vida una vez que los compras. Sin embargo, algunos cursos con certificaciones específicas pueden tener fechas de finalización. Revisa la información del curso antes de comprarlo.',
      category: 'Acceso',
      tags: ['acceso', 'expiración', 'duración'],
      views: 789,
      helpful: 567,
      notHelpful: 28,
      status: 'draft',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      author: 'Sofía Ramírez',
      featured: false
    }
  ])

  const categories = ['Todas', 'Acceso', 'Cuenta', 'Contenido', 'Certificados', 'Pagos', 'Técnico', 'General']

  const filteredAndSortedFAQs = useMemo(() => {
    let filtered = faqs.filter(faq => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = filterCategory === 'all' || faq.category === filterCategory
      
      return matchesSearch && matchesCategory
    })

    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'popularidad':
          aValue = a.views
          bValue = b.views
          break
        case 'utilidad':
          aValue = a.helpful - a.notHelpful
          bValue = b.helpful - b.notHelpful
          break
        case 'fecha':
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        case 'pregunta':
          aValue = a.question.toLowerCase()
          bValue = b.question.toLowerCase()
          break
        default:
          aValue = a.views
          bValue = b.views
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [faqs, searchTerm, filterCategory, sortBy, sortOrder])

  const stats = useMemo(() => {
    return {
      total: faqs.length,
      published: faqs.filter(f => f.status === 'published').length,
      draft: faqs.filter(f => f.status === 'draft').length,
      featured: faqs.filter(f => f.featured).length,
      totalViews: faqs.reduce((sum, f) => sum + f.views, 0),
      totalHelpful: faqs.reduce((sum, f) => sum + f.helpful, 0)
    }
  }, [faqs])

  const toggleExpand = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleCreateFAQ = () => {
    setShowCreateModal(true)
  }

  const handleEditFAQ = (faq) => {
    setSelectedFAQ(faq)
    setShowEditModal(true)
  }

  const handleDeleteFAQ = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta pregunta frecuente?')) {
      setFaqs(prev => prev.filter(f => f.id !== id))
      alert('FAQ eliminada exitosamente')
    }
  }

  const handleToggleFeatured = (id) => {
    setFaqs(prev => prev.map(f => 
      f.id === id ? { ...f, featured: !f.featured } : f
    ))
  }

  const handleToggleStatus = (id) => {
    setFaqs(prev => prev.map(f => 
      f.id === id ? { ...f, status: f.status === 'published' ? 'draft' : 'published' } : f
    ))
  }

  const handleExportFAQ = (format) => {
    alert(`Exportando FAQs en formato ${format}. Total: ${faqs.length} preguntas`)
  }

  const handleImportFAQ = () => {
    alert('Abriendo herramienta de importación de FAQs. Aquí se podrían importar desde CSV o JSON.')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Preguntas Frecuentes (FAQ)</h2>
          <p className="text-white/70">Gestiona las preguntas frecuentes y respuestas</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleImportFAQ}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Importar</span>
          </button>
          <button
            onClick={() => handleExportFAQ('PDF')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleCreateFAQ}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva FAQ</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total FAQs</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.published}</span>
          </div>
          <p className="text-white/70 text-xs">Publicadas</p>
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
          <p className="text-white/70 text-xs">Destacadas</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-bold text-cyan-400">{stats.totalViews.toLocaleString()}</span>
          </div>
          <p className="text-white/70 text-xs">Visualizaciones</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <span className="text-2xl font-bold text-pink-400">{stats.totalHelpful.toLocaleString()}</span>
          </div>
          <p className="text-white/70 text-xs">Útiles</p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Buscar preguntas, respuestas o etiquetas..."
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
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="popularidad-desc">Más populares</option>
            <option value="popularidad-asc">Menos populares</option>
            <option value="utilidad-desc">Más útiles</option>
            <option value="utilidad-asc">Menos útiles</option>
            <option value="fecha-desc">Más recientes</option>
            <option value="fecha-asc">Más antiguas</option>
            <option value="pregunta-asc">A-Z</option>
            <option value="pregunta-desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Lista de FAQs */}
      <div className="space-y-3">
        {filteredAndSortedFAQs.length > 0 ? (
          filteredAndSortedFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden"
            >
              <div
                className="p-5 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => toggleExpand(faq.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {faq.featured && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        faq.status === 'published' 
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {faq.status === 'published' ? 'Publicada' : 'Borrador'}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{faq.question}</h3>
                    {expandedItems.has(faq.id) && (
                      <div className="mt-3">
                        <p className="text-white/70 text-sm leading-relaxed mb-3">{faq.answer}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {faq.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white/5 text-white/70 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {faq.views} vistas
                          </span>
                          <span className="flex items-center gap-1 text-green-400">
                            <TrendingUp className="w-3 h-3" />
                            {faq.helpful} útiles
                          </span>
                          <span className="flex items-center gap-1 text-red-400">
                            <AlertCircle className="w-3 h-3" />
                            {faq.notHelpful} no útiles
                          </span>
                          <span className="text-white/50">
                            Por {faq.author} • {new Date(faq.updatedAt).toLocaleDateString('es-MX')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="w-4 h-4 text-white/70" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/70" />
                      )}
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(faq.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        faq.featured ? 'text-yellow-400 hover:bg-yellow-500/20' : 'text-white/70 hover:bg-white/10'
                      }`}
                      title={faq.featured ? 'Quitar de destacados' : 'Marcar como destacado'}
                    >
                      <Star className={`w-4 h-4 ${faq.featured ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleEditFAQ(faq)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(faq.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        faq.status === 'published' 
                          ? 'text-green-400 hover:bg-green-500/20' 
                          : 'text-yellow-400 hover:bg-yellow-500/20'
                      }`}
                      title={faq.status === 'published' ? 'Despublicar' : 'Publicar'}
                    >
                      {faq.status === 'published' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteFAQ(faq.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
            <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/60 text-sm">No se encontraron FAQs</p>
          </div>
        )}
      </div>

      {/* Modal de Crear/Editar FAQ */}
      {(showCreateModal || showEditModal) && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedFAQ(null); }}
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
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-3xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-purple-400" />
                {showEditModal ? 'Editar FAQ' : 'Nueva FAQ'}
              </h3>
              <button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedFAQ(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Pregunta *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedFAQ?.question || ''}
                    placeholder="Escribe la pregunta..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Respuesta *
                  </label>
                  <textarea
                    rows={8}
                    defaultValue={selectedFAQ?.answer || ''}
                    placeholder="Escribe la respuesta detallada..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      Categoría
                    </label>
                    <select
                      defaultValue={selectedFAQ?.category || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {categories.filter(c => c !== 'Todas').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <BarChart3 className="w-4 h-4" />
                      Estado
                    </label>
                    <select
                      defaultValue={selectedFAQ?.status || 'draft'}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="draft">Borrador</option>
                      <option value="published">Publicada</option>
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
                    defaultValue={selectedFAQ?.tags?.join(', ') || ''}
                    placeholder="acceso, cursos, inicio"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={selectedFAQ?.featured || false}
                      className="rounded"
                    />
                    <span className="text-white/90 text-sm">Marcar como destacada</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedFAQ(null); }}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(showEditModal ? 'FAQ actualizada exitosamente' : 'FAQ creada exitosamente')
                      setShowCreateModal(false)
                      setShowEditModal(false)
                      setSelectedFAQ(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {showEditModal ? 'Guardar Cambios' : 'Crear FAQ'}
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

export default GestionFAQ

