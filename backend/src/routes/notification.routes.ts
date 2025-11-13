// ========================================
// RUTAS DE NOTIFICACIONES - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken } from '../middleware/auth.middleware';
import { NotificationController } from '../controllers/notification.controller';

const router = Router();
const notificationController = new NotificationController();

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Obtener notificaciones del usuario
router.get('/', verifyToken, asyncHandler(notificationController.getNotifications.bind(notificationController)));

// Marcar notificación como leída
router.patch('/:id/read', verifyToken, asyncHandler(notificationController.markAsRead.bind(notificationController)));

// Marcar todas las notificaciones como leídas
router.patch('/mark-all-read', verifyToken, asyncHandler(notificationController.markAllAsRead.bind(notificationController)));

// Eliminar notificación
router.delete('/:id', verifyToken, asyncHandler(notificationController.deleteNotification.bind(notificationController)));

// Obtener configuración de notificaciones
router.get('/settings', verifyToken, asyncHandler(notificationController.getNotificationSettings.bind(notificationController)));

// Actualizar configuración de notificaciones
router.put('/settings', verifyToken, asyncHandler(notificationController.updateNotificationSettings.bind(notificationController)));

export default router;
