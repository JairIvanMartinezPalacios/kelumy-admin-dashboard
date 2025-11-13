# Kelumi Admin Dashboard

Panel de administración moderno para Kelumi, desarrollado con React + Vite + JavaScript y estilizado con Tailwind CSS.

## Características

- **Navbar Superior**: Logo centrado, barra de búsqueda y menú de usuario con notificaciones
- **Sidebar Responsivo**: Navegación lateral con todas las opciones de administración
- **Dashboard Principal**: Métricas, gráficos y visualizaciones de datos
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Iconos Intuitivos**: Iconos de Lucide React para cada sección
- **Paleta de Colores**: Esquema de colores púrpura y rosa basado en la marca Kelumi

## Secciones del Panel

1. **Inicio** - Vista general con métricas principales
2. **Gestión de Cursos Online** - Administración de cursos
3. **Usuarios y Roles** - Gestión de usuarios y permisos
4. **E-commerce y Ventas** - Panel de ventas y productos
5. **Certificaciones Digitales** - Gestión de certificados
6. **Marketing y CRM** - Herramientas de marketing
7. **Soporte y Comunicación** - Centro de soporte
8. **Gestión de Productos Estratégicos** - Productos especializados
9. **Finanzas y Contabilidad** - Gestión financiera
10. **Administrativo** - Funciones administrativas
11. **Reportes Financieros y Analítica** - Reportes y análisis
12. **Gestión de Contenido y Blog** - CMS y blog
13. **Calendario y Eventos Online** - Gestión de eventos
14. **Correo Masivo** - Campañas de email
15. **Configuración y Seguridad** - Configuración del sistema

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Construir para producción:
```bash
npm run build
```

4. Vista previa de producción:
```bash
npm run preview
```

## Tecnologías Utilizadas

- **React 18** - Framework de JavaScript
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos
- **JavaScript ES6+** - Lenguaje de programación

## Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx      # Barra de navegación superior
│   ├── Sidebar.jsx     # Barra lateral de navegación
│   └── Dashboard.jsx   # Componente principal del dashboard
├── App.jsx             # Componente raíz
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales y Tailwind
```

## Personalización

El dashboard está diseñado para ser fácilmente personalizable:

- **Colores**: Modifica la paleta en `tailwind.config.js`
- **Métricas**: Actualiza los datos en `Dashboard.jsx`
- **Navegación**: Añade nuevas secciones en `Sidebar.jsx`
- **Componentes**: Crea nuevos componentes en la carpeta `components/`

## Responsive Design

El panel está optimizado para:
- **Mobile**: Sidebar colapsable, navegación táctil
- **Tablet**: Layout adaptativo
- **Desktop**: Vista completa con sidebar fijo

## Próximas Funcionalidades

- Integración con APIs reales
- Gráficos interactivos con Chart.js
- Sistema de autenticación
- Notificaciones en tiempo real
- Exportación de reportes
- Temas personalizables
