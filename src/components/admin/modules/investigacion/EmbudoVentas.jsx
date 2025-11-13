// ========================================
// MÓDULO 3: EMBUDO DE VENTAS - KELUMY
// ========================================
// Previsualización del customer journey optimizado para la plataforma Kelumy
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import { 
  Eye, 
  Heart, 
  ShoppingCart, 
  CreditCard, 
  CheckCircle, 
  ArrowLeft,
  BarChart3,
  Settings,
  CheckCircle as Check,
  AlertCircle,
  Star,
  BookOpen,
  Lightbulb,
  Users,
  Zap,
  Target,
  TrendingUp,
  Mail,
  Phone,
  MessageCircle,
  Download,
  Play,
  Award
} from 'lucide-react'

const EmbudoVentas = ({ onBack }) => {
  const [etapaActiva, setEtapaActiva] = useState('conciencia')
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [analisisActivo, setAnalisisActivo] = useState('roi')

  // Las 7 etapas principales del embudo de ventas
  const etapas = {
    conciencia: {
      id: 'conciencia',
      nombre: 'Conciencia (Awareness)',
      icono: Eye,
      color: 'blue',
      descripcion: 'Primer contacto del usuario con la marca y el problema',
      objetivo: 'Generar visibilidad y reconocimiento de marca',
      tacticas: [
        'SEO optimizado para términos STEM',
        'Contenido educativo en redes sociales',
        'Webinars gratuitos sobre ciencias',
        'Colaboraciones con influencers educativos',
        'Publicidad dirigida a estudiantes y docentes'
      ],
      metricas: {
        alcance: '50,000+ personas/mes',
        ctr: '3.2%',
        costoAdquisicion: '$45 MXN',
        tiempoPromedio: '2.5 minutos'
      },
      implementacionKelumy: {
        canales: [
          { canal: 'Google Ads', presupuesto: '$15,000 MXN/mes', conversion: '2.8%' },
          { canal: 'Facebook/Instagram', presupuesto: '$8,000 MXN/mes', conversion: '3.5%' },
          { canal: 'YouTube', presupuesto: '$5,000 MXN/mes', conversion: '4.2%' },
          { canal: 'SEO Orgánico', presupuesto: '$2,000 MXN/mes', conversion: '5.8%' }
        ],
        contenido: [
          'Blog posts sobre ciencias y tecnología',
          'Videos educativos en YouTube',
          'Infografías científicas',
          'Podcasts sobre STEM'
        ]
      }
    },
    interes: {
      id: 'interes',
      nombre: 'Interés (Interest)',
      icono: Heart,
      color: 'green',
      descripcion: 'El usuario muestra interés en la solución educativa',
      objetivo: 'Captar la atención y generar curiosidad',
      tacticas: [
        'Lead magnets (guías gratuitas)',
        'Seminarios web informativos',
        'Pruebas gratuitas de cursos',
        'Certificaciones de muestra',
        'Casos de éxito de estudiantes'
      ],
      metricas: {
        tasaInteres: '15-20%',
        tiempoEnPagina: '4.2 minutos',
        rebote: '<35%',
        leadsGenerados: '1,200/mes'
      },
      implementacionKelumy: {
        ofertas: [
          { oferta: 'Guía "Introducción a la Robótica"', conversion: '12%', valor: 'Gratuito' },
          { oferta: 'Webinar "Futuro de las Ciencias"', conversion: '8%', valor: 'Gratuito' },
          { oferta: 'Prueba de 7 días', conversion: '25%', valor: 'Gratuito' },
          { oferta: 'Certificado de muestra', conversion: '18%', valor: 'Gratuito' }
        ],
        contenido: [
          'E-books sobre carreras STEM',
          'Plantillas de proyectos',
          'Calculadoras de ROI educativo',
          'Test de aptitudes científicas'
        ]
      }
    },
    consideracion: {
      id: 'consideracion',
      nombre: 'Consideración (Consideration)',
      icono: Target,
      color: 'purple',
      descripcion: 'El usuario evalúa diferentes opciones educativas',
      objetivo: 'Posicionar Kelumy como la mejor opción',
      tacticas: [
        'Comparativas con competidores',
        'Testimonios de estudiantes exitosos',
        'Demostraciones en vivo',
        'Garantías de satisfacción',
        'Comparativas de precios'
      ],
      metricas: {
        tasaConsideracion: '35-40%',
        tiempoEvaluacion: '2-3 semanas',
        paginasVisitadas: '8-12 páginas',
        retorno: '65%'
      },
      implementacionKelumy: {
        elementos: [
          { elemento: 'Página de comparación', conversion: '+22%', tiempo: '3 días' },
          { elemento: 'Testimonios en video', conversion: '+18%', tiempo: '2 días' },
          { elemento: 'Demo interactivo', conversion: '+35%', tiempo: '1 día' },
          { elemento: 'Chat en vivo', conversion: '+28%', tiempo: 'Inmediato' }
        ],
        contenido: [
          'Comparativas detalladas con competidores',
          'Casos de estudio de éxito',
          'Demostraciones de plataforma',
          'Calculadoras de ROI'
        ]
      }
    },
    intencion: {
      id: 'intencion',
      nombre: 'Intención (Intent)',
      icono: ShoppingCart,
      color: 'orange',
      descripcion: 'El usuario está listo para comprar y busca la mejor oferta',
      objetivo: 'Convertir la intención en acción de compra',
      tacticas: [
        'Ofertas limitadas en tiempo',
        'Descuentos por volumen',
        'Programas de referidos',
        'Garantías extendidas',
        'Opciones de pago flexibles'
      ],
      metricas: {
        tasaIntencion: '25-30%',
        tiempoDecision: '1-2 días',
        abandonoCarrito: '<15%',
        conversion: '18-22%'
      },
      implementacionKelumy: {
        ofertas: [
          { oferta: 'Descuento 20% por tiempo limitado', conversion: '28%', duracion: '48 horas' },
          { oferta: '2x1 en cursos básicos', conversion: '35%', duracion: '1 semana' },
          { oferta: 'Garantía de 30 días', conversion: '22%', duracion: 'Permanente' },
          { oferta: 'Pago en 3 meses sin intereses', conversion: '31%', duracion: 'Permanente' }
        ],
        elementos: [
          'Contador de tiempo para ofertas',
          'Notificaciones de stock limitado',
          'Testimonios de compradores recientes',
          'Comparador de precios'
        ]
      }
    },
    compra: {
      id: 'compra',
      nombre: 'Compra (Purchase)',
      icono: CreditCard,
      color: 'red',
      descripcion: 'El usuario completa la transacción',
      objetivo: 'Facilitar el proceso de compra y minimizar fricciones',
      tacticas: [
        'Checkout optimizado en 1 clic',
        'Múltiples métodos de pago',
        'Proceso de compra simplificado',
        'Confirmación inmediata',
        'Soporte durante la compra'
      ],
      metricas: {
        tasaConversion: '18-25%',
        tiempoCheckout: '<3 minutos',
        abandonoCheckout: '<8%',
        satisfaccion: '4.7/5'
      },
      implementacionKelumy: {
        proceso: [
          { paso: 'Selección de curso', tiempo: '30 segundos', conversion: '95%' },
          { paso: 'Datos personales', tiempo: '45 segundos', conversion: '92%' },
          { paso: 'Método de pago', tiempo: '60 segundos', conversion: '88%' },
          { paso: 'Confirmación', tiempo: '15 segundos', conversion: '98%' }
        ],
        metodosPago: [
          'Tarjeta de crédito/débito',
          'PayPal',
          'Transferencia bancaria',
          'OXXO',
          'Meses sin intereses'
        ]
      }
    },
    retencion: {
      id: 'retencion',
      nombre: 'Retención (Retention)',
      icono: CheckCircle,
      color: 'teal',
      descripcion: 'Mantener al usuario activo y comprometido',
      objetivo: 'Maximizar el valor y reducir el churn',
      tacticas: [
        'Onboarding personalizado',
        'Seguimiento de progreso',
        'Contenido adicional gratuito',
        'Comunidad de estudiantes',
        'Soporte dedicado'
      ],
      metricas: {
        tasaRetencion: '85-90%',
        tiempoActividad: '45 minutos/semana',
        churn: '<5% mensual',
        satisfaccion: '4.6/5'
      },
      implementacionKelumy: {
        elementos: [
          { elemento: 'Bienvenida personalizada', impacto: '+40% retención', tiempo: 'Inmediato' },
          { elemento: 'Plan de estudio personalizado', impacto: '+25% completación', tiempo: '1 día' },
          { elemento: 'Recordatorios de progreso', impacto: '+30% actividad', tiempo: 'Semanal' },
          { elemento: 'Comunidad de estudiantes', impacto: '+50% engagement', tiempo: 'Continuo' }
        ],
        contenido: [
          'Guías de estudio personalizadas',
          'Material adicional gratuito',
          'Webinars exclusivos',
          'Certificaciones adicionales'
        ]
      }
    },
    advocacy: {
      id: 'advocacy',
      nombre: 'Defensa (Advocacy)',
      icono: Star,
      color: 'yellow',
      descripcion: 'Convertir usuarios satisfechos en promotores de la marca',
      objetivo: 'Generar referidos y testimonios orgánicos',
      tacticas: [
        'Programa de referidos con recompensas',
        'Testimonios y reseñas',
        'Casos de éxito destacados',
        'Programa de embajadores',
        'Contenido generado por usuarios'
      ],
      metricas: {
        tasaAdvocacy: '35-40%',
        referidosPorUsuario: '2.3',
        nps: '65+',
        testimonios: '150+'
      },
      implementacionKelumy: {
        programas: [
          { programa: 'Referidos con descuento', conversion: '28%', recompensa: '20% descuento' },
          { programa: 'Testimonios en video', conversion: '15%', recompensa: 'Curso gratuito' },
          { programa: 'Embajadores estudiantiles', conversion: '8%', recompensa: 'Beca parcial' },
          { programa: 'Contenido UGC', conversion: '12%', recompensa: 'Reconocimiento público' }
        ],
        metricas: [
          'NPS Score: 68',
          'Referidos por mes: 450',
          'Testimonios generados: 85',
          'Contenido UGC: 120 posts'
        ]
      }
    }
  }

  // Análisis de ROI por etapa
  const analisisROI = {
    conciencia: {
      inversion: 50000,
      leadsGenerados: 1200,
      costoPorLead: 41.67,
      roi: 240,
      tiempoRecuperacion: 3.2
    },
    interes: {
      inversion: 25000,
      leadsCalificados: 360,
      costoPorLeadCalificado: 69.44,
      roi: 180,
      tiempoRecuperacion: 2.8
    },
    consideracion: {
      inversion: 15000,
      demosCompletadas: 180,
      costoPorDemo: 83.33,
      roi: 320,
      tiempoRecuperacion: 1.9
    },
    compra: {
      inversion: 8000,
      ventasRealizadas: 45,
      costoPorVenta: 177.78,
      roi: 450,
      tiempoRecuperacion: 1.2
    },
    retencion: {
      inversion: 12000,
      usuariosRetenidos: 38,
      costoPorRetencion: 315.79,
      roi: 280,
      tiempoRecuperacion: 2.1
    },
    advocacy: {
      inversion: 5000,
      referidosGenerados: 85,
      costoPorReferido: 58.82,
      roi: 380,
      tiempoRecuperacion: 1.5
    }
  }

  // Herramientas de automatización
  const herramientasAutomatizacion = {
    email: {
      nombre: 'Email Marketing',
      herramientas: ['Mailchimp', 'ActiveCampaign', 'HubSpot'],
      automatizaciones: [
        'Secuencia de bienvenida',
        'Nurturing por etapas',
        'Reactivación de usuarios inactivos',
        'Seguimiento post-compra'
      ],
      impacto: '+35% conversión'
    },
    crm: {
      nombre: 'CRM y Lead Management',
      herramientas: ['Salesforce', 'Pipedrive', 'Zoho CRM'],
      automatizaciones: [
        'Scoring automático de leads',
        'Asignación de tareas',
        'Seguimiento de oportunidades',
        'Reportes automáticos'
      ],
      impacto: '+28% eficiencia'
    },
    social: {
      nombre: 'Social Media Automation',
      herramientas: ['Hootsuite', 'Buffer', 'Sprout Social'],
      automatizaciones: [
        'Publicación programada',
        'Respuestas automáticas',
        'Monitoreo de menciones',
        'Análisis de engagement'
      ],
      impacto: '+42% engagement'
    },
    analitica: {
      nombre: 'Analytics y Tracking',
      herramientas: ['Google Analytics', 'Mixpanel', 'Hotjar'],
      automatizaciones: [
        'Tracking de conversiones',
        'Análisis de comportamiento',
        'Alertas de rendimiento',
        'Reportes automáticos'
      ],
      impacto: '+25% optimización'
    }
  }

  // Casos de estudio específicos
  const casosEstudio = {
    caso1: {
      titulo: 'Optimización de Conversión - Etapa de Interés',
      problema: 'Baja conversión de leads a demos (8%)',
      solucion: 'Implementación de chatbot inteligente + secuencia de email personalizada',
      resultados: {
        conversionAnterior: '8%',
        conversionNueva: '23%',
        incremento: '+187%',
        roi: 340
      },
      implementacion: [
        'Chatbot con respuestas personalizadas',
        'Secuencia de 5 emails automatizados',
        'Segmentación por tipo de interés',
        'Follow-up telefónico automatizado'
      ]
    },
    caso2: {
      titulo: 'Reducción de Churn - Etapa de Retención',
      problema: 'Alto churn en primeros 30 días (25%)',
      solucion: 'Programa de onboarding gamificado + comunidad de estudiantes',
      resultados: {
        churnAnterior: '25%',
        churnNuevo: '8%',
        reduccion: '-68%',
        ltvIncremento: '+45%'
      },
      implementacion: [
        'Onboarding en 7 pasos gamificados',
        'Comunidad privada en Discord',
        'Mentorías semanales automatizadas',
        'Sistema de logros y recompensas'
      ]
    },
    caso3: {
      titulo: 'Escalamiento de Advocacy - Programa de Referidos',
      problema: 'Baja participación en referidos (5%)',
      solucion: 'Programa de referidos con incentivos escalonados + gamificación',
      resultados: {
        participacionAnterior: '5%',
        participacionNueva: '28%',
        incremento: '+460%',
        referidosPorMes: 450
      },
      implementacion: [
        'Sistema de puntos por referidos',
        'Recompensas escalonadas',
        'Dashboard de progreso personal',
        'Certificaciones de embajador'
      ]
    }
  }

  // Métricas avanzadas del embudo
  const metricasAvanzadas = {
    conversionFunnel: {
      conciencia: { visitas: 50000, conversion: '100%' },
      interes: { visitas: 1200, conversion: '2.4%' },
      consideracion: { visitas: 360, conversion: '30%' },
      compra: { visitas: 180, conversion: '25%' },
      retencion: { visitas: 45, conversion: '84%' },
      advocacy: { visitas: 38, conversion: '37%' }
    },
    tiempoPromedio: {
      concienciaAInteres: '2.5 días',
      interesAConsideracion: '5.2 días',
      consideracionACompra: '8.7 días',
      compraARetencion: '1 día',
      retencionAAdvocacy: '45 días'
    },
    costosAcumulados: {
      conciencia: 50000,
      interes: 75000,
      consideracion: 90000,
      compra: 98000,
      retencion: 110000,
      advocacy: 115000
    }
  }

  const etapa = etapas[etapaActiva]
  const IconoEtapa = etapa.icono

  const renderVistaROI = () => (
    <div className="space-y-6">
      {/* ROI por etapa */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          Análisis de ROI por Etapa
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analisisROI).map(([etapa, datos]) => (
            <div key={etapa} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2 capitalize">{etapa}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Inversión:</span>
                  <span className="text-sm font-semibold text-white">${datos.inversion.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">ROI:</span>
                  <span className="text-sm font-semibold text-green-400">{datos.roi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Tiempo Recuperación:</span>
                  <span className="text-sm font-semibold text-blue-400">{datos.tiempoRecuperacion} meses</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas del embudo */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          Métricas del Embudo Completo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Conversión por Etapa</h4>
            <div className="space-y-2">
              {Object.entries(metricasAvanzadas.conversionFunnel).map(([etapa, datos]) => (
                <div key={etapa} className="flex justify-between items-center">
                  <span className="text-sm text-white/70 capitalize">{etapa}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">{datos.visitas.toLocaleString()}</span>
                    <span className="text-sm font-semibold text-green-400">{datos.conversion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-3">Tiempo Promedio entre Etapas</h4>
            <div className="space-y-2">
              {Object.entries(metricasAvanzadas.tiempoPromedio).map(([transicion, tiempo]) => (
                <div key={transicion} className="flex justify-between items-center">
                  <span className="text-sm text-white/70">{transicion.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm font-semibold text-blue-400">{tiempo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVistaAutomatizacion = () => (
    <div className="space-y-6">
      {/* Herramientas de automatización */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          Herramientas de Automatización
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasAutomatizacion).map(([categoria, datos]) => (
            <div key={categoria} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-3">{datos.nombre}</h4>
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Herramientas recomendadas:</p>
                <div className="flex flex-wrap gap-1">
                  {datos.herramientas.map((herramienta, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Automatizaciones:</p>
                <ul className="space-y-1">
                  {datos.automatizaciones.map((automatizacion, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{automatizacion}</span>
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

  const renderVistaCasosEstudio = () => (
    <div className="space-y-6">
      {/* Casos de estudio */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-full mr-3">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          Casos de Estudio - Optimizaciones Exitosas
        </h3>
        
        <div className="space-y-6">
          {Object.entries(casosEstudio).map(([caso, datos]) => (
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

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Etapas del Embudo</h3>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">7</p>
          <p className="text-white/70 text-sm">Etapas principales</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Conversión Total</h3>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">18-25%</p>
          <p className="text-white/70 text-sm">De conciencia a compra</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">LTV Promedio</h3>
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">$8,500</p>
          <p className="text-white/70 text-sm">Valor de vida del cliente</p>
        </div>
      </div>

      {/* Flujo del embudo */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6">Flujo del Embudo de Ventas</h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {Object.values(etapas).map((etapa, index) => {
            const Icono = etapa.icono
            return (
              <div key={etapa.id} className="text-center">
                <div className={`w-12 h-12 bg-${etapa.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icono className={`w-6 h-6 text-${etapa.color}-400`} />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{etapa.nombre}</h4>
                <p className="text-xs text-white/70">{etapa.metricas.tasaConversion || etapa.metricas.tasaInteres || '15-20%'}</p>
                {index < 6 && (
                  <div className="hidden md:block mt-4">
                    <div className="w-full h-0.5 bg-white/20"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparación de etapas */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6">Análisis por Etapa</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-white/70 py-3">Etapa</th>
                <th className="text-left text-white/70 py-3">Conversión</th>
                <th className="text-left text-white/70 py-3">Tiempo Promedio</th>
                <th className="text-left text-white/70 py-3">Costo</th>
                <th className="text-left text-white/70 py-3">Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(etapas).map((etapa) => (
                <tr key={etapa.id} className="border-b border-white/10">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-${etapa.color}-500/20 rounded-full`}>
                        <etapa.icono className={`w-4 h-4 text-${etapa.color}-400`} />
                      </div>
                      <span className="text-white font-medium">{etapa.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 text-white/70">{etapa.metricas.tasaConversion || etapa.metricas.tasaInteres || '15-20%'}</td>
                  <td className="py-3 text-white/70">{etapa.metricas.tiempoPromedio || '2-3 días'}</td>
                  <td className="py-3 text-white/70">{etapa.metricas.costoAdquisicion || '$45 MXN'}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      etapa.id === 'compra' ? 'bg-red-500/20 text-red-400' :
                      etapa.id === 'conciencia' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {etapa.id === 'compra' ? 'Crítica' : etapa.id === 'conciencia' ? 'Alta' : 'Media'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderVistaDetallada = () => (
    <div className="space-y-6">
      {/* Información de la etapa seleccionada */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-6">
          <div className={`p-3 bg-${etapa.color}-500/20 rounded-full mr-4`}>
            <IconoEtapa className={`w-6 h-6 text-${etapa.color}-400`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{etapa.nombre}</h2>
            <p className="text-white/70">{etapa.descripcion}</p>
          </div>
        </div>

        {/* Objetivo y tácticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold text-white mb-2">🎯 Objetivo</h3>
            <p className="text-white/70">{etapa.objetivo}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold text-white mb-2">📊 Métricas Clave</h3>
            <div className="space-y-1">
              {Object.entries(etapa.metricas).map(([metrica, valor]) => (
                <div key={metrica} className="flex justify-between">
                  <span className="text-xs text-white/70 capitalize">{metrica.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-xs font-semibold text-white">{valor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tácticas */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🚀 Tácticas Implementadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {etapa.tacticas.map((tactica, index) => (
              <div key={index} className="flex items-start">
                <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{tactica}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Implementación en Kelumy */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-orange-500/20 rounded-full mr-3">
            <Star className="w-5 h-5 text-orange-400" />
          </div>
          Implementación en Kelumy
        </h3>
        
        {/* Canales/Ofertas/Elementos */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">📈 Estrategias Específicas</h4>
          <div className="space-y-3">
            {etapa.implementacionKelumy.canales && etapa.implementacionKelumy.canales.map((item, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{item.canal}</span>
                  <span className="font-bold text-green-400">{item.presupuesto}</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Conversión: {item.conversion}</p>
              </div>
            ))}
            {etapa.implementacionKelumy.ofertas && etapa.implementacionKelumy.ofertas.map((item, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{item.oferta}</span>
                  <span className="font-bold text-green-400">{item.valor}</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Conversión: {item.conversion}</p>
              </div>
            ))}
            {etapa.implementacionKelumy.elementos && etapa.implementacionKelumy.elementos.map((item, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{item.elemento}</span>
                  <span className="font-bold text-green-400">{item.conversion}</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Tiempo: {item.tiempo}</p>
              </div>
            ))}
            {etapa.implementacionKelumy.programas && etapa.implementacionKelumy.programas.map((item, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{item.programa}</span>
                  <span className="font-bold text-green-400">{item.recompensa}</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Conversión: {item.conversion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido */}
        {etapa.implementacionKelumy.contenido && (
          <div>
            <h4 className="font-semibold text-white mb-3">📝 Contenido de Apoyo</h4>
            <div className="flex flex-wrap gap-2">
              {etapa.implementacionKelumy.contenido.map((contenido, index) => (
                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                  {contenido}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Embudo de Ventas</h1>
            <p className="text-white/70">Previsualización del customer journey optimizado para Kelumy</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
            <Settings className="w-4 h-4" />
            <span>Configurar</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
            <BarChart3 className="w-4 h-4" />
            <span>Exportar</span>
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
          onClick={() => setVistaActiva('roi')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            vistaActiva === 'roi'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">ROI</span>
        </button>
        <button
          onClick={() => setVistaActiva('automatizacion')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            vistaActiva === 'automatizacion'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span className="text-sm">Automatización</span>
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
        <button
          onClick={() => setVistaActiva('detallada')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
            vistaActiva === 'detallada'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Detallada</span>
        </button>
      </div>

      {/* Selector de etapas */}
      {vistaActiva === 'detallada' && (
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            {Object.values(etapas).map((etapa) => {
              const Icono = etapa.icono
              return (
                <button
                  key={etapa.id}
                  onClick={() => setEtapaActiva(etapa.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    etapaActiva === etapa.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icono className="w-4 h-4" />
                  <span className="font-medium text-sm">{etapa.nombre.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Contenido de la vista */}
      {vistaActiva === 'resumen' && renderVistaResumen()}
      {vistaActiva === 'roi' && renderVistaROI()}
      {vistaActiva === 'automatizacion' && renderVistaAutomatizacion()}
      {vistaActiva === 'casos' && renderVistaCasosEstudio()}
      {vistaActiva === 'detallada' && renderVistaDetallada()}

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
            <h4 className="font-semibold text-white mb-2">Customer Journey</h4>
            <p className="text-sm text-white/70">Viaje del cliente. Proceso completo que sigue un usuario desde que conoce la marca hasta que se convierte en cliente leal.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Lead Magnet</h4>
            <p className="text-sm text-white/70">Imán de leads. Contenido gratuito de valor que se ofrece a cambio de información de contacto del usuario.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Onboarding</h4>
            <p className="text-sm text-white/70">Proceso de incorporación. Guía inicial que ayuda a los nuevos usuarios a entender y usar la plataforma.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Engagement</h4>
            <p className="text-sm text-white/70">Compromiso. Nivel de interacción y participación activa del usuario con la plataforma o contenido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">UGC (User Generated Content)</h4>
            <p className="text-sm text-white/70">Contenido generado por usuarios. Material creado por los propios usuarios que promociona la marca orgánicamente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Referral Program</h4>
            <p className="text-sm text-white/70">Programa de referidos. Sistema de recompensas para usuarios que recomiendan la plataforma a otros.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Touchpoint</h4>
            <p className="text-sm text-white/70">Punto de contacto. Cada interacción entre el usuario y la marca durante su journey.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Friction</h4>
            <p className="text-sm text-white/70">Fricción. Obstáculos o dificultades que impiden que el usuario complete una acción deseada.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Retention Rate</h4>
            <p className="text-sm text-white/70">Tasa de retención. Porcentaje de usuarios que continúan usando el servicio después de un período determinado.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Awareness</h4>
            <p className="text-sm text-white/70">Conciencia. Primera etapa del embudo donde el cliente descubre la marca o producto.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Interest</h4>
            <p className="text-sm text-white/70">Interés. Segunda etapa donde el cliente muestra curiosidad por el producto o servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Consideration</h4>
            <p className="text-sm text-white/70">Consideración. Tercera etapa donde el cliente evalúa activamente la compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Purchase</h4>
            <p className="text-sm text-white/70">Compra. Cuarta etapa donde el cliente realiza la transacción.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Advocacy</h4>
            <p className="text-sm text-white/70">Defensa. Quinta etapa donde el cliente se convierte en promotor de la marca.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Lead</h4>
            <p className="text-sm text-white/70">Prospecto. Persona que ha mostrado interés en el producto pero aún no ha comprado.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Qualified Lead</h4>
            <p className="text-sm text-white/70">Prospecto calificado. Lead que cumple criterios específicos y tiene mayor probabilidad de compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Sales Funnel</h4>
            <p className="text-sm text-white/70">Embudo de ventas. Proceso estructurado que guía a los clientes desde el descubrimiento hasta la compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Conversion</h4>
            <p className="text-sm text-white/70">Conversión. Proceso de transformar un visitante en cliente o completar una acción deseada.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Nurturing</h4>
            <p className="text-sm text-white/70">Nutrición. Proceso de cultivar relaciones con leads a través de contenido relevante y seguimiento.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Follow-up</h4>
            <p className="text-sm text-white/70">Seguimiento. Acciones posteriores al primer contacto para mantener el interés del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Pipeline</h4>
            <p className="text-sm text-white/70">Canal de ventas. Proceso organizado de oportunidades de venta en diferentes etapas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Loyalty</h4>
            <p className="text-sm text-white/70">Lealtad. Grado de compromiso y satisfacción del cliente con la marca.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Word of Mouth</h4>
            <p className="text-sm text-white/70">Boca a boca. Recomendaciones espontáneas de clientes satisfechos a otros potenciales clientes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Viral</h4>
            <p className="text-sm text-white/70">Viral. Contenido o campaña que se propaga rápidamente a través de redes sociales y recomendaciones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Growth Hack</h4>
            <p className="text-sm text-white/70">Hack de crecimiento. Técnicas creativas y de bajo costo para acelerar el crecimiento del negocio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Automation</h4>
            <p className="text-sm text-white/70">Automatización. Uso de tecnología para automatizar procesos repetitivos en el embudo de ventas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Personalization</h4>
            <p className="text-sm text-white/70">Personalización. Adaptación de mensajes y experiencias según las características específicas del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Segmentation</h4>
            <p className="text-sm text-white/70">Segmentación. División de clientes en grupos con características similares para estrategias específicas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Targeting</h4>
            <p className="text-sm text-white/70">Segmentación. Identificación y enfoque en audiencias específicas para campañas de marketing.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Messaging</h4>
            <p className="text-sm text-white/70">Mensajería. Comunicación estratégica diseñada para conectar con la audiencia objetivo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Pain Point</h4>
            <p className="text-sm text-white/70">Punto de dolor. Problema específico que enfrenta el cliente y que tu producto o servicio puede resolver.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Solution</h4>
            <p className="text-sm text-white/70">Solución. Producto o servicio que resuelve el problema o necesidad del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Objection</h4>
            <p className="text-sm text-white/70">Objeción. Preocupación o resistencia del cliente que impide la compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Close</h4>
            <p className="text-sm text-white/70">Cierre. Proceso final de convertir un prospecto en cliente pagador.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Deal</h4>
            <p className="text-sm text-white/70">Negocio. Transacción comercial exitosa entre la empresa y el cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Acquisition</h4>
            <p className="text-sm text-white/70">Adquisición. Proceso de conseguir nuevos clientes para el negocio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Activation</h4>
            <p className="text-sm text-white/70">Activación. Proceso de hacer que un nuevo cliente use activamente el producto o servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Referral</h4>
            <p className="text-sm text-white/70">Referencia. Recomendación de un cliente existente que trae nuevos clientes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Revenue</h4>
            <p className="text-sm text-white/70">Ingresos. Dinero generado por las ventas de productos o servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ARR (Annual Recurring Revenue)</h4>
            <p className="text-sm text-white/70">Ingresos recurrentes anuales. Ingresos predecibles que genera la empresa cada año por suscripciones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Commission</h4>
            <p className="text-sm text-white/70">Comisión. Porcentaje o cantidad fija que se paga por cada venta realizada.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Fee</h4>
            <p className="text-sm text-white/70">Tarifa. Cantidad de dinero que se cobra por un servicio específico.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbudoVentas
