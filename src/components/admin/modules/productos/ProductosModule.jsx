// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Package,         // Icono de paquete para productos
  Plus,            // Icono de agregar para crear productos
  Search,          // Icono de búsqueda para filtrar productos
  Filter,          // Icono de filtros para ordenar
  Eye,             // Icono de vista para ver detalles
  Edit,            // Icono de editar para modificar productos
  Trash2,          // Icono de eliminar para borrar productos
  DollarSign,      // Icono de dinero para precios
  BarChart3        // Icono de gráfico para analytics
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - ProductManagement
// ========================================

// Define el componente funcional ProductManagement que gestiona el catálogo de productos
// Incluye funcionalidades para crear, editar, eliminar y administrar productos digitales y físicos
const ProductManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'products': productos, 'categories': categorías, 'analytics': analíticas
  const [activeTab, setActiveTab] = useState('products')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'products', label: 'Productos', icon: Package },        // Pestaña de gestión de productos
    { id: 'categories', label: 'Categorías', icon: Package },     // Pestaña de gestión de categorías
    { id: 'analytics', label: 'Analíticas', icon: BarChart3 }     // Pestaña de analytics y reportes
  ]
  
  // ========================================
  // RENDERIZADO PRINCIPAL - Estructura JSX del componente
  // ========================================
  
  // Retorna el contenedor principal del módulo de gestión de productos
  return (
    <div className="p-6">
      {/* Encabezado del módulo con título y descripción */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Productos en Línea</h1>
        <p className="text-gray-600">Administra el catálogo de productos digitales y físicos</p>
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
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Productos</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                Nuevo Producto
              </button>
            </div>
            
            <div className="grid gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Curso de React</h4>
                <p className="text-gray-600 mb-4">Aprende React desde cero con proyectos prácticos</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Precio: $299</span>
                  <span>Categoría: Programación</span>
                  <span>Stock: 100</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Activo</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de categorías.</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analíticas de Productos</h3>
            <p className="text-gray-600">Aquí se implementarán las analíticas de productos.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductManagement
