var articleId = GetQueryString("articleId");
$.ajax({
	type: 'post',
	url: '/xlhaBeta/safenessPublicity/safetyPublicityVote.do',
	data: {
		safetyPyId: articleId
	},
	dataType: 'json',
	success: function(req) {
		if(req.status==0){
			console.log("vote-success");
		}else{
			console.log("vote-error");
		}
	}
});
$.ajax({
	type: 'post',
	url: '/xlhaBeta/safenessPublicity/safetyPublicityDetail.do',
	data: {
		safetyPyId: articleId
	},
	dataType: 'json',
	success: function(response) {
		ajaxLoading.hide();
		if(response.status == 0) {
			if(response.SafetyPublicity.safetyPyType == 0) {
				$("#pictureWrap").show();
				// 内容渲染 response.path+"/"+
				$("#pictureWrap .picWrap img").prop("src",response.SafetyPublicity.safetyPyPath);
				$("#pictureWrap h3").text(response.SafetyPublicity.safetyPyName);
				$("#pictureWrap p").text(response.SafetyPublicity.safetyPyRemark);
				$("#author").text(response.SafetyPublicity.safetyPyAuther);
				$("#publishTime").text(new Date(response.SafetyPublicity.safetyPyTime).format("yyyy-MM-dd"));
				$("#compile").text(response.SafetyPublicity.safetyPyEditusername);
				$("#entering").text(response.SafetyPublicity.safetyPyUserName);
				$("#numberCount").text(response.SafetyPublicity.safetyPyViewcount);
			} else {
				$("#videoWrap").show();
				// 内容渲染
				// $("#videoWrap .videoLeft video").prop("src",response.SafetyPublicity.safetyPyPath);
				$(".contTitle h2").text(response.SafetyPublicity.safetyPyName);
				$(".videoRight p").text(response.SafetyPublicity.safetyPyRemark);
				$("#author2").text(response.SafetyPublicity.safetyPyAuther);
				$("#publishTime2").text(new Date(response.SafetyPublicity.safetyPyTime).format("yyyy-MM-dd"));
				$("#compile2").text(response.SafetyPublicity.safetyPyEditusername);
				$("#entering2").text(response.SafetyPublicity.safetyPyUserName);
				$("#numberCount2").text(response.SafetyPublicity.safetyPyViewcount);

				$("#playBtn").on("click", function(){
					AndroidAction.playVideo(response.SafetyPublicity.safetyPyPath,response.SafetyPublicity.safetyPyName)
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
