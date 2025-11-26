// ========================================
// MÓDULOS DE ADMIN - Exportaciones centralizadas
// ========================================
// Este archivo centraliza todas las exportaciones de los módulos de administración
// para facilitar las importaciones en otros componentes

// ========================================
// MÓDULOS PRINCIPALES
// ========================================

// 1. Inicio - Dashboard principal
export { default as InicioModule } from './inicio/InicioModule'
export { default as DashboardInicio } from './inicio/DashboardInicio'

// 2. Cursos - Gestión de cursos online
export { default as CursosModule } from './cursos/CursosModule'

// 3. Usuarios - Gestión de usuarios y roles
export { default as UsuariosModule } from './usuarios/UsuariosModule'

// 4. E-commerce - Gestión de ventas y transacciones
export { default as EcommerceModule } from './ecommerce/EcommerceModule'

// 5. Productos - Gestión de productos en línea
export { default as ProductosModule } from './productos/ProductosModule'

// 6. Certificaciones - Gestión de certificaciones digitales
export { default as CertificacionesModule } from './certificaciones/CertificacionesModule'

// 7. Marketing - Marketing y CRM
export { default as MarketingModule } from './marketing/MarketingModule'

// 8. Soporte - Soporte y comunicación
export { default as SoporteModule } from './soporte/SoporteModule'

// 9. Finanzas - Finanzas y contabilidad
export { default as FinanzasModule } from './finanzas/FinanzasModule'

// 10. Administrativo - Funciones administrativas
export { default as AdministrativoModule } from './administrativo/AdministrativoModule'

// 11. Reportes - Reportes financieros
export { default as ReportesModule } from './reportes/ReportesModule'

// 12. Contenido - Gestión de contenido
export { default as ContenidoModule } from './contenido/ContenidoModule'

// 13. Calendario - Calendario y eventos
export { default as CalendarioModule } from './calendario/CalendarioModule'

// 14. Correo - Correo masivo
export { default as CorreoModule } from './correo/CorreoModule'

// 15. Configuración - Configuración del sistema
export { default as ConfiguracionModule } from './configuracion/ConfiguracionModule'

// 16. Investigación - Módulos de investigación e-commerce
export { default as UXCheckout } from './investigacion/UXCheckout'
export { default as MetodosVenta } from './investigacion/MetodosVenta'
export { default as MarketingCRM } from './investigacion/MarketingCRM'
export { default as MetricasKPIs } from './investigacion/MetricasKPIs'
export { default as GrowthHacks } from './investigacion/GrowthHacks'
export { default as PricingExperiments } from './investigacion/PricingExperiments'
export { default as OrganizacionOperativa } from './investigacion/OrganizacionOperativa'
export { default as RiesgosMitigaciones } from './investigacion/RiesgosMitigaciones'
export { default as BuenasPracticas } from './investigacion/BuenasPracticas'

// 17. Notificaciones - Centro de notificaciones
export { default as NotificationsModule } from './notificaciones/NotificationsModule'

// ========================================
// CONFIGURACIÓN DE MÓDULOS
// ========================================

// Array con la configuración de todos los módulos para el sidebar
export const adminModules = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: 'BarChart3',
    description: 'Vista general de la plataforma',
    component: 'InicioModule'
  },
  {
    id: 'cursos',
    label: 'Gestión de Cursos',
    icon: 'BookOpen',
    description: 'Administración de cursos online',
    component: 'CursosModule'
  },
  {
    id: 'usuarios',
    label: 'Usuarios y Roles',
    icon: 'Users',
    description: 'Gestión de usuarios y permisos',
    component: 'UsuariosModule'
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: 'ShoppingCart',
    description: 'Gestión de ventas y transacciones',
    component: 'EcommerceModule'
  },
  {
    id: 'productos',
    label: 'Productos en Línea',
    icon: 'Package',
    description: 'Gestión de productos digitales',
    component: 'ProductosModule'
  },
  {
    id: 'certificaciones',
    label: 'Certificaciones',
    icon: 'Award',
    description: 'Gestión de certificaciones digitales',
    component: 'CertificacionesModule'
  },
  {
    id: 'marketing',
    label: 'Marketing y CRM',
    icon: 'Target',
    description: 'Campañas y gestión de clientes',
    component: 'MarketingModule'
  },
  {
    id: 'soporte',
    label: 'Soporte',
    icon: 'Headphones',
    description: 'Soporte y comunicación',
    component: 'SoporteModule'
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    icon: 'DollarSign',
    description: 'Finanzas y contabilidad',
    component: 'FinanzasModule'
  },
  {
    id: 'administrativo',
    label: 'Administrativo',
    icon: 'Shield',
    description: 'Funciones administrativas',
    component: 'AdministrativoModule'
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: 'FileText',
    description: 'Reportes y analíticas',
    component: 'ReportesModule'
  },
  {
    id: 'contenido',
    label: 'Contenido',
    icon: 'FileEdit',
    description: 'Gestión de contenido',
    component: 'ContenidoModule'
  },
  {
    id: 'calendario',
    label: 'Calendario',
    icon: 'Calendar',
    description: 'Eventos y programación',
    component: 'CalendarioModule'
  },
  {
    id: 'correo',
    label: 'Correo',
    icon: 'Mail',
    description: 'Correo masivo',
    component: 'CorreoModule'
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: 'Settings',
    description: 'Configuración del sistema',
    component: 'ConfiguracionModule'
  }
]
