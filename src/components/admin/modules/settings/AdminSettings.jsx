import React, { useState } from 'react'
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  Users, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Save,
  X,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react'

const AdminSettings = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // Configuración General
    siteName: 'KELUMY',
    siteDescription: 'Plataforma educativa de ciencias y tecnología',
    timezone: 'America/Mexico_City',
    language: 'es',
    currency: 'MXN',
    
    // Notificaciones
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    monthlyReports: true,
    
    // Seguridad
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    
    // Apariencia
    theme: 'dark',
    primaryColor: '#8A2BE2',
    secondaryColor: '#4B0082',
    sidebarCollapsed: false,
    
    // Sistema
    maintenanceMode: false,
    debugMode: false,
    analytics: true,
    backups: true
  })

  const [formData, setFormData] = useState(settings)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setSettings(formData)
    setIsEditing(false)
    console.log('Configuración actualizada:', formData)
  }

  const handleCancel = () => {
    setFormData(settings)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'appearance', label: 'Apariencia', icon: Palette },
    { id: 'system', label: 'Sistema', icon: Database }
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Información del Sitio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Nombre del Sitio</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <p className="text-white">{formData.siteName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Descripción</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <p className="text-white">{formData.siteDescription}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Zona Horaria</label>
            {isEditing ? (
              <select
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="America/Mexico_City">México (GMT-6)</option>
                <option value="America/New_York">Nueva York (GMT-5)</option>
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
              </select>
            ) : (
              <p className="text-white">{formData.timezone}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Idioma</label>
            {isEditing ? (
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            ) : (
              <p className="text-white">{formData.language === 'es' ? 'Español' : 'English'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Configuración de Notificaciones</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Notificaciones por Email', description: 'Recibir notificaciones importantes por correo' },
            { key: 'pushNotifications', label: 'Notificaciones Push', description: 'Notificaciones en tiempo real en el navegador' },
            { key: 'smsNotifications', label: 'Notificaciones SMS', description: 'Mensajes de texto para alertas críticas' },
            { key: 'weeklyReports', label: 'Reportes Semanales', description: 'Resumen semanal de actividad' },
            { key: 'monthlyReports', label: 'Reportes Mensuales', description: 'Análisis mensual de rendimiento' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">{label}</p>
                <p className="text-white/70 text-sm">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEditing ? formData[key] : settings[key]}
                  onChange={(e) => isEditing && handleInputChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Configuración de Seguridad</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Autenticación de Dos Factores</p>
              <p className="text-white/70 text-sm">Protección adicional para tu cuenta</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEditing ? formData.twoFactorAuth : settings.twoFactorAuth}
                onChange={(e) => isEditing && handleInputChange('twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Timeout de Sesión (minutos)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <p className="text-white">{formData.sessionTimeout}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Expiración de Contraseña (días)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.passwordExpiry}
                  onChange={(e) => handleInputChange('passwordExpiry', parseInt(e.target.value))}
                  className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <p className="text-white">{formData.passwordExpiry}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Intentos de Login</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.loginAttempts}
                  onChange={(e) => handleInputChange('loginAttempts', parseInt(e.target.value))}
                  className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <p className="text-white">{formData.loginAttempts}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Configuración de Apariencia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Tema</label>
            {isEditing ? (
              <select
                value={formData.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="dark">Oscuro</option>
                <option value="light">Claro</option>
                <option value="auto">Automático</option>
              </select>
            ) : (
              <p className="text-white">{formData.theme === 'dark' ? 'Oscuro' : 'Claro'}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Color Primario</label>
            {isEditing ? (
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                className="w-full h-10 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white/20" 
                  style={{ backgroundColor: formData.primaryColor }}
                ></div>
                <span className="text-white">{formData.primaryColor}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Configuración del Sistema</h3>
        <div className="space-y-4">
          {[
            { key: 'maintenanceMode', label: 'Modo Mantenimiento', description: 'Deshabilitar acceso público durante mantenimiento' },
            { key: 'debugMode', label: 'Modo Debug', description: 'Mostrar información de depuración' },
            { key: 'analytics', label: 'Analíticas', description: 'Recopilar datos de uso y rendimiento' },
            { key: 'backups', label: 'Respaldos Automáticos', description: 'Crear respaldos automáticos de la base de datos' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">{label}</p>
                <p className="text-white/70 text-sm">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEditing ? formData[key] : settings[key]}
                  onChange={(e) => isEditing && handleInputChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones del Sistema */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Acciones del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <RefreshCw className="w-5 h-5 text-white/70" />
            <span className="text-white">Reiniciar Servicios</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5 text-white/70" />
            <span className="text-white">Descargar Logs</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Upload className="w-5 h-5 text-white/70" />
            <span className="text-white">Subir Configuración</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-300">
            <Trash2 className="w-5 h-5" />
            <span>Limpiar Cache</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings()
      case 'notifications': return renderNotificationSettings()
      case 'security': return renderSecuritySettings()
      case 'appearance': return renderAppearanceSettings()
      case 'system': return renderSystemSettings()
      default: return renderGeneralSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Configuración</h1>
              <p className="text-white/70">Gestiona la configuración del sistema</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                <Settings className="w-4 h-4" />
                <span>Editar</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tabs de Navegación */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Contenido de la Tab */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
