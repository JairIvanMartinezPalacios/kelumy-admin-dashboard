-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 1
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS kelumy_courses;
USE kelumy_courses;

-- ========================================
-- 1. TABLA DE CATEGORÍAS
-- ========================================
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color_gradient VARCHAR(50) DEFAULT 'from-blue-500 to-blue-700',
    icon VARCHAR(50) DEFAULT 'BookOpen',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para categorías
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_sort ON categories(sort_order);

-- ========================================
-- 2. TABLA DE CURSOS
-- ========================================
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    instructor VARCHAR(100) NOT NULL,
    instructor_email VARCHAR(100),
    instructor_bio TEXT,
    instructor_avatar VARCHAR(255),
    image_url VARCHAR(255),
    video_preview_url VARCHAR(255),
    duration_hours INT NOT NULL,
    difficulty ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    education_level ENUM('secundaria', 'preparatoria', 'universidad', 'posgrado') DEFAULT 'universidad',
    language VARCHAR(10) DEFAULT 'es',
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    popularity_score INT DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    total_students INT DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INT DEFAULT 0,
    sessions_count INT DEFAULT 0,
    prerequisites JSON,
    skills JSON,
    tags JSON,
    related_courses JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Índices para cursos
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_difficulty ON courses(difficulty);
CREATE INDEX idx_courses_featured ON courses(is_featured);
CREATE INDEX idx_courses_trending ON courses(is_trending);
CREATE INDEX idx_courses_popularity ON courses(popularity_score);
CREATE INDEX idx_courses_rating ON courses(average_rating);
CREATE FULLTEXT INDEX idx_courses_search ON courses(title, description);

-- ========================================
-- 3. TABLA DE NIVELES DE CURSO
-- ========================================
CREATE TABLE course_levels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    level_name ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    topics_count INT DEFAULT 0,
    activities_count INT DEFAULT 0,
    quizzes_count INT DEFAULT 0,
    exams_count INT DEFAULT 0,
    projects_count INT DEFAULT 0,
    students_count INT DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0.00,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_course_level (course_id, level_name)
);

-- Índices para niveles de curso
CREATE INDEX idx_course_levels_course ON course_levels(course_id);
CREATE INDEX idx_course_levels_active ON course_levels(is_active);
CREATE INDEX idx_course_levels_price ON course_levels(price);
CREATE INDEX idx_course_levels_level ON course_levels(level_name);

-- ========================================
-- FIN DE LA PARTE 1
-- ========================================}

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 2
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- 4. TABLA DE USUARIOS/ESTUDIANTES
-- ========================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    country VARCHAR(50),
    city VARCHAR(50),
    education_level ENUM('secundaria', 'preparatoria', 'universidad', 'posgrado'),
    interests JSON,
    learning_goals JSON,
    preferred_language VARCHAR(10) DEFAULT 'es',
    timezone VARCHAR(50) DEFAULT 'America/Mexico_City',
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para usuarios
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_education ON users(education_level);
CREATE INDEX idx_users_country ON users(country);

-- ========================================
-- 5. TABLA DE COMPRAS
-- ========================================
CREATE TABLE purchases (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    level_name ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    purchase_type ENUM('full_course', 'single_level') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    original_amount DECIMAL(10,2),
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_code VARCHAR(50),
    payment_method ENUM('card', 'paypal', 'bank_transfer', 'crypto') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_id VARCHAR(100),
    transaction_id VARCHAR(100),
    currency VARCHAR(3) DEFAULT 'MXN',
    is_gift BOOLEAN DEFAULT FALSE,
    gift_recipient_id INT,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (gift_recipient_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Índices para compras
CREATE INDEX idx_purchases_user ON purchases(user_id);
CREATE INDEX idx_purchases_course ON purchases(course_id);
CREATE INDEX idx_purchases_status ON purchases(payment_status);
CREATE INDEX idx_purchases_date ON purchases(purchased_at);
CREATE INDEX idx_purchases_payment ON purchases(payment_id);

-- ========================================
-- 6. TABLA DE PROGRESO DE ESTUDIANTES
-- ========================================
CREATE TABLE student_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    level_name ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    completed_topics JSON,
    completed_activities JSON,
    completed_quizzes JSON,
    completed_exams JSON,
    completed_projects JSON,
    current_topic_id INT,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    time_spent_minutes INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_course_level (user_id, course_id, level_name)
);

-- Índices para progreso de estudiantes
CREATE INDEX idx_progress_user ON student_progress(user_id);
CREATE INDEX idx_progress_course ON student_progress(course_id);
CREATE INDEX idx_progress_completed ON student_progress(is_completed);
CREATE INDEX idx_progress_level ON student_progress(level_name);

-- ========================================
-- FIN DE LA PARTE 2
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 3
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- 7. TABLA DE CALIFICACIONES
-- ========================================
CREATE TABLE course_ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    level_name ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_title VARCHAR(200),
    review_text TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_helpful_count INT DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_course_level_rating (user_id, course_id, level_name)
);

-- Índices para calificaciones
CREATE INDEX idx_ratings_course ON course_ratings(course_id);
CREATE INDEX idx_ratings_rating ON course_ratings(rating);
CREATE INDEX idx_ratings_public ON course_ratings(is_public);
CREATE INDEX idx_ratings_user ON course_ratings(user_id);

-- ========================================
-- 8. TABLA DE RECOMENDACIONES
-- ========================================
CREATE TABLE recommendations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    recommended_course_id INT NOT NULL,
    recommendation_type ENUM('related', 'category', 'difficulty', 'trending', 'skills', 'popular') NOT NULL,
    reason_text VARCHAR(255),
    score DECIMAL(5,2) NOT NULL,
    is_viewed BOOLEAN DEFAULT FALSE,
    is_clicked BOOLEAN DEFAULT FALSE,
    is_purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 30 DAY),
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recommended_course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Índices para recomendaciones
CREATE INDEX idx_recommendations_user ON recommendations(user_id);
CREATE INDEX idx_recommendations_course ON recommendations(recommended_course_id);
CREATE INDEX idx_recommendations_type ON recommendations(recommendation_type);
CREATE INDEX idx_recommendations_score ON recommendations(score);
CREATE INDEX idx_recommendations_expires ON recommendations(expires_at);

-- ========================================
-- 9. TABLA DE ANALYTICS
-- ========================================
CREATE TABLE course_analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    level_name ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    date DATE NOT NULL,
    views INT DEFAULT 0,
    unique_views INT DEFAULT 0,
    purchases INT DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0.00,
    completions INT DEFAULT 0,
    avg_rating DECIMAL(3,2) DEFAULT 0.00,
    time_spent_minutes INT DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0.00,
    conversion_rate DECIMAL(5,2) DEFAULT 0.00,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_course_level_date (course_id, level_name, date)
);

-- Índices para analytics
CREATE INDEX idx_analytics_course ON course_analytics(course_id);
CREATE INDEX idx_analytics_date ON course_analytics(date);
CREATE INDEX idx_analytics_level ON course_analytics(level_name);

-- ========================================
-- FIN DE LA PARTE 3
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 4
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- 10. TABLA DE DESCUENTOS Y CUPONES
-- ========================================
CREATE TABLE discounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type ENUM('percentage', 'fixed', 'bundle') NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    min_purchase_amount DECIMAL(10,2) DEFAULT 0.00,
    max_discount_amount DECIMAL(10,2),
    usage_limit INT,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    applicable_courses JSON,
    applicable_categories JSON,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Índices para descuentos
CREATE INDEX idx_discounts_code ON discounts(code);
CREATE INDEX idx_discounts_active ON discounts(is_active);
CREATE INDEX idx_discounts_validity ON discounts(valid_from, valid_until);
CREATE INDEX idx_discounts_type ON discounts(type);

-- ========================================
-- 11. TABLA DE CONTENIDO DE CURSOS
-- ========================================
CREATE TABLE course_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    level_name ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    content_type ENUM('topic', 'activity', 'quiz', 'exam', 'project') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content_data JSON,
    order_index INT DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    is_required BOOLEAN DEFAULT TRUE,
    estimated_time_minutes INT DEFAULT 0,
    points INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Índices para contenido de cursos
CREATE INDEX idx_content_course ON course_content(course_id);
CREATE INDEX idx_content_level ON course_content(level_name);
CREATE INDEX idx_content_type ON course_content(content_type);
CREATE INDEX idx_content_order ON course_content(order_index);

-- ========================================
-- 12. TABLA DE SESIONES DE USUARIO
-- ========================================
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para sesiones de usuario
CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_sessions_active ON user_sessions(is_active);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);

-- ========================================
-- 13. TABLA DE NOTIFICACIONES
-- ========================================
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error', 'promotion') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    action_text VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para notificaciones
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- ========================================
-- FIN DE LA PARTE 4
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 5
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- 14. TABLA DE WISHLIST
-- ========================================
CREATE TABLE wishlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    level_name ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_course_level_wishlist (user_id, course_id, level_name)
);

-- Índices para wishlist
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_wishlist_course ON wishlist(course_id);

-- ========================================
-- 15. TABLA DE CUPONES DE USUARIO
-- ========================================
CREATE TABLE user_coupons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    discount_id INT NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_discount (user_id, discount_id)
);

-- Índices para cupones de usuario
CREATE INDEX idx_user_coupons_user ON user_coupons(user_id);
CREATE INDEX idx_user_coupons_discount ON user_coupons(discount_id);
CREATE INDEX idx_user_coupons_used ON user_coupons(used_at);

-- ========================================
-- FIN DE LA PARTE 5
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 6
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- INSERTAR DATOS INICIALES
-- ========================================

-- Insertar categorías
INSERT INTO categories (name, slug, description, color_gradient, icon, sort_order) VALUES
('Ciencias', 'ciencias', 'Cursos de ciencias exactas y naturales', 'from-blue-500 to-blue-700', 'Atom', 1),
('Tecnología', 'tecnologia', 'Cursos de tecnología y programación', 'from-purple-500 to-purple-700', 'Laptop', 2),
('Educación', 'educacion', 'Cursos para docentes y educadores', 'from-green-500 to-green-700', 'GraduationCap', 3);

-- Insertar cursos de Ciencias
INSERT INTO courses (category_id, title, slug, description, instructor, duration_hours, difficulty, status, is_featured, is_trending, popularity_score, completion_rate, total_students, total_revenue, average_rating, total_ratings, sessions_count, prerequisites, skills, tags, related_courses) VALUES
(1, 'Cálculo Diferencial e Integral', 'calculo-diferencial-integral', 'Curso completo de cálculo diferencial e integral para estudiantes universitarios', 'Dr. Carlos Mendoza', 45, 'intermedio', 'published', TRUE, TRUE, 95, 78.00, 2156, 860400.00, 4.80, 156, 18, '["Álgebra básica", "Trigonometría"]', '["Análisis matemático", "Resolución de problemas", "Pensamiento crítico"]', '["Matemáticas", "Cálculo", "Universidad"]', '[2, 4, 5]'),
(1, 'Física General', 'fisica-general', 'Fundamentos de física para estudiantes de ciencias e ingeniería', 'Dra. Ana García', 40, 'basico', 'published', TRUE, FALSE, 88, 82.00, 1892, 660800.00, 4.70, 134, 16, '["Matemáticas básicas"]', '["Análisis físico", "Resolución de problemas", "Pensamiento científico"]', '["Física", "Mecánica", "Fundamentos"]', '[1, 3, 6]'),
(1, 'Química General', 'quimica-general', 'Introducción a la química general y sus aplicaciones', 'Dr. Luis Rodríguez', 35, 'basico', 'published', FALSE, FALSE, 72, 75.00, 1456, 435600.00, 4.60, 98, 14, '["Matemáticas básicas", "Física básica"]', '["Análisis químico", "Laboratorio", "Pensamiento analítico"]', '["Química", "Átomos", "Reacciones"]', '[2, 4, 6]'),
(1, 'Álgebra Lineal', 'algebra-lineal', 'Álgebra lineal y sus aplicaciones en ciencias e ingeniería', 'Dr. Miguel Herrera', 38, 'intermedio', 'published', FALSE, TRUE, 68, 85.00, 1234, 468000.00, 4.90, 89, 15, '["Cálculo básico", "Geometría"]', '["Análisis matricial", "Resolución de sistemas", "Pensamiento abstracto"]', '["Matemáticas", "Álgebra", "Matrices"]', '[1, 5, 7]'),
(1, 'Ecuaciones Diferenciales', 'ecuaciones-diferenciales', 'Ecuaciones diferenciales ordinarias y parciales', 'Dr. Roberto Silva', 42, 'avanzado', 'published', TRUE, FALSE, 45, 78.00, 890, 390000.00, 4.90, 67, 17, '["Cálculo integral", "Álgebra lineal"]', '["Análisis diferencial", "Modelado matemático", "Resolución avanzada"]', '["Matemáticas", "Ecuaciones", "Avanzado"]', '[1, 4, 7]'),
(1, 'Inglés para Ciencias', 'ingles-para-ciencias', 'Inglés técnico y académico para estudiantes de ciencias', 'Prof. Sarah Johnson', 30, 'intermedio', 'published', FALSE, TRUE, 92, 88.00, 2100, 630000.00, 4.40, 145, 12, '["Inglés básico"]', '["Comunicación científica", "Lectura técnica", "Escritura académica"]', '["Inglés", "Ciencias", "Idiomas"]', '[1, 2, 3]');

-- Insertar cursos de Tecnología
INSERT INTO courses (category_id, title, slug, description, instructor, duration_hours, difficulty, status, is_featured, is_trending, popularity_score, completion_rate, total_students, total_revenue, average_rating, total_ratings, sessions_count, prerequisites, skills, tags, related_courses) VALUES
(2, 'Inteligencia Artificial', 'inteligencia-artificial', 'Fundamentos de IA y machine learning', 'Dr. Alex Chen', 60, 'avanzado', 'published', TRUE, TRUE, 98, 72.00, 3200, 2556800.00, 4.90, 245, 24, '["Programación Python", "Matemáticas avanzadas"]', '["Machine Learning", "Deep Learning", "Análisis de datos"]', '["IA", "Machine Learning", "Avanzado"]', '[8, 9, 10]'),
(2, 'Base de Datos', 'base-de-datos', 'Diseño y administración de bases de datos', 'Ing. Patricia López', 35, 'intermedio', 'published', TRUE, FALSE, 85, 85.00, 2800, 1565200.00, 4.70, 189, 14, '["Programación básica"]', '["SQL", "Diseño de BD", "Optimización"]', '["Bases de Datos", "SQL", "Intermedio"]', '[7, 9, 11]'),
(2, 'Páginas Web', 'paginas-web', 'Desarrollo web frontend y backend', 'Dev. Miguel Torres', 40, 'basico', 'published', TRUE, TRUE, 95, 78.00, 4500, 1795500.00, 4.60, 312, 16, '["Conocimientos básicos de computación"]', '["HTML/CSS", "JavaScript", "Diseño web"]', '["Web", "Frontend", "Principiante"]', '[8, 10, 11]'),
(2, 'Programación y Desarrollo de Aplicaciones', 'programacion-desarrollo-aplicaciones', 'Desarrollo full-stack de aplicaciones', 'Dev. Laura García', 50, 'intermedio', 'published', TRUE, TRUE, 90, 80.00, 3600, 2516400.00, 4.80, 267, 20, '["Programación básica", "Bases de datos"]', '["Desarrollo full-stack", "APIs", "Arquitectura de software"]', '["Programación", "Full-stack", "Intermedio"]', '[7, 8, 9, 11]'),
(2, 'Ciberseguridad y Protección Digital', 'ciberseguridad-proteccion-digital', 'Seguridad informática y protección de datos', 'Sec. David Kim', 45, 'avanzado', 'published', FALSE, FALSE, 65, 76.00, 1800, 1186200.00, 4.90, 134, 18, '["Redes de computadoras", "Programación"]', '["Análisis de seguridad", "Penetration testing", "Gestión de riesgos"]', '["Ciberseguridad", "Seguridad", "Avanzado"]', '[8, 9, 10]');

-- Insertar cursos de Educación
INSERT INTO courses (category_id, title, slug, description, instructor, duration_hours, difficulty, status, is_featured, is_trending, popularity_score, completion_rate, total_students, total_revenue, average_rating, total_ratings, sessions_count, prerequisites, skills, tags, related_courses) VALUES
(3, 'Gestión Socioemocional', 'gestion-socioemocional', 'Desarrollo de habilidades socioemocionales en el aula', 'Psic. Elena Vargas', 30, 'intermedio', 'published', FALSE, FALSE, 70, 85.00, 1200, 430800.00, 4.70, 89, 12, '["Psicología básica"]', '["Inteligencia emocional", "Gestión de conflictos", "Liderazgo"]', '["Educación", "Socioemocional", "Docentes"]', '[13, 14, 15]'),
(3, 'Gamificación', 'gamificacion', 'Implementación de gamificación en la educación', 'Prof. Carlos Mendez', 25, 'basico', 'published', FALSE, TRUE, 60, 82.00, 980, 293020.00, 4.50, 67, 10, '["Pedagogía básica"]', '["Diseño de juegos", "Motivación", "Innovación educativa"]', '["Educación", "Gamificación", "Innovación"]', '[12, 14, 16]'),
(3, 'Laboratorios Creativos', 'laboratorios-creativos', 'Diseño de espacios creativos para el aprendizaje', 'Arq. María Fernández', 28, 'intermedio', 'published', FALSE, FALSE, 55, 78.00, 750, 254250.00, 4.60, 45, 11, '["Diseño básico", "Pedagogía"]', '["Diseño de espacios", "Creatividad", "Innovación"]', '["Educación", "Creatividad", "Espacios"]', '[12, 13, 15]'),
(3, 'Evaluación y Retroalimentación Efectiva', 'evaluacion-retroalimentacion-efectiva', 'Metodologías de evaluación y retroalimentación', 'Dr. Roberto Sánchez', 32, 'avanzado', 'published', FALSE, FALSE, 48, 80.00, 650, 259350.00, 4.80, 52, 13, '["Metodología de investigación", "Estadística básica"]', '["Evaluación educativa", "Análisis de datos", "Metodología"]', '["Educación", "Evaluación", "Metodología"]', '[12, 14, 16]'),
(3, 'Diseña tu Plan de Trabajo', 'disena-tu-plan-trabajo', 'Planificación y gestión de proyectos educativos', 'Mg. Ana Rodríguez', 26, 'intermedio', 'published', FALSE, FALSE, 62, 88.00, 890, 337310.00, 4.70, 71, 10, '["Gestión básica"]', '["Planificación", "Gestión de proyectos", "Liderazgo"]', '["Educación", "Planificación", "Gestión"]', '[12, 13, 15]');

-- ========================================
-- FIN DE LA PARTE 6
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 7
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- INSERTAR NIVELES PARA TODOS LOS CURSOS
-- ========================================

-- Cálculo Diferencial e Integral
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(1, 'basico', 'Cálculo - Nivel Básico', 299.00, 449.00, 33.00, 1200, 78.00),
(1, 'intermedio', 'Cálculo - Nivel Intermedio', 399.00, 599.00, 33.00, 800, 82.00),
(1, 'avanzado', 'Cálculo - Nivel Avanzado', 499.00, 749.00, 33.00, 400, 75.00);

-- Física General
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(2, 'basico', 'Física - Nivel Básico', 249.00, 374.00, 33.00, 1000, 85.00),
(2, 'intermedio', 'Física - Nivel Intermedio', 349.00, 524.00, 33.00, 700, 80.00),
(2, 'avanzado', 'Física - Nivel Avanzado', 449.00, 674.00, 33.00, 300, 78.00);

-- Química General
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(3, 'basico', 'Química - Nivel Básico', 199.00, 299.00, 33.00, 800, 80.00),
(3, 'intermedio', 'Química - Nivel Intermedio', 299.00, 449.00, 33.00, 500, 75.00),
(3, 'avanzado', 'Química - Nivel Avanzado', 399.00, 599.00, 33.00, 200, 70.00);

-- Álgebra Lineal
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(4, 'basico', 'Álgebra Lineal - Nivel Básico', 279.00, 419.00, 33.00, 600, 88.00),
(4, 'intermedio', 'Álgebra Lineal - Nivel Intermedio', 379.00, 569.00, 33.00, 400, 85.00),
(4, 'avanzado', 'Álgebra Lineal - Nivel Avanzado', 479.00, 719.00, 33.00, 200, 82.00);

-- Ecuaciones Diferenciales
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(5, 'basico', 'Ecuaciones Diferenciales - Nivel Básico', 329.00, 494.00, 33.00, 400, 80.00),
(5, 'intermedio', 'Ecuaciones Diferenciales - Nivel Intermedio', 429.00, 644.00, 33.00, 300, 78.00),
(5, 'avanzado', 'Ecuaciones Diferenciales - Nivel Avanzado', 529.00, 794.00, 33.00, 150, 75.00);

-- Inglés para Ciencias
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(6, 'basico', 'Inglés para Ciencias - Nivel Básico', 199.00, 299.00, 33.00, 1200, 90.00),
(6, 'intermedio', 'Inglés para Ciencias - Nivel Intermedio', 299.00, 449.00, 33.00, 700, 88.00),
(6, 'avanzado', 'Inglés para Ciencias - Nivel Avanzado', 399.00, 599.00, 33.00, 300, 85.00);

-- Inteligencia Artificial
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(7, 'basico', 'IA - Nivel Básico', 599.00, 899.00, 33.00, 1500, 75.00),
(7, 'intermedio', 'IA - Nivel Intermedio', 799.00, 1199.00, 33.00, 1000, 72.00),
(7, 'avanzado', 'IA - Nivel Avanzado', 999.00, 1499.00, 33.00, 500, 70.00);

-- Base de Datos
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(8, 'basico', 'Base de Datos - Nivel Básico', 399.00, 599.00, 33.00, 1500, 88.00),
(8, 'intermedio', 'Base de Datos - Nivel Intermedio', 559.00, 839.00, 33.00, 1000, 85.00),
(8, 'avanzado', 'Base de Datos - Nivel Avanzado', 719.00, 1079.00, 33.00, 400, 82.00);

-- Páginas Web
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(9, 'basico', 'Páginas Web - Nivel Básico', 299.00, 449.00, 33.00, 2500, 85.00),
(9, 'intermedio', 'Páginas Web - Nivel Intermedio', 399.00, 599.00, 33.00, 1500, 80.00),
(9, 'avanzado', 'Páginas Web - Nivel Avanzado', 499.00, 749.00, 33.00, 800, 75.00);

-- Programación y Desarrollo de Aplicaciones
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(10, 'basico', 'Programación - Nivel Básico', 499.00, 749.00, 33.00, 2000, 85.00),
(10, 'intermedio', 'Programación - Nivel Intermedio', 699.00, 1049.00, 33.00, 1200, 80.00),
(10, 'avanzado', 'Programación - Nivel Avanzado', 899.00, 1349.00, 33.00, 600, 75.00);

-- Ciberseguridad y Protección Digital
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(11, 'basico', 'Ciberseguridad - Nivel Básico', 449.00, 674.00, 33.00, 800, 80.00),
(11, 'intermedio', 'Ciberseguridad - Nivel Intermedio', 659.00, 989.00, 33.00, 600, 76.00),
(11, 'avanzado', 'Ciberseguridad - Nivel Avanzado', 859.00, 1289.00, 33.00, 300, 72.00);

-- Gestión Socioemocional
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(12, 'basico', 'Gestión Socioemocional - Nivel Básico', 249.00, 374.00, 33.00, 600, 88.00),
(12, 'intermedio', 'Gestión Socioemocional - Nivel Intermedio', 359.00, 539.00, 33.00, 400, 85.00),
(12, 'avanzado', 'Gestión Socioemocional - Nivel Avanzado', 459.00, 689.00, 33.00, 200, 82.00);

-- Gamificación
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(13, 'basico', 'Gamificación - Nivel Básico', 199.00, 299.00, 33.00, 500, 85.00),
(13, 'intermedio', 'Gamificación - Nivel Intermedio', 299.00, 449.00, 33.00, 300, 82.00),
(13, 'avanzado', 'Gamificación - Nivel Avanzado', 399.00, 599.00, 33.00, 150, 78.00);

-- Laboratorios Creativos
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(14, 'basico', 'Laboratorios Creativos - Nivel Básico', 229.00, 344.00, 33.00, 400, 80.00),
(14, 'intermedio', 'Laboratorios Creativos - Nivel Intermedio', 339.00, 509.00, 33.00, 250, 78.00),
(14, 'avanzado', 'Laboratorios Creativos - Nivel Avanzado', 439.00, 659.00, 33.00, 100, 75.00);

-- Evaluación y Retroalimentación Efectiva
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(15, 'basico', 'Evaluación - Nivel Básico', 279.00, 419.00, 33.00, 350, 85.00),
(15, 'intermedio', 'Evaluación - Nivel Intermedio', 399.00, 599.00, 33.00, 200, 80.00),
(15, 'avanzado', 'Evaluación - Nivel Avanzado', 519.00, 779.00, 33.00, 100, 75.00);

-- Diseña tu Plan de Trabajo
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(16, 'basico', 'Plan de Trabajo - Nivel Básico', 249.00, 374.00, 33.00, 500, 90.00),
(16, 'intermedio', 'Plan de Trabajo - Nivel Intermedio', 379.00, 569.00, 33.00, 300, 88.00),
(16, 'avanzado', 'Plan de Trabajo - Nivel Avanzado', 479.00, 719.00, 33.00, 150, 85.00);

-- ========================================
-- FIN DE LA PARTE 7
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 8
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- COMPLETAR NIVELES DE CURSOS DE EDUCACIÓN
-- ========================================

-- Diseña tu Plan de Trabajo (completar línea cortada)
INSERT INTO course_levels (course_id, level_name, title, price, original_price, discount_percentage, students_count, completion_rate) VALUES
(16, 'intermedio', 'Plan de Trabajo - Nivel Intermedio', 379.00, 569.00, 33.00, 300, 88.00),
(16, 'avanzado', 'Plan de Trabajo - Nivel Avanzado', 479.00, 719.00, 33.00, 150, 85.00);

-- ========================================
-- FIN DE LA PARTE 8
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 9
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- CREAR VISTAS ÚTILES
-- ========================================

-- Vista de cursos con información completa
CREATE VIEW v_courses_complete AS
SELECT 
    c.id,
    c.title,
    c.slug,
    c.description,
    c.instructor,
    c.duration_hours,
    c.difficulty,
    c.status,
    c.is_featured,
    c.is_trending,
    c.popularity_score,
    c.completion_rate,
    c.total_students,
    c.total_revenue,
    c.average_rating,
    c.total_ratings,
    cat.name as category_name,
    cat.slug as category_slug,
    cat.color_gradient,
    cat.icon,
    COUNT(cl.id) as levels_count
FROM courses c
JOIN categories cat ON c.category_id = cat.id
LEFT JOIN course_levels cl ON c.id = cl.course_id
GROUP BY c.id;

-- Vista de niveles con información del curso
CREATE VIEW v_course_levels_complete AS
SELECT 
    cl.id,
    cl.course_id,
    c.title as course_title,
    c.slug as course_slug,
    c.instructor,
    cl.level_name,
    cl.title as level_title,
    cl.price,
    cl.original_price,
    cl.discount_percentage,
    cl.students_count,
    cl.completion_rate,
    cl.revenue,
    cat.name as category_name,
    cat.color_gradient
FROM course_levels cl
JOIN courses c ON cl.course_id = c.id
JOIN categories cat ON c.category_id = cat.id;

-- Vista de estadísticas de usuario
CREATE VIEW v_user_stats AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    COUNT(DISTINCT p.id) as total_purchases,
    COUNT(DISTINCT sp.id) as courses_in_progress,
    COUNT(DISTINCT CASE WHEN sp.is_completed = TRUE THEN sp.id END) as completed_courses,
    SUM(p.amount) as total_spent,
    AVG(cr.rating) as average_rating_given
FROM users u
LEFT JOIN purchases p ON u.id = p.user_id AND p.payment_status = 'completed'
LEFT JOIN student_progress sp ON u.id = sp.user_id
LEFT JOIN course_ratings cr ON u.id = cr.user_id
GROUP BY u.id;

-- Vista de recomendaciones por usuario
CREATE VIEW v_user_recommendations AS
SELECT 
    r.id,
    r.user_id,
    r.recommended_course_id,
    c.title as course_title,
    c.slug as course_slug,
    c.instructor,
    c.difficulty,
    c.average_rating,
    c.total_ratings,
    cat.name as category_name,
    cat.color_gradient,
    r.recommendation_type,
    r.reason_text,
    r.score,
    r.is_viewed,
    r.is_clicked,
    r.is_purchased,
    r.created_at,
    r.expires_at
FROM recommendations r
JOIN courses c ON r.recommended_course_id = c.id
JOIN categories cat ON c.category_id = cat.id;

-- Vista de analytics por curso
CREATE VIEW v_course_analytics_summary AS
SELECT 
    c.id as course_id,
    c.title as course_title,
    cat.name as category_name,
    ca.level_name,
    COUNT(ca.id) as total_days,
    SUM(ca.views) as total_views,
    SUM(ca.unique_views) as total_unique_views,
    SUM(ca.purchases) as total_purchases,
    SUM(ca.revenue) as total_revenue,
    SUM(ca.completions) as total_completions,
    AVG(ca.avg_rating) as avg_rating,
    SUM(ca.time_spent_minutes) as total_time_spent,
    AVG(ca.bounce_rate) as avg_bounce_rate,
    AVG(ca.conversion_rate) as avg_conversion_rate
FROM courses c
JOIN categories cat ON c.category_id = cat.id
LEFT JOIN course_analytics ca ON c.id = ca.course_id
GROUP BY c.id, ca.level_name;

-- ========================================
-- FIN DE LA PARTE 9
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 10
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- CREAR PROCEDIMIENTOS ALMACENADOS
-- ========================================

-- Procedimiento para generar recomendaciones
DELIMITER //
CREATE PROCEDURE GenerateRecommendations(
    IN p_user_id INT,
    IN p_limit INT DEFAULT 8
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_course_id INT;
    DECLARE v_related_courses JSON;
    DECLARE v_recommendations JSON DEFAULT JSON_ARRAY();
    
    -- Cursor para obtener cursos relacionados
    DECLARE course_cursor CURSOR FOR
        SELECT id, related_courses 
        FROM courses 
        WHERE id IN (
            SELECT DISTINCT course_id 
            FROM purchases 
            WHERE user_id = p_user_id AND payment_status = 'completed'
        );
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Limpiar recomendaciones existentes
    DELETE FROM recommendations 
    WHERE user_id = p_user_id AND expires_at < NOW();
    
    -- Generar recomendaciones basadas en cursos relacionados
    OPEN course_cursor;
    read_loop: LOOP
        FETCH course_cursor INTO v_course_id, v_related_courses;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Insertar recomendaciones relacionadas
        INSERT INTO recommendations (user_id, recommended_course_id, recommendation_type, reason_text, score)
        SELECT 
            p_user_id,
            JSON_UNQUOTE(JSON_EXTRACT(v_related_courses, CONCAT('$[', idx, ']'))),
            'related',
            CONCAT('Relacionado con ', (SELECT title FROM courses WHERE id = v_course_id)),
            95.00
        FROM (
            SELECT 0 as idx UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
        ) t
        WHERE JSON_UNQUOTE(JSON_EXTRACT(v_related_courses, CONCAT('$[', idx, ']'))) IS NOT NULL
        AND JSON_UNQUOTE(JSON_EXTRACT(v_related_courses, CONCAT('$[', idx, ']'))) NOT IN (
            SELECT course_id FROM purchases WHERE user_id = p_user_id AND payment_status = 'completed'
        );
        
    END LOOP;
    CLOSE course_cursor;
    
    -- Generar recomendaciones por categoría favorita
    INSERT INTO recommendations (user_id, recommended_course_id, recommendation_type, reason_text, score)
    SELECT 
        p_user_id,
        c.id,
        'category',
        CONCAT('Más cursos de ', cat.name),
        85.00
    FROM courses c
    JOIN categories cat ON c.category_id = cat.id
    WHERE cat.id = (
        SELECT c2.category_id
        FROM courses c2
        JOIN purchases p ON c2.id = p.course_id
        WHERE p.user_id = p_user_id AND p.payment_status = 'completed'
        GROUP BY c2.category_id
        ORDER BY COUNT(*) DESC
        LIMIT 1
    )
    AND c.id NOT IN (
        SELECT course_id FROM purchases WHERE user_id = p_user_id AND payment_status = 'completed'
    )
    AND c.status = 'published'
    LIMIT 3;
    
    -- Generar recomendaciones trending
    INSERT INTO recommendations (user_id, recommended_course_id, recommendation_type, reason_text, score)
    SELECT 
        p_user_id,
        c.id,
        'trending',
        'Tendencia popular',
        75.00
    FROM courses c
    WHERE c.is_trending = TRUE
    AND c.id NOT IN (
        SELECT course_id FROM purchases WHERE user_id = p_user_id AND payment_status = 'completed'
    )
    AND c.status = 'published'
    ORDER BY c.popularity_score DESC
    LIMIT 2;
    
    -- Retornar recomendaciones ordenadas por score
    SELECT 
        r.id,
        r.recommended_course_id,
        c.title as course_title,
        c.slug as course_slug,
        c.instructor,
        c.difficulty,
        c.average_rating,
        c.total_ratings,
        cat.name as category_name,
        cat.color_gradient,
        r.recommendation_type,
        r.reason_text,
        r.score
    FROM recommendations r
    JOIN courses c ON r.recommended_course_id = c.id
    JOIN categories cat ON c.category_id = cat.id
    WHERE r.user_id = p_user_id
    ORDER BY r.score DESC
    LIMIT p_limit;
    
END //
DELIMITER ;

-- ========================================
-- FIN DE LA PARTE 10
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 11
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- CREAR MÁS PROCEDIMIENTOS ALMACENADOS
-- ========================================

-- Procedimiento para procesar compra
DELIMITER //
CREATE PROCEDURE ProcessPurchase(
    IN p_user_id INT,
    IN p_course_id INT,
    IN p_level_name VARCHAR(20),
    IN p_payment_method VARCHAR(20),
    IN p_payment_id VARCHAR(100),
    OUT p_purchase_id INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_course_exists INT DEFAULT 0;
    DECLARE v_level_exists INT DEFAULT 0;
    DECLARE v_price DECIMAL(10,2);
    DECLARE v_original_price DECIMAL(10,2);
    DECLARE v_discount_percentage DECIMAL(5,2);
    DECLARE v_purchase_id INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Error en el procesamiento de la compra';
    END;
    
    START TRANSACTION;
    
    -- Verificar que el curso existe
    SELECT COUNT(*) INTO v_course_exists FROM courses WHERE id = p_course_id AND status = 'published';
    IF v_course_exists = 0 THEN
        SET p_success = FALSE;
        SET p_message = 'El curso no existe o no está disponible';
        ROLLBACK;
    END IF;
    
    -- Verificar que el nivel existe
    SELECT COUNT(*) INTO v_level_exists 
    FROM course_levels 
    WHERE course_id = p_course_id AND level_name = p_level_name AND is_active = TRUE;
    
    IF v_level_exists = 0 THEN
        SET p_success = FALSE;
        SET p_message = 'El nivel del curso no está disponible';
        ROLLBACK;
    END IF;
    
    -- Obtener precios del nivel
    SELECT price, original_price, discount_percentage 
    INTO v_price, v_original_price, v_discount_percentage
    FROM course_levels 
    WHERE course_id = p_course_id AND level_name = p_level_name;
    
    -- Crear la compra
    INSERT INTO purchases (
        user_id, course_id, level_name, purchase_type, amount, 
        original_amount, discount_percentage, payment_method, 
        payment_status, payment_id
    ) VALUES (
        p_user_id, p_course_id, p_level_name, 'single_level', 
        v_price, v_original_price, v_discount_percentage, 
        p_payment_method, 'completed', p_payment_id
    );
    
    SET v_purchase_id = LAST_INSERT_ID();
    SET p_purchase_id = v_purchase_id;
    
    -- Crear progreso del estudiante
    INSERT INTO student_progress (user_id, course_id, level_name)
    VALUES (p_user_id, p_course_id, p_level_name)
    ON DUPLICATE KEY UPDATE last_accessed = NOW();
    
    -- Actualizar estadísticas del curso
    UPDATE course_levels 
    SET students_count = students_count + 1,
        revenue = revenue + v_price
    WHERE course_id = p_course_id AND level_name = p_level_name;
    
    -- Actualizar estadísticas del curso principal
    UPDATE courses 
    SET total_students = total_students + 1,
        total_revenue = total_revenue + v_price
    WHERE id = p_course_id;
    
    COMMIT;
    SET p_success = TRUE;
    SET p_message = 'Compra procesada exitosamente';
    
END //
DELIMITER ;

-- ========================================
-- FIN DE LA PARTE 11
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 12
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- CREAR TRIGGERS
-- ========================================

-- Trigger para actualizar estadísticas de curso cuando se completa una compra
DELIMITER //
CREATE TRIGGER tr_purchase_completed
AFTER UPDATE ON purchases
FOR EACH ROW
BEGIN
    IF NEW.payment_status = 'completed' AND OLD.payment_status != 'completed' THEN
        -- Actualizar estadísticas del nivel
        UPDATE course_levels 
        SET students_count = students_count + 1,
            revenue = revenue + NEW.amount
        WHERE course_id = NEW.course_id AND level_name = NEW.level_name;
        
        -- Actualizar estadísticas del curso
        UPDATE courses 
        SET total_students = total_students + 1,
            total_revenue = total_revenue + NEW.amount
        WHERE id = NEW.course_id;
    END IF;
END //
DELIMITER ;

-- Trigger para actualizar rating promedio cuando se agrega una calificación
DELIMITER //
CREATE TRIGGER tr_rating_added
AFTER INSERT ON course_ratings
FOR EACH ROW
BEGIN
    -- Actualizar rating promedio del curso
    UPDATE courses 
    SET average_rating = (
        SELECT AVG(rating) 
        FROM course_ratings 
        WHERE course_id = NEW.course_id AND is_public = TRUE
    ),
    total_ratings = (
        SELECT COUNT(*) 
        FROM course_ratings 
        WHERE course_id = NEW.course_id AND is_public = TRUE
    )
    WHERE id = NEW.course_id;
END //
DELIMITER ;

-- Trigger para actualizar progreso cuando se completa un curso
DELIMITER //
CREATE TRIGGER tr_course_completed
AFTER UPDATE ON student_progress
FOR EACH ROW
BEGIN
    IF NEW.is_completed = TRUE AND OLD.is_completed = FALSE THEN
        -- Actualizar estadísticas de completión
        UPDATE course_levels 
        SET completion_rate = (
            SELECT AVG(CASE WHEN is_completed = TRUE THEN 100 ELSE progress_percentage END)
            FROM student_progress 
            WHERE course_id = NEW.course_id AND level_name = NEW.level_name
        )
        WHERE course_id = NEW.course_id AND level_name = NEW.level_name;
        
        -- Actualizar estadísticas del curso principal
        UPDATE courses 
        SET completion_rate = (
            SELECT AVG(CASE WHEN is_completed = TRUE THEN 100 ELSE progress_percentage END)
            FROM student_progress 
            WHERE course_id = NEW.course_id
        )
        WHERE id = NEW.course_id;
    END IF;
END //
DELIMITER ;

-- ========================================
-- FIN DE LA PARTE 12
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 13
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- CREAR FUNCIONES
-- ========================================

-- Función para calcular descuento
DELIMITER //
CREATE FUNCTION CalculateDiscount(original_price DECIMAL(10,2), current_price DECIMAL(10,2))
RETURNS DECIMAL(5,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE discount DECIMAL(5,2);
    SET discount = ((original_price - current_price) / original_price) * 100;
    RETURN ROUND(discount, 2);
END //
DELIMITER ;

-- Función para verificar si un usuario tiene acceso a un curso
DELIMITER //
CREATE FUNCTION UserHasAccess(p_user_id INT, p_course_id INT, p_level_name VARCHAR(20))
RETURNS BOOLEAN
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE access_count INT DEFAULT 0;
    
    SELECT COUNT(*) INTO access_count
    FROM purchases p
    WHERE p.user_id = p_user_id 
    AND p.course_id = p_course_id 
    AND p.level_name = p_level_name
    AND p.payment_status = 'completed';
    
    RETURN access_count > 0;
END //
DELIMITER ;

-- Función para obtener el nivel de dificultad siguiente
DELIMITER //
CREATE FUNCTION GetNextDifficultyLevel(current_level VARCHAR(20))
RETURNS VARCHAR(20)
READS SQL DATA
DETERMINISTIC
BEGIN
    CASE current_level
        WHEN 'basico' THEN RETURN 'intermedio';
        WHEN 'intermedio' THEN RETURN 'avanzado';
        WHEN 'avanzado' THEN RETURN 'avanzado';
        ELSE RETURN 'basico';
    END CASE;
END //
DELIMITER ;

-- ========================================
-- FIN DE LA PARTE 13
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 14
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- INSERTAR DATOS DE PRUEBA
-- ========================================

-- Insertar usuarios de prueba
INSERT INTO users (email, password_hash, first_name, last_name, education_level, interests, learning_goals) VALUES
('admin@kelumy.com', '$2b$10$example_hash', 'Admin', 'KELUMY', 'posgrado', '["tecnologia", "educacion"]', '["aprender", "enseñar"]'),
('estudiante1@email.com', '$2b$10$example_hash', 'María', 'García', 'universidad', '["ciencias", "matematicas"]', '["calculo", "fisica"]'),
('estudiante2@email.com', '$2b$10$example_hash', 'Carlos', 'López', 'universidad', '["tecnologia", "programacion"]', '["desarrollo", "ia"]'),
('profesor1@email.com', '$2b$10$example_hash', 'Ana', 'Rodríguez', 'posgrado', '["educacion", "pedagogia"]', '["enseñar", "innovacion"]');

-- Insertar algunas compras de prueba
INSERT INTO purchases (user_id, course_id, level_name, purchase_type, amount, original_amount, payment_method, payment_status, payment_id) VALUES
(2, 1, 'basico', 'single_level', 299.00, 449.00, 'card', 'completed', 'pay_123456'),
(2, 2, 'basico', 'single_level', 249.00, 374.00, 'card', 'completed', 'pay_123457'),
(3, 7, 'basico', 'single_level', 599.00, 899.00, 'paypal', 'completed', 'pay_123458'),
(3, 8, 'intermedio', 'single_level', 559.00, 839.00, 'card', 'completed', 'pay_123459'),
(4, 12, 'intermedio', 'single_level', 359.00, 539.00, 'card', 'completed', 'pay_123460');

-- Insertar progreso de estudiantes
INSERT INTO student_progress (user_id, course_id, level_name, progress_percentage, is_completed) VALUES
(2, 1, 'basico', 75.00, FALSE),
(2, 2, 'basico', 100.00, TRUE),
(3, 7, 'basico', 60.00, FALSE),
(3, 8, 'intermedio', 45.00, FALSE),
(4, 12, 'intermedio', 90.00, FALSE);

-- Insertar algunas calificaciones
INSERT INTO course_ratings (user_id, course_id, level_name, rating, review_title, review_text, is_verified_purchase) VALUES
(2, 1, 'basico', 5, 'Excelente curso', 'Muy bien explicado y fácil de seguir', TRUE),
(2, 2, 'basico', 4, 'Muy bueno', 'Buen contenido pero podría tener más ejemplos', TRUE),
(3, 7, 'basico', 5, 'Increíble', 'El mejor curso de IA que he tomado', TRUE),
(3, 8, 'intermedio', 4, 'Bueno', 'Contenido sólido y bien estructurado', TRUE),
(4, 12, 'intermedio', 5, 'Muy útil', 'Perfecto para docentes que quieren mejorar', TRUE);

-- ========================================
-- FIN DE LA PARTE 14
-- ========================================

-- ========================================
-- SCRIPT COMPLETO DE BASE DE DATOS - PARTE 15
-- SISTEMA DE CURSOS KELUMY
-- ========================================

-- Continuar con la base de datos kelumy_courses
USE kelumy_courses;

-- ========================================
-- RESUMEN FINAL
-- ========================================

-- Mostrar resumen de la base de datos
SELECT 
    'Base de datos creada exitosamente' as status,
    COUNT(DISTINCT c.id) as total_courses,
    COUNT(DISTINCT cl.id) as total_levels,
    COUNT(DISTINCT u.id) as total_users,
    COUNT(DISTINCT p.id) as total_purchases
FROM courses c
CROSS JOIN course_levels cl
CROSS JOIN users u
CROSS JOIN purchases p;

-- ========================================
-- FIN DEL SCRIPT COMPLETO
-- ========================================