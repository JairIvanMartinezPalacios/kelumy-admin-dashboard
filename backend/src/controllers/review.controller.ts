// ========================================
// CONTROLADOR DE RESEÑAS - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';

export class ReviewController {
  // ========================================
  // OBTENER RESEÑAS DE UN CURSO
  // ========================================
  getCourseReviews = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { page = 1, limit = 10, rating } = req.query;

    const where: any = { courseId };
    if (rating) {
      where.rating = Number(rating);
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.review.count({ where });

    res.status(200).json({
      status: 'success',
      data: {
        reviews,
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
  // CREAR RESEÑA
  // ========================================
  createReview = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;
    const { rating, title, comment } = req.body;

    // Verificar que está inscrito y ha completado el curso
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      include: {
        progress: true
      }
    });

    if (!enrollment) {
      throw new AppError('Debes estar inscrito en el curso para escribir una reseña', 400);
    }

    if (enrollment.status !== 'COMPLETED') {
      throw new AppError('Debes completar el curso para escribir una reseña', 400);
    }

    // Verificar si ya escribió una reseña
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    if (existingReview) {
      throw new AppError('Ya has escrito una reseña para este curso', 400);
    }

    // Crear reseña
    const review = await prisma.review.create({
      data: {
        userId,
        courseId,
        rating,
        title,
        comment,
        isVerified: true
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    // Actualizar estadísticas del curso
    const courseStats = await prisma.review.aggregate({
      where: { courseId },
      _avg: { rating: true },
      _count: { id: true }
    });

    await prisma.course.update({
      where: { id: courseId },
      data: {
        rating: courseStats._avg.rating || 0,
        reviewsCount: courseStats._count.id
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Reseña creada exitosamente',
      data: { review }
    });
  });

  // ========================================
  // ACTUALIZAR RESEÑA
  // ========================================
  updateReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const { rating, title, comment } = req.body;

    const review = await prisma.review.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!review) {
      throw new AppError('Reseña no encontrada', 404);
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, title, comment },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Reseña actualizada exitosamente',
      data: { review: updatedReview }
    });
  });

  // ========================================
  // ELIMINAR RESEÑA
  // ========================================
  deleteReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const review = await prisma.review.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!review) {
      throw new AppError('Reseña no encontrada', 404);
    }

    await prisma.review.delete({
      where: { id }
    });

    res.status(200).json({
      status: 'success',
      message: 'Reseña eliminada exitosamente'
    });
  });

  // ========================================
  // MARCAR RESEÑA COMO ÚTIL
  // ========================================
  markHelpful = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await prisma.review.findUnique({
      where: { id }
    });

    if (!review) {
      throw new AppError('Reseña no encontrada', 404);
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        helpful: {
          increment: 1
        }
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Reseña marcada como útil',
      data: { review: updatedReview }
    });
  });

  // ========================================
  // OBTENER MIS RESEÑAS
  // ========================================
  getMyReviews = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const reviews = await prisma.review.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { reviews }
    });
  });
}
