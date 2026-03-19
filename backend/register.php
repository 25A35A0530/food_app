<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");
include "db.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_BCRYPT);


$check = $conn->query("SELECT * FROM users WHERE email='$email'");

if ($check->num_rows > 0) {
    echo json_encode(["status"=>"error","message"=>"Email exists"]);
    exit();
}

$sql = "INSERT INTO users (name,email,password) VALUES ('$name','$email','$password')";

if ($conn->query($sql)) {
    echo json_encode(["status"=>"success","message"=>"Registered"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed"]);
}
?>