// ========================================
// CONTROLADOR DE USUARIOS - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';

export class UserController {
  // ========================================
  // OBTENER TODOS LOS USUARIOS
  // ========================================
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, role, search } = req.query;

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
        lastLogin: true
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.user.count({ where });

    res.status(200).json({
      status: 'success',
      data: {
        users,
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
  // OBTENER USUARIO POR ID
  // ========================================
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        country: true,
        state: true,
        academicLevel: true,
        currentGrade: true,
        phone: true,
        isVerified: true,
        createdAt: true,
        lastLogin: true,
        profile: true
      }
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  });

  // ========================================
  // ACTUALIZAR USUARIO
  // ========================================
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, phone, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        phone,
        avatar
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        phone: true
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Usuario actualizado exitosamente',
      data: { user }
    });
  });

  // ========================================
  // ELIMINAR USUARIO
  // ========================================
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({
      status: 'success',
      message: 'Usuario eliminado exitosamente'
    });
  });

  // ========================================
  // OBTENER ESTADÍSTICAS DE USUARIO
  // ========================================
  getUserStats = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const [
      enrollments,
      completedCourses,
      certificates,
      reviews
    ] = await Promise.all([
      prisma.enrollment.count({
        where: { userId: id }
      }),
      prisma.enrollment.count({
        where: { userId: id, status: 'COMPLETED' }
      }),
      prisma.certificate.count({
        where: { userId: id }
      }),
      prisma.review.count({
        where: { userId: id }
      })
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          enrollments,
          completedCourses,
          certificates,
          reviews
        }
      }
    });
  });

  // ========================================
  // OBTENER CURSOS DEL USUARIO
  // ========================================
  getUserCourses = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const courses = await prisma.enrollment.findMany({
      where: { userId: id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            level: true,
            status: true,
            duration: true,
            rating: true,
            studentsCount: true
          }
        },
        progress: true
      },
      orderBy: { enrolledAt: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { courses }
    });
  });

  // ========================================
  // OBTENER CERTIFICADOS DEL USUARIO
  // ========================================
  getUserCertificates = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const certificates = await prisma.certificate.findMany({
      where: { userId: id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            instructor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: { issuedAt: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { certificates }
    });
  });

  // ========================================
  // OBTENER LOGROS DEL USUARIO
  // ========================================
  getUserAchievements = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const achievements = await prisma.userAchievement.findMany({
      where: { userId: id },
      include: {
        achievement: true
      },
      orderBy: { unlockedAt: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { achievements }
    });
  });

  // ========================================
  // OBTENER ACTIVIDADES DEL USUARIO
  // ========================================
  getUserActivities = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const activities = await prisma.userActivity.findMany({
      where: { userId: id },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { timestamp: 'desc' }
    });

    const total = await prisma.userActivity.count({
      where: { userId: id }
    });

    res.status(200).json({
      status: 'success',
      data: {
        activities,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  });
}
