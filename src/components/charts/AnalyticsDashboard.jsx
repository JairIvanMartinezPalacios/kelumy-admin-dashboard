// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  BarChart3,      // Icono de gráfico de barras
  TrendingUp,     // Icono de tendencia
  Users,          // Icono de usuarios
  DollarSign,     // Icono de dinero
  Award,          // Icono de premio
  Activity,       // Icono de actividad
  Clock,          // Icono de tiempo
  Star,           // Icono de estrella
  Eye,            // Icono de visualizaciones
  Download,       // Icono de descarga
  RefreshCw,      // Icono de actualizar
  Calendar,       // Icono de calendario
  Filter,         // Icono de filtro
  Settings        // Icono de configuración
} from 'lucide-react';

import MetricCard, { 
  RevenueMetricCard, 
  UserMetricCard, 
  CourseMetricCard, 
  PerformanceMetricCard 
} from './MetricCard';
import ProgressBar, { CircularProgressBar, MultiProgressBar } from './ProgressBar';
import SimpleChart from './SimpleChart';
import { useAppContext } from '../../context/AppContext';
import { 
  formatNumber, 
  formatCurrency, 
  formatPercentage,
  calculateStats,
  groupDataByPeriod,
  calculatePercentageChange
} from '../../utils/chartUtils';

// ========================================
// COMPONENTE ANALYTICSDASHBOARD - Dashboard de analíticas reutilizable
// ========================================

const AnalyticsDashboard = ({ 
  userRole = 'user',     // Rol del usuario ('user' o 'admin')
  showAdminMetrics = false, // Mostrar métricas de administrador
  onMetricClick,         // Función de click en métricas
  className = ''         // Clases CSS adicionales
}) => {
  
  // ========================================
  // HOOKS Y CONTEXTO
  // ========================================
  
  const { courses, certificates, notifications, syncStatus } = useAppContext();
  
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  // ========================================
  // DATOS ESTÁTICOS - Datos de ejemplo para las métricas
  // ========================================
  
  const [analyticsData] = useState({
    overview: {
      totalStudents: 1250,
      activeStudents: 890,
      completionRate: 78.5,
      averageRating: 4.8,
      totalRevenue: 45000,
      monthlyRevenue: 8500,
      totalCourses: courses.length || 24,
      publishedCourses: 18,
      pendingCourses: 6
    },
    enrollment: {
      daily: [
        { date: '2024-01-01', count: 12 },
        { date: '2024-01-02', count: 18 },
        { date: '2024-01-03', count: 15 },
        { date: '2024-01-04', count: 22 },
        { date: '2024-01-05', count: 28 },
        { date: '2024-01-06', count: 35 },
        { date: '2024-01-07', count: 42 }
      ]
    },
    revenue: {
      bySource: [
        { source: 'Directo', amount: 25000, percentage: 55.6 },
        { source: 'Google Ads', amount: 12000, percentage: 26.7 },
        { source: 'Redes Sociales', amount: 5000, percentage: 11.1 },
        { source: 'Referidos', amount: 3000, percentage: 6.7 }
      ]
    },
    engagement: {
      averageTimeSpent: '2h 45m',
      completionRate: 78.5,
      dropOffPoints: [
        { lesson: 'Lección 3', dropOffRate: 15.2 },
        { lesson: 'Lección 7', dropOffRate: 22.8 },
        { lesson: 'Lección 12', dropOffRate: 18.5 }
      ],
      mostWatchedLessons: [
        { title: 'Introducción a React', views: 1200, completion: 95 },
        { title: 'Componentes Funcionales', views: 1100, completion: 88 },
        { title: 'Hooks en React', views: 1050, completion: 82 }
      ]
    },
    demographics: {
      ageGroups: [
        { range: '18-25', count: 320, percentage: 25.6 },
        { range: '26-35', count: 450, percentage: 36.0 },
        { range: '36-45', count: 280, percentage: 22.4 },
        { range: '46+', count: 200, percentage: 16.0 }
      ],
      countries: [
        { country: 'México', count: 450, percentage: 36.0 },
        { country: 'España', count: 280, percentage: 22.4 },
        { country: 'Argentina', count: 200, percentage: 16.0 },
        { country: 'Colombia', count: 150, percentage: 12.0 },
        { country: 'Otros', count: 170, percentage: 13.6 }
      ]
    }
  });

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const handleRefresh = async () => {
    setLoading(true);
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleExport = () => {
    console.log('Exportando datos de analíticas...');
    // Implementar exportación de datos
  };

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    if (onMetricClick) {
      onMetricClick(metric);
    }
  };

  // ========================================
  // EFECTOS
  // ========================================
  
  useEffect(() => {
    // Simular carga inicial de datos
    handleRefresh();
  }, [timeRange]);

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con controles */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {userRole === 'admin' ? 'Analíticas de la Plataforma' : 'Mi Progreso'}
          </h2>
          <p className="text-white/70">
            {userRole === 'admin' 
              ? 'Métricas de rendimiento y engagement de estudiantes' 
              : 'Sigue tu progreso y logros en la plataforma'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
          >
            <option value="7d" className="bg-gray-800">Últimos 7 días</option>
            <option value="30d" className="bg-gray-800">Últimos 30 días</option>
            <option value="90d" className="bg-gray-800">Últimos 90 días</option>
            <option value="1y" className="bg-gray-800">Último año</option>
          </select>
          
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
          
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2"
          >
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userRole === 'admin' && showAdminMetrics ? (
          <>
            <CourseMetricCard
              title="Total Cursos"
              value={formatNumber(analyticsData.overview.totalCourses)}
              change={12.5}
              loading={loading}
              onClick={() => handleMetricClick('courses')}
            />
            <UserMetricCard
              title="Total Estudiantes"
              value={formatNumber(analyticsData.overview.totalStudents)}
              change={8.3}
              loading={loading}
              onClick={() => handleMetricClick('students')}
            />
            <PerformanceMetricCard
              title="Tasa de Finalización"
              value={formatPercentage(analyticsData.overview.completionRate)}
              change={5.2}
              loading={loading}
              onClick={() => handleMetricClick('completion')}
            />
            <RevenueMetricCard
              title="Ingresos Totales"
              value={formatCurrency(analyticsData.overview.totalRevenue)}
              change={23.1}
              loading={loading}
              onClick={() => handleMetricClick('revenue')}
            />
          </>
        ) : (
          <>
            <CourseMetricCard
              title="Cursos Completados"
              value={formatNumber(3)}
              change={2}
              loading={loading}
              onClick={() => handleMetricClick('completed')}
            />
            <PerformanceMetricCard
              title="Puntos Obtenidos"
              value={formatNumber(1250)}
              change={150}
              loading={loading}
              onClick={() => handleMetricClick('points')}
            />
            <PerformanceMetricCard
              title="Racha Actual"
              value="7 días"
              change={1}
              loading={loading}
              onClick={() => handleMetricClick('streak')}
            />
            <RevenueMetricCard
              title="Certificados"
              value={formatNumber(1)}
              change={1}
              loading={loading}
              onClick={() => handleMetricClick('certificates')}
            />
          </>
        )}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de inscripciones */}
        <SimpleChart
          data={analyticsData.enrollment.daily.map(item => ({
            label: new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
            value: item.count
          }))}
          type="line"
          title="Inscripciones por Período"
          height={300}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        {/* Gráfico de ingresos por fuente */}
        <SimpleChart
          data={analyticsData.revenue.bySource.map(item => ({
            label: item.source,
            value: item.amount
          }))}
          type="pie"
          title="Ingresos por Fuente"
          height={300}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />
      </div>

      {/* Progreso y engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progreso circular */}
        <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity size={20} />
            Progreso General
          </h3>
          <div className="flex items-center justify-center">
            <CircularProgressBar
              value={analyticsData.overview.completionRate}
              size={150}
              color="primary"
              label="Completado"
            />
          </div>
        </div>

        {/* Barras de progreso múltiples */}
        <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Progreso por Categoría
          </h3>
          <MultiProgressBar
            data={[
              { label: 'Programación', value: 85, color: 'primary' },
              { label: 'Diseño', value: 60, color: 'success' },
              { label: 'Data Science', value: 40, color: 'warning' },
              { label: 'Marketing', value: 75, color: 'info' }
            ]}
            showLabels={true}
            showValues={true}
          />
        </div>
      </div>

      {/* Demografía (solo para admin) */}
      {userRole === 'admin' && showAdminMetrics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grupos de edad */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users size={20} />
              Grupos de Edad
            </h3>
            <div className="space-y-3">
              {analyticsData.demographics.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-white/80">{group.range} años</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${group.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white w-12 text-right">
                      {group.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribución por país */}
          <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award size={20} />
              Distribución por País
            </h3>
            <div className="space-y-3">
              {analyticsData.demographics.countries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-white/80">{country.country}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white w-12 text-right">
                      {country.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Estado de sincronización */}
      <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${syncStatus.isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-white/80">
              {syncStatus.isConnected ? 'Datos sincronizados' : 'Sin conexión'}
            </span>
          </div>
          <span className="text-white/60 text-sm">
            Última actualización: {syncStatus.lastSync ? new Date(syncStatus.lastSync).toLocaleTimeString() : 'Nunca'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
