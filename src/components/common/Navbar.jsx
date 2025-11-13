// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejar el estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Search,    // Icono de lupa para la barra de búsqueda
  Bell,      // Icono de campana para notificaciones
  User,      // Icono de usuario para el perfil
  Settings,  // Icono de engranaje para configuración
  LogOut,    // Icono de salida para cerrar sesión
  Menu,      // Icono de menú hamburguesa para abrir sidebar
  X          // Icono de X para cerrar sidebar
} from 'lucide-react'

// ========================================
// COMPONENTE NAVBAR - Barra de navegación superior
// ========================================

// Define el componente funcional Navbar que recibe props del componente padre (App.jsx)
const Navbar = ({ 
  sidebarOpen,        // Estado: si el sidebar está abierto en móvil
  setSidebarOpen,     // Función: para abrir/cerrar el sidebar en móvil
  sidebarCompact,     // Estado: si el sidebar está en modo compacto
  setSidebarCompact,  // Función: para cambiar entre modo compacto/expandido
  onLogout            // Función: para manejar el logout del usuario
}) => {
  
  // ========================================
  // ESTADO LOCAL DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar si el menú desplegable del usuario está visible
  // false = oculto, true = visible
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Estado para simular el número de notificaciones pendientes
  // Valor fijo de 3 notificaciones para demostración
  const [notifications] = useState(3)

  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    // ========================================
    // ESTRUCTURA PRINCIPAL - Elemento de navegación
    // ========================================
    
    // Elemento nav que representa la barra de navegación superior
    // w-full: ancho completo de la pantalla
    // z-50: z-index alto para estar por encima de otros elementos
    // flex-shrink-0: no se reduce de tamaño en layouts flexbox
    // bg-gradient-to-r: gradiente horizontal de izquierda a derecha
    // from-[#1e081d]/95: color inicial morado muy oscuro con 95% opacidad
    // via-[#2a0f29]/90: color intermedio morado oscuro con 90% opacidad
    // to-[#1e081d]/95: color final morado muy oscuro con 95% opacidad
    // backdrop-blur-2xl: efecto de desenfoque del fondo muy intenso
    // border-b: borde inferior
    // border-white/20: borde blanco con 20% de opacidad
    // shadow-2xl: sombra extra grande para profundidad
    <nav className="w-full z-50 flex-shrink-0 bg-gradient-to-r from-[#1e081d]/95 via-[#2a0f29]/90 to-[#1e081d]/95 backdrop-blur-2xl border-b border-white/20 shadow-2xl">
      
      {/* Contenedor interno con padding horizontal responsivo
          px-6: padding horizontal de 24px en móviles
          lg:px-8: padding horizontal de 32px en pantallas grandes */}
      <div className="px-6 lg:px-8">
        
        {/* Contenedor flex que organiza los elementos horizontalmente
            flex: layout flexbox
            justify-between: distribuye el espacio entre los elementos
            items-center: centra verticalmente los elementos
            h-16: altura fija de 64px */}
        <div className="flex justify-between items-center h-16">
          
          {/* ========================================
              LADO IZQUIERDO - Botones de menú y título
              ======================================== */}
          
          {/* Contenedor flex para los elementos del lado izquierdo
              flex: layout flexbox
              items-center: centra verticalmente
              space-x-4: espacio horizontal de 16px entre elementos */}
          <div className="flex items-center space-x-4">
            
            {/* Botón para abrir/cerrar sidebar en dispositivos móviles
                onClick: alterna el estado del sidebar
                lg:hidden: solo visible en pantallas menores a lg (1024px)
                p-2: padding de 8px
                rounded-lg: bordes redondeados
                text-white/80: texto blanco con 80% de opacidad
                hover:text-white: texto blanco completo al hacer hover
                hover:bg-white/20: fondo blanco con 20% de opacidad al hacer hover
                transition-all duration-200: transición suave de 200ms */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              {/* Renderiza el icono X si el sidebar está abierto, sino el icono Menu
                  size={20}: tamaño del icono de 20px */}
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Botón para alternar modo compacto del sidebar en desktop
                onClick: alterna el estado del modo compacto
                hidden lg:block: oculto en móviles, visible en pantallas lg y mayores
                title: tooltip que muestra el estado actual del botón */}
            <button
              onClick={() => setSidebarCompact(!sidebarCompact)}
              className="hidden lg:block p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
              title={sidebarCompact ? 'Expandir sidebar' : 'Contraer sidebar'}
            >
              {/* Renderiza el icono Menu si está compacto, sino el icono X */}
              {sidebarCompact ? <Menu size={20} /> : <X size={20} />}
            </button>
            
            {/* Contenedor para el logo y título de la empresa
                flex: layout flexbox
                items-center: centra verticalmente
                space-x-3: espacio horizontal de 12px entre elementos */}
            <div className="flex items-center space-x-3">
              
              {/* Imagen del logo de KELUMY
                  src: ruta de la imagen del logo
                  alt: texto alternativo para accesibilidad
                  w-8 h-8: ancho y alto de 32px
                  object-contain: mantiene la proporción de la imagen
                  drop-shadow-lg: sombra grande para contraste
                  filter: filtros CSS para mejorar visibilidad
                  brightness-110: aumenta el brillo
                  contrast-125: aumenta el contraste */}
              <img 
                src="/img/logo_kelumi.png" 
                alt="KELUMY Logo" 
                className="w-8 h-8 object-contain drop-shadow-lg filter brightness-110 contrast-125"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 4px rgba(255, 255, 255, 0.2)) brightness(1.1) contrast(1.25)'
                }}
              />
              
              {/* Contenedor para el texto del título */}
              <div>
                {/* Título principal de la empresa
                    text-lg: tamaño de texto grande
                    font-semibold: peso de fuente semi-negrita
                    text-white: color blanco
                    drop-shadow-lg: sombra grande para contraste
                    filter: filtros CSS para mejorar visibilidad */}
                <h1 className="text-lg font-semibold text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(255, 255, 255, 0.3)' }}>KELUMY</h1>
                
                {/* Subtítulo del dashboard
                    text-sm: tamaño de texto pequeño
                    text-white/90: color blanco con 90% de opacidad para mejor visibilidad
                    hidden sm:block: oculto en móviles, visible en pantallas sm y mayores
                    drop-shadow-md: sombra media para contraste */}
                <p className="text-sm text-white/90 hidden sm:block drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)' }}>Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* ========================================
              CENTRO - Barra de búsqueda
              ======================================== */}
          
          {/* Contenedor para la barra de búsqueda centrada
              flex-1: ocupa todo el espacio disponible
              flex: layout flexbox
              justify-center: centra horizontalmente */}
          <div className="flex-1 flex justify-center">
            
            {/* Contenedor de la barra de búsqueda
                block: visible en todas las pantallas
                relative: posicionamiento relativo para el icono */}
            <div className="block relative">
              
              {/* Contenedor del icono de búsqueda
                  absolute: posicionamiento absoluto
                  inset-y-0: se extiende verticalmente
                  left-0: alineado a la izquierda
                  pl-3: padding izquierdo de 12px
                  flex: layout flexbox
                  items-center: centra verticalmente
                  pointer-events-none: no interfiere con los clics */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Icono de lupa
                    h-4 w-4: tamaño de 16px
                    text-white/60: color blanco con 60% de opacidad */}
                <Search className="h-4 w-4 text-white/60" />
              </div>
              
              {/* Campo de entrada de texto para búsqueda
                  type="text": tipo de entrada de texto
                  placeholder: texto de placeholder
                  block: elemento de bloque
                  w-40: ancho de 160px en móviles
                  md:w-56: ancho de 224px en pantallas md y mayores
                  lg:w-64: ancho de 256px en pantallas lg y mayores
                  pl-10: padding izquierdo de 40px para el icono
                  pr-3: padding derecho de 12px
                  py-2: padding vertical de 8px
                  bg-white/20: fondo blanco con 20% de opacidad
                  border: borde
                  border-white/30: borde blanco con 30% de opacidad
                  rounded-lg: bordes redondeados
                  text-sm: tamaño de texto pequeño
                  text-white: color blanco
                  placeholder-white/60: color del placeholder blanco con 60% de opacidad
                  focus:outline-none: sin outline al hacer focus
                  focus:ring-2: anillo de 2px al hacer focus
                  focus:ring-white/50: anillo blanco con 50% de opacidad
                  focus:border-white/50: borde blanco con 50% de opacidad al hacer focus
                  backdrop-blur-sm: efecto de desenfoque del fondo */}
              <input
                type="text"
                placeholder="Buscar..."
                className="block w-40 md:w-56 lg:w-64 pl-10 pr-3 py-2 bg-white/10 border border-white/30 rounded-lg text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>

          {/* ========================================
              LADO DERECHO - Notificaciones y usuario
              ======================================== */}
          
          {/* Contenedor para los elementos del lado derecho
              flex: layout flexbox
              items-center: centra verticalmente
              space-x-4: espacio horizontal de 16px entre elementos */}
          <div className="flex items-center space-x-4">
            
            {/* ========================================
                NOTIFICACIONES - Botón de campana
                ======================================== */}
            
            {/* Contenedor relativo para el botón de notificaciones */}
            <div className="relative">
              
              {/* Botón de notificaciones
                  p-2: padding de 8px
                  text-white/80: texto blanco con 80% de opacidad
                  hover:text-white: texto blanco completo al hacer hover
                  hover:bg-white/20: fondo blanco con 20% de opacidad al hacer hover
                  rounded-lg: bordes redondeados
                  transition-all duration-200: transición suave de 200ms */}
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 relative group">
                
                {/* Icono de campana
                    size={20}: tamaño de 20px */}
                <Bell size={20} />
                
                {/* Badge de notificaciones (solo se muestra si hay notificaciones)
                    absolute: posicionamiento absoluto
                    -top-1 -right-1: posicionado en la esquina superior derecha
                    bg-gradient-to-r: gradiente de izquierda a derecha
                    from-red-500 to-red-600: de rojo 500 a rojo 600
                    text-white: texto blanco
                    text-xs: tamaño de texto extra pequeño
                    rounded-full: forma circular
                    h-5 w-5: altura y ancho de 20px
                    flex: layout flexbox
                    items-center justify-center: centra el contenido
                    shadow-lg: sombra grande */}
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* ========================================
                MENÚ DE USUARIO - Avatar y dropdown
                ======================================== */}
            
            {/* Contenedor relativo para el menú de usuario */}
            <div className="relative">
              
              {/* Botón del avatar de usuario
                  onClick: alterna la visibilidad del menú desplegable
                  flex: layout flexbox
                  items-center: centra verticalmente
                  space-x-2: espacio horizontal de 8px entre elementos
                  p-2: padding de 8px
                  text-white/80: texto blanco con 80% de opacidad
                  hover:text-white: texto blanco completo al hacer hover
                  hover:bg-white/20: fondo blanco con 20% de opacidad al hacer hover
                  rounded-lg: bordes redondeados
                  transition-all duration-200: transición suave de 200ms */}
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                
                {/* Contenedor del avatar
                    w-8 h-8: ancho y alto de 32px
                    bg-white/20: fondo blanco con 20% de opacidad
                    rounded-full: forma circular
                    flex: layout flexbox
                    items-center justify-center: centra el contenido
                    shadow-lg: sombra grande
                    backdrop-blur-sm: efecto de desenfoque del fondo */}
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                  {/* Icono de usuario
                      size={16}: tamaño de 16px
                      text-white: color blanco */}
                  <User size={16} className="text-white" />
                </div>
                
                {/* Texto del nombre de usuario
                    hidden md:block: oculto en móviles, visible en pantallas md y mayores
                    text-sm: tamaño de texto pequeño
                    font-medium: peso de fuente medio
                    text-white: color blanco */}
                <span className="hidden md:block text-sm font-medium text-white">Admin</span>
              </button>

              {/* ========================================
                  MENÚ DESPLEGABLE DEL USUARIO
                  ======================================== */}
              
              {/* Menú desplegable (solo se muestra si showUserMenu es true)
                  absolute: posicionamiento absoluto
                  right-0: alineado a la derecha
                  mt-2: margen superior de 8px
                  w-48: ancho fijo de 192px
                  bg-white: fondo blanco
                  rounded-lg: bordes redondeados
                  shadow-lg: sombra grande
                  border: borde
                  border-gray-200: borde gris claro
                  py-1: padding vertical de 4px
                  z-50: z-index alto para estar por encima de otros elementos */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-[#1e081d]/95 to-[#2a0f29]/90 backdrop-blur-2xl rounded-lg shadow-2xl border border-white/20 py-1 z-50">
                  
                  {/* Información del usuario en la parte superior del menú
                      px-4: padding horizontal de 16px
                      py-2: padding vertical de 8px
                      border-b: borde inferior
                      border-gray-100: borde gris muy claro */}
                  <div className="px-4 py-2 border-b border-white/20">
                    {/* Nombre del usuario
                        text-sm: tamaño de texto pequeño
                        font-medium: peso de fuente medio
                        text-white: color blanco */}
                    <p className="text-sm font-medium text-white">Administrador</p>
                    
                    {/* Email del usuario
                        text-xs: tamaño de texto extra pequeño
                        text-white/70: color blanco con 70% opacidad */}
                    <p className="text-xs text-white/70">admin@kelumy.com</p>
                  </div>
                  
                  {/* Botón de perfil
                      flex: layout flexbox
                      items-center: centra verticalmente
                      w-full: ancho completo
                      px-4: padding horizontal de 16px
                      py-2: padding vertical de 8px
                      text-sm: tamaño de texto pequeño
                      text-gray-700: color gris oscuro
                      hover:bg-gray-100: fondo gris claro al hacer hover */}
                  <button className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                    {/* Icono de usuario
                        size={16}: tamaño de 16px
                        mr-3: margen derecho de 12px */}
                    <User size={16} className="mr-3" />
                    Perfil
                  </button>
                  
                  {/* Botón de configuración
                      flex: layout flexbox
                      items-center: centra verticalmente
                      w-full: ancho completo
                      px-4: padding horizontal de 16px
                      py-2: padding vertical de 8px
                      text-sm: tamaño de texto pequeño
                      text-gray-700: color gris oscuro
                      hover:bg-gray-100: fondo gris claro al hacer hover */}
                  <button className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                    {/* Icono de configuración
                        size={16}: tamaño de 16px
                        mr-3: margen derecho de 12px */}
                    <Settings size={16} className="mr-3" />
                    Configuración
                  </button>
                  
                  {/* Separador horizontal
                      my-1: margen vertical de 4px */}
                  <hr className="my-1" />
                  
                  {/* Botón de cerrar sesión
                      flex: layout flexbox
                      items-center: centra verticalmente
                      w-full: ancho completo
                      px-4: padding horizontal de 16px
                      py-2: padding vertical de 8px
                      text-sm: tamaño de texto pequeño
                      text-red-600: color rojo
                      hover:bg-red-50: fondo rojo muy claro al hacer hover */}
                  <button 
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200"
                  >
                    {/* Icono de cerrar sesión
                        size={16}: tamaño de 16px
                        mr-3: margen derecho de 12px */}
                    <LogOut size={16} className="mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// ========================================
// EXPORTACIÓN - Exporta el componente para uso en otros archivos
// ========================================

// Exporta el componente Navbar como exportación por defecto
// Esto permite importarlo en otros archivos como: import Navbar from './components/Navbar'
// El componente Navbar proporciona la barra de navegación superior con:
// - Controles del sidebar (abrir/cerrar en móvil, expandir/contraer en desktop)
// - Logo y título de KELUMY con efectos visuales
// - Barra de búsqueda centrada con efectos glassmorphism
// - Sistema de notificaciones con badge animado
// - Menú de usuario con avatar y dropdown
// - Funcionalidad de logout integrada
export default Navbar
