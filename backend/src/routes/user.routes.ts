// ========================================
// RUTAS DE USUARIOS - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken, requireAdmin } from '../middleware/auth.middleware';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Obtener todos los usuarios (solo admin)
router.get('/', verifyToken, requireAdmin, asyncHandler(userController.getAllUsers.bind(userController)));

// Obtener usuario por ID
router.get('/:id', verifyToken, asyncHandler(userController.getUserById.bind(userController)));

// Actualizar usuario
router.put('/:id', verifyToken, asyncHandler(userController.updateUser.bind(userController)));

// Eliminar usuario (solo admin)
router.delete('/:id', verifyToken, requireAdmin, asyncHandler(userController.deleteUser.bind(userController)));

// Obtener estadísticas de usuario
router.get('/:id/stats', verifyToken, asyncHandler(userController.getUserStats.bind(userController)));

// Obtener cursos del usuario
router.get('/:id/courses', verifyToken, asyncHandler(userController.getUserCourses.bind(userController)));

// Obtener certificados del usuario
router.get('/:id/certificates', verifyToken, asyncHandler(userController.getUserCertificates.bind(userController)));

// Obtener logros del usuario
router.get('/:id/achievements', verifyToken, asyncHandler(userController.getUserAchievements.bind(userController)));

// Obtener actividades del usuario
router.get('/:id/activities', verifyToken, asyncHandler(userController.getUserActivities.bind(userController)));

export default router;
