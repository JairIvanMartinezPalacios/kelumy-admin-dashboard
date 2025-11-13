// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React from 'react';
import { getProgressColors } from '../../utils/chartUtils';

// ========================================
// COMPONENTE PROGRESSBAR - Barra de progreso reutilizable
// ========================================

const ProgressBar = ({ 
  value,              // Valor actual (0-100)
  max = 100,          // Valor máximo
  label,              // Etiqueta opcional
  showPercentage = true, // Mostrar porcentaje
  color = 'primary',  // Color del progreso
  size = 'medium',    // Tamaño de la barra
  animated = true,    // Animación
  className = ''      // Clases CSS adicionales
}) => {
  
  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const percentage = Math.min((value / max) * 100, 100);
  
  const getSizeClasses = () => {
    const sizes = {
      small: 'h-2',
      medium: 'h-3',
      large: 'h-4'
    };
    return sizes[size] || sizes.medium;
  };

  const getProgressColors = () => {
    const colors = {
      primary: 'bg-gradient-to-r from-purple-500 to-pink-500',
      success: 'bg-gradient-to-r from-green-500 to-emerald-500',
      warning: 'bg-gradient-to-r from-orange-500 to-yellow-500',
      error: 'bg-gradient-to-r from-red-500 to-pink-500',
      info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      neutral: 'bg-gradient-to-r from-gray-500 to-slate-500'
    };
    return colors[color] || colors.primary;
  };

  // ========================================
  // RENDERIZADO
  // ========================================
  
  return (
    <div className={`w-full ${className}`}>
      {/* Label y valor */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-white/80">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-white/70">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      {/* Barra de progreso */}
      <div className={`w-full bg-white/20 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div
          className={`
            ${getProgressColors()} ${getSizeClasses()} rounded-full
            transition-all duration-500 ease-out
            ${animated ? 'transform origin-left' : ''}
          `}
          style={{
            width: `${percentage}%`,
            transform: animated ? 'scaleX(0)' : 'scaleX(1)',
            animation: animated ? `progressFill 0.5s ease-out forwards` : 'none'
          }}
        />
      </div>
      
      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes progressFill {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

// ========================================
// VARIANTES ESPECIALIZADAS
// ========================================

// Barra de progreso circular
export const CircularProgressBar = ({ 
  value, 
  max = 100, 
  size = 120, 
  strokeWidth = 8,
  color = 'primary',
  label,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getStrokeColor = () => {
    const colors = {
      primary: '#8B5CF6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
      neutral: '#6B7280'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Fondo del círculo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progreso del círculo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Contenido del centro */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {Math.round(percentage)}%
          </div>
          {label && (
            <div className="text-xs text-white/70">
              {label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Barra de progreso con múltiples valores
export const MultiProgressBar = ({ 
  data, 
  showLabels = true,
  showValues = true,
  className = ''
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className={`w-full space-y-2 ${className}`}>
      {data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        
        return (
          <div key={index} className="w-full">
            {/* Label y valor */}
            {showLabels && (
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white/80">
                  {item.label}
                </span>
                {showValues && (
                  <span className="text-sm text-white/70">
                    {item.value}
                  </span>
                )}
              </div>
            )}
            
            {/* Barra de progreso */}
            <ProgressBar
              value={percentage}
              color={item.color || 'primary'}
              showPercentage={false}
              animated={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
