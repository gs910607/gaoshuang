$(function(){
			videoload();
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
					$(".rightTop .prelection ul li").remove();
			        for(var i=0;i<dt2.length;i++){
		        		var tt='';
		        		tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt2[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
			        	if(dt2[i].videoName.length>18){
			        		tt+='<p class="paragraphLink">'+dt2[i].videoName.substr(0,18)+'...</p>';
			        	}else{
			        		tt+='<p class="paragraphLink">'+dt2[i].videoName+'</p>';
			        	}
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".rightTop .prelection ul").append(tt);
			        }
			        var dt4=req.map3;
			        $(".secTwo2 ul li").remove();
			        for(var i=0;i<dt4.length;i++){
			        	var tt='';
			        	tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt4[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
			        	if(dt4[i].videoName.length>18){
			        		tt+='<p class="paragraphLink">'+dt4[i].videoName.substr(0,18)+'...</p>';
			        	}else{
			        		tt+='<p class="paragraphLink">'+dt4[i].videoName+'</p>';
			        	}
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".secTwo2 ul").append(tt);
			        }
			        var dt5=req.map4;
			        $(".secTwo3  ul li").remove();
			        for(var i=0;i<dt5.length;i++){
			        	var tt='';
			        	tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt5[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
			        	if(dt5[i].videoName.length>18){
			        		tt+='<p class="paragraphLink">'+dt5[i].videoName.substr(0,18)+'...</p>';
			        	}else{
			        		tt+='<p class="paragraphLink">'+dt5[i].videoName+'</p>';
			        	}
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".secTwo3 ul").append(tt);
			        }
			        var dt6=req.map5;
			        $(".secTwoItem3  ul li").remove();
			        for(var i=0;i<dt6.length;i++){
			        	var tt='';
			        	tt+='<li>';
			        	tt+='<a href="javascript:void(0)" onclick="videoTrainDetail(\''+dt6[i].videoId+'\')">';
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
			        	if(dt6[i].videoName.length>18){
			        		tt+='<p class="paragraphLink">'+dt6[i].videoName.substr(0,18)+'...</p>';
			        	}else{
			        		tt+='<p class="paragraphLink">'+dt6[i].videoName+'</p>';
			        	}
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".secTwoItem3 ul").append(tt);
			        }
			        var dt7=req.list;
			        $(".secTwoItem1  ul li").remove();
			        for(var i=0;i<dt7.length;i++){
			        	var tt='';
			        	tt+='<li>';
			        	if(dt7[i].recorderAddr!=null){
			        		tt+='<a href="'+dt7[i].recorderAddr+'" >';
			        	}else{
			        		tt+='<a href="javascript:;" >';
			        	}
			        	tt+='<i class="picIcon"><img src="../../images/fabu-item-icon.png"></i>';
			        	tt+='<p class="paragraphLink">'+dt7[i].name+'</p>';
			        	var timeb=timeAdd(dt7[i].beginTime, dt7[i].duration);
			        	if(dt7[i].status!=1){
			        		if(dt7[i].beginTime>timeb){
			        			tt+='<span class="trainEnd">已结束</span>';
				        	}else if(dt7[i].beginTime<timeb){
				        		tt+='<span class="training">培训中</span>';
				        	}
			        	}else{
			        		tt+='<span class="trainEnd">已结束</span>';
			        	}
			        	tt+='</a>';
			        	tt+='</li>';
			        	$(".secTwoItem1 ul").append(tt);
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