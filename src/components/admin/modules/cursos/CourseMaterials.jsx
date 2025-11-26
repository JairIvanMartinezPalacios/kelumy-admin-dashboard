// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Upload,       // Icono de subida para carga de materiales
  Video,        // Icono de video para contenido multimedia
  FileText,     // Icono de archivo de texto para documentos
  HelpCircle,   // Icono de ayuda para información adicional
  Package,      // Icono de paquete para módulos
  Plus,         // Icono de más para agregar elementos
  Edit,         // Icono de editar para modificar contenido
  Trash2,       // Icono de basura para eliminar
  Play,         // Icono de play para reproducir videos
  Download,     // Icono de descarga para archivos
  Eye,          // Icono de ojo para vista previa
  Clock,        // Icono de reloj para duración
  CheckCircle,  // Icono de check para completado
  AlertCircle,  // Icono de alerta para errores
  Folder,       // Icono de carpeta para organización
  File,         // Icono de archivo genérico
  MoreVertical, // Icono de menú vertical para opciones
  Move,         // Icono de mover para reorganizar
  Copy,         // Icono de copiar para duplicar
  Lock,         // Icono de candado para contenido privado
  Globe,        // Icono de globo para contenido público
  Star,         // Icono de estrella para destacados
  Target,       // Icono de objetivo para metas
  Users,        // Icono de usuarios para estudiantes
  BarChart3     // Icono de gráfico para estadísticas
} from 'lucide-react'

// ========================================
// COMPONENTE - CourseMaterials
// ========================================

// Define el componente funcional CourseMaterials que gestiona el contenido y materiales de un curso
// Recibe props: courseId (identificador del curso para cargar sus materiales)
const CourseMaterials = ({ courseId }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado que contiene la estructura completa de módulos y lecciones del curso
  // Cada módulo contiene lecciones con diferentes tipos de contenido (video, PDF, etc.)
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'Introducción al Curso',
      description: 'Conceptos básicos y presentación del curso',
      order: 1,
      isPublished: true,
      duration: '2h 30m',
      lessons: [
        {
          id: 1,
          title: 'Bienvenida al Curso',
          type: 'video',
          duration: '5:30',
          status: 'published',
          file: 'welcome-video.mp4',
          isPreview: true,
          views: 1200,
          completion: 95
        },
        {
          id: 2,
          title: 'Programa del Curso',
          type: 'pdf',
          duration: '2 min',
          status: 'published',
          file: 'course-program.pdf',
          isPreview: false,
          views: 890,
          completion: 78
        },
        {
          id: 3,
          title: 'Configuración del Entorno',
          type: 'video',
          duration: '12:45',
          status: 'published',
          file: 'setup-environment.mp4',
          isPreview: false,
          views: 1100,
          completion: 82
        }
      ]
    },
    {
      id: 2,
      title: 'Fundamentos de React',
      description: 'Aprende los conceptos fundamentales de React',
      order: 2,
      isPublished: true,
      duration: '8h 15m',
      lessons: [
        {
          id: 4,
          title: '¿Qué es React?',
          type: 'video',
          duration: '15:20',
          status: 'published',
          file: 'what-is-react.mp4',
          isPreview: true,
          views: 1050,
          completion: 88
        },
        {
          id: 5,
          title: 'Componentes y JSX',
          type: 'video',
          duration: '22:10',
          status: 'published',
          file: 'components-jsx.mp4',
          isPreview: false,
          views: 920,
          completion: 75
        },
        {
          id: 6,
          title: 'Quiz: Conceptos Básicos',
          type: 'quiz',
          duration: '10 min',
          status: 'published',
          file: 'basics-quiz.json',
          isPreview: false,
          views: 800,
          completion: 70
        },
        {
          id: 7,
          title: 'Ejercicio Práctico',
          type: 'exercise',
          duration: '30 min',
          status: 'draft',
          file: 'practice-exercise.md',
          isPreview: false,
          views: 0,
          completion: 0
        }
      ]
    },
    {
      id: 3,
      title: 'Hooks y Estado',
      description: 'Domina los hooks de React para manejar el estado',
      order: 3,
      isPublished: false,
      duration: '6h 45m',
      lessons: [
        {
          id: 8,
          title: 'useState Hook',
          type: 'video',
          duration: '18:30',
          status: 'draft',
          file: 'useState-hook.mp4',
          isPreview: false,
          views: 0,
          completion: 0
        }
      ]
    }
  ])
  
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadType, setUploadType] = useState('video')
  const [selectedModule, setSelectedModule] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  const getFileIcon = (type) => {
    switch (type) {
      case 'video': return Video
      case 'pdf': return FileText
      case 'quiz': return HelpCircle
      case 'exercise': return Target
      case 'scorm': return Package
      case 'audio': return Play
      default: return File
    }
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-500/20 border border-green-400/30'
      case 'draft': return 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30'
      case 'error': return 'text-red-400 bg-red-500/20 border border-red-400/30'
      default: return 'text-white/70 bg-white/10 border border-white/20'
    }
  }
  
  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'Publicado'
      case 'draft': return 'Borrador'
      case 'error': return 'Error'
      default: return 'Desconocido'
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return CheckCircle
      case 'draft': return Clock
      case 'error': return AlertCircle
      default: return Clock
    }
  }
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-blue-400 bg-blue-500/20 border border-blue-400/30'
      case 'pdf': return 'text-red-400 bg-red-500/20 border border-red-400/30'
      case 'quiz': return 'text-purple-400 bg-purple-500/20 border border-purple-400/30'
      case 'exercise': return 'text-green-400 bg-green-500/20 border border-green-400/30'
      case 'scorm': return 'text-orange-400 bg-orange-500/20 border border-orange-400/30'
      case 'audio': return 'text-pink-400 bg-pink-500/20 border border-pink-400/30'
      default: return 'text-white/70 bg-white/10 border border-white/20'
    }
  }
  
  const getTypeText = (type) => {
    switch (type) {
      case 'video': return 'Video'
      case 'pdf': return 'PDF'
      case 'quiz': return 'Quiz'
      case 'exercise': return 'Ejercicio'
      case 'scorm': return 'SCORM'
      case 'audio': return 'Audio'
      default: return 'Archivo'
    }
  }
  
  const handleFileUpload = (file, type) => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setShowUploadModal(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }
  
  const addLesson = (moduleId, lesson) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, lesson] }
        : module
    ))
  }
  
  const removeLesson = (moduleId, lessonId) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: module.lessons.filter(lesson => lesson.id !== lessonId) }
        : module
    ))
  }
  
  const toggleModulePublish = (moduleId) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, isPublished: !module.isPublished }
        : module
    ))
  }
  
  const toggleLessonPreview = (moduleId, lessonId) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { 
            ...module, 
            lessons: module.lessons.map(lesson => 
              lesson.id === lessonId 
                ? { ...lesson, isPreview: !lesson.isPreview }
                : lesson
            )
          }
        : module
    ))
  }
  
  // Función para reproducir/previsualizar una lección
  const handlePlayLesson = (moduleId, lessonId) => {
    const module = modules.find(m => m.id === moduleId)
    const lesson = module?.lessons.find(l => l.id === lessonId)
    if (lesson) {
      alert(`Reproduciendo: ${lesson.title}\nTipo: ${getTypeText(lesson.type)}\nArchivo: ${lesson.file}`)
      // En producción, aquí se abriría el reproductor de video o visor de contenido
    }
  }
  
  // Función para editar una lección
  const handleEditLesson = (moduleId, lessonId) => {
    const module = modules.find(m => m.id === moduleId)
    const lesson = module?.lessons.find(l => l.id === lessonId)
    if (lesson) {
      alert(`Abriendo editor para: ${lesson.title}\nAquí se abriría el editor de contenido de la lección.`)
      // En producción, aquí se abriría el editor de lecciones
    }
  }
  
  // Función para duplicar una lección
  const handleDuplicateLesson = (moduleId, lessonId) => {
    const module = modules.find(m => m.id === moduleId)
    const lesson = module?.lessons.find(l => l.id === lessonId)
    if (lesson) {
      const newLesson = {
        ...lesson,
        id: Date.now(),
        title: `${lesson.title} (Copia)`,
        views: 0,
        completion: 0
      }
      setModules(prev => prev.map(m => 
        m.id === moduleId 
          ? { ...m, lessons: [...m.lessons, newLesson] }
          : m
      ))
      alert(`Lección "${lesson.title}" duplicada exitosamente`)
    }
  }
  
  // Función para eliminar una lección
  const handleDeleteLesson = (moduleId, lessonId) => {
    const module = modules.find(m => m.id === moduleId)
    const lesson = module?.lessons.find(l => l.id === lessonId)
    if (lesson && window.confirm(`¿Estás seguro de que deseas eliminar la lección "${lesson.title}"?`)) {
      removeLesson(moduleId, lessonId)
      alert(`Lección "${lesson.title}" eliminada exitosamente`)
    }
  }
  
  // Función para editar un módulo
  const handleEditModule = (moduleId) => {
    const module = modules.find(m => m.id === moduleId)
    if (module) {
      alert(`Abriendo editor para módulo: ${module.title}\nAquí se abriría el editor de módulos.`)
      // En producción, aquí se abriría el editor de módulos
    }
  }
  
  // Función para mostrar opciones adicionales del módulo
  const handleModuleOptions = (moduleId) => {
    const module = modules.find(m => m.id === moduleId)
    if (module) {
      const options = [
        'Duplicar módulo',
        'Exportar módulo',
        'Estadísticas del módulo',
        'Configuración avanzada',
        'Eliminar módulo'
      ]
      const selected = window.prompt(
        `Opciones para: ${module.title}\n\n` +
        options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n') +
        '\n\nIngresa el número de la opción:'
      )
      if (selected) {
        const optionIndex = parseInt(selected) - 1
        if (optionIndex >= 0 && optionIndex < options.length) {
          alert(`Ejecutando: ${options[optionIndex]}`)
          // Aquí se ejecutaría la acción correspondiente
        }
      }
    }
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para el modal de subida de archivos
  const UploadModal = () => (
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
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Subir {getTypeText(uploadType)}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Contenido
            </label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="video">Video</option>
              <option value="pdf">PDF/Documento</option>
              <option value="quiz">Quiz</option>
              <option value="exercise">Ejercicio</option>
              <option value="scorm">Contenido SCORM</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Módulo
            </label>
            <select
              value={selectedModule || ''}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Seleccionar módulo</option>
              {modules.map(module => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archivo
            </label>
            <input
              type="file"
              accept={
                uploadType === 'video' ? 'video/*' :
                uploadType === 'pdf' ? '.pdf' :
                uploadType === 'quiz' ? '.json' :
                uploadType === 'exercise' ? '.md' :
                uploadType === 'scorm' ? '.zip' :
                'audio/*'
              }
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  handleFileUpload(file, uploadType)
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          {isUploading && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Subiendo archivo...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowUploadModal(false)}
            className="btn-secondary"
            disabled={isUploading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
  
  // Componente para una lección individual
  const LessonItem = ({ lesson, moduleId }) => {
    const FileIcon = getFileIcon(lesson.type)
    const StatusIcon = getStatusIcon(lesson.status)
    
    return (
      <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 group border border-white/20">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <Move size={16} className="text-white/60 cursor-move" />
            <FileIcon size={20} className="text-white/80" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-white truncate drop-shadow-sm">{lesson.title}</h4>
              {lesson.isPreview && (
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-400/30">
                  Vista previa
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(lesson.type)}`}>
                {getTypeText(lesson.type)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {lesson.duration}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                <StatusIcon size={12} className="inline mr-1" />
                {getStatusText(lesson.status)}
              </span>
              {lesson.views > 0 && (
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {lesson.views} vistas
                </span>
              )}
              {lesson.completion > 0 && (
                <span className="flex items-center gap-1">
                  <BarChart3 size={12} />
                  {lesson.completion}% completado
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleLessonPreview(moduleId, lesson.id)}
            className={`p-2 rounded-lg transition-colors ${
              lesson.isPreview 
                ? 'text-blue-400 bg-blue-500/20 border border-blue-400/30' 
                : 'text-white/60 hover:text-blue-400 hover:bg-blue-500/20 hover:border hover:border-blue-400/30'
            }`}
            title={lesson.isPreview ? 'Quitar vista previa' : 'Marcar como vista previa'}
          >
            <Eye size={16} />
          </button>
          
          <button 
            onClick={() => handlePlayLesson(moduleId, lesson.id)}
            className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 hover:border hover:border-purple-400/30 rounded-lg transition-colors"
            title="Reproducir lección"
          >
            <Play size={16} />
          </button>
          
          <button 
            onClick={() => handleEditLesson(moduleId, lesson.id)}
            className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 hover:border hover:border-blue-400/30 rounded-lg transition-colors"
            title="Editar lección"
          >
            <Edit size={16} />
          </button>
          
          <button 
            onClick={() => handleDuplicateLesson(moduleId, lesson.id)}
            className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
            title="Duplicar lección"
          >
            <Copy size={16} />
          </button>
          
          <button 
            onClick={() => handleDeleteLesson(moduleId, lesson.id)}
            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 hover:border hover:border-red-400/30 rounded-lg transition-colors"
            title="Eliminar lección"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    )
  }
  
  // Componente para un módulo
  const ModuleItem = ({ module }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 shadow-lg">
      {/* Encabezado del módulo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Move size={16} className="text-white/60 cursor-move" />
            <Folder size={20} className="text-purple-400" />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-white drop-shadow-sm">{module.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                module.isPublished ? 'text-green-400 bg-green-500/20 border border-green-400/30' : 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30'
              }`}>
                {module.isPublished ? 'Publicado' : 'Borrador'}
              </span>
            </div>
            <p className="text-white/80 text-sm drop-shadow-sm">{module.description}</p>
            <div className="flex items-center gap-4 text-sm text-white/70 mt-1">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {module.duration}
              </span>
              <span className="flex items-center gap-1">
                <File size={12} />
                {module.lessons.length} lecciones
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleModulePublish(module.id)}
            className={`p-2 rounded-lg transition-colors ${
              module.isPublished 
                ? 'text-green-400 bg-green-500/20 border border-green-400/30' 
                : 'text-white/60 hover:text-green-400 hover:bg-green-500/20 hover:border hover:border-green-400/30'
            }`}
            title={module.isPublished ? 'Despublicar módulo' : 'Publicar módulo'}
          >
            {module.isPublished ? <Globe size={16} /> : <Lock size={16} />}
          </button>
          
          <button 
            onClick={() => handleEditModule(module.id)}
            className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 hover:border hover:border-blue-400/30 rounded-lg transition-colors"
            title="Editar módulo"
          >
            <Edit size={16} />
          </button>
          
          <button 
            onClick={() => handleModuleOptions(module.id)}
            className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
            title="Más opciones"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      
      {/* Lecciones del módulo */}
      <div className="space-y-2">
        {module.lessons.map((lesson) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            moduleId={module.id}
          />
        ))}
      </div>
      
      {/* Botón para agregar lección */}
      <button
        onClick={() => {
          const newLesson = {
            id: Date.now(),
            title: 'Nueva Lección',
            type: 'video',
            duration: '0:00',
            status: 'draft',
            file: '',
            isPreview: false,
            views: 0,
            completion: 0
          }
          addLesson(module.id, newLesson)
        }}
        className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Agregar Lección
      </button>
    </div>
  )
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="space-y-6 min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#e9d1e6]/15 via-transparent to-[#d0008b]/25"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#a82ba0]/20 via-transparent to-[#e9d1e6]/10"></div>
      
      {/* Partículas flotantes */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400/40 rounded-full kelumy-float"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-pink-400/50 rounded-full kelumy-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-300/60 rounded-full kelumy-float delay-2000"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-300/45 rounded-full kelumy-pulse delay-500"></div>
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-500/50 rounded-full kelumy-float delay-700"></div>
      <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-pink-500/40 rounded-full kelumy-pulse delay-300"></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-purple-400/55 rounded-full kelumy-float delay-1200"></div>
      <div className="absolute bottom-1/3 right-10 w-4 h-4 bg-pink-400/45 rounded-full kelumy-pulse delay-800"></div>
      
      <div className="relative z-10 p-6">
      {/* Encabezado con botones de acción */}
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Materiales del Curso</h2>
            <p className="text-white/80 drop-shadow-md">Organiza el contenido en módulos y lecciones</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <Upload size={16} />
            Subir Contenido
          </button>
            <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center gap-2">
            <Plus size={16} />
            Nuevo Módulo
          </button>
        </div>
      </div>
      
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3">
              <Folder size={20} className="text-blue-400" />
            <div>
                <p className="text-sm text-blue-400">Módulos</p>
                <p className="text-2xl font-bold text-white">{modules.length}</p>
            </div>
          </div>
        </div>
        
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3">
              <File size={20} className="text-green-400" />
            <div>
                <p className="text-sm text-green-400">Lecciones</p>
                <p className="text-2xl font-bold text-white">
                {modules.reduce((sum, module) => sum + module.lessons.length, 0)}
              </p>
            </div>
          </div>
        </div>
        
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3">
              <Clock size={20} className="text-purple-400" />
            <div>
                <p className="text-sm text-purple-400">Duración Total</p>
                <p className="text-2xl font-bold text-white">
                {modules.reduce((sum, module) => {
                  const hours = parseInt(module.duration.split('h')[0]) || 0
                  const minutes = parseInt(module.duration.split('h')[1]?.split('m')[0]) || 0
                  return sum + hours + (minutes / 60)
                }, 0).toFixed(1)}h
              </p>
            </div>
          </div>
        </div>
        
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3">
              <Eye size={20} className="text-orange-400" />
            <div>
                <p className="text-sm text-orange-400">Vistas Totales</p>
                <p className="text-2xl font-bold text-white">
                {modules.reduce((sum, module) => 
                  sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.views, 0), 0
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de módulos */}
      <div className="space-y-4">
        {modules.map((module) => (
          <ModuleItem key={module.id} module={module} />
        ))}
      </div>
      
      {/* Modal de subida de archivos */}
      {showUploadModal && <UploadModal />}
      </div>
    </div>
  )
}

export default CourseMaterials