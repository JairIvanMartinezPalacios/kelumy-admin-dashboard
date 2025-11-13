// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Settings,     // Icono de configuración para ajustes generales
  Shield,       // Icono de escudo para seguridad
  Users,        // Icono de usuarios para gestión de usuarios
  Mail,         // Icono de correo para configuración de email
  Globe,        // Icono de globo para integraciones
  Database,     // Icono de base de datos para configuraciones de BD
  Key,          // Icono de llave para claves y autenticación
  Bell          // Icono de campana para notificaciones
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - ConfigManagement
// ========================================

// Define el componente funcional ConfigManagement que gestiona la configuración del sistema
// Incluye funcionalidades para configuración general, seguridad, usuarios, email e integraciones
const ConfigManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'general': general, 'security': seguridad, 'users': usuarios, 'email': email, 'integrations': integraciones
  const [activeTab, setActiveTab] = useState('general')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'general', label: 'General', icon: Settings },         // Pestaña de configuración general
    { id: 'security', label: 'Seguridad', icon: Shield },       // Pestaña de configuración de seguridad
    { id: 'users', label: 'Usuarios', icon: Users },            // Pestaña de configuración de usuarios
    { id: 'email', label: 'Email', icon: Mail },                // Pestaña de configuración de email
    { id: 'integrations', label: 'Integraciones', icon: Globe } // Pestaña de integraciones
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Configuración y Seguridad</h1>
        <p className="text-gray-600">Configura el sistema y gestiona la seguridad</p>
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
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración General</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Plataforma</label>
                  <input
                    type="text"
                    defaultValue="Kelumy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    rows={3}
                    defaultValue="La plataforma de ciencias que inspira la creatividad y la tecnología"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL del Sitio</label>
                  <input
                    type="url"
                    defaultValue="https://kelumy.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Seguridad</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactor"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700">
                  Habilitar autenticación de dos factores (2FA)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ssl"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="ssl" className="ml-2 block text-sm text-gray-700">
                  Forzar conexión HTTPS
                </label>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Usuarios</h3>
            <p className="text-gray-600">Aquí se implementará la configuración de usuarios.</p>
          </div>
        )}
        
        {activeTab === 'email' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Email</h3>
            <p className="text-gray-600">Aquí se implementará la configuración de email.</p>
          </div>
        )}
        
        {activeTab === 'integrations' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Integraciones</h3>
            <p className="text-gray-600">Aquí se implementará la configuración de integraciones.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfigManagement
