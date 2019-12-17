<?php
	include "Getmac.php";
    $con = mysqli_connect("localhost","","","test");
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
	$mac = new GetMacAddr(PHP_OS);
	echo $mac->mac_addr;
	$username = str_replace(":","",$mac->mac_addr);
	$passwd = "";
    $res = mysqli_query($con ,"Select *from users where name = '$username';");
    $num = mysqli_num_rows($res);
    echo $num;
    if( $num == 0 ) {
        $sql = "create table map_".$username."(rid integer, c0 integer, c1 integer, c2 integer, c3 integer, c4 integer, c5 integer, c6 integer, c7 integer, c8 integer, c9 integer);";
        $ans = mysqli_query($con ,$sql);
        for( $i = 0; $i < 10; $i++) {
            $sql = "insert into map_".$username." values(".$i.",-1, -1, -1, -1, -1, -1, -1, -1, -1, -1);";
            $ans = mysqli_query($con ,$sql);
        }
    	$ans = mysqli_query($con ,"insert into users(name, passwd, state) values('$username', '$passwd' ,'L')");

    }
    else {
    	mysqli_query($con, "update users set state = 'L' where  name = '$username';");
    }
    echo "connect sucess";
    setcookie("user", $username, time()+3600);
    mysqli_close($con);
    echo "<script language='JavaScript'>;alert('Sign in successfully! Current user is $username');location.href='index.php';</script>;";
?>