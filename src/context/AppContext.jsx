// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// ========================================
// TIPOS DE ACCIONES - Constantes para el reducer
// ========================================

const ActionTypes = {
  // Usuario actual
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_USER_ROLE: 'SET_USER_ROLE',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  
  // Cursos
  SET_COURSES: 'SET_COURSES',
  ADD_COURSE: 'ADD_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  UPDATE_COURSE_PROGRESS: 'UPDATE_COURSE_PROGRESS',
  
  // Certificados
  SET_CERTIFICATES: 'SET_CERTIFICATES',
  ADD_CERTIFICATE: 'ADD_CERTIFICATE',
  UPDATE_CERTIFICATE: 'UPDATE_CERTIFICATE',
  
  // Notificaciones
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  MARK_ALL_NOTIFICATIONS_READ: 'MARK_ALL_NOTIFICATIONS_READ',
  
  // Configuración global
  SET_APP_CONFIG: 'SET_APP_CONFIG',
  UPDATE_APP_CONFIG: 'UPDATE_APP_CONFIG',
  
  // Sincronización
  SYNC_DATA: 'SYNC_DATA',
  SET_SYNC_STATUS: 'SET_SYNC_STATUS'
};

// ========================================
// ESTADO INICIAL - Estado por defecto de la aplicación
// ========================================

const initialState = {
  // Usuario actual
  currentUser: null,
  userRole: null,
  
  // Datos de la aplicación
  courses: [],
  certificates: [],
  notifications: [],
  
  // Configuración global
  appConfig: {
    theme: 'dark',
    language: 'es',
    maintenance: false,
    features: {
      courses: true,
      certificates: true,
      notifications: true,
      chat: true,
      calendar: true
    }
  },
  
  // Estado de sincronización
  syncStatus: {
    isConnected: true,
    lastSync: null,
    pendingChanges: 0
  },
  
  // Estado de carga
  loading: false,
  error: null
};

// ========================================
// REDUCER - Función para manejar cambios de estado
// ========================================

const appReducer = (state, action) => {
  switch (action.type) {
    // Usuario actual
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
      
    case ActionTypes.SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload
      };
      
    case ActionTypes.UPDATE_USER_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
          updatedAt: new Date().toISOString()
        }
      };
    
    // Cursos
    case ActionTypes.SET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
      
    case ActionTypes.ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        syncStatus: {
          ...state.syncStatus,
          pendingChanges: state.syncStatus.pendingChanges + 1
        }
      };
      
    case ActionTypes.UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.id ? { ...course, ...action.payload, updatedAt: new Date().toISOString() } : course
        ),
        syncStatus: {
          ...state.syncStatus,
          pendingChanges: state.syncStatus.pendingChanges + 1
        }
      };
      
    case ActionTypes.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload),
        syncStatus: {
          ...state.syncStatus,
          pendingChanges: state.syncStatus.pendingChanges + 1
        }
      };
      
    case ActionTypes.UPDATE_COURSE_PROGRESS:
      return {
        ...state,
        courses: state.courses.map(course => {
          if (course.id === action.payload.courseId) {
            return {
              ...course,
              userProgress: {
                ...course.userProgress,
                ...action.payload.progress,
                updatedAt: new Date().toISOString()
              }
            };
          }
          return course;
        })
      };
    
    // Certificados
    case ActionTypes.SET_CERTIFICATES:
      return {
        ...state,
        certificates: action.payload,
        loading: false
      };
      
    case ActionTypes.ADD_CERTIFICATE:
      return {
        ...state,
        certificates: [...state.certificates, action.payload],
        syncStatus: {
          ...state.syncStatus,
          pendingChanges: state.syncStatus.pendingChanges + 1
        }
      };
      
    case ActionTypes.UPDATE_CERTIFICATE:
      return {
        ...state,
        certificates: state.certificates.map(certificate =>
          certificate.id === action.payload.id ? { ...certificate, ...action.payload, updatedAt: new Date().toISOString() } : certificate
        ),
        syncStatus: {
          ...state.syncStatus,
          pendingChanges: state.syncStatus.pendingChanges + 1
        }
      };
    
    // Notificaciones
    case ActionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
      
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
      
    case ActionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload ? { ...notification, isRead: true, readAt: new Date().toISOString() } : notification
        )
      };

    case ActionTypes.MARK_ALL_NOTIFICATIONS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          isRead: true,
          readAt: new Date().toISOString()
        }))
      };
    
    // Configuración global
    case ActionTypes.SET_APP_CONFIG:
      return {
        ...state,
        appConfig: action.payload
      };
      
    case ActionTypes.UPDATE_APP_CONFIG:
      return {
        ...state,
        appConfig: {
          ...state.appConfig,
          ...action.payload,
          updatedAt: new Date().toISOString()
        },
        syncStatus: {
          ...state.syncStatus,
          pendingChanges: state.syncStatus.pendingChanges + 1
        }
      };
    
    // Sincronización
    case ActionTypes.SYNC_DATA:
      return {
        ...state,
        ...action.payload,
        syncStatus: {
          ...state.syncStatus,
          lastSync: new Date().toISOString(),
          pendingChanges: 0
        }
      };
      
    case ActionTypes.SET_SYNC_STATUS:
      return {
        ...state,
        syncStatus: {
          ...state.syncStatus,
          ...action.payload
        }
      };
    
    // Estado de carga y errores
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// ========================================
// CONTEXTO - Crear el contexto de React
// ========================================

const AppContext = createContext();

// ========================================
// PROVIDER - Proveedor del contexto
// ========================================

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  // Cargar datos iniciales
  const loadInitialData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Cargar datos desde localStorage
      const savedData = localStorage.getItem('kelumy_app_data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: ActionTypes.SYNC_DATA, payload: parsedData });
      }
      
      // Simular carga de datos desde API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Guardar datos en localStorage
  const saveData = (data) => {
    try {
      localStorage.setItem('kelumy_app_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Sincronizar con servidor (simulado)
  const syncWithServer = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simular sincronización con servidor
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({
        type: ActionTypes.SET_SYNC_STATUS,
        payload: {
          isConnected: true,
          lastSync: new Date().toISOString(),
          pendingChanges: 0
        }
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({
        type: ActionTypes.SET_SYNC_STATUS,
        payload: {
          isConnected: false,
          lastSync: new Date().toISOString()
        }
      });
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // ========================================
  // EFECTOS
  // ========================================
  
  // Cargar datos iniciales al montar el componente
  useEffect(() => {
    loadInitialData();
  }, []);

  // Guardar datos cuando cambie el estado
  useEffect(() => {
    if (state.currentUser) {
      saveData({
        currentUser: state.currentUser,
        courses: state.courses,
        certificates: state.certificates,
        notifications: state.notifications,
        appConfig: state.appConfig
      });
    }
  }, [state.currentUser, state.courses, state.certificates, state.notifications, state.appConfig]);

  // Sincronizar periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.syncStatus.pendingChanges > 0) {
        syncWithServer();
      }
    }, 30000); // Sincronizar cada 30 segundos si hay cambios pendientes

    return () => clearInterval(interval);
  }, [state.syncStatus.pendingChanges]);

  // ========================================
  // VALOR DEL CONTEXTO
  // ========================================
  
  const contextValue = {
    // Estado
    ...state,
    
    // Acciones
    dispatch,
    
    // Funciones de utilidad
    loadInitialData,
    syncWithServer,
    
    // Funciones específicas para cursos
    addCourse: (course) => dispatch({ type: ActionTypes.ADD_COURSE, payload: course }),
    updateCourse: (course) => dispatch({ type: ActionTypes.UPDATE_COURSE, payload: course }),
    deleteCourse: (courseId) => dispatch({ type: ActionTypes.DELETE_COURSE, payload: courseId }),
    updateCourseProgress: (courseId, progress) => dispatch({ 
      type: ActionTypes.UPDATE_COURSE_PROGRESS, 
      payload: { courseId, progress } 
    }),
    
    // Funciones específicas para certificados
    addCertificate: (certificate) => dispatch({ type: ActionTypes.ADD_CERTIFICATE, payload: certificate }),
    updateCertificate: (certificate) => dispatch({ type: ActionTypes.UPDATE_CERTIFICATE, payload: certificate }),
    
    // Funciones específicas para notificaciones
    addNotification: (notification) => dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification }),
    markNotificationRead: (notificationId) => dispatch({ 
      type: ActionTypes.MARK_NOTIFICATION_READ, 
      payload: notificationId 
    }),
    markAllNotificationsRead: () => dispatch({ type: ActionTypes.MARK_ALL_NOTIFICATIONS_READ }),
    
    // Funciones específicas para usuario
    setCurrentUser: (user) => dispatch({ type: ActionTypes.SET_CURRENT_USER, payload: user }),
    setUserRole: (role) => dispatch({ type: ActionTypes.SET_USER_ROLE, payload: role }),
    updateUserProfile: (profile) => dispatch({ type: ActionTypes.UPDATE_USER_PROFILE, payload: profile }),
    
    // Funciones específicas para configuración
    updateAppConfig: (config) => dispatch({ type: ActionTypes.UPDATE_APP_CONFIG, payload: config }),
    
    // Funciones de utilidad
    clearError: () => dispatch({ type: 'CLEAR_ERROR' })
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// ========================================
// HOOK PERSONALIZADO - Hook para usar el contexto
// ========================================

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

// ========================================
// EXPORTACIÓN
// ========================================

export default AppContext;
