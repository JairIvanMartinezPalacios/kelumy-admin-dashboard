// ========================================
// CONTROLADOR DE AUTENTICACIÓN - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';
import { generateTokens } from '../middleware/auth.middleware';

export class AuthController {
  // ========================================
  // REGISTRO DE USUARIO
  // ========================================
  register = asyncHandler(async (req: Request, res: Response) => {
    const {
      email,
      password,
      firstName,
      lastName,
      country,
      state,
      academicLevel,
      currentGrade,
      phone
    } = req.body;

    // Validar datos requeridos
    if (!email || !password || !firstName || !lastName || !country || !academicLevel) {
      throw new AppError('Faltan campos requeridos', 400);
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError('Formato de email inválido', 400);
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      throw new AppError('La contraseña debe tener al menos 6 caracteres', 400);
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new AppError('Ya existe una cuenta con este email', 409);
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        country,
        state,
        academicLevel,
        currentGrade,
        phone,
        role: 'STUDENT',
        isVerified: false
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    });

    // Crear perfil de usuario
    await prisma.userProfile.create({
      data: {
        userId: user.id,
        language: 'es',
        timezone: 'America/Mexico_City'
      }
    });

    // Generar tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // TODO: Enviar email de verificación
    // await sendVerificationEmail(user.email, user.id);

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  });

  // ========================================
  // INICIO DE SESIÓN
  // ========================================
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validar datos requeridos
    if (!email || !password) {
      throw new AppError('Email y contraseña son requeridos', 400);
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        lastLogin: true
      }
    });

    // Verificar si el usuario existe
    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Verificar si el usuario está verificado
    if (!user.isVerified) {
      throw new AppError('Por favor verifica tu email antes de iniciar sesión', 401);
    }

    // Actualizar último inicio de sesión
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generar tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Remover contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión exitoso',
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  });

  // ========================================
  // VERIFICAR EMAIL
  // ========================================
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
      throw new AppError('Token de verificación requerido', 400);
    }

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      // Actualizar usuario
      await prisma.user.update({
        where: { id: decoded.userId },
        data: {
          isVerified: true,
          emailVerifiedAt: new Date()
        }
      });

      res.status(200).json({
        status: 'success',
        message: 'Email verificado exitosamente'
      });
    } catch (error) {
      throw new AppError('Token de verificación inválido o expirado', 400);
    }
  });

  // ========================================
  // REENVIAR EMAIL DE VERIFICACIÓN
  // ========================================
  resendVerification = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email requerido', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    if (user.isVerified) {
      throw new AppError('El email ya está verificado', 400);
    }

    // TODO: Enviar email de verificación
    // await sendVerificationEmail(user.email, user.id);

    res.status(200).json({
      status: 'success',
      message: 'Email de verificación reenviado'
    });
  });

  // ========================================
  // SOLICITAR RESTABLECIMIENTO DE CONTRASEÑA
  // ========================================
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email requerido', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Por seguridad, no revelar si el email existe
      return res.status(200).json({
        status: 'success',
        message: 'Si el email existe, se enviará un enlace de restablecimiento'
      });
    }

    // TODO: Generar y enviar token de restablecimiento
    // const resetToken = generateResetToken(user.id);
    // await sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({
      status: 'success',
      message: 'Si el email existe, se enviará un enlace de restablecimiento'
    });
  });

  // ========================================
  // RESTABLECER CONTRASEÑA
  // ========================================
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;

    if (!token || !password) {
      throw new AppError('Token y nueva contraseña son requeridos', 400);
    }

    if (password.length < 6) {
      throw new AppError('La contraseña debe tener al menos 6 caracteres', 400);
    }

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      // Encriptar nueva contraseña
      const hashedPassword = await bcrypt.hash(password, 12);

      // Actualizar contraseña
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { password: hashedPassword }
      });

      res.status(200).json({
        status: 'success',
        message: 'Contraseña restablecida exitosamente'
      });
    } catch (error) {
      throw new AppError('Token inválido o expirado', 400);
    }
  });

  // ========================================
  // INICIO DE SESIÓN CON GOOGLE
  // ========================================
  googleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { googleToken } = req.body;

    if (!googleToken) {
      throw new AppError('Token de Google requerido', 400);
    }

    // TODO: Verificar token con Google
    // const googleUser = await verifyGoogleToken(googleToken);
    
    // Buscar o crear usuario
    // const user = await findOrCreateGoogleUser(googleUser);

    // Generar tokens
    // const { accessToken, refreshToken } = generateTokens(user.id);

    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión con Google exitoso',
      data: {
        user: {}, // Usuario de Google
        tokens: {
          accessToken: '', // Token de acceso
          refreshToken: '' // Token de refresh
        }
      }
    });
  });

  // ========================================
  // INICIO DE SESIÓN CON FACEBOOK
  // ========================================
  facebookLogin = asyncHandler(async (req: Request, res: Response) => {
    const { facebookToken } = req.body;

    if (!facebookToken) {
      throw new AppError('Token de Facebook requerido', 400);
    }

    // TODO: Implementar lógica de Facebook
    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión con Facebook exitoso'
    });
  });

  // ========================================
  // INICIO DE SESIÓN CON TWITTER
  // ========================================
  twitterLogin = asyncHandler(async (req: Request, res: Response) => {
    const { twitterToken } = req.body;

    if (!twitterToken) {
      throw new AppError('Token de Twitter requerido', 400);
    }

    // TODO: Implementar lógica de Twitter
    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión con Twitter exitoso'
    });
  });

  // ========================================
  // INICIO DE SESIÓN CON APPLE
  // ========================================
  appleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { appleToken } = req.body;

    if (!appleToken) {
      throw new AppError('Token de Apple requerido', 400);
    }

    // TODO: Implementar lógica de Apple
    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión con Apple exitoso'
    });
  });

  // ========================================
  // CERRAR SESIÓN
  // ========================================
  logout = asyncHandler(async (req: Request, res: Response) => {
    // TODO: Implementar blacklist de tokens si es necesario
    
    res.status(200).json({
      status: 'success',
      message: 'Sesión cerrada exitosamente'
    });
  });

  // ========================================
  // OBTENER PERFIL DEL USUARIO
  // ========================================
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
  // ACTUALIZAR PERFIL
  // ========================================
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { firstName, lastName, phone, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
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
      message: 'Perfil actualizado exitosamente',
      data: { user }
    });
  });

  // ========================================
  // CAMBIAR CONTRASEÑA
  // ========================================
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError('Contraseña actual y nueva contraseña son requeridas', 400);
    }

    if (newPassword.length < 6) {
      throw new AppError('La nueva contraseña debe tener al menos 6 caracteres', 400);
    }

    // Obtener usuario actual
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new AppError('Contraseña actual incorrecta', 400);
    }

    // Encriptar nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    res.status(200).json({
      status: 'success',
      message: 'Contraseña actualizada exitosamente'
    });
  });

  // ========================================
  // REFRESCAR TOKEN
  // ========================================
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    // Generar nuevos tokens
    const { accessToken, refreshToken } = generateTokens(userId);

    res.status(200).json({
      status: 'success',
      data: {
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  });

  // ========================================
  // ELIMINAR CUENTA
  // ========================================
  deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    // Eliminar usuario (esto también eliminará el perfil por CASCADE)
    await prisma.user.delete({
      where: { id: userId }
    });

    res.status(200).json({
      status: 'success',
      message: 'Cuenta eliminada exitosamente'
    });
  });
}
