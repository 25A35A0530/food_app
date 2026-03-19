<?php
header('Content-Type: application/json');
include 'db.php'; // your DB connection

// In real projects, replace this with the logged-in user's ID from session
$user_id = 1; // Example user_id

// Fetch all orders for this user
$ordersQuery = $conn->query("SELECT * FROM orders WHERE user_id = $user_id ORDER BY created_at DESC");

$orders = [];

if ($ordersQuery->num_rows > 0) {
    while ($order = $ordersQuery->fetch_assoc()) {
        $order_id = $order['id'];

        // Fetch items for this order
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