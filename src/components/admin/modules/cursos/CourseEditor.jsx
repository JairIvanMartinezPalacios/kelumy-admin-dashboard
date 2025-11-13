// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Save,         // Icono de guardar para acciones de guardado
  Eye,          // Icono de ojo para vista previa
  Upload,       // Icono de subida para carga de archivos
  X,            // Icono de X para cerrar o eliminar
  Image,        // Icono de imagen para elementos visuales
  DollarSign,   // Icono de dólar para precios y monetización
  Tag,          // Icono de etiqueta para categorización
  Calendar,     // Icono de calendario para fechas
  Clock,        // Icono de reloj para duración
  Star,         // Icono de estrella para calificaciones
  CheckCircle,  // Icono de check para completado
  AlertCircle,  // Icono de alerta para errores
  BookOpen,     // Icono de libro para cursos
  Users,        // Icono de usuarios para estudiantes
  Target,       // Icono de objetivo para metas
  Zap,          // Icono de rayo para destacados
  Play,         // Icono de play para videos
  Plus,         // Icono de más para agregar elementos
  Trash2,       // Icono de basura para eliminar
  Edit3,        // Icono de editar para modificar
  Move,         // Icono de mover para reorganizar
  Copy,         // Icono de copiar para duplicar
  EyeOff,       // Icono de ojo cerrado para ocultar
  Lock,         // Icono de candado para privacidad
  Globe         // Icono de globo para público/privado
} from 'lucide-react'

// ========================================
// COMPONENTE - CourseEditor
// ========================================

// Define el componente funcional CourseEditor que permite crear y editar cursos
// Recibe props: course (curso existente para editar), onSave (función de guardado), onCancel (función de cancelación)
const CourseEditor = ({ course = null, onSave, onCancel }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado principal que contiene todos los datos del formulario del curso
  // Se inicializa con los valores del curso existente o valores por defecto
  const [formData, setFormData] = useState({
    title: course?.title || '',                    // Título del curso
    subtitle: course?.subtitle || '',              // Subtítulo del curso
    description: course?.description || '',        // Descripción detallada
    category: course?.category || '',              // Categoría principal
    subcategory: course?.subcategory || '',        // Subcategoría específica
    level: course?.level || 'beginner',            // Nivel de dificultad
    language: course?.language || 'es',            // Idioma del curso
    price: course?.price || 0,                     // Precio actual
    originalPrice: course?.originalPrice || 0,     // Precio original
    status: course?.status || 'draft',             // Estado del curso
    featured: course?.featured || false,           // Si está destacado
    duration: course?.duration || '',              // Duración estimada
    instructor: course?.instructor || '',          // Nombre del instructor
    requirements: course?.requirements || '',      // Requisitos previos
    objectives: course?.objectives || '',          // Objetivos del curso
    coverImage: course?.coverImage || null,        // Imagen de portada
    trailerVideo: course?.trailerVideo || null,    // Video trailer
    tags: course?.tags || [],                      // Etiquetas del curso
    isPublic: course?.isPublic || false,           // Si es público
    allowComments: course?.allowComments || true,  // Si permite comentarios
    certificate: course?.certificate || true       // Si otorga certificado
  })
  
  // Estado para almacenar errores de validación del formulario
  const [errors, setErrors] = useState({})
  
  // Estado para la vista previa de la imagen de portada
  const [imagePreview, setImagePreview] = useState(course?.coverImage || null)
  
  // Estado para controlar el paso actual del formulario multi-paso
  const [activeStep, setActiveStep] = useState(1)
  
  // Estado para el input temporal de nueva etiqueta
  const [newTag, setNewTag] = useState('')
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData(prev => ({
          ...prev,
          coverImage: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }
  
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }
  
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'El título es requerido'
    if (!formData.subtitle.trim()) newErrors.subtitle = 'El subtítulo es requerido'
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida'
    if (!formData.instructor.trim()) newErrors.instructor = 'El instructor es requerido'
    if (formData.price < 0) newErrors.price = 'El precio no puede ser negativo'
    if (formData.originalPrice < 0) newErrors.originalPrice = 'El precio original no puede ser negativo'
    if (formData.originalPrice < formData.price) newErrors.originalPrice = 'El precio original debe ser mayor al precio de venta'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para el paso de información básica
  const BasicInfoStep = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <BookOpen size={20} />
          Información Básica del Curso
        </h3>
        
        <div className="space-y-6">
          {/* Título y subtítulo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Título del Curso *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                  errors.title ? 'border-red-500' : 'border-white/30'
                }`}
                placeholder="Ej: React desde Cero hasta Experto"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Subtítulo *
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                  errors.subtitle ? 'border-red-500' : 'border-white/30'
                }`}
                placeholder="Una descripción corta y atractiva del curso"
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm text-red-400">{errors.subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Descripción Completa *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                errors.description ? 'border-red-500' : 'border-white/30'
              }`}
              placeholder="Describe detalladamente qué aprenderán los estudiantes en este curso..."
            />
            {errors.description && (
                <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>
          
          {/* Categoría y subcategoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Categoría Principal
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              >
                <option value="">Seleccionar categoría</option>
                <option value="programming">Programación</option>
                <option value="design">Diseño</option>
                <option value="business">Negocios</option>
                <option value="marketing">Marketing</option>
                <option value="data">Ciencia de Datos</option>
                <option value="languages">Idiomas</option>
                <option value="other">Otro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Subcategoría
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              >
                <option value="">Seleccionar subcategoría</option>
                <option value="web-development">Desarrollo Web</option>
                <option value="mobile-development">Desarrollo Móvil</option>
                <option value="game-development">Desarrollo de Juegos</option>
                <option value="ui-design">Diseño UI/UX</option>
                <option value="graphic-design">Diseño Gráfico</option>
                <option value="digital-marketing">Marketing Digital</option>
                <option value="data-analysis">Análisis de Datos</option>
              </select>
            </div>
          </div>
          
          {/* Nivel e instructor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Nivel del Curso
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              >
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
                <option value="expert">Experto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Instructor *
              </label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                  errors.instructor ? 'border-red-500' : 'border-white/30'
                }`}
                placeholder="Nombre del instructor"
              />
              {errors.instructor && (
                <p className="mt-1 text-sm text-red-400">{errors.instructor}</p>
              )}
            </div>
          </div>
          
          {/* Duración e idioma */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Duración Estimada (horas)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                placeholder="Ej: 45"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Idioma del Curso
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
                <option value="pt">Portugués</option>
                <option value="fr">Francés</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para el paso de multimedia
  const MediaStep = () => (
    <div className="space-y-6">
      {/* Imagen de portada */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <Image size={20} />
          Imagen de Portada
        </h3>
        
        <div className="flex items-center gap-6">
          <div className="w-48 h-32 bg-white/5 backdrop-blur-sm rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <Image className="text-gray-400 mx-auto mb-2" size={32} />
                <p className="text-sm text-gray-500">Sin imagen</p>
              </div>
            )}
          </div>
          
          <div>
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="coverImage"
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Upload size={16} />
              Subir Imagen
            </label>
            <p className="text-xs text-white/60 mt-2">
              Recomendado: 1280x720px, JPG o PNG<br />
              Máximo 2MB
            </p>
          </div>
        </div>
      </div>
      
      {/* Video de presentación */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <Play size={20} />
          Video de Presentación
        </h3>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 backdrop-blur-sm">
            <Play size={48} className="text-white/60 mx-auto mb-4" />
            <p className="text-white/80 mb-4">Sube un video de presentación del curso</p>
            <button className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto">
              <Upload size={16} />
              Subir Video
            </button>
            <p className="text-xs text-white/60 mt-2">
              Máximo 2 minutos, MP4 o MOV
            </p>
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para el paso de precios
  const PricingStep = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <DollarSign size={20} />
          Configuración de Precios
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Precio de Venta ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                errors.price ? 'border-red-500' : 'border-white/30'
              }`}
              placeholder="0.00"
            />
            {errors.price && (
                <p className="mt-1 text-sm text-red-400">{errors.price}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Precio Original ($)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                errors.originalPrice ? 'border-red-500' : 'border-white/30'
              }`}
              placeholder="0.00"
            />
            {errors.originalPrice && (
                <p className="mt-1 text-sm text-red-400">{errors.originalPrice}</p>
            )}
          </div>
        </div>
        
        {formData.originalPrice > formData.price && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Descuento:</strong> {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% de descuento
            </p>
          </div>
        )}
      </div>
      
      {/* Configuraciones adicionales */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <Settings size={20} />
          Configuraciones Adicionales
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Curso Destacado</h4>
              <p className="text-sm text-white/70">Aparecerá en la sección de cursos destacados</p>
            </div>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Curso Público</h4>
              <p className="text-sm text-white/70">Visible para todos los usuarios</p>
            </div>
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleInputChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Permitir Comentarios</h4>
              <p className="text-sm text-white/70">Los estudiantes pueden comentar en el curso</p>
            </div>
            <input
              type="checkbox"
              name="allowComments"
              checked={formData.allowComments}
              onChange={handleInputChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Certificado de Finalización</h4>
              <p className="text-sm text-white/70">Emitir certificado al completar el curso</p>
            </div>
            <input
              type="checkbox"
              name="certificate"
              checked={formData.certificate}
              onChange={handleInputChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  )
  
  // Componente para el paso de contenido
  const ContentStep = () => (
    <div className="space-y-6">
      {/* Requisitos previos */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <Target size={20} />
          Requisitos Previos
        </h3>
        
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
          placeholder="¿Qué conocimientos previos necesita el estudiante para tomar este curso?"
        />
      </div>
      
      {/* Objetivos del curso */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <Zap size={20} />
          Objetivos de Aprendizaje
        </h3>
        
        <textarea
          name="objectives"
          value={formData.objectives}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
          placeholder="¿Qué aprenderá el estudiante al completar este curso?"
        />
      </div>
      
      {/* Tags */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-sm">
          <Tag size={20} />
          Etiquetas del Curso
        </h3>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              placeholder="Agregar etiqueta..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-primary-600 hover:text-primary-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  const steps = [
    { id: 1, title: 'Información Básica', component: BasicInfoStep },
    { id: 2, title: 'Multimedia', component: MediaStep },
    { id: 3, title: 'Precios', component: PricingStep },
    { id: 4, title: 'Contenido', component: ContentStep }
  ]
  
  return (
    <div className="max-w-6xl mx-auto min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
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
      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {course ? 'Editar Curso' : 'Crear Nuevo Curso'}
            </h1>
              <p className="text-white/80 drop-shadow-md">
              {course ? 'Modifica la información de tu curso' : 'Completa la información para crear tu curso'}
            </p>
          </div>
          <button
            onClick={onCancel}
              className="text-white/60 hover:text-white transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                activeStep >= step.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/20 text-white/60 border border-white/30'
              }`}>
                {step.id}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                  activeStep >= step.id ? 'text-white drop-shadow-sm' : 'text-white/60'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                    activeStep > step.id ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {steps[activeStep - 1].component()}
        
        {/* Navegación */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300"
            >
              Cancelar
            </button>
            
            {activeStep < steps.length ? (
              <button
                type="button"
                onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center gap-2"
              >
                <Save size={16} />
                {course ? 'Actualizar Curso' : 'Crear Curso'}
              </button>
            )}
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default CourseEditor