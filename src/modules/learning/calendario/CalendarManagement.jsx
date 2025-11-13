// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Calendar,     // Icono de calendario para eventos y programación
  Plus,         // Icono de agregar para crear eventos
  Search,       // Icono de búsqueda para filtrar eventos
  Filter,       // Icono de filtros para ordenar eventos
  Eye,          // Icono de vista para ver detalles
  Edit,         // Icono de editar para modificar eventos
  Trash2,       // Icono de eliminar para borrar eventos
  Clock,        // Icono de reloj para horarios
  Users,        // Icono de usuarios para participantes
  Video         // Icono de video para clases en vivo
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - CalendarManagement
// ========================================

// Define el componente funcional CalendarManagement que gestiona calendario y eventos
// Incluye funcionalidades para eventos, clases en vivo y gestión de horarios
const CalendarManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'events': eventos, 'classes': clases, 'schedule': horarios
  const [activeTab, setActiveTab] = useState('events')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'events', label: 'Eventos', icon: Calendar },      // Pestaña de gestión de eventos
    { id: 'classes', label: 'Clases', icon: Video },         // Pestaña de clases en vivo
    { id: 'schedule', label: 'Horarios', icon: Clock }       // Pestaña de gestión de horarios
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Calendario y Eventos Online</h1>
        <p className="text-gray-600">Gestiona eventos y clases en vivo</p>
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
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Eventos Programados</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                Nuevo Evento
              </button>
            </div>
            
            <div className="grid gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Webinar: Introducción a React</h4>
                <p className="text-gray-600 mb-4">Un webinar gratuito para aprender los conceptos básicos de React</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Fecha: 2024-01-25</span>
                  <span>Hora: 18:00 - 19:30</span>
                  <span>Instructor: Ana Martínez</span>
                  <span>Participantes: 45</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'classes' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clases en Vivo</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de clases en vivo.</p>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Horarios</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de horarios.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarManagement
