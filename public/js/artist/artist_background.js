activities_crBackground = document.getElementById('createBackground')
activities_crBackground.addEventListener("click", create_Background)
function create_Background(){
	var title = document.getElementById('title').value
	check_title()
	$.ajax({
		url : './api/addTopicBackground',
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
	document.getElementById('backgroundId').value = val1;
	var val2 = document.getElementsByTagName('table')[0].rows[i].cells[1].innerHTML;
	document.getElementById('edittitle').value = val2;
	document.getElementById('cc').innerHTML = "Edit " + val2;
}

activities_editBack = document.getElementById('editbackground')
activities_editBack.addEventListener("click", edit_Background)
function edit_Background(){
	var edittitle = document.getElementById('edittitle').value;
	var backgroundId = document.getElementById('backgroundId').value;
	check_title()
	$.ajax({
		url:'/api/editTopicBackground',
		method:'PUT',
		data:{
			title: edittitle,
			topicId: backgroundId
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
			url:'/api/deleteTopicBackground',
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
