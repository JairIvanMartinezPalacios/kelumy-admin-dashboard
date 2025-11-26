import React, { useState, useEffect } from 'react'
import {
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Filter,
  Settings,
  Trash2,
  Check,
  Clock
} from 'lucide-react'
import { useAppContext } from '../../../../context/AppContext'

const NotificationsModule = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, dispatch } = useAppContext()
  const [filterType, setFilterType] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    if (filterType === 'unread') return !notif.isRead
    return notif.type === filterType
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  // Helper to delete notification (simulated via dispatch if action existed, or local filter if not)
  // Since we don't have DELETE_NOTIFICATION in AppContext yet, we'll skip it or add it.
  // For now, let's assume we can only mark as read. 
  // Actually, let's add a local delete for visual feedback or just omit it if not supported.
  // The user asked to "develop well", so let's stick to what's in context.
  // I'll omit delete for now to avoid errors, or add it to context later if needed.
  
  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0 p-6">
      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; opacity: 0; }
        .notification-item { animation-delay: calc(var(--index) * 0.1s); }
        .notification-unread { animation: pulse 2s infinite; }
        .card-hover-effect { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .card-hover-effect:hover { transform: translateX(5px) scale(1.01); }
      `}</style>

      {/* Encabezado */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg ${isVisible ? 'animate-fadeInUp' : ''}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-2">
              <Bell className="text-purple-400" size={24} />
              Centro de Notificaciones
            </h3>
            <p className="text-white/70 text-sm">
              {unreadCount > 0 ? `Tienes ${unreadCount} notificaciones sin leer` : 'Estás al día con tus notificaciones'}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 flex items-center gap-2 text-sm"
              >
                <Check size={18} />
                Marcar todas como leídas
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 overflow-x-auto">
        <div className="flex flex-wrap gap-2 min-w-max">
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
          {['success', 'warning', 'error', 'info'].map(type => (
             <button
             key={type}
             onClick={() => setFilterType(type)}
             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
               filterType === type
                 ? 'bg-white/20 text-white border border-white/30'
                 : 'bg-white/10 text-white/70 hover:bg-white/20'
             }`}
           >
             {type === 'success' ? 'Éxito' : type === 'warning' ? 'Advertencias' : type === 'error' ? 'Errores' : 'Info'}
           </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center ${isVisible ? 'animate-fadeInScale' : ''}`}>
            <Bell className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-lg">No hay notificaciones para mostrar</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const typeInfo = getTypeInfo(notification.type)
            const TypeIcon = typeInfo.icon

            return (
              <div
                key={notification.id}
                className={`group bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border transition-all duration-500 hover:shadow-lg card-hover-effect notification-item ${
                  notification.isRead
                    ? 'border-white/5 opacity-70'
                    : `${typeInfo.color} border-l-4 notification-unread`
                } ${isVisible ? 'animate-slideInRight' : ''}`}
                style={{ '--index': index }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${typeInfo.bg} flex-shrink-0 group-hover:scale-110 transition-all duration-300`}>
                    <TypeIcon size={24} className={`${typeInfo.color.split(' ')[0]}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold ${notification.isRead ? 'text-white/80' : 'text-white'}`}>{notification.title}</h4>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                          )}
                          {notification.priority && (
                             <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getPriorityBadge(notification.priority)}`}>
                               {notification.priority}
                             </span>
                          )}
                        </div>
                        <p className="text-white/70 text-sm">{notification.message}</p>
                      </div>
                      
                      <div className="flex gap-2 flex-shrink-0">
                        {!notification.isRead && (
                          <button
                            onClick={() => markNotificationRead(notification.id)}
                            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
                            title="Marcar como leída"
                          >
                            <Check size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white/40 text-xs font-medium">
                      <Clock size={14} />
                      <span>{new Date(notification.timestamp || Date.now()).toLocaleString('es-MX')}</span>
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

export default NotificationsModule
