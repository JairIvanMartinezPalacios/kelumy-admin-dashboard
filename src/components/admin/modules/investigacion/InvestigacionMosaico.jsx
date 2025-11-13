// ========================================
// MOSAICO DE INVESTIGACIÓN - KELUMY
// ========================================
// Mosaico principal para navegar entre los 12 módulos de investigación
// de e-commerce educativo desarrollados para Kelumy

import React, { useState } from 'react'
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Target, 
  Zap, 
  Settings, 
  Shield, 
  BookOpen, 
  Lightbulb,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react'

const InvestigacionMosaico = ({ onNavigateToModule }) => {
  const [filtroActivo, setFiltroActivo] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  // Los 12 módulos principales de investigación
  const modulos = [
    {
      id: 'modelos-negocio',
      titulo: 'Modelos de Negocio',
      descripcion: 'Previsualización de cómo implementar los 5 modelos principales en Kelumy',
      icono: CreditCard,
      color: 'blue',
      categoria: 'estrategia',
      completado: true,
      estadisticas: {
        modelos: 5,
        casos: 12,
        metricas: 8
      }
    },
    {
      id: 'estrategias-precio',
      titulo: 'Estrategias de Precio',
      descripcion: 'Previsualización de cómo implementar pricing strategies en Kelumy',
      icono: DollarSign,
      color: 'green',
      categoria: 'monetizacion',
      completado: true,
      estadisticas: {
        estrategias: 6,
        casos: 15,
        metricas: 12
      }
    },
    {
      id: 'embudo-ventas',
      titulo: 'Embudo de Ventas',
      descripcion: 'Previsualización del customer journey optimizado para Kelumy',
      icono: TrendingUp,
      color: 'purple',
      categoria: 'conversion',
      completado: true,
      estadisticas: {
        etapas: 7,
        tacticas: 20,
        metricas: 15
      }
    },
    {
      id: 'ux-checkout',
      titulo: 'UX y Checkout',
      descripcion: 'Previsualización de optimización de experiencia de usuario y proceso de compra',
      icono: ShoppingCart,
      color: 'blue',
      categoria: 'experiencia',
      completado: true,
      estadisticas: {
        componentes: 12,
        tests: 8,
        metricas: 10
      }
    },
    {
      id: 'metodos-venta',
      titulo: 'Métodos de Venta',
      descripcion: 'Previsualización de estrategias y técnicas de venta optimizadas para e-commerce educativo',
      icono: Users,
      color: 'red',
      categoria: 'ventas',
      completado: true,
      estadisticas: {
        metodos: 5,
        tecnicas: 20,
        metricas: 15
      }
    },
    {
      id: 'marketing-crm',
      titulo: 'Marketing y CRM',
      descripcion: 'Previsualización de estrategias de marketing digital y gestión de relaciones con clientes',
      icono: BarChart3,
      color: 'indigo',
      categoria: 'marketing',
      completado: true,
      estadisticas: {
        canales: 5,
        herramientas: 20,
        metricas: 25
      }
    },
    {
      id: 'metricas-kpis',
      titulo: 'Métricas y KPIs',
      descripcion: 'Previsualización de indicadores clave de rendimiento y análisis de datos para e-commerce educativo',
      icono: Target,
      color: 'teal',
      categoria: 'analisis',
      completado: true,
      estadisticas: {
        kpis: 20,
        categorias: 4,
        herramientas: 20
      }
    },
    {
      id: 'growth-hacks',
      titulo: 'Growth Hacks',
      descripcion: 'Previsualización de estrategias de crecimiento y viralización para e-commerce educativo',
      icono: Zap,
      color: 'yellow',
      categoria: 'crecimiento',
      completado: true,
      estadisticas: {
        estrategias: 5,
        tacticas: 20,
        herramientas: 20
      }
    },
    {
      id: 'pricing-experiments',
      titulo: 'Pricing Experiments',
      descripcion: 'Previsualización de experimentos de precios y optimización para e-commerce educativo',
      icono: Settings,
      color: 'pink',
      categoria: 'experimentacion',
      completado: true,
      estadisticas: {
        experimentos: 5,
        tacticas: 20,
        herramientas: 20
      }
    },
    {
      id: 'organizacion-operativa',
      titulo: 'Organización Operativa',
      descripcion: 'Previsualización de estructura organizacional y procesos operativos para e-commerce educativo',
      icono: Shield,
      color: 'gray',
      categoria: 'operaciones',
      completado: true,
      estadisticas: {
        areas: 5,
        procesos: 20,
        herramientas: 20
      }
    },
    {
      id: 'riesgos-mitigaciones',
      titulo: 'Riesgos y Mitigaciones',
      descripcion: 'Previsualización de análisis de riesgos y estrategias de mitigación para e-commerce educativo',
      icono: BookOpen,
      color: 'rose',
      categoria: 'riesgo',
      completado: true,
      estadisticas: {
        categorias: 5,
        riesgos: 25,
        mitigaciones: 30
      }
    },
    {
      id: 'buenas-practicas',
      titulo: 'Buenas Prácticas',
      descripcion: 'Mejores prácticas y lecciones aprendidas',
      icono: Lightbulb,
      color: 'emerald',
      categoria: 'mejores-practicas',
      completado: true,
      estadisticas: {
        practicas: 22,
        casos: 18,
        metricas: 17
      }
    }
  ]

  const categorias = [
    { id: 'todos', nombre: 'Todos', color: 'gray' },
    { id: 'estrategia', nombre: 'Estrategia', color: 'blue' },
    { id: 'monetizacion', nombre: 'Monetización', color: 'green' },
    { id: 'conversion', nombre: 'Conversión', color: 'purple' },
    { id: 'experiencia', nombre: 'Experiencia', color: 'orange' },
    { id: 'ventas', nombre: 'Ventas', color: 'red' },
    { id: 'marketing', nombre: 'Marketing', color: 'indigo' },
    { id: 'analisis', nombre: 'Análisis', color: 'teal' },
    { id: 'crecimiento', nombre: 'Crecimiento', color: 'yellow' },
    { id: 'experimentacion', nombre: 'Experimentación', color: 'pink' },
    { id: 'operaciones', nombre: 'Operaciones', color: 'gray' },
    { id: 'riesgo', nombre: 'Riesgo', color: 'rose' },
    { id: 'mejores-practicas', nombre: 'Mejores Prácticas', color: 'emerald' }
  ]

  // Filtrar módulos
  const modulosFiltrados = modulos.filter(modulo => {
    const coincideCategoria = filtroActivo === 'todos' || modulo.categoria === filtroActivo
    const coincideBusqueda = modulo.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                           modulo.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  const handleModuloClick = (moduloId) => {
    console.log(`Navegando a módulo: ${moduloId}`)
    
    // Navegación específica para cada módulo
    if (onNavigateToModule) {
      onNavigateToModule(moduloId)
    } else {
      // Fallback para desarrollo
      switch (moduloId) {
        case 'modelos-negocio':
          console.log('Módulo 1: Modelos de Negocio - Disponible')
          break
        case 'estrategias-precio':
          console.log('Módulo 2: Estrategias de Precio - Disponible')
          break
        case 'embudo-ventas':
          console.log('Módulo 3: Embudo de Ventas - Disponible')
          break
        case 'ux-checkout':
          console.log('Módulo 4: UX y Checkout - En desarrollo')
          break
        case 'metodos-venta':
          console.log('Módulo 5: Métodos de Venta - En desarrollo')
          break
        case 'marketing-crm':
          console.log('Módulo 6: Marketing y CRM - En desarrollo')
          break
        case 'metricas-kpis':
          console.log('Módulo 7: Métricas y KPIs - En desarrollo')
          break
        case 'growth-hacks':
          console.log('Módulo 8: Growth Hacks - En desarrollo')
          break
        case 'pricing-experiments':
          console.log('Módulo 9: Pricing Experiments - En desarrollo')
          break
        case 'organizacion-operativa':
          console.log('Módulo 10: Organización Operativa - En desarrollo')
          break
        case 'riesgos-mitigaciones':
          console.log('Módulo 11: Riesgos y Mitigaciones - En desarrollo')
          break
        case 'buenas-practicas':
          console.log('Módulo 12: Buenas Prácticas - En desarrollo')
          break
        default:
          console.log('Módulo no reconocido:', moduloId)
      }
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Previsualización de Implementación</h1>
            <p className="text-white/70">12 módulos de investigación - Cómo se implementarían en Kelumy</p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <BarChart3 className="w-4 h-4" />
              <span>Resumen</span>
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Buscar módulos de investigación..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setFiltroActivo(categoria.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filtroActivo === categoria.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Módulos</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-full">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Completados</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <Target className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Categorías</p>
              <p className="text-2xl font-bold text-white">13</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Métricas</p>
              <p className="text-2xl font-bold text-white">200+</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Mosaico de módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modulosFiltrados.map((modulo) => {
          const IconoModulo = modulo.icono
          return (
            <div
              key={modulo.id}
              onClick={() => handleModuloClick(modulo.id)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-${modulo.color}-500/20 rounded-full`}>
                  <IconoModulo className={`w-6 h-6 text-${modulo.color}-400`} />
                </div>
                <div className="flex items-center space-x-2">
                  {modulo.completado && (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{modulo.titulo}</h3>
              <p className="text-white/70 text-sm mb-4">{modulo.descripcion}</p>

              {/* Estadísticas del módulo */}
              <div className="space-y-2">
                {Object.entries(modulo.estadisticas).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-xs text-white/60 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-xs font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Categoría</span>
                  <span className={`text-xs px-2 py-1 bg-${modulo.color}-500/20 text-${modulo.color}-400 rounded-full`}>
                    {categorias.find(c => c.id === modulo.categoria)?.nombre}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mensaje si no hay resultados */}
      {modulosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white/50" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No se encontraron módulos</h3>
          <p className="text-white/70">Intenta con otros términos de búsqueda o filtros</p>
        </div>
      )}
    </div>
  )
}

export default InvestigacionMosaico
