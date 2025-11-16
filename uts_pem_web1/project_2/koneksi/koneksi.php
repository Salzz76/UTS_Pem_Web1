<?php
$database_hostname = "localhost";
$database_username = "root";
$database_password = "";
$database_name = "uts_pem_web1";
$database_port = "3306"; 

try {
    $database_connection = new PDO("mysql:host=$database_hostname;dbname=$database_name", $database_username, $database_password);
    $database_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    #echo "Koneksi Berhasil";
} catch (PDOException $e) {
    echo "Koneksi Gagal: " . $e->getMessage();
}
?>