var widthdata = $("#searchBtn").parent().parent().width() - $("#distvill").width() -14;
$("#searchBtn").parent().css({"width":widthdata+"px"});	

var btnType = GetQueryString("type");
if(btnType == "export") {
	$("#export").show();
};

Page({
	num: 100,				//页码数
	startnum:1,				//指定页码
	elem:$('#page2'),		//指定的元素
	callback:function(n){	//回调函数
		console.log(n) //当前点击的页码
		
	}
});
$.ajax({
	type: 'post',
	url: '/spywBeta/area/arealistByPartendId.do',
	data: {parentId:0},
	dataType: 'json',
	success: function(response) {
		ajaxLoading.hide();
		response.code.toString();
		new selectArea('#distvill',{  //信访人地址
			data: response.code.toString(),
			isSelect: false
		});
	},
	 error: function() {
	 	ajaxLoading.hide();
	 	alert("服务繁忙，请稍后再试")
	 },
	 beforeSend: function() {
	 	ajaxLoading.show();
	 },
	 complete: function() {
	 	ajaxLoading.hide();
	 }
});
//根据条件是否初始化渲染县
function selectloadCounty(code,obb){
	var cde=code.substr(0,3);
	 $.ajax({
	 	type: 'post',
	 	url: '/spywBeta/area/arealistByPartendId.do',
	 	data: {
	 		parentId: cde //县
	 	},
	 	dataType: 'json',
	 	success: function(response) {
			ajaxLoading.hide();
//			if(response.status == 0) {
				if(obb==1){
					clearCounty();
				}else if(obb==3){
					clearVillage();
				}
				var data = response.list;
				if(data && data.length >= 0) {
					for(var i=0;i<data.length;i++) {
						var str = '';
						str += '<option value="'+ data[i].code +'">'+ data[i].name +'</option>';
						$("#county").append(str)
					}
				}
				if(obb==2){
					code=code.substr(0,6);
					$("#county").val(code);
					$("#county").attr("disabled", true);
				}
//			}
	 	},
		 error: function() {
		 	ajaxLoading.hide();
		 	alert("服务繁忙，请稍后再试")
		 },
		 beforeSend: function() {
		 	ajaxLoading.show();
		 },
		 complete: function() {
		 	ajaxLoading.hide();
		 }
	 });
}
//根据条件是否初始化渲染村
function selectloadVillage(code,obb){
	var cde=code.substr(0,6);
	$.ajax({
		type: 'post',
		url: '/spywBeta/area/arealistByPartendId.do',
		data: {parentId:cde},
		dataType: 'json',
		success: function(response) {
			ajaxLoading.hide();
//			if(response.status == 0) {
				var data = response.list;
				for(var i=0;i<data.length;i++) {
					var str = '';
					str += '<option value="'+ data[i].code +'">'+ data[i].name +'</option>';
					$("#village").append(str)
				}
				if(obb==2){
					code=code.substr(0,9);
					$("#village").val(code);
					$("#village").attr("disabled", true);
				}
//			}
		},
		 error: function() {
		 	ajaxLoading.hide();
		 	alert("服务繁忙，请稍后再试")
		 },
		 beforeSend: function() {
		 	ajaxLoading.show();
		 },
		 complete: function() {
		 	ajaxLoading.hide();
		 }
	});
}
function clearCounty() {
	$("#county").html('<option value="">请选择</option>');
	$("#village").html('<option value="">请选择</option>');
};

function clearVillage() {
	$("#village").html('<option value="">请选择</option>');
};
//选择区时获取县
$("#district").on("change", function() {
	var thisVal = $(this).val();
	selectloadCounty(thisVal,1);
});
//选择县时获取村
$("#county").on("change", function() {
	var thisVal = $(this).val();
	selectloadVillage(thisVal,1);
})
handeClick() //遍历表格后执行
function handeClick() {
	$(".toVideo").on("click", function() {
		var videoId = $(this).data("videoid");
		$(this).attr("href","http://www.baidu.com?videoId="+videoId) 
	})
}
$(function(){
	var data={"pagesize":1,"firstVisit":"1"};
	 videoNeighborhoodjoin(data,1);
});
function VideoNeighborhoodlistSearch(pagesize){

	var startTime = $("#startTime").val() ? $("#startTime").val() : '1970-01-01';
	var endTime = $("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate() + 1)).format("yyyy-MM-dd") : new Date().format("yyyy-MM-dd");

	if(startTime && endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得大于开始时间");
		return;
	}

//	var type=GetQueryString("type");
	//var type=/<%=request.getParameter("type")%>/;
	var videoneihdName=$("#mediatePer").val();
	var videoneihdNum=$("#department").val();
	var videoneihdDate=$("#startTime").val();
	var videoneihdRegistDate=$("#endTime").val();
	var videoneihdLocationplace='';
	var district=$("#district").val();
	if(district!=null && district!=""){
		videoneihdLocationplace=district;
	}
	var county=$("#county").val();
	if(county!=null && county!=""){
		videoneihdLocationplace=county;
	}
	var village=$("#village").val();
	if(village!=null && village!=""){
		videoneihdLocationplace=village;
	}
	var data={"pagesize":pagesize,"videoneihdName":videoneihdName,"videoneihdNum":videoneihdNum,"videoneihdDate":videoneihdDate,"videoneihdRegistDate":videoneihdRegistDate,"videoneihdLocationplace":videoneihdLocationplace,"firstVisit":"2"};
	videoNeighborhoodjoin(data,pagesize);
}
function videoNeighborhoodjoin(data,pagesize){
	$.ajax({
	    url:"/spywBeta/videoNeighborhood/videoNeighborhoodlistjoin.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:data,    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	ajaxLoading.hide();

	    	var list=req.list;
	    	var pagetotal=req.total;
	    	$(".infoList table tbody").empty();
	        for(var i=0;i<list.length;i++){
	        	var text='';
	        	text+='<tr>';
	        	if(list[i].videoneihdNum!=null){
	        		text+='<td>'+list[i].videoneihdNum+'</td>';
	        	}else{
	        		text+='<td></td>';
	        	}
	        	text+='<td>'+new Date(list[i].videoneihdDate).format("YYYY-MM-dd")+'</p></td>';
	        	text+='<td >'+list[i].videoneihdName+'</td>';
	        	if(list[i].videoneihdRegistrant!=null){
	        		text+='<td>'+list[i].videoneihdRegistrant+'</td>';
	        	}else{
	        		text+='<td></td>';
	        	}
//	        	text+='<td>'+list[i].videoneihdObjective+'</td>';
//	        	text+='<td>视频</td>';
	        	if(list[i].videoneihdLocationplace!=null && list[i].areainfo!=null){
	        		text+='<td>'+list[i].areainfo.name+'</td>';
	        	}else{
	        		text+='<td></td>';
	        	}
//	        	text+='<td width="100"><p style="width:100px;">劳动和社会</td>';
//	        	text+='<td>转送</td>';
//	        	text+='<td>待分拣</td>';
//	        	text+='<td></td>'; 
	        	if(list[i].videoConferenceinfo!=null){
	        		text+='<td>'+new Date(list[i].videoConferenceinfo.beginTime).format("yyyy-MM-dd hh:mm:ss")+'</td>';
	        		text+='<td>'+list[i].videoConferenceinfo.name+'</td>';
	        		text+='<td><a style="color:#028EC5;" data-conoferid="'+list[i].videoConferenceinfo.accessCode+'" href="javascript:;" onclick="lookCode(event)">查看</a></td>';
	        		if(list[i].videoConferenceinfo.status==0){
	        			var time=timeAdd(list[i].videoConferenceinfo.beginTime,list[i].videoConferenceinfo.duration);
	    				var nowTime=new Date().getTime();
	    				if(time<nowTime){
	    					text+='<td><span>已结束</span></td>';
	    				}else{
	    					text+='<td><a style="color:#028EC5;" data-conoferid="'+list[i].videoConferenceinfo.confId+'" href="javascript:;" onclick="endConfer(event)">结束会议</a></td>';
	    				}
	        			
	        		}else{
	        			text+='<td><span>已结束</span></td>';
	        		}
	        		
	        	}else{
	        		text+='<td></td>';
		        	text+='<td></td>';
		        	text+='<td><span>无接入码</span></td>';
		        	text+='<td><span>无会议</span></td>';
	        	}
	        	if(list[i].videoneihdState==0){
	        		text+='<td><a data-articleid="'+list[i].videoneihdId+'" onclick="changeStatus(event)" style="color:#028EC5;" href="javascript:;">请选择</a></td>';
	        	}else{
	        		if(list[i].videoneihdState==1){
	        			text+='<td >已解决</td>';
	        		}else if(list[i].videoneihdState==2){
	        			text+='<td >未解决</td>';
	        		}
	        	}
	        	text+='<td class="operation">';
	        	text+='<a class="delete" href="aNeighborhood.html?videoneihdId='+list[i].videoneihdId+'&type=1"><img src="../../images/lookinfo.png"></a>';
	        	var info = JSON.parse(localStorage.getItem("info"));
	        	if (info.usergroupid.toString().length <6) {
		        	text+='<a class="modification" href="aNeighborhood.html?videoneihdId='+list[i].videoneihdId+'"><img src="../../images/modification.png"></a>';
		        	text+='<a class="delete" href="javascript:void(0);" onclick="deleteNeigh(\''+list[i].videoneihdId+'\')"><img src="../../images/delete.png"></a>';
	        	}
	        	text+='</td>';
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
	                VideoNeighborhoodlistSearch(pagesize);
//	                VideolistSearch(pagesize)
	            }
	        });
	    },
	    beforeSend: function() {
	    	ajaxLoading.show();
		 },
		 error: function() {
		 	ajaxLoading.hide();
		 	alert("服务繁忙，请稍后再试")
		 }
	});
}
function deleteNeigh(videoneihdId){
	var delSure = confirm("是否删除?");
	if(delSure) {
		$.ajax({
		    url:"/spywBeta/videoNeighborhood/deleteNeighborhood.do",    //请求的url地址
		    dataType:"json",   //返回格式为json
		    data:{"videoneihdId":videoneihdId},    //参数值
		    type:"post",   //请求方式
		    success:function(req){
		    	alert(req.success);
		    	var pagesize=$("#pagesize").val();
		    	VideoNeighborhoodlistSearch(pagesize);
		    }
		});
	}
}
function VideoNeighborhoodlistexport(){
	var videoneihdName=$("#mediatePer").val();
	var videoneihdNum=$("#department").val();
	var pagesize=$("#pagesize").val();
	var videoneihdDate=$("#startTime").val();
	var videoneihdRegistDate=$("#endTime").val();
	$("#videoneihdName").val(videoneihdName);
	$("#videoneihdNum").val(videoneihdNum);
	$("#pagesize").val(pagesize);
	$("#videoneihdDate").val(videoneihdDate);
	$("#videoneihdRegistDate").val(videoneihdRegistDate);
	var videoneihdLocationplace='';
	var district=$("#district").val();
	if(district!=null && district!=""){
		videoneihdLocationplace=district;
	}
	var county=$("#county").val();
	console.log("county"+county+"!");
	if(county!=null && county!=""){
		console.log("hh");
		videoneihdLocationplace=county;
	}
	var village=$("#village").val();
	if(village!=null && village!=""){
		videoneihdLocationplace=village;
	}
	$("#videoneihdLocationplace").val(videoneihdLocationplace);
	console.log("localplace:"+$("#videoneihdLocationplace").val());
	$("#exportForm").submit();
//	location.href = "/spywBeta/videoNeighborhood/videoNeighborhoodexport.do?pagesize="+pagesize+"&videoneihdName="+videoneihdName+"&videoneihdNum"+videoneihdNum;
//	$.ajax({ 
//	    url:"/spywBeta/videoNeighborhood/videoNeighborhoodexport.do",    //请求的url地址
//	    dataType:"json",   //返回格式为json
//	    data:data,    //参数值
//	    type:"post",   //请求方式
//	    success:function(req){
//	    	
//	    }
//	});
}


var articleIds;
// 修改状态
function changeStatus(event) {
	$("#changeStatusModal").modal();
	articleIds = $(event.target).data("articleid");
}

$("#successType,#defeated").on("click", function() {
	var type = $(this).data("type");
	$.ajax({
		type: 'post',
		url: '/spywBeta/videoNeighborhood/updateByIdOfstate.do',
		dataType: 'json',
		data: {
			videoneihdState: type,
			videoneihdId: articleIds
		},
		success: function(response) {
			if(response.status == 0) {
				alert(response.success);
				var pagesize=$("#pagesize").val();
		    	VideoNeighborhoodlistSearch(pagesize);
		    	$("#changeStatusModal").modal('hide');
//				if(response.data == 1) { //接访成功
//
//				} else if(response.data == 2) {  //接访失败
//
//				}
			}else{
				alert(response.success);
			}
		},
		error:function(){
			alert("服务繁忙，请稍后再试")
		}
	})
})
//var res = { //开发后删除
//	status: 0,
//	data: {
//		joinCode: 123456
//	}
//}
function lookCode(event) {
	var conoferid = $(event.target).data("conoferid");
	$("#lookCodeModal .modal-body").html(conoferid)
	$("#lookCodeModal").modal();
}


//var response = { //开发后删除
//	status: 0,
//	data: {
//
//	}
//}
function endConfer(event) {
	var conoferid = $(event.target).data("conoferid");
//	alert(conoferid);
	if(confirm("是否结束会议？")) {
		 $.ajax({
		 	type: 'POST',
		 	url: '/spywBeta/conference/delConference.do',
		 	data: {
		 		id: conoferid
		 	},
		 	dataType: 'json',
		 	success: function(response) {
		 		ajaxLoading.hide();
		 		if(response.status == 1) {
					alert("成功结束会议")
					// 结束成功后从新渲染，把a标签换成span
				//	$(this).removeAttribute("onclick");
				//	$(this).text("已结束");
					VideoNeighborhoodlistSearch(1);
				}
		 	},
		 	error: function() {
		 		ajaxLoading.hide();
		 		alert("服务繁忙，请稍后再试")
		 	},
		 	beforeSend: function() {
		 		ajaxLoading.show();
		 	}
		 })
	}
}
function timeAdd(createTime, duration) {
	createTime = new Date(createTime).getTime();
	duration = new Date(duration*60*60*1000).getTime();
	return new Date(createTime + duration).getTime();
}