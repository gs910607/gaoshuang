/*Create By Zcq 4/18/2017*/

//var openId = sessionStorage.getItem("openId");
var openId = JSON.parse(localStorage.getItem("user")).openId;
//获取时间戳
//var timestamp = Date.parse(new Date());
//console.log(timestamp)
//调用后端接口获取微信签名。公众号名称等信息
var cOrderNo = GetQueryStr("cOrderNo");
var orderNo = GetQueryStr("orderNo");
var id1 = GetQueryStr("id1")
console.log(id1);
//appid
var appId;
//时间戳
var timeStamp;
//加密方式
var signType;
//数据包
var packages;
//随机字符串
var nonceStr;
//最终签名
var paySign;

var pramas = {
	orderNo: cOrderNo,
	openId: openId
}
console.log(pramas)
$.ajax({
	type: "post",
	data: pramas,
	url: config.appserver_url + "/pay/unionPay.json",
	dataType: "json",
	async: true,
	success: function(data) {
		console.log(data)
		//   alert(data.errorMsg)
		appId = data.data.appId;
		timeStamp = data.data.timeStamp;
		signType = data.data.signType;
		packages = data.data.packages;
		nonceStr = data.data.nonceStr;
		paySign = data.data.paySign;
	},
	error: function(data) {
		alert("服务繁忙，请稍后再试！");
	}
});

//allPayMoney
var allPayMoney = GetQueryStr("payMoney");

$(".allPayMoney").text("￥" + allPayMoney);
$(".fr_page").text("￥" + allPayMoney);

function payment() {};

//现有余额
var balance = $('.paywayinfo').children(0).text().trim().replace(/[^0-9]/ig, '');
//需要付款
var needPay = $('.need_pay').text().trim().replace(/[^0-9]/ig, '');

//start
$.extend(payment.prototype, {
	select: function() {
		// console.log($(this));
		var index = $(this).index();

		$(this).addClass('fontcolor').siblings().removeClass('fontcolor');
		$('.pay_method').attr('payId', '0').eq(index).attr('payId', '1');
		$('.pay_method img').attr('src', '../../images/selected1.png').eq(index).attr('src', '../../images/selected.png');

	},
	payMethod: function() {
		//		console.log(2222)
		$('.pay_method').each(function() {
			var payID = $(this).attr('payId');
			//console.log(payID);
			if(payID == '1') {
				var payName = $(this).text().trim().substr(0, 2);
				// console.log(payName);
				if(payName == '余额') {
					if(balance >= needPay) {
						alert('付款成功');
					} else {
						alert('余额不足');
					}
					//微信支付	
				} else if(payName == '微信') {
					// pay.jsApiCall();
					pay.callPay();
					//支付宝支付
				} else if(payName == '支付') {
                   alert("暂不支持支付宝支付")
				}
			}
		})

	},
	//调用微信Js api支付

	jsApiCall: function() {
		//console.log(JSON.parse('{"status":1,"errorMsg":null,"data":{"appId":"wx624c939e097e16c5","timeStamp":1493364269,"signType":"MD5","package":"prepay_id\\u003dwx2017042815243572e59355d50249974294","nonceStr":"qhlt36glp54hm0mtsem10cp0p8ix8n1u","paySign":"FECD8A1B957A01904A41A7B39815D9F4"}}'));
		//$.ajax({
		//	url: 'http://localhost:8080/hfs-web-gw/tradegw.json',
		//	type: 'GET',
		//	dataType: "jsonp",
		//	success: function () {
		//		console.log(data);
		//	}
		//})
		//		console.log((JSON.parse("{\"appId\":\"wx624c939e097e16c5\",\"timeStamp\":1494315229,\"signType\":\"MD5\",\"package\":\"prepay_id=wx201705091533484ca885f5bb0700173142\",\"nonceStr\":\"sh9zxizycqmshuzv40z9icsg7uopy5qc\",\"paySign\":\"59D89A241A442A3E46999BE7C771B9D6\"}")));

		WeixinJSBridge.invoke('getBrandWCPayRequest', {
				"appId": appId, //公众号名称，由商户传入
				"timeStamp": timeStamp, //时间戳，自1970年以来的秒数
				"nonceStr": nonceStr, //随机串
				"package": packages, //数据包
				"signType": signType, //微信签名方式：
				"paySign": paySign //微信签名
			},
			function(res) {
				if(res.err_msg == "get_brand_wcpay_request:ok") {
					//支付返回的状态
					alert("支付成功");
					setTimeout(function() {
						//延迟2秒跳回我的页面
						//window.location.href = "../main/index.html";
						window.location.href = "../medic/bookingDetails.html?id1=" + id1 + "&status=yydddxf&orderNo=" + orderNo;
					}, 2000)
				} // 使用以上方式判断前端返回,
			}
		)
	},
	//微信支付回调函数
	callPay: function() {
		if(typeof WeixinJSBridge == "undefined") {
			if(document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', pay.jsApiCall, false);
			} else if(document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', pay.jsApiCall);
				document.attachEvent('onWeixinJSBridgeReady', pay.jsApiCall);
			}
		} else {
			pay.jsApiCall();
		}
		return false;
	}
});

var pay = new payment();

//select pay method
// $('.pay_method').on('click', pay.select);
$('.paywayinfo').on('click', '.pay_method', pay.select);

//confirm pay
$('.confirm').on('click', 'button', pay.payMethod);

//$(".fontcolor").on("click",function(){
//	console.log(2222)
//	var orderNo = GetQueryStr("orderNo");
//	var payPayment =  $(".fr_page").text();
//	window.location.href="../myClinic/payment.html?payPayment="+payPayment+"&orderNo="+orderNo;
//})
//console.log("../medic/bookingDetails.html?id1="+id1+"&status=yydddxf&orderNo="+orderNo)