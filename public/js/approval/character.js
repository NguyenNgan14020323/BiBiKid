function clickTitleCharacter(id, artistId){
	var xx = id.toString()
	$.ajax({
		url : '/api/getTopicCharacter',
		method : 'GET',
		data : {topicId : id},
		success:function(data){
			var character =  JSON.parse(data)
			var show = '';
			if (character != ''){
				for(i in character){
					show += '<div class="article" id="'+character[i]._id+'">'+
				        '<div class="thumb" data-toggle="modal" data-target="#myModalshow" onclick ="zumimg(\''+character[i].url+'\')" style="background-image: url('+character[i].url+');"><div class="msg">';
				        	if(character[i].status == 2){
				        		show+='<i class="glyphicon glyphicon-ok"></i>';
				        	}else{
				        		if(character[i].status == 3){
				        			show+='<i class="glyphicon glyphicon-alert"></i>'
				        		}else{
				        			show+='<i class="glyphicon glyphicon-question-sign"></i>'
				        		}
				        		
				        	}
				        show+='</div></div>'+
				        '<div class="titleapp">'+
				        ' <i data-toggle="tooltip" data-placement="top" title="Xét duyệt!" class="glyphicon glyphicon-ok" onclick ="clickOk(\''+character[i]._id+'\')"> </i>'+ 
				        ' <i data-toggle="modal" data-target="#myModalalert" data-toggle="tooltip" data-placement="top" title="Cảnh báo!" class="glyphicon glyphicon-alert" onclick ="clickalert(\''+character[i]._id+'\',\''+artistId+'\',\''+character[i].url+'\')"> </i>'+  
				        ' <i data-toggle="tooltip" data-placement="top" title="Xóa ảnh!" class="glyphicon glyphicon-trash" onclick="deleteimgcharacter(\''+character[i]._id+'\',\''+character[i].url+'\',\''+character[i].public_id+'\')"> </i></div>'+
				    '</div>'
				}
				show += '<div style="margin-left:1050px"><span class="btn btn-info" onclick="finish(\''+id+'\')">Finish</span></div>'
			}else{
				show += '<p>Chưa có dữ liệu</p>';

			}

			document.getElementById("news").innerHTML = show; 
		}
	})
}
function deleteimgcharacter(id,url,public){
	$.ajax({
		url : '/api/deleteCharacter',
		method : 'delete',
		data : {characterId : id, characterUrl:url,public_id:public},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}
function clickOk(id){
	$.ajax({
		url : '/api/confirmOkCharacter',
		method : 'PUT',
		data : {characterId : id},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}

function clickalert(id, artistId, url){
	document.getElementById('characterIdalert').value = id;
	document.getElementById('artistIdalert').value = artistId;
	document.getElementById('imgalert').value = url;
	
}

activities_alertChar = document.getElementById('alertcharacter')
activities_alertChar.addEventListener("click", alert_character)
function alert_character(){
	var characterId = document.getElementById('characterIdalert').value;
	var artistId = document.getElementById('artistIdalert').value;
	var url = document.getElementById('imgalert').value;
	var checkbox = document.getElementsByName('hobby');
    var result = "";             
	    // Lặp qua từng checkbox để lấy giá trị
	    for (var i = 0; i < checkbox.length; i++){
	        if (checkbox[i].checked === true){
	            result +=  checkbox[i].value + '. ';
	        }
	    }
	    $.ajax({
		url : '/api/confirmAlertCharacter',
		method : 'PUT',
		data : {characterId : characterId,artistId: artistId, content:result, url:url},
		success:function(data){  		
			alert('Alert success.')	
			location.reload()	
			document.getElementById(characterId).style.display = "none";
		}
	})

}

function finish(id){
	$.ajax({
		url : '/api/confirmCharacter',
		method : 'PUT',
		data : {topicId : id},
		success:function(data){  		
			document.getElementById('cc'+id).style.display = "none"
			document.getElementById('news').style.display = "none"
		}
	})
}

function zumimg(url){
	var imgshow = '<div class="articlezum">'+
				        '<div class="thumbzum" style="background-image: url('+url+');">'+
				        '<div><button type="button" class="close" data-dismiss="modal">&times;</button><div>'+
				        '</div>'+
				    '</div>'
	document.getElementById("show_img_title").innerHTML = imgshow;
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


