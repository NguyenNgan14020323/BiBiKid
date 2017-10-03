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

