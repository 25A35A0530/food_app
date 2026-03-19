<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "food_app");

if ($conn->connect_error) {
    die(json_encode(["status"=>"error","message"=>"DB connection failed"]));
}
?>