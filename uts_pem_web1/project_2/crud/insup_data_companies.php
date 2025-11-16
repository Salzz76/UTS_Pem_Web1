<?php
require_once "../koneksi/koneksi.php";

$name = $_POST['PT'];
$industry = $_POST['ids'];
$short_desc = $_POST['shdesc'];
$full_desc = $_POST['fdesc'];
$founded = $_POST['found'];
$employees = $_POST['empl'];
$services = $_POST['serv'];
$location = $_POST['loc'];


if (!empty($_POST['id'])) {
    // kalau id tidak kosong, update
    try {
    
    $sql = "UPDATE `companies`
    SET `name` = ?,
        `industry` = ?,
        `short_desc` = ?,
        `full_desc` = ?,
        `founded` = ?,
        `employees` = ?,
        `services` = ?,
        `location` = ?
    WHERE `id` = ?";
    
    $connect = $database_connection->prepare($sql);
    $connect->execute([
        $name,
        $industry,
        $short_desc,
        $full_desc,
        $founded,
        $employees,
        $services,
        $location,
        $_POST['id']
    ]);

    echo "Data dengan ID ".$_POST['id']." berhasil diupdate.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    die("Tidak dapat memuat database $database_name: " . $e->getMessage());
}
}else {
      // kalau kosong, insert
try {

    $sql = "INSERT INTO `companies`
    (`name`, `industry`, `short_desc`, `full_desc`, `founded`, `employees`, `services`, `location`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    
    $connect = $database_connection->prepare($sql);
    $connect->execute([
        $name,
        $industry,
        $short_desc,
        $full_desc,
        $founded,
        $employees,
        $services,
        $location
    ]);

    echo "Data berhasil disimpan.";
} catch (PDOException $e) {
    // ...
    die("Tidak dapat memproses database: " . $e->getMessage());
}
}