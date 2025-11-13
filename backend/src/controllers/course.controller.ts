// ========================================
// CONTROLADOR DE CURSOS - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';

export class CourseController {
  // ========================================
  // OBTENER TODOS LOS CURSOS
  // ========================================
  getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, category, level, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const where: any = {
      status: 'PUBLISHED'
    };

    if (category) {
      where.categoryId = category;
    }

    if (level) {
      where.level = level;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } }
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true
          }
        }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sortBy as string]: sortOrder }
    });

    const total = await prisma.course.count({ where });

    res.status(200).json({
      status: 'success',
      data: {
        courses,
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
  // OBTENER CURSO POR ID
  // ========================================
  getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            profile: true
          }
        },
        category: true,
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                type: true,
                order: true,
                duration: true,
                isPreview: true
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true
          }
        }
      }
    });

    if (!course) {
      throw new AppError('Curso no encontrado', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { course }
    });
  });

  // ========================================
  // OBTENER CATEGORÍAS
  // ========================================
  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await prisma.courseCategory.findMany({
      orderBy: { name: 'asc' }
    });

    res.status(200).json({
      status: 'success',
      data: { categories }
    });
  });

  // ========================================
  // BUSCAR CURSOS
  // ========================================
  searchCourses = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const courses = await prisma.course.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } }
        ]
      },
      include: {
        instructor: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        category: {
          select: {
            name: true
          }
        }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { rating: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { courses }
    });
  });

  // ========================================
  // CREAR CURSO
  // ========================================
  createCourse = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user!.id;
    const {
      title,
      description,
      shortDescription,
      categoryId,
      level,
      price,
      currency = 'USD',
      language = 'es',
      tags = [],
      requirements = [],
      objectives = []
    } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        shortDescription,
        instructorId,
        categoryId,
        level,
        price,
        currency,
        language,
        tags,
        requirements,
        objectives,
        status: 'DRAFT'
      },
      include: {
        instructor: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        category: true
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Curso creado exitosamente',
      data: { course }
    });
  });

  // ========================================
  // ACTUALIZAR CURSO
  // ========================================
  updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Verificar que el usuario es el instructor o admin
    const course = await prisma.course.findUnique({
      where: { id },
      select: { instructorId: true }
    });

    if (!course) {
      throw new AppError('Curso no encontrado', 404);
    }

    if (course.instructorId !== userId && userRole !== 'ADMIN') {
      throw new AppError('No tienes permisos para editar este curso', 403);
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: req.body,
      include: {
        instructor: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        category: true
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Curso actualizado exitosamente',
      data: { course: updatedCourse }
    });
  });

  // ========================================
  // ELIMINAR CURSO
  // ========================================
  deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Verificar que el usuario es el instructor o admin
    const course = await prisma.course.findUnique({
      where: { id },
      select: { instructorId: true }
    });

    if (!course) {
      throw new AppError('Curso no encontrado', 404);
    }

    if (course.instructorId !== userId && userRole !== 'ADMIN') {
      throw new AppError('No tienes permisos para eliminar este curso', 403);
    }

    await prisma.course.delete({
      where: { id }
    });

    res.status(200).json({
      status: 'success',
      message: 'Curso eliminado exitosamente'
    });
  });

  // ========================================
  // PUBLICAR CURSO
  // ========================================
  publishCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const course = await prisma.course.findUnique({
      where: { id },
      select: { instructorId: true }
    });

    if (!course) {
      throw new AppError('Curso no encontrado', 404);
    }

    if (course.instructorId !== userId) {
      throw new AppError('No tienes permisos para publicar este curso', 403);
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Curso publicado exitosamente',
      data: { course: updatedCourse }
    });
  });

  // ========================================
  // ARCHIVAR CURSO
  // ========================================
  archiveCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const course = await prisma.course.findUnique({
      where: { id },
      select: { instructorId: true }
    });

    if (!course) {
      throw new AppError('Curso no encontrado', 404);
    }

    if (course.instructorId !== userId) {
      throw new AppError('No tienes permisos para archivar este curso', 403);
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { status: 'ARCHIVED' }
    });

    res.status(200).json({
      status: 'success',
      message: 'Curso archivado exitosamente',
      data: { course: updatedCourse }
    });
  });

  // ========================================
  // OBTENER MÓDULOS DEL CURSO
  // ========================================
  getCourseModules = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const modules = await prisma.module.findMany({
      where: { courseId: id },
      include: {
        lessons: {
          select: {
            id: true,
            title: true,
            type: true,
            order: true,
            duration: true,
            isPreview: true
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    res.status(200).json({
      status: 'success',
      data: { modules }
    });
  });

  // ========================================
  // CREAR MÓDULO
  // ========================================
  createModule = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, order } = req.body;

    const module = await prisma.module.create({
      data: {
        courseId: id,
        title,
        description,
        order
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Módulo creado exitosamente',
      data: { module }
    });
  });

  // ========================================
  // ACTUALIZAR MÓDULO
  // ========================================
  updateModule = asyncHandler(async (req: Request, res: Response) => {
    const { id, moduleId } = req.params;

    const module = await prisma.module.update({
      where: { id: moduleId },
      data: req.body
    });

    res.status(200).json({
      status: 'success',
      message: 'Módulo actualizado exitosamente',
      data: { module }
    });
  });

  // ========================================
  // ELIMINAR MÓDULO
  // ========================================
  deleteModule = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;

    await prisma.module.delete({
      where: { id: moduleId }
    });

    res.status(200).json({
      status: 'success',
      message: 'Módulo eliminado exitosamente'
    });
  });

  // ========================================
  // OBTENER LECCIONES DEL MÓDULO
  // ========================================
  getModuleLessons = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;

    const lessons = await prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { order: 'asc' }
    });

    res.status(200).json({
      status: 'success',
      data: { lessons }
    });
  });

  // ========================================
  // CREAR LECCIÓN
  // ========================================
  createLesson = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;
    const { title, description, type, content, order, duration, isPreview } = req.body;

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        description,
        type,
        content,
        order,
        duration,
        isPreview
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Lección creada exitosamente',
      data: { lesson }
    });
  });

  // ========================================
  // ACTUALIZAR LECCIÓN
  // ========================================
  updateLesson = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: req.body
    });

    res.status(200).json({
      status: 'success',
      message: 'Lección actualizada exitosamente',
      data: { lesson }
    });
  });

  // ========================================
  // ELIMINAR LECCIÓN
  // ========================================
  deleteLesson = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;

    await prisma.lesson.delete({
      where: { id: lessonId }
    });

    res.status(200).json({
      status: 'success',
      message: 'Lección eliminada exitosamente'
    });
  });

  // ========================================
  // OBTENER ESTADÍSTICAS DEL CURSO
  // ========================================
  getCourseStats = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Verificar que el usuario es el instructor o admin
    const course = await prisma.course.findUnique({
      where: { id },
      select: { instructorId: true }
    });

    if (!course) {
      throw new AppError('Curso no encontrado', 404);
    }

    if (course.instructorId !== userId && userRole !== 'ADMIN') {
      throw new AppError('No tienes permisos para ver las estadísticas de este curso', 403);
    }

    const [
      totalEnrollments,
      completedEnrollments,
      totalLessons,
      totalModules,
      averageRating
    ] = await Promise.all([
      prisma.enrollment.count({
        where: { courseId: id }
      }),
      prisma.enrollment.count({
        where: { courseId: id, status: 'COMPLETED' }
      }),
      prisma.lesson.count({
        where: { module: { courseId: id } }
      }),
      prisma.module.count({
        where: { courseId: id }
      }),
      prisma.review.aggregate({
        where: { courseId: id },
        _avg: { rating: true }
      })
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalEnrollments,
          completedEnrollments,
          totalLessons,
          totalModules,
          averageRating: averageRating._avg.rating || 0
        }
      }
    });
  });
}
