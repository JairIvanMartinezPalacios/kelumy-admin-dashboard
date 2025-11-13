// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React from 'react';
import CourseManager from '../shared/CourseManager';

// ========================================
// COMPONENTE USERCOURSES - Gestión de cursos del usuario
// ========================================

const UserCourses = () => {
  const handleCourseAction = (action, course, data = null) => {
    console.log('Acción en curso:', action, course, data);
    // Aquí se pueden agregar acciones específicas del usuario
    // como redirigir al reproductor de video, mostrar certificados, etc.
    
    switch (action) {
      case 'continue':
        // Redirigir al reproductor de video del curso
        console.log('Continuar curso:', course.title);
        break;
      case 'start':
        // Iniciar nuevo curso
        console.log('Iniciar curso:', course.title);
        break;
      case 'review':
        // Repasar curso completado
        console.log('Repasar curso:', course.title);
        break;
      case 'comments':
        // Abrir sección de comentarios
        console.log('Comentarios del curso:', course.title);
        break;
      case 'analytics':
        // Mostrar estadísticas del curso
        console.log('Analytics del curso:', course.title);
        break;
      case 'certificate':
        // Mostrar certificado del curso
        console.log('Certificado del curso:', course.title);
        break;
      default:
        console.log('Acción no reconocida:', action);
    }
  };

  return (
    <div className="p-6">
      <CourseManager 
        userRole="user"
        showAdminControls={false}
        onCourseAction={handleCourseAction}
      />
    </div>
  );
};

export default UserCourses;