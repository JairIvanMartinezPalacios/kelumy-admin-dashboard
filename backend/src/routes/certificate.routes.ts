// ========================================
// RUTAS DE CERTIFICADOS - KELUMY BACKEND
// ========================================

import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import { verifyToken } from '../middleware/auth.middleware';
import { CertificateController } from '../controllers/certificate.controller';

const router = Router();
const certificateController = new CertificateController();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// Verificar certificado por código
router.get('/verify/:code', asyncHandler(certificateController.verifyCertificate.bind(certificateController)));

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// Obtener certificados del usuario
router.get('/my-certificates', verifyToken, asyncHandler(certificateController.getMyCertificates.bind(certificateController)));

// Obtener certificado por ID
router.get('/:id', verifyToken, asyncHandler(certificateController.getCertificate.bind(certificateController)));

// Descargar certificado
router.get('/:id/download', verifyToken, asyncHandler(certificateController.downloadCertificate.bind(certificateController)));

// Compartir certificado
router.post('/:id/share', verifyToken, asyncHandler(certificateController.shareCertificate.bind(certificateController)));

export default router;
