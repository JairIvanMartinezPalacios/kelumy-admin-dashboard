// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado y efectos
import React, { useState, useEffect } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Play,           // Icono de play para reproducir videos
  Heart,          // Icono de corazón para likes/favoritos
  Share2,         // Icono de compartir para redes sociales
  Star,           // Icono de estrella para calificaciones
  Clock,          // Icono de reloj para duración
  Users,          // Icono de usuarios para estudiantes
  Award,          // Icono de premio para certificados
  BookOpen,       // Icono de libro para cursos
  CheckCircle,    // Icono de check para completado
  ChevronRight,   // Icono de chevron derecha para navegación
  Trophy,         // Icono de trofeo para logros
  ThumbsUp,       // Icono de pulgar arriba para aprobación
  GraduationCap,  // Icono de graduación para educación
  Calendar,       // Icono de calendario para fechas
  Target,         // Icono de objetivo para metas
  Zap,            // Icono de rayo para destacados
  Atom,           // Icono de átomo para ciencias
  Laptop,         // Icono de laptop para tecnología
  GraduationCap as Cap, // Alias para evitar conflicto de nombres
  ArrowLeft,      // Icono de flecha izquierda para retroceso
  Settings,       // Icono de configuración para ajustes
  Eye,            // Icono de ojo para vista previa
  Edit,           // Icono de editar para modificar
  DollarSign,     // Icono de dólar para precios
  TrendingUp,     // Icono de tendencia para popularidad
  Save,           // Icono de guardar para confirmar cambios
  X,              // Icono de X para cerrar
  Plus,           // Icono de más para agregar
  Loader2         // Icono de carga para estados de guardado
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - CourseInfoView
// ========================================

// Define el componente funcional CourseInfoView que muestra información detallada de un curso
// Recibe props: course (objeto del curso), onBack (función para regresar), onEdit (función para editar)
const CourseInfoView = ({ course, onBack, onEdit }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar la pestaña activa en la vista de detalles
  // 'descripcion': información general, 'contenido': estructura del curso, 'instructor': datos del instructor
  const [activeTab, setActiveTab] = useState('descripcion')
  
  // Estados para funcionalidades multimedia
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)    // Control de reproducción de video
  const [isLiked, setIsLiked] = useState(false)                  // Estado de like/favorito
  const [likesCount, setLikesCount] = useState(350)              // Contador de likes
  
  // Estados para edición y guardado
  const [isEditing, setIsEditing] = useState(false)              // Modo de edición activo
  const [editData, setEditData] = useState({})                   // Datos temporales de edición
  const [isSaving, setIsSaving] = useState(false)                // Estado de guardado en progreso
  
  // Estado para mostrar modal de planes de precios
  const [showPricingPlans, setShowPricingPlans] = useState(false)
  
  // ========================================
  // DATOS DE EJEMPLO - Información del curso
  // ========================================
  
  const [courseInfo, setCourseInfo] = useState({
    id: 1,
    title: 'Cálculo Diferencial e Integral',
    description: 'Domina los conceptos fundamentales del cálculo diferencial e integral con el método MQ+Disruptivo',
    instructor: {
      name: 'Dr. Carlos Mendoza',
      title: 'Asesor ClonyTec',
      avatar: '/images/instructor-avatar.jpg',
      bio: 'Matemático con más de 15 años de experiencia en educación superior. Especialista en métodos disruptivos de enseñanza.',
      rating: 4.8,
      recognitions: 130,
      students: 250,
      courses: 20
    },
    videoPreview: '/videos/calculo-preview.mp4',
    thumbnail: '/images/calculo-thumbnail.jpg',
    modality: 'En línea',
    classes: '18',
    hoursPerDay: '2-3 horas',
    months: '3 meses',
    performance: '95% aprobación',
    rating: 4.8,
    totalRatings: 156,
    students: 2156,
    duration: '45 horas',
    level: 'Intermedio',
    category: 'Matemáticas',
    learningOutcomes: [
      'Comprender los conceptos fundamentales de límites y continuidad',
      'Aplicar las reglas de derivación en funciones complejas',
      'Resolver problemas de optimización usando derivadas',
      'Integrar funciones por diferentes métodos',
      'Aplicar el cálculo integral en problemas prácticos'
    ],
    teachingAreas: [
      'Límites y continuidad',
      'Derivadas',
      'Aplicaciones de derivadas',
      'Integrales indefinidas',
      'Integrales definidas',
      'Aplicaciones de integrales'
    ],
    price: 4500,
    originalPrice: 6000,
    discount: 25,
    period: 'Curso Completo',
    features: [
      'Acceso completo a los 3 niveles',
      'Material descargable',
      'Certificado digital',
      'Soporte 24/7',
      'Acceso de por vida',
      'Actualizaciones gratuitas'
    ]
  })
  
  // Datos de los planes individuales
  const [individualPlans] = useState([
    {
      id: 'basico',
      name: 'Fundamentos del Cálculo',
      description: 'Introducción a límites, continuidad y derivadas básicas',
      price: 99,
      originalPrice: 199,
      discount: 50,
      features: [
        'Conceptos básicos de límites',
        'Continuidad de funciones',
        'Derivadas elementales',
        'Aplicaciones básicas'
      ]
    },
    {
      id: 'intermedio',
      name: 'Cálculo Integral',
      description: 'Técnicas de integración y aplicaciones',
      price: 149,
      originalPrice: 299,
      discount: 50,
      features: [
        'Integrales indefinidas',
        'Técnicas de integración',
        'Aplicaciones geométricas',
        'Proyectos prácticos'
      ]
    },
    {
      id: 'avanzado',
      name: 'Cálculo Multivariable',
      description: 'Funciones de varias variables y cálculo vectorial',
      price: 199,
      originalPrice: 399,
      discount: 50,
      features: [
        'Funciones de varias variables',
        'Derivadas parciales',
        'Integrales múltiples',
        'Certificación avanzada'
      ]
    }
  ])
  
  // ========================================
  // EFECTOS - useEffect hooks
  // ========================================
  
  // Cargar datos desde localStorage al inicializar
  useEffect(() => {
    const savedData = localStorage.getItem(`courseInfo_${course?.id || 1}`)
    if (savedData) {
      setCourseInfo(JSON.parse(savedData))
    }
  }, [course?.id])
  
  // ========================================
  // FUNCIONES DE MANEJO - Event handlers
  // ========================================
  
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }
  
  const handleShare = () => {
    // Lógica para compartir
    console.log('Compartir curso')
  }
  
  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
  }
  
  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...courseInfo })
  }
  
  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Aquí iría la lógica para guardar en el backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Actualizar el estado principal
      setCourseInfo(editData)
      
      // Guardar en localStorage
      localStorage.setItem(`courseInfo_${course?.id || 1}`, JSON.stringify(editData))
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error al guardar:', error)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleCancel = () => {
    setIsEditing(false)
    setEditData({ ...courseInfo })
  }
  
  const handleInputChange = (path, value) => {
    if (path.includes('.')) {
      const [parent, child] = path.split('.')
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setEditData(prev => ({
        ...prev,
        [path]: value
      }))
    }
  }
  
  const handleArrayChange = (path, index, value) => {
    setEditData(prev => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]][index] = value
      return newData
    })
  }
  
  const addArrayItem = (path, defaultValue) => {
    setEditData(prev => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]].push(defaultValue)
      return newData
    })
  }
  
  const removeArrayItem = (path, index) => {
    setEditData(prev => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]].splice(index, 1)
      return newData
    })
  }
  
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="text-yellow-400 fill-current" />
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} className="text-yellow-400 fill-current opacity-50" />
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-white/30" />
      )
    }
    
    return stars
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para las características del curso (badges superiores)
  const CourseFeatures = () => {
    const currentData = isEditing ? editData : courseInfo
    
    return (
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-sm font-medium border border-blue-400/30">
          <Users size={16} />
          {isEditing ? (
            <input
              type="text"
              value={currentData.modality}
              onChange={(e) => handleInputChange('modality', e.target.value)}
              className="bg-transparent border-none outline-none text-blue-400 font-medium"
            />
          ) : (
            currentData.modality
          )}
        </div>
        <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm font-medium border border-green-400/30">
          <Calendar size={16} />
          + {isEditing ? (
            <input
              type="text"
              value={currentData.classes}
              onChange={(e) => handleInputChange('classes', e.target.value)}
              className="bg-transparent border-none outline-none text-green-400 font-medium w-16"
            />
          ) : (
            currentData.classes
          )} clases
        </div>
        <div className="flex items-center gap-2 bg-purple-500/20 text-purple-400 px-3 py-2 rounded-lg text-sm font-medium border border-purple-400/30">
          <Clock size={16} />
          {isEditing ? (
            <input
              type="text"
              value={currentData.hoursPerDay}
              onChange={(e) => handleInputChange('hoursPerDay', e.target.value)}
              className="bg-transparent border-none outline-none text-purple-400 font-medium w-20"
            />
          ) : (
            currentData.hoursPerDay
          )}
        </div>
        <div className="flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-2 rounded-lg text-sm font-medium border border-orange-400/30">
          <Calendar size={16} />
          {isEditing ? (
            <input
              type="text"
              value={currentData.months}
              onChange={(e) => handleInputChange('months', e.target.value)}
              className="bg-transparent border-none outline-none text-orange-400 font-medium w-20"
            />
          ) : (
            currentData.months
          )}
        </div>
        <div className="flex items-center gap-2 bg-pink-500/20 text-pink-400 px-3 py-2 rounded-lg text-sm font-medium border border-pink-400/30">
          <TrendingUp size={16} />
          {isEditing ? (
            <input
              type="text"
              value={currentData.performance}
              onChange={(e) => handleInputChange('performance', e.target.value)}
              className="bg-transparent border-none outline-none text-pink-400 font-medium w-24"
            />
          ) : (
            currentData.performance
          )}
        </div>
      </div>
    )
  }
  
  // Componente para el video preview
  const VideoPreview = () => {
    const currentData = isEditing ? editData : courseInfo
    
    return (
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden mb-6 shadow-lg">
        <div className="aspect-video relative">
          {!isVideoPlaying ? (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Play size={32} className="ml-1" />
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={currentData.instructor.name}
                      onChange={(e) => handleInputChange('instructor.name', e.target.value)}
                      className="bg-transparent border-none outline-none text-white text-xl font-bold text-center w-full"
                    />
                    <input
                      type="text"
                      value={currentData.instructor.title}
                      onChange={(e) => handleInputChange('instructor.title', e.target.value)}
                      className="bg-transparent border-none outline-none text-white text-sm opacity-90 text-center w-full"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-2">{currentData.instructor.name}</h3>
                    <p className="text-sm opacity-90">{currentData.instructor.title}</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
            >
              <source src={currentData.videoPreview} type="video/mp4" />
            </video>
          )}
          
          <button
            onClick={handlePlayVideo}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Play size={24} className="ml-1 text-white" />
            </div>
          </button>
        </div>
        
        {/* Información del instructor */}
        <div className="p-6 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {currentData.instructor.name.charAt(0)}
                </span>
              </div>
              <div>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={currentData.instructor.name}
                      onChange={(e) => handleInputChange('instructor.name', e.target.value)}
                      className="bg-transparent border-none outline-none text-white font-bold text-lg"
                    />
                    <input
                      type="text"
                      value={currentData.instructor.title}
                      onChange={(e) => handleInputChange('instructor.title', e.target.value)}
                      className="bg-transparent border-none outline-none text-white/80 text-sm block w-full"
                    />
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-white">{currentData.instructor.name}</h4>
                    <p className="text-sm text-white/80">{currentData.instructor.title}</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-400 border border-red-400/30' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                }`}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                <span className="text-sm font-medium">{likesCount}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <Share2 size={16} />
                <span className="text-sm font-medium">Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Componente para las pestañas de contenido
  const ContentTabs = () => (
    <div className="mb-8">
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm p-1 rounded-xl border border-white/20">
        {[
          { id: 'descripcion', label: 'Descripción' },
          { id: 'aprenderas', label: 'Aprenderás a' },
          { id: 'areas', label: 'Áreas de enseñanza' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
  
  // Componente para el contenido de las pestañas
  const TabContent = () => {
    const currentData = isEditing ? editData : courseInfo
    
    switch (activeTab) {
      case 'descripcion':
        return (
          <div className="space-y-6">
            {isEditing ? (
              <textarea
                value={currentData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-4 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white bg-white/10 backdrop-blur-sm"
                rows={4}
              />
            ) : (
              <p className="text-white/90 leading-relaxed">
                {currentData.description}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-white">Características del curso:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Acceso de por vida</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Certificado digital</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Soporte 24/7</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-white">Incluye:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Material descargable</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Ejercicios prácticos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Actualizaciones gratuitas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
        
      case 'aprenderas':
        return (
          <div className="space-y-4">
            <p className="text-white/90 mb-6">
              Al finalizar este curso, habrás desarrollado las siguientes competencias:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
                  <CheckCircle size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => handleArrayChange('learningOutcomes', index, e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white font-medium"
                      />
                      <button
                        onClick={() => removeArrayItem('learningOutcomes', index)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-white font-medium">{outcome}</span>
                  )}
                </div>
              ))}
            </div>
            
            {isEditing && (
              <button
                onClick={() => addArrayItem('learningOutcomes', 'Nueva competencia')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-400/30"
              >
                <Plus size={16} />
                Agregar competencia
              </button>
            )}
          </div>
        )
        
      case 'areas':
        return (
          <div className="space-y-6">
            <p className="text-white/90 mb-6">
              Este curso cubre las siguientes áreas de conocimiento y desarrollo:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentData.teachingAreas.map((area, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg text-center border border-blue-400/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => handleArrayChange('teachingAreas', index, e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-white text-center"
                      />
                      <button
                        onClick={() => removeArrayItem('teachingAreas', index)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-white">{area}</span>
                  )}
                </div>
              ))}
            </div>
            
            {isEditing && (
              <button
                onClick={() => addArrayItem('teachingAreas', 'Nueva área')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-400/30"
              >
                <Plus size={16} />
                Agregar área
              </button>
            )}
          </div>
        )
        
      default:
        return null
    }
  }
  
  // Componente para la barra lateral de precios y beneficios
  const Sidebar = () => {
    const currentData = isEditing ? editData : courseInfo
    
    return (
      <div className="space-y-6">
        {/* Precios */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
          <div className="text-center mb-6">
            {isEditing ? (
              <input
                type="text"
                value={currentData.period}
                onChange={(e) => handleInputChange('period', e.target.value)}
                className="text-lg font-bold text-white mb-2 bg-transparent border-none outline-none text-center w-full drop-shadow-sm"
              />
            ) : (
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-sm">{currentData.period}</h3>
            )}
             <p className="text-sm text-white/80 mb-4 drop-shadow-sm">Incluye los 3 niveles completos</p>
             <div className="flex items-center justify-center gap-3 mb-2">
               {isEditing ? (
                 <div className="flex items-center gap-2">
                   <span className="text-white/60">$</span>
                   <input
                     type="number"
                     value={currentData.price}
                     onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                     className="text-3xl font-bold text-white bg-transparent border-none outline-none text-center w-24 drop-shadow-sm"
                   />
                   <span className="text-white/60">$</span>
                   <input
                     type="number"
                     value={currentData.originalPrice}
                     onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value) || 0)}
                     className="text-lg text-white/60 line-through bg-transparent border-none outline-none text-center w-20 drop-shadow-sm"
                   />
                   <input
                     type="number"
                     value={currentData.discount}
                     onChange={(e) => handleInputChange('discount', parseInt(e.target.value) || 0)}
                     className="text-sm bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-bold text-center w-12 border border-red-400/30"
                   />
                   <span className="text-sm text-white/60">%</span>
                 </div>
               ) : (
                 <div className="flex items-center gap-3">
                   <span className="text-3xl font-bold text-white drop-shadow-sm">${currentData.price}</span>
                   <span className="text-lg text-white/60 line-through drop-shadow-sm">${currentData.originalPrice}</span>
                   <span className="text-sm bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-bold border border-red-400/30">
                     -{currentData.discount}%
                   </span>
                 </div>
               )}
             </div>
             <p className="text-white/80 text-sm drop-shadow-sm">Pago único, acceso de por vida</p>
          </div>
          
          {/* Botón de compra principal */}
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4">
            Comprar Curso Completo
          </button>
          
          {/* Botón para ver planes individuales */}
          <button
            onClick={() => setShowPricingPlans(true)}
            className="w-full py-3 bg-white/10 text-white/80 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            Ver Planes Individuales
          </button>
          
          {/* Características */}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-white mb-3">Incluye:</h4>
            {currentData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                <span className="text-white/80 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Información del instructor */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
          <h4 className="font-semibold text-white mb-4">Sobre el instructor</h4>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {currentData.instructor.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-white mb-1">{currentData.instructor.name}</h5>
              <p className="text-white/80 text-sm mb-2">{currentData.instructor.title}</p>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" />
                  <span>{currentData.instructor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{currentData.instructor.students} estudiantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
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
      
      <div className="relative z-10">
        {/* Header con navegación */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Volver a la lista</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-colors">
                <Eye size={20} />
              </button>
            </div>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
              >
                <Edit size={20} />
              </button>
            )}
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna principal - Información del curso */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Título del curso */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
                {isEditing ? (
                  <input
                    type="text"
                    value={isEditing ? editData.title : courseInfo.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="text-3xl font-bold text-white bg-transparent border-none outline-none w-full drop-shadow-sm"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-white drop-shadow-sm">{courseInfo.title}</h1>
                )}
              </div>
              
              {/* Características del curso */}
              <CourseFeatures />
              
              {/* Video preview */}
              <VideoPreview />
              
              {/* Pestañas de contenido */}
              <ContentTabs />
              
              {/* Contenido de las pestañas */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-lg">
                <TabContent />
              </div>
            </div>
            
            {/* Barra lateral */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de planes individuales */}
      {showPricingPlans && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-6xl my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-scale-in border border-white/30 relative overflow-hidden scrollbar-hide">
            {/* Efectos de fondo líquido */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e9d1e6]/20 via-transparent to-[#d0008b]/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#a82ba0]/10 via-transparent to-[#e9d1e6]/15"></div>
            
            {/* Header del modal */}
            <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 p-4 sm:p-6 rounded-t-3xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Planes Individuales</h2>
                <button
                  onClick={() => setShowPricingPlans(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90 group"
                >
                  <X size={24} className="transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>
            </div>
            
            {/* Contenido del modal */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {individualPlans.map((plan, index) => {
                  const isRecommended = index === 1; // El plan intermedio es el recomendado
                  return (
                    <div key={plan.id} className={`relative ${isRecommended ? 'md:-mt-0 md:mb-0' : ''}`}>
                      {/* Badge de recomendado */}
                      {isRecommended && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                          <div className="bg-white/10 backdrop-blur-2xl text-white px-6 py-2 rounded-full text-sm font-bold shadow-2xl border border-white/40">
                            Más Popular
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg hover:bg-white/15 hover:shadow-2xl transition-all duration-300 h-full">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">{plan.name}</h3>
                          <p className="text-white/80 text-sm mb-4 drop-shadow-sm">{plan.description}</p>
                          
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-3xl font-bold text-white drop-shadow-sm">${plan.price}</span>
                            <span className="text-lg text-white/60 line-through drop-shadow-sm">${plan.originalPrice}</span>
                            <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs font-bold border border-red-500/30">
                              -{plan.discount}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-3">
                              <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-white/90 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                          Comprar {plan.name}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Promoción del curso completo */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2 drop-shadow-sm">¿Prefieres el curso completo?</h3>
                <p className="text-purple-100 mb-4 drop-shadow-sm">
                  Ahorra más comprando los 3 niveles juntos
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl font-bold drop-shadow-sm">$4,500</span>
                  <span className="text-lg line-through opacity-75 drop-shadow-sm">$6,000</span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-bold">
                    -25%
                  </span>
                </div>
                <button className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30">
                  Comprar Curso Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseInfoView