import React, { useState, useRef } from 'react'
import {
  Package,
  Folder,
  Package2,
  Tag,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Importar componentes
import GestionProductos from './components/GestionProductos'
import GestionCategorias from './components/GestionCategorias'
import InventarioStock from './components/InventarioStock'
import PreciosDescuentos from './components/PreciosDescuentos'
import AnaliticasProductos from './components/AnaliticasProductos'

const ProductosModule = () => {
  const [activeTab, setActiveTab] = useState('productos')
  const scrollContainerRef = useRef(null)

  const tabs = [
    { id: 'productos', label: 'Productos', icon: Package },
    { id: 'categorias', label: 'Categorías', icon: Folder },
    { id: 'inventario', label: 'Inventario', icon: Package2 },
    { id: 'precios', label: 'Precios y Descuentos', icon: Tag },
    { id: 'analiticas', label: 'Analíticas', icon: BarChart3 }
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
      case 'productos':
        return <GestionProductos />
      case 'categorias':
        return <GestionCategorias />
      case 'inventario':
        return <InventarioStock />
      case 'precios':
        return <PreciosDescuentos />
      case 'analiticas':
        return <AnaliticasProductos />
      default:
        return <GestionProductos />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Productos en Línea</h1>
        <p className="text-white/70">Gestiona tu catálogo de productos digitales y físicos</p>
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

export default ProductosModule
