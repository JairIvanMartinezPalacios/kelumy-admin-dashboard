// ========================================
// MÓDULO 5: MÉTODOS DE VENTA - KELUMY
// ========================================
// Previsualización de estrategias y técnicas de venta optimizadas
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
  Lightbulb,
  Zap,
  Star
} from 'lucide-react'

const MetodosVenta = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [metodoActivo, setMetodoActivo] = useState('directa')
  const [analisisActivo, setAnalisisActivo] = useState('conversion')

  // Métodos de venta principales
  const metodosVenta = {
    directa: {
      nombre: 'Venta Directa',
      descripcion: 'Interacción directa con el cliente para cerrar la venta',
      caracteristicas: [
        'Contacto personal con el cliente',
        'Presentación directa del producto',
        'Negociación en tiempo real',
        'Cierre inmediato de la venta',
        'Seguimiento personalizado'
      ],
      tecnicas: [
        'SPIN Selling (Situación, Problema, Implicación, Necesidad)',
        'Consultative Selling (Venta consultiva)',
        'Solution Selling (Venta de soluciones)',
        'Challenger Sale (Venta desafiante)',
        'Sandler Selling System'
      ],
      metricas: {
        tasaConversion: '25-35%',
        tiempoPromedio: '45 minutos',
        costoAdquisicion: '$120 MXN',
        satisfaccionCliente: '4.7/5'
      },
      implementacionKelumy: {
        canales: [
          { canal: 'Llamadas telefónicas', conversion: '28%', tiempo: '30 min' },
          { canal: 'Videollamadas', conversion: '32%', tiempo: '45 min' },
          { canal: 'Chat en vivo', conversion: '18%', tiempo: '15 min' },
          { canal: 'Email personalizado', conversion: '12%', tiempo: '5 min' }
        ],
        herramientas: [
          'CRM con historial de interacciones',
          'Calendario de seguimiento automático',
          'Plantillas de presentación personalizadas',
          'Sistema de scoring de leads'
        ]
      }
    },
    consultiva: {
      nombre: 'Venta Consultiva',
      descripcion: 'Enfoque en entender y resolver las necesidades del cliente',
      caracteristicas: [
        'Análisis profundo de necesidades',
        'Propuesta de valor personalizada',
        'Relación a largo plazo',
        'Enfoque en resultados del cliente',
        'Consultoría especializada'
      ],
      tecnicas: [
        'Discovery Call (Llamada de descubrimiento)',
        'Needs Assessment (Evaluación de necesidades)',
        'Value Proposition Design',
        'ROI Calculation (Cálculo de ROI)',
        'Proof of Concept (Prueba de concepto)'
      ],
      metricas: {
        tasaConversion: '40-50%',
        tiempoPromedio: '90 minutos',
        costoAdquisicion: '$200 MXN',
        satisfaccionCliente: '4.8/5'
      },
      implementacionKelumy: {
        procesos: [
          { proceso: 'Análisis de necesidades educativas', duracion: '30 min', conversion: '85%' },
          { proceso: 'Diseño de plan personalizado', duracion: '45 min', conversion: '70%' },
          { proceso: 'Demostración de valor', duracion: '60 min', conversion: '60%' },
          { proceso: 'Propuesta comercial', duracion: '30 min', conversion: '45%' }
        ],
        herramientas: [
          'Cuestionarios de diagnóstico educativo',
          'Calculadora de ROI personalizada',
          'Biblioteca de casos de éxito',
          'Sistema de seguimiento de resultados'
        ]
      }
    },
    inbound: {
      nombre: 'Venta Inbound',
      descripcion: 'Atraer clientes a través de contenido valioso y marketing',
      caracteristicas: [
        'Contenido educativo de calidad',
        'SEO y marketing de contenidos',
        'Lead nurturing automatizado',
        'Educación antes de la venta',
        'Construcción de autoridad'
      ],
      tecnicas: [
        'Content Marketing (Marketing de contenidos)',
        'SEO/SEM (Optimización y publicidad)',
        'Social Media Marketing',
        'Email Marketing',
        'Webinars educativos'
      ],
      metricas: {
        tasaConversion: '15-25%',
        tiempoPromedio: '30 días',
        costoAdquisicion: '$80 MXN',
        satisfaccionCliente: '4.5/5'
      },
      implementacionKelumy: {
        estrategias: [
          { estrategia: 'Blog educativo STEM', leads: '500/mes', conversion: '8%' },
          { estrategia: 'Webinars semanales', leads: '200/mes', conversion: '15%' },
          { estrategia: 'E-books gratuitos', leads: '300/mes', conversion: '12%' },
          { estrategia: 'Cursos de muestra', leads: '150/mes', conversion: '25%' }
        ],
        herramientas: [
          'CMS para gestión de contenido',
          'Herramientas de SEO (Ahrefs, SEMrush)',
          'Plataforma de email marketing',
          'Analytics avanzado'
        ]
      }
    },
    social: {
      nombre: 'Venta Social',
      descripcion: 'Utilizar redes sociales para generar leads y cerrar ventas',
      caracteristicas: [
        'Presencia en múltiples plataformas',
        'Contenido viral y engagement',
        'Influencer marketing',
        'Comunidades activas',
        'Social proof y testimonios'
      ],
      tecnicas: [
        'Social Media Selling',
        'Influencer Partnerships',
        'User Generated Content (UGC)',
        'Social Proof Marketing',
        'Community Building'
      ],
      metricas: {
        tasaConversion: '8-15%',
        tiempoPromedio: '7 días',
        costoAdquisicion: '$60 MXN',
        satisfaccionCliente: '4.3/5'
      },
      implementacionKelumy: {
        plataformas: [
          { plataforma: 'Instagram', seguidores: '25K', engagement: '4.2%', conversion: '6%' },
          { plataforma: 'TikTok', seguidores: '15K', engagement: '8.5%', conversion: '12%' },
          { plataforma: 'YouTube', seguidores: '8K', engagement: '3.8%', conversion: '18%' },
          { plataforma: 'LinkedIn', seguidores: '5K', engagement: '2.1%', conversion: '22%' }
        ],
        herramientas: [
          'Herramientas de gestión de redes sociales',
          'Plataforma de influencer marketing',
          'Sistema de UGC y testimonios',
          'Analytics de redes sociales'
        ]
      }
    },
    automatizada: {
      nombre: 'Venta Automatizada',
      descripcion: 'Procesos de venta automatizados con tecnología',
      caracteristicas: [
        'Chatbots inteligentes',
        'Email sequences automatizadas',
        'Lead scoring automático',
        'Nurturing personalizado',
        'Seguimiento programado'
      ],
      tecnicas: [
        'Marketing Automation',
        'Lead Scoring',
        'Email Sequences',
        'Chatbot Conversations',
        'Behavioral Triggers'
      ],
      metricas: {
        tasaConversion: '12-20%',
        tiempoPromedio: '14 días',
        costoAdquisicion: '$40 MXN',
        satisfaccionCliente: '4.4/5'
      },
      implementacionKelumy: {
        automatizaciones: [
          { proceso: 'Welcome sequence', duracion: '7 días', conversion: '15%' },
          { proceso: 'Nurturing por comportamiento', duracion: '21 días', conversion: '12%' },
          { proceso: 'Reactivación de leads fríos', duracion: '30 días', conversion: '8%' },
          { proceso: 'Upselling automático', duracion: '60 días', conversion: '25%' }
        ],
        herramientas: [
          'Plataforma de marketing automation',
          'Chatbot con IA',
          'Sistema de lead scoring',
          'Herramientas de personalización'
        ]
      }
    }
  }

  // Análisis de efectividad por método
  const analisisEfectividad = {
    conversion: {
      directa: { tasa: '30%', tiempo: '45 min', costo: '$120', satisfaccion: '4.7' },
      consultiva: { tasa: '45%', tiempo: '90 min', costo: '$200', satisfaccion: '4.8' },
      inbound: { tasa: '20%', tiempo: '30 días', costo: '$80', satisfaccion: '4.5' },
      social: { tasa: '12%', tiempo: '7 días', costo: '$60', satisfaccion: '4.3' },
      automatizada: { tasa: '16%', tiempo: '14 días', costo: '$40', satisfaccion: '4.4' }
    },
    escalabilidad: {
      directa: { capacidad: 'Baja', personalizacion: 'Alta', costo: 'Alto' },
      consultiva: { capacidad: 'Media', personalizacion: 'Muy Alta', costo: 'Muy Alto' },
      inbound: { capacidad: 'Alta', personalizacion: 'Media', costo: 'Medio' },
      social: { capacidad: 'Muy Alta', personalizacion: 'Baja', costo: 'Bajo' },
      automatizada: { capacidad: 'Muy Alta', personalizacion: 'Alta', costo: 'Bajo' }
    },
    roi: {
      directa: { inversion: 50000, ingresos: 150000, roi: 200, tiempoRecuperacion: 2.5 },
      consultiva: { inversion: 80000, ingresos: 200000, roi: 150, tiempoRecuperacion: 3.2 },
      inbound: { inversion: 30000, ingresos: 120000, roi: 300, tiempoRecuperacion: 1.8 },
      social: { inversion: 20000, ingresos: 80000, roi: 300, tiempoRecuperacion: 1.5 },
      automatizada: { inversion: 40000, ingresos: 160000, roi: 300, tiempoRecuperacion: 2.0 }
    }
  }

  // Herramientas y tecnologías
  const herramientasVenta = {
    crm: {
      nombre: 'CRM y Gestión de Leads',
      herramientas: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Monday.com'],
      funcionalidades: [
        'Gestión de contactos y leads',
        'Pipeline de ventas',
        'Automatización de seguimiento',
        'Reportes y analytics',
        'Integración con marketing'
      ],
      impacto: '+35% productividad'
    },
    comunicacion: {
      nombre: 'Comunicación y Presentaciones',
      herramientas: ['Zoom', 'Teams', 'Calendly', 'Loom', 'Canva'],
      funcionalidades: [
        'Videollamadas y presentaciones',
        'Programación automática',
        'Grabación de sesiones',
        'Diseño de materiales',
        'Compartir pantalla'
      ],
      impacto: '+25% conversión'
    },
    marketing: {
      nombre: 'Marketing y Automatización',
      herramientas: ['Mailchimp', 'ActiveCampaign', 'ConvertKit', 'Zapier', 'IFTTT'],
      funcionalidades: [
        'Email marketing automatizado',
        'Secuencias de nurturing',
        'Segmentación de audiencia',
        'Automatización de workflows',
        'Integración de herramientas'
      ],
      impacto: '+40% engagement'
    },
    analytics: {
      nombre: 'Analytics y Tracking',
      herramientas: ['Google Analytics', 'Mixpanel', 'Hotjar', 'FullStory', 'Amplitude'],
      funcionalidades: [
        'Tracking de conversiones',
        'Análisis de comportamiento',
        'Grabaciones de sesiones',
        'Funnel analysis',
        'Cohort analysis'
      ],
      impacto: '+30% optimización'
    }
  }

  // Casos de estudio de implementación
  const casosImplementacion = {
    caso1: {
      titulo: 'Implementación de Venta Consultiva - Aumento de Conversión',
      problema: 'Baja conversión en ventas directas (15%)',
      solucion: 'Migración a venta consultiva con diagnóstico educativo personalizado',
      resultados: {
        conversionAnterior: '15%',
        conversionNueva: '42%',
        incremento: '+180%',
        ltv: '+65%'
      },
      implementacion: [
        'Desarrollo de cuestionario de diagnóstico educativo',
        'Capacitación del equipo en técnicas consultivas',
        'Creación de plantillas de propuesta personalizada',
        'Sistema de seguimiento de resultados post-venta',
        'Métricas de satisfacción del cliente'
      ]
    },
    caso2: {
      titulo: 'Automatización de Venta Inbound - Escalamiento',
      problema: 'Limitación de capacidad con venta directa (50 leads/mes)',
      solucion: 'Implementación de sistema inbound automatizado',
      resultados: {
        leadsAnterior: '50/mes',
        leadsNuevo: '300/mes',
        incremento: '+500%',
        costoAdquisicion: '-60%'
      },
      implementacion: [
        'Blog educativo con 20 artículos mensuales',
        'Webinar series automatizadas',
        'Email sequences de nurturing',
        'Landing pages optimizadas',
        'Sistema de lead scoring'
      ]
    },
    caso3: {
      titulo: 'Venta Social - Generación de Leads Orgánicos',
      problema: 'Alto costo de adquisición en canales pagados ($200 CAC)',
      solucion: 'Estrategia de venta social con contenido viral',
      resultados: {
        cacAnterior: '$200',
        cacNuevo: '$45',
        reduccion: '-77%',
        leadsOrganicos: '+400%'
      },
      implementacion: [
        'Contenido viral en TikTok e Instagram',
        'Partnerships con influencers educativos',
        'Programa de referidos con incentivos',
        'Comunidad activa en Discord',
        'User Generated Content campaigns'
      ]
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Conversión Promedio</h3>
            <Target className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">24.6%</div>
          <p className="text-sm text-white/70">Tasa de conversión promedio</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+18% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Costo Adquisición</h3>
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">$100</div>
          <p className="text-sm text-white/70">Costo promedio por cliente</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-25% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Satisfacción</h3>
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">4.6/5</div>
          <p className="text-sm text-white/70">Puntuación promedio</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+0.2 vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Métodos de venta */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          Métodos de Venta Implementados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(metodosVenta).map(([key, metodo]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{metodo.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{metodo.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(metodo.metricas).map(([metrica, valor]) => (
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

      {/* Análisis de efectividad */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          Análisis de Efectividad por Método
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Conversión</h4>
            <div className="space-y-2">
              {Object.entries(analisisEfectividad.conversion).map(([metodo, datos]) => (
                <div key={metodo} className="flex justify-between items-center">
                  <span className="text-sm text-white/70 capitalize">{metodo}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">{datos.tasa}</span>
                    <span className="text-xs text-green-400">{datos.satisfaccion}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-3">Escalabilidad</h4>
            <div className="space-y-2">
              {Object.entries(analisisEfectividad.escalabilidad).map(([metodo, datos]) => (
                <div key={metodo} className="flex justify-between items-center">
                  <span className="text-sm text-white/70 capitalize">{metodo}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">{datos.capacidad}</span>
                    <span className="text-xs text-blue-400">{datos.costo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-3">ROI</h4>
            <div className="space-y-2">
              {Object.entries(analisisEfectividad.roi).map(([metodo, datos]) => (
                <div key={metodo} className="flex justify-between items-center">
                  <span className="text-sm text-white/70 capitalize">{metodo}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">{datos.roi}%</span>
                    <span className="text-xs text-green-400">{datos.tiempoRecuperacion}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVistaMetodos = () => (
    <div className="space-y-6">
      {/* Selector de métodos */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {Object.entries(metodosVenta).map(([key, metodo]) => (
          <button
            key={key}
            onClick={() => setMetodoActivo(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              metodoActivo === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">{metodo.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalles del método activo */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{metodosVenta[metodoActivo].nombre}</h2>
            <p className="text-white/70">{metodosVenta[metodoActivo].descripcion}</p>
          </div>
        </div>

        {/* Características */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🎯 Características Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {metodosVenta[metodoActivo].caracteristicas.map((caracteristica, index) => (
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
            {metodosVenta[metodoActivo].tecnicas.map((tecnica, index) => (
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
            {Object.entries(metodosVenta[metodoActivo].metricas).map(([metrica, valor]) => (
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
            {metodosVenta[metodoActivo].implementacionKelumy.canales && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Canales de Venta</h4>
                <div className="space-y-2">
                  {metodosVenta[metodoActivo].implementacionKelumy.canales.map((canal, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{canal.canal}</span>
                        <span className="font-bold text-green-400">{canal.conversion}</span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">Tiempo: {canal.tiempo}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {metodosVenta[metodoActivo].implementacionKelumy.herramientas && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Herramientas Utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  {metodosVenta[metodoActivo].implementacionKelumy.herramientas.map((herramienta, index) => (
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
      {/* Herramientas de venta */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          Herramientas y Tecnologías de Venta
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasVenta).map(([categoria, datos]) => (
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
          Casos de Implementación de Métodos de Venta
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
              <h1 className="text-3xl font-bold text-white mb-2">Métodos de Venta</h1>
              <p className="text-white/70">Estrategias y técnicas de venta optimizadas para e-commerce educativo</p>
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
            onClick={() => setVistaActiva('metodos')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'metodos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">Métodos</span>
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
      {vistaActiva === 'metodos' && renderVistaMetodos()}
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
            <h4 className="font-semibold text-white mb-2">Venta Directa</h4>
            <p className="text-sm text-white/70">Método de venta que implica contacto directo entre vendedor y cliente para cerrar la venta.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Venta Consultiva</h4>
            <p className="text-sm text-white/70">Enfoque de venta que se centra en entender y resolver las necesidades específicas del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Venta Inbound</h4>
            <p className="text-sm text-white/70">Estrategia de venta que atrae clientes a través de contenido valioso y marketing.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Venta Social</h4>
            <p className="text-sm text-white/70">Utilización de redes sociales para generar leads y cerrar ventas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Venta Automatizada</h4>
            <p className="text-sm text-white/70">Procesos de venta automatizados con tecnología y herramientas digitales.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">SPIN Selling</h4>
            <p className="text-sm text-white/70">Metodología de venta basada en Situación, Problema, Implicación y Necesidad.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Consultative Selling</h4>
            <p className="text-sm text-white/70">Venta consultiva que se enfoca en ser un asesor del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Solution Selling</h4>
            <p className="text-sm text-white/70">Venta de soluciones que resuelven problemas específicos del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Challenger Sale</h4>
            <p className="text-sm text-white/70">Metodología que desafía al cliente con nuevas perspectivas y conocimientos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Lead Scoring</h4>
            <p className="text-sm text-white/70">Sistema de puntuación que evalúa la probabilidad de conversión de un lead.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Nurturing</h4>
            <p className="text-sm text-white/70">Proceso de cultivar relaciones con leads a través de contenido relevante.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Discovery Call</h4>
            <p className="text-sm text-white/70">Llamada de descubrimiento para entender las necesidades del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Value Proposition</h4>
            <p className="text-sm text-white/70">Declaración que explica el valor único que ofrece tu producto o servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROI (Return on Investment)</h4>
            <p className="text-sm text-white/70">Retorno de inversión. Beneficio obtenido en relación al dinero invertido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Proof of Concept</h4>
            <p className="text-sm text-white/70">Prueba de concepto que demuestra la viabilidad de una solución.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Social Proof</h4>
            <p className="text-sm text-white/70">Evidencia social que influye en la decisión de compra del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">UGC (User Generated Content)</h4>
            <p className="text-sm text-white/70">Contenido generado por usuarios que promueve la marca orgánicamente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Marketing Automation</h4>
            <p className="text-sm text-white/70">Automatización de procesos de marketing para mejorar la eficiencia.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Behavioral Triggers</h4>
            <p className="text-sm text-white/70">Activadores de comportamiento que disparan acciones automáticas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Pipeline</h4>
            <p className="text-sm text-white/70">Canal de ventas que organiza oportunidades en diferentes etapas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Qualified Lead</h4>
            <p className="text-sm text-white/70">Lead calificado que cumple criterios específicos para la conversión.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Cold Calling</h4>
            <p className="text-sm text-white/70">Llamadas en frío a prospectos que no han mostrado interés previo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Warm Calling</h4>
            <p className="text-sm text-white/70">Llamadas a prospectos que han mostrado algún interés en el producto.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Objection Handling</h4>
            <p className="text-sm text-white/70">Manejo de objeciones del cliente durante el proceso de venta.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Closing Techniques</h4>
            <p className="text-sm text-white/70">Técnicas de cierre para finalizar la venta exitosamente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Follow-up</h4>
            <p className="text-sm text-white/70">Seguimiento posterior al contacto inicial para mantener el interés.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetodosVenta
