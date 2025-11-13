// ========================================
// TIPOS DE CURSOS - KELUMY PLATFORM
// ========================================

// Niveles de curso
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

// Estados de curso
export type CourseStatus = 'draft' | 'published' | 'archived' | 'suspended';

// Estados de inscripción
export type EnrollmentStatus = 'active' | 'completed' | 'paused' | 'cancelled';

// Tipos de contenido
export type ContentType = 'video' | 'text' | 'quiz' | 'assignment' | 'download';

// Datos de curso
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructor: CourseInstructor;
  category: CourseCategory;
  level: CourseLevel;
  status: CourseStatus;
  price: number;
  originalPrice?: number;
  currency: string;
  language: string;
  duration: number; // en minutos
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  thumbnail: string;
  banner?: string;
  tags: string[];
  requirements: string[];
  objectives: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// Instructor de curso
export interface CourseInstructor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

// Categoría de curso
export interface CourseCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  parentId?: string;
  children?: CourseCategory[];
}

// Módulo de curso
export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseLesson[];
  isCompleted?: boolean;
  completedLessons?: number;
  totalLessons?: number;
}

// Lección de curso
export interface CourseLesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  type: ContentType;
  content: LessonContent;
  order: number;
  duration: number; // en minutos
  isPreview: boolean;
  isCompleted?: boolean;
  watchedDuration?: number;
  completedAt?: Date;
}

// Contenido de lección
export interface LessonContent {
  videoUrl?: string;
  text?: string;
  quiz?: Quiz;
  assignment?: Assignment;
  downloads?: Download[];
  resources?: Resource[];
}

// Quiz
export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  timeLimit?: number; // en minutos
  passingScore: number; // porcentaje
  attempts: number;
  allowReview: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'text';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

// Asignación
export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: Date;
  maxPoints: number;
  allowedFileTypes?: string[];
  maxFileSize?: number; // en MB
}

// Descarga
export interface Download {
  id: string;
  name: string;
  url: string;
  size: number; // en bytes
  type: string;
}

// Recurso
export interface Resource {
  id: string;
  title: string;
  type: 'link' | 'document' | 'video';
  url: string;
  description?: string;
}

// Inscripción en curso
export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt?: Date;
  progress: CourseProgress;
  certificate?: Certificate;
}

// Progreso del curso
export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  totalWatchedTime: number; // en minutos
  totalDuration: number; // en minutos
  lastWatchedLesson?: string;
  lastWatchedAt?: Date;
  completionPercentage: number;
}

// Certificado
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: Date;
  certificateUrl: string;
  verificationCode: string;
  isVerified: boolean;
}

// Reseña de curso
export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  isVerified: boolean;
  helpful: number;
  notHelpful: number;
  createdAt: Date;
  updatedAt: Date;
}

// Datos de creación de curso
export interface CreateCourseData {
  title: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  level: CourseLevel;
  price: number;
  currency: string;
  language: string;
  tags: string[];
  requirements: string[];
  objectives: string[];
  thumbnail?: File;
  banner?: File;
}

// Datos de actualización de curso
export interface UpdateCourseData extends Partial<CreateCourseData> {
  status?: CourseStatus;
}
