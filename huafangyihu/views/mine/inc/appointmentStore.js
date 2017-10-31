// JavaScript Document
var user;
var token;
var userId;
var type = 3;  //订单类型
var status = 'yydddfk'; // 订单状态
var pageNo = 1;
var pageSize = 7;
var dataListLenght;
getItem();
init();

$("#model").hide();
$(".otherType").hide();
//下拉框弹出
$(".newItem").on("click", function() {
	$(".pull-down-black>img").css("transform", "rotate(180deg)");
	$(this).hide();
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
	$(this).hide();
	$(".newItem").show();
	$("#model").hide();
	$(".otherType").hide();
	$(".pull-down-black>img").css("transform", "rotate(0)");
})
//下拉框折叠

var outpatientTheme = $("#outpatientTheme").text();
if(outpatientTheme == "预约到店") {
	$(".otherType-list").eq(1).css("color", "#EC9E07");
/*	$(".otherType-list").eq(1).css({
		"border-bottom": "1px solid #DFDFDF",
		"border-top": "1px solid #DFDFDF"
	})*/
}


function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
	userId = user.userId;
}

var orderType = {
	"yydddfk" : {"indentStatus" : "待付款", "order" : "取消订单", "payment" : "立即付款"},
	"yydddxf" : {"indentStatus" : "待消费", "order" : "取消预约", "payment" : "联系医护"},
	"ywc"  : {"indentStatus" : "已完成", "order" : "", "payment" : "联系客服"},
	"dpj"     : {"indentStatus" : "待评价", "order" : "联系客服", "payment" : "去评价"},
};


	$(".titleTop-list").on("click", function() {
		pageNo = 1;
		pageSize = 7;
		$("#contentList").html("");
		var $this = $(this);
		$this.find(".titleTop-list-state").addClass("default-status").parent().siblings().find(".titleTop-list-state").removeClass("default-status")

		status = $this.data("status");
		// payStatus = $this.data("pay");
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
		console.log(params)
		$.ajax({
			type: 'GET',
			url: config.appserver_url + '/personal/queryMyAppiontment.json',
			dataType: 'json',
			contentType: 'application/json',
			data: params,
			success: function(response) {
				console.log(response.data)
				tokenLose(response.status);
				var data = response.data;
				dataListLenght = data.length;

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
			     	str += '				<span>'+ obj.hosName +'</span> <!-- /';
			     	str += '				<span>'+ obj.docName +'</span> -->';
			     	str += '			</span>';
			     	str += '		</div>';
			     	str += '		<div class="service-item">';
			     	str += '			<span class="service-title">受诊人：&#x3000;</span>';
			     	str += '			<span>';
			     	str += '				<span>'+ obj.peopleName +'</span> <!-- /';
			     	str += '				<span>'+ obj.sex +'</span> /';
			     	str += '				<span>'+ obj.peopleAge +'岁</span> /';
			     	str += '				<span>'+ obj.mobile +'</span> -->';
			     	str += '			</span>';
			     	str += '		</div>';
			     	str += '		<div class="service-item">';
			     	str += '			<span class="service-title">预约时间：</span>';
			     	str += '			<span>';
			     	str += '				<span>'+ date +'</span> /';
			     	str += '				<span>'+ time +'</span>';
			     	str += '			</span>';
			     	str += '		</div>';
			     	str += '	</div>';
			     	str += '	<div class="relation">';
			     	str += '		<span class="relation-price">￥'+ obj.orderPrice +'</span>';
			     	str += '		<div class="relation-subscribe">';
			     	orderType[status].order ? str += '			<span class="relation-subscribe-item" data-status="'+ obj.status +'">'+ orderType[status].order +'</span>' : '';
			     	str += '			<span class="relation-subscribe-item" data-docPhone="'+obj.docPhone+'" data-status="'+ obj.status +'" data-hospitalId="'+ obj.hospitalId +'">'+ orderType[status].payment +'</span>';
			     	str += '		</div>';
			     	str += '		<div class="clear"></div>';
			     	str += '	</div>';
			     	str += '</li>';
						$("#contentList").append(str);
				};

				$("span:contains(立即付款)").on("click", function() {
					var orderNo = $(this).closest(".indent-list").find(".indent-serial-number").text();
					location.href = '../myClinic/payment.html?id1=3&orderNo=' + orderNo;
				});
				$(".service").on("click", function() {
					var status = $(this).data("status");
					location.href = "../medic/bookingDetails.html?id1=3&status="+ status +"&orderNo="+ $(this).closest(".indent-list").find(".indent-serial-number").text();
				})
				$("span:contains(取消预约)").on("click", function() {
					var status = $(this).data("status");
					location.href = "../medic/bookingDetails.html?id1=3&status="+ status +"&orderNo="+ $(this).closest(".indent-list").find(".indent-serial-number").text();
				})
				$("span:contains(取消订单)").on("click", function() {
					var status = $(this).data("status");
					var orderNo = $(this).closest(".indent-list").find(".indent-serial-number").text();
					location.href = "../medic/bookingDetails.html?id1=3&status="+ status +"&orderNo=" + orderNo;
				});
//				$("span:contains(联系医护)").on("click", function() {
//					var status = $(this).data("status");
//					var orderNo = $(this).closest(".indent-list").find(".indent-serial-number").text();
//					
////					location.href = '../myClinic/payment.html?id1=3&status='+ status +'&orderNo=' + orderNo;
//				});
				// 联系医护弹窗
				$("span:contains(联系医护)").on("click", function() {
					 $("#callPhone").show();
//					 $(".promptContent>p").text("暂无医护联系方式")
					 $(".promptBtn > a").on("click", function() {
						 $("#callPhone").hide();
					 })
				});

				// 联系客服弹窗
				$("span:contains(联系客服)").on("click", function() {
					var docPhone = $(this).data("docPhone");
					 $("#callPhone").show();
					 $(".promptContent>h4").text(docPhone)
					 $(".promptBtn > a").on("click", function() {
						 $("#callPhone").hide();
					 })
				});

				$("span:contains(去评价)").on("click", function() {
					var hospitalId = $(this).attr("data-hospitalid")
					var orderNo = $(this).closest(".indent-list").find(".indent-serial-number").text();
          window.location.href="mineEvaluate.html?hospitalId="+hospitalId + "&orderNo=" + orderNo ;
				});
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


function formattingDate(e) {
	//时间戳是整数，否则要parseInt转换
	var time = new Date(e);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '年' + add0(m) + '月' + add0(d)+ '日';
};

function formattingTimer(e) {
	//时间戳是整数，否则要parseInt转换
	var time = new Date(e);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return add0(h) + ':' + add0(mm) + ':' + add0(s);
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
