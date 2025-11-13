// ========================================
// TIPOS DE USUARIO - KELUMY PLATFORM
// ========================================

import { User, UserRole, AcademicLevel } from './auth';

// Tipos de perfil de usuario
export interface UserProfile extends User {
  bio?: string;
  website?: string;
  socialLinks: SocialLinks;
  preferences: UserPreferences;
  statistics: UserStatistics;
  achievements: Achievement[];
  badges: Badge[];
}

// Enlaces sociales
export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
}

// Preferencias del usuario
export interface UserPreferences {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  publicProfile: boolean;
  showProgress: boolean;
  autoPlay: boolean;
  playbackSpeed: number;
  videoQuality: 'auto' | '720p' | '1080p' | '1440p';
}

// Estadísticas del usuario
export interface UserStatistics {
  coursesEnrolled: number;
  coursesCompleted: number;
  certificatesEarned: number;
  totalStudyTime: number; // en minutos
  streakDays: number;
  pointsEarned: number;
  rank: number;
  level: number;
}

// Logro
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  points: number;
  unlockedAt: Date;
  progress?: number;
  maxProgress?: number;
}

// Categorías de logros
export type AchievementCategory = 
  | 'learning' 
  | 'social' 
  | 'streak' 
  | 'certification' 
  | 'community' 
  | 'special';

// Insignia
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
  isDisplayed: boolean;
}

// Actividad del usuario
export interface UserActivity {
  id: string;
  userId: string;
  type: ActivityType;
  title: string;
  description: string;
  metadata: Record<string, any>;
  timestamp: Date;
  isRead: boolean;
}

// Tipos de actividad
export type ActivityType = 
  | 'course_enrolled'
  | 'course_completed'
  | 'certificate_earned'
  | 'achievement_unlocked'
  | 'badge_earned'
  | 'streak_milestone'
  | 'level_up'
  | 'review_posted'
  | 'comment_posted'
  | 'profile_updated';

// Historial de aprendizaje
export interface LearningHistory {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  action: LearningAction;
  timestamp: Date;
  duration?: number; // en segundos
  metadata?: Record<string, any>;
}

// Acciones de aprendizaje
export type LearningAction = 
  | 'started'
  | 'paused'
  | 'resumed'
  | 'completed'
  | 'quiz_attempted'
  | 'quiz_completed'
  | 'assignment_submitted'
  | 'download_accessed';

// Configuración de privacidad
export interface PrivacySettings {
  showProfile: boolean;
  showCourses: boolean;
  showAchievements: boolean;
  showStatistics: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  allowFriendRequests: boolean;
  showOnlineStatus: boolean;
}

// Datos de actualización de perfil
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  website?: string;
  socialLinks?: Partial<SocialLinks>;
  preferences?: Partial<UserPreferences>;
  privacy?: Partial<PrivacySettings>;
  avatar?: File;
}

// Datos de búsqueda de usuarios
export interface UserSearchParams {
  query?: string;
  role?: UserRole;
  academicLevel?: AcademicLevel;
  country?: string;
  isVerified?: boolean;
  sortBy?: 'name' | 'joinDate' | 'activity' | 'reputation';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Datos de seguimiento de usuario
export interface UserFollow {
  id: string;
  followerId: string;
  followingId: string;
  followedAt: Date;
}

// Mensaje de usuario
export interface UserMessage {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  isRead: boolean;
  sentAt: Date;
  readAt?: Date;
  attachments?: FileData[];
}

// Notificación de usuario
export interface UserNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
  expiresAt?: Date;
}

// Tipos de notificación
export type NotificationType = 
  | 'course_update'
  | 'new_course'
  | 'achievement'
  | 'message'
  | 'system'
  | 'marketing'
  | 'reminder'
  | 'social';

// Configuración de notificaciones
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  sms: boolean;
  types: Record<NotificationType, boolean>;
}

// Datos de reporte de usuario
export interface UserReport {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: ReportReason;
  description: string;
  evidence?: FileData[];
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

// Razones de reporte
export type ReportReason = 
  | 'spam'
  | 'harassment'
  | 'inappropriate_content'
  | 'fake_profile'
  | 'copyright_violation'
  | 'other';
