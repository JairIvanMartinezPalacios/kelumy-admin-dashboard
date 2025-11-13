// ========================================
// CLIENTE DE PRISMA - KELUMY PLATFORM
// ========================================

import { PrismaClient } from '@prisma/client';

// Configuración del cliente Prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Crear instancia del cliente Prisma
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
});

// En desarrollo, guardar la instancia globalmente para evitar múltiples conexiones
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Función para conectar a la base de datos
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Base de datos conectada exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    throw error;
  }
};

// Función para desconectar de la base de datos
export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Base de datos desconectada exitosamente');
  } catch (error) {
    console.error('❌ Error al desconectar de la base de datos:', error);
    throw error;
  }
};

// Middleware para logging de queries
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  }
  
  return result;
});

// Middleware para manejo de errores
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
});

// Función para verificar la conexión
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

// Función para obtener estadísticas de la base de datos
export const getDatabaseStats = async () => {
  try {
    const [
      userCount,
      courseCount,
      enrollmentCount,
      certificateCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.certificate.count()
    ]);

    return {
      users: userCount,
      courses: courseCount,
      enrollments: enrollmentCount,
      certificates: certificateCount,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    throw error;
  }
};

// Función para limpiar datos de prueba
export const cleanupTestData = async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Cleanup function can only be used in test environment');
  }

  try {
    await prisma.$transaction([
      prisma.userBadge.deleteMany(),
      prisma.userAchievement.deleteMany(),
      prisma.userActivity.deleteMany(),
      prisma.notification.deleteMany(),
      prisma.message.deleteMany(),
      prisma.userReport.deleteMany(),
      prisma.userFollow.deleteMany(),
      prisma.review.deleteMany(),
      prisma.certificate.deleteMany(),
      prisma.progress.deleteMany(),
      prisma.enrollment.deleteMany(),
      prisma.lesson.deleteMany(),
      prisma.module.deleteMany(),
      prisma.course.deleteMany(),
      prisma.courseCategory.deleteMany(),
      prisma.badge.deleteMany(),
      prisma.achievement.deleteMany(),
      prisma.userProfile.deleteMany(),
      prisma.user.deleteMany(),
    ]);
    
    console.log('✅ Datos de prueba limpiados exitosamente');
  } catch (error) {
    console.error('❌ Error al limpiar datos de prueba:', error);
    throw error;
  }
};

// Función para crear datos de prueba
export const seedTestData = async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Seed function can only be used in test environment');
  }

  try {
    // Crear categorías de prueba
    const category = await prisma.courseCategory.create({
      data: {
        name: 'Programación',
        description: 'Cursos de programación y desarrollo de software',
        icon: 'code',
        color: '#3B82F6'
      }
    });

    // Crear usuario instructor de prueba
    const instructor = await prisma.user.create({
      data: {
        email: 'instructor@test.com',
        password: 'hashedpassword',
        firstName: 'Juan',
        lastName: 'Pérez',
        role: 'INSTRUCTOR',
        country: 'México',
        academicLevel: 'UNIVERSIDAD',
        isVerified: true
      }
    });

    // Crear curso de prueba
    const course = await prisma.course.create({
      data: {
        title: 'JavaScript Básico',
        description: 'Aprende los fundamentos de JavaScript',
        shortDescription: 'Curso introductorio de JavaScript',
        instructorId: instructor.id,
        categoryId: category.id,
        level: 'BEGINNER',
        status: 'PUBLISHED',
        price: 99.99,
        currency: 'USD',
        language: 'es',
        duration: 1200,
        tags: ['javascript', 'programming', 'web'],
        requirements: ['Conocimientos básicos de HTML'],
        objectives: ['Aprender sintaxis de JavaScript', 'Entender conceptos básicos']
      }
    });

    console.log('✅ Datos de prueba creados exitosamente');
    return { category, instructor, course };
  } catch (error) {
    console.error('❌ Error al crear datos de prueba:', error);
    throw error;
  }
};

// Exportar el cliente por defecto
export default prisma;
