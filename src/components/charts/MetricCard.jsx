// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React from 'react';
import { 
  TrendingUp,    // Icono de tendencia ascendente
  TrendingDown,  // Icono de tendencia descendente
  Minus          // Icono de sin cambio
} from 'lucide-react';
import { getValueColor, getGradientColors } from '../../utils/chartUtils';

// ========================================
// COMPONENTE METRICCARD - Tarjeta de métrica reutilizable
// ========================================

const MetricCard = ({ 
  title,           // Título de la métrica
  value,           // Valor principal
  change,          // Cambio porcentual
  icon: Icon,      // Icono de la métrica
  color = 'primary', // Color del tema
  size = 'medium', // Tamaño de la tarjeta
  loading = false, // Estado de carga
  onClick,         // Función de click
  className = ''   // Clases CSS adicionales
}) => {
  
  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const getChangeIcon = () => {
    if (!change) return <Minus className="w-3 h-3" />;
    return change > 0 
      ? <TrendingUp className="w-3 h-3" />
      : <TrendingDown className="w-3 h-3" />;
  };

  const getSizeClasses = () => {
    const sizes = {
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    };
    return sizes[size] || sizes.medium;
  };

  const getIconSize = () => {
    const sizes = {
      small: 20,
      medium: 24,
      large: 32
    };
    return sizes[size] || sizes.medium;
  };

  // ========================================
  // RENDERIZADO
  // ========================================
  
  return (
    <div 
      className={`
        bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-lg
        hover:bg-white/15 transition-all duration-300 group
        ${onClick ? 'cursor-pointer' : ''}
        ${getSizeClasses()}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white/80 mb-1">
            {title}
          </p>
          
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-16"></div>
            </div>
          ) : (
            <>
              <p className="text-2xl font-semibold text-white mt-1 drop-shadow-sm">
                {value}
              </p>
              
              {change !== undefined && change !== null && (
                <div className={`flex items-center gap-1 mt-1 ${getValueColor(change)}`}>
                  {getChangeIcon()}
                  <span className="text-sm font-medium">
                    {change > 0 ? '+' : ''}{change}%
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        
        {Icon && (
          <div className={`
            p-3 rounded-lg border transition-all duration-300
            bg-${color}-500/20 border-${color}-400/30
            group-hover:bg-${color}-500/30 group-hover:border-${color}-400/50
          `}>
            <Icon 
              size={getIconSize()} 
              className={`text-${color}-600 group-hover:text-${color}-500`}
            />
          </div>
        )}
      </div>
      
      {/* Efecto de hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

// ========================================
// VARIANTES ESPECIALIZADAS
// ========================================

// Variante para métricas de ingresos
export const RevenueMetricCard = ({ title, value, change, loading, onClick }) => (
  <MetricCard
    title={title}
    value={value}
    change={change}
    color="green"
    loading={loading}
    onClick={onClick}
  />
);

// Variante para métricas de usuarios
export const UserMetricCard = ({ title, value, change, loading, onClick }) => (
  <MetricCard
    title={title}
    value={value}
    change={change}
    color="blue"
    loading={loading}
    onClick={onClick}
  />
);

// Variante para métricas de cursos
export const CourseMetricCard = ({ title, value, change, loading, onClick }) => (
  <MetricCard
    title={title}
    value={value}
    change={change}
    color="purple"
    loading={loading}
    onClick={onClick}
  />
);

// Variante para métricas de rendimiento
export const PerformanceMetricCard = ({ title, value, change, loading, onClick }) => (
  <MetricCard
    title={title}
    value={value}
    change={change}
    color="orange"
    loading={loading}
    onClick={onClick}
  />
);

export default MetricCard;
