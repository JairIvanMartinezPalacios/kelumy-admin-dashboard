// ========================================
// CONTROLADOR DE INSCRIPCIONES - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';

export class EnrollmentController {
  // ========================================
  // INSCRIBIRSE EN UN CURSO
  // ========================================
  enrollInCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    // Verificar que el curso existe
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, status: true }
    });

    if (!course) {
      throw new AppError('Curso no encontrado', 404);
    }

    if (course.status !== 'PUBLISHED') {
      throw new AppError('El curso no está disponible para inscripción', 400);
    }

    // Verificar si ya está inscrito
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    if (existingEnrollment) {
      throw new AppError('Ya estás inscrito en este curso', 400);
    }

    // Crear inscripción
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'ACTIVE'
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

    // Crear progreso inicial
    await prisma.progress.create({
      data: {
        userId,
        courseId,
        enrollmentId: enrollment.id,
        totalLessons: 0,
        totalModules: 0,
        totalDuration: 0
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Te has inscrito exitosamente en el curso',
      data: { enrollment }
    });
  });

  // ========================================
  // CANCELAR INSCRIPCIÓN
  // ========================================
  unenrollFromCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    if (!enrollment) {
      throw new AppError('No estás inscrito en este curso', 404);
    }

    // Eliminar inscripción y progreso
    await prisma.$transaction([
      prisma.progress.deleteMany({
        where: { enrollmentId: enrollment.id }
      }),
      prisma.enrollment.delete({
        where: { id: enrollment.id }
      })
    ]);

    res.status(200).json({
      status: 'success',
      message: 'Inscripción cancelada exitosamente'
    });
  });

  // ========================================
  // OBTENER MIS INSCRIPCIONES
  // ========================================
  getMyEnrollments = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { status, page = 1, limit = 10 } = req.query;

    const where: any = { userId };
    if (status) {
      where.status = status;
    }

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            level: true,
            duration: true,
            rating: true,
            instructor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        progress: true
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { enrolledAt: 'desc' }
    });

    const total = await prisma.enrollment.count({ where });

    res.status(200).json({
      status: 'success',
      data: {
        enrollments,
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
  // OBTENER INSCRIPCIÓN ESPECÍFICA
  // ========================================
  getEnrollment = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true
              },
              orderBy: { order: 'asc' }
            }
          }
        },
        progress: true
      }
    });

    if (!enrollment) {
      throw new AppError('No estás inscrito en este curso', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { enrollment }
    });
  });

  // ========================================
  // PAUSAR INSCRIPCIÓN
  // ========================================
  pauseEnrollment = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const enrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      data: { status: 'PAUSED' }
    });

    res.status(200).json({
      status: 'success',
      message: 'Inscripción pausada exitosamente',
      data: { enrollment }
    });
  });

  // ========================================
  // REANUDAR INSCRIPCIÓN
  // ========================================
  resumeEnrollment = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const enrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      data: { status: 'ACTIVE' }
    });

    res.status(200).json({
      status: 'success',
      message: 'Inscripción reanudada exitosamente',
      data: { enrollment }
    });
  });

  // ========================================
  // COMPLETAR CURSO
  // ========================================
  completeCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    // Verificar que está inscrito
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
      throw new AppError('No estás inscrito en este curso', 404);
    }

    // Verificar que ha completado al menos el 80% del curso
    if (enrollment.progress.completionPercentage < 80) {
      throw new AppError('Debes completar al menos el 80% del curso para marcarlo como completado', 400);
    }

    // Actualizar inscripción
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date()
      }
    });

    // Generar certificado si el curso lo incluye
    // TODO: Implementar lógica de generación de certificados

    res.status(200).json({
      status: 'success',
      message: '¡Felicidades! Has completado el curso',
      data: { enrollment: updatedEnrollment }
    });
  });
}
