<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit;
}

$user_id = 1;
$total = $data['total'];
$cart = $data['cart'];

$sql = "INSERT INTO orders (user_id, total_price) VALUES ('$user_id', '$total')";
if (!$conn->query($sql)) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$order_id = $conn->insert_id;

foreach ($cart as $item) {
    $food_id = $item['id'];
    $qty = isset($item['quantity']) ? $item['quantity'] : 1;

    $sql2 = "INSERT INTO order_items (order_id, food_id, quantity) 
             VALUES ('$order_id', '$food_id', '$qty')";

    if (!$conn->query($sql2)) {
        echo json_encode(["error" => $conn->error]);
        exit;
    }
}

echo json_encode(["message" => "Order placed successfully"]);
?>