<?php
header('Content-Type: application/json');
include 'db.php'; 

$user_id = 1; 
$ordersQuery = $conn->query("SELECT * FROM orders WHERE user_id = $user_id ORDER BY created_at DESC");

$orders = [];

if ($ordersQuery->num_rows > 0) {
    while ($order = $ordersQuery->fetch_assoc()) {
        $order_id = $order['id'];

        $itemsQuery = $conn->query("
            SELECT oi.quantity, f.id as food_id, f.name, f.price, f.image
            FROM order_items oi
            JOIN foods f ON f.id = oi.food_id
            WHERE oi.order_id = $order_id
        ");

        $items = [];
        if ($itemsQuery->num_rows > 0) {
            while ($item = $itemsQuery->fetch_assoc()) {
                $items[] = $item;
            }
        }

        $order['items'] = $items;
        $orders[] = $order;
    }
}

echo json_encode($orders);
?>