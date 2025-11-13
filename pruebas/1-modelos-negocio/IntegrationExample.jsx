// ========================================
// EJEMPLO DE INTEGRACIÓN - MODELOS DE NEGOCIO
// ========================================
// Este archivo muestra cómo integrar el componente de modelos de negocio
// en el dashboard existente de Kelumy

import React from 'react'
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react'

// Importar el componente de modelos de negocio
import ModelosNegocioDemo from './ModelosNegocioDemo'

// Importar datos de modelos
import { modelosNegocioData, metricasComparativas } from './data/modelosNegocio'

const IntegrationExample = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header del Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Kelumy</h1>
              <p className="text-gray-600">Análisis de Modelos de Negocio</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Usuario: Admin</p>
                <p className="text-xs text-gray-400">Última actualización: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Modelos Activos</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Revenue Proyectado</p>
                <p className="text-2xl font-bold text-gray-900">$2.7M MXN</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">LTV Promedio</p>
                <p className="text-2xl font-bold text-gray-900">$8,400 MXN</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Usuarios Objetivo</p>
                <p className="text-2xl font-bold text-gray-900">1,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación de Secciones */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Modelos de Negocio
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Métricas Detalladas
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Análisis Comparativo
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Recomendaciones
            </button>
          </nav>
        </div>

        {/* Componente Principal de Modelos de Negocio */}
        <div className="bg-white rounded-lg shadow-sm border">
          <ModelosNegocioDemo />
        </div>

        {/* Sección de Métricas Comparativas */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Análisis Comparativo de Modelos</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Previsibilidad */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Previsibilidad de Ingresos</h3>
              <div className="space-y-2">
                {Object.entries(metricasComparativas).map(([modelo, metricas]) => (
                  <div key={modelo} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {modelosNegocioData[modelo]?.nombre}
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${metricas.previsibilidad}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{metricas.previsibilidad}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de LTV */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Lifetime Value (LTV)</h3>
              <div className="space-y-2">
                {Object.entries(metricasComparativas).map(([modelo, metricas]) => (
                  <div key={modelo} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {modelosNegocioData[modelo]?.nombre}
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${metricas.ltv}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{metricas.ltv}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recomendaciones Finales */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Recomendaciones Estratégicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-900 mb-2">🥇 Modelo Principal</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Híbrido:</strong> Combina suscripción base con cursos premium individuales
              </p>
              <p className="text-xs text-gray-500">
                LTV: $14,400+ MXN | Conversión: >25%
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-900 mb-2">🏢 Modelo Corporativo</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>B2B:</strong> Licencias para instituciones educativas
              </p>
              <p className="text-xs text-gray-500">
                ACV: $133,650 MXN | Churn: <2%
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Modelo Complementario</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Micro-pagos:</strong> Para captación y pruebas de contenido
              </p>
              <p className="text-xs text-gray-500">
                Conversión Lead: >50% | Ticket: $108 MXN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntegrationExample
