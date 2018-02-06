var articleId = GetQueryString("id");

$.ajax({
	type: 'POST',
	url: '/xlhaBeta/politics/getPoliticsById.do',
	data: {
		id: articleId
	},
	dataType: 'json',
	success: function(response) {
		ajaxLoading.hide();
		if(response.id != 0) {
			$("#author").text(response.forgien);
			$("#publishTime").text(response.createTime);
			$("#compile").text(response.editer);
			$("#entering").text(response.create);
			$("#numberCount").text(response.count);
			if(response.type == 0) {
				$("#picTitle").text(response.title);
				$("#picContent").text(response.content);
				$("#pic>img").attr("src","/images/"+response.image);
				$("#pictureWrap").show();
				// 内容渲染
			} else {
				$("#videoTitle").text(response.title);
				$("#videoContent").text(response.content);
				$("#video").attr("src","/video/"+response.video);
				$("#video").attr("type","video/avi");
				$("#videoWrap").show();
				// 内容渲染
			}
		}
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