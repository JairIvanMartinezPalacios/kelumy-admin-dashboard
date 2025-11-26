// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState } from 'react'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Atom,
  Laptop,
  GraduationCap,
  BookOpen,
  Music,
  Camera,
  Palette,
  Heart,
  Globe,
  Briefcase,
  Code,
  Database,
  X,
  Check,
  Save,
  AlertCircle,
  Users,
  Star,
  Filter,
  Clock,
  Play,
  Eye
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - CourseCategories
// ========================================

const CourseCategories = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  // Estado para las categorías (Mock Data inicial)
  const [categories, setCategories] = useState([
    {
      id: 'ciencias',
      name: 'Ciencias',
      description: 'Matemáticas, física, química y ciencias naturales',
      icon: 'Atom',
      color: 'from-blue-500 to-blue-700',
      courseCount: 12,
      status: 'active'
    },
    {
      id: 'tecnologia',
      name: 'Tecnología',
      description: 'Programación, desarrollo web y tecnología digital',
      icon: 'Laptop',
      color: 'from-purple-500 to-purple-700',
      courseCount: 24,
      status: 'active'
    },
    {
      id: 'educacion',
      name: 'Educación',
      description: 'Metodologías pedagógicas y desarrollo docente',
      icon: 'GraduationCap',
      color: 'from-green-500 to-green-700',
      courseCount: 8,
      status: 'active'
    },
    {
      id: 'arte',
      name: 'Arte y Diseño',
      description: 'Pintura, ilustración, diseño gráfico y fotografía',
      icon: 'Palette',
      color: 'from-pink-500 to-rose-500',
      courseCount: 15,
      status: 'active'
    },
    {
      id: 'negocios',
      name: 'Negocios',
      description: 'Emprendimiento, marketing, finanzas y liderazgo',
      icon: 'Briefcase',
      color: 'from-amber-500 to-orange-600',
      courseCount: 18,
      status: 'active'
    },
    {
      id: 'idiomas',
      name: 'Idiomas',
      description: 'Inglés, francés, alemán y otros idiomas',
      icon: 'Globe',
      color: 'from-cyan-500 to-blue-600',
      courseCount: 10,
      status: 'active'
    }
  ])

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('')
  
  // Estado para el modal de crear/editar
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'BookOpen',
    color: 'from-blue-500 to-blue-700'
  })
  
  // Estado para mostrar cursos de una categoría
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showCourses, setShowCourses] = useState(false)
  
  // Cursos de ejemplo por categoría (datos completos)
  const coursesByCategory = {
    ciencias: [
      { 
        id: 1, 
        title: 'Cálculo Diferencial e Integral', 
        students: 1250, 
        rating: 4.7,
        price: 199,
        originalPrice: 399,
        duration: '40 horas',
        lessons: 32,
        status: 'published'
      },
      { 
        id: 2, 
        title: 'Física General y Mecánica', 
        students: 980, 
        rating: 4.6,
        price: 179,
        originalPrice: 359,
        duration: '35 horas',
        lessons: 28,
        status: 'published'
      },
      { 
        id: 3, 
        title: 'Química Orgánica Aplicada', 
        students: 750, 
        rating: 4.5,
        price: 159,
        originalPrice: 319,
        duration: '30 horas',
        lessons: 25,
        status: 'published'
      },
      { 
        id: 4, 
        title: 'Álgebra Lineal Avanzada', 
        students: 650, 
        rating: 4.8,
        price: 189,
        originalPrice: 379,
        duration: '32 horas',
        lessons: 26,
        status: 'published'
      },
      { 
        id: 5, 
        title: 'Ecuaciones Diferenciales', 
        students: 420, 
        rating: 4.9,
        price: 219,
        originalPrice: 439,
        duration: '28 horas',
        lessons: 22,
        status: 'published'
      },
      { 
        id: 6, 
        title: 'Estadística y Probabilidad', 
        students: 890, 
        rating: 4.6,
        price: 169,
        originalPrice: 339,
        duration: '26 horas',
        lessons: 24,
        status: 'published'
      }
    ],
    tecnologia: [
      { 
        id: 7, 
        title: 'Inteligencia Artificial y Machine Learning', 
        students: 2100, 
        rating: 4.9,
        price: 399,
        originalPrice: 799,
        duration: '50 horas',
        lessons: 45,
        status: 'published'
      },
      { 
        id: 8, 
        title: 'Diseño y Administración de Bases de Datos', 
        students: 1650, 
        rating: 4.7,
        price: 279,
        originalPrice: 559,
        duration: '35 horas',
        lessons: 30,
        status: 'published'
      },
      { 
        id: 9, 
        title: 'Desarrollo Web Full Stack', 
        students: 1950, 
        rating: 4.6,
        price: 199,
        originalPrice: 399,
        duration: '30 horas',
        lessons: 28,
        status: 'published'
      },
      { 
        id: 10, 
        title: 'Programación en Python Avanzado', 
        students: 1800, 
        rating: 4.8,
        price: 349,
        originalPrice: 699,
        duration: '45 horas',
        lessons: 38,
        status: 'published'
      },
      { 
        id: 11, 
        title: 'Ciberseguridad y Ethical Hacking', 
        students: 1200, 
        rating: 4.9,
        price: 329,
        originalPrice: 659,
        duration: '40 horas',
        lessons: 35,
        status: 'published'
      }
    ],
    educacion: [
      { 
        id: 12, 
        title: 'Gestión Socioemocional en el Aula', 
        students: 850, 
        rating: 4.7,
        price: 179,
        originalPrice: 359,
        duration: '25 horas',
        lessons: 20,
        status: 'published'
      },
      { 
        id: 13, 
        title: 'Gamificación Educativa', 
        students: 720, 
        rating: 4.5,
        price: 149,
        originalPrice: 299,
        duration: '20 horas',
        lessons: 18,
        status: 'published'
      },
      { 
        id: 14, 
        title: 'Diseño de Laboratorios Creativos', 
        students: 650, 
        rating: 4.6,
        price: 169,
        originalPrice: 339,
        duration: '22 horas',
        lessons: 19,
        status: 'published'
      },
      { 
        id: 15, 
        title: 'Evaluación y Retroalimentación Efectiva', 
        students: 580, 
        rating: 4.8,
        price: 199,
        originalPrice: 399,
        duration: '28 horas',
        lessons: 24,
        status: 'published'
      }
    ],
    arte: [
      { 
        id: 16, 
        title: 'Diseño Gráfico Profesional con Adobe', 
        students: 890, 
        rating: 4.8,
        price: 249,
        originalPrice: 499,
        duration: '38 horas',
        lessons: 32,
        status: 'published'
      },
      { 
        id: 17, 
        title: 'Ilustración Digital y Concept Art', 
        students: 670, 
        rating: 4.7,
        price: 229,
        originalPrice: 459,
        duration: '35 horas',
        lessons: 28,
        status: 'published'
      },
      { 
        id: 18, 
        title: 'Fotografía Profesional y Edición', 
        students: 540, 
        rating: 4.6,
        price: 199,
        originalPrice: 399,
        duration: '30 horas',
        lessons: 25,
        status: 'published'
      },
      { 
        id: 19, 
        title: 'Animación 2D y Motion Graphics', 
        students: 720, 
        rating: 4.9,
        price: 279,
        originalPrice: 559,
        duration: '42 horas',
        lessons: 36,
        status: 'published'
      }
    ],
    negocios: [
      { 
        id: 20, 
        title: 'Marketing Digital y Redes Sociales', 
        students: 1200, 
        rating: 4.8,
        price: 249,
        originalPrice: 499,
        duration: '32 horas',
        lessons: 28,
        status: 'published'
      },
      { 
        id: 21, 
        title: 'Emprendimiento y Modelo de Negocios', 
        students: 950, 
        rating: 4.7,
        price: 219,
        originalPrice: 439,
        duration: '28 horas',
        lessons: 24,
        status: 'published'
      },
      { 
        id: 22, 
        title: 'Finanzas Personales e Inversiones', 
        students: 780, 
        rating: 4.6,
        price: 189,
        originalPrice: 379,
        duration: '25 horas',
        lessons: 22,
        status: 'published'
      },
      { 
        id: 23, 
        title: 'Liderazgo y Gestión de Equipos', 
        students: 1050, 
        rating: 4.9,
        price: 269,
        originalPrice: 539,
        duration: '30 horas',
        lessons: 26,
        status: 'published'
      }
    ],
    idiomas: [
      { 
        id: 24, 
        title: 'Inglés Avanzado - Business English', 
        students: 1100, 
        rating: 4.7,
        price: 199,
        originalPrice: 399,
        duration: '40 horas',
        lessons: 35,
        status: 'published'
      },
      { 
        id: 25, 
        title: 'Francés Intermedio - Conversación', 
        students: 680, 
        rating: 4.5,
        price: 179,
        originalPrice: 359,
        duration: '35 horas',
        lessons: 30,
        status: 'published'
      },
      { 
        id: 26, 
        title: 'Alemán Básico desde Cero', 
        students: 520, 
        rating: 4.4,
        price: 159,
        originalPrice: 319,
        duration: '30 horas',
        lessons: 28,
        status: 'published'
      },
      { 
        id: 27, 
        title: 'Italiano para Viajeros', 
        students: 450, 
        rating: 4.6,
        price: 149,
        originalPrice: 299,
        duration: '25 horas',
        lessons: 22,
        status: 'published'
      }
    ]
  }

  // ========================================
  // HELPERS Y UTILIDADES
  // ========================================

  // Mapa de iconos disponibles para seleccionar
  const iconMap = {
    Atom, Laptop, GraduationCap, BookOpen, Music, 
    Camera, Palette, Heart, Globe, Briefcase, Code, Database
  }

  // Mapa de gradientes disponibles
  const colorGradients = [
    { name: 'Blue', value: 'from-blue-500 to-blue-700' },
    { name: 'Purple', value: 'from-purple-500 to-purple-700' },
    { name: 'Green', value: 'from-green-500 to-green-700' },
    { name: 'Pink', value: 'from-pink-500 to-rose-500' },
    { name: 'Orange', value: 'from-amber-500 to-orange-600' },
    { name: 'Cyan', value: 'from-cyan-500 to-blue-600' },
    { name: 'Red', value: 'from-red-500 to-red-700' },
    { name: 'Indigo', value: 'from-indigo-500 to-purple-600' }
  ]

  // Renderiza el componente de icono basado en el nombre string
  const renderIcon = (iconName, className = "w-6 h-6") => {
    const IconComponent = iconMap[iconName] || BookOpen
    return <IconComponent className={className} />
  }

  // ========================================
  // HANDLERS
  // ========================================

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleOpenCreateModal = () => {
    setIsEditing(false)
    setFormData({
      name: '',
      description: '',
      icon: 'BookOpen',
      color: 'from-blue-500 to-blue-700'
    })
    setShowModal(true)
  }

  const handleOpenEditModal = (category) => {
    setIsEditing(true)
    setCurrentCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color
    })
    setShowModal(true)
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      setCategories(categories.filter(cat => cat.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEditing && currentCategory) {
      // Actualizar categoría existente
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id 
          ? { ...cat, ...formData } 
          : cat
      ))
    } else {
      // Crear nueva categoría
      const newCategory = {
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        ...formData,
        courseCount: 0,
        status: 'active'
      }
      setCategories([...categories, newCategory])
    }
    
    setShowModal(false)
  }
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setShowCourses(true)
  }
  
  const handleBackToCategoriesView = () => {
    setShowCourses(false)
    setSelectedCategory(null)
  }

  // Filtrar categorías
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ========================================
  // RENDERIZADO
  // ========================================
  
  // Si se está mostrando la vista de cursos de una categoría
  if (showCourses && selectedCategory) {
    const categoryCourses = coursesByCategory[selectedCategory.id] || []
    const IconComponent = iconMap[selectedCategory.icon] || BookOpen
    
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header mejorado con estadísticas */}
        <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          {/* Fondo decorativo con gradiente */}
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedCategory.color} opacity-10`} />
          
          <div className="relative z-10">
            {/* Botón de regreso y título */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToCategoriesView}
                  className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110"
                  title="Volver a categorías"
                >
                  <X size={24} />
                </button>
                
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center shadow-2xl`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-1">
                      Cursos de {selectedCategory.name}
                    </h2>
                    <p className="text-white/70 text-base">{selectedCategory.description}</p>
                  </div>
                </div>
              </div>
              
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25 flex items-center gap-2">
                <Plus size={20} />
                Agregar Curso
              </button>
            </div>
            
            {/* Estadísticas de la categoría */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <BookOpen size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Total de Cursos</p>
                    <p className="text-2xl font-bold text-white">{categoryCourses.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Users size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Total Estudiantes</p>
                    <p className="text-2xl font-bold text-white">
                      {categoryCourses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Star size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Rating Promedio</p>
                    <p className="text-2xl font-bold text-white">
                      {categoryCourses.length > 0 
                        ? (categoryCourses.reduce((sum, c) => sum + c.rating, 0) / categoryCourses.length).toFixed(1)
                        : '0.0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filtros y ordenamiento */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Filter size={18} />
            <span>Mostrando {categoryCourses.length} cursos</span>
          </div>
          
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all">
              <option>Más populares</option>
              <option>Mejor calificados</option>
              <option>Más recientes</option>
              <option>Alfabético A-Z</option>
            </select>
          </div>
        </div>
        
        {/* Grid de cursos mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-white/20"
            >
              {/* Imagen del curso */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center`}>
                  <BookOpen size={56} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                {/* Badge de estado */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-green-400/30">
                    PUBLICADO
                  </span>
                </div>
                
                {/* Rating flotante */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm font-bold">{course.rating}</span>
                </div>
              </div>
              
              {/* Contenido del curso */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>
                
                {/* Información del curso */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Users size={16} />
                    <span>{course.students.toLocaleString()} estudiantes inscritos</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock size={16} />
                    <span>{course.duration} de contenido</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Play size={16} />
                    <span>{course.lessons} lecciones</span>
                  </div>
                </div>
                
                {/* Precio y acciones */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-2xl font-bold text-purple-400">${course.price}</span>
                    <span className="text-sm text-white/40 line-through ml-2">${course.originalPrice}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-all"
                      title="Ver detalles"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all"
                      title="Editar curso"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                      title="Eliminar curso"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Estado vacío mejorado */}
        {categoryCourses.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedCategory.color} opacity-20 flex items-center justify-center mx-auto mb-6`}>
              <BookOpen size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No hay cursos en esta categoría</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Aún no se han agregado cursos a la categoría de {selectedCategory.name}. 
              Comienza creando tu primer curso.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25 inline-flex items-center gap-2">
              <Plus size={20} />
              Crear Primer Curso
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header de la sección */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-sm">Categorías de Cursos</h2>
          <p className="text-white/60 text-sm">Gestiona las áreas temáticas de tu plataforma</p>
        </div>
        
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
        />
      </div>

      {/* Grid de Categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div 
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-white/20 cursor-pointer"
          >
            {/* Fondo con gradiente sutil al hacer hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
            
            <div className="relative z-10 flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {renderIcon(category.icon)}
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenEditModal(category)
                  }}
                  className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteCategory(category.id)
                  }}
                  className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                {category.name}
              </h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <BookOpen size={16} />
                  <span>{category.courseCount} cursos</span>
                </div>
                <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                  Activo
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 border-dashed">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-white/20" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No se encontraron categorías</h3>
          <p className="text-white/50">Intenta con otro término de búsqueda o crea una nueva categoría.</p>
        </div>
      )}

      {/* Modal de Crear/Editar */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md animate-fade-in overflow-hidden"
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
          <div className="bg-[#1e081d] border border-white/20 rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h3 className="text-xl font-bold text-white">
                {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Nombre de la categoría</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                  placeholder="Ej. Inteligencia Artificial"
                />
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Descripción</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
                  placeholder="Breve descripción de la categoría..."
                />
              </div>

              {/* Selector de Icono */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Icono</label>
                <div className="grid grid-cols-6 gap-2">
                  {Object.keys(iconMap).map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setFormData({...formData, icon: iconName})}
                      className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                        formData.icon === iconName 
                          ? 'bg-purple-500 text-white shadow-lg scale-105' 
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {renderIcon(iconName, "w-5 h-5")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Color */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Color del tema</label>
                <div className="grid grid-cols-4 gap-3">
                  {colorGradients.map((gradient) => (
                    <button
                      key={gradient.name}
                      type="button"
                      onClick={() => setFormData({...formData, color: gradient.value})}
                      className={`h-10 rounded-xl bg-gradient-to-r ${gradient.value} transition-all ${
                        formData.color === gradient.value 
                          ? 'ring-2 ring-white scale-105 shadow-lg' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      title={gradient.name}
                    />
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default CourseCategories
