// ========================================
// SERVICIO DE AUTENTICACIÓN - Gestión de usuarios y roles
// ========================================

// ========================================
// CONFIGURACIÓN DE LA API
// ========================================

const API_BASE_URL = 'http://localhost:8000/api'; // URL de tu API PHP

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Realiza una petición HTTP
 * @param {string} endpoint - Endpoint de la API
 * @param {object} options - Opciones de la petición
 * @returns {Promise} Respuesta de la API
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// ========================================
// FUNCIONES DE AUTENTICACIÓN
// ========================================

/**
 * Registra un nuevo usuario
 * @param {object} userData - Datos del usuario
 * @returns {Promise<object>} Usuario creado
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        fullName: userData.fullName,
        lastName: userData.lastName || '',
        email: userData.email,
        password: userData.password,
        phone: userData.phone || '',
        country: userData.country || '',
        state: userData.state || '',
        academicLevel: userData.academicLevel || '',
        currentGrade: userData.currentGrade || '',
        countryChange: userData.countryChange || '',
        expectations: userData.expectations || '',
        role: 'user' // Por defecto todos son usuarios
      })
    });

    if (response.success) {
      // Guardar token en localStorage
      localStorage.setItem('kelumy_token', response.token);
      localStorage.setItem('kelumy_user', JSON.stringify(response.user));
      localStorage.setItem('kelumy_role', response.user.role);
      
      return response.user;
    } else {
      throw new Error(response.message || 'Error en el registro');
    }
  } catch (error) {
    console.error('Register Error:', error);
    throw error;
  }
};

/**
 * Inicia sesión de un usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña (opcional, puede ser "0" o vacío)
 * @returns {Promise<object>} Datos del usuario autenticado
 */
export const loginUser = async (email, password = '') => {
  try {
    // Si no hay contraseña o es "0", permitir acceso directo
    if (!password || password === '0') {
      // Determinar rol basado en el email
      const role = getRoleFromEmail(email);
      
      // Crear usuario simulado
      const mockUser = {
        id: Date.now(),
        email: email,
        fullName: email === 'admin@gmail.com' ? 'Administrador' : 'Estudiante',
        lastName: 'KELUMY',
        role: role,
        createdAt: new Date().toISOString()
      };

      // Generar token simulado
      const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Guardar datos en localStorage
      localStorage.setItem('kelumy_token', mockToken);
      localStorage.setItem('kelumy_user', JSON.stringify(mockUser));
      localStorage.setItem('kelumy_role', role);
      localStorage.setItem('kelumy_isAuthenticated', 'true');
      
      return mockUser;
    }

    // Si hay contraseña real, intentar autenticación normal
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.success) {
      // Guardar datos en localStorage
      localStorage.setItem('kelumy_token', response.token);
      localStorage.setItem('kelumy_user', JSON.stringify(response.user));
      localStorage.setItem('kelumy_role', response.user.role);
      localStorage.setItem('kelumy_isAuthenticated', 'true');
      
      return response.user;
    } else {
      throw new Error(response.message || 'Credenciales inválidas');
    }
  } catch (error) {
    console.error('Login Error:', error);
    // En caso de error, permitir acceso directo como fallback
    const role = getRoleFromEmail(email);
    const mockUser = {
      id: Date.now(),
      email: email,
      fullName: email === 'admin@gmail.com' ? 'Administrador' : 'Estudiante',
      lastName: 'KELUMY',
      role: role,
      createdAt: new Date().toISOString()
    };

    const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    localStorage.setItem('kelumy_token', mockToken);
    localStorage.setItem('kelumy_user', JSON.stringify(mockUser));
    localStorage.setItem('kelumy_role', role);
    localStorage.setItem('kelumy_isAuthenticated', 'true');
    
    return mockUser;
  }
};

/**
 * Determina el rol basado en el email
 * @param {string} email - Email del usuario
 * @returns {string} Rol del usuario
 */
const getRoleFromEmail = (email) => {
  const emailLower = email.toLowerCase();
  
  if (emailLower === 'admin@gmail.com' || emailLower === 'contacto.jairivan@gmail.com') {
    return 'admin';
  } else if (emailLower === 'alumno@gmail.com' || emailLower === 'prueba@gmail.com') {
    return 'student';
  } else {
    // Para cualquier otro email, determinar rol basado en patrones
    if (emailLower.includes('admin') || emailLower.includes('administrador')) {
      return 'admin';
    } else {
      return 'student';
    }
  }
};

/**
 * Cierra sesión del usuario
 */
export const logoutUser = () => {
  localStorage.removeItem('kelumy_token');
  localStorage.removeItem('kelumy_user');
  localStorage.removeItem('kelumy_role');
  localStorage.removeItem('kelumy_isAuthenticated');
};

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} True si está autenticado
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('kelumy_token');
  const isAuth = localStorage.getItem('kelumy_isAuthenticated');
  return !!(token && isAuth === 'true');
};

/**
 * Obtiene el usuario actual
 * @returns {object|null} Datos del usuario o null
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('kelumy_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Obtiene el rol del usuario actual
 * @returns {string|null} Rol del usuario o null
 */
export const getCurrentUserRole = () => {
  const user = getCurrentUser();
  if (!user || !user.email) {
    return null;
  }

  // Usar la función auxiliar para determinar el rol
  return getRoleFromEmail(user.email);
};

/**
 * Verifica si el usuario es administrador
 * @returns {boolean} True si es admin
 */
export const isAdmin = () => {
  const role = getCurrentUserRole();
  return role === 'admin';
};

/**
 * Verifica si el usuario es estudiante
 * @returns {boolean} True si es estudiante
 */
export const isStudent = () => {
  const role = getCurrentUserRole();
  return role === 'student';
};

/**
 * Verifica si el usuario es usuario regular (compatibilidad)
 * @returns {boolean} True si es usuario
 */
export const isUser = () => {
  const role = getCurrentUserRole();
  return role === 'student';
};

/**
 * Actualiza el perfil del usuario
 * @param {object} userData - Nuevos datos del usuario
 * @returns {Promise<object>} Usuario actualizado
 */
export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem('kelumy_token');
    const response = await apiRequest('/auth/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData)
    });

    if (response.success) {
      // Actualizar datos en localStorage
      localStorage.setItem('kelumy_user', JSON.stringify(response.user));
      return response.user;
    } else {
      throw new Error(response.message || 'Error al actualizar perfil');
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    throw error;
  }
};

/**
 * Cambia la contraseña del usuario
 * @param {string} currentPassword - Contraseña actual
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<boolean>} True si se cambió exitosamente
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const token = localStorage.getItem('kelumy_token');
    const response = await apiRequest('/auth/change-password', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    return response.success;
  } catch (error) {
    console.error('Change Password Error:', error);
    throw error;
  }
};

/**
 * Solicita restablecimiento de contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise<boolean>} True si se envió la solicitud
 */
export const requestPasswordReset = async (email) => {
  try {
    const response = await apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    return response.success;
  } catch (error) {
    console.error('Password Reset Request Error:', error);
    throw error;
  }
};

/**
 * Restablece la contraseña con token
 * @param {string} token - Token de restablecimiento
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<boolean>} True si se restableció exitosamente
 */
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        token,
        password: newPassword
      })
    });

    return response.success;
  } catch (error) {
    console.error('Password Reset Error:', error);
    throw error;
  }
};

/**
 * Verifica el token de autenticación
 * @returns {Promise<boolean>} True si el token es válido
 */
export const verifyToken = async () => {
  try {
    const token = localStorage.getItem('kelumy_token');
    if (!token) return false;

    const response = await apiRequest('/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (response.success) {
      // Actualizar datos del usuario si el token es válido
      localStorage.setItem('kelumy_user', JSON.stringify(response.user));
      localStorage.setItem('kelumy_role', response.user.role);
      return true;
    } else {
      // Token inválido, limpiar datos
      logoutUser();
      return false;
    }
  } catch (error) {
    console.error('Token Verification Error:', error);
    logoutUser();
    return false;
  }
};

// ========================================
// FUNCIONES DE GESTIÓN DE ADMINISTRADORES
// ========================================

/**
 * Obtiene lista de usuarios (solo admin)
 * @param {object} filters - Filtros de búsqueda
 * @returns {Promise<Array>} Lista de usuarios
 */
export const getUsers = async (filters = {}) => {
  try {
    const token = localStorage.getItem('kelumy_token');
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/admin/users${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await apiRequest(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.users || [];
  } catch (error) {
    console.error('Get Users Error:', error);
    throw error;
  }
};

/**
 * Promueve un usuario a administrador (solo admin)
 * @param {number} userId - ID del usuario
 * @returns {Promise<boolean>} True si se promovió exitosamente
 */
export const promoteToAdmin = async (userId) => {
  try {
    const token = localStorage.getItem('kelumy_token');
    const response = await apiRequest('/admin/promote', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId })
    });

    return response.success;
  } catch (error) {
    console.error('Promote to Admin Error:', error);
    throw error;
  }
};

/**
 * Degrada un administrador a usuario (solo admin)
 * @param {number} userId - ID del usuario
 * @returns {Promise<boolean>} True si se degradó exitosamente
 */
export const demoteFromAdmin = async (userId) => {
  try {
    const token = localStorage.getItem('kelumy_token');
    const response = await apiRequest('/admin/demote', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId })
    });

    return response.success;
  } catch (error) {
    console.error('Demote from Admin Error:', error);
    throw error;
  }
};

/**
 * Elimina un usuario (solo admin)
 * @param {number} userId - ID del usuario
 * @returns {Promise<boolean>} True si se eliminó exitosamente
 */
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('kelumy_token');
    const response = await apiRequest(`/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.success;
  } catch (error) {
    console.error('Delete User Error:', error);
    throw error;
  }
};

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Determina la ruta de redirección según el rol
 * @param {string} role - Rol del usuario
 * @returns {string} Ruta de redirección
 */
export const getRedirectPath = (role) => {
  switch (role) {
    case 'admin':
      return '/admin-dashboard';
    case 'user':
      return '/user-dashboard';
    default:
      return '/login';
  }
};

/**
 * Verifica si el usuario puede acceder a una ruta
 * @param {string} route - Ruta a verificar
 * @param {string} userRole - Rol del usuario
 * @returns {boolean} True si puede acceder
 */
export const canAccessRoute = (route, userRole) => {
  const protectedRoutes = {
    '/admin-dashboard': ['admin'],
    '/user-dashboard': ['user', 'admin'],
    '/admin': ['admin'],
    '/profile': ['user', 'admin']
  };

  const allowedRoles = protectedRoutes[route];
  return allowedRoles ? allowedRoles.includes(userRole) : true;
};

/**
 * Obtiene información completa del usuario autenticado
 * @returns {Promise<object|null>} Datos completos del usuario
 */
export const getFullUserInfo = async () => {
  try {
    const token = localStorage.getItem('kelumy_token');
    const response = await apiRequest('/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (response.success) {
      localStorage.setItem('kelumy_user', JSON.stringify(response.user));
      return response.user;
    }
    return null;
  } catch (error) {
    console.error('Get Full User Info Error:', error);
    return null;
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
  getCurrentUser,
  getCurrentUserRole,
  isAdmin,
  isStudent,
  isUser,
  updateUserProfile,
  changePassword,
  requestPasswordReset,
  resetPassword,
  verifyToken,
  getUsers,
  promoteToAdmin,
  demoteFromAdmin,
  deleteUser,
  getRedirectPath,
  canAccessRoute,
  getFullUserInfo
};
