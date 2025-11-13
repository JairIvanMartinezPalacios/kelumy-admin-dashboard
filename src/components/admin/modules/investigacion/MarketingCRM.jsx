// ========================================
// MÓDULO 6: MARKETING Y CRM - KELUMY
// ========================================
// Previsualización de estrategias de marketing y gestión de relaciones con clientes
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
  Users,
  CheckCircle as Check,
  BookOpen,
  Lightbulb
} from 'lucide-react'

const MarketingCRM = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [canalActivo, setCanalActivo] = useState('email')
  const [analisisActivo, setAnalisisActivo] = useState('conversion')

  // Estrategias de marketing digital
  const estrategiasMarketing = {
    email: {
      nombre: 'Email Marketing',
      descripcion: 'Comunicación directa y personalizada con clientes potenciales y existentes',
      caracteristicas: [
        'Segmentación avanzada de audiencia',
        'Automatización de secuencias',
        'Personalización dinámica',
        'A/B testing de contenido',
        'Analytics detallados'
      ],
      metricas: {
        tasaApertura: '28.5%',
        tasaClic: '4.2%',
        tasaConversion: '3.8%',
        costoPorLead: '$15 MXN'
      },
      implementacionKelumy: {
        campanas: [
          { tipo: 'Bienvenida', frecuencia: 'Inmediata', conversion: '12%' },
          { tipo: 'Nurturing', frecuencia: 'Semanal', conversion: '8%' },
          { tipo: 'Reactivación', frecuencia: 'Mensual', conversion: '5%' },
          { tipo: 'Upselling', frecuencia: 'Trimestral', conversion: '15%' }
        ],
        herramientas: ['Mailchimp', 'ActiveCampaign', 'ConvertKit', 'HubSpot']
      }
    },
    social: {
      nombre: 'Social Media Marketing',
      descripcion: 'Presencia y engagement en redes sociales para generar awareness y leads',
      caracteristicas: [
        'Contenido educativo STEM',
        'Influencer partnerships',
        'Community building',
        'User generated content',
        'Social commerce'
      ],
      metricas: {
        engagement: '6.8%',
        alcance: '45K/mes',
        leadsGenerados: '180/mes',
        costoPorLead: '$25 MXN'
      },
      implementacionKelumy: {
        plataformas: [
          { plataforma: 'Instagram', seguidores: '25K', engagement: '8.2%' },
          { plataforma: 'TikTok', seguidores: '15K', engagement: '12.5%' },
          { plataforma: 'YouTube', seguidores: '8K', engagement: '4.8%' },
          { plataforma: 'LinkedIn', seguidores: '5K', engagement: '3.2%' }
        ],
        herramientas: ['Hootsuite', 'Buffer', 'Canva', 'Later']
      }
    },
    content: {
      nombre: 'Content Marketing',
      descripcion: 'Creación y distribución de contenido valioso para atraer y retener audiencia',
      caracteristicas: [
        'Blog educativo especializado',
        'E-books y guías descargables',
        'Webinars y masterclasses',
        'Podcasts educativos',
        'SEO optimization'
      ],
      metricas: {
        traficoOrganico: '12K/mes',
        tiempoEnPagina: '4.2 min',
        tasaConversion: '2.8%',
        autoridadDominio: '45'
      },
      implementacionKelumy: {
        contenido: [
          { tipo: 'Blog posts', frecuencia: '3/semana', trafico: '5K/mes' },
          { tipo: 'E-books', frecuencia: '1/mes', descargas: '200/mes' },
          { tipo: 'Webinars', frecuencia: '2/mes', asistentes: '150/mes' },
          { tipo: 'Videos', frecuencia: '2/semana', visualizaciones: '8K/mes' }
        ],
        herramientas: ['WordPress', 'SEMrush', 'Ahrefs', 'BuzzSumo']
      }
    },
    paid: {
      nombre: 'Paid Advertising',
      descripcion: 'Publicidad pagada en múltiples canales para generar tráfico y conversiones',
      caracteristicas: [
        'Google Ads con keywords STEM',
        'Facebook/Instagram Ads',
        'YouTube advertising',
        'LinkedIn sponsored content',
        'Retargeting campaigns'
      ],
      metricas: {
        ctr: '3.2%',
        cpc: '$2.50 MXN',
        conversion: '8.5%',
        roas: '4.2x'
      },
      implementacionKelumy: {
        canales: [
          { canal: 'Google Ads', presupuesto: '$15K/mes', conversion: '12%' },
          { canal: 'Facebook Ads', presupuesto: '$8K/mes', conversion: '8%' },
          { canal: 'YouTube Ads', presupuesto: '$5K/mes', conversion: '15%' },
          { canal: 'LinkedIn Ads', presupuesto: '$3K/mes', conversion: '18%' }
        ],
        herramientas: ['Google Ads', 'Facebook Ads Manager', 'LinkedIn Campaign Manager']
      }
    },
    seo: {
      nombre: 'SEO y SEM',
      descripcion: 'Optimización para motores de búsqueda y marketing en buscadores',
      caracteristicas: [
        'Keyword research STEM',
        'On-page optimization',
        'Technical SEO',
        'Link building',
        'Local SEO'
      ],
      metricas: {
        posicionPromedio: '8.2',
        traficoOrganico: '8K/mes',
        keywordsRanking: '150',
        autoridadDominio: '42'
      },
      implementacionKelumy: {
        estrategias: [
          { estrategia: 'Long-tail keywords', volumen: '500/mes', dificultad: 'Media' },
          { estrategia: 'Content clusters', articulos: '20/mes', enlaces: '45/mes' },
          { estrategia: 'Technical SEO', velocidad: '2.1s', mobile: '95%' },
          { estrategia: 'Local SEO', citas: '25/mes', reseñas: '12/mes' }
        ],
        herramientas: ['SEMrush', 'Ahrefs', 'Screaming Frog', 'Google Search Console']
      }
    }
  }

  // Sistema CRM y gestión de clientes
  const sistemaCRM = {
    leads: {
      nombre: 'Gestión de Leads',
      descripcion: 'Captura, calificación y seguimiento de prospectos',
      funcionalidades: [
        'Lead scoring automático',
        'Captura multi-canal',
        'Calificación por comportamiento',
        'Asignación automática',
        'Seguimiento personalizado'
      ],
      metricas: {
        leadsGenerados: '450/mes',
        tasaCalificacion: '35%',
        tiempoRespuesta: '2.5 horas',
        conversionLead: '18%'
      },
      implementacionKelumy: {
        fuentes: [
          { fuente: 'Website forms', leads: '200/mes', conversion: '22%' },
          { fuente: 'Social media', leads: '120/mes', conversion: '15%' },
          { fuente: 'Email campaigns', leads: '80/mes', conversion: '25%' },
          { fuente: 'Referrals', leads: '50/mes', conversion: '35%' }
        ],
        herramientas: ['HubSpot', 'Salesforce', 'Pipedrive', 'Zoho CRM']
      }
    },
    clientes: {
      nombre: 'Gestión de Clientes',
      descripcion: 'Administración completa del ciclo de vida del cliente',
      funcionalidades: [
        'Perfiles 360° del cliente',
        'Historial de interacciones',
        'Segmentación automática',
        'Programas de fidelización',
        'Soporte integrado'
      ],
      metricas: {
        clientesActivos: '2,500',
        tasaRetencion: '85%',
        ltv: '$1,200 MXN',
        nps: '68'
      },
      implementacionKelumy: {
        segmentos: [
          { segmento: 'Estudiantes', cantidad: '1,800', ltv: '$800' },
          { segmento: 'Profesores', cantidad: '400', ltv: '$1,500' },
          { segmento: 'Instituciones', cantidad: '300', ltv: '$3,200' }
        ],
        herramientas: ['HubSpot', 'Intercom', 'Zendesk', 'Freshworks']
      }
    },
    ventas: {
      nombre: 'Pipeline de Ventas',
      descripcion: 'Gestión del proceso de ventas desde lead hasta cierre',
      funcionalidades: [
        'Pipeline visual',
        'Forecasting automático',
        'Automatización de seguimiento',
        'Reportes de ventas',
        'Integración con marketing'
      ],
      metricas: {
        oportunidades: '180/mes',
        tasaCierre: '25%',
        cicloVenta: '45 días',
        valorPromedio: '$850 MXN'
      },
      implementacionKelumy: {
        etapas: [
          { etapa: 'Lead', cantidad: '450', conversion: '100%' },
          { etapa: 'Qualified', cantidad: '180', conversion: '40%' },
          { etapa: 'Proposal', cantidad: '90', conversion: '50%' },
          { etapa: 'Negotiation', cantidad: '45', conversion: '60%' },
          { etapa: 'Closed Won', cantidad: '27', conversion: '60%' }
        ],
        herramientas: ['Salesforce', 'Pipedrive', 'Monday.com', 'Notion']
      }
    },
    marketing: {
      nombre: 'Marketing Automation',
      descripcion: 'Automatización de campañas y nurturing de leads',
      funcionalidades: [
        'Workflows automatizados',
        'Personalización dinámica',
        'Trigger-based campaigns',
        'Lead nurturing',
        'Cross-channel coordination'
      ],
      metricas: {
        campanasActivas: '25',
        emailsEnviados: '15K/mes',
        tasaApertura: '28%',
        conversionAutomatizada: '12%'
      },
      implementacionKelumy: {
        automatizaciones: [
          { tipo: 'Welcome series', leads: '450/mes', conversion: '15%' },
          { tipo: 'Nurturing', leads: '300/mes', conversion: '8%' },
          { tipo: 'Reactivation', leads: '150/mes', conversion: '5%' },
          { tipo: 'Upselling', leads: '200/mes', conversion: '18%' }
        ],
        herramientas: ['HubSpot', 'ActiveCampaign', 'Marketo', 'Pardot']
      }
    }
  }

  // Análisis de ROI por canal
  const analisisROI = {
    email: {
      inversion: 15000,
      ingresos: 45000,
      roi: 200,
      leads: 180,
      costoPorLead: 83
    },
    social: {
      inversion: 12000,
      ingresos: 36000,
      roi: 200,
      leads: 120,
      costoPorLead: 100
    },
    content: {
      inversion: 20000,
      ingresos: 80000,
      roi: 300,
      leads: 200,
      costoPorLead: 100
    },
    paid: {
      inversion: 30000,
      ingresos: 126000,
      roi: 320,
      leads: 300,
      costoPorLead: 100
    },
    seo: {
      inversion: 10000,
      ingresos: 50000,
      roi: 400,
      leads: 150,
      costoPorLead: 67
    }
  }

  // Herramientas y tecnologías
  const herramientasMarketing = {
    email: {
      nombre: 'Email Marketing',
      herramientas: ['Mailchimp', 'ActiveCampaign', 'ConvertKit', 'HubSpot', 'SendGrid'],
      funcionalidades: [
        'Automatización de secuencias',
        'Segmentación avanzada',
        'A/B testing',
        'Analytics detallados',
        'Integración CRM'
      ],
      impacto: '+35% engagement'
    },
    social: {
      nombre: 'Social Media Management',
      herramientas: ['Hootsuite', 'Buffer', 'Sprout Social', 'Later', 'Canva'],
      funcionalidades: [
        'Programación de contenido',
        'Análisis de engagement',
        'Gestión de múltiples cuentas',
        'Monitoreo de menciones',
        'Reportes automáticos'
      ],
      impacto: '+40% reach'
    },
    analytics: {
      nombre: 'Analytics y Tracking',
      herramientas: ['Google Analytics', 'Mixpanel', 'Hotjar', 'Amplitude', 'Segment'],
      funcionalidades: [
        'Tracking de conversiones',
        'Análisis de comportamiento',
        'Cohort analysis',
        'Funnel analysis',
        'Attribution modeling'
      ],
      impacto: '+25% optimización'
    },
    crm: {
      nombre: 'CRM y Sales',
      herramientas: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Monday.com'],
      funcionalidades: [
        'Gestión de leads',
        'Pipeline de ventas',
        'Automatización de marketing',
        'Reportes y dashboards',
        'Integración de herramientas'
      ],
      impacto: '+30% productividad'
    }
  }

  // Casos de estudio de implementación
  const casosImplementacion = {
    caso1: {
      titulo: 'Implementación de Marketing Automation - Aumento de Conversión',
      problema: 'Baja conversión de leads a clientes (8%)',
      solucion: 'Sistema de marketing automation con nurturing personalizado',
      resultados: {
        conversionAnterior: '8%',
        conversionNueva: '22%',
        incremento: '+175%',
        ltv: '+45%'
      },
      implementacion: [
        'Workflows de bienvenida automatizados',
        'Segmentación por comportamiento',
        'Contenido personalizado por perfil',
        'Trigger-based campaigns',
        'Analytics avanzados de conversión'
      ]
    },
    caso2: {
      titulo: 'Estrategia de Content Marketing - Crecimiento Orgánico',
      problema: 'Alto costo de adquisición en canales pagados ($150 CAC)',
      solucion: 'Content marketing especializado en STEM con SEO',
      resultados: {
        cacAnterior: '$150',
        cacNuevo: '$45',
        reduccion: '-70%',
        traficoOrganico: '+300%'
      },
      implementacion: [
        'Blog educativo con 20 artículos mensuales',
        'E-books especializados en STEM',
        'Webinar series educativas',
        'SEO optimization completa',
        'Link building estratégico'
      ]
    },
    caso3: {
      titulo: 'CRM Integration - Optimización de Ventas',
      problema: 'Falta de visibilidad en el pipeline de ventas',
      solucion: 'Implementación de CRM completo con automatización',
      resultados: {
        visibilidadAnterior: '40%',
        visibilidadNueva: '95%',
        incremento: '+137%',
        conversion: '+28%'
      },
      implementacion: [
        'CRM unificado con todas las fuentes',
        'Lead scoring automático',
        'Pipeline visual y forecasting',
        'Automatización de seguimiento',
        'Reportes en tiempo real'
      ]
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Leads Generados</h3>
            <Users className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">950</div>
          <p className="text-sm text-white/70">Leads mensuales</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+25% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">ROI Marketing</h3>
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">280%</div>
          <p className="text-sm text-white/70">Retorno de inversión</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+15% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Costo por Lead</h3>
            <Target className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">$78</div>
          <p className="text-sm text-white/70">Costo promedio</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-20% vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Estrategias de marketing */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          Estrategias de Marketing Digital
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(estrategiasMarketing).map(([key, estrategia]) => (
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

      {/* Sistema CRM */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          Sistema CRM y Gestión de Clientes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(sistemaCRM).map(([key, modulo]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{modulo.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{modulo.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(modulo.metricas).map(([metrica, valor]) => (
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
    </div>
  )

  const renderVistaCanales = () => (
    <div className="space-y-6">
      {/* Selector de canales */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {Object.entries(estrategiasMarketing).map(([key, estrategia]) => (
          <button
            key={key}
            onClick={() => setCanalActivo(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              canalActivo === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-sm">{estrategia.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalles del canal activo */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{estrategiasMarketing[canalActivo].nombre}</h2>
            <p className="text-white/70">{estrategiasMarketing[canalActivo].descripcion}</p>
          </div>
        </div>

        {/* Características */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🎯 Características Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {estrategiasMarketing[canalActivo].caracteristicas.map((caracteristica, index) => (
              <div key={index} className="flex items-start">
                <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{caracteristica}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">📊 Métricas de Rendimiento</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(estrategiasMarketing[canalActivo].metricas).map(([metrica, valor]) => (
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
            {estrategiasMarketing[canalActivo].implementacionKelumy.campanas && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Campañas Activas</h4>
                <div className="space-y-2">
                  {estrategiasMarketing[canalActivo].implementacionKelumy.campanas.map((campana, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{campana.tipo}</span>
                        <span className="font-bold text-green-400">{campana.conversion}</span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">Frecuencia: {campana.frecuencia}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {estrategiasMarketing[canalActivo].implementacionKelumy.herramientas && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Herramientas Utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  {estrategiasMarketing[canalActivo].implementacionKelumy.herramientas.map((herramienta, index) => (
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
      {/* Herramientas de marketing */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          Herramientas y Tecnologías de Marketing
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasMarketing).map(([categoria, datos]) => (
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
          Casos de Implementación de Marketing y CRM
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
              <h1 className="text-3xl font-bold text-white mb-2">Marketing y CRM</h1>
              <p className="text-white/70">Estrategias de marketing digital y gestión de relaciones con clientes</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <Settings className="w-4 h-4" />
              <span>Optimizar</span>
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
            onClick={() => setVistaActiva('canales')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'canales'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-sm">Canales</span>
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
      {vistaActiva === 'canales' && renderVistaCanales()}
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
            <h4 className="font-semibold text-white mb-2">CRM (Customer Relationship Management)</h4>
            <p className="text-sm text-white/70">Gestión de relaciones con clientes. Sistema para administrar interacciones y datos de clientes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Lead Scoring</h4>
            <p className="text-sm text-white/70">Puntuación de leads. Sistema que evalúa la probabilidad de conversión de un prospecto.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Marketing Automation</h4>
            <p className="text-sm text-white/70">Automatización de marketing. Uso de software para automatizar tareas de marketing repetitivas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Email Marketing</h4>
            <p className="text-sm text-white/70">Marketing por email. Estrategia de marketing directo a través de correo electrónico.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Content Marketing</h4>
            <p className="text-sm text-white/70">Marketing de contenidos. Estrategia de marketing basada en la creación de contenido valioso.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Social Media Marketing</h4>
            <p className="text-sm text-white/70">Marketing en redes sociales. Uso de plataformas sociales para promocionar productos o servicios.</p>
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
            <h4 className="font-semibold text-white mb-2">ROAS (Return on Ad Spend)</h4>
            <p className="text-sm text-white/70">Retorno de inversión publicitaria. Métrica que mide la efectividad de la publicidad pagada.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CTR (Click-Through Rate)</h4>
            <p className="text-sm text-white/70">Tasa de clics. Porcentaje de personas que hacen clic en un enlace respecto al total que lo ve.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CPC (Cost Per Click)</h4>
            <p className="text-sm text-white/70">Costo por clic. Cantidad de dinero que se paga por cada clic en un anuncio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CPM (Cost Per Mille)</h4>
            <p className="text-sm text-white/70">Costo por mil impresiones. Precio que se paga por cada mil visualizaciones de un anuncio.</p>
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
            <h4 className="font-semibold text-white mb-2">NPS (Net Promoter Score)</h4>
            <p className="text-sm text-white/70">Puntuación de promotores netos. Métrica que mide la satisfacción y lealtad del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Attribution Modeling</h4>
            <p className="text-sm text-white/70">Modelado de atribución. Proceso de asignar crédito a diferentes touchpoints en el customer journey.</p>
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
            <h4 className="font-semibold text-white mb-2">A/B Testing</h4>
            <p className="text-sm text-white/70">Pruebas A/B. Comparación de dos versiones de una página o elemento para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Segmentation</h4>
            <p className="text-sm text-white/70">Segmentación. División de audiencia en grupos con características similares.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Personalization</h4>
            <p className="text-sm text-white/70">Personalización. Adaptación de contenido y experiencias según las características del usuario.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Lead Nurturing</h4>
            <p className="text-sm text-white/70">Nutrición de leads. Proceso de cultivar relaciones con prospectos a través de contenido relevante.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Workflow Automation</h4>
            <p className="text-sm text-white/70">Automatización de flujos de trabajo. Configuración de procesos automáticos basados en triggers.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Trigger-based Campaigns</h4>
            <p className="text-sm text-white/70">Campañas basadas en triggers. Automatización que se activa por acciones específicas del usuario.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Cross-channel Marketing</h4>
            <p className="text-sm text-white/70">Marketing multicanal. Coordinación de mensajes a través de múltiples canales de comunicación.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Marketing Attribution</h4>
            <p className="text-sm text-white/70">Atribución de marketing. Proceso de determinar qué canales contribuyen a las conversiones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Customer Journey</h4>
            <p className="text-sm text-white/70">Viaje del cliente. Proceso completo que sigue un usuario desde el descubrimiento hasta la compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Touchpoint</h4>
            <p className="text-sm text-white/70">Punto de contacto. Cualquier interacción entre el cliente y la marca.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketingCRM
