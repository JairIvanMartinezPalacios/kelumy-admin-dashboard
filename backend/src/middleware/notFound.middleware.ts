// ========================================
// MIDDLEWARE PARA RUTAS NO ENCONTRADAS - KELUMY BACKEND
// ========================================

import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

// Middleware para manejar rutas no encontradas
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new AppError(
    `Ruta ${req.originalUrl} no encontrada`,
    404
  );
  next(error);
};
