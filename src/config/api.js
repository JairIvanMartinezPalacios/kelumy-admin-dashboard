// ========================================
// CONFIGURACIÓN DE LA API KELUMY
// ========================================

// URL base de la API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
    LOGOUT: '/auth/logout'
  },
  
  // Administración
  ADMIN: {
    USERS: '/admin/users',
    PROMOTE: '/admin/promote',
    DEMOTE: '/admin/demote',
    DELETE_USER: '/admin/users/delete',
    STATS: '/admin/stats',
    ACTIVITY: '/admin/activity'
  },
  
  // Cursos
  COURSES: {
    LIST: '/courses',
    CREATE: '/courses',
    UPDATE: '/courses',
    DELETE: '/courses',
    ENROLL: '/courses/enroll'
  },
  
  // Usuarios
  USERS: {
    PROFILE: '/users/profile',
    COURSES: '/users/courses',
    PROGRESS: '/users/progress'
  }
};

// Configuración de timeout para las peticiones
export const API_TIMEOUT = 10000; // 10 segundos

// Configuración de reintentos
export const API_RETRY_ATTEMPTS = 3;

// Headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  TOKEN_KEY: 'kelumy_token',
  USER_KEY: 'kelumy_user',
  ROLE_KEY: 'kelumy_role',
  AUTH_KEY: 'kelumy_isAuthenticated'
};

// Configuración de roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Rutas protegidas por rol
export const PROTECTED_ROUTES = {
  '/admin-dashboard': [USER_ROLES.ADMIN],
  '/user-dashboard': [USER_ROLES.USER, USER_ROLES.ADMIN],
  '/admin': [USER_ROLES.ADMIN],
  '/profile': [USER_ROLES.USER, USER_ROLES.ADMIN]
};

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  TIMEOUT: 5000, // 5 segundos
  POSITION: 'top-right',
  TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  }
};

// Configuración de validación
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: 'Por favor ingresa un email válido'
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MESSAGE: 'La contraseña debe tener al menos 6 caracteres'
  },
  NAME: {
    MIN_LENGTH: 2,
    MESSAGE: 'El nombre debe tener al menos 2 caracteres'
  },
  PHONE: {
    PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
    MESSAGE: 'Por favor ingresa un número de teléfono válido'
  }
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'KELUMY',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plataforma de cursos en línea',
  CONTACT_EMAIL: 'contacto@kelumy.com',
  SUPPORT_EMAIL: 'soporte@kelumy.com'
};

// Configuración de desarrollo
export const DEV_CONFIG = {
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
  ENABLE_DEBUG: process.env.NODE_ENV === 'development',
  MOCK_API: process.env.REACT_APP_MOCK_API === 'true'
};

// Función para obtener la URL completa de un endpoint
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Función para obtener headers con autenticación
export const getAuthHeaders = () => {
  const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  return {
    ...DEFAULT_HEADERS,
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Función para verificar si una ruta está protegida
export const isRouteProtected = (route) => {
  return Object.keys(PROTECTED_ROUTES).includes(route);
};

// Función para verificar si un usuario puede acceder a una ruta
export const canAccessRoute = (route, userRole) => {
  const allowedRoles = PROTECTED_ROUTES[route];
  return allowedRoles ? allowedRoles.includes(userRole) : true;
};

// Función para obtener la ruta de redirección según el rol
export const getRedirectPath = (userRole) => {
  switch (userRole) {
    case USER_ROLES.ADMIN:
      return '/admin-dashboard';
    case USER_ROLES.USER:
      return '/user-dashboard';
    default:
      return '/login';
  }
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  API_TIMEOUT,
  API_RETRY_ATTEMPTS,
  DEFAULT_HEADERS,
  AUTH_CONFIG,
  USER_ROLES,
  PROTECTED_ROUTES,
  NOTIFICATION_CONFIG,
  VALIDATION_RULES,
  APP_CONFIG,
  DEV_CONFIG,
  getApiUrl,
  getAuthHeaders,
  isRouteProtected,
  canAccessRoute,
  getRedirectPath
};
