//清除上一次的地址
function removeItemAddress() {
	sessionStorage.removeItem("particularAddress")
	sessionStorage.removeItem("province")
	sessionStorage.removeItem("newCity")
	sessionStorage.removeItem("district")
	sessionStorage.removeItem("buildAddress")
	sessionStorage.removeItem("nearlyStreet")
}

//解析URL

var newAddress = unescape(sessionStorage.getItem("particularAddress"));
var province = unescape(sessionStorage.getItem("province"));
var newCity = unescape(sessionStorage.getItem("newCity"));
var district = unescape(sessionStorage.getItem("district"));
var buildAddress = unescape(sessionStorage.getItem("buildAddress"));
var nearlyStreet = unescape(sessionStorage.getItem("nearlyStreet"));
// console.log("newAddress:"+newAddress +"+province:"+ province  +"+newCity:"+  newCity +"+district:"+  district  +"+buildAddress:"+ buildAddress  +"+nearlyStreet:"+ nearlyStreet);

// var newAddress = unescape(GetQueryStr("particularAddress"));
// var province = unescape(GetQueryStr("province"));
// var newCity = unescape(GetQueryStr("newCity"));
// var district = unescape(GetQueryStr("district"));
// var buildAddress = unescape(GetQueryStr("buildAddress"));
// var nearlyStreet = unescape(GetQueryStr("nearlyStreet"));
// console.log("newAddress:"+newAddress +"+province:"+ province +"+newCity:"+ newCity+"+district:"+  district+"+buildAddress:"+  buildAddress +"+nearlyStreet:"+ nearlyStreet)
//没有定位 默认
if(newAddress == 'null') {
	console.log(newAddress)
	var addressText = $(".address>span").eq(0).text() + "-" + $(".address>span").eq(1).text() + "-" + $(".address>span").eq(3).text() + "-" + $(".address>span").eq(4).text();	
} else {
	console.log(newAddress)
	//更改地理信息
	
	$(".inputAddress").val(newAddress);
	$(".address>span").eq(0).text(province)
	$(".address>span").eq(1).text(newCity)
	$(".address>span").eq(3).text(district)
	$(".address>span").eq(4).text(nearlyStreet)
	$(".address>span").eq(5).text(buildAddress)
	if(!district || district == "null") {
		$(".address>span").eq(2).hide();
		$(".addressArea").hide();
		var addressText = $(".address>span").eq(0).text() + "-" + $(".address>span").eq(1).text() + "-" + $(".address>span").eq(3).text() + "-" + $(".address>span").eq(4).text() + "-" + $(".address>span").eq(5).text();
	    console.log(addressText)
	} else {
		console.log(district)
		var addressText = $(".address>span").eq(0).text() + "-" + $(".address>span").eq(1).text() + "-" + $(".address>span").eq(3).text() + "-" + $(".address>span").eq(4).text() + "-" + $(".address>span").eq(5).text();
	   console.log(addressText)
	}
}
var userId;
var address;
var isDefault = 0;
var connectName = addressText;
var token;

getItem();

function init() {
	var params = {
		userId: userId,
		address: address,
		isDefault: isDefault,
		connectName: connectName,
		token: token
	};
	console.log(params)
	$.ajax({
		type: "POST",
		url: config.appserver_url + '/address/addPatAddress.json',
		dataType: 'json',
		//		contentType: 'application/json',
		data: params,
		success: function(data) {
			console.log(data)
			tokenLose(data.status);
			 window.location.href = "oftenAddress.html?";
			historyBack();
		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		}

	})
}
// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;

}

//保存
$(".addPatient").on("click", function() {
//	removeItemAddress();
	address = $(".inputAddress").val();
	console.log(address)
	if(address == '') {
		alert("地址不能为空！")
	} else {
		init();
	}

});

$("header > a").on("click", function() {
	historyBack()
});
$(".mapLocation").on("click", function() {
	historyForward("../mine/addoftenAddressMap.html");
});
