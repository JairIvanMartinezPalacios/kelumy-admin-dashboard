// ========================================
// MÓDULO DE CONFIGURACIÓN USUARIO - Configuración Personal
// ========================================

import React, { useState } from 'react'
import { Settings, User, Bell, Shield, Palette, Globe } from 'lucide-react'

const ConfiguracionUserModule = () => {
  const [activeTab, setActiveTab] = useState('perfil')

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'privacidad', label: 'Privacidad', icon: Shield },
    { id: 'apariencia', label: 'Apariencia', icon: Palette },
    { id: 'idioma', label: 'Idioma', icon: Globe }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Configuración</h2>
        <p className="text-white/70">Personaliza tu experiencia de aprendizaje</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-8 border border-white/20">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">
          {activeTab === 'perfil' && 'Configuración de Perfil'}
          {activeTab === 'notificaciones' && 'Configuración de Notificaciones'}
          {activeTab === 'privacidad' && 'Configuración de Privacidad'}
          {activeTab === 'apariencia' && 'Configuración de Apariencia'}
          {activeTab === 'idioma' && 'Configuración de Idioma'}
        </h3>
        <p className="text-white/70">Módulo de configuración en desarrollo...</p>
      </div>
    </div>
  )
}

export default ConfiguracionUserModule
