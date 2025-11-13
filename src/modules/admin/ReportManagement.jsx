// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  BarChart3,      // Icono de gráfico de barras para reportes
  TrendingUp,     // Icono de tendencia para crecimiento
  Download,       // Icono de descarga para exportar reportes
  Plus,           // Icono de agregar para crear reportes
  Search,         // Icono de búsqueda para filtrar reportes
  Filter,         // Icono de filtros para ordenar datos
  Eye,            // Icono de vista para ver detalles
  Edit,           // Icono de editar para modificar reportes
  Calendar,       // Icono de calendario para fechas
  Users,          // Icono de usuarios para reportes de usuarios
  DollarSign,     // Icono de dólar para reportes financieros
  BookOpen        // Icono de libro para reportes de cursos
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - ReportManagement
// ========================================

// Define el componente funcional ReportManagement que gestiona reportes y analítica
// Incluye funcionalidades para reportes financieros, de usuarios, cursos y personalizados
const ReportManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'financial': financieros, 'users': usuarios, 'courses': cursos, 'custom': personalizados
  const [activeTab, setActiveTab] = useState('financial')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'financial', label: 'Financieros', icon: DollarSign },     // Pestaña de reportes financieros
    { id: 'users', label: 'Usuarios', icon: Users },                 // Pestaña de reportes de usuarios
    { id: 'courses', label: 'Cursos', icon: BookOpen },              // Pestaña de reportes de cursos
    { id: 'custom', label: 'Personalizados', icon: BarChart3 }       // Pestaña de reportes personalizados
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reportes y Analítica</h1>
        <p className="text-gray-600">Visualiza reportes financieros y análisis del sistema</p>
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
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reportes Financieros</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Reporte de Ventas</h4>
                  <p className="text-sm text-gray-600 mb-3">Análisis detallado de ventas por período</p>
                  <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
                    <Download size={16} />
                    Descargar
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Estado de Resultados</h4>
                  <p className="text-sm text-gray-600 mb-3">Ingresos, gastos y beneficio neto</p>
                  <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
                    <Download size={16} />
                    Descargar
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Flujo de Caja</h4>
                  <p className="text-sm text-gray-600 mb-3">Entradas y salidas de efectivo</p>
                  <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
                    <Download size={16} />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reportes de Usuarios</h3>
            <p className="text-gray-600">Aquí se implementarán los reportes de usuarios.</p>
          </div>
        )}
        
        {activeTab === 'courses' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reportes de Cursos</h3>
            <p className="text-gray-600">Aquí se implementarán los reportes de cursos.</p>
          </div>
        )}
        
        {activeTab === 'custom' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reportes Personalizados</h3>
            <p className="text-gray-600">Aquí se implementarán los reportes personalizados.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportManagement
