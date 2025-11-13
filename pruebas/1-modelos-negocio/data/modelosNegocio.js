// ========================================
// DATOS DE MODELOS DE NEGOCIO - KELUMY
// ========================================
// Archivo con datos estructurados para los modelos de negocio
// Basado en la investigación de e-commerce educativo

export const modelosNegocioData = {
  suscripcion: {
    id: 'suscripcion',
    nombre: 'Suscripción (SaaS Educativo)',
    icono: 'CreditCard',
    color: 'blue',
    descripcion: 'Acceso ilimitado a catálogo por mes/año',
    precio: '$520 MXN/mes',
    ejemplos: ['Platzi', 'Coursera Plus', 'LinkedIn Learning'],
    ventajas: [
      'Previsibilidad de ingresos',
      'Mejor LTV y retención',
      'Facilita inversión en contenido'
    ],
    desventajas: [
      'Requiere oferta constante de valor',
      'Alta demanda de churn management',
      'Necesita buen sistema de billing'
    ],
    aplicacionKelumy: {
      planes: [
        { 
          id: 'estudiante',
          nombre: 'Plan Estudiante', 
          precio: '$340 MXN/mes', 
          usuarios: '1-2',
          caracteristicas: [
            'Acceso a cursos básicos de STEM',
            'Certificados digitales',
            'Soporte por email',
            'Comunidad de estudiantes'
          ]
        },
        { 
          id: 'profesor',
          nombre: 'Plan Profesor', 
          precio: '$520 MXN/mes', 
          usuarios: '1-3',
          caracteristicas: [
            'Acceso completo a catálogo',
            'Herramientas de evaluación',
            'Recursos pedagógicos',
            'Soporte prioritario'
          ]
        },
        { 
          id: 'familiar',
          nombre: 'Plan Familiar', 
          precio: '$700 MXN/mes', 
          usuarios: '3-6',
          caracteristicas: [
            'Acceso familiar completo',
            'Perfiles individuales',
            'Progreso por usuario',
            'Soporte familiar'
          ]
        },
        { 
          id: 'institucional',
          nombre: 'Plan Institucional', 
          precio: '$1,780 MXN/mes', 
          usuarios: '10-50',
          caracteristicas: [
            'Acceso institucional',
            'Panel de administración',
            'Reportes de progreso',
            'Soporte dedicado'
          ]
        }
      ],
      metricas: {
        churn: '<5% mensual',
        ltv: '$10,800+ MXN',
        cac: '$450 MXN',
        conversionTrial: '>20%',
        arpu: '$520 MXN/mes'
      }
    }
  },

  marketplace: {
    id: 'marketplace',
    nombre: 'Marketplace / Venta por Curso',
    icono: 'ShoppingCart',
    color: 'green',
    descripcion: 'Cada curso se compra por separado con descuentos frecuentes',
    precio: '$1,780 MXN promedio',
    ejemplos: ['Udemy', 'Domestika', 'Skillshare'],
    ventajas: [
      'Rápida expansión de catálogo',
      'Monetización temprana por curso',
      'Atractivo para usuarios que buscan ofertas'
    ],
    desventajas: [
      'Dependencia de promociones',
      'Menor control sobre calidad',
      'Competencia de precios'
    ],
    aplicacionKelumy: {
      estructura: [
        { 
          tipo: 'Curso Individual', 
          precio: '$1,780 MXN', 
          comision: '30%',
          ejemplos: ['Robótica Básica', 'Programación Arduino', 'Energías Renovables']
        },
        { 
          tipo: 'Ruta Completa', 
          precio: '$2,680 MXN', 
          comision: '25%',
          ejemplos: ['Ingeniería Aplicada', 'Tecnología Educativa', 'STEM Avanzado']
        },
        { 
          tipo: 'Bootcamp Premium', 
          precio: '$3,580 MXN', 
          comision: '20%',
          ejemplos: ['Certificación IoT', 'Mentoría Técnica', 'Proyectos Reales']
        }
      ],
      metricas: {
        conversion: '>15%',
        takeRate: '25% promedio',
        frecuenciaCompra: '2-3 veces/año',
        gmv: '$500,000+ MXN/mes',
        instructoresActivos: '50+'
      }
    }
  },

  hibrido: {
    id: 'hibrido',
    nombre: 'Híbrido (Suscripción + Venta Individual)',
    icono: 'Target',
    color: 'purple',
    descripcion: 'Combina suscripción base + cursos premium individuales',
    precio: 'Variable',
    ejemplos: ['MasterClass', 'CreativeLive', 'Kelumy (Recomendado)'],
    ventajas: [
      'Diversificación de ingresos',
      'Flexibilidad para atraer usuarios',
      'Balance entre adquisición y retención'
    ],
    desventajas: [
      'Mayor complejidad operativa',
      'Riesgo de canibalización',
      'Necesita segmentación clara'
    ],
    aplicacionKelumy: {
      estructura: [
        { 
          nivel: 'Base (Suscripción)', 
          contenido: 'Cursos fundamentales de STEM', 
          precio: '$520 MXN/mes',
          incluye: [
            'Matemáticas aplicadas',
            'Ciencias básicas',
            'Introducción a programación',
            'Comunidad estudiantil'
          ]
        },
        { 
          nivel: 'Premium (Individual)', 
          contenido: 'Cursos especializados y avanzados', 
          precio: '$1,780-3,580 MXN',
          incluye: [
            'Robótica avanzada',
            'IoT y sensores',
            'Energías renovables aplicadas',
            'Proyectos reales'
          ]
        },
        { 
          nivel: 'Bootcamp', 
          contenido: 'Programas intensivos con mentoría', 
          precio: '$5,360-8,900 MXN',
          incluye: [
            'Mentoría personalizada',
            'Proyectos de portafolio',
            'Certificación profesional',
            'Conectividad laboral'
          ]
        }
      ],
      metricas: {
        conversionSuscripcion: '>25%',
        upsellPremium: '>15%',
        ltvCombinado: '>14,400 MXN',
        churnSuscripcion: '<4% mensual',
        revenueMix: '60% suscripción, 40% ventas individuales'
      }
    }
  },

  micropagos: {
    id: 'micropagos',
    nombre: 'Micro-pagos / Micro-learning',
    icono: 'Zap',
    color: 'orange',
    descripcion: 'Lecciones individuales o micro-certificados a bajo precio',
    precio: '$90-180 MXN',
    ejemplos: ['Skillshare', 'Udemy (algunos cursos)', 'Pluralsight'],
    ventajas: [
      'Bajo umbral de entrada',
      'Bueno para pruebas de contenido',
      'Alto volumen de transacciones'
    ],
    desventajas: [
      'Alto costo operativo',
      'Difícil escalar LTV',
      'Muchas transacciones pequeñas'
    ],
    aplicacionKelumy: {
      productos: [
        { 
          tipo: 'Micro-lección', 
          precio: '$90 MXN', 
          duracion: '15-30 min',
          ejemplos: [
            'Configurar Arduino en 30 min',
            'Conceptos básicos de energía solar',
            'Introducción a sensores IoT'
          ]
        },
        { 
          tipo: 'Mini-curso', 
          precio: '$180 MXN', 
          duracion: '1-2 horas',
          ejemplos: [
            'Construir tu primer robot',
            'Programar un sensor de temperatura',
            'Fundamentos de programación'
          ]
        },
        { 
          tipo: 'Certificación rápida', 
          precio: '$270 MXN', 
          duracion: '2-3 horas',
          ejemplos: [
            'Certificación Arduino básico',
            'Especialista en energías renovables',
            'Programador IoT junior'
          ]
        }
      ],
      metricas: {
        frecuenciaCompra: '2-3 veces/año',
        ticketPromedio: '$108 MXN',
        conversionLead: '>50%',
        volumenTransacciones: '1,000+ por mes',
        costoTransaccional: '$15 MXN por transacción'
      }
    }
  },

  b2b: {
    id: 'b2b',
    nombre: 'B2B / Licenciamiento Corporativo',
    icono: 'Building',
    color: 'indigo',
    descripcion: 'Licencias a empresas, instituciones educativas o gobiernos',
    precio: '$44,460-267,300 MXN/año',
    ejemplos: ['Platzi for Business', 'Coursera for Enterprise', 'LinkedIn Learning'],
    ventajas: [
      'Ingresos recurrentes grandes',
      'Menor sensibilidad a promociones',
      'Contratos a largo plazo'
    ],
    desventajas: [
      'Ciclo de ventas largo',
      'Negociación y soporte dedicado',
      'Requiere producto robusto'
    ],
    aplicacionKelumy: {
      paquetes: [
        { 
          nombre: 'Básico', 
          precio: '$44,460 MXN/año', 
          usuarios: '10-25',
          caracteristicas: [
            'Acceso completo a catálogo',
            'Panel de administración básico',
            'Reportes mensuales',
            'Soporte por email'
          ]
        },
        { 
          nombre: 'Profesional', 
          precio: '$89,100 MXN/año', 
          usuarios: '25-100',
          caracteristicas: [
            'Acceso completo + cursos premium',
            'Panel avanzado con analytics',
            'Reportes personalizados',
            'Soporte prioritario'
          ]
        },
        { 
          nombre: 'Enterprise', 
          precio: '$267,300 MXN/año', 
          usuarios: '100-500',
          caracteristicas: [
            'Acceso completo + bootcamps',
            'LMS integrado',
            'Reportes en tiempo real',
            'Soporte dedicado 24/7'
          ]
        }
      ],
      metricas: {
        tasaCierre: '>20%',
        acv: '$133,650 MXN promedio',
        churnCorporativo: '<2% anual',
        cicloVentas: '3-6 meses',
        expansionRevenue: '>30% anual'
      }
    }
  }
}

// Métricas comparativas entre modelos
export const metricasComparativas = {
  suscripcion: {
    previsibilidad: 95,
    escalabilidad: 85,
    complejidad: 70,
    ltv: 95,
    churnRisk: 30
  },
  marketplace: {
    previsibilidad: 60,
    escalabilidad: 95,
    complejidad: 80,
    ltv: 60,
    churnRisk: 70
  },
  hibrido: {
    previsibilidad: 80,
    escalabilidad: 90,
    complejidad: 90,
    ltv: 90,
    churnRisk: 40
  },
  micropagos: {
    previsibilidad: 40,
    escalabilidad: 75,
    complejidad: 60,
    ltv: 40,
    churnRisk: 80
  },
  b2b: {
    previsibilidad: 90,
    escalabilidad: 70,
    complejidad: 95,
    ltv: 85,
    churnRisk: 20
  }
}

// Recomendaciones por tipo de negocio
export const recomendaciones = {
  startup: ['suscripcion', 'hibrido'],
  escala: ['marketplace', 'hibrido', 'b2b'],
  nicho: ['micropagos', 'suscripcion'],
  corporativo: ['b2b', 'hibrido'],
  educativo: ['suscripcion', 'b2b']
}
