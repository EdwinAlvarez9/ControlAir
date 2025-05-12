<?php
$serverName = "NOMBRE_SERVIDOR";
$connectionOptions = [
    "Database" => "ControlAirDB",
    "Uid" => "usuario_db",
    "PWD" => "contraseña_db"
];

try {
    $conn = new PDO(
        "sqlsrv:Server=$serverName;Database={$connectionOptions['Database']}",
        $connectionOptions['Uid'],
        $connectionOptions['PWD']
    );
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error al conectar con SQL Server: " . $e->getMessage());
}
?>