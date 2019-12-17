<?php
	
	$map = json_decode($_POST["map"]);
	$con = mysqli_connect("localhost","","","test");
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    if (isset($_COOKIE["user"])) {
    	$user = $_COOKIE["user"];
    	$rid = 0;
		foreach ($map as $row) {
			$sql = "update map_" . $user . " set rid = " . $rid; 
			$col = 0;
			foreach ($row as $val) {
				$sql = $sql . ", c" . $col ." = " . $val ;	
				$col++;	
			}
			$sql = $sql . " where rid = " . $rid . ";";
    		mysqli_query($con, $sql);
			$rid++;
		}
		$sql = "update users set state = 'R' where name = '$user';";
		mysqli_query($con, $sql);
    }
	else
  		echo "Welcome guest!<br />";
?>