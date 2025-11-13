// ========================================
// MÓDULO DE COMUNIDAD - Interacción con la Comunidad
// ========================================

import React, { useState } from 'react'
import { Users, MessageSquare, Heart, Share, Send, Search } from 'lucide-react'

const ComunidadModule = () => {
  const [activeTab, setActiveTab] = useState('foros')

  const tabs = [
    { id: 'foros', label: 'Foros', icon: MessageSquare },
    { id: 'estudiantes', label: 'Estudiantes', icon: Users },
    { id: 'instructores', label: 'Instructores', icon: Users }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Comunidad</h2>
        <p className="text-white/70">Conecta con otros estudiantes y instructores</p>
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
          {activeTab === 'foros' && 'Foros de Discusión'}
          {activeTab === 'estudiantes' && 'Estudiantes'}
          {activeTab === 'instructores' && 'Instructores'}
        </h3>
        <p className="text-white/70">Módulo de comunidad en desarrollo...</p>
      </div>
    </div>
  )
}

export default ComunidadModule
