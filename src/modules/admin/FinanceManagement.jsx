// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  DollarSign,     // Icono de dólar para transacciones y dinero
  BarChart3,      // Icono de gráfico para resumen y analytics
  TrendingUp,     // Icono de tendencia para crecimiento y reportes
  Plus,           // Icono de agregar para crear nuevas transacciones
  Search,         // Icono de búsqueda para filtrar transacciones
  Filter,         // Icono de filtros para ordenar datos
  Eye,            // Icono de vista para ver detalles
  Edit,           // Icono de editar para modificar transacciones
  Download,       // Icono de descarga para exportar reportes
  Calendar,       // Icono de calendario para fechas
  CheckCircle,    // Icono de check para transacciones completadas
  Clock,          // Icono de reloj para transacciones pendientes
  AlertCircle     // Icono de alerta para transacciones con errores
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - FinanceManagement
// ========================================

// Define el componente funcional FinanceManagement que gestiona las finanzas y contabilidad
// Incluye funcionalidades para transacciones, reportes, analytics y gestión de ingresos/gastos
const FinanceManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'overview': resumen, 'transactions': transacciones, 'reports': reportes
  const [activeTab, setActiveTab] = useState('overview')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },         // Pestaña de resumen financiero
    { id: 'transactions', label: 'Transacciones', icon: DollarSign }, // Pestaña de gestión de transacciones
    { id: 'reports', label: 'Reportes', icon: TrendingUp }         // Pestaña de reportes y analytics
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Finanzas y Contabilidad</h1>
        <p className="text-gray-600">Gestiona las finanzas y contabilidad del sistema</p>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      
      <div className="min-h-96">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                    <p className="text-2xl font-semibold text-gray-900">$125,000</p>
                  </div>
                  <DollarSign size={24} className="text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gastos</p>
                    <p className="text-2xl font-semibold text-gray-900">$45,000</p>
                  </div>
                  <TrendingUp size={24} className="text-red-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Beneficio Neto</p>
                    <p className="text-2xl font-semibold text-gray-900">$80,000</p>
                  </div>
                  <BarChart3 size={24} className="text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Margen</p>
                    <p className="text-2xl font-semibold text-gray-900">64%</p>
                  </div>
                  <CheckCircle size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transacciones</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de transacciones.</p>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reportes Financieros</h3>
            <p className="text-gray-600">Aquí se implementarán los reportes financieros.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FinanceManagement
