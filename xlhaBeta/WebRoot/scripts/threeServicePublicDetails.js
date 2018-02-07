// var user = JSON.parse(sessionStorage.getItem("user")) || null;

// user ? '' : location.href = "../../../../index.html";

var articleId = GetQueryString("id");

$.ajax({
	type: 'POST',
	url: '/xlhaBeta/threeService/getInfoById.do',
	data: {
		id: articleId
	},
	dataType: 'json',
	success: function(response) {
		ajaxLoading.hide();

		if(response == null) {
			alert(config.errorArticleMsg);

			setTimeout(function(){
				location.href = "../../index.html"
			},1000);

			return;
		}
		
		$(".pictureWrap").html(response.content)
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