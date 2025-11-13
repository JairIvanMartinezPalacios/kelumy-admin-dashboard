// ========================================
// MÓDULO 10: ORGANIZACIÓN OPERATIVA - KELUMY
// ========================================
// Previsualización de estructura organizacional y procesos operativos
// basado en la investigación de e-commerce educativo

import React, { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Settings,
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  Star,
  Building,
  BookOpen,
  Lightbulb,
  CheckCircle as Check,
  Zap
} from 'lucide-react'

const OrganizacionOperativa = ({ onBack }) => {
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [areaActiva, setAreaActiva] = useState('estructura')
  const [analisisActivo, setAnalisisActivo] = useState('eficiencia')

  // Estructura Organizacional
  const estructuraOrganizacional = {
    estructura: {
      nombre: 'Estructura Organizacional',
      descripcion: 'Organización jerárquica y funcional de equipos y departamentos',
      caracteristicas: [
        'Estructura matricial híbrida',
        'Equipos cross-functional',
        'Liderazgo distribuido',
        'Comunicación abierta',
        'Decisiones basadas en datos'
      ],
      departamentos: [
        'Dirección General y Estrategia',
        'Desarrollo de Producto y Tecnología',
        'Marketing y Ventas',
        'Operaciones y Logística',
        'Recursos Humanos y Cultura',
        'Finanzas y Contabilidad',
        'Soporte al Cliente',
        'Calidad y Compliance'
      ],
      metricas: {
        empleados: '45',
        departamentos: '8',
        equiposCrossFunctional: '12',
        eficienciaOrganizacional: '87%'
      },
      implementacionKelumy: {
        estructura: [
          { nivel: 'Estratégico', posiciones: '5', responsabilidad: 'Visión y dirección' },
          { nivel: 'Táctico', posiciones: '15', responsabilidad: 'Implementación y coordinación' },
          { nivel: 'Operativo', posiciones: '25', responsabilidad: 'Ejecución diaria' }
        ],
        herramientas: ['Organizational Chart', 'Slack', 'Notion', 'Monday.com']
      }
    },
    procesos: {
      nombre: 'Procesos Operativos',
      descripcion: 'Flujos de trabajo y procedimientos estandarizados',
      caracteristicas: [
        'Procesos documentados y automatizados',
        'Workflows optimizados',
        'Métricas de performance',
        'Mejora continua',
        'Compliance y calidad'
      ],
      procesos: [
        'Onboarding de nuevos empleados',
        'Desarrollo y lanzamiento de productos',
        'Gestión de clientes y soporte',
        'Procesos de venta y marketing',
        'Operaciones financieras',
        'Control de calidad',
        'Gestión de riesgos',
        'Innovación y R&D'
      ],
      metricas: {
        procesosDocumentados: '95%',
        automatizacion: '78%',
        tiempoProceso: '2.3 días',
        satisfaccionEmpleados: '4.6/5'
      },
      implementacionKelumy: {
        procesos: [
          { proceso: 'Onboarding', duracion: '5 días', satisfaccion: '4.8/5' },
          { proceso: 'Product Development', duracion: '45 días', calidad: '92%' },
          { proceso: 'Customer Support', duracion: '2 horas', resolucion: '85%' },
          { proceso: 'Sales Process', duracion: '15 días', conversion: '28%' }
        ],
        herramientas: ['Process Street', 'Zapier', 'Airtable', 'Jira']
      }
    },
    tecnologia: {
      nombre: 'Tecnología y Sistemas',
      descripcion: 'Infraestructura tecnológica y herramientas de trabajo',
      caracteristicas: [
        'Cloud-first approach',
        'Integración de sistemas',
        'Seguridad y compliance',
        'Escalabilidad y performance',
        'Innovación tecnológica'
      ],
      sistemas: [
        'CRM y gestión de clientes',
        'ERP y gestión empresarial',
        'LMS y plataforma educativa',
        'Herramientas de comunicación',
        'Analytics y business intelligence',
        'Sistemas de pago y facturación',
        'Infraestructura cloud',
        'Herramientas de desarrollo'
      ],
      metricas: {
        uptime: '99.7%',
        tiempoRespuesta: '1.2s',
        integracionSistemas: '92%',
        satisfaccionUsuario: '4.5/5'
      },
      implementacionKelumy: {
        sistemas: [
          { sistema: 'CRM', uso: '95%', satisfaccion: '4.6/5' },
          { sistema: 'LMS', uso: '98%', satisfaccion: '4.7/5' },
          { sistema: 'Analytics', uso: '85%', satisfaccion: '4.4/5' },
          { sistema: 'Communication', uso: '100%', satisfaccion: '4.8/5' }
        ],
        herramientas: ['Salesforce', 'Moodle', 'Google Analytics', 'Slack', 'AWS']
      }
    },
    talento: {
      nombre: 'Gestión de Talento',
      descripcion: 'Desarrollo, retención y gestión del capital humano',
      caracteristicas: [
        'Reclutamiento estratégico',
        'Desarrollo de carrera',
        'Retención de talento',
        'Cultura organizacional',
        'Performance management'
      ],
      practicas: [
        'Onboarding estructurado',
        'Programas de mentoría',
        'Capacitación continua',
        'Evaluación de desempeño',
        'Planes de carrera',
        'Reconocimiento y rewards',
        'Work-life balance',
        'Diversidad e inclusión'
      ],
      metricas: {
        retencion: '92%',
        satisfaccion: '4.6/5',
        productividad: '88%',
        rotacion: '8%'
      },
      implementacionKelumy: {
        practicas: [
          { practica: 'Onboarding', duracion: '5 días', satisfaccion: '4.8/5' },
          { practica: 'Mentoría', participantes: '85%', satisfaccion: '4.7/5' },
          { practica: 'Capacitación', horas: '40/año', satisfaccion: '4.5/5' },
          { practica: 'Evaluación', frecuencia: 'Trimestral', satisfaccion: '4.6/5' }
        ],
        herramientas: ['BambooHR', 'LinkedIn Learning', 'Culture Amp', '15Five']
      }
    },
    calidad: {
      nombre: 'Calidad y Compliance',
      descripcion: 'Estándares de calidad y cumplimiento normativo',
      caracteristicas: [
        'Estándares de calidad ISO',
        'Compliance regulatorio',
        'Auditorías internas',
        'Mejora continua',
        'Gestión de riesgos'
      ],
      estandares: [
        'ISO 9001:2015 (Calidad)',
        'ISO 27001 (Seguridad)',
        'GDPR (Privacidad)',
        'SOX (Compliance financiero)',
        'Estándares educativos',
        'Accesibilidad web',
        'Seguridad de datos',
        'Continuidad de negocio'
      ],
      metricas: {
        cumplimiento: '98%',
        auditoriasExitosas: '100%',
        incidentes: '0.2%',
        satisfaccionCliente: '4.7/5'
      },
      implementacionKelumy: {
        estandares: [
          { estandar: 'ISO 9001', cumplimiento: '98%', auditoria: 'Exitoso' },
          { estandar: 'GDPR', cumplimiento: '100%', auditoria: 'Exitoso' },
          { estandar: 'Accesibilidad', cumplimiento: '95%', auditoria: 'Exitoso' },
          { estandar: 'Seguridad', cumplimiento: '99%', auditoria: 'Exitoso' }
        ],
        herramientas: ['AuditBoard', 'Compliance.ai', 'Riskonnect', 'MetricStream']
      }
    }
  }

  // Métricas Operativas
  const metricasOperativas = {
    eficiencia: {
      nombre: 'Métricas de Eficiencia',
      descripcion: 'Indicadores de productividad y eficiencia operativa',
      metricas: [
        { metrica: 'Productividad por Empleado', valor: '$125K', cambio: '+12%', tendencia: 'up' },
        { metrica: 'Tiempo de Proceso Promedio', valor: '2.3 días', cambio: '-15%', tendencia: 'down' },
        { metrica: 'Automatización de Procesos', valor: '78%', cambio: '+8%', tendencia: 'up' },
        { metrica: 'Utilización de Recursos', valor: '85%', cambio: '+5%', tendencia: 'up' }
      ]
    },
    calidad: {
      nombre: 'Métricas de Calidad',
      descripcion: 'Indicadores de calidad y satisfacción',
      metricas: [
        { metrica: 'Satisfacción del Cliente', valor: '4.7/5', cambio: '+0.2', tendencia: 'up' },
        { metrica: 'Satisfacción del Empleado', valor: '4.6/5', cambio: '+0.3', tendencia: 'up' },
        { metrica: 'Tasa de Errores', valor: '0.2%', cambio: '-0.1%', tendencia: 'down' },
        { metrica: 'Tiempo de Resolución', valor: '2.1 horas', cambio: '-0.3', tendencia: 'down' }
      ]
    },
    crecimiento: {
      nombre: 'Métricas de Crecimiento',
      descripcion: 'Indicadores de crecimiento y escalabilidad',
      metricas: [
        { metrica: 'Crecimiento de Empleados', valor: '+25%', cambio: '+5%', tendencia: 'up' },
        { metrica: 'Escalabilidad de Procesos', valor: '92%', cambio: '+3%', tendencia: 'up' },
        { metrica: 'Capacidad de Innovación', valor: '88%', cambio: '+7%', tendencia: 'up' },
        { metrica: 'Retención de Talento', valor: '92%', cambio: '+2%', tendencia: 'up' }
      ]
    }
  }

  // Herramientas Operativas
  const herramientasOperativas = {
    gestion: {
      nombre: 'Gestión y Productividad',
      herramientas: ['Monday.com', 'Asana', 'Trello', 'Notion', 'ClickUp'],
      funcionalidades: [
        'Gestión de proyectos y tareas',
        'Workflows automatizados',
        'Colaboración en tiempo real',
        'Reportes y analytics',
        'Integración con otras herramientas'
      ],
      impacto: '+35% productividad'
    },
    comunicacion: {
      nombre: 'Comunicación y Colaboración',
      herramientas: ['Slack', 'Microsoft Teams', 'Zoom', 'Google Workspace', 'Discord'],
      funcionalidades: [
        'Comunicación instantánea',
        'Videollamadas y reuniones',
        'Compartir archivos y documentos',
        'Integración con herramientas de trabajo',
        'Comunicación asíncrona'
      ],
      impacto: '+40% colaboración'
    },
    recursos: {
      nombre: 'Gestión de Recursos Humanos',
      herramientas: ['BambooHR', 'Workday', 'ADP', 'Gusto', 'Zenefits'],
      funcionalidades: [
        'Gestión de empleados',
        'Nómina y beneficios',
        'Evaluación de desempeño',
        'Reclutamiento y onboarding',
        'Analytics de HR'
      ],
      impacto: '+45% eficiencia HR'
    },
    tecnologia: {
      nombre: 'Tecnología y Sistemas',
      herramientas: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'Kubernetes'],
      funcionalidades: [
        'Infraestructura cloud',
        'Contenedores y orquestación',
        'Escalabilidad automática',
        'Monitoreo y logging',
        'Seguridad y compliance'
      ],
      impacto: '+50% escalabilidad'
    }
  }

  // Casos de estudio de implementación
  const casosImplementacion = {
    caso1: {
      titulo: 'Reestructuración Organizacional - Mejora de Eficiencia',
      problema: 'Baja eficiencia organizacional (65%) y comunicación fragmentada',
      solucion: 'Implementación de estructura matricial con equipos cross-functional',
      resultados: {
        eficienciaAnterior: '65%',
        eficienciaNueva: '87%',
        incremento: '+34%',
        satisfaccion: '+28%'
      },
      implementacion: [
        'Reestructuración a modelo matricial',
        'Creación de equipos cross-functional',
        'Implementación de herramientas de colaboración',
        'Capacitación en nuevas metodologías',
        'Establecimiento de métricas de performance'
      ]
    },
    caso2: {
      titulo: 'Automatización de Procesos - Reducción de Tiempos',
      problema: 'Procesos manuales lentos (5.2 días promedio) y errores frecuentes',
      solucion: 'Automatización de workflows críticos con herramientas digitales',
      resultados: {
        tiempoAnterior: '5.2 días',
        tiempoNuevo: '2.3 días',
        reduccion: '-56%',
        errores: '-78%'
      },
      implementacion: [
        'Mapeo y documentación de procesos',
        'Identificación de oportunidades de automatización',
        'Implementación de herramientas de workflow',
        'Capacitación del equipo',
        'Monitoreo y optimización continua'
      ]
    },
    caso3: {
      titulo: 'Gestión de Talento - Aumento de Retención',
      problema: 'Alta rotación de empleados (25%) y baja satisfacción (3.2/5)',
      solucion: 'Programa integral de gestión de talento y cultura organizacional',
      resultados: {
        rotacionAnterior: '25%',
        rotacionNueva: '8%',
        reduccion: '-68%',
        satisfaccion: '+44%'
      },
      implementacion: [
        'Programa de onboarding estructurado',
        'Sistema de mentoría y desarrollo',
        'Evaluación de desempeño regular',
        'Planes de carrera personalizados',
        'Cultura de reconocimiento y rewards'
      ]
    }
  }

  const renderVistaResumen = () => (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Empleados</h3>
            <Users className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">45</div>
          <p className="text-sm text-white/70">Empleados activos</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+25% vs año anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Eficiencia Operativa</h3>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">87%</div>
          <p className="text-sm text-white/70">Eficiencia promedio</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+12% vs año anterior</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Satisfacción</h3>
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">4.6/5</div>
          <p className="text-sm text-white/70">Satisfacción empleados</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+0.3 vs año anterior</span>
          </div>
        </div>
      </div>

      {/* Áreas Operativas */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Building className="w-5 h-5 text-purple-400" />
          </div>
          Áreas Operativas Implementadas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(estructuraOrganizacional).map(([key, area]) => (
            <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{area.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{area.descripcion}</p>
              <div className="space-y-1">
                {Object.entries(area.metricas).map(([metrica, valor]) => (
                  <div key={metrica} className="flex justify-between">
                    <span className="text-xs text-white/70 capitalize">{metrica.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-xs font-semibold text-white">{valor}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas Operativas */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-green-500/20 rounded-full mr-3">
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          Métricas Operativas por Categoría
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(metricasOperativas).map(([categoria, datos]) => (
            <div key={categoria} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{datos.nombre}</h4>
              <p className="text-sm text-white/70 mb-3">{datos.descripcion}</p>
              <div className="space-y-2">
                {datos.metricas.map((metrica, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs text-white/70">{metrica.metrica}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-white mr-2">{metrica.valor}</span>
                      <div className={`flex items-center ${metrica.tendencia === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {metrica.tendencia === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span className="text-xs ml-1">{metrica.cambio}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaAreas = () => (
    <div className="space-y-6">
      {/* Selector de áreas */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20 mb-6">
        {Object.entries(estructuraOrganizacional).map(([key, area]) => (
          <button
            key={key}
            onClick={() => setAreaActiva(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              areaActiva === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building className="w-4 h-4" />
            <span className="text-sm">{area.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalles del área activa */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{estructuraOrganizacional[areaActiva].nombre}</h2>
            <p className="text-white/70">{estructuraOrganizacional[areaActiva].descripcion}</p>
          </div>
        </div>

        {/* Características */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🎯 Características Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {estructuraOrganizacional[areaActiva].caracteristicas.map((caracteristica, index) => (
              <div key={index} className="flex items-start">
                <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{caracteristica}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Procesos/Departamentos */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">🚀 {areaActiva === 'estructura' ? 'Departamentos' : areaActiva === 'procesos' ? 'Procesos' : areaActiva === 'tecnologia' ? 'Sistemas' : areaActiva === 'talento' ? 'Prácticas' : 'Estándares'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {estructuraOrganizacional[areaActiva][areaActiva === 'estructura' ? 'departamentos' : areaActiva === 'procesos' ? 'procesos' : areaActiva === 'tecnologia' ? 'sistemas' : areaActiva === 'talento' ? 'practicas' : 'estandares'].map((item, index) => (
              <div key={index} className="flex items-start">
                <Zap className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">📊 Métricas de Rendimiento</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(estructuraOrganizacional[areaActiva].metricas).map(([metrica, valor]) => (
              <div key={metrica} className="bg-white/5 p-3 rounded-lg text-center">
                <p className="text-xs text-white/70 capitalize mb-1">{metrica.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-lg font-semibold text-white">{valor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementación en Kelumy */}
        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-semibold text-white mb-3">🏢 Implementación en Kelumy</h3>
          <div className="space-y-4">
            {estructuraOrganizacional[areaActiva].implementacionKelumy.estructura && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Estructura Organizacional</h4>
                <div className="space-y-2">
                  {estructuraOrganizacional[areaActiva].implementacionKelumy.estructura.map((item, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{item.nivel}</span>
                        <span className="font-bold text-green-400">{item.posiciones} posiciones</span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">{item.responsabilidad}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {estructuraOrganizacional[areaActiva].implementacionKelumy.herramientas && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Herramientas Utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  {estructuraOrganizacional[areaActiva].implementacionKelumy.herramientas.map((herramienta, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderVistaHerramientas = () => (
    <div className="space-y-6">
      {/* Herramientas operativas */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-full mr-3">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          Herramientas Operativas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(herramientasOperativas).map(([categoria, datos]) => (
            <div key={categoria} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-3">{datos.nombre}</h4>
              
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Herramientas:</p>
                <div className="flex flex-wrap gap-1">
                  {datos.herramientas.map((herramienta, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-white/70 mb-2">Funcionalidades:</p>
                <ul className="space-y-1">
                  {datos.funcionalidades.map((funcionalidad, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{funcionalidad}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Impacto esperado:</span>
                <span className="text-sm font-semibold text-green-400">{datos.impacto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVistaCasos = () => (
    <div className="space-y-6">
      {/* Casos de implementación */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-full mr-3">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          Casos de Implementación de Organización Operativa
        </h3>
        
        <div className="space-y-6">
          {Object.entries(casosImplementacion).map(([caso, datos]) => (
            <div key={caso} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold text-white mb-2">{datos.titulo}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-white/70 mb-1">Problema:</p>
                  <p className="text-sm text-white">{datos.problema}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">Solución:</p>
                  <p className="text-sm text-white">{datos.solucion}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-2">Resultados:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(datos.resultados).map(([metrica, valor]) => (
                    <div key={metrica} className="bg-white/5 p-2 rounded text-center">
                      <p className="text-xs text-white/70 capitalize">{metrica.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm font-semibold text-green-400">{valor}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-white/70 mb-2">Implementación:</p>
                <ul className="space-y-1">
                  {datos.implementacion.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
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
              <h1 className="text-3xl font-bold text-white mb-2">Organización Operativa</h1>
              <p className="text-white/70">Estructura organizacional y procesos operativos para e-commerce educativo</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              <Settings className="w-4 h-4" />
              <span>Optimizar</span>
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
            onClick={() => setVistaActiva('areas')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'areas'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building className="w-4 h-4" />
            <span className="text-sm">Áreas</span>
          </button>
          <button
            onClick={() => setVistaActiva('herramientas')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'herramientas'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Herramientas</span>
          </button>
          <button
            onClick={() => setVistaActiva('casos')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
              vistaActiva === 'casos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm">Casos</span>
          </button>
        </div>
      </div>

      {/* Contenido de la vista */}
      {vistaActiva === 'resumen' && renderVistaResumen()}
      {vistaActiva === 'areas' && renderVistaAreas()}
      {vistaActiva === 'herramientas' && renderVistaHerramientas()}
      {vistaActiva === 'casos' && renderVistaCasos()}

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
            <h4 className="font-semibold text-white mb-2">Organización Operativa</h4>
            <p className="text-sm text-white/70">Estructura y procesos que permiten el funcionamiento eficiente de una organización.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Estructura Matricial</h4>
            <p className="text-sm text-white/70">Estructura organizacional que combina departamentos funcionales con equipos de proyecto.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Cross-Functional Teams</h4>
            <p className="text-sm text-white/70">Equipos que incluyen miembros de diferentes departamentos para trabajar en proyectos específicos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Workflow</h4>
            <p className="text-sm text-white/70">Flujo de trabajo. Secuencia de pasos que se siguen para completar una tarea o proceso.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Process Automation</h4>
            <p className="text-sm text-white/70">Automatización de procesos. Uso de tecnología para automatizar tareas repetitivas.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Performance Management</h4>
            <p className="text-sm text-white/70">Gestión del desempeño. Proceso de evaluar y mejorar el rendimiento de empleados.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Organizational Culture</h4>
            <p className="text-sm text-white/70">Cultura organizacional. Valores, creencias y comportamientos compartidos en una organización.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Change Management</h4>
            <p className="text-sm text-white/70">Gestión del cambio. Proceso de planificar, implementar y gestionar cambios organizacionales.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Knowledge Management</h4>
            <p className="text-sm text-white/70">Gestión del conocimiento. Proceso de capturar, almacenar y compartir conocimiento organizacional.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Operational Excellence</h4>
            <p className="text-sm text-white/70">Excelencia operativa. Práctica de mejorar continuamente los procesos operativos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Lean Management</h4>
            <p className="text-sm text-white/70">Gestión lean. Metodología que se enfoca en eliminar desperdicios y mejorar eficiencia.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Agile Methodology</h4>
            <p className="text-sm text-white/70">Metodología ágil. Enfoque iterativo para el desarrollo de proyectos y gestión.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">KPIs (Key Performance Indicators)</h4>
            <p className="text-sm text-white/70">Indicadores clave de rendimiento. Métricas que miden el éxito de objetivos específicos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">ROI (Return on Investment)</h4>
            <p className="text-sm text-white/70">Retorno de inversión. Beneficio obtenido en relación al dinero invertido.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">SLA (Service Level Agreement)</h4>
            <p className="text-sm text-white/70">Acuerdo de nivel de servicio. Contrato que define los niveles de servicio esperados.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Compliance</h4>
            <p className="text-sm text-white/70">Cumplimiento. Adherencia a leyes, regulaciones y estándares aplicables.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Management</h4>
            <p className="text-sm text-white/70">Gestión de riesgos. Proceso de identificar, evaluar y mitigar riesgos organizacionales.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Quality Assurance</h4>
            <p className="text-sm text-white/70">Aseguramiento de calidad. Proceso de garantizar que los productos o servicios cumplan estándares.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Continuous Improvement</h4>
            <p className="text-sm text-white/70">Mejora continua. Proceso de mejorar constantemente procesos, productos o servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Digital Transformation</h4>
            <p className="text-sm text-white/70">Transformación digital. Proceso de usar tecnología digital para mejorar operaciones.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Scalability</h4>
            <p className="text-sm text-white/70">Escalabilidad. Capacidad de un sistema para manejar crecimiento en carga de trabajo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Efficiency</h4>
            <p className="text-sm text-white/70">Eficiencia. Capacidad de lograr resultados con el mínimo uso de recursos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Productivity</h4>
            <p className="text-sm text-white/70">Productividad. Medida de eficiencia en la producción de bienes o servicios.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Collaboration</h4>
            <p className="text-sm text-white/70">Colaboración. Proceso de trabajar juntos para lograr objetivos comunes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Communication</h4>
            <p className="text-sm text-white/70">Comunicación. Proceso de intercambiar información entre personas o grupos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Leadership</h4>
            <p className="text-sm text-white/70">Liderazgo. Capacidad de influir y dirigir a otros hacia objetivos comunes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Team Building</h4>
            <p className="text-sm text-white/70">Construcción de equipos. Proceso de desarrollar cohesión y efectividad en equipos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Employee Engagement</h4>
            <p className="text-sm text-white/70">Compromiso del empleado. Nivel de entusiasmo y dedicación de los empleados.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Talent Management</h4>
            <p className="text-sm text-white/70">Gestión de talento. Proceso de atraer, desarrollar y retener empleados talentosos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Succession Planning</h4>
            <p className="text-sm text-white/70">Planificación de sucesión. Proceso de identificar y desarrollar futuros líderes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Performance Metrics</h4>
            <p className="text-sm text-white/70">Métricas de rendimiento. Medidas cuantitativas del desempeño organizacional.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Benchmarking</h4>
            <p className="text-sm text-white/70">Benchmarking. Proceso de comparar prácticas con las mejores de la industria.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Best Practices</h4>
            <p className="text-sm text-white/70">Mejores prácticas. Métodos o técnicas que han demostrado ser efectivos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Innovation</h4>
            <p className="text-sm text-white/70">Innovación. Proceso de crear nuevas ideas, productos o procesos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Sustainability</h4>
            <p className="text-sm text-white/70">Sostenibilidad. Capacidad de mantener operaciones a largo plazo.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Resilience</h4>
            <p className="text-sm text-white/70">Resiliencia. Capacidad de recuperarse rápidamente de dificultades.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Adaptability</h4>
            <p className="text-sm text-white/70">Adaptabilidad. Capacidad de ajustarse a cambios en el entorno.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Flexibility</h4>
            <p className="text-sm text-white/70">Flexibilidad. Capacidad de cambiar o adaptarse fácilmente.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizacionOperativa
