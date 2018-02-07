
var user = JSON.parse(sessionStorage.getItem("user")) || null;

user ? '' : location.href = "../../index.html";

var videoResearchName = '';
var videoResearchStarttime = '';
var videoResearchStoptime = '';
var videoResearcCode='';
var district = '';
var county = '';
var village = '';

$(function(){
	var data={"pagesize":1,"sizePage":config.sizePage};
	videotraintype(data,1,true);

});

$("#searchBtn").on("click", function() {
	// 搜索
	VideolistSearch(1, true);
});

function VideolistSearch(pagesize,ispager){
	videoResearchName=$("#title").val();
	videoResearchStarttime=$("#startTime").val();
	videoResearchStoptime=$("#endTime").val();
	videoResearcCode='';
	district=$("#district").val();
	if(district!=null && district!=""){
		videoResearcCode=district;
	}
	county=$("#county").val();
	if(county!=null && county!=""){
		videoResearcCode=county;
	}
	village=$("#village").val();
	if(village!=null && village!=""){
		videoResearcCode=village;
	}
	var data={"pagesize":pagesize,"sizePage":config.sizePage,"videoResearchName":videoResearchName,"videoResearchStarttime":videoResearchStarttime,"videoResearchStoptime":videoResearchStoptime,"videoResearcCode":videoResearcCode};

	videotraintype(data,pagesize,ispager);
}
function videotraintype(data,pagesize,ispager){
	$(".content .contList table tbody tr").remove();
	$.ajax({
	    url:"/xlhaBeta/onlineEvaluating/videoResearchlistjoin.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:data,    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	var list=req.list;
	    	var pagetotal=req.total;
	        for(var i=0;i<list.length;i++){
	        	var ds=list[i].videoResearchStoptime;
				var nowTime = new Date().getTime();
	        	var text='';
	        	text+='<tr>';
	        	if(nowTime > ds) {
					text+='<td class="text-left"><a onclick="articleLink(1, \''+ list[i].videoResearchId +'\')" href="javascript:;">· '+list[i].videoResearchName+'</a></td>';
				}else {
					text+='<td class="text-left"><a onclick="articleLink(-1, \''+ list[i].videoResearchId +'\')" href="javascript:;">· '+list[i].videoResearchName+'</a></td>';
				}
	        	
	        	text+='<td width="120" align="right">'+new Date(list[i].videoResearchTime).format("YYYY-MM-dd")+'</td>';
// 	        	text+='<td class="operation">';
// 	        	text+='<a class="record" href="onlineEvaluatingRecord.html?videoResearchId='+list[i].videoResearchId+'" ><img src="../../images/record-icon.png"></a>';
// //	        	text+='<a  href="/xlhaBeta/pages/onlineEvaluating/onlineEvaluatingPublish.html?articleId='+list[i].videoResearchId+'"><img src="../../images/modification.png"></a>';
// //	        	text+='<a  href="javascript:;" onclick="videoTraindelete(\''+list[i].videoResearchId+'\')"><img src="../../images/delete.png"></a>';
// 	        	text+='</td>';
	        	text+='</tr>';
	        	$(".content .contList table tbody").append(text);
	        }

	        if(ispager) {
		        Page({
		            num: pagetotal,
		            elem: $('#page'),
		            startnum:pagesize,
		            callback: function(pagesize) {
		                VideolistSearch(pagesize,false)
		            }
		        });
	        }
	    }
	});
}
// function videoTraindelete(videoId){
// 	$.ajax({
// 	    url:"",    //请求的url地址
// 	    dataType:"json",   //返回格式为json
// 	    data:{"videoId":videoId},    //参数值
// 	    type:"post",   //请求方式
// 	    success:function(req){
// 	    	alert(req.success);
// 	    	var pagesize=$("#pagesize").val();
// 	    	VideolistSearch(pagesize);
// 	    }
// 	});
// }

//未登录时执行
// $(".content button, .content a, .btnWrap a").on("click", function() {
// 	if(0) {  // 未登录时执行
// 		$("#loginModal").modal({});
// 		$("#registerBtn1").on("click", function() {
// 			$(".registerForm").show();
// 			$(".loginForm").hide();
// 		});
// 		$("#loginBtn2").on("click", function() {
// 			$(".registerForm").hide();
// 			$(".loginForm").show();
// 		});

// 		$("#loginForm").html5Validate(function() {
// 			// 登录
// 			alert("验证通过")

// 		},{
// 			validate: function() {
// 				var phone = $("#loginTelephone");
// 				if(!(/^1[34578]\d{9}$/.test(phone.val()))){
// 					phone.testRemind("手机号码有误")
// 					return false; 
// 				}

// 				return true;
// 			}
// 		});

// 		$("#registerForm").html5Validate(function() {
// 			// 注册
// 			alert("验证通过")
// 		},{
// 			validate: function() {
// 				var phone = $("#telephone");
// 				if(!(/^1[34578]\d{9}$/.test(phone.val()))){
// 					phone.testRemind("手机号码有误")
// 					return false; 
// 				}

// 				return true;
// 			}
// 		});
		
// 		return false;
// 	}
// });

function articleLink(type, id) {
	// if(!(!!AndriodReqStr && AndriodReqStr.userid)) {
		// AndroidAction.openLogin(); //跳到登录页	
	// } else {
		location.href = 'onlineEvaluatingVote.html?type='+ type +'&articleId='+ id;
	// }

}