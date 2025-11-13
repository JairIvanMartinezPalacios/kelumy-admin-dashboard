// ========================================
// EJEMPLO DE USO DEL SISTEMA DE SINCRONIZACIÓN
// ========================================

import React from 'react';
import { useAppContext } from '../context/AppContext';
import CourseManager from '../components/shared/CourseManager';
import SyncIndicator from '../components/SyncIndicator';
import SyncNotification from '../components/SyncNotification';

// ========================================
// EJEMPLO 1: DASHBOARD DE USUARIO
// ========================================

const UserDashboardExample = () => {
  const { syncStatus, syncWithServer, courses, addNotification } = useAppContext();

  const handleCourseAction = (action, course, data) => {
    console.log('Acción de usuario:', action, course);
    
    switch (action) {
      case 'start':
        // Simular inicio de curso
        addNotification({
          id: `start-${Date.now()}`,
          type: 'success',
          title: 'Curso iniciado',
          message: `Has comenzado el curso "${course.title}"`,
          timestamp: new Date().toISOString(),
          isRead: false
        });
        break;
      case 'complete':
        // Simular finalización de curso
        addNotification({
          id: `complete-${Date.now()}`,
          type: 'success',
          title: '¡Curso completado!',
          message: `Felicitaciones, has completado "${course.title}"`,
          timestamp: new Date().toISOString(),
          isRead: false
        });
        break;
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header con indicadores de sincronización */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard de Usuario</h1>
        <div className="flex items-center space-x-4">
          <SyncIndicator syncStatus={syncStatus} onSync={syncWithServer} />
          <SyncNotification />
        </div>
      </div>

      {/* Gestión de cursos para usuario */}
      <CourseManager 
        userRole="user"
        showAdminControls={false}
        onCourseAction={handleCourseAction}
      />
    </div>
  );
};

// ========================================
// EJEMPLO 2: DASHBOARD DE ADMINISTRADOR
// ========================================

const AdminDashboardExample = () => {
  const { 
    syncStatus, 
    syncWithServer, 
    courses, 
    addCourse, 
    updateCourse, 
    deleteCourse,
    addNotification 
  } = useAppContext();

  const handleAdminAction = (action, course, data) => {
    console.log('Acción de admin:', action, course);
    
    switch (action) {
      case 'create':
        // Crear nuevo curso
        const newCourse = {
          id: Date.now(),
          title: 'Nuevo Curso',
          instructor: 'Admin',
          description: 'Curso creado por administrador',
          category: 'Programación',
          level: 'Principiante',
          duration: '2h 30min',
          rating: 0,
          students: 0,
          status: 'no-iniciado',
          createdAt: new Date().toISOString()
        };
        
        addCourse(newCourse);
        
        // Notificar a usuarios
        addNotification({
          id: `new-course-${Date.now()}`,
          type: 'info',
          title: 'Nuevo curso disponible',
          message: `Se ha agregado un nuevo curso: "${newCourse.title}"`,
          timestamp: new Date().toISOString(),
          isRead: false
        });
        break;
        
      case 'update':
        // Actualizar curso existente
        updateCourse({ ...course, updatedAt: new Date().toISOString() });
        
        addNotification({
          id: `update-course-${Date.now()}`,
          type: 'info',
          title: 'Curso actualizado',
          message: `El curso "${course.title}" ha sido actualizado`,
          timestamp: new Date().toISOString(),
          isRead: false
        });
        break;
        
      case 'delete':
        // Eliminar curso
        deleteCourse(course.id);
        
        addNotification({
          id: `delete-course-${Date.now()}`,
          type: 'warning',
          title: 'Curso eliminado',
          message: `El curso "${course.title}" ha sido eliminado`,
          timestamp: new Date().toISOString(),
          isRead: false
        });
        break;
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header con indicadores de sincronización */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard de Administrador</h1>
        <div className="flex items-center space-x-4">
          <SyncIndicator syncStatus={syncStatus} onSync={syncWithServer} />
          <SyncNotification />
        </div>
      </div>

      {/* Estadísticas de administración */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Cursos</p>
              <p className="text-2xl font-bold text-white">{courses.length}</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-full">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Cambios Pendientes</p>
              <p className="text-2xl font-bold text-white">{syncStatus.pendingChanges}</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-full">
              <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Estado de Sincronización</p>
              <p className={`text-lg font-bold ${syncStatus.isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {syncStatus.isConnected ? 'Conectado' : 'Desconectado'}
              </p>
            </div>
            <div className={`p-3 rounded-full ${syncStatus.isConnected ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <svg className={`w-6 h-6 ${syncStatus.isConnected ? 'text-green-400' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Gestión de cursos para administrador */}
      <CourseManager 
        userRole="admin"
        showAdminControls={true}
        onCourseAction={handleAdminAction}
        customActions={[
          {
            id: 'create',
            label: 'Crear',
            icon: 'Plus',
            color: 'green'
          },
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
            color: 'purple'
          }
        ]}
      />
    </div>
  );
};

// ========================================
// EJEMPLO 3: COMPONENTE DE PRUEBA
// ========================================

const SyncTestComponent = () => {
  const { 
    syncStatus, 
    syncWithServer, 
    addNotification, 
    courses, 
    addCourse,
    pendingChanges 
  } = useAppContext();

  const simulateAdminChange = () => {
    // Simular cambio de administrador
    const testCourse = {
      id: Date.now(),
      title: `Curso de Prueba ${Date.now()}`,
      instructor: 'Admin Test',
      description: 'Curso creado para probar la sincronización',
      category: 'Test',
      level: 'Principiante',
      duration: '1h',
      rating: 0,
      students: 0,
      status: 'no-iniciado',
      createdAt: new Date().toISOString()
    };
    
    addCourse(testCourse);
    
    addNotification({
      id: `test-${Date.now()}`,
      type: 'info',
      title: 'Cambio de prueba',
      message: `Se ha creado un curso de prueba: "${testCourse.title}"`,
      timestamp: new Date().toISOString(),
      isRead: false
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Prueba del Sistema de Sincronización</h1>
      
      {/* Información del estado actual */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Estado Actual</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-white/70 text-sm">Estado de Conexión:</p>
            <p className={`font-semibold ${syncStatus.isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {syncStatus.isConnected ? 'Conectado' : 'Desconectado'}
            </p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Última Sincronización:</p>
            <p className="text-white font-semibold">
              {syncStatus.lastSync ? new Date(syncStatus.lastSync).toLocaleTimeString() : 'Nunca'}
            </p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Cambios Pendientes:</p>
            <p className="text-white font-semibold">{syncStatus.pendingChanges}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Total de Cursos:</p>
            <p className="text-white font-semibold">{courses.length}</p>
          </div>
        </div>
      </div>

      {/* Controles de prueba */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={simulateAdminChange}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          Simular Cambio de Admin
        </button>
        
        <button
          onClick={syncWithServer}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
        >
          Sincronizar Manualmente
        </button>
      </div>

      {/* Indicadores de sincronización */}
      <div className="flex items-center space-x-4 mb-6">
        <SyncIndicator syncStatus={syncStatus} onSync={syncWithServer} />
        <SyncNotification />
      </div>

      {/* Lista de cursos actual */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Cursos Actuales</h2>
        {courses.length === 0 ? (
          <p className="text-white/70">No hay cursos disponibles</p>
        ) : (
          <div className="space-y-2">
            {courses.map(course => (
              <div key={course.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <h3 className="text-white font-medium">{course.title}</h3>
                <p className="text-white/70 text-sm">por {course.instructor}</p>
                <p className="text-white/50 text-xs">
                  Creado: {new Date(course.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { UserDashboardExample, AdminDashboardExample, SyncTestComponent };
