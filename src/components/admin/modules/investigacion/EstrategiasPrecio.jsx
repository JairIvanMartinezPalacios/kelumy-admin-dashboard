// ========================================
// MÓDULO 2: ESTRATEGIAS DE PRECIO - KELUMY
// ========================================
// Previsualización de cómo implementar pricing strategies en la plataforma Kelumy
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import { 
  DollarSign, 
  Target, 
  TrendingUp, 
  Percent,
  ArrowLeft,
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
  Star,
  BookOpen,
  Lightbulb,
  Users,
  Zap,
  Shield,
  Award
} from 'lucide-react'

const EstrategiasPrecio = ({ onBack }) => {
  const [estrategiaActiva, setEstrategiaActiva] = useState('ancla')
  const [vistaActiva, setVistaActiva] = useState('resumen')

  // Las 6 estrategias principales de pricing
  const estrategias = {
    ancla: {
      id: 'ancla',
      nombre: 'Precio Ancla (Anchoring)',
      icono: Target,
      color: 'blue',
      descripcion: 'Establecer un precio de referencia alto para hacer que otros precios parezcan más atractivos',
      aplicacion: 'Ideal para cursos premium y bootcamps',
      ejemplos: ['Curso Master $8,900', 'Bootcamp $15,600', 'Certificación $3,580'],
      ventajas: [
        'Aumenta la percepción de valor',
        'Mejora la conversión de precios medios',
        'Posiciona la marca como premium',
        'Facilita la venta de paquetes'
      ],
      desventajas: [
        'Puede alejar a usuarios con presupuesto limitado',
        'Requiere justificación del valor',
        'Riesgo de percepción de sobreprecio'
      ],
      implementacionKelumy: {
        estructura: [
          { nivel: 'Ancla Premium', precio: '$8,900 MXN', descripcion: 'Bootcamp completo con mentoría 1:1' },
          { nivel: 'Precio Objetivo', precio: '$3,580 MXN', descripcion: 'Curso especializado con certificación' },
          { nivel: 'Precio Accesible', precio: '$1,780 MXN', descripcion: 'Curso individual estándar' }
        ],
        metricas: {
          conversionAncla: '5-8%',
          conversionObjetivo: '25-35%',
          conversionAccesible: '40-50%',
          ticketPromedio: '$2,800 MXN'
        }
      }
    },
    niveles: {
      id: 'niveles',
      nombre: 'Precios por Niveles (Tiered Pricing)',
      icono: TrendingUp,
      color: 'green',
      descripcion: 'Múltiples opciones de precio con diferentes niveles de valor',
      aplicacion: 'Perfecto para suscripciones y membresías',
      ejemplos: ['Básico $340', 'Profesional $520', 'Enterprise $1,780'],
      ventajas: [
        'Captura diferentes segmentos de mercado',
        'Facilita el upsell',
        'Reduce la fricción de decisión',
        'Maximiza el valor percibido'
      ],
      desventajas: [
        'Puede crear confusión de opciones',
        'Requiere segmentación clara',
        'Complejidad en la gestión'
      ],
      implementacionKelumy: {
        estructura: [
          { nivel: 'Estudiante', precio: '$340 MXN/mes', caracteristicas: ['Acceso básico', 'Certificaciones', 'Soporte comunitario'] },
          { nivel: 'Profesor', precio: '$520 MXN/mes', caracteristicas: ['Acceso completo', 'Herramientas docentes', 'Soporte prioritario'] },
          { nivel: 'Institucional', precio: '$1,780 MXN/mes', caracteristicas: ['Licencias múltiples', 'Dashboard administrativo', 'Soporte dedicado'] }
        ],
        metricas: {
          conversionBasico: '45%',
          conversionProfesional: '35%',
          conversionInstitucional: '20%',
          churnPromedio: '<8%'
        }
      }
    },
    psicologico: {
      id: 'psicologico',
      nombre: 'Precios Psicológicos',
      icono: Percent,
      color: 'purple',
      descripcion: 'Usar precios que terminen en 9, 7 o números específicos para influir en la percepción',
      aplicacion: 'Efectivo para cursos individuales y micro-transacciones',
      ejemplos: ['$1,799 en lugar de $1,800', '$99 en lugar de $100', '$2,997 en lugar de $3,000'],
      ventajas: [
        'Aumenta la percepción de descuento',
        'Mejora la conversión en 15-20%',
        'Fácil de implementar',
        'Funciona en todos los segmentos'
      ],
      desventajas: [
        'Puede parecer manipulación',
        'Efecto se reduce con el tiempo',
        'No funciona en todos los contextos'
      ],
      implementacionKelumy: {
        estructura: [
          { tipo: 'Micro-curso', precio: '$99 MXN', descripcion: 'Lección específica de 30 min' },
          { tipo: 'Curso Individual', precio: '$1,799 MXN', descripcion: 'Curso completo con certificación' },
          { tipo: 'Bootcamp', precio: '$2,997 MXN', descripcion: 'Programa intensivo de 8 semanas' }
        ],
        metricas: {
          mejoraConversion: '+18%',
          ticketPromedio: '$1,200 MXN',
          satisfaccion: '4.2/5',
          refundRate: '<2%'
        }
      }
    },
    bundles: {
      id: 'bundles',
      nombre: 'Bundles o Combos',
      icono: Award,
      color: 'orange',
      descripcion: 'Agrupar productos relacionados con descuento para aumentar el valor percibido',
      aplicacion: 'Ideal para rutas de aprendizaje y especializaciones',
      ejemplos: ['Ruta Frontend $2,680', 'Especialización Data Science $4,580', 'Master Bundle $6,980'],
      ventajas: [
        'Aumenta el ticket promedio',
        'Mejora la retención',
        'Reduce el churn',
        'Maximiza el LTV'
      ],
      desventajas: [
        'Puede canibalizar ventas individuales',
        'Requiere coordinación de contenido',
        'Complejidad en la gestión'
      ],
      implementacionKelumy: {
        estructura: [
          { bundle: 'Ruta Frontend', precio: '$2,680 MXN', cursos: 4, ahorro: '30%', duracion: '16 semanas' },
          { bundle: 'Especialización Data Science', precio: '$4,580 MXN', cursos: 6, ahorro: '25%', duracion: '24 semanas' },
          { bundle: 'Master Bundle STEM', precio: '$6,980 MXN', cursos: 8, ahorro: '35%', duracion: '32 semanas' }
        ],
        metricas: {
          conversionBundle: '28%',
          ticketPromedio: '$4,200 MXN',
          ltv: '$8,500 MXN',
          churn: '<5%'
        }
      }
    },
    dinamico: {
      id: 'dinamico',
      nombre: 'Precios Dinámicos',
      icono: Zap,
      color: 'red',
      descripcion: 'Ajustar precios basado en demanda, temporada o comportamiento del usuario',
      aplicacion: 'Efectivo para promociones y eventos especiales',
      ejemplos: ['Descuento por temporada', 'Precio por urgencia', 'Descuento por volumen'],
      ventajas: [
        'Maximiza ingresos por segmento',
        'Aumenta la conversión en momentos clave',
        'Optimiza la ocupación',
        'Mejora la competitividad'
      ],
      desventajas: [
        'Complejidad técnica alta',
        'Puede crear confusión',
        'Requiere análisis constante'
      ],
      implementacionKelumy: {
        estructura: [
          { tipo: 'Temporada Alta', precio: 'Precio completo', descripcion: 'Enero-Marzo, Agosto-Octubre' },
          { tipo: 'Temporada Media', precio: '-15% descuento', descripcion: 'Abril-Julio, Noviembre' },
          { tipo: 'Temporada Baja', precio: '-25% descuento', descripcion: 'Diciembre, Enero' }
        ],
        metricas: {
          ingresosTemporadaAlta: '+40%',
          conversionTemporadaBaja: '+60%',
          ticketPromedioAnual: '$2,200 MXN',
          satisfaccion: '4.1/5'
        }
      }
    },
    freemium: {
      id: 'freemium',
      nombre: 'Freemium',
      icono: Shield,
      color: 'indigo',
      descripcion: 'Ofrecer contenido gratuito para atraer usuarios y convertir a premium',
      aplicacion: 'Perfecto para captación de leads y demostración de valor',
      ejemplos: ['Curso gratuito', 'Lección de muestra', 'Certificación básica gratuita'],
      ventajas: [
        'Reduce la fricción de entrada',
        'Demuestra el valor del contenido',
        'Aumenta la base de usuarios',
        'Facilita la conversión'
      ],
      desventajas: [
        'Alto costo de adquisición',
        'Baja tasa de conversión',
        'Requiere contenido de calidad'
      ],
      implementacionKelumy: {
        estructura: [
          { nivel: 'Gratuito', precio: '$0 MXN', caracteristicas: ['1 curso básico', 'Certificación simple', 'Soporte comunitario'] },
          { nivel: 'Premium', precio: '$520 MXN/mes', caracteristicas: ['Acceso completo', 'Certificaciones avanzadas', 'Soporte prioritario'] },
          { nivel: 'Enterprise', precio: '$1,780 MXN/mes', caracteristicas: ['Licencias múltiples', 'Dashboard administrativo', 'Soporte dedicado'] }
        ],
        metricas: {
          conversionFreemium: '12-15%',
          ltvFreemium: '$3,200 MXN',
          churnFreemium: '<12%',
          tiempoConversion: '45 días'
        }
      }
    }
  }

  const estrategia = estrategias[estrategiaActiva]
  const IconoEstrategia = estrategia.icono

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Estrategias Analizadas</h3>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">6</p>
          <p className="text-white/70 text-sm">Estrategias principales</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Casos de Estudio</h3>
            <BookOpen className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">15</p>
          <p className="text-white/70 text-sm">Plataformas analizadas</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Mejora Promedio</h3>
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">+22%</p>
          <p className="text-white/70 text-sm">En conversión</p>
        </div>
      </div>

      {/* Comparación de estrategias */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6">Comparación de Estrategias</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-white/70 py-3">Estrategia</th>
                <th className="text-left text-white/70 py-3">Mejora Conversión</th>
                <th className="text-left text-white/70 py-3">Complejidad</th>
                <th className="text-left text-white/70 py-3">Aplicación</th>
                <th className="text-left text-white/70 py-3">Recomendación</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(estrategias).map((estr) => (
                <tr key={estr.id} className="border-b border-white/10">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-${estr.color}-500/20 rounded-full`}>
                        <estr.icono className={`w-4 h-4 text-${estr.color}-400`} />
                      </div>
                      <span className="text-white font-medium">{estr.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 text-white/70">{estr.implementacionKelumy.metricas.mejoraConversion || '+15-25%'}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      estr.id === 'dinamico' ? 'bg-red-500/20 text-red-400' :
                      estr.id === 'bundles' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {estr.id === 'dinamico' ? 'Alta' : estr.id === 'bundles' ? 'Media' : 'Baja'}
                    </span>
                  </td>
                  <td className="py-3 text-white/70">{estr.aplicacion}</td>
                  <td className="py-3">
                    {estr.id === 'psicologico' ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        ⭐ Recomendado
                      </span>
                    ) : estr.id === 'niveles' ? (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                        ✅ Principal
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                        🔄 Complementario
                      </span>
                    )}
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
      {/* Información de la estrategia seleccionada */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-6">
          <div className={`p-3 bg-${estrategia.color}-500/20 rounded-full mr-4`}>
            <IconoEstrategia className={`w-6 h-6 text-${estrategia.color}-400`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{estrategia.nombre}</h2>
            <p className="text-white/70">{estrategia.descripcion}</p>
          </div>
        </div>

        {/* Aplicación y ejemplos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold text-white mb-2">🎯 Aplicación en Kelumy</h3>
            <p className="text-white/70">{estrategia.aplicacion}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold text-white mb-2">📱 Ejemplos Reales</h3>
            <div className="flex flex-wrap gap-2">
              {estrategia.ejemplos.map((ejemplo, index) => (
                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                  {ejemplo}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ventajas y desventajas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-400 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Ventajas
            </h3>
            <ul className="space-y-2">
              {estrategia.ventajas.map((ventaja, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{ventaja}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-400 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Desventajas
            </h3>
            <ul className="space-y-2">
              {estrategia.desventajas.map((desventaja, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{desventaja}</span>
                </li>
              ))}
            </ul>
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
        
        {/* Estructura de precios */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">💰 Estructura de Precios</h4>
          <div className="space-y-3">
            {estrategia.implementacionKelumy.estructura.map((item, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{item.nivel || item.tipo || item.bundle}</span>
                  <span className="font-bold text-green-400">{item.precio}</span>
                </div>
                {item.descripcion && (
                  <p className="text-xs text-white/70 mt-1">{item.descripcion}</p>
                )}
                {item.caracteristicas && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {item.caracteristicas.map((caracteristica, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {item.cursos && (
                  <p className="text-xs text-white/70 mt-1">{item.cursos} cursos - Ahorro: {item.ahorro}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Métricas clave */}
        <div>
          <h4 className="font-semibold text-white mb-3">📊 Métricas Clave</h4>
          <div className="space-y-2">
            {Object.entries(estrategia.implementacionKelumy.metricas).map(([metrica, valor]) => (
              <div key={metrica} className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/10">
                <span className="text-sm font-medium text-white/70 capitalize">
                  {metrica.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-bold text-blue-400">{valor}</span>
              </div>
            ))}
          </div>
        </div>
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
            <h1 className="text-3xl font-bold text-white">Estrategias de Precio</h1>
            <p className="text-white/70">Previsualización de pricing strategies para Kelumy</p>
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
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
            vistaActiva === 'resumen'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Resumen</span>
        </button>
        <button
          onClick={() => setVistaActiva('detallada')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
            vistaActiva === 'detallada'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Detallada</span>
        </button>
      </div>

      {/* Selector de estrategias */}
      {vistaActiva === 'detallada' && (
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            {Object.values(estrategias).map((estr) => {
              const Icono = estr.icono
              return (
                <button
                  key={estr.id}
                  onClick={() => setEstrategiaActiva(estr.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    estrategiaActiva === estr.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icono className="w-4 h-4" />
                  <span className="font-medium text-sm">{estr.nombre.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Contenido de la vista */}
      {vistaActiva === 'resumen' ? renderVistaResumen() : renderVistaDetallada()}

      {/* Glosario de Términos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <BookOpen className="w-5 h-5 text-green-400" />
          </div>
          Glosario de Términos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CTR (Click-Through Rate)</h4>
            <p className="text-sm text-white/70">Tasa de clics. Porcentaje de personas que hacen clic en un anuncio o enlace respecto al total que lo ve.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROI (Return on Investment)</h4>
            <p className="text-sm text-white/70">Retorno de inversión. Beneficio obtenido por cada peso invertido en marketing o publicidad.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">A/B Testing</h4>
            <p className="text-sm text-white/70">Pruebas A/B. Comparación de dos versiones de una página o elemento para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Conversion Rate</h4>
            <p className="text-sm text-white/70">Tasa de conversión. Porcentaje de visitantes que completan una acción deseada (compra, registro, etc.).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Bounce Rate</h4>
            <p className="text-sm text-white/70">Tasa de rebote. Porcentaje de visitantes que abandonan el sitio después de ver solo una página.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">LTV/CAC Ratio</h4>
            <p className="text-sm text-white/70">Relación entre valor de vida del cliente y costo de adquisición. Idealmente debe ser 3:1 o mayor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Elasticity</h4>
            <p className="text-sm text-white/70">Elasticidad del precio. Sensibilidad de la demanda a los cambios en el precio de un producto.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Customer Segment</h4>
            <p className="text-sm text-white/70">Segmento de clientes. Grupo de clientes con características similares que requieren estrategias de marketing específicas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Price Anchoring</h4>
            <p className="text-sm text-white/70">Anclaje de precios. Técnica psicológica que usa un precio de referencia para influir en la percepción de valor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Dynamic Pricing</h4>
            <p className="text-sm text-white/70">Precios dinámicos. Estrategia que ajusta precios automáticamente según demanda, competencia y otros factores.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Value-based Pricing</h4>
            <p className="text-sm text-white/70">Precios basados en valor. Estrategia que fija precios según el valor percibido por el cliente, no en costos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Tiered Pricing</h4>
            <p className="text-sm text-white/70">Precios por niveles. Estructura de precios con diferentes niveles de servicio y características.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Freemium</h4>
            <p className="text-sm text-white/70">Modelo freemium. Ofrece servicios básicos gratuitos con opciones premium de pago.</p>
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
            <h4 className="font-semibold text-white mb-2">Competitive Pricing</h4>
            <p className="text-sm text-white/70">Precios competitivos. Estrategia que fija precios basándose en los precios de la competencia.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Psychological Pricing</h4>
            <p className="text-sm text-white/70">Precios psicológicos. Técnicas que usan la psicología para influir en la percepción del precio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Bundle Pricing</h4>
            <p className="text-sm text-white/70">Precios en paquetes. Estrategia que agrupa productos o servicios con descuento para aumentar ventas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Cross-sell</h4>
            <p className="text-sm text-white/70">Venta cruzada. Técnica para vender productos complementarios a clientes existentes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Upsell</h4>
            <p className="text-sm text-white/70">Venta ascendente. Técnica para vender versiones superiores o más caras a clientes existentes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Discount Strategy</h4>
            <p className="text-sm text-white/70">Estrategia de descuentos. Uso de rebajas y promociones para estimular ventas y fidelización.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Revenue Optimization</h4>
            <p className="text-sm text-white/70">Optimización de ingresos. Proceso de maximizar ingresos mediante análisis de datos y ajustes de precios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Profit Margin</h4>
            <p className="text-sm text-white/70">Margen de ganancia. Diferencia entre el precio de venta y el costo, expresada como porcentaje.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Customer Persona</h4>
            <p className="text-sm text-white/70">Persona de cliente. Representación ficticia del cliente ideal basada en datos reales y comportamientos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Value Proposition</h4>
            <p className="text-sm text-white/70">Propuesta de valor. Declaración que explica por qué un cliente debería elegir tu producto o servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Market Research</h4>
            <p className="text-sm text-white/70">Investigación de mercado. Proceso de recopilar información sobre clientes, competencia y tendencias del mercado.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstrategiasPrecio
