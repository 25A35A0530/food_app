<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$order_id = $data['order_id'];
$status = $data['status'];

$sql = "UPDATE orders SET status='$status' WHERE id='$order_id'";

if ($conn->query($sql)) {
    echo json_encode(["message" => "Status updated"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>