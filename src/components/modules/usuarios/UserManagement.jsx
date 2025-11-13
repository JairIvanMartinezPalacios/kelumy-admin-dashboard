// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejo de estado del componente
import React, { useState } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import {
  Users,           // Icono de usuarios para gestión de usuarios
  Plus,            // Icono de agregar para crear nuevos usuarios
  Search,          // Icono de búsqueda para filtrar usuarios
  Filter,          // Icono de filtros para ordenar y filtrar
  Edit,            // Icono de editar para modificar usuarios
  Trash2,          // Icono de eliminar para borrar usuarios
  Eye,             // Icono de vista para ver detalles
  Shield,          // Icono de roles para gestión de permisos
  Mail,            // Icono de correo para comunicación
  Phone,           // Icono de teléfono para contacto
  Calendar,        // Icono de calendario para fechas
  CheckCircle,     // Icono de activo para usuarios habilitados
  XCircle,         // Icono de inactivo para usuarios deshabilitados
  Crown,           // Icono de admin para administradores
  User,            // Icono de usuario genérico
  GraduationCap,   // Icono de instructor para educadores
  BookOpen,        // Icono de estudiante para aprendices
  MoreVertical,    // Icono de más opciones para menús
  Download,        // Icono de descargar para exportar datos
  Upload           // Icono de subir para importar usuarios
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - UserManagement
// ========================================

// Define el componente funcional UserManagement que gestiona todos los usuarios del sistema
// Incluye funcionalidades para crear, editar, eliminar y administrar usuarios con diferentes roles
const UserManagement = () => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar qué subsección está activa en la interfaz
  // 'students': estudiantes, 'instructors': instructores, 'admins': administradores
  const [activeTab, setActiveTab] = useState('students')
  
  // Estados para funcionalidad de búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('')           // Término de búsqueda por nombre o email
  const [roleFilter, setRoleFilter] = useState('all')        // Filtro por rol: 'all', 'student', 'instructor', 'admin'
  const [statusFilter, setStatusFilter] = useState('all')    // Filtro por estado: 'all', 'active', 'inactive', 'suspended'
  
  // Estados para control de modales y edición
  const [showModal, setShowModal] = useState(false)          // Controla la visibilidad del modal de creación/edición
  const [selectedUser, setSelectedUser] = useState(null)     // Usuario seleccionado para editar o ver detalles
  
  // ========================================
  // DATOS DE EJEMPLO - Usuarios de prueba
  // ========================================
  
  const users = {
    students: [
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+52 55 1234 5678',
        role: 'student',
        status: 'active',
        joinDate: '2024-01-15',
        coursesEnrolled: 3,
        progress: 75,
        lastAccess: '2024-01-20'
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria.garcia@email.com',
        phone: '+52 55 2345 6789',
        role: 'student',
        status: 'active',
        joinDate: '2024-01-10',
        coursesEnrolled: 5,
        progress: 90,
        lastAccess: '2024-01-19'
      },
      {
        id: 3,
        name: 'Carlos López',
        email: 'carlos.lopez@email.com',
        phone: '+52 55 3456 7890',
        role: 'student',
        status: 'inactive',
        joinDate: '2023-12-20',
        coursesEnrolled: 2,
        progress: 45,
        lastAccess: '2024-01-05'
      }
    ],
    instructors: [
      {
        id: 4,
        name: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        phone: '+52 55 4567 8901',
        role: 'instructor',
        status: 'active',
        joinDate: '2023-11-15',
        coursesCreated: 8,
        students: 450,
        rating: 4.9,
        lastAccess: '2024-01-20'
      },
      {
        id: 5,
        name: 'Luis Rodríguez',
        email: 'luis.rodriguez@email.com',
        phone: '+52 55 5678 9012',
        role: 'instructor',
        status: 'active',
        joinDate: '2023-10-20',
        coursesCreated: 12,
        students: 680,
        rating: 4.8,
        lastAccess: '2024-01-19'
      }
    ],
    admins: [
      {
        id: 6,
        name: 'Admin Principal',
        email: 'admin@kelumy.com',
        phone: '+52 55 6789 0123',
        role: 'admin',
        status: 'active',
        joinDate: '2023-01-01',
        permissions: 'full',
        lastAccess: '2024-01-20'
      }
    ]
  }
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  // Función para obtener los colores del badge de estado del usuario
  // Retorna clases CSS de Tailwind para diferentes estados de usuario
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
  
  // Función para obtener el texto del estado en español
  // Convierte el estado técnico a texto legible para el usuario
  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo'        // Usuario habilitado y activo
      case 'inactive': return 'Inactivo'    // Usuario deshabilitado
      case 'pending': return 'Pendiente'    // Usuario en proceso de activación
      default: return 'Desconocido'         // Estado no reconocido
    }
  }
  
  // Función para obtener el icono correspondiente al estado del usuario
  // Retorna el componente de icono apropiado para cada estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle     // Icono de check para activo
      case 'inactive': return XCircle       // Icono de X para inactivo
      case 'pending': return Clock          // Icono de reloj para pendiente
      default: return Clock                 // Por defecto reloj
    }
  }
  
  // Función para obtener el icono correspondiente al rol del usuario
  // Retorna el componente de icono apropiado para cada rol
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return Crown            // Icono de corona para administradores
      case 'instructor': return GraduationCap // Icono de graduación para instructores
      case 'student': return BookOpen       // Icono de libro para estudiantes
      default: return User                  // Por defecto usuario genérico
    }
  }
  
  // Función para obtener los colores del badge de rol del usuario
  // Retorna clases CSS de Tailwind para diferentes roles
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-100'        // Púrpura para administradores
      case 'instructor': return 'text-blue-600 bg-blue-100'       // Azul para instructores
      case 'student': return 'text-green-600 bg-green-100'        // Verde para estudiantes
      default: return 'text-gray-600 bg-gray-100'                 // Gris por defecto
    }
  }
  
  // Función para obtener el texto del rol en español
  // Convierte el rol técnico a texto legible para el usuario
  const getRoleText = (role) => {
    switch (role) {
      case 'admin': return 'Administrador'
      case 'instructor': return 'Instructor'
      case 'student': return 'Estudiante'
      default: return 'Usuario'
    }
  }
  
  // Función para filtrar usuarios según los criterios de búsqueda y filtros aplicados
  // Combina búsqueda por texto, filtro por rol y filtro por estado
  const getFilteredUsers = () => {
    const currentUsers = users[activeTab] || []  // Obtiene los usuarios de la pestaña activa
    return currentUsers.filter(user => {
      // Verifica si el término de búsqueda coincide con nombre o email
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      // Verifica si el rol coincide con el filtro seleccionado
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      // Verifica si el estado coincide con el filtro seleccionado
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      // Retorna true si todos los filtros coinciden
      return matchesSearch && matchesRole && matchesStatus
    })
  }
  
  // ========================================
  // COMPONENTES INTERNOS - Subcomponentes
  // ========================================
  
  // Componente interno para renderizar la lista de usuarios con filtros aplicados
  // Incluye barra de búsqueda, filtros y tabla de usuarios
  const UserList = () => {
    const filteredUsers = getFilteredUsers()  // Obtiene usuarios filtrados según criterios actuales
    
    return (
      <div className="space-y-4">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="instructor">Instructores</option>
            <option value="student">Estudiantes</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>
        
        {/* Lista de usuarios */}
        <div className="grid gap-4">
          {filteredUsers.map((user) => {
            const StatusIcon = getStatusIcon(user.status)
            const RoleIcon = getRoleIcon(user.role)
            
            return (
              <div key={user.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    {/* Información del usuario */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          <RoleIcon size={12} className="inline mr-1" />
                          {getRoleText(user.role)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          <StatusIcon size={12} className="inline mr-1" />
                          {getStatusText(user.status)}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <Mail size={14} />
                          {user.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={14} />
                          {user.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar size={14} />
                          Se unió: {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                        {user.role === 'student' && (
                          <>
                            <p>Cursos inscritos: {user.coursesEnrolled}</p>
                            <p>Progreso promedio: {user.progress}%</p>
                          </>
                        )}
                        {user.role === 'instructor' && (
                          <>
                            <p>Cursos creados: {user.coursesCreated}</p>
                            <p>Estudiantes: {user.students}</p>
                            <p>Calificación: ⭐ {user.rating}</p>
                          </>
                        )}
                        <p>Último acceso: {new Date(user.lastAccess).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Acciones */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setShowModal(true)
                      }}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar usuario"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar usuario"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Más opciones"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  // ========================================
  // CONFIGURACIÓN DE PESTAÑAS - Navegación
  // ========================================
  
  const tabs = [
    { id: 'students', label: 'Estudiantes', icon: BookOpen, count: users.students.length },
    { id: 'instructors', label: 'Instructores', icon: GraduationCap, count: users.instructors.length },
    { id: 'admins', label: 'Administradores', icon: Crown, count: users.admins.length }
  ]
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Gestión de Usuarios y Roles</h1>
        <p className="text-gray-600">Administra usuarios, permisos y roles del sistema</p>
      </div>
      
      {/* Botones de acción */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Agregar Usuario
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <Download size={20} />
          Exportar Lista
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <Upload size={20} />
          Importar Usuarios
        </button>
      </div>
      
      {/* Navegación por pestañas */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                  <span className="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* Contenido de las pestañas */}
      <div className="min-h-96">
        <UserList />
      </div>
    </div>
  )
}

export default UserManagement
