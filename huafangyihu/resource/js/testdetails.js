// JavaScript Document
var serviceItemId;
var token;
var default1 = GetQueryStr("default");
var id1;
var hospitalId;

getItem();

//分享
$("#share").on("click", function() {
	$("#modal").css("display", "none")
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	var modalHeight = $(document).height()
	$("#modal").css("background-color", "#111111")
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#shareMain").css("display", "block")
//禁用滚动条事件
	$("body").css("overflow","hidden")


$("#shareMain-close").on("click", function() {
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})

//模态框弹出层
$("#attention-img-yes").on("click", function() {
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	var modalHeight = $(document).height()
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal-div").css("display", "block")
	$("#modal-div").css("background-color", "white")
})
$("#modal-div-second").on('click', function() {
	$("#modal-div").css("display", "none")
	$("#modal").css("display", "none")
})
$("#modal-div-three").on('click', function() {
	$("#modal-div").css("display", "none")
	$("#modal").css("display", "none")
})
})

init();
// 初始化渲染页面
function init() {
    var params = {
        serviceItemId: serviceItemId,
        token: token
    };

    $.ajax({
        type: 'GET',
        url: config.appserver_url + '/doctorNurse/queryServiceItemInfo.json',
        data: params,
        dataType: 'json',
        success: function(response) {
        	tokenLose(response.status)
            var obj = response.data.serviceItem;
            var obj2 = response.data.hospitalServiceItem;
            $("#itemName").text(obj.itemName);
            $("#oldprice").text(obj2.rate);
            $("#nowprice").text(obj2.oldRete);
            $("#desp").text(obj.desp);
            $("#bannerpic").css("background-image", "url('"+ obj.picUrl +"')");
            $("#usercount").text(obj2.hosUseTimes);
        },
        error: function() {
        	alert("服务繁忙，请稍后再试！")
        }
    })


}
var nowprice =  $(".nowprice").text();
console.log(nowprice)
// 获取参数
function getItem() {
	token = JSON.parse(localStorage.getItem("user")).token;
	serviceItemId = GetQueryStr("serviceid");
	id1 = GetQueryStr("id1");
	hospitalId = GetQueryStr("hospitalId");
}

$(".return").on("click", function() {
	historyBack();
});
$(document).on("click", ".submit-button-a", function() {
	var nextPage;
	if(id1 == 'Home_service_class') {
		if(hospitalId){
		nextPage = "../medic/doorservicesubm.html?id1="+ id1 +"&serviceId="+ serviceItemId+"&hospitalId="+ hospitalId;
		}else{
		nextPage = "../myClinic/choiceClinic.html?id1="+ id1 +"&serviceId="+ serviceItemId;
		}
	} else if(id1 == 'Booking_to_shop') {
	if(hospitalId){
		nextPage = "../medic/shopservicesubm.html?id1="+ id1 +"&serviceId="+ serviceItemId+"&hospitalId="+ hospitalId;
		}else{
		nextPage = "../myClinic/choiceClinic.html?id1="+ id1 +"&serviceId="+ serviceItemId;
		}
	} else if(id1 == 'Health_products') {
		nextPage = "../medic/healthservicesubm.html?id1="+ id1 +"&serviceId="+ serviceItemId +'&hospitalId='+ hospitalId;
	};
	historyForward(nextPage);
})
