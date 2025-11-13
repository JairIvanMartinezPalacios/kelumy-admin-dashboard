// ========================================
// HOOK DE AUTENTICACIÓN - KELUMY PLATFORM
// ========================================

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  ChangePasswordData,
  ForgotPasswordData,
  ResetPasswordData,
  VerifyEmailData,
  OAuthProvider 
} from '@/types';

// Hook personalizado para manejo de autenticación
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Efecto para verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();
      
      setUser(currentUser);
      setIsAuthenticated(isAuth);
      
      if (isAuth && currentUser) {
        authService.initializeAuth();
      }
    };

    checkAuth();
  }, []);

  // Función para realizar login
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de inicio de sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para realizar registro
  const register = useCallback(async (userData: RegisterData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de registro';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para realizar logout
  const logout = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para refrescar token
  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      await authService.refreshToken();
      // El token se actualiza automáticamente en el servicio
    } catch (err) {
      // Si falla el refresh, hacer logout
      await logout();
      throw err;
    }
  }, [logout]);

  // Función para cambio de contraseña
  const changePassword = useCallback(async (passwordData: ChangePasswordData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.changePassword(passwordData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cambiar contraseña';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para solicitar recuperación de contraseña
  const forgotPassword = useCallback(async (data: ForgotPasswordData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.forgotPassword(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al solicitar recuperación';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para restablecer contraseña
  const resetPassword = useCallback(async (data: ResetPasswordData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.resetPassword(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al restablecer contraseña';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para verificar email
  const verifyEmail = useCallback(async (data: VerifyEmailData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.verifyEmail(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al verificar email';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para login con OAuth
  const loginWithOAuth = useCallback(async (provider: OAuthProvider): Promise<void> => {
    setError(null);
    
    try {
      await authService.loginWithOAuth(provider);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error en login OAuth';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Función para actualizar usuario
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    authService.saveUser(updatedUser);
  }, []);

  return {
    // Estado
    user,
    isAuthenticated,
    loading,
    error,
    
    // Acciones
    login,
    register,
    logout,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    loginWithOAuth,
    clearError,
    updateUser,
    
    // Utilidades
    isAdmin: user?.role === 'admin',
    isInstructor: user?.role === 'instructor',
    isStudent: user?.role === 'student',
  };
};

// Hook para verificar permisos específicos
export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();

  const hasPermission = useCallback((permission: string): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    // Lógica de permisos basada en roles
    const rolePermissions: Record<string, string[]> = {
      admin: ['*'], // Admin tiene todos los permisos
      instructor: [
        'courses:create',
        'courses:edit',
        'courses:delete',
        'courses:view',
        'students:view',
        'analytics:view',
      ],
      student: [
        'courses:view',
        'courses:enroll',
        'profile:edit',
        'certificates:view',
      ],
    };

    const userPermissions = rolePermissions[user.role] || [];
    
    return userPermissions.includes('*') || userPermissions.includes(permission);
  }, [user, isAuthenticated]);

  const canAccess = useCallback((resource: string, action: string = 'view'): boolean => {
    const permission = `${resource}:${action}`;
    return hasPermission(permission);
  }, [hasPermission]);

  return {
    hasPermission,
    canAccess,
    userRole: user?.role,
  };
};

// Hook para manejo de sesión
export const useSession = () => {
  const { user, isAuthenticated } = useAuth();
  const [lastActivity, setLastActivity] = useState<Date>(new Date());
  const [sessionTimeout, setSessionTimeout] = useState<number>(30); // minutos

  // Actualizar última actividad
  const updateActivity = useCallback(() => {
    setLastActivity(new Date());
  }, []);

  // Verificar si la sesión ha expirado por inactividad
  const isSessionExpired = useCallback((): boolean => {
    const now = new Date();
    const timeDiff = now.getTime() - lastActivity.getTime();
    const minutesDiff = timeDiff / (1000 * 60);
    
    return minutesDiff > sessionTimeout;
  }, [lastActivity, sessionTimeout]);

  // Efecto para detectar actividad del usuario
  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [isAuthenticated, updateActivity]);

  // Efecto para verificar expiración de sesión
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      if (isSessionExpired()) {
        // Sesión expirada por inactividad
        authService.logout();
      }
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [isAuthenticated, isSessionExpired]);

  return {
    lastActivity,
    sessionTimeout,
    isSessionExpired: isSessionExpired(),
    updateActivity,
    setSessionTimeout,
  };
};
