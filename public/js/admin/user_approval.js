function ClickEdit(i) {
	document.getElementById('user_id').value = '';
	document.getElementById('editemail').value = '';
	document.getElementById('editpassword').value = '';
	document.getElementById('editusername').value = '';
	var val1 = document.getElementById(i).value;
	document.getElementById('user_id').value = val1;
	var val2 = document.getElementsByTagName('table')[0].rows[i].cells[1].innerHTML;
	document.getElementById('editusername').value = val2;
	var val3 = document.getElementsByTagName('table')[0].rows[i].cells[2].innerHTML;
	document.getElementById('editemail').value = val3;
	var val4 = document.getElementsByTagName('table')[0].rows[i].cells[3].innerHTML;
		document.getElementById('editpassword').value = val4;
}

function del(stt){
    var retVal = confirm("Do you want to delete ?");
    if( retVal == true ){
      var id = document.getElementById(stt).value;
      $.ajax({
        url: '/api/deleteUserApproval',
        method: 'delete',
        data: {
          user_id : id
        },
        success:function(data){
          location.reload(); 
        }
      })
    }
    else{
      location.reload(); 
    }

  }




activities_crApproval = document.getElementById('createUser')
activities_crApproval.addEventListener("click", create_Approval)
function create_Approval(){
  var email = document.getElementById('email').value
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value
  chk = true;
  check_email();
  check_username();
  check_pass();
  check_repass();
  if(chk){
    $.ajax({
      url: '/api/addUserApproval',
      method: 'POST',
      data: {
        email : email,
        username: username,
        password: password
      },
      success:function(data){
        alert('Add user success');
        location.reload();
      }
    })
  }
}

