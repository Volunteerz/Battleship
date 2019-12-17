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
		$sql = "select name from users where state = 'R' && name != '$user';";
		$ret = "NOTFOUND";
		$sql1 = "SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME LIKE 'Log%$user%';";
		for ($i = 0; $i < 30; $i++) { 
			sleep(1);
			$res = mysqli_query($con, $sql);
			$num = mysqli_num_rows($res);
			if($num > 0) {
			    $row = mysqli_fetch_array($res);
			    $ret = $row["name"];
			    echo $row["name"];
			    exit;
			}
			$res = mysqli_query($con, $sql1);
			$num = mysqli_num_rows($res);
			if($num > 0) {
				$row = mysqli_fetch_array($res);
				$ret = $row["TABLE_NAME"];
				$ret = str_replace($user, "", $ret);
				$ret = str_replace("Log", "", $ret);
				$ret = str_replace("_", "", $ret);
				echo $ret;
				exit;
			}
		}
		echo $ret;
    }

?>