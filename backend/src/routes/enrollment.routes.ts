// ========================================
// RUTAS DE INSCRIPCIONES - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken } from '../middleware/auth.middleware';
import { EnrollmentController } from '../controllers/enrollment.controller';

const router = Router();
const enrollmentController = new EnrollmentController();

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Inscribirse en un curso
router.post('/:courseId', verifyToken, asyncHandler(enrollmentController.enrollInCourse.bind(enrollmentController)));

// Cancelar inscripción
router.delete('/:courseId', verifyToken, asyncHandler(enrollmentController.unenrollFromCourse.bind(enrollmentController)));

// Obtener inscripciones del usuario
router.get('/my-enrollments', verifyToken, asyncHandler(enrollmentController.getMyEnrollments.bind(enrollmentController)));

// Obtener inscripción específica
router.get('/:courseId', verifyToken, asyncHandler(enrollmentController.getEnrollment.bind(enrollmentController)));

// Pausar inscripción
router.patch('/:courseId/pause', verifyToken, asyncHandler(enrollmentController.pauseEnrollment.bind(enrollmentController)));

// Reanudar inscripción
router.patch('/:courseId/resume', verifyToken, asyncHandler(enrollmentController.resumeEnrollment.bind(enrollmentController)));

// Completar curso
router.patch('/:courseId/complete', verifyToken, asyncHandler(enrollmentController.completeCourse.bind(enrollmentController)));

export default router;
