// ========================================
// RUTAS DE RESEÑAS - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken } from '../middleware/auth.middleware';
import { ReviewController } from '../controllers/review.controller';

const router = Router();
const reviewController = new ReviewController();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// Obtener reseñas de un curso
router.get('/course/:courseId', asyncHandler(reviewController.getCourseReviews.bind(reviewController)));

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Crear reseña
router.post('/:courseId', verifyToken, asyncHandler(reviewController.createReview.bind(reviewController)));

// Actualizar reseña
router.put('/:id', verifyToken, asyncHandler(reviewController.updateReview.bind(reviewController)));

// Eliminar reseña
router.delete('/:id', verifyToken, asyncHandler(reviewController.deleteReview.bind(reviewController)));

// Marcar reseña como útil
router.post('/:id/helpful', verifyToken, asyncHandler(reviewController.markHelpful.bind(reviewController)));

// Obtener mis reseñas
router.get('/my-reviews', verifyToken, asyncHandler(reviewController.getMyReviews.bind(reviewController)));

export default router;
