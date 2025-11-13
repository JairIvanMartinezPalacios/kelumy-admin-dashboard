# Utilidades de Gráficas KELUMY

## 📊 Descripción General

Las utilidades de gráficas de KELUMY son un conjunto de componentes y funciones reutilizables extraídas y adaptadas del proyecto `mqerk_ver1`. Estas utilidades proporcionan una base sólida para crear visualizaciones de datos consistentes y atractivas en toda la plataforma.

## 🏗️ Arquitectura

### **1. Utilidades Base (`src/utils/chartUtils.js`)**
- **Funciones de formateo**: Números, moneda, porcentajes, fechas
- **Funciones de colores**: Gradientes, colores de progreso, colores por valor
- **Funciones de datos**: Estadísticas, agrupación, cálculos
- **Funciones de utilidad**: Validación, generación de colores, interpolación

### **2. Componentes de Gráficas (`src/components/charts/`)**
- **MetricCard**: Tarjetas de métricas reutilizables
- **ProgressBar**: Barras de progreso (lineales y circulares)
- **SimpleChart**: Gráficos simples (barras, líneas, circulares, área)
- **AnalyticsDashboard**: Dashboard completo de analíticas

## 🎨 Componentes Disponibles

### **MetricCard**
```jsx
import MetricCard, { RevenueMetricCard, UserMetricCard } from '../components/charts/MetricCard';

// Uso básico
<MetricCard
  title="Total Usuarios"
  value="1,250"
  change={12.5}
  icon={Users}
  color="primary"
  onClick={() => console.log('Clicked!')}
/>

// Variantes especializadas
<RevenueMetricCard title="Ingresos" value="$45,000" change={23.1} />
<UserMetricCard title="Usuarios Activos" value="890" change={8.3} />
```

### **ProgressBar**
```jsx
import ProgressBar, { CircularProgressBar, MultiProgressBar } from '../components/charts/ProgressBar';

// Barra de progreso simple
<ProgressBar
  value={75}
  label="Progreso del curso"
  color="primary"
  animated={true}
/>

// Barra circular
<CircularProgressBar
  value={85}
  size={120}
  color="success"
  label="Completado"
/>

// Múltiples barras
<MultiProgressBar
  data={[
    { label: 'JavaScript', value: 90, color: 'primary' },
    { label: 'React', value: 75, color: 'success' },
    { label: 'Node.js', value: 60, color: 'warning' }
  ]}
/>
```

### **SimpleChart**
```jsx
import SimpleChart from '../components/charts/SimpleChart';

// Gráfico de barras
<SimpleChart
  data={[
    { label: 'Enero', value: 100 },
    { label: 'Febrero', value: 150 },
    { label: 'Marzo', value: 200 }
  ]}
  type="bar"
  title="Ventas por Mes"
  height={300}
  onRefresh={() => console.log('Refresh')}
  onExport={() => console.log('Export')}
/>

// Gráfico de líneas
<SimpleChart data={data} type="line" title="Tendencia de Usuarios" />

// Gráfico circular
<SimpleChart data={data} type="pie" title="Distribución por Categoría" />

// Gráfico de área
<SimpleChart data={data} type="area" title="Crecimiento de Ingresos" />
```

### **AnalyticsDashboard**
```jsx
import AnalyticsDashboard from '../components/charts/AnalyticsDashboard';

// Para usuarios
<AnalyticsDashboard
  userRole="user"
  showAdminMetrics={false}
  onMetricClick={(metric) => console.log(metric)}
/>

// Para administradores
<AnalyticsDashboard
  userRole="admin"
  showAdminMetrics={true}
  onMetricClick={(metric) => console.log(metric)}
/>
```

## 🛠️ Funciones de Utilidad

### **Formateo**
```javascript
import { formatNumber, formatCurrency, formatPercentage, formatDate } from '../utils/chartUtils';

formatNumber(1250); // "1.250"
formatCurrency(45000); // "$45.000,00"
formatPercentage(78.5); // "78,5%"
formatDate('2024-01-15'); // "15/1/2024"
```

### **Colores**
```javascript
import { getValueColor, getGradientColors, getProgressColors } from '../utils/chartUtils';

getValueColor(12.5); // "text-green-400"
getGradientColors('primary'); // "from-purple-500 to-pink-500"
getProgressColors('success'); // "bg-gradient-to-r from-green-500 to-emerald-500"
```

### **Datos**
```javascript
import { calculateStats, groupDataByPeriod, calculatePercentageChange } from '../utils/chartUtils';

const stats = calculateStats([10, 20, 30, 40, 50]);
// { min: 10, max: 50, avg: 30, sum: 150, count: 5 }

const grouped = groupDataByPeriod(data, 'month');
const change = calculatePercentageChange(100, 125); // 25
```

## 🎯 Casos de Uso

### **Dashboard de Usuario**
```jsx
// En UserDashboard.jsx
<AnalyticsDashboard 
  userRole="user"
  showAdminMetrics={false}
  onMetricClick={(metric) => {
    // Navegar a detalles específicos
    navigateToDetail(metric);
  }}
/>
```

### **Dashboard de Administrador**
```jsx
// En AdminDashboard.jsx
<AnalyticsDashboard 
  userRole="admin"
  showAdminMetrics={true}
  onMetricClick={(metric) => {
    // Mostrar modal con detalles
    showMetricDetails(metric);
  }}
/>
```

### **Métricas Personalizadas**
```jsx
// Crear métricas específicas
const customMetrics = [
  {
    title: "Tiempo de Estudio",
    value: "2h 45m",
    change: 15,
    icon: Clock,
    color: "blue"
  },
  {
    title: "Puntuación Promedio",
    value: "4.8",
    change: 0.2,
    icon: Star,
    color: "yellow"
  }
];

return (
  <div className="grid grid-cols-2 gap-4">
    {customMetrics.map((metric, index) => (
      <MetricCard key={index} {...metric} />
    ))}
  </div>
);
```

## 🎨 Personalización

### **Temas de Color**
```javascript
// En chartUtils.js
export const CHART_CONFIG = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  }
};
```

### **Animaciones**
```javascript
// Configurar animaciones
export const DEFAULT_CHART_OPTIONS = {
  animations: {
    duration: 300,
    easing: 'ease-in-out'
  }
};
```

### **Responsive Design**
```javascript
// Breakpoints para responsive
export const CHART_CONFIG = {
  responsive: {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  }
};
```

## 📱 Responsive y Accesibilidad

### **Responsive Design**
- Todos los componentes se adaptan automáticamente a diferentes tamaños de pantalla
- Gráficos se redimensionan según el contenedor
- Layouts de grid se ajustan para móviles y tablets

### **Accesibilidad**
- Colores con suficiente contraste
- Iconos descriptivos
- Textos alternativos para gráficos
- Navegación por teclado

## 🔄 Integración con Contexto Global

### **Sincronización de Datos**
```jsx
import { useAppContext } from '../context/AppContext';

const { courses, certificates, notifications, syncStatus } = useAppContext();

// Los componentes de gráficas se actualizan automáticamente
// cuando cambian los datos en el contexto global
```

### **Estado de Carga**
```jsx
<MetricCard
  title="Cursos Completados"
  value="3"
  loading={loading} // Muestra skeleton mientras carga
/>
```

## 🚀 Optimización de Performance

### **Debounce y Throttle**
```javascript
import { debounce, throttle } from '../utils/chartUtils';

// Para eventos frecuentes como resize
const debouncedResize = debounce(handleResize, 250);

// Para scroll o mouse move
const throttledScroll = throttle(handleScroll, 100);
```

### **Memoización**
```jsx
import React, { memo } from 'react';

const MemoizedMetricCard = memo(MetricCard);

// Evita re-renders innecesarios cuando las props no cambian
```

## 📊 Ejemplos de Datos

### **Datos de Ejemplo para Gráficos**
```javascript
const enrollmentData = [
  { label: 'Ene', value: 120 },
  { label: 'Feb', value: 150 },
  { label: 'Mar', value: 180 },
  { label: 'Abr', value: 220 },
  { label: 'May', value: 250 },
  { label: 'Jun', value: 280 }
];

const revenueData = [
  { label: 'Directo', value: 25000 },
  { label: 'Google Ads', value: 12000 },
  { label: 'Redes Sociales', value: 5000 },
  { label: 'Referidos', value: 3000 }
];

const progressData = [
  { label: 'JavaScript', value: 85, color: 'primary' },
  { label: 'React', value: 70, color: 'success' },
  { label: 'Node.js', value: 60, color: 'warning' },
  { label: 'MongoDB', value: 45, color: 'info' }
];
```

## 🔧 Troubleshooting

### **Problemas Comunes**

1. **Gráficos no se renderizan**
   - Verificar que los datos tengan la estructura correcta
   - Asegurar que el contenedor tenga altura definida

2. **Colores no se aplican**
   - Verificar que las clases de Tailwind estén incluidas
   - Usar colores predefinidos en `CHART_CONFIG`

3. **Animaciones no funcionan**
   - Verificar que `animated={true}` esté configurado
   - Asegurar que no hay conflictos de CSS

### **Debug**
```javascript
// Habilitar logs de debug
console.log('Chart data:', data);
console.log('Chart config:', CHART_CONFIG);

// Verificar contexto
const { syncStatus } = useAppContext();
console.log('Sync status:', syncStatus);
```

---

**Última actualización**: Enero 2024  
**Versión**: 1.0.0  
**Mantenido por**: Equipo de Desarrollo KELUMY
