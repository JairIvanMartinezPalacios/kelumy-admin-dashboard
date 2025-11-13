// ========================================
// BUNDLES Y PAQUETES - Gestión de Paquetes
// ========================================

import React, { useState, useEffect } from 'react'
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Users,
  DollarSign,
  BookOpen,
  ArrowRight,
  Award,
  FileText,
  BarChart3,
  ClipboardCheck
} from 'lucide-react'

const BundlesPackages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const bundles = [
    {
      id: 'BUNDLE-001',
      name: 'Bundle Frontend Completo',
      courses: ['React', 'JavaScript', 'Vue.js', 'TypeScript'],
      individualPrice: 1196,
      bundlePrice: 799,
      savings: 397,
      accessType: 'simultaneous',
      status: 'active',
      sales: 120
    },
    {
      id: 'BUNDLE-002',
      name: 'Bundle Backend Master',
      courses: ['Node.js', 'Python', 'Django', 'Express'],
      individualPrice: 1396,
      bundlePrice: 999,
      savings: 397,
      accessType: 'sequential',
      status: 'active',
      sales: 85
    }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Estilos de animación avanzados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-4px) scale(1.01);
        }
        
        .bundle-card {
          animation-delay: calc(var(--index) * 0.1s);
        }
      `}</style>

      {/* Crear Paquete */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInUp' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Plus size={20} />
            Crear Nuevo Paquete
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Nombre del Paquete</label>
            <input
              type="text"
              placeholder="Ej: Bundle Frontend Completo"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Seleccionar Cursos</label>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-white/60 text-sm">Selecciona los cursos para incluir en el paquete</p>
              <button className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20">
                Seleccionar Cursos
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 text-sm mb-2 block">Precio Individual</label>
              <input
                type="number"
                placeholder="1196"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm mb-2 block">Precio del Paquete</label>
              <input
                type="number"
                placeholder="799"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Tipo de Acceso</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="simultaneous" className="bg-gray-800">Acceso Simultáneo (Todos los cursos)</option>
              <option value="sequential" className="bg-gray-800">Acceso Secuencial (Curso por curso)</option>
            </select>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Prerequisitos entre Cursos</label>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-2">Configurar el orden de acceso a los cursos</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>1. Curso A</span>
                  <ArrowRight size={16} />
                  <span>2. Curso B</span>
                </div>
                <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 text-sm">
                  Configurar Prerequisitos
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Certificación Conjunta</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
              />
              <span className="text-white/70 text-sm">Emitir certificado único al completar todos los cursos del paquete</span>
            </div>
            <div className="mt-2 bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-xs">El certificado incluirá todos los cursos completados del paquete</p>
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Materiales Compartidos</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
              <span className="text-white/70 text-sm">Compartir materiales entre cursos del paquete</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-xs">Los recursos compartidos estarán disponibles en todos los cursos del paquete</p>
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Progreso Integrado</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
              <span className="text-white/70 text-sm">Mostrar progreso combinado del paquete</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-xs">El progreso se calculará como porcentaje de todos los cursos completados</p>
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Evaluaciones Combinadas</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                className="rounded"
              />
              <span className="text-white/70 text-sm">Crear evaluación final que combine conceptos de todos los cursos</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/60 text-xs">La evaluación final incluirá preguntas de todos los cursos del paquete</p>
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Descripción del Paquete</label>
            <textarea
              rows={3}
              placeholder="Describe los beneficios del paquete..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            Crear Paquete
          </button>
        </div>
      </div>

      {/* Lista de Paquetes */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInScale' : ''}`} style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar paquetes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-white font-semibold text-lg">{bundle.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      bundle.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {bundle.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-white/70 text-sm mb-2">Cursos Incluidos:</p>
                    <div className="flex flex-wrap gap-2">
                      {bundle.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 rounded-lg text-white text-sm border border-white/20"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs mb-1">Precio Individual</p>
                      <p className="text-white font-semibold">{formatCurrency(bundle.individualPrice)}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/70 text-xs mb-1">Precio Paquete</p>
                      <p className="text-white font-semibold text-lg">{formatCurrency(bundle.bundlePrice)}</p>
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-3">
                      <p className="text-green-400 text-xs mb-1">Ahorro</p>
                      <p className="text-green-400 font-semibold text-lg">{formatCurrency(bundle.savings)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      {bundle.accessType === 'simultaneous' ? (
                        <Unlock size={16} />
                      ) : (
                        <Lock size={16} />
                      )}
                      <span>
                        {bundle.accessType === 'simultaneous' ? 'Acceso Simultáneo' : 'Acceso Secuencial'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{bundle.sales} ventas</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:min-w-[150px]">
                  <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2 text-sm">
                    <Edit size={16} />
                    Editar
                  </button>
                  <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2 text-sm">
                    <BookOpen size={16} />
                    Ver Detalles
                  </button>
                  <button className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/30 flex items-center justify-center gap-2 text-sm">
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BundlesPackages

