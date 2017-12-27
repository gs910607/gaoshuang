Page({
	num: 100,				//页码数
	startnum:1,				//指定页码
	elem:$('#page2'),		//指定的元素
	callback:function(n){	//回调函数
		console.log(n) //当前点击的页码
	}
});
$(function(){
	var paperRecordPaperId=GetQueryString("problempaperId");
	var data={"pagesize":1,"paperRecordPaperId":paperRecordPaperId};
	$(".container .content .infoList table tbody tr").remove();
	problempaperlistjson(data,1);
});
$("#searchBtn").on("click", function() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	if(startTime > endTime) {
		$("#endTime").testRemind("结束时间不得小于开始时间");
		
		return;
	}
	problempaperlistSearch(1);
})
function problempaperlistSearch(pagesize){
	var paperRecordPaperId=GetQueryString("problempaperId");
	var paperRecordQuestId=$("#title").val();
	var paperRecordTime=$("#startTime").val();
	var paperRecordStoptime=$("#endTime").val();
	var data={"pagesize":pagesize,"paperRecordPaperId":paperRecordPaperId,"paperRecordQuestId":paperRecordQuestId,"paperRecordTime":paperRecordTime,"paperRecordStoptime":paperRecordStoptime};
	problempaperlistjson(data,pagesize)
}
function problempaperlistjson(data,pagesize){
	$.ajax({
		type: 'post',
		url: '/spywBeta/videoResearch/problemPaperRecordlistjoin.do',
		data: data,
		dataType: 'json',
		success: function(req) {
			var list=req.list;
			var pagetotal=req.total;
			$(".container .content .infoList table tbody tr").remove();
			for(var i=0;i<list.length;i++){
				var text='';
				text+='<tr>';
				text+='<td></td>';
				text+='<td align="center">'+list[i].paperRecordUserName+'</td>';
				text+='<td style="width:550px;"><p class="artTitle">'+list[i].paperRecordQuestId+'</p></td>';
				text+='<td align="center">'+new Date(list[i].paperRecordTime).format("YYYY-MM-dd hh:mm:ss")+'</td>';
				text+='<td align="center">'+list[i].paperRecordIp+'</td>';
				text+='<td align="center">'+list[i].areainfo.name+'</td>';
				text+='</tr>';
				$(".container .content .infoList table tbody").append(text);
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
		                problempaperlistSearch(pagesize);
		            }
		        });
		}
	
	})
}