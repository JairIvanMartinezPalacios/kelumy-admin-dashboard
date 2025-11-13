// ========================================
// UTILIDADES DE GRÁFICAS - Funciones reutilizables para visualización
// ========================================

// ========================================
// FUNCIONES DE FORMATEO
// ========================================

/**
 * Formatea números con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

/**
 * Formatea moneda en USD
 * @param {amount} amount - Cantidad a formatear
 * @returns {string} Moneda formateada
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

/**
 * Formatea porcentajes
 * @param {number} value - Valor a formatear
 * @param {number} decimals - Número de decimales
 * @returns {string} Porcentaje formateado
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formatea fechas
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Locale para el formateo
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, locale = 'es-ES') => {
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Formatea tiempo relativo (hace X días, etc.)
 * @param {string|Date} date - Fecha de referencia
 * @returns {string} Tiempo relativo formateado
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = now - targetDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  if (diffHours > 0) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffMins > 0) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
  return 'Ahora mismo';
};

// ========================================
// FUNCIONES DE COLORES
// ========================================

/**
 * Obtiene el color según el valor (positivo/negativo)
 * @param {number} value - Valor a evaluar
 * @param {string} type - Tipo de color ('positive', 'negative', 'neutral')
 * @returns {string} Clase CSS del color
 */
export const getValueColor = (value, type = 'positive') => {
  if (type === 'positive') {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  }
  if (type === 'negative') {
    return value <= 0 ? 'text-green-400' : 'text-red-400';
  }
  return 'text-white/70';
};

/**
 * Obtiene colores de gradiente para gráficos
 * @param {string} type - Tipo de gradiente
 * @returns {string} Clases CSS del gradiente
 */
export const getGradientColors = (type = 'primary') => {
  const gradients = {
    primary: 'from-purple-500 to-pink-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-orange-500 to-yellow-500',
    error: 'from-red-500 to-pink-500',
    info: 'from-blue-500 to-cyan-500',
    neutral: 'from-gray-500 to-slate-500'
  };
  return gradients[type] || gradients.primary;
};

/**
 * Obtiene colores de fondo para barras de progreso
 * @param {string} type - Tipo de color
 * @returns {string} Clases CSS del color de fondo
 */
export const getProgressColors = (type = 'primary') => {
  const colors = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    error: 'bg-gradient-to-r from-red-500 to-pink-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    neutral: 'bg-gradient-to-r from-gray-500 to-slate-500'
  };
  return colors[type] || colors.primary;
};

// ========================================
// FUNCIONES DE DATOS
// ========================================

/**
 * Calcula estadísticas básicas de un array de números
 * @param {number[]} data - Array de números
 * @returns {object} Estadísticas calculadas
 */
export const calculateStats = (data) => {
  if (!data || data.length === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0,
      sum: 0,
      count: 0
    };
  }

  const sum = data.reduce((acc, val) => acc + val, 0);
  const avg = sum / data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);

  return {
    min,
    max,
    avg,
    sum,
    count: data.length
  };
};

/**
 * Agrupa datos por período de tiempo
 * @param {Array} data - Array de objetos con fechas
 * @param {string} period - Período ('day', 'week', 'month', 'year')
 * @returns {Array} Datos agrupados
 */
export const groupDataByPeriod = (data, period = 'day') => {
  const grouped = {};
  
  data.forEach(item => {
    const date = new Date(item.date);
    let key;
    
    switch (period) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'year':
        key = date.getFullYear().toString();
        break;
      default:
        key = date.toISOString().split('T')[0];
    }
    
    if (!grouped[key]) {
      grouped[key] = { date: key, count: 0, value: 0 };
    }
    
    grouped[key].count += item.count || 1;
    grouped[key].value += item.value || 0;
  });
  
  return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Calcula el porcentaje de cambio entre dos valores
 * @param {number} oldValue - Valor anterior
 * @param {number} newValue - Valor nuevo
 * @returns {number} Porcentaje de cambio
 */
export const calculatePercentageChange = (oldValue, newValue) => {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

/**
 * Valida si un valor es numérico
 * @param {any} value - Valor a validar
 * @returns {boolean} True si es numérico
 */
export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Valida si una fecha es válida
 * @param {any} date - Fecha a validar
 * @returns {boolean} True si es una fecha válida
 */
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Genera colores aleatorios para gráficos
 * @param {number} count - Número de colores a generar
 * @returns {string[]} Array de colores hex
 */
export const generateRandomColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 137.508) % 360; // Golden angle approximation
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

/**
 * Interpola valores entre dos puntos
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} steps - Número de pasos
 * @returns {number[]} Array de valores interpolados
 */
export const interpolateValues = (start, end, steps) => {
  const result = [];
  const step = (end - start) / (steps - 1);
  
  for (let i = 0; i < steps; i++) {
    result.push(start + (step * i));
  }
  
  return result;
};

/**
 * Redondea un número a una cantidad específica de decimales
 * @param {number} num - Número a redondear
 * @param {number} decimals - Número de decimales
 * @returns {number} Número redondeado
 */
export const roundToDecimals = (num, decimals = 2) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Convierte un objeto a query string
 * @param {object} params - Objeto de parámetros
 * @returns {string} Query string
 */
export const objectToQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

/**
 * Debounce function para optimizar llamadas frecuentes
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function para limitar la frecuencia de ejecución
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} Función con throttle
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ========================================
// CONSTANTES DE CONFIGURACIÓN
// ========================================

export const CHART_CONFIG = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    neutral: '#6B7280'
  },
  gradients: {
    primary: ['#8B5CF6', '#EC4899'],
    success: ['#10B981', '#059669'],
    warning: ['#F59E0B', '#D97706'],
    error: ['#EF4444', '#EC4899'],
    info: ['#3B82F6', '#06B6D4']
  },
  animations: {
    duration: 300,
    easing: 'ease-in-out'
  },
  responsive: {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  }
};

export const DEFAULT_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    }
  }
};
