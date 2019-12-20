<?php

    include_once('../config/connection.php');

    ob_start();
    $timezone = date_default_timezone_set("America/Mexico_City");
    $con = mysqli_connect($url, $userDB, $passwordDB, $DB);
    if(mysqli_connect_errno()) {
        echo "Failed to connect: " . mysqli_connect_errno(); 
    }

?>