
//弹出拨打
$("#dial").on("click", function() {
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


$("#dialMain-close").on("click", function() {
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
})

var token = JSON.parse(localStorage.getItem("user")).token;
var userId = JSON.parse(localStorage.getItem("user")).userId;
var id1;
var orderNo;
var hospitalId;
var status;
var checkCodeQRCode;
var sessionOrderNo;  //评价完成后存储的变量

getItem();

if(sessionOrderNo) { //接收变量，有值代表评论成功，页面替换为评论完成状态
	sessionStorage.removeItem(sessionOrderNo);
	location.replace('../medic/bookingDetails.html?id1='+ id1 +'&status=ywc&orderNo=' + orderNo)
}

init();

if(status == 'dfk' || status == 'yydddfk' || status == 'yydddxf' || status == 'ghdjz' || status == 'yysmdfk' || status == 'yysmdjd' || status == 'yysmfwz' || status == 'dfh') {
	$("#cancelOrder").css("display","block");//取消订单按钮
	$("#evaluate").remove();  //去评价按钮
	$("#confirmReceipt").remove(); //确认收货按钮
	if(id1 == '3' && status == 'yydddxf') {
		$("#ticketWrapper").css("display","block"); //券码
	}
} else if(status == 'yfh') {
	$("#confirmReceipt").css("display","block");
	$("#cancelOrder").remove();
	$("#evaluate").remove();
} else if(status == 'dpj') {
	if(id1 == '3') {
		$("#ticketWrapper").css("display","block");  //券码
	}
	$("#cancelOrder").remove();
	$("#evaluate").css("display","block");//去评价
	$("#confirmReceipt").remove();
} else if(status == 'yysmywc' || status == 'ghywc' || status == 'yyddwc' || status == 'ywc') {
	if(id1 == '3' && status == 'ywc') {
		$("#ticketWrapper").css("display","block"); //券码
	}
	$("#cancelOrder").remove();
	$("#evaluate").remove();
	$("#confirmReceipt").remove();
}

if(id1 == 2) {  //预约上门
	$(".patient_tit").text("受诊人：");
	$("#phone_tit").hide();
} else if(id1 == 3) {
	$(".patient_tit").text("受诊人：");
	$("#phone_tit").hide();
	$("#address_tit").hide();
} else if(id1 == 5) { //商品购买
	$("#timer_tit").hide();
	$(".patient_tit").text("收货人：");
	$(".address_tit").text("收货地址：");
	$(".serviceName_tit").text("商品类型：");
	$(".price_tit").text("商品费用：");
} else if(id1 == 6) { //预约挂号
	$(".patient_tit").text("受诊人：");
	$(".price_tit").text("提供服务：");
	$("#address_tit").hide();
}

function getItem() {
	id1 = GetQueryStr("id1");
	orderNo = GetQueryStr("orderNo");
	status = GetQueryStr("status");
	sessionOrderNo = sessionStorage.getItem(orderNo);
};

var nextPage;
switch(id1) {
	case '2':  //预约上门
		nextPage = '../mine/appointmentdoor.html'
		break;
	case '3': //预约到店
		nextPage = '../mine/appointmentStore.html'
		break;
	case '5':  //健康产品
		nextPage = '../mine/appointmentproduct.html'
		break;
	case '6':  //预约挂号
		nextPage = '../mine/appointmentDoctor.html'
		break;
}

function goBack() {
	location.href = nextPage;
}

function init() {
	var params = {
		token: token,
		orderNo: orderNo
	}
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/doctorNurse/queryPayInfo.json',
		dataType: 'json',
		contentType: 'application/jaon',
		data: params,
		success: function(response) {
			tokenLose(response.status);
			if(response.status == 1) {
				console.log(response);
				var obj = response.data;
				hospitalId = obj.hospitalId;
				checkCodeQRCode = obj.checkCodeQRCode;
				$(".serviceName").text(obj.serviceItemName); //服务类型
				$(".price").text(obj.orderPrice + "元") //服务费用
				id1 == 5 ? $(".patient").text(obj.serPeoName) : $(".patient").text(obj.serPeoName + '/' + obj.serPeoSex + '/' + obj.younth + '岁/' + obj.serPeoMobile);  //受诊人
				$(".timer").text(obj.serviceTime) //预约时间
				$(".phone").text(obj.serPeoMobile) //联系方式
				$(".address_text").text(obj.address); //服务地址
				$(".hospital_name").text(obj.hosName) //机构名称
				id1 == 6 ? $(".hosName").text(obj.hosName) : '';
				var objOrderType = attendanceStatus(obj.status);
				$(".ticketStatus").html(obj.status == 'yydddxf' ? '<span style="color:#ec9b00;padding:0;">未使用</span>' : '<span style="padding:0;">已使用</span>');   //券码状态
				$(".ticket").text(obj.checkCode);    //券码
				$(".attendanceStatus").text(objOrderType.attendanceStatus); //订单状态
				$(".orderNumber").text(obj.orderNo) // 订单编号
				if(objOrderType.payMoney) {
					$(".payMoney_tit").text(objOrderType.payMoney);
					$(".payMoney").text(obj.payPrice + "元");  //需付金额
					$("#payType_tit").hide();
				} else {
					$(".payMoney_tit").text("已付金额：");
					$(".payMoney").text(obj.payPrice + "元");  //已付金额
					$(".payType").text('微信'+ obj.payPrice +'元');
				};
				$(".createTime").text(obj.createTime);
				$(".endTime").text(obj.orderUpdateTime);
				$("#telephone").attr("href", "tel:"+ obj.hospitalTel);
				$("#dialMain-first p").text('您确认要拨打'+ obj.hospitalTel +'吗？');
			} else {
				countDown('../../images/dialog-error.png', response.data, goBack);
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	})
};

// 确认收货
$("#confirmReceipt").on("click", function() {
	$("#sureAccept").show();
	$(".promptBtn > a").on("click", function() {
		$("#sureAccept").hide();
	})
	$("#sureAccept .sureBtn").on("click", function() {
		var params = {
			orderNo: orderNo,
			userId: userId,
			token: token
		};
		console.log(params)
		$.ajax({
			type: 'POST',
			url: config.appserver_url + '/personal/receiveGoods.json',
			data: params,
			dataType: 'json',
			conotentType: 'application/json',
			success: function(response) {
				tokenLose(response.status);
				if(response.status == 1) {
					alert("收货成功");
					setTimeout(function(){
						history.back();
					},1000)
				}
			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			}
		})
	})
});



//去评价
$("#evaluate").on("click", function() {
	location.href = "../mine/mineEvaluate.html?hospitalId="+ hospitalId +"&orderNo=" + orderNo;
})

//取消订单
$("#cancelOrder").on("click", function() {
	$("#cancelOrderModel").show();
	$(".promptBtn > a").on("click", function() {
		$("#cancelOrderModel").hide();
	})
	$(".promptBtn > a.sureBtn").on("click", function() {
		cancelOrder();
	})

});

function cancelOrder() {
	var params = {
		token : token,
		cancelCause: $("#leaveWord").val(),
		orderNo: orderNo
	}
	$.ajax({
		type: 'POST',
		url: config.appserver_url + '/order/cancelOrder.json',
		data: JSON.stringify(params),
		dataType: 'json',
		contentType: 'application/json',
		success: function(response) {
			ajaxLoading.hide();
			tokenLose(response.status);
			console.log(response);
			if(response.status == 1) {
				$("#orderMain").css("display", "none")
				$("#modal").css("display", "none")
				$("body").css("overflow","auto")
				countDown(null, '取消成功!', goBack);
			} else {
				alert(response.errorMsg)
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		},
		beforeSend: function() {
			ajaxLoading.show();
		}
	})
}

function attendanceStatus(status) {
	var attendanceStatus = '';
	var payMoney = '';
	switch(status) {
		case 'dfh':
			attendanceStatus = '待发货';
			break;
		case 'yfh':
			attendanceStatus = '已发货';
			break;
		case 'yjs':
			if(this.status == 'dpj') {
				attendanceStatus = '待评价';
			} else if(this.status == 'ywc') {
				attendanceStatus = '已完成';
			} else {
				attendanceStatus = '已收货';
			}
			break;
		case 'dfk':
			attendanceStatus = '待付款';
			payMoney = "需要付款：";
			break;
		case 'ywc':
			if(this.status == 'dpj') {
				attendanceStatus = '待评价';
			} else {
				attendanceStatus = '已完成';
			}
			break;
		case 'yydddfk':
			attendanceStatus = '待付款';
			payMoney = "需要付款：";
			break;
		case 'yydddxf':
			attendanceStatus = '待消费';
			break;
		case 'yyddwc':
			if(this.status == 'dpj') {
				attendanceStatus = '待评价';
			} else {
				attendanceStatus = '已完成';
			}
			break;
		case 'ghdjz':
			attendanceStatus = '待就诊';
			break;
		case 'ghywc':
		case 'tkwc':
			if(this.status == 'dpj') {
				attendanceStatus = '待评价';
			} else {
				attendanceStatus = '已完成';
			}
			break;
		case 'yysmdfk':
			attendanceStatus = '待付款';
			payMoney = "需要付款：";
			break;
		case 'yysmdjd':
			attendanceStatus = '待接单';
			break;
		case 'yysmfwz':
			attendanceStatus = '服务中';
			break;
		case 'yysmywc':
			if(this.status == 'dpj') {
				attendanceStatus = '待评价';
			} else {
				attendanceStatus = '已完成';
			}
			break;
		case 'qxdd':
			attendanceStatus = '已取消';
			$(".patient-information").hide();
			$("#payMoney_tit").hide();
			$("#payType_tit").hide();
			$("#endTime_tit").show();
			$(".submit-button-a").remove();
			break;
	};

	var oOrderType = {
		attendanceStatus: attendanceStatus,
		payMoney: payMoney
	}
	return oOrderType;
}

$("#toMap").on("click", function() {
	location.href = '../location/location.html?default=default&hospitalId='+ hospitalId;
});

$(".qrCode").on("click", function() {
	$(".picWrapper > img").attr("src", checkCodeQRCode);
	$(".picWrapper").show();
});
$(".picWrapper").on("click", function() {
	$(".picWrapper").hide();
})
