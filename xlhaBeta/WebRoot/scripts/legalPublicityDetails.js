var articleId = GetQueryString("id");

$.ajax({
	type: 'POST',
	url: '../../legal/legVotePlus.do',
	data: {
		cLegalId: articleId
	},
	dataType: 'json',
	success: function(response) {
		ajaxLoading.hide();
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
$.ajax({
	type: 'POST',
	url: '../../legal/getLegalById.do',
	data: {
		id: articleId
	},
	dataType: 'json',
	success: function(response) {
		ajaxLoading.hide();
		if(response.CLegalId != 0) {
			$("#author,#author2").text(response.create);
			$("#publishTime,#publishTime2").text(response.CLegalCreatetime);
			$("#compile, #compile2").text(response.editor);
			$("#entering, #entering2").text(response.create);
			$("#numberCount, #numberCount2").text(response.count);
			if(response.CLegalType == 0) {
				$("#picTitle").text(response.CLegalTitle);
				$("#picContent").text(response.CLegalContent);
				$("#pic>img").attr("src",response.CLegalImage);
				$("#pictureWrap").show();
				// 内容渲染 "/images/"+
			} else {
				$("#videoTitle").text(response.CLegalTitle);
				$("#videoContent").text(response.CLegalContent);
				$("#video").attr("src",response.CLegalVideo);
//				$("#video").attr("type","video/avi");
				$("#videoWrap").show();
				// 内容渲染  "/video/"+

				$("#playBtn").on("click", function(){
					AndroidAction.playVideo(response.CLegalVideo,response.CLegalTitle)
				})
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
});

