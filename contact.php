<?php
$email = $_POST['email'];
$phone = $_POST['phone'];
$name = $_POST['name'];
$message = $_POST['message'];

$txt = "\n-----------------------------------------------------------------\nName: $name \nEmail: $email \nPhone: $phone \nMessage: $message \n-----------------------------------------------------------------\n";
$myfile = file_put_contents('logs.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
?>
OK