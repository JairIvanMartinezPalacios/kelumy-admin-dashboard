// ========================================
// FACTURACIÓN MÉXICO - Generación CFDI
// ========================================

import React, { useState, useEffect } from 'react'
import {
  FileText,
  Download,
  Mail,
  Settings,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Search,
  Calendar,
  Building2,
  FileCheck,
  BookOpen,
  Percent,
  Database,
  List,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

const BillingMexico = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('invoices')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const invoices = [
    {
      id: 'CFDI-001',
      orderId: 'ORD-001',
      customer: 'Juan Pérez',
      rfc: 'PERJ800101ABC',
      amount: 498,
      status: 'timbrada',
      date: '2024-01-20',
      uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    },
    {
      id: 'CFDI-002',
      orderId: 'ORD-002',
      customer: 'María García',
      rfc: 'GARM850215XYZ',
      amount: 349,
      status: 'pendiente',
      date: '2024-01-19',
      uuid: null
    }
  ]

  const fiscalData = {
    rfc: 'KEL123456ABC',
    businessName: 'Kelumy Educación S.A. de C.V.',
    address: 'Av. Reforma 123, Col. Centro, CDMX, CP 06000',
    taxRegime: '601 - General de Ley Personas Morales'
  }

  const getStatusInfo = (status) => {
    const statusMap = {
      timbrada: { icon: CheckCircle, color: 'text-green-400 bg-green-500/20', label: 'Timbrada' },
      pendiente: { icon: AlertCircle, color: 'text-yellow-400 bg-yellow-500/20', label: 'Pendiente' },
      cancelada: { icon: AlertCircle, color: 'text-red-400 bg-red-500/20', label: 'Cancelada' }
    }
    return statusMap[status] || statusMap.pendiente
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Estilos de animación avanzados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-4px) scale(1.01);
        }
        
        .tab-button {
          transition: all 0.3s ease;
        }
        
        .tab-button:hover {
          transform: translateY(-2px);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Configuración Fiscal */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInUp' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Building2 size={20} />
            Datos Fiscales de Kelumy
          </h3>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center gap-2">
            <Settings size={18} />
            <span className="hidden sm:inline">Editar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-white/70 text-sm mb-1">RFC</p>
            <p className="text-white font-semibold">{fiscalData.rfc}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Razón Social</p>
            <p className="text-white font-semibold">{fiscalData.businessName}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-white/70 text-sm mb-1">Domicilio Fiscal</p>
            <p className="text-white">{fiscalData.address}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-white/70 text-sm mb-1">Régimen Fiscal</p>
            <p className="text-white">{fiscalData.taxRegime}</p>
          </div>
        </div>
      </div>

      {/* Generación CFDI */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
          <FileText size={20} />
          Generación CFDI 3.3
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/70 text-xs mb-1">Emisión Automática</p>
              <p className="text-green-400 font-semibold">Activa</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/70 text-xs mb-1">Validación RFC</p>
              <p className="text-green-400 font-semibold">Activa</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/70 text-xs mb-1">Timbre Fiscal</p>
              <p className="text-green-400 font-semibold">Automático</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-2">PAC Autorizado</p>
            <p className="text-white">Facturama.mx - Integración activa</p>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas - Estilo compacto horizontal */}
      <div className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden mb-6 w-full max-w-full ${isVisible ? 'animate-fadeInScale' : ''}`} style={{ animationDelay: '0.2s' }}>
        <div className="border-b border-white/10 overflow-x-auto">
          <nav className="flex overflow-x-auto scrollbar-hide min-w-0">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 rounded-tl-2xl ${
                activeTab === 'invoices'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={18} />
              Facturas
            </button>
            <button
              onClick={() => setActiveTab('catalogs')}
              className={`flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'catalogs'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database size={18} />
              Catálogos SAT
            </button>
            <button
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'concepts'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen size={18} />
              Conceptos por Curso
            </button>
            <button
              onClick={() => setActiveTab('retentions')}
              className={`flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'retentions'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Percent size={18} />
              Retenciones
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={`flex items-center gap-2 px-4 sm:px-5 md:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 rounded-tr-2xl ${
                activeTab === 'errors'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <List size={18} />
              Log de Errores
            </button>
          </nav>
        </div>

        {/* Contenido de las pestañas */}
        <div className="p-4 sm:p-6 w-full max-w-full overflow-x-hidden min-w-0">
          {/* Contenido según pestaña activa */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              {/* Gestión de Documentos */}
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Buscar facturas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              {invoices.map((invoice) => {
                const statusInfo = getStatusInfo(invoice.status)
                const StatusIcon = statusInfo.icon

                return (
                  <div
                    key={invoice.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-semibold">{invoice.id}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                            <StatusIcon size={12} />
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70">
                          <p><strong>Cliente:</strong> {invoice.customer}</p>
                          <p><strong>RFC:</strong> {invoice.rfc}</p>
                          <p><strong>Pedido:</strong> {invoice.orderId}</p>
                          <p><strong>Monto:</strong> {formatCurrency(invoice.amount)}</p>
                          {invoice.uuid && <p><strong>UUID:</strong> {invoice.uuid}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center gap-2 text-sm">
                          <Download size={16} />
                          PDF
                        </button>
                        <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center gap-2 text-sm">
                          <FileText size={16} />
                          XML
                        </button>
                        <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center gap-2 text-sm">
                          <Mail size={16} />
                          Email
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Gestión de Errores */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
              <AlertCircle size={20} />
              Gestión de Errores
            </h3>

            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2">
                <RefreshCw size={18} />
                Cancelar CFDI
              </button>
              <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2">
                <FileCheck size={18} />
                Consultar Estatus en SAT
              </button>
              <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2">
                <Mail size={18} />
                Reenviar Facturas Fallidas
              </button>
            </div>
          </div>
            </div>
          )}

          {/* Catálogos SAT */}
          {activeTab === 'catalogs' && (
            <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Database size={20} />
                Catálogos SAT
              </h3>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center gap-2">
                <RefreshCw size={18} />
                <span className="hidden sm:inline">Sincronizar Catálogos</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Productos y Servicios</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">84111505 - Servicios de educación en línea</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">84111506 - Servicios de capacitación</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">84111507 - Servicios de certificación</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Unidades de Medida</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">E48 - Unidad de servicio</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">ACT - Actividad</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          )}

          {/* Configuración de Conceptos por Curso */}
          {activeTab === 'concepts' && (
            <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <BookOpen size={20} />
                Configuración de Conceptos por Curso
              </h3>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2">
                <Plus size={18} />
                <span className="hidden sm:inline">Nuevo Concepto</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">Curso React Avanzado</h4>
                    <p className="text-white/60 text-sm mt-1">Clave SAT: 84111505 - Servicios de educación en línea</p>
                  </div>
                  <button className="p-2 text-white/70 hover:text-white transition-colors">
                    <Edit size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/70">Clave de Producto/Servicio</p>
                    <p className="text-white">84111505</p>
                  </div>
                  <div>
                    <p className="text-white/70">Unidad de Medida</p>
                    <p className="text-white">E48 - Unidad de servicio</p>
                  </div>
                  <div>
                    <p className="text-white/70">Descripción</p>
                    <p className="text-white">Curso de React Avanzado - 40 horas</p>
                  </div>
                  <div>
                    <p className="text-white/70">Precio Unitario</p>
                    <p className="text-white">{formatCurrency(299)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">Curso JavaScript ES6+</h4>
                    <p className="text-white/60 text-sm mt-1">Clave SAT: 84111505 - Servicios de educación en línea</p>
                  </div>
                  <button className="p-2 text-white/70 hover:text-white transition-colors">
                    <Edit size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/70">Clave de Producto/Servicio</p>
                    <p className="text-white">84111505</p>
                  </div>
                  <div>
                    <p className="text-white/70">Unidad de Medida</p>
                    <p className="text-white">E48 - Unidad de servicio</p>
                  </div>
                  <div>
                    <p className="text-white/70">Descripción</p>
                    <p className="text-white">Curso de JavaScript ES6+ - 30 horas</p>
                  </div>
                  <div>
                    <p className="text-white/70">Precio Unitario</p>
                    <p className="text-white">{formatCurrency(199)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          )}

          {/* Retención de ISR e IVA */}
          {activeTab === 'retentions' && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                  <Percent size={20} />
                  Retención de ISR e IVA
                </h3>

                <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Configuración de Retenciones</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Retención de ISR (%)</label>
                    <input
                      type="number"
                      defaultValue="10"
                      step="0.01"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    />
                    <p className="text-white/50 text-xs mt-1">Aplicable a servicios profesionales</p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Retención de IVA (%)</label>
                    <input
                      type="number"
                      defaultValue="0"
                      step="0.01"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    />
                    <p className="text-white/50 text-xs mt-1">Aplicable según régimen fiscal</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Aplicación Automática</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    Aplicar retención de ISR automáticamente
                  </label>
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input type="checkbox" className="rounded" />
                    Aplicar retención de IVA automáticamente
                  </label>
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    Validar RFC del cliente antes de aplicar retenciones
                  </label>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                Guardar Configuración de Retenciones
              </button>
                </div>
              </div>
            </div>
          )}

          {/* Log de Errores Fiscales */}
          {activeTab === 'errors' && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <List size={20} />
                    Log de Errores Fiscales
                  </h3>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center gap-2">
                <Download size={18} />
                <span className="hidden sm:inline">Exportar Log</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <h4 className="text-white font-medium">Error de Timbre Fiscal</h4>
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Crítico</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">CFDI-002 - No se pudo timbrar la factura</p>
                    <p className="text-white/60 text-xs">Fecha: 2024-01-19 14:30:00</p>
                    <p className="text-white/60 text-xs mt-1">Error: Timeout en conexión con PAC</p>
                  </div>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 text-sm">
                    Reintentar
                  </button>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <h4 className="text-white font-medium">RFC Inválido</h4>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Advertencia</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">CFDI-003 - RFC del cliente no válido</p>
                    <p className="text-white/60 text-xs">Fecha: 2024-01-18 10:15:00</p>
                    <p className="text-white/60 text-xs mt-1">RFC: ABC123456XYZ (Formato incorrecto)</p>
                  </div>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 text-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h4 className="text-white font-medium">Factura Timbrada Exitosamente</h4>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Resuelto</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">CFDI-001 - Factura timbrada correctamente</p>
                    <p className="text-white/60 text-xs">Fecha: 2024-01-20 10:31:00</p>
                    <p className="text-white/60 text-xs mt-1">UUID: a1b2c3d4-e5f6-7890-abcd-ef1234567890</p>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BillingMexico

