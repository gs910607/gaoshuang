$(function(){
			videoload();
			//村 进入 goBack直接关闭窗口
			var infodata = JSON.parse(localStorage.info||null);

			if(infodata && infodata.usergroupid.toString().length == 9) {
				$(".goBack > a").attr("href","../index.html");
			} else {
				$("header h1 > a").attr("href", "videoTrainNav.html");
				$(".goBack > a").attr("href","javascript:history.back();");
			}
		});
function videoload(){
			$.ajax({
			    url:"/spywBeta/videoTraining/train.do",    //请求的url地址
			    dataType:"json",   //返回格式为json
			    data:{},    //参数值
			    type:"post",   //请求方式
			    success:function(req){
			    	ajaxLoading.hide();
			        //请求成功时处理
			    	var dt1=req.map1;
			        for(var i=0;i<dt1.length;i++){
			        	$(".secOneLeft video").prop('src',dt1[i].videoPath);
// 			        	$(".secOneLeft").show();
			        }
					var dt2=req.map2;
					dt2 = dt2.slice(0,4);
					$(".rightTop .prelection ul li").remove();
			        for(var i=0;i<dt2.length;i++){
		        		var tt='';
		        		tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt2[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
		        		tt+='<p class="paragraphLink">'+dt2[i].videoName+'</p>';
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".rightTop .prelection ul").append(tt);
			        }
			        var dt4=req.map3;
			        dt4 = dt4.slice(0,7);
			        $(".secTwo2 ul li").remove();
			        for(var i=0;i<dt4.length;i++){
			        	var tt='';
			        	tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt4[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
		        		tt+='<p class="paragraphLink">'+dt4[i].videoName+'</p>';
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".secTwo2 ul").append(tt);
			        }
			        var dt5=req.map4;
			        dt5 = dt5.slice(0,7);
			        $(".secTwo3  ul li").remove();
			        for(var i=0;i<dt5.length;i++){
			        	var tt='';
			        	tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt5[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
		        		tt+='<p class="paragraphLink">'+dt5[i].videoName+'</p>';
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".secTwo3 ul").append(tt);
			        }
			        var dt6=req.map5;
			        dt6 = dt6.slice(0,7);
			        $(".secTwoItem3  ul li").remove();
			        for(var i=0;i<dt6.length;i++){
			        	var tt='';
			        	tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt6[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
		        		tt+='<p class="paragraphLink">'+dt6[i].videoName+'</p>';
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".secTwoItem3 ul").append(tt);
			        }
			    },
			    beforeSend: function() {
			    	ajaxLoading.show();
			    },
			    error: function() {
			    	ajaxLoading.hide();
			    }
			});

		}
function videoTrainDetail(videoId){
	window.location.href="/spywBeta/videoTraining/videotrainDetailjoin.do?videoId="+videoId;
//	$.ajax({
//	    url:"/spywBeta/videoTraining/videoTrainDetail.do",    //请求的url地址
//	    dataType:"json",   //返回格式为json
//	    data:{"videoId":videoId},    //参数值
//	    type:"post",   //请求方式
//	    success:function(req){
//	    	alert(req.videoTrain);
//	    }
//	});
	
}
function videoTrainadd(){
	window.location.href="/spywBeta/pages/videoTraining/postVideos.html";
}

function timeAdd(createTime, duration) {
	createTime = new Date(createTime).getTime();
	duration = new Date(duration*60*60*1000).getTime();
	return new Date(createTime + duration).getTime();
}

$(window).scroll(function(){
	currentScroll();
});

currentScroll();
function currentScroll(){
	if($(this).scrollTop() >= 80) {
		$(".goBack").css({
			"position":"fixed",
			"top":"10px"
		})
	} else {
		$(".goBack").css({
			"position":"absolute",
			"top":"90px"
		})
	}
};