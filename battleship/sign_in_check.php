<?php
	$username=$_POST["username"];
	$passwd=$_POST["password"];
	$con = mysqli_connect("localhost","","","test");
    if (!$con) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    $res = mysqli_query($con ,"select *from users where name = '$username' && passwd = '$passwd'");
    $num = mysqli_num_rows($res);
    if( $num == 1 ) {
    	$ans = mysqli_query($con ,"update users set state = 'L' where  name = '$username'");
        setcookie("user", $username, time()+3600);
        mysqli_close($con);
            echo "<script language='JavaScript'>;alert('Sign in successfully! Current user is $username');location.href='index.php';</script>;";
    }
    else {
        echo '<script language="JavaScript">;alert("This user does not exist");location.href="sign_in.php";</script>;';
    }
?>