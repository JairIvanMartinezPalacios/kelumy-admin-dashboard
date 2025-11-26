import React, { useState, useRef } from 'react'
import {
  MessageCircle,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Users,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Importar componentes
import GestionTickets from './components/GestionTickets'
import ChatEnVivo from './components/ChatEnVivo'
import GestionFAQ from './components/GestionFAQ'
import BaseConocimiento from './components/BaseConocimiento'
import AgentesSoporte from './components/AgentesSoporte'
import PlantillasRespuestas from './components/PlantillasRespuestas'
import EstadisticasSoporte from './components/EstadisticasSoporte'
import ConfiguracionSoporte from './components/ConfiguracionSoporte'

const SoporteModule = () => {
  const [activeTab, setActiveTab] = useState('tickets')
  const scrollContainerRef = useRef(null)

  const tabs = [
    { id: 'tickets', label: 'Tickets', icon: MessageCircle },
    { id: 'chat', label: 'Chat en Vivo', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'base-conocimiento', label: 'Base de Conocimiento', icon: BookOpen },
    { id: 'agentes', label: 'Agentes', icon: Users },
    { id: 'plantillas', label: 'Plantillas', icon: FileText },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings }
  ]

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tickets':
        return <GestionTickets />
      case 'chat':
        return <ChatEnVivo />
      case 'faq':
        return <GestionFAQ />
      case 'base-conocimiento':
        return <BaseConocimiento />
      case 'agentes':
        return <AgentesSoporte />
      case 'plantillas':
        return <PlantillasRespuestas />
      case 'estadisticas':
        return <EstadisticasSoporte />
      case 'configuracion':
        return <ConfiguracionSoporte />
      default:
        return <GestionTickets />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Soporte y Atención al Cliente</h1>
        <p className="text-white/70">Gestiona tickets, chat, FAQ y todo el sistema de soporte</p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 relative">
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTabs('left')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
          <button
            onClick={() => scrollTabs('right')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 z-10"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[calc(100vh-250px)]">
        {renderContent()}
      </div>
    </div>
  )
}

export default SoporteModule
