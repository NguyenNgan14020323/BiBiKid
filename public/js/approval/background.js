function clickTitleBackground(id, artistId){
	var xx = id.toString()
	$.ajax({
		url : '/api/getTopicBackground',
		method : 'GET',
		data : {topicId : id},
		success:function(data){
			var background =  JSON.parse(data)
			var show = '';
			if (background != ''){
				for(i in background){
					show += '<div class="article" id="'+background[i]._id+'">'+
				        '<div class="thumb" data-toggle="modal" data-target="#myModalshow" onclick ="zumimg(\''+background[i].url+'\')" style="background-image: url('+background[i].url+');"><div class="msg">';
				        	if(background[i].status == 2){
				        		show+='<i class="glyphicon glyphicon-ok"></i>';
				        	}else{
				        		if(background[i].status == 3){
				        			show+='<i class="glyphicon glyphicon-alert"></i>'
				        		}else{
				        			show+='<i class="glyphicon glyphicon-question-sign"></i>'
				        		}
				        		
				        	}
				        show+='</div></div>'+
				        '<div class="titleapp"><i  data-toggle="tooltip" data-placement="top" title="Xét duyệt!" class="glyphicon glyphicon-ok" onclick ="clickOk(\''+background[i]._id+'\')"> </i>  '+ 
				        ' <i data-toggle="modal" data-target="#myModalalert" data-toggle="tooltip" data-placement="top" title="Cảnh báo!" class="glyphicon glyphicon-alert"  onclick ="clickalert(\''+background[i]._id+'\',\''+artistId+'\',\''+background[i].url+'\')">  </i> '+ 
				        ' <i  data-toggle="tooltip" data-placement="top" title="Xóa ảnh!" class="glyphicon glyphicon-trash" onclick="deleteimgBackground(\''+background[i]._id+'\',\''+background[i].url+'\',\''+background[i].public_id+'\')"> </i></div>'+
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
function deleteimgBackground(id,url,public){
	$.ajax({
		url : '/api/deleteBackground',
		method : 'delete',
		data : {backgroundId : id, backgroundUrl:url, public_id:public},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}
function clickOk(id){
	$.ajax({
		url : '/api/confirmOkBackground',
		method : 'PUT',
		data : {backgroundId : id},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}

function clickalert(id, artistId, url){
	document.getElementById('backgroundIdalert').value = id;
	document.getElementById('artistIdalert').value = artistId;
	document.getElementById('imgalert').value = url;

}
activities_alertBack = document.getElementById('alertbackground')
activities_alertBack.addEventListener("click", alert_Background)
function alert_Background(){
	var backgroundId = document.getElementById('backgroundIdalert').value;
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
		url : '/api/confirmAlertBackground',
		method : 'PUT',
		data : {backgroundId : backgroundId, artistId: artistId, content:result, url:url},
		success:function(data){  
			alert('Alert success.')	
			location.reload()	
			document.getElementById(backgroundId).style.display = "none";
		}
	})

}


function finish(id){
	$.ajax({
		url : '/api/confirmBackground',
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




