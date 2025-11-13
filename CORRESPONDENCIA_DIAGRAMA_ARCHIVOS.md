# 📋 CORRESPONDENCIA: DIAGRAMA ↔ ARCHIVOS DEL PROYECTO

## Guía de mapeo entre tu diagrama y la implementación real

---

## 🎯 SEGÚN TU DIAGRAMA ACTUAL

### Lo que YA tienes en tu diagrama:

| Elemento en el Diagrama | Archivo del Proyecto | Descripción |
|------------------------|---------------------|-------------|
| **login** (3 veces mostrados) | `LoginPage.jsx` | Página de inicio de sesión |
| **login con Google, Facebook y Apple** | `LoginPage.jsx` | Integración OAuth (líneas 140-214) |
| **nombre/correo/contraseña** | `LoginPage.jsx` + `RegistrationForm.jsx` | Formulario de credenciales |
| **dashboard** (2 veces) | `Dashboard.jsx` | Panel principal con métricas |
| **crear cuenta / registro** | `RegistrationForm.jsx` | Formulario multi-paso |
| **realizar encuesta adicional de datos** | `RegistrationForm.jsx` | Pasos 1-3 del registro |
| **Gestión de cursos Online** | `modules/cursos/CourseManagement.jsx` | Módulo principal de cursos |
| **inicio** | `Dashboard.jsx` (caso 'inicio') | Vista principal del dashboard |
| **Reporte General del sistema Ingresos vs Egresos Distribución de Costos** | `Dashboard.jsx` (líneas 248-303) | Gráficas del dashboard |
| **Resumen de Cursos** | `CourseManagement.jsx` | Vista overview de cursos |
| **Cursos por categoría** | `modules/cursos/CourseCategories.jsx` | Categorización de cursos |
| **Gest. todos los cursos** | `CourseManagement.jsx` | Listado completo de cursos |
| **Editor de los cursos, contenido a crear** | `modules/cursos/CourseEditor.jsx` | Creación/edición de cursos |
| **Usuarios y roles** | `modules/usuarios/UserManagement.jsx` | Gestión de usuarios |
| **Ecommerce y ventas** | `modules/ecommerce/EcommerceManagement.jsx` | Ventas y transacciones |
| **Certificaciones digitales** | `modules/certificaciones/CertificationManagement.jsx` | Emisión de certificados |
| **Marketing y CRM** | `modules/marketing/MarketingManagement.jsx` | Campañas y leads |
| **Soporte** | `modules/soporte/SupportManagement.jsx` | Chat y tickets |

---

## ✅ LO QUE PUEDES AGREGAR A TU DIAGRAMA

### Elementos implementados pero NO visibles en tu diagrama actual:

| Elemento Faltante | Archivo del Proyecto | Dónde Conectarlo en el Diagrama |
|------------------|---------------------|--------------------------------|
| **Paso 1: Datos personales** | `RegistrationForm.jsx` | Dentro del flujo de "crear cuenta / registro" |
| **Paso 2: Datos académicos** | `RegistrationForm.jsx` | Después del Paso 1 |
| **Paso 3: Datos del curso** | `RegistrationForm.jsx` | Después del Paso 2 |
| **Paso 4: Crear contraseña** | `RegistrationForm.jsx` | Antes de llegar al dashboard |
| **Generación de FOLIO** | `RegistrationForm.jsx` (línea 39) | Automático en el registro |
| **Materiales del Curso** | `modules/cursos/CourseMaterials.jsx` | Submódulo de "Gestión de cursos" |
| **Precios y Ventas** | `modules/cursos/CoursePricing.jsx` | Submódulo de "Gestión de cursos" |
| **Analítica de Cursos** | `modules/cursos/CourseAnalytics.jsx` | Submódulo de "Gestión de cursos" |
| **Información del Curso** | `modules/cursos/CourseInfoView.jsx` | Submódulo de "Gestión de cursos" |
| **Niveles del Curso** | `modules/cursos/CourseLevelsView.jsx` | Submódulo de "Gestión de cursos" |
| **Calificaciones** | `modules/cursos/CourseRating.jsx` | Submódulo de "Gestión de cursos" |
| **Recomendaciones** | `modules/cursos/CourseRecommendations.jsx` | Submódulo de "Gestión de cursos" |
| **Programador de Cursos** | `modules/cursos/CourseScheduler.jsx` | Submódulo de "Gestión de cursos" |
| **Demo del Curso** | `modules/cursos/CourseDemo.jsx` | Submódulo de "Gestión de cursos" |
| **Productos en Línea** | `modules/productos-online/ProductManagement.jsx` | Módulo principal desde Sidebar |
| **Finanzas y Contabilidad** | `modules/finanzas/FinanceManagement.jsx` | Módulo principal desde Sidebar |
| **Administrativo** | `modules/administrativo/AdminManagement.jsx` | Módulo principal desde Sidebar |
| **Reportes Financieros** | `modules/reportes/ReportManagement.jsx` | Módulo principal desde Sidebar |
| **Gestión de Contenido** | `modules/contenido/ContentManagement.jsx` | Módulo principal desde Sidebar |
| **Calendario y Eventos** | `modules/calendario/CalendarManagement.jsx` | Módulo principal desde Sidebar |
| **Correo Masivo** | `modules/correo/EmailManagement.jsx` | Módulo principal desde Sidebar |
| **Configuración** | `modules/configuracion/ConfigManagement.jsx` | Módulo principal desde Sidebar |
| **Notificaciones** | `modules/notificaciones/NotificationSystem.jsx` | Sistema transversal |
| **Pagos** | `modules/pagos/PaymentIntegration.jsx` | Integración de pagos |
| **Suscripciones** | `modules/suscripciones/SubscriptionManagement.jsx` | Gestión de suscripciones |
| **Navbar** | `components/Navbar.jsx` | Barra superior del dashboard |
| **Sidebar** | `components/Sidebar.jsx` | Menú lateral de navegación |
| **Cerrar Sesión** | `Sidebar.jsx` (línea 456-483) | Botón al final del Sidebar |

---

## 🔄 FLUJOS COMPLETOS PARA TU DIAGRAMA

### 1. FLUJO DE AUTENTICACIÓN COMPLETO

```
┌─────────┐
│ INICIO  │
└────┬────┘
     │
     ▼
┌────────────────┐
│  LoginPage     │
├────────────────┤
│ • Email/Pass   │────┐
│ • Google       │────┼──► [Autenticación Exitosa] ──► DASHBOARD
│ • Facebook     │────┤
│ • Twitter      │────┤
│ • Apple        │────┘
└────┬───────────┘
     │
     ▼ [No tiene cuenta]
┌────────────────────┐
│ RegistrationForm   │
├────────────────────┤
│ PASO 1: Datos      │
│   personales       │
│ - Nombre           │
│ - Apellidos        │
│ - Email            │
│ - Contraseña       │
│ - Foto             │
│ - Municipio        │
│ - Teléfono         │
│ - Tutor            │
├────────────────────┤
│ PASO 2: Datos      │
│   académicos       │
│ - Nivel académico  │
│ - Grado            │
│ - Alergias         │
│ - Discapacidades   │
│ - Universidades    │
│ - Carrera          │
├────────────────────┤
│ PASO 3: Datos      │
│   del curso        │
│ - Expectativas     │
│ - Cambio de país   │
│ - FOLIO (auto)     │
├────────────────────┤
│ PASO 4: Crear      │
│   contraseña       │
└────────┬───────────┘
         │
         ▼
    DASHBOARD
```

---

### 2. FLUJO DEL DASHBOARD PRINCIPAL

```
DASHBOARD (activeSection: 'inicio')
│
├── 6 TARJETAS DE MÉTRICAS
│   ├── 👥 Usuarios Activos: 2,847 (+12%)
│   ├── 📚 Cursos Publicados: 156 (+8%)
│   ├── 💰 Ingresos Mensuales: $45,230 (+23%)
│   ├── 📈 Tasa de Conversión: 3.2% (+0.4%)
│   ├── 🏆 Certificados Emitidos: 1,234 (+15%)
│   └── 🛒 Ventas del Mes: 89 (+7%)
│
├── 4 BOTONES DE ACCIÓN RÁPIDA
│   ├── [Reporte Mensual]
│   ├── [Reporte Anual]
│   ├── [Calendario]
│   └── [Alertas]
│
└── 2 GRÁFICAS ANALÍTICAS
    ├── Gráfica 1: Ingresos vs Egresos
    │   └── Comparativa en barras
    │
    └── Gráfica 2: Distribución de Costos
        ├── Docentes
        ├── Licencias
        ├── Marketing
        └── Operación
```

---

### 3. FLUJO DE GESTIÓN DE CURSOS ONLINE (COMPLETO)

```
GESTIÓN DE CURSOS ONLINE
│
├── VISTA PRINCIPAL (CourseManagement.jsx)
│   │
│   ├── Tab: Overview
│   │   ├── Resumen de todos los cursos
│   │   ├── Estadísticas generales
│   │   └── Cursos destacados
│   │
│   ├── Tab: Cursos por Categoría
│   │   ├── 🔬 Ciencias (6 cursos)
│   │   │   ├── Cálculo Diferencial
│   │   │   ├── Física General
│   │   │   ├── Química Orgánica
│   │   │   ├── Álgebra Lineal
│   │   │   ├── Geometría Analítica
│   │   │   └── Estadística Aplicada
│   │   │
│   │   ├── 💻 Tecnología (5 cursos)
│   │   │   ├── Programación Python
│   │   │   ├── Desarrollo Web Full Stack
│   │   │   ├── Diseño UI/UX
│   │   │   ├── Inteligencia Artificial
│   │   │   └── Ciberseguridad
│   │   │
│   │   └── 🎓 Educación (5 cursos)
│   │       ├── Metodologías Activas
│   │       ├── Evaluación del Aprendizaje
│   │       ├── Diseño Instruccional
│   │       ├── Tecnología Educativa
│   │       └── Psicología del Aprendizaje
│   │
│   └── Tab: Gestionar todos los cursos
│       ├── Búsqueda por nombre
│       ├── Filtros por estado
│       ├── Filtros por categoría
│       └── Acciones: Ver | Editar | Eliminar | Duplicar
│
├── SUBCOMPONENTE: Editor de Cursos (CourseEditor.jsx)
│   ├── Información básica
│   │   ├── Título del curso
│   │   ├── Descripción
│   │   ├── Objetivos de aprendizaje
│   │   ├── Requisitos previos
│   │   ├── Imagen de portada
│   │   └── Duración estimada
│   │
│   ├── Configuración
│   │   ├── Categoría
│   │   ├── Nivel (Principiante/Intermedio/Avanzado)
│   │   ├── Instructor asignado
│   │   └── Estado (Borrador/Publicado/Destacado)
│   │
│   └── Acciones
│       ├── [Guardar Borrador]
│       ├── [Publicar Curso]
│       └── [Vista Previa]
│
├── SUBCOMPONENTE: Materiales (CourseMaterials.jsx)
│   ├── Subir materiales
│   │   ├── 🎥 Videos (MP4, MOV)
│   │   ├── 📄 PDFs y documentos
│   │   ├── 📊 Presentaciones
│   │   ├── ✅ Quizzes y evaluaciones
│   │   └── 📦 Paquetes SCORM
│   │
│   ├── Organización
│   │   ├── Módulo 1
│   │   │   ├── Lección 1.1
│   │   │   ├── Lección 1.2
│   │   │   └── Quiz 1
│   │   ├── Módulo 2
│   │   │   ├── Lección 2.1
│   │   │   └── Lección 2.2
│   │   └── Examen Final
│   │
│   └── Control de acceso
│       ├── Contenido gratuito
│       └── Contenido premium
│
├── SUBCOMPONENTE: Precios (CoursePricing.jsx)
│   ├── Configuración de precio
│   │   ├── Precio original: $399
│   │   ├── Precio con descuento: $199
│   │   └── Porcentaje de descuento: 50%
│   │
│   ├── Bundles y paquetes
│   │   ├── Bundle 1: 3 cursos de Ciencias ($499)
│   │   └── Bundle 2: 5 cursos completos ($899)
│   │
│   └── Códigos de descuento
│       ├── PROMO2025: 20% OFF
│       ├── ESTUDIANTE: 15% OFF
│       └── REFERIDO: $50 OFF
│
├── SUBCOMPONENTE: Analítica (CourseAnalytics.jsx)
│   ├── Métricas del curso
│   │   ├── Estudiantes inscritos: 1,250
│   │   ├── Tasa de finalización: 78%
│   │   ├── Calificación promedio: 4.7/5.0
│   │   ├── Tiempo promedio de completación: 35 horas
│   │   └── Ingresos generados: $248,750
│   │
│   ├── Gráficas
│   │   ├── Inscripciones por mes
│   │   ├── Progreso de estudiantes
│   │   └── Lecciones más vistas
│   │
│   └── Puntos de mejora
│       ├── Lecciones con mayor abandono
│       └── Secciones con baja calificación
│
├── SUBCOMPONENTE: Info del Curso (CourseInfoView.jsx)
│   ├── Vista detallada
│   ├── Descripción completa
│   ├── Objetivos de aprendizaje
│   └── Requisitos previos
│
├── SUBCOMPONENTE: Niveles (CourseLevelsView.jsx)
│   ├── Principiante
│   ├── Intermedio
│   └── Avanzado
│
├── SUBCOMPONENTE: Calificaciones (CourseRating.jsx)
│   ├── Sistema de ratings (★★★★★)
│   ├── Comentarios de estudiantes
│   └── Reseñas y testimonios
│
├── SUBCOMPONENTE: Recomendaciones (CourseRecommendations.jsx)
│   ├── Cursos relacionados
│   ├── Algoritmo de sugerencias
│   └── Cursos complementarios
│
├── SUBCOMPONENTE: Programador (CourseScheduler.jsx)
│   ├── Fechas de inicio/fin
│   ├── Calendario de clases en vivo
│   └── Recordatorios automáticos
│
└── SUBCOMPONENTE: Demo (CourseDemo.jsx)
    ├── Vista previa del curso
    ├── Video promocional
    └── Lección de muestra gratuita
```

---

### 4. FLUJO DEL SIDEBAR (MENÚ DE NAVEGACIÓN)

```
SIDEBAR
│
├── [🏠] Inicio ──────────────────────► Dashboard.jsx (inicio)
│
├── [📚] Gestión de Cursos Online ───► CourseManagement.jsx
│
├── [👥] Usuarios y Roles ───────────► UserManagement.jsx
│                                       ├── Tab: Estudiantes
│                                       ├── Tab: Instructores
│                                       └── Tab: Administradores
│
├── [🛒] E-commerce y Ventas ────────► EcommerceManagement.jsx
│                                       ├── Gestión de Pedidos
│                                       ├── Métodos de Pago
│                                       ├── Facturación
│                                       ├── Códigos y Promociones
│                                       └── Reportes de Ventas
│
├── [📦] Productos en línea ─────────► ProductManagement.jsx
│                                       ├── Gestión de Productos
│                                       ├── Precios y Stock
│                                       ├── Categorías
│                                       └── Analítica
│
├── [🏆] Certificaciones Digitales ──► CertificationManagement.jsx
│                                       ├── Generación de Certificados
│                                       ├── Validación y Seguridad
│                                       ├── Historial
│                                       └── Entrega
│
├── [📈] Marketing y CRM ────────────► MarketingManagement.jsx
│                                       ├── Campañas de Email
│                                       ├── Gestión de Leads
│                                       ├── Redes Sociales
│                                       ├── Embudos de Conversión
│                                       └── Analítica
│
├── [💬] Soporte y Comunicación ─────► SupportManagement.jsx
│                                       ├── Chat en Vivo
│                                       ├── Sistema de Tickets
│                                       ├── Mensajería Interna
│                                       └── Base de Conocimiento
│
├── [💰] Finanzas y Contabilidad ────► FinanceManagement.jsx
│                                       ├── Ingresos
│                                       ├── Egresos
│                                       ├── Reportes Financieros
│                                       ├── Conciliación Bancaria
│                                       └── KPIs Financieros
│
├── [🏢] Administrativo ─────────────► AdminManagement.jsx
│                                       ├── Gestión de la Organización
│                                       ├── Gestión de Personal
│                                       ├── Políticas y Procedimientos
│                                       ├── Control de Acceso
│                                       └── Documentación Legal
│
├── [📊] Reportes Financieros ───────► ReportManagement.jsx
│                                       ├── Reportes Generales
│                                       ├── Reportes de Cursos
│                                       ├── Reportes de Usuarios
│                                       ├── Reportes Financieros
│                                       ├── Analítica Avanzada
│                                       └── Exportación de Datos
│
├── [✍️] Gestión de Contenido ───────► ContentManagement.jsx
│                                       ├── Editor de Blog
│                                       ├── SEO y Marketing
│                                       ├── Gestión de Publicaciones
│                                       ├── Noticias y Actualizaciones
│                                       └── Analítica de Contenido
│
├── [📅] Calendario y Eventos ───────► CalendarManagement.jsx
│                                       ├── Gestión de Eventos
│                                       ├── Clases en Vivo
│                                       ├── Recordatorios Automáticos
│                                       ├── Control de Asistencia
│                                       └── Visualización del Calendario
│
├── [✉️] Correo Masivo ──────────────► EmailManagement.jsx
│                                       ├── Campañas de Email
│                                       ├── Listas de Contactos
│                                       ├── Plantillas de Email
│                                       ├── Analítica de Emails
│                                       └── Automatizaciones
│
├── [⚙️] Configuración y Seguridad ──► ConfigManagement.jsx
│                                       ├── Personalización de Marca
│                                       ├── Seguridad
│                                       ├── Políticas y Términos
│                                       ├── Integraciones API
│                                       ├── Configuración de Email
│                                       ├── Configuración General
│                                       └── Mantenimiento
│
└── [🚪] Cerrar Sesión ──────────────► handleLogout() en App.jsx
```

---

## 📊 TABLA RESUMIDA DE CORRESPONDENCIA

| # | Módulo del Sidebar | Archivo del Proyecto | Estado |
|---|-------------------|---------------------|--------|
| 1 | Inicio | `Dashboard.jsx` | ✅ Implementado |
| 2 | Gestión de Cursos Online | `modules/cursos/CourseManagement.jsx` + 13 submódulos | ✅ Implementado |
| 3 | Usuarios y Roles | `modules/usuarios/UserManagement.jsx` | ✅ Implementado |
| 4 | E-commerce y Ventas | `modules/ecommerce/EcommerceManagement.jsx` | ✅ Implementado |
| 5 | Productos en línea | `modules/productos-online/ProductManagement.jsx` | ✅ Implementado |
| 6 | Certificaciones Digitales | `modules/certificaciones/CertificationManagement.jsx` | ✅ Implementado |
| 7 | Marketing y CRM | `modules/marketing/MarketingManagement.jsx` | ✅ Implementado |
| 8 | Soporte y Comunicación | `modules/soporte/SupportManagement.jsx` | ✅ Implementado |
| 9 | Finanzas y Contabilidad | `modules/finanzas/FinanceManagement.jsx` | ✅ Implementado |
| 10 | Administrativo | `modules/administrativo/AdminManagement.jsx` | ✅ Implementado |
| 11 | Reportes Financieros | `modules/reportes/ReportManagement.jsx` | ✅ Implementado |
| 12 | Gestión de Contenido | `modules/contenido/ContentManagement.jsx` | ✅ Implementado |
| 13 | Calendario y Eventos | `modules/calendario/CalendarManagement.jsx` | ✅ Implementado |
| 14 | Correo Masivo | `modules/correo/EmailManagement.jsx` | ✅ Implementado |
| 15 | Configuración | `modules/configuracion/ConfigManagement.jsx` | ✅ Implementado |

---

## 🎯 SUGERENCIAS PARA COMPLETAR TU DIAGRAMA

### 1. Agregar los 4 pasos del registro:

```
[Crear cuenta] ──► [Paso 1: Datos personales]
                        │
                        ▼
                   [Paso 2: Datos académicos]
                        │
                        ▼
                   [Paso 3: Datos del curso]
                        │
                        ▼
                   [Paso 4: Crear contraseña]
                        │
                        ▼
                   [Dashboard]
```

### 2. Expandir "Gestión de Cursos Online" con sus submódulos:

```
[Gestión de Cursos Online]
    │
    ├── [Vista General/Overview]
    ├── [Resumen de Cursos]
    ├── [Cursos por Categoría]
    │   ├── Ciencias (6)
    │   ├── Tecnología (5)
    │   └── Educación (5)
    ├── [Gestionar todos los cursos]
    │
    └── [Submódulos]
        ├── [Editor de Cursos]
        ├── [Materiales del Curso]
        ├── [Precios y Ventas]
        ├── [Analítica de Cursos]
        ├── [Categorías]
        ├── [Información del Curso]
        ├── [Niveles del Curso]
        ├── [Calificaciones]
        ├── [Recomendaciones]
        ├── [Programador]
        └── [Demo del Curso]
```

### 3. Agregar los demás módulos principales:

```
[Dashboard] ──► [Sidebar]
                    │
                    ├── [Inicio]
                    ├── [Gestión de Cursos Online]
                    ├── [Usuarios y Roles]
                    ├── [E-commerce y Ventas]
                    ├── [Productos en línea]
                    ├── [Certificaciones Digitales]
                    ├── [Marketing y CRM]
                    ├── [Soporte y Comunicación]
                    ├── [Finanzas y Contabilidad]
                    ├── [Administrativo]
                    ├── [Reportes Financieros]
                    ├── [Gestión de Contenido]
                    ├── [Calendario y Eventos]
                    ├── [Correo Masivo]
                    ├── [Configuración]
                    └── [Cerrar Sesión]
```

### 4. Expandir los módulos que quieras detallar:

Por ejemplo, para **E-commerce y Ventas**:

```
[E-commerce y Ventas]
    │
    ├── [Gestión de Pedidos]
    │   ├── Pedidos en tiempo real
    │   ├── Estados (pendiente, completado, cancelado)
    │   └── Historial de transacciones
    │
    ├── [Métodos de Pago]
    │   ├── Tarjeta crédito/débito
    │   ├── PayPal
    │   ├── Stripe
    │   ├── Transferencia bancaria
    │   └── OXXO Pay (México)
    │
    ├── [Facturación]
    │   ├── Generación automática
    │   ├── Comprobantes fiscales
    │   └── Historial de facturas
    │
    ├── [Códigos y Promociones]
    │   ├── Códigos de descuento
    │   ├── Cupones promocionales
    │   └── Ofertas especiales
    │
    └── [Reportes de Ventas]
        ├── Ventas diarias/mensuales
        ├── Productos más vendidos
        └── Análisis de conversión
```

---

## 🎨 SUGERENCIAS DE COLORES PARA TU DIAGRAMA

Para hacer tu diagrama más visual, usa estos colores según el tipo de elemento:

| Tipo de Elemento | Color Sugerido | Código Hex |
|-----------------|---------------|-----------|
| **Autenticación** | Morado oscuro | `#7e22ce` |
| **Dashboard/Inicio** | Morado medio | `#9333ea` |
| **Gestión de Cursos** | Azul | `#3b82f6` |
| **Usuarios** | Verde | `#10b981` |
| **E-commerce/Ventas** | Amarillo/Oro | `#f59e0b` |
| **Finanzas** | Verde oscuro | `#059669` |
| **Marketing** | Rosa | `#ec4899` |
| **Soporte** | Cyan | `#06b6d4` |
| **Reportes** | Naranja | `#f97316` |
| **Configuración** | Gris | `#6b7280` |
| **Submódulos** | Color más claro del módulo padre | - |

---

## 📝 NOTAS ADICIONALES

### Componentes Transversales (están en todas partes):

1. **Navbar** (`Navbar.jsx`)
   - Aparece en la parte superior de todas las pantallas después del login
   - Incluye: Logo, botón de menú, notificaciones, perfil, cerrar sesión

2. **Sidebar** (`Sidebar.jsx`)
   - Menú lateral de navegación
   - Adaptativo (compacto/expandido)
   - Aparece en todas las pantallas del dashboard

3. **Sistema de Notificaciones** (`NotificationSystem.jsx`)
   - Sistema transversal para todas las secciones
   - Notificaciones push, alertas, mensajes

### Integraciones Externas:

- **OAuth**: Google, Facebook, Twitter, Apple
- **Pagos**: Stripe, PayPal, OXXO Pay
- **Video**: Zoom, Google Meet (integración prevista)
- **Email**: SMTP configurado en ConfigManagement
- **Calendario**: Sincronización con Google Calendar

---

## ✅ CHECKLIST PARA TU DIAGRAMA

- [ ] Flujo de Login completo con OAuth
- [ ] Registro multi-paso (4 pasos detallados)
- [ ] Dashboard principal con métricas
- [ ] Sidebar con todos los módulos
- [ ] Gestión de Cursos Online expandido con submódulos
- [ ] Usuarios y Roles con 3 tipos de usuarios
- [ ] E-commerce con métodos de pago
- [ ] Certificaciones con generación y validación
- [ ] Marketing con embudos de conversión
- [ ] Soporte con chat y tickets
- [ ] Finanzas con ingresos y egresos
- [ ] Reportes con analítica avanzada
- [ ] Calendario con clases en vivo
- [ ] Correo masivo con automatizaciones
- [ ] Configuración con personalización de marca
- [ ] Flujo de cierre de sesión

---

**Documento creado para:** KELUMY Admin Dashboard  
**Propósito:** Guía de correspondencia entre diagrama y archivos del proyecto  
**Fecha:** Octubre 2025  

© 2025 KELUMY - Plataforma Educativa
