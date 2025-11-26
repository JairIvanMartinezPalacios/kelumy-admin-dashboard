import React, { useState } from 'react'
import {
  Settings,
  Save,
  Bell,
  Clock,
  Mail,
  MessageSquare,
  Shield,
  Users,
  Globe,
  Zap,
  CheckCircle,
  X,
  AlertCircle,
  Info,
  ToggleLeft,
  ToggleRight,
  FileText,
  Link as LinkIcon
} from 'lucide-react'

const ConfiguracionSoporte = () => {
  const [settings, setSettings] = useState({
    // Notificaciones
    emailNotifications: true,
    pushNotifications: true,
    ticketAssigned: true,
    ticketResolved: true,
    newMessage: true,
    
    // Tiempos
    autoCloseAfter: 7,
    autoAssign: true,
    responseTimeTarget: 30,
    resolutionTimeTarget: 240,
    
    // Chat
    chatEnabled: true,
    chatHours: '24/7',
    autoGreeting: true,
    greetingMessage: '¡Hola! ¿En qué puedo ayudarte hoy?',
    
    // Seguridad
    requireAuth: true,
    twoFactorAuth: false,
    ipWhitelist: false,
    
    // General
    defaultLanguage: 'es',
    timezone: 'America/Mexico_City',
    businessHours: '9:00 - 18:00',
    supportEmail: 'soporte@kelumy.com',
    supportPhone: '+52 55 1234 5678'
  })

  const [activeSection, setActiveSection] = useState('notificaciones')

  const sections = [
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'tiempos', label: 'Tiempos y SLA', icon: Clock },
    { id: 'chat', label: 'Chat en Vivo', icon: MessageSquare },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
    { id: 'general', label: 'General', icon: Settings }
  ]

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    alert('Configuración guardada exitosamente')
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'notificaciones':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Notificaciones por Email</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notificaciones por email</p>
                    <p className="text-white/60 text-sm">Recibir notificaciones por correo electrónico</p>
                  </div>
                  <button
                    onClick={() => handleToggle('emailNotifications')}
                    className="text-purple-400"
                  >
                    {settings.emailNotifications ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notificaciones push</p>
                    <p className="text-white/60 text-sm">Recibir notificaciones en tiempo real</p>
                  </div>
                  <button
                    onClick={() => handleToggle('pushNotifications')}
                    className="text-purple-400"
                  >
                    {settings.pushNotifications ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Ticket asignado</p>
                    <p className="text-white/60 text-sm">Notificar cuando se asigne un ticket</p>
                  </div>
                  <button
                    onClick={() => handleToggle('ticketAssigned')}
                    className="text-purple-400"
                  >
                    {settings.ticketAssigned ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Ticket resuelto</p>
                    <p className="text-white/60 text-sm">Notificar cuando se resuelva un ticket</p>
                  </div>
                  <button
                    onClick={() => handleToggle('ticketResolved')}
                    className="text-purple-400"
                  >
                    {settings.ticketResolved ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Nuevo mensaje</p>
                    <p className="text-white/60 text-sm">Notificar cuando llegue un nuevo mensaje</p>
                  </div>
                  <button
                    onClick={() => handleToggle('newMessage')}
                    className="text-purple-400"
                  >
                    {settings.newMessage ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'tiempos':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Configuración de Tiempos</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    Cerrar tickets automáticamente después de (días)
                  </label>
                  <input
                    type="number"
                    value={settings.autoCloseAfter}
                    onChange={(e) => handleChange('autoCloseAfter', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Asignación automática</p>
                    <p className="text-white/60 text-sm">Asignar tickets automáticamente a agentes disponibles</p>
                  </div>
                  <button
                    onClick={() => handleToggle('autoAssign')}
                    className="text-purple-400"
                  >
                    {settings.autoAssign ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Zap className="w-4 h-4" />
                    Tiempo objetivo de respuesta (minutos)
                  </label>
                  <input
                    type="number"
                    value={settings.responseTimeTarget}
                    onChange={(e) => handleChange('responseTimeTarget', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <CheckCircle className="w-4 h-4" />
                    Tiempo objetivo de resolución (minutos)
                  </label>
                  <input
                    type="number"
                    value={settings.resolutionTimeTarget}
                    onChange={(e) => handleChange('resolutionTimeTarget', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'chat':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Configuración de Chat</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Chat en vivo habilitado</p>
                    <p className="text-white/60 text-sm">Activar el chat en vivo para los usuarios</p>
                  </div>
                  <button
                    onClick={() => handleToggle('chatEnabled')}
                    className="text-purple-400"
                  >
                    {settings.chatEnabled ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    Horarios de chat
                  </label>
                  <select
                    value={settings.chatHours}
                    onChange={(e) => handleChange('chatHours', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="24/7">24/7</option>
                    <option value="business">Horario comercial</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Mensaje de bienvenida automático</p>
                    <p className="text-white/60 text-sm">Enviar mensaje automático cuando un usuario inicie chat</p>
                  </div>
                  <button
                    onClick={() => handleToggle('autoGreeting')}
                    className="text-purple-400"
                  >
                    {settings.autoGreeting ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                {settings.autoGreeting && (
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-2">
                      <MessageSquare className="w-4 h-4" />
                      Mensaje de bienvenida
                    </label>
                    <textarea
                      value={settings.greetingMessage}
                      onChange={(e) => handleChange('greetingMessage', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 'seguridad':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Configuración de Seguridad</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Requerir autenticación</p>
                    <p className="text-white/60 text-sm">Los agentes deben iniciar sesión para acceder</p>
                  </div>
                  <button
                    onClick={() => handleToggle('requireAuth')}
                    className="text-purple-400"
                  >
                    {settings.requireAuth ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Autenticación de dos factores</p>
                    <p className="text-white/60 text-sm">Requerir 2FA para agentes</p>
                  </div>
                  <button
                    onClick={() => handleToggle('twoFactorAuth')}
                    className="text-purple-400"
                  >
                    {settings.twoFactorAuth ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Lista blanca de IP</p>
                    <p className="text-white/60 text-sm">Restringir acceso por IP</p>
                  </div>
                  <button
                    onClick={() => handleToggle('ipWhitelist')}
                    className="text-purple-400"
                  >
                    {settings.ipWhitelist ? (
                      <ToggleRight className="w-10 h-10" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-white/40" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'general':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Configuración General</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Globe className="w-4 h-4" />
                    Idioma por defecto
                  </label>
                  <select
                    value={settings.defaultLanguage}
                    onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    Zona horaria
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="America/Mexico_City">America/Mexico_City (GMT-6)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (GMT-8)</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    Horario comercial
                  </label>
                  <input
                    type="text"
                    value={settings.businessHours}
                    onChange={(e) => handleChange('businessHours', e.target.value)}
                    placeholder="9:00 - 18:00"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Mail className="w-4 h-4" />
                    Email de soporte
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleChange('supportEmail', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Teléfono de soporte
                  </label>
                  <input
                    type="tel"
                    value={settings.supportPhone}
                    onChange={(e) => handleChange('supportPhone', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Configuración de Soporte</h2>
          <p className="text-white/70">Gestiona la configuración del sistema de soporte</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Guardar Cambios</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
            <div className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="lg:col-span-3">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}

export default ConfiguracionSoporte

