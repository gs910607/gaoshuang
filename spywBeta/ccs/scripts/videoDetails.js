$(function(){
	videoDetailload();
});
function videoDetailload(){
	var videoId=GetQueryString("videoId");
	$.ajax({
	    url:"/spywBeta/videoTraining/videoTrainDetail.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:{"videoId":videoId},    //参数值
	    type:"post",   //请求方式
	    success:function(req){
//	    	alert(req.videoTrain);
			if(req.videoTrain == null) {
				alert(config.errorArticleMsg);
	    		setTimeout(function(){
	    			location.href = 'videoTrainNav.html';
	    		},1000);

	    		return;
			}

	    	$(".articleWrap .artTitle").text(req.videoTrain.videoName);
	    	$(".articleWrap .videoDes").text(req.videoTrain.videoRemark);
	    	$(".articleWrap .videoWrap video").prop("src",req.videoTrain.videoPath);
	    }
	});
}