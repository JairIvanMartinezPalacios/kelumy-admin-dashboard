// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState } from 'react';
import { 
  User,           // Icono de usuario
  Mail,           // Icono de correo
  Phone,          // Icono de teléfono
  MapPin,         // Icono de ubicación
  Camera,         // Icono de cámara
  Lock,           // Icono de candado
  Bell,           // Icono de notificaciones
  Shield,         // Icono de seguridad
  Palette,        // Icono de tema
  Globe,          // Icono de idioma
  Save,           // Icono de guardar
  Edit,           // Icono de editar
  Eye,            // Icono de ojo
  EyeOff,         // Icono de ojo cerrado
  Check,          // Icono de check
  X               // Icono de cerrar
} from 'lucide-react';

// ========================================
// COMPONENTE USERSETTINGS - Configuración del usuario
// ========================================

const UserSettings = ({ user, onSave, onCancel }) => {
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    // Información personal
    fullName: user?.fullName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    state: user?.state || '',
    bio: user?.bio || '',
    profilePhoto: user?.profilePhoto || null,
    
    // Configuración de cuenta
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Preferencias
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true
    },
    appearance: {
      theme: 'dark',
      language: 'es',
      fontSize: 'medium'
    }
  });

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || '',
      state: user?.state || '',
      bio: user?.bio || '',
      profilePhoto: user?.profilePhoto || null,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      notifications: {
        email: true,
        push: true,
        sms: false,
        marketing: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        showLocation: true
      },
      appearance: {
        theme: 'dark',
        language: 'es',
        fontSize: 'medium'
      }
    });
    setIsEditing(false);
    onCancel();
  };

  // ========================================
  // CONFIGURACIÓN DE PESTAÑAS
  // ========================================
  
  const tabs = [
    {
      id: 'profile',
      title: 'Perfil',
      icon: User,
      description: 'Información personal'
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: Lock,
      description: 'Contraseña y privacidad'
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      icon: Bell,
      description: 'Preferencias de notificación'
    },
    {
      id: 'appearance',
      title: 'Apariencia',
      icon: Palette,
      description: 'Tema y personalización'
    }
  ];

  // ========================================
  // RENDERIZADO DE CONTENIDO POR PESTAÑA
  // ========================================
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Foto de perfil */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {formData.profilePhoto ? (
                    <img 
                      src={URL.createObjectURL(formData.profilePhoto)} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Foto de Perfil</h3>
                <p className="text-white/70 text-sm">Sube una foto para personalizar tu perfil</p>
              </div>
            </div>

            {/* Información personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Nombre(s) *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Apellidos *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Tus apellidos"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Tu teléfono"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  País
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Tu país"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Estado/Provincia
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Tu estado"
                />
              </div>
            </div>

            {/* Biografía */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Biografía
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 resize-none"
                placeholder="Cuéntanos sobre ti..."
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Cambiar contraseña */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Cambiar Contraseña</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Contraseña actual
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Tu contraseña actual"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Tu nueva contraseña"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Confirmar nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Confirma tu nueva contraseña"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Configuración de privacidad */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Configuración de Privacidad</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Visibilidad del perfil</p>
                    <p className="text-white/70 text-sm">Quién puede ver tu perfil</p>
                  </div>
                  <select
                    name="privacy.profileVisibility"
                    value={formData.privacy.profileVisibility}
                    onChange={handleInputChange}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="public" className="bg-gray-800">Público</option>
                    <option value="friends" className="bg-gray-800">Solo amigos</option>
                    <option value="private" className="bg-gray-800">Privado</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Mostrar email</p>
                      <p className="text-white/70 text-sm">Permitir que otros vean tu email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacy.showEmail"
                        checked={formData.privacy.showEmail}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Mostrar teléfono</p>
                      <p className="text-white/70 text-sm">Permitir que otros vean tu teléfono</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacy.showPhone"
                        checked={formData.privacy.showPhone}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Mostrar ubicación</p>
                      <p className="text-white/70 text-sm">Permitir que otros vean tu ubicación</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacy.showLocation"
                        checked={formData.privacy.showLocation}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Preferencias de Notificación</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notificaciones por email</p>
                    <p className="text-white/70 text-sm">Recibe notificaciones importantes por correo</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications.email"
                      checked={formData.notifications.email}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notificaciones push</p>
                    <p className="text-white/70 text-sm">Recibe notificaciones en tiempo real</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications.push"
                      checked={formData.notifications.push}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notificaciones SMS</p>
                    <p className="text-white/70 text-sm">Recibe notificaciones por mensaje de texto</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications.sms"
                      checked={formData.notifications.sms}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Marketing</p>
                    <p className="text-white/70 text-sm">Recibe ofertas y promociones especiales</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications.marketing"
                      checked={formData.notifications.marketing}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Personalización</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-3">
                    Tema
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Claro', icon: '☀️' },
                      { value: 'dark', label: 'Oscuro', icon: '🌙' },
                      { value: 'auto', label: 'Automático', icon: '🔄' }
                    ].map((theme) => (
                      <label key={theme.value} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="appearance.theme"
                          value={theme.value}
                          checked={formData.appearance.theme === theme.value}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="p-4 border-2 border-white/20 rounded-lg text-center transition-all duration-200 peer-checked:border-purple-500 peer-checked:bg-purple-500/20">
                          <div className="text-2xl mb-2">{theme.icon}</div>
                          <div className="text-white font-medium">{theme.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-3">
                    Idioma
                  </label>
                  <select
                    name="appearance.language"
                    value={formData.appearance.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="es" className="bg-gray-800">Español</option>
                    <option value="en" className="bg-gray-800">English</option>
                    <option value="fr" className="bg-gray-800">Français</option>
                    <option value="pt" className="bg-gray-800">Português</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-3">
                    Tamaño de fuente
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'small', label: 'Pequeño' },
                      { value: 'medium', label: 'Mediano' },
                      { value: 'large', label: 'Grande' }
                    ].map((size) => (
                      <label key={size.value} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="appearance.fontSize"
                          value={size.value}
                          checked={formData.appearance.fontSize === size.value}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="p-4 border-2 border-white/20 rounded-lg text-center transition-all duration-200 peer-checked:border-purple-500 peer-checked:bg-purple-500/20">
                          <div className="text-white font-medium">{size.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Configuración</h1>
            <p className="text-white/70 mt-2">Personaliza tu experiencia en KELUMY</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex space-x-8">
          {/* Sidebar de pestañas */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{tab.title}</p>
                    <p className="text-xs opacity-70">{tab.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
