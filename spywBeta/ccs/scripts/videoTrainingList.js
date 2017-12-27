
$(function(){
	var type=GetQueryString("type");
	var data={"type":type,"pagesize":1,"firstVisit":"1"};
	videotraintype(data,1);
});

function getArticleId(articleID) {

}
$("#searchBtn").on("click", function() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	if(endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得小于开始时间");
		return;
	}

	VideolistSearch(1);
})

function VideolistSearch(pagesize){
	var type=GetQueryString("type");
	//var type=/<%=request.getParameter("type")%>/;
	var videoCode='';
	var district=$("#district").val();
	if(district!=null && district!=""){
		videoCode=district;
	}
	var county=$("#county").val();
	if(county!=null && county!=""){
		videoCode=county;
	}
	var village=$("#village").val();
	if(village!=null && village!=""){
		videoCode=village;
	}
	var videoName=$("#exampleInputName2").val();
	var videoTime=$("#startTime").val();
	var stopTime=$("#endTime").val();
	var data={"type":type,"pagesize":pagesize,"videoName":videoName,"firstVisit":videoCode,"videoCode":videoCode,"videoTime":videoTime,"stopTime":stopTime};
	videotraintype(data,pagesize);
}
function videotraintype(data,pagesize){
	$.ajax({
	    url:"/spywBeta/videoTraining/videotrainlistjoin.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:data,    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	var list=req.list;
	    	var pagetotal=req.total;
	    	$(".infoList table tbody tr").remove();
	    	new selectArea('body',{
				data: req.code
			});
	    	var info = JSON.parse(localStorage.getItem("info"));
	        for(var i=0;i<list.length;i++){
	        	var text='';
	        	text+='<tr>';
	        	text+='<td></td>';
	        	text+='<td><p class="artTitle"><a href="/spywBeta/pages/videoTraining/videoDetails.html?videoId='+list[i].videoId+'">'+list[i].videoName+'</a></p></td>';
	        	text+='<td align="center">'+list[i].videorealName+'</td>';
	        	if(list[i].videoCode==1){
	        		text+='<td align="center">淮安市</td>';
	        	}else{
	        		if(list[i].areainfo!=null){
	        			text+='<td align="center">'+list[i].areainfo.name+'</td>';
	        		}else{
	        			text+='<td align="center"></td>';
	        		}
	        	}
	        	text+='<td align="center">'+new Date(list[i].videoTime).format("YYYY-MM-dd")+'</td>';
	        	if (info.usergroupid.toString().length <9) {
		        	text+='<td align="center" class="operation">';
		        	if(info.usergroupid.toString()==list[i].videoCode && info.usergroupid.toString()!=1){
		        		text+='<a class="modification" href="/spywBeta/pages/videoTraining/postVideos.html?articleId='+list[i].videoId+'&type='+GetQueryString("type")+'"><img src="../../images/modification.png"></a>';
		        	}else{
		        		text+='<a class="modification" href="/spywBeta/pages/videoTraining/postVideos.html?articleId='+list[i].videoId+'&type='+GetQueryString("type")+'"><img src="../../images/modification.png"></a>';
		        	}
		        	if (info.usergroupid.toString().length <=6) {
		        		if(info.usergroupid.toString()==list[i].videoCode  && info.usergroupid.toString()!=1){
		        			text+='<a class="delete" href="javascript:;" onclick="videoTraindelete(\''+list[i].videoId+'\')"><img src="../../images/delete.png"></a>';
		        		}else{
		        			text+='<a class="delete" href="javascript:;" onclick="videoTraindelete(\''+list[i].videoId+'\')"><img src="../../images/delete.png"></a>';
		        		}
		        	}
		        	text+='</td>';
	        	}
	        	text+='</tr>';
	        	$(".infoList table tbody").append(text);
	        }
	        if (info.usergroupid.toString().length >6){
	        	$(".infoList table thead tr td:eq(5)").remove();
	        }
	        var text='';
        	text+='<input type="hidden" value="'+pagesize+'" id="pagesize"/>';
        	$(".infoList").append(text);
	        Page({
	            num: pagetotal,
	            elem: $('#page2'),
	            startnum:pagesize,
	            callback: function(pagesize) {
	                $("#pagesize").val(pagesize);
//	                var data={"type":type,"pagesize":pagesize}
//		                videotraintype(data,pagesize);
	                VideolistSearch(pagesize)
	            }
	        });
	    }
	});
}
function videoTraindelete(videoId){
	var delSure = confirm("是否删除?");
	if(delSure) {
		$.ajax({
		    url:"/spywBeta/videoTraining/deletevideoTrain.do",    //请求的url地址
		    dataType:"json",   //返回格式为json
		    data:{"videoId":videoId},    //参数值
		    type:"post",   //请求方式
		    success:function(req){
		    	alert(req.success);
		    	var pagesize=$("#pagesize").val();
		    	VideolistSearch(pagesize);
		    }
		});
	}
}
