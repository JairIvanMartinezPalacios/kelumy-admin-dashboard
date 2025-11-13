// ========================================
// RUTAS DE AUTENTICACIÓN - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken, verifyRefreshToken } from '../middleware/auth.middleware';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// Registro de usuario
router.post('/register', asyncHandler(authController.register.bind(authController)));

// Inicio de sesión
router.post('/login', asyncHandler(authController.login.bind(authController)));

// Verificar email
router.post('/verify-email', asyncHandler(authController.verifyEmail.bind(authController)));

// Reenviar email de verificación
router.post('/resend-verification', asyncHandler(authController.resendVerification.bind(authController)));

// Solicitar restablecimiento de contraseña
router.post('/forgot-password', asyncHandler(authController.forgotPassword.bind(authController)));

// Restablecer contraseña
router.post('/reset-password', asyncHandler(authController.resetPassword.bind(authController)));

// Inicio de sesión con Google
router.post('/google', asyncHandler(authController.googleLogin.bind(authController)));

// Inicio de sesión con Facebook
router.post('/facebook', asyncHandler(authController.facebookLogin.bind(authController)));

// Inicio de sesión con Twitter
router.post('/twitter', asyncHandler(authController.twitterLogin.bind(authController)));

// Inicio de sesión con Apple
router.post('/apple', asyncHandler(authController.appleLogin.bind(authController)));

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Cerrar sesión
router.post('/logout', verifyToken, asyncHandler(authController.logout.bind(authController)));

// Obtener perfil del usuario autenticado
router.get('/me', verifyToken, asyncHandler(authController.getProfile.bind(authController)));

// Actualizar perfil
router.put('/profile', verifyToken, asyncHandler(authController.updateProfile.bind(authController)));

// Cambiar contraseña
router.put('/change-password', verifyToken, asyncHandler(authController.changePassword.bind(authController)));

// Refrescar token
router.post('/refresh', verifyRefreshToken, asyncHandler(authController.refreshToken.bind(authController)));

// Eliminar cuenta
router.delete('/account', verifyToken, asyncHandler(authController.deleteAccount.bind(authController)));

export default router;
