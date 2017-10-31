// JavaScript Document
var hospitalId; //机构ID
var token;
var servicePeopleId; //受诊人ID
var price; //价格
var username;
var serviceaddress;
var phone; //电话
var datatimedata; //年月日
var datatimehour; //时间
var hospitalname; //受诊人姓名
var userId; //用户ID
var patientId; //患者id
var rongCloudToken = ""; //融云即时聊天TOKEN
var payToken = "1"; //支付TOKEN
var doctorNurseId = ""; //医护id
var serviceItemId; // 服务项目id
var serviceTime; //预约时间  datatimedata + datatimehour
var address; //服务地址
var diseaseDesp; //病情描述

var id1; //订单类型

sessions();
 var currentTime = new Date().pattern("yyyy-MM-dd HH:mm")
 console.log(currentTime)
//切换性别
$(".recognition-affirm").on("click", function() {
	$(".sex-person").css("color", "#999")
	$(this).children(".sex-person").css("color", "#EC9C00")
	$(".sex-img").attr("src", "../../images/off.png")
	$(this).children(".sex-img").attr("src", "../../images/on.png")
})

init();

function init() {
	var params = {
		hospitalId: hospitalId,
		serviceItemId: serviceItemId,
		token: token
	};
    console.log(params)
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/order/selectPageHospServiceItemInfo.json',
		data: params,
		dataType: 'json',
		success: function(response) {
      console.log(response)
			tokenLose(response.status)
			var obj = response.data;
			console.log(obj)
      $(".outpatientTheme").text(obj.serviceItemName)
			$("#userName").text(username);
			$("#phone").val(phone);
			$("#datatimedata").val(datatimedata)
			$("#datatimehour").val(datatimehour)
			$("#serviceaddress").text(serviceaddress);
      $("#hospitalname").text(obj.hospitalName)
			$("#server_price").text(obj.price);
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		}
	})
};

// 获取浏览器数据
function sessions() {
	token = JSON.parse(localStorage.getItem("user")).token;
	userId = JSON.parse(localStorage.getItem("user")).userId;
	phone = sessionStorage.getItem("phone");

	datatimedata = sessionStorage.getItem("datatimedata");
	datatimehour = sessionStorage.getItem("datatimehour");

	hospitalId = GetQueryStr("hospitalId");
	price = sessionStorage.getItem("price");
	servicePeopleId = sessionStorage.getItem("servicePeopleId");
	id1 = GetQueryStr("id1");
	serviceItemId = GetQueryStr("serviceId");
	address = sessionStorage.getItem("address");

  if(sessionStorage.getItem("username")) {
    username = sessionStorage.getItem("username")
  };

  if(sessionStorage.getItem("serviceaddress")) {
    serviceaddress = sessionStorage.getItem("serviceaddress")
  };
}

function removeItem() {
	sessionStorage.removeItem("phone");
	sessionStorage.removeItem("username");
	sessionStorage.removeItem("sex");
	sessionStorage.removeItem("age");
	sessionStorage.removeItem("datatimedata");
	sessionStorage.removeItem("datatimehour");
	sessionStorage.removeItem("serviceaddress");
	sessionStorage.removeItem("servicePeopleId");
}

// 返回时清除浏览器数据
$(document).on("click", "header > a", function() {
	removeItem()
	historyBack();
})

function checkPhone(id) {
	var phone = $(id).val();
	if(!(/^1[34578]\d{9}$/.test(phone))) {
		$(id).addClass("error");
	};
};
$("input").on("focus", function() {
	$(this).removeClass("error")
})

function infoValid(id) {
	var thisVal = $(id).text();
	if(thisVal == "请选择受诊人" || !thisVal) {
		$(id).addClass("error");
	};
};

function addressValid(id) {
	var addressVal = $(id).text();
	if(addressVal == "请选择服务地址" || !addressVal) {
		$(id).addClass("error");
	};
};

function dataValid(id) {
	if(!$(id).val()) {
		$(id).addClass("error");
	};
};
$("#datatimedata").on("blur change", function() {
	datatimedata = $(this).val();

	var mistiming = new Date().getTime() - new Date(datatimedata).getTime();
	if(mistiming > 43200000) {
		$(this).addClass("error");
		alert("选择日期超出时间范围");
	} else {
		$(this).removeClass("error");
		sessionStorage.setItem("datatimedata", datatimedata);

$("#datatimehour").on("blur", function() {
	datatimehour = $(this).val();
	var timehour = parseInt(datatimehour);
	if(timehour < 8 || timehour > 20 || (timehour >= 12 && timehour < 14)) {
		$(this).addClass("error")
		alert("选择时间超出范围");
	} else {
		if(timehour < parseInt(new Date().getHours()+1)) {
			console.log(timehour);
			console.log(parseInt(new Date().getHours()+1));
			$(this).addClass("error")
			alert("选择时间超出范围1");
		} else {
			$(this).removeClass("error")
			sessionStorage.setItem("datatimehour", datatimehour);
		}
	};
});


	}
});
$("#phone").on("change", function() {
	phone = $(this).val();
	sessionStorage.setItem("phone", phone);
});

$(".submit-button-a").on("click", function() {
	// 输入验证
	infoValid("#userName");
	checkPhone("#phone");
	dataValid("#datatimedata");
	dataValid("#datatimehour");
	addressValid("#serviceaddress");
	if($("#userName").hasClass("error")) {
		alert("请选择受诊人!");
		return;
	};
	if($("#phone").hasClass("error")) {
		if($("#phone").val() == "") {
			alert("请输入手机号码!");
		} else {
			alert("手机号码有误，请重填！");
		}
		return;
	};
	var ageVal = $("#datatimedata").val();
	var timeVal = $("#datatimehour").val();
	var timehour = parseInt(timeVal);

//	var mistiming = new Date().getTime() - new Date(datatimedata).getTime();
//	if(mistiming > 43200000) {
//		$(this).addClass("error");
//		alert("选择日期超出时间范围");
//		return;
//	};
//	if(timehour < 8 || timehour > 20) {
//		alert("选择时间超出范围");
//		return;
//	};
//	if(timehour < parseInt(new Date().getHours())) {
//		alert("选择时间超出范围");
//		return;
//	};
//	if($("#datatimedata").hasClass("error") || $("#datatimehour").hasClass("error")) {
//		alert("请输入预约时间！");
//		return;
//	};

//	if($("#serviceaddress").hasClass("error")) {
//		alert("请选择服务地址！");
//		return;
//	}
//	if($("#birthday input").val() == "") {
//		alert("请选择出生日期！");
//		return;
//	};
function add0(m) {
	return m < 10 ? '0' + m : m
}

function format(e) {
	//时间戳是整数，否则要parseInt转换
	var time = new Date();
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	return y + '-' + add0(m) + '-' + add0(d);
}

var newTime = format()

var serviceaddress =  $("#serviceaddress").text();
console.log(newTime);
if(id1 == 'Home_service_class' || id1 == 'Booking_to_shop') {
	if(id1 == 'Home_service_class') {id1 = 2};
	if(id1 == 'Booking_to_shop') {id1 = 3};
	seeOrget = "请选择受诊人";
	serviceOrgetAddress = "请选择服务地址"
} else if(id1 == 'Health_products' || id1 =='Drug_delivery') {
	if(id1 == 'Health_products') {id1 = 5};
	if(id1 == 'Drug_delivery') {id1 = 7};
}
	var params2 = {
		token: token,
		userId: userId,
		rongCloudToken: rongCloudToken,
		payToken: payToken,
		hospitalId: hospitalId,
		type: id1,
		doctorNurseId: doctorNurseId,
		serviceItemId: serviceItemId,
		servicePeopleId: servicePeopleId,
		phone: $("#phone").val(),
		serviceTime: currentTime,
		address: serviceaddress,
		diseaseDesp: $(".patient-message textarea").val()
	};
	console.log(params2)
	console.log(JSON.stringify(params2))
	$.ajax({
		type: 'POST',
		url: config.appserver_url + "/order/perOrder.json",
		data: JSON.stringify(params2),
		contentType: 'application/json',
		dataType: 'json',
		success: function(response) {
			console.log(response)
			tokenLose(response.status);
			removeItem();

			var orderNo = response.data.orderNo;
			var patientId = response.data.patientId;
			 var serviceaddressContent = escape($("#serviceaddress").text());
			 console.log(serviceaddressContent)

			window.location.href = "../myClinic/payment.html?orderNo=" + orderNo+"&serviceaddressContent="+serviceaddressContent;
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		}
	})

})

// 选择受诊人
$(document).on("click", "#choicePerson", function() {
	historyForward("../medic/attendingPerson.html?id1="+ id1);
});

// 选择服务地址
$(document).on("click", "#choiceAddress", function() {
	historyForward("../medic/serviceAddress.html?id1="+ id1);
})
