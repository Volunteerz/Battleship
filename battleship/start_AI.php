<?php
$con = mysqli_connect("localhost","","","test");
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }

    if (isset($_COOKIE["user"])) {
    	$user = $_COOKIE["user"];
		$sql = "update users set state = 'G' where name = '$user';";
		mysqli_query($con, $sql);
    }
?>