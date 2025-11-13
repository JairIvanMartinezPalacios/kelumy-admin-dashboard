# 🏗️ Estructura del Proyecto KELUMY

## 📋 Resumen

Este documento describe la estructura de carpetas y organización del proyecto KELUMY, siguiendo el patrón del proyecto `mqerk` para mantener consistencia y escalabilidad.

## 📁 Estructura de Directorios

```
src/
├── components/           # Componentes React reutilizables
│   ├── admin/           # Componentes específicos de administración
│   │   ├── AdminCourseManager.jsx
│   │   ├── UserManagement.jsx
│   │   └── index.js
│   ├── common/          # Componentes comunes y de layout
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── index.js
│   ├── shared/          # Componentes compartidos
│   │   ├── SyncIndicator.jsx
│   │   ├── SyncNotification.jsx
│   │   ├── CourseManager.jsx
│   │   └── index.js
│   ├── user/            # Componentes específicos de usuario
│   │   ├── UserCourses.jsx
│   │   ├── UserCertificates.jsx
│   │   ├── UserSettings.jsx
│   │   └── index.js
│   ├── charts/          # Componentes de gráficos
│   │   ├── AnalyticsDashboard.jsx
│   │   ├── MetricCard.jsx
│   │   ├── ProgressBar.jsx
│   │   └── SimpleChart.jsx
│   ├── forms/           # Componentes de formularios
│   │   └── RegistrationForm.jsx
│   └── AuthGuard.jsx    # Guardián de autenticación
├── modules/             # Módulos de funcionalidad
│   ├── admin/           # Módulos de administración
│   │   ├── AdminManagement.jsx
│   │   ├── ConfigManagement.jsx
│   │   ├── FinanceManagement.jsx
│   │   ├── ReportManagement.jsx
│   │   └── index.js
│   ├── commerce/        # Módulos de comercio
│   │   ├── ecommerce/
│   │   ├── pagos/
│   │   ├── productos-online/
│   │   ├── suscripciones/
│   │   └── index.js
│   ├── communication/   # Módulos de comunicación
│   │   ├── contenido/
│   │   ├── correo/
│   │   ├── marketing/
│   │   ├── notificaciones/
│   │   ├── soporte/
│   │   └── index.js
│   ├── learning/        # Módulos de aprendizaje
│   │   ├── calendario/
│   │   ├── certificaciones/
│   │   ├── cursos/
│   │   └── index.js
│   ├── users/           # Módulos de usuarios
│   │   ├── UserManagement.jsx
│   │   ├── UserProfile.jsx
│   │   ├── UserSettings.jsx
│   │   └── index.js
│   ├── settings/        # Módulos de configuración
│   │   ├── GeneralSettings.jsx
│   │   ├── SecuritySettings.jsx
│   │   └── index.js
│   └── index.js
├── pages/               # Páginas principales
│   ├── AdminDashboard.jsx
│   ├── UserDashboard.jsx
│   ├── LoginPage.jsx
│   └── Dashboard.jsx
├── services/            # Servicios y APIs
│   ├── auth/            # Servicios de autenticación
│   │   ├── loginService.js
│   │   ├── registerService.js
│   │   ├── passwordService.js
│   │   └── index.js
│   ├── api/             # Servicios de API
│   │   ├── httpClient.js
│   │   ├── interceptors.js
│   │   └── index.js
│   ├── authService.js   # Servicio principal de auth
│   ├── api.ts           # Servicio de API
│   └── index.js
├── types/               # Tipos de TypeScript
│   ├── auth.ts
│   ├── common.ts
│   ├── course.ts
│   ├── user.ts
│   └── index.ts
├── utils/               # Utilidades
│   ├── chartUtils.js
│   ├── formatUtils.js
│   ├── validationUtils.js
│   ├── dateUtils.js
│   ├── stringUtils.js
│   └── index.js
├── hooks/               # Hooks personalizados
│   ├── useAuth.ts
│   └── useCourses.ts
├── context/             # Contextos de React
│   └── AppContext.jsx
├── config/              # Configuración
│   └── api.js
├── styles/              # Estilos
│   └── animations.css
├── docs/                # Documentación
│   ├── CHART_UTILITIES.md
│   └── SYNC_SYSTEM.md
├── examples/            # Ejemplos de uso
│   ├── ChartExamples.jsx
│   └── SyncExample.jsx
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🎯 Principios de Organización

### **1. Separación por Responsabilidad**
- **`components/`**: Componentes React reutilizables
- **`modules/`**: Lógica de negocio y funcionalidades
- **`services/`**: Comunicación con APIs y servicios externos
- **`utils/`**: Funciones de utilidad y helpers
- **`types/`**: Definiciones de tipos TypeScript

### **2. Categorización por Rol**
- **`admin/`**: Funcionalidades de administrador
- **`user/`**: Funcionalidades de usuario
- **`shared/`**: Componentes compartidos
- **`common/`**: Componentes comunes de UI

### **3. Agrupación por Funcionalidad**
- **`learning/`**: Módulos relacionados con educación
- **`commerce/`**: Módulos de comercio y pagos
- **`communication/`**: Módulos de comunicación
- **`settings/`**: Módulos de configuración

## 📦 Patrón de Exportaciones

### **Archivos Index.js**
Cada carpeta contiene un archivo `index.js` que exporta todos los componentes/modulos:

```javascript
// src/components/admin/index.js
export { default as AdminCourseManager } from './AdminCourseManager';
export { default as UserManagement } from './UserManagement';
export { default as SystemSettings } from './SystemSettings';
```

### **Importaciones Limpias**
```javascript
// Importación desde el index
import { AdminCourseManager, UserManagement } from '@/components/admin';

// En lugar de
import AdminCourseManager from '@/components/admin/AdminCourseManager';
import UserManagement from '@/components/admin/UserManagement';
```

## 🔧 Configuración de Paths

### **Alias de Importación**
```javascript
// En vite.config.js o tsconfig.json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/modules/*": ["./src/modules/*"],
    "@/services/*": ["./src/services/*"],
    "@/utils/*": ["./src/utils/*"],
    "@/types/*": ["./src/types/*"]
  }
}
```

### **Ejemplos de Uso**
```javascript
// Importaciones con alias
import { AdminCourseManager } from '@/components/admin';
import { CourseManagement } from '@/modules/learning';
import { authService } from '@/services/auth';
import { formatCurrency } from '@/utils/formatUtils';
import { UserType } from '@/types/user';
```

## 📋 Convenciones de Nomenclatura

### **Archivos de Componentes**
- **PascalCase**: `AdminCourseManager.jsx`
- **Descriptivo**: `UserNotificationSettings.jsx`
- **Específico**: `CourseProgressBar.jsx`

### **Archivos de Servicios**
- **camelCase**: `authService.js`
- **Descriptivo**: `userManagementService.js`
- **Específico**: `paymentIntegrationService.js`

### **Archivos de Utilidades**
- **camelCase**: `formatUtils.js`
- **Descriptivo**: `validationUtils.js`
- **Específico**: `chartUtils.js`

### **Archivos de Tipos**
- **camelCase**: `user.ts`
- **Descriptivo**: `courseManagement.ts`
- **Específico**: `apiResponse.ts`

## 🎨 Patrones de Componentes

### **Componentes de Layout**
```javascript
// src/components/common/Layout.jsx
import { Navbar, Sidebar, Footer } from './';

const Layout = ({ children, user, onLogout }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <Navbar user={user} onLogout={onLogout} />
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
    <Footer />
  </div>
);
```

### **Componentes de Módulo**
```javascript
// src/modules/admin/AdminManagement.jsx
import { UserManagement, CourseManagement, SystemSettings } from '@/components/admin';

const AdminManagement = () => (
  <div className="admin-management">
    <UserManagement />
    <CourseManagement />
    <SystemSettings />
  </div>
);
```

## 🔄 Flujo de Datos

### **Servicios → Componentes**
```javascript
// src/services/auth/authService.js
export const loginUser = async (email, password) => {
  // Lógica de login
};

// src/components/common/LoginForm.jsx
import { loginUser } from '@/services/auth';

const LoginForm = () => {
  const handleLogin = async (credentials) => {
    const user = await loginUser(credentials.email, credentials.password);
    // Manejar respuesta
  };
};
```

### **Context → Hooks → Componentes**
```javascript
// src/context/AppContext.jsx
export const AppProvider = ({ children }) => {
  // Estado global
};

// src/hooks/useAuth.ts
export const useAuth = () => {
  const context = useContext(AppContext);
  return context;
};

// src/components/user/UserProfile.jsx
import { useAuth } from '@/hooks/useAuth';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  // Usar datos del contexto
};
```

## 📚 Documentación

### **README por Módulo**
Cada módulo principal debe tener su propio README:

```
src/modules/learning/
├── README.md
├── courses/
│   ├── README.md
│   ├── CourseManagement.jsx
│   └── CourseEditor.jsx
└── index.js
```

### **Ejemplos de Uso**
```javascript
// src/examples/ChartExamples.jsx
import { AnalyticsDashboard } from '@/components/charts';

export const ChartExamples = () => {
  return (
    <div>
      <h1>Ejemplos de Gráficos</h1>
      <AnalyticsDashboard />
    </div>
  );
};
```

## 🚀 Beneficios de esta Estructura

### **1. Escalabilidad**
- Fácil agregar nuevos módulos
- Separación clara de responsabilidades
- Estructura predecible

### **2. Mantenibilidad**
- Código organizado por funcionalidad
- Fácil localizar archivos
- Reutilización de componentes

### **3. Colaboración**
- Estructura clara para equipos
- Convenciones consistentes
- Documentación integrada

### **4. Testing**
- Estructura facilita testing
- Separación de lógica y presentación
- Componentes reutilizables

## 🔧 Herramientas de Desarrollo

### **Extensiones Recomendadas**
- **ES7+ React/Redux/React-Native snippets**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **Path Intellisense**

### **Scripts Útiles**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}
```

## 📝 Próximos Pasos

1. **✅ Completar archivos index.js** para todas las carpetas
2. **✅ Agregar documentación** para cada módulo
3. **✅ Implementar testing** para componentes clave
4. **✅ Configurar linting** y formateo automático
5. **✅ Agregar Storybook** para documentación de componentes

---

**🎉 La estructura del proyecto KELUMY está organizada siguiendo el patrón del proyecto `mqerk` para máxima consistencia y escalabilidad.**
