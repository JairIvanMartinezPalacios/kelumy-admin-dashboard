-- ========================================
-- ESQUEMA DE BASE DE DATOS KELUMY
-- Base de datos MySQL para PHPMyAdmin
-- ========================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS kelumy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE kelumy_db;

-- ========================================
-- TABLA DE USUARIOS
-- ========================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100),
    state VARCHAR(100),
    academicLevel VARCHAR(100),
    currentGrade VARCHAR(100),
    countryChange VARCHAR(100),
    expectations TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    profile_photo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- TABLA DE TOKENS DE AUTENTICACIÓN
-- ========================================

CREATE TABLE IF NOT EXISTS auth_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    type ENUM('access', 'refresh', 'password_reset', 'email_verification') NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_expires_at (expires_at)
);

-- ========================================
-- TABLA DE CURSOS
-- ========================================

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    duration VARCHAR(50),
    price DECIMAL(10, 2) DEFAULT 0.00,
    thumbnail VARCHAR(500),
    is_published BOOLEAN DEFAULT FALSE,
    total_lessons INT DEFAULT 0,
    total_students INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_title (title),
    INDEX idx_category (category),
    INDEX idx_level (level),
    INDEX idx_is_published (is_published),
    INDEX idx_rating (rating)
);

-- ========================================
-- TABLA DE INSCRIPCIONES DE CURSOS
-- ========================================

CREATE TABLE IF NOT EXISTS course_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT DEFAULT 0,
    status ENUM('enrolled', 'in_progress', 'completed', 'dropped') DEFAULT 'enrolled',
    completed_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    INDEX idx_user_id (user_id),
    INDEX idx_course_id (course_id),
    INDEX idx_status (status),
    INDEX idx_progress (progress)
);

-- ========================================
-- TABLA DE LECCIONES
-- ========================================

CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    video_url VARCHAR(500),
    duration VARCHAR(50),
    order_index INT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course_id (course_id),
    INDEX idx_order_index (order_index),
    INDEX idx_is_published (is_published)
);

-- ========================================
-- TABLA DE PROGRESO DE LECCIONES
-- ========================================

CREATE TABLE IF NOT EXISTS lesson_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    course_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    time_spent INT DEFAULT 0, -- en segundos
    last_position INT DEFAULT 0, -- posición del video en segundos
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_lesson_progress (user_id, lesson_id),
    INDEX idx_user_id (user_id),
    INDEX idx_lesson_id (lesson_id),
    INDEX idx_course_id (course_id),
    INDEX idx_completed (completed)
);

-- ========================================
-- TABLA DE CERTIFICADOS
-- ========================================

CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    verification_code VARCHAR(50) UNIQUE NOT NULL,
    pdf_url VARCHAR(500),
    is_valid BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_course_id (course_id),
    INDEX idx_certificate_number (certificate_number),
    INDEX idx_verification_code (verification_code),
    INDEX idx_issued_at (issued_at)
);

-- ========================================
-- TABLA DE NOTIFICACIONES
-- ========================================

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- TABLA DE CONFIGURACIÓN DEL SISTEMA
-- ========================================

CREATE TABLE IF NOT EXISTS system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_key (setting_key)
);

-- ========================================
-- TABLA DE ACTIVIDADES/LOGS
-- ========================================

CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- INSERTAR DATOS INICIALES
-- ========================================

-- Insertar usuario administrador por defecto
INSERT INTO users (
    fullName, 
    lastName, 
    email, 
    password, 
    role, 
    is_active,
    academicLevel,
    expectations
) VALUES (
    'Administrador', 
    'Sistema', 
    'admin@kelumy.com', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
    'admin', 
    TRUE,
    'Superior',
    'Administrar la plataforma KELUMY'
) ON DUPLICATE KEY UPDATE email = email;

-- Insertar configuraciones del sistema
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('site_name', 'KELUMY', 'Nombre del sitio web'),
('site_description', 'Plataforma de cursos en línea', 'Descripción del sitio'),
('maintenance_mode', '0', 'Modo de mantenimiento (0=desactivado, 1=activado)'),
('max_file_size', '10485760', 'Tamaño máximo de archivo en bytes (10MB)'),
('allowed_file_types', 'jpg,jpeg,png,pdf,mp4,doc,docx', 'Tipos de archivo permitidos'),
('email_verification_required', '1', 'Verificación de email requerida (0=no, 1=sí)'),
('registration_enabled', '1', 'Registro de usuarios habilitado (0=no, 1=sí)')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Insertar cursos de ejemplo
INSERT INTO courses (
    title, 
    description, 
    instructor, 
    category, 
    level, 
    duration, 
    price, 
    is_published,
    total_lessons,
    total_students,
    rating
) VALUES
(
    'JavaScript Avanzado',
    'Domina los conceptos avanzados de JavaScript incluyendo closures, promises, async/await y más.',
    'Dr. María González',
    'Programación',
    'intermediate',
    '8h 30min',
    89.99,
    TRUE,
    24,
    1250,
    4.8
),
(
    'React Hooks Profundo',
    'Aprende a usar React Hooks de manera efectiva para crear aplicaciones modernas.',
    'Ing. Carlos Ruiz',
    'Programación',
    'intermediate',
    '6h 15min',
    79.99,
    TRUE,
    18,
    890,
    4.9
),
(
    'Diseño UX/UI Moderno',
    'Crea interfaces de usuario atractivas y funcionales siguiendo las mejores prácticas.',
    'Diseñadora Ana López',
    'Diseño',
    'beginner',
    '10h 45min',
    99.99,
    TRUE,
    20,
    2100,
    4.7
),
(
    'Python para Data Science',
    'Aprende Python aplicado a la ciencia de datos con pandas, numpy y matplotlib.',
    'Dr. Roberto Silva',
    'Data Science',
    'intermediate',
    '12h 20min',
    119.99,
    FALSE,
    30,
    1800,
    4.6
),
(
    'Marketing Digital Avanzado',
    'Estrategias avanzadas de marketing digital para empresas modernas.',
    'Marketing Expert',
    'Marketing',
    'advanced',
    '7h 30min',
    69.99,
    TRUE,
    15,
    950,
    4.5
)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- ========================================
-- CREAR VISTAS ÚTILES
-- ========================================

-- Vista de usuarios con estadísticas
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    u.id,
    u.fullName,
    u.lastName,
    u.email,
    u.role,
    u.is_active,
    u.created_at,
    COUNT(DISTINCT ce.id) as total_courses,
    COUNT(DISTINCT CASE WHEN ce.status = 'completed' THEN ce.id END) as completed_courses,
    COUNT(DISTINCT c.id) as total_certificates,
    COALESCE(AVG(ce.progress), 0) as average_progress
FROM users u
LEFT JOIN course_enrollments ce ON u.id = ce.user_id
LEFT JOIN certificates c ON u.id = c.user_id
GROUP BY u.id, u.fullName, u.lastName, u.email, u.role, u.is_active, u.created_at;

-- Vista de cursos con estadísticas
CREATE OR REPLACE VIEW course_stats AS
SELECT 
    c.id,
    c.title,
    c.instructor,
    c.category,
    c.level,
    c.duration,
    c.price,
    c.is_published,
    c.total_lessons,
    COUNT(DISTINCT ce.user_id) as enrolled_students,
    COUNT(DISTINCT CASE WHEN ce.status = 'completed' THEN ce.user_id END) as completed_students,
    COALESCE(AVG(ce.progress), 0) as average_progress,
    COUNT(DISTINCT cert.id) as certificates_issued,
    c.rating,
    c.created_at
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
LEFT JOIN certificates cert ON c.id = cert.course_id
GROUP BY c.id, c.title, c.instructor, c.category, c.level, c.duration, c.price, c.is_published, c.total_lessons, c.rating, c.created_at;

-- ========================================
-- PROCEDIMIENTOS ALMACENADOS ÚTILES
-- ========================================

DELIMITER //

-- Procedimiento para obtener estadísticas generales
CREATE PROCEDURE GetGeneralStats()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM users WHERE is_active = TRUE) as total_users,
        (SELECT COUNT(*) FROM users WHERE role = 'admin') as total_admins,
        (SELECT COUNT(*) FROM courses WHERE is_published = TRUE) as published_courses,
        (SELECT COUNT(*) FROM course_enrollments) as total_enrollments,
        (SELECT COUNT(*) FROM certificates WHERE is_valid = TRUE) as valid_certificates,
        (SELECT COUNT(*) FROM notifications WHERE is_read = FALSE) as unread_notifications;
END //

-- Procedimiento para limpiar tokens expirados
CREATE PROCEDURE CleanExpiredTokens()
BEGIN
    DELETE FROM auth_tokens WHERE expires_at < NOW();
END //

DELIMITER ;

-- ========================================
-- CREAR EVENTOS AUTOMÁTICOS
-- ========================================

-- Limpiar tokens expirados cada hora
CREATE EVENT IF NOT EXISTS clean_expired_tokens
ON SCHEDULE EVERY 1 HOUR
DO
  CALL CleanExpiredTokens();

-- Activar el programador de eventos
SET GLOBAL event_scheduler = ON;

-- ========================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ========================================

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_user_course_progress ON course_enrollments(user_id, course_id, progress);
CREATE INDEX idx_course_enrollment_status ON course_enrollments(course_id, status);
CREATE INDEX idx_notification_user_read ON notifications(user_id, is_read, created_at);
CREATE INDEX idx_activity_user_action ON activity_logs(user_id, action, created_at);

-- ========================================
-- PERMISOS Y ROLES (OPCIONAL)
-- ========================================

-- Crear usuario para la aplicación (opcional)
-- CREATE USER 'kelumy_app'@'localhost' IDENTIFIED BY 'tu_password_seguro';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON kelumy_db.* TO 'kelumy_app'@'localhost';
-- FLUSH PRIVILEGES;

-- ========================================
-- COMENTARIOS FINALES
-- ========================================

/*
ESTRUCTURA DE LA BASE DE DATOS KELUMY:

1. users - Usuarios del sistema (estudiantes y administradores)
2. auth_tokens - Tokens de autenticación y sesiones
3. courses - Cursos disponibles en la plataforma
4. course_enrollments - Inscripciones de usuarios a cursos
5. lessons - Lecciones individuales de cada curso
6. lesson_progress - Progreso de usuarios en lecciones
7. certificates - Certificados emitidos
8. notifications - Sistema de notificaciones
9. system_settings - Configuración del sistema
10. activity_logs - Logs de actividad de usuarios

CONFIGURACIÓN RECOMENDADA PARA PHPMyAdmin:
- Importar este archivo en PHPMyAdmin
- Verificar que la base de datos 'kelumy_db' se creó correctamente
- El usuario administrador por defecto es: admin@kelumy.com / password: password
- Cambiar la contraseña del administrador después del primer login

SEGURIDAD:
- Todos los passwords deben ser hasheados con bcrypt
- Los tokens deben tener tiempos de expiración apropiados
- Implementar rate limiting para prevenir ataques de fuerza bruta
- Usar HTTPS en producción
*/
