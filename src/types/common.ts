// ========================================
// TIPOS COMUNES - KELUMY PLATFORM
// ========================================

// Estados comunes
export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';

// Prioridades
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// Tipos de archivo
export type FileType = 'image' | 'video' | 'document' | 'audio' | 'archive';

// Formatos de archivo soportados
export const SUPPORTED_FILE_TYPES = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
  document: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  audio: ['mp3', 'wav', 'ogg', 'aac'],
  archive: ['zip', 'rar', '7z', 'tar', 'gz']
} as const;

// Tamaños de archivo (en MB)
export const MAX_FILE_SIZES = {
  image: 5,
  video: 500,
  document: 10,
  audio: 50,
  archive: 100
} as const;

// Configuración de paginación
export interface PaginationConfig {
  defaultPageSize: number;
  pageSizeOptions: number[];
  maxPageSize: number;
}

// Datos de archivo
export interface FileData {
  id: string;
  name: string;
  originalName: string;
  size: number;
  type: FileType;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
  uploadedBy: string;
}

// Datos de carga de archivo
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Configuración de tema
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
}

// Configuración de idioma
export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
  isRTL: boolean;
}

// Datos de localización
export interface LocaleData {
  language: string;
  country: string;
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  numberFormat: string;
}

// Configuración de notificaciones
export interface NotificationConfig {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  marketing: boolean;
}

// Datos de analytics
export interface AnalyticsEvent {
  id: string;
  name: string;
  properties: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

// Configuración de SEO
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;
}

// Datos de error
export interface ErrorData {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
  userId?: string;
  stack?: string;
}

// Datos de validación
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Configuración de cache
export interface CacheConfig {
  enabled: boolean;
  ttl: number; // time to live en segundos
  maxSize: number; // tamaño máximo en MB
}

// Datos de performance
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkLatency: number;
  timestamp: Date;
}

// Configuración de seguridad
export interface SecurityConfig {
  requireHTTPS: boolean;
  enableCSP: boolean;
  enableHSTS: boolean;
  sessionTimeout: number; // en minutos
  maxLoginAttempts: number;
  lockoutDuration: number; // en minutos
}

// Datos de auditoría
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// Configuración de backup
export interface BackupConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  retention: number; // días
  compression: boolean;
  encryption: boolean;
}
