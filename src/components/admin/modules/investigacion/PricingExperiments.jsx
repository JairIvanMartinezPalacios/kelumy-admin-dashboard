// ========================================
// MÓDULO 9: PRICING EXPERIMENTS - KELUMY
// ========================================
// Previsualización de experimentos de precios y optimización
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Star,
  CheckCircle as Check,
  Zap,
  Lightbulb,
  BookOpen
} from 'lucide-react'

const PricingExperiments = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [experimentoActivo, setExperimentoActivo] = useState('ab-testing')
  const [analisisActivo, setAnalisisActivo] = useState('conversion')

  // Experimentos de Pricing
  const experimentosPricing = {
    abTesting: {
      nombre: 'A/B Testing de Precios',
      descripcion: 'Comparación de diferentes precios para optimizar conversión y ingresos',
      caracteristicas: [
        'Testing de múltiples puntos de precio',
        'Segmentación por tipo de usuario',
        'Análisis estadístico riguroso',
        'Monitoreo de métricas clave',
        'Implementación gradual'
      ],
      tecnicas: [
        'Precios por niveles ($99, $149, $199)',
        'Testing por segmento (estudiantes vs profesores)',
        'Análisis de elasticidad de precio',
        'Testing de descuentos (10%, 20%, 30%)',
        'Experimentos de bundling'
      ],
      metricas: {
        conversionRate: '4.8%',
        revenuePerUser: '$165',
        priceSensitivity: '0.75',
        statisticalSignificance: '95%'
      },
      implementacionKelumy: {
        experimentos: [
          { precio: '$99', conversion: '6.2%', revenue: '$99', satisfaction: '4.3/5' },
          { precio: '$149', conversion: '4.8%', revenue: '$149', satisfaction: '4.6/5' },
          { precio: '$199', conversion: '3.1%', revenue: '$199', satisfaction: '4.8/5' }
        ],
        herramientas: ['Optimizely', 'VWO', 'Google Optimize', 'AB Tasty']
      }
    },
    dynamicPricing: {
      nombre: 'Pricing Dinámico',
      descripcion: 'Ajuste automático de precios basado en demanda, competencia y comportamiento',
      caracteristicas: [
        'Algoritmos de machine learning',
        'Análisis de competencia en tiempo real',
        'Segmentación dinámica',
        'Optimización de ingresos',
        'Personalización de precios'
      ],
      tecnicas: [
        'Pricing basado en demanda',
        'Competitive pricing automation',
        'Personalized pricing por usuario',
        'Time-based pricing (horas pico)',
        'Geographic pricing optimization'
      ],
      metricas: {
        revenueIncrease: '+28%',
        conversionOptimization: '+15%',
        priceAccuracy: '92%',
        customerSatisfaction: '4.7/5'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'Demand-based', incremento: '+25%', precision: '89%' },
          { tactica: 'Competitive', incremento: '+18%', precision: '94%' },
          { tactica: 'Personalized', incremento: '+35%', precision: '91%' },
          { tactica: 'Time-based', incremento: '+22%', precision: '87%' }
        ],
        herramientas: ['Pricefx', 'Pros', 'Zilliant', 'Perfect Price']
      }
    },
    psychologicalPricing: {
      nombre: 'Pricing Psicológico',
      descripcion: 'Uso de técnicas psicológicas para influir en la percepción de valor',
      caracteristicas: [
        'Anchoring de precios',
        'Charm pricing ($99 vs $100)',
        'Decoy effect',
        'Bundle pricing estratégico',
        'Scarcity y urgency'
      ],
      tecnicas: [
        'Precios que terminan en 9',
        'Comparación de opciones (básico, premium, enterprise)',
        'Anchoring con precio alto',
        'Bundle pricing con descuento',
        'Limited time offers'
      ],
      metricas: {
        conversionBoost: '+22%',
        perceivedValue: '+18%',
        priceAcceptance: '78%',
        psychologicalImpact: 'High'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'Charm Pricing', conversion: '+18%', perception: '+15%' },
          { tactica: 'Decoy Effect', conversion: '+28%', perception: '+22%' },
          { tactica: 'Anchoring', conversion: '+12%', perception: '+25%' },
          { tactica: 'Bundle Pricing', conversion: '+35%', perception: '+30%' }
        ],
        herramientas: ['Pricefx', 'Optimizely', 'VWO', 'AB Tasty']
      }
    },
    subscriptionPricing: {
      nombre: 'Pricing de Suscripción',
      descripcion: 'Optimización de modelos de suscripción y freemium',
      caracteristicas: [
        'Freemium optimization',
        'Tiered subscription models',
        'Usage-based pricing',
        'Annual vs monthly pricing',
        'Churn reduction strategies'
      ],
      tecnicas: [
        'Freemium con límites estratégicos',
        'Tiers por funcionalidad (básico, pro, enterprise)',
        'Pricing por uso (por curso, por estudiante)',
        'Descuentos por pago anual',
        'Trial periods optimizados'
      ],
      metricas: {
        mrr: '$450K MXN',
        churnRate: '6.8%',
        ltv: '$2,400',
        upgradeRate: '28%'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'Freemium', conversion: '15%', retention: '65%' },
          { tactica: 'Tiered Pricing', upgrade: '28%', ltv: '+45%' },
          { tactica: 'Annual Discount', retention: '+25%', ltv: '+35%' },
          { tactica: 'Usage-based', conversion: '22%', satisfaction: '4.6/5' }
        ],
        herramientas: ['Chargebee', 'Stripe', 'Paddle', 'RevenueCat']
      }
    },
    valueBasedPricing: {
      nombre: 'Value-Based Pricing',
      descripcion: 'Pricing basado en el valor percibido y entregado al cliente',
      caracteristicas: [
        'Análisis de valor del cliente',
        'ROI-based pricing',
        'Outcome-based pricing',
        'Value communication',
        'Price justification'
      ],
      tecnicas: [
        'Pricing por resultados (mejoras en calificaciones)',
        'Value-based tiered pricing',
        'ROI calculators integrados',
        'Case studies de valor',
        'Value-based messaging'
      ],
      metricas: {
        priceAcceptance: '85%',
        valuePerception: '+35%',
        customerSatisfaction: '4.8/5',
        retentionRate: '89%'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'ROI-based', acceptance: '85%', satisfaction: '4.8/5' },
          { tactica: 'Outcome-based', acceptance: '78%', retention: '89%' },
          { tactica: 'Value Communication', perception: '+35%', conversion: '+25%' },
          { tactica: 'Price Justification', acceptance: '92%', trust: '+40%' }
        ],
        herramientas: ['ValueSelling', 'ROI Calculator', 'Case Study Builder', 'Value Proposition Canvas']
      }
    }
  }

  // Métricas de Pricing
  const metricasPricing = {
    conversion: {
      nombre: 'Métricas de Conversión',
      descripcion: 'Indicadores de cómo los precios afectan la conversión',
      metricas: [
        { metrica: 'Conversion Rate', valor: '4.8%', cambio: '+0.4%', tendencia: 'up' },
        { metrica: 'Cart Abandonment', valor: '68.2%', cambio: '-2.1%', tendencia: 'down' },
        { metrica: 'Price Sensitivity', valor: '0.75', cambio: '-0.05', tendencia: 'down' },
        { metrica: 'Price Acceptance', valor: '78%', cambio: '+5%', tendencia: 'up' }
      ]
    },
    revenue: {
      nombre: 'Métricas de Ingresos',
      descripcion: 'Indicadores de cómo los precios impactan los ingresos',
      metricas: [
        { metrica: 'ARPU', valor: '$165', cambio: '+12%', tendencia: 'upuesta' },
        { metrica: 'MRR', valor: '$450K', cambio: '+18%', tendencia: 'up' },
        { metrica: 'LTV', valor: '$2,400', cambio: '+22%', tendencia: 'up' },
        { metrica: 'Revenue Growth', valor: '+28%', cambio: '+5%', tendencia: 'up' }
      ]
    },
    customer: {
      nombre: 'Métricas de Cliente',
      descripcion: 'Indicadores de satisfacción y comportamiento del cliente',
      metricas: [
        { metrica: 'Customer Satisfaction', valor: '4.7/5', cambio: '+0.2', tendencia: 'up' },
        { metrica: 'NPS', valor: '68', cambio: '+5', tendencia: 'up' },
        { metrica: 'Churn Rate', valor: '6.8%', cambio: '-1.2%', tendencia: 'down' },
        { metrica: 'Retention Rate', valor: '89%', cambio: '+3%', tendencia: 'up' }
      ]
    }
  }

  // Herramientas de Pricing
  const herramientasPricing = {
    testing: {
      nombre: 'Testing y Experimentación',
      herramientas: ['Optimizely', 'VWO', 'Google Optimize', 'AB Tasty', 'Unbounce'],
      funcionalidades: [
        'A/B testing de precios',
        'Multivariate testing',
        'Statistical significance',
        'Segmentation testing',
        'Real-time monitoring'
      ],
      impacto: '+35% conversion'
    },
    analytics: {
      nombre: 'Analytics y BI',
      herramientas: ['Mixpanel', 'Amplitude', 'Google Analytics', 'Tableau', 'Power BI'],
      funcionalidades: [
        'Price elasticity analysis',
        'Revenue optimization',
        'Customer behavior tracking',
        'Competitive analysis',
        'Predictive modeling'
      ],
      impacto: '+40% insights'
    },
    automation: {
      nombre: 'Automatización de Precios',
      herramientas: ['Pricefx', 'Pros', 'Zilliant', 'Perfect Price', 'Dynamic Pricing'],
      funcionalidades: [
        'Dynamic pricing algorithms',
        'Competitive pricing automation',
        'Demand-based pricing',
        'Personalized pricing',
        'Real-time price optimization'
      ],
      impacto: '+50% efficiency'
    },
    communication: {
      nombre: 'Comunicación de Valor',
      herramientas: ['ValueSelling', 'ROI Calculator', 'Case Study Builder', 'Value Proposition Canvas'],
      funcionalidades: [
        'Value proposition development',
        'ROI calculators',
        'Case study creation',
        'Price justification tools',
        'Value communication training'
      ],
      impacto: '+45% acceptance'
    }
  }

  // Casos de estudio de implementación
  const casosImplementacion = {
    caso1: {
      titulo: 'A/B Testing de Precios - Optimización de Conversión',
      problema: 'Baja conversión (3.2%) y precios no optimizados',
      solucion: 'Implementación de A/B testing sistemático con múltiples puntos de precio',
      resultados: {
        conversionAnterior: '3.2%',
        conversionNueva: '4.8%',
        incremento: '+50%',
        revenue: '+28%'
      },
      implementacion: [
        'Testing de 3 puntos de precio ($99, $149, $199)',
        'Segmentación por tipo de usuario',
        'Análisis estadístico riguroso',
        'Monitoreo de métricas clave',
        'Implementación gradual de resultados'
      ]
    },
    caso2: {
      titulo: 'Pricing Dinámico - Aumento de Ingresos',
      problema: 'Precios estáticos que no responden a demanda y competencia',
      solucion: 'Sistema de pricing dinámico con algoritmos de machine learning',
      resultados: {
        revenueAnterior: '$350K',
        revenueNuevo: '$450K',
        incremento: '+28%',
        efficiency: '+35%'
      },
      implementacion: [
        'Algoritmos de machine learning para pricing',
        'Análisis de competencia en tiempo real',
        'Segmentación dinámica de usuarios',
        'Optimización automática de ingresos',
        'Personalización de precios por usuario'
      ]
    },
    caso3: {
      titulo: 'Value-Based Pricing - Mejora de Satisfacción',
      problema: 'Baja satisfacción del cliente (3.8/5) y percepción de valor',
      solucion: 'Migración a pricing basado en valor con comunicación mejorada',
      resultados: {
        satisfactionAnterior: '3.8/5',
        satisfactionNueva: '4.8/5',
        incremento: '+26%',
        retention: '+15%'
      },
      implementacion: [
        'Análisis de valor del cliente',
        'ROI calculators integrados',
        'Case studies de valor',
        'Value-based messaging',
        'Price justification tools'
      ]
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Experimentos Activos</h3>
            <Settings className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">12</div>
          <p className="text-sm text-white/70">Experimentos en curso</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+3 vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Optimización de Ingresos</h3>
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">+28%</div>
          <p className="text-sm text-white/70">Incremento en ingresos</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+5% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Satisfacción del Cliente</h3>
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">4.7/5</div>
          <p className="text-sm text-white/70">Puntuación promedio</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+0.2 vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Experimentos de Pricing */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          Experimentos de Pricing Implementados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(experimentosPricing).map(([key, experimento]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{experimento.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{experimento.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(experimento.metricas).map(([metrica, valor]) => (
                  <div key={metrica} className="flex justify-between">
                    <span className="text-xs text-white/70 capitalize">{metrica.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-xs font-semibold text-white">{valor}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de Pricing */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          Métricas de Pricing por Categoría
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(metricasPricing).map(([categoria, datos]) => (
            <div key={categoria} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{datos.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{datos.descripcion}</p>
              <div className="space-y-2">
                {datos.metricas.map((metrica, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs text-white/70">{metrica.metrica}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-white mr-2">{metrica.valor}</span>
                      <div className={`flex items-center ${metrica.tendencia === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {metrica.tendencia === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span className="text-xs ml-1">{metrica.cambio}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaExperimentos = () => (
    <div className="space-y-6">
      {/* Selector de experimentos */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {Object.entries(experimentosPricing).map(([key, experimento]) => (
          <button
            key={key}
            onClick={() => setExperimentoActivo(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              experimentoActivo === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">{experimento.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalles del experimento activo */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{experimentosPricing[experimentoActivo].nombre}</h2>
            <p className="text-white/70">{experimentosPricing[experimentoActivo].descripcion}</p>
          </div>
        </div>

        {/* Características */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🎯 Características Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {experimentosPricing[experimentoActivo].caracteristicas.map((caracteristica, index) => (
              <div key={index} className="flex items-start">
                <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{caracteristica}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Técnicas */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🚀 Técnicas Implementadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {experimentosPricing[experimentoActivo].tecnicas.map((tecnica, index) => (
              <div key={index} className="flex items-start">
                <Zap className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{tecnica}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">📊 Métricas de Rendimiento</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(experimentosPricing[experimentoActivo].metricas).map(([metrica, valor]) => (
              <div key={metrica} className="bg-white/5 p-3 rounded-lg text-center">
                <p className="text-xs text-white/70 capitalize mb-1">{metrica.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-lg font-semibold text-white">{valor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementación en Kelumy */}
        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-semibold text-white mb-3">🏢 Implementación en Kelumy</h3>
          <div className="space-y-4">
            {experimentosPricing[experimentoActivo].implementacionKelumy.experimentos && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Experimentos Activos</h4>
                <div className="space-y-2">
                  {experimentosPricing[experimentoActivo].implementacionKelumy.experimentos.map((experimento, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{experimento.precio}</span>
                        <span className="font-bold text-green-400">{experimento.conversion}</span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">Revenue: {experimento.revenue} | Satisfaction: {experimento.satisfaction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {experimentosPricing[experimentoActivo].implementacionKelumy.herramientas && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Herramientas Utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  {experimentosPricing[experimentoActivo].implementacionKelumy.herramientas.map((herramienta, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderVistaHerramientas = () => (
    <div className="space-y-6">
      {/* Herramientas de pricing */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          Herramientas de Pricing Experiments
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasPricing).map(([categoria, datos]) => (
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
          Casos de Implementación de Pricing Experiments
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
              <h1 className="text-3xl font-bold text-white mb-2">Pricing Experiments</h1>
              <p className="text-white/70">Experimentos de precios y optimización para e-commerce educativo</p>
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
            onClick={() => setVistaActiva('experimentos')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'experimentos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Experimentos</span>
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
      {vistaActiva === 'experimentos' && renderVistaExperimentos()}
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
            <h4 className="font-semibold text-white mb-2">A/B Testing</h4>
            <p className="text-sm text-white/70">Pruebas A/B. Comparación de dos versiones de una página o elemento para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Dynamic Pricing</h4>
            <p className="text-sm text-white/70">Precios dinámicos. Estrategia que ajusta precios automáticamente según demanda, competencia y otros factores.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Psychological Pricing</h4>
            <p className="text-sm text-white/70">Precios psicológicos. Técnicas que usan la psicología para influir en la percepción del precio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Value-Based Pricing</h4>
            <p className="text-sm text-white/70">Precios basados en valor. Estrategia que fija precios según el valor percibido por el cliente, no en costos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Elasticity</h4>
            <p className="text-sm text-white/70">Elasticidad del precio. Sensibilidad de la demanda a los cambios en el precio de un producto.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Charm Pricing</h4>
            <p className="text-sm text-white/70">Precios encantadores. Técnica que usa precios que terminan en 9 para aumentar la percepción de valor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Decoy Effect</h4>
            <p className="text-sm text-white/70">Efecto señuelo. Técnica que presenta una opción menos atractiva para hacer que otra opción parezca mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Anchoring</h4>
            <p className="text-sm text-white/70">Anclaje de precios. Técnica psicológica que usa un precio de referencia para influir en la percepción de valor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Bundle Pricing</h4>
            <p className="text-sm text-white/70">Precios en paquetes. Estrategia que agrupa productos o servicios con descuento para aumentar ventas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Freemium Model</h4>
            <p className="text-sm text-white/70">Modelo freemium. Estrategia que ofrece servicios básicos gratuitos con opciones premium de pago.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Tiered Pricing</h4>
            <p className="text-sm text-white/70">Precios por niveles. Estructura de precios con diferentes niveles de servicio y características.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Usage-Based Pricing</h4>
            <p className="text-sm text-white/70">Precios basados en uso. Modelo de precios que cobra según el uso real del servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROI (Return on Investment)</h4>
            <p className="text-sm text-white/70">Retorno de inversión. Beneficio obtenido en relación al dinero invertido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Statistical Significance</h4>
            <p className="text-sm text-white/70">Significancia estadística. Probabilidad de que un resultado no sea debido al azar.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Sensitivity</h4>
            <p className="text-sm text-white/70">Sensibilidad al precio. Grado en que la demanda cambia cuando cambia el precio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Acceptance</h4>
            <p className="text-sm text-white/70">Aceptación del precio. Grado en que los clientes aceptan un precio específico.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Competitive Pricing</h4>
            <p className="text-sm text-white/70">Precios competitivos. Estrategia que fija precios basándose en los precios de la competencia.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Penetration Pricing</h4>
            <p className="text-sm text-white/70">Precios de penetración. Estrategia de lanzamiento con precios bajos para ganar participación de mercado.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Skimming</h4>
            <p className="text-sm text-white/70">Descremado de precios. Estrategia de lanzamiento con precios altos que se reducen gradualmente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Optimization</h4>
            <p className="text-sm text-white/70">Optimización de precios. Proceso de encontrar el precio óptimo que maximiza ingresos o beneficios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Testing</h4>
            <p className="text-sm text-white/70">Pruebas de precios. Proceso de probar diferentes precios para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Communication</h4>
            <p className="text-sm text-white/70">Comunicación de precios. Proceso de comunicar el valor y justificación de los precios a los clientes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Justification</h4>
            <p className="text-sm text-white/70">Justificación de precios. Proceso de explicar por qué un precio específico es apropiado y justo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Perception</h4>
            <p className="text-sm text-white/70">Percepción del precio. Cómo los clientes perciben y evalúan un precio específico.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Strategy</h4>
            <p className="text-sm text-white/70">Estrategia de precios. Plan integral para establecer y ajustar precios de productos o servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Analysis</h4>
            <p className="text-sm text-white/70">Análisis de precios. Proceso de evaluar y analizar precios para tomar decisiones informadas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Monitoring</h4>
            <p className="text-sm text-white/70">Monitoreo de precios. Proceso de supervisar y rastrear precios de productos o servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Forecasting</h4>
            <p className="text-sm text-white/70">Pronóstico de precios. Proceso de predecir futuros cambios en precios basándose en datos históricos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Modeling</h4>
            <p className="text-sm text-white/70">Modelado de precios. Proceso de crear modelos matemáticos para predecir y optimizar precios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Intelligence</h4>
            <p className="text-sm text-white/70">Inteligencia de precios. Proceso de recopilar y analizar información sobre precios de la competencia.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Automation</h4>
            <p className="text-sm text-white/70">Automatización de precios. Proceso de usar tecnología para ajustar precios automáticamente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Personalization</h4>
            <p className="text-sm text-white/70">Personalización de precios. Proceso de ajustar precios según las características individuales del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Segmentation</h4>
            <p className="text-sm text-white/70">Segmentación de precios. Proceso de establecer diferentes precios para diferentes segmentos de clientes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Discrimination</h4>
            <p className="text-sm text-white/70">Discriminación de precios. Práctica de cobrar diferentes precios a diferentes clientes por el mismo producto.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Transparency</h4>
            <p className="text-sm text-white/70">Transparencia de precios. Grado en que los precios son claros y comprensibles para los clientes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Fairness</h4>
            <p className="text-sm text-white/70">Justicia de precios. Grado en que los clientes perciben que los precios son justos y razonables.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingExperiments
