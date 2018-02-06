var articleId = GetQueryString("id");
var articleType = GetQueryString("type");
if(articleType == 2) {
	$("title").text("书画摄影");
}

$.ajax({
	type: 'POST',
	url: '/xlhaBeta/information/getInformationById.do',
	data: {
		id: articleId
	},
	dataType: 'json',
	success: function(response) {
		ajaxLoading.hide();
		$("#title").text(response.title);
		$("#content").html(response.content);
		$("#author").text(response.createname);
//		$(".picWrap>img").attr("src",response.image);
		$("#publishTime").text(format(response.createtime));
	},
	error: function() {
		ajaxLoading.hide();
		alert("服务繁忙，请稍后再试");
	},
	completed: function() {
		ajaxLoading.hide();
	},
	beforeSend: function() {
		ajaxLoading.show();	
	}
})

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