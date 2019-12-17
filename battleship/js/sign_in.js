function loginclose() {
	document.getElementById('login').style.display='none';
};
function loginsubmit(form) {
	if(form.username.value==""){		//验证用户名是否为空
		alert("请输入用户名！");form.username.focus();return false;
	}
	if(form.pwd.value==""){		//验证密码是否为空
		alert("请输入密码！");form.pwd.focus();return false;
	}	
	var param="username="+form2.username.value+"&pwd="+form2.pwd.value; 	//将登录信息连接成字符串，作为发送请求的参数
	console.log(param);	
}