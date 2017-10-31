var removeh = GetQueryStr("removeh");
if(removeh) {
	$(".titleTop").hide();
};
//咨询状态
var userId;
var type = 3;
var pageNo = 1;
var pageSize = 7;
var token;
var orderStatus = 1;
var dataListLenght;

getItem();
init();

var orderType = {
	"1": {
		"indentStatus": "咨询中",
		"ifshow": "none"
	},
	"2": {
		"indentStatus": "待回复",
		"ifshow": "none"
	},
	"3": {
		"indentStatus": "已完成",
		"ifshow": "block"
	},
	"4": {
		"indentStatus": "待评价",
		"ifshow": "block"
	},
};
// 初始化渲染
	$(".titleTop-list").on("click", function() {
		pageNo = 1;
		pageSize = 7;
		$(".counselAll").html("");
		var $this = $(this);
		$this.find(".titleTop-list-state").addClass("default-status").parent().siblings().find(".titleTop-list-state").removeClass("default-status")
		orderStatus = $this.data("status");
		init();
	});

	function init() {
		var params = {
			userId: userId,
			orderStatus: orderStatus,
			pageNo: pageNo,
			pageSize: pageSize,
			token: token
		};
		$.ajax({
			type: "POST",
			url: config.appserver_url + '/personal/getConsultingOrder.json',
			dataType: 'json',
			data: params,
			success: function(response) {
				console.log(response.data)
				tokenLose(response.status);
				var data = response.data;
				var arrindentStatus = [];
				var dataArrindentStatus;
				for(var i = 0; i < data.length; i++) {
					dataListLenght = data.length;
					var str = '';
					var obj = data[i];
					arrindentStatus.push(orderType[orderStatus].indentStatus)
					// if(arrindentStatus[0] == "咨询中") {
					// 	dataArrindentStatus = "1";
					// 	inquiryClick();
					// } else {
					// 	dataArrindentStatus = "2";
					// }
					str += '<li class="counselAll-list" data-doctorId=' + obj.doctorId + '>';
					str += '    <div class="counselAll-list-title">';
					str += '    <span class="indentContent">';
					str += '        <div class="indentNumber">';
					str += '            <span>订单编号：</span>';
					str += '            <span>' + obj.orderNo + '</span>';
					str += '        </div>';
					str += '        <div class="indentTime">';
					str += '            <span>创建时间：</span>';
					str += '            <span>' + formattingDate(obj.createTime) + '</span>';
					str += '        </div>';
					str += '    </span>';
					str += '    <span class="consult-state">';
					str += '        <span>' + arrindentStatus[0] + '</span>';
					str += '    </span>';
					str += '    </div>';
					str += '    <div class="inquiry" data-orderStatus="'+ obj.orderStatus +'" data-orderNo="' + obj.orderNo + '" data-targetId="' + obj.doctorPhone + '">';
					str += '        <img class="askImg" src="../../images/ask.png"/>';
					str += '        <div class="inquiry-questioning">';
					str += '            <span class="inquiry-questioning-title details">' + obj.consultingtTitle + '</span>';
					str += '            <span class="inquiry-questioning-content details">' + obj.consultingtTitle + '</span>';
					str += '        </span>';
					str += '    </div>';
					str += '    </div>';
					str += '    <div class="doctor-message">';
					str += '        <span class="doctor-message-content">';
					str += '        <span>' + obj.doctorName + ' /</span>';
					str += '        <span>' + obj.doctorProfessional + ' /</span>';
					str += '        <span>' + obj.doctorDepartment + '</span>';
					str += '        </span>';
					if(orderStatus == 3) {} else {
						str += '        <span class="await-evaluate" data-orderNo="' + obj.orderNo + '" data-doctorId=' + obj.doctorId + ' style="display: ' + orderType[orderStatus].ifshow + ';">';
						str += '            去评价';
						str += '        </span>';
					}
					str += '    </div>';
					str += '</li>';
					$(".counselAll").append(str);

					$(".inquiry").on("click", function() {
						var orderStatus = $(this).data("orderstatus");
						if(orderStatus == "zxz" || orderStatus == "zxdh") {
							doctorId = $(this).parent(".counselAll-list").attr("data-doctorId")
							var orderNo = $(this).attr("data-orderNo");
							var targetId = $(this).attr("data-targetId");
							sessionStorage.setItem("doctorId", doctorId);
							sessionStorage.setItem("serviceOrder", orderNo);
							sessionStorage.setItem("targetId", targetId);
							historyForward("../msg/message1.html");
						}
					});
				};



				$(".await-evaluate").on("click", function() {
					var doctorId = $(this).attr("data-doctorid");
					var orderNo = $(this).attr("data-orderNo");
					var pramas = "doctorId=" + doctorId + "&orderNo=" + orderNo;
					historyForward("../mine/mineEvaluate.html?" + pramas)
				})
			},
			error: function() {
				alert('服务繁忙，请稍后再试！');
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
};

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
};

// 格式化时期
function formattingDate(timer) {
	var date = new Date(timer);
	var years = date.getFullYear();
	var months = date.getMonth() + 1;
	var days = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	return years + "-" + checkTime(months) + "-" + checkTime(days) + " " + hours + ":" + checkTime(minutes);
};

function checkTime(timer) {
	return timer < 10 ? '0' + timer : timer;
};

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
