// ========================================
// CONFIGURACIÓN DEL SERVIDOR - KELUMY BACKEND
// ========================================

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración del servidor
export const serverConfig = {
  port: parseInt(process.env.PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
  },
  
  // Base de datos
  database: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/kelumy_db'
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  
  // Email
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  },
  
  // OAuth
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID || '',
      appSecret: process.env.FACEBOOK_APP_SECRET || ''
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || ''
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID || '',
      clientSecret: process.env.APPLE_CLIENT_SECRET || ''
    }
  },
  
  // Pagos
  payments: {
    stripe: {
      publicKey: process.env.STRIPE_PUBLIC_KEY || '',
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
    },
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || ''
    }
  },
  
  // Almacenamiento
  storage: {
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      region: process.env.AWS_REGION || 'us-east-1',
      bucket: process.env.AWS_S3_BUCKET || 'kelumy-uploads'
    }
  },
  
  // Notificaciones
  notifications: {
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || ''
    }
  },
  
  // Analytics
  analytics: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
    hotjarId: process.env.HOTJAR_ID || ''
  },
  
  // Seguridad
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',
    csrfSecret: process.env.CSRF_SECRET || 'your-csrf-secret'
  },
  
  // Cache
  cache: {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: parseInt(process.env.CACHE_TTL || '3600')
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log'
  }
};

// Validar configuración crítica
export const validateConfig = () => {
  const required = [
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'DATABASE_URL'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
  }
  
  return true;
};

// Función para obtener configuración por entorno
export const getConfigForEnvironment = (env: string) => {
  const configs = {
    development: {
      ...serverConfig,
      logging: {
        level: 'debug',
        file: 'logs/dev.log'
      }
    },
    production: {
      ...serverConfig,
      logging: {
        level: 'info',
        file: 'logs/prod.log'
      }
    },
    test: {
      ...serverConfig,
      database: {
        url: process.env.TEST_DATABASE_URL || 'postgresql://username:password@localhost:5432/kelumy_test_db'
      },
      logging: {
        level: 'error',
        file: 'logs/test.log'
      }
    }
  };
  
  return configs[env as keyof typeof configs] || configs.development;
};

export default serverConfig;
