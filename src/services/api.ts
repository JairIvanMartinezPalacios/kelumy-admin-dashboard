// ========================================
// SERVICIO DE API - KELUMY PLATFORM
// ========================================

import { ApiResponse, PaginatedResponse } from '@/types';

// Configuración de la API
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
};

// Clase principal del servicio API
export class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Método para establecer el token de autenticación
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Método para remover el token de autenticación
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // Método genérico para hacer peticiones GET
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await this.makeRequest<T>(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });

    return response;
  }

  // Método genérico para hacer peticiones POST
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.makeRequest<T>(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

    return response;
  }

  // Método genérico para hacer peticiones PUT
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.makeRequest<T>(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

    return response;
  }

  // Método genérico para hacer peticiones PATCH
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.makeRequest<T>(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

    return response;
  }

  // Método genérico para hacer peticiones DELETE
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.makeRequest<T>(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.defaultHeaders,
    });

    return response;
  }

  // Método para subir archivos
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Dejar que el navegador establezca el Content-Type

    const response = await this.makeRequest<T>(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response;
  }

  // Método privado para realizar peticiones con reintentos
  private async makeRequest<T>(
    url: string,
    options: RequestInit,
    retryCount: number = 0
  ): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(response.status, response.statusText, await response.text());
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Reintentar en caso de error de red
      if (retryCount < API_CONFIG.retries && this.isRetryableError(error)) {
        await this.delay(API_CONFIG.retryDelay * (retryCount + 1));
        return this.makeRequest(url, options, retryCount + 1);
      }

      throw new ApiError(0, 'Network Error', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Método para determinar si un error es reintentable
  private isRetryableError(error: any): boolean {
    return (
      error instanceof TypeError ||
      error.name === 'AbortError' ||
      (error instanceof ApiError && error.status >= 500)
    );
  }

  // Método para delay entre reintentos
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Clase de error personalizada para la API
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public response: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

// Instancia singleton del servicio API
export const apiService = new ApiService();

// Utilidades para respuestas paginadas
export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

// Hook para manejar estados de carga
export const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
};

// Interceptor para manejar respuestas de error globalmente
export const setupGlobalErrorHandler = () => {
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason instanceof ApiError) {
      console.error('Unhandled API Error:', event.reason);
      // Aquí se puede implementar notificaciones globales
    }
  });
};

// Configuración de endpoints
export const ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  
  // Usuarios
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    UPLOAD_AVATAR: '/users/avatar',
    CHANGE_PASSWORD: '/users/change-password',
    DELETE_ACCOUNT: '/users/account',
  },
  
  // Cursos
  COURSES: {
    LIST: '/courses',
    CREATE: '/courses',
    GET: (id: string) => `/courses/${id}`,
    UPDATE: (id: string) => `/courses/${id}`,
    DELETE: (id: string) => `/courses/${id}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
    PROGRESS: (id: string) => `/courses/${id}/progress`,
  },
  
  // Archivos
  FILES: {
    UPLOAD: '/files/upload',
    DELETE: (id: string) => `/files/${id}`,
    GET: (id: string) => `/files/${id}`,
  },
} as const;
