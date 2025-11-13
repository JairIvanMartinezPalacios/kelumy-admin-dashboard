// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React para crear componentes funcionales
import React, { useState, useEffect, useRef } from 'react'

// Importa iconos de la librería Lucide React para la interfaz
import {
  Home,           // Icono de casa para "Inicio"
  BookOpen,       // Icono de libro abierto para "Cursos"
  Users,          // Icono de usuarios para "Usuarios y Roles"
  ShoppingCart,   // Icono de carrito para "E-commerce"
  Package,        // Icono de paquete para "Productos en línea"
  Award,          // Icono de premio para "Certificaciones"
  TrendingUp,     // Icono de tendencia para "Marketing"
  MessageCircle,  // Icono de mensaje para "Soporte"
  Target,         // Icono de objetivo para "Productos"
  DollarSign,     // Icono de dólar para "Finanzas"
  Shield,         // Icono de escudo para "Administrativo"
  BarChart3,      // Icono de gráfico para "Reportes"
  FileText,       // Icono de documento para "Contenido"
  Calendar,       // Icono de calendario para "Eventos"
  Mail,           // Icono de correo para "Correo Masivo"
  Settings,       // Icono de configuración para "Configuración"
  LogOut,         // Icono de salida para "Cerrar Sesión"
  X               // Icono de X para cerrar (no usado actualmente)
} from 'lucide-react'

// ========================================
// HOOK PERSONALIZADO - Detección de tamaño de pantalla
// ========================================

// Hook personalizado que detecta el tamaño de la pantalla y categoriza el dispositivo
// Retorna un objeto con las dimensiones y flags booleanos para cada tipo de dispositivo
const useScreenSize = () => {
  
  // Estado que almacena la información del tamaño de pantalla
  // Inicializa con valores por defecto para evitar errores de hidratación en SSR
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,  // Ancho de la ventana
    height: typeof window !== 'undefined' ? window.innerHeight : 768, // Alto de la ventana
    isMobile: false,      // Flag para dispositivos móviles
    isTablet: false,      // Flag para tablets
    isDesktop: false,     // Flag para desktop
    isLargeDesktop: false // Flag para desktop grande
  })

  // Efecto que se ejecuta al montar el componente y cuando cambia el tamaño de ventana
  useEffect(() => {
    
    // Función que actualiza el estado con las dimensiones actuales de la ventana
    const handleResize = () => {
      const width = window.innerWidth   // Obtiene el ancho actual de la ventana
      const height = window.innerHeight // Obtiene el alto actual de la ventana
      
      // Actualiza el estado con las nuevas dimensiones y categoriza el dispositivo
      setScreenSize({
        width,                          // Ancho actual de la ventana
        height,                         // Alto actual de la ventana
        isMobile: width < 768,          // Móviles: menos de 768px
        isTablet: width >= 768 && width < 1024,  // Tablets: entre 768px y 1023px
        isDesktop: width >= 1024 && width < 1440, // Desktop: entre 1024px y 1439px
        isLargeDesktop: width >= 1440   // Desktop grande: 1440px o más
      })
    }

    // Ejecuta la función inmediatamente al montar el componente
    // Esto asegura que el estado inicial sea correcto
    handleResize()

    // Agrega un event listener para detectar cambios en el tamaño de la ventana
    // 'resize' es el evento que se dispara cuando el usuario redimensiona la ventana
    window.addEventListener('resize', handleResize)

    // Función de limpieza que se ejecuta al desmontar el componente
    // Remueve el event listener para evitar memory leaks
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Array de dependencias vacío significa que solo se ejecuta al montar/desmontar

  // Retorna el objeto con la información del tamaño de pantalla
  return screenSize
}

// ========================================
// COMPONENTE PRINCIPAL - Sidebar
// ========================================

// Define el componente Sidebar que recibe props del componente padre (App.jsx)
const Sidebar = ({ 
  sidebarOpen,           // Estado: si el sidebar está abierto en móvil
  setSidebarOpen,        // Función: para abrir/cerrar el sidebar en móvil
  sidebarCompact,        // Estado: si el sidebar está en modo compacto
  setSidebarCompact,     // Función: para cambiar entre modo compacto/expandido
  activeSection,         // Estado: sección actualmente activa
  setActiveSection,      // Función: para cambiar la sección activa
  onLogout               // Función: para cerrar sesión
}) => {
  
  // ========================================
  // DETECCIÓN DE PANTALLA - Hook personalizado
  // ========================================
  
  // Usa el hook personalizado para detectar el tamaño de la pantalla
  const screenSize = useScreenSize()
  
  // ========================================
  // ESTADO PARA TOOLTIP MÓVIL - Long press
  // ========================================
  
  // Estado para manejar el tooltip móvil
  const [mobileTooltip, setMobileTooltip] = useState({
    show: false,
    text: '',
    x: 0,
    y: 0
  })
  
  // Estado para manejar el tooltip web
  const [webTooltip, setWebTooltip] = useState({
    show: false,
    text: '',
    x: 0,
    y: 0
  })
  
  // Referencias para los timers de long press
  const longPressTimer = useRef(null)
  const touchStartTime = useRef(null)
  
  // Referencias para los timers del tooltip web
  const webTooltipTimer = useRef(null)
  const webTooltipHideTimer = useRef(null)
  
  // ========================================
  // LÓGICA ADAPTATIVA - Comportamiento según el dispositivo
  // ========================================
  
  // El sidebar utiliza diferentes configuraciones según el tipo de dispositivo
  // para optimizar la experiencia de usuario en cada plataforma
  
  // ========================================
  // CONFIGURACIONES SEPARADAS - Web vs Móviles
  // ========================================
  
  // Configuración específica para dispositivos web/desktop
  // Esta configuración está optimizada para la experiencia de escritorio
  const webConfig = {
    enableHover: true,           // Hover habilitado: el sidebar se expande al pasar el mouse
    defaultCompact: true,        // Modo compacto por defecto: solo muestra iconos inicialmente
    showTooltips: true,          // Tooltips habilitados: muestra descripciones en modo compacto
    autoClose: false,            // No auto-cerrar: el sidebar permanece abierto
    fixedWidth: false            // Ancho dinámico: el sidebar cambia de tamaño según el estado
  }
  
  // Configuración específica para dispositivos móviles
  // Esta configuración está optimizada para pantallas táctiles pequeñas
  const mobileConfig = {
    enableHover: false,          // Hover deshabilitado: no hay hover en dispositivos táctiles
    defaultCompact: false,       // Modo expandido por defecto: muestra texto completo
    showTooltips: false,         // Tooltips deshabilitados: usa long press en su lugar
    autoClose: true,             // Auto-cerrar: el sidebar se cierra al seleccionar una opción
    fixedWidth: true             // Ancho fijo: el sidebar mantiene un ancho constante
  }
  
  // Configuración específica para tablets
  // Esta configuración combina características de móvil y desktop
  const tabletConfig = {
    enableHover: true,           // Hover habilitado: funciona bien en tablets
    defaultCompact: true,        // Modo compacto por defecto: ahorra espacio
    showTooltips: true,          // Tooltips habilitados: proporciona información adicional
    autoClose: false,            // No auto-cerrar: mantiene el sidebar abierto
    fixedWidth: false            // Ancho dinámico: se adapta al contenido
  }
  
  // Función que determina qué configuración usar según el tipo de dispositivo
  // Retorna la configuración apropiada basada en el tamaño de pantalla detectado
  const getCurrentConfig = () => {
    if (screenSize.isMobile) return mobileConfig    // Usa configuración móvil si es móvil
    if (screenSize.isTablet) return tabletConfig    // Usa configuración tablet si es tablet
    return webConfig  // Usa configuración web para desktop por defecto
  }
  
  // Obtiene la configuración actual basada en el dispositivo detectado
  const currentConfig = getCurrentConfig()
  
  // ========================================
  // FUNCIONES PARA TOOLTIP MÓVIL - Long press
  // ========================================
  
  // Función que se ejecuta cuando el usuario inicia un toque en dispositivos móviles
  // Configura un timer para mostrar el tooltip después de mantener presionado por 500ms
  const handleTouchStart = (e, text) => {
    // Solo funciona en dispositivos móviles, retorna inmediatamente si no es móvil
    if (!screenSize.isMobile) return
    
    // Registra el tiempo actual del toque para referencia
    touchStartTime.current = Date.now()
    
    // Configura un timer que se ejecutará después de 500ms
    // Si el usuario mantiene presionado por este tiempo, se mostrará el tooltip
    longPressTimer.current = setTimeout(() => {
      // Obtiene la información del primer toque del evento
      const touch = e.touches[0]
      
      // Actualiza el estado del tooltip móvil para mostrarlo
      setMobileTooltip({
        show: true,           // Hace visible el tooltip
        text: text,           // Establece el texto a mostrar
        x: touch.clientX,     // Posición X del toque en la pantalla
        y: touch.clientY      // Posición Y del toque en la pantalla
      })
    }, 500) // 500ms de delay para activar el long press
  }
  
  // Función que se ejecuta cuando el usuario termina un toque
  // Limpia el timer del long press y programa la ocultación del tooltip
  const handleTouchEnd = () => {
    // Si hay un timer activo de long press, lo cancela
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)  // Cancela el timer
      longPressTimer.current = null         // Limpia la referencia
    }
    
    // Programa la ocultación del tooltip después de 5 segundos
    // Esto permite que el usuario tenga tiempo de leer la información
    setTimeout(() => {
      setMobileTooltip(prev => ({ ...prev, show: false }))
    }, 5000) // 5 segundos de duración del tooltip
  }
  
  // Función que se ejecuta cuando el usuario mueve el dedo durante un toque
  // Cancela el long press si el usuario mueve el dedo (no es un long press válido)
  const handleTouchMove = () => {
    // Si hay un timer activo de long press, lo cancela
    // Esto evita que aparezca el tooltip si el usuario mueve el dedo
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)  // Cancela el timer
      longPressTimer.current = null         // Limpia la referencia
    }
  }
  
  // ========================================
  // FUNCIONES PARA TOOLTIP WEB - Hover
  // ========================================
  
  // Función que se ejecuta cuando el mouse entra en un elemento del menú
  // Muestra el tooltip web inmediatamente y programa su ocultación automática
  const handleMouseEnter = (e, text) => {
    // Solo funciona en dispositivos web/tablet, retorna inmediatamente si es móvil
    if (screenSize.isMobile) return
    
    // Limpia cualquier timer de ocultación que esté activo
    // Esto evita que el tooltip se oculte prematuramente si el usuario mueve el mouse
    if (webTooltipHideTimer.current) {
      clearTimeout(webTooltipHideTimer.current)  // Cancela el timer de ocultación
      webTooltipHideTimer.current = null         // Limpia la referencia
    }
    
    // Obtiene las dimensiones y posición del elemento que disparó el evento
    const rect = e.currentTarget.getBoundingClientRect()
    
    // Actualiza el estado del tooltip web para mostrarlo
    setWebTooltip({
      show: true,                              // Hace visible el tooltip
      text: text,                              // Establece el texto a mostrar
      x: rect.left + rect.width / 2,          // Posición X: centro horizontal del elemento
      y: rect.top - 10                        // Posición Y: 10px arriba del elemento
    })
    
    // Configura un timer para ocultar el tooltip después de 5 segundos
    // Esto permite que el usuario tenga tiempo de leer la información
    webTooltipHideTimer.current = setTimeout(() => {
      setWebTooltip(prev => ({ ...prev, show: false }))
    }, 5000) // 5 segundos de duración del tooltip
  }
  
  // Función que se ejecuta cuando el mouse sale de un elemento del menú
  // Oculta el tooltip web inmediatamente y limpia todos los timers
  const handleMouseLeave = () => {
    // Solo funciona en dispositivos web/tablet, retorna inmediatamente si es móvil
    if (screenSize.isMobile) return
    
    // Limpia cualquier timer de mostrar que esté activo
    if (webTooltipTimer.current) {
      clearTimeout(webTooltipTimer.current)  // Cancela el timer de mostrar
      webTooltipTimer.current = null         // Limpia la referencia
    }
    
    // Limpia cualquier timer de ocultar que esté activo
    if (webTooltipHideTimer.current) {
      clearTimeout(webTooltipHideTimer.current)  // Cancela el timer de ocultar
      webTooltipHideTimer.current = null         // Limpia la referencia
    }
    
    // Oculta el tooltip inmediatamente al salir del hover
    // Esto proporciona una respuesta rápida al usuario
    setWebTooltip(prev => ({ ...prev, show: false }))
  }
  
  // Efecto que limpia todos los timers cuando el componente se desmonta
  // Esto previene memory leaks y errores si el componente se desmonta mientras hay timers activos
  useEffect(() => {
    // Función de limpieza que se ejecuta al desmontar el componente
    return () => {
      // Limpia el timer del long press móvil si existe
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
      // Limpia el timer del tooltip web si existe
      if (webTooltipTimer.current) {
        clearTimeout(webTooltipTimer.current)
      }
      // Limpia el timer de ocultación del tooltip web si existe
      if (webTooltipHideTimer.current) {
        clearTimeout(webTooltipHideTimer.current)
      }
    }
  }, []) // Array de dependencias vacío: solo se ejecuta al montar/desmontar
  
  // Efecto que ajusta el comportamiento del sidebar según el tipo de dispositivo detectado
  // Se ejecuta cuando cambia el tipo de dispositivo (móvil, tablet, desktop)
  useEffect(() => {
    if (screenSize.isMobile) {
      // En dispositivos móviles: usar configuración móvil
      // Establece el sidebar en modo expandido por defecto para mejor usabilidad
      setSidebarCompact(mobileConfig.defaultCompact)
    } else if (screenSize.isTablet) {
      // En tablets: usar configuración tablet
      // Establece el sidebar en modo compacto por defecto para ahorrar espacio
      setSidebarCompact(tabletConfig.defaultCompact)
    } else {
      // En desktop/web: NO forzar cambios en el estado actual
      // Esto mantiene la preferencia del usuario y no interfiere con el diseño web
      // El usuario puede cambiar manualmente entre modo compacto y expandido
    }
  }, [screenSize.isMobile, screenSize.isTablet, setSidebarCompact]) // Se ejecuta cuando cambian estos valores
  
  // ========================================
  // CONFIGURACIÓN DE MENÚ - Array de elementos del menú
  // ========================================
  
  // Array que define todos los elementos del menú de navegación del sidebar
  // Cada objeto contiene: id (identificador único), label (texto visible), icon (componente de icono)
  // El orden de los elementos determina su posición en el menú
  const menuItems = [
    // ========================================
    // SECCIÓN PRINCIPAL - Navegación básica
    // ========================================
    { id: 'inicio', label: 'Inicio', icon: Home },                                    // Página principal del dashboard con métricas y resumen
    { id: 'cursos', label: 'Gestión de Cursos Online', icon: BookOpen },             // Módulo para administrar cursos, lecciones y materiales
    { id: 'usuarios', label: 'Usuarios y Roles', icon: Users },                      // Gestión de usuarios, perfiles y permisos
    { id: 'ecommerce', label: 'E-commerce y Ventas', icon: ShoppingCart },           // Tienda online, productos y gestión de ventas
    // ========================================
    // SECCIÓN DE PRODUCTOS Y SERVICIOS
    // ========================================
    { id: 'productos-online', label: 'Productos en línea', icon: Package },          // Catálogo de productos digitales y suscripciones
    { id: 'certificaciones', label: 'Certificaciones Digitales', icon: Award },      // Emisión y gestión de certificados académicos
    
    // ========================================
    // SECCIÓN DE MARKETING Y COMUNICACIÓN
    // ========================================
    { id: 'marketing', label: 'Marketing y CRM', icon: TrendingUp },                 // Herramientas de marketing y gestión de clientes
    { id: 'soporte', label: 'Soporte y Comunicación', icon: MessageCircle },         // Sistema de soporte técnico y atención al cliente
    
    // ========================================
    // SECCIÓN FINANCIERA Y ADMINISTRATIVA
    // ========================================
    { id: 'finanzas', label: 'Finanzas y Contabilidad', icon: DollarSign },          // Módulo financiero, facturación y pagos
    { id: 'administrativo', label: 'Administrativo', icon: Shield },                 // Funciones administrativas y seguridad del sistema
    { id: 'reportes', label: 'Reportes Financieros y Analítica', icon: BarChart3 },  // Generación de reportes y análisis de datos
    
    // ========================================
    // SECCIÓN DE CONTENIDO Y COMUNICACIÓN
    // ========================================
    { id: 'contenido', label: 'Gestión de Contenido y Blog', icon: FileText },       // Editor de contenido, blog y recursos
    { id: 'calendario', label: 'Calendario y Eventos Online', icon: Calendar },      // Gestión de eventos, programación y recordatorios
    { id: 'correo', label: 'Correo Masivo', icon: Mail },                            // Sistema de email marketing y newsletters
    
    // ========================================
    // SECCIÓN DE CONFIGURACIÓN
    // ========================================
    { id: 'configuracion', label: 'Configuración y Seguridad', icon: Settings },     // Configuración del sistema, preferencias y seguridad
  ]

  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================

  return (
    <>
      {/* ========================================
          OVERLAY MÓVIL - Fondo oscuro para móviles
          ======================================== */}
      
      {/* Renderiza un overlay oscuro solo cuando el sidebar está abierto en móvil */}
      {sidebarOpen && (
        <div 
          className="fixed h-dvh w-dvw bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================
          CONTENEDOR PRINCIPAL DEL SIDEBAR
          ======================================== */}
      
      {/* Contenedor principal del sidebar con configuraciones separadas */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-[#1e081d]/95 via-[#2a0f29]/90 to-[#1e081d]/95 backdrop-blur-2xl border-r border-white/20 shadow-2xl transform transition-all duration-300 ease-in-out sidebar-compact-transition sidebar-web-optimized
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:inset-auto lg:h-full
          flex flex-col
          ${currentConfig.fixedWidth ? 'w-72' : (sidebarCompact ? 'w-16' : 'w-64 xl:w-72')}
        `}
        onMouseEnter={() => {
          // Solo expandir si el hover está habilitado en la configuración actual
          if (currentConfig.enableHover) {
            setSidebarCompact(false)
          }
        }}
        onMouseLeave={() => {
          // Solo contraer si el hover está habilitado en la configuración actual
          if (currentConfig.enableHover) {
            setSidebarCompact(true)
          }
        }}
      >
        {/* ========================================
            MENÚ DE NAVEGACIÓN - Lista de elementos
            ======================================== */}
        
        {/* Contenedor del menú de navegación - Barra de navegación invisible */}
        <nav className="px-4 py-6 relative overflow-y-auto select-none flex-1 scrollbar-hide">
          <div className="space-y-1">
            {/* Mapea cada elemento del menú para crear los botones */}
            {menuItems.map((item) => {
              const Icon = item.icon  // Extrae el componente de icono
              return (
                <>
                {/* Botón individual del menú */}
                <button
                  key={item.id}  // Clave única para React
                  onClick={() => {
                    setActiveSection(item.id)      // Cambia la sección activa
                    // Auto-cerrar solo si está habilitado en la configuración actual
                    if (currentConfig.autoClose) {
                      setSidebarOpen(false)
                    }
                  }}
                  onTouchStart={(e) => handleTouchStart(e, item.label)}  // Long press para tooltip móvil
                  onTouchEnd={handleTouchEnd}                            // Finalizar long press
                  onTouchMove={handleTouchMove}                          // Cancelar long press si se mueve
                  onMouseEnter={(e) => handleMouseEnter(e, item.label)}  // Hover para tooltip web
                  onMouseLeave={handleMouseLeave}                        // Salir del hover
                  className={`
                    sidebar-item w-full text-left
                    ${activeSection === item.id ? 'active' : ''}  // Aplica clase 'active' si es la sección actual
                    ${sidebarCompact && currentConfig.showTooltips ? 'justify-center' : ''}     // Centra el contenido en modo compacto solo si los tooltips están habilitados
                  `}
                  title={sidebarCompact && currentConfig.showTooltips ? item.label : null}  // Tooltip solo si está habilitado en la configuración
                >
                  {/* Icono del elemento del menú */}
                  <Icon size={18} className={`${sidebarCompact && currentConfig.showTooltips ? '' : 'mr-3'} flex-shrink-0`} />
                  
                  {/* Texto del elemento (visible cuando no está compacto O cuando los tooltips están deshabilitados) */}
                  {(!sidebarCompact || !currentConfig.showTooltips) && (
                    <span className="text-sm truncate">{item.label}</span>
                  )}
                </button>
                

            </>
              )
            })}

            {/* ========================================
                BOTÓN DE CERRAR SESIÓN - Logout
                ======================================== */}
            
            {/* Botón de cerrar sesión posicionado en la parte inferior */}
            <button 
              onClick={() => {
                if (onLogout) {
                  onLogout()
                }
                if (currentConfig.autoClose) {
                  setSidebarOpen(false)
                }
              }}
              onTouchStart={(e) => handleTouchStart(e, 'Cerrar Sesión')}  // Long press para tooltip móvil
              onTouchEnd={handleTouchEnd}                                // Finalizar long press
              onTouchMove={handleTouchMove}                              // Cancelar long press si se mueve
              onMouseEnter={(e) => handleMouseEnter(e, 'Cerrar Sesión')}  // Hover para tooltip web
              onMouseLeave={handleMouseLeave}                            // Salir del hover
              className={`
                sidebar-item w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/20
                ${sidebarCompact && currentConfig.showTooltips ? 'justify-center' : ''}  // Centra el contenido en modo compacto solo si los tooltips están habilitados
              `}
              title={sidebarCompact && currentConfig.showTooltips ? 'Cerrar Sesión' : null}  // Tooltip solo si está habilitado en la configuración
            >
              {/* Icono de cerrar sesión */}
              <LogOut size={18} className={`${sidebarCompact && currentConfig.showTooltips ? '' : 'mr-3'} flex-shrink-0`} />
              
              {/* Texto de cerrar sesión (visible cuando no está compacto O cuando los tooltips están deshabilitados) */}
              {(!sidebarCompact || !currentConfig.showTooltips) && (
                <span className="text-sm truncate">Cerrar Sesión</span>
              )}
            </button>

          </div>
        </nav>
      </div>
      
      {/* ========================================
          TOOLTIP MÓVIL - Long press
          ======================================== */}
      
      {/* Tooltip móvil que aparece con long press */}
      {mobileTooltip.show && (
        <div
          className="mobile-tooltip"
          style={{
            left: `${mobileTooltip.x}px`,
            top: `${mobileTooltip.y - 50}px` // Posicionar arriba del dedo
            // Sin transform para que aparezca en la posición exacta del toque
          }}
        >
          {mobileTooltip.text}
        </div>
      )}
      
      {/* Tooltip web que aparece con hover */}
      {webTooltip.show && (
        <div
          className="web-tooltip"
          style={{
            left: `${webTooltip.x}px`,
            top: `${webTooltip.y}px`
            // Sin transform para que aparezca en la esquina exacta del mouse
          }}
        >
          {webTooltip.text}
        </div>
      )}
      
    </>
  )
}

// ========================================
// EXPORTACIÓN - Exporta el componente para uso en otros archivos
// ========================================

// Exporta el componente Sidebar como exportación por defecto
// Esto permite importarlo en otros archivos como: import Sidebar from './Sidebar'
// El componente Sidebar proporciona el menú lateral de navegación con:
// - Navegación entre módulos del dashboard
// - Responsividad adaptativa (móvil, tablet, desktop)
// - Modos compacto y expandido con hover inteligente
// - Sistema de tooltips (hover en desktop, long press en móvil)
// - Configuraciones específicas por tipo de dispositivo
// - Funcionalidad de logout integrada
// - Efectos glassmorphism y animaciones suaves
export default Sidebar;
