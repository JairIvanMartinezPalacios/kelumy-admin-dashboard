// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState } from 'react';
import { 
  Plus,           // Icono de agregar
  Edit,           // Icono de editar
  Trash2,         // Icono de eliminar
  Eye,            // Icono de ver
  EyeOff,         // Icono de ocultar
  Users,          // Icono de usuarios
  BarChart3,      // Icono de estadísticas
  Settings,       // Icono de configuración
  Upload,         // Icono de subir
  Download        // Icono de descargar
} from 'lucide-react';
import CourseManager from '../shared/CourseManager';

// ========================================
// COMPONENTE ADMINCOURSEMANAGER - Gestión de cursos para administradores
// ========================================

const AdminCourseManager = () => {
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // ========================================
  // FUNCIONES DE MANEJO DE ACCIONES
  // ========================================
  
  const handleCourseAction = (action, course, data = null) => {
    console.log('Acción de admin en curso:', action, course, data);
    
    switch (action) {
      case 'edit':
        setSelectedCourse(course);
        setShowEditModal(true);
        break;
      case 'delete':
        handleDeleteCourse(course);
        break;
      case 'analytics':
        setSelectedCourse(course);
        setShowStatsModal(true);
        break;
      case 'visibility':
        handleToggleVisibility(course);
        break;
      case 'duplicate':
        handleDuplicateCourse(course);
        break;
      case 'export':
        handleExportCourse(course);
        break;
      case 'import':
        handleImportCourse();
        break;
      default:
        console.log('Acción de admin no reconocida:', action);
    }
  };

  const handleCreateCourse = () => {
    setShowCreateModal(true);
  };

  const handleDeleteCourse = (course) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el curso "${course.title}"?`)) {
      console.log('Eliminando curso:', course.title);
      // Aquí se implementaría la lógica de eliminación
    }
  };

  const handleToggleVisibility = (course) => {
    console.log('Cambiando visibilidad del curso:', course.title);
    // Aquí se implementaría la lógica de cambio de visibilidad
  };

  const handleDuplicateCourse = (course) => {
    console.log('Duplicando curso:', course.title);
    // Aquí se implementaría la lógica de duplicación
  };

  const handleExportCourse = (course) => {
    console.log('Exportando curso:', course.title);
    // Aquí se implementaría la lógica de exportación
  };

  const handleImportCourse = () => {
    console.log('Importando curso...');
    // Aquí se implementaría la lógica de importación
  };

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Cursos</h1>
            <p className="text-white/70">Administra todos los cursos de la plataforma</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleImportCourse}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <Upload className="w-4 h-4" />
              <span>Importar</span>
            </button>
            
            <button
              onClick={handleCreateCourse}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Curso</span>
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Cursos</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Estudiantes Activos</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Cursos Publicados</p>
                <p className="text-2xl font-bold text-white">18</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-full">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">En Revisión</p>
                <p className="text-2xl font-bold text-white">6</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Settings className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Componente reutilizable de gestión de cursos */}
      <CourseManager 
        userRole="admin"
        showAdminControls={true}
        onCourseAction={handleCourseAction}
        customActions={[
          {
            id: 'duplicate',
            label: 'Duplicar',
            icon: 'Copy',
            color: 'blue'
          },
          {
            id: 'export',
            label: 'Exportar',
            icon: 'Download',
            color: 'green'
          },
          {
            id: 'visibility',
            label: 'Visibilidad',
            icon: 'Eye',
            color: 'purple'
          }
        ]}
      />

      {/* Modales (placeholders para futura implementación) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Crear Nuevo Curso</h3>
            <p className="text-white/70 mb-4">Modal de creación de curso (pendiente de implementar)</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Editar Curso</h3>
            <p className="text-white/70 mb-2">Editando: {selectedCourse.title}</p>
            <p className="text-white/70 mb-4">Modal de edición de curso (pendiente de implementar)</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatsModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Estadísticas del Curso</h3>
            <p className="text-white/70 mb-2">Curso: {selectedCourse.title}</p>
            <p className="text-white/70 mb-4">Modal de estadísticas (pendiente de implementar)</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowStatsModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseManager;
