var id1;
var hospitalId;
var serviceId;
var user;
var token;


//弹出拨打
$(".consultingClinic").on("click", function() {
	$("#modal").css("display", "none")
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#dialMain").css("display", "block")
//禁用滚动条事件
	$("body").css("overflow","hidden")


$(".dialMain-address").on("click", function() {
	$("#dialMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})

//模态框弹出层
$("#attention-img-yes").on("click", function() {
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
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
});


getItem();
init();
function getItem() {
	id1 = GetQueryStr("id1");
	hospitalId = GetQueryStr("hospitalId");
	serviceId = GetQueryStr("serviceId");
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
};

$(".return > a").on("click", function() {
	historyBack();
});

$(document).on("click", ".buy-now", function() {
	var nextPage = "../medic/healthservicesubm.html?id1="+ id1 +"&hospitalId="+ hospitalId +"&serviceId="+ serviceId;
	historyForward(nextPage);
})
//var serviceItemId = GetQueryStr("serviceId");
function init() {
	var serviceItemId = GetQueryStr("serviceId");
	var params = {
		token: token,
		serviceItemId: serviceItemId
	};
console.log(params)
	$.ajax({
        type: 'GET',
        url: config.appserver_url + '/doctorNurse/queryServiceItemInfo.json',
        data: params,
        dataType: 'json',
        success: function(response) {
        	console.log(response.data)
        	tokenLose(response.status)
            var obj = response.data.serviceItem;
            var obj2 = response.data.hospitalServiceItem;
            $(".clinic-title-h6").text(obj.itemName);
            $(".drug-original-price").text('￥'+obj2.oldRete);
            $(".drug-new-price").text('￥'+obj2.rate);
//          $(".drug-prompt-information").text(obj.desp);
            $(".banner").css("background", "url('"+ obj.picUrl +"') no-repeat center center");
            $(".banner").css("background-size", "100% 100%");
        },
        error: function() {
        	alert("服务繁忙，请稍后再试！")
        }
    })

	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/serviceItem/queryServiceItemDetail.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(response) {
			console.log(response)
			tokenLose(response.status);
			var data = response.data;
			var arr = data.split("\r\n");
			for(var i=0; i<arr.length; i++) {
				$(".drug-instruction-p.p"+ (i+1)).text(arr[i]);
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		}
	})

}
