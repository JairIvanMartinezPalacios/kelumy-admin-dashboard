# 🔧 Guía de Integración - Modelos de Negocio

## 📋 Pasos para Integrar en el Proyecto Principal

### 1. Copiar Archivos

```bash
# Copiar componentes principales
cp pruebas/1-modelos-negocio/ModelosNegocioDemo.jsx src/components/admin/
cp pruebas/1-modelos-negocio/data/modelosNegocio.js src/data/
cp pruebas/1-modelos-negocio/IntegrationExample.jsx src/components/admin/

# Crear carpeta de datos si no existe
mkdir -p src/data
```

### 2. Actualizar Dashboard Principal

```jsx
// En src/components/Dashboard.jsx
import ModelosNegocioDemo from './admin/ModelosNegocioDemo'

// Agregar nueva sección en el switch
case 'modelos-negocio':
  return <ModelosNegocioDemo />
```

### 3. Agregar al Menú de Navegación

```jsx
// En src/components/Dashboard.jsx
// Agregar en el array de secciones
{
  id: 'modelos-negocio',
  name: 'Modelos de Negocio',
  icon: BarChart3,
  description: 'Análisis de modelos de negocio para Kelumy'
}
```

### 4. Instalar Dependencias (si no están instaladas)

```bash
npm install lucide-react
# Tailwind CSS ya debería estar instalado
```

### 5. Configurar Rutas (si usas React Router)

```jsx
// En src/App.jsx o router principal
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModelosNegocioDemo from './components/admin/ModelosNegocioDemo'

<Router>
  <Routes>
    <Route path="/admin/modelos-negocio" element={<ModelosNegocioDemo />} />
  </Routes>
</Router>
```

## 🎨 Personalización de Estilos

### Modificar Colores

```jsx
// En ModelosNegocioDemo.jsx
const coloresModelos = {
  suscripcion: 'blue',
  marketplace: 'green', 
  hibrido: 'purple',
  micropagos: 'orange',
  b2b: 'indigo'
}

// Personalizar colores de Tailwind
// En tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        kelumy: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          accent: '#F59E0B'
        }
      }
    }
  }
}
```

### Modificar Layout

```jsx
// Cambiar grid layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> // 2 columnas
<div className="grid grid-cols-1 xl:grid-cols-4 gap-6"> // 4 columnas
```

## 📊 Integración con Datos Reales

### Conectar con API

```jsx
// Crear hook personalizado
import { useState, useEffect } from 'react'

const useModelosNegocio = () => {
  const [modelos, setModelos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/modelos-negocio')
      .then(res => res.json())
      .then(data => {
        setModelos(data)
        setLoading(false)
      })
  }, [])

  return { modelos, loading }
}

// Usar en componente
const { modelos, loading } = useModelosNegocio()
```

### Conectar con Base de Datos

```javascript
// Ejemplo con Prisma
// prisma/schema.prisma
model ModeloNegocio {
  id          String @id @default(cuid())
  nombre      String
  descripcion String
  precio      String
  metricas    Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// API route
// pages/api/modelos-negocio.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const modelos = await prisma.modeloNegocio.findMany()
  res.json(modelos)
}
```

## 🔄 Automatización y Actualización

### Actualizar Métricas Automáticamente

```jsx
// Crear servicio de métricas
class MetricasService {
  static async obtenerMetricas(modeloId) {
    const response = await fetch(`/api/metricas/${modeloId}`)
    return response.json()
  }

  static async actualizarMetricas(modeloId, nuevasMetricas) {
    const response = await fetch(`/api/metricas/${modeloId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevasMetricas)
    })
    return response.json()
  }
}
```

### Programar Actualizaciones

```javascript
// Usar useEffect con interval
useEffect(() => {
  const interval = setInterval(() => {
    // Actualizar métricas cada 5 minutos
    MetricasService.obtenerMetricas().then(setMetricas)
  }, 300000)

  return () => clearInterval(interval)
}, [])
```

## 📱 Responsive Design

### Breakpoints Personalizados

```jsx
// Configurar breakpoints específicos
const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Usar en componentes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

## 🧪 Testing

### Tests Unitarios

```javascript
// __tests__/ModelosNegocioDemo.test.js
import { render, screen } from '@testing-library/react'
import ModelosNegocioDemo from '../src/components/admin/ModelosNegocioDemo'

test('renders modelos de negocio', () => {
  render(<ModelosNegocioDemo />)
  expect(screen.getByText('Modelos de Negocio - Kelumy')).toBeInTheDocument()
})
```

### Tests de Integración

```javascript
// __tests__/integration/modelos-negocio.test.js
import { render, screen, fireEvent } from '@testing-library/react'
import ModelosNegocioDemo from '../src/components/admin/ModelosNegocioDemo'

test('cambia modelo al hacer clic', () => {
  render(<ModelosNegocioDemo />)
  fireEvent.click(screen.getByText('Marketplace'))
  expect(screen.getByText('Marketplace / Venta por Curso')).toBeInTheDocument()
})
```

## 🚀 Optimización de Rendimiento

### Lazy Loading

```jsx
import { lazy, Suspense } from 'react'

const ModelosNegocioDemo = lazy(() => import('./admin/ModelosNegocioDemo'))

// En el componente padre
<Suspense fallback={<div>Cargando...</div>}>
  <ModelosNegocioDemo />
</Suspense>
```

### Memoización

```jsx
import { memo, useMemo } from 'react'

const ModelosNegocioDemo = memo(() => {
  const modelosMemoizados = useMemo(() => {
    return Object.values(modelosNegocioData)
  }, [])

  // Resto del componente
})
```

## 📚 Documentación Adicional

### Storybook (Opcional)

```javascript
// stories/ModelosNegocioDemo.stories.js
export default {
  title: 'Admin/ModelosNegocioDemo',
  component: ModelosNegocioDemo,
}

export const Default = () => <ModelosNegocioDemo />
export const WithData = () => <ModelosNegocioDemo data={customData} />
```

### JSDoc

```jsx
/**
 * Componente para mostrar modelos de negocio de Kelumy
 * @component
 * @param {Object} props - Props del componente
 * @param {string} props.activeModel - Modelo activo por defecto
 * @returns {JSX.Element} Componente de modelos de negocio
 */
const ModelosNegocioDemo = ({ activeModel = 'suscripcion' }) => {
  // Componente
}
```

---

**¡Listo para implementar!** 🎉

Este mockup está diseñado para integrarse fácilmente en la infraestructura existente de Kelumy, reutilizando componentes, estilos y patrones ya establecidos.
