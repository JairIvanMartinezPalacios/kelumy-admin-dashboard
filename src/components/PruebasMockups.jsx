// ========================================
// PRUEBAS Y MOCKUPS - KELUMY
// ========================================
// Componente principal para mostrar todos los mockups desarrollados
// basados en la investigación de e-commerce educativo

import React, { useState } from 'react'
import { 
  TestTube, 
  BarChart3, 
  Package, 
  TrendingUp, 
  CreditCard, 
  ShoppingCart,
  Users,
  Building,
  Zap,
  Target,
  ChevronRight,
  Play,
  Code,
  FileText
} from 'lucide-react'
import ModelosNegocioDemo from './ModelosNegocioDemo'

const PruebasMockups = () => {
  const [mockupActivo, setMockupActivo] = useState('modelos-negocio')

  // Lista de mockups disponibles
  const mockups = [
    {
      id: 'modelos-negocio',
      titulo: 'Modelos de Negocio',
      descripcion: 'Análisis visual de los 5 modelos de negocio para Kelumy',
      icono: BarChart3,
      color: 'blue',
      estado: 'completado',
      componente: ModelosNegocioDemo
    },
    {
      id: 'oferta-empaquetado',
      titulo: 'Oferta y Empaquetado',
      descripcion: 'Estrategias de pricing y empaquetado de productos',
      icono: Package,
      color: 'green',
      estado: 'en-desarrollo',
      componente: null
    },
    {
      id: 'embudo-ventas',
      titulo: 'Embudo de Ventas',
      descripcion: 'Fases TOFU, MOFU, BOFU y POFU del embudo',
      icono: TrendingUp,
      color: 'purple',
      estado: 'pendiente',
      componente: null
    },
    {
      id: 'ux-checkout',
      titulo: 'UX y Checkout',
      descripcion: 'Experiencia de usuario y flujo de pago',
      icono: CreditCard,
      color: 'orange',
      estado: 'pendiente',
      componente: null
    },
    {
      id: 'metodos-venta',
      titulo: 'Métodos de Venta',
      descripcion: 'Canales de venta y estrategias comerciales',
      icono: ShoppingCart,
      color: 'indigo',
      estado: 'pendiente',
      componente: null
    },
    {
      id: 'marketing-crm',
      titulo: 'Marketing y CRM',
      descripcion: 'Automatización de marketing y gestión de clientes',
      icono: Users,
      color: 'pink',
      estado: 'pendiente',
      componente: null
    },
    {
      id: 'metricas-kpi',
      titulo: 'Métricas y KPIs',
      descripcion: 'Dashboards de métricas y análisis de rendimiento',
      icono: BarChart3,
      color: 'teal',
      estado: 'pendiente',
      componente: null
    },
    {
      id: 'growth-hacks',
      titulo: 'Growth Hacks',
      descripcion: 'Estrategias de crecimiento y viralización',
      icono: Zap,
      color: 'yellow',
      estado: 'pendiente',
      componente: null
    },
    {
      id: 'pricing-experiments',
      titulo: 'Pricing Experiments',
      descripcion: 'Experimentos de precios y A/B testing',
      icono: Target,
      color: 'red',
      estado: 'pendiente',
      componente: null
    },
    {
      id: 'organizacion-operativa',
      titulo: 'Organización Operativa',
      descripcion: 'Soporte, fulfillment y procesos operativos',
      icono: Building,
      color: 'gray',
      estado: 'pendiente',
      componente: null
    }
  ]

  const mockupSeleccionado = mockups.find(m => m.id === mockupActivo)
  const ComponenteActivo = mockupSeleccionado?.componente

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completado': return 'bg-green-100 text-green-800 border-green-200'
      case 'en-desarrollo': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'pendiente': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'completado': return 'Completado'
      case 'en-desarrollo': return 'En Desarrollo'
      case 'pendiente': return 'Pendiente'
      default: return 'Pendiente'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <TestTube className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pruebas & Mockups</h1>
              <p className="text-gray-600">Implementaciones visuales de la investigación de e-commerce educativo</p>
            </div>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Play className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completados</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Code className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">En Desarrollo</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-900">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lista de Mockups */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mockups Disponibles</h3>
              <div className="space-y-2">
                {mockups.map((mockup) => {
                  const Icono = mockup.icono
                  return (
                    <button
                      key={mockup.id}
                      onClick={() => setMockupActivo(mockup.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        mockupActivo === mockup.id
                          ? `border-${mockup.color}-500 bg-${mockup.color}-50`
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Icono className={`w-5 h-5 mr-3 ${
                            mockupActivo === mockup.id ? `text-${mockup.color}-600` : 'text-gray-500'
                          }`} />
                          <div>
                            <p className="font-medium text-sm text-gray-900">{mockup.titulo}</p>
                            <p className="text-xs text-gray-500">{mockup.descripcion}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getEstadoColor(mockup.estado)}`}>
                            {getEstadoTexto(mockup.estado)}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contenido del Mockup */}
          <div className="lg:col-span-3">
            {ComponenteActivo ? (
              <ComponenteActivo />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4">
                  <Code className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {mockupSeleccionado?.titulo}
                </h3>
                <p className="text-gray-600 mb-4">
                  {mockupSeleccionado?.descripcion}
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                  <FileText className="w-4 h-4 mr-2" />
                  En desarrollo - Próximamente
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PruebasMockups
