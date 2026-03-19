<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$result = $conn->query("SELECT * FROM users WHERE email='$email'");

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {

        // ✅ SEND ONLY REQUIRED DATA (IMPORTANT)
        echo json_encode([
            "status" => "success",
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);

    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Wrong password"
        ]);
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
}
?>