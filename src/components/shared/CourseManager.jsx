// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  BookOpen,        // Icono de libro
  Play,            // Icono de play
  Clock,           // Icono de reloj
  Star,            // Icono de estrella
  Users,           // Icono de usuarios
  Award,           // Icono de certificado
  Download,        // Icono de descarga
  Share2,          // Icono de compartir
  Filter,          // Icono de filtro
  Search,          // Icono de búsqueda
  Grid,            // Icono de grid
  List,            // Icono de lista
  ChevronRight,    // Icono de flecha derecha
  CheckCircle,     // Icono de completado
  PlayCircle,      // Icono de reproducir
  Pause,           // Icono de pausa
  RotateCcw,       // Icono de reiniciar
  Bookmark,        // Icono de marcador
  MessageCircle,   // Icono de comentarios
  BarChart3,       // Icono de estadísticas
  Edit,            // Icono de editar
  Trash2,          // Icono de eliminar
  Plus,            // Icono de agregar
  Eye,             // Icono de ver
  EyeOff           // Icono de ocultar
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

// ========================================
// COMPONENTE COURSEMANAGER - Gestión de cursos reutilizable
// ========================================

const CourseManager = ({ 
  userRole = 'user', // 'admin' o 'user'
  showAdminControls = false,
  onCourseAction = () => {},
  customActions = []
}) => {
  // ========================================
  // HOOKS Y CONTEXTO
  // ========================================
  
  const { courses, currentUser, addCourse, updateCourse, deleteCourse, updateCourseProgress } = useAppContext();
  
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [activeTab, setActiveTab] = useState('en-progreso');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [sortBy, setSortBy] = useState('recientes');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ========================================
  // DATOS ESTÁTICOS
  // ========================================
  
  const categories = [
    'todas',
    'Programación',
    'Diseño',
    'Data Science',
    'Marketing',
    'Negocios',
    'Idiomas'
  ];

  const tabs = [
    { 
      id: 'en-progreso', 
      label: 'En Progreso', 
      count: courses.filter(c => c.userProgress?.status === 'en-progreso').length 
    },
    { 
      id: 'completado', 
      label: 'Completados', 
      count: courses.filter(c => c.userProgress?.status === 'completado').length 
    },
    { 
      id: 'no-iniciado', 
      label: 'No Iniciados', 
      count: courses.filter(c => !c.userProgress || c.userProgress.status === 'no-iniciado').length 
    },
    { 
      id: 'favoritos', 
      label: 'Favoritos', 
      count: courses.filter(c => c.userProgress?.isBookmarked).length 
    }
  ];

  // Agregar tab de administración si es admin
  if (userRole === 'admin' && showAdminControls) {
    tabs.push({
      id: 'admin',
      label: 'Administrar',
      count: courses.length
    });
  }

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const filteredCourses = courses.filter(course => {
    const matchesTab = course.userProgress?.status === activeTab || 
                      (activeTab === 'favoritos' && course.userProgress?.isBookmarked) ||
                      (activeTab === 'admin');
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || course.category === selectedCategory;
    
    return matchesTab && matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'en-progreso': return 'from-blue-500 to-cyan-500';
      case 'completado': return 'from-green-500 to-emerald-500';
      case 'no-iniciado': return 'from-gray-500 to-slate-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'en-progreso': return 'En Progreso';
      case 'completado': return 'Completado';
      case 'no-iniciado': return 'No Iniciado';
      default: return 'Desconocido';
    }
  };

  const handleCourseAction = (action, course, data = null) => {
    switch (action) {
      case 'start':
        updateCourseProgress(course.id, { 
          status: 'en-progreso', 
          progress: 0, 
          startedAt: new Date().toISOString() 
        });
        break;
      case 'continue':
        onCourseAction('continue', course);
        break;
      case 'complete':
        updateCourseProgress(course.id, { 
          status: 'completado', 
          progress: 100, 
          completedAt: new Date().toISOString() 
        });
        break;
      case 'bookmark':
        updateCourseProgress(course.id, { 
          isBookmarked: !course.userProgress?.isBookmarked 
        });
        break;
      case 'delete':
        if (userRole === 'admin') {
          deleteCourse(course.id);
        }
        break;
      case 'edit':
        if (userRole === 'admin') {
          onCourseAction('edit', course);
        }
        break;
      default:
        onCourseAction(action, course, data);
    }
  };

  // ========================================
  // RENDERIZADO DE TARJETAS DE CURSO
  // ========================================
  
  const renderCourseCard = (course) => {
    const userProgress = course.userProgress || {};
    const progress = userProgress.progress || 0;
    const status = userProgress.status || 'no-iniciado';

    return (
      <div key={course.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              onClick={() => handleCourseAction('bookmark', course)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${userProgress.isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(status)} text-white`}>
              {getStatusText(status)}
            </span>
          </div>
          {status === 'en-progreso' && (
            <div className="absolute bottom-4 right-4">
              <button 
                onClick={() => handleCourseAction('continue', course)}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <Play className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {course.title}
              </h3>
              <p className="text-white/70 text-sm mb-2">por {course.instructor}</p>
              <p className="text-white/60 text-sm line-clamp-2">{course.description}</p>
            </div>
            
            {/* Controles de admin */}
            {userRole === 'admin' && showAdminControls && (
              <div className="flex space-x-1 ml-2">
                <button
                  onClick={() => handleCourseAction('edit', course)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Editar curso"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCourseAction('delete', course)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Eliminar curso"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Progreso */}
          {status === 'en-progreso' && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                <span>Progreso</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-white/60 mt-2">
                <span>{course.completedLessons || 0} de {course.totalLessons || 0} lecciones</span>
                <span>{course.estimatedTime || '0min'} restantes</span>
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="flex items-center justify-between text-sm text-white/70 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.students}</span>
              </div>
            </div>
            <span className="px-2 py-1 bg-white/10 rounded text-xs">{course.level}</span>
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {status === 'en-progreso' && (
                <button 
                  onClick={() => handleCourseAction('continue', course)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Continuar</span>
                </button>
              )}
              {status === 'no-iniciado' && (
                <button 
                  onClick={() => handleCourseAction('start', course)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Empezar</span>
                </button>
              )}
              {status === 'completado' && (
                <button 
                  onClick={() => handleCourseAction('review', course)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repasar</span>
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => handleCourseAction('comments', course)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCourseAction('analytics', course)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              {course.certificate && (
                <button 
                  onClick={() => handleCourseAction('certificate', course)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Award className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {userRole === 'admin' ? 'Gestión de Cursos' : 'Mis Cursos'}
          </h2>
          <p className="text-white/70">
            {userRole === 'admin' 
              ? 'Administra todos los cursos de la plataforma' 
              : 'Gestiona tu aprendizaje y continúa tu progreso'
            }
          </p>
        </div>
        
        {userRole === 'admin' && showAdminControls && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Curso</span>
          </button>
        )}
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category === 'todas' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="recientes" className="bg-gray-800">Más recientes</option>
              <option value="progreso" className="bg-gray-800">Por progreso</option>
              <option value="alfabetico" className="bg-gray-800">Alfabético</option>
              <option value="rating" className="bg-gray-800">Por calificación</option>
            </select>

            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex space-x-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Lista de cursos */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(renderCourseCard)
        ) : (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No se encontraron cursos</h3>
            <p className="text-white/70">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManager;
