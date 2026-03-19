<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$newPassword = password_hash($data['password'], PASSWORD_DEFAULT);

// Check user exists
$result = $conn->query("SELECT * FROM users WHERE email='$email'");

if ($result->num_rows > 0) {

    // Update password
    $conn->query("UPDATE users SET password='$newPassword' WHERE email='$email'");

    echo json_encode(["message" => "Password updated successfully"]);
} else {
    echo json_encode(["message" => "Email not found"]);
}
?>