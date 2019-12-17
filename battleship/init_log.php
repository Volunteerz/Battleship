<?php
	$con = mysqli_connect("localhost","","","test");
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
	$sql = "select name from users where state = 'L'";
	$res = mysqli_query($con, $sql);
	while($row = mysqli_fetch_array($res)) {
		$name = $row["name"];
		echo $name;
		$sql1 = "SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME LIKE 'Log%$name%';";
		$ret = mysqli_query($con, $sql1);
		while($trow = mysqli_fetch_array($ret)) {
			$tname = $trow["TABLE_NAME"];
			mysqli_query($con, "drop table $tname");
		}
	}
?>