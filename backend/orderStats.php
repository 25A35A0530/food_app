<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$result = $conn->query("
  SELECT DATE(created_at) as date, COUNT(*) as total_orders
  FROM orders
  GROUP BY DATE(created_at)
");

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>