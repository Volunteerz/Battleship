<?php
	$con = mysqli_connect("localhost","","","test");
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    $x = $_POST["x"];
    $y = $_POST["y"];
    $owner = $_POST["owner"];
    $sql =  "select * from map_$owner where rid = $x;";
    $res = mysqli_query($con ,$sql);
    while($row = mysqli_fetch_array($res)) {
    	echo $row["c$y"];
  	}
?>