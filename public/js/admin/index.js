activities_search = document.getElementById('buttonsearch')
activities_search.addEventListener("click", search)
function search(){
  var valsearch = document.getElementById('inputsearch').value;
  var t = document.getElementsByTagName("table")[0];
  var trs = t.getElementsByTagName("tr");
  var tds = null;
  var i = 1;
  var ck = false;
  for(i; i < trs.length; i++){
    tds = trs[i].getElementsByTagName("td");
    if(valsearch == tds[1].innerHTML || valsearch == tds[2].innerHTML){
      ck = true;
      break;
    }
  }
  if(ck){
     for(var j = 1; j < trs.length; j++){
    if(j != i){
      trs[j].style.display = "none";
    }
  }
  }else{
    document.getElementById("tablecc").innerHTML = "<p style='padding:15px;'>Không có kết quả.</p>";
  }
 
}

var chk = true
var activities_email = document.getElementById("email")
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
var activities_username = document.getElementById('username')
activities_username.addEventListener('change', check_username)
function check_username(){
  document.getElementById('loi_username').innerHTML = '';
  var val = activities_username.value
  if(val == ''){
    document.getElementById('loi_username').innerHTML = "Trường bắt buộc."
    chk = false
  }
}

var activities_pass = document.getElementById('password')
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

var activities_repass = document.getElementById('repassword')
activities_repass.addEventListener('change',check_repass)
function check_repass(){
  document.getElementById('loi_repass').innerHTML = "";
  var val = activities_repass.value
  var vall = document.getElementById('password').value
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


