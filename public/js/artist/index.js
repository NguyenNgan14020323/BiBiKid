activities_chktitle = document.getElementById('title')
activities_chktitle.addEventListener("change", check_title)

function check_title(){
	document.getElementById('loi_title').innerHTML = "";
	var val = activities_chktitle.value
	if(val == ''){
		document.getElementById('loi_title').innerHTML = "Trường bắt buộc.";
	}
}

function Upload(id, title){
	document.getElementById('chan1').innerHTML = 'Upload to ' + title;
	document.getElementById('chan3').value = id;
}



var chkk = true;
var activities_cupass = document.getElementById('currentpass')
activities_cupass.addEventListener('change', chk_curentpass)
function chk_curentpass(){
	document.getElementById('loi_current_pass').innerHTML = "";
	var val = activities_cupass.value
	if(val == ''){
		document.getElementById('loi_current_pass').innerHTML = "Trường bắt buộc."
		chkk = false
	}else{
		var valll = document.getElementById('sespass').value
		if(val != valll){
			document.getElementById('loi_current_pass').innerHTML = "Sai mật khẩu."
			chkk = false
		}
	}
}

var activities_newpass = document.getElementById('newpass')
activities_newpass.addEventListener('change', check_newpass)
function check_newpass(){
	document.getElementById('loi_new_pass').innerHTML = "";
	var val = activities_newpass.value
	if(val == ''){
		document.getElementById('loi_new_pass').innerHTML = "Trường bắt buộc."
		chkk = false
	}else{
		if(val.length < 8){
			document.getElementById('loi_new_pass').innerHTML = "Tối thiểu 8 kí tự."
			chkk = false
		}
	}
}

var activities_conpass = document.getElementById('confirmpass')
activities_conpass.addEventListener('change',check_confirmpas)
function check_confirmpas(){
	document.getElementById('loi_confirm_pass').innerHTML = "";
	var val = activities_conpass.value
	var vall = document.getElementById('newpass').value
	if(val == ''){
		chkk = false
		document.getElementById('loi_confirm_pass').innerHTML = "Trường bắt buộc.";
	}else{
		if(val != vall){
			chkk = false
			document.getElementById('loi_confirm_pass').innerHTML = "Mật khẩu không trùng khớp.";
		}
	}
}



activities_chpass = document.getElementById('thaydoipass')
activities_chpass.addEventListener("click", thaydoi_pass)
function thaydoi_pass(){
	var current_pass = document.getElementById('currentpass').value;
	var new_pass = document.getElementById('newpass').value;
	var confirm_pass = document.getElementById('confirmpass').value;
	chkk = true;
	chk_curentpass()
	check_newpass()
	check_confirmpas()
	if(chkk){
		$.ajax({
			url: './api/resetpass',
			method: 'PUT',
			data: {
				password: new_pass
			},
			success:function(data){
				alert('Change password success');
				location.reload();
			}
		})
	}
}


function clickTitleBackground(id){
	var xx = id.toString()
	$.ajax({
		url : './api/getTopicBackground',
		method : 'GET',
		data : {topicId : id},
		success:function(data){
			var background =  JSON.parse(data)
			var show = '';
			if (background != ''){
				for(i in background){
					show += '<div class="article" id="'+background[i]._id+'">'+
				        '<div class="thumb" style="background-image: url('+background[i].url+');"><div class="msg">';
				        	if(background[i].status == 2){
				        		show+='<i class="glyphicon glyphicon-ok"></i>';
				        	}else{
				        		if(background[i].status == 3){
				        			show+='<i class="glyphicon glyphicon-alert"></i>'
				        		}else{
				        			show+='<i class="glyphicon glyphicon-question-sign"></i>'
				        		}
				        		
				        	}
				        show+='</div><div class="title"><i data-toggle="modal" data-target="#myModalshow" onclick ="zumimg(\''+background[i].url+'\')" class="glyphicon glyphicon-zoom-in">  </i> <i data-toggle="tooltip" data-placement="top" title="Xóa ảnh!" class="glyphicon glyphicon-trash" onclick="deleteimgBackground(\''+background[i]._id+'\',\''+background[i].url+'\',\''+background[i].public_id+'\')"></i></div></div>'+
				    '</div>'
				}
			}else{
				show += '<p>Chưa có dữ liệu</p>';

			}

			document.getElementById("news").innerHTML = show; 
		}
	})
}
function clickTitleCharacter(id){
	var xx = id.toString()
	$.ajax({
		url : './api/getTopicCharacter',
		method : 'GET',
		data : {topicId : id},
		success:function(data){
			var character =  JSON.parse(data)
			var show = '';
			if (character != ''){
				for(i in character){
					show += '<div class="article" id="'+character[i]._id+'">'+
				        '<div class="thumb" style="background-image: url('+character[i].url+');"><div class="msg">';
				        	if(character[i].status == 2){
				        		show+='<i class="glyphicon glyphicon-ok"></i>';
				        	}else{
				        		if(character[i].status == 3){
				        			show+='<i class="glyphicon glyphicon-alert"></i>'
				        		}else{
				        			show+='<i class="glyphicon glyphicon-question-sign"></i>'
				        		}
				        		
				        	}
				        show+='</div><div class="title"><i data-toggle="modal" data-target="#myModalshow" onclick ="zumimg(\''+character[i].url+'\')" class="glyphicon glyphicon-zoom-in">  </i> <i data-toggle="tooltip" data-placement="top" title="Xóa ảnh!" class="glyphicon glyphicon-trash" onclick="deleteimgCharacter(\''+character[i]._id+'\',\''+character[i].url+'\',\''+character[i].public_id+'\')"></i></div></div>'+
				    '</div>'
					//show +=  '<img onclick="zumimg('+background[i]._id+','+background[i].url+')" id="'+background[i]._id+'" src="'+ background[i].url +'" style="width: 200px; height: 200px; margin: 10px;">';
				}
			}else{
				show += '<p>Chưa có dữ liệu</p>';

			}

			document.getElementById("news").innerHTML = show; 
		}
	})
}

function clickTitleSticker(id){
	var xx = id.toString()
	$.ajax({
		url : './api/getTopicSticker',
		method : 'GET',
		data : {topicId : id},
		success:function(data){
			var sticker =  JSON.parse(data)
			var show = '';
			if (sticker != ''){
				for(i in sticker){
					show += '<div class="article" id="'+sticker[i]._id+'">'+
				        '<div class="thumb" style="background-image: url('+sticker[i].url+');"><div class="msg">';
				        	if(sticker[i].status == 2){
				        		show+='<i class="glyphicon glyphicon-ok"></i>';
				        	}else{
				        		if(sticker[i].status == 3){
				        			show+='<i class="glyphicon glyphicon-alert"></i>'
				        		}else{
				        			show+='<i class="glyphicon glyphicon-question-sign"></i>'
				        		}
				        		
				        	}
				        show+='</div><div class="title"><i data-toggle="modal" data-target="#myModalshow" onclick ="zumimg(\''+sticker[i].url+'\')" class="glyphicon glyphicon-zoom-in">  </i> <i data-toggle="tooltip" data-placement="top" title="Xóa ảnh!" class="glyphicon glyphicon-trash" onclick="deleteimgCharacter(\''+sticker[i]._id+'\',\''+sticker[i].url+'\',\''+sticker[i].public_id+'\')"></i></div></div>'+
				    '</div>'
					
				}
			}else{
				show += '<p>Chưa có dữ liệu</p>';

			}

			document.getElementById("news").innerHTML = show; 
		}
	})
}


function deleteimgBackground(id, url, public){
	$.ajax({
		url : './api/deleteBackground',
		method : 'delete',
		data : {
			backgroundId : id,
			backgroundUrl : url,
			public_id : public
		},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}

function deleteimgCharacter(id, url, public){
	$.ajax({
		url : './api/deleteCharacter',
		method : 'delete',
		data : {characterId : id, characterUrl : url, public_id:public},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
		}
	})
}
function deleteimgSticker(id, url, public){
	$.ajax({
		url : './api/deleteSticker',
		method : 'delete',
		data : {stickerId : id, stickerUrl: url, publid_id:public},
		success:function(data){  		
			document.getElementById(id).style.display = "none"
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


			$(document).ready(function(){
				$('[data-toggle="tooltip"]').tooltip();   
			});
	
