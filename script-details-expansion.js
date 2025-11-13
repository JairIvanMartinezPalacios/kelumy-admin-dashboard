// Funcionalidad de expansión de detalles - Reutilizable para todos los mapas
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listeners a todos los elementos function-item
    const functionItems = document.querySelectorAll('.function-item');
    
    functionItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle de la clase expanded
            this.classList.toggle('expanded');
            
            // Buscar o crear el div de detalles
            let detailsDiv = this.nextElementSibling;
            
            if (!detailsDiv || !detailsDiv.classList.contains('function-details')) {
                // Crear el div de detalles si no existe
                detailsDiv = document.createElement('div');
                detailsDiv.className = 'function-details';
                
                // Obtener el texto del elemento para generar detalles específicos
                const itemText = this.textContent.trim();
                const detailsContent = generateDetailsContent(itemText);
                detailsDiv.innerHTML = detailsContent;
                
                // Insertar después del elemento actual
                this.parentNode.insertBefore(detailsDiv, this.nextSibling);
            }
            
            // Toggle de la visibilidad
            detailsDiv.classList.toggle('show');
        });
    });
});

// Función para generar contenido de detalles basado en el texto del elemento
function generateDetailsContent(itemText) {
    const detailsMap = {
        // Autenticación
        'Datos básicos (nombre, email, teléfono, fecha nacimiento)': `
            <div class="detail-section">
                <h6>📝 Información Requerida</h6>
                <div class="detail-item">Nombre completo (validación de caracteres especiales)</div>
                <div class="detail-item">Email único (verificación de formato y disponibilidad)</div>
                <div class="detail-item">Teléfono (formato internacional opcional)</div>
                <div class="detail-item">Fecha de nacimiento (validación de edad mínima)</div>
            </div>
            <div class="detail-section">
                <h6>🔒 Validaciones</h6>
                <div class="detail-item">Verificación de email en tiempo real</div>
                <div class="detail-item">Validación de formato de teléfono</div>
                <div class="detail-item">Verificación de edad mínima (13 años)</div>
            </div>
        `,
        'Datos académicos (nivel educativo, institución, área de estudio)': `
            <div class="detail-section">
                <h6>🎓 Información Académica</h6>
                <div class="detail-item">Nivel educativo (primaria, secundaria, preparatoria, universidad)</div>
                <div class="detail-item">Institución educativa (búsqueda y selección)</div>
                <div class="detail-item">Área de estudio (STEM, humanidades, ciencias sociales)</div>
                <div class="detail-item">Año de graduación (opcional)</div>
            </div>
            <div class="detail-section">
                <h6>📊 Personalización</h6>
                <div class="detail-item">Recomendaciones de cursos basadas en área de estudio</div>
                <div class="detail-item">Nivel de dificultad sugerido</div>
            </div>
        `,
        'Login con Google (OAuth 2.0, permisos específicos)': `
            <div class="detail-section">
                <h6>🔐 Configuración OAuth</h6>
                <div class="detail-item">Client ID y Client Secret de Google</div>
                <div class="detail-item">Permisos: email, perfil, información básica</div>
                <div class="detail-item">Redirect URI configurado</div>
                <div class="detail-item">Scopes: openid, email, profile</div>
            </div>
            <div class="detail-section">
                <h6>🔄 Flujo de Autenticación</h6>
                <div class="detail-item">Redirección a Google OAuth</div>
                <div class="detail-item">Autorización de permisos</div>
                <div class="detail-item">Callback con código de autorización</div>
                <div class="detail-item">Intercambio por access token</div>
            </div>
        `,
        // Dashboard Principal
        'Ingresos del día (ventas actuales, comparativa con ayer)': `
            <div class="detail-section">
                <h6>💰 Métricas del Día</h6>
                <div class="detail-item">Ventas totales del día actual</div>
                <div class="detail-item">Comparativa con día anterior (% de cambio)</div>
                <div class="detail-item">Promedio de ventas por hora</div>
                <div class="detail-item">Proyección de cierre del día</div>
            </div>
            <div class="detail-section">
                <h6>📈 Análisis</h6>
                <div class="detail-item">Tendencia de crecimiento/declive</div>
                <div class="detail-item">Horas pico de ventas</div>
                <div class="detail-item">Comparativa con mismo día semana anterior</div>
            </div>
        `,
        'Usuarios activos (en línea ahora, sesiones activas)': `
            <div class="detail-section">
                <h6>👥 Usuarios en Tiempo Real</h6>
                <div class="detail-item">Usuarios conectados en este momento</div>
                <div class="detail-item">Sesiones activas en los últimos 15 minutos</div>
                <div class="detail-item">Usuarios únicos en las últimas 24 horas</div>
                <div class="detail-item">Tiempo promedio de sesión</div>
            </div>
            <div class="detail-section">
                <h6>📊 Actividad</h6>
                <div class="detail-item">Páginas más visitadas</div>
                <div class="detail-item">Cursos en progreso</div>
                <div class="detail-item">Actividad en foros y discusiones</div>
            </div>
        `,
        'Crear nuevo curso (asistente paso a paso, plantillas)': `
            <div class="detail-section">
                <h6>🎯 Asistente de Creación</h6>
                <div class="detail-item">Paso 1: Información básica (título, descripción, categoría)</div>
                <div class="detail-item">Paso 2: Configuración de precios y disponibilidad</div>
                <div class="detail-item">Paso 3: Subida de contenido multimedia</div>
                <div class="detail-item">Paso 4: Configuración de evaluaciones</div>
            </div>
            <div class="detail-section">
                <h6>📋 Plantillas Disponibles</h6>
                <div class="detail-item">Plantilla STEM (ciencias, tecnología, ingeniería, matemáticas)</div>
                <div class="detail-item">Plantilla Educación (pedagogía, enseñanza)</div>
                <div class="detail-item">Plantilla Tecnología (programación, desarrollo)</div>
                <div class="detail-item">Plantilla personalizada (crear desde cero)</div>
            </div>
        `,
        // E-commerce y Ventas
        'Pedidos (lista, detalles, estados, historial, búsqueda)': `
            <div class="detail-section">
                <h6>📋 Gestión de Pedidos</h6>
                <div class="detail-item">Lista paginada de todos los pedidos</div>
                <div class="detail-item">Filtros por estado, fecha, monto, cliente</div>
                <div class="detail-item">Búsqueda avanzada por ID, email, teléfono</div>
                <div class="detail-item">Ordenamiento por columnas</div>
            </div>
            <div class="detail-section">
                <h6>🔍 Detalles del Pedido</h6>
                <div class="detail-item">Información del cliente completa</div>
                <div class="detail-item">Productos/servicios adquiridos</div>
                <div class="detail-item">Método de pago utilizado</div>
                <div class="detail-item">Historial de cambios de estado</div>
            </div>
        `,
        'Métodos de pago (Stripe, PayPal, MercadoPago, OXXO Pay)': `
            <div class="detail-section">
                <h6>💳 Configuración de Pagos</h6>
                <div class="detail-item">Stripe: Tarjetas de crédito/débito internacionales</div>
                <div class="detail-item">PayPal: Cuenta PayPal y tarjetas vinculadas</div>
                <div class="detail-item">MercadoPago: Pagos en efectivo y tarjetas</div>
                <div class="detail-item">OXXO Pay: Pagos en efectivo en tiendas OXXO</div>
            </div>
            <div class="detail-section">
                <h6>🔧 Integración</h6>
                <div class="detail-item">APIs de cada proveedor configuradas</div>
                <div class="detail-item">Webhooks para notificaciones de pago</div>
                <div class="detail-item">Manejo de errores y reintentos</div>
                <div class="detail-item">Logs de transacciones detallados</div>
            </div>
        `,
        // Gestión de Cursos
        'Subida de videos MP4 (hasta 2GB)': `
            <div class="detail-section">
                <h6>🎥 Configuración de Videos</h6>
                <div class="detail-item">Límite de tamaño: 2GB por video</div>
                <div class="detail-item">Formatos soportados: MP4, AVI, MOV</div>
                <div class="detail-item">Compresión automática para optimización</div>
                <div class="detail-item">Progreso de subida en tiempo real</div>
            </div>
            <div class="detail-section">
                <h6>⚡ Optimización</h6>
                <div class="detail-item">Transcodificación automática a múltiples calidades</div>
                <div class="detail-item">Streaming adaptativo según conexión</div>
                <div class="detail-item">CDN para distribución global</div>
                <div class="detail-item">Caché inteligente para videos populares</div>
            </div>
        `,
        'Quizzes de opción múltiple': `
            <div class="detail-section">
                <h6>❓ Configuración de Quiz</h6>
                <div class="detail-item">Múltiples opciones de respuesta (2-6 opciones)</div>
                <div class="detail-item">Una o múltiples respuestas correctas</div>
                <div class="detail-item">Puntuación personalizable por pregunta</div>
                <div class="detail-item">Tiempo límite opcional</div>
            </div>
            <div class="detail-section">
                <h6>📊 Evaluación</h6>
                <div class="detail-item">Calificación automática</div>
                <div class="detail-item">Retroalimentación inmediata</div>
                <div class="detail-item">Intentos limitados configurables</div>
                <div class="detail-item">Análisis de respuestas incorrectas</div>
            </div>
        `,
        // Certificaciones
        'Generación automática al completar curso (100% de progreso)': `
            <div class="detail-section">
                <h6>🏆 Proceso de Certificación</h6>
                <div class="detail-item">Verificación automática de progreso 100%</div>
                <div class="detail-item">Validación de requisitos del curso</div>
                <div class="detail-item">Generación de código único (UUID)</div>
                <div class="detail-item">Creación de certificado digital</div>
            </div>
            <div class="detail-section">
                <h6>🔐 Seguridad</h6>
                <div class="detail-item">Firma digital del certificado</div>
                <div class="detail-item">Código QR para verificación</div>
                <div class="detail-item">Registro en blockchain (opcional)</div>
                <div class="detail-item">Validación de autenticidad</div>
            </div>
        `,
        // Reportes
        'Reportes de ventas (diario, semanal, mensual, anual)': `
            <div class="detail-section">
                <h6>📊 Períodos de Reporte</h6>
                <div class="detail-item">Reporte diario: ventas del día actual</div>
                <div class="detail-item">Reporte semanal: resumen de 7 días</div>
                <div class="detail-item">Reporte mensual: análisis del mes</div>
                <div class="detail-item">Reporte anual: tendencias del año</div>
            </div>
            <div class="detail-section">
                <h6>📈 Métricas Incluidas</h6>
                <div class="detail-item">Ingresos totales por período</div>
                <div class="detail-item">Número de transacciones</div>
                <div class="detail-item">Ticket promedio</div>
                <div class="detail-item">Comparativas con períodos anteriores</div>
            </div>
        `,
        // Configuración
        'Administrador (acceso completo)': `
            <div class="detail-section">
                <h6>🔑 Permisos de Administrador</h6>
                <div class="detail-item">Acceso completo a todos los módulos</div>
                <div class="detail-item">Gestión de usuarios y roles</div>
                <div class="detail-item">Configuración del sistema</div>
                <div class="detail-item">Acceso a reportes financieros</div>
            </div>
            <div class="detail-section">
                <h6>⚙️ Funcionalidades</h6>
                <div class="detail-item">Crear y modificar usuarios</div>
                <div class="detail-item">Configurar integraciones</div>
                <div class="detail-item">Gestionar permisos del sistema</div>
                <div class="detail-item">Acceso a logs y auditoría</div>
            </div>
        `
    };

    // Buscar coincidencia exacta o parcial
    for (const [key, value] of Object.entries(detailsMap)) {
        if (itemText.includes(key.split(' (')[0])) {
            return value;
        }
    }

    // Contenido genérico si no hay coincidencia específica
    return `
        <div class="detail-section">
            <h6>📋 Detalles de Implementación</h6>
            <div class="detail-item">Configuración específica para esta funcionalidad</div>
            <div class="detail-item">Parámetros y opciones disponibles</div>
            <div class="detail-item">Integración con otros módulos</div>
            <div class="detail-item">Métricas y seguimiento</div>
        </div>
        <div class="detail-section">
            <h6>🔧 Consideraciones Técnicas</h6>
            <div class="detail-item">Requisitos de base de datos</div>
            <div class="detail-item">APIs y servicios externos</div>
            <div class="detail-item">Validaciones y seguridad</div>
            <div class="detail-item">Optimización de rendimiento</div>
        </div>
    `;
}
