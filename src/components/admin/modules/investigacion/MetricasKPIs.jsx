// ========================================
// MÓDULO 7: MÉTRICAS Y KPIS - KELUMY
// ========================================
// Previsualización de indicadores clave de rendimiento y análisis de datos
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Settings,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Star,
  CheckCircle as Check,
  Lightbulb,
  BookOpen
} from 'lucide-react'

const MetricasKPIs = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [categoriaActiva, setCategoriaActiva] = useState('ventas')
  const [analisisActivo, setAnalisisActivo] = useState('conversion')

  // KPIs de Ventas y Conversión
  const kpisVentas = {
    ingresos: {
      nombre: 'Ingresos Totales',
      descripcion: 'Total de ingresos generados por la plataforma',
      valor: '$2,450,000 MXN',
      cambio: '+18.5%',
      tendencia: 'up',
      objetivo: '$2,800,000 MXN',
      cumplimiento: '87.5%'
    },
    conversion: {
      nombre: 'Tasa de Conversión',
      descripcion: 'Porcentaje de visitantes que completan una compra',
      valor: '3.8%',
      cambio: '+0.4%',
      tendencia: 'up',
      objetivo: '4.5%',
      cumplimiento: '84.4%'
    },
    carritoAbandono: {
      nombre: 'Abandono de Carrito',
      descripcion: 'Porcentaje de usuarios que abandonan el carrito',
      valor: '68.2%',
      cambio: '-2.1%',
      tendencia: 'down',
      objetivo: '60%',
      cumplimiento: '88.1%'
    },
    valorOrden: {
      nombre: 'Valor Promedio de Orden',
      descripcion: 'Valor promedio de cada transacción',
      valor: '$850 MXN',
      cambio: '+12.3%',
      tendencia: 'up',
      objetivo: '$950 MXN',
      cumplimiento: '89.5%'
    },
    ticketPromedio: {
      nombre: 'Ticket Promedio',
      descripcion: 'Valor promedio por cliente',
      valor: '$1,200 MXN',
      cambio: '+8.7%',
      tendencia: 'up',
      objetivo: '$1,400 MXN',
      cumplimiento: '85.7%'
    }
  }

  // KPIs de Marketing y Adquisición
  const kpisMarketing = {
    cac: {
      nombre: 'CAC (Costo Adquisición)',
      descripcion: 'Costo promedio para adquirir un nuevo cliente',
      valor: '$120 MXN',
      cambio: '-15.2%',
      tendencia: 'down',
      objetivo: '$100 MXN',
      cumplimiento: '83.3%'
    },
    ltv: {
      nombre: 'LTV (Lifetime Value)',
      descripcion: 'Valor de vida del cliente',
      valor: '$2,800 MXN',
      cambio: '+22.1%',
      tendencia: 'up',
      objetivo: '$3,200 MXN',
      cumplimiento: '87.5%'
    },
    ltvCac: {
      nombre: 'Ratio LTV/CAC',
      descripcion: 'Relación entre valor de vida y costo de adquisición',
      valor: '23.3:1',
      cambio: '+43.8%',
      tendencia: 'up',
      objetivo: '25:1',
      cumplimiento: '93.2%'
    },
    churn: {
      nombre: 'Tasa de Churn',
      descripcion: 'Porcentaje de clientes que cancelan suscripciones',
      valor: '8.5%',
      cambio: '-1.8%',
      tendencia: 'down',
      objetivo: '6%',
      cumplimiento: '70.6%'
    },
    retention: {
      nombre: 'Tasa de Retención',
      descripcion: 'Porcentaje de clientes que permanecen activos',
      valor: '91.5%',
      cambio: '+1.8%',
      tendencia: 'up',
      objetivo: '94%',
      cumplimiento: '97.3%'
    }
  }

  // KPIs de Producto y Experiencia
  const kpisProducto = {
    nps: {
      nombre: 'NPS (Net Promoter Score)',
      descripcion: 'Medida de satisfacción y lealtad del cliente',
      valor: '68',
      cambio: '+5',
      tendencia: 'up',
      objetivo: '75',
      cumplimiento: '90.7%'
    },
    csat: {
      nombre: 'CSAT (Customer Satisfaction)',
      descripcion: 'Puntuación de satisfacción del cliente',
      valor: '4.6/5',
      cambio: '+0.2',
      tendencia: 'up',
      objetivo: '4.8/5',
      cumplimiento: '95.8%'
    },
    tiempoRespuesta: {
      nombre: 'Tiempo de Respuesta',
      descripcion: 'Tiempo promedio de respuesta a consultas',
      valor: '2.1 horas',
      cambio: '-0.3',
      tendencia: 'down',
      objetivo: '1.5 horas',
      cumplimiento: '71.4%'
    },
    tasaResolucion: {
      nombre: 'Tasa de Resolución',
      descripcion: 'Porcentaje de problemas resueltos en primera interacción',
      valor: '78%',
      cambio: '+4.2%',
      tendencia: 'up',
      objetivo: '85%',
      cumplimiento: '91.8%'
    },
    uptime: {
      nombre: 'Uptime de Plataforma',
      descripcion: 'Porcentaje de tiempo que la plataforma está disponible',
      valor: '99.7%',
      cambio: '+0.1%',
      tendencia: 'up',
      objetivo: '99.9%',
      cumplimiento: '99.8%'
    }
  }

  // KPIs de Operaciones y Eficiencia
  const kpisOperaciones = {
    tiempoCarga: {
      nombre: 'Tiempo de Carga',
      descripcion: 'Tiempo promedio de carga de la plataforma',
      valor: '2.3 segundos',
      cambio: '-0.4',
      tendencia: 'down',
      objetivo: '2.0 segundos',
      cumplimiento: '87.0%'
    },
    tasaError: {
      nombre: 'Tasa de Error',
      descripcion: 'Porcentaje de errores en transacciones',
      valor: '1.2%',
      cambio: '-0.3%',
      tendencia: 'down',
      objetivo: '0.5%',
      cumplimiento: '41.7%'
    },
    productividad: {
      nombre: 'Productividad del Equipo',
      descripcion: 'Eficiencia del equipo de desarrollo',
      valor: '85%',
      cambio: '+3.2%',
      tendencia: 'up',
      objetivo: '90%',
      cumplimiento: '94.4%'
    },
    costoOperacion: {
      nombre: 'Costo de Operación',
      descripcion: 'Costo mensual de operación de la plataforma',
      valor: '$45,000 MXN',
      cambio: '-8.5%',
      tendencia: 'down',
      objetivo: '$40,000 MXN',
      cumplimiento: '88.9%'
    },
    escalabilidad: {
      nombre: 'Capacidad de Escalabilidad',
      descripcion: 'Capacidad de la plataforma para manejar crecimiento',
      valor: '92%',
      cambio: '+5.1%',
      tendencia: 'up',
      objetivo: '95%',
      cumplimiento: '96.8%'
    }
  }

  // Métricas de Análisis Avanzado
  const metricasAvanzadas = {
    cohortes: {
      nombre: 'Análisis de Cohortes',
      descripcion: 'Análisis del comportamiento de grupos de usuarios a lo largo del tiempo',
      metricas: [
        { periodo: 'Mes 1', retencion: '85%', ltv: '$800' },
        { periodo: 'Mes 3', retencion: '72%', ltv: '$1,200' },
        { periodo: 'Mes 6', retencion: '65%', ltv: '$1,800' },
        { periodo: 'Mes 12', retencion: '58%', ltv: '$2,400' }
      ]
    },
    funnel: {
      nombre: 'Análisis de Embudo',
      descripcion: 'Conversión en cada etapa del customer journey',
      etapas: [
        { etapa: 'Visitas', cantidad: '25,000', conversion: '100%' },
        { etapa: 'Registros', cantidad: '2,500', conversion: '10%' },
        { etapa: 'Trial', cantidad: '1,250', conversion: '50%' },
        { etapa: 'Compra', cantidad: '375', conversion: '30%' },
        { etapa: 'Renovación', cantidad: '300', conversion: '80%' }
      ]
    },
    attribution: {
      nombre: 'Atribución Multi-Canal',
      descripcion: 'Contribución de cada canal en las conversiones',
      canales: [
        { canal: 'Email Marketing', contribucion: '35%', conversion: '12%' },
        { canal: 'Social Media', contribucion: '25%', conversion: '8%' },
        { canal: 'SEO', contribucion: '20%', conversion: '15%' },
        { canal: 'Paid Ads', contribucion: '15%', conversion: '18%' },
        { canal: 'Referrals', contribucion: '5%', conversion: '25%' }
      ]
    }
  }

  // Herramientas de Analytics y BI
  const herramientasAnalytics = {
    web: {
      nombre: 'Web Analytics',
      herramientas: ['Google Analytics 4', 'Adobe Analytics', 'Mixpanel', 'Amplitude', 'Hotjar'],
      funcionalidades: [
        'Tracking de eventos personalizados',
        'Análisis de embudos',
        'Segmentación de audiencia',
        'Análisis de cohortes',
        'Heatmaps y grabaciones'
      ],
      impacto: '+40% insights'
    },
    business: {
      nombre: 'Business Intelligence',
      herramientas: ['Tableau', 'Power BI', 'Looker', 'Metabase', 'Grafana'],
      funcionalidades: [
        'Dashboards ejecutivos',
        'Reportes automatizados',
        'Análisis predictivo',
        'Visualización de datos',
        'Alertas inteligentes'
      ],
      impacto: '+35% decisiones'
    },
    realtime: {
      nombre: 'Real-time Analytics',
      herramientas: ['Google Analytics Real-time', 'Mixpanel Live', 'Amplitude Live', 'Segment', 'RudderStack'],
      funcionalidades: [
        'Monitoreo en tiempo real',
        'Alertas instantáneas',
        'Análisis de comportamiento',
        'Personalización dinámica',
        'Optimización automática'
      ],
      impacto: '+50% respuesta'
    },
    testing: {
      nombre: 'Testing y Experimentación',
      herramientas: ['Google Optimize', 'Optimizely', 'VWO', 'AB Tasty', 'Unbounce'],
      funcionalidades: [
        'A/B testing avanzado',
        'Multivariate testing',
        'Personalización automática',
        'Statistical significance',
        'Automated optimization'
      ],
      impacto: '+25% conversion'
    }
  }

  // Casos de estudio de implementación
  const casosImplementacion = {
    caso1: {
      titulo: 'Implementación de Dashboard de KPIs - Mejora de Visibilidad',
      problema: 'Falta de visibilidad en métricas clave del negocio',
      solucion: 'Dashboard centralizado con KPIs en tiempo real',
      resultados: {
        visibilidadAnterior: '40%',
        visibilidadNueva: '95%',
        incremento: '+137%',
        decisiones: '+60%'
      },
      implementacion: [
        'Dashboard ejecutivo con KPIs principales',
        'Alertas automáticas por umbrales',
        'Reportes automatizados diarios/semanales',
        'Integración con todas las fuentes de datos',
        'Capacitación del equipo en interpretación'
      ]
    },
    caso2: {
      titulo: 'Análisis de Cohortes - Optimización de Retención',
      problema: 'Alta tasa de churn en primeros meses (25%)',
      solucion: 'Análisis de cohortes para identificar patrones de abandono',
      resultados: {
        churnAnterior: '25%',
        churnNuevo: '12%',
        reduccion: '-52%',
        ltv: '+35%'
      },
      implementacion: [
        'Análisis de cohortes mensuales',
        'Identificación de puntos críticos de abandono',
        'Estrategias de retención personalizadas',
        'Programas de onboarding mejorados',
        'Seguimiento de métricas de engagement'
      ]
    },
    caso3: {
      titulo: 'Atribución Multi-Canal - Optimización de ROI',
      problema: 'Dificultad para medir ROI de canales de marketing',
      solucion: 'Sistema de atribución multi-canal con análisis avanzado',
      resultados: {
        precisionAnterior: '60%',
        precisionNueva: '90%',
        incremento: '+50%',
        roi: '+28%'
      },
      implementacion: [
        'Modelo de atribución de primer clic',
        'Modelo de atribución de último clic',
        'Modelo de atribución lineal',
        'Modelo de atribución de tiempo decay',
        'Análisis de contribución por canal'
      ]
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">KPIs Monitoreados</h3>
            <Target className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">47</div>
          <p className="text-sm text-white/70">Indicadores activos</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+12% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Cumplimiento Promedio</h3>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">87.3%</div>
          <p className="text-sm text-white/70">Objetivos alcanzados</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+5.2% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Tiempo de Respuesta</h3>
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">2.1s</div>
          <p className="text-sm text-white/70">Promedio de carga</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-0.4s vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* KPIs por categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* KPIs de Ventas */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <div className="p-2 bg-green-500/20 rounded-full mr-3">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            KPIs de Ventas y Conversión
          </h3>
          <div className="space-y-3">
            {Object.entries(kpisVentas).map(([key, kpi]) => (
              <div key={key} className="bg-white/5 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-white text-sm">{kpi.nombre}</h4>
                  <div className="flex items-center">
                    <span className="text-sm text-white mr-2">{kpi.valor}</span>
                    <div className={`flex items-center ${kpi.tendencia === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {kpi.tendencia === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-xs ml-1">{kpi.cambio}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Objetivo: {kpi.objetivo}</span>
                  <span>Cumplimiento: {kpi.cumplimiento}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPIs de Marketing */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <div className="p-2 bg-blue-500/20 rounded-full mr-3">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            KPIs de Marketing y Adquisición
          </h3>
          <div className="space-y-3">
            {Object.entries(kpisMarketing).map(([key, kpi]) => (
              <div key={key} className="bg-white/5 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-white text-sm">{kpi.nombre}</h4>
                  <div className="flex items-center">
                    <span className="text-sm text-white mr-2">{kpi.valor}</span>
                    <div className={`flex items-center ${kpi.tendencia === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {kpi.tendencia === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-xs ml-1">{kpi.cambio}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Objetivo: {kpi.objetivo}</span>
                  <span>Cumplimiento: {kpi.cumplimiento}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderVistaCategorias = () => (
    <div className="space-y-6">
      {/* Selector de categorías */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        <button
          onClick={() => setCategoriaActiva('ventas')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            categoriaActiva === 'ventas'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">Ventas</span>
        </button>
        <button
          onClick={() => setCategoriaActiva('marketing')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            categoriaActiva === 'marketing'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Target className="w-4 h-4" />
          <span className="text-sm">Marketing</span>
        </button>
        <button
          onClick={() => setCategoriaActiva('producto')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            categoriaActiva === 'producto'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Star className="w-4 h-4" />
          <span className="text-sm">Producto</span>
        </button>
        <button
          onClick={() => setCategoriaActiva('operaciones')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            categoriaActiva === 'operaciones'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Operaciones</span>
        </button>
      </div>

      {/* Detalles de la categoría activa */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {categoriaActiva === 'ventas' && 'KPIs de Ventas y Conversión'}
              {categoriaActiva === 'marketing' && 'KPIs de Marketing y Adquisición'}
              {categoriaActiva === 'producto' && 'KPIs de Producto y Experiencia'}
              {categoriaActiva === 'operaciones' && 'KPIs de Operaciones y Eficiencia'}
            </h2>
            <p className="text-white/70">
              {categoriaActiva === 'ventas' && 'Métricas clave para medir el rendimiento de ventas y conversión'}
              {categoriaActiva === 'marketing' && 'Indicadores de efectividad en marketing y adquisición de clientes'}
              {categoriaActiva === 'producto' && 'Métricas de satisfacción y experiencia del usuario'}
              {categoriaActiva === 'operaciones' && 'Indicadores de eficiencia operativa y rendimiento técnico'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(
            categoriaActiva === 'ventas' ? kpisVentas :
            categoriaActiva === 'marketing' ? kpisMarketing :
            categoriaActiva === 'producto' ? kpisProducto :
            kpisOperaciones
          ).map(([key, kpi]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{kpi.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{kpi.descripcion}</p>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white/70">Valor Actual</span>
                  <span className="text-lg font-bold text-white">{kpi.valor}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white/70">Cambio</span>
                  <div className={`flex items-center ${kpi.tendencia === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {kpi.tendencia === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-sm ml-1">{kpi.cambio}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white/70">Objetivo</span>
                  <span className="text-sm text-white">{kpi.objetivo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Cumplimiento</span>
                  <span className="text-sm font-semibold text-green-400">{kpi.cumplimiento}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaHerramientas = () => (
    <div className="space-y-6">
      {/* Herramientas de analytics */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-鲜明bg-purple-500/20 rounded-full mr-3">
            <BarChart3 className="w-5 h-5 text-purple-400" />
          </div>
          Herramientas de Analytics y Business Intelligence
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasAnalytics).map(([categoria, datos]) => (
            <div key={categoria} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-3">{datos.nombre}</h4>
              
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Herramientas:</p>
                <div className="flex flex-wrap gap-1">
                  {datos.herramientas.map((herramienta, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Funcionalidades:</p>
                <ul className="space-y-1">
                  {datos.funcionalidades.map((funcionalidad, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{funcionalidad}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Impacto esperado:</span>
                <span className="text-sm font-semibold text-green-400">{datos.impacto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaCasos = () => (
    <div className="space-y-6">
      {/* Casos de implementación */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-full mr-3">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          Casos de Implementación de Métricas y KPIs
        </h3>
        
        <div className="space-y-6">
          {Object.entries(casosImplementacion).map(([caso, datos]) => (
            <div key={caso} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{datos.titulo}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-white/70 mb-1">Problema:</p>
                  <p className="text-sm text-white">{datos.problema}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">Solución:</p>
                  <p className="text-sm text-white">{datos.solucion}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-2">Resultados:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(datos.resultados).map(([metrica, valor]) => (
                    <div key={metrica} className="bg-white/5 p-2 rounded text-center">
                      <p className="text-xs text-white/70 capitalize">{metrica.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm font-semibold text-green-400">{valor}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-white/70 mb-2">Implementación:</p>
                <ul className="space-y-1">
                  {datos.implementacion.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Métricas y KPIs</h1>
              <p className="text-white/70">Indicadores clave de rendimiento y análisis de datos para e-commerce educativo</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <Settings className="w-4 h-4" />
              <span>Configurar</span>
            </button>
          </div>
        </div>

        {/* Navegación de vistas */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
          <button
            onClick={() => setVistaActiva('resumen')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'resumen'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Resumen</span>
          </button>
          <button
            onClick={() => setVistaActiva('categorias')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'categorias'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-sm">Categorías</span>
          </button>
          <button
            onClick={() => setVistaActiva('herramientas')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'herramientas'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Herramientas</span>
          </button>
          <button
            onClick={() => setVistaActiva('casos')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'casos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm">Casos</span>
          </button>
        </div>
      </div>

      {/* Contenido de la vista */}
      {vistaActiva === 'resumen' && renderVistaResumen()}
      {vistaActiva === 'categorias' && renderVistaCategorias()}
      {vistaActiva === 'herramientas' && renderVistaHerramientas()}
      {vistaActiva === 'casos' && renderVistaCasos()}

      {/* Glosario de Términos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          Glosario de Términos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">KPI (Key Performance Indicator)</h4>
            <p className="text-sm text-white/70">Indicador clave de rendimiento. Métrica que mide el éxito de un objetivo específico.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CAC (Customer Acquisition Cost)</h4>
            <p className="text-sm text-white/70">Costo de adquisición de cliente. Gasto promedio para conseguir un nuevo cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">LTV (Lifetime Value)</h4>
            <p className="text-sm text-white/70">Valor de vida del cliente. Ingresos totales que genera un cliente durante toda su relación.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Churn Rate</h4>
            <p className="text-sm text-white/70">Tasa de abandono. Porcentaje de clientes que cancelan suscripciones en un período.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">NPS (Net Promoter Score)</h4>
            <p className="text-sm text-white/70">Puntuación de promotores netos. Métrica que mide la satisfacción y lealtad del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CSAT (Customer Satisfaction)</h4>
            <p className="text-sm text-white/70">Satisfacción del cliente. Medida de qué tan satisfecho está un cliente con un servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Conversion Rate</h4>
            <p className="text-sm text-white/70">Tasa de conversión. Porcentaje de visitantes que completan una acción deseada.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Cart Abandonment</h4>
            <p className="text-sm text-white/70">Abandono de carrito. Porcentaje de usuarios que abandonan el carrito sin completar la compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">AOV (Average Order Value)</h4>
            <p className="text-sm text-white/70">Valor promedio de orden. Cantidad promedio gastada por transacción.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Retention Rate</h4>
            <p className="text-sm text-white/70">Tasa de retención. Porcentaje de clientes que permanecen activos en un período.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Uptime</h4>
            <p className="text-sm text-white/70">Tiempo de actividad. Porcentaje de tiempo que un sistema está disponible y funcionando.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Cohort Analysis</h4>
            <p className="text-sm text-white/70">Análisis de cohortes. Estudio del comportamiento de grupos de usuarios a lo largo del tiempo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Funnel Analysis</h4>
            <p className="text-sm text-white/70">Análisis de embudo. Evaluación de las conversiones en cada paso de un proceso.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Attribution Modeling</h4>
            <p className="text-sm text-white/70">Modelado de atribución. Proceso de asignar crédito a diferentes touchpoints.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROI (Return on Investment)</h4>
            <p className="text-sm text-white/70">Retorno de inversión. Beneficio obtenido en relación al dinero invertido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROAS (Return on Ad Spend)</h4>
            <p className="text-sm text-white/70">Retorno de inversión publicitaria. Métrica que mide la efectividad de la publicidad.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CTR (Click-Through Rate)</h4>
            <p className="text-sm text-white/70">Tasa de clics. Porcentaje de personas que hacen clic en un enlace respecto al total.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CPC (Cost Per Click)</h4>
            <p className="text-sm text-white/70">Costo por clic. Cantidad de dinero que se paga por cada clic en un anuncio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CPM (Cost Per Mille)</h4>
            <p className="text-sm text-white/70">Costo por mil impresiones. Precio que se paga por cada mil visualizaciones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Bounce Rate</h4>
            <p className="text-sm text-white/70">Tasa de rebote. Porcentaje de visitantes que abandonan el sitio después de ver una página.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Session Duration</h4>
            <p className="text-sm text-white/70">Duración de sesión. Tiempo promedio que un usuario pasa en el sitio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Page Views</h4>
            <p className="text-sm text-white/70">Visualizaciones de página. Número total de páginas vistas por los usuarios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Unique Visitors</h4>
            <p className="text-sm text-white/70">Visitantes únicos. Número de usuarios únicos que visitan el sitio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Heatmap</h4>
            <p className="text-sm text-white/70">Mapa de calor. Representación visual de dónde los usuarios hacen clic o se desplazan.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">A/B Testing</h4>
            <p className="text-sm text-white/70">Pruebas A/B. Comparación de dos versiones para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Statistical Significance</h4>
            <p className="text-sm text-white/70">Significancia estadística. Probabilidad de que un resultado no sea debido al azar.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetricasKPIs
