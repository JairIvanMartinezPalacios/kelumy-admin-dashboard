<?php
/**
 * API de Autenticación para KELUMY
 * Manejo de usuarios, login, registro y roles
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

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'kelumy_db';
$username = 'root'; // Cambiar por tu usuario de MySQL
$password = ''; // Cambiar por tu contraseña de MySQL

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    exit();
}

// Función para generar token JWT simple
function generateToken($userId, $role) {
    $payload = [
        'user_id' => $userId,
        'role' => $role,
        'exp' => time() + (24 * 60 * 60) // 24 horas
    ];
    return base64_encode(json_encode($payload));
}

// Función para verificar token
function verifyToken($token) {
    try {
        $payload = json_decode(base64_decode($token), true);
        if ($payload && $payload['exp'] > time()) {
            return $payload;
        }
    } catch (Exception $e) {
        return false;
    }
    return false;
}

// Función para obtener token del header
function getBearerToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}

// Función para limpiar datos de entrada
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Función para validar email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Función para hashear contraseña
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

// Función para verificar contraseña
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Obtener método y ruta
$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$path = str_replace('/api/auth', '', $path);

// Obtener datos del cuerpo de la petición
$input = json_decode(file_get_contents('php://input'), true);

// Router de endpoints
switch ($path) {
    case '/register':
        if ($method === 'POST') {
            handleRegister($pdo, $input);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/login':
        if ($method === 'POST') {
            handleLogin($pdo, $input);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/verify':
        if ($method === 'GET') {
            handleVerify($pdo);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/profile':
        if ($method === 'PUT') {
            handleUpdateProfile($pdo, $input);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/change-password':
        if ($method === 'POST') {
            handleChangePassword($pdo, $input);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/me':
        if ($method === 'GET') {
            handleGetMe($pdo);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    case '/logout':
        if ($method === 'POST') {
            handleLogout();
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Endpoint no encontrado']);
        break;
}

// Función para manejar registro de usuarios
function handleRegister($pdo, $input) {
    try {
        // Validar datos requeridos
        $required = ['fullName', 'email', 'password'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "El campo $field es requerido"]);
                return;
            }
        }

        // Validar email
        if (!validateEmail($input['email'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Email inválido']);
            return;
        }

        // Verificar si el email ya existe
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$input['email']]);
        if ($stmt->fetch()) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'El email ya está registrado']);
            return;
        }

        // Validar contraseña
        if (strlen($input['password']) < 6) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres']);
            return;
        }

        // Insertar nuevo usuario
        $stmt = $pdo->prepare("
            INSERT INTO users (
                fullName, lastName, email, password, phone, country, state, 
                academicLevel, currentGrade, countryChange, expectations, role
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $role = $input['role'] ?? 'user';
        $stmt->execute([
            sanitizeInput($input['fullName']),
            sanitizeInput($input['lastName'] ?? ''),
            sanitizeInput($input['email']),
            hashPassword($input['password']),
            sanitizeInput($input['phone'] ?? ''),
            sanitizeInput($input['country'] ?? ''),
            sanitizeInput($input['state'] ?? ''),
            sanitizeInput($input['academicLevel'] ?? ''),
            sanitizeInput($input['currentGrade'] ?? ''),
            sanitizeInput($input['countryChange'] ?? ''),
            sanitizeInput($input['expectations'] ?? ''),
            $role
        ]);

        $userId = $pdo->lastInsertId();

        // Obtener datos del usuario creado
        $stmt = $pdo->prepare("SELECT id, fullName, lastName, email, role, created_at FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Generar token
        $token = generateToken($userId, $user['role']);

        // Guardar token en la base de datos
        $stmt = $pdo->prepare("
            INSERT INTO auth_tokens (user_id, token, type, expires_at) 
            VALUES (?, ?, 'access', DATE_ADD(NOW(), INTERVAL 24 HOUR))
        ");
        $stmt->execute([$userId, $token]);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'user' => $user,
            'token' => $token
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para manejar login
function handleLogin($pdo, $input) {
    try {
        // Validar datos requeridos
        if (empty($input['email']) || empty($input['password'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Email y contraseña son requeridos']);
            return;
        }

        // Buscar usuario por email
        $stmt = $pdo->prepare("
            SELECT id, fullName, lastName, email, password, role, is_active, created_at 
            FROM users 
            WHERE email = ?
        ");
        $stmt->execute([$input['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
            return;
        }

        // Verificar si el usuario está activo
        if (!$user['is_active']) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Usuario desactivado']);
            return;
        }

        // Verificar contraseña
        if (!verifyPassword($input['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
            return;
        }

        // Generar token
        $token = generateToken($user['id'], $user['role']);

        // Guardar token en la base de datos
        $stmt = $pdo->prepare("
            INSERT INTO auth_tokens (user_id, token, type, expires_at) 
            VALUES (?, ?, 'access', DATE_ADD(NOW(), INTERVAL 24 HOUR))
        ");
        $stmt->execute([$user['id'], $token]);

        // Registrar actividad
        $stmt = $pdo->prepare("
            INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent) 
            VALUES (?, 'login', 'Usuario inició sesión', ?, ?)
        ");
        $stmt->execute([
            $user['id'], 
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
        ]);

        // Remover password de la respuesta
        unset($user['password']);

        echo json_encode([
            'success' => true,
            'message' => 'Login exitoso',
            'user' => $user,
            'token' => $token
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para verificar token
function handleVerify($pdo) {
    try {
        $token = getBearerToken();
        if (!$token) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token no proporcionado']);
            return;
        }

        $payload = verifyToken($token);
        if (!$payload) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token inválido o expirado']);
            return;
        }

        // Verificar token en la base de datos
        $stmt = $pdo->prepare("
            SELECT id, fullName, lastName, email, role, is_active, created_at 
            FROM users 
            WHERE id = ? AND is_active = TRUE
        ");
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado o inactivo']);
            return;
        }

        echo json_encode([
            'success' => true,
            'user' => $user
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para actualizar perfil
function handleUpdateProfile($pdo, $input) {
    try {
        $token = getBearerToken();
        if (!$token) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token no proporcionado']);
            return;
        }

        $payload = verifyToken($token);
        if (!$payload) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token inválido']);
            return;
        }

        // Campos permitidos para actualizar
        $allowedFields = ['fullName', 'lastName', 'phone', 'country', 'state', 'academicLevel', 'currentGrade', 'countryChange', 'expectations'];
        $updateFields = [];
        $values = [];

        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                $updateFields[] = "$field = ?";
                $values[] = sanitizeInput($input[$field]);
            }
        }

        if (empty($updateFields)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'No hay campos para actualizar']);
            return;
        }

        $values[] = $payload['user_id'];
        $sql = "UPDATE users SET " . implode(', ', $updateFields) . ", updated_at = NOW() WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        // Obtener usuario actualizado
        $stmt = $pdo->prepare("
            SELECT id, fullName, lastName, email, role, created_at, updated_at 
            FROM users 
            WHERE id = ?
        ");
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Registrar actividad
        $stmt = $pdo->prepare("
            INSERT INTO activity_logs (user_id, action, description) 
            VALUES (?, 'profile_update', 'Usuario actualizó su perfil')
        ");
        $stmt->execute([$payload['user_id']]);

        echo json_encode([
            'success' => true,
            'message' => 'Perfil actualizado exitosamente',
            'user' => $user
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para cambiar contraseña
function handleChangePassword($pdo, $input) {
    try {
        $token = getBearerToken();
        if (!$token) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token no proporcionado']);
            return;
        }

        $payload = verifyToken($token);
        if (!$payload) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token inválido']);
            return;
        }

        if (empty($input['currentPassword']) || empty($input['newPassword'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Contraseña actual y nueva contraseña son requeridas']);
            return;
        }

        if (strlen($input['newPassword']) < 6) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'La nueva contraseña debe tener al menos 6 caracteres']);
            return;
        }

        // Verificar contraseña actual
        $stmt = $pdo->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!verifyPassword($input['currentPassword'], $user['password'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Contraseña actual incorrecta']);
            return;
        }

        // Actualizar contraseña
        $stmt = $pdo->prepare("UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([hashPassword($input['newPassword']), $payload['user_id']]);

        // Invalidar todos los tokens del usuario
        $stmt = $pdo->prepare("DELETE FROM auth_tokens WHERE user_id = ?");
        $stmt->execute([$payload['user_id']]);

        // Registrar actividad
        $stmt = $pdo->prepare("
            INSERT INTO activity_logs (user_id, action, description) 
            VALUES (?, 'password_change', 'Usuario cambió su contraseña')
        ");
        $stmt->execute([$payload['user_id']]);

        echo json_encode([
            'success' => true,
            'message' => 'Contraseña cambiada exitosamente'
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para obtener datos del usuario actual
function handleGetMe($pdo) {
    try {
        $token = getBearerToken();
        if (!$token) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token no proporcionado']);
            return;
        }

        $payload = verifyToken($token);
        if (!$payload) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Token inválido']);
            return;
        }

        $stmt = $pdo->prepare("
            SELECT id, fullName, lastName, email, phone, country, state, 
                   academicLevel, currentGrade, countryChange, expectations, 
                   role, is_active, created_at, updated_at 
            FROM users 
            WHERE id = ?
        ");
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
            return;
        }

        echo json_encode([
            'success' => true,
            'user' => $user
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
    }
}

// Función para logout
function handleLogout() {
    // En un sistema más complejo, aquí se invalidaría el token
    // Por ahora, simplemente confirmamos el logout
    echo json_encode([
        'success' => true,
        'message' => 'Logout exitoso'
    ]);
}
?>
