// ========================================
// MÓDULO 11: RIESGOS Y MITIGACIONES - KELUMY
// ========================================
// Previsualización de análisis de riesgos y estrategias de mitigación
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Settings,
  BarChart3,
  Shield,
  Lightbulb,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Star,
  CheckCircle as Check,
  BookOpen,
  Users,
  AlertTriangle,
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
  LineChart
} from 'lucide-react'

const RiesgosMitigaciones = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [categoriaActiva, setCategoriaActiva] = useState('tecnologicos')
  const [analisisActivo, setAnalisisActivo] = useState('probabilidad')

  // Categorías de Riesgos Principales
  const categoriasRiesgos = {
    tecnologicos: {
      nombre: 'Riesgos Tecnológicos',
      descripcion: 'Riesgos relacionados con tecnología, sistemas y infraestructura',
      icono: Server,
      color: 'red',
      riesgos: [
        {
          nombre: 'Fallas de Servidores',
          probabilidad: 'Media',
          impacto: 'Alto',
          descripcion: 'Caídas de servidores que afectan la disponibilidad de la plataforma',
          mitigaciones: ['Redundancia de servidores', 'Monitoreo 24/7', 'Backup automático'],
          costo: '$25K'
        },
        {
          nombre: 'Ataques Cibernéticos',
          probabilidad: 'Alta',
          impacto: 'Crítico',
          descripcion: 'Ataques de seguridad que comprometen datos de usuarios',
          mitigaciones: ['Firewall avanzado', 'Encriptación end-to-end', 'Auditorías de seguridad'],
          costo: '$50K'
        },
        {
          nombre: 'Pérdida de Datos',
          probabilidad: 'Baja',
          impacto: 'Crítico',
          descripcion: 'Pérdida de información de usuarios y cursos',
          mitigaciones: ['Backup en múltiples ubicaciones', 'Versionado de datos', 'Recuperación rápida'],
          costo: '$35K'
        },
        {
          nombre: 'Incompatibilidad de Software',
          probabilidad: 'Media',
          impacto: 'Medio',
          descripcion: 'Problemas de compatibilidad entre versiones y sistemas',
          mitigaciones: ['Testing exhaustivo', 'Versionado controlado', 'Documentación técnica'],
          costo: '$15K'
        }
      ],
      metricas: {
        totalRiesgos: 4,
        riesgosCríticos: 2,
        nivelMitigacion: '85%',
        costoTotal: '$125K'
      }
    },
    operacionales: {
      nombre: 'Riesgos Operacionales',
      descripcion: 'Riesgos relacionados con procesos operativos y recursos humanos',
      icono: Users,
      color: 'orange',
      riesgos: [
        {
          nombre: 'Escasez de Talento',
          probabilidad: 'Alta',
          impacto: 'Alto',
          descripcion: 'Dificultad para encontrar y retener personal especializado',
          mitigaciones: ['Programas de capacitación', 'Salarios competitivos', 'Ambiente de trabajo flexible'],
          costo: '$40K'
        },
        {
          nombre: 'Falta de Capacitación',
          probabilidad: 'Media',
          impacto: 'Medio',
          descripcion: 'Personal no capacitado adecuadamente en nuevas tecnologías',
          mitigaciones: ['Planes de capacitación continua', 'Certificaciones', 'Mentoring interno'],
          costo: '$20K'
        },
        {
          nombre: 'Rotación de Personal',
          probabilidad: 'Media',
          impacto: 'Alto',
          descripcion: 'Pérdida de conocimiento y experiencia por rotación alta',
          mitigaciones: ['Planes de retención', 'Documentación de procesos', 'Transferencia de conocimiento'],
          costo: '$30K'
        }
      ],
      metricas: {
        totalRiesgos: 3,
        riesgosCríticos: 2,
        nivelMitigacion: '75%',
        costoTotal: '$90K'
      }
    },
    financieros: {
      nombre: 'Riesgos Financieros',
      descripcion: 'Riesgos relacionados con la estabilidad financiera y flujo de efectivo',
      icono: DollarSign,
      color: 'green',
      riesgos: [
        {
          nombre: 'Fluctuación de Ingresos',
          probabilidad: 'Alta',
          impacto: 'Alto',
          descripcion: 'Variabilidad en los ingresos mensuales por suscripciones',
          mitigaciones: ['Modelo de ingresos diversificado', 'Reservas de efectivo', 'Contratos anuales'],
          costo: '$60K'
        },
        {
          nombre: 'Aumento de Costos',
          probabilidad: 'Media',
          impacto: 'Medio',
          descripcion: 'Incremento inesperado en costos operativos y de tecnología',
          mitigaciones: ['Presupuestos flexibles', 'Negociación con proveedores', 'Optimización de recursos'],
          costo: '$25K'
        },
        {
          nombre: 'Problemas de Cobranza',
          probabilidad: 'Baja',
          impacto: 'Medio',
          descripcion: 'Dificultades para cobrar pagos de clientes institucionales',
          mitigaciones: ['Términos de pago claros', 'Seguimiento de cobranza', 'Garantías bancarias'],
          costo: '$15K'
        }
      ],
      metricas: {
        totalRiesgos: 3,
        riesgosCríticos: 1,
        nivelMitigacion: '80%',
        costoTotal: '$100K'
      }
    },
    mercado: {
      nombre: 'Riesgos de Mercado',
      descripcion: 'Riesgos relacionados con cambios en el mercado y competencia',
      icono: Target,
      color: 'blue',
      riesgos: [
        {
          nombre: 'Competencia Intensiva',
          probabilidad: 'Alta',
          impacto: 'Alto',
          descripcion: 'Entrada de competidores fuertes al mercado educativo',
          mitigaciones: ['Diferenciación de producto', 'Fidelización de clientes', 'Innovación continua'],
          costo: '$45K'
        },
        {
          nombre: 'Cambios Regulatorios',
          probabilidad: 'Media',
          impacto: 'Alto',
          descripcion: 'Nuevas regulaciones que afectan el sector educativo',
          mitigaciones: ['Monitoreo regulatorio', 'Cumplimiento proactivo', 'Asesoría legal'],
          costo: '$30K'
        },
        {
          nombre: 'Cambios en Demanda',
          probabilidad: 'Media',
          impacto: 'Medio',
          descripcion: 'Fluctuaciones en la demanda de educación STEM',
          mitigaciones: ['Diversificación de cursos', 'Análisis de tendencias', 'Adaptación rápida'],
          costo: '$20K'
        }
      ],
      metricas: {
        totalRiesgos: 3,
        riesgosCríticos: 2,
        nivelMitigacion: '70%',
        costoTotal: '$95K'
      }
    },
    reputacionales: {
      nombre: 'Riesgos Reputacionales',
      descripcion: 'Riesgos relacionados con la imagen y reputación de la marca',
      icono: Star,
      color: 'purple',
      riesgos: [
        {
          nombre: 'Crisis de Comunicación',
          probabilidad: 'Baja',
          impacto: 'Crítico',
          descripcion: 'Situaciones que dañan la reputación de la plataforma',
          mitigaciones: ['Protocolo de crisis', 'Comunicación transparente', 'Gestión de medios'],
          costo: '$35K'
        },
        {
          nombre: 'Calidad de Contenido',
          probabilidad: 'Media',
          impacto: 'Alto',
          descripcion: 'Baja calidad en cursos que afecta la satisfacción del usuario',
          mitigaciones: ['Control de calidad', 'Feedback de usuarios', 'Mejora continua'],
          costo: '$25K'
        },
        {
          nombre: 'Problemas de Servicio',
          probabilidad: 'Media',
          impacto: 'Medio',
          descripcion: 'Fallas en el servicio al cliente y soporte técnico',
          mitigaciones: ['Capacitación del equipo', 'SLAs claros', 'Seguimiento de casos'],
          costo: '$20K'
        }
      ],
      metricas: {
        totalRiesgos: 3,
        riesgosCríticos: 1,
        nivelMitigacion: '75%',
        costoTotal: '$80K'
      }
    }
  }

  // Matriz de Riesgos
  const matrizRiesgos = {
    alta: {
      probabilidad: 'Alta',
      impacto: 'Crítico',
      riesgos: [
        { nombre: 'Ataques Cibernéticos', categoria: 'Tecnológicos', score: 9 },
        { nombre: 'Competencia Intensiva', categoria: 'Mercado', score: 8 },
        { nombre: 'Escasez de Talento', categoria: 'Operacionales', score: 8 }
      ]
    },
    media: {
      probabilidad: 'Media',
      impacto: 'Alto',
      riesgos: [
        { nombre: 'Fallas de Servidores', categoria: 'Tecnológicos', score: 6 },
        { nombre: 'Fluctuación de Ingresos', categoria: 'Financieros', score: 6 },
        { nombre: 'Cambios Regulatorios', categoria: 'Mercado', score: 6 }
      ]
    },
    baja: {
      probabilidad: 'Baja',
      impacto: 'Medio',
      riesgos: [
        { nombre: 'Pérdida de Datos', categoria: 'Tecnológicos', score: 3 },
        { nombre: 'Crisis de Comunicación', categoria: 'Reputacionales', score: 3 },
        { nombre: 'Problemas de Cobranza', categoria: 'Financieros', score: 2 }
      ]
    }
  }

  // Plan de Mitigación
  const planMitigacion = {
    inmediatas: {
      nombre: 'Acciones Inmediatas (0-3 meses)',
      acciones: [
        'Implementar sistema de backup automático',
        'Establecer monitoreo 24/7 de servidores',
        'Configurar firewall avanzado y encriptación',
        'Crear protocolo de respuesta a incidentes',
        'Capacitar equipo en seguridad cibernética'
      ],
      costo: '$75K',
      responsable: 'CTO y Equipo de IT'
    },
    cortoPlazo: {
      nombre: 'Corto Plazo (3-6 meses)',
      acciones: [
        'Diversificar modelo de ingresos',
        'Implementar programas de retención de talento',
        'Establecer planes de capacitación continua',
        'Crear sistema de control de calidad',
        'Desarrollar protocolo de crisis'
      ],
      costo: '$120K',
      responsable: 'CEO y Equipos Funcionales'
    },
    medianoPlazo: {
      nombre: 'Mediano Plazo (6-12 meses)',
      acciones: [
        'Establecer reservas de efectivo',
        'Desarrollar diferenciación de producto',
        'Implementar sistema de compliance',
        'Crear programa de innovación continua',
        'Establecer partnerships estratégicos'
      ],
      costo: '$150K',
      responsable: 'Equipo Directivo'
    }
  }

  // Métricas de Riesgo
  const metricasRiesgo = {
    generales: {
      totalRiesgos: 16,
      riesgosCríticos: 6,
      nivelMitigacion: '78%',
      costoTotal: '$490K',
      tendencia: 'Mejorando'
    },
    porCategoria: {
      tecnologicos: { riesgos: 4, criticos: 2, mitigacion: '85%' },
      operacionales: { riesgos: 3, criticos: 2, mitigacion: '75%' },
      financieros: { riesgos: 3, criticos: 1, mitigacion: '80%' },
      mercado: { riesgos: 3, criticos: 2, mitigacion: '70%' },
      reputacionales: { riesgos: 3, criticos: 1, mitigacion: '75%' }
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Total de Riesgos</h3>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{metricasRiesgo.generales.totalRiesgos}</div>
          <p className="text-sm text-white/70">Riesgos identificados</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-2 vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Riesgos Críticos</h3>
            <Shield className="w-6 h-6 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{metricasRiesgo.generales.riesgosCríticos}</div>
          <p className="text-sm text-white/70">Requieren atención inmediata</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">-1 vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Nivel de Mitigación</h3>
            <Check className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{metricasRiesgo.generales.nivelMitigacion}</div>
          <p className="text-sm text-white/70">Efectividad de mitigaciones</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+5% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Costo Total</h3>
            <DollarSign className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{metricasRiesgo.generales.costoTotal}</div>
          <p className="text-sm text-white/70">Inversión en mitigación</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-blue-400 mr-1" />
            <span className="text-sm text-blue-400">+$50K vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Matriz de Riesgos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-red-500/20 rounded-full mr-3">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          Matriz de Riesgos por Prioridad
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(matrizRiesgos).map(([prioridad, datos]) => (
            <div key={prioridad} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-3 capitalize">
                {prioridad === 'alta' ? '🔴 Alta Prioridad' : 
                 prioridad === 'media' ? '🟡 Media Prioridad' : '🟢 Baja Prioridad'}
              </h4>
              <div className="space-y-2">
                {datos.riesgos.map((riesgo, index) => (
                  <div key={index} className="bg-white/5 p-2 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">{riesgo.nombre}</span>
                      <span className="text-xs text-white/70">{riesgo.categoria}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-white/70">Score:</span>
                      <span className="text-xs font-bold text-white">{riesgo.score}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen por Categoría */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          Resumen por Categoría de Riesgo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(metricasRiesgo.porCategoria).map(([categoria, datos]) => (
            <div key={categoria} className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
              <h4 className="font-semibold text-white mb-2 capitalize">{categoria}</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Riesgos:</span>
                  <span className="text-xs font-semibold text-white">{datos.riesgos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Críticos:</span>
                  <span className="text-xs font-semibold text-red-400">{datos.criticos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Mitigación:</span>
                  <span className="text-xs font-semibold text-green-400">{datos.mitigacion}</span>
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
        {Object.entries(categoriasRiesgos).map(([key, categoria]) => (
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
            <h2 className="text-2xl font-bold text-white">{categoriasRiesgos[categoriaActiva].nombre}</h2>
            <p className="text-white/70">{categoriasRiesgos[categoriaActiva].descripcion}</p>
          </div>
        </div>

        {/* Métricas de la categoría */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(categoriasRiesgos[categoriaActiva].metricas).map(([metrica, valor]) => (
            <div key={metrica} className="bg-white/5 p-3 rounded-lg text-center">
              <p className="text-xs text-white/70 capitalize mb-1">{metrica.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-lg font-semibold text-white">{valor}</p>
            </div>
          ))}
        </div>

        {/* Lista de riesgos */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white mb-3">📋 Riesgos Identificados</h3>
          {categoriasRiesgos[categoriaActiva].riesgos.map((riesgo, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{riesgo.nombre}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    riesgo.probabilidad === 'Alta' ? 'bg-red-500/20 text-red-300' :
                    riesgo.probabilidad === 'Media' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {riesgo.probabilidad}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    riesgo.impacto === 'Crítico' ? 'bg-red-500/20 text-red-300' :
                    riesgo.impacto === 'Alto' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {riesgo.impacto}
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/70 mb-3">{riesgo.descripcion}</p>
              <div className="mb-3">
                <h5 className="text-sm font-semibold text-white mb-2">🛡️ Mitigaciones:</h5>
                <ul className="space-y-1">
                  {riesgo.mitigaciones.map((mitigacion, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{mitigacion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Costo estimado de mitigación:</span>
                <span className="text-sm font-semibold text-white">{riesgo.costo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaMitigacion = () => (
    <div className="space-y-6">
      {/* Plan de Mitigación */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <Shield className="w-5 h-5 text-green-400" />
          </div>
          Plan de Mitigación de Riesgos
        </h3>
        
        <div className="space-y-6">
          {Object.entries(planMitigacion).map(([periodo, plan]) => (
            <div key={periodo} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-white">{plan.nombre}</h4>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-white/70">Costo: <span className="font-semibold text-white">{plan.costo}</span></span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Responsable: <span className="text-white">{plan.responsable}</span></p>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-white mb-2">📋 Acciones:</h5>
                <ul className="space-y-1">
                  {plan.acciones.map((accion, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">{accion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cronograma de Implementación */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          Cronograma de Implementación
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-white">Mes 1-3: Implementación de medidas críticas de seguridad</span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-white">Mes 4-6: Diversificación de ingresos y retención de talento</span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-white">Mes 7-12: Establecimiento de reservas y partnerships</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVistaAnalisis = () => (
    <div className="space-y-6">
      {/* Selector de análisis */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {[
          { key: 'probabilidad', nombre: 'Análisis de Probabilidad', icono: PieChart },
          { key: 'impacto', nombre: 'Análisis de Impacto', icono: BarChart3 },
          { key: 'costo', nombre: 'Análisis de Costo', icono: DollarSign }
        ].map((analisis) => (
          <button
            key={analisis.key}
            onClick={() => setAnalisisActivo(analisis.key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              analisisActivo === analisis.key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <analisis.icono className="w-4 h-4" />
            <span className="text-sm">{analisis.nombre}</span>
          </button>
        ))}
      </div>

      {/* Contenido del análisis */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        {analisisActivo === 'probabilidad' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">📊 Análisis de Probabilidad de Riesgos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Alta Probabilidad (40%)</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-white/70">• Ataques Cibernéticos</li>
                  <li className="text-sm text-white/70">• Competencia Intensiva</li>
                  <li className="text-sm text-white/70">• Escasez de Talento</li>
                  <li className="text-sm text-white/70">• Fluctuación de Ingresos</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Media Probabilidad (50%)</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-white/70">• Fallas de Servidores</li>
                  <li className="text-sm text-white/70">• Cambios Regulatorios</li>
                  <li className="text-sm text-white/70">• Rotación de Personal</li>
                  <li className="text-sm text-white/70">• Calidad de Contenido</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Baja Probabilidad (10%)</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-white/70">• Pérdida de Datos</li>
                  <li className="text-sm text-white/70">• Crisis de Comunicación</li>
                  <li className="text-sm text-white/70">• Problemas de Cobranza</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {analisisActivo === 'impacto' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🎯 Análisis de Impacto de Riesgos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Impacto Crítico (25%)</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-white/70">• Ataques Cibernéticos</li>
                  <li className="text-sm text-white/70">• Pérdida de Datos</li>
                  <li className="text-sm text-white/70">• Crisis de Comunicación</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Impacto Alto (50%)</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-white/70">• Competencia Intensiva</li>
                  <li className="text-sm text-white/70">• Escasez de Talento</li>
                  <li className="text-sm text-white/70">• Fallas de Servidores</li>
                  <li className="text-sm text-white/70">• Fluctuación de Ingresos</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Impacto Medio (25%)</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-white/70">• Incompatibilidad de Software</li>
                  <li className="text-sm text-white/70">• Problemas de Cobranza</li>
                  <li className="text-sm text-white/70">• Problemas de Servicio</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {analisisActivo === 'costo' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">💰 Análisis de Costo de Mitigación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Distribución de Costos por Categoría</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Tecnológicos:</span>
                    <span className="text-sm font-semibold text-white">$125K (25%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Operacionales:</span>
                    <span className="text-sm font-semibold text-white">$90K (18%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Financieros:</span>
                    <span className="text-sm font-semibold text-white">$100K (20%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Mercado:</span>
                    <span className="text-sm font-semibold text-white">$95K (19%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Reputacionales:</span>
                    <span className="text-sm font-semibold text-white">$80K (16%)</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">ROI de Mitigación</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Costo Total:</span>
                    <span className="text-sm font-semibold text-white">$490K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Ahorro Estimado:</span>
                    <span className="text-sm font-semibold text-green-400">$2.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">ROI:</span>
                    <span className="text-sm font-semibold text-green-400">410%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Payback:</span>
                    <span className="text-sm font-semibold text-white">3.2 meses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
              <h1 className="text-3xl font-bold text-white mb-2">Riesgos y Mitigaciones</h1>
              <p className="text-white/70">Análisis completo de riesgos y estrategias de mitigación para e-commerce educativo</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <Shield className="w-4 h-4" />
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
                : 'text-white/70 hover:text-white hover: favorite-white/10'
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
            onClick={() => setVistaActiva('mitigacion')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'mitigacion'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Mitigación</span>
          </button>
          <button
            onClick={() => setVistaActiva('analisis')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'analisis'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm">Análisis</span>
          </button>
        </div>
      </div>

      {/* Contenido de la vista */}
      {vistaActiva === 'resumen' && renderVistaResumen()}
      {vistaActiva === 'categorias' && renderVistaCategorias()}
      {vistaActiva === 'mitigacion' && renderVistaMitigacion()}
      {vistaActiva === 'analisis' && renderVistaAnalisis()}

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
            <h4 className="font-semibold text-white mb-2">Risk Assessment</h4>
            <p className="text-sm text-white/70">Evaluación de riesgos. Proceso de identificación, análisis y evaluación de riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Matrix</h4>
            <p className="text-sm text-white/70">Matriz de riesgos. Herramienta visual para evaluar la probabilidad e impacto de riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Mitigation</h4>
            <p className="text-sm text-white/70">Mitigación. Estrategias y acciones para reducir la probabilidad o impacto de riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Tolerance</h4>
            <p className="text-sm text-white/70">Tolerancia al riesgo. Nivel de riesgo que una organización está dispuesta a aceptar.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Contingency Plan</h4>
            <p className="text-sm text-white/70">Plan de contingencia. Estrategia alternativa para manejar riesgos que se materializan.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Appetite</h4>
            <p className="text-sm text-white/70">Apetito al riesgo. Cantidad y tipo de riesgo que una organización está dispuesta a asumir.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Register</h4>
            <p className="text-sm text-white/70">Registro de riesgos. Documento que contiene todos los riesgos identificados y su información.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Owner</h4>
            <p className="text-sm text-white/70">Propietario del riesgo. Persona responsable de gestionar un riesgo específico.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Score</h4>
            <p className="text-sm text-white/70">Puntuación de riesgo. Valor numérico que combina probabilidad e impacto de un riesgo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Monitoring</h4>
            <p className="text-sm text-white/70">Monitoreo de riesgos. Proceso continuo de seguimiento y evaluación de riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Treatment</h4>
            <p className="text-sm text-white/70">Tratamiento de riesgos. Acciones tomadas para modificar el perfil de riesgo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Governance</h4>
            <p className="text-sm text-white/70">Gobernanza de riesgos. Marco de políticas y procedimientos para gestionar riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Culture</h4>
            <p className="text-sm text-white/70">Cultura de riesgo. Actitudes y comportamientos hacia la gestión de riesgos en la organización.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Communication</h4>
            <p className="text-sm text-white/70">Comunicación de riesgos. Proceso de compartir información sobre riesgos con stakeholders.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Reporting</h4>
            <p className="text-sm text-white/70">Reporte de riesgos. Documentos que presentan información sobre el estado de los riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Review</h4>
            <p className="text-sm text-white/70">Revisión de riesgos. Evaluación periódica del estado y efectividad de la gestión de riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Control</h4>
            <p className="text-sm text-white/70">Control de riesgos. Medidas implementadas para limitar o reducir riesgos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Transfer</h4>
            <p className="text-sm text-white/70">Transferencia de riesgo. Estrategia para transferir el riesgo a otra parte (ej. seguros).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Avoidance</h4>
            <p className="text-sm text-white/70">Evitación de riesgo. Estrategia para eliminar completamente la exposición a un riesgo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Acceptance</h4>
            <p className="text-sm text-white/70">Aceptación de riesgo. Estrategia para aceptar el riesgo sin tomar medidas adicionales.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiesgosMitigaciones