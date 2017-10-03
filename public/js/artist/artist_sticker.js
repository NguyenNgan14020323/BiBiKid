activities_crSticker = document.getElementById('createSticker')
activities_crSticker.addEventListener("click", create_Sticker)
function create_Sticker(){
	var title = document.getElementById('title').value
	check_title()
	$.ajax({
		url : './api/addTopicSticker',
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

activities_editSticker = document.getElementById('editsticker')
activities_editSticker.addEventListener("click", edit_Sticker)
function edit_Sticker(){
	var edittitle = document.getElementById('edittitle').value;
	var topicId = document.getElementById('topicId').value;
	check_title()
	$.ajax({
		url:'/api/editTopicSticker',
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
			url:'/api/deleteTopicSticker',
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
