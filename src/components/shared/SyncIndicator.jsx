// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React from 'react';
import { 
  Wifi,           // Icono de conexión
  WifiOff,        // Icono de sin conexión
  RefreshCw,      // Icono de sincronización
  AlertCircle,    // Icono de error
  CheckCircle,    // Icono de éxito
  Clock           // Icono de tiempo
} from 'lucide-react';

// ========================================
// COMPONENTE SYNCINDICATOR - Indicador de sincronización
// ========================================

const SyncIndicator = ({ syncStatus, onSync }) => {
  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const getSyncIcon = () => {
    if (!syncStatus.isConnected) {
      return <WifiOff className="w-4 h-4 text-red-400" />;
    }
    
    if (syncStatus.pendingChanges > 0) {
      return <RefreshCw className="w-4 h-4 text-orange-400 animate-spin" />;
    }
    
    return <Wifi className="w-4 h-4 text-green-400" />;
  };

  const getSyncText = () => {
    if (!syncStatus.isConnected) {
      return 'Sin conexión';
    }
    
    if (syncStatus.pendingChanges > 0) {
      return `Sincronizando... (${syncStatus.pendingChanges} cambios)`;
    }
    
    return 'Sincronizado';
  };

  const getSyncColor = () => {
    if (!syncStatus.isConnected) {
      return 'text-red-400';
    }
    
    if (syncStatus.pendingChanges > 0) {
      return 'text-orange-400';
    }
    
    return 'text-green-400';
  };

  const formatLastSync = (lastSync) => {
    if (!lastSync) return 'Nunca';
    
    const now = new Date();
    const syncTime = new Date(lastSync);
    const diffMs = now - syncTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    return syncTime.toLocaleDateString();
  };

  // ========================================
  // RENDERIZADO
  // ========================================
  
  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={onSync}
        className="flex items-center space-x-1 hover:bg-white/10 rounded-lg p-1 transition-colors"
        title="Sincronizar ahora"
      >
        {getSyncIcon()}
        <span className={getSyncColor()}>
          {getSyncText()}
        </span>
      </button>
      
      {syncStatus.lastSync && (
        <div className="flex items-center space-x-1 text-white/60" title="Última sincronización">
          <Clock className="w-3 h-3" />
          <span className="text-xs">
            {formatLastSync(syncStatus.lastSync)}
          </span>
        </div>
      )}
    </div>
  );
};

export default SyncIndicator;
