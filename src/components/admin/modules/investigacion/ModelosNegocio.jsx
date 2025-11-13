// ========================================
// MÓDULO 1: MODELOS DE NEGOCIO - KELUMY
// ========================================
// Análisis detallado de los 5 modelos principales de e-commerce educativo
// desarrollados específicamente para la plataforma Kelumy

import React, { useState } from 'react'
import { 
  CreditCard, 
  ShoppingCart, 
  Target, 
  Zap, 
  Building,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  Star,
  BookOpen,
  Lightbulb,
  Settings
} from 'lucide-react'

const ModelosNegocio = ({ onBack }) => {
  const [modeloActivo, setModeloActivo] = useState('suscripcion')
  const [vistaActiva, setVistaActiva] = useState('resumen')

  // Datos de los 5 modelos principales
  const modelos = {
    suscripcion: {
      id: 'suscripcion',
      nombre: 'Modelo de Suscripción (SaaS Educativo)',
      icono: CreditCard,
      color: 'blue',
      descripcion: 'Acceso ilimitado a catálogo por mes/año con renovación automática',
      precio: '$520 MXN/mes',
      ejemplos: ['Platzi', 'Coursera Plus', 'LinkedIn Learning'],
      ventajas: [
        'Previsibilidad de ingresos recurrentes',
        'Mejor LTV (Lifetime Value) y retención',
        'Facilita inversión continua en contenido',
        'Menor fricción para el usuario',
        'Datos de uso para personalización'
      ],
      desventajas: [
        'Requiere oferta constante de valor',
        'Alta demanda de churn management',
        'Necesita buen sistema de billing',
        'Competencia por tiempo del usuario',
        'Dependencia de contenido fresco'
      ],
      aplicacionKelumy: {
        planes: [
          { nombre: 'Plan Estudiante', precio: '$340 MXN/mes', usuarios: '1-2', caracteristicas: ['Acceso básico', 'Certificaciones', 'Soporte comunitario'] },
          { nombre: 'Plan Profesor', precio: '$520 MXN/mes', usuarios: '1-3', caracteristicas: ['Acceso completo', 'Herramientas docentes', 'Soporte prioritario'] },
          { nombre: 'Plan Familiar', precio: '$700 MXN/mes', usuarios: '3-6', caracteristicas: ['Acceso familiar', 'Control parental', 'Múltiples perfiles'] },
          { nombre: 'Plan Institucional', precio: '$1,780 MXN/mes', usuarios: '10-50', caracteristicas: ['Licencias múltiples', 'Dashboard administrativo', 'Soporte dedicado'] }
        ],
        metricas: {
          churn: '<5% mensual',
          ltv: '$10,800+ MXN',
          cac: '$450 MXN',
          arpu: '$520 MXN',
          mrr: '$45,000 MXN'
        }
      }
    },
    marketplace: {
      id: 'marketplace',
      nombre: 'Marketplace / Venta por Curso',
      icono: ShoppingCart,
      color: 'green',
      descripcion: 'Cada curso se compra por separado con descuentos frecuentes',
      precio: '$1,780 MXN promedio',
      ejemplos: ['Udemy', 'Domestika', 'Skillshare'],
      ventajas: [
        'Rápida expansión de catálogo',
        'Monetización temprana por curso',
        'Atractivo para usuarios que buscan ofertas',
        'Menor compromiso inicial',
        'Flexibilidad de precios'
      ],
      desventajas: [
        'Dependencia de promociones',
        'Menor control sobre calidad',
        'Competencia de precios',
        'Difícil retención a largo plazo',
        'Alto costo de adquisición'
      ],
      aplicacionKelumy: {
        estructura: [
          { tipo: 'Curso Individual', precio: '$1,780 MXN', comision: '30%', duracion: '4-8 semanas' },
          { tipo: 'Ruta Completa', precio: '$2,680 MXN', comision: '25%', duracion: '12-16 semanas' },
          { tipo: 'Bootcamp Premium', precio: '$3,580 MXN', comision: '20%', duracion: '20-24 semanas' }
        ],
        metricas: {
          conversion: '>15%',
          takeRate: '25% promedio',
          frecuenciaCompra: '2-3 veces/año',
          ticketPromedio: '$1,780 MXN',
          refundRate: '<3%'
        }
      }
    },
    hibrido: {
      id: 'hibrido',
      nombre: 'Modelo Híbrido (Suscripción + Venta Individual)',
      icono: Target,
      color: 'purple',
      descripcion: 'Combina suscripción base + cursos premium individuales',
      precio: 'Variable',
      ejemplos: ['MasterClass', 'CreativeLive', 'Kelumy (Recomendado)'],
      ventajas: [
        'Diversificación de ingresos',
        'Flexibilidad para atraer usuarios',
        'Balance entre adquisición y retención',
        'Segmentación de mercado',
        'Optimización de LTV'
      ],
      desventajas: [
        'Mayor complejidad operativa',
        'Riesgo de canibalización',
        'Necesita segmentación clara',
        'Gestión de múltiples precios',
        'Confusión del usuario'
      ],
      aplicacionKelumy: {
        estructura: [
          { nivel: 'Base (Suscripción)', contenido: 'Cursos fundamentales', precio: '$520 MXN/mes', caracteristicas: ['Acceso básico', 'Contenido estándar'] },
          { nivel: 'Premium (Individual)', contenido: 'Cursos especializados', precio: '$1,780-3,580 MXN', caracteristicas: ['Contenido avanzado', 'Mentoría personalizada'] },
          { nivel: 'Bootcamp', contenido: 'Programas intensivos', precio: '$5,360-8,900 MXN', caracteristicas: ['Programa completo', 'Certificación profesional'] }
        ],
        metricas: {
          conversionSuscripcion: '>25%',
          upsellPremium: '>15%',
          ltvCombinado: '>14,400 MXN',
          arpu: '$1,200 MXN',
          churn: '<8%'
        }
      }
    },
    micropagos: {
      id: 'micropagos',
      nombre: 'Micro-pagos / Micro-learning',
      icono: Zap,
      color: 'orange',
      descripcion: 'Lecciones individuales o micro-certificados a bajo precio',
      precio: '$90-180 MXN',
      ejemplos: ['Skillshare', 'Udemy (algunos cursos)', 'Pluralsight'],
      ventajas: [
        'Bajo umbral de entrada',
        'Bueno para pruebas de contenido',
        'Alto volumen de transacciones',
        'Accesible para todos',
        'Rápida implementación'
      ],
      desventajas: [
        'Alto costo operativo',
        'Difícil escalar LTV',
        'Muchas transacciones pequeñas',
        'Dependencia de volumen',
        'Margen reducido'
      ],
      aplicacionKelumy: {
        productos: [
          { tipo: 'Micro-lección', precio: '$90 MXN', duracion: '15-30 min', caracteristicas: ['Lección específica', 'Certificado básico'] },
          { tipo: 'Mini-curso', precio: '$180 MXN', duracion: '1-2 horas', caracteristicas: ['Curso corto', 'Proyecto práctico'] },
          { tipo: 'Certificación rápida', precio: '$270 MXN', duracion: '2-3 horas', caracteristicas: ['Certificación', 'Evaluación incluida'] }
        ],
        metricas: {
          frecuenciaCompra: '2-3 veces/año',
          ticketPromedio: '$108 MXN',
          conversionLead: '>50%',
          ltv: '$1,200 MXN',
          churn: '<15%'
        }
      }
    },
    b2b: {
      id: 'b2b',
      nombre: 'B2B / Licenciamiento Corporativo',
      icono: Building,
      color: 'indigo',
      descripcion: 'Licencias a empresas, instituciones educativas o gobiernos',
      precio: '$44,460-267,300 MXN/año',
      ejemplos: ['Platzi for Business', 'Coursera for Enterprise', 'LinkedIn Learning'],
      ventajas: [
        'Ingresos recurrentes grandes',
        'Menor sensibilidad a promociones',
        'Contratos a largo plazo',
        'Alto valor por cliente',
        'Estabilidad financiera'
      ],
      desventajas: [
        'Ciclo de ventas largo',
        'Negociación y soporte dedicado',
        'Requiere producto robusto',
        'Dependencia de pocos clientes',
        'Complejidad legal'
      ],
      aplicacionKelumy: {
        paquetes: [
          { nombre: 'Básico', precio: '$44,460 MXN/año', usuarios: '10-25', caracteristicas: ['Acceso básico', 'Soporte estándar'] },
          { nombre: 'Profesional', precio: '$89,100 MXN/año', usuarios: '25-100', caracteristicas: ['Acceso completo', 'Soporte prioritario'] },
          { nombre: 'Enterprise', precio: '$267,300 MXN/año', usuarios: '100-500', caracteristicas: ['Acceso ilimitado', 'Soporte dedicado'] }
        ],
        metricas: {
          tasaCierre: '>20%',
          acv: '$133,650 MXN promedio',
          churnCorporativo: '<2% anual',
          ltv: '$400,000+ MXN',
          salesCycle: '3-6 meses'
        }
      }
    }
  }

  const modelo = modelos[modeloActivo]
  const IconoModelo = modelo.icono

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Modelos Analizados</h3>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">5</p>
          <p className="text-white/70 text-sm">Modelos principales</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Casos de Estudio</h3>
            <BookOpen className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">12</p>
          <p className="text-white/70 text-sm">Plataformas analizadas</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Métricas</h3>
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">25</p>
          <p className="text-white/70 text-sm">KPIs identificados</p>
        </div>
      </div>

      {/* Comparación de modelos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6">Comparación de Modelos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-white/70 py-3">Modelo</th>
                <th className="text-left text-white/70 py-3">Precio Promedio</th>
                <th className="text-left text-white/70 py-3">LTV</th>
                <th className="text-left text-white/70 py-3">Complejidad</th>
                <th className="text-left text-white/70 py-3">Recomendación</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(modelos).map((mod) => (
                <tr key={mod.id} className="border-b border-white/10">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-${mod.color}-500/20 rounded-full`}>
                        <mod.icono className={`w-4 h-4 text-${mod.color}-400`} />
                      </div>
                      <span className="text-white font-medium">{mod.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 text-white/70">{mod.precio}</td>
                  <td className="py-3 text-white/70">{mod.aplicacionKelumy.metricas.ltv || 'Variable'}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mod.id === 'b2b' ? 'bg-red-500/20 text-red-400' :
                      mod.id === 'hibrido' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {mod.id === 'b2b' ? 'Alta' : mod.id === 'hibrido' ? 'Media' : 'Baja'}
                    </span>
                  </td>
                  <td className="py-3">
                    {mod.id === 'hibrido' ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        ⭐ Recomendado
                      </span>
                    ) : mod.id === 'suscripcion' ? (
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
      {/* Información del modelo seleccionado */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-6">
          <div className={`p-3 bg-${modelo.color}-500/20 rounded-full mr-4`}>
            <IconoModelo className={`w-6 h-6 text-${modelo.color}-400`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{modelo.nombre}</h2>
            <p className="text-white/70">{modelo.descripcion}</p>
          </div>
        </div>

        {/* Precio y ejemplos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold text-white mb-2">💰 Precio Promedio</h3>
            <p className="text-2xl font-bold text-green-400">{modelo.precio}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold text-white mb-2">📱 Ejemplos Reales</h3>
            <div className="flex flex-wrap gap-2">
              {modelo.ejemplos.map((ejemplo, index) => (
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
              {modelo.ventajas.map((ventaja, index) => (
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
              {modelo.desventajas.map((desventaja, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{desventaja}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Aplicación en Kelumy */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-orange-500/20 rounded-full mr-3">
            <Star className="w-5 h-5 text-orange-400" />
          </div>
          Aplicación en Kelumy
        </h3>
        
        {/* Estructura de precios */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">💵 Estructura de Precios</h4>
          <div className="space-y-3">
            {modelo.aplicacionKelumy.planes && modelo.aplicacionKelumy.planes.map((plan, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{plan.nombre}</span>
                  <span className="font-bold text-green-400">{plan.precio}</span>
                </div>
                {plan.usuarios && (
                  <p className="text-xs text-white/70 mt-1">{plan.usuarios} usuarios</p>
                )}
                {plan.caracteristicas && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {plan.caracteristicas.map((caracteristica, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {modelo.aplicacionKelumy.estructura && modelo.aplicacionKelumy.estructura.map((item, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{item.nivel || item.tipo}</span>
                  <span className="font-bold text-green-400">{item.precio}</span>
                </div>
                {item.contenido && (
                  <p className="text-xs text-white/70 mt-1">{item.contenido}</p>
                )}
                {item.comision && (
                  <p className="text-xs text-white/70 mt-1">Comisión: {item.comision}</p>
                )}
              </div>
            ))}
            {modelo.aplicacionKelumy.productos && modelo.aplicacionKelumy.productos.map((producto, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{producto.tipo}</span>
                  <span className="font-bold text-green-400">{producto.precio}</span>
                </div>
                <p className="text-xs text-white/70 mt-1">{producto.duracion}</p>
              </div>
            ))}
            {modelo.aplicacionKelumy.paquetes && modelo.aplicacionKelumy.paquetes.map((paquete, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{paquete.nombre}</span>
                  <span className="font-bold text-green-400">{paquete.precio}</span>
                </div>
                <p className="text-xs text-white/70 mt-1">{paquete.usuarios} usuarios</p>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas clave */}
        <div>
          <h4 className="font-semibold text-white mb-3">📊 Métricas Clave</h4>
          <div className="space-y-2">
            {Object.entries(modelo.aplicacionKelumy.metricas).map(([metrica, valor]) => (
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
            <h1 className="text-3xl font-bold text-white">Modelos de Negocio</h1>
            <p className="text-white/70">Análisis de los 5 modelos principales de e-commerce educativo</p>
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

      {/* Selector de modelos */}
      {vistaActiva === 'detallada' && (
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            {Object.values(modelos).map((mod) => {
              const Icono = mod.icono
              return (
                <button
                  key={mod.id}
                  onClick={() => setModeloActivo(mod.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    modeloActivo === mod.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icono className="w-4 h-4" />
                  <span className="font-medium text-sm">{mod.nombre.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Contenido de la vista */}
      {vistaActiva === 'resumen' ? renderVistaResumen() : renderVistaDetallada()}
    </div>
  )
}

export default ModelosNegocio
