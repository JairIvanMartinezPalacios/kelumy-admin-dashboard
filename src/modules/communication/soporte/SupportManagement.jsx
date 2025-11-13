// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  MessageCircle,  // Icono de mensaje para tickets y chat
  Plus,           // Icono de agregar para crear tickets
  Search,         // Icono de búsqueda para filtrar tickets
  Filter,         // Icono de filtros para ordenar tickets
  Eye,            // Icono de vista para ver detalles
  Edit,           // Icono de editar para modificar tickets
  Trash2,         // Icono de eliminar para borrar tickets
  CheckCircle,    // Icono de check para tickets resueltos
  Clock,          // Icono de reloj para tickets pendientes
  AlertCircle,    // Icono de alerta para tickets urgentes
  Users,          // Icono de usuarios para agentes de soporte
  Calendar        // Icono de calendario para fechas
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - SupportManagement
// ========================================

// Define el componente funcional SupportManagement que gestiona el sistema de soporte
// Incluye funcionalidades para tickets, chat en vivo, FAQ y comunicación con usuarios
const SupportManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'tickets': tickets, 'chat': chat en vivo, 'faq': preguntas frecuentes
  const [activeTab, setActiveTab] = useState('tickets')
  
  // ========================================
  // DATOS ESTÁTICOS - Tickets de soporte
  // ========================================
  
  // Array que contiene los tickets de soporte activos y resueltos
  // Cada ticket incluye información del cliente, estado y prioridad
  const tickets = [
    {
      id: 'TKT-001',                           // Identificador único del ticket
      subject: 'Problema con acceso al curso',  // Asunto del ticket
      customer: 'Juan Pérez',                   // Nombre del cliente
      status: 'open',                          // Estado: 'open', 'in_progress', 'resolved', 'closed'
      priority: 'high',                        // Prioridad: 'low', 'medium', 'high', 'urgent'
      createdAt: '2024-01-20',                // Fecha de creación
      lastUpdate: '2024-01-20'                // Última actualización
    },
    {
      id: 'TKT-002',                           // Identificador único del ticket
      subject: 'Error en el pago',             // Asunto del ticket
      customer: 'María García',                // Nombre del cliente
      status: 'in_progress',                   // Estado: 'open', 'in_progress', 'resolved', 'closed'
      priority: 'medium',                      // Prioridad: 'low', 'medium', 'high', 'urgent'
      createdAt: '2024-01-19',                // Fecha de creación
      lastUpdate: '2024-01-20'                // Última actualización
    }
  ]
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'tickets', label: 'Tickets', icon: MessageCircle },     // Pestaña de gestión de tickets
    { id: 'chat', label: 'Chat en Vivo', icon: MessageCircle },   // Pestaña de chat en vivo
    { id: 'faq', label: 'FAQ', icon: MessageCircle }              // Pestaña de preguntas frecuentes
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Soporte y Comunicación</h1>
        <p className="text-gray-600">Gestiona tickets de soporte y comunicación con usuarios</p>
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
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Tickets de Soporte</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                Nuevo Ticket
              </button>
            </div>
            
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{ticket.subject}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
                        <div>
                          <p><strong>Cliente:</strong> {ticket.customer}</p>
                          <p><strong>Prioridad:</strong> {ticket.priority}</p>
                        </div>
                        <div>
                          <p><strong>Estado:</strong> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                              ticket.status === 'open' ? 'text-red-600 bg-red-100' : 
                              ticket.status === 'in_progress' ? 'text-yellow-600 bg-yellow-100' : 
                              'text-green-600 bg-green-100'
                            }`}>
                              {ticket.status === 'open' ? 'Abierto' : 
                               ticket.status === 'in_progress' ? 'En Progreso' : 'Cerrado'}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p><strong>Creado:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p><strong>Última actualización:</strong> {new Date(ticket.lastUpdate).toLocaleDateString()}</p>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'chat' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chat en Vivo</h3>
            <p className="text-gray-600">Aquí se implementará el chat en vivo.</p>
          </div>
        )}
        
        {activeTab === 'faq' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preguntas Frecuentes</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de FAQ.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SupportManagement
