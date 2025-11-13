// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  TrendingUp,      // Icono de tendencia para campañas y crecimiento
  Mail,            // Icono de correo para email marketing
  Target,          // Icono de objetivo para segmentación
  BarChart3,       // Icono de gráfico para analytics
  Plus,            // Icono de agregar para crear campañas
  Search,          // Icono de búsqueda para filtrar contenido
  Filter,          // Icono de filtros para ordenar datos
  Eye,             // Icono de vista para ver detalles
  Edit,            // Icono de editar para modificar campañas
  Trash2,          // Icono de eliminar para borrar campañas
  Send,            // Icono de enviar para lanzar campañas
  Users,           // Icono de usuarios para audiencia
  Calendar,        // Icono de calendario para programación
  DollarSign,      // Icono de dólar para ROI y presupuestos
  MessageCircle,   // Icono de mensaje para comunicación
  Share2,          // Icono de compartir para redes sociales
  RefreshCw        // Icono de actualizar para refrescar datos
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - MarketingManagement
// ========================================

// Define el componente funcional MarketingManagement que gestiona campañas de marketing y CRM
// Incluye funcionalidades para email marketing, campañas, analytics y gestión de audiencia
const MarketingManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'campaigns': campañas, 'emails': emails, 'analytics': analytics
  const [activeTab, setActiveTab] = useState('campaigns')
  
  // Estado para el término de búsqueda en campañas y contenido
  const [searchTerm, setSearchTerm] = useState('')
  
  // ========================================
  // DATOS ESTÁTICOS - Campañas de marketing
  // ========================================
  
  // Array que contiene las campañas de marketing activas y completadas
  // Cada campaña incluye métricas de rendimiento y configuración
  const campaigns = [
    {
      id: 1,                                    // Identificador único de la campaña
      name: 'Promoción de Verano',              // Nombre de la campaña
      type: 'email',                            // Tipo: 'email', 'social', 'display'
      status: 'active',                         // Estado: 'active', 'completed', 'paused'
      recipients: 5000,                         // Número de destinatarios
      openRate: 25.5,                          // Tasa de apertura en porcentaje
      clickRate: 8.2,                          // Tasa de clics en porcentaje
      startDate: '2024-01-15',                 // Fecha de inicio
      endDate: '2024-02-15'                    // Fecha de finalización
    },
    {
      id: 2,                                    // Identificador único de la campaña
      name: 'Nuevos Cursos',                    // Nombre de la campaña
      type: 'social',                           // Tipo: 'email', 'social', 'display'
      status: 'completed',                      // Estado: 'active', 'completed', 'paused'
      recipients: 12000,                        // Número de destinatarios
      openRate: 18.3,                          // Tasa de apertura en porcentaje
      clickRate: 5.7,                          // Tasa de clics en porcentaje
      startDate: '2024-01-01',                 // Fecha de inicio
      endDate: '2024-01-31'                    // Fecha de finalización
    }
  ]
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'campaigns', label: 'Campañas', icon: TrendingUp },  // Pestaña de gestión de campañas
    { id: 'emails', label: 'Emails', icon: Mail },             // Pestaña de email marketing
    { id: 'analytics', label: 'Analíticas', icon: BarChart3 }  // Pestaña de analytics y métricas
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Marketing y CRM</h1>
        <p className="text-gray-600">Gestiona campañas de marketing y relaciones con clientes</p>
      </div>
      
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
      
      <div className="min-h-96">
        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Campañas de Marketing</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                Nueva Campaña
              </button>
            </div>
            
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
                        <div>
                          <p><strong>Tipo:</strong> {campaign.type}</p>
                          <p><strong>Destinatarios:</strong> {campaign.recipients.toLocaleString()}</p>
                        </div>
                        <div>
                          <p><strong>Tasa de apertura:</strong> {campaign.openRate}%</p>
                          <p><strong>Tasa de clics:</strong> {campaign.clickRate}%</p>
                        </div>
                        <div>
                          <p><strong>Inicio:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
                          <p><strong>Fin:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p><strong>Estado:</strong> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                            }`}>
                              {campaign.status === 'active' ? 'Activa' : 'Completada'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'emails' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestión de Emails</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de emails masivos.</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analíticas de Marketing</h3>
            <p className="text-gray-600">Aquí se implementarán las métricas de marketing.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketingManagement
