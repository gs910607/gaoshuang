var widthdata = $("#searchBtn").parent().parent().width() - $("#searchBtn").parent().siblings().width() -4;
$("#searchBtn").parent().css({"width":widthdata+"px"});

$(function(){
	var info = JSON.parse(localStorage.getItem("info"));
	new selectArea('body',{
		data: info.usergroupid.toString(),
		isSelect: false
	});
	var data={"pagesize":1};
	$(".container .content .infoList table tbody tr").remove();
	problempaperlistjson(data,1);
});
$("#searchBtn").click(function(){
	var startTime = $("#startTime").val() ? $("#startTime").val() : '1970-01-01';
	var endTime = $("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate() + 1)).format("yyyy-MM-dd") : new Date().format("yyyy-MM-dd");

	if(startTime && endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得大于开始时间");
		return;
	}
	
	problempaperlistSearch(1);
});
function problempaperlistSearch(pagesize){
	var problempaperCode='';
	var district=$("#district").val();
	if(district!=null && district!=""){
		problempaperCode=district;
	}
	var county=$("#county").val();
	if(county!=null && county!=""){
		problempaperCode=county;
	}
	var village=$("#village").val();
	if(village!=null && village!=""){
		problempaperCode=village;
	}
	var problempaperName=$("#exampleInputName2").val();
	var problempaperStarttime=$("#startTime").val();
	var problempaperStoptime=$("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate() + 1)).format("yyyy-MM-dd") : '';
	var data={"pagesize":pagesize,"problempaperCode":problempaperCode,"problempaperName":problempaperName,"problempaperStarttime":problempaperStarttime,"problempaperStoptime":problempaperStoptime};
	problempaperlistjson(data,pagesize)
}
function problempaperlistjson(data,pagesize){
	$.ajax({
		type: 'post',
		url: '/spywBeta/videoResearch/problemPaperlistjoin.do',
		data: data,
		dataType: 'json',
		success: function(req) {
			var list=req.list;
			var pagetotal=req.total;
			$(".container .content .infoList table tbody tr").remove();
			var info = JSON.parse(localStorage.getItem("info"));
			for(var i=0;i<list.length;i++){
				var text='';
				text+='<tr>';
				text+='<td></td>';
				text+='<td><p class="artTitle"><a href="evaluatingDetails.html?problempaperId='+list[i].problempaperId+'">'+list[i].problempaperName+'</a></p></td>';
				text+='<td align="center">'+list[i].problempaperUsername+'</td>';
				if(list[i].videoCode==1){
	        		text+='<td align="center">淮安市</td>';
	        	}else{
	        		if(list[i].areainfo!=null){
	        			text+='<td align="center">'+list[i].areainfo.name+'</td>';
	        		}else{
	        			text+='<td align="center"></td>';
	        		}
	        	}
				text+='<td align="center">'+new Date(list[i].problempaperTime).format("yyyy-MM-dd")+'</td>';
				
				if (info.usergroupid.toString().length <=6) {
					text+='<td align="center" class="operation">';
					text+='<a class="record" href="evaluatingRecord.html?&problempaperId='+list[i].problempaperId+'" ><img src="../../images/record-icon.png"></a>';
					if(info.usergroupid.toString()==list[i].problempaperCode  || info.usergroupid.toString()==1){
						text+='<a class="delete" href="javascript:void(0);" onclick="problempaperdelete(\''+list[i].problempaperId+'\')"><img src="../../images/delete.png"></a>';
					}
					text+='</td>';
				}
				
				text+='</tr>';
				$(".container .content .infoList table tbody").append(text);
			}
			if (info.usergroupid.toString().length > 6){
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
		                problempaperlistSearch(pagesize);
//		                var data={"type":type,"pagesize":pagesize}
//			                videotraintype(data,pagesize);
//		                VideoResearchlistSearch(pagesize);
		            }
		        });
		}
	
	})
}
function problempaperdelete(problempaperId){
	if(confirm("是否删除？")) {	
		$.ajax({
		    url:"/spywBeta/videoResearch/problemPaperDelete.do",    //请求的url地址
		    dataType:"json",   //返回格式为json
		    data:{"problempaperId":problempaperId},    //参数值
		    type:"post",   //请求方式
		    success:function(req){
		    	if(req.status==0){
		    		alert(req.success);
			    	var pagesize=$("#pagesize").val();
			    	problempaperlistSearch(pagesize);
		    	}else{
		    		alert(req.success);
		    	}
		    }
		});
	}
}
Page({
	num: 100,				//页码数
	startnum:1,				//指定页码
	elem:$('#page2'),		//指定的元素
	callback:function(n){	//回调函数
		
	}
});