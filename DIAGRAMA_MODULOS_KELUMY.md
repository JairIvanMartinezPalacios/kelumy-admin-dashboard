# 📊 DIAGRAMA DE MÓDULOS - KELUMY ADMIN DASHBOARD
## Guía completa de flujos y funcionalidades

---

## 🎯 ESTRUCTURA GENERAL DEL SISTEMA

```
KELUMY ADMIN DASHBOARD
├── Autenticación (LoginPage.jsx)
├── Dashboard Principal (Dashboard.jsx)
└── Módulos de Gestión (components/modules/)
```

---

## 1️⃣ MÓDULO DE AUTENTICACIÓN
**Archivo:** `src/components/LoginPage.jsx`

### 🔐 Flujo de Login
```
┌─────────────┐
│   INICIO    │
└──────┬──────┘
       │
       v
┌─────────────────┐
│  LoginPage      │
├─────────────────┤
│ Opciones:       │
│ • Email/Pass    │
│ • Google OAuth  │
│ • Twitter OAuth │
│ • Facebook      │
│ • Apple         │
└────────┬────────┘
         │
    ┌────┴────┐
    │ Autenticado?
    └────┬────┘
         │
    ┌────┴────┐
    │   SÍ    │
    v         v
Dashboard   Registro
```

### 📝 Flujo de Registro (Crear Cuenta)
**Archivo:** `src/components/RegistrationForm.jsx`

```
REGISTRO MULTI-PASO
│
├── PASO 1: Datos Personales
│   ├── Nombre completo
│   ├── Apellidos
│   ├── Correo electrónico
│   ├── Contraseña
│   ├── Foto de perfil
│   ├── Municipio
│   ├── Teléfono
│   ├── Nombre del tutor
│   └── Teléfono del tutor
│
├── PASO 2: Datos Académicos
│   ├── Nivel académico (CBTIS, COBAO, etc.)
│   ├── Grado (5to o 6to semestre)
│   ├── Alergias
│   ├── Discapacidades
│   ├── Orientación vocacional
│   ├── Universidades de interés
│   └── Carrera deseada
│
├── PASO 3: Datos del Curso
│   ├── ¿Cambio de país?
│   ├── Expectativas del curso
│   └── Generación de FOLIO automático
│
└── PASO 4: Crear Contraseña
    └── Dashboard
```

**Características adicionales:**
- Generación automática de FOLIO (Ejemplo: `MEEAU25-0001`)
- Integración con OAuth (Google, Twitter, Facebook, Apple)
- Validación de campos en tiempo real
- Encuesta adicional de datos

---

## 2️⃣ DASHBOARD PRINCIPAL (Inicio)
**Archivo:** `src/components/Dashboard.jsx`
**Ruta:** `activeSection: 'inicio'`

### 📊 Componentes del Dashboard

```
DASHBOARD - VISTA PRINCIPAL
│
├── Métricas Principales (6 tarjetas)
│   ├── 👥 Usuarios Activos (2,847)
│   ├── 📚 Cursos Publicados (156)
│   ├── 💰 Ingresos Mensuales ($45,230)
│   ├── 📈 Tasa de Conversión (3.2%)
│   ├── 🏆 Certificados Emitidos (1,234)
│   └── 🛒 Ventas del Mes (89)
│
├── Botones de Acción Rápida
│   ├── Reporte Mensual
│   ├── Reporte Anual
│   ├── Calendario
│   └── Alertas
│
└── Gráficas Analíticas
    ├── Ingresos vs Egresos
    └── Distribución de Costos
        ├── Docentes
        ├── Licencias
        ├── Marketing
        └── Operación
```

---

## 3️⃣ GESTIÓN DE CURSOS ONLINE
**Archivo:** `src/components/modules/cursos/CourseManagement.jsx`
**Ruta:** `activeSection: 'cursos'`

### 📚 Subcomponentes del Módulo de Cursos

```
GESTIÓN DE CURSOS ONLINE
│
├── Vista General (Overview)
│   ├── Resumen de todos los cursos
│   ├── Cursos por categoría
│   ├── Cursos destacados
│   └── Estadísticas generales
│
├── 🎨 Editor de Cursos (CourseEditor.jsx)
│   ├── Crear nuevo curso
│   ├── Editar curso existente
│   ├── Configurar contenido
│   ├── Subir videos, PDFs, quizzes
│   ├── Estado: Borrador/Publicado/Destacado
│   └── Asignar instructor
│
├── 📁 Materiales del Curso (CourseMaterials.jsx)
│   ├── Gestión de archivos
│   ├── Subida de materiales (videos, PDFs, SCORM)
│   ├── Organización por lecciones
│   └── Control de acceso a materiales
│
├── 💲 Precios y Ventas (CoursePricing.jsx)
│   ├── Configurar precio del curso
│   ├── Precio original vs descuento
│   ├── Bundles y paquetes
│   ├── Códigos de descuento
│   └── Promociones especiales
│
├── 📊 Analítica de Cursos (CourseAnalytics.jsx)
│   ├── Estadísticas de inscripciones
│   ├── Tasa de finalización
│   ├── Ingresos por curso
│   ├── Calificaciones de estudiantes
│   └── Tendencias de popularidad
│
├── 📋 Categorías (CourseCategories.jsx)
│   ├── Ciencias (Matemáticas, Física, Química)
│   ├── Tecnología (Programación, Desarrollo Web)
│   ├── Educación (Pedagogía, Docencia)
│   └── Gestión de categorías
│
├── 📝 Información del Curso (CourseInfoView.jsx)
│   ├── Detalles del curso
│   ├── Descripción completa
│   ├── Objetivos de aprendizaje
│   └── Requisitos previos
│
├── 🎓 Niveles del Curso (CourseLevelsView.jsx)
│   ├── Principiante
│   ├── Intermedio
│   └── Avanzado
│
├── ⭐ Calificaciones (CourseRating.jsx)
│   ├── Sistema de ratings
│   ├── Comentarios de estudiantes
│   └── Reseñas y testimonios
│
├── 🎯 Recomendaciones (CourseRecommendations.jsx)
│   ├── Cursos relacionados
│   ├── Algoritmo de sugerencias
│   └── Cursos complementarios
│
├── 📅 Programador de Cursos (CourseScheduler.jsx)
│   ├── Fechas de inicio/fin
│   ├── Calendario de clases en vivo
│   └── Recordatorios automáticos
│
├── 🎬 Demo del Curso (CourseDemo.jsx)
│   ├── Vista previa del curso
│   ├── Video promocional
│   └── Lección de muestra
│
└── 📄 Gestión de Contenido (ContentManagement.jsx)
    ├── Edición de lecciones
    ├── Estructura del curso
    └── Secuencia de aprendizaje
```

### 🎯 Cursos Disponibles (Ejemplos Implementados)

**Categoría CIENCIAS:**
1. Cálculo Diferencial e Integral
2. Física General
3. Química Orgánica
4. Álgebra Lineal
5. Geometría Analítica
6. Estadística Aplicada

**Categoría TECNOLOGÍA:**
1. Programación Python
2. Desarrollo Web Full Stack
3. Diseño UI/UX
4. Inteligencia Artificial
5. Ciberseguridad

**Categoría EDUCACIÓN:**
1. Metodologías Activas
2. Evaluación del Aprendizaje
3. Diseño Instruccional
4. Tecnología Educativa
5. Psicología del Aprendizaje

---

## 4️⃣ USUARIOS Y ROLES
**Archivo:** `src/components/modules/usuarios/UserManagement.jsx`
**Ruta:** `activeSection: 'usuarios'`

```
GESTIÓN DE USUARIOS Y ROLES
│
├── 👨‍🎓 Estudiantes
│   ├── Registro de estudiantes
│   ├── Seguimiento de progreso
│   ├── Cursos inscritos
│   ├── Calificaciones
│   ├── Certificaciones emitidas
│   ├── Historial de pagos
│   └── Último acceso
│
├── 👨‍🏫 Instructores
│   ├── Perfil del instructor
│   ├── Cursos asignados
│   ├── Estudiantes activos
│   ├── Calificación promedio
│   ├── Pagos por regalías
│   └── Estadísticas de desempeño
│
├── 👑 Administradores
│   ├── Gestión de permisos
│   ├── Sub-roles
│   ├── Acceso total al sistema
│   └── Configuración de seguridad
│
└── Funciones Generales
    ├── Búsqueda de usuarios
    ├── Filtros por rol/estado
    ├── Editar información
    ├── Activar/Desactivar cuentas
    ├── Exportar datos
    └── Envío de correos masivos
```

---

## 5️⃣ E-COMMERCE Y VENTAS
**Archivo:** `src/components/modules/ecommerce/EcommerceManagement.jsx`
**Ruta:** `activeSection: 'ecommerce'`

```
E-COMMERCE Y VENTAS
│
├── 💳 Gestión de Pedidos
│   ├── Pedidos en tiempo real
│   ├── Estados (pendiente, completado, cancelado)
│   ├── Historial de transacciones
│   └── Seguimiento de envíos (si aplica)
│
├── 💰 Métodos de Pago
│   ├── Tarjeta de crédito/débito
│   ├── PayPal
│   ├── Stripe
│   ├── Transferencia bancaria
│   ├── OXXO Pay (México)
│   └── Otros métodos locales
│
├── 🧾 Facturación
│   ├── Generación automática de facturas
│   ├── Comprobantes fiscales (México)
│   ├── RFC y datos fiscales
│   └── Historial de facturas
│
├── 🎫 Códigos y Promociones
│   ├── Códigos de descuento
│   ├── Cupones promocionales
│   ├── Ofertas especiales
│   ├── Bundles (paquetes)
│   └── Descuentos por temporada
│
└── 📈 Reportes de Ventas
    ├── Ventas diarias/mensuales/anuales
    ├── Productos más vendidos
    ├── Análisis de conversión
    └── Tasa de abandono de carrito
```

---

## 6️⃣ PRODUCTOS EN LÍNEA
**Archivo:** `src/components/modules/productos-online/ProductManagement.jsx`
**Ruta:** `activeSection: 'productos-online'`

```
PRODUCTOS EN LÍNEA (Catálogo Digital)
│
├── 📦 Gestión de Productos
│   ├── Crear nuevo producto
│   ├── Editar producto existente
│   ├── Categorización
│   ├── Imágenes del producto
│   └── Descripción detallada
│
├── 💲 Precios y Stock
│   ├── Precio base
│   ├── Precio con descuento
│   ├── Control de inventario
│   └── Disponibilidad
│
├── 🏷️ Categorías de Productos
│   ├── Cursos individuales
│   ├── Bundles/Paquetes
│   ├── Suscripciones
│   ├── Membresías
│   └── Materiales complementarios
│
└── 📊 Analítica de Productos
    ├── Productos más vistos
    ├── Tasa de conversión por producto
    ├── Reseñas y calificaciones
    └── Recomendaciones de mejora
```

---

## 7️⃣ CERTIFICACIONES DIGITALES
**Archivo:** `src/components/modules/certificaciones/CertificationManagement.jsx`
**Ruta:** `activeSection: 'certificaciones'`

```
CERTIFICACIONES DIGITALES
│
├── 🏆 Generación de Certificados
│   ├── Generación automática
│   ├── Plantillas personalizables
│   ├── Datos del estudiante
│   ├── Datos del curso
│   ├── Fecha de emisión
│   └── Firma electrónica
│
├── 🔐 Validación y Seguridad
│   ├── Código QR de validación
│   ├── ID único de certificado
│   ├── Verificación online
│   └── Blockchain (opcional)
│
├── 📋 Historial de Certificados
│   ├── Certificados emitidos
│   ├── Búsqueda por estudiante
│   ├── Búsqueda por curso
│   ├── Fecha de emisión
│   └── Exportar listado
│
└── 📤 Entrega de Certificados
    ├── Envío automático por correo
    ├── Descarga desde plataforma
    ├── Compartir en redes sociales
    └── Integración con LinkedIn
```

---

## 8️⃣ MARKETING Y CRM
**Archivo:** `src/components/modules/marketing/MarketingManagement.jsx`
**Ruta:** `activeSection: 'marketing'`

```
MARKETING Y CRM
│
├── 📧 Campañas de Email
│   ├── Correos masivos
│   ├── Newsletters
│   ├── Promociones
│   ├── Recordatorios
│   ├── Seguimiento automático
│   └── Plantillas personalizables
│
├── 🎯 Gestión de Leads
│   ├── Captura de leads
│   ├── Formularios de contacto
│   ├── Landing pages
│   ├── Lead scoring
│   └── Seguimiento de conversión
│
├── 📱 Redes Sociales
│   ├── Integración con Facebook
│   ├── Integración con Instagram
│   ├── Integración con Twitter
│   ├── Pixel de seguimiento
│   └── Publicación automática
│
├── 🚀 Embudos de Conversión
│   ├── Visitante → Lead
│   ├── Lead → Prospecto
│   ├── Prospecto → Cliente
│   └── Cliente → Cliente recurrente
│
└── 📊 Analítica de Marketing
    ├── Tasa de apertura de emails
    ├── CTR (Click Through Rate)
    ├── Conversiones
    ├── ROI de campañas
    └── Segmentación de audiencia
```

---

## 9️⃣ SOPORTE Y COMUNICACIÓN
**Archivo:** `src/components/modules/soporte/SupportManagement.jsx`
**Ruta:** `activeSection: 'soporte'`

```
SOPORTE Y COMUNICACIÓN
│
├── 💬 Chat en Vivo
│   ├── Chat con estudiantes
│   ├── Chat con instructores
│   ├── Estado: Disponible/Ocupado/Offline
│   ├── Historial de conversaciones
│   └── Respuestas automáticas
│
├── 🎫 Sistema de Tickets
│   ├── Crear ticket de soporte
│   ├── Categorización (técnico, académico, ventas)
│   ├── Prioridad (baja, media, alta, urgente)
│   ├── Asignación a agentes
│   ├── Estado (abierto, en proceso, cerrado)
│   └── Historial de tickets
│
├── 📨 Mensajería Interna
│   ├── Mensajes directos
│   ├── Notificaciones push
│   ├── Anuncios generales
│   └── Comunicados importantes
│
└── 📚 Base de Conocimiento
    ├── FAQs (Preguntas Frecuentes)
    ├── Tutoriales
    ├── Guías de usuario
    ├── Videos explicativos
    └── Centro de ayuda
```

---

## 🔟 FINANZAS Y CONTABILIDAD
**Archivo:** `src/components/modules/finanzas/FinanceManagement.jsx`
**Ruta:** `activeSection: 'finanzas'`

```
FINANZAS Y CONTABILIDAD
│
├── 💰 Ingresos
│   ├── Ventas de cursos
│   ├── Suscripciones
│   ├── Pagos únicos
│   ├── Pagos recurrentes
│   └── Otros ingresos
│
├── 💸 Egresos
│   ├── Pagos a instructores (regalías)
│   ├── Costos de operación
│   ├── Marketing y publicidad
│   ├── Licencias de software
│   ├── Hosting y servidores
│   └── Gastos administrativos
│
├── 📊 Reportes Financieros
│   ├── Estado de resultados
│   ├── Flujo de efectivo
│   ├── Balance general
│   ├── Proyecciones financieras
│   └── Análisis de rentabilidad
│
├── 🏦 Conciliación Bancaria
│   ├── Integración con bancos
│   ├── Conciliación automática
│   ├── Registro de transacciones
│   └── Arqueo de caja
│
└── 📈 KPIs Financieros
    ├── Revenue (Ingresos totales)
    ├── MRR (Monthly Recurring Revenue)
    ├── Tasa de crecimiento
    ├── Margen de ganancia
    └── CAC (Costo de Adquisición de Cliente)
```

---

## 1️⃣1️⃣ ADMINISTRATIVO
**Archivo:** `src/components/modules/administrativo/AdminManagement.jsx`
**Ruta:** `activeSection: 'administrativo'`

```
MÓDULO ADMINISTRATIVO
│
├── 🏢 Gestión de la Organización
│   ├── Información de la empresa
│   ├── Estructura organizacional
│   ├── Departamentos
│   └── Áreas de trabajo
│
├── 👥 Gestión de Personal
│   ├── Empleados/Staff
│   ├── Roles y permisos
│   ├── Horarios
│   └── Nómina (integración)
│
├── 📋 Políticas y Procedimientos
│   ├── Manual de operación
│   ├── Políticas internas
│   ├── Términos y condiciones
│   └── Políticas de privacidad
│
├── 🔐 Control de Acceso
│   ├── Permisos por rol
│   ├── Restricciones de acceso
│   ├── Auditoría de acciones
│   └── Logs del sistema
│
└── 📄 Documentación Legal
    ├── Contratos
    ├── Acuerdos de confidencialidad
    ├── Licencias
    └── Documentos legales
```

---

## 1️⃣2️⃣ REPORTES FINANCIEROS Y ANALÍTICA
**Archivo:** `src/components/modules/reportes/ReportManagement.jsx`
**Ruta:** `activeSection: 'reportes'`

```
REPORTES Y ANALÍTICA
│
├── 📊 Reportes Generales
│   ├── Reporte General del Sistema
│   ├── Ingresos vs Egresos
│   ├── Distribución de Costos
│   └── Resumen Ejecutivo
│
├── 📚 Reportes de Cursos
│   ├── Cursos por categoría
│   ├── Cursos más vendidos
│   ├── Todos los cursos
│   ├── Tasa de finalización
│   └── Calificaciones promedio
│
├── 👥 Reportes de Usuarios
│   ├── Usuarios activos
│   ├── Nuevos registros
│   ├── Tasa de retención
│   └── Análisis demográfico
│
├── 💰 Reportes Financieros
│   ├── Ventas por periodo
│   ├── Ventas por curso
│   ├── Ventas por instructor
│   ├── Ingresos recurrentes
│   └── Proyecciones
│
├── 📈 Analítica Avanzada
│   ├── Google Analytics
│   ├── Tráfico web
│   ├── Conversiones
│   ├── Abandono de carrito
│   └── Comportamiento de usuarios
│
└── 📤 Exportación de Datos
    ├── Exportar a Excel
    ├── Exportar a PDF
    ├── Exportar a CSV
    └── Programar reportes automáticos
```

---

## 1️⃣3️⃣ GESTIÓN DE CONTENIDO Y BLOG
**Archivo:** `src/components/modules/contenido/ContentManagement.jsx`
**Ruta:** `activeSection: 'contenido'`

```
GESTIÓN DE CONTENIDO Y BLOG
│
├── ✍️ Editor de Blog
│   ├── Crear artículo nuevo
│   ├── Editar artículo existente
│   ├── Editor de texto enriquecido
│   ├── Insertar imágenes/videos
│   └── Programar publicación
│
├── 🎯 SEO y Marketing
│   ├── Optimización SEO
│   ├── Meta-descripciones
│   ├── Keywords/Palabras clave
│   ├── URLs amigables
│   └── Open Graph (redes sociales)
│
├── 📰 Gestión de Publicaciones
│   ├── Artículos publicados
│   ├── Borradores
│   ├── Programados
│   ├── Categorías
│   └── Etiquetas (tags)
│
├── 📢 Noticias y Actualizaciones
│   ├── Comunicados de prensa
│   ├── Actualizaciones de plataforma
│   ├── Novedades de cursos
│   └── Eventos especiales
│
└── 📊 Analítica de Contenido
    ├── Artículos más leídos
    ├── Tiempo de lectura promedio
    ├── Compartidos en redes sociales
    └── Tráfico generado al sitio
```

---

## 1️⃣4️⃣ CALENDARIO Y EVENTOS ONLINE
**Archivo:** `src/components/modules/calendario/CalendarManagement.jsx`
**Ruta:** `activeSection: 'calendario'`

```
CALENDARIO Y EVENTOS ONLINE
│
├── 📅 Gestión de Eventos
│   ├── Crear evento
│   ├── Editar evento
│   ├── Eliminar evento
│   ├── Eventos recurrentes
│   └── Tipos de eventos (clase, webinar, reunión)
│
├── 🎥 Clases en Vivo
│   ├── Programación de clases
│   ├── Integración con Zoom
│   ├── Integración con Google Meet
│   ├── Sala de conferencias integrada
│   └── Grabación de sesiones
│
├── 🔔 Recordatorios Automáticos
│   ├── Email de recordatorio (24h antes)
│   ├── Email de recordatorio (1h antes)
│   ├── Notificaciones push
│   └── SMS (opcional)
│
├── 📊 Control de Asistencia
│   ├── Lista de asistentes
│   ├── Registro de asistencia
│   ├── Reporte de participación
│   └── Certificados de asistencia
│
└── 🗓️ Visualización del Calendario
    ├── Vista mensual
    ├── Vista semanal
    ├── Vista diaria
    ├── Filtros por tipo de evento
    └── Sincronización con Google Calendar
```

---

## 1️⃣5️⃣ CORREO MASIVO (EMAIL MARKETING)
**Archivo:** `src/components/modules/correo/EmailManagement.jsx`
**Ruta:** `activeSection: 'correo'`

```
CORREO MASIVO Y EMAIL MARKETING
│
├── ✉️ Campañas de Email
│   ├── Crear nueva campaña
│   ├── Editor de emails (drag & drop)
│   ├── Plantillas prediseñadas
│   ├── Personalización de contenido
│   └── Programar envío
│
├── 👥 Listas de Contactos
│   ├── Segmentación de audiencia
│   ├── Listas por categoría
│   ├── Importar contactos (CSV/Excel)
│   ├── Exportar contactos
│   └── Gestión de suscriptores
│
├── 🎨 Plantillas de Email
│   ├── Bienvenida
│   ├── Newsletters
│   ├── Promociones
│   ├── Recordatorios
│   ├── Confirmaciones
│   └── Recuperación de contraseña
│
├── 📊 Analítica de Emails
│   ├── Tasa de apertura
│   ├── Tasa de clics (CTR)
│   ├── Tasa de rebote
│   ├── Desuscripciones
│   └── Conversiones generadas
│
└── ⚙️ Automatizaciones
    ├── Emails de bienvenida
    ├── Secuencias de onboarding
    ├── Emails de carrito abandonado
    ├── Emails de re-engagement
    └── Flujos de nurturing
```

---

## 1️⃣6️⃣ CONFIGURACIÓN Y SEGURIDAD
**Archivo:** `src/components/modules/configuracion/ConfigManagement.jsx`
**Ruta:** `activeSection: 'configuracion'`

```
CONFIGURACIÓN Y SEGURIDAD
│
├── 🎨 Personalización de Marca
│   ├── Logo de la plataforma
│   ├── Colores corporativos
│   ├── Tipografías
│   ├── Favicon
│   └── Dominio personalizado
│
├── 🔐 Seguridad
│   ├── Autenticación de dos factores (2FA)
│   ├── Políticas de contraseñas
│   ├── Roles y permisos
│   ├── Restricción de IP
│   ├── Sesiones activas
│   └── Logs de seguridad
│
├── 📜 Políticas y Términos
│   ├── Términos de uso
│   ├── Política de privacidad
│   ├── Política de cookies
│   ├── Política de reembolsos
│   └── Aviso legal
│
├── 🔌 Integraciones API
│   ├── Página web de ventas
│   ├── CRM externo
│   ├── Plataformas de pago
│   ├── Herramientas de marketing
│   └── Servicios de email
│
├── 📧 Configuración de Email
│   ├── SMTP personalizado
│   ├── Emails transaccionales
│   ├── Remitente por defecto
│   └── Plantillas de email
│
├── 🌐 Configuración General
│   ├── Idioma de la plataforma
│   ├── Zona horaria
│   ├── Moneda
│   ├── Formato de fecha
│   └── Unidades de medida
│
└── 🛠️ Mantenimiento
    ├── Modo mantenimiento
    ├── Backups automáticos
    ├── Limpieza de caché
    ├── Actualización del sistema
    └── Logs de errores
```

---

## 🎯 COMPONENTES TRANSVERSALES

### Navbar (Barra Superior)
**Archivo:** `src/components/Navbar.jsx`

```
NAVBAR
├── Logo KELUMY
├── Botón de menú (móvil)
├── Botón de modo compacto (desktop)
├── Notificaciones
├── Perfil de usuario
└── Botón de cerrar sesión
```

### Sidebar (Menú Lateral)
**Archivo:** `src/components/Sidebar.jsx`

```
SIDEBAR (MENÚ DE NAVEGACIÓN)
├── Inicio
├── Gestión de Cursos Online
├── Usuarios y Roles
├── E-commerce y Ventas
├── Productos en línea
├── Certificaciones Digitales
├── Marketing y CRM
├── Soporte y Comunicación
├── Finanzas y Contabilidad
├── Administrativo
├── Reportes Financieros y Analítica
├── Gestión de Contenido y Blog
├── Calendario y Eventos Online
├── Correo Masivo
├── Configuración y Seguridad
└── Cerrar Sesión
```

**Características del Sidebar:**
- Modo compacto (solo iconos)
- Modo expandido (iconos + texto)
- Adaptativo (móvil, tablet, desktop)
- Tooltips informativos
- Long-press en móviles
- Hover en desktop

---

## 🔄 FLUJO COMPLETO DEL SISTEMA

```
1. ACCESO AL SISTEMA
   ├── Login con credenciales
   ├── OAuth (Google, Facebook, Twitter, Apple)
   └── Registro de nueva cuenta (multi-paso)
        │
        v
2. DASHBOARD PRINCIPAL
   ├── Resumen de métricas
   ├── Acciones rápidas
   └── Gráficas analíticas
        │
        v
3. NAVEGACIÓN POR MÓDULOS (desde Sidebar)
   │
   ├── 📚 GESTIÓN DE CURSOS
   │   ├── Crear/Editar cursos
   │   ├── Subir materiales
   │   ├── Configurar precios
   │   └── Ver analíticas
   │
   ├── 👥 USUARIOS Y ROLES
   │   ├── Gestionar estudiantes
   │   ├── Gestionar instructores
   │   └── Administrar permisos
   │
   ├── 🛒 E-COMMERCE
   │   ├── Ver pedidos
   │   ├── Gestionar pagos
   │   └── Emitir facturas
   │
   ├── 📦 PRODUCTOS
   │   ├── Catálogo de productos
   │   └── Gestión de inventario
   │
   ├── 🏆 CERTIFICACIONES
   │   ├── Generar certificados
   │   └── Validar certificados
   │
   ├── 📧 MARKETING Y CRM
   │   ├── Campañas de email
   │   ├── Gestión de leads
   │   └── Redes sociales
   │
   ├── 💬 SOPORTE
   │   ├── Chat en vivo
   │   ├── Tickets de soporte
   │   └── Base de conocimiento
   │
   ├── 💰 FINANZAS
   │   ├── Ingresos y egresos
   │   ├── Reportes financieros
   │   └── KPIs
   │
   ├── 🏢 ADMINISTRATIVO
   │   ├── Gestión organizacional
   │   ├── Políticas
   │   └── Control de acceso
   │
   ├── 📊 REPORTES
   │   ├── Reportes generales
   │   ├── Analítica avanzada
   │   └── Exportación de datos
   │
   ├── ✍️ CONTENIDO Y BLOG
   │   ├── Crear artículos
   │   ├── Optimización SEO
   │   └── Gestión de publicaciones
   │
   ├── 📅 CALENDARIO
   │   ├── Programar eventos
   │   ├── Clases en vivo
   │   └── Recordatorios
   │
   ├── ✉️ CORREO MASIVO
   │   ├── Crear campañas
   │   ├── Gestión de listas
   │   └── Automatizaciones
   │
   └── ⚙️ CONFIGURACIÓN
       ├── Personalización
       ├── Seguridad
       └── Integraciones
```

---

## 📁 ESTRUCTURA DE ARCHIVOS DEL PROYECTO

```
kelumi-admin-dashboard/
│
├── src/
│   ├── App.jsx                          [Componente raíz]
│   ├── main.jsx                         [Punto de entrada]
│   ├── index.css                        [Estilos globales]
│   │
│   ├── components/
│   │   ├── Navbar.jsx                   [Barra superior]
│   │   ├── Sidebar.jsx                  [Menú lateral]
│   │   ├── Dashboard.jsx                [Dashboard principal]
│   │   ├── LoginPage.jsx                [Página de login]
│   │   ├── RegistrationForm.jsx         [Formulario de registro]
│   │   ├── Footer.jsx                   [Pie de página]
│   │   │
│   │   └── modules/                     [Módulos principales]
│   │       │
│   │       ├── cursos/                  [Gestión de Cursos]
│   │       │   ├── CourseManagement.jsx
│   │       │   ├── CourseEditor.jsx
│   │       │   ├── CourseMaterials.jsx
│   │       │   ├── CoursePricing.jsx
│   │       │   ├── CourseAnalytics.jsx
│   │       │   ├── CourseCategories.jsx
│   │       │   ├── CourseInfoView.jsx
│   │       │   ├── CourseLevelsView.jsx
│   │       │   ├── CourseRating.jsx
│   │       │   ├── CourseRecommendations.jsx
│   │       │   ├── CourseScheduler.jsx
│   │       │   ├── CourseDemo.jsx
│   │       │   └── ContentManagement.jsx
│   │       │
│   │       ├── usuarios/                [Usuarios y Roles]
│   │       │   └── UserManagement.jsx
│   │       │
│   │       ├── ecommerce/               [E-commerce]
│   │       │   └── EcommerceManagement.jsx
│   │       │
│   │       ├── productos-online/        [Productos]
│   │       │   └── ProductManagement.jsx
│   │       │
│   │       ├── certificaciones/         [Certificaciones]
│   │       │   └── CertificationManagement.jsx
│   │       │
│   │       ├── marketing/               [Marketing]
│   │       │   └── MarketingManagement.jsx
│   │       │
│   │       ├── soporte/                 [Soporte]
│   │       │   └── SupportManagement.jsx
│   │       │
│   │       ├── finanzas/                [Finanzas]
│   │       │   └── FinanceManagement.jsx
│   │       │
│   │       ├── administrativo/          [Administrativo]
│   │       │   └── AdminManagement.jsx
│   │       │
│   │       ├── reportes/                [Reportes]
│   │       │   └── ReportManagement.jsx
│   │       │
│   │       ├── contenido/               [Contenido]
│   │       │   └── ContentManagement.jsx
│   │       │
│   │       ├── calendario/              [Calendario]
│   │       │   └── CalendarManagement.jsx
│   │       │
│   │       ├── correo/                  [Email Marketing]
│   │       │   └── EmailManagement.jsx
│   │       │
│   │       ├── configuracion/           [Configuración]
│   │       │   └── ConfigManagement.jsx
│   │       │
│   │       ├── notificaciones/          [Notificaciones]
│   │       │   └── NotificationSystem.jsx
│   │       │
│   │       ├── pagos/                   [Pagos]
│   │       │   └── PaymentIntegration.jsx
│   │       │
│   │       └── suscripciones/           [Suscripciones]
│   │           └── SubscriptionManagement.jsx
│   │
│   └── styles/
│       └── animations.css               [Animaciones personalizadas]
│
├── public/
│   └── img/
│       ├── logo_kelumi.png
│       ├── fondo1.png
│       └── fondo2.png
│
├── package.json                         [Dependencias del proyecto]
├── tailwind.config.js                   [Configuración de Tailwind]
├── vite.config.js                       [Configuración de Vite]
└── README.md                            [Documentación]
```

---

## 🎨 PALETA DE COLORES KELUMY

```css
/* Colores Principales */
--primary-400: #a855f7   /* Morado claro */
--primary-500: #9333ea   /* Morado medio */
--primary-600: #7e22ce   /* Morado oscuro */
--primary-700: #6b21a8   /* Morado muy oscuro */
--primary-800: #581c87   /* Morado extra oscuro */

--secondary-500: #ec4899 /* Rosa medio */
--secondary-600: #db2777 /* Rosa oscuro */

/* Colores Específicos de Kelumy */
--kelumy-dark: #1e081d   /* Fondo oscuro principal */
--kelumy-purple: #a82ba0 /* Morado Kelumy */
--kelumy-pink: #d0008b   /* Rosa Kelumy */
--kelumy-light: #e9d1e6  /* Rosa claro */

/* Efectos Glassmorphism */
background: white/10
backdrop-blur: 2xl
border: white/20
```

---

## 🚀 TECNOLOGÍAS UTILIZADAS

- **Framework:** React 18+ (con Hooks)
- **Enrutamiento:** React Router (en desarrollo)
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **Build Tool:** Vite
- **Estado:** React useState/useEffect
- **Autenticación:** OAuth (Google, Facebook, Twitter, Apple)
- **Animaciones:** CSS Animations + Tailwind

---

## 📝 NOTAS PARA EL DIAGRAMA

### Según tu diagrama actual, aquí está lo que corresponde:

1. **Login** → `LoginPage.jsx`
   - Incluye login con email/contraseña
   - OAuth (Google, Facebook, Apple)
   
2. **Nombre/Correo/Contraseña** → `LoginPage.jsx` + `RegistrationForm.jsx`
   
3. **Dashboard** → `Dashboard.jsx` (Página de inicio con métricas)

4. **Crear cuenta / Registro** → `RegistrationForm.jsx`
   - Paso 1: Datos personales
   - Paso 2: Datos académicos  
   - Paso 3: Datos del curso
   - Paso 4: Crear contraseña

5. **Gestión de Cursos Online** → `CourseManagement.jsx`
   - Incluye todos los subcomponentes (Editor, Materiales, Precios, etc.)

6. **Reportes** → `ReportManagement.jsx`
   - Reporte General del Sistema
   - Ingresos vs Egresos
   - Distribución de Costos

7. **Resumen de Cursos** → Dentro de `CourseManagement.jsx`

8. **Cursos por Categoría** → `CourseCategories.jsx`

9. **Gestión de todos los cursos** → `CourseManagement.jsx` (vista overview)

10. **Editor de cursos, contenido a crear** → `CourseEditor.jsx`

11. **Usuarios y Roles** → `UserManagement.jsx`

12. **E-commerce y Ventas** → `EcommerceManagement.jsx`

13. **Certificaciones Digitales** → `CertificationManagement.jsx`

14. **Marketing y CRM** → `MarketingManagement.jsx`

15. **Soporte** → `SupportManagement.jsx`

---

## ✅ CHECKLIST DE MÓDULOS IMPLEMENTADOS

- [✅] Autenticación (Login/Registro)
- [✅] Dashboard Principal
- [✅] Gestión de Cursos Online (completo con 13 subcomponentes)
- [✅] Usuarios y Roles
- [✅] E-commerce y Ventas
- [✅] Productos en Línea
- [✅] Certificaciones Digitales
- [✅] Marketing y CRM
- [✅] Soporte y Comunicación
- [✅] Finanzas y Contabilidad
- [✅] Administrativo
- [✅] Reportes y Analítica
- [✅] Gestión de Contenido y Blog
- [✅] Calendario y Eventos Online
- [✅] Correo Masivo
- [✅] Configuración y Seguridad
- [✅] Sidebar responsivo con tooltips
- [✅] Navbar con notificaciones
- [✅] Sistema de notificaciones
- [✅] Integración de pagos
- [✅] Sistema de suscripciones

---

## 🎯 PRÓXIMOS PASOS SUGERIDOS

1. **Backend/API:**
   - Conectar con base de datos
   - Implementar API REST
   - Autenticación JWT

2. **Funcionalidades Avanzadas:**
   - Implementar sistema de pagos real
   - Integrar con plataformas de video (Vimeo, YouTube)
   - Sistema de gamificación

3. **Optimizaciones:**
   - Lazy loading de componentes
   - Optimización de imágenes
   - Cache de datos

4. **Testing:**
   - Unit tests
   - Integration tests
   - E2E tests

---

**Documento generado para:** KELUMY Admin Dashboard  
**Fecha:** Octubre 2025  
**Versión:** 1.0  
**Estado del Proyecto:** En desarrollo activo

---

© 2025 KELUMY - Plataforma Educativa

