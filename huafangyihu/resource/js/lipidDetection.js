// JavaScript Document

var doctorId = 1;
var token = 1; 

//切换性别
 $(".recognition-affirm").on("click",function(){ 
		$(".sex-person").css("color","#999")
	$(this).children(".sex-person").css("color","#EC9C00")
    $(".sex-img").attr("src","../../images/off.png")
	$(this).children(".sex-img").attr("src","../../images/on.png")
});


init();

function init() {
	var params = {
		doctorId: doctorId,
		token: token
	};

	$.ajax({
		type: 'GET',
		url: 'http://192.168.3.49:8080/api/doctorNurse/queryDocInfo.json',
		data: params,
		dataType: 'json',
		success: function(response) {
			tokenLose(response.status)
			var obj = response;
			// $("#doctor_name").text(obj);
			// $("#doctor_type").text()
		}
	})
};

	
