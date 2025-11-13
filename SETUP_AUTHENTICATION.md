# 🔐 Configuración del Sistema de Autenticación KELUMY

## 📋 Resumen

Este documento explica cómo configurar el sistema de autenticación completo de KELUMY que identifica usuarios y administradores, redirigiéndolos a sus dashboards correspondientes usando PHPMyAdmin (MySQL) en lugar de Prisma.

## 🏗️ Arquitectura del Sistema

### **Componentes Implementados:**

1. **🔧 Servicio de Autenticación** (`src/services/authService.js`)
2. **👤 Dashboard de Usuario** (`src/pages/UserDashboard.jsx`)
3. **🛡️ Dashboard de Administrador** (`src/pages/AdminDashboard.jsx`)
4. **🔒 Guardián de Autenticación** (`src/components/AuthGuard.jsx`)
5. **🗄️ Base de Datos MySQL** (`database/schema.sql`)
6. **🌐 API PHP** (`backend/api/auth.php` y `backend/api/admin.php`)

## 📊 Base de Datos MySQL

### **1. Configuración Inicial**

```sql
-- Crear base de datos
CREATE DATABASE kelumy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE kelumy_db;
```

### **2. Importar el Esquema**

1. Abre **PHPMyAdmin** en tu navegador
2. Selecciona la base de datos `kelumy_db`
3. Ve a la pestaña **"Importar"**
4. Selecciona el archivo `database/schema.sql`
5. Haz clic en **"Continuar"**

### **3. Usuario Administrador por Defecto**

```
Email: admin@kelumy.com
Contraseña: password
Rol: admin
```

**⚠️ IMPORTANTE:** Cambia esta contraseña después del primer login.

## 🌐 Configuración del Backend PHP

### **1. Estructura de Archivos**

```
backend/
├── api/
│   ├── auth.php          # API de autenticación
│   └── admin.php         # API de administración
└── config/
    └── database.php      # Configuración de BD (opcional)
```

### **2. Configuración de la Base de Datos**

Edita el archivo `backend/api/auth.php` y `backend/api/admin.php`:

```php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'kelumy_db';
$username = 'root'; // Tu usuario de MySQL
$password = '';     // Tu contraseña de MySQL
```

### **3. Configurar Servidor Web**

#### **Opción A: XAMPP/WAMP**
1. Coloca los archivos PHP en `htdocs/kelumy-backend/`
2. Inicia Apache y MySQL
3. Accede a: `http://localhost/kelumy-backend/api/auth/`

#### **Opción B: Servidor PHP integrado**
```bash
cd backend
php -S localhost:8000
```

## ⚙️ Configuración del Frontend

### **1. Configurar URL de la API**

Edita `src/config/api.js`:

```javascript
export const API_BASE_URL = 'http://localhost:8000/api';
```

### **2. Variables de Entorno (Opcional)**

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_MOCK_API=false
```

## 🚀 Flujo de Autenticación

### **1. Registro de Usuario**

```javascript
import { registerUser } from '../services/authService';

const userData = {
  fullName: 'Juan Pérez',
  email: 'juan@email.com',
  password: 'password123',
  role: 'user' // Por defecto
};

const user = await registerUser(userData);
// Usuario creado y token generado automáticamente
```

### **2. Login de Usuario**

```javascript
import { loginUser } from '../services/authService';

const user = await loginUser('juan@email.com', 'password123');
// Token guardado en localStorage
```

### **3. Verificación de Roles**

```javascript
import { getCurrentUserRole, isAdmin, isUser } from '../services/authService';

const role = getCurrentUserRole(); // 'user' o 'admin'
const isAdminUser = isAdmin();     // true/false
const isRegularUser = isUser();    // true/false
```

### **4. Redirección Automática**

```javascript
import { getRedirectPath } from '../services/authService';

const redirectPath = getRedirectPath('admin'); // '/admin-dashboard'
const redirectPath = getRedirectPath('user');  // '/user-dashboard'
```

## 🎯 Dashboards por Rol

### **Dashboard de Usuario** (`/user-dashboard`)
- ✅ Métricas personales de progreso
- ✅ Cursos en los que está inscrito
- ✅ Certificados obtenidos
- ✅ Configuración de perfil
- ✅ Sistema de notificaciones

### **Dashboard de Administrador** (`/admin-dashboard`)
- ✅ Gestión completa de usuarios
- ✅ Administración de cursos
- ✅ Estadísticas de la plataforma
- ✅ Sistema de notificaciones
- ✅ Logs de actividad
- ✅ Configuración del sistema

## 🔒 Seguridad Implementada

### **1. Autenticación JWT**
- Tokens con expiración de 24 horas
- Verificación de tokens en cada petición
- Invalidación automática de tokens expirados

### **2. Protección de Rutas**
- Verificación de roles en cada endpoint
- Guardián de autenticación en React
- Redirección automática según permisos

### **3. Validación de Datos**
- Sanitización de inputs
- Validación de email y contraseñas
- Prevención de inyección SQL

### **4. Logs de Actividad**
- Registro de todas las acciones de administradores
- Tracking de logins y cambios de perfil
- Monitoreo de intentos de acceso no autorizados

## 📱 Uso en la Aplicación

### **1. App.tsx - Componente Principal**

```jsx
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserDashboard';

function App() {
  const { user, role } = useAuth();
  
  if (!user) {
    return <LoginPage />;
  }
  
  return role === 'admin' ? 
    <AdminDashboard user={user} /> : 
    <UserDashboard user={user} />;
}
```

### **2. Protección de Rutas**

```jsx
import AuthGuard from './components/AuthGuard';

// Proteger ruta de administrador
<AuthGuard requiredRole="admin">
  <AdminDashboard />
</AuthGuard>

// Proteger ruta de usuario
<AuthGuard requiredRole="user">
  <UserDashboard />
</AuthGuard>
```

### **3. Gestión de Usuarios (Solo Admin)**

```jsx
import { getUsers, promoteToAdmin, deleteUser } from '../services/authService';

// Listar usuarios
const users = await getUsers({ role: 'user' });

// Promover a administrador
await promoteToAdmin(userId);

// Eliminar usuario
await deleteUser(userId);
```

## 🛠️ Endpoints de la API

### **Autenticación** (`/api/auth/`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/login` | Iniciar sesión |
| POST | `/register` | Registrar usuario |
| GET | `/verify` | Verificar token |
| PUT | `/profile` | Actualizar perfil |
| POST | `/change-password` | Cambiar contraseña |
| GET | `/me` | Obtener datos del usuario |

### **Administración** (`/api/admin/`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users` | Listar usuarios |
| POST | `/promote` | Promover a admin |
| POST | `/demote` | Degradar a usuario |
| DELETE | `/users/{id}` | Eliminar usuario |
| GET | `/stats` | Estadísticas generales |
| GET | `/activity` | Logs de actividad |

## 🧪 Testing y Debugging

### **1. Verificar Conexión a la BD**

```sql
-- En PHPMyAdmin
SELECT COUNT(*) FROM users;
SELECT * FROM users WHERE role = 'admin';
```

### **2. Verificar API**

```bash
# Test de login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kelumy.com","password":"password"}'
```

### **3. Verificar Frontend**

```javascript
// En la consola del navegador
console.log('Token:', localStorage.getItem('kelumy_token'));
console.log('User:', localStorage.getItem('kelumy_user'));
console.log('Role:', localStorage.getItem('kelumy_role'));
```

## 🚨 Solución de Problemas

### **Error: "No se puede conectar a la base de datos"**
- ✅ Verificar que MySQL esté ejecutándose
- ✅ Verificar credenciales en `auth.php`
- ✅ Verificar que la base de datos `kelumy_db` existe

### **Error: "Token inválido"**
- ✅ Verificar que el token no haya expirado
- ✅ Verificar que el usuario esté activo
- ✅ Limpiar localStorage y hacer login nuevamente

### **Error: "Acceso denegado"**
- ✅ Verificar que el usuario tenga el rol correcto
- ✅ Verificar que la ruta esté protegida correctamente
- ✅ Verificar permisos en la base de datos

### **Error: "CORS"**
- ✅ Verificar headers en los archivos PHP
- ✅ Verificar configuración del servidor web
- ✅ Verificar URL de la API en el frontend

## 📈 Próximos Pasos

1. **🔐 Implementar 2FA** para administradores
2. **📧 Sistema de verificación por email**
3. **🔄 Refresh tokens** para mayor seguridad
4. **📊 Dashboard de analytics** más avanzado
5. **🔔 Notificaciones push** en tiempo real
6. **📱 App móvil** con la misma API

## 📞 Soporte

Si tienes problemas con la configuración:

1. **📋 Revisa los logs** del servidor web
2. **🔍 Verifica la consola** del navegador
3. **🗄️ Revisa la base de datos** en PHPMyAdmin
4. **📧 Contacta al equipo** de desarrollo

---

**🎉 ¡El sistema de autenticación KELUMY está listo para usar!**

**Usuarios regulares** → Dashboard de Usuario  
**Administradores** → Dashboard de Administrador  
**Sin autenticación** → Página de Login
