// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y los hooks useState y useEffect para manejo de estado y efectos del componente
import React, { useState, useEffect } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Bell,           // Icono de campana para notificaciones
  Mail,           // Icono de correo para notificaciones por email
  Smartphone,     // Icono de móvil para notificaciones push
  Send,           // Icono de enviar para lanzar campañas
  Clock,          // Icono de reloj para notificaciones programadas
  CheckCircle,    // Icono de check para notificaciones enviadas
  AlertCircle,    // Icono de alerta para notificaciones de error
  Users,          // Icono de usuarios para audiencia
  BarChart3,      // Icono de gráfico para analytics
  Settings,       // Icono de configuración para ajustes
  Plus,           // Icono de agregar para crear notificaciones
  Edit,           // Icono de editar para modificar notificaciones
  Trash2,         // Icono de eliminar para borrar notificaciones
  Eye,            // Icono de vista para previsualizar
  Filter,         // Icono de filtros para ordenar notificaciones
  Search,         // Icono de búsqueda para filtrar notificaciones
  ChevronDown,    // Icono de flecha abajo para desplegar
  ChevronUp,      // Icono de flecha arriba para contraer
  RefreshCw,      // Icono de actualizar para refrescar datos
  Download,       // Icono de descarga para exportar reportes
  Calendar,       // Icono de calendario para programación
  TrendingUp,     // Icono de tendencia para crecimiento
  Target,         // Icono de objetivo para segmentación
  Zap,            // Icono de rayo para notificaciones instantáneas
  Crown,          // Icono de corona para notificaciones premium
  Star,           // Icono de estrella para favoritos
  BookOpen,       // Icono de libro para notificaciones de cursos
  Globe,          // Icono de globo para notificaciones globales
  Lock            // Icono de candado para notificaciones privadas
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - NotificationSystem
// ========================================

// Define el componente funcional NotificationSystem que gestiona el sistema de notificaciones
// Incluye funcionalidades para plantillas, campañas, programación y analytics de notificaciones
const NotificationSystem = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué vista está activa en la interfaz
  // 'overview': resumen, 'templates': plantillas, 'campaigns': campañas, 'settings': configuración
  const [activeView, setActiveView] = useState('overview')
  
  // Estados para controlar la visibilidad de modales
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)   // Modal de crear plantilla
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)   // Modal de crear campaña
  const [showPreview, setShowPreview] = useState(false)                 // Modal de previsualización
  const [editingTemplate, setEditingTemplate] = useState(null)          // Plantilla en edición
  const [selectedCampaign, setSelectedCampaign] = useState(null)        // Campaña seleccionada
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('')         // Término de búsqueda
  const [typeFilter, setTypeFilter] = useState('all')      // Filtro por tipo de notificación
  const [statusFilter, setStatusFilter] = useState('all')  // Filtro por estado de campaña
  
  // ========================================
  // DATOS ESTÁTICOS - Plantillas de notificación
  // ========================================
  
  const [templates, setTemplates] = useState([
    {
      id: 'course_release',
      name: 'Nuevo Curso Disponible',
      type: 'course_release',
      description: 'Notificación cuando se libera un nuevo curso',
      channels: ['email', 'push', 'in_app'],
      subject: '🎉 ¡Nuevo curso disponible: {{course_title}}',
      content: {
        email: {
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 28px;">¡Nuevo Curso Disponible!</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">{{course_title}}</p>
              </div>
              <div style="padding: 30px; background: #f8f9fa;">
                <h2 style="color: #333; margin-bottom: 20px;">¡Hola {{user_name}}!</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Estamos emocionados de anunciar que nuestro nuevo curso <strong>{{course_title}}</strong> 
                  ya está disponible en tu plan {{user_plan}}.
                </p>
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h3 style="color: #333; margin-bottom: 15px;">Detalles del Curso:</h3>
                  <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Instructor:</strong> {{instructor_name}}</li>
                    <li><strong>Duración:</strong> {{course_duration}}</li>
                    <li><strong>Nivel:</strong> {{course_level}}</li>
                    <li><strong>Contenido:</strong> {{course_content}}</li>
                  </ul>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="{{course_url}}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Acceder al Curso
                  </a>
                </div>
                <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
                  Gracias por ser parte de KELUMY. ¡Sigue aprendiendo!
                </p>
              </div>
            </div>
          `,
          text: `
            ¡Nuevo Curso Disponible!
            
            Hola {{user_name}},
            
            Estamos emocionados de anunciar que nuestro nuevo curso "{{course_title}}" ya está disponible en tu plan {{user_plan}}.
            
            Detalles del Curso:
            - Instructor: {{instructor_name}}
            - Duración: {{course_duration}}
            - Nivel: {{course_level}}
            - Contenido: {{course_content}}
            
            Accede al curso: {{course_url}}
            
            Gracias por ser parte de KELUMY. ¡Sigue aprendiendo!
          `
        },
        push: {
          title: '🎉 Nuevo curso disponible',
          body: '{{course_title}} ya está disponible en tu plan {{user_plan}}',
          icon: 'https://kelumy.com/logo.png',
          url: '{{course_url}}'
        },
        in_app: {
          title: 'Nuevo Curso Disponible',
          message: '{{course_title}} ya está disponible en tu plan {{user_plan}}',
          type: 'success',
          action: {
            text: 'Ver Curso',
            url: '{{course_url}}'
          }
        }
      },
      variables: ['user_name', 'user_plan', 'course_title', 'instructor_name', 'course_duration', 'course_level', 'course_content', 'course_url'],
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      lastUsed: '2024-01-21T10:30:00Z',
      usageCount: 45
    },
    {
      id: 'subscription_renewal',
      name: 'Renovación de Suscripción',
      type: 'subscription',
      description: 'Recordatorio de renovación de suscripción',
      channels: ['email', 'push'],
      subject: 'Tu suscripción {{plan_name}} se renueva pronto',
      content: {
        email: {
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 28px;">Renovación de Suscripción</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">{{plan_name}}</p>
              </div>
              <div style="padding: 30px; background: #f8f9fa;">
                <h2 style="color: #333; margin-bottom: 20px;">¡Hola {{user_name}}!</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Tu suscripción al <strong>{{plan_name}}</strong> se renovará automáticamente 
                  el {{renewal_date}} por {{plan_price}}.
                </p>
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h3 style="color: #333; margin-bottom: 15px;">Detalles de la Renovación:</h3>
                  <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Plan:</strong> {{plan_name}}</li>
                    <li><strong>Precio:</strong> {{plan_price}}</li>
                    <li><strong>Fecha de renovación:</strong> {{renewal_date}}</li>
                    <li><strong>Método de pago:</strong> {{payment_method}}</li>
                  </ul>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="{{manage_subscription_url}}" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    Gestionar Suscripción
                  </a>
                  <a href="{{billing_url}}" style="background: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Ver Facturación
                  </a>
                </div>
                <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
                  Si tienes alguna pregunta, no dudes en contactarnos.
                </p>
              </div>
            </div>
          `,
          text: `
            Renovación de Suscripción
            
            Hola {{user_name}},
            
            Tu suscripción al {{plan_name}} se renovará automáticamente el {{renewal_date}} por {{plan_price}}.
            
            Detalles de la Renovación:
            - Plan: {{plan_name}}
            - Precio: {{plan_price}}
            - Fecha de renovación: {{renewal_date}}
            - Método de pago: {{payment_method}}
            
            Gestionar suscripción: {{manage_subscription_url}}
            Ver facturación: {{billing_url}}
            
            Si tienes alguna pregunta, no dudes en contactarnos.
          `
        },
        push: {
          title: 'Renovación de Suscripción',
          body: 'Tu suscripción {{plan_name}} se renueva el {{renewal_date}}',
          icon: 'https://kelumy.com/logo.png',
          url: '{{manage_subscription_url}}'
        }
      },
      variables: ['user_name', 'plan_name', 'plan_price', 'renewal_date', 'payment_method', 'manage_subscription_url', 'billing_url'],
      isActive: true,
      createdAt: '2024-01-10T10:00:00Z',
      lastUsed: '2024-01-20T09:00:00Z',
      usageCount: 120
    },
    {
      id: 'course_completion',
      name: 'Curso Completado',
      type: 'achievement',
      description: 'Felicitación por completar un curso',
      channels: ['email', 'push', 'in_app'],
      subject: '🎓 ¡Felicitaciones! Has completado {{course_title}}',
      content: {
        email: {
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 28px;">¡Felicitaciones!</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Has completado {{course_title}}</p>
              </div>
              <div style="padding: 30px; background: #f8f9fa;">
                <h2 style="color: #333; margin-bottom: 20px;">¡Excelente trabajo, {{user_name}}!</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Has completado exitosamente el curso <strong>{{course_title}}</strong>. 
                  ¡Tu certificado digital ya está disponible!
                </p>
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h3 style="color: #333; margin-bottom: 15px;">Resumen del Curso:</h3>
                  <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Curso:</strong> {{course_title}}</li>
                    <li><strong>Instructor:</strong> {{instructor_name}}</li>
                    <li><strong>Duración:</strong> {{course_duration}}</li>
                    <li><strong>Calificación:</strong> {{course_grade}}/100</li>
                    <li><strong>Fecha de finalización:</strong> {{completion_date}}</li>
                  </ul>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="{{certificate_url}}" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    Ver Certificado
                  </a>
                  <a href="{{next_course_url}}" style="background: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Próximo Curso
                  </a>
                </div>
                <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
                  ¡Sigue así! Tu progreso en KELUMY es impresionante.
                </p>
              </div>
            </div>
          `,
          text: `
            ¡Felicitaciones!
            
            ¡Excelente trabajo, {{user_name}}!
            
            Has completado exitosamente el curso "{{course_title}}". ¡Tu certificado digital ya está disponible!
            
            Resumen del Curso:
            - Curso: {{course_title}}
            - Instructor: {{instructor_name}}
            - Duración: {{course_duration}}
            - Calificación: {{course_grade}}/100
            - Fecha de finalización: {{completion_date}}
            
            Ver certificado: {{certificate_url}}
            Próximo curso: {{next_course_url}}
            
            ¡Sigue así! Tu progreso en KELUMY es impresionante.
          `
        },
        push: {
          title: '🎓 ¡Curso Completado!',
          body: 'Has completado {{course_title}}. ¡Ver certificado!',
          icon: 'https://kelumy.com/logo.png',
          url: '{{certificate_url}}'
        },
        in_app: {
          title: '¡Curso Completado!',
          message: 'Has completado {{course_title}}. ¡Tu certificado está listo!',
          type: 'success',
          action: {
            text: 'Ver Certificado',
            url: '{{certificate_url}}'
          }
        }
      },
      variables: ['user_name', 'course_title', 'instructor_name', 'course_duration', 'course_grade', 'completion_date', 'certificate_url', 'next_course_url'],
      isActive: true,
      createdAt: '2024-01-05T10:00:00Z',
      lastUsed: '2024-01-21T15:30:00Z',
      usageCount: 89
    }
  ])
  
  // ========================================
  // DATOS DE CAMPAÑAS DE NOTIFICACIÓN
  // ========================================
  
  const [campaigns, setCampaigns] = useState([
    {
      id: 'camp_001',
      name: 'Lanzamiento React Avanzado',
      template: 'course_release',
      status: 'scheduled', // 'draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled'
      channels: ['email', 'push', 'in_app'],
      targetAudience: {
        plans: ['pro', 'intermedio'],
        countries: ['MX', 'ES', 'AR', 'CO'],
        minCoursesCompleted: 0
      },
      scheduledFor: '2024-02-15T10:00:00Z',
      sentAt: null,
      stats: {
        totalRecipients: 800,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0
      },
      createdAt: '2024-01-20T14:30:00Z',
      createdBy: 'Admin'
    },
    {
      id: 'camp_002',
      name: 'Recordatorio Renovación Febrero',
      template: 'subscription_renewal',
      status: 'sent',
      channels: ['email', 'push'],
      targetAudience: {
        plans: ['basico', 'intermedio', 'pro'],
        countries: ['MX', 'ES', 'AR', 'CO'],
        minCoursesCompleted: 0
      },
      scheduledFor: '2024-01-20T09:00:00Z',
      sentAt: '2024-01-20T09:00:00Z',
      stats: {
        totalRecipients: 1200,
        sent: 1200,
        delivered: 1180,
        opened: 890,
        clicked: 234,
        unsubscribed: 5
      },
      createdAt: '2024-01-18T16:00:00Z',
      createdBy: 'Admin'
    },
    {
      id: 'camp_003',
      name: 'Felicitaciones Completadores',
      template: 'course_completion',
      status: 'sending',
      channels: ['email', 'push', 'in_app'],
      targetAudience: {
        plans: ['basico', 'intermedio', 'pro'],
        countries: ['MX', 'ES', 'AR', 'CO'],
        minCoursesCompleted: 1
      },
      scheduledFor: '2024-01-21T16:00:00Z',
      sentAt: '2024-01-21T16:00:00Z',
      stats: {
        totalRecipients: 150,
        sent: 75,
        delivered: 72,
        opened: 45,
        clicked: 12,
        unsubscribed: 0
      },
      createdAt: '2024-01-21T15:30:00Z',
      createdBy: 'Admin'
    }
  ])
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    const colorMap = {
      'draft': 'text-gray-400 bg-gray-500/20 border border-gray-400/30',
      'scheduled': 'text-blue-400 bg-blue-500/20 border border-blue-400/30',
      'sending': 'text-yellow-400 bg-yellow-500/20 border border-yellow-400/30',
      'sent': 'text-green-400 bg-green-500/20 border border-green-400/30',
      'paused': 'text-orange-400 bg-orange-500/20 border border-orange-400/30',
      'cancelled': 'text-red-400 bg-red-500/20 border border-red-400/30'
    }
    return colorMap[status] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    const textMap = {
      'draft': 'Borrador',
      'scheduled': 'Programada',
      'sending': 'Enviando',
      'sent': 'Enviada',
      'paused': 'Pausada',
      'cancelled': 'Cancelada'
    }
    return textMap[status] || 'Desconocido'
  }
  
  // Función para obtener el color del tipo
  const getTypeColor = (type) => {
    const colorMap = {
      'course_release': 'text-blue-400 bg-blue-500/20 border border-blue-400/30',
      'subscription': 'text-purple-400 bg-purple-500/20 border border-purple-400/30',
      'achievement': 'text-green-400 bg-green-500/20 border border-green-400/30',
      'marketing': 'text-pink-400 bg-pink-500/20 border border-pink-400/30',
      'system': 'text-gray-400 bg-gray-500/20 border border-gray-400/30'
    }
    return colorMap[type] || 'text-white/70 bg-white/10 border border-white/20'
  }
  
  // Función para obtener el texto del tipo
  const getTypeText = (type) => {
    const textMap = {
      'course_release': 'Liberación de Curso',
      'subscription': 'Suscripción',
      'achievement': 'Logro',
      'marketing': 'Marketing',
      'system': 'Sistema'
    }
    return textMap[type] || 'Desconocido'
  }
  
  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Función para calcular métricas
  const calculateMetrics = (campaign) => {
    const { sent, delivered, opened, clicked, unsubscribed } = campaign.stats
    const deliveryRate = sent > 0 ? (delivered / sent * 100).toFixed(1) : 0
    const openRate = delivered > 0 ? (opened / delivered * 100).toFixed(1) : 0
    const clickRate = delivered > 0 ? (clicked / delivered * 100).toFixed(1) : 0
    const unsubscribeRate = sent > 0 ? (unsubscribed / sent * 100).toFixed(1) : 0
    
    return { deliveryRate, openRate, clickRate, unsubscribeRate }
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente para tarjetas de estadísticas
  const StatCard = ({ title, value, change, icon: Icon, color = 'purple' }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-2xl font-semibold text-white mt-1 drop-shadow-sm">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20 border border-${color}-400/30`}>
          <Icon size={24} className={`text-${color}-400`} />
        </div>
      </div>
    </div>
  )
  
  // Componente para tarjetas de plantillas
  const TemplateCard = ({ template, index }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-lg hover:bg-white/15 hover:shadow-2xl transition-all duration-300">
      {/* Encabezado */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-sm">{template.name}</h3>
          <p className="text-sm text-white/80 mb-2">{template.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
              {getTypeText(template.type)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              template.isActive 
                ? 'text-green-400 bg-green-500/20 border border-green-400/30'
                : 'text-red-400 bg-red-500/20 border border-red-400/30'
            }`}>
              {template.isActive ? 'Activa' : 'Inactiva'}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors">
            <Edit size={16} />
          </button>
          <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {/* Canales */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white/90 mb-2">Canales:</h4>
        <div className="flex gap-2">
          {template.channels.map((channel, index) => (
            <span key={index} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20 flex items-center gap-1">
              {channel === 'email' && <Mail size={12} />}
              {channel === 'push' && <Smartphone size={12} />}
              {channel === 'in_app' && <Bell size={12} />}
              {channel}
            </span>
          ))}
        </div>
      </div>
      
      {/* Variables */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white/90 mb-2">Variables:</h4>
        <div className="flex flex-wrap gap-1">
          {template.variables.map((variable, index) => (
            <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-400/30">
              {variable}
            </span>
          ))}
        </div>
      </div>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">{template.usageCount}</p>
          <p className="text-xs text-white/70">Usos</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">{formatDate(template.lastUsed)}</p>
          <p className="text-xs text-white/70">Último uso</p>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
          Usar Plantilla
        </button>
        <button className="px-4 py-2 bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300">
          <Send size={16} />
        </button>
      </div>
    </div>
  )
  
  // Componente para la vista de resumen
  const OverviewView = () => (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">Sistema de Notificaciones</h2>
        <p className="text-white/80 drop-shadow-md">Gestiona plantillas y campañas de notificación</p>
      </div>
      
      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Plantillas Activas"
          value={templates.filter(t => t.isActive).length}
          change={5.2}
          icon={Mail}
          color="blue"
        />
        <StatCard
          title="Campañas Enviadas"
          value={campaigns.filter(c => c.status === 'sent').length}
          change={12.5}
          icon={Send}
          color="green"
        />
        <StatCard
          title="Notificaciones Hoy"
          value={campaigns.reduce((sum, c) => sum + c.stats.sent, 0)}
          change={8.3}
          icon={Bell}
          color="purple"
        />
        <StatCard
          title="Tasa de Apertura"
          value={`${((campaigns.reduce((sum, c) => sum + c.stats.opened, 0) / campaigns.reduce((sum, c) => sum + c.stats.delivered, 0)) * 100).toFixed(1)}%`}
          change={2.1}
          icon={TrendingUp}
          color="yellow"
        />
      </div>
      
      {/* Plantillas recientes */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-sm">Plantillas Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.slice(0, 3).map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="space-y-6 min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#e9d1e6]/15 via-transparent to-[#d0008b]/25"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#a82ba0]/20 via-transparent to-[#e9d1e6]/10"></div>
      
      {/* Partículas flotantes */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400/40 rounded-full kelumy-float"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-pink-400/50 rounded-full kelumy-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-300/60 rounded-full kelumy-float delay-2000"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-300/45 rounded-full kelumy-pulse delay-500"></div>
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-500/50 rounded-full kelumy-float delay-700"></div>
      <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-pink-500/40 rounded-full kelumy-pulse delay-300"></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-purple-400/55 rounded-full kelumy-float delay-1200"></div>
      <div className="absolute bottom-1/3 right-10 w-4 h-4 bg-pink-400/45 rounded-full kelumy-pulse delay-800"></div>
      
      <div className="relative z-10 p-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Sistema de Notificaciones</h1>
          <p className="text-white/80 drop-shadow-md">Email, Push y Notificaciones In-App</p>
        </div>
        
        {/* Navegación por pestañas */}
        <div className="border-b border-white/20">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Resumen', icon: BarChart3 },
              { id: 'templates', label: 'Plantillas', icon: Mail },
              { id: 'campaigns', label: 'Campañas', icon: Send },
              { id: 'settings', label: 'Configuración', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeView === tab.id
                      ? 'border-purple-500 text-white drop-shadow-sm'
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
        
        {/* Contenido de las pestañas */}
        <div className="min-h-96">
          {activeView === 'overview' && <OverviewView />}
          {activeView === 'templates' && <div className="text-white">Plantillas (Próximamente)</div>}
          {activeView === 'campaigns' && <div className="text-white">Campañas (Próximamente)</div>}
          {activeView === 'settings' && <div className="text-white">Configuración (Próximamente)</div>}
        </div>
      </div>
    </div>
  )
}

export default NotificationSystem
