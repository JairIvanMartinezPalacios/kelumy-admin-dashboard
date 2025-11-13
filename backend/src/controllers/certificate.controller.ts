// ========================================
// CONTROLADOR DE CERTIFICADOS - KELUMY BACKEND
// ========================================

import { Request, Response } from 'express';
import { prisma } from '../../../lib/prisma';
import { AppError, asyncHandler } from '../middleware/error.middleware';

export class CertificateController {
  // ========================================
  // VERIFICAR CERTIFICADO
  // ========================================
  verifyCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { verificationCode: code },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        course: {
          select: {
            title: true,
            instructor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    if (!certificate) {
      throw new AppError('Certificado no encontrado', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { certificate }
    });
  });

  // ========================================
  // OBTENER MIS CERTIFICADOS
  // ========================================
  getMyCertificates = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const certificates = await prisma.certificate.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
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
  // OBTENER CERTIFICADO POR ID
  // ========================================
  getCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const certificate = await prisma.certificate.findFirst({
      where: {
        id,
        userId
      },
      include: {
        course: {
          select: {
            title: true,
            instructor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    if (!certificate) {
      throw new AppError('Certificado no encontrado', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { certificate }
    });
  });

  // ========================================
  // DESCARGAR CERTIFICADO
  // ========================================
  downloadCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const certificate = await prisma.certificate.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!certificate) {
      throw new AppError('Certificado no encontrado', 404);
    }

    // TODO: Implementar descarga de archivo PDF
    res.status(200).json({
      status: 'success',
      message: 'Descarga de certificado iniciada',
      data: { downloadUrl: certificate.certificateUrl }
    });
  });

  // ========================================
  // COMPARTIR CERTIFICADO
  // ========================================
  shareCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const certificate = await prisma.certificate.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!certificate) {
      throw new AppError('Certificado no encontrado', 404);
    }

    const shareUrl = `${process.env.FRONTEND_URL}/certificates/verify/${certificate.verificationCode}`;

    res.status(200).json({
      status: 'success',
      data: { shareUrl }
    });
  });
}
