// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  FileText,     // Icono de documento para artículos y contenido
  Plus,         // Icono de agregar para crear contenido
  Search,       // Icono de búsqueda para filtrar contenido
  Filter,       // Icono de filtros para ordenar contenido
  Eye,          // Icono de vista para ver detalles
  Edit,         // Icono de editar para modificar contenido
  Trash2,       // Icono de eliminar para borrar contenido
  Calendar,     // Icono de calendario para fechas de publicación
  Users,        // Icono de usuarios para autores
  BarChart3     // Icono de gráfico para analytics y SEO
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - ContentManagement
// ========================================

// Define el componente funcional ContentManagement que gestiona contenido y blog
// Incluye funcionalidades para blog, artículos, SEO y gestión de contenido editorial
const ContentManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué pestaña está activa en la interfaz
  // 'blog': blog, 'articles': artículos, 'seo': SEO
  const [activeTab, setActiveTab] = useState('blog')
  
  // ========================================
  // DATOS ESTÁTICOS - Configuración de pestañas
  // ========================================
  
  // Array que define las pestañas disponibles en la interfaz
  // Cada objeto contiene: id (identificador), label (etiqueta visible), icon (componente de icono)
  const tabs = [
    { id: 'blog', label: 'Blog', icon: FileText },         // Pestaña de gestión del blog
    { id: 'articles', label: 'Artículos', icon: FileText }, // Pestaña de gestión de artículos
    { id: 'seo', label: 'SEO', icon: BarChart3 }           // Pestaña de optimización SEO
  ]
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Gestión de Contenido y Blog</h1>
        <p className="text-gray-600">Administra el contenido del blog y artículos SEO</p>
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
        {activeTab === 'blog' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Entradas del Blog</h3>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                Nueva Entrada
              </button>
            </div>
            
            <div className="grid gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Cómo Aprender React desde Cero</h4>
                <p className="text-gray-600 mb-4">Una guía completa para principiantes que quieren dominar React</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Publicado: 2024-01-15</span>
                  <span>Autor: Ana Martínez</span>
                  <span>Vistas: 1,250</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Publicado</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'articles' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Artículos</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de artículos.</p>
          </div>
        )}
        
        {activeTab === 'seo' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimización SEO</h3>
            <p className="text-gray-600">Aquí se implementará la gestión de SEO.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentManagement
