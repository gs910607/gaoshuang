// JavaScript Document

//顶部栏状态切换
$(".titleTop-list-state").on("click", function() {
	// $(".titleTop-list-state").css({
	// 	"color": "black",
	// 	"border-bottom": "0"
	// });
	// $(this).css({
	// 	"color": "#EC9E07",
	// 	"border-bottom": "2px solid #EC9E07"
	// });
	// var consultStatus = $(this).text();
	// if(consultStatus == "待就诊") {
	// 	$(".indent-status").text("待就诊");
	// 	$(".indent-status").css("color", "#EC9E07")
	// 	$(".relation-subscribe-item").eq(0).text("取消预约");
	// 	$(".relation-subscribe-item").eq(1).text("联系诊所");
	// };
	// if(consultStatus == "待接单") {
	// 	$(".indent-status").text("待接单");
	// 	$(".indent-status").css("color", "#EC9E07")
	// 	$(".relation-subscribe-item").eq(0).text("取消预约");
	// 	$(".relation-subscribe-item").eq(1).text("联系医护");
	// };
	// if(consultStatus == "服务中") {
	// 	$(".indent-status").text("服务中")
	// 	$(".indent-status").css("color", "#EC9E07")
	// 	$(".relation-subscribe-item").eq(0).text("取消预约");
	// 	$(".relation-subscribe-item").eq(1).text("联系医护");
	// };
	// if(consultStatus == "已完成") {
	// 	$(".indent-status").text("服务完成")
	// 	$(".indent-status").css("color", "#999999")
	// 	$(".relation-subscribe-item").eq(0).text("联系客服");
	// 	$(".relation-subscribe-item").eq(1).text("去评价");
	// };
	// if(consultStatus == "待评价") {
	// 	$(".indent-status").text("服务完成")
	// 	$(".indent-status").css("color", "#999999")
	// 	$(".relation-subscribe-item").eq(0).text("联系客服");
	// 	$(".relation-subscribe-item").eq(1).text("去评价");
	// };

})
$("#model").hide();
//$(".otherType").hide();
//下拉框弹出
$(".newItem").on("click", function() {
	$(".pull-down-black>img").css("transform", "rotate(180deg)");
	$(this).css("display", "none")
	$(".pullDownList").css("display", "block");

	var height = $(window).height();
	$("#model").show();
	$(".otherType").show();
	var headerHeight = $(".otherType").height() - 1;
	console.log(headerHeight)
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
	$(this).css("display", "none")
	$(".newItem").css("display", "block");
	$("#model").hide();
	$(".otherType").hide();
	$(".pull-down-black>img").css("transform", "rotate(0)");
})
//下拉框折叠

var outpatientTheme = $("#outpatientTheme").text();
console.log(outpatientTheme)
if(outpatientTheme == "收支明细") {
//	$(".otherType-list").eq(0).css("color", "#EC9E07");

}

var userId;
var type = 0;
var pageNo = 1;
var pageSize = 7;
var token;
var typeID;

$(".otherType-list").on("click", function() {
	//$(".otherType").hide();
	//$("#model").hide();
	//$(".pull-down-black>img").css("transform", "rotate(0)");
	typeID = $(this).data("id")
	console.log(typeID)
	sessionStorage.setItem("type", typeID);
})

var typeList = sessionStorage.getItem("type");
if(typeList) {
	type = typeList;
} else {
	type = 0;
}
//$(".otherType-list").eq(0).css("color", "#EC9E07");
$(".otherType-list").css("color", "#9999");
if(type ==0){
	$(".outpatientTheme-title").text('全部明细');
//	$(".otherType-list").css("color", "#9999");
		$(".otherType-list").eq(0).css("color", "#EC9E07");
};
if(type ==1){
	$(".outpatientTheme-title").text('收入明细')
//		$(".otherType-list").css("color", "#9999");
		$(".otherType-list").eq(1).css("color", "#EC9E07");
};
if(type ==2){
	$(".outpatientTheme-title").text('支出明细')
//		$(".otherType-list").css("color", "#9999");
	
		$(".otherType-list").eq(2).css("color", "#EC9E07");
};
console.log(typeList)
getItem();
init();

function init() {
	var params = {
		userId: userId,
		type: type,
		pageNo: pageNo,
		pageSize: pageSize,
		token: token
	};
	console.log(params)
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/personal/getIncomeStatisticsDetails.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(data) {
			console.log(data.data[0])

			//遍历提现模板
			var withdrawList = $(".record_list_ul").html();
			for(var i = 0; i < data.data.length; i++) {
				withdrawList += '<li class="record_list_li" data-type="' + data.data[i].type + '">';
				withdrawList += '<div class="record_list_li_left">';
				withdrawList += '<h6 class="record_list_li_left_h6">' + data.data[i].info + '</h6>';
				withdrawList += ' <p class="record_list_li_left_p">' + data.data[i].time + '</p>';
				withdrawList += '</div>';
				withdrawList += '<div class="record_list_li_right">';
				withdrawList += '<h6 class="record_list_li_right_h6">-' + data.data[i].amount + '</h6>';
				withdrawList += '<p class="record_list_li_right_p">' + data.data[i].name + '</p>';
				withdrawList += '</div>';
				withdrawList += '</li>';
			}
			$(".record_list_ul").html(withdrawList);
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