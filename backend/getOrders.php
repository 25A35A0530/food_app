<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$result = $conn->query("
  SELECT orders.id, orders.user_id, users.name, orders.total_price, orders.status, orders.created_at
FROM orders
JOIN users ON orders.user_id = users.id
");

$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>