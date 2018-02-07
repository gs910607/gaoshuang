
$(function(){
	var data={"pagesize":1,"sizePage":config.sizePage};
	SafetyPublicityload(data,1,true);
//		$(".modification").on("click", function() {
//			alert("cdsc");
//			var articleID = $(this).data("articleid");
//			$(this).attr("href","postVideos.html?articleId="+articleID)
//		})
});

$("#searchBtn").on("click", function() {
	// 搜索
//	alert("开始搜索")
	SafetyPublicitySearch(1,true)
});

function SafetyPublicitySearch(pagesize,ispager){
	//var type=/<%=request.getParameter("type")%>/;
	var safetyPyName=$("#title").val();
	var safetyPyStarttime='';
	var safetyPyhStoptime='';
	var data={"pagesize":pagesize,"sizePage":config.sizePage,"safetyPyName":safetyPyName,"safetyPyStarttime":safetyPyStarttime,"safetyPyhStoptime":safetyPyhStoptime};
	SafetyPublicityload(data,pagesize,ispager);
}

function SafetyPublicityload(data,pagesize,ispager){
	$.ajax({
	    url:"/xlhaBeta/safenessPublicity/safetyPublicitylistjoin.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:data,    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	var list=req.list;
	    	var pagetotal=req.total;
	        var text='';
	        for(var i=0;i<list.length;i++){
	        	text+='<tr>';
	        	text+='<td class="text-left"><a href="safenessPublicityDetails.html?articleId='+list[i].safetyPyId+'">· '+list[i].safetyPyName+'</a></td>';
	        	text+='<td width="120" align="right">'+new Date(list[i].safetyPyTime).format("YYYY-MM-dd")+'</td>';
	        	// if(list[i].safetyPyUserName!=null){
	        	// 	text+='<td>'+list[i].safetyPyUserName+'</td>';
	        	// }else{
	        	// 	text+='<td> </td>';
	        	// }
	        	// if(list[i].safetyPyEditusername!=null){
	        	// 	text+='<td>'+list[i].safetyPyEditusername+'</td>';
	        	// }else{
	        	// 	text+='<td> </td>';
	        	// }
//	        	text+='<td class="operation">';
//	        	text+='<a id="modification" href="safenessPublicityPublish.html?articleId='+list[i].safetyPyId+'"><img src="../../images/modification.png"></a>';
//	        	text+='<a id="delete" href="javascript:void(0);" onclick="deletesafenessPublicity(\''+list[i].safetyPyId+'\')"><img src="../../images/delete.png"></a>';
//	        	text+='</td>';
	        	text+='</tr>';
	        }
	        $(".content .contList table tbody").html(text);

        	if(ispager){
        		 Page({
     	            num: pagetotal,
     	            elem:$('#page'),
     	            startnum:pagesize,
     	            callback: function(pagesize) {
     	                SafetyPublicitySearch(pagesize,false);
     	            }
     	        });
        	}
	    }
	});
}
// function deletesafenessPublicity(safetyPyId){
// 	$.ajax({
// 	    url:"/xlhaBeta/safenessPublicity/deletesafetyPublicity.do",    //请求的url地址
// 	    dataType:"json",   //返回格式为json
// 	    data:{"safetyPyId":safetyPyId},    //参数值
// 	    type:"post",   //请求方式
// 	    success:function(req){
// 	    	if(req.status==0){
// 	    		alert("删除成功");
// 	    		var pagesize=$("#pagesize").val();
// 	    		SafetyPublicitySearch(pagesize);
// 	    	}else{
// 	    		alert("删除失败");
// 	    	}
// 	    }
// 	});
// }