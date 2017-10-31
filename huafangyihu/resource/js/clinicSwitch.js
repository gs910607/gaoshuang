// JavaScript Document
//分享
$("#share").on("click", function() {
	$("#modal").css("display", "none")
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#shareMain").css("display", "block")
//禁用滚动条事件
	$("body").css("overflow","hidden")

$(".modal-cancel").css("display","block")
    var modalCancel =$("#shareMain").offset().top
    console.log(modalCancel)   
    $(".modal-cancel").height(modalCancel)
})
//点击蒙版层关闭分享
$(".modal-cancel").on("click",function(){
	$(".modal-cancel").css("display","none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})
//关闭分享
$("#shareMain-close").on("click", function() {
	$(".modal-cancel").css("display","none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})


$(document).ready(
 function() 
{   

   myfun();
	
}
);



function myfun(){

    var param ={
        userId:JSON.parse(localStorage.getItem("user")).userId,
	  	token:JSON.parse(localStorage.getItem("user")).token,
        latitude:sessionStorage.getItem("latitude"),
		longitude:sessionStorage.getItem("longitude"),
		pageNo:1,
		pageSize:10
	  }
     $.ajax({
    	type:"get",
    	data: param,
    	url:config.appserver_url + "/hosPa/queryFocusHospital.json",
    	dataType: "json",
    	async:false,
    	success: function(data){
            tokenLose(data.status)
			   var text = "";

			   for(var i=0;i<data.data.length;i++){
				   var o = data.data[i];
				    score = o.score;
				   var tmp = "<li  id='"+o.hospitalId+"' class=\"recommend-clinic-ul-li\">"+
            "<div class=\"clinic-profile\">"+
            	"<span class=\"clinic-profile-img\"><img src='"+o.hosPic+"' alt=\"\"><span class='span-img'></span></span>"+
               "<div class=\"clinic-profile-div\">"+
                	"<h6>"+o.hospitalName+"("+o.hospitalTypeName+")</h6>"+
                    "<div class=\"clinic-profile-distance\">"+
                    	"距我<span>"+o.distance+"</span>km"+
                    "</div>"+
                    "<div class=\"score-star\">"+
                    	"<i>"+
                        	"<img src=\"../../images/"+imageStar()+"\"/>"+
                        "</i>"+
						"<i>"+
                        	"<img src=\"../../images/"+imageStar()+"\"/>"+
                        "</i>"+
						"<i>"+
                        	"<img src=\"../../images/"+imageStar()+"\"/>"+
                        "</i>"+
                        "<i>"+
                        	"<img src=\"../../images/"+imageStar()+"\"/>"+
                        "</i>"+
                        "<i>"+
                        	"<img src=\"../../images/"+imageStar()+"\"/>"+
                        "</i>"+
                        "<span class=\"score-text\">"+o.score+"分</span>"+
                    "</div>"+
                    "<div class=\"clinic-address\">"+
                    	o.address+
                    "</div>"+
                "</div>"+
            "</div>"+
            "</li>"+
            "<div class=\"clear\"></div>";
				   text = text+tmp;
			   }
               $("#hospital").html(text);
			  switchover();





		   }
	 });
}

var score;

 function imageStar(){
	if(score>=1){
		score--;
		return "star.png";
	}

	if(score>=0.5 && score<1)
	{
		score--;
		return "smallStar.png";
	}
	score--;
	return "star2.png";

}


function switchover() { 
 //点击跳转诊所
  $(".recommend-clinic-ul-li").on('click',function(){
     var hospitalId =$(this).attr("id")       
     sessionStorage.setItem("hospitalId", hospitalId);
	 var param ={
        userId:JSON.parse(localStorage.getItem("user")).userId,
	  	token:JSON.parse(localStorage.getItem("user")).token,
        hospitalId:hospitalId
	  }

	  $.ajax({
    	type:"post",
    	data: param,
    	url:config.appserver_url + "/hosPa/default.json",
    	dataType: "json",
    	async:false,
    	success: function(data){
            location.href='../myClinic/clinicIndex.html';
		   }
	 });

	})
}