// ========================================
// MIDDLEWARE DE AUTENTICACIÓN - KELUMY BACKEND
// ========================================

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from './error.middleware';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
      };
    }
  }
}

// Función para verificar el token JWT
export const verifyToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Obtener token del header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Verificar que el token existe
  if (!token) {
    throw new AppError('Token de acceso requerido', 401);
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
      },
    });

    // Verificar que el usuario existe
    if (!user) {
      throw new AppError('Usuario no encontrado', 401);
    }

    // Verificar que el usuario está verificado
    if (!user.isVerified) {
      throw new AppError('Usuario no verificado', 401);
    }

    // Agregar información del usuario a la request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Token inválido', 401);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expirado', 401);
    }
    throw error;
  }
});

// Middleware para verificar roles específicos
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Usuario no autenticado', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('No tienes permisos para acceder a este recurso', 403);
    }

    next();
  };
};

// Middleware para verificar que el usuario es admin
export const requireAdmin = authorize('ADMIN');

// Middleware para verificar que el usuario es instructor o admin
export const requireInstructor = authorize('INSTRUCTOR', 'ADMIN');

// Middleware para verificar que el usuario es estudiante o superior
export const requireStudent = authorize('STUDENT', 'INSTRUCTOR', 'ADMIN');

// Middleware para verificar que el usuario puede acceder a un recurso propio
export const requireOwnership = (resourceUserIdField: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Usuario no autenticado', 401);
    }

    // Si es admin, puede acceder a cualquier recurso
    if (req.user.role === 'ADMIN') {
      return next();
    }

    // Verificar que el usuario es el propietario del recurso
    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (resourceUserId !== req.user.id) {
      throw new AppError('No tienes permisos para acceder a este recurso', 403);
    }

    next();
  };
};

// Middleware opcional para verificar token (no falla si no hay token)
export const optionalAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
        },
      });

      if (user && user.isVerified) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
    } catch (error) {
      // Ignorar errores de token en autenticación opcional
    }
  }

  next();
});

// Función para generar tokens JWT
export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );

  return { accessToken, refreshToken };
};

// Función para verificar refresh token
export const verifyRefreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token requerido', 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
      },
    });

    if (!user || !user.isVerified) {
      throw new AppError('Usuario no válido', 401);
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Refresh token inválido', 401);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Refresh token expirado', 401);
    }
    throw error;
  }
});
