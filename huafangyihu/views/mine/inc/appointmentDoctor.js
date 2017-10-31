// JavaScript Document
var user;
var token;
var userId;
var type = 6;  //订单类型
var status = 'ghdjz'; // 订单状态
var pageNo = 1;
var pageSize = 7;

getItem();
init();

$(".otherType-list a:contains(预约挂号)").css("color", "#EC9E07");

$("#model").hide();
$(".otherType").hide();
//下拉框弹出
$(".newItem").on("click", function() {
	$(".pull-down-black>img").css("transform", "rotate(180deg)");
	$(this).hide()
	$(".pullDownList").show();

	var height = $(window).height();
	$("#model").show();
	$(".otherType").show();
	var headerHeight = $(".otherType").height() - 1;
	var remainingHeight = height - headerHeight;
	$("#model").height(remainingHeight);
	$("#model").css("margin-top", headerHeight);
	$("body").css("overflow", "hidden");
	$("#model").on("click", function() {
		$(this).hide();
		$(".otherType").hide();
		$("body").css("overflow", "auto");
	})
});
$(".pullDownList").on("click", function() {
	$(this).hide()
	$(".newItem").show();
	$("#model").hide();
	$(".otherType").hide();
	$(".pull-down-black>img").css("transform", "rotate(0)");
})

function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
	userId = user.userId;
}

$(".otherType-list:contains(预约就诊)").css("color", "#EC9E07");
//下拉框折叠
//var outpatientTheme = $("#outpatientTheme").text();
//if(outpatientTheme == "商品购买") {
//	$(".otherType-list").eq(3).css("color", "#EC9E07");
//}

var orderType = {
	"ghdjz" : {"indentStatus" : "待就诊", "order" : "取消预约", "payment" : "联系诊所"},
	"ywc" : {"indentStatus" : "服务完成", "order" : "联系客服", "payment" : ""},
	"dpj"   : {"indentStatus" : "待评价", "order" : "联系客服", "payment" : "去评价"},
};


		$(".titleTop-list").on("click", function() {
			pageNo = 1;
			pageSize = 7;
			$("#contentList").html("")
			var $this = $(this);
			$this.find(".titleTop-list-state").addClass("default-status").parent().siblings().find(".titleTop-list-state").removeClass("default-status")
			status = $this.data("status");
			init();
		});
	function init() {
		var params = {
			token: token,
			userId: userId,
			type: type,
			status: status,
			// payStatus: payStatus,
			pageNo: pageNo,
			pageSize: pageSize
		}
		$.ajax({
			type: 'GET',
			url: config.appserver_url + '/personal/queryMyAppiontment.json',
			dataType: 'json',
			contentType: 'application/json',
			data: params,
			success: function(response) {
				console.log(response)
				tokenLose(response.status);
				var data = response.data;
				for(var i=0; i<data.length; i++) {
					var str = '';
					var obj = data[i];
					var timer = obj.serviceTime;
					var date = formattingDate(timer);
					var time = formattingTimer(timer);
					str += '<li class="indent-list">';
			     	str += '	<div class="indent-title-status">';
			     	str += '		<span class="indent-serial">';
			     	str += '			 <span class="indent-serial-title">订单编号：</span>';
			     	str += '			 <span class="indent-serial-number">'+ obj.orderNo +'</span>';
			     	str += '		</span>';
			     	str += '		<span class="indent-status">'+ orderType[status].indentStatus +'</span>';
			     	str += '	</div>';
			     	str += '	<div class="service" data-status="'+ obj.status +'">';
			     	str += '		<div class="service-item">';
			     	str += '			<span class="service-title">服务项目：</span>';
			     	str += '			<span class="service-name">'+ obj.serviceItemName +'</span>';
			     	str += '		</div>';
			     	str += '		<div class="service-item">';
			     	str += '			<span class="service-title">提供服务：</span>';
			     	str += '			<span>';
			     	str += '				<span>'+ obj.hosName +'</span>';
			     	str += '			</span>';
			     	str += '		</div>';
		        str += '        <div class="service-item">';
		        str += '            <span class="service-title">就诊医生：</span>';
		        str += '            <span>由当天出诊医生看诊</span>/';
		        str += '            <span>'+ obj.docName +'</span>';
		        str += '        </div>';
			     	str += '		<div class="service-item">';
			     	str += '			<span class="service-title">就诊人：&#x3000;</span>';
			     	str += '			<span>';
			     	str += '				<span>'+ obj.peopleName +'</span>';
			     	str += '			</span>';
			     	str += '		</div>';
			     	str += '		<div class="service-item">';
			     	str += '			<span class="service-title">预约时间：</span>';
			     	str += '			<span>';
			     	str += '				<span>'+ date +'</span> /';
			     	str += '				<span>'+ time +'</span>';
			     	str += '			</span>';
			     	str += '		</div>';
			     	str += '		';
			     	str += '	</div>';
			     	str += '	<div class="relation">';
			     	str += '		<span class="relation-price">￥'+ obj.orderPrice +'</span>';
			     	str += '		<div class="relation-subscribe">';
			     	str += '			<span class="relation-subscribe-item" data-status="'+ obj.status +'">'+ orderType[status].order +'</span>';
			     	orderType[status].payment ? str += '			<span class="relation-subscribe-item" data-status="'+ obj.status +'" data-doctorid="'+ obj.doctorId +'">'+ orderType[status].payment +'</span>' : '';
			     	str += '		</div>';
			     	str += '		<div class="clear"></div>';
			     	str += '	</div>';
			     	str += '</li>';
						$("#contentList").append(str);
				};

				$("span:contains(立即付款)").on("click", function() {
					location.href = '../myClinic/payment.html?id1='+ type +'&orderNo='+ $(this).closest(".indent-list").find(".indent-serial-number").text();
				});
				$("span:contains(取消预约)").on("click", function() {
					var status = $(this).data("status");
					location.href = "../medic/bookingDetails.html?id1="+ type +"&status="+ status +"&orderNo="+ $(this).closest(".indent-list").find(".indent-serial-number").text();
				})
				$(".service").on("click", function() {
					var status = $(this).data("status");
					location.href = "../medic/bookingDetails.html?id1="+ type +"&status="+ status +"&orderNo="+ $(this).parent().find(".indent-serial-number").text();
				})
				$("span:contains(联系诊所)").on("click", function() {
					var status = $(this).data("status");
					location.href = "../medic/bookingDetails.html?id1="+ type +"&status="+ status +"&orderNo="+ $(this).closest(".indent-list").find(".indent-serial-number").text();
				});
				// 联系客服弹窗
				$("span:contains(联系客服)").on("click", function() {
					 $("#callPhone").show();
					 $(".promptBtn > a").on("click", function() {
						 $("#callPhone").hide();
					 })
				});

				$("span:contains(去评价)").on("click", function() {
					var doctorId = $(this).data("doctorid");
          window.location.href="mineEvaluate.html?doctorId="+doctorId + "&orderNo="+ $(this).closest(".indent-list").find(".indent-serial-number").text();
				});

				$(".appointmentDoctor")
			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			},
			beforeSend: function() {
				$(".noMore").hide();
				$(".ajaxLoading").show();
			},
			complete: function() {
				$(".noMore").show();
				$(".ajaxLoading").hide();
			}
		})
}


function formattingDate(timer) {
	var date = new Date(timer);
	var years = date.getFullYear();
	var months = date.getMonth() + 1;
	var days = date.getDay();
	return years+"年"+months+"月"+ days+"日";
};

function formattingTimer(timer) {
	var date = new Date(timer);
	var hours = date.getHours();
	var minute = date.getMinutes();
	// var seconds = date.getSeconds();
	return hours+":"+checkTime(minute);
}

function checkTime(timer) {
	return timer < 10 ? '0' + timer : timer;
}

//下拉加载更多
var stop = true;
$(window).scroll(function() {
	totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
	if($(document).height() <= totalheight) {
		if(stop == true) {
			stop = false;
			pageNo++;
			//如果少于6条不发送请求
			if(dataListLenght < 7) {

			} else {
				init();
			}
			stop = true;
		}
//			$("#bottom").show();
	}
});
