<?php
/**
 * API de Administración para KELUMY
 * Gestión de usuarios, cursos y configuraciones (solo administradores)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir funciones de autenticación
require_once 'auth.php';

// Obtener método y ruta
$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$path = str_replace('/api/admin', '', $path);

// Obtener datos del cuerpo de la petición
$input = json_decode(file_get_contents('php://input'), true);

// Verificar que el usuario sea administrador
$token = getBearerToken();
if (!$token) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Token no proporcionado']);
    exit();
}

$payload = verifyToken($token);
if (!$payload || $payload['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Acceso denegado. Se requieren permisos de administrador']);
    exit();
}

// Router de endpoints de administración
switch ($path) {
    case '/users':
        if ($method === 'GET') {
            handleGetUsers($pdo, $_GET);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/users/delete':
        if ($method === 'DELETE') {
            handleDeleteUser($pdo, $input);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/promote':
        if ($method === 'POST') {
            handlePromoteUser($pdo, $input);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/demote':
        if ($method === 'POST') {
            handleDemoteUser($pdo, $input);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/stats':
        if ($method === 'GET') {
            handleGetStats($pdo);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/activity':
        if ($method === 'GET') {
            handleGetActivity($pdo, $_GET);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    default:
        // Manejar rutas dinámicas como /users/{id}
        if (preg_match('/^\/users\/(\d+)$/', $path, $matches)) {
            $userId = $matches[1];
            if ($method === 'DELETE') {
                handleDeleteUserById($pdo, $userId);
            } else {
                http_response_code(405);
                echo json_encode(['success' => false, 'message' => 'Método no permitido']);
            }
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Endpoint no encontrado']);
        }
        break;
}

// Función para obtener lista de usuarios
function handleGetUsers($pdo, $filters) {
    try {
        $page = max(1, intval($filters['page'] ?? 1));
        $limit = min(100, max(1, intval($filters['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;
        
        $search = $filters['search'] ?? '';
        $role = $filters['role'] ?? '';
        $status = $filters['status'] ?? '';
        
        // Construir query base
        $whereConditions = [];
        $params = [];
        
        if ($search) {
            $whereConditions[] = "(fullName LIKE ? OR lastName LIKE ? OR email LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        if ($role && in_array($role, ['user', 'admin'])) {
            $whereConditions[] = "role = ?";
            $params[] = $role;
        }
        
        if ($status !== '' && in_array($status, ['0', '1'])) {
            $whereConditions[] = "is_active = ?";
            $params[] = intval($status);
        }
        
        $whereClause = !empty($whereConditions) ? 'WHERE ' . implode(' AND ', $whereConditions) : '';
        
        // Contar total de usuarios
        $countSql = "SELECT COUNT(*) as total FROM users $whereClause";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Obtener usuarios con paginación
        $sql = "
            SELECT 
                u.id, u.fullName, u.lastName, u.email, u.role, u.is_active, 
                u.created_at, u.updated_at,
                COUNT(DISTINCT ce.id) as total_courses,
                COUNT(DISTINCT CASE WHEN ce.status = 'completed' THEN ce.id END) as completed_courses,
                COUNT(DISTINCT cert.id) as total_certificates
            FROM users u
            LEFT JOIN course_enrollments ce ON u.id = ce.user_id
            LEFT JOIN certificates cert ON u.id = cert.user_id
            $whereClause
            GROUP BY u.id
            ORDER BY u.created_at DESC
            LIMIT ? OFFSET ?
        ";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Registrar actividad del admin
        $stmt = $pdo->prepare("
            INSERT INTO activity_logs (user_id, action, description, ip_address) 
            VALUES (?, 'admin_users_view', 'Administrador consultó lista de usuarios', ?)
        ");
        $stmt->execute([$payload['user_id'], $_SERVER['REMOTE_ADDR'] ?? 'unknown']);
        
        echo json_encode([
            'success' => true,
            'users' => $users,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para promover usuario a administrador
function handlePromoteUser($pdo, $input) {
    try {
        if (empty($input['userId'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID de usuario requerido']);
            return;
        }
        
        $userId = intval($input['userId']);
        
        // Verificar que el usuario existe y no es admin
        $stmt = $pdo->prepare("SELECT id, fullName, email, role FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
            return;
        }
        
        if ($user['role'] === 'admin') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'El usuario ya es administrador']);
            return;
        }
        
        // Promover a administrador
        $stmt = $pdo->prepare("UPDATE users SET role = 'admin', updated_at = NOW() WHERE id = ?");
        $stmt->execute([$userId]);
        
        // Registrar actividad
        $stmt = $pdo->prepare("
            INSERT INTO activity_logs (user_id, action, description) 
            VALUES (?, 'admin_promote', ?)
        ");
        $stmt->execute([
            $payload['user_id'], 
            "Promovió a {$user['fullName']} ({$user['email']}) a administrador"
        ]);
        
        // Crear notificación para el usuario promovido
        $stmt = $pdo->prepare("
            INSERT INTO notifications (user_id, title, message, type) 
            VALUES (?, 'Promoción a Administrador', 'Has sido promovido a administrador de la plataforma KELUMY', 'success')
        ");
        $stmt->execute([$userId]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Usuario promovido a administrador exitosamente'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para degradar administrador a usuario
function handleDemoteUser($pdo, $input) {
    try {
        if (empty($input['userId'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID de usuario requerido']);
            return;
        }
        
        $userId = intval($input['userId']);
        
        // No permitir degradarse a sí mismo
        if ($userId == $payload['user_id']) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'No puedes degradar tu propio rol']);
            return;
        }
        
        // Verificar que el usuario existe y es admin
        $stmt = $pdo->prepare("SELECT id, fullName, email, role FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
            return;
        }
        
        if ($user['role'] !== 'admin') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'El usuario no es administrador']);
            return;
        }
        
        // Degradar a usuario
        $stmt = $pdo->prepare("UPDATE users SET role = 'user', updated_at = NOW() WHERE id = ?");
        $stmt->execute([$userId]);
        
        // Invalidar tokens del usuario degradado
        $stmt = $pdo->prepare("DELETE FROM auth_tokens WHERE user_id = ?");
        $stmt->execute([$userId]);
        
        // Registrar actividad
        $stmt = $pdo->prepare("
            INSERT INTO activity_logs (user_id, action, description) 
            VALUES (?, 'admin_demote', ?)
        ");
        $stmt->execute([
            $payload['user_id'], 
            "Degradó a {$user['fullName']} ({$user['email']}) a usuario regular"
        ]);
        
        // Crear notificación para el usuario degradado
        $stmt = $pdo->prepare("
            INSERT INTO notifications (user_id, title, message, type) 
            VALUES (?, 'Cambio de Rol', 'Tu rol ha sido cambiado a usuario regular', 'info')
        ");
        $stmt->execute([$userId]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Administrador degradado a usuario exitosamente'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para eliminar usuario
function handleDeleteUser($pdo, $input) {
    try {
        if (empty($input['userId'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID de usuario requerido']);
            return;
        }
        
        $userId = intval($input['userId']);
        
        // No permitir eliminarse a sí mismo
        if ($userId == $payload['user_id']) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'No puedes eliminarte a ti mismo']);
            return;
        }
        
        // Verificar que el usuario existe
        $stmt = $pdo->prepare("SELECT id, fullName, email, role FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
            return;
        }
        
        // Iniciar transacción
        $pdo->beginTransaction();
        
        try {
            // Eliminar tokens
            $stmt = $pdo->prepare("DELETE FROM auth_tokens WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            // Eliminar progreso de lecciones
            $stmt = $pdo->prepare("DELETE FROM lesson_progress WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            // Eliminar inscripciones
            $stmt = $pdo->prepare("DELETE FROM course_enrollments WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            // Eliminar certificados
            $stmt = $pdo->prepare("DELETE FROM certificates WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            // Eliminar notificaciones
            $stmt = $pdo->prepare("DELETE FROM notifications WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            // Eliminar logs de actividad
            $stmt = $pdo->prepare("DELETE FROM activity_logs WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            // Finalmente eliminar el usuario
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            
            // Registrar actividad
            $stmt = $pdo->prepare("
                INSERT INTO activity_logs (user_id, action, description) 
                VALUES (?, 'admin_delete_user', ?)
            ");
            $stmt->execute([
                $payload['user_id'], 
                "Eliminó usuario {$user['fullName']} ({$user['email']})"
            ]);
            
            $pdo->commit();
            
            echo json_encode([
                'success' => true,
                'message' => 'Usuario eliminado exitosamente'
            ]);
            
        } catch (Exception $e) {
            $pdo->rollback();
            throw $e;
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para eliminar usuario por ID en la URL
function handleDeleteUserById($pdo, $userId) {
    $input = ['userId' => $userId];
    handleDeleteUser($pdo, $input);
}

// Función para obtener estadísticas generales
function handleGetStats($pdo) {
    try {
        $stmt = $pdo->prepare("
            SELECT 
                (SELECT COUNT(*) FROM users WHERE is_active = TRUE) as total_users,
                (SELECT COUNT(*) FROM users WHERE role = 'admin' AND is_active = TRUE) as total_admins,
                (SELECT COUNT(*) FROM courses WHERE is_published = TRUE) as published_courses,
                (SELECT COUNT(*) FROM course_enrollments) as total_enrollments,
                (SELECT COUNT(*) FROM certificates WHERE is_valid = TRUE) as valid_certificates,
                (SELECT COUNT(*) FROM notifications WHERE is_read = FALSE) as unread_notifications,
                (SELECT COUNT(*) FROM course_enrollments WHERE status = 'completed') as completed_courses,
                (SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) as new_users_month
        ");
        $stmt->execute();
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Estadísticas adicionales
        $stmt = $pdo->prepare("
            SELECT 
                COUNT(DISTINCT ce.course_id) as courses_with_enrollments,
                AVG(ce.progress) as average_progress,
                COUNT(DISTINCT CASE WHEN ce.status = 'completed' THEN ce.user_id END) as users_with_completed_courses
            FROM course_enrollments ce
        ");
        $stmt->execute();
        $additionalStats = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $stats = array_merge($stats, $additionalStats);
        
        // Top cursos más populares
        $stmt = $pdo->prepare("
            SELECT c.id, c.title, c.instructor, COUNT(ce.id) as enrollments
            FROM courses c
            LEFT JOIN course_enrollments ce ON c.id = ce.course_id
            WHERE c.is_published = TRUE
            GROUP BY c.id
            ORDER BY enrollments DESC
            LIMIT 5
        ");
        $stmt->execute();
        $topCourses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Usuarios más activos
        $stmt = $pdo->prepare("
            SELECT u.id, u.fullName, u.email, COUNT(ce.id) as total_courses, AVG(ce.progress) as avg_progress
            FROM users u
            LEFT JOIN course_enrollments ce ON u.id = ce.user_id
            WHERE u.is_active = TRUE
            GROUP BY u.id
            HAVING total_courses > 0
            ORDER BY total_courses DESC, avg_progress DESC
            LIMIT 5
        ");
        $stmt->execute();
        $topUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'stats' => $stats,
            'topCourses' => $topCourses,
            'topUsers' => $topUsers
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para obtener actividad reciente
function handleGetActivity($pdo, $filters) {
    try {
        $limit = min(100, max(1, intval($filters['limit'] ?? 50)));
        
        $stmt = $pdo->prepare("
            SELECT 
                al.id, al.action, al.description, al.created_at, al.ip_address,
                u.fullName, u.email
            FROM activity_logs al
            LEFT JOIN users u ON al.user_id = u.id
            ORDER BY al.created_at DESC
            LIMIT ?
        ");
        $stmt->execute([$limit]);
        $activities = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'activities' => $activities
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}
?>
