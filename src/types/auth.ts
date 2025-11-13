// ========================================
// TIPOS DE AUTENTICACIÓN - KELUMY PLATFORM
// ========================================

// Tipos de roles de usuario
export type UserRole = 'admin' | 'instructor' | 'student';

// Tipos de proveedores OAuth
export type OAuthProvider = 'google' | 'facebook' | 'apple' | 'twitter';

// Datos de login
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Datos de registro
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  state?: string;
  academicLevel: AcademicLevel;
  currentGrade?: string;
  phone?: string;
  acceptTerms: boolean;
}

// Niveles académicos
export type AcademicLevel = 'secundaria' | 'preparatoria' | 'universidad' | 'posgrado';

// Respuesta de autenticación
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Datos de usuario autenticado
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  country: string;
  state?: string;
  academicLevel: AcademicLevel;
  currentGrade?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

// Estado de autenticación
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Datos de cambio de contraseña
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Datos de recuperación de contraseña
export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Datos de verificación de email
export interface VerifyEmailData {
  token: string;
}

// Configuración de sesión
export interface SessionConfig {
  autoRefresh: boolean;
  refreshThreshold: number; // minutos antes del vencimiento
  maxIdleTime: number; // minutos de inactividad
}
