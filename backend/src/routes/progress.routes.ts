// ========================================
// RUTAS DE PROGRESO - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken } from '../middleware/auth.middleware';
import { ProgressController } from '../controllers/progress.controller';

const router = Router();
const progressController = new ProgressController();

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Obtener progreso del usuario en un curso
router.get('/:courseId', verifyToken, asyncHandler(progressController.getCourseProgress.bind(progressController)));

// Actualizar progreso de una lección
router.patch('/:courseId/lessons/:lessonId', verifyToken, asyncHandler(progressController.updateLessonProgress.bind(progressController)));

// Obtener progreso de todos los cursos del usuario
router.get('/', verifyToken, asyncHandler(progressController.getAllProgress.bind(progressController)));

// Marcar lección como completada
router.patch('/:courseId/lessons/:lessonId/complete', verifyToken, asyncHandler(progressController.completeLesson.bind(progressController)));

// Obtener estadísticas de progreso
router.get('/stats/overview', verifyToken, asyncHandler(progressController.getProgressStats.bind(progressController)));

export default router;
