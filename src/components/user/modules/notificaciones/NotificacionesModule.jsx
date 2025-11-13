// ========================================
// MÓDULO DE NOTIFICACIONES - Centro de Notificaciones
// ========================================

import React, { useState } from 'react'
import { Bell, Mail, Calendar, Award, MessageSquare, Settings } from 'lucide-react'

const NotificacionesModule = () => {
  const [activeTab, setActiveTab] = useState('todas')

  const tabs = [
    { id: 'todas', label: 'Todas', icon: Bell },
    { id: 'cursos', label: 'Cursos', icon: Calendar },
    { id: 'logros', label: 'Logros', icon: Award },
    { id: 'mensajes', label: 'Mensajes', icon: MessageSquare }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Notificaciones</h2>
        <p className="text-white/70">Centro de notificaciones y alertas</p>
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
          {activeTab === 'todas' && 'Todas las Notificaciones'}
          {activeTab === 'cursos' && 'Notificaciones de Cursos'}
          {activeTab === 'logros' && 'Notificaciones de Logros'}
          {activeTab === 'mensajes' && 'Mensajes'}
        </h3>
        <p className="text-white/70">Módulo de notificaciones en desarrollo...</p>
      </div>
    </div>
  )
}

export default NotificacionesModule
