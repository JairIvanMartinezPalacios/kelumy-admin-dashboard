// ========================================
// HOOK DE CURSOS - KELUMY PLATFORM
// ========================================

import { useState, useEffect, useCallback } from 'react';
import { apiService, ENDPOINTS } from '@/services/api';
import { 
  Course, 
  CourseModule, 
  CourseLesson, 
  CourseEnrollment, 
  CourseProgress,
  CreateCourseData,
  UpdateCourseData,
  CourseReview,
  PaginatedResponse,
  FilterParams 
} from '@/types';

// Hook para gestión de cursos
export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  // Función para obtener lista de cursos
  const fetchCourses = useCallback(async (params?: FilterParams & { page?: number; limit?: number }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.get<PaginatedResponse<Course>>(
        ENDPOINTS.COURSES.LIST,
        params
      );
      
      setCourses(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar cursos';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para obtener un curso específico
  const fetchCourse = useCallback(async (id: string): Promise<Course | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const course = await apiService.get<Course>(ENDPOINTS.COURSES.GET(id));
      return course;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar curso';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para crear un nuevo curso
  const createCourse = useCallback(async (courseData: CreateCourseData): Promise<Course | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newCourse = await apiService.post<Course>(ENDPOINTS.COURSES.CREATE, courseData);
      
      // Actualizar la lista de cursos
      setCourses(prev => [newCourse, ...prev]);
      
      return newCourse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear curso';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para actualizar un curso
  const updateCourse = useCallback(async (id: string, courseData: UpdateCourseData): Promise<Course | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedCourse = await apiService.put<Course>(
        ENDPOINTS.COURSES.UPDATE(id),
        courseData
      );
      
      // Actualizar la lista de cursos
      setCourses(prev => prev.map(course => 
        course.id === id ? updatedCourse : course
      ));
      
      return updatedCourse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar curso';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para eliminar un curso
  const deleteCourse = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.delete(ENDPOINTS.COURSES.DELETE(id));
      
      // Remover de la lista de cursos
      setCourses(prev => prev.filter(course => course.id !== id));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar curso';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para inscribirse en un curso
  const enrollInCourse = useCallback(async (courseId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.post(ENDPOINTS.COURSES.ENROLL(courseId));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al inscribirse en el curso';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estado
    courses,
    loading,
    error,
    pagination,
    
    // Acciones
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    clearError,
  };
};

// Hook para progreso de cursos
export const useCourseProgress = (courseId?: string) => {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener progreso del curso
  const fetchProgress = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const courseProgress = await apiService.get<CourseProgress>(
        ENDPOINTS.COURSES.PROGRESS(id)
      );
      setProgress(courseProgress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar progreso';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para actualizar progreso
  const updateProgress = useCallback(async (
    courseId: string,
    lessonId: string,
    watchedDuration: number
  ) => {
    try {
      await apiService.patch(ENDPOINTS.COURSES.PROGRESS(courseId), {
        lessonId,
        watchedDuration,
      });
      
      // Actualizar progreso local
      if (progress) {
        setProgress({
          ...progress,
          totalWatchedTime: progress.totalWatchedTime + watchedDuration,
          lastWatchedLesson: lessonId,
          lastWatchedAt: new Date(),
        });
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }, [progress]);

  // Efecto para cargar progreso si se proporciona courseId
  useEffect(() => {
    if (courseId) {
      fetchProgress(courseId);
    }
  }, [courseId, fetchProgress]);

  return {
    progress,
    loading,
    error,
    fetchProgress,
    updateProgress,
  };
};

// Hook para inscripciones
export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener inscripciones del usuario
  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userEnrollments = await apiService.get<CourseEnrollment[]>('/enrollments');
      setEnrollments(userEnrollments);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar inscripciones';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para inscribirse en un curso
  const enroll = useCallback(async (courseId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const enrollment = await apiService.post<CourseEnrollment>('/enrollments', {
        courseId,
      });
      
      setEnrollments(prev => [enrollment, ...prev]);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al inscribirse';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto para cargar inscripciones al montar
  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return {
    enrollments,
    loading,
    error,
    fetchEnrollments,
    enroll,
  };
};

// Hook para reseñas de cursos
export const useCourseReviews = (courseId?: string) => {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener reseñas del curso
  const fetchReviews = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const courseReviews = await apiService.get<CourseReview[]>(`/courses/${id}/reviews`);
      setReviews(courseReviews);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar reseñas';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para crear una reseña
  const createReview = useCallback(async (
    courseId: string,
    reviewData: Omit<CourseReview, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<CourseReview | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newReview = await apiService.post<CourseReview>(
        `/courses/${courseId}/reviews`,
        reviewData
      );
      
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear reseña';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto para cargar reseñas si se proporciona courseId
  useEffect(() => {
    if (courseId) {
      fetchReviews(courseId);
    }
  }, [courseId, fetchReviews]);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
  };
};
