// JavaScript Document

var userId;
var servicePeopleId;
var token;

var serviceId;
var id1;
var back;

getItem();

if(id1 == 'Home_service_class' || id1 == 'Booking_to_shop' ) {
  $(".outpatientTheme").text("选择受诊人");
} else if( id1 == 'Health_products' || id1 == 'Drug_delivery' ) {
  $(".outpatientTheme").text("选择收货人");
}
//切换性别
 $(".recognition-affirm").on("click",function(){
	$(".sex-person").css("color","#999")
	$(this).children(".sex-person").css("color","#EC9C00")
    $(".sex-img").attr("src","../../images/off.png")
	$(this).children(".sex-img").attr("src","../../images/on.png")
});

init();

function init() {

	var parms = {
		userId: userId,
		token: token
	};

	$.ajax({
		type: 'GET',
		url: config.appserver_url  + '/getServicePeople/queryServicePeople.json',
		data: parms,
		dataType: 'json',
		success: function(response) {
			tokenLose(response.status)
			var personInfo = '';
			var arrayList = response.data;
			for(var i=0; i<arrayList.length; i++) {
				var obj = arrayList[i];
				personInfo += '<li class="patient-information-details" data-id="'+ obj.id +'"><span class="userName">'+ obj.name +'</span><a class="attending-person" href="javascript:;"><span class="sex">'+ obj.sex +'</span> / <span class="age" data-age="'+dateFormat(obj.birthday)+'">'+ formattingDate(obj.birthday) +'</span> / <span class="phone">'+ obj.mobile +'</span></a></li>';
			};
			$("#patient_information_details").html(personInfo);

			$(".patient-information-details").on("click", function() {

				sessionStorage.setItem("username", $(this).find(".userName").text());
				sessionStorage.setItem("sex", $(this).find(".sex").text());
				sessionStorage.setItem("age", $(this).find(".age").text());
				var patientAge = $(this).find(".age").data("age");
				console.log(patientAge)
				sessionStorage.setItem("birthday", escape(patientAge));
				sessionStorage.setItem("phone", $(this).find(".phone").text());
				servicePeopleId = $(this).data("id");
				sessionStorage.setItem("servicePeopleId", servicePeopleId);
				$.get(config.appserver_url + '/getServicePeople/queryServicePeople.json', servicePeopleId, function() {});
				historyBack();
			});
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	})

};


function getItem() {
//	back = GetQueryStr("back");
	back = "doorservicesubm";
	id1 = GetQueryStr("id1");
	serviceId = GetQueryStr("serviceId");
	hospitalId = GetQueryStr("hospitalId");
	userId = JSON.parse(localStorage.getItem("user")).userId;
	token = JSON.parse(localStorage.getItem("user")).token;
}

// 格式化时期
function formattingDate(timer) {
	var years = new Date(timer).getFullYear();

	var birthday = new Date().getFullYear() - years;

	return birthday + "岁"
};

$("header > a").on("click", function() {
	historyBack();
});

$(".submit-button-a").on('click', function() {
	historyForward("../mine/addPatientMessage.html?id1=" + id1);
})
