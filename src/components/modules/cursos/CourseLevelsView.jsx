// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado y efectos
import React, { useState, useEffect } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  CheckCircle,   // Icono de check para completado
  Clock,         // Icono de reloj para duración
  Users,         // Icono de usuarios para estudiantes
  DollarSign,    // Icono de dólar para precios
  TrendingUp,    // Icono de tendencia para popularidad
  BookOpen,      // Icono de libro para cursos
  Target,        // Icono de objetivo para metas
  Zap,           // Icono de rayo para destacados
  Award,         // Icono de premio para certificados
  Star,          // Icono de estrella para calificaciones
  ChevronRight,  // Icono de chevron derecha para navegación
  Play,          // Icono de play para reproducir
  Edit,          // Icono de editar para modificar
  Eye,           // Icono de ojo para vista previa
  Settings,      // Icono de configuración para ajustes
  BarChart3,     // Icono de gráfico para analytics
  Save,          // Icono de guardar para confirmar cambios
  X,             // Icono de X para cerrar
  Plus,          // Icono de más para agregar
  Loader2        // Icono de carga para estados de guardado
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - CourseLevelsView
// ========================================

// Define el componente funcional CourseLevelsView que gestiona los diferentes niveles de un curso
// Recibe props: course (objeto del curso), onBack (función para regresar), onEdit (función para editar)
const CourseLevelsView = ({ course, onBack, onEdit }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para el nivel seleccionado actualmente
  // 'basico': nivel principiante, 'intermedio': nivel intermedio, 'avanzado': nivel avanzado
  const [selectedLevel, setSelectedLevel] = useState('basico')
  
  // Estados para funcionalidad de edición
  const [isEditing, setIsEditing] = useState(false)    // Modo de edición activo
  const [editData, setEditData] = useState({})         // Datos temporales de edición
  const [isSaving, setIsSaving] = useState(false)      // Estado de guardado en progreso
  
  // ========================================
  // DATOS DE EJEMPLO - Niveles del curso
  // ========================================
  
  const [courseLevels, setCourseLevels] = useState([
    {
      id: 'basico',
      name: 'Fundamentos del Cálculo',
      description: 'Introducción a límites, continuidad y derivadas básicas',
      price: 99,
      originalPrice: 199,
      discount: 50,
      duration: '15 horas',
      sessions: 6,
      activities: 12,
      students: 750,
      revenue: 74250,
      completionRate: 78,
      isSelected: true,
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
      duration: '20 horas',
      sessions: 8,
      activities: 18,
      students: 650,
      revenue: 96850,
      completionRate: 82,
      isSelected: false,
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
      duration: '25 horas',
      sessions: 10,
      activities: 22,
      students: 756,
      revenue: 150444,
      completionRate: 85,
      isSelected: false,
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
    const savedData = localStorage.getItem(`courseLevels_${course?.id || 1}`)
    if (savedData) {
      setCourseLevels(JSON.parse(savedData))
    }
  }, [course?.id])
  
  // ========================================
  // FUNCIONES DE MANEJO - Event handlers
  // ========================================
  
  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId)
    setCourseLevels(prev => prev.map(level => ({
      ...level,
      isSelected: level.id === levelId
    })))
  }
  
  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...courseLevels })
  }
  
  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Aquí iría la lógica para guardar en el backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Actualizar el estado principal
      setCourseLevels(editData)
      
      // Guardar en localStorage
      localStorage.setItem(`courseLevels_${course?.id || 1}`, JSON.stringify(editData))
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error al guardar:', error)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleCancel = () => {
    setIsEditing(false)
    setEditData({ ...courseLevels })
  }
  
  const handleInputChange = (levelIndex, field, value) => {
    setEditData(prev => {
      const newData = [...prev]
      newData[levelIndex] = {
        ...newData[levelIndex],
        [field]: value
      }
      return newData
    })
  }
  
  const handleArrayChange = (levelIndex, field, itemIndex, value) => {
    setEditData(prev => {
      const newData = [...prev]
      newData[levelIndex] = {
        ...newData[levelIndex],
        [field]: newData[levelIndex][field].map((item, index) => 
          index === itemIndex ? value : item
        )
      }
      return newData
    })
  }
  
  const addArrayItem = (levelIndex, field, defaultValue) => {
    setEditData(prev => {
      const newData = [...prev]
      newData[levelIndex] = {
        ...newData[levelIndex],
        [field]: [...newData[levelIndex][field], defaultValue]
      }
      return newData
    })
  }
  
  const removeArrayItem = (levelIndex, field, itemIndex) => {
    setEditData(prev => {
      const newData = [...prev]
      newData[levelIndex] = {
        ...newData[levelIndex],
        [field]: newData[levelIndex][field].filter((_, index) => index !== itemIndex)
      }
      return newData
    })
  }
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  const getLevelGradient = (levelId) => {
    switch (levelId) {
      case 'basico': return 'from-green-500 to-green-600'
      case 'intermedio': return 'from-yellow-500 to-yellow-600'
      case 'avanzado': return 'from-red-500 to-red-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }
  
  const getLevelBadgeColor = (levelId) => {
    switch (levelId) {
      case 'basico': return 'bg-green-500/20 text-green-400 border border-green-400/30'
      case 'intermedio': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
      case 'avanzado': return 'bg-red-500/20 text-red-400 border border-red-400/30'
      default: return 'bg-white/10 text-white/70 border border-white/20'
    }
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para la tarjeta de nivel individual
  const LevelCard = ({ level, levelIndex, isSelected, onSelect }) => {
    const currentData = isEditing ? editData[levelIndex] : level
    
    return (
      <div 
        className={`relative bg-white/10 backdrop-blur-xl rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl shadow-lg ${
          isSelected 
            ? 'border-purple-400 shadow-lg ring-2 ring-purple-400/30' 
            : 'border-white/20 hover:border-white/40'
        }`}
        onClick={() => onSelect(level.id)}
      >
        {/* Indicador de nivel seleccionado */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle size={12} />
            Nivel Seleccionado
          </div>
        )}
        
        {/* Header del nivel */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={currentData.name}
                    onChange={(e) => handleInputChange(levelIndex, 'name', e.target.value)}
                    className="text-xl font-bold text-white bg-transparent border-none outline-none w-full drop-shadow-sm"
                  />
                  <textarea
                    value={currentData.description}
                    onChange={(e) => handleInputChange(levelIndex, 'description', e.target.value)}
                    className="text-white/80 text-sm bg-transparent border-none outline-none w-full resize-none drop-shadow-sm"
                    rows={2}
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">{currentData.name}</h3>
                  <p className="text-white/80 text-sm mb-3 drop-shadow-sm">{currentData.description}</p>
                </>
              )}
            </div>
            
            {/* Precio */}
            <div className="text-right ml-4">
              {isEditing ? (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/60">$</span>
                  <input
                    type="number"
                    value={currentData.price}
                    onChange={(e) => handleInputChange(levelIndex, 'price', parseInt(e.target.value) || 0)}
                    className="text-2xl font-bold text-white bg-transparent border-none outline-none text-right w-20 drop-shadow-sm"
                  />
                  <span className="text-white/60">$</span>
                  <input
                    type="number"
                    value={currentData.originalPrice}
                    onChange={(e) => handleInputChange(levelIndex, 'originalPrice', parseInt(e.target.value) || 0)}
                    className="text-sm text-white/60 line-through bg-transparent border-none outline-none text-right w-16 drop-shadow-sm"
                  />
                  <input
                    type="number"
                    value={currentData.discount}
                    onChange={(e) => handleInputChange(levelIndex, 'discount', parseInt(e.target.value) || 0)}
                    className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-bold text-center w-12 border border-red-500/30"
                  />
                  <span className="text-xs text-white/60">%</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-white drop-shadow-sm">${currentData.price}</span>
                  <span className="text-sm text-white/60 line-through drop-shadow-sm">${currentData.originalPrice}</span>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-bold border border-red-500/30">
                    -{currentData.discount}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Badge de nivel */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(level.id)}`}>
            {level.id.charAt(0).toUpperCase() + level.id.slice(1)}
          </span>
        </div>
        
        {/* Estadísticas del nivel */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-white/60" />
            {isEditing ? (
              <input
                type="text"
                value={currentData.duration}
                onChange={(e) => handleInputChange(levelIndex, 'duration', e.target.value)}
                className="text-white/70 bg-transparent border-none outline-none w-20"
              />
            ) : (
              <span className="text-white/70">{currentData.duration}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Play size={16} className="text-white/60" />
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={currentData.sessions}
                  onChange={(e) => handleInputChange(levelIndex, 'sessions', parseInt(e.target.value) || 0)}
                  className="text-white/70 bg-transparent border-none outline-none w-12"
                />
                <span className="text-white/70">sesiones</span>
              </div>
            ) : (
              <span className="text-white/70">{currentData.sessions} sesiones</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-white/60" />
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={currentData.activities}
                  onChange={(e) => handleInputChange(levelIndex, 'activities', parseInt(e.target.value) || 0)}
                  className="text-white/70 bg-transparent border-none outline-none w-12"
                />
                <span className="text-white/70">actividades</span>
              </div>
            ) : (
              <span className="text-white/70">{currentData.activities} actividades</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-white/60" />
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={currentData.students}
                  onChange={(e) => handleInputChange(levelIndex, 'students', parseInt(e.target.value) || 0)}
                  className="text-white/70 bg-transparent border-none outline-none w-16"
                />
                <span className="text-white/70">estudiantes</span>
              </div>
            ) : (
              <span className="text-white/70">{currentData.students} estudiantes</span>
            )}
          </div>
        </div>
        
        {/* Características del nivel */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white/90 mb-2">Características:</h4>
          <div className="space-y-1">
            {currentData.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                {isEditing ? (
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange(levelIndex, 'features', featureIndex, e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white/80 text-sm"
                    />
                    <button
                      onClick={() => removeArrayItem(levelIndex, 'features', featureIndex)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <span className="text-white/80 text-sm">{feature}</span>
                )}
              </div>
            ))}
          </div>
          
          {isEditing && (
            <button
              onClick={() => addArrayItem(levelIndex, 'features', 'Nueva característica')}
              className="mt-2 flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
            >
              <Plus size={14} />
              Agregar característica
            </button>
          )}
        </div>
        
        {/* Botón de acción */}
        <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          {isSelected ? 'Nivel Seleccionado' : 'Seleccionar Nivel'}
        </button>
      </div>
    )
  }
  
  // Componente para las métricas del nivel seleccionado
  const LevelMetrics = ({ level }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4 drop-shadow-sm">Métricas del Nivel Seleccionado</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users size={24} className="text-white" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-1">{level.students}</h4>
          <p className="text-white/70 text-sm">Estudiantes</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <DollarSign size={24} className="text-white" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-1">${level.revenue.toLocaleString()}</h4>
          <p className="text-white/70 text-sm">Ingresos</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp size={24} className="text-white" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-1">{level.completionRate}%</h4>
          <p className="text-white/70 text-sm">Tasa de finalización</p>
        </div>
      </div>
    </div>
  )
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  const selectedLevelData = courseLevels.find(level => level.id === selectedLevel)
  
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
                <ChevronRight size={20} className="rotate-180" />
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
          
          {/* Información del curso */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-8 shadow-lg">
            <div className="flex items-start gap-6">
              {/* Icono del curso */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <BookOpen size={32} className="text-white" />
              </div>
              
              {/* Información del curso */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">{course?.title || 'Cálculo Diferencial e Integral'}</h1>
                <p className="text-white/80 mb-4 drop-shadow-sm">{course?.description || 'Fundamentos del cálculo matemático: límites, derivadas e integrales'}</p>
                
                {/* Estadísticas del curso */}
                <div className="flex items-center gap-6 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>2,156 estudiantes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" />
                    <span>4.8 (156 valoraciones)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>45 horas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play size={16} />
                    <span>18 sesiones</span>
                  </div>
                </div>
                
                {/* Etiquetas */}
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-400/30">
                    Intermedio
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-400/30">
                    Universidad
                  </span>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium hover:bg-green-500/30 transition-colors border border-green-400/30">
                  Ver Valoraciones
                </button>
                <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium hover:bg-purple-500/30 transition-colors border border-purple-400/30">
                  Gestionar Contenido
                </button>
              </div>
            </div>
          </div>
          
           {/* Título de la sección */}
           <div className="mb-6">
             <h2 className="text-2xl font-bold text-white drop-shadow-sm">Niveles del Curso</h2>
             <p className="text-white/80 mt-1 drop-shadow-sm">Cada nivel se puede comprar por separado o todos juntos en el curso completo</p>
           </div>
           
           {/* Precio del curso completo */}
           <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
             <div className="flex items-center justify-between">
               <div>
                 <h3 className="text-xl font-bold mb-2 drop-shadow-sm">Curso Completo</h3>
                 <p className="text-purple-100 drop-shadow-sm">Incluye los 3 niveles: Básico, Intermedio y Avanzado</p>
               </div>
               <div className="text-right">
                 <div className="flex items-center gap-3">
                   <span className="text-3xl font-bold drop-shadow-sm">$4,500 MXN</span>
                   <span className="text-lg line-through opacity-75 drop-shadow-sm">$6,000</span>
                   <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-bold">
                     -25%
                   </span>
                 </div>
                 <p className="text-purple-100 text-sm mt-1">Pago único, acceso de por vida</p>
               </div>
             </div>
           </div>
           
           {/* Lista de niveles */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
             {courseLevels.map((level, index) => (
               <LevelCard
                 key={level.id}
                 level={level}
                 levelIndex={index}
                 isSelected={level.isSelected}
                 onSelect={handleLevelSelect}
               />
             ))}
           </div>
           
           {/* Métricas del nivel seleccionado */}
           {selectedLevelData && (
             <LevelMetrics level={selectedLevelData} />
           )}
        </div>
      </div>
    </div>
  )
}

export default CourseLevelsView