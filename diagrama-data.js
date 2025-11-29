// Datos completos del mapa de funcionalidades de KELUMY Admin Dashboard
const modulesData = [
    {
        id: 'inicio',
        icon: '🏠',
        title: 'INICIO',
        badge: 'Dashboard',
        submodules: [
            {
                title: 'Panel Principal',
                functions: [
                    'Mostrar métricas principales del sistema',
                    'Visualizar gráficos de ingresos vs egresos',
                    'Mostrar distribución de costos',
                    'Generar reportes mensuales y anuales',
                    'Acceso rápido a acciones principales'
                ],
                fields: [
                    'Usuarios Activos (value: número, change: porcentaje)',
                    'Cursos Publicados (value: número, change: porcentaje)',
                    'Ingresos Mensuales (value: moneda, change: porcentaje)',
                    'Tasa de Conversión (value: porcentaje, change: porcentaje)',
                    'Certificados Emitidos (value: número, change: porcentaje)',
                    'Ventas del Mes (value: número, change: porcentaje)',
                    'Gráfico Ingresos vs Egresos (datos diarios/semanales/mensuales)',
                    'Gráfico Distribución de Costos (Docentes, Licencias, Marketing, Operación)'
                ],
                actions: [
                    'Botón "Reporte Mensual" → Genera reporte del mes actual',
                    'Botón "Reporte Anual" → Genera reporte del año actual',
                    'Botón "Calendario" → Abre calendario de eventos',
                    'Botón "Alertas" → Muestra alertas del sistema'
                ]
            }
        ]
    },
    {
        id: 'cursos',
        icon: '📚',
        title: 'CURSOS',
        badge: 'Gestión',
        submodules: [
            {
                title: '📊 Resumen (overview)',
                functions: [
                    'Mostrar métricas generales de todos los cursos',
                    'Visualizar estadísticas de inscripciones',
                    'Mostrar cursos destacados',
                    'Embudo de conversión (visitas → leads → pruebas → compras)',
                    'Actividad reciente del sistema'
                ],
                fields: [
                    'Total Cursos (número, cambio mensual)',
                    'Estudiantes Activos (número, cambio porcentual)',
                    'Ingresos Totales (moneda, cambio porcentual)',
                    'Calificación Promedio (número 1-5, texto descriptivo)',
                    'Cursos Destacados (título, descripción, duración, estudiantes, rating, precio)',
                    'Embudo de Conversión (visitas, leads, pruebas, compras)',
                    'Notificaciones (ID, título, curso, tipo, timestamp)'
                ],
                actions: [
                    'Ver todos los cursos destacados',
                    'Filtrar por estado (publicado, borrador, archivado)',
                    'Navegar a detalles del curso'
                ]
            },
            {
                title: '🎯 Por Categorías',
                features: [
                    '🔬 Ciencias: Cálculo Diferencial, Física, Química, Álgebra, Ecuaciones, Inglés',
                    '💻 Tecnología: IA, Base de Datos, Páginas Web, Programación, Ciberseguridad',
                    '🎓 Educación: Gestión Socioemocional, Gamificación, Laboratorios, Evaluación'
                ]
            },
            {
                title: '📖 Todos los Cursos',
                features: [
                    'Lista completa de cursos',
                    'Filtros por estado (publicado, borrador, archivado)',
                    'Búsqueda de cursos',
                    'Ordenamiento',
                    'Acciones masivas'
                ]
            },
            {
                title: '✏️ Editor (4 Pasos) - CourseEditor',
                functions: [
                    'Crear nuevo curso (formulario multi-paso)',
                    'Editar curso existente',
                    'Validar datos del formulario',
                    'Subir imagen de portada',
                    'Subir video de presentación',
                    'Gestionar etiquetas (tags)',
                    'Vista previa antes de guardar'
                ],
                fields: [
                    'PASO 1: Título, Subtítulo, Descripción, Categoría, Subcategoría, Nivel, Instructor, Duración, Idioma',
                    'PASO 2: Imagen de Portada (1280x720px, JPG/PNG, max 2MB), Video de Presentación (MP4/MOV, max 2min)',
                    'PASO 3: Precio de Venta, Precio Original, Curso Destacado, Curso Público, Permitir Comentarios, Certificado',
                    'PASO 4: Requisitos Previos, Objetivos de Aprendizaje, Etiquetas del Curso'
                ],
                actions: [
                    'Botón "Anterior" (deshabilitado en paso 1)',
                    'Botón "Siguiente" (avanza al siguiente paso)',
                    'Botón "Cancelar" (cierra el editor)',
                    'Botón "Crear Curso" / "Actualizar Curso" (en último paso)',
                    'validateForm() - Valida todos los campos antes de guardar'
                ]
            },
            {
                title: '📁 Materiales - CourseMaterials',
                functions: [
                    'Crear y gestionar módulos del curso',
                    'Agregar lecciones a cada módulo',
                    'Subir archivos multimedia (videos, PDFs, etc.)',
                    'Organizar contenido por orden',
                    'Duplicar lecciones',
                    'Ver estadísticas de visualización',
                    'Gestionar recursos descargables'
                ],
                fields: [
                    'Módulos: id, title, description, lessons (array)',
                    'Lecciones: id, title, type (video/pdf/quiz/exercise), duration, views, fileUrl, order'
                ],
                actions: [
                    'Agregar módulo nuevo',
                    'Agregar lección a módulo',
                    'Editar módulo/lección',
                    'Eliminar módulo/lección',
                    'Duplicar lección',
                    'Reordenar módulos/lecciones (drag & drop)',
                    'Ver estadísticas de cada lección'
                ]
            },
            {
                title: '💰 Precios - CoursePricing',
                functions: [
                    'Configurar precios por nivel (básico, intermedio, avanzado)',
                    'Aplicar descuentos porcentuales o fijos',
                    'Crear y gestionar cupones de descuento',
                    'Crear bundles/paquetes de cursos',
                    'Aplicar descuentos masivos a múltiples cursos',
                    'Ver historial de cambios de precios'
                ],
                fields: [
                    'Niveles: name, price, originalPrice, discount, isDiscountActive, discountStartDate, discountEndDate, students, revenue, topics, activities, quizzes, exams',
                    'Cupones: code, description, type (percentage/fixed), value, minAmount, maxUses, usedCount, startDate, endDate, isActive, applicableCourses, category',
                    'Bundles: name, description, courses (array), originalPrice, bundlePrice, discount, isActive, sales, category, startDate, endDate'
                ],
                actions: [
                    'Vista Cursos: Gestión de precios por curso',
                    'Vista Cupones: Crear, editar, duplicar, activar/desactivar, eliminar',
                    'Vista Bundles: Crear, editar, agregar/quitar cursos, eliminar',
                    'Acciones Masivas: Seleccionar múltiples cursos, aplicar descuento porcentual/fijo masivo'
                ]
            },
            {
                title: '📈 Analíticas - CourseAnalytics',
                functions: [
                    'Visualizar métricas de rendimiento del curso',
                    'Analizar inscripciones por período',
                    'Ver ingresos por fuente',
                    'Identificar puntos de abandono',
                    'Ver lecciones más vistas',
                    'Analizar demografía de estudiantes',
                    'Ver progreso individual de estudiantes',
                    'Exportar reportes'
                ],
                fields: [
                    'Períodos: Últimos 7 días, 30 días, 90 días, 1 año',
                    'Métricas: Total Estudiantes, Estudiantes Activos, Tasa de Finalización, Ingresos Totales',
                    'Gráficos: Inscripciones por Período, Ingresos por Fuente, Puntos de Abandono, Lecciones Más Vistas',
                    'Demografía: Grupos de Edad (18-25, 26-35, 36-45, 46+), Distribución por País',
                    'Progreso: Nombre estudiante, Progreso (%), Último acceso'
                ],
                actions: [
                    'Seleccionar período de análisis (dropdown)',
                    'Actualizar datos (botón refresh)',
                    'Exportar reporte (botón export)',
                    'Ver detalles del estudiante',
                    'Ver lección completa'
                ]
            }
        ]
    },
    {
        id: 'usuarios',
        icon: '👥',
        title: 'USUARIOS',
        badge: 'Roles',
        submodules: [
            {
                title: '📖 Estudiantes',
                functions: [
                    'Ver lista de estudiantes',
                    'Ver perfil completo del estudiante',
                    'Ver cursos inscritos',
                    'Ver progreso académico',
                    'Ver historial de pagos',
                    'Gestionar accesos y permisos'
                ],
                fields: [
                    'id, name, email, phone, role (student), status (active/inactive/pending)',
                    'joinDate, coursesEnrolled, progress (%), lastAccess'
                ],
                actions: [
                    'Ver detalles (botón Eye)',
                    'Editar usuario (botón Edit)',
                    'Eliminar usuario (botón Trash)',
                    'Más opciones (botón MoreVertical)'
                ]
            },
            {
                title: '🎓 Instructores',
                functions: [
                    'Ver lista de instructores',
                    'Ver perfil completo del instructor',
                    'Ver cursos asignados/creados',
                    'Ver evaluaciones y calificaciones',
                    'Ver estadísticas de desempeño'
                ],
                fields: [
                    'id, name, email, phone, role (instructor), status',
                    'joinDate, coursesCreated, students, rating (1-5), lastAccess'
                ],
                actions: [
                    'Ver detalles (botón Eye)',
                    'Editar instructor (botón Edit)',
                    'Eliminar instructor (botón Trash)',
                    'Más opciones (botón MoreVertical)'
                ]
            },
            {
                title: '👑 Administradores',
                functions: [
                    'Ver lista de administradores',
                    'Gestionar roles y permisos',
                    'Ver registro de actividad',
                    'Gestionar accesos al sistema'
                ],
                fields: [
                    'id, name, email, phone, role (admin), status',
                    'joinDate, permissions (full/limited), lastAccess'
                ],
                actions: [
                    'Ver detalles (botón Eye)',
                    'Editar administrador (botón Edit)',
                    'Gestionar permisos (botón Shield)',
                    'Ver registro de actividad'
                ]
            },
            {
                title: 'Filtros y Búsqueda',
                features: [
                    'Búsqueda por texto (nombre o email)',
                    'Filtro por rol (all, admin, instructor, student)',
                    'Filtro por estado (all, active, inactive, pending)'
                ]
            },
            {
                title: 'Acciones Generales',
                features: [
                    'Agregar Usuario (botón Plus)',
                    'Exportar Lista (botón Download)',
                    'Importar Usuarios (botón Upload)'
                ]
            }
        ]
    },
    {
        id: 'ecommerce',
        icon: '🛒',
        title: 'E-COMMERCE',
        badge: 'Ventas',
        submodules: [
            {
                title: '📊 Panel de Ventas - SalesPanel',
                functions: [
                    'Visualizar resumen de ventas en tiempo real',
                    'Ver ingresos por período (diario, semanal, mensual)',
                    'Analizar métodos de pago utilizados',
                    'Filtrar por curso, método de pago y fecha',
                    'Exportar reportes (Excel, PDF, CSV)',
                    'Ver proyecciones de ingresos'
                ],
                fields: [
                    'Filtros: fecha (month/week/day/custom), curso (all o específico), método de pago (Stripe/PayPal/MercadoPago/OXXO Pay)',
                    'Métricas: Ingresos Diarios, Semanales, Mensuales, Proyección (moneda MXN)',
                    'Gráficos: Ingresos por Día de la Semana, Ingresos por Método de Pago'
                ],
                actions: [
                    'Seleccionar filtro de fecha (dropdown)',
                    'Seleccionar filtro de curso (dropdown)',
                    'Seleccionar filtro de método de pago (dropdown)',
                    'Configurar rango de fechas personalizado',
                    'Exportar a Excel/PDF/CSV (botón con menú)'
                ]
            },
            {
                title: '📦 Pedidos y Transacciones',
                features: [
                    'Lista de pedidos',
                    'Estado de pedidos (pendiente, completado, cancelado)',
                    'Detalles de transacciones',
                    'Historial de compras',
                    'Gestión de devoluciones'
                ]
            },
            {
                title: '👤 Gestión de Clientes',
                features: [
                    'Base de datos de clientes',
                    'Historial de compras por cliente',
                    'Segmentación de clientes',
                    'Análisis de comportamiento',
                    'Valor del tiempo de vida (LTV)'
                ]
            },
            {
                title: '📈 Análisis de Conversión',
                features: [
                    'Embudo de ventas',
                    'Tasa de conversión',
                    'Abandono de carrito',
                    'Optimización de checkout',
                    'A/B testing'
                ]
            },
            {
                title: '💳 Métodos de Pago',
                features: [
                    'Configuración de pasarelas de pago',
                    'Tarjetas de crédito/débito',
                    'PayPal',
                    'Transferencias bancarias',
                    'Pagos en efectivo (OXXO, etc.)',
                    'Criptomonedas'
                ]
            },
            {
                title: '🧾 Facturación (México)',
                features: [
                    'Generación de facturas CFDI 4.0',
                    'Gestión de RFC',
                    'Timbrado fiscal',
                    'Envío automático de facturas',
                    'Cancelación de facturas',
                    'Reportes fiscales'
                ]
            },
            {
                title: '🎟️ Cupones y Promociones',
                features: [
                    'Crear cupones de descuento',
                    'Códigos promocionales',
                    'Descuentos porcentuales',
                    'Descuentos fijos',
                    'Vigencia de cupones',
                    'Límites de uso',
                    'Estadísticas de uso'
                ]
            },
            {
                title: '📦 Bundles y Paquetes',
                features: [
                    'Crear paquetes de cursos',
                    'Precios especiales para bundles',
                    'Combos promocionales',
                    'Gestión de contenido agrupado'
                ]
            },
            {
                title: '🔄 Suscripciones y Membresías',
                features: [
                    'Planes de suscripción',
                    'Membresías mensuales/anuales',
                    'Renovaciones automáticas',
                    'Gestión de cancelaciones',
                    'Beneficios por nivel',
                    'Facturación recurrente'
                ]
            },
            {
                title: '🔔 Notificaciones y Alertas',
                features: [
                    'Notificaciones de pedidos',
                    'Alertas de stock bajo',
                    'Confirmaciones de pago',
                    'Recordatorios de carrito abandonado',
                    'Actualizaciones de envío'
                ]
            },
            {
                title: '📊 Reportes Avanzados',
                features: [
                    'Reporte de ventas detallado',
                    'Análisis de productos',
                    'Reporte de clientes',
                    'Reporte financiero',
                    'Exportación de datos (CSV, Excel, PDF)',
                    'Dashboards personalizados'
                ]
            }
        ]
    },
    {
        id: 'productos',
        icon: '📦',
        title: 'PRODUCTOS ONLINE',
        badge: 'Catálogo',
        submodules: [
            {
                title: '📦 Gestión de Productos',
                features: [
                    'Crear/editar productos digitales',
                    'Catálogo de productos',
                    'Descripciones y especificaciones',
                    'Imágenes y multimedia',
                    'Estado de productos (activo/inactivo)'
                ]
            },
            {
                title: '🏷️ Gestión de Categorías',
                features: [
                    'Crear categorías',
                    'Subcategorías',
                    'Organización jerárquica',
                    'Etiquetas y filtros'
                ]
            },
            {
                title: '💰 Precios y Descuentos',
                features: [
                    'Configuración de precios',
                    'Descuentos por volumen',
                    'Ofertas especiales',
                    'Precios dinámicos'
                ]
            },
            {
                title: '📊 Inventario y Stock',
                features: [
                    'Control de inventario digital',
                    'Disponibilidad de productos',
                    'Alertas de stock',
                    'Historial de movimientos'
                ]
            },
            {
                title: '📈 Analíticas de Productos',
                features: [
                    'Productos más vendidos',
                    'Tendencias de ventas',
                    'Análisis de rentabilidad',
                    'Reportes de desempeño'
                ]
            }
        ]
    },
    {
        id: 'certificaciones',
        icon: '🏆',
        title: 'CERTIFICACIONES',
        badge: 'Digital',
        submodules: [
            {
                title: '🏅 Certificados',
                functions: [
                    'Ver lista de certificados emitidos',
                    'Buscar certificados por nombre, estudiante o código',
                    'Filtrar por estado y categoría',
                    'Ver detalles completos del certificado',
                    'Editar certificado',
                    'Eliminar certificado',
                    'Descargar certificado en PDF'
                ],
                fields: [
                    'id, nombre, descripcion, categoria (Ciencias/Tecnología/Educación/Arte/Negocios)',
                    'duracion, precio, estudiantes, completados, rating (1-5), estado (activo/borrador/vencido)',
                    'fechaCreacion, fechaVencimiento, requisitos (array), habilidades (array)',
                    'plantilla (basica/premium/corporativa), qrCode, blockchainHash, validaciones, ingresos'
                ],
                actions: [
                    'Crear certificado (botón Plus)',
                    'Ver certificado (botón Eye)',
                    'Editar certificado (botón Edit)',
                    'Eliminar certificado (botón Trash)',
                    'Descargar certificado (botón Download)',
                    'Generar QR (botón QrCode)',
                    'Validar certificado (botón CheckCircle)'
                ]
            },
            {
                title: '⚡ Generación',
                functions: [
                    'Generar certificados individuales',
                    'Generación masiva de certificados',
                    'Diseñar y editar plantillas',
                    'Personalizar diseño (colores, fuentes, logos)',
                    'Configurar campos dinámicos',
                    'Vista previa antes de generar',
                    'Configurar automatización de generación'
                ],
                fields: [
                    'Plantillas: Básica, Premium, Corporativa',
                    'Campos Dinámicos: Nombre estudiante, Nombre certificado, Fecha emisión, Fecha finalización, Código único, QR Code, Firma digital'
                ],
                actions: [
                    'Seleccionar plantilla',
                    'Personalizar diseño',
                    'Agregar campos dinámicos',
                    'Vista previa',
                    'Generar certificado individual',
                    'Generar certificados masivos',
                    'Configurar automatización'
                ]
            },
            {
                title: '📱 Validación',
                functions: [
                    'Validar certificado por código QR',
                    'Validar por número de certificado',
                    'Verificar autenticidad en blockchain',
                    'Consulta pública de certificados',
                    'Ver historial completo de validaciones',
                    'Generar códigos QR en lote',
                    'Escanear QR con cámara'
                ],
                fields: [
                    'Métodos: QR (Escaneo), API (Validación mediante API)',
                    'Campos: id, qrCode, certificado, estudiante, fecha, resultado (valid/invalid/pending), metodo, ip, ubicacion, blockchainVerified, motivo',
                    'Estadísticas: totalValidaciones, validas, invalidas, pendientes, validacionesHoy/Semana/Mes',
                    'Generación QR: certificadoId, cantidad, formato (PNG/SVG/PDF), tamaño, incluirLogo'
                ],
                actions: [
                    'Ingresar código QR manualmente',
                    'Escanear QR con cámara (botón Camera)',
                    'Validar certificado (botón CheckCircle)',
                    'Ver detalles de validación',
                    'Generar QR individual',
                    'Generar QR en lote',
                    'Verificar en blockchain',
                    'Exportar reporte de validaciones',
                    'Validación masiva'
                ]
            },
            {
                title: '📊 Estadísticas',
                features: [
                    'Certificados emitidos por período',
                    'Certificados por curso',
                    'Certificados por categoría',
                    'Tasa de finalización',
                    'Gráficos y reportes'
                ]
            },
            {
                title: '⚙️ Configuración',
                features: [
                    'Diseño de plantillas',
                    'Configuración de campos',
                    'Requisitos de emisión',
                    'Firmas digitales',
                    'Logos y marcas de agua',
                    'Integración con blockchain (opcional)'
                ]
            }
        ]
    },
    {
        id: 'marketing',
        icon: '🎯',
        title: 'MARKETING',
        badge: 'CRM',
        submodules: [
            {
                title: '📧 Campañas',
                features: [
                    'Crear campañas de marketing',
                    'Campañas de email',
                    'Campañas en redes sociales',
                    'Display ads',
                    'Estado de campañas (activa, pausada, completada)',
                    'Métricas: Tasa de apertura, CTR, Conversiones, ROI',
                    'Programación de campañas'
                ]
            },
            {
                title: '📨 Emails',
                features: [
                    'Email marketing masivo',
                    'Plantillas de email',
                    'Editor de emails',
                    'Segmentación de audiencia',
                    'Personalización',
                    'Pruebas A/B',
                    'Automatización de emails'
                ]
            },
            {
                title: '📊 Analíticas',
                features: [
                    'Métricas de marketing',
                    'Análisis de audiencia',
                    'Embudo de conversión',
                    'Atribución de ventas',
                    'Análisis de canales',
                    'Reportes de ROI'
                ]
            }
        ]
    },
    {
        id: 'soporte',
        icon: '💬',
        title: 'SOPORTE',
        badge: 'Atención',
        submodules: [
            {
                title: '🎫 Tickets - GestionTickets',
                functions: [
                    'Crear, editar y gestionar tickets de soporte',
                    'Asignar tickets a agentes',
                    'Responder a tickets con mensajes',
                    'Adjuntar archivos a mensajes',
                    'Categorizar y etiquetar tickets',
                    'Filtrar y buscar tickets',
                    'Ver historial completo de conversaciones',
                    'Gestionar tiempos de resolución (SLA)'
                ],
                fields: [
                    'id (TKT-001), subject, customer (name/email/phone/avatar)',
                    'status (open/in_progress/resolved/closed), priority (urgent/high/medium/low)',
                    'category (Acceso/Pago/Certificados/Contenido/Reembolsos/Técnico/General)',
                    'assignedTo, createdAt, updatedAt, lastMessage, messages (array), tags (array), satisfaction (1-5), estimatedResolution',
                    'Mensajes: id, sender (customer/agent), senderName, message, timestamp, attachments (array)'
                ],
                actions: [
                    'Crear nuevo ticket (botón Plus)',
                    'Ver detalles del ticket (botón Eye)',
                    'Editar ticket (botón Edit)',
                    'Eliminar ticket (botón Trash)',
                    'Responder al ticket (botón Reply)',
                    'Asignar a agente (dropdown)',
                    'Cambiar estado/prioridad (dropdown)',
                    'Agregar etiquetas (input)',
                    'Adjuntar archivos (botón Paperclip)',
                    'Archivar/Imprimir/Compartir/Ver historial'
                ]
            },
            {
                title: '💬 Chat en Vivo',
                features: [
                    'Chat en tiempo real',
                    'Múltiples conversaciones simultáneas',
                    'Estado de agentes (online, away, offline)',
                    'Transferencia de chats',
                    'Respuestas rápidas',
                    'Historial de chats',
                    'Notificaciones de nuevos mensajes'
                ]
            },
            {
                title: '❓ FAQ',
                features: [
                    'Gestión de preguntas frecuentes',
                    'Categorización de FAQs',
                    'Búsqueda de FAQs',
                    'Estadísticas de visualización',
                    'Votos útiles/no útiles',
                    'Publicar/despublicar FAQs'
                ]
            },
            {
                title: '📚 Base de Conocimiento',
                features: [
                    'Artículos de ayuda',
                    'Tutoriales',
                    'Guías paso a paso',
                    'Videos instructivos',
                    'Recursos descargables',
                    'Categorías de contenido',
                    'Búsqueda de artículos',
                    'Estadísticas de acceso'
                ]
            },
            {
                title: '👥 Agentes',
                features: [
                    'Gestión de agentes de soporte',
                    'Perfiles de agentes',
                    'Roles y permisos',
                    'Estado de disponibilidad',
                    'Tickets asignados',
                    'Métricas: Tickets resueltos, Tiempo promedio respuesta, Satisfacción, Tickets activos',
                    'Horarios de trabajo'
                ]
            },
            {
                title: '📝 Plantillas',
                features: [
                    'Plantillas de respuestas',
                    'Respuestas predefinidas',
                    'Categorización de plantillas',
                    'Variables dinámicas',
                    'Plantillas por tipo de problema',
                    'Uso de plantillas en tickets/chat'
                ]
            },
            {
                title: '📊 Estadísticas',
                features: [
                    'Tickets por período',
                    'Tiempo promedio de resolución',
                    'Tasa de resolución en primer contacto',
                    'Satisfacción del cliente (CSAT)',
                    'Net Promoter Score (NPS)',
                    'Tickets por categoría',
                    'Tickets por agente',
                    'Tendencias y patrones'
                ]
            },
            {
                title: '⚙️ Configuración',
                features: [
                    'Notificaciones: Email, Push, Alertas SLA',
                    'Tiempos y SLA: Primera respuesta, Resolución, Escalamiento automático',
                    'Chat en Vivo: Horarios, Mensajes bienvenida/fuera horario, Límite chats por agente',
                    'Seguridad: 2FA, Registro actividad, Permisos',
                    'General: Idiomas, Zona horaria, Formato fecha/hora'
                ]
            }
        ]
    },
    {
        id: 'finanzas',
        icon: '💰',
        title: 'FINANZAS',
        badge: 'Contabilidad',
        submodules: [
            {
                title: 'Panel Financiero',
                features: [
                    'Panel de ingresos y gastos',
                    'Reportes financieros',
                    'Flujo de caja',
                    'Conciliación bancaria',
                    'Gestión de impuestos',
                    'Facturación y cobranza',
                    'Presupuestos',
                    'Análisis de rentabilidad'
                ]
            }
        ]
    },
    {
        id: 'administrativo',
        icon: '🏢',
        title: 'ADMINISTRATIVO',
        badge: 'RH',
        submodules: [
            {
                title: 'Gestión Administrativa',
                features: [
                    'Gestión de empresa',
                    'Recursos humanos',
                    'Nómina',
                    'Contratos',
                    'Políticas y procedimientos',
                    'Gestión documental',
                    'Auditoría y cumplimiento'
                ]
            }
        ]
    },
    {
        id: 'reportes',
        icon: '📊',
        title: 'REPORTES',
        badge: 'Analítica',
        submodules: [
            {
                title: 'Reportes del Sistema',
                features: [
                    'Reportes de ventas',
                    'Reportes de usuarios',
                    'Reportes de cursos',
                    'Reportes financieros',
                    'Reportes de marketing',
                    'Reportes personalizados',
                    'Exportación: PDF, Excel, CSV, JSON',
                    'Dashboards interactivos'
                ]
            }
        ]
    },
    {
        id: 'contenido',
        icon: '📝',
        title: 'CONTENIDO',
        badge: 'CMS',
        submodules: [
            {
                title: 'Gestión de Contenido',
                features: [
                    'Gestión de blog',
                    'Páginas estáticas',
                    'Biblioteca de medios',
                    'Gestión de imágenes',
                    'Gestión de videos',
                    'Documentos y archivos',
                    'SEO y metadatos'
                ]
            }
        ]
    },
    {
        id: 'calendario',
        icon: '📅',
        title: 'CALENDARIO',
        badge: 'Eventos',
        submodules: [
            {
                title: 'Gestión de Calendario',
                features: [
                    'Calendario de eventos',
                    'Programación de cursos',
                    'Webinars y sesiones en vivo',
                    'Recordatorios',
                    'Sincronización con Google Calendar',
                    'Gestión de disponibilidad'
                ]
            }
        ]
    },
    {
        id: 'correo',
        icon: '📧',
        title: 'CORREO',
        badge: 'Email',
        submodules: [
            {
                title: 'Email Marketing',
                features: [
                    'Email marketing',
                    'Campañas de correo',
                    'Listas de distribución',
                    'Segmentación de audiencia',
                    'Automatización de emails',
                    'Plantillas de correo',
                    'Análisis de campañas',
                    'Gestión de suscriptores'
                ]
            }
        ]
    },
    {
        id: 'notificaciones',
        icon: '🔔',
        title: 'NOTIFICACIONES',
        badge: 'Alertas',
        submodules: [
            {
                title: 'Centro de Notificaciones',
                features: [
                    'Centro de notificaciones',
                    'Notificaciones del sistema',
                    'Alertas importantes',
                    'Notificaciones de cursos',
                    'Notificaciones de ventas',
                    'Notificaciones de usuarios',
                    'Marcar como leído',
                    'Historial de notificaciones'
                ]
            }
        ]
    },
    {
        id: 'configuracion',
        icon: '⚙️',
        title: 'CONFIGURACIÓN',
        badge: 'Sistema',
        submodules: [
            {
                title: 'Configuración General',
                features: [
                    'Configuración general',
                    'Información de la empresa',
                    'Configuración de correo',
                    'Integraciones',
                    'API y webhooks',
                    'Seguridad',
                    'Respaldos',
                    'Mantenimiento del sistema'
                ]
            }
        ]
    },
    {
        id: 'investigacion',
        icon: '🔬',
        title: 'INVESTIGACIÓN',
        badge: 'Análisis',
        submodules: [
            {
                title: '💼 Modelos de Negocio',
                features: [
                    'Análisis de modelos de negocio',
                    'Canvas de modelo de negocio',
                    'Estrategias de monetización'
                ]
            },
            {
                title: '💰 Estrategias de Precio',
                features: [
                    'Análisis de precios',
                    'Estrategias de pricing',
                    'Precios psicológicos',
                    'Análisis competitivo'
                ]
            },
            {
                title: '🎯 Embudo de Ventas',
                features: [
                    'Diseño de embudos',
                    'Optimización de conversión',
                    'Análisis de puntos de fuga',
                    'Estrategias de retención'
                ]
            },
            {
                title: '🛒 UX Checkout',
                features: [
                    'Optimización del proceso de compra',
                    'Reducción de fricción',
                    'Pruebas de usabilidad',
                    'Análisis de abandono'
                ]
            },
            {
                title: '💳 Métodos de Venta',
                features: [
                    'Estrategias de venta',
                    'Canales de distribución',
                    'Modelos de suscripción',
                    'Ventas cruzadas y upselling'
                ]
            },
            {
                title: '📊 Marketing y CRM',
                features: [
                    'Estrategias de marketing digital',
                    'Gestión de relaciones con clientes',
                    'Automatización de marketing',
                    'Análisis de customer journey'
                ]
            },
            {
                title: '📈 Métricas y KPIs',
                features: [
                    'Definición de KPIs',
                    'Dashboards de métricas',
                    'Análisis de rendimiento',
                    'Reportes ejecutivos'
                ]
            },
            {
                title: '🚀 Growth Hacks',
                features: [
                    'Estrategias de crecimiento rápido',
                    'Técnicas de growth hacking',
                    'Experimentos de crecimiento',
                    'Casos de éxito'
                ]
            },
            {
                title: '🧪 Pricing Experiments',
                features: [
                    'Pruebas A/B de precios',
                    'Análisis de elasticidad',
                    'Optimización de precios',
                    'Estrategias de descuento'
                ]
            },
            {
                title: '🏗️ Organización Operativa',
                features: [
                    'Estructura organizacional',
                    'Procesos y flujos de trabajo',
                    'Roles y responsabilidades',
                    'Optimización operativa'
                ]
            },
            {
                title: '⚠️ Riesgos y Mitigaciones',
                features: [
                    'Identificación de riesgos',
                    'Análisis de impacto',
                    'Planes de mitigación',
                    'Gestión de crisis'
                ]
            },
            {
                title: '✅ Buenas Prácticas',
                features: [
                    'Mejores prácticas de la industria',
                    'Estándares de calidad',
                    'Casos de estudio',
                    'Recomendaciones'
                ]
            }
        ]
    },
    {
        id: 'perfil',
        icon: '👤',
        title: 'MI PERFIL',
        badge: 'Usuario',
        submodules: [
            {
                title: 'Perfil de Administrador',
                features: [
                    'Información personal',
                    'Foto de perfil',
                    'Cambiar contraseña',
                    'Preferencias',
                    'Notificaciones',
                    'Actividad reciente'
                ]
            }
        ]
    },
    {
        id: 'configuracion-cuenta',
        icon: '⚙️',
        title: 'CONFIGURACIÓN DE CUENTA',
        badge: 'Ajustes',
        submodules: [
            {
                title: 'Ajustes de Cuenta',
                features: [
                    'Configuración de perfil',
                    'Seguridad',
                    'Privacidad',
                    'Notificaciones',
                    'Idioma y región',
                    'Tema (claro/oscuro)'
                ]
            }
        ]
    },
    {
        id: 'caracteristicas',
        icon: '🎨',
        title: 'CARACTERÍSTICAS GENERALES',
        badge: 'Sistema',
        submodules: [
            {
                title: '🎨 Interfaz de Usuario',
                features: [
                    'Diseño moderno con glassmorphism',
                    'Gradientes púrpura y rosa',
                    'Sidebar colapsable con hover',
                    'Navegación responsiva (desktop y móvil)',
                    'Navbar fijo con backdrop blur',
                    'Búsqueda global',
                    'Centro de notificaciones',
                    'Menú de usuario',
                    'Animaciones suaves'
                ]
            },
            {
                title: '🔐 Autenticación y Seguridad',
                features: [
                    'Login con email y contraseña',
                    'Integración con Google, Facebook y Apple',
                    'Registro en 4 pasos (Datos personales, académicos, intereses, contraseña)',
                    'Recuperación de contraseña',
                    'Autenticación de dos factores (2FA)',
                    'Gestión de sesiones'
                ]
            },
            {
                title: '📱 Responsividad',
                features: [
                    'Diseño adaptable a todos los dispositivos',
                    'Sidebar móvil con overlay',
                    'Navegación optimizada para móviles',
                    'Componentes responsivos',
                    'Touch-friendly'
                ]
            },
            {
                title: '🌐 Internacionalización',
                features: [
                    'Soporte multiidioma',
                    'Formato de fechas localizado',
                    'Formato de moneda localizado',
                    'Zona horaria configurable'
                ]
            },
            {
                title: '📊 Analíticas y Métricas',
                features: [
                    'Dashboard de métricas en tiempo real',
                    'Gráficos interactivos',
                    'Exportación de reportes',
                    'Análisis predictivo',
                    'Visualización de datos'
                ]
            },
            {
                title: '🔔 Sistema de Notificaciones',
                features: [
                    'Notificaciones en tiempo real',
                    'Notificaciones push',
                    'Notificaciones por email',
                    'Centro de notificaciones',
                    'Filtros y categorías',
                    'Marcar como leído/no leído'
                ]
            },
            {
                title: '🔍 Búsqueda y Filtros',
                features: [
                    'Búsqueda global',
                    'Búsqueda por módulo',
                    'Filtros avanzados',
                    'Ordenamiento personalizado',
                    'Búsqueda predictiva'
                ]
            },
            {
                title: '📤 Exportación de Datos',
                features: [
                    'Exportar a PDF',
                    'Exportar a Excel',
                    'Exportar a CSV',
                    'Exportar a JSON',
                    'Exportación programada'
                ]
            },
            {
                title: '🔗 Integraciones',
                features: [
                    'Pasarelas de pago (Stripe, PayPal, etc.)',
                    'Servicios de email (SendGrid, Mailchimp)',
                    'Almacenamiento en la nube',
                    'Google Analytics',
                    'Redes sociales',
                    'CRM externos',
                    'API REST'
                ]
            },
            {
                title: '💻 Tecnologías',
                features: [
                    'Frontend: React 18, Lucide React, Tailwind CSS, Context API, React Router',
                    'Backend: Node.js + Express, MongoDB/PostgreSQL, JWT, Socket.io',
                    'Servicios: Firebase, Stripe, SendGrid, AWS S3'
                ]
            }
        ]
    }
];

