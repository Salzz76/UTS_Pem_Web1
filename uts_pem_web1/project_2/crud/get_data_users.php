<?php
require_once "../koneksi/koneksi.php";

try {
 $sql = 'SELECT * FROM users';
 $connect = $database_connection->prepare($sql);
 $connect->execute();

 $data = array();
 while ($row = $connect->fetch(PDO::FETCH_ASSOC)) {
    array_push($data, $row);
 }

    echo json_encode($data);
}catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    die("Tidak dapat memuat database $database_name: " . $e->getMessage());
}


?>