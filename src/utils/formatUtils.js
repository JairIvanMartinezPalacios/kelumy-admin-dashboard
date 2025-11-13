// ========================================
// UTILIDADES DE FORMATO - Funciones para formatear datos
// ========================================

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @param {string} locale - Locale para formateo
 * @returns {string} Número formateado
 */
export const formatNumber = (num, locale = 'es-ES') => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Formatea un valor de moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda
 * @param {string} locale - Locale para formateo
 * @returns {string} Valor formateado como moneda
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'es-ES') => {
  if (amount === null || amount === undefined) return '$0.00';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formatea un porcentaje
 * @param {number} value - Valor a formatear (0-100)
 * @param {string} locale - Locale para formateo
 * @returns {string} Porcentaje formateado
 */
export const formatPercentage = (value, locale = 'es-ES') => {
  if (value === null || value === undefined) return '0%';
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

/**
 * Formatea una fecha
 * @param {string|Date} dateString - Fecha a formatear
 * @param {object} options - Opciones de formateo
 * @returns {string} Fecha formateada
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { ...defaultOptions, ...options });
};

/**
 * Formatea una fecha y hora
 * @param {string|Date} dateString - Fecha a formatear
 * @param {object} options - Opciones de formateo
 * @returns {string} Fecha y hora formateada
 */
export const formatDateTime = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { ...defaultOptions, ...options });
};

/**
 * Formatea un tiempo relativo (hace X tiempo)
 * @param {string|Date} dateString - Fecha a formatear
 * @returns {string} Tiempo relativo formateado
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'hace un momento';
  if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`;
  if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`;
  if (diffInSeconds < 604800) return `hace ${Math.floor(diffInSeconds / 86400)} días`;
  
  return formatDate(dateString);
};

/**
 * Formatea un tamaño de archivo
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} Tamaño formateado
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Formatea un número de teléfono
 * @param {string} phone - Número de teléfono
 * @returns {string} Teléfono formateado
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remover caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Formatear según el país (México por defecto)
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

/**
 * Formatea un texto truncándolo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formatea un slug de URL
 * @param {string} text - Texto a convertir en slug
 * @returns {string} Slug formateado
 */
export const formatSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Remover guiones múltiples
    .trim('-'); // Remover guiones al inicio y final
};

export default {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatFileSize,
  formatPhone,
  truncateText,
  formatSlug
};
