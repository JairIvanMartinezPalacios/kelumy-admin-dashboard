# Sistema de Sincronización KELUMY

## 📋 Descripción General

El sistema de sincronización de KELUMY permite que los cambios realizados por los administradores se reflejen automáticamente en tiempo real en los dashboards de los usuarios. Esto garantiza una experiencia consistente y actualizada para todos los usuarios de la plataforma.

## 🏗️ Arquitectura del Sistema

### 1. **Contexto Global (AppContext.jsx)**
- **Propósito**: Centraliza el estado de la aplicación y maneja la sincronización
- **Características**:
  - Gestión de estado con useReducer
  - Persistencia en localStorage
  - Sincronización automática cada 30 segundos
  - Manejo de errores y estados de carga

### 2. **Componentes de Sincronización**

#### **SyncIndicator.jsx**
- Muestra el estado de conexión en tiempo real
- Indica si hay cambios pendientes de sincronización
- Permite sincronización manual
- Muestra la última vez que se sincronizó

#### **SyncNotification.jsx**
- Notificaciones en tiempo real de cambios
- Diferentes tipos de notificaciones (success, warning, error, info)
- Sistema de lectura/no lectura
- Contador de notificaciones no leídas

### 3. **Componentes Reutilizables**

#### **CourseManager.jsx (shared)**
- Componente base para gestión de cursos
- Funciona tanto para usuarios como administradores
- Recibe props para personalizar comportamiento
- Maneja todas las acciones de cursos

#### **UserCourses.jsx**
- Implementación específica para usuarios
- Usa CourseManager con configuración de usuario
- Maneja acciones específicas del usuario

#### **AdminCourseManager.jsx**
- Implementación específica para administradores
- Usa CourseManager con controles administrativos
- Incluye estadísticas y herramientas de gestión

## 🔄 Flujo de Sincronización

### 1. **Cambio en Admin**
```
Admin realiza cambio → AppContext actualiza estado → 
Marca cambio como pendiente → Trigger de sincronización
```

### 2. **Sincronización**
```
Sincronización automática cada 30s → Envío a servidor → 
Actualización de estado → Notificación a usuarios
```

### 3. **Reflejo en Usuario**
```
Usuario recibe notificación → Estado actualizado → 
UI se actualiza automáticamente → Usuario ve cambios
```

## 📊 Tipos de Datos Sincronizados

### **Cursos**
- Creación, edición, eliminación
- Cambios en contenido y estructura
- Actualizaciones de precios
- Cambios en disponibilidad

### **Certificados**
- Nuevos certificados disponibles
- Actualizaciones de certificados existentes
- Cambios en criterios de obtención

### **Notificaciones**
- Notificaciones del sistema
- Actualizaciones de mantenimiento
- Nuevas funcionalidades

### **Configuración**
- Cambios en configuración global
- Actualizaciones de características
- Cambios en temas y personalización

## 🛠️ Implementación Técnica

### **Estado Global**
```javascript
const initialState = {
  currentUser: null,
  courses: [],
  certificates: [],
  notifications: [],
  appConfig: {},
  syncStatus: {
    isConnected: true,
    lastSync: null,
    pendingChanges: 0
  }
};
```

### **Acciones de Sincronización**
```javascript
const ActionTypes = {
  SET_COURSES: 'SET_COURSES',
  ADD_COURSE: 'ADD_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  SYNC_DATA: 'SYNC_DATA',
  SET_SYNC_STATUS: 'SET_SYNC_STATUS'
};
```

### **Sincronización Automática**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    if (state.syncStatus.pendingChanges > 0) {
      syncWithServer();
    }
  }, 30000);
  return () => clearInterval(interval);
}, [state.syncStatus.pendingChanges]);
```

## 🎯 Beneficios del Sistema

### **Para Administradores**
- Cambios reflejados inmediatamente
- Control total sobre el contenido
- Herramientas de gestión avanzadas
- Estadísticas en tiempo real

### **Para Usuarios**
- Contenido siempre actualizado
- Notificaciones relevantes
- Experiencia fluida
- Sin necesidad de refrescar página

### **Para la Plataforma**
- Consistencia de datos
- Escalabilidad
- Mantenimiento simplificado
- Mejor experiencia de usuario

## 🔧 Configuración y Uso

### **1. Envolver la App con AppProvider**
```javascript
<AppProvider>
  <App />
</AppProvider>
```

### **2. Usar el contexto en componentes**
```javascript
const { courses, addCourse, updateCourse } = useAppContext();
```

### **3. Agregar indicadores de sincronización**
```javascript
<SyncIndicator syncStatus={syncStatus} onSync={syncWithServer} />
<SyncNotification />
```

### **4. Usar componentes reutilizables**
```javascript
<CourseManager 
  userRole="admin"
  showAdminControls={true}
  onCourseAction={handleCourseAction}
/>
```

## 🚀 Futuras Mejoras

### **Sincronización en Tiempo Real**
- WebSockets para actualizaciones instantáneas
- Server-Sent Events para notificaciones push
- Optimistic updates para mejor UX

### **Funcionalidades Avanzadas**
- Sincronización offline
- Conflict resolution
- Versionado de contenido
- Rollback de cambios

### **Monitoreo y Analytics**
- Métricas de sincronización
- Logs de cambios
- Performance monitoring
- Error tracking

## 📝 Notas de Implementación

- El sistema actual usa localStorage para persistencia
- La sincronización con servidor está simulada
- Los componentes están diseñados para ser extensibles
- El sistema es compatible con SSR (Server-Side Rendering)

## 🔍 Debugging

### **Verificar Estado de Sincronización**
```javascript
console.log('Sync Status:', syncStatus);
console.log('Pending Changes:', syncStatus.pendingChanges);
```

### **Forzar Sincronización**
```javascript
syncWithServer();
```

### **Ver Notificaciones**
```javascript
console.log('Notifications:', notifications);
```

---

**Última actualización**: Enero 2024  
**Versión**: 1.0.0  
**Mantenido por**: Equipo de Desarrollo KELUMY
