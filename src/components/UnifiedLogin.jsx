// ========================================
// UNIFIED LOGIN - Login unificado para admins y estudiantes
// ========================================
// Componente que permite elegir entre login de admin o estudiante

import React, { useState } from 'react'
import { 
  Shield, 
  GraduationCap, 
  ArrowRight, 
  Users, 
  Settings,
  BookOpen,
  BarChart3
} from 'lucide-react'

const UnifiedLogin = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: 'admin',
      title: 'Administrador',
      description: 'Panel de administración completo con todas las funcionalidades',
      icon: Shield,
      color: 'purple',
      features: [
        'Gestión de usuarios y cursos',
        'Analíticas y reportes',
        'Configuración del sistema',
        'Mockups y pruebas'
      ],
      loginComponent: 'LoginPage'
    },
    {
      id: 'student',
      title: 'Estudiante',
      description: 'Plataforma educativa STEM para jóvenes y docentes',
      icon: GraduationCap,
      color: 'blue',
      features: [
        'Cursos de ciencias y tecnología',
        'Proyectos prácticos',
        'Certificaciones digitales',
        'Gamificación'
      ],
      loginComponent: 'StudentLoginPage'
    }
  ]

  const handleRoleSelection = (role) => {
    setSelectedRole(role)
    // Importar dinámicamente el componente de login correspondiente
    import(`../pages/${role.loginComponent}`).then((module) => {
      const LoginComponent = module.default
      onLogin(LoginComponent)
    })
  }

  if (selectedRole) {
    return null // El componente de login seleccionado se renderizará en App.tsx
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-4 bg-white/20 rounded-2xl">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Kelumy</h1>
          </div>
          <p className="text-xl text-white/80 mb-4">
            Plataforma Educativa STEM para Jóvenes y Docentes
          </p>
          <p className="text-white/60">
            Selecciona tu tipo de usuario para acceder
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelection(role)}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 group`}
              >
                <div className="text-center space-y-6">
                  <div className={`p-4 bg-${role.color}-500/20 rounded-2xl mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-12 h-12 text-${role.color}-400`} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {role.title}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {role.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-white/80">
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full bg-${role.color}-600 hover:bg-${role.color}-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg`}>
                    <span>Acceder como {role.title}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="text-lg font-semibold text-white mb-3">Cuentas de Prueba Disponibles</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium text-white">Admin Principal</div>
                <div className="text-white/60">contacto.jairivan@gmail.com</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium text-white">Admin</div>
                <div className="text-white/60">admin@gmail.com</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium text-white">Estudiante</div>
                <div className="text-white/60">alumno@gmail.com</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium text-white">Prueba</div>
                <div className="text-white/60">prueba@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnifiedLogin
