// ========================================
// MÓDULO DE RECURSOS - Materiales y Recursos de Estudio
// ========================================

import React, { useState } from 'react'
import { FileText, Download, BookOpen, Video, FileImage, Search } from 'lucide-react'

const RecursosModule = () => {
  const [activeTab, setActiveTab] = useState('materiales')

  const tabs = [
    { id: 'materiales', label: 'Materiales', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'documentos', label: 'Documentos', icon: FileText },
    { id: 'imagenes', label: 'Imágenes', icon: FileImage }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Recursos</h2>
        <p className="text-white/70">Materiales y recursos de estudio disponibles</p>
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
          {activeTab === 'materiales' && 'Materiales de Estudio'}
          {activeTab === 'videos' && 'Videos Educativos'}
          {activeTab === 'documentos' && 'Documentos'}
          {activeTab === 'imagenes' && 'Imágenes'}
        </h3>
        <p className="text-white/70">Módulo de recursos en desarrollo...</p>
      </div>
    </div>
  )
}

export default RecursosModule
