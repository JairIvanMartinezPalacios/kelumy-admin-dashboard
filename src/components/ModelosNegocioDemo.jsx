// ========================================
// MODELOS DE NEGOCIO - DEMO KELUMY
// ========================================
// Componente para mostrar los diferentes modelos de negocio
// desarrollados en la investigación de e-commerce educativo

import React, { useState } from 'react'
import { modelosNegocioData } from '../data/modelosNegocio'
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
  Zap,
  ArrowLeft,
  BookOpen
} from 'lucide-react'

const ModelosNegocioDemo = ({ onBack }) => {
  const [modeloActivo, setModeloActivo] = useState('suscripcion')

  // Usar datos importados
  const modelos = modelosNegocioData
  const modelo = modelos[modeloActivo]
  const IconoModelo = modelo.icono

  // Mapeo de iconos
  const iconos = {
    CreditCard,
    ShoppingCart,
    Target,
    Zap,
    Building
  }

  const IconoComponente = iconos[IconoModelo] || CreditCard

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
              <h1 className="text-3xl font-bold text-white mb-2">Modelos de Negocio</h1>
              <p className="text-white/70">Explora los diferentes modelos de negocio desarrollados para la plataforma educativa</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <TrendingUp className="w-4 h-4" />
              <span>Importar</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <TrendingUp className="w-4 h-4" />
              <span>Nuevo Modelo</span>
            </button>
          </div>
        </div>

        {/* Tabs de Navegación */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-lg p-1 border border-white/20">
            {Object.values(modelos).map((mod) => {
              const Icono = iconos[mod.icono] || CreditCard
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
                  <span className="font-medium text-sm">{mod.nombre}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Modelos</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Modelos Activos</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Ingresos Generados</p>
                <p className="text-2xl font-bold text-white">$45,230</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-full">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Efectividad</p>
                <p className="text-2xl font-bold text-white">4.8</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Star className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del Modelo Seleccionado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                <IconoComponente className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{modelo.nombre}</h2>
                <p className="text-white/70">{modelo.descripcion}</p>
              </div>
            </div>

            {/* Precio y Ejemplos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

              {/* Ventajas y Desventajas */}
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
          </div>

        {/* Aplicación en Kelumy */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <div className="p-2 bg-orange-500/20 rounded-full mr-3">
                <Star className="w-5 h-5 text-orange-400" />
              </div>
              Aplicación en Kelumy
            </h3>
              
              {/* Estructura de Precios */}
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

            {/* Métricas Clave */}
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

          {/* Recomendación */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-2 flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-full mr-3">
                <Target className="w-4 h-4 text-blue-400" />
              </div>
              Recomendación para Kelumy
            </h4>
            <p className="text-sm text-white/70 mb-3">
              {modelo.id === 'hibrido' 
                ? '⭐ MODELO RECOMENDADO: Combina lo mejor de suscripción y venta individual, ideal para diversificar ingresos y maximizar LTV.'
                : modelo.id === 'b2b'
                ? '🏢 ESTRATEGIA COMPLEMENTARIA: Perfecto para ingresos estables y contratos a largo plazo con instituciones educativas.'
                : modelo.id === 'suscripcion'
                ? '📚 MODELO PRINCIPAL: Ideal para retención y LTV alto, especialmente para contenido STEM continuo.'
                : '🔄 MODELO COMPLEMENTARIO: Útil para captación inicial o segmentos específicos.'
              }
            </p>
            <div className="flex items-center text-xs text-white/70">
              <BarChart3 className="w-4 h-4 mr-1" />
              Basado en análisis de mercado y métricas objetivo
            </div>
          </div>
        </div>
      </div>

      {/* Glosario de Términos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          Glosario de Términos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Churn</h4>
            <p className="text-sm text-white/70">Tasa de cancelación de suscripciones. Indica qué porcentaje de usuarios deja de usar el servicio en un período determinado.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">LTV (Lifetime Value)</h4>
            <p className="text-sm text-white/70">Valor de vida del cliente. Ingresos totales que genera un cliente durante toda su relación con la empresa.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CAC (Customer Acquisition Cost)</h4>
            <p className="text-sm text-white/70">Costo de adquisición de cliente. Gasto promedio en marketing y ventas para conseguir un nuevo cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ARPU (Average Revenue Per User)</h4>
            <p className="text-sm text-white/70">Ingresos promedio por usuario. Cantidad de dinero que genera cada usuario en un período determinado.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">MRR (Monthly Recurring Revenue)</h4>
            <p className="text-sm text-white/70">Ingresos recurrentes mensuales. Ingresos predecibles que genera la empresa cada mes por suscripciones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">GMV (Gross Merchandise Value)</h4>
            <p className="text-sm text-white/70">Valor bruto de mercancía. Valor total de todas las transacciones procesadas por la plataforma antes de comisiones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Take Rate</h4>
            <p className="text-sm text-white/70">Porcentaje que se queda la plataforma de cada transacción. Comisión que cobra el marketplace por facilitar la venta.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Upsell</h4>
            <p className="text-sm text-white/70">Venta de productos o servicios de mayor valor a clientes existentes. Estrategia para aumentar el valor del cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ACV (Annual Contract Value)</h4>
            <p className="text-sm text-white/70">Valor anual del contrato. Ingresos promedio que genera un contrato B2B en un año.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">NPS (Net Promoter Score)</h4>
            <p className="text-sm text-white/70">Puntuación de promotores netos. Métrica que mide la satisfacción y lealtad del cliente hacia la marca.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">B2B (Business to Business)</h4>
            <p className="text-sm text-white/70">Negocio a negocio. Modelo de ventas donde la empresa vende productos o servicios a otras empresas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">SaaS (Software as a Service)</h4>
            <p className="text-sm text-white/70">Software como servicio. Modelo de distribución donde el software se aloja en la nube y se accede por suscripción.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Marketplace</h4>
            <p className="text-sm text-white/70">Plataforma que conecta compradores y vendedores. La empresa facilita las transacciones y cobra una comisión.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Freemium</h4>
            <p className="text-sm text-white/70">Modelo de negocio que combina servicios gratuitos con opciones premium de pago para funcionalidades avanzadas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Micro-pagos</h4>
            <p className="text-sm text-white/70">Transacciones de bajo valor. Pagos pequeños por contenido específico o servicios individuales.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Modelo Híbrido</h4>
            <p className="text-sm text-white/70">Combinación de múltiples modelos de negocio. Integra suscripciones con ventas individuales para maximizar ingresos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelosNegocioDemo
