<?php
    $con = mysqli_connect("localhost","","","test");
    $table = $_POST["table"];
    $round = $_POST["round"];
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    if (isset($_COOKIE["user"])) {
    	$user = $_COOKIE["user"];
        $sql = "select *from ".$table." where round = ".$round.";";
        for($i = 0; $i < 60; $i++) {
            $res = mysqli_query($con, $sql);
            $num = mysqli_num_rows($res);
            if($num > 0) {
                $row = mysqli_fetch_array($res);
                echo $row["x"].$row["y"];
                exit;
            }
            else {
                sleep(1);
            }
        }
        echo "BT";
        
    }
    
?>