// ========================================
// EJEMPLOS DE USO DE UTILIDADES DE GRÁFICAS KELUMY
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  Users,          // Icono de usuarios
  DollarSign,     // Icono de dinero
  BookOpen,       // Icono de libro
  Award,          // Icono de premio
  TrendingUp,     // Icono de tendencia
  Activity,       // Icono de actividad
  Clock,          // Icono de tiempo
  Star,           // Icono de estrella
  Download,       // Icono de descarga
  RefreshCw       // Icono de actualizar
} from 'lucide-react';

// Importar componentes de gráficas
import MetricCard, { 
  RevenueMetricCard, 
  UserMetricCard, 
  CourseMetricCard, 
  PerformanceMetricCard 
} from '../components/charts/MetricCard';
import ProgressBar, { CircularProgressBar, MultiProgressBar } from '../components/charts/ProgressBar';
import SimpleChart from '../components/charts/SimpleChart';
import AnalyticsDashboard from '../components/charts/AnalyticsDashboard';

// Importar utilidades
import { 
  formatNumber, 
  formatCurrency, 
  formatPercentage,
  calculateStats,
  groupDataByPeriod,
  calculatePercentageChange,
  getValueColor,
  getGradientColors,
  generateRandomColors
} from '../utils/chartUtils';

// ========================================
// EJEMPLO 1: DASHBOARD BÁSICO CON MÉTRICAS
// ========================================

const BasicMetricsExample = () => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Ejemplo de Métricas Básicas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserMetricCard
          title="Total Usuarios"
          value={formatNumber(1250)}
          change={12.5}
          loading={loading}
          onClick={() => console.log('Usuarios clicked')}
        />
        
        <RevenueMetricCard
          title="Ingresos Mensuales"
          value={formatCurrency(45000)}
          change={23.1}
          loading={loading}
          onClick={() => console.log('Ingresos clicked')}
        />
        
        <CourseMetricCard
          title="Cursos Activos"
          value={formatNumber(24)}
          change={-2.5}
          loading={loading}
          onClick={() => console.log('Cursos clicked')}
        />
        
        <PerformanceMetricCard
          title="Tasa de Completación"
          value={formatPercentage(78.5)}
          change={5.2}
          loading={loading}
          onClick={() => console.log('Completación clicked')}
        />
      </div>

      <div className="mt-6">
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Actualizar Datos
        </button>
      </div>
    </div>
  );
};

// ========================================
// EJEMPLO 2: BARRAS DE PROGRESO
// ========================================

const ProgressBarsExample = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Ejemplo de Barras de Progreso</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Barras de progreso simples */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Progreso de Cursos</h2>
          <div className="space-y-4">
            <ProgressBar
              value={85}
              label="JavaScript Avanzado"
              color="primary"
              animated={true}
            />
            <ProgressBar
              value={60}
              label="React Hooks"
              color="success"
              animated={true}
            />
            <ProgressBar
              value={30}
              label="Node.js Backend"
              color="warning"
              animated={true}
            />
          </div>
        </div>

        {/* Barra circular */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Progreso General</h2>
          <div className="flex justify-center">
            <CircularProgressBar
              value={78}
              size={150}
              color="primary"
              label="Completado"
            />
          </div>
        </div>

        {/* Múltiples barras */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Progreso por Categoría</h2>
          <MultiProgressBar
            data={[
              { label: 'Programación', value: 85, color: 'primary' },
              { label: 'Diseño', value: 60, color: 'success' },
              { label: 'Data Science', value: 40, color: 'warning' },
              { label: 'Marketing', value: 75, color: 'info' },
              { label: 'Negocios', value: 55, color: 'neutral' }
            ]}
            showLabels={true}
            showValues={true}
          />
        </div>
      </div>
    </div>
  );
};

// ========================================
// EJEMPLO 3: GRÁFICOS SIMPLES
// ========================================

const SimpleChartsExample = () => {
  const [chartData, setChartData] = useState([
    { label: 'Enero', value: 120 },
    { label: 'Febrero', value: 150 },
    { label: 'Marzo', value: 180 },
    { label: 'Abril', value: 220 },
    { label: 'Mayo', value: 250 },
    { label: 'Junio', value: 280 }
  ]);

  const revenueData = [
    { label: 'Directo', value: 25000 },
    { label: 'Google Ads', value: 12000 },
    { label: 'Redes Sociales', value: 5000 },
    { label: 'Referidos', value: 3000 }
  ];

  const handleRefresh = () => {
    // Simular actualización de datos
    const newData = chartData.map(item => ({
      ...item,
      value: item.value + Math.floor(Math.random() * 50 - 25)
    }));
    setChartData(newData);
  };

  const handleExport = () => {
    console.log('Exportando datos...');
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Ejemplo de Gráficos Simples</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras */}
        <SimpleChart
          data={chartData}
          type="bar"
          title="Inscripciones por Mes"
          height={300}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        {/* Gráfico de líneas */}
        <SimpleChart
          data={chartData}
          type="line"
          title="Tendencia de Crecimiento"
          height={300}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        {/* Gráfico circular */}
        <SimpleChart
          data={revenueData}
          type="pie"
          title="Ingresos por Fuente"
          height={300}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        {/* Gráfico de área */}
        <SimpleChart
          data={chartData}
          type="area"
          title="Crecimiento Acumulado"
          height={300}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />
      </div>
    </div>
  );
};

// ========================================
// EJEMPLO 4: DASHBOARD COMPLETO
// ========================================

const CompleteDashboardExample = () => {
  const [userRole, setUserRole] = useState('user');

  const handleMetricClick = (metric) => {
    console.log('Métrica clickeada:', metric);
    alert(`Has clickeado en: ${metric}`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Ejemplo de Dashboard Completo</h1>
        
        <div className="flex items-center gap-4">
          <label className="text-white/70">Rol:</label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white"
          >
            <option value="user" className="bg-gray-800">Usuario</option>
            <option value="admin" className="bg-gray-800">Administrador</option>
          </select>
        </div>
      </div>

      <AnalyticsDashboard
        userRole={userRole}
        showAdminMetrics={userRole === 'admin'}
        onMetricClick={handleMetricClick}
      />
    </div>
  );
};

// ========================================
// EJEMPLO 5: UTILIDADES DE FORMATEO
// ========================================

const FormattingUtilsExample = () => {
  const testNumbers = [1234, 56789, 1234567];
  const testAmounts = [100, 1250, 45000, 125000];
  const testPercentages = [12.5, 78.9, 99.1];
  const testDates = ['2024-01-15', '2024-12-25', new Date()];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Ejemplo de Utilidades de Formateo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formateo de números */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Formateo de Números</h2>
          <div className="space-y-2">
            {testNumbers.map((num, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-white/70">{num}</span>
                <span className="text-white font-mono">{formatNumber(num)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formateo de moneda */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Formateo de Moneda</h2>
          <div className="space-y-2">
            {testAmounts.map((amount, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-white/70">{amount}</span>
                <span className="text-white font-mono">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formateo de porcentajes */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Formateo de Porcentajes</h2>
          <div className="space-y-2">
            {testPercentages.map((percent, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-white/70">{percent}</span>
                <span className="text-white font-mono">{formatPercentage(percent)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formateo de fechas */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Formateo de Fechas</h2>
          <div className="space-y-2">
            {testDates.map((date, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-white/70">{date.toString()}</span>
                <span className="text-white font-mono">{formatDate(date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ejemplo de estadísticas */}
      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Cálculo de Estadísticas</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(calculateStats([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-white/70 text-sm capitalize">{key}</p>
              <p className="text-white font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ========================================
// COMPONENTE PRINCIPAL CON NAVEGACIÓN
// ========================================

const ChartExamples = () => {
  const [activeExample, setActiveExample] = useState('basic');

  const examples = [
    { id: 'basic', label: 'Métricas Básicas', component: BasicMetricsExample },
    { id: 'progress', label: 'Barras de Progreso', component: ProgressBarsExample },
    { id: 'charts', label: 'Gráficos Simples', component: SimpleChartsExample },
    { id: 'dashboard', label: 'Dashboard Completo', component: CompleteDashboardExample },
    { id: 'formatting', label: 'Utilidades de Formateo', component: FormattingUtilsExample }
  ];

  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component || BasicMetricsExample;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navegación */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="flex flex-wrap gap-2">
          {examples.map(example => (
            <button
              key={example.id}
              onClick={() => setActiveExample(example.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeExample === example.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <ActiveComponent />
    </div>
  );
};

export default ChartExamples;
