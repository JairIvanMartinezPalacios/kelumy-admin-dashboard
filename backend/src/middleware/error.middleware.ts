// ========================================
// MIDDLEWARE DE MANEJO DE ERRORES - KELUMY BACKEND
// ========================================

import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

// Interfaz para errores personalizados
interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// Clase para errores operacionales
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Función para manejar errores de Prisma
const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError): AppError => {
  switch (error.code) {
    case 'P2002':
      // Error de restricción única
      const field = error.meta?.target as string[] || ['campo'];
      return new AppError(
        `Ya existe un registro con este ${field.join(', ')}`,
        409
      );
    case 'P2025':
      // Registro no encontrado
      return new AppError(
        'El registro solicitado no existe',
        404
      );
    case 'P2003':
      // Error de clave foránea
      return new AppError(
        'Referencia inválida en la base de datos',
        400
      );
    case 'P2014':
      // Error de relación
      return new AppError(
        'Error en la relación entre registros',
        400
      );
    default:
      return new AppError(
        'Error en la base de datos',
        500
      );
  }
};

// Función para manejar errores de validación
const handleValidationError = (error: any): AppError => {
  const errors = Object.values(error.errors).map((err: any) => err.message);
  const message = `Datos de entrada inválidos: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Función para manejar errores de JWT
const handleJWTError = (): AppError =>
  new AppError('Token inválido. Por favor, inicia sesión nuevamente.', 401);

const handleJWTExpiredError = (): AppError =>
  new AppError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 401);

// Función para enviar errores en desarrollo
const sendErrorDev = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    error: err,
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
  });
};

// Función para enviar errores en producción
const sendErrorProd = (err: CustomError, res: Response) => {
  // Error operacional: enviar mensaje al cliente
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: 'error',
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  } else {
    // Error de programación: no enviar detalles al cliente
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Algo salió mal!',
      timestamp: new Date().toISOString(),
    });
  }
};

// Middleware principal de manejo de errores
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;

  // Log del error
  console.error('Error:', {
    message: error.message,
    statusCode: error.statusCode,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Manejar errores específicos
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(err);
  } else if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  } else if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  } else if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  } else if (err.name === 'CastError') {
    error = new AppError('Formato de ID inválido', 400);
  }

  // Enviar respuesta según el entorno
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

// Middleware para capturar errores asíncronos
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Función para crear errores personalizados
export const createError = (message: string, statusCode: number = 500) => {
  return new AppError(message, statusCode);
};

// Función para validar que un recurso existe
export const validateResourceExists = async (
  model: any,
  id: string,
  errorMessage: string = 'Recurso no encontrado'
) => {
  const resource = await model.findUnique({ where: { id } });
  if (!resource) {
    throw new AppError(errorMessage, 404);
  }
  return resource;
};

// Función para validar que un usuario tiene acceso a un recurso
export const validateResourceAccess = (
  resourceUserId: string,
  currentUserId: string,
  errorMessage: string = 'No tienes permisos para acceder a este recurso'
) => {
  if (resourceUserId !== currentUserId) {
    throw new AppError(errorMessage, 403);
  }
};

// Función para validar que un usuario es admin
export const validateAdminAccess = (userRole: string) => {
  if (userRole !== 'ADMIN') {
    throw new AppError('Se requieren permisos de administrador', 403);
  }
};

// Función para validar que un usuario es instructor o admin
export const validateInstructorAccess = (userRole: string) => {
  if (!['INSTRUCTOR', 'ADMIN'].includes(userRole)) {
    throw new AppError('Se requieren permisos de instructor', 403);
  }
};
