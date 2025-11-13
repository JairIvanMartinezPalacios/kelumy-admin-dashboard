// ========================================
// RUTAS DE CURSOS - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken, requireInstructor, optionalAuth } from '../middleware/auth.middleware';
import { CourseController } from '../controllers/course.controller';

const router = Router();
const courseController = new CourseController();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// Obtener todos los cursos (con filtros)
router.get('/', optionalAuth, asyncHandler(courseController.getAllCourses.bind(courseController)));

// Obtener curso por ID
router.get('/:id', optionalAuth, asyncHandler(courseController.getCourseById.bind(courseController)));

// Obtener categorías de cursos
router.get('/categories/all', asyncHandler(courseController.getCategories.bind(courseController)));

// Buscar cursos
router.get('/search/:query', optionalAuth, asyncHandler(courseController.searchCourses.bind(courseController)));

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Crear curso (solo instructores)
router.post('/', verifyToken, requireInstructor, asyncHandler(courseController.createCourse.bind(courseController)));

// Actualizar curso (solo instructor propietario o admin)
router.put('/:id', verifyToken, asyncHandler(courseController.updateCourse.bind(courseController)));

// Eliminar curso (solo instructor propietario o admin)
router.delete('/:id', verifyToken, asyncHandler(courseController.deleteCourse.bind(courseController)));

// Publicar curso (solo instructor propietario)
router.patch('/:id/publish', verifyToken, asyncHandler(courseController.publishCourse.bind(courseController)));

// Archivar curso (solo instructor propietario)
router.patch('/:id/archive', verifyToken, asyncHandler(courseController.archiveCourse.bind(courseController)));

// Obtener módulos del curso
router.get('/:id/modules', optionalAuth, asyncHandler(courseController.getCourseModules.bind(courseController)));

// Crear módulo (solo instructor propietario)
router.post('/:id/modules', verifyToken, asyncHandler(courseController.createModule.bind(courseController)));

// Actualizar módulo (solo instructor propietario)
router.put('/:id/modules/:moduleId', verifyToken, asyncHandler(courseController.updateModule.bind(courseController)));

// Eliminar módulo (solo instructor propietario)
router.delete('/:id/modules/:moduleId', verifyToken, asyncHandler(courseController.deleteModule.bind(courseController)));

// Obtener lecciones del módulo
router.get('/:id/modules/:moduleId/lessons', optionalAuth, asyncHandler(courseController.getModuleLessons.bind(courseController)));

// Crear lección (solo instructor propietario)
router.post('/:id/modules/:moduleId/lessons', verifyToken, asyncHandler(courseController.createLesson.bind(courseController)));

// Actualizar lección (solo instructor propietario)
router.put('/:id/modules/:moduleId/lessons/:lessonId', verifyToken, asyncHandler(courseController.updateLesson.bind(courseController)));

// Eliminar lección (solo instructor propietario)
router.delete('/:id/modules/:moduleId/lessons/:lessonId', verifyToken, asyncHandler(courseController.deleteLesson.bind(courseController)));

// Obtener estadísticas del curso (solo instructor propietario)
router.get('/:id/stats', verifyToken, asyncHandler(courseController.getCourseStats.bind(courseController)));

export default router;
