// ========================================
// MÓDULO 8: GROWTH HACKS - KELUMY
// ========================================
// Previsualización de estrategias de crecimiento y viralización
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Settings,
  BarChart3,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Rocket,
  Sparkles,
  CheckCircle as Check,
  BookOpen,
  Lightbulb
} from 'lucide-react'

const GrowthHacks = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [estrategiaActiva, setEstrategiaActiva] = useState('viral')
  const [analisisActivo, setAnalisisActivo] = useState('conversion')

  // Estrategias de Growth Hacking
  const estrategiasGrowth = {
    viral: {
      nombre: 'Marketing Viral',
      descripcion: 'Estrategias para generar crecimiento exponencial a través de compartir orgánico',
      caracteristicas: [
        'Contenido altamente compartible',
        'Mecánicas de recompensa por compartir',
        'Loop de viralización integrado',
        'Gamificación de la experiencia',
        'Incentivos para referidos'
      ],
      tecnicas: [
        'Programa de referidos con recompensas',
        'Contenido viral en redes sociales',
        'Challenges y competencias educativas',
        'User Generated Content (UGC)',
        'Influencer partnerships estratégicos'
      ],
      metricas: {
        coeficienteViral: '0.65',
        tiempoViral: '3.2 días',
        alcanceOrganico: '45K/mes',
        conversionViral: '12%'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'Referido + Descuento', conversion: '18%', viralidad: '0.8' },
          { tactica: 'Challenge STEM', conversion: '15%', viralidad: '1.2' },
          { tactica: 'UGC Campaign', conversion: '22%', viralidad: '0.9' },
          { tactica: 'Influencer Collab', conversion: '25%', viralidad: '1.5' }
        ],
        herramientas: ['ReferralCandy', 'Viral Loops', 'Gleam', 'Rafflecopter']
      }
    },
    retention: {
      nombre: 'Retención y Engagement',
      descripcion: 'Estrategias para mantener usuarios activos y reducir churn',
      caracteristicas: [
        'Onboarding optimizado',
        'Gamificación del aprendizaje',
        'Notificaciones inteligentes',
        'Contenido personalizado',
        'Comunidad activa'
      ],
      tecnicas: [
        'Streaks y logros educativos',
        'Sistema de puntos y badges',
        'Desafíos semanales STEM',
        'Mentoring entre estudiantes',
        'Eventos virtuales exclusivos'
      ],
      metricas: {
        retentionDia1: '78%',
        retentionSemana1: '65%',
        retentionMes1: '52%',
        engagementScore: '8.4/10'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'Daily Streaks', retention: '+25%', engagement: '+40%' },
          { tactica: 'Weekly Challenges', retention: '+18%', engagement: '+35%' },
          { tactica: 'Peer Mentoring', retention: '+32%', engagement: '+28%' },
          { tactica: 'Virtual Events', retention: '+15%', engagement: '+45%' }
        ],
        herramientas: ['Intercom', 'Mixpanel', 'Amplitude', 'Segment']
      }
    },
    acquisition: {
      nombre: 'Adquisición de Usuarios',
      descripcion: 'Estrategias para atraer nuevos usuarios de manera eficiente',
      caracteristicas: [
        'Landing pages optimizadas',
        'SEO técnico avanzado',
        'Content marketing estratégico',
        'Partnerships educativos',
        'Paid acquisition optimizado'
      ],
      tecnicas: [
        'SEO para keywords STEM',
        'Content clusters educativos',
        'Partnerships con instituciones',
        'Google Ads con remarketing',
        'Facebook Ads con lookalike audiences'
      ],
      metricas: {
        cac: '$85 MXN',
        ltv: '$2,400 MXN',
        ltvCac: '28:1',
        conversionRate: '4.2%'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'SEO STEM', cac: '$45', conversion: '8%' },
          { tactica: 'Content Marketing', cac: '$65', conversion: '12%' },
          { tactica: 'Institutional Partnerships', cac: '$25', conversion: '35%' },
          { tactica: 'Paid Ads Optimized', cac: '$120', conversion: '6%' }
        ],
        herramientas: ['SEMrush', 'Ahrefs', 'Google Ads', 'Facebook Ads Manager']
      }
    },
    monetization: {
      nombre: 'Monetización Inteligente',
      descripcion: 'Estrategias para maximizar ingresos sin afectar la experiencia',
      caracteristicas: [
        'Pricing dinámico basado en valor',
        'Upselling contextual',
        'Cross-selling educativo',
        'Freemium optimizado',
        'Revenue sharing con instructores'
      ],
      tecnicas: [
        'Tiered pricing por nivel',
        'Bundle de cursos STEM',
        'Certificaciones premium',
        'Coaching 1-on-1',
        'Workshops especializados'
      ],
      metricas: {
        arpu: '$180/mes',
        mrr: '$450K MXN',
        churn: '6.8%',
        expansionRevenue: '35%'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'Tiered Pricing', arpu: '+45%', retention: '+20%' },
          { tactica: 'Course Bundles', arpu: '+60%', satisfaction: '+25%' },
          { tactica: 'Premium Certifications', arpu: '+80%', completion: '+40%' },
          { tactica: '1-on-1 Coaching', arpu: '+120%', nps: '+35%' }
        ],
        herramientas: ['Stripe', 'Paddle', 'Chargebee', 'RevenueCat']
      }
    },
    product: {
      nombre: 'Product-Led Growth',
      descripcion: 'Crecimiento impulsado por el valor del producto mismo',
      caracteristicas: [
        'Producto como canal de marketing',
        'Freemium estratégico',
        'Feature adoption automática',
        'In-product sharing',
        'Data-driven product decisions'
      ],
      tecnicas: [
        'Free trial de 14 días',
        'Progressive disclosure de features',
        'In-app tutorials interactivos',
        'Success metrics tracking',
        'Automated onboarding flows'
      ],
      metricas: {
        trialToPaid: '28%',
        featureAdoption: '65%',
        timeToValue: '2.5 días',
        productNps: '72'
      },
      implementacionKelumy: {
        tacticas: [
          { tactica: 'Free Trial', conversion: '28%', satisfaction: '4.6/5' },
          { tactica: 'Progressive Features', adoption: '+40%', retention: '+25%' },
          { tactica: 'Interactive Tutorials', completion: '+55%', satisfaction: '+30%' },
          { tactica: 'Success Tracking', engagement: '+35%', ltv: '+45%' }
        ],
        herramientas: ['Mixpanel', 'Amplitude', 'Hotjar', 'FullStory']
      }
    }
  }

  // Tácticas específicas de Growth Hacking
  const tacticasGrowth = {
    gamification: {
      nombre: 'Gamificación del Aprendizaje',
      descripcion: 'Uso de elementos de juego para aumentar engagement y retención',
      elementos: [
        'Sistema de puntos y badges',
        'Leaderboards por materia',
        'Streaks de estudio diario',
        'Desafíos semanales STEM',
        'Logros desbloqueables'
      ],
      impacto: {
        engagement: '+65%',
        retention: '+45%',
        completion: '+38%',
        satisfaction: '+52%'
      },
      implementacion: [
        'Integración con LMS existente',
        'API de gamificación personalizada',
        'Dashboard de progreso visual',
        'Notificaciones de logros',
        'Sistema de recompensas'
      ]
    },
    socialProof: {
      nombre: 'Social Proof y Testimonios',
      descripcion: 'Uso de evidencia social para aumentar conversiones',
      elementos: [
        'Testimonios de estudiantes exitosos',
        'Casos de estudio de instituciones',
        'Reviews y ratings visibles',
        'Contadores de estudiantes activos',
        'Logos de instituciones partners'
      ],
      impacto: {
        conversion: '+35%',
        trust: '+48%',
        signup: '+28%',
        retention: '+22%'
      },
      implementacion: [
        'Video testimonials auténticos',
        'Case studies detallados',
        'Trust badges y certificaciones',
        'Social media integration',
        'Review collection automation'
      ]
    },
    urgency: {
      nombre: 'Urgencia y Escasez',
      descripcion: 'Creación de urgencia para acelerar decisiones de compra',
      elementos: [
        'Ofertas por tiempo limitado',
        'Cupos limitados por clase',
        'Early bird pricing',
        'Countdown timers',
        'Stock indicators'
      ],
      impacto: {
        conversion: '+42%',
        urgency: '+38%',
        sales: '+55%',
        engagement: '+25%'
      },
      implementacion: [
        'Dynamic pricing automation',
        'Real-time inventory tracking',
        'Email campaigns con urgencia',
        'Push notifications estratégicas',
        'Landing pages con countdown'
      ]
    },
    personalization: {
      nombre: 'Personalización Avanzada',
      descripcion: 'Experiencia personalizada basada en comportamiento y preferencias',
      elementos: [
        'Recomendaciones de cursos',
        'Contenido adaptativo',
        'Rutas de aprendizaje personalizadas',
        'Notificaciones contextuales',
        'Interface personalizable'
      ],
      impacto: {
        engagement: '+58%',
        completion: '+45%',
        satisfaction: '+62%',
        ltv: '+38%'
      },
      implementacion: [
        'ML algorithms para recomendaciones',
        'Behavioral tracking avanzado',
        'A/B testing de personalización',
        'Dynamic content delivery',
        'User preference learning'
      ]
    }
  }

  // Herramientas de Growth Hacking
  const herramientasGrowth = {
    analytics: {
      nombre: 'Analytics y Tracking',
      herramientas: ['Mixpanel', 'Amplitude', 'Google Analytics 4', 'Hotjar', 'FullStory'],
      funcionalidades: [
        'Event tracking avanzado',
        'Funnel analysis',
        'Cohort analysis',
        'User behavior tracking',
        'Real-time dashboards'
      ],
      impacto: '+45% insights'
    },
    experimentation: {
      nombre: 'Testing y Experimentación',
      herramientas: ['Optimizely', 'VWO', 'Google Optimize', 'AB Tasty', 'Unbounce'],
      funcionalidades: [
        'A/B testing avanzado',
        'Multivariate testing',
        'Personalization sound testing',
        'Landing page optimization',
        'Statistical significance'
      ],
      impacto: '+35% conversion'
    },
    automation: {
      nombre: 'Marketing Automation',
      herramientas: ['HubSpot', 'ActiveCampaign', 'Marketo', 'Pardot', 'ConvertKit'],
      funcionalidades: [
        'Behavioral triggers',
        'Email sequences',
        'Lead scoring',
        'Workflow automation',
        'Personalization'
      ],
      impacto: '+50% efficiency'
    },
    referral: {
      nombre: 'Referral y Viral',
      herramientas: ['ReferralCandy', 'Viral Loops', 'Gleam', 'Extole', 'Friendbuy'],
      funcionalidades: [
        'Referral program management',
        'Viral loop optimization',
        'Reward tracking',
        'Social sharing',
        'Gamification'
      ],
      impacto: '+60% viral growth'
    }
  }

  // Casos de estudio de implementación
  const casosImplementacion = {
    caso1: {
      titulo: 'Programa de Referidos Viral - Crecimiento Exponencial',
      problema: 'Alto costo de adquisición ($150 CAC) y crecimiento lento',
      solucion: 'Programa de referidos con incentivos atractivos y gamificación',
      resultados: {
        cacAnterior: '$150',
        cacNuevo: '$45',
        reduccion: '-70%',
        growthRate: '+180%'
      },
      implementacion: [
        'Sistema de referidos con recompensas dobles',
        'Gamificación del proceso de referido',
        'Tracking automático de referidos',
        'Campañas de email para referidos',
        'Dashboard de progreso de referidos'
      ]
    },
    caso2: {
      titulo: 'Gamificación del Aprendizaje - Aumento de Engagement',
      problema: 'Baja retención (45%) y engagement (3.2/10)',
      solucion: 'Sistema de gamificación completo con puntos, badges y challenges',
      resultados: {
        retentionAnterior: '45%',
        retentionNueva: '78%',
        incremento: '+73%',
        engagement: '+65%'
      },
      implementacion: [
        'Sistema de puntos por actividades completadas',
        'Badges desbloqueables por logros',
        'Leaderboards por materia y nivel',
        'Desafíos semanales STEM',
        'Recompensas por streaks de estudio'
      ]
    },
    caso3: {
      titulo: 'Personalización Avanzada - Optimización de LTV',
      problema: 'Bajo LTV ($800) y alta tasa de churn (25%)',
      solucion: 'Sistema de personalización basado en ML y comportamiento',
      resultados: {
        ltvAnterior: '$800',
        ltvNuevo: '$2,400',
        incremento: '+200%',
        churn: '-68%'
      },
      implementacion: [
        'Algoritmos de recomendación personalizada',
        'Rutas de aprendizaje adaptativas',
        'Contenido dinámico según perfil',
        'Notificaciones contextuales',
        'Interface personalizable'
      ]
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Crecimiento Mensual</h3>
            <Rocket className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">+180%</div>
          <p className="text-sm text-white/70">Tasa de crecimiento</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+45% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Coeficiente Viral</h3>
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">0.65</div>
          <p className="text-sm text-white/70">Factor de viralización</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+0.15 vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">CAC Optimizado</h3>
            <DollarSign className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">$45</div>
          <p className="text-sm text-white/70">Costo de adquisición</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-70% vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Estrategias de Growth Hacking */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          Estrategias de Growth Hacking Implementadas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(estrategiasGrowth).map(([key, estrategia]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{estrategia.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{estrategia.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(estrategia.metricas).map(([metrica, valor]) => (
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

      {/* Tácticas específicas */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <Target className="w-5 h-5 text-green-400" />
          </div>
          Tácticas Específicas de Growth Hacking
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(tacticasGrowth).map(([key, tactica]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{tactica.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{tactica.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(tactica.impacto).map(([metrica, valor]) => (
                  <div key={metrica} className="flex justify-between">
                    <span className="text-xs text-white/70 capitalize">{metrica.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-xs font-semibold text-green-400">{valor}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaEstrategias = () => (
    <div className="space-y-6">
      {/* Selector de estrategias */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {Object.entries(estrategiasGrowth).map(([key, estrategia]) => (
          <button
            key={key}
            onClick={() => setEstrategiaActiva(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              estrategiaActiva === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm">{estrategia.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalles de la estrategia activa */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{estrategiasGrowth[estrategiaActiva].nombre}</h2>
            <p className="text-white/70">{estrategiasGrowth[estrategiaActiva].descripcion}</p>
          </div>
        </div>

        {/* Características */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🎯 Características Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {estrategiasGrowth[estrategiaActiva].caracteristicas.map((caracteristica, index) => (
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
            {estrategiasGrowth[estrategiaActiva].tecnicas.map((tecnica, index) => (
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
            {Object.entries(estrategiasGrowth[estrategiaActiva].metricas).map(([metrica, valor]) => (
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
            {estrategiasGrowth[estrategiaActiva].implementacionKelumy.tacticas && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Tácticas Activas</h4>
                <div className="space-y-2">
                  {estrategiasGrowth[estrategiaActiva].implementacionKelumy.tacticas.map((tactica, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{tactica.tactica}</span>
                        <span className="font-bold text-green-400">{tactica.conversion}</span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">Viralidad: {tactica.viralidad}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {estrategiasGrowth[estrategiaActiva].implementacionKelumy.herramientas && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Herramientas Utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  {estrategiasGrowth[estrategiaActiva].implementacionKelumy.herramientas.map((herramienta, index) => (
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
      {/* Herramientas de growth hacking */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          Herramientas de Growth Hacking
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasGrowth).map(([categoria, datos]) => (
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
          Casos de Implementación de Growth Hacks
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
              <h1 className="text-3xl font-bold text-white mb-2">Growth Hacks</h1>
              <p className="text-white/70">Estrategias de crecimiento y viralización para e-commerce educativo</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <Rocket className="w-4 h-4" />
              <span>Implementar</span>
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
            onClick={() => setVistaActiva('estrategias')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'estrategias'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm">Estrategias</span>
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
      {vistaActiva === 'estrategias' && renderVistaEstrategias()}
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
            <h4 className="font-semibold text-white mb-2">Growth Hacking</h4>
            <p className="text-sm text-white/70">Estrategias de marketing y desarrollo de productos enfocadas en el crecimiento rápido y sostenible.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Viral Coefficient</h4>
            <p className="text-sm text-white/70">Coeficiente viral. Número promedio de nuevos usuarios que cada usuario existente trae a la plataforma.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Product-Led Growth</h4>
            <p className="text-sm text-white/70">Crecimiento impulsado por el producto. Estrategia donde el producto mismo es el canal principal de marketing.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Gamification</h4>
            <p className="text-sm text-white/70">Gamificación. Uso de elementos de juego para aumentar engagement y motivación de usuarios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Social Proof</h4>
            <p className="text-sm text-white/70">Prueba social. Evidencia social que influye en la decisión de compra del usuario.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Viral Loop</h4>
            <p className="text-sm text-white/70">Loop viral. Proceso automático donde los usuarios invitan a otros usuarios de manera orgánica.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Referral Program</h4>
            <p className="text-sm text-white/70">Programa de referidos. Sistema que recompensa a usuarios por traer nuevos clientes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">User Generated Content (UGC)</h4>
            <p className="text-sm text-white/70">Contenido generado por usuarios. Contenido creado por usuarios que promueve la marca orgánicamente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Freemium Model</h4>
            <p className="text-sm text-white/70">Modelo freemium. Estrategia que ofrece servicios básicos gratuitos con opciones premium de pago.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">A/B Testing</h4>
            <p className="text-sm text-white/70">Pruebas A/B. Comparación de dos versiones de una página o elemento para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Conversion Funnel</h4>
            <p className="text-sm text-white/70">Embudo de conversión. Proceso paso a paso que sigue un usuario desde el descubrimiento hasta la conversión.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Retention Rate</h4>
            <p className="text-sm text-white/70">Tasa de retención. Porcentaje de usuarios que permanecen activos en un período determinado.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Churn Rate</h4>
            <p className="text-sm text-white/70">Tasa de abandono. Porcentaje de usuarios que dejan de usar el servicio en un período.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">LTV (Lifetime Value)</h4>
            <p className="text-sm text-white/70">Valor de vida del cliente. Ingresos totales que genera un cliente durante toda su relación.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CAC (Customer Acquisition Cost)</h4>
            <p className="text-sm text-white/70">Costo de adquisición de cliente. Gasto promedio para conseguir un nuevo cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Engagement Score</h4>
            <p className="text-sm text-white/70">Puntuación de engagement. Métrica que mide qué tan activo y comprometido está un usuario.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Onboarding</h4>
            <p className="text-sm text-white/70">Onboarding. Proceso de bienvenida y guía para nuevos usuarios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Personalization</h4>
            <p className="text-sm text-white/70">Personalización. Adaptación de la experiencia según las preferencias y comportamiento del usuario.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Urgency</h4>
            <p className="text-sm text-white/70">Urgencia. Técnica psicológica que crea sensación de escasez temporal para acelerar decisiones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Scarcity</h4>
            <p className="text-sm text-white/70">Escasez. Técnica psicológica que crea sensación de limitación para aumentar el valor percibido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Influencer Marketing</h4>
            <p className="text-sm text-white/70">Marketing de influencers. Estrategia que utiliza personas influyentes para promocionar productos o servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Content Marketing</h4>
            <p className="text-sm text-white/70">Marketing de contenidos. Estrategia basada en la creación de contenido valioso para atraer audiencia.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">SEO (Search Engine Optimization)</h4>
            <p className="text-sm text-white/70">Optimización para motores de búsqueda. Técnicas para mejorar la visibilidad en buscadores.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">SEM (Search Engine Marketing)</h4>
            <p className="text-sm text-white/70">Marketing en motores de búsqueda. Publicidad pagada en plataformas de búsqueda.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Social Media Marketing</h4>
            <p className="text-sm text-white/70">Marketing en redes sociales. Uso de plataformas sociales para promocionar productos o servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Email Marketing</h4>
            <p className="text-sm text-white/70">Marketing por email. Estrategia de marketing directo a través de correo electrónico.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Marketing Automation</h4>
            <p className="text-sm text-white/70">Automatización de marketing. Uso de software para automatizar tareas de marketing repetitivas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Analytics</h4>
            <p className="text-sm text-white/70">Analítica. Recopilación y análisis de datos de comportamiento del usuario.</p>
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
            <p className="text-sm text-white/70">Modelado de atribución. Proceso de asignar crédito a diferentes touchpoints en el customer journey.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROI (Return on Investment)</h4>
            <p className="text-sm text-white/70">Retorno de inversión. Beneficio obtenido en relación al dinero invertido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROAS (Return on Ad Spend)</h4>
            <p className="text-sm text-white/70">Retorno de inversión publicitaria. Métrica que mide la efectividad de la publicidad pagada.</p>
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
            <h4 className="font-semibold text-white mb-2">Conversion Rate</h4>
            <p className="text-sm text-white/70">Tasa de conversión. Porcentaje de visitantes que completan una acción deseada.</p>
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
            <h4 className="font-semibold text-white mb-2">Statistical Significance</h4>
            <p className="text-sm text-white/70">Significancia estadística. Probabilidad de que un resultado no sea debido al azar.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrowthHacks
