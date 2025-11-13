// ========================================
// MODELOS DE NEGOCIO - DEMO KELUMY
// ========================================
// Componente para mostrar los diferentes modelos de negocio
// desarrollados en la investigación de e-commerce educativo

import React, { useState } from 'react'
import { 
  CreditCard, 
  ShoppingCart, 
  Users, 
  Building, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  DollarSign,
  BarChart3,
  Star,
  Target,
  Zap
} from 'lucide-react'

const ModelosNegocioDemo = () => {
  const [modeloActivo, setModeloActivo] = useState('suscripcion')

  // Datos de los modelos de negocio basados en la investigación
  const modelos = {
    suscripcion: {
      id: 'suscripcion',
      nombre: 'Suscripción (SaaS Educativo)',
      icono: CreditCard,
      color: 'blue',
      descripcion: 'Acceso ilimitado a catálogo por mes/año',
      precio: '$520 MXN/mes',
      ejemplos: ['Platzi', 'Coursera Plus', 'LinkedIn Learning'],
      ventajas: [
        'Previsibilidad de ingresos',
        'Mejor LTV y retención',
        'Facilita inversión en contenido'
      ],
      desventajas: [
        'Requiere oferta constante de valor',
        'Alta demanda de churn management',
        'Necesita buen sistema de billing'
      ],
      aplicacionKelumy: {
        planes: [
          { nombre: 'Plan Estudiante', precio: '$340 MXN/mes', usuarios: '1-2' },
          { nombre: 'Plan Profesor', precio: '$520 MXN/mes', usuarios: '1-3' },
          { nombre: 'Plan Familiar', precio: '$700 MXN/mes', usuarios: '3-6' },
          { nombre: 'Plan Institucional', precio: '$1,780 MXN/mes', usuarios: '10-50' }
        ],
        metricas: {
          churn: '<5% mensual',
          ltv: '$10,800+ MXN',
          cac: '$450 MXN'
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
        'Atractivo para usuarios que buscan ofertas'
      ],
      desventajas: [
        'Dependencia de promociones',
        'Menor control sobre calidad',
        'Competencia de precios'
      ],
      aplicacionKelumy: {
        estructura: [
          { tipo: 'Curso Individual', precio: '$1,780 MXN', comision: '30%' },
          { tipo: 'Ruta Completa', precio: '$2,680 MXN', comision: '25%' },
          { tipo: 'Bootcamp Premium', precio: '$3,580 MXN', comision: '20%' }
        ],
        metricas: {
          conversion: '>15%',
          takeRate: '25% promedio',
          frecuenciaCompra: '2-3 veces/año'
        }
      }
    },
    hibrido: {
      id: 'hibrido',
      nombre: 'Híbrido (Suscripción + Venta Individual)',
      icono: Target,
      color: 'purple',
      descripcion: 'Combina suscripción base + cursos premium individuales',
      precio: 'Variable',
      ejemplos: ['MasterClass', 'CreativeLive', 'Kelumy (Recomendado)'],
      ventajas: [
        'Diversificación de ingresos',
        'Flexibilidad para atraer usuarios',
        'Balance entre adquisición y retención'
      ],
      desventajas: [
        'Mayor complejidad operativa',
        'Riesgo de canibalización',
        'Necesita segmentación clara'
      ],
      aplicacionKelumy: {
        estructura: [
          { nivel: 'Base (Suscripción)', contenido: 'Cursos fundamentales', precio: '$520 MXN/mes' },
          { nivel: 'Premium (Individual)', contenido: 'Cursos especializados', precio: '$1,780-3,580 MXN' },
          { nivel: 'Bootcamp', contenido: 'Programas intensivos', precio: '$5,360-8,900 MXN' }
        ],
        metricas: {
          conversionSuscripcion: '>25%',
          upsellPremium: '>15%',
          ltvCombinado: '>14,400 MXN'
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
        'Alto volumen de transacciones'
      ],
      desventajas: [
        'Alto costo operativo',
        'Difícil escalar LTV',
        'Muchas transacciones pequeñas'
      ],
      aplicacionKelumy: {
        productos: [
          { tipo: 'Micro-lección', precio: '$90 MXN', duracion: '15-30 min' },
          { tipo: 'Mini-curso', precio: '$180 MXN', duracion: '1-2 horas' },
          { tipo: 'Certificación rápida', precio: '$270 MXN', duracion: '2-3 horas' }
        ],
        metricas: {
          frecuenciaCompra: '2-3 veces/año',
          ticketPromedio: '$108 MXN',
          conversionLead: '>50%'
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
        'Contratos a largo plazo'
      ],
      desventajas: [
        'Ciclo de ventas largo',
        'Negociación y soporte dedicado',
        'Requiere producto robusto'
      ],
      aplicacionKelumy: {
        paquetes: [
          { nombre: 'Básico', precio: '$44,460 MXN/año', usuarios: '10-25' },
          { nombre: 'Profesional', precio: '$89,100 MXN/año', usuarios: '25-100' },
          { nombre: 'Enterprise', precio: '$267,300 MXN/año', usuarios: '100-500' }
        ],
        metricas: {
          tasaCierre: '>20%',
          acv: '$133,650 MXN promedio',
          churnCorporativo: '<2% anual'
        }
      }
    }
  }

  const modelo = modelos[modeloActivo]
  const IconoModelo = modelo.icono

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📚 Modelos de Negocio - Kelumy
          </h1>
          <p className="text-gray-600">
            Implementación visual de los modelos de negocio desarrollados en la investigación de e-commerce educativo
          </p>
        </div>

        {/* Selector de Modelos */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.values(modelos).map((mod) => {
              const Icono = mod.icono
              return (
                <button
                  key={mod.id}
                  onClick={() => setModeloActivo(mod.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    modeloActivo === mod.id
                      ? `border-${mod.color}-500 bg-${mod.color}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <Icono className={`w-8 h-8 mb-2 ${
                      modeloActivo === mod.id ? `text-${mod.color}-600` : 'text-gray-500'
                    }`} />
                    <h3 className="font-semibold text-sm mb-1">{mod.nombre}</h3>
                    <p className="text-xs text-gray-500">{mod.precio}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Contenido del Modelo Seleccionado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <IconoModelo className={`w-8 h-8 text-${modelo.color}-600 mr-3`} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{modelo.nombre}</h2>
                  <p className="text-gray-600">{modelo.descripcion}</p>
                </div>
              </div>

              {/* Precio y Ejemplos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">💰 Precio Promedio</h3>
                  <p className="text-2xl font-bold text-green-600">{modelo.precio}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📱 Ejemplos Reales</h3>
                  <div className="flex flex-wrap gap-2">
                    {modelo.ejemplos.map((ejemplo, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {ejemplo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ventajas y Desventajas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Ventajas
                  </h3>
                  <ul className="space-y-2">
                    {modelo.ventajas.map((ventaja, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{ventaja}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-700 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Desventajas
                  </h3>
                  <ul className="space-y-2">
                    {modelo.desventajas.map((desventaja, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{desventaja}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Aplicación en Kelumy */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Aplicación en Kelumy
              </h3>
              
              {/* Estructura de Precios */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">💵 Estructura de Precios</h4>
                <div className="space-y-3">
                  {modelo.aplicacionKelumy.planes && modelo.aplicacionKelumy.planes.map((plan, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{plan.nombre}</span>
                        <span className="font-bold text-green-600">{plan.precio}</span>
                      </div>
                      {plan.usuarios && (
                        <p className="text-xs text-gray-500 mt-1">{plan.usuarios} usuarios</p>
                      )}
                    </div>
                  ))}
                  {modelo.aplicacionKelumy.estructura && modelo.aplicacionKelumy.estructura.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{item.nivel || item.tipo}</span>
                        <span className="font-bold text-green-600">{item.precio}</span>
                      </div>
                      {item.contenido && (
                        <p className="text-xs text-gray-500 mt-1">{item.contenido}</p>
                      )}
                      {item.comision && (
                        <p className="text-xs text-gray-500 mt-1">Comisión: {item.comision}</p>
                      )}
                    </div>
                  ))}
                  {modelo.aplicacionKelumy.productos && modelo.aplicacionKelumy.productos.map((producto, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{producto.tipo}</span>
                        <span className="font-bold text-green-600">{producto.precio}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{producto.duracion}</p>
                    </div>
                  ))}
                  {modelo.aplicacionKelumy.paquetes && modelo.aplicacionKelumy.paquetes.map((paquete, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{paquete.nombre}</span>
                        <span className="font-bold text-green-600">{paquete.precio}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{paquete.usuarios} usuarios</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Métricas Clave */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">📊 Métricas Clave</h4>
                <div className="space-y-2">
                  {Object.entries(modelo.aplicacionKelumy.metricas).map(([metrica, valor]) => (
                    <div key={metrica} className="flex justify-between items-center bg-blue-50 p-2 rounded">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {metrica.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-bold text-blue-600">{valor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recomendación */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                Recomendación para Kelumy
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                {modelo.id === 'hibrido' 
                  ? '⭐ MODELO RECOMENDADO: Combina lo mejor de suscripción y venta individual, ideal para diversificar ingresos y maximizar LTV.'
                  : modelo.id === 'b2b'
                  ? '🏢 ESTRATEGIA COMPLEMENTARIA: Perfecto para ingresos estables y contratos a largo plazo con instituciones educativas.'
                  : modelo.id === 'suscripcion'
                  ? '📚 MODELO PRINCIPAL: Ideal para retención y LTV alto, especialmente para contenido STEM continuo.'
                  : '🔄 MODELO COMPLEMENTARIO: Útil para captación inicial o segmentos específicos.'
                }
              </p>
              <div className="flex items-center text-xs text-gray-600">
                <BarChart3 className="w-4 h-4 mr-1" />
                Basado en análisis de mercado y métricas objetivo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelosNegocioDemo
