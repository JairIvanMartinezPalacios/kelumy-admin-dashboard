// ========================================
// MÓDULO 4: UX Y CHECKOUT - KELUMY
// ========================================
// Previsualización de optimización de experiencia de usuario y proceso de checkout
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Settings,
  Target,
  TrendingUp,
  Clock,
  Star,
  Eye,
  ShoppingCart,
  Smartphone,
  CheckCircle as Check,
  Zap,
  Lightbulb,
  BookOpen
} from 'lucide-react'

const UXCheckout = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [seccionActiva, setSeccionActiva] = useState('ux')
  const [analisisActivo, setAnalisisActivo] = useState('conversion')

  // Principios de UX para e-commerce educativo
  const principiosUX = {
    usabilidad: {
      nombre: 'Usabilidad',
      descripcion: 'Facilidad de uso y navegación intuitiva',
      principios: [
        'Navegación clara y consistente',
        'Búsqueda inteligente y filtros',
        'Carga rápida de páginas (<3 segundos)',
        'Diseño responsive en todos los dispositivos',
        'Accesibilidad para usuarios con discapacidades'
      ],
      metricas: {
        tiempoCarga: '<3 segundos',
        tasaRebote: '<35%',
        satisfaccionUsabilidad: '4.5/5',
        accesibilidad: 'WCAG 2.1 AA'
      }
    },
    conversion: {
      nombre: 'Optimización de Conversión',
      descripcion: 'Diseño enfocado en maximizar conversiones',
      principios: [
        'CTAs prominentes y claros',
        'Reducción de fricción en el proceso',
        'Trust signals y testimonios',
        'Progreso visual en formularios',
        'Optimización de landing pages'
      ],
      metricas: {
        tasaConversion: '18-25%',
        tiempoEnPagina: '4.2 minutos',
        clicksCTA: '12%',
        completacionFormularios: '85%'
      }
    },
    personalizacion: {
      nombre: 'Personalización',
      descripcion: 'Experiencia adaptada a cada usuario',
      principios: [
        'Recomendaciones basadas en comportamiento',
        'Contenido dinámico según perfil',
        'Interfaz adaptable por preferencias',
        'Comunicación personalizada',
        'Ofertas segmentadas'
      ],
      metricas: {
        engagementPersonalizado: '+45%',
        tiempoSesion: '+60%',
        conversionPersonalizada: '+28%',
        satisfaccionPersonalizada: '4.7/5'
      }
    },
    accesibilidad: {
      nombre: 'Accesibilidad',
      descripcion: 'Inclusión para todos los usuarios',
      principios: [
        'Contraste de colores adecuado',
        'Navegación por teclado',
        'Texto alternativo en imágenes',
        'Subtítulos en videos',
        'Tamaños de fuente escalables'
      ],
      metricas: {
        cumplimientoWCAG: '95%',
        usuariosAccesibilidad: '+15%',
        satisfaccionAccesible: '4.6/5',
        tiempoNavegacion: '-20%'
      }
    }
  }

  // Proceso de checkout optimizado
  const procesoCheckout = {
    paso1: {
      nombre: 'Selección de Producto',
      descripcion: 'Proceso de elección y configuración del curso',
      elementos: [
        'Galería de imágenes/videos del curso',
        'Descripción detallada y beneficios',
        'Testimonios y reseñas de estudiantes',
        'Precio y opciones de pago',
        'Certificación incluida'
      ],
      optimizaciones: [
        'Videos de preview del contenido',
        'Comparación con cursos similares',
        'Garantía de satisfacción',
        'Soporte 24/7 incluido',
        'Acceso inmediato post-compra'
      ],
      metricas: {
        tiempoDecision: '2.5 minutos',
        tasaConversion: '35%',
        abandono: '15%',
        satisfaccion: '4.6/5'
      }
    },
    paso2: {
      nombre: 'Información Personal',
      descripcion: 'Recopilación de datos del usuario',
      elementos: [
        'Formulario simplificado',
        'Validación en tiempo real',
        'Autocompletado inteligente',
        'Guardado de progreso',
        'Múltiples opciones de registro'
      ],
      optimizaciones: [
        'Login social (Google, Facebook)',
        'Campos mínimos requeridos',
        'Validación instantánea',
        'Indicadores de progreso',
        'Ayuda contextual'
      ],
      metricas: {
        tiempoCompletado: '45 segundos',
        tasaCompletacion: '92%',
        erroresFormulario: '<5%',
        satisfaccion: '4.4/5'
      }
    },
    paso3: {
      nombre: 'Método de Pago',
      descripcion: 'Selección y procesamiento del pago',
      elementos: [
        'Múltiples opciones de pago',
        'Información de seguridad visible',
        'Cálculo automático de totales',
        'Opciones de financiamiento',
        'Procesamiento seguro'
      ],
      optimizaciones: [
        'Pagos con un clic',
        'Guardado seguro de tarjetas',
        'Meses sin intereses',
        'Pago en OXXO',
        'Criptomonedas'
      ],
      metricas: {
        tiempoPago: '60 segundos',
        tasaExito: '96%',
        abandonoPago: '8%',
        satisfaccion: '4.5/5'
      }
    },
    paso4: {
      nombre: 'Confirmación',
      descripcion: 'Verificación y confirmación final',
      elementos: [
        'Resumen de compra',
        'Confirmación por email',
        'Acceso inmediato al curso',
        'Información de seguimiento',
        'Siguientes pasos'
      ],
      optimizaciones: [
        'Email de bienvenida inmediato',
        'Dashboard personalizado',
        'Onboarding guiado',
        'Comunidad de estudiantes',
        'Soporte dedicado'
      ],
      metricas: {
        tiempoConfirmacion: '15 segundos',
        tasaCompletacion: '98%',
        satisfaccion: '4.8/5',
        retencion: '95%'
      }
    }
  }

  // Análisis de dispositivos y responsive design
  const analisisDispositivos = {
    desktop: {
      porcentaje: '45%',
      caracteristicas: [
        'Pantallas grandes (1920x1080+)',
        'Navegación completa',
        'Múltiples pestañas',
        'Interacciones con mouse',
        'Teclado completo'
      ],
      optimizaciones: [
        'Layout de 3 columnas',
        'Hover effects avanzados',
        'Navegación por teclado',
        'Ventanas modales',
        'Drag & drop'
      ],
      metricas: {
        conversion: '22%',
        tiempoSesion: '8.5 minutos',
        tasaRebote: '28%',
        satisfaccion: '4.6/5'
      }
    },
    mobile: {
      porcentaje: '40%',
      caracteristicas: [
        'Pantallas pequeñas (375-414px)',
        'Navegación táctil',
        'Scroll vertical',
        'Gestos de swipe',
        'Conexión variable'
      ],
      optimizaciones: [
        'Diseño mobile-first',
        'Botones grandes (44px+)',
        'Carga optimizada',
        'Navegación simplificada',
        'PWA capabilities'
      ],
      metricas: {
        conversion: '18%',
        tiempoSesion: '6.2 minutos',
        tasaRebote: '35%',
        satisfaccion: '4.3/5'
      }
    },
    tablet: {
      porcentaje: '15%',
      caracteristicas: [
        'Pantallas medianas (768-1024px)',
        'Navegación híbrida',
        'Orientación variable',
        'Interacciones táctiles',
        'Productividad media'
      ],
      optimizaciones: [
        'Layout adaptativo',
        'Gestos multitáctiles',
        'Orientación automática',
        'Navegación híbrida',
        'Contenido optimizado'
      ],
      metricas: {
        conversion: '20%',
        tiempoSesion: '7.1 minutos',
        tasaRebote: '31%',
        satisfaccion: '4.5/5'
      }
    }
  }

  // Herramientas de testing y optimización
  const herramientasTesting = {
    abTesting: {
      nombre: 'A/B Testing',
      herramientas: ['Google Optimize', 'Optimizely', 'VWO', 'Unbounce'],
      casos: [
        'Títulos de landing pages',
        'Colores de botones CTA',
        'Formularios de checkout',
        'Imágenes de productos',
        'Textos de descripción'
      ],
      impacto: '+15-25% conversión'
    },
    heatmaps: {
      nombre: 'Heatmaps y Analytics',
      herramientas: ['Hotjar', 'Crazy Egg', 'Mouseflow', 'FullStory'],
      analisis: [
        'Mapas de calor de clics',
        'Scroll tracking',
        'Grabaciones de sesiones',
        'Análisis de comportamiento',
        'Identificación de fricciones'
      ],
      impacto: '+20% optimización'
    },
    userTesting: {
      nombre: 'User Testing',
      herramientas: ['UserTesting', 'Maze', 'Lookback', 'UserZoom'],
      metodologias: [
        'Testing remoto',
        'Entrevistas de usuario',
        'Card sorting',
        'Tree testing',
        'First click testing'
      ],
      impacto: '+30% satisfacción'
    },
    analytics: {
      nombre: 'Analytics Avanzado',
      herramientas: ['Google Analytics 4', 'Mixpanel', 'Amplitude', 'Segment'],
      metricas: [
        'Funnel de conversión',
        'Cohort analysis',
        'Retention curves',
        'Event tracking',
        'Custom dimensions'
      ],
      impacto: '+25% insights'
    }
  }

  // Casos de estudio de optimización
  const casosOptimizacion = {
    caso1: {
      titulo: 'Optimización de Checkout - Reducción de Abandono',
      problema: 'Alto abandono en paso 2 (45%)',
      solucion: 'Simplificación de formulario + autocompletado + validación en tiempo real',
      resultados: {
        abandonoAnterior: '45%',
        abandonoNuevo: '18%',
        reduccion: '-60%',
        conversion: '+28%'
      },
      implementacion: [
        'Reducción de campos de 12 a 6',
        'Autocompletado con Google Places',
        'Validación instantánea de email',
        'Indicador de progreso visual',
        'Guardado automático de progreso'
      ]
    },
    caso2: {
      titulo: 'Optimización Mobile - Mejora de Conversión',
      problema: 'Baja conversión en móviles (12%)',
      solucion: 'Rediseño mobile-first + PWA + optimización de carga',
      resultados: {
        conversionAnterior: '12%',
        conversionNueva: '21%',
        incremento: '+75%',
        tiempoCarga: '-40%'
      },
      implementacion: [
        'Diseño mobile-first completo',
        'Implementación de PWA',
        'Optimización de imágenes (WebP)',
        'Lazy loading de contenido',
        'Botones de 44px+ para touch'
      ]
    },
    caso3: {
      titulo: 'Personalización de Experiencia - Aumento de Engagement',
      problema: 'Bajo engagement en homepage (2.1 min)',
      solucion: 'Algoritmo de recomendaciones + contenido dinámico + segmentación',
      resultados: {
        engagementAnterior: '2.1 min',
        engagementNuevo: '4.8 min',
        incremento: '+128%',
        conversion: '+35%'
      },
      implementacion: [
        'Algoritmo de recomendaciones ML',
        'Contenido dinámico por perfil',
        'Segmentación por comportamiento',
        'A/B testing personalizado',
        'Dashboard de preferencias'
      ]
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Conversión General</h3>
            <Target className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">18.5%</div>
          <p className="text-sm text-white/70">Tasa de conversión promedio</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+12% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Tiempo de Carga</h3>
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">2.1s</div>
          <p className="text-sm text-white/70">Tiempo promedio de carga</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-35% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Satisfacción UX</h3>
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">4.6/5</div>
          <p className="text-sm text-white/70">Puntuación promedio</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+0.3 vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Principios de UX */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          Principios de UX Implementados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(principiosUX).map(([key, principio]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{principio.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{principio.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(principio.metricas).map(([metrica, valor]) => (
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

      {/* Proceso de Checkout */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <ShoppingCart className="w-5 h-5 text-green-400" />
          </div>
          Proceso de Checkout Optimizado
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(procesoCheckout).map(([paso, datos]) => (
            <div key={paso} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{datos.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{datos.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(datos.metricas).map(([metrica, valor]) => (
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

  const renderVistaDispositivos = () => (
    <div className="space-y-6">
      {/* Análisis por dispositivo */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Smartphone className="w-5 h-5 text-purple-400" />
          </div>
          Análisis por Dispositivo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(analisisDispositivos).map(([dispositivo, datos]) => (
            <div key={dispositivo} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white capitalize">{dispositivo}</h4>
                <span className="text-sm font-bold text-blue-400">{datos.porcentaje}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-2">Características:</p>
                <ul className="space-y-1">
                  {datos.caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{caracteristica}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-2">Optimizaciones:</p>
                <ul className="space-y-1">
                  {datos.optimizaciones.map((optimizacion, index) => (
                    <li key={index} className="flex items-start">
                      <Zap className="w-3 h-3 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{optimizacion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-1">
                {Object.entries(datos.metricas).map(([metrica, valor]) => (
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

  const renderVistaTesting = () => (
    <div className="space-y-6">
      {/* Herramientas de testing */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-orange-500/20 rounded-full mr-3">
            <Settings className="w-5 h-5 text-orange-400" />
          </div>
          Herramientas de Testing y Optimización
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasTesting).map(([categoria, datos]) => (
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
                <p className="text-sm text-white/70 mb-2">Aplicaciones:</p>
                <ul className="space-y-1">
                  {datos.casos || datos.analisis || datos.metodologias || datos.metricas ? 
                    (datos.casos || datos.analisis || datos.metodologias || datos.metricas).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-xs text-white/70">{item}</span>
                      </li>
                    )) : null}
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
      {/* Casos de optimización */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-full mr-3">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          Casos de Optimización UX/Checkout
        </h3>
        
        <div className="space-y-6">
          {Object.entries(casosOptimizacion).map(([caso, datos]) => (
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
              <h1 className="text-3xl font-bold text-white mb-2">UX y Checkout</h1>
              <p className="text-white/70">Optimización de experiencia de usuario y proceso de compra</p>
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
            onClick={() => setVistaActiva('dispositivos')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'dispositivos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-sm">Dispositivos</span>
          </button>
          <button
            onClick={() => setVistaActiva('testing')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'testing'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Testing</span>
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
      {vistaActiva === 'dispositivos' && renderVistaDispositivos()}
      {vistaActiva === 'testing' && renderVistaTesting()}
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
            <h4 className="font-semibold text-white mb-2">UX (User Experience)</h4>
            <p className="text-sm text-white/70">Experiencia de usuario. Percepción y respuesta del usuario al usar un producto o servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">UI (User Interface)</h4>
            <p className="text-sm text-white/70">Interfaz de usuario. Elementos visuales y de interacción que el usuario ve y toca.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Checkout</h4>
            <p className="text-sm text-white/70">Proceso de compra. Secuencia de pasos que sigue el usuario para completar una compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Conversion Rate</h4>
            <p className="text-sm text-white/70">Tasa de conversión. Porcentaje de usuarios que completan una acción deseada.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Bounce Rate</h4>
            <p className="text-sm text-white/70">Tasa de rebote. Porcentaje de usuarios que abandonan el sitio después de ver solo una página.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CTA (Call to Action)</h4>
            <p className="text-sm text-white/70">Llamada a la acción. Elemento que invita al usuario a realizar una acción específica.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">A/B Testing</h4>
            <p className="text-sm text-white/70">Pruebas A/B. Comparación de dos versiones de una página para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Heatmap</h4>
            <p className="text-sm text-white/70">Mapa de calor. Visualización de dónde los usuarios hacen clic o interactúan en una página.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Responsive Design</h4>
            <p className="text-sm text-white/70">Diseño responsivo. Adaptación del diseño a diferentes tamaños de pantalla y dispositivos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Mobile First</h4>
            <p className="text-sm text-white/70">Mobile primero. Enfoque de diseño que prioriza la experiencia móvil sobre desktop.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">PWA (Progressive Web App)</h4>
            <p className="text-sm text-white/70">Aplicación web progresiva. Sitio web que funciona como una aplicación nativa.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">WCAG (Web Content Accessibility Guidelines)</h4>
            <p className="text-sm text-white/70">Pautas de accesibilidad web. Estándares para hacer el contenido web accesible.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Friction</h4>
            <p className="text-sm text-white/70">Fricción. Obstáculos o dificultades que impiden que el usuario complete una acción.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Trust Signals</h4>
            <p className="text-sm text-white/70">Señales de confianza. Elementos que generan confianza en el usuario (certificados, testimonios).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">User Journey</h4>
            <p className="text-sm text-white/70">Viaje del usuario. Proceso completo que sigue un usuario desde el descubrimiento hasta la compra.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Persona</h4>
            <p className="text-sm text-white/70">Persona de usuario. Representación ficticia del usuario ideal basada en datos reales.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Wireframe</h4>
            <p className="text-sm text-white/70">Estructura visual. Esquema básico de la disposición de elementos en una página.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Prototype</h4>
            <p className="text-sm text-white/70">Prototipo. Versión interactiva de un diseño para probar funcionalidades.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Usability Testing</h4>
            <p className="text-sm text-white/70">Pruebas de usabilidad. Evaluación de la facilidad de uso de un producto con usuarios reales.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Card Sorting</h4>
            <p className="text-sm text-white/70">Clasificación de tarjetas. Técnica para organizar información según la mentalidad del usuario.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Tree Testing</h4>
            <p className="text-sm text-white/70">Prueba de árbol. Evaluación de la navegación y estructura de información de un sitio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">First Click Testing</h4>
            <p className="text-sm text-white/70">Prueba de primer clic. Evaluación de dónde los usuarios hacen clic primero en una tarea.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Session Recording</h4>
            <p className="text-sm text-white/70">Grabación de sesión. Registro de las acciones del usuario en una página web.</p>
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
            <h4 className="font-semibold text-white mb-2">Event Tracking</h4>
            <p className="text-sm text-white/70">Seguimiento de eventos. Registro de acciones específicas del usuario en el sitio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Custom Dimensions</h4>
            <p className="text-sm text-white/70">Dimensiones personalizadas. Métricas específicas definidas para análisis detallado.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UXCheckout
