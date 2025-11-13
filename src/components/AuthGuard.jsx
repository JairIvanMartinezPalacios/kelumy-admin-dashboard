// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield,         // Icono de escudo para admin
  User,           // Icono de usuario
  LogOut,         // Icono de cerrar sesión
  AlertCircle,    // Icono de alerta
  Loader2         // Icono de carga
} from 'lucide-react';
import { 
  isAuthenticated, 
  getCurrentUser, 
  getCurrentUserRole, 
  verifyToken,
  getRedirectPath,
  canAccessRoute
} from '../services/authService';

// ========================================
// COMPONENTE AUTHGUARD - Guardián de autenticación
// ========================================

// Define el componente funcional AuthGuard que protege rutas basadas en autenticación
const AuthGuard = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);

  // ========================================
  // EFECTOS
  // ========================================
  
  useEffect(() => {
    checkAuthentication();
  }, [location.pathname]);

  // ========================================
  // FUNCIONES
  // ========================================
  
  const checkAuthentication = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar si hay token en localStorage
      const hasToken = isAuthenticated();
      if (!hasToken) {
        redirectToLogin();
        return;
      }

      // Verificar token con el servidor
      const isValidToken = await verifyToken();
      if (!isValidToken) {
        redirectToLogin();
        return;
      }

      // Obtener datos del usuario
      const currentUser = getCurrentUser();
      const currentRole = getCurrentUserRole();

      if (!currentUser || !currentRole) {
        redirectToLogin();
        return;
      }

      // Verificar permisos de acceso a la ruta
      if (requiredRole && !canAccessRoute(location.pathname, currentRole)) {
        redirectToUnauthorized();
        return;
      }

      setUser(currentUser);
      setUserRole(currentRole);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication check error:', error);
      setError('Error de autenticación');
      redirectToLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = () => {
    navigate('/login', { 
      replace: true, 
      state: { from: location.pathname } 
    });
  };

  const redirectToUnauthorized = () => {
    navigate('/unauthorized', { replace: true });
  };

  const redirectToCorrectDashboard = () => {
    const redirectPath = getRedirectPath(userRole);
    if (location.pathname !== redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  };

  // ========================================
  // RENDERIZADO DE CARGA
  // ========================================
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-purple-200 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Verificando autenticación...</h2>
          <p className="text-white/70">Por favor espera mientras verificamos tus credenciales</p>
        </div>
      </div>
    );
  }

  // ========================================
  // RENDERIZADO DE ERROR
  // ========================================
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-500/20 border border-red-500/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error de Autenticación</h2>
          <p className="text-white/70 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // RENDERIZADO DE CONTENIDO
  // ========================================
  
  if (isAuthenticated && user && userRole) {
    return (
      <div>
        {/* Indicador de usuario autenticado */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              userRole === 'admin' 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {userRole === 'admin' ? (
                <Shield className="w-4 h-4" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div className="text-white">
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-white/70 capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Renderizar contenido protegido */}
        {React.cloneElement(children, { 
          user, 
          userRole,
          onLogout: () => {
            localStorage.clear();
            navigate('/login');
          }
        })}
      </div>
    );
  }

  return null;
};

// ========================================
// COMPONENTE DE PÁGINA NO AUTORIZADA
// ========================================

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const userRole = getCurrentUserRole();

  const redirectToDashboard = () => {
    const redirectPath = getRedirectPath(userRole);
    navigate(redirectPath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Shield className="w-8 h-8 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Acceso No Autorizado</h2>
        <p className="text-white/70 mb-6">
          No tienes permisos para acceder a esta sección. 
          Tu rol actual es: <span className="font-semibold capitalize">{userRole}</span>
        </p>
        <div className="space-y-3">
          <button
            onClick={redirectToDashboard}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Ir a mi Dashboard
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

// ========================================
// HOOK PERSONALIZADO PARA AUTENTICACIÓN
// ========================================

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUser = getCurrentUser();
        const currentRole = getCurrentUserRole();
        
        setUser(currentUser);
        setUserRole(currentRole);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setUserRole(null);
    window.location.href = '/login';
  };

  // ========================================
  // RENDERIZADO CONDICIONAL - Mostrar contenido según autenticación
  // ========================================
  
  // Si está cargando, mostrar spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <p className="text-white/80 text-sm">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si hay error, mostrar mensaje de error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 flex flex-col items-center space-y-4 max-w-md">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <h2 className="text-white text-lg font-semibold">Error de Autenticación</h2>
          <p className="text-white/80 text-sm text-center">{error}</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Volver al Login
          </button>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return null; // El useEffect ya maneja la redirección
  }

  // Si requiere un rol específico y el usuario no lo tiene
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 flex flex-col items-center space-y-4 max-w-md">
          <Shield className="w-8 h-8 text-red-400" />
          <h2 className="text-white text-lg font-semibold">Acceso Denegado</h2>
          <p className="text-white/80 text-sm text-center">
            No tienes permisos para acceder a esta página.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Volver Atrás
          </button>
        </div>
      </div>
    );
  }

  // Si todo está bien, mostrar el contenido protegido
  return children;
};

export default AuthGuard;
