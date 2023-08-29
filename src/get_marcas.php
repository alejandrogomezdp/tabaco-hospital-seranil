<?php
include 'dbconnect.php';

$query = $conn->prepare("SELECT id, nombre FROM marcas_tabaco");
$query->execute();
$marcas = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($marcas);
?>
