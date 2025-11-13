// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Shield,      // Icono de escudo para administración y seguridad
  Plus,        // Icono de agregar para crear nuevos elementos
  Search,      // Icono de búsqueda para filtrar contenido
  Filter,      // Icono de filtros para ordenar datos
  Eye,         // Icono de vista para ver detalles
  Edit,        // Icono de editar para modificar elementos
  Trash2,      // Icono de eliminar para borrar elementos
  Users,       // Icono de usuarios para gestión de usuarios
  Settings,    // Icono de configuración para ajustes
  BarChart3    // Icono de gráfico para resumen y analytics
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - AdminManagement
// ========================================

// Define el componente funcional AdminManagement que gestiona tareas administrativas
// Incluye funcionalidades para resumen, gestión de usuarios y configuración del sistema
const AdminManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'overview': resumen, 'users': usuarios, 'settings': configuración
  const [activeTab, setActiveTab] = useState('overview')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },    // Pestaña de resumen administrativo
    { id: 'users', label: 'Usuarios', icon: Users },          // Pestaña de gestión de usuarios
    { id: 'settings', label: 'Configuración', icon: Settings } // Pestaña de configuración del sistema
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Administrativo</h1>
        <p className="text-gray-600">Gestiona las tareas administrativas del sistema</p>
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                    <p className="text-2xl font-semibold text-gray-900">1,250</p>
                  </div>
                  <Users size={24} className="text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                    <p className="text-2xl font-semibold text-gray-900">156</p>
                  </div>
                  <Shield size={24} className="text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingresos Mensuales</p>
                    <p className="text-2xl font-semibold text-gray-900">$25,000</p>
                  </div>
                  <BarChart3 size={24} className="text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Soporte Pendiente</p>
                    <p className="text-2xl font-semibold text-gray-900">12</p>
                  </div>
                  <Settings size={24} className="text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestión de Usuarios</h3>
            <p className="text-gray-600">Aquí se implementará la gestión administrativa de usuarios.</p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración Administrativa</h3>
            <p className="text-gray-600">Aquí se implementará la configuración administrativa.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminManagement
