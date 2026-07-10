<?php
include("db.php");

if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['message'])) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $query = "INSERT INTO mensajeria (name, phone, message) VALUES ('$name','$phone','$message')";
    $result = mysqli_query($conn, $query);
    if ($result) {
        echo "success"; // Envía una respuesta al JavaScript indicando el éxito
    } else {
        echo "error"; // Envía una respuesta al JavaScript indicando un error
    }
    if (!$result) {
        echo "Error al insertar en la base de datos: " . mysqli_error($conn);
    }
    
}
?>