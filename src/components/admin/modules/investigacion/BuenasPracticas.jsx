// ========================================
// MÓDULO 12: BUENAS PRÁCTICAS - KELUMY
// ========================================
// Previsualización de mejores prácticas y estándares de calidad
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Settings,
  BarChart3,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Star,
  CheckCircle as Check,
  BookOpen,
  Lightbulb,
  Users,
  Shield,
  Zap,
  Eye,
  Lock,
  Database,
  Server,
  Cloud,
  Key,
  Bell,
  FileText,
  Activity,
  PieChart,
  LineChart,
  Award,
  Heart,
  ThumbsUp,
  RefreshCw,
  User,
  HelpCircle,
  X,
  Plus,
  Minus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  MousePointer,
  Send,
  Calendar,
  Timer,
  AlertTriangle,
  CheckSquare,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Smartphone,
  Monitor,
  Tablet,
  Camera,
  Video,
  Mic,
  Headphones,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Unlock,
  CloudOff,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Gift,
  Crown,
  Rocket,
  Sparkles,
  Flame,
  Wind,
  Waves,
  Mountain,
  TreePine,
  Flower,
  Bug,
  Code
} from 'lucide-react'

const BuenasPracticas = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [categoriaActiva, setCategoriaActiva] = useState('desarrollo')
  const [nivelActivo, setNivelActivo] = useState('basico')

  // Categorías de Buenas Prácticas
  const categoriasPracticas = {
    desarrollo: {
      nombre: 'Desarrollo y Código',
      descripcion: 'Mejores prácticas para desarrollo de software y gestión de código',
      icono: Code,
      color: 'blue',
      practicas: [
        {
          nombre: 'Clean Code',
          nivel: 'Avanzado',
          descripcion: 'Escribir código limpio, legible y mantenible',
          beneficios: [
            'Mayor legibilidad del código',
            'Facilita el mantenimiento',
            'Reduce bugs y errores',
            'Mejora la colaboración en equipo'
          ],
          implementacion: [
            'Usar nombres descriptivos para variables y funciones',
            'Mantener funciones pequeñas y con una sola responsabilidad',
            'Eliminar código duplicado (DRY principle)',
            'Escribir comentarios útiles y documentación'
          ],
          herramientas: ['ESLint', 'Prettier', 'SonarQube', 'Code Review'],
          impacto: 'Alto',
          tiempo: '2-4 semanas'
        },
        {
          nombre: 'Versionado con Git',
          nivel: 'Básico',
          descripcion: 'Control de versiones efectivo y colaborativo',
          beneficios: [
            'Trazabilidad de cambios',
            'Colaboración sin conflictos',
            'Rollback de versiones',
            'Historial completo del proyecto'
          ],
          implementacion: [
            'Usar Git Flow para ramas',
            'Commits descriptivos y atómicos',
            'Pull requests con revisión',
            'Tags para releases'
          ],
          herramientas: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
          impacto: 'Crítico',
          tiempo: '1 semana'
        },
        {
          nombre: 'Testing Automatizado',
          nivel: 'Intermedio',
          descripcion: 'Implementación de pruebas automatizadas',
          beneficios: [
            'Detección temprana de bugs',
            'Confianza en despliegues',
            'Documentación viva del código',
            'Refactoring seguro'
          ],
          implementacion: [
            'Unit tests para funciones críticas',
            'Integration tests para APIs',
            'E2E tests para flujos principales',
            'Coverage mínimo del 80%'
          ],
          herramientas: ['Jest', 'Cypress', 'Playwright', 'Testing Library'],
          impacto: 'Alto',
          tiempo: '3-6 semanas'
        },
        {
          nombre: 'CI/CD Pipeline',
          nivel: 'Avanzado',
          descripcion: 'Automatización de integración y despliegue continuo',
          beneficios: [
            'Despliegues automáticos y seguros',
            'Detección temprana de problemas',
            'Reducción de errores manuales',
            'Entrega más rápida de features'
          ],
          implementacion: [
            'Automatizar builds y tests',
            'Despliegue automático a staging',
            'Aprobación manual para producción',
            'Rollback automático en caso de fallos'
          ],
          herramientas: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'Azure DevOps'],
          impacto: 'Crítico',
          tiempo: '4-8 semanas'
        }
      ],
      metricas: {
        totalPracticas: 4,
        nivelImplementacion: '75%',
        tiempoPromedio: '2.5 meses',
        impacto: 'Alto'
      }
    },
    seguridad: {
      nombre: 'Seguridad y Privacidad',
      descripcion: 'Mejores prácticas para proteger datos y usuarios',
      icono: Shield,
      color: 'red',
      practicas: [
        {
          nombre: 'Autenticación Segura',
          nivel: 'Crítico',
          descripcion: 'Implementación de autenticación robusta y segura',
          beneficios: [
            'Protección de cuentas de usuario',
            'Prevención de accesos no autorizados',
            'Cumplimiento de regulaciones',
            'Confianza del usuario'
          ],
          implementacion: [
            'Autenticación multi-factor (MFA)',
            'Hashing seguro de contraseñas',
            'JWT con expiración',
            'Rate limiting en login'
          ],
          herramientas: ['Auth0', 'Firebase Auth', 'Passport.js', 'bcrypt'],
          impacto: 'Crítico',
          tiempo: '2-3 semanas'
        },
        {
          nombre: 'Encriptación de Datos',
          nivel: 'Crítico',
          descripcion: 'Protección de datos sensibles en tránsito y reposo',
          beneficios: [
            'Protección de datos personales',
            'Cumplimiento de GDPR/LOPD',
            'Prevención de filtraciones',
            'Confidencialidad garantizada'
          ],
          implementacion: [
            'HTTPS obligatorio',
            'Encriptación de base de datos',
            'Claves de encriptación rotativas',
            'Almacenamiento seguro de claves'
          ],
          herramientas: ['Let\'s Encrypt', 'AWS KMS', 'Vault', 'OpenSSL'],
          impacto: 'Crítico',
          tiempo: '3-4 semanas'
        },
        {
          nombre: 'Validación de Entrada',
          nivel: 'Alto',
          descripcion: 'Validación y sanitización de datos de entrada',
          beneficios: [
            'Prevención de inyecciones',
            'Protección contra XSS',
            'Datos consistentes',
            'Mejor experiencia de usuario'
          ],
          implementacion: [
            'Validación en frontend y backend',
            'Sanitización de HTML',
            'Escape de caracteres especiales',
            'Límites de tamaño de datos'
          ],
          herramientas: ['Joi', 'Yup', 'DOMPurify', 'Helmet.js'],
          impacto: 'Alto',
          tiempo: '2-3 semanas'
        },
        {
          nombre: 'Monitoreo de Seguridad',
          nivel: 'Intermedio',
          descripcion: 'Detección y respuesta a amenazas de seguridad',
          beneficios: [
            'Detección temprana de ataques',
            'Respuesta rápida a incidentes',
            'Análisis de patrones de ataque',
            'Cumplimiento de auditorías'
          ],
          implementacion: [
            'Logs de seguridad centralizados',
            'Alertas automáticas',
            'Análisis de comportamiento',
            'Respuesta automática a amenazas'
          ],
          herramientas: ['Splunk', 'ELK Stack', 'Wazuh', 'OSSEC'],
          impacto: 'Alto',
          tiempo: '4-6 semanas'
        }
      ],
      metricas: {
        totalPracticas: 4,
        nivelImplementacion: '90%',
        tiempoPromedio: '3 meses',
        impacto: 'Crítico'
      }
    },
    performance: {
      nombre: 'Rendimiento y Optimización',
      descripcion: 'Mejores prácticas para optimizar velocidad y eficiencia',
      icono: Zap,
      color: 'yellow',
      practicas: [
        {
          nombre: 'Optimización de Base de Datos',
          nivel: 'Intermedio',
          descripcion: 'Mejora del rendimiento de consultas y estructura de datos',
          beneficios: [
            'Consultas más rápidas',
            'Menor uso de recursos',
            'Mejor experiencia de usuario',
            'Escalabilidad mejorada'
          ],
          implementacion: [
            'Índices optimizados',
            'Consultas eficientes',
            'Conexiones pool',
            'Caché de consultas frecuentes'
          ],
          herramientas: ['PostgreSQL', 'Redis', 'MongoDB', 'Query Analyzer'],
          impacto: 'Alto',
          tiempo: '3-4 semanas'
        },
        {
          nombre: 'Optimización Frontend',
          nivel: 'Intermedio',
          descripcion: 'Mejora del rendimiento de la interfaz de usuario',
          beneficios: [
            'Carga más rápida de páginas',
            'Mejor experiencia de usuario',
            'Menor ancho de banda',
            'Mejor SEO'
          ],
          implementacion: [
            'Lazy loading de imágenes',
            'Code splitting',
            'Minificación y compresión',
            'CDN para assets estáticos'
          ],
          herramientas: ['Webpack', 'Vite', 'CloudFlare', 'ImageOptim'],
          impacto: 'Alto',
          tiempo: '2-3 semanas'
        },
        {
          nombre: 'Caché Inteligente',
          nivel: 'Avanzado',
          descripcion: 'Implementación de estrategias de caché efectivas',
          beneficios: [
            'Respuestas más rápidas',
            'Menor carga en servidores',
            'Mejor disponibilidad',
            'Reducción de costos'
          ],
          implementacion: [
            'Caché de aplicación',
            'Caché de base de datos',
            'CDN para contenido estático',
            'Invalidación inteligente'
          ],
          herramientas: ['Redis', 'Memcached', 'CloudFlare', 'AWS CloudFront'],
          impacto: 'Alto',
          tiempo: '4-5 semanas'
        },
        {
          nombre: 'Monitoreo de Performance',
          nivel: 'Intermedio',
          descripcion: 'Seguimiento continuo del rendimiento del sistema',
          beneficios: [
            'Detección proactiva de problemas',
            'Optimización basada en datos',
            'SLA garantizados',
            'Mejor experiencia de usuario'
          ],
          implementacion: [
            'APM (Application Performance Monitoring)',
            'Métricas de negocio',
            'Alertas automáticas',
            'Dashboards en tiempo real'
          ],
          herramientas: ['New Relic', 'DataDog', 'Grafana', 'Prometheus'],
          impacto: 'Alto',
          tiempo: '3-4 semanas'
        }
      ],
      metricas: {
        totalPracticas: 4,
        nivelImplementacion: '70%',
        tiempoPromedio: '3.5 meses',
        impacto: 'Alto'
      }
    },
    ux: {
      nombre: 'Experiencia de Usuario',
      descripcion: 'Mejores prácticas para crear experiencias excepcionales',
      icono: Heart,
      color: 'pink',
      practicas: [
        {
          nombre: 'Diseño Responsivo',
          nivel: 'Básico',
          descripcion: 'Adaptación de la interfaz a diferentes dispositivos',
          beneficios: [
            'Accesibilidad universal',
            'Mejor SEO',
            'Mayor alcance de usuarios',
            'Experiencia consistente'
          ],
          implementacion: [
            'Mobile-first design',
            'Breakpoints optimizados',
            'Imágenes adaptativas',
            'Touch-friendly interfaces'
          ],
          herramientas: ['CSS Grid', 'Flexbox', 'Bootstrap', 'Tailwind CSS'],
          impacto: 'Crítico',
          tiempo: '2-3 semanas'
        },
        {
          nombre: 'Accesibilidad Web',
          nivel: 'Intermedio',
          descripcion: 'Diseño inclusivo para usuarios con discapacidades',
          beneficios: [
            'Cumplimiento legal',
            'Mayor audiencia',
            'Mejor SEO',
            'Responsabilidad social'
          ],
          implementacion: [
            'Semántica HTML correcta',
            'Contraste de colores adecuado',
            'Navegación por teclado',
            'Screen readers compatibility'
          ],
          herramientas: ['WAVE', 'axe-core', 'Lighthouse', 'NVDA'],
          impacto: 'Alto',
          tiempo: '4-6 semanas'
        },
        {
          nombre: 'Usabilidad',
          nivel: 'Intermedio',
          descripcion: 'Diseño centrado en la facilidad de uso',
          beneficios: [
            'Menor curva de aprendizaje',
            'Mayor satisfacción del usuario',
            'Reducción de soporte',
            'Mejor conversión'
          ],
          implementacion: [
            'User research y testing',
            'Flujos de usuario optimizados',
            'Feedback visual claro',
            'Onboarding efectivo'
          ],
          herramientas: ['Figma', 'UserTesting', 'Hotjar', 'Maze'],
          impacto: 'Alto',
          tiempo: '6-8 semanas'
        },
        {
          nombre: 'Personalización',
          nivel: 'Avanzado',
          descripcion: 'Experiencias personalizadas basadas en comportamiento',
          beneficios: [
            'Mayor engagement',
            'Mejor conversión',
            'Fidelización de usuarios',
            'Datos valiosos'
          ],
          implementacion: [
            'Segmentación de usuarios',
            'Contenido dinámico',
            'Recomendaciones inteligentes',
            'A/B testing'
          ],
          herramientas: ['Segment', 'Optimizely', 'Mixpanel', 'Amplitude'],
          impacto: 'Alto',
          tiempo: '8-12 semanas'
        }
      ],
      metricas: {
        totalPracticas: 4,
        nivelImplementacion: '65%',
        tiempoPromedio: '5 meses',
        impacto: 'Alto'
      }
    },
    negocio: {
      nombre: 'Prácticas de Negocio',
      descripcion: 'Mejores prácticas para operaciones y crecimiento del negocio',
      icono: TrendingUp,
      color: 'green',
      practicas: [
        {
          nombre: 'Análisis de Datos',
          nivel: 'Intermedio',
          descripcion: 'Implementación de analytics y business intelligence',
          beneficios: [
            'Decisiones basadas en datos',
            'Identificación de oportunidades',
            'Optimización de procesos',
            'Ventaja competitiva'
          ],
          implementacion: [
            'Tracking de eventos clave',
            'Dashboards ejecutivos',
            'Reportes automatizados',
            'Análisis predictivo'
          ],
          herramientas: ['Google Analytics', 'Tableau', 'Power BI', 'Looker'],
          impacto: 'Alto',
          tiempo: '4-6 semanas'
        },
        {
          nombre: 'Customer Success',
          nivel: 'Intermedio',
          descripcion: 'Gestión proactiva de la satisfacción del cliente',
          beneficios: [
            'Mayor retención',
            'Mejor LTV',
            'Referencias positivas',
            'Reducción de churn'
          ],
          implementacion: [
            'Health scores de clientes',
            'Intervenciones proactivas',
            'Programas de onboarding',
            'Feedback continuo'
          ],
          herramientas: ['Intercom', 'Zendesk', 'HubSpot', 'Gainsight'],
          impacto: 'Alto',
          tiempo: '6-8 semanas'
        },
        {
          nombre: 'Escalabilidad',
          nivel: 'Avanzado',
          descripcion: 'Preparación para el crecimiento y escalamiento',
          beneficios: [
            'Soporte a más usuarios',
            'Crecimiento sostenible',
            'Eficiencia operativa',
            'Preparación para inversión'
          ],
          implementacion: [
            'Arquitectura modular',
            'Microservicios',
            'Auto-scaling',
            'Monitoreo de capacidad'
          ],
          herramientas: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
          impacto: 'Crítico',
          tiempo: '8-12 semanas'
        },
        {
          nombre: 'Compliance y Legal',
          nivel: 'Crítico',
          descripcion: 'Cumplimiento de regulaciones y aspectos legales',
          beneficios: [
            'Cumplimiento legal',
            'Reducción de riesgos',
            'Confianza del cliente',
            'Preparación para inversión'
          ],
          implementacion: [
            'Políticas de privacidad claras',
            'Términos de servicio',
            'GDPR compliance',
            'Auditorías regulares'
          ],
          herramientas: ['OneTrust', 'Termly', 'Cookiebot', 'LegalZoom'],
          impacto: 'Crítico',
          tiempo: '4-6 semanas'
        }
      ],
      metricas: {
        totalPracticas: 4,
        nivelImplementacion: '60%',
        tiempoPromedio: '6.5 meses',
        impacto: 'Crítico'
      }
    }
  }

  // Niveles de Implementación
  const nivelesImplementacion = {
    basico: {
      nombre: 'Básico',
      descripcion: 'Fundamentos esenciales para cualquier proyecto',
      practicas: [
        'Versionado con Git',
        'Autenticación Segura',
        'Diseño Responsivo',
        'Compliance y Legal'
      ],
      tiempo: '2-3 meses',
      prioridad: 'Crítica'
    },
    intermedio: {
      nombre: 'Intermedio',
      descripcion: 'Prácticas que mejoran significativamente la calidad',
      practicas: [
        'Testing Automatizado',
        'Optimización de Base de Datos',
        'Accesibilidad Web',
        'Customer Success'
      ],
      tiempo: '4-6 meses',
      prioridad: 'Alta'
    },
    avanzado: {
      nombre: 'Avanzado',
      descripcion: 'Prácticas de excelencia para equipos maduros',
      practicas: [
        'CI/CD Pipeline',
        'Caché Inteligente',
        'Personalización',
        'Escalabilidad'
      ],
      tiempo: '6-12 meses',
      prioridad: 'Media'
    }
  }

  // Roadmap de Implementación
  const roadmapImplementacion = {
    fase1: {
      nombre: 'Fundamentos (Meses 1-3)',
      objetivos: ['Establecer bases sólidas', 'Implementar seguridad básica', 'Configurar desarrollo'],
      practicas: [
        'Versionado con Git',
        'Autenticación Segura',
        'Encriptación de Datos',
        'Diseño Responsivo',
        'Compliance y Legal'
      ],
      recursos: '2-3 desarrolladores',
      presupuesto: '$50K'
    },
    fase2: {
      nombre: 'Optimización (Meses 4-6)',
      objetivos: ['Mejorar rendimiento', 'Implementar testing', 'Optimizar UX'],
      practicas: [
        'Testing Automatizado',
        'Optimización de Base de Datos',
        'Optimización Frontend',
        'Accesibilidad Web',
        'Análisis de Datos'
      ],
      recursos: '3-4 desarrolladores + 1 UX',
      presupuesto: '$75K'
    },
    fase3: {
      nombre: 'Excelencia (Meses 7-12)',
      objetivos: ['Automatización completa', 'Experiencias avanzadas', 'Escalabilidad'],
      practicas: [
        'CI/CD Pipeline',
        'Monitoreo de Seguridad',
        'Caché Inteligente',
        'Usabilidad',
        'Personalización',
        'Customer Success',
        'Escalabilidad'
      ],
      recursos: '4-5 desarrolladores + 2 especialistas',
      presupuesto: '$150K'
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Total de Prácticas</h3>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">20</div>
          <p className="text-sm text-white/70">Prácticas identificadas</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+3 vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Nivel Implementación</h3>
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">72%</div>
          <p className="text-sm text-white/70">Promedio de implementación</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+8% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Tiempo Promedio</h3>
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">4.2</div>
          <p className="text-sm text-white/70">Meses de implementación</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-0.5 vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">ROI Estimado</h3>
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">340%</div>
          <p className="text-sm text-white/70">Retorno de inversión</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+45% vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Resumen por Categoría */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          Resumen por Categoría de Prácticas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(categoriasPracticas).map(([categoria, datos]) => (
            <div key={categoria} className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
              <h4 className="font-semibold text-white mb-2">{datos.nombre}</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Prácticas:</span>
                  <span className="text-xs font-semibold text-white">{datos.metricas.totalPracticas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Implementación:</span>
                  <span className="text-xs font-semibold text-green-400">{datos.metricas.nivelImplementacion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Tiempo:</span>
                  <span className="text-xs font-semibold text-blue-400">{datos.metricas.tiempoPromedio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Impacto:</span>
                  <span className="text-xs font-semibold text-yellow-400">{datos.metricas.impacto}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap de Implementación */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          Roadmap de Implementación
        </h3>
        
        <div className="space-y-4">
          {Object.entries(roadmapImplementacion).map(([fase, datos]) => (
            <div key={fase} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-white">{datos.nombre}</h4>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-white/70">Recursos: <span className="font-semibold text-white">{datos.recursos}</span></span>
                  <span className="text-sm text-white/70">Presupuesto: <span className="font-semibold text-white">{datos.presupuesto}</span></span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Objetivos:</p>
                <ul className="space-y-1">
                  {datos.objetivos.map((objetivo, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">{objetivo}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-white mb-2">📋 Prácticas a Implementar:</h5>
                <div className="flex flex-wrap gap-2">
                  {datos.practicas.map((practica, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {practica}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaCategorias = () => (
    <div className="space-y-6">
      {/* Selector de categorías */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {Object.entries(categoriasPracticas).map(([key, categoria]) => (
          <button
            key={key}
            onClick={() => setCategoriaActiva(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              categoriaActiva === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <categoria.icono className="w-4 h-4" />
            <span className="text-sm">{categoria.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalles de la categoría activa */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{categoriasPracticas[categoriaActiva].nombre}</h2>
            <p className="text-white/70">{categoriasPracticas[categoriaActiva].descripcion}</p>
          </div>
        </div>

        {/* Métricas de la categoría */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(categoriasPracticas[categoriaActiva].metricas).map(([metrica, valor]) => (
            <div key={metrica} className="bg-white/5 p-3 rounded-lg text-center">
              <p className="text-xs text-white/70 capitalize mb-1">{metrica.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-lg font-semibold text-white">{valor}</p>
            </div>
          ))}
        </div>

        {/* Lista de prácticas */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white mb-3">📋 Prácticas Identificadas</h3>
          {categoriasPracticas[categoriaActiva].practicas.map((practica, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{practica.nombre}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    practica.nivel === 'Crítico' ? 'bg-red-500/20 text-red-300' :
                    practica.nivel === 'Alto' ? 'bg-orange-500/20 text-orange-300' :
                    practica.nivel === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {practica.nivel}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    practica.impacto === 'Crítico' ? 'bg-red-500/20 text-red-300' :
                    practica.impacto === 'Alto' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {practica.impacto}
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/70 mb-3">{practica.descripcion}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h5 className="text-sm font-semibold text-white mb-2">✅ Beneficios:</h5>
                  <ul className="space-y-1">
                    {practica.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-xs text-white/70">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-2">🛠️ Implementación:</h5>
                  <ul className="space-y-1">
                    {practica.implementacion.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Zap className="w-3 h-3 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-xs text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-white mb-2">🔧 Herramientas:</h5>
                  <div className="flex flex-wrap gap-1">
                    {practica.herramientas.map((herramienta, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                        {herramienta}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/70">Tiempo estimado:</span>
                  <span className="text-sm font-semibold text-white">{practica.tiempo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/70">Impacto:</span>
                  <span className="text-sm font-semibold text-white">{practica.impacto}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaNiveles = () => (
    <div className="space-y-6">
      {/* Selector de niveles */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {Object.entries(nivelesImplementacion).map(([key, nivel]) => (
          <button
            key={key}
            onClick={() => setNivelActivo(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              nivelActivo === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Star className="w-4 h-4" />
            <span className="text-sm">{nivel.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalles del nivel activo */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{nivelesImplementacion[nivelActivo].nombre}</h2>
            <p className="text-white/70">{nivelesImplementacion[nivelActivo].descripcion}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white/70">Tiempo: <span className="font-semibold text-white">{nivelesImplementacion[nivelActivo].tiempo}</span></span>
            <span className={`px-2 py-1 text-xs rounded ${
              nivelesImplementacion[nivelActivo].prioridad === 'Crítica' ? 'bg-red-500/20 text-red-300' :
              nivelesImplementacion[nivelActivo].prioridad === 'Alta' ? 'bg-orange-500/20 text-orange-300' :
              'bg-yellow-500/20 text-yellow-300'
            }`}>
              {nivelesImplementacion[nivelActivo].prioridad}
            </span>
          </div>
        </div>

        {/* Prácticas del nivel */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white mb-3">📋 Prácticas Incluidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nivelesImplementacion[nivelActivo].practicas.map((practica, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">{practica}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Prioridad:</span>
                  <span className="text-xs font-semibold text-white">{nivelesImplementacion[nivelActivo].prioridad}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderVistaImplementacion = () => (
    <div className="space-y-6">
      {/* Roadmap detallado */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <Calendar className="w-5 h-5 text-green-400" />
          </div>
          Plan de Implementación Detallado
        </h3>
        
        <div className="space-y-6">
          {Object.entries(roadmapImplementacion).map(([fase, datos]) => (
            <div key={fase} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-white">{datos.nombre}</h4>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-white/70">Recursos: <span className="font-semibold text-white">{datos.recursos}</span></span>
                  <span className="text-sm text-white/70">Presupuesto: <span className="font-semibold text-white">{datos.presupuesto}</span></span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Objetivos:</p>
                <ul className="space-y-1">
                  {datos.objetivos.map((objetivo, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">{objetivo}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-white mb-2">📋 Prácticas a Implementar:</h5>
                <div className="flex flex-wrap gap-2">
                  {datos.practicas.map((practica, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {practica}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de éxito */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-full mr-3">
            <Target className="w-5 h-5 text-yellow-400" />
          </div>
        </h3>
        
        <h3 className="text-xl font-bold text-white mb-4">
          Métricas de Éxito
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Métricas Técnicas</h4>
            <ul className="space-y-1">
              <li className="text-sm text-white/70">- Coverage de tests mayor a 80%</li>
              <li className="text-sm text-white/70">- Tiempo de build menor a 5 min</li>
              <li className="text-sm text-white/70">- Performance score mayor a 90</li>
              <li className="text-sm text-white/70">- Uptime mayor a 99.9%</li>
            </ul>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Métricas de Negocio</h4>
            <ul className="space-y-1">
              <li className="text-sm text-white/70">- Tiempo de desarrollo -50%</li>
              <li className="text-sm text-white/70">- Bugs en producción -70%</li>
              <li className="text-sm text-white/70">- Satisfacción del cliente +30%</li>
              <li className="text-sm text-white/70">- ROI de implementación mayor a 300%</li>
            </ul>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Métricas de Equipo</h4>
            <ul className="space-y-1">
              <li className="text-sm text-white/70">- Productividad +40%</li>
              <li className="text-sm text-white/70">- Satisfacción del equipo +25%</li>
              <li className="text-sm text-white/70">- Rotación de personal -30%</li>
              <li className="text-sm text-white/70">- Tiempo de onboarding -60%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Buenas Prácticas</h1>
              <p className="text-white/70">Mejores prácticas y estándares de calidad para e-commerce educativo</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <CheckCircle className="w-4 h-4" />
              <span>Implementar</span>
            </button>
          </div>
        </div>

        {/* Navegación de vistas */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
          <button
            onClick={() => setVistaActiva('resumen')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'resumen'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Resumen</span>
          </button>
          <button
            onClick={() => setVistaActiva('categorias')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'categorias'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm">Categorías</span>
          </button>
          <button
            onClick={() => setVistaActiva('niveles')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'niveles'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Star className="w-4 h-4" />
            <span className="text-sm">Niveles</span>
          </button>
          <button
            onClick={() => setVistaActiva('implementacion')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'implementacion'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Implementación</span>
          </button>
        </div>
      </div>

      {/* Contenido de la vista */}
      {vistaActiva === 'resumen' && renderVistaResumen()}
      {vistaActiva === 'categorias' && renderVistaCategorias()}
      {vistaActiva === 'niveles' && renderVistaNiveles()}
      {vistaActiva === 'implementacion' && renderVistaImplementacion()}

      {/* Glosario de Términos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          Glosario de Términos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Clean Code</h4>
            <p className="text-sm text-white/70">Código limpio. Principios para escribir código legible, mantenible y eficiente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CI/CD</h4>
            <p className="text-sm text-white/70">Integración y despliegue continuo. Automatización del proceso de desarrollo y entrega.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">APM</h4>
            <p className="text-sm text-white/70">Application Performance Monitoring. Monitoreo del rendimiento de aplicaciones en tiempo real.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">GDPR</h4>
            <p className="text-sm text-white/70">General Data Protection Regulation. Regulación europea de protección de datos personales.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">MFA</h4>
            <p className="text-sm text-white/70">Multi-Factor Authentication. Autenticación de múltiples factores para mayor seguridad.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">JWT</h4>
            <p className="text-sm text-white/70">JSON Web Token. Estándar para transmitir información de forma segura entre partes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">CDN</h4>
            <p className="text-sm text-white/70">Content Delivery Network. Red de distribución de contenido para mejorar velocidad.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">SLA</h4>
            <p className="text-sm text-white/70">Service Level Agreement. Acuerdo de nivel de servicio entre proveedor y cliente.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">UX</h4>
            <p className="text-sm text-white/70">User Experience. Experiencia del usuario al interactuar con un producto o servicio.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">A/B Testing</h4>
            <p className="text-sm text-white/70">Pruebas A/B. Método de comparación de dos versiones para determinar cuál funciona mejor.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">LTV</h4>
            <p className="text-sm text-white/70">Lifetime Value. Valor de vida del cliente durante toda su relación con la empresa.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Churn</h4>
            <p className="text-sm text-white/70">Tasa de abandono. Porcentaje de clientes que dejan de usar el servicio en un período.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Microservicios</h4>
            <p className="text-sm text-white/70">Arquitectura de software que estructura una aplicación como colección de servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">DevOps</h4>
            <p className="text-sm text-white/70">Prácticas que combinan desarrollo de software y operaciones de TI.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">API</h4>
            <p className="text-sm text-white/70">Application Programming Interface. Interfaz que permite comunicación entre aplicaciones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">SEO</h4>
            <p className="text-sm text-white/70">Search Engine Optimization. Optimización para motores de búsqueda.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">WCAG</h4>
            <p className="text-sm text-white/70">Web Content Accessibility Guidelines. Pautas de accesibilidad para contenido web.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROI</h4>
            <p className="text-sm text-white/70">Return on Investment. Retorno de inversión. Beneficio obtenido en relación al dinero invertido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">KPI</h4>
            <p className="text-sm text-white/70">Key Performance Indicator. Indicador clave de rendimiento para medir el éxito.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">MVP</h4>
            <p className="text-sm text-white/70">Minimum Viable Product. Producto mínimo viable para validar una idea de negocio.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuenasPracticas
