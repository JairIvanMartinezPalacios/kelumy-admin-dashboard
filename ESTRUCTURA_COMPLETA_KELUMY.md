# 🎓 ESTRUCTURA COMPLETA DE KELUMY - PLATAFORMA EDUCATIVA E-COMMERCE

## 📋 ÍNDICE GENERAL
1. [Estructura del Proyecto Principal](#estructura-del-proyecto-principal)
2. [Backend y API](#backend-y-api)
3. [Frontend - React/TypeScript](#frontend---reacttypescript)
4. [Módulos de Administración](#módulos-de-administración)
5. [Módulos de Usuario/Estudiante](#módulos-de-usuarioestudiante)
6. [Módulos de Investigación E-commerce](#módulos-de-investigación-e-commerce)
7. [Servicios y Utilidades](#servicios-y-utilidades)
8. [Base de Datos](#base-de-datos)
9. [Configuración y Deployment](#configuración-y-deployment)

---

## 🏗️ ESTRUCTURA DEL PROYECTO PRINCIPAL

```
kelumi-admin-dashboard/
├── 📁 backend/                          # Backend Node.js/TypeScript
├── 📁 database/                         # Esquemas de base de datos
├── 📁 mqerk_ver1/                       # Versión anterior del proyecto
├── 📁 node_modules/                     # Dependencias de Node.js
├── 📁 pruebas/                          # Módulos de prueba y mockups
├── 📁 public/                           # Archivos públicos estáticos
├── 📁 src/                              # Código fuente principal
├── 📁 prisma/                           # ORM Prisma
├── 📄 package.json                      # Configuración del proyecto
├── 📄 vite.config.js                    # Configuración de Vite
├── 📄 tailwind.config.js                # Configuración de Tailwind CSS
├── 📄 tsconfig.json                     # Configuración de TypeScript
└── 📄 README.md                         # Documentación principal
```

---

## 🔧 BACKEND Y API

### 📁 backend/
```
backend/
├── 📁 api/                              # APIs PHP (legacy)
│   ├── admin.php
│   └── auth.php
├── 📁 src/                              # Backend TypeScript
│   ├── 📁 config/
│   │   └── server.ts                    # Configuración del servidor
│   ├── 📁 controllers/                  # Controladores de la API
│   │   ├── auth.controller.ts          # Autenticación
│   │   ├── certificate.controller.ts   # Certificados
│   │   ├── course.controller.ts        # Cursos
│   │   ├── enrollment.controller.ts    # Inscripciones
│   │   ├── notification.controller.ts  # Notificaciones
│   │   ├── progress.controller.ts      # Progreso
│   │   ├── review.controller.ts        # Reseñas
│   │   └── user.controller.ts          # Usuarios
│   ├── 📁 middleware/                   # Middleware personalizado
│   │   ├── auth.middleware.ts          # Autenticación
│   │   ├── error.middleware.ts         # Manejo de errores
│   │   └── notFound.middleware.ts      # 404 handler
│   ├── 📁 routes/                      # Rutas de la API
│   │   ├── auth.routes.ts              # Rutas de autenticación
│   │   ├── certificate.routes.ts       # Rutas de certificados
│   │   ├── course.routes.ts            # Rutas de cursos
│   │   ├── enrollment.routes.ts        # Rutas de inscripciones
│   │   ├── notification.routes.ts      # Rutas de notificaciones
│   │   ├── progress.routes.ts          # Rutas de progreso
│   │   ├── review.routes.ts            # Rutas de reseñas
│   │   └── user.routes.ts              # Rutas de usuarios
│   ├── 📁 utils/                        # Utilidades del backend
│   └── app.ts                          # Aplicación principal
└── tsconfig.json                       # Configuración TypeScript
```

---

## ⚛️ FRONTEND - REACT/TYPESCRIPT

### 📁 src/
```
src/
├── 📄 App.tsx                          # Componente principal de la aplicación
├── 📄 AppTest.jsx                      # Componente de pruebas
├── 📄 main.tsx                         # Punto de entrada de la aplicación
├── 📄 index.css                        # Estilos globales
├── 📁 components/                       # Componentes React
├── 📁 config/                          # Configuración de la aplicación
├── 📁 context/                         # Context API de React
├── 📁 data/                           # Datos estáticos
├── 📁 docs/                           # Documentación técnica
├── 📁 examples/                        # Ejemplos de uso
├── 📁 hooks/                          # Custom hooks
├── 📁 lib/                            # Librerías y utilidades
├── 📁 modules/                        # Módulos organizados por funcionalidad
├── 📁 pages/                          # Páginas principales
├── 📁 services/                       # Servicios de API
├── 📁 styles/                         # Estilos adicionales
├── 📁 types/                          # Definiciones de TypeScript
└── 📁 utils/                          # Utilidades del frontend
```

### 📁 components/
```
components/
├── 📁 admin/                          # Componentes de administración
│   ├── AdminCourseManager.jsx         # Gestor de cursos admin
│   ├── index.js                       # Exportaciones centralizadas
│   └── 📁 modules/                     # Módulos de administración
├── 📁 charts/                         # Componentes de gráficos
│   ├── AnalyticsDashboard.jsx         # Dashboard de analíticas
│   ├── MetricCard.jsx                 # Tarjeta de métricas
│   ├── ProgressBar.jsx                # Barra de progreso
│   └── SimpleChart.jsx                # Gráfico simple
├── 📁 common/                         # Componentes comunes
│   ├── Footer.jsx                     # Pie de página
│   ├── Navbar.jsx                     # Barra de navegación
│   ├── Sidebar.jsx                    # Barra lateral
│   └── index.js                       # Exportaciones
├── 📁 forms/                          # Formularios
│   └── RegistrationForm.jsx          # Formulario de registro
├── 📁 modules/                        # Módulos organizados
├── 📁 shared/                         # Componentes compartidos
│   ├── CourseManager.jsx             # Gestor de cursos
│   ├── SyncIndicator.jsx             # Indicador de sincronización
│   ├── SyncNotification.jsx          # Notificación de sincronización
│   └── index.js                      # Exportaciones
├── 📁 ui/                             # Componentes de interfaz
├── 📁 user/                           # Componentes de usuario
│   ├── StudentDashboardWrapper.jsx   # Wrapper del dashboard estudiante
│   ├── UserCertificates.jsx          # Certificados de usuario
│   ├── UserCourses.jsx               # Cursos del usuario
│   ├── UserSettings.jsx              # Configuración del usuario
│   ├── index.js                      # Exportaciones
│   └── 📁 modules/                    # Módulos de usuario
├── 📄 AuthGuard.jsx                   # Guard de autenticación
├── 📄 Dashboard.jsx                   # Dashboard principal
├── 📄 ModelosNegocioDemo.jsx         # Demo de modelos de negocio
├── 📄 PruebasMockups.jsx             # Mockups de prueba
├── 📄 RegistrationForm.jsx            # Formulario de registro
└── 📄 UnifiedLogin.jsx               # Login unificado
```

---

## 👨‍💼 MÓDULOS DE ADMINISTRACIÓN

### 📁 components/admin/modules/
```
modules/
├── 📁 administrativo/                  # Gestión administrativa
│   └── AdminManagement.jsx          # Gestión administrativa
├── 📁 calendario/                     # Gestión de calendario
│   └── CalendarManagement.jsx       # Gestión de calendario
├── 📁 certificaciones/                # Gestión de certificaciones
│   ├── CertificacionesModule.jsx     # Módulo de certificaciones
│   └── CertificationManagement.jsx   # Gestión de certificaciones
├── 📁 configuracion/                  # Configuración del sistema
│   └── ConfigManagement.jsx          # Gestión de configuración
├── 📁 contenido/                      # Gestión de contenido
│   └── ContentManagement.jsx         # Gestión de contenido
├── 📁 correo/                         # Gestión de correo
│   └── EmailManagement.jsx           # Gestión de correo
├── 📁 cursos/                         # Gestión de cursos
│   ├── CourseAnalytics.jsx           # Analíticas de cursos
│   ├── CourseCategories.jsx          # Categorías de cursos
│   ├── CourseDemo.jsx                 # Demo de cursos
│   ├── CourseEditor.jsx               # Editor de cursos
│   ├── CourseInfoView.jsx            # Vista de información del curso
│   ├── CourseLevelsView.jsx          # Vista de niveles del curso
│   ├── CourseManagement.jsx          # Gestión de cursos
│   ├── CourseMaterials.jsx           # Materiales del curso
│   ├── CoursePricing.jsx             # Precios del curso
│   ├── CourseRating.jsx              # Calificaciones del curso
│   ├── CourseRecommendations.jsx     # Recomendaciones del curso
│   ├── CourseScheduler.jsx           # Programador de cursos
│   └── CourseManagement.jsx          # Gestión de cursos
├── 📁 ecommerce/                      # Gestión de e-commerce
│   └── EcommerceManagement.jsx       # Gestión de e-commerce
├── 📁 finanzas/                       # Gestión financiera
│   └── FinanceManagement.jsx          # Gestión financiera
├── 📁 investigacion/                  # Módulos de investigación
│   ├── BuenasPracticas.jsx           # Buenas prácticas
│   ├── EmbudoVentas.jsx              # Embudo de ventas
│   ├── EstrategiasPrecio.jsx         # Estrategias de precio
│   ├── GrowthHacks.jsx               # Growth hacks
│   ├── InvestigacionMosaico.jsx      # Mosaico de investigación
│   ├── MarketingCRM.jsx              # Marketing y CRM
│   ├── MetodosVenta.jsx              # Métodos de venta
│   ├── MetricasKPIs.jsx              # Métricas y KPIs
│   ├── ModelosNegocio.jsx            # Modelos de negocio
│   ├── OrganizacionOperativa.jsx     # Organización operativa
│   ├── PricingExperiments.jsx        # Experimentos de precio
│   ├── RiesgosMitigaciones.jsx       # Riesgos y mitigaciones
│   └── UXCheckout.jsx                # UX y checkout
├── 📁 marketing/                      # Gestión de marketing
│   └── MarketingManagement.jsx       # Gestión de marketing
├── 📁 productos/                      # Gestión de productos
│   └── ProductManagement.jsx         # Gestión de productos
├── 📁 profile/                        # Perfil de administrador
│   └── AdminProfile.jsx              # Perfil de administrador
├── 📁 reportes/                       # Gestión de reportes
│   └── ReportManagement.jsx          # Gestión de reportes
├── 📁 settings/                       # Configuración
│   └── AdminSettings.jsx             # Configuración de administrador
├── 📁 soporte/                        # Gestión de soporte
│   └── SupportManagement.jsx         # Gestión de soporte
├── 📁 usuarios/                       # Gestión de usuarios
│   └── UserManagement.jsx            # Gestión de usuarios
└── 📄 index.js                        # Exportaciones centralizadas
```

---

## 👨‍🎓 MÓDULOS DE USUARIO/ESTUDIANTE

### 📁 components/user/modules/
```
modules/
├── 📁 calendario/                     # Calendario del estudiante
│   └── StudentCalendar.jsx           # Calendario del estudiante
├── 📁 certificados/                    # Certificados del estudiante
│   └── StudentCertificates.jsx       # Certificados del estudiante
├── 📁 comunidad/                      # Comunidad estudiantil
│   └── StudentCommunity.jsx          # Comunidad estudiantil
├── 📁 configuracion/                  # Configuración del estudiante
│   └── StudentSettings.jsx           # Configuración del estudiante
├── 📁 inicio/                         # Inicio del estudiante
│   └── StudentHome.jsx                # Inicio del estudiante
├── 📁 mis-cursos/                      # Mis cursos
│   └── MyCourses.jsx                  # Mis cursos
├── 📁 notificaciones/                 # Notificaciones del estudiante
│   └── StudentNotifications.jsx      # Notificaciones del estudiante
├── 📁 perfil/                         # Perfil del estudiante
│   └── StudentProfile.jsx            # Perfil del estudiante
├── 📁 progreso/                       # Progreso del estudiante
│   └── StudentProgress.jsx           # Progreso del estudiante
├── 📁 recursos/                       # Recursos del estudiante
│   └── StudentResources.jsx          # Recursos del estudiante
└── 📄 index.js                        # Exportaciones centralizadas
```

---

## 🔬 MÓDULOS DE INVESTIGACIÓN E-COMMERCE

### 📁 components/admin/modules/investigacion/
```
investigacion/
├── 📄 BuenasPracticas.jsx            # Módulo 12: Buenas Prácticas
│   ├── 4 Vistas: Resumen, Categorías, Niveles, Implementación
│   ├── 20 Prácticas organizadas en 5 categorías
│   ├── Roadmap de implementación de 12 meses
│   └── Glosario de 20 términos técnicos
├── 📄 EmbudoVentas.jsx               # Módulo 3: Embudo de Ventas
│   ├── 7 Etapas del customer journey
│   ├── ROI Analysis, Automation Tools, Case Studies
│   ├── Advanced Metrics
│   └── Glosario de 35 términos
├── 📄 EstrategiasPrecio.jsx          # Módulo 2: Estrategias de Precio
│   ├── 6 Estrategias de pricing
│   ├── Análisis de efectividad
│   └── Glosario de 25 términos
├── 📄 GrowthHacks.jsx                # Módulo 8: Growth Hacks
│   ├── Estrategias de growth hacking
│   ├── Tácticas específicas
│   └── Herramientas y casos de estudio
├── 📄 InvestigacionMosaico.jsx      # Mosaico principal de investigación
│   ├── 12 Módulos de investigación
│   ├── Navegación entre módulos
│   └── Previsualización de implementación
├── 📄 MarketingCRM.jsx               # Módulo 6: Marketing y CRM
│   ├── Estrategias de marketing digital
│   ├── Sistema CRM completo
│   ├── ROI por canal
│   └── Herramientas y casos de estudio
├── 📄 MetodosVenta.jsx               # Módulo 5: Métodos de Venta
│   ├── Métodos de venta
│   ├── Análisis de efectividad
│   └── Herramientas y casos de estudio
├── 📄 MetricasKPIs.jsx               # Módulo 7: Métricas y KPIs
│   ├── KPIs de ventas, marketing, producto, operaciones
│   ├── Analíticas avanzadas
│   └── Herramientas y casos de estudio
├── 📄 ModelosNegocio.jsx             # Módulo 1: Modelos de Negocio
│   ├── Demo de modelos de negocio
│   ├── Glosario de términos
│   └── Botón de regreso al mosaico
├── 📄 OrganizacionOperativa.jsx      # Módulo 10: Organización Operativa
│   ├── Estructura organizacional
│   ├── Procesos operativos
│   ├── Tecnología y talento
│   └── Calidad y compliance
├── 📄 PricingExperiments.jsx        # Módulo 9: Pricing Experiments
│   ├── Experimentos de pricing
│   ├── Métricas y herramientas
│   └── Casos de estudio
├── 📄 RiesgosMitigaciones.jsx        # Módulo 11: Riesgos y Mitigaciones
│   ├── Categorías de riesgo
│   ├── Métricas y herramientas
│   └── Casos de estudio
└── 📄 UXCheckout.jsx                 # Módulo 4: UX y Checkout
    ├── Principios de UX
    ├── Proceso de checkout optimizado
    ├── Análisis por dispositivo
    └── Herramientas de testing
```

---

## 🛠️ SERVICIOS Y UTILIDADES

### 📁 services/
```
services/
├── 📁 api/                           # Servicios de API
│   └── index.js                      # Configuración de API
├── 📁 auth/                          # Servicios de autenticación
│   └── index.js                      # Configuración de auth
├── 📄 api.ts                         # API TypeScript
├── 📄 auth.ts                        # Autenticación TypeScript
├── 📄 authService.js                 # Servicio de autenticación
└── 📄 index.js                       # Exportaciones centralizadas
```

### 📁 utils/
```
utils/
├── 📄 chartUtils.js                  # Utilidades para gráficos
├── 📄 formatUtils.js                 # Utilidades de formato
├── 📄 index.js                       # Exportaciones centralizadas
└── 📄 validationUtils.js              # Utilidades de validación
```

### 📁 hooks/
```
hooks/
├── 📄 useAuth.ts                     # Hook de autenticación
└── 📄 useCourses.ts                  # Hook de cursos
```

### 📁 types/
```
types/
├── 📄 auth.ts                        # Tipos de autenticación
├── 📄 common.ts                       # Tipos comunes
├── 📄 course.ts                      # Tipos de cursos
├── 📄 index.ts                       # Exportaciones centralizadas
└── 📄 user.ts                        # Tipos de usuario
```

---

## 🗄️ BASE DE DATOS

### 📁 database/
```
database/
└── 📄 schema.sql                     # Esquema de base de datos
```

### 📁 prisma/
```
prisma/
├── 📄 schema.prisma                  # Esquema de Prisma ORM
└── 📄 seed.ts                        # Datos de prueba
```

---

## ⚙️ CONFIGURACIÓN Y DEPLOYMENT

### 📁 Archivos de Configuración
```
├── 📄 package.json                   # Dependencias y scripts
├── 📄 vite.config.js                 # Configuración de Vite
├── 📄 tailwind.config.js             # Configuración de Tailwind CSS
├── 📄 tsconfig.json                  # Configuración de TypeScript
├── 📄 tsconfig.node.json             # Configuración TypeScript para Node
├── 📄 postcss.config.js              # Configuración de PostCSS
├── 📄 env.example                    # Variables de entorno de ejemplo
└── 📄 README.md                      # Documentación principal
```

### 📁 public/
```
public/
├── 📁 img/                          # Imágenes estáticas
│   ├── fondo1.png                   # Imagen de fondo 1
│   ├── fondo2.png                   # Imagen de fondo 2
│   └── logo_kelumi.png              # Logo de Kelumi
└── 📄 vite.svg                       # Logo de Vite
```

---

## 📊 MÓDULOS DE PRUEBA Y MOCKUPS

### 📁 pruebas/
```
pruebas/
├── 📁 1-modelos-negocio/            # Pruebas de modelos de negocio
│   ├── 📁 data/                      # Datos de prueba
│   ├── IntegrationExample.jsx        # Ejemplo de integración
│   ├── ModelosNegocioDemo.jsx       # Demo de modelos de negocio
│   ├── INTEGRATION_GUIDE.md         # Guía de integración
│   └── README.md                     # Documentación
├── 📁 2-oferta-empaquetado/          # Pruebas de oferta y empaquetado
├── 📁 3-embudo-ventas/               # Pruebas de embudo de ventas
├── 📁 4-ux-checkout/                 # Pruebas de UX y checkout
├── 📁 5-metodos-venta/               # Pruebas de métodos de venta
├── 📁 6-marketing-crm/              # Pruebas de marketing y CRM
├── 📁 7-metricas-kpi/                # Pruebas de métricas y KPIs
├── 📁 8-growth-hacks/                # Pruebas de growth hacks
├── 📁 9-pricing-experiments/         # Pruebas de experimentos de precio
├── 📁 10-organizacion-operativa/     # Pruebas de organización operativa
├── 📁 11-riesgos-mitigaciones/       # Pruebas de riesgos y mitigaciones
├── 📁 12-buenas-practicas/           # Pruebas de buenas prácticas
└── 📄 README.md                      # Documentación de pruebas
```

---

## 📚 DOCUMENTACIÓN TÉCNICA

### 📁 Archivos de Documentación
```
├── 📄 ANALISIS_Y_ORGANIZACION_KELUMY.md    # Análisis y organización
├── 📄 ARQUITECTURA_KELUMY.md               # Arquitectura del sistema
├── 📄 CORRESPONDENCIA_DIAGRAMA_ARCHIVOS.md # Correspondencia de archivos
├── 📄 DIAGRAMA_FLUJO_VISUAL.txt            # Diagrama de flujo visual
├── 📄 DIAGRAMA_MODULOS_KELUMY.md           # Diagrama de módulos
├── 📄 PLAN_MIGRACION_KELUMY.md             # Plan de migración
├── 📄 PROJECT_STRUCTURE.md                 # Estructura del proyecto
├── 📄 RESUMEN_EJECUTIVO_KELUMY.md           # Resumen ejecutivo
├── 📄 SETUP_AUTHENTICATION.md              # Configuración de autenticación
└── 📄 INVESTIGACION_ECOMMERCE_EDUCATIVO.txt # Investigación e-commerce
```

---

## 🎯 CARACTERÍSTICAS PRINCIPALES

### 🔐 Sistema de Autenticación
- **Login Unificado:** `UnifiedLogin.jsx`
- **AuthGuard:** Protección de rutas
- **Servicios de Auth:** `authService.js`, `auth.ts`
- **Context API:** `AppContext.jsx`

### 📊 Dashboard y Analytics
- **Dashboard Principal:** `Dashboard.jsx`
- **Analytics Dashboard:** `AnalyticsDashboard.jsx`
- **Métricas:** `MetricCard.jsx`
- **Gráficos:** `SimpleChart.jsx`

### 🎓 Gestión de Cursos
- **14 Componentes de Cursos:** Desde creación hasta analíticas
- **Editor de Cursos:** `CourseEditor.jsx`
- **Gestión de Materiales:** `CourseMaterials.jsx`
- **Sistema de Calificaciones:** `CourseRating.jsx`

### 🔬 Módulos de Investigación
- **12 Módulos Completos:** Desde modelos de negocio hasta buenas prácticas
- **Mosaico de Navegación:** `InvestigacionMosaico.jsx`
- **Glosarios Técnicos:** En cada módulo
- **Casos de Estudio:** Implementaciones reales

### 👥 Gestión de Usuarios
- **Módulos de Admin:** 16 módulos administrativos
- **Módulos de Estudiante:** 9 módulos estudiantiles
- **Perfiles:** Admin y estudiante separados
- **Configuraciones:** Específicas por rol

### 🛒 E-commerce
- **Gestión de Productos:** `ProductManagement.jsx`
- **Sistema de Pagos:** `PaymentIntegration.jsx`
- **Suscripciones:** `SubscriptionManagement.jsx`
- **Marketing:** `MarketingManagement.jsx`

---

## 🚀 TECNOLOGÍAS UTILIZADAS

### Frontend
- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Context API** para estado global

### Backend
- **Node.js** con TypeScript
- **Express.js** para API
- **Prisma ORM** para base de datos
- **JWT** para autenticación

### Base de Datos
- **MySQL/PostgreSQL** (configurable)
- **Prisma Schema** para ORM
- **Migraciones** automáticas

### Herramientas de Desarrollo
- **Vite** para desarrollo rápido
- **ESLint** para linting
- **TypeScript** para tipado
- **PostCSS** para CSS

---

## 📈 ESTADÍSTICAS DEL PROYECTO

### Archivos Totales
- **Frontend:** ~200 archivos JSX/TSX
- **Backend:** ~30 archivos TypeScript
- **Documentación:** ~15 archivos Markdown
- **Configuración:** ~10 archivos de config

### Módulos Desarrollados
- **Administración:** 16 módulos
- **Estudiante:** 9 módulos
- **Investigación:** 12 módulos
- **E-commerce:** 5 módulos

### Componentes React
- **Componentes Totales:** ~150
- **Hooks Personalizados:** 2
- **Servicios:** 5
- **Utilidades:** 10+

---

## 🎯 PRÓXIMOS PASOS

### Desarrollo Pendiente
1. **Integración Completa:** Conectar todos los módulos
2. **Testing:** Implementar tests unitarios y de integración
3. **Optimización:** Mejorar rendimiento y SEO
4. **Deployment:** Configurar CI/CD y hosting
5. **Documentación:** Completar guías de usuario

### Mejoras Futuras
1. **PWA:** Convertir en Progressive Web App
2. **Mobile App:** Desarrollo de app móvil
3. **AI Integration:** Integración de inteligencia artificial
4. **Analytics Avanzados:** Métricas más detalladas
5. **Internacionalización:** Soporte multi-idioma

---

## 📞 CONTACTO Y SOPORTE

- **Documentación:** Ver archivos README.md en cada módulo
- **Issues:** Reportar en el repositorio del proyecto
- **Desarrollo:** Seguir las guías de contribución
- **Deployment:** Ver SETUP_AUTHENTICATION.md

---

*Este documento representa la estructura completa y actualizada de Kelumy al momento de su generación. Para mantenerlo actualizado, se recomienda revisarlo periódicamente conforme se desarrollen nuevas funcionalidades.*
