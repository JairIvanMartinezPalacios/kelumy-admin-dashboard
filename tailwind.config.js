// ========================================
// CONFIGURACIÓN DE TAILWIND CSS - Archivo de configuración principal
// ========================================

// JSDoc type annotation para TypeScript/IntelliSense
// Especifica que este archivo exporta una configuración de Tailwind CSS
/** @type {import('tailwindcss').Config} */

// Exporta la configuración por defecto de Tailwind CSS
export default {
  
  // ========================================
  // CONTENT - Archivos a escanear para clases CSS
  // ========================================
  
  // Array de rutas donde Tailwind debe buscar clases CSS utilizadas
  // Esto optimiza el bundle final eliminando CSS no utilizado
  content: [
    "./index.html",                    // Archivo HTML principal
    "./src/**/*.{js,ts,jsx,tsx}",     // Todos los archivos JS/TS/JSX/TSX en src/
  ],
  
  // ========================================
  // THEME - Personalización del tema de Tailwind
  // ========================================
  
  theme: {
    // Extiende la configuración por defecto de Tailwind
    extend: {
      
      // ========================================
      // COLORS - Paleta de colores personalizada
      // ========================================
      
      colors: {
        
        // ========================================
        // PRIMARY - Colores principales (Morado)
        // ========================================
        
        // Paleta de colores morados para elementos principales
        // Sigue la convención de Tailwind: 50 (más claro) a 900 (más oscuro)
        primary: {
          50: '#faf5ff',   // Morado muy claro - fondos sutiles
          100: '#f3e8ff',  // Morado claro - fondos de hover suaves
          200: '#e9d5ff',  // Morado claro - bordes sutiles
          300: '#d8b4fe',  // Morado medio claro - elementos secundarios
          400: '#c084fc',  // Morado medio - iconos y acentos
          500: '#a855f7',  // Morado base - color principal
          600: '#9333ea',  // Morado oscuro - elementos activos
          700: '#7c3aed',  // Morado muy oscuro - texto principal
          800: '#82358c',  // Morado extra oscuro - navbar (color personalizado)
          900: '#581c87',  // Morado más oscuro - texto de alto contraste
        },
        
        // ========================================
        // SECONDARY - Colores secundarios (Rosa)
        // ========================================
        
        // Paleta de colores rosas para elementos secundarios
        // Complementa la paleta principal con acentos cálidos
        secondary: {
          50: '#fdf2f8',   // Rosa muy claro - fondos sutiles
          100: '#fce7f3',  // Rosa claro - fondos de hover suaves
          200: '#fbcfe8',  // Rosa claro - bordes sutiles
          300: '#f9a8d4',  // Rosa medio claro - elementos secundarios
          400: '#f472b6',  // Rosa medio - iconos y acentos
          500: '#ec4899',  // Rosa base - color secundario principal
          600: '#db2777',  // Rosa oscuro - elementos activos
          700: '#be185d',  // Rosa muy oscuro - texto principal
          800: '#9d174d',  // Rosa extra oscuro - texto de alto contraste
          900: '#831843',  // Rosa más oscuro - elementos de máxima importancia
        },
        
        // ========================================
        // ACCENT - Colores de acento (Azul)
        // ========================================
        
        // Paleta de colores azules para elementos de acento
        // Proporciona contraste y variedad visual
        accent: {
          50: '#f0f9ff',   // Azul muy claro - fondos sutiles
          100: '#e0f2fe',  // Azul claro - fondos de hover suaves
          200: '#bae6fd',  // Azul claro - bordes sutiles
          300: '#7dd3fc',  // Azul medio claro - elementos secundarios
          400: '#38bdf8',  // Azul medio - iconos y acentos
          500: '#0ea5e9',  // Azul base - color de acento principal
          600: '#0284c7',  // Azul oscuro - elementos activos
          700: '#0369a1',  // Azul muy oscuro - texto principal
          800: '#075985',  // Azul extra oscuro - texto de alto contraste
          900: '#0c4a6e',  // Azul más oscuro - elementos de máxima importancia
        }
      }
    },
  },
  
  // ========================================
  // PLUGINS - Extensiones de Tailwind CSS
  // ========================================
  
  // Array de plugins de Tailwind CSS
  // Actualmente vacío, pero se pueden agregar plugins como:
  // - @tailwindcss/forms (para estilos de formularios)
  // - @tailwindcss/typography (para estilos de tipografía)
  // - @tailwindcss/aspect-ratio (para ratios de aspecto)
  plugins: [],
}
