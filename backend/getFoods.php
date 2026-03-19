<?php
include "db.php";

$result = $conn->query("SELECT * FROM foods");

$foods = [];

while ($row = $result->fetch_assoc()) {
    $foods[] = $row;
}

echo json_encode($foods);
?>