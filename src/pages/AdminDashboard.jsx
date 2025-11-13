// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  Users,          // Icono de usuarios
  BookOpen,       // Icono de cursos
  DollarSign,     // Icono de dinero
  BarChart3,      // Icono de estadísticas
  Settings,       // Icono de configuración
  Shield,         // Icono de administración
  TrendingUp,     // Icono de tendencia
  Activity,       // Icono de actividad
  Award,          // Icono de certificados
  Calendar,       // Icono de calendario
  Mail,           // Icono de correo
  Bell,           // Icono de notificaciones
  LogOut,         // Icono de cerrar sesión
  User,           // Icono de usuario
  Plus,           // Icono de agregar
  Edit,           // Icono de editar
  Trash2,         // Icono de eliminar
  Eye,            // Icono de ver
  Download,       // Icono de descargar
  TestTube        // Icono de pruebas
} from 'lucide-react';

import AnalyticsDashboard from '../components/charts/AnalyticsDashboard';
import { SyncIndicator, SyncNotification } from '../components/shared';
import { AdminCourseManager } from '../components/admin';
import PruebasMockups from '../components/PruebasMockups';
import { useAppContext } from '../context/AppContext';
import { 
  getCurrentUser, 
  getCurrentUserRole, 
  logoutUser,
  getUsers,
  promoteToAdmin,
  demoteFromAdmin,
  deleteUser
} from '../services/authService';

// ========================================
// COMPONENTE ADMINDASHBOARD - Dashboard para administradores
// ========================================

const AdminDashboard = ({ onLogout }) => {
  // ========================================
  // HOOKS Y CONTEXTO
  // ========================================
  
  const { syncStatus, syncWithServer } = useAppContext();
  
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [activeModule, setActiveModule] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ========================================
  // MÓDULOS DEL DASHBOARD DE ADMIN
  // ========================================
  
  const modules = [
    {
      id: 'overview',
      label: 'Resumen',
      icon: BarChart3,
      description: 'Vista general de la plataforma'
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: Users,
      description: 'Gestión de usuarios y roles'
    },
    {
      id: 'courses',
      label: 'Cursos',
      icon: BookOpen,
      description: 'Administración de cursos'
    },
    {
      id: 'analytics',
      label: 'Analíticas',
      icon: TrendingUp,
      description: 'Estadísticas y reportes'
    },
    {
      id: 'certificates',
      label: 'Certificados',
      icon: Award,
      description: 'Gestión de certificaciones'
    },
    {
      id: 'calendar',
      label: 'Calendario',
      icon: Calendar,
      description: 'Eventos y programación'
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: Bell,
      description: 'Sistema de notificaciones'
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: Settings,
      description: 'Configuración del sistema'
    },
    {
      id: 'pruebas',
      label: 'Pruebas & Mockups',
      icon: TestTube,
      description: 'Mockups y pruebas de funcionalidades'
    }
  ];

  // ========================================
  // EFECTOS
  // ========================================
  
  useEffect(() => {
    const user = getCurrentUser();
    const role = getCurrentUserRole();
    
    if (!user || !role || role !== 'admin') {
      // Si no es admin, redirigir al login
      window.location.href = '/login';
      return;
    }
    
    setCurrentUser(user);
    setUserRole(role);
    loadUsers();
  }, []);

  // ========================================
  // FUNCIONES
  // ========================================
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    logoutUser();
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteUser = async (userId) => {
    try {
      const success = await promoteToAdmin(userId);
      if (success) {
        loadUsers(); // Recargar lista de usuarios
        alert('Usuario promovido a administrador exitosamente');
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Error al promover usuario');
    }
  };

  const handleDemoteUser = async (userId) => {
    try {
      const success = await demoteFromAdmin(userId);
      if (success) {
        loadUsers(); // Recargar lista de usuarios
        alert('Administrador degradado a usuario exitosamente');
      }
    } catch (error) {
      console.error('Error demoting user:', error);
      alert('Error al degradar administrador');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        const success = await deleteUser(userId);
        if (success) {
          loadUsers(); // Recargar lista de usuarios
          alert('Usuario eliminado exitosamente');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error al eliminar usuario');
      }
    }
  };

  // ========================================
  // RENDERIZADO DE MÓDULOS
  // ========================================
  
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Estadísticas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Usuarios</p>
                    <p className="text-2xl font-bold text-white mt-1">{users.length}</p>
                    <p className="text-green-400 text-sm mt-1">+12 este mes</p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Cursos Activos</p>
                    <p className="text-2xl font-bold text-white mt-1">24</p>
                    <p className="text-green-400 text-sm mt-1">+3 este mes</p>
                  </div>
                  <div className="p-3 bg-purple-500/20 rounded-full">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Ingresos Mensuales</p>
                    <p className="text-2xl font-bold text-white mt-1">$45,000</p>
                    <p className="text-green-400 text-sm mt-1">+23% este mes</p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Tasa de Completación</p>
                    <p className="text-2xl font-bold text-white mt-1">78.5%</p>
                    <p className="text-green-400 text-sm mt-1">+5% este mes</p>
                  </div>
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <Activity className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Actividad reciente */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <User className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Nuevo usuario registrado</p>
                      <p className="text-white/70 text-sm">Juan Pérez se registró hace 2 horas</p>
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">Hace 2h</span>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Nuevo curso publicado</p>
                      <p className="text-white/70 text-sm">"JavaScript Avanzado" por Dr. María González</p>
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">Hace 4h</span>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Award className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Certificado emitido</p>
                      <p className="text-white/70 text-sm">Ana Martínez completó "React Fundamentals"</p>
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">Hace 6h</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gestión de Usuarios</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                <Plus className="w-4 h-4" />
                Agregar Usuario
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Lista de Usuarios</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Buscar usuarios..."
                      className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white hover:bg-white/20 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white/70">Cargando usuarios...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4 text-white/80">Usuario</th>
                          <th className="text-left py-3 px-4 text-white/80">Email</th>
                          <th className="text-left py-3 px-4 text-white/80">Rol</th>
                          <th className="text-left py-3 px-4 text-white/80">Registro</th>
                          <th className="text-left py-3 px-4 text-white/80">Estado</th>
                          <th className="text-left py-3 px-4 text-white/80">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    {user.fullName?.charAt(0) || 'U'}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-white font-medium">{user.fullName}</p>
                                  <p className="text-white/60 text-sm">{user.lastName}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-white/80">{user.email}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-red-500/20 text-red-400' 
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-white/70 text-sm">
                                {new Date(user.created_at).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.is_active 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {user.is_active ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                {user.role === 'user' ? (
                                  <button 
                                    onClick={() => handlePromoteUser(user.id)}
                                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                                    title="Promover a Admin"
                                  >
                                    <Shield className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => handleDemoteUser(user.id)}
                                    className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg transition-colors"
                                    title="Degradar a Usuario"
                                  >
                                    <User className="w-4 h-4" />
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                  title="Eliminar Usuario"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'courses':
        return <AdminCourseManager />;

      case 'analytics':
        return (
          <AnalyticsDashboard 
            userRole="admin"
            showAdminMetrics={true}
            onMetricClick={(metric) => console.log('Admin metric clicked:', metric)}
          />
        );

      case 'certificates':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Gestión de Certificados</h3>
            <p className="text-white/70">Módulo de certificados en desarrollo...</p>
          </div>
        );

      case 'calendar':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Calendario de Eventos</h3>
            <p className="text-white/70">Módulo de calendario en desarrollo...</p>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Sistema de Notificaciones</h3>
            <p className="text-white/70">Módulo de notificaciones en desarrollo...</p>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Configuración del Sistema</h3>
            <p className="text-white/70">Módulo de configuración en desarrollo...</p>
          </div>
        );

      case 'pruebas':
        return (
          <div className="w-full">
            <PruebasMockups />
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
  if (!currentUser || userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Verificando permisos de administrador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-purple-300 transition-colors"
            >
              <BarChart3 className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-white">KELUMY Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Indicador de sincronización */}
            <SyncIndicator syncStatus={syncStatus} onSync={syncWithServer} />
            
            {/* Notificaciones */}
            <SyncNotification />
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-white font-medium">{currentUser.fullName}</p>
                <p className="text-white/70 text-sm">Administrador</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 transition-colors"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white/10 backdrop-blur-sm border-r border-white/20 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <nav className="p-4 space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                    activeModule === module.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <div>
                      <p className="font-medium">{module.label}</p>
                      <p className="text-xs opacity-80">{module.description}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          {renderModuleContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
