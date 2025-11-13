// ========================================
// CONTROLADOR DE PROGRESO - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';

export class ProgressController {
  // ========================================
  // OBTENER PROGRESO DEL CURSO
  // ========================================
  getCourseProgress = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const progress = await prisma.progress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true
          }
        }
      }
    });

    if (!progress) {
      throw new AppError('No se encontró progreso para este curso', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { progress }
    });
  });

  // ========================================
  // ACTUALIZAR PROGRESO DE LECCIÓN
  // ========================================
  updateLessonProgress = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, lessonId } = req.params;
    const userId = req.user!.id;
    const { watchedTime } = req.body;

    // Actualizar progreso
    const progress = await prisma.progress.update({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      data: {
        lastWatchedLessonId: lessonId,
        lastWatchedAt: new Date(),
        totalWatchedTime: {
          increment: watchedTime || 0
        }
      }
    });

    res.status(200).json({
      status: 'success',
      data: { progress }
    });
  });

  // ========================================
  // OBTENER TODO EL PROGRESO
  // ========================================
  getAllProgress = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const progress = await prisma.progress.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            duration: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { progress }
    });
  });

  // ========================================
  // COMPLETAR LECCIÓN
  // ========================================
  completeLesson = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, lessonId } = req.params;
    const userId = req.user!.id;

    // Actualizar progreso
    const progress = await prisma.progress.update({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      data: {
        completedLessons: {
          increment: 1
        },
        lastWatchedLessonId: lessonId,
        lastWatchedAt: new Date()
      }
    });

    // Recalcular porcentaje de completado
    const totalLessons = await prisma.lesson.count({
      where: {
        module: {
          courseId
        }
      }
    });

    const completionPercentage = (progress.completedLessons / totalLessons) * 100;

    const updatedProgress = await prisma.progress.update({
      where: { id: progress.id },
      data: { completionPercentage }
    });

    res.status(200).json({
      status: 'success',
      message: 'Lección completada',
      data: { progress: updatedProgress }
    });
  });

  // ========================================
  // OBTENER ESTADÍSTICAS DE PROGRESO
  // ========================================
  getProgressStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const [
      totalCourses,
      completedCourses,
      totalWatchedTime,
      averageCompletion
    ] = await Promise.all([
      prisma.progress.count({
        where: { userId }
      }),
      prisma.progress.count({
        where: {
          userId,
          completionPercentage: { gte: 100 }
        }
      }),
      prisma.progress.aggregate({
        where: { userId },
        _sum: { totalWatchedTime: true }
      }),
      prisma.progress.aggregate({
        where: { userId },
        _avg: { completionPercentage: true }
      })
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalCourses,
          completedCourses,
          totalWatchedTime: totalWatchedTime._sum.totalWatchedTime || 0,
          averageCompletion: averageCompletion._avg.completionPercentage || 0
        }
      }
    });
  });
}
