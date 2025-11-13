// ========================================
// STUDENT DASHBOARD WRAPPER - Wrapper para Dashboard de Estudiantes
// ========================================
// Componente que combina el sidebar de estudiantes con el UserDashboard.jsx

import React, { useState } from 'react'
import UserDashboard from '../../pages/UserDashboard'
import { 
  Home,
  BookOpen,
  Trophy,
  Calendar,
  MessageCircle,
  Settings,
  Bell,
  LogOut,
  User
} from 'lucide-react'

const StudentDashboardWrapper = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState('overview')

  // Opciones del sidebar para estudiantes (7 opciones)
  const sidebarOptions = [
    { id: 'overview', label: 'Inicio', icon: Home },
    { id: 'courses', label: 'Mis Cursos', icon: BookOpen },
    { id: 'certificates', label: 'Certificados', icon: Trophy },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'messages', label: 'Mensajes', icon: MessageCircle },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 min-h-screen">
          <div className="p-6">
            {/* Logo y título */}
            <div className="flex items-center mb-8">
              <img 
                src="/img/logo_kelumi.png" 
                alt="KELUMY Logo" 
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-xl font-bold text-white">KELUMY</h1>
            </div>

            {/* Información del usuario */}
            <div className="mb-6 p-3 bg-white/10 rounded-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user?.fullName || 'Estudiante'}</p>
                  <p className="text-xs text-white/70">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Opciones del sidebar */}
            <nav className="space-y-2">
              {sidebarOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.id}
                    onClick={() => setActiveModule(option.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeModule === option.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Botón de logout */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-200 border border-red-500/30"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          <UserDashboard user={user} onLogout={onLogout} />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardWrapper
