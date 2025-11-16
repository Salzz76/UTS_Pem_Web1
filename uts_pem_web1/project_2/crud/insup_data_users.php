<?php
require_once "../koneksi/koneksi.php";

$username = $_POST['usr'];
$password = $_POST['pwd'];
$email = $_POST['mail'];
$full_name = $_POST['fname'];


if (!empty($_POST['id'])) {
    // kalau id tidak kosong, update
    try {
    
    $sql = "UPDATE `users`
    SET `username` = ?,
        `password` = ?,
        `email` = ?,
        `full_name` = ?
    WHERE `id` = ?";
    
    $connect = $database_connection->prepare($sql);
    $connect->execute([
        $username,
       sha1($password),
        $email,
        $full_name,
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

    $sql = "INSERT INTO `users`
    (`username`, `password`, `email`, `full_name`)
    VALUES (?, ?, ?, ?);";
    
    $connect = $database_connection->prepare($sql);
    $connect->execute([
        $username,
        sha1($password), // Hashing dengan sha1 (perlu diupgrade ke password_hash)
        $email,
        $full_name
    ]);

    echo "Data berhasil disimpan.";
} catch (PDOException $e) {
    // ...
    die("Tidak dapat memproses database: " . $e->getMessage());
}
}