// ========================================
// MÓDULO DE PERFIL - Perfil del Usuario
// ========================================

import React, { useState } from 'react'
import { User, Edit, Save, Camera, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react'

const PerfilModule = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'academico', label: 'Académico', icon: Award },
    { id: 'configuracion', label: 'Configuración', icon: Edit }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Mi Perfil</h2>
        <p className="text-white/70">Gestiona tu información personal y académica</p>
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
          {activeTab === 'personal' && 'Información Personal'}
          {activeTab === 'academico' && 'Información Académica'}
          {activeTab === 'configuracion' && 'Configuración de Cuenta'}
        </h3>
        <p className="text-white/70">Módulo de perfil en desarrollo...</p>
      </div>
    </div>
  )
}

export default PerfilModule
