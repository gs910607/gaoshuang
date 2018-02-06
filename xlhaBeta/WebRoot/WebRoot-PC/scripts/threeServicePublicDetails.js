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
//		if(response.status != 0) {
			$(".pictureWrap").html(response.content)
//	        uParse('.pictureWrap', {
//	            rootPath: '../'
//	        })
//		}
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