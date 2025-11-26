// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado, optimización de funciones y memoización
import React, { useState, useCallback, useMemo } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  BookOpen,       // Icono de libro para cursos
  Plus,           // Icono de más para agregar elementos
  Search,         // Icono de búsqueda para filtrar
  Filter,         // Icono de filtro para ordenar
  BarChart3,      // Icono de gráfico para analytics
  Upload,         // Icono de subida para carga de archivos
  DollarSign,     // Icono de dólar para precios
  Settings,       // Icono de configuración para ajustes
  Eye,            // Icono de ojo para vista previa
  Edit,           // Icono de editar para modificar
  Trash2,         // Icono de basura para eliminar
  Copy,           // Icono de copiar para duplicar
  Star,           // Icono de estrella para calificaciones
  Clock,          // Icono de reloj para duración
  CheckCircle,    // Icono de check para completado
  Play,           // Icono de play para reproducir
  Users,          // Icono de usuarios para estudiantes
  Award,          // Icono de premio para certificados
  TrendingUp,     // Icono de tendencia para popularidad
  Calendar,       // Icono de calendario para fechas
  Target,         // Icono de objetivo para metas
  Zap,            // Icono de rayo para destacados
  Lock,           // Icono de candado para privado
  Unlock,         // Icono de desbloqueo para público
  Video,          // Icono de video para contenido multimedia
  FileText,       // Icono de archivo para documentos
  Clipboard,      // Icono de portapapeles para listas
  Lightbulb,      // Icono de bombilla para ideas
  Atom,           // Icono de átomo para ciencias
  Laptop,         // Icono de laptop para tecnología
  GraduationCap,  // Icono de graduación para educación
  ChevronRight,   // Icono de chevron derecha para navegación
  ChevronLeft,    // Icono de chevron izquierda para navegación
  ArrowLeft,      // Icono de flecha izquierda para retroceso
  Save,           // Icono de guardar para confirmar cambios
  X,              // Icono de X para cerrar
  ArrowUp,        // Icono de flecha arriba para mover hacia arriba
  ArrowDown,      // Icono de flecha abajo para mover hacia abajo
  GripVertical,   // Icono de agarre para arrastrar y soltar
  Image,          // Icono de imagen para elementos visuales
  File,           // Icono de archivo genérico
  Link,           // Icono de enlace para URLs
  Code,           // Icono de código para programación
  Type,           // Icono de texto para contenido textual
  AlignLeft,      // Icono de alineación izquierda
  AlignCenter,    // Icono de alineación centrada
  AlignRight,     // Icono de alineación derecha
  Bold,           // Icono de texto en negrita
  Italic,         // Icono de texto en cursiva
  Underline,      // Icono de texto subrayado
  List,           // Icono de lista desordenada
  ListOrdered,    // Icono de lista ordenada
  Quote,          // Icono de cita para citas
  Minus,          // Icono de menos para reducir
  Plus as PlusIcon // Alias para evitar conflicto de nombres
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - ContentManagement
// ========================================

// Define el componente funcional ContentManagement que gestiona el contenido educativo completo
// Recibe props: course (objeto del curso), onClose (función para cerrar), onSave (función para guardar)
const ContentManagement = ({ course, onClose, onSave }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estados para navegación y selección
  const [selectedSection, setSelectedSection] = useState('overview')     // Sección activa: 'overview', 'levels', 'materials', etc.
  const [selectedLevel, setSelectedLevel] = useState('basico')           // Nivel seleccionado: 'basico', 'intermedio', 'avanzado'
  
  // Estados para edición de contenido
  const [editingContent, setEditingContent] = useState({})               // Contenido temporal en edición
  const [isEditing, setIsEditing] = useState(false)                      // Modo de edición activo
  
  // Estado para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('')                       // Término de búsqueda en contenido
  
  // ========================================
  // DATOS DE EJEMPLO - Estructura de contenido
  // ========================================
  
  const contentSections = [
    {
      id: 'overview',
      name: 'Información General',
      icon: BookOpen,
      description: 'Título, descripción, instructor, duración, etc.'
    },
    {
      id: 'levels',
      name: 'Niveles del Curso',
      icon: Target,
      description: 'Contenido específico para cada nivel (básico, intermedio, avanzado)'
    },
    {
      id: 'materials',
      name: 'Materiales',
      icon: FileText,
      description: 'Lecturas, videos, documentos y recursos'
    },
    {
      id: 'activities',
      name: 'Actividades',
      icon: Clipboard,
      description: 'Ejercicios, tareas y actividades prácticas'
    },
    {
      id: 'evaluations',
      name: 'Evaluaciones',
      icon: Award,
      description: 'Exámenes, pruebas y evaluaciones'
    },
    {
      id: 'projects',
      name: 'Proyectos',
      icon: Lightbulb,
      description: 'Trabajos finales y proyectos especiales'
    },
    {
      id: 'pricing',
      name: 'Precios y Promociones',
      icon: DollarSign,
      description: 'Configuración de precios y descuentos'
    },
    {
      id: 'metadata',
      name: 'Metadatos',
      icon: Settings,
      description: 'Etiquetas, categorías, nivel educativo, etc.'
    }
  ]
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  const getLevelText = useCallback((level) => {
    switch (level) {
      case 'basico': return 'Básico'
      case 'intermedio': return 'Intermedio'
      case 'avanzado': return 'Avanzado'
      default: return 'No especificado'
    }
  }, [])
  
  const getEducationLevelText = useCallback((level) => {
    switch (level) {
      case 'formativo': return 'Formativo (Bachillerato)'
      case 'universidad': return 'Universidad'
      default: return 'No especificado'
    }
  }, [])
  
  // ========================================
  // COMPONENTES INTERNOS
  // ========================================
  
  // Componente para la barra lateral de secciones
  const SectionSidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Secciones del Curso</h3>
        <p className="text-sm text-gray-600">Selecciona una sección para editar su contenido</p>
      </div>
      
      <div className="space-y-2">
        {contentSections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === section.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <div>
                  <div className="font-medium">{section.name}</div>
                  <div className="text-xs text-gray-500">{section.description}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
  
  // Componente para editar información general
  const OverviewEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Información General del Curso</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título del Curso</label>
            <input
              type="text"
              defaultValue={course?.title || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ingresa el título del curso"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
            <input
              type="text"
              defaultValue={course?.instructor || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Nombre del instructor"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duración Total</label>
            <input
              type="text"
              defaultValue={course?.duration || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ej: 45 horas"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Sesiones</label>
            <input
              type="number"
              defaultValue={course?.sessions || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ej: 18"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Curso</label>
          <textarea
            rows={4}
            defaultValue={course?.description || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe brevemente el contenido y objetivos del curso"
          />
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Curso</label>
          <div className="flex items-center gap-4">
            <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
              <Image size={32} className="text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Subir Imagen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para editar niveles del curso
  const LevelsEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Niveles del Curso</h3>
          <div className="flex gap-2">
            {['basico', 'intermedio', 'avanzado'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {getLevelText(level)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título del Nivel</label>
            <input
              type="text"
              defaultValue={course?.levels?.[selectedLevel]?.title || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Título específico para este nivel"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Nivel</label>
            <textarea
              rows={3}
              defaultValue={course?.levels?.[selectedLevel]?.description || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe qué se aprenderá en este nivel"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duración</label>
              <input
                type="text"
                defaultValue={course?.levels?.[selectedLevel]?.duration || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ej: 20 horas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sesiones</label>
              <input
                type="number"
                defaultValue={course?.levels?.[selectedLevel]?.sessions || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ej: 8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lecturas</label>
              <input
                type="number"
                defaultValue={course?.levels?.[selectedLevel]?.readings || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ej: 12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actividades</label>
              <input
                type="number"
                defaultValue={course?.levels?.[selectedLevel]?.activities || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ej: 15"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Temas del Nivel</label>
            <div className="space-y-2">
              {(course?.levels?.[selectedLevel]?.topics || []).map((topic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={topic}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tema del curso"
                  />
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button className="flex items-center gap-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                <PlusIcon size={16} />
                Agregar Tema
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para editar materiales
  const MaterialsEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Materiales del Curso</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={16} />
            Agregar Material
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Material de ejemplo */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Introducción a la Física Cuántica</h4>
                  <p className="text-sm text-gray-500">PDF • 2.5 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-1">
                  <GripVertical size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">Disponible</span>
              <span className="text-gray-500">Nivel: Básico</span>
              <span className="text-gray-500">Orden: 1</span>
            </div>
          </div>
          
          {/* Material bloqueado de ejemplo */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Video size={20} className="text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-500">Video: Principios Cuánticos</h4>
                  <p className="text-sm text-gray-400">MP4 • 45 min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-1">
                  <GripVertical size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full flex items-center gap-1">
                <Lock size={12} />
                Bloqueado
              </span>
              <span className="text-gray-400">Nivel: Intermedio</span>
              <span className="text-gray-400">Orden: 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para editar actividades
  const ActivitiesEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Actividades del Curso</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={16} />
            Agregar Actividad
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Actividad de ejemplo */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Clipboard size={20} className="text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Ejercicio: Cálculo de Probabilidades</h4>
                  <p className="text-sm text-gray-500">Actividad práctica • 30 min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-1">
                  <GripVertical size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">Disponible</span>
              <span className="text-gray-500">Nivel: Básico</span>
              <span className="text-gray-500">Tipo: Ejercicio</span>
              <span className="text-gray-500">Orden: 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para editar evaluaciones
  const EvaluationsEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Evaluaciones del Curso</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={16} />
            Agregar Evaluación
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Evaluación de ejemplo */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Award size={20} className="text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-500">Examen Parcial: Mecánica Cuántica</h4>
                  <p className="text-sm text-gray-400">Evaluación • 60 min • 50 preguntas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-1">
                  <GripVertical size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full flex items-center gap-1">
                <Lock size={12} />
                Bloqueado
              </span>
              <span className="text-gray-400">Nivel: Intermedio</span>
              <span className="text-gray-400">Tipo: Examen</span>
              <span className="text-gray-400">Orden: 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para editar proyectos
  const ProjectsEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Proyectos del Curso</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus size={16} />
            Agregar Proyecto
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Proyecto de ejemplo */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Lightbulb size={20} className="text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-500">Proyecto Final: Simulador Cuántico</h4>
                  <p className="text-sm text-gray-400">Proyecto • 2 semanas • Individual</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-1">
                  <GripVertical size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full flex items-center gap-1">
                <Lock size={12} />
                Bloqueado
              </span>
              <span className="text-gray-400">Nivel: Avanzado</span>
              <span className="text-gray-400">Tipo: Proyecto</span>
              <span className="text-gray-400">Orden: 8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para editar precios
  const PricingEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Configuración de Precios</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio Actual</label>
            <input
              type="number"
              defaultValue={course?.price || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Precio en USD"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio Original</label>
            <input
              type="number"
              defaultValue={course?.originalPrice || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Precio original antes del descuento"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
            <input
              type="number"
              defaultValue={course?.discount || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Porcentaje de descuento"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado del Curso</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="published">Publicado</option>
              <option value="draft">Borrador</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para editar metadatos
  const MetadataEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Metadatos del Curso</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="ciencias">Ciencias</option>
              <option value="tecnologia">Tecnología</option>
              <option value="educacion">Educación</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel Educativo</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="formativo">Formativo (Bachillerato)</option>
              <option value="universidad">Universidad</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Dificultad</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="basico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Etiquetas</label>
            <input
              type="text"
              defaultValue={course?.tags?.join(', ') || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Separadas por comas"
            />
          </div>
        </div>
      </div>
    </div>
  )
  
  // Función para renderizar el contenido según la sección seleccionada
  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'overview':
        return <OverviewEditor />
      case 'levels':
        return <LevelsEditor />
      case 'materials':
        return <MaterialsEditor />
      case 'activities':
        return <ActivitiesEditor />
      case 'evaluations':
        return <EvaluationsEditor />
      case 'projects':
        return <ProjectsEditor />
      case 'pricing':
        return <PricingEditor />
      case 'metadata':
        return <MetadataEditor />
      default:
        return <OverviewEditor />
    }
  }
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        margin: 0,
        padding: 0
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-5/6 flex">
        {/* Barra lateral */}
        <SectionSidebar />
        
        {/* Contenido principal */}
        <div className="flex-1 flex flex-col">
          {/* Encabezado */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Contenido</h2>
                <p className="text-gray-600">{course?.title || 'Curso sin título'}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isEditing
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isEditing ? 'Guardando...' : 'Editar'}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Contenido de la sección */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderSectionContent()}
          </div>
          
          {/* Pie de página con acciones */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // Aquí iría la lógica para guardar los cambios
                    onSave && onSave()
                    onClose()
                  }}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentManagement
