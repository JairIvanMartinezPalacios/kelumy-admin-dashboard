// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejar el estado del componente
import { useState } from 'react'

// Importa los componentes de páginas
import Dashboard from './components/Dashboard'
import StudentDashboardWrapper from './components/user/StudentDashboardWrapper'
import LoginPage from './pages/LoginPage'

// Importa el contexto global de la aplicación
import { AppProvider } from './context/AppContext'

// Importa el servicio de autenticación
import { 
  isAuthenticated, 
  getCurrentUser, 
  getCurrentUserRole,
  isAdmin
} from './services/authService'

// ========================================
// COMPONENTE PRINCIPAL - App
// ========================================

// Define el componente funcional App que es el componente raíz de la aplicación
function App() {

  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================

  // Estado para controlar si el usuario está autenticado
  const [authState, setAuthState] = useState(() => {
    if (typeof window !== 'undefined') {
      const isAuth = isAuthenticated()
      const user = getCurrentUser()
      const role = getCurrentUserRole()
      return {
        isAuthenticated: isAuth,
        user: user,
        role: role
      }
    }
    return {
      isAuthenticated: false,
      user: null,
      role: null
    }
  })


  // ========================================
  // FUNCIONES - Funciones del componente
  // ========================================
  
  // Función para manejar el login exitoso
  const handleLogin = () => {
    const isAuth = isAuthenticated()
    const user = getCurrentUser()
    const role = getCurrentUserRole()
    
    setAuthState({
      isAuthenticated: isAuth,
      user: user,
      role: role
    })
  }

  // Función para manejar el logout
  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null
    })
  }

  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================

  // Si el usuario no está autenticado, mostrar el login principal por defecto
  if (!authState.isAuthenticated) {
    return (
      <AppProvider>
        <LoginPage onLogin={handleLogin} />
      </AppProvider>
    )
  }

  // Si el usuario está autenticado, mostrar el dashboard correspondiente según su rol
  return (
    <AppProvider>
      {isAdmin() ? (
        <Dashboard user={authState.user} onLogout={handleLogout} />
      ) : (
        <StudentDashboardWrapper user={authState.user} onLogout={handleLogout} />
      )}
    </AppProvider>
  )
}

// ========================================
// EXPORTACIÓN - Exporta el componente para uso en otros archivos
// ========================================

// Exporta el componente App como exportación por defecto
// Esto permite importarlo en otros archivos como: import App from './App'
export default App
