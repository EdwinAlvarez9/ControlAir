<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

try {
    switch ($action) {
        case 'login':
            $email = $data['email'];
            $password = $data['password'];
            
            // Consulta SQL para verificar credenciales
            $stmt = $conn->prepare("SELECT id, name, email FROM users WHERE email = ? AND password = ?");
            $stmt->execute([$email, md5($password)]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                echo json_encode(['success' => true, 'user' => $user]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
            }
            break;
            
        case 'register':
            $name = $data['name'];
            $email = $data['email'];
            $password = $data['password'];
            
            // Verificar si el email ya existe
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetch()) {
                echo json_encode(['success' => false, 'message' => 'El email ya está registrado']);
            } else {
                // Insertar nuevo usuario
                $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                $stmt->execute([$name, $email, md5($password)]);
                
                echo json_encode(['success' => true]);
            }
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Acción no válida']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>