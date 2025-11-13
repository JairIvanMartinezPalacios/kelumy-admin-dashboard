import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit, 
  Save, 
  X,
  Camera,
  Key,
  Bell,
  Globe
} from 'lucide-react'

const AdminProfile = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'Administrador',
    email: user?.email || 'admin@kelumy.com',
    phone: '+1 (555) 123-4567',
    address: 'Av. Principal 123, Ciudad',
    role: 'Administrador Principal',
    joinDate: '15 de Enero, 2024',
    lastLogin: 'Hace 2 horas',
    avatar: '/img/logo_kelumi.png'
  })

  const [formData, setFormData] = useState(profileData)

  const handleSave = () => {
    setProfileData(formData)
    setIsEditing(false)
    // Aquí se haría la llamada a la API para guardar los datos
    console.log('Perfil actualizado:', formData)
  }

  const handleCancel = () => {
    setFormData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
              <p className="text-white/70">Gestiona tu información personal</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
              <span>Editar Perfil</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Avatar y Datos Básicos */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <img 
                    src={profileData.avatar} 
                    alt="Avatar" 
                    className="w-20 h-20 rounded-full border-4 border-white/20"
                  />
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full text-2xl font-bold text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-white">{profileData.fullName}</h2>
                  )}
                  <p className="text-white/70">{profileData.role}</p>
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  ) : (
                    <p className="text-white">{profileData.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Teléfono</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  ) : (
                    <p className="text-white">{profileData.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Dirección</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  ) : (
                    <p className="text-white">{profileData.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Zona Horaria</span>
                  </label>
                  {isEditing ? (
                    <select
                      value="America/Mexico_City"
                      className="w-full text-white bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="America/Mexico_City">México (GMT-6)</option>
                      <option value="America/New_York">Nueva York (GMT-5)</option>
                      <option value="Europe/Madrid">Madrid (GMT+1)</option>
                    </select>
                  ) : (
                    <p className="text-white">México (GMT-6)</p>
                  )}
                </div>
              </div>
            </div>

            {/* Información de Seguridad */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Seguridad</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-white/70" />
                    <div>
                      <p className="text-white font-medium">Contraseña</p>
                      <p className="text-white/70 text-sm">Última actualización hace 30 días</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Cambiar
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-white/70" />
                    <div>
                      <p className="text-white font-medium">Autenticación de dos factores</p>
                      <p className="text-white/70 text-sm">Protección adicional para tu cuenta</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Activar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Estadísticas de Actividad */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Actividad</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Miembro desde</span>
                  <span className="text-white font-medium">{profileData.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Último acceso</span>
                  <span className="text-white font-medium">{profileData.lastLogin}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Sesiones activas</span>
                  <span className="text-white font-medium">1</span>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Calendar className="w-5 h-5 text-white/70" />
                  <span className="text-white">Ver Historial</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5 text-white/70" />
                  <span className="text-white">Notificaciones</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Shield className="w-5 h-5 text-white/70" />
                  <span className="text-white">Privacidad</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        {isEditing && (
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProfile
