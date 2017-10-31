// JavaScript Document

var userId;
var pageNo = 1;
var pageSize = 8;
var token;
var arrayList;
var back;
var id1;
var serviceId;
var hospitalId;

getItem();
//切换性别
 $(".recognition-affirm").on("click",function(){ 
	$(".sex-person").css("color","#999")
	$(this).children(".sex-person").css("color","#EC9C00")
	$(".sex-img").attr("src","../../images/off.png")
	$(this).children(".sex-img").attr("src","../../images/on.png")
})

	
init();
initScrollBar();
function init() {
	var params = {
		userId :  userId,
		pageNo :  pageNo,
		pageSize :  pageSize,
		token : token
	};

	$.ajax({
		type: 'GET',
		url: config.appserver_url +'/address/queryPatAddress.json',
		data: params,
		dataType: 'json',
		success: function(response) {
			tokenLose(response.status)
			var patient_details = $("#patient_details").html();;
			arrayList = response.data;
			for(var i=0; i<arrayList.length; i++) {

				var obj = arrayList[i];
				var area = obj.address;

				var area1 = area.substring(0, area.indexOf("市")+1);
				var area2 = area.substring(area.indexOf("市")+1)

				patient_details += '<div class="service-address" data-id="'+ obj.id +'">';

				patient_details += '<h6>'+ obj.connectName;
				obj.idDefault ? patient_details += '<span class="default">【默认】</span>' : '';
				patient_details += '</h6>';

				patient_details += '<p>'+ area1 +'</p>';
				patient_details += '<p>'+ area2 +'</p>';

				patient_details += '</div>'

			}

			$("#patient_details").html(patient_details);

			$(".service-address").on("click", function() {
				var dataId = $(this).data("id");
				// $.get("", dataId, function() {});
				sessionStorage.setItem("serviceaddress", $(this).find("h6").text());
				sessionStorage.setItem("address", dataId);

				historyBack();
			});
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	})
} 



function getItem() {	
	back = GetQueryStr("back");
	id1 = GetQueryStr("id1");
	serviceId = GetQueryStr("serviceId");
	hospitalId = GetQueryStr("hospitalId");
	userId = JSON.parse(localStorage.getItem("user")).userId;
	token = JSON.parse(localStorage.getItem("user")).token;
};

$("header > a").on("click", function(){
	historyBack();
})

$(".submit-button-a").on("click", function() {
	historyForward("../mine/addoftenAddress.html");
});



function initScrollBar() {
	//下拉加载更多
	var stop = true;
	$(window).scroll(function() {
		totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		if($(document).height() <= totalheight) {
			if(stop == true) {
				stop = false;
				pageNo++;
				//如果少于6条不发送请求
				if(arrayList < 7) {

				} else {
					init();
				}
				stop = true;
			}
//			$("#bottom").show();
		}
	});
}