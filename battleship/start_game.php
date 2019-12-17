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
        $matcher = $_POST["matcher"];
        $sql = "SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME LIKE 'Log%$user%';";
        $res = mysqli_query($con, $sql);
        $num = mysqli_num_rows($res);
        if($num == 0) {
        	$sql = "create table Log_$user"."_"."$matcher (player varchar(100), x integer, y integer, round integer);";
        	mysqli_query($con, $sql);
        	echo "Log_".$user."_".$matcher;
		}
		else {
			$row = mysqli_fetch_array($res);
			$TABLE_NAME = $row["TABLE_NAME"];
			$sql = "truncate table $TABLE_NAME;";
			mysqli_query($con, $sql);
			echo $TABLE_NAME;
		}
    }
?>