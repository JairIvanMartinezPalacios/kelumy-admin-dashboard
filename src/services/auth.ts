// ========================================
// SERVICIO DE AUTENTICACIÓN - KELUMY PLATFORM
// ========================================

import { apiService, ENDPOINTS } from './api';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User, 
  ChangePasswordData,
  ForgotPasswordData,
  ResetPasswordData,
  VerifyEmailData,
  OAuthProvider 
} from '@/types';

// Clase del servicio de autenticación
export class AuthService {
  private readonly TOKEN_KEY = 'kelumy_token';
  private readonly REFRESH_TOKEN_KEY = 'kelumy_refresh_token';
  private readonly USER_KEY = 'kelumy_user';

  // Método para realizar login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      // Guardar tokens y datos del usuario en localStorage
      this.saveTokens(response.token, response.refreshToken);
      this.saveUser(response.user);
      apiService.setAuthToken(response.token);

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Método para realizar registro
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        ENDPOINTS.AUTH.REGISTER,
        userData
      );

      // Guardar tokens y datos del usuario en localStorage
      this.saveTokens(response.token, response.refreshToken);
      this.saveUser(response.user);
      apiService.setAuthToken(response.token);

      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  // Método para realizar logout
  async logout(): Promise<void> {
    try {
      // Llamar al endpoint de logout para invalidar el token en el servidor
      await apiService.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
      // Continuar con el logout local incluso si hay error en el servidor
    } finally {
      // Limpiar datos locales
      this.clearTokens();
      this.clearUser();
      apiService.removeAuthToken();
    }
  }

  // Método para refrescar el token
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiService.post<{ token: string }>(
        ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      this.saveToken(response.token);
      apiService.setAuthToken(response.token);

      return response.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      // Si falla el refresh, hacer logout
      await this.logout();
      throw error;
    }
  }

  // Método para cambio de contraseña
  async changePassword(passwordData: ChangePasswordData): Promise<void> {
    try {
      await apiService.put(ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData);
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Método para solicitar recuperación de contraseña
  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    try {
      await apiService.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // Método para restablecer contraseña
  async resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      await apiService.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Método para verificar email
  async verifyEmail(data: VerifyEmailData): Promise<void> {
    try {
      await apiService.post(ENDPOINTS.AUTH.VERIFY_EMAIL, data);
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  }

  // Método para login con OAuth
  async loginWithOAuth(provider: OAuthProvider): Promise<void> {
    try {
      // Redirigir al proveedor OAuth
      const redirectUrl = `${ENDPOINTS.AUTH.LOGIN}/${provider}`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('OAuth login error:', error);
      throw error;
    }
  }

  // Método para obtener el usuario actual
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    if (!token || !user) {
      return false;
    }

    // Verificar si el token ha expirado
    try {
      const payload = this.parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return false;
    }
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Método para obtener el refresh token
  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Método para guardar tokens
  private saveTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  // Método para guardar token
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Método para guardar usuario
  private saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Método para limpiar tokens
  private clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // Método para limpiar usuario
  private clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Método para parsear JWT
  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  // Método para inicializar la autenticación
  initializeAuth(): void {
    const token = this.getToken();
    if (token && this.isAuthenticated()) {
      apiService.setAuthToken(token);
    }
  }

  // Método para manejar errores de autenticación
  handleAuthError(error: any): void {
    if (error.status === 401) {
      // Token expirado o inválido
      this.logout();
    }
  }
}

// Instancia singleton del servicio de autenticación
export const authService = new AuthService();

// Inicializar autenticación al cargar el módulo
authService.initializeAuth();

// Hook personalizado para autenticación
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      await authService.refreshToken();
      // El token se actualiza automáticamente
    } catch (error) {
      // Si falla el refresh, hacer logout
      await logout();
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken,
  };
};
