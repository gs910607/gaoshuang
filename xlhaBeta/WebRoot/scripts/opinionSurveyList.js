var user = JSON.parse(sessionStorage.getItem("user")) || null;

user ? '' : location.href = "../../index.html";

$(function(){
	var data={"pagesize":1,"sizePage":config.sizePage};
	problempaperlistjson(data,1,true);
});

$("#searchbtn").on("click", function() {
	// 搜索
	problempaperlistSearch(1,true);

});

function problempaperlistSearch(pagesize,ispager){
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
	var problempaperName=$("#title").val();
	var problempaperStarttime=$("#startTime").val();
	var problempaperStoptime=$("#endTime").val();
	var data={"pagesize":pagesize,"sizePage":config.sizePage,"problempaperCode":problempaperCode,"problempaperName":problempaperName,"problempaperStarttime":problempaperStarttime,"problempaperStoptime":problempaperStoptime};
	problempaperlistjson(data,pagesize,ispager)
}
function problempaperlistjson(data,pagesize,ispager){
	$.ajax({
		type: 'post',
		url: '/xlhaBeta/opinionSurvey/problemPaperlistjoin.do',
		data: data,
		dataType: 'json',
		success: function(req) {
			var list=req.list;
			var pagetotal=req.total;
			$(".container .content .contList table tbody tr").remove();
			for(var i=0;i<list.length;i++){
				var text='';
				text+='<tr>';
				text+='<td class="text-left"><a href="opinionSurveyExam.html?problempaperId='+list[i].problempaperId+'">· '+list[i].problempaperName+'</a></td>';
				text+='<td width="120px" align="right">'+new Date(list[i].problempaperTime).format("yyyy-MM-dd")+'</td>';
// 				text+='<td class="operation">';
// 				text+='<a class="record" href="opinionSurveyRecord.html?problempaperId='+list[i].problempaperId+'" ><img src="../../images/record-icon.png"></a>';
// //				text+='<a class="delete" href="javascript:void(0);" onclick="problempaperdelete(\''+list[i].problempaperId+'\')"><img src="../../images/delete.png"></a>';
// 				text+='</td>';
				text+='</tr>';
				$(".container .content .contList table tbody").append(text);
			}
			if(ispager) {
		        Page({
		            num: pagetotal,
		            elem: $('#page'),
		            startnum:pagesize,
		            callback: function(pagesize) {
		                problempaperlistSearch(pagesize,false);
		            }
		        });
			}
		},
	 	error: function() {
	 		ajaxLoading.hide();
	 		alert("服务繁忙，请稍后再试")
	 	}
	
	})
}
// function problempaperdelete(problempaperId){
// 	$.ajax({
// 	    url:"/xlhaBeta/opinionSurvey/problemPaperDelete.do",    //请求的url地址
// 	    dataType:"json",   //返回格式为json
// 	    data:{"problempaperId":problempaperId},    //参数值
// 	    type:"post",   //请求方式
// 	    success:function(req){
// 	    	if(req.status==0){
// 	    		alert(req.success);
// 		    	var pagesize=$("#pagesize").val();
// 		    	problempaperlistSearch(pagesize);
// 	    	}else{
// 	    		alert(req.success);
// 	    	}
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
// 		})
// 		return false;
// 	}
// })