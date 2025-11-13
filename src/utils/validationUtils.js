// ========================================
// UTILIDADES DE VALIDACIÓN - Funciones para validar datos
// ========================================

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @param {object} options - Opciones de validación
 * @returns {object} Resultado de la validación
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 6,
    requireUppercase = false,
    requireLowercase = false,
    requireNumbers = false,
    requireSpecialChars = false
  } = options;

  const errors = [];

  if (!password) {
    errors.push('La contraseña es requerida');
    return { isValid: false, errors };
  }

  if (password.length < minLength) {
    errors.push(`La contraseña debe tener al menos ${minLength} caracteres`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push('La contraseña debe contener al menos un número');
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida un número de teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} True si es válido
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Valida una URL
 * @param {string} url - URL a validar
 * @returns {boolean} True si es válida
 */
export const validateURL = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida un nombre
 * @param {string} name - Nombre a validar
 * @param {object} options - Opciones de validación
 * @returns {object} Resultado de la validación
 */
export const validateName = (name, options = {}) => {
  const { minLength = 2, maxLength = 50 } = options;
  const errors = [];

  if (!name) {
    errors.push('El nombre es requerido');
    return { isValid: false, errors };
  }

  if (name.length < minLength) {
    errors.push(`El nombre debe tener al menos ${minLength} caracteres`);
  }

  if (name.length > maxLength) {
    errors.push(`El nombre no puede tener más de ${maxLength} caracteres`);
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
    errors.push('El nombre solo puede contener letras y espacios');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida un número
 * @param {string|number} value - Valor a validar
 * @param {object} options - Opciones de validación
 * @returns {object} Resultado de la validación
 */
export const validateNumber = (value, options = {}) => {
  const { min, max, isInteger = false } = options;
  const errors = [];

  if (value === null || value === undefined || value === '') {
    errors.push('El número es requerido');
    return { isValid: false, errors };
  }

  const num = Number(value);

  if (isNaN(num)) {
    errors.push('Debe ser un número válido');
    return { isValid: false, errors };
  }

  if (isInteger && !Number.isInteger(num)) {
    errors.push('Debe ser un número entero');
  }

  if (min !== undefined && num < min) {
    errors.push(`El número debe ser mayor o igual a ${min}`);
  }

  if (max !== undefined && num > max) {
    errors.push(`El número debe ser menor o igual a ${max}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida un objeto requerido
 * @param {object} obj - Objeto a validar
 * @param {string[]} requiredFields - Campos requeridos
 * @returns {object} Resultado de la validación
 */
export const validateRequiredFields = (obj, requiredFields) => {
  const errors = [];

  if (!obj || typeof obj !== 'object') {
    errors.push('El objeto es requerido');
    return { isValid: false, errors };
  }

  requiredFields.forEach(field => {
    if (obj[field] === null || obj[field] === undefined || obj[field] === '') {
      errors.push(`El campo ${field} es requerido`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida un formulario completo
 * @param {object} formData - Datos del formulario
 * @param {object} rules - Reglas de validación
 * @returns {object} Resultado de la validación
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const fieldValue = formData[field];
    const fieldErrors = [];

    // Validar campos requeridos
    if (fieldRules.required && (!fieldValue || fieldValue === '')) {
      fieldErrors.push(`${fieldRules.label || field} es requerido`);
    }

    // Validar email
    if (fieldRules.type === 'email' && fieldValue && !validateEmail(fieldValue)) {
      fieldErrors.push('Formato de email inválido');
    }

    // Validar contraseña
    if (fieldRules.type === 'password' && fieldValue) {
      const passwordValidation = validatePassword(fieldValue, fieldRules.passwordOptions);
      if (!passwordValidation.isValid) {
        fieldErrors.push(...passwordValidation.errors);
      }
    }

    // Validar número
    if (fieldRules.type === 'number' && fieldValue) {
      const numberValidation = validateNumber(fieldValue, fieldRules.numberOptions);
      if (!numberValidation.isValid) {
        fieldErrors.push(...numberValidation.errors);
      }
    }

    // Validar longitud mínima
    if (fieldRules.minLength && fieldValue && fieldValue.length < fieldRules.minLength) {
      fieldErrors.push(`Debe tener al menos ${fieldRules.minLength} caracteres`);
    }

    // Validar longitud máxima
    if (fieldRules.maxLength && fieldValue && fieldValue.length > fieldRules.maxLength) {
      fieldErrors.push(`No puede tener más de ${fieldRules.maxLength} caracteres`);
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
      isValid = false;
    }
  });

  return {
    isValid,
    errors
  };
};

/**
 * Sanitiza un string removiendo caracteres peligrosos
 * @param {string} str - String a sanitizar
 * @returns {string} String sanitizado
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  return str
    .trim()
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, ''); // Remover event handlers
};

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateURL,
  validateName,
  validateNumber,
  validateRequiredFields,
  validateForm,
  sanitizeString
};
