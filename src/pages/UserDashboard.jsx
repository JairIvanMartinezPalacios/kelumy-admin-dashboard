// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  BookOpen,        // Icono de libro para cursos
  Trophy,          // Icono de trofeo para logros
  Calendar,        // Icono de calendario para eventos
  MessageCircle,   // Icono de mensaje para chat
  Settings,        // Icono de configuración
  Bell,            // Icono de notificaciones
  User,            // Icono de usuario
  BarChart3,       // Icono de estadísticas
  Award,           // Icono de certificados
  Clock,           // Icono de tiempo
  Target,          // Icono de objetivos
  TrendingUp,      // Icono de progreso
  Star,            // Icono de favoritos
  Download,        // Icono de descarga
  Share2,          // Icono de compartir
  HelpCircle,      // Icono de ayuda
  LogOut           // Icono de cerrar sesión
} from 'lucide-react';
import AnalyticsDashboard from '../components/charts/AnalyticsDashboard';
import { SyncIndicator, SyncNotification } from '../components/shared';
import { UserCourses, UserCertificates, UserSettings } from '../components/user';
import { useAppContext } from '../context/AppContext';

// ========================================
// COMPONENTE USERDASHBOARD - Dashboard principal del usuario
// ========================================

const UserDashboard = ({ user, onLogout }) => {
  // ========================================
  // HOOKS Y CONTEXTO
  // ========================================
  
  const { syncStatus, syncWithServer } = useAppContext();
  
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [activeModule, setActiveModule] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ========================================
  // DATOS ESTÁTICOS - Información del usuario y estadísticas
  // ========================================
  
  // Información del usuario (en un proyecto real vendría de la API)
  const userInfo = {
    name: user?.fullName || 'Usuario',
    email: user?.email || 'usuario@email.com',
    avatar: user?.profilePhoto || null,
    level: 'Intermedio',
    points: 1250,
    streak: 7,
    coursesCompleted: 3,
    coursesInProgress: 2,
    certificates: 1
  };

  // Estadísticas del dashboard
  const stats = [
    {
      title: 'Cursos Completados',
      value: userInfo.coursesCompleted,
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      change: '+2 este mes'
    },
    {
      title: 'Puntos Obtenidos',
      value: userInfo.points,
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      change: '+150 esta semana'
    },
    {
      title: 'Racha Actual',
      value: `${userInfo.streak} días`,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      change: '¡Sigue así!'
    },
    {
      title: 'Certificados',
      value: userInfo.certificates,
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      change: 'Nuevo certificado'
    }
  ];

  // Cursos en progreso
  const coursesInProgress = [
    {
      id: 1,
      title: 'JavaScript Avanzado',
      progress: 65,
      instructor: 'Dr. María González',
      nextLesson: 'Closures y Scope',
      estimatedTime: '2h 30min'
    },
    {
      id: 2,
      title: 'React Hooks Profundo',
      progress: 40,
      instructor: 'Ing. Carlos Ruiz',
      nextLesson: 'useEffect Avanzado',
      estimatedTime: '1h 45min'
    }
  ];

  // Próximos eventos
  const upcomingEvents = [
    {
      id: 1,
      title: 'Webinar: Introducción a TypeScript',
      date: '2024-01-15',
      time: '18:00',
      type: 'webinar'
    },
    {
      id: 2,
      title: 'Examen: JavaScript Avanzado',
      date: '2024-01-18',
      time: '10:00',
      type: 'exam'
    }
  ];

  // ========================================
  // MÓDULOS DEL DASHBOARD - Componentes principales
  // ========================================
  
  const modules = [
    {
      id: 'overview',
      title: 'Resumen',
      icon: BarChart3,
      description: 'Vista general de tu progreso'
    },
    {
      id: 'courses',
      title: 'Mis Cursos',
      icon: BookOpen,
      description: 'Gestiona tus cursos y progreso'
    },
    {
      id: 'certificates',
      title: 'Certificados',
      icon: Award,
      description: 'Tus logros y certificaciones'
    },
    {
      id: 'calendar',
      title: 'Calendario',
      icon: Calendar,
      description: 'Eventos y programación'
    },
    {
      id: 'messages',
      title: 'Mensajes',
      icon: MessageCircle,
      description: 'Comunidad y soporte'
    },
    {
      id: 'settings',
      title: 'Configuración',
      icon: Settings,
      description: 'Perfil y preferencias'
    }
  ];

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // ========================================
  // RENDERIZADO DE MÓDULOS
  // ========================================
  
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return (
          <AnalyticsDashboard 
            userRole="user"
            showAdminMetrics={false}
            onMetricClick={(metric) => {
              console.log('Métrica clickeada:', metric);
              // Aquí se puede implementar navegación a detalles específicos
            }}
          />
        );

      case 'courses':
        return <UserCourses />;

      case 'certificates':
        return <UserCertificates />;

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Calendario</h3>
              <p className="text-white/70">Módulo de calendario en desarrollo...</p>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Mensajes</h3>
              <p className="text-white/70">Módulo de mensajes en desarrollo...</p>
            </div>
          </div>
        );

      case 'settings':
        return <UserSettings />;

      default:
        return null;
    }
  };

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
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
            <h1 className="text-2xl font-bold text-white">KELUMY Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Indicador de sincronización */}
            <SyncIndicator syncStatus={syncStatus} onSync={syncWithServer} />
            
            {/* Notificaciones */}
            <SyncNotification />
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-white font-medium">{userInfo.name}</p>
                <p className="text-white/70 text-sm">{userInfo.level}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <button
              onClick={onLogout}
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
                  onClick={() => handleModuleChange(module.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeModule === module.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="text-left">
                      <p className="font-medium">{module.title}</p>
                      <p className="text-xs opacity-70">{module.description}</p>
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

export default UserDashboard;
