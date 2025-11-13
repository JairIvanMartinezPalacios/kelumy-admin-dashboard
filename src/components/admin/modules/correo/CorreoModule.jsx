// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Mail,         // Icono de correo para campañas de email
  Plus,         // Icono de agregar para crear campañas
  Search,       // Icono de búsqueda para filtrar campañas
  Filter,       // Icono de filtros para ordenar campañas
  Eye,          // Icono de vista para ver detalles
  Edit,         // Icono de editar para modificar campañas
  Trash2,       // Icono de eliminar para borrar campañas
  Send,         // Icono de enviar para lanzar campañas
  Users,        // Icono de usuarios para suscriptores
  BarChart3     // Icono de gráfico para analytics
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - EmailManagement
// ========================================

// Define el componente funcional EmailManagement que gestiona campañas de email marketing
// Incluye funcionalidades para campañas, plantillas y gestión de suscriptores
const EmailManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'campaigns': campañas, 'templates': plantillas, 'subscribers': suscriptores
  const [activeTab, setActiveTab] = useState('campaigns')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'campaigns', label: 'Campañas', icon: Mail },       // Pestaña de gestión de campañas
    { id: 'templates', label: 'Plantillas', icon: Mail },     // Pestaña de plantillas de email
    { id: 'subscribers', label: 'Suscriptores', icon: Users } // Pestaña de gestión de suscriptores
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Correo Masivo</h1>
        <p className="text-gray-600">Gestiona campañas de email marketing</p>
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
              <h3 className="text-lg font-semibold text-gray-900">Campañas de Email</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                Nueva Campaña
              </button>
            </div>
            
            <div className="grid gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Newsletter Semanal</h4>
                <p className="text-gray-600 mb-4">Resumen de las novedades de la semana</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Destinatarios: 5,000</span>
                  <span>Tasa de apertura: 25.5%</span>
                  <span>Tasa de clics: 8.2%</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Enviada</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'templates' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plantillas de Email</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de plantillas.</p>
          </div>
        )}
        
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suscriptores</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de suscriptores.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailManagement
