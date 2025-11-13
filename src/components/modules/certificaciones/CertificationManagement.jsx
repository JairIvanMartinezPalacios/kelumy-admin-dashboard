// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Award,            // Icono de certificado para diplomas y certificaciones
  Plus,             // Icono de agregar para crear certificados
  Search,           // Icono de búsqueda para filtrar certificados
  Filter,           // Icono de filtros para ordenar certificados
  Download,         // Icono de descargar para exportar certificados
  Eye,              // Icono de vista para ver detalles
  Edit,             // Icono de editar para modificar certificados
  Trash2,           // Icono de eliminar para borrar certificados
  QrCode,           // Icono de QR para códigos de verificación
  CheckCircle,      // Icono de verificado para certificados válidos
  Clock,            // Icono de pendiente para certificados en proceso
  AlertCircle,      // Icono de error para certificados inválidos
  Users,            // Icono de usuarios para estudiantes certificados
  Calendar,         // Icono de calendario para fechas de emisión
  FileText,         // Icono de documento para plantillas
  Shield,           // Icono de seguridad para verificación
  RefreshCw         // Icono de actualizar para refrescar datos
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - CertificationManagement
// ========================================

// Define el componente funcional CertificationManagement que gestiona certificaciones y diplomas
// Incluye funcionalidades para emisión, verificación, plantillas y gestión de certificados digitales
const CertificationManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué subsección está activa
  // 'certificates': certificados, 'templates': plantillas, 'verification': verificación
  const [activeTab, setActiveTab] = useState('certificates')
  
  // Estado para el término de búsqueda en certificados
  const [searchTerm, setSearchTerm] = useState('')
  
  // Estado para filtrar por estado de certificados
  // 'all': todos, 'issued': emitidos, 'pending': pendientes, 'revoked': revocados
  const [statusFilter, setStatusFilter] = useState('all')
  
  // ========================================
  // DATOS ESTÁTICOS - Certificados emitidos
  // ========================================
  
  const certificates = [
    {
      id: 'CERT-001',
      studentName: 'Juan Pérez',
      courseName: 'Curso de React',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'valid',
      verificationCode: 'ABC123XYZ',
      qrCode: 'https://kelumy.com/verify/ABC123XYZ',
      grade: 95,
      instructor: 'Ana Martínez'
    },
    {
      id: 'CERT-002',
      studentName: 'María García',
      courseName: 'Curso de JavaScript',
      issueDate: '2024-01-10',
      expiryDate: '2025-01-10',
      status: 'valid',
      verificationCode: 'DEF456UVW',
      qrCode: 'https://kelumy.com/verify/DEF456UVW',
      grade: 88,
      instructor: 'Luis Rodríguez'
    },
    {
      id: 'CERT-003',
      studentName: 'Carlos López',
      courseName: 'Bundle Frontend Completo',
      issueDate: '2024-01-05',
      expiryDate: '2025-01-05',
      status: 'expired',
      verificationCode: 'GHI789RST',
      qrCode: 'https://kelumy.com/verify/GHI789RST',
      grade: 92,
      instructor: 'Ana Martínez'
    }
  ]
  
  const templates = [
    {
      id: 1,
      name: 'Certificado Estándar',
      description: 'Plantilla básica para certificados',
      isDefault: true,
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Certificado Premium',
      description: 'Plantilla con diseño avanzado',
      isDefault: false,
      createdAt: '2024-01-15'
    }
  ]
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100'
      case 'expired': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'revoked': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'valid': return 'Válido'
      case 'expired': return 'Expirado'
      case 'pending': return 'Pendiente'
      case 'revoked': return 'Revocado'
      default: return 'Desconocido'
    }
  }
  
  // Función para obtener el icono del estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return CheckCircle
      case 'expired': return AlertCircle
      case 'pending': return Clock
      case 'revoked': return XCircle
      default: return Clock
    }
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para la lista de certificados
  const CertificatesList = () => {
    const filteredCertificates = certificates.filter(cert => {
      const matchesSearch = cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || cert.status === statusFilter
      return matchesSearch && matchesStatus
    })
    
    return (
      <div className="space-y-4">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar certificados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="valid">Válidos</option>
            <option value="expired">Expirados</option>
            <option value="pending">Pendientes</option>
            <option value="revoked">Revocados</option>
          </select>
        </div>
        
        {/* Lista de certificados */}
        <div className="grid gap-4">
          {filteredCertificates.map((cert) => {
            const StatusIcon = getStatusIcon(cert.status)
            
            return (
              <div key={cert.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Icono del certificado */}
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Award size={24} className="text-yellow-600" />
                    </div>
                    
                    {/* Información del certificado */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{cert.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                          <StatusIcon size={12} className="inline mr-1" />
                          {getStatusText(cert.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><strong>Estudiante:</strong> {cert.studentName}</p>
                          <p><strong>Curso:</strong> {cert.courseName}</p>
                          <p><strong>Instructor:</strong> {cert.instructor}</p>
                        </div>
                        <div>
                          <p><strong>Calificación:</strong> {cert.grade}%</p>
                          <p><strong>Fecha de emisión:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
                          <p><strong>Fecha de expiración:</strong> {new Date(cert.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Código de verificación:</strong> {cert.verificationCode}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>URL de verificación:</strong> {cert.qrCode}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Acciones */}
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <QrCode size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  // Componente para plantillas de certificados
  const TemplatesList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Plantillas de Certificados</h3>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Nueva Plantilla
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
                {template.isDefault && (
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Por defecto
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              <p>Creado: {new Date(template.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                <Edit size={14} />
                Editar
              </button>
              <button className="btn-secondary text-sm py-2 px-3">
                <Eye size={14} />
              </button>
              <button className="btn-secondary text-sm py-2 px-3">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
  // Componente para estadísticas
  const StatisticsView = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificados Emitidos</p>
              <p className="text-2xl font-semibold text-gray-900">{certificates.length}</p>
            </div>
            <Award size={24} className="text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificados Válidos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates.filter(c => c.status === 'valid').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificados Expirados</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates.filter(c => c.status === 'expired').length}
              </p>
            </div>
            <AlertCircle size={24} className="text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Plantillas</p>
              <p className="text-2xl font-semibold text-gray-900">{templates.length}</p>
            </div>
            <FileText size={24} className="text-blue-600" />
          </div>
        </div>
      </div>
      
      {/* Gráfico de certificados por mes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificados Emitidos por Mes</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Award size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Gráfico de certificados por mes</p>
          </div>
        </div>
      </div>
    </div>
  )
  
  // ========================================
  // CONFIGURACIÓN DE PESTAÑAS - Navegación
  // ========================================
  
  const tabs = [
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'templates', label: 'Plantillas', icon: FileText },
    { id: 'statistics', label: 'Estadísticas', icon: BarChart3 }
  ]
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Certificaciones Digitales</h1>
        <p className="text-gray-600">Gestiona la emisión y verificación de certificados digitales</p>
      </div>
      
      {/* Navegación por pestañas */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* Contenido de las pestañas */}
      <div className="min-h-96">
        {activeTab === 'certificates' && <CertificatesList />}
        {activeTab === 'templates' && <TemplatesList />}
        {activeTab === 'statistics' && <StatisticsView />}
      </div>
    </div>
  )
}

export default CertificationManagement
