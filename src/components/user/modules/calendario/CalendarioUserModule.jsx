// ========================================
// MÓDULO DE CALENDARIO USUARIO - Eventos y Programación Personal
// ========================================

import React, { useState } from 'react'
import { Calendar, Plus, Clock, Users, Video, BookOpen } from 'lucide-react'

const CalendarioUserModule = () => {
  const [activeTab, setActiveTab] = useState('eventos')

  const tabs = [
    { id: 'eventos', label: 'Eventos', icon: Calendar },
    { id: 'clases', label: 'Clases', icon: Video },
    { id: 'recordatorios', label: 'Recordatorios', icon: Clock }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Mi Calendario</h2>
        <p className="text-white/70">Eventos, clases y recordatorios personalizados</p>
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
          {activeTab === 'eventos' && 'Eventos del Calendario'}
          {activeTab === 'clases' && 'Clases Programadas'}
          {activeTab === 'recordatorios' && 'Recordatorios'}
        </h3>
        <p className="text-white/70">Módulo de calendario en desarrollo...</p>
      </div>
    </div>
  )
}

export default CalendarioUserModule
