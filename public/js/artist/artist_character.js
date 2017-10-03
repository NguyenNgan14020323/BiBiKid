activities_crCharacter = document.getElementById('createCharacter')
activities_crCharacter.addEventListener("click", create_Character)
function create_Character(){
	var title = document.getElementById('title').value
	check_title()
	$.ajax({
		url : './api/addTopicCharacter',
		method : 'post',
		data : {title : title},
		success:function(data){  	
			location.reload();
			alert('Thành công.')
		}
	})
}
function ClickEdit(i){
	document.getElementById('edittitle').value = '';
	document.getElementById('cc').value = '';
	var val1 = document.getElementById(i).value;
	document.getElementById('topicId').value = val1;
	var val2 = document.getElementsByTagName('table')[0].rows[i].cells[1].innerHTML;
	document.getElementById('edittitle').value = val2;
	document.getElementById('cc').innerHTML = "Edit " + val2;
}

activities_editChar = document.getElementById('editcharacter')
activities_editChar.addEventListener("click", edit_Character)
function edit_Character(){
	var edittitle = document.getElementById('edittitle').value;
	var topicId = document.getElementById('topicId').value;
	check_title()
	$.ajax({
		url:'/api/editTopicCharacter',
		method:'PUT',
		data:{
			title: edittitle,
			topicId: topicId
		},
		success:function(data){
			location.reload()
			alert("Edit success.")
		}

	})

}

function clickDelete(topicId){
	 var retVal = confirm("Do you want to delete ?");
    if( retVal == true ){
		$.ajax({
			url:'/api/deleteTopicCharacter',
			method:'DELETE',
			data:{
				topicId: topicId
			},
			success:function(data){
				location.reload()
				alert("Delete success.")
			}

		})
	}else{
		location.reload()
	}
}

