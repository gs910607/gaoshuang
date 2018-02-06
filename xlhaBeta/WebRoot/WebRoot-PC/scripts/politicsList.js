var title = '';
var startTime = new Date("1970-01-01");
var endTime = new Date(new Date().setFullYear(new Date().getFullYear()+50,0,1));

var titleName = GetQueryString("type");
if(titleName == 1) {
	$("title, .contTitle h2").text("政法新闻");
	url="/xlhaBeta/information/getPublish.do";
	searchUrl="/xlhaBeta/information/getPublish.do?pages="
} else if(titleName == 2) {
	url="/xlhaBeta/information/getDraw.do";
	searchUrl="/xlhaBeta/information/getDraw.do?pages="
	$("title, .contTitle h2").text("书画摄影");
};
$.post(url,{sizePage: config.sizePage}, function(data) {
	getInformation(data);
}, "json");

function getInformation(data) {

Page({
	num : data.num, //页码数
	startnum : 1, //指定页码
	elem : $('#page2'), //指定的元素
	callback : function(n) { //回调函数
		$.post(searchUrl + n,{sizePage: config.sizePage}, function(data) {
			setInformation(data);
		}, "json");
	}
});
setInformation(data);
}

function getSearchInformation(data) {
Page({
	num : data.num, //页码数
	startnum : 1, //指定页码
	elem : $('#page2'), //指定的元素
	callback : function(n) { //回调函数
		$.post(searchUrl + n, {
			sizePage: config.sizePage,
			title : title,
			startTime : startTime,
			endTime : endTime
		}, function(data) {
			setInformation(data);
		}, "json");
	}
});
setInformation(data);
}

function setInformation(data) {
	$("#content").text("");
	$(data.list).each(function(i, n) {
		$("#content").append("<tr><td class='text-left'><a href='politicsDetails.html?type="+ titleName +"&id=" + n.informationid + "'>· " + n.title + "</a></td><td width='120'>" + format(n.createtime) + "</td></tr>");
	});
}

$("#search").on("click", function() {
	title = $("#title").val();

	startTime = $("#startTime").val() ? new Date($("#startTime").val()) : new Date('1970-01-01');
	endTime = $("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate()+1)) : new Date(new Date().setFullYear(new Date().getFullYear()+50,0,1));

	if($("#endTime").val() && $("#startTime").val() > $("#endTime").val()) {
		$("#endTime").testRemind("结束时间不得小于开始时间");
		return;
	}

	$.post(url, {
		sizePage: config.sizePage,
		title : title,
		startTime : startTime,
		endTime : endTime
	}, function(data) {
		getSearchInformation(data);
	}, "json");



});

function add0(m) {
	return m < 10 ? '0' + m : m
}
function format(timestamp) {
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	return year + '-' + add0(month) + '-' + add0(date);
}