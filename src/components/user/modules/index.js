// ========================================
// MÓDULOS DE USUARIO - Exportaciones centralizadas
// ========================================
// Este archivo centraliza todas las exportaciones de los módulos de usuario/estudiante
// para facilitar las importaciones en otros componentes

// ========================================
// MÓDULOS PRINCIPALES
// ========================================

// 1. Inicio - Dashboard principal del estudiante
export { default as InicioUserModule } from './inicio/InicioUserModule'

// 2. Mis Cursos - Cursos del estudiante
export { default as MisCursosModule } from './mis-cursos/MisCursosModule'

// 3. Progreso - Seguimiento del progreso de aprendizaje
export { default as ProgresoModule } from './progreso/ProgresoModule'

// 4. Certificados - Certificaciones obtenidas
export { default as CertificadosModule } from './certificados/CertificadosModule'

// 5. Perfil - Perfil del usuario
export { default as PerfilModule } from './perfil/PerfilModule'

// 6. Comunidad - Interacción con la comunidad
export { default as ComunidadModule } from './comunidad/ComunidadModule'

// 7. Recursos - Recursos y materiales de estudio
export { default as RecursosModule } from './recursos/RecursosModule'

// 8. Calendario - Eventos y programación personal
export { default as CalendarioUserModule } from './calendario/CalendarioUserModule'

// 9. Notificaciones - Centro de notificaciones
export { default as NotificacionesModule } from './notificaciones/NotificacionesModule'

// 10. Configuración - Configuración personal
export { default as ConfiguracionUserModule } from './configuracion/ConfiguracionUserModule'

// ========================================
// CONFIGURACIÓN DE MÓDULOS
// ========================================

// Array con la configuración de todos los módulos para el sidebar del usuario
export const userModules = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: 'Home',
    description: 'Dashboard principal del estudiante',
    component: 'InicioUserModule'
  },
  {
    id: 'mis-cursos',
    label: 'Mis Cursos',
    icon: 'BookOpen',
    description: 'Cursos inscritos y disponibles',
    component: 'MisCursosModule'
  },
  {
    id: 'progreso',
    label: 'Progreso',
    icon: 'TrendingUp',
    description: 'Seguimiento del aprendizaje',
    component: 'ProgresoModule'
  },
  {
    id: 'certificados',
    label: 'Certificados',
    icon: 'Award',
    description: 'Certificaciones obtenidas',
    component: 'CertificadosModule'
  },
  {
    id: 'perfil',
    label: 'Mi Perfil',
    icon: 'User',
    description: 'Información personal y configuración',
    component: 'PerfilModule'
  },
  {
    id: 'comunidad',
    label: 'Comunidad',
    icon: 'Users',
    description: 'Interacción con otros estudiantes',
    component: 'ComunidadModule'
  },
  {
    id: 'recursos',
    label: 'Recursos',
    icon: 'FileText',
    description: 'Materiales y recursos de estudio',
    component: 'RecursosModule'
  },
  {
    id: 'calendario',
    label: 'Calendario',
    icon: 'Calendar',
    description: 'Eventos y programación personal',
    component: 'CalendarioUserModule'
  },
  {
    id: 'notificaciones',
    label: 'Notificaciones',
    icon: 'Bell',
    description: 'Centro de notificaciones',
    component: 'NotificacionesModule'
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: 'Settings',
    description: 'Configuración personal',
    component: 'ConfiguracionUserModule'
  }
]
