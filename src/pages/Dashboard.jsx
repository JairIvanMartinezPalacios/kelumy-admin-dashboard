// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React para crear componentes funcionales
import React from 'react'

// Importa los componentes de los módulos
import CourseManagement from './modules/cursos/CourseManagement'
import UserManagement from './modules/usuarios/UserManagement'
import EcommerceManagement from './modules/ecommerce/EcommerceManagement'
import ProductManagement from './modules/productos-online/ProductManagement'
import CertificationManagement from './modules/certificaciones/CertificationManagement'
import MarketingManagement from './modules/marketing/MarketingManagement'
import SupportManagement from './modules/soporte/SupportManagement'
import FinanceManagement from './modules/finanzas/FinanceManagement'
import AdminManagement from './modules/administrativo/AdminManagement'
import ReportManagement from './modules/reportes/ReportManagement'
import ContentManagement from './modules/contenido/ContentManagement'
import CalendarManagement from './modules/calendario/CalendarManagement'
import EmailManagement from './modules/correo/EmailManagement'
import ConfigManagement from './modules/configuracion/ConfigManagement'

// Importa iconos de la librería Lucide React para las métricas y secciones
import {
  Users,          // Icono de usuarios para métricas de usuarios activos
  BookOpen,       // Icono de libro para métricas de cursos
  DollarSign,     // Icono de dólar para métricas financieras
  TrendingUp,     // Icono de tendencia para métricas de conversión
  Award,          // Icono de premio para métricas de certificados
  ShoppingCart,   // Icono de carrito para métricas de ventas
  Package,        // Icono de paquete para sección de productos en línea
  MessageCircle,  // Icono de mensaje para sección de soporte
  Calendar,       // Icono de calendario para sección de eventos
  BarChart3,      // Icono de gráfico para sección de reportes
  FileText,       // Icono de documento para sección de contenido
  Mail,           // Icono de correo para sección de email marketing
  Settings,       // Icono de configuración para sección de configuración
  Target,         // Icono de objetivo para sección de productos
  Shield          // Icono de escudo para sección administrativa
} from 'lucide-react'

// ========================================
// COMPONENTE DASHBOARD - Contenido principal
// ========================================

// Define el componente funcional Dashboard que recibe la sección activa como prop
const Dashboard = ({ activeSection }) => {
  
  // ========================================
  // DATOS DE MÉTRICAS - Información de ejemplo
  // ========================================
  
  // Array que contiene los datos de las métricas principales del dashboard
  // Cada objeto incluye: título, valor, cambio porcentual, icono y color
  const metrics = [
    // Métrica de usuarios activos en la plataforma
    { title: 'Usuarios Activos', value: '2,847', change: '+12%', icon: Users, color: 'primary-600' },
    
    // Métrica de cursos disponibles en la plataforma
    { title: 'Cursos Publicados', value: '156', change: '+8%', icon: BookOpen, color: 'primary-500' },
    
    // Métrica de ingresos generados mensualmente
    { title: 'Ingresos Mensuales', value: '$45,230', change: '+23%', icon: DollarSign, color: 'primary-700' },
    
    // Métrica de tasa de conversión de visitantes a estudiantes
    { title: 'Tasa de Conversión', value: '3.2%', change: '+0.4%', icon: TrendingUp, color: 'secondary-500' },
    
    // Métrica de certificados emitidos a estudiantes
    { title: 'Certificados Emitidos', value: '1,234', change: '+15%', icon: Award, color: 'primary-400' },
    
    // Métrica de ventas realizadas en el mes
    { title: 'Ventas del Mes', value: '89', change: '+7%', icon: ShoppingCart, color: 'primary-800' }
  ]

  // ========================================
  // FUNCIÓN AUXILIAR - Mapeo de colores
  // ========================================
  
  // Función que mapea los nombres de colores a las clases CSS de Tailwind
  // Retorna las clases de fondo y texto correspondientes al color especificado
  const getColorClasses = (color) => {
    // Objeto que mapea nombres de colores a clases CSS de Tailwind
    // Utiliza la paleta de colores personalizada de KELUMY
    const colors = {
      'primary-400': 'bg-primary-400 text-white',    // Morado claro con texto blanco
      'primary-500': 'bg-primary-500 text-white',    // Morado medio con texto blanco
      'primary-600': 'bg-primary-600 text-white',    // Morado oscuro con texto blanco
      'primary-700': 'bg-primary-700 text-white',    // Morado muy oscuro con texto blanco
      'primary-800': 'bg-primary-800 text-white',    // Morado extra oscuro con texto blanco
      'secondary-500': 'bg-secondary-500 text-white', // Rosa medio con texto blanco
      'secondary-600': 'bg-secondary-600 text-white'  // Rosa oscuro con texto blanco
    }
    // Retorna las clases del color especificado o un color por defecto si no existe
    // Esto previene errores si se pasa un color no definido
    return colors[color] || 'bg-primary-500 text-white'
  }

  // ========================================
  // FUNCIÓN DE RENDERIZADO - Contenido dinámico
  // ========================================
  
  // Función que renderiza el contenido del dashboard según la sección activa
  // Utiliza un switch statement para mostrar diferentes vistas según activeSection
  // Esta función actúa como un enrutador simple para los diferentes módulos
  const renderDashboardContent = () => {
    switch (activeSection) {
      // ========================================
      // SECCIÓN INICIO - Dashboard principal con métricas y resumen
      // ========================================
      case 'inicio':
        return (
          // Contenedor principal de la página de inicio
          // p-6: padding de 24px en todos los lados
          <div className="p-6 min-h-screen relative overflow-hidden" style={{background: '#1e081d'}}>
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#e9d1e6]/15 via-transparent to-[#d0008b]/25"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#a82ba0]/20 via-transparent to-[#e9d1e6]/10"></div>
            
            {/* Partículas flotantes */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400/40 rounded-full kelumy-float"></div>
            <div className="absolute top-40 right-32 w-6 h-6 bg-pink-400/50 rounded-full kelumy-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-300/60 rounded-full kelumy-float delay-2000"></div>
            <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-300/45 rounded-full kelumy-pulse delay-500"></div>
            <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-500/50 rounded-full kelumy-float delay-700"></div>
            <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-pink-500/40 rounded-full kelumy-pulse delay-300"></div>
            <div className="absolute top-1/2 left-10 w-3 h-3 bg-purple-400/55 rounded-full kelumy-float delay-1200"></div>
            <div className="absolute bottom-1/3 right-10 w-4 h-4 bg-pink-400/45 rounded-full kelumy-pulse delay-800"></div>
            
            <div className="relative z-10">
            
            {/* ========================================
                ENCABEZADO - Título y descripción
                ======================================== */}
            
            {/* Contenedor del encabezado con margen inferior
                mb-6: margen inferior de 24px */}
            <div className="mb-6">
              {/* Título principal del dashboard
                  text-xl: tamaño de texto extra grande
                  font-semibold: peso de fuente semi-negrita
                  text-gray-900: color gris muy oscuro
                  mb-2: margen inferior de 8px */}
              <h1 className="text-xl font-semibold text-white mb-2 drop-shadow-lg">Dashboard</h1>
              
              {/* Descripción de bienvenida
                  text-gray-600: color gris medio
                  text-sm: tamaño de texto pequeño */}
              <p className="text-white/80 text-sm drop-shadow-md">Bienvenido al panel de administración de KELUMY</p>
            </div>

            {/* ========================================
                BOTONES DE ACCIÓN - Acciones rápidas
                ======================================== */}
            
            {/* Contenedor de botones de acción con layout flexbox
                flex: layout flexbox
                flex-wrap: permite que los elementos se envuelvan
                justify-center: centra horizontalmente
                gap-2: espacio de 8px entre elementos
                mb-6: margen inferior de 24px */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {/* Botón principal para reporte mensual
                  btn-primary: clase personalizada para botón primario
                  text-sm: tamaño de texto pequeño
                  px-4 py-2: padding horizontal de 16px, vertical de 8px */}
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20">
                Reporte Mensual
              </button>
              
              {/* Botón secundario para reporte anual
                  btn-secondary: clase personalizada para botón secundario */}
              <button className="bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300">
                Reporte Anual
              </button>
              
              {/* Botón secundario para calendario */}
              <button className="bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300">
                Calendario
              </button>
              
              {/* Botón secundario para alertas */}
              <button className="bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300">
                Alertas
              </button>
            </div>

            {/* ========================================
                TARJETAS DE MÉTRICAS - Grid de métricas
                ======================================== */}
            
            {/* Grid responsivo para las tarjetas de métricas
                grid: layout de grid
                grid-cols-1: 1 columna en móviles
                sm:grid-cols-2: 2 columnas en pantallas pequeñas (640px+)
                lg:grid-cols-3: 3 columnas en pantallas grandes (1024px+)
                xl:grid-cols-6: 6 columnas en pantallas extra grandes (1280px+)
                gap-3: espacio de 12px entre elementos
                mb-8: margen inferior de 32px */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
              {/* Mapea cada métrica para crear una tarjeta individual
                  metrics.map: itera sobre el array de métricas
                  (metric, index): cada métrica y su índice */}
              {metrics.map((metric, index) => {
                // Extrae el componente de icono de la métrica
                const Icon = metric.icon
                return (
                  // Tarjeta individual de métrica
                  // key={index}: clave única para React
                  // metric-card: clase personalizada para el estilo de la tarjeta
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Contenedor flex para organizar el contenido de la tarjeta
                        flex: layout flexbox
                        items-center: centra verticalmente
                        justify-between: distribuye el espacio entre elementos */}
                    <div className="flex items-center justify-between">
                      
                      {/* Contenedor del texto de la métrica
                          flex-1: ocupa todo el espacio disponible
                          min-w-0: permite que el contenido se trunque si es necesario */}
                      <div className="flex-1 min-w-0">
                        {/* Título de la métrica
                            text-xs: tamaño de texto extra pequeño
                            text-gray-600: color gris medio
                            mb-1: margen inferior de 4px
                            truncate: trunca el texto si es muy largo */}
                        <p className="text-xs text-white/70 mb-1 truncate drop-shadow-sm">{metric.title}</p>
                        
                        {/* Valor principal de la métrica
                            text-lg: tamaño de texto grande
                            font-semibold: peso de fuente semi-negrita
                            text-gray-900: color gris muy oscuro
                            truncate: trunca el texto si es muy largo */}
                        <p className="text-lg font-semibold text-white truncate drop-shadow-lg">{metric.value}</p>
                        
                        {/* Cambio porcentual de la métrica
                            text-xs: tamaño de texto extra pequeño
                            text-green-600: color verde para indicar crecimiento
                            mt-1: margen superior de 4px */}
                        <p className="text-xs text-green-400 mt-1 drop-shadow-sm">{metric.change}</p>
                      </div>
                      
                      {/* Contenedor del icono de la métrica
                          p-2: padding de 8px
                          rounded-lg: bordes redondeados
                          getColorClasses(metric.color): aplica las clases de color correspondientes
                          shadow-lg: sombra grande
                          flex-shrink-0: no se reduce de tamaño
                          ml-2: margen izquierdo de 8px */}
                      <div className={`p-2 rounded-lg ${getColorClasses(metric.color)} shadow-lg flex-shrink-0 ml-2`}>
                        {/* Icono de la métrica
                            size={16}: tamaño de 16px */}
                        <Icon size={16} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ========================================
                SECCIÓN DE GRÁFICOS - Visualizaciones de datos
                ======================================== */}
            
            {/* Contenedor de gráficos con layout de grid responsivo
                grid-cols-1: una columna en móviles
                lg:grid-cols-2: dos columnas en pantallas grandes
                gap-4: espacio de 16px entre elementos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* ========================================
                  GRÁFICO DE INGRESOS VS EGRESOS
                  ======================================== */}
              
              {/* Tarjeta del gráfico de ingresos vs egresos
                  bg-white/10: fondo blanco con 10% de opacidad
                  backdrop-blur-xl: efecto de desenfoque de fondo
                  rounded-2xl: bordes muy redondeados
                  p-6: padding de 24px
                  border border-white/20: borde blanco con 20% de opacidad
                  shadow-2xl: sombra extra grande
                  hover:bg-white/15: efecto hover con más opacidad
                  transition-all duration-300: transición suave */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                {/* Título del gráfico
                    text-base: tamaño de texto base
                    font-semibold: peso de fuente semi-negrita
                    text-white: color blanco
                    mb-3: margen inferior de 12px
                    drop-shadow-lg: sombra del texto */}
                <h3 className="text-base font-semibold text-white mb-3 drop-shadow-lg">Ingresos vs Egresos</h3>
                <div className="h-36 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <BarChart3 size={32} className="text-white/60 mx-auto mb-2" />
                    <p className="text-white/70 text-xs drop-shadow-sm">Gráfico de Ingresos vs Egresos</p>
                  </div>
                </div>
                <div className="flex justify-center mt-3 space-x-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-xs text-white/80 drop-shadow-sm">Ingresos</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                    <span className="text-xs text-white/80 drop-shadow-sm">Egresos</span>
                  </div>
                </div>
              </div>

              {/* ========================================
                  GRÁFICO DE DISTRIBUCIÓN DE COSTOS
                  ======================================== */}
              
              {/* Tarjeta del gráfico de distribución de costos
                  Misma estructura que el gráfico anterior
                  Incluye botones para cambiar entre vista mensual y anual */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                {/* Título del gráfico de distribución de costos */}
                <h3 className="text-base font-semibold text-white mb-3 drop-shadow-lg">Distribución de Costos</h3>
                <div className="flex justify-center mb-3 space-x-2">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20">Mensual</button>
                  <button className="bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300">Anual</button>
                </div>
                <div className="h-36 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-2 border border-white/20"></div>
                    <p className="text-white/70 text-xs drop-shadow-sm">Gráfico de Distribución</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-3 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-white/80 drop-shadow-sm">Docentes</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-white/80 drop-shadow-sm">Licencias</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                    <span className="text-white/80 drop-shadow-sm">Marketing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                    <span className="text-white/80 drop-shadow-sm">Operación</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        )

      // ========================================
      // SECCIÓN CURSOS - Gestión de cursos y contenido educativo
      // ========================================
      case 'cursos':
        return (
          // Contenedor de ancho completo para el módulo de cursos
          <div className="w-full">
            {/* Componente principal de gestión de cursos
                Incluye: creación, edición, eliminación y visualización de cursos */}
            <CourseManagement />
          </div>
        )

      // ========================================
      // SECCIÓN USUARIOS - Gestión de usuarios y roles
      // ========================================
      case 'usuarios':
        return (
          // Contenedor de ancho completo para el módulo de usuarios
          <div className="w-full">
            {/* Componente principal de gestión de usuarios
                Incluye: registro, perfiles, roles y permisos de usuarios */}
            <UserManagement />
          </div>
        )

      // ========================================
      // SECCIÓN E-COMMERCE - Gestión de tienda en línea
      // ========================================
      case 'ecommerce':
        return (
          // Contenedor de ancho completo para el módulo de e-commerce
          <div className="w-full">
            {/* Componente principal de gestión de e-commerce
                Incluye: productos, órdenes, inventario y ventas */}
            <EcommerceManagement />
          </div>
        )

      // ========================================
      // SECCIÓN PRODUCTOS EN LÍNEA - Gestión de productos digitales
      // ========================================
      case 'productos-online':
        return (
          // Contenedor de ancho completo para el módulo de productos en línea
          <div className="w-full">
            {/* Componente principal de gestión de productos digitales
                Incluye: cursos, materiales, suscripciones y servicios */}
            <ProductManagement />
          </div>
        )

      // ========================================
      // SECCIÓN CERTIFICACIONES - Gestión de certificados y acreditaciones
      // ========================================
      case 'certificaciones':
        return (
          // Contenedor de ancho completo para el módulo de certificaciones
          <div className="w-full">
            {/* Componente principal de gestión de certificaciones
                Incluye: emisión, validación y seguimiento de certificados */}
            <CertificationManagement />
          </div>
        )

      // ========================================
      // SECCIÓN MARKETING - Herramientas de marketing y promoción
      // ========================================
      case 'marketing':
        return (
          // Contenedor de ancho completo para el módulo de marketing
          <div className="w-full">
            {/* Componente principal de gestión de marketing
                Incluye: campañas, promociones, analytics y redes sociales */}
            <MarketingManagement />
          </div>
        )

      // ========================================
      // SECCIÓN SOPORTE - Sistema de atención al cliente
      // ========================================
      case 'soporte':
        return (
          // Contenedor de ancho completo para el módulo de soporte
          <div className="w-full">
            {/* Componente principal de gestión de soporte
                Incluye: tickets, chat, FAQ y atención al cliente */}
            <SupportManagement />
          </div>
        )

      // ========================================
      // SECCIÓN FINANZAS - Gestión financiera y contable
      // ========================================
      case 'finanzas':
        return (
          // Contenedor de ancho completo para el módulo de finanzas
          <div className="w-full">
            {/* Componente principal de gestión financiera
                Incluye: contabilidad, facturación, pagos y reportes financieros */}
            <FinanceManagement />
          </div>
        )

      // ========================================
      // SECCIÓN ADMINISTRATIVO - Herramientas administrativas
      // ========================================
      case 'administrativo':
        return (
          // Contenedor de ancho completo para el módulo administrativo
          <div className="w-full">
            {/* Componente principal de gestión administrativa
                Incluye: configuración del sistema, usuarios admin y seguridad */}
            <AdminManagement />
          </div>
        )

      // ========================================
      // SECCIÓN REPORTES - Generación de reportes y analytics
      // ========================================
      case 'reportes':
        return (
          // Contenedor de ancho completo para el módulo de reportes
          <div className="w-full">
            {/* Componente principal de generación de reportes
                Incluye: analytics, métricas, exportación de datos y dashboards */}
            <ReportManagement />
          </div>
        )

      // ========================================
      // SECCIÓN CONTENIDO - Gestión de contenido y medios
      // ========================================
      case 'contenido':
        return (
          // Contenedor de ancho completo para el módulo de contenido
          <div className="w-full">
            {/* Componente principal de gestión de contenido
                Incluye: archivos multimedia, documentos y biblioteca de recursos */}
            <ContentManagement />
          </div>
        )

      // ========================================
      // SECCIÓN CALENDARIO - Gestión de eventos y programación
      // ========================================
      case 'calendario':
        return (
          // Contenedor de ancho completo para el módulo de calendario
          <div className="w-full">
            {/* Componente principal de gestión de calendario
                Incluye: eventos, programación de cursos y recordatorios */}
            <CalendarManagement />
          </div>
        )

      // ========================================
      // SECCIÓN CORREO - Sistema de email marketing
      // ========================================
      case 'correo':
        return (
          // Contenedor de ancho completo para el módulo de correo
          <div className="w-full">
            {/* Componente principal de gestión de email marketing
                Incluye: newsletters, campañas, plantillas y seguimiento */}
            <EmailManagement />
          </div>
        )

      // ========================================
      // SECCIÓN CONFIGURACIÓN - Configuración del sistema
      // ========================================
      case 'configuracion':
        return (
          // Contenedor de ancho completo para el módulo de configuración
          <div className="w-full">
            {/* Componente principal de configuración del sistema
                Incluye: configuraciones generales, preferencias y ajustes del sistema */}
            <ConfigManagement />
          </div>
        )

      // ========================================
      // SECCIÓN POR DEFECTO - Manejo de rutas no válidas
      // ========================================
      default:
        return (
          // Contenedor de error para secciones no encontradas
          // bg-white: fondo blanco
          // rounded-xl: bordes redondeados
          // shadow-sm: sombra pequeña
          // border border-gray-100: borde gris claro
          // p-6: padding de 24px
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Título de error */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sección no encontrada</h1>
            {/* Mensaje descriptivo del error */}
            <p className="text-gray-600">La sección seleccionada no existe.</p>
          </div>
        )
    }
  }

  // ========================================
  // RENDERIZADO PRINCIPAL - Estructura del componente
  // ========================================
  
  // Retorna el contenedor principal con el contenido dinámico
  return (
    // Contenedor principal de ancho completo
    <div className="w-full">
      {/* Renderiza el contenido según la sección activa
          renderDashboardContent(): función que determina qué componente mostrar */}
      {renderDashboardContent()}
    </div>
  )
}

// ========================================
// EXPORTACIÓN - Exporta el componente para uso en otros archivos
// ========================================

// Exporta el componente Dashboard como exportación por defecto
// Esto permite importarlo en otros archivos como: import Dashboard from './Dashboard'
export default Dashboard
