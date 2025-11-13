// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  Bell,           // Icono de notificación
  X,              // Icono de cerrar
  CheckCircle,    // Icono de éxito
  AlertCircle,    // Icono de advertencia
  Info,           // Icono de información
  RefreshCw,      // Icono de sincronización
  Users,          // Icono de usuarios
  BookOpen,       // Icono de libro
  Award,          // Icono de certificado
  Settings        // Icono de configuración
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

// ========================================
// COMPONENTE SYNCNOTIFICATION - Notificaciones de sincronización
// ========================================

const SyncNotification = () => {
  // ========================================
  // HOOKS Y CONTEXTO
  // ========================================
  
  const { notifications, addNotification, markNotificationRead } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // ========================================
  // EFECTOS
  // ========================================
  
  useEffect(() => {
    const unread = notifications.filter(n => !n.isRead).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Simular notificaciones de sincronización
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular notificaciones de cambios en tiempo real
      const randomNotifications = [
        {
          id: `sync-${Date.now()}`,
          type: 'success',
          title: 'Curso actualizado',
          message: 'El curso "JavaScript Avanzado" ha sido actualizado por el administrador',
          timestamp: new Date().toISOString(),
          isRead: false,
          icon: 'BookOpen'
        },
        {
          id: `sync-${Date.now() + 1}`,
          type: 'info',
          title: 'Nuevo certificado disponible',
          message: 'Has completado el curso y tu certificado está listo',
          timestamp: new Date().toISOString(),
          isRead: false,
          icon: 'Award'
        },
        {
          id: `sync-${Date.now() + 2}`,
          type: 'warning',
          title: 'Mantenimiento programado',
          message: 'La plataforma estará en mantenimiento el domingo de 2-4 AM',
          timestamp: new Date().toISOString(),
          isRead: false,
          icon: 'Settings'
        }
      ];

      // Agregar notificación aleatoria cada 30 segundos
      if (Math.random() > 0.7) {
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [addNotification]);

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const getNotificationIcon = (type, iconName) => {
    const iconProps = { className: "w-5 h-5" };
    
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertCircle {...iconProps} className="w-5 h-5 text-orange-400" />;
      case 'error':
        return <AlertCircle {...iconProps} className="w-5 h-5 text-red-400" />;
      case 'info':
        return <Info {...iconProps} className="w-5 h-5 text-blue-400" />;
      default:
        return <Bell {...iconProps} className="w-5 h-5 text-white/70" />;
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20';
      case 'warning':
        return 'bg-orange-500/10 border-orange-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20';
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMs = now - notificationTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    return notificationTime.toLocaleDateString();
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markNotificationRead(notification.id);
    }
  };

  const handleMarkAllRead = () => {
    notifications.forEach(notification => {
      if (!notification.isRead) {
        markNotificationRead(notification.id);
      }
    });
  };

  // ========================================
  // RENDERIZADO
  // ========================================
  
  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {showNotifications && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowNotifications(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-12 w-80 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Marcar todas como leídas
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de notificaciones */}
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/70">No tienes notificaciones</p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {notifications.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                        !notification.isRead ? 'bg-white/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${getNotificationBg(notification.type)}`}>
                          {getNotificationIcon(notification.type, notification.icon)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-white truncate">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full ml-2 flex-shrink-0 mt-1" />
                            )}
                          </div>
                          
                          <p className="text-sm text-white/70 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-white/50 mt-2">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 10 && (
              <div className="p-4 border-t border-white/20">
                <button className="w-full text-center text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Ver todas las notificaciones
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SyncNotification;
