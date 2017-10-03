function hidecontent(){
  document.getElementById('login_set').style.display = "none";
  document.getElementById('signup_set').style.display = "none";
  document.getElementById('btn-signup').style.display = "none";
  
}
function showcontent(p){
  hidecontent();
  document.getElementById(p+"_set").style.display = "";
}
showcontent('login');

var chk = true
var activities_email = document.getElementById("register-email")
activities_email.addEventListener("change", check_email)
function check_email(){
	document.getElementById('loi_email').innerHTML = '';
	var val = activities_email.value;
	if(val == ''){
		document.getElementById('loi_email').innerHTML = "Trường bắt buộc."
		chk = false;
	}else{
		var leng = val.length;
		var str = val.slice(-10,leng);
		if(str != "@gmail.com"){
			chk = false;
			document.getElementById('loi_email').innerHTML = 'Email không hợp lệ.'
		}
	}	
}
var activities_username = document.getElementById('register-username')
activities_username.addEventListener('change', check_username)
function check_username(){
	document.getElementById('loi_username').innerHTML = '';
	var val = activities_username.value
	if(val == ''){
		document.getElementById('loi_username').innerHTML = "Trường bắt buộc."
		chk = false
	}
}

var activities_pass = document.getElementById('register-password')
activities_pass.addEventListener('change', check_pass)
function check_pass(){
	document.getElementById('loi_pass').innerHTML = "";
	var val = activities_pass.value
	if(val == ''){
		document.getElementById('loi_pass').innerHTML = "Trường bắt buộc."
		chk = false
	}else{
		if(val.length < 8){
			document.getElementById('loi_pass').innerHTML = "Tối thiểu 8 kí tự."
			chk = false
		}
	}
}

var activities_repass = document.getElementById('register-repassword')
activities_repass.addEventListener('change',check_repass)
function check_repass(){
	document.getElementById('loi_repass').innerHTML = "";
	var val = activities_repass.value
	var vall = document.getElementById('register-password').value
	if(val == ''){
		chk = false
		document.getElementById('loi_repass').innerHTML = "Trường bắt buộc.";
	}else{
		if(val != vall){
			chk = false
			document.getElementById('loi_repass').innerHTML = "Mật khẩu không trùng khớp.";
		}
	}
}

var ck_signup = document.getElementById('click_signup')
ck_signup.addEventListener('click', click_signup)
function click_signup(){
	var email = document.getElementById('register-email').value
	var username = document.getElementById('register-username').value
	var password = document.getElementById('register-password').value
	chk = true
	check_email();
	check_username();
	check_pass();
	check_repass();
	if(chk){
		$.ajax({
			url: './signup',
			method: 'POST',
			data: {
				email : email,
				username: username,
				password: password
			},
			success:function(data){
				alert('Signup success');
				location.reload();
			}
		})
	}
}







