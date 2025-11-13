// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y los hooks necesarios para manejar el estado del componente
import React, { useState } from 'react'

// Importa el componente RegistrationForm desde la carpeta components/forms
// Este componente maneja el formulario de registro de nuevos usuarios
import RegistrationForm from '../components/forms/RegistrationForm'

// Importa el componente StudentLoginPage para acceso directo de estudiantes
import StudentLoginPage from './StudentLoginPage'

// Importa iconos de lucide-react para la interfaz
import { 
  GraduationCap, 
  Users, 
  Award, 
  TrendingUp, 
  Eye, 
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - LoginPage
// ========================================

// Define el componente funcional LoginPage que maneja la autenticación
// Recibe onLogin como prop para notificar cuando el login es exitoso
function LoginPage({ onLogin }) {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar si se muestra el login principal o el de estudiantes
  // true = login principal, false = login de estudiantes
  const [showStudentLogin, setShowStudentLogin] = useState(false)
  
  // Estado para controlar si se muestra el formulario de login o registro
  // true = registro, false = login
  const [isLogin, setIsLogin] = useState(true)
  
  // Estado para controlar la visibilidad de la contraseña
  // true = visible, false = oculta
  const [showPassword, setShowPassword] = useState(false)
  
  // Estado para controlar si se está cargando (durante el proceso de login)
  const [isLoading, setIsLoading] = useState(false)
  
  // Estado para controlar la animación de redirección al dashboard
  const [isRedirecting, setIsRedirecting] = useState(false)
  
  // Estado para controlar el progreso de la redirección (0-100)
  const [redirectProgress, setRedirectProgress] = useState(0)
  
  // Estado para mostrar mensaje de bienvenida después del login
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  
  // ========================================
  // DATOS DEL FORMULARIO - Estado del formulario
  // ========================================
  
  // Estado para almacenar los datos del formulario de login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Estado para almacenar los datos del formulario de registro
  const [registrationData, setRegistrationData] = useState({
    email: '',
    fullName: '',
    lastName: '',
    country: '',
    state: '',
    phone: '',
    academicLevel: '',
    currentGrade: '',
    countryChange: '',
    expectations: '',
    password: '',
    confirmPassword: ''
  })

  // ========================================
  // DATOS ESTÁTICOS - Información fija del componente
  // ========================================
  
  // Array de características de KELUMY para mostrar en el panel izquierdo
  const features = [
    {
      icon: GraduationCap,
      title: 'Cursos Especializados',
      description: 'Contenido educativo de alta calidad',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Conecta con otros estudiantes',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Certificaciones',
      description: 'Certifica tus conocimientos',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Progreso Personalizado',
      description: 'Aprende a tu ritmo',
      color: 'from-orange-500 to-red-500'
    }
  ]

  // Estadísticas de KELUMY para mostrar en el panel izquierdo
  const stats = [
    { number: '10K+', label: 'Estudiantes Activos' },
    { number: '500+', label: 'Cursos Disponibles' },
    { number: '95%', label: 'Satisfacción' },
    { number: '24/7', label: 'Soporte' }
  ]

  // ========================================
  // FUNCIONES - Funciones del componente
  // ========================================
  
  // Función para manejar cambios en los campos del formulario de login
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Función para manejar cambios en los campos del formulario de registro
  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Función para manejar el envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Importar loginUser dinámicamente
      const { loginUser } = await import('../services/authService')
      
      // Intentar login con email y contraseña (o sin contraseña)
      const user = await loginUser(formData.email, formData.password || '0')
      
      // Iniciar animación de redirección
      handleRedirectToDashboard()
    } catch (error) {
      console.error('Login error:', error)
      // Iniciar animación de redirección de todas formas
      handleRedirectToDashboard()
    }
  }

  // Función para manejar login con Google
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    // Simular proceso de login con Google
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Iniciar animación de redirección
    handleRedirectToDashboard()
  }

  // Función para manejar login con Facebook
  const handleFacebookLogin = async () => {
    setIsLoading(true)
    
    // Simular proceso de login con Facebook
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Iniciar animación de redirección
    handleRedirectToDashboard()
  }

  // Función para manejar login con Apple
  const handleAppleLogin = async () => {
    setIsLoading(true)
    
    // Simular proceso de login con Apple
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Iniciar animación de redirección
    handleRedirectToDashboard()
  }

  // Función para manejar la animación de redirección al dashboard
  const handleRedirectToDashboard = () => {
    setIsLoading(false)
    setIsRedirecting(true)
    
    // Simular progreso de redirección
    const interval = setInterval(() => {
      setRedirectProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowWelcomeMessage(true)
          
          // Mostrar mensaje de bienvenida por 5 segundos
          setTimeout(() => {
            setShowWelcomeMessage(false)
            onLogin() // Llamar a la función onLogin para cambiar al dashboard
          }, 5000)
          
          return 100
        }
        return prev + 2
      })
    }, 80)
  }

  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================

  // Si se debe mostrar el login de estudiantes, renderizar StudentLoginPage
  if (showStudentLogin) {
    return <StudentLoginPage onLogin={onLogin} />
  }

  return (
    // Contenedor principal con fondo degradado y efectos visuales
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Efectos de fondo - Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden login-particles">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-bounce" style={{animation: 'bounce 1s infinite'}}></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-cyan-400 rounded-full opacity-30 animate-ping" style={{animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-50 animate-pulse" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
      </div>

      {/* Contenedor principal del login */}
      <div className="relative z-10 w-full max-w-4xl">
        
        {/* Layout de dos columnas */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* ========================================
              PANEL IZQUIERDO - Información de KELUMY
              ======================================== */}
          
          {/* Panel izquierdo con información de KELUMY (oculto en móviles) */}
          <div className="hidden lg:block space-y-8">
            
            {/* Logo y título principal */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                  <img 
                    src="/img/logo_kelumi.png" 
                  alt="KELUMY Logo" 
                  className="w-12 h-12 mr-3"
                />
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                  KELUMY
                </h1>
              </div>
              <p className="text-xl text-white/80 mb-8 drop-shadow-sm">
                Tu plataforma de aprendizaje en línea
              </p>
                </div>

            {/* Características de KELUMY */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                      <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-sm">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 text-sm drop-shadow-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
                </div>

            {/* Estadísticas de KELUMY */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    {stat.number}
                  </div>
                  <div className="text-xs text-white/60 drop-shadow-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================
              PANEL DERECHO - Formulario de Login/Registro
              ======================================== */}
          
          {/* Panel derecho con el formulario (ocupa todo el ancho en móviles) */}
          <div className="lg:col-span-1 col-span-full">
            
            {/* Contenedor del formulario con efectos glassmorphism */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              
              {/* Título del formulario */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>
                <p className="text-white/70 drop-shadow-sm">
                  {isLogin ? 'Bienvenido de vuelta' : 'Únete a la comunidad KELUMY'}
                </p>
              </div>

              {/* Formulario de Login */}
                {isLogin ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Campo de email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90 drop-shadow-sm">
                      Email
                      </label>
                      <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                  {/* Campo de contraseña */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90 drop-shadow-sm">
                        Contraseña
                      </label>
                      <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="Contraseña (opcional - dejar vacío o escribir '0')"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    </div>

                  {/* Botón de login */}
                    <button
                      type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Iniciando sesión...</span>
                      </div>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </button>

                  {/* Botones de login social */}
                  <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                  </div>
                        <div className="relative flex justify-center text-sm mb-4">
                          <span className="px-2 bg-transparent text-white/60">O continúa con</span>
                  </div>
                </div>

                    <div className="grid grid-cols-3 gap-3">
                  <button 
                        type="button"
                    onClick={() => setFormData({ email: 'admin@gmail.com', password: '0' })}
                    disabled={isLoading}
                        className="flex items-center justify-center p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>

                  <button 
                        type="button"
                    onClick={() => setFormData({ email: 'alumno@gmail.com', password: '0' })}
                    disabled={isLoading}
                        className="flex items-center justify-center p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                        <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  <button 
                        type="button"
                    onClick={() => setFormData({ email: 'prueba@gmail.com', password: '0' })}
                    disabled={isLoading}
                        className="flex items-center justify-center p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </button>
                </div>
              </div>

                  {/* Enlace para cambiar a registro */}
                  <div className="text-center">
                <button
                  type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                >
                      ¿No tienes cuenta? <span className="text-purple-300 font-medium">Crear cuenta</span>
                </button>
              </div>

                  {/* Botón para acceso de estudiantes */}
                  <div className="text-center pt-4 border-t border-white/20">
                <button
                  type="button"
                      onClick={() => setShowStudentLogin(true)}
                      className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-lg"
                >
                      <div className="flex items-center justify-center space-x-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>Acceso para Estudiantes</span>
                      </div>
                </button>
              </div>
                </form>
              ) : (
                /* Formulario de Registro */
                <RegistrationForm 
                  formData={registrationData}
                  handleInputChange={handleRegistrationInputChange}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  onLogin={handleRedirectToDashboard}
                  onBackToLogin={() => setIsLogin(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay de Redirección */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl max-w-md w-full mx-4 text-center">
            {/* Logo KELUMY */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg animate-spin">
                <img 
                  src="/img/logo_kelumi.png" 
                  alt="KELUMY Logo" 
                  className="w-10 h-10"
                />
              </div>
            </div>

            {/* Título */}
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
              Redirigiendo...
            </h3>
            <p className="text-white/80 mb-6 drop-shadow-sm">
              Preparando tu dashboard
            </p>

            {/* Barra de progreso */}
            <div className="w-full bg-white/20 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${redirectProgress}%` }}
              ></div>
            </div>

            {/* Porcentaje */}
            <p className="text-white/60 text-sm drop-shadow-sm">
              {redirectProgress}%
            </p>
          </div>
        </div>
      )}

      {/* Overlay de Mensaje de Bienvenida */}
      {showWelcomeMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl max-w-md w-full mx-4 text-center">
            {/* Logo KELUMY */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                <img 
                  src="/img/logo_kelumi.png" 
                  alt="KELUMY Logo" 
                  className="w-12 h-12"
                />
              </div>
            </div>

            {/* Título */}
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              ¡Bienvenido a KELUMY!
            </h3>
            <p className="text-white/80 mb-6 drop-shadow-sm">
              Tu viaje de aprendizaje comienza ahora
            </p>

            {/* Iconos de características */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Mensaje */}
            <p className="text-white/60 text-sm drop-shadow-sm">
              Cargando tu experiencia personalizada...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ========================================
// EXPORTACIÓN - Exporta el componente para uso en otros archivos
// ========================================

// Exporta el componente LoginPage como exportación por defecto
// Esto permite importarlo en otros archivos como: import LoginPage from './LoginPage'
export default LoginPage
