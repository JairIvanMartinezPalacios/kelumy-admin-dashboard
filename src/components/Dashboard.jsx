// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React para crear componentes funcionales
import React, { useState, useRef, useEffect } from 'react'

// Importa los módulos de admin desde la estructura reorganizada
import { 
  DashboardInicio,
  CursosModule,
  UsuariosModule,
  EcommerceModule,
  ProductosModule,
  CertificacionesModule,
  MarketingModule,
  SoporteModule,
  FinanzasModule,
  AdministrativoModule,
  ReportesModule,
  ContenidoModule,
  CalendarioModule,
  CorreoModule,
  ConfiguracionModule
} from './admin/modules'

// Importa el mockup de modelos de negocio
import ModelosNegocioDemo from './ModelosNegocioDemo'

// Importa el mosaico de investigación
import InvestigacionMosaico from './admin/modules/investigacion/InvestigacionMosaico'

// Importa los módulos de investigación
import EstrategiasPrecio from './admin/modules/investigacion/EstrategiasPrecio'
import EmbudoVentas from './admin/modules/investigacion/EmbudoVentas'
import UXCheckout from './admin/modules/investigacion/UXCheckout'
import MetodosVenta from './admin/modules/investigacion/MetodosVenta'
import MarketingCRM from './admin/modules/investigacion/MarketingCRM'
import MetricasKPIs from './admin/modules/investigacion/MetricasKPIs'
import GrowthHacks from './admin/modules/investigacion/GrowthHacks'
import PricingExperiments from './admin/modules/investigacion/PricingExperiments'
import OrganizacionOperativa from './admin/modules/investigacion/OrganizacionOperativa'
import RiesgosMitigaciones from './admin/modules/investigacion/RiesgosMitigaciones'
import BuenasPracticas from './admin/modules/investigacion/BuenasPracticas'

// Importa los componentes de perfil y configuración
import AdminProfile from './admin/modules/profile/AdminProfile'
import AdminSettings from './admin/modules/settings/AdminSettings'

// Importa iconos de la librería Lucide React para las métricas y secciones
import {
  Home,           // Icono de inicio para el sidebar
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
  Shield,         // Icono de escudo para sección administrativa
  Menu,           // Icono de menú hamburguesa
  Search,         // Icono de búsqueda
  Bell,           // Icono de notificaciones
  User,           // Icono de usuario
  ChevronDown,    // Icono de flecha hacia abajo
  LogOut,         // Icono de cerrar sesión
  X,              // Icono de cerrar
  TestTube        // Icono de probeta para modelos de negocio
} from 'lucide-react'

// ========================================
// COMPONENTE DASHBOARD - Contenido principal
// ========================================

// Define el componente funcional Dashboard que recibe las props necesarias
const Dashboard = ({ user, onLogout }) => {
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  const [activeSection, setActiveSection] = useState('inicio')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarHovered, setSidebarHovered] = useState(false)
  const [lightBackground, setLightBackground] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Detectar si el contenido actual tiene fondo claro
  useEffect(() => {
    const sectionsWithLightBackground = ['inicio', 'cursos', 'usuarios', 'ecommerce', 'productos-online', 'certificaciones', 'marketing', 'soporte', 'finanzas', 'administrativo', 'reportes', 'contenido', 'calendario', 'correo', 'configuracion']
    setLightBackground(sectionsWithLightBackground.includes(activeSection))
  }, [activeSection])

  // ========================================
  // OPCIONES DEL SIDEBAR - Navegación lateral
  // ========================================
  
  const sidebarOptions = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'cursos', label: 'Cursos', icon: BookOpen },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'productos-online', label: 'Productos Online', icon: Package },
    { id: 'certificaciones', label: 'Certificaciones', icon: Award },
    { id: 'marketing', label: 'Marketing', icon: Target },
    { id: 'soporte', label: 'Soporte', icon: MessageCircle },
    { id: 'finanzas', label: 'Finanzas', icon: DollarSign },
    { id: 'administrativo', label: 'Administrativo', icon: Shield },
    { id: 'reportes', label: 'Reportes', icon: BarChart3 },
    { id: 'contenido', label: 'Contenido', icon: FileText },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'correo', label: 'Correo', icon: Mail },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
    { id: 'investigacion', label: 'Investigación', icon: BookOpen }
  ]

  // ========================================
  // FUNCIÓN DE RENDERIZADO - Contenido dinámico
  // ========================================
  
  // Función que renderiza el contenido del dashboard según la sección activa
  // Utiliza un switch statement para mostrar diferentes vistas según activeSection
  // Esta función actúa como un enrutador simple para los diferentes módulos
  const renderDashboardContent = () => {
    // Mostrar Mi Perfil si está activo
    if (showProfile) {
      return <AdminProfile user={user} onClose={() => setShowProfile(false)} />
    }
    
    // Mostrar Configuración si está activo
    if (showSettings) {
      return <AdminSettings onClose={() => setShowSettings(false)} />
    }

    switch (activeSection) {
      // ========================================
      // SECCIÓN INICIO - Dashboard principal con métricas y resumen
      // ========================================
      case 'inicio':
        return <DashboardInicio />

      // ========================================
      // SECCIÓN CURSOS - Gestión de cursos y contenido educativo
      // ========================================
      case 'cursos':
        return <CursosModule />

      // ========================================
      // SECCIÓN USUARIOS - Gestión de usuarios y roles
      // ========================================
      case 'usuarios':
        return <UsuariosModule />

      // ========================================
      // SECCIÓN E-COMMERCE - Gestión de tienda en línea
      // ========================================
      case 'ecommerce':
        return <EcommerceModule />

      // ========================================
      // SECCIÓN PRODUCTOS EN LÍNEA - Gestión de productos digitales
      // ========================================
      case 'productos-online':
        return <ProductosModule />

      // ========================================
      // SECCIÓN CERTIFICACIONES - Gestión de certificados y acreditaciones
      // ========================================
      case 'certificaciones':
        return <CertificacionesModule />

      // ========================================
      // SECCIÓN MARKETING - Herramientas de marketing y promoción
      // ========================================
      case 'marketing':
        return <MarketingModule />

      // ========================================
      // SECCIÓN SOPORTE - Sistema de atención al cliente
      // ========================================
      case 'soporte':
        return <SoporteModule />

      // ========================================
      // SECCIÓN FINANZAS - Gestión financiera y contable
      // ========================================
      case 'finanzas':
        return <FinanzasModule />

      // ========================================
      // SECCIÓN ADMINISTRATIVO - Herramientas administrativas
      // ========================================
      case 'administrativo':
        return <AdministrativoModule />

      // ========================================
      // SECCIÓN REPORTES - Generación de reportes y analytics
      // ========================================
      case 'reportes':
        return <ReportesModule />

      // ========================================
      // SECCIÓN CONTENIDO - Gestión de contenido y medios
      // ========================================
      case 'contenido':
        return <ContenidoModule />

      // ========================================
      // SECCIÓN CALENDARIO - Gestión de eventos y programación
      // ========================================
      case 'calendario':
        return <CalendarioModule />

      // ========================================
      // SECCIÓN CORREO - Sistema de email marketing
      // ========================================
      case 'correo':
        return <CorreoModule />

      // ========================================
      // SECCIÓN CONFIGURACIÓN - Configuración del sistema
      // ========================================
      case 'configuracion':
        return <ConfiguracionModule />

      // ========================================
      // SECCIÓN INVESTIGACIÓN - Módulos de investigación
      // ========================================
      case 'investigacion':
        return <InvestigacionMosaico onNavigateToModule={setActiveSection} />

      // ========================================
      // MÓDULO 1: MODELOS DE NEGOCIO - Previsualización
      // ========================================
      case 'modelos-negocio':
        return <ModelosNegocioDemo onBack={() => setActiveSection('investigacion')} />

      // ========================================
      // MÓDULO 2: ESTRATEGIAS DE PRECIO - Previsualización
      // ========================================
      case 'estrategias-precio':
        return <EstrategiasPrecio onBack={() => setActiveSection('investigacion')} />

      // ========================================
      // MÓDULO 3: EMBUDO DE VENTAS - Previsualización
      // ========================================
        case 'embudo-ventas':
          return <EmbudoVentas onBack={() => setActiveSection('investigacion')} />
        case 'ux-checkout':
          return <UXCheckout onBack={() => setActiveSection('investigacion')} />
        case 'metodos-venta':
          return <MetodosVenta onBack={() => setActiveSection('investigacion')} />
        case 'marketing-crm':
          return <MarketingCRM onBack={() => setActiveSection('investigacion')} />
        case 'metricas-kpis':
          return <MetricasKPIs onBack={() => setActiveSection('investigacion')} />
        case 'growth-hacks':
          return <GrowthHacks onBack={() => setActiveSection('investigacion')} />
        case 'pricing-experiments':
          return <PricingExperiments onBack={() => setActiveSection('investigacion')} />
        case 'organizacion-operativa':
          return <OrganizacionOperativa onBack={() => setActiveSection('investigacion')} />
        case 'riesgos-mitigaciones':
          return <RiesgosMitigaciones onBack={() => setActiveSection('investigacion')} />
        case 'buenas-practicas':
          return <BuenasPracticas onBack={() => setActiveSection('investigacion')} />

      // ========================================
      // SECCIÓN POR DEFECTO - Manejo de rutas no válidas
      // ========================================
      default:
        return (
          // Contenedor de error para secciones no encontradas
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
      <div className="min-h-screen flex w-full overflow-x-hidden" style={{ backgroundColor: '#200C2C', maxWidth: '100vw' }}>
      {/* Sidebar Estático y Responsivo - Solo visible en desktop */}
      <div 
        className={`hidden lg:block fixed left-0 top-0 h-full transition-all duration-300 z-40 shadow-2xl ${
          sidebarHovered ? 'w-64' : 'w-16'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(138, 43, 226, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="p-4 h-full overflow-y-auto scrollbar-hide flex flex-col">
          {/* Botón de hamburguesa */}
          <div className="mb-6">
            <button
              onClick={() => setSidebarHovered(!sidebarHovered)}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              title="Toggle Sidebar"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>


          {/* Navegación del sidebar */}
          <nav className="space-y-2 flex-1">
            {sidebarOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveSection(option.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                        activeSection === option.id
                          ? 'text-white shadow-lg'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      style={activeSection === option.id ? {
                        background: 'linear-gradient(135deg, #8A2BE2 0%, #4B0082 100%)'
                      } : {}}
                  title={option.label}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarHovered && (
                    <span className="ml-3 text-sm font-medium transition-all duration-300">
                      {option.label}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Botón de cerrar sesión */}
          <div className="mt-auto pt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-red-300 hover:bg-red-500/20 border border-red-500/30"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarHovered && (
                <span className="ml-3 text-sm font-medium transition-all duration-300">
                  Cerrar Sesión
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className={`flex-1 flex flex-col transition-all duration-300 overflow-x-hidden min-w-0 ${
        sidebarHovered ? 'lg:ml-64' : 'lg:ml-16'
      }`}>
        {/* Navbar Superior Estático */}
        <nav 
          className="fixed top-0 right-0 backdrop-blur-2xl border-b border-purple-400/30 px-3 sm:px-4 md:px-6 py-3 sm:py-4 z-50 flex-shrink-0 shadow-2xl"
          style={{
            background: lightBackground 
              ? 'linear-gradient(135deg, rgba(54, 22, 53, 0.8) 0%, rgba(75, 0, 130, 0.6) 100%)'
              : 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: lightBackground 
              ? '1px solid rgba(138, 43, 226, 0.4)'
              : '1px solid rgba(138, 43, 226, 0.2)',
            boxShadow: lightBackground 
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(0,0,0,0.3)',
            left: isMobile ? '0' : (sidebarHovered ? '256px' : '64px'),
            transition: 'left 0.3s ease',
            width: isMobile ? '100%' : (sidebarHovered ? 'calc(100% - 256px)' : 'calc(100% - 64px)')
          }}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
            {/* Lado izquierdo - Menú hamburguesa y Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 min-w-0 flex-shrink-0">
                  {/* Botón de menú hamburguesa para móviles */}
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="lg:hidden p-2 rounded-lg transition-colors flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 100%)',
                      border: '1px solid rgba(138, 43, 226, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.2) 100%)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 100%)'
                    }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </button>
              
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <img 
                  src="/img/logo_kelumi.png" 
                  alt="KELUMY Logo" 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0"
                />
                <div className="min-w-0 hidden sm:block">
                  <h1 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">KELUMY</h1>
                  <p className="text-xs text-white/70 hidden md:block">Admin Dashboard</p>
                </div>
              </div>
            </div>

            {/* Centro - Barra de búsqueda */}
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4 md:mx-8 min-w-0 hidden sm:block">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-sm"
                />
              </div>
            </div>

            {/* Botón de búsqueda móvil */}
            <button className="sm:hidden p-2 rounded-lg transition-colors flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 100%)',
                border: '1px solid rgba(138, 43, 226, 0.3)'
              }}
            >
              <Search className="w-5 h-5 text-white" />
            </button>

            {/* Lado derecho - Notificaciones y perfil */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 flex-shrink-0">
                  {/* Notificaciones */}
                  <div className="relative" ref={notificationsRef}>
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-1.5 sm:p-2 rounded-lg transition-colors relative flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 100%)',
                        border: '1px solid rgba(138, 43, 226, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.2) 100%)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 100%)'
                      }}
                    >
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">3</span>
                    </button>
                
                {/* Dropdown de notificaciones */}
                {showNotifications && (
                  <div 
                    className="fixed right-2 sm:right-4 md:right-6 top-16 sm:top-20 w-[calc(100vw-1rem)] sm:w-80 max-w-sm backdrop-blur-2xl rounded-lg shadow-2xl z-[99999]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div className="p-4 border-b border-white/20">
                      <h3 className="text-white font-semibold">Notificaciones</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-white text-sm">Nuevo estudiante registrado</p>
                          <p className="text-white/60 text-xs">Hace 5 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-white text-sm">Curso completado</p>
                          <p className="text-white/60 text-xs">Hace 1 hora</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-white text-sm">Pago pendiente</p>
                          <p className="text-white/60 text-xs">Hace 2 horas</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-white/20">
                      <button className="w-full text-center text-purple-300 hover:text-purple-200 text-sm">
                        Ver todas las notificaciones
                      </button>
                    </div>
                  </div>
                )}
              </div>

                  {/* Menú de usuario */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 100%)',
                        border: '1px solid rgba(138, 43, 226, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.2) 100%)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 100%)'
                      }}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{
                        background: 'linear-gradient(135deg, #8A2BE2 0%, #4B0082 100%)'
                      }}>
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="text-left hidden md:block min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-white truncate">Admin</p>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 hidden sm:block flex-shrink-0" />
                    </button>
                
                {/* Dropdown de usuario */}
                {showUserMenu && (
                  <div 
                    className="fixed right-2 sm:right-4 md:right-6 top-16 sm:top-20 w-[calc(100vw-1rem)] sm:w-64 max-w-xs backdrop-blur-2xl rounded-lg shadow-2xl z-[99999]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(54, 22, 53, 1.0) 0%, rgba(54, 22, 53, 0.9) 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(138, 43, 226, 0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div className="p-4 border-b border-white/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                          background: 'linear-gradient(135deg, #8A2BE2 0%, #4B0082 100%)'
                        }}>
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">Administrador</p>
                          <p className="text-white/70 text-sm">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          setShowUserMenu(false)
                          setShowProfile(true)
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4 text-white/70" />
                        <span className="text-white text-sm">Mi Perfil</span>
                      </button>
                      <button 
                        onClick={() => {
                          setShowUserMenu(false)
                          setShowSettings(true)
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-white/70" />
                        <span className="text-white text-sm">Configuración</span>
                      </button>
                      <div className="border-t border-white/20 my-2"></div>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/20 transition-colors text-red-300"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Área de Contenido Scrolleable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-14 sm:pt-16">
      {renderDashboardContent()}
        </div>
      </div>

      {/* Sidebar Móvil (Overlay) */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowSidebar(false)}></div>
          <div 
            className="fixed left-0 top-0 h-full w-64 backdrop-blur-2xl border-r border-purple-400/30 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(138, 43, 226, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <div className="p-4 h-full overflow-y-auto scrollbar-hide">
              {/* Solo iconos del sidebar móvil */}
              <nav className="space-y-2">
                {sidebarOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setActiveSection(option.id)
                        setShowSidebar(false)
                      }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            activeSection === option.id
                              ? 'text-white shadow-lg'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                          style={activeSection === option.id ? {
                            background: 'linear-gradient(135deg, #8A2BE2 0%, #4B0082 100%)'
                          } : {}}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ========================================
// EXPORTACIÓN - Exporta el componente para uso en otros archivos
// ========================================

// Exporta el componente Dashboard como exportación por defecto
// Esto permite importarlo en otros archivos como: import Dashboard from './Dashboard'
export default Dashboard