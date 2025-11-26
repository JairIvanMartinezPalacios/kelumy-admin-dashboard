// ========================================
// NOTIFICACIONES Y ALERTAS - Sistema de Alertas
// ========================================

import React, { useState, useEffect } from 'react'
import {
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Users,
  TrendingDown,
  Filter,
  Settings,
  Trash2,
  Check,
  Clock
} from 'lucide-react'

const NotificationsAlerts = () => {
  const [filterType, setFilterType] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Funciones de notificaciones
  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    alert(`Notificación ${id} marcada como leída`)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    alert('Todas las notificaciones marcadas como leídas')
  }

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
    alert(`Notificación ${id} eliminada`)
  }

  const handleConfigureAlerts = () => {
    alert('Configurando preferencias de alertas...')
  }

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Pago Completado',
      message: 'Pedido ORD-001 pagado exitosamente por $498 MXN',
      timestamp: '2024-01-20T10:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pago Pendiente',
      message: 'El pedido ORD-002 lleva más de 24 horas pendiente',
      timestamp: '2024-01-19T14:20:00',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'error',
      title: 'Error en Facturación',
      message: 'No se pudo timbrar la factura CFDI-002',
      timestamp: '2024-01-19T14:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 4,
      type: 'info',
      title: 'Nuevo Cliente VIP',
      message: 'Juan Pérez alcanzó el nivel Gold con $2,500 MXN en compras',
      timestamp: '2024-01-20T09:15:00',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Límite de API Cercano',
      message: 'Stripe ha alcanzado el 85% de su límite mensual',
      timestamp: '2024-01-20T08:00:00',
      read: false,
      priority: 'medium'
    }
  ])

  const getTypeInfo = (type) => {
    const types = {
      success: { icon: CheckCircle, color: 'text-green-400 bg-green-500/20 border-green-500/30', bg: 'bg-green-500/10' },
      warning: { icon: AlertCircle, color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30', bg: 'bg-yellow-500/10' },
      error: { icon: XCircle, color: 'text-red-400 bg-red-500/20 border-red-500/30', bg: 'bg-red-500/10' },
      info: { icon: Info, color: 'text-blue-400 bg-blue-500/20 border-blue-500/30', bg: 'bg-blue-500/10' }
    }
    return types[type] || types.info
  }

  const getPriorityBadge = (priority) => {
    const priorities = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
    return priorities[priority] || priorities.low
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filterType === 'all') return true
    if (filterType === 'unread') return !notif.read
    return notif.type === filterType
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Estilos de animación avanzados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .notification-item {
          animation-delay: calc(var(--index) * 0.1s);
        }
        
        .notification-unread {
          animation: pulse 2s infinite;
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateX(5px) scale(1.01);
        }
      `}</style>

      {/* Encabezado con acciones */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInUp' : ''}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-2">
              <Bell className="text-purple-400" size={24} />
              Notificaciones y Alertas
            </h3>
            <p className="text-white/70 text-sm">
              {unreadCount > 0 ? `${unreadCount} notificaciones sin leer` : 'Todas las notificaciones leídas'}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 flex items-center gap-2 text-sm"
              >
                <Check size={18} />
                Marcar todas como leídas
              </button>
            )}
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Todas ({notifications.length})
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filterType === 'unread'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Sin Leer ({unreadCount})
          </button>
          <button
            onClick={() => setFilterType('success')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterType === 'success'
                ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Éxito
          </button>
          <button
            onClick={() => setFilterType('warning')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterType === 'warning'
                ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/50'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Advertencias
          </button>
          <button
            onClick={() => setFilterType('error')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterType === 'error'
                ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Errores
          </button>
          <button
            onClick={() => setFilterType('info')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterType === 'info'
                ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Información
          </button>
        </div>
      </div>

      {/* Lista de Notificaciones */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center ${isVisible ? 'animate-fadeInScale' : ''}`}>
            <Bell className="w-12 h-12 text-white/40 mx-auto mb-4 animate-bounce" />
            <p className="text-white/70">No hay notificaciones</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const typeInfo = getTypeInfo(notification.type)
            const TypeIcon = typeInfo.icon

            return (
              <div
                key={notification.id}
                className={`group bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border transition-all duration-500 hover:shadow-lg card-hover-effect notification-item ${
                  notification.read
                    ? 'border-white/10 opacity-60'
                    : `${typeInfo.color} border-2 notification-unread`
                } ${isVisible ? 'animate-slideInRight' : ''}`}
                style={{ '--index': index }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${typeInfo.bg} flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <TypeIcon size={24} className={`${typeInfo.color.split(' ')[0]} group-hover:scale-110 transition-transform`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold">{notification.title}</h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                          )}
                          <span className={`px-2 py-0.5 rounded text-xs border ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Media' : 'Baja'}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm">{notification.message}</p>
                      </div>
                      
                      <div className="flex gap-2 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
                            title="Marcar como leída"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 bg-white/10 hover:bg-red-500/20 text-white rounded-lg transition-all border border-white/20"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <Clock size={14} />
                      <span>{new Date(notification.timestamp).toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default NotificationsAlerts

