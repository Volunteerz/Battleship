<html>
  <head>
    <title>login</title>
    <meta charset="utf-8" />
     <link type="text/css" rel="stylesheet" href="login.css" />
  </head>

<body>

		<div class="loggedout_fluid_container">
			<div class="loggedout_vcenter">
				<div id="loggedout_container">
					<div id="loggedout_module">
						<form method="post" action="login_check.php">
						<a href="index.php" class="login-element"><img src="img/battleship.png"  alt = ""battleship/></a>
							<input type="hidden" name="action" >
							<input type="hidden" name="login_type" value="normal">
							<div class="login-email">
								<input name="username" type="text" class="flexwidth100" placeholder="Username"  required="required" autofocus/>
							</div>
										<hr class="hr15"/>
								<div class="login-password">
									<input name="password" type="password" class="flexwidth100" placeholder="Password" required="required">
								</div>
									<hr class="hr15"/>
												<input type="submit" value="Login" class="flexwidth100" >
								<hr class="hr15"/>
								Help, I <a href="forgot_password.php">forgot my password</a>.
								<hr class="hr15"/>
								Login with <a href="login.php">Login</a> instead.
						</form>
				</div>
			</div>
		</div>
	</div>



</body>
</html>