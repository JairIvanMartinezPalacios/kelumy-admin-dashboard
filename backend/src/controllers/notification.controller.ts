// ========================================
// CONTROLADOR DE NOTIFICACIONES - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';

export class NotificationController {
  // ========================================
  // OBTENER NOTIFICACIONES
  // ========================================
  getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { page = 1, limit = 10, unreadOnly } = req.query;

    const where: any = { userId };
    if (unreadOnly === 'true') {
      where.isRead = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.notification.count({ where });

    res.status(200).json({
      status: 'success',
      data: {
        notifications,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  });

  // ========================================
  // MARCAR NOTIFICACIÓN COMO LEÍDA
  // ========================================
  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const notification = await prisma.notification.updateMany({
      where: {
        id,
        userId
      },
      data: {
        isRead: true,
        readAt: new Date()
      }
    });

    if (notification.count === 0) {
      throw new AppError('Notificación no encontrada', 404);
    }

    res.status(200).json({
      status: 'success',
      message: 'Notificación marcada como leída'
    });
  });

  // ========================================
  // MARCAR TODAS COMO LEÍDAS
  // ========================================
  markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false
      },
      data: {
        isRead: true,
        readAt: new Date()
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Todas las notificaciones marcadas como leídas'
    });
  });

  // ========================================
  // ELIMINAR NOTIFICACIÓN
  // ========================================
  deleteNotification = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const notification = await prisma.notification.deleteMany({
      where: {
        id,
        userId
      }
    });

    if (notification.count === 0) {
      throw new AppError('Notificación no encontrada', 404);
    }

    res.status(200).json({
      status: 'success',
      message: 'Notificación eliminada exitosamente'
    });
  });

  // ========================================
  // OBTENER CONFIGURACIÓN DE NOTIFICACIONES
  // ========================================
  getNotificationSettings = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: true
      }
    });

    res.status(200).json({
      status: 'success',
      data: { settings: profile }
    });
  });

  // ========================================
  // ACTUALIZAR CONFIGURACIÓN DE NOTIFICACIONES
  // ========================================
  updateNotificationSettings = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { emailNotifications, pushNotifications, marketingEmails } = req.body;

    const profile = await prisma.userProfile.update({
      where: { userId },
      data: {
        emailNotifications,
        pushNotifications,
        marketingEmails
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Configuración actualizada exitosamente',
      data: { settings: profile }
    });
  });
}
