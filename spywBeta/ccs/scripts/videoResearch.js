var widthdata = $("#searchBtn").parent().parent().width() - $("#searchBtn").parent().siblings().width() -4;
$("#searchBtn").parent().css({"width":widthdata+"px"});
$(".contNav li > a").on("click", function() {
	$(this).parent().addClass("active").siblings("li").removeClass("active");
});

$("#searchBtn").click(function(){
	var startTime = $("#startTime").val() ? $("#startTime").val() : '1970-01-01';
	var endTime = $("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate() + 1)).format("yyyy-MM-dd") : new Date().format("yyyy-MM-dd");

	if(startTime && endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得大于开始时间");
		return;
	}

	VideoResearchlistSearch(1);
})
function VideoResearchlistSearch(pagesize){
	//var type=/<%=request.getParameter("type")%>/;
	var videoResearcCode='';
	var district=$("#district").val();
	if(district!=null && district!=""){
		videoResearcCode=district;
	}
	var county=$("#county").val();
	if(county!=null && county!=""){
		videoResearcCode=county;
	}
	var village=$("#village").val();
	if(village!=null && village!=""){
		videoResearcCode=village;
	}
	var videoResearchName=$("#exampleInputName2").val();
	var videoResearchStarttime=$("#startTime").val();
	var videoResearchStoptime=$("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate() + 1)).format("yyyy-MM-dd") : new Date().format("yyyy-MM-dd");
	var data={"pagesize":pagesize,"videoResearchName":videoResearchName,"videoResearchStarttime":videoResearchStarttime,"videoResearcCode":videoResearcCode,"videoResearchStoptime":videoResearchStoptime};
	$(".container .content .infoList table tbody tr").remove();
	videoResearchlistjson(data,pagesize);
}
$(function(){
	var info = JSON.parse(localStorage.getItem("info"));
	new selectArea('.inputWrapper',{
		data: info.usergroupid.toString(),
		isSelect: false
	});
	$(".container .content .infoList table tbody tr").remove();
	var data={"pagesize":1};
	videoResearchlistjson(data,1);
})
function videoResearchlistjson(data,pagesize){
	$.ajax({
		type: 'post',
		url: '/spywBeta/videoResearch/videoResearchlistjoin.do',
		data: data,
		dataType: 'json',
		success: function(req) {
			var list=req.list;
			var pagetotal=req.total;
			var info = JSON.parse(localStorage.getItem("info"));
			for(var i=0;i<list.length;i++){
				var ds=list[i].videoResearchStoptime;
				var nowTime = new Date().getTime();
				var text='';
				
				text+='<tr>';
				text+='<td></td>';
				if(nowTime > ds) {
					text+='<td><p class="artTitle"><a href="selectingActivity.html?type=1&videoResearchId='+list[i].videoResearchId+'">'+list[i].videoResearchName+'</a></p></td>';
				}else {
					text+='<td><p class="artTitle"><a href="selectingActivity.html?type=-1&videoResearchId='+list[i].videoResearchId+'">'+list[i].videoResearchName+'</a></p></td>';
				}
				text+='<td align="center">'+list[i].videoResearchRealName+'</td>';
				if(list[i].videoCode==1){
	        		text+='<td align="center">淮安市</td>';
	        	}else{
	        		if(list[i].areainfo!=null){
	        			text+='<td align="center">'+list[i].areainfo.name+'</td>';
	        		}else{
	        			text+='<td align="center"></td>';
	        		}
	        	}
				text+='<td align="center">'+new Date(list[i].videoResearchTime).format('yyyy-MM-dd')+'</td>';
				if (info.usergroupid.toString().length <= 6) {
					text+='<td align="center" class="operation">';
					text+='<a class="record" href="researchRecord.html?&videoResearchId='+list[i].videoResearchId+'"" ><img src="../../images/record-icon.png"></a>';
	//				text+='	<a class="modification" href="aResearch.html?&videoResearchId='+list[i].videoResearchId+'" ><img src="../../images/modification.png"></a>';
					if(info.usergroupid.toString()==list[i].videoResearcCode  || info.usergroupid.toString()==1){
						text+='	<a class="delete" href="javascript:void(0)" onclick="videoResearchdelete(\''+list[i].videoResearchId+'\')"><img src="../../images/delete.png"></a>';
					}
					text+='</td>';
				}
				text+='</tr>';
				$(".container .content .infoList table tbody").append(text);
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
//		                var data={"type":type,"pagesize":pagesize}
//			                videotraintype(data,pagesize);
		                VideoResearchlistSearch(pagesize);
		            }
		        });
		}
	
	})
}
function videoResearchdelete(videoId){
	$.ajax({
	    url:"/spywBeta/videoResearch/deletevideoTrain.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:{"videoId":videoId},    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	alert(req.success);
	    	var pagesize=$("#pagesize").val();
	    	 VideoResearchlistSearch(pagesize);
	    }
	});
}