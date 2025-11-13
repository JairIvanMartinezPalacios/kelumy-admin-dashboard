// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  BarChart3,      // Icono de gráfico de barras
  TrendingUp,     // Icono de gráfico de líneas
  PieChart,       // Icono de gráfico circular
  Activity,       // Icono de gráfico de área
  Download,       // Icono de descarga
  RefreshCw,      // Icono de actualizar
  Maximize2,      // Icono de expandir
  Minimize2       // Icono de minimizar
} from 'lucide-react';
import { getGradientColors, generateRandomColors } from '../../utils/chartUtils';

// ========================================
// COMPONENTE SIMPLECHART - Gráfico simple reutilizable
// ========================================

const SimpleChart = ({ 
  data = [],           // Datos del gráfico
  type = 'bar',        // Tipo de gráfico ('bar', 'line', 'pie', 'area')
  title,               // Título del gráfico
  height = 300,        // Altura del gráfico
  showLegend = true,   // Mostrar leyenda
  showToolbar = true,  // Mostrar barra de herramientas
  loading = false,     // Estado de carga
  onRefresh,          // Función de actualización
  onExport,           // Función de exportación
  className = ''       // Clases CSS adicionales
}) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartData, setChartData] = useState(data);

  // ========================================
  // EFECTOS
  // ========================================
  
  useEffect(() => {
    setChartData(data);
  }, [data]);

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const getChartIcon = () => {
    const icons = {
      bar: BarChart3,
      line: TrendingUp,
      pie: PieChart,
      area: Activity
    };
    return icons[type] || BarChart3;
  };

  const getChartTitle = () => {
    const titles = {
      bar: 'Gráfico de Barras',
      line: 'Gráfico de Líneas',
      pie: 'Gráfico Circular',
      area: 'Gráfico de Área'
    };
    return title || titles[type] || 'Gráfico';
  };

  const getMaxValue = () => {
    if (!chartData || chartData.length === 0) return 0;
    return Math.max(...chartData.map(item => item.value || 0));
  };

  // ========================================
  // COMPONENTES DE GRÁFICO
  // ========================================
  
  const BarChart = () => (
    <div className="flex items-end justify-between h-full px-4 pb-4">
      {chartData.map((item, index) => {
        const height = (item.value / getMaxValue()) * 100;
        const colors = generateRandomColors(chartData.length);
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-500 hover:from-purple-600 hover:to-pink-600"
              style={{ height: `${height}%` }}
              title={`${item.label}: ${item.value}`}
            />
            <span className="text-xs text-white/70 mt-2 text-center">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  const LineChart = () => (
    <div className="relative h-full p-4">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Line path */}
        <polyline
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={chartData.map((item, index) => {
            const x = (index / (chartData.length - 1)) * 360 + 20;
            const y = 180 - ((item.value / getMaxValue()) * 160);
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* Data points */}
        {chartData.map((item, index) => {
          const x = (index / (chartData.length - 1)) * 360 + 20;
          const y = 180 - ((item.value / getMaxValue()) * 160);
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#8B5CF6"
              className="hover:r-6 transition-all duration-200"
            />
          );
        })}
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  const PieChart = () => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="w-48 h-48" viewBox="0 0 200 200">
          {chartData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const colors = generateRandomColors(chartData.length);
            
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index]}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity duration-200"
              />
            );
          })}
        </svg>
      </div>
    );
  };

  const AreaChart = () => (
    <div className="relative h-full p-4">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid lines */}
        <defs>
          <pattern id="areaGrid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#areaGrid)" />
        
        {/* Area path */}
        <path
          d={`
            M 20,180
            ${chartData.map((item, index) => {
              const x = (index / (chartData.length - 1)) * 360 + 20;
              const y = 180 - ((item.value / getMaxValue()) * 160);
              return `L ${x},${y}`;
            }).join(' ')}
            L 380,180
            Z
          `}
          fill="url(#areaGradient)"
          opacity="0.6"
        />
        
        {/* Line path */}
        <polyline
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={chartData.map((item, index) => {
            const x = (index / (chartData.length - 1)) * 360 + 20;
            const y = 180 - ((item.value / getMaxValue()) * 160);
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  // ========================================
  // RENDERIZADO DEL GRÁFICO
  // ========================================
  
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <BarChart />;
      case 'line':
        return <LineChart />;
      case 'pie':
        return <PieChart />;
      case 'area':
        return <AreaChart />;
      default:
        return <BarChart />;
    }
  };

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
  if (loading) {
    return (
      <div className={`bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-64 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-lg
      ${isFullscreen ? 'fixed inset-4 z-50' : ''}
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          {React.createElement(getChartIcon(), { 
            size: 24, 
            className: 'text-purple-400' 
          })}
          <h3 className="text-lg font-semibold text-white">
            {getChartTitle()}
          </h3>
        </div>
        
        {showToolbar && (
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                title="Actualizar datos"
              >
                <RefreshCw size={16} />
              </button>
            )}
            
            {onExport && (
              <button
                onClick={onExport}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                title="Exportar gráfico"
              >
                <Download size={16} />
              </button>
            )}
            
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              title={isFullscreen ? "Minimizar" : "Expandir"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        )}
      </div>

      {/* Contenido del gráfico */}
      <div className="p-6">
        <div style={{ height: `${height}px` }}>
          {chartData.length > 0 ? renderChart() : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <BarChart3 size={32} className="text-white/30 mx-auto mb-2" />
                <p className="text-white/70">No hay datos disponibles</p>
              </div>
            </div>
          )}
        </div>

        {/* Leyenda */}
        {showLegend && chartData.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {chartData.map((item, index) => {
              const colors = generateRandomColors(chartData.length);
              
              return (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-sm text-white/80">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleChart;
