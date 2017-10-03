function clickTitleSticker(id,artistId){
	var xx = id.toString()
	$.ajax({
		url : '/api/getTopicSticker',
		method : 'GET',
		data : {topicId : id},
		success:function(data){
			var sticker =  JSON.parse(data)
			var show = '';
			if (sticker != ''){
				for(i in sticker){
					show += '<div class="article" id="'+sticker[i]._id+'">'+
				        '<div class="thumb" data-toggle="modal" data-target="#myModalshow" onclick ="zumimg(\''+sticker[i].url+'\')" style="background-image: url('+sticker[i].url+');"><div class="msg">';
				        	if(sticker[i].status == 2){
				        		show+='<i class="glyphicon glyphicon-ok"></i>';
				        	}else{
				        		if(sticker[i].status == 3){
				        			show+='<i class="glyphicon glyphicon-alert"></i>'
				        		}else{
				        			show+='<i class="glyphicon glyphicon-question-sign"></i>'
				        		}
				        		
				        	}
				        show+='</div></div>'+
				        '<div class="titleapp"><i data-toggle="tooltip" data-placement="top" title="Xét duyệt!" class="glyphicon glyphicon-ok" onclick ="clickOk(\''+sticker[i]._id+'\')"> </i>'+
				        ' <i  data-toggle="modal" data-target="#myModalalert" data-toggle="tooltip" data-placement="top" title="Cảnh báo!" class="glyphicon glyphicon-alert" onclick ="clickalert(\''+sticker[i]._id+'\',\''+artistId+'\',\''+sticker[i].url+'\')"> </i>'+
				        ' <i data-toggle="tooltip" data-placement="top" title="Xóa ảnh!" class="glyphicon glyphicon-trash" onclick="deleteimgsticker(\''+sticker[i]._id+'\',\''+sticker[i].url+'\',\''+sticker[i]._id+'\')"> </i></div>'+
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
function deleteimgsticker(id,url,public){
	$.ajax({
		url : '/api/deleteSticker',
		method : 'delete',
		data : {stickerId : id, stickerUrl: url,public_id:public},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}
function clickOk(id){
	$.ajax({
		url : '/api/confirmOkSticker',
		method : 'PUT',
		data : {stickerId : id},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}

function clickalert(id, artistId, url){
	document.getElementById('stickerIdalert').value = id;
	document.getElementById('artistIdalert').value = artistId;
	document.getElementById('imgalert').value = url;
	
}

activities_alertStick = document.getElementById('alertsticker')
activities_alertStick.addEventListener("click", alert_sticker)
function alert_sticker(){
	var stickerId = document.getElementById('stickerIdalert').value;
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
		url : '/api/confirmAlertSticker',
		method : 'PUT',
		data : {stickerId : stickerId,artistId: artistId, content:result, url:url},
		success:function(data){  
			alert('Alert success.')	
			location.reload()			
			document.getElementById(id).style.display = "none"
		}
	})
}

function finish(id){
	$.ajax({
		url : '/api/confirmSticker',
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

activities_editSticker = document.getElementById('editsticker')
activities_editSticker.addEventListener("click", edit_Sticker)
function edit_Sticker(){
	var edittitle = document.getElementById('edittitle').value;
	var topicId = document.getElementById('topicId').value;
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
