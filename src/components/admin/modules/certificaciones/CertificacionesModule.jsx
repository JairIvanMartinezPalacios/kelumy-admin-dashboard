import React, { useState } from 'react'
import { 
  Award, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star,
  FileText,
  Send,
  Settings,
  BarChart3,
  TrendingUp,
  Shield,
  Globe
} from 'lucide-react'

const CertificacionesModule = () => {
  const [activeTab, setActiveTab] = useState('certificados')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Datos de ejemplo para certificaciones
  const certificaciones = [
    {
      id: 1,
      nombre: 'Certificado en Ciencias Básicas',
      descripcion: 'Certificación en matemáticas, física y química',
      categoria: 'Ciencias',
      duracion: '6 meses',
      precio: '$299',
      estudiantes: 1247,
      completados: 892,
      rating: 4.8,
      estado: 'activo',
      fechaCreacion: '2024-01-15',
      fechaVencimiento: '2025-01-15',
      requisitos: ['Completar 80% del curso', 'Aprobar examen final'],
      habilidades: ['Matemáticas', 'Física', 'Química', 'Análisis']
    },
    {
      id: 2,
      nombre: 'Certificado en Programación Web',
      descripcion: 'Desarrollo de aplicaciones web modernas',
      categoria: 'Tecnología',
      duracion: '4 meses',
      precio: '$399',
      estudiantes: 2156,
      completados: 1834,
      rating: 4.9,
      estado: 'activo',
      fechaCreacion: '2024-02-01',
      fechaVencimiento: '2025-02-01',
      requisitos: ['Proyecto final', 'Portafolio de trabajos'],
      habilidades: ['HTML', 'CSS', 'JavaScript', 'React']
    },
    {
      id: 3,
      nombre: 'Certificado en Robótica Educativa',
      descripcion: 'Fundamentos de robótica para educadores',
      categoria: 'Educación',
      duracion: '3 meses',
      precio: '$199',
      estudiantes: 567,
      completados: 423,
      rating: 4.7,
      estado: 'borrador',
      fechaCreacion: '2024-03-10',
      fechaVencimiento: '2025-03-10',
      requisitos: ['Proyecto robótico', 'Documentación'],
      habilidades: ['Robótica', 'Programación', 'Educación']
    }
  ]

  const estadisticas = {
    totalCertificados: 15,
    certificadosActivos: 12,
    estudiantesCertificados: 3149,
    ingresosGenerados: 125430,
    certificadosPendientes: 3,
    certificadosVencidos: 2
  }

  const tabs = [
    { id: 'certificados', label: 'Certificados', icon: Award },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings }
  ]

  const renderCertificados = () => (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Certificados</h2>
          <p className="text-white/70">Administra y configura los certificados digitales</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Certificado</span>
          </button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar certificados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="borrador">Borradores</option>
            <option value="vencido">Vencidos</option>
          </select>
          <button className="p-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista de certificados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {certificaciones.map((cert) => (
          <div key={cert.id} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{cert.nombre}</h3>
                  <p className="text-white/70 text-sm">{cert.categoria}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cert.estado === 'activo' 
                    ? 'bg-green-500/20 text-green-300' 
                    : cert.estado === 'borrador'
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {cert.estado}
                </span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-white/70 text-sm mb-4">{cert.descripcion}</p>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{cert.estudiantes}</p>
                <p className="text-white/70 text-xs">Estudiantes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{cert.completados}</p>
                <p className="text-white/70 text-xs">Completados</p>
              </div>
            </div>

            {/* Rating y precio */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{cert.rating}</span>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{cert.precio}</p>
                <p className="text-white/70 text-xs">{cert.duracion}</p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Eye className="w-4 h-4 text-white/70" />
                <span className="text-white text-sm">Ver</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Edit className="w-4 h-4 text-white/70" />
                <span className="text-white text-sm">Editar</span>
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Download className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEstadisticas = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Estadísticas de Certificaciones</h2>
        <p className="text-white/70">Análisis y métricas de rendimiento</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{estadisticas.totalCertificados}</span>
          </div>
          <h3 className="text-white font-semibold mb-1">Total Certificados</h3>
          <p className="text-white/70 text-sm">Certificados disponibles</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{estadisticas.estudiantesCertificados}</span>
          </div>
          <h3 className="text-white font-semibold mb-1">Estudiantes Certificados</h3>
          <p className="text-white/70 text-sm">Total de graduados</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">${estadisticas.ingresosGenerados.toLocaleString()}</span>
          </div>
          <h3 className="text-white font-semibold mb-1">Ingresos Generados</h3>
          <p className="text-white/70 text-sm">En certificaciones</p>
        </div>
      </div>

      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Certificados por Categoría</h3>
          <div className="space-y-3">
            {[
              { categoria: 'Ciencias', cantidad: 5, porcentaje: 33 },
              { categoria: 'Tecnología', cantidad: 4, porcentaje: 27 },
              { categoria: 'Educación', cantidad: 3, porcentaje: 20 },
              { categoria: 'Matemáticas', cantidad: 2, porcentaje: 13 },
              { categoria: 'Otros', cantidad: 1, porcentaje: 7 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/70">{item.categoria}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${item.porcentaje}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{item.cantidad}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Estado de Certificados</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Activos</span>
              </div>
              <span className="text-white font-semibold">{estadisticas.certificadosActivos}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Pendientes</span>
              </div>
              <span className="text-white font-semibold">{estadisticas.certificadosPendientes}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-white">Vencidos</span>
              </div>
              <span className="text-white font-semibold">{estadisticas.certificadosVencidos}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderConfiguracion = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Configuración de Certificaciones</h2>
        <p className="text-white/70">Configura los parámetros del sistema de certificaciones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuración general */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Configuración General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Plantilla de Certificado</label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option>Plantilla Estándar</option>
                <option>Plantilla Premium</option>
                <option>Plantilla Personalizada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Validez por Defecto</label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option>1 año</option>
                <option>2 años</option>
                <option>3 años</option>
                <option>Permanente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Requisitos Mínimos</label>
              <input
                type="number"
                placeholder="80"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Configuración de notificaciones */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Notificaciones</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Notificar vencimientos</p>
                <p className="text-white/70 text-sm">Alertas antes del vencimiento</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Certificados automáticos</p>
                <p className="text-white/70 text-sm">Generar automáticamente al completar</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Verificación blockchain</p>
                <p className="text-white/70 text-sm">Certificados verificables</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones del sistema */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Acciones del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5 text-white/70" />
            <span className="text-white">Exportar Certificados</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Send className="w-5 h-5 text-white/70" />
            <span className="text-white">Enviar Recordatorios</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-white/70" />
            <span className="text-white">Configurar Plantillas</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'certificados': return renderCertificados()
      case 'estadisticas': return renderEstadisticas()
      case 'configuracion': return renderConfiguracion()
      default: return renderCertificados()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Certificaciones</h1>
            <p className="text-white/70">Gestiona los certificados digitales y su configuración</p>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-lg p-1 border border-white/20">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Contenido de la tab activa */}
        {renderTabContent()}
      </div>
    </div>
  )
}

export default CertificacionesModule