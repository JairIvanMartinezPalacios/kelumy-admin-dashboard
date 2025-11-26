import React, { useState, useMemo } from 'react'
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Tag,
  Filter,
  X,
  Save,
  Eye,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  MessageSquare,
  Folder,
  FolderPlus
} from 'lucide-react'

const PlantillasRespuestas = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Bienvenida a nuevos usuarios',
      subject: 'Bienvenido a nuestra plataforma',
      content: 'Hola {{nombre}},\n\n¡Bienvenido a nuestra plataforma! Estamos emocionados de tenerte aquí.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos,\nEquipo de Soporte',
      category: 'Bienvenida',
      tags: ['bienvenida', 'nuevo usuario'],
      variables: ['nombre'],
      usageCount: 145,
      lastUsed: '2024-01-20',
      status: 'active',
      featured: true
    },
    {
      id: 2,
      name: 'Solución de problema de acceso',
      subject: 'Solución a tu problema de acceso',
      content: 'Hola {{nombre}},\n\nHemos revisado tu caso y encontramos la solución.\n\nPor favor, intenta:\n1. Limpiar la caché de tu navegador\n2. Cerrar sesión y volver a iniciar\n3. Si el problema persiste, contáctanos nuevamente\n\nSaludos,\n{{agente}}',
      category: 'Técnico',
      tags: ['acceso', 'técnico', 'solución'],
      variables: ['nombre', 'agente'],
      usageCount: 89,
      lastUsed: '2024-01-19',
      status: 'active',
      featured: false
    },
    {
      id: 3,
      name: 'Confirmación de reembolso',
      subject: 'Confirmación de reembolso',
      content: 'Hola {{nombre}},\n\nTu solicitud de reembolso ha sido procesada.\n\nMonto: {{monto}}\nMétodo: {{metodo}}\nTiempo estimado: 5-7 días hábiles\n\nSi tienes alguna pregunta, contáctanos.\n\nSaludos,\nEquipo de Soporte',
      category: 'Pagos',
      tags: ['reembolso', 'pago'],
      variables: ['nombre', 'monto', 'metodo'],
      usageCount: 67,
      lastUsed: '2024-01-18',
      status: 'active',
      featured: false
    }
  ])

  const categories = ['Todas', 'Bienvenida', 'Técnico', 'Pagos', 'Certificados', 'General']

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = filterCategory === 'all' || template.category === filterCategory
      
      return matchesSearch && matchesCategory
    })
  }, [templates, searchTerm, filterCategory])

  const stats = useMemo(() => {
    return {
      total: templates.length,
      active: templates.filter(t => t.status === 'active').length,
      totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0),
      featured: templates.filter(t => t.featured).length
    }
  }, [templates])

  const handleCreateTemplate = () => {
    setShowCreateModal(true)
  }

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template)
    setShowEditModal(true)
  }

  const handleDeleteTemplate = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta plantilla?')) {
      setTemplates(prev => prev.filter(t => t.id !== id))
      alert('Plantilla eliminada exitosamente')
    }
  }

  const handleUseTemplate = (id) => {
    const template = templates.find(t => t.id === id)
    setTemplates(prev => prev.map(t => 
      t.id === id 
        ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date().toISOString().split('T')[0] }
        : t
    ))
    alert(`Plantilla "${template.name}" copiada al portapapeles. Puedes pegarla en tu respuesta.`)
  }

  const handleToggleFeatured = (id) => {
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, featured: !t.featured } : t
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Plantillas de Respuestas</h2>
          <p className="text-white/70">Gestiona plantillas para respuestas rápidas</p>
        </div>
        <button
          onClick={handleCreateTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Plantilla</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total Plantillas</p>
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
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{stats.totalUsage}</span>
          </div>
          <p className="text-white/70 text-xs">Usos Totales</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">{stats.featured}</span>
          </div>
          <p className="text-white/70 text-xs">Destacadas</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
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

      {/* Lista de plantillas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {template.featured && (
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  )}
                  <h3 className="text-white font-semibold">{template.name}</h3>
                </div>
                <p className="text-white/70 text-sm mb-2">{template.subject}</p>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                  {template.category}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-white/60 text-xs mb-1">Variables disponibles:</p>
              <div className="flex flex-wrap gap-1">
                {template.variables.map((variable, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30">
                    {`{{${variable}}}`}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/60 mb-4">
              <span>{template.usageCount} usos</span>
              <span>Último uso: {new Date(template.lastUsed).toLocaleDateString('es-MX')}</span>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => handleUseTemplate(template.id)}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Usar
              </button>
              <button
                onClick={() => { setSelectedTemplate(template); setShowPreviewModal(true); }}
                className="p-2 hover:bg-white/10 rounded-lg"
                title="Vista previa"
              >
                <Eye className="w-4 h-4 text-white/70" />
              </button>
              <button
                onClick={() => handleEditTemplate(template)}
                className="p-2 hover:bg-blue-500/20 rounded-lg"
                title="Editar"
              >
                <Edit className="w-4 h-4 text-blue-400" />
              </button>
              <button
                onClick={() => handleToggleFeatured(template.id)}
                className={`p-2 rounded-lg ${
                  template.featured ? 'text-yellow-400 hover:bg-yellow-500/20' : 'text-white/70 hover:bg-white/10'
                }`}
                title={template.featured ? 'Quitar de destacados' : 'Marcar como destacado'}
              >
                <Star className={`w-4 h-4 ${template.featured ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => handleDeleteTemplate(template.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Crear/Editar Plantilla */}
      {(showCreateModal || showEditModal) && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedTemplate(null); }}
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
                <FileText className="w-6 h-6 text-purple-400" />
                {showEditModal ? 'Editar Plantilla' : 'Nueva Plantilla'}
              </h3>
              <button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedTemplate(null); }}
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
                    Nombre de la plantilla *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.name || ''}
                    placeholder="Ej: Bienvenida a nuevos usuarios"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Asunto *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.subject || ''}
                    placeholder="Asunto del mensaje"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Contenido *
                  </label>
                  <textarea
                    rows={10}
                    defaultValue={selectedTemplate?.content || ''}
                    placeholder="Escribe el contenido de la plantilla. Usa {{variable}} para variables dinámicas."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none font-mono text-sm"
                  />
                  <p className="text-white/60 text-xs mt-2">
                    Usa variables como {'{{nombre}}'}, {'{{agente}}'}, {'{{monto}}'}, etc.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      Categoría
                    </label>
                    <select
                      defaultValue={selectedTemplate?.category || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {categories.filter(c => c !== 'Todas').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      Etiquetas (separadas por comas)
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedTemplate?.tags?.join(', ') || ''}
                      placeholder="bienvenida, nuevo usuario"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={selectedTemplate?.featured || false}
                      className="rounded"
                    />
                    <span className="text-white/90 text-sm">Marcar como destacada</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedTemplate(null); }}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(showEditModal ? 'Plantilla actualizada exitosamente' : 'Plantilla creada exitosamente')
                      setShowCreateModal(false)
                      setShowEditModal(false)
                      setSelectedTemplate(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {showEditModal ? 'Guardar Cambios' : 'Crear Plantilla'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vista Previa */}
      {showPreviewModal && selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowPreviewModal(false); setSelectedTemplate(null); }}
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
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-400" />
                Vista Previa
              </h3>
              <button
                onClick={() => { setShowPreviewModal(false); setSelectedTemplate(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="mb-4">
                  <p className="text-white/60 text-sm mb-1">Asunto:</p>
                  <p className="text-white font-semibold">{selectedTemplate.subject}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-2">Contenido:</p>
                  <div className="bg-white/10 rounded-lg p-4">
                    <pre className="text-white whitespace-pre-wrap font-sans text-sm">
                      {selectedTemplate.content}
                    </pre>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-2">Variables disponibles:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30">
                        {`{{${variable}}}`}
                      </span>
                    ))}
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

export default PlantillasRespuestas

