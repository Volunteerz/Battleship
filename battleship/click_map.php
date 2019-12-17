<?php
    $con = mysqli_connect("localhost","","","test");
    $table = $_POST["table"];
    $round = $_POST["round"];
    $x = $_POST["x"];
    $y = $_POST["y"];
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    if (isset($_COOKIE["user"])) {
    	$user = $_COOKIE["user"];
        $sql = "insert into ".$table."(player, x, y, round) values('$user', $x, $y, $round);";
        mysqli_query($con, $sql);
    }
?>