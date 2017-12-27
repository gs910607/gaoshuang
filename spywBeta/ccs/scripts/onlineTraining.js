
Page({
	num: 100,				//页码数
	startnum:1,				//指定页码
	elem:$('#page2'),		//指定的元素
	callback:function(n){	//回调函数
		console.log(n) //当前点击的页码
		
	}
});

handleClick(); //表格渲染完成后执行
function handleClick() {
	$(".modification").on("click", function() {
		var articleID = $(this).data("articleid");
		$(this).attr("href","postVideos.html?articleId="+articleID)
	})
}

videotraintype(1);

$("#searchBtn").on("click", function() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	if(endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得小于开始时间");
		return;
	}
	videotraintype(1);
})

function videotraintype(pagesize){
	var name=$("#exampleInputName2").val();
	var start=$("#startTime").val();
	var stop=$("#endTime").val();
	var data={"pagesize":pagesize,"name":name,"start":start,"stop":stop};
	$.ajax({
	    url:"/spywBeta/videoTraining/queryVideoOrConferByisrecord.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:data,    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	var list=req.list;
	    	var pagetotal=req.total;
	    	$(".infoList table tbody tr").remove();
	        for(var i=0;i<list.length;i++){
	        	var text='';
	        	text+='<tr>';
	        	text+='<td></td>';
	        	if(list[i].recorderAddr!=null){
	        		text+='<td><p class="artTitle"><a href="'+list[i].recorderAddr+'">'+list[i].name+'</a></p></td>';
	        	}else{
	        		text+='<td><p class="artTitle"><a href="javascript:;">'+list[i].name+'</a></p></td>';
	        	}
	        	var timeb=timeAdd(list[i].beginTime, list[i].duration);
	        	if(list[i].status!=1){
	        		if(list[i].beginTime>timeb){
	        			text+='<td align="center" style="color:#666;">已结束</td>';
		        	}else if(list[i].beginTime<timeb){
		        		text+='<td align="center" style="color:#ff6600;">培训中</td>';
		        	}
	        	}else{
	        		text+='<td align="center" style="color:#666;">已结束</td>';
	        	}
	        	text+='<td align="center">'+new Date(list[i].beginTime).format("YYYY-MM-dd hh:mm:ss")+'</td>';
	        	text+='<td align="center">'+list[i].duration+'小时</td>';
	        	text+='<td align="center">'+list[i].createName+'</td>';
	        	text+='</tr>';
	        	$(".infoList table tbody").append(text);
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
	                VideolistSearch(pagesize)
	            }
	        });
	    }
	});
}
function timeAdd(createTime, duration) {
	createTime = new Date(createTime).getTime();
	duration = new Date(duration*60*60*1000).getTime();
	return new Date(createTime + duration).getTime();
}