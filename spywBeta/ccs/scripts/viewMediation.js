var widthdata = $("#search").parent().parent().width() - $("#distvill").width() -14;
$("#search").parent().css({"width":widthdata+"px"});	

var btnType = GetQueryString("type");
if(btnType == "export") {
	$("#export").show();
};

var num = 1;
var code=0;
var name="";
var authCode=null;

init();
function init() {
	$.ajax({
		type: 'POST',
		url: '../../area/getCode.do',
		dataType: 'json',
		success: function(response) {
		ajaxLoading.hide();
		 if(response!=null||response!="") {
			 var data = response.usergroupid;
			 authCode=data;
			new selectArea('body',{
				data: data
			})
		 }
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
  
	$.post("../../mediate/getPageList.do", function(data) {
		if(data.list.length>0){
			code = data.list[0].areas!= undefined ? data.list[0].areas.code : '10';
			name = data.list[0].areas!= undefined ? data.list[0].areas.name : '';
		}

		// if(code.length==3){
		// 	var str = '';
		// 	str += '<option value="' + code + ' select=selected disebled">' + name + '</option>';
		// 	$("#district").append(str)
		// }
		// else if(code.length==6){
		// 	var str = '';
		// 	str += '<option value="' + code + ' select=selected disebled">' + name + '</option>';
		// 	$("#country").append(str)
		// 	var sss=code.substr(0, 3);
		// }
		// else if(code.length==9){
		// 	var str = '';
		// 	str += '<option value="' + code + ' select=selected disebled">' + name + '</option>';
		// 	$("#village").append(str)
		// 	var sss=code.substr(0, 3);
		// }else{
		// 	new selectArea('#html5Form',{
		// 		data: '',
		// 		isSelect: true
		// 	})
		// }
		
		getMediate(data);
	});

};

function getMediate(data) {
	num = data.num;
	Page({
		num : num, //页码数
		startnum : 1, //指定页码
		elem : $('#page2'), //指定的元素
		callback : function(n) { //回调函数
			$.post("../../mediate/getPageList.do?pages=" + n, function(data) {
				setMediate(data,authCode);
			});
		}
	});

	setMediate(data,authCode);

}


function getSearchMediate(data) {
	num = data.num;
	Page({
		num : num, //页码数
		startnum : 1, //指定页码
		elem : $('#page2'), //指定的元素
		callback : function(n) { //回调函数
			$.post("../../mediate/getSearchPageList.do?pages=" + n, {
				mediateRegisBranch : $("#department").val(),
				mediateRegisDate : $("#startTime").val(),
				stopTime : $("#endTime").val(),
				district : $("#district").val(),
				county : $("#county").val(),
				village : $("#village").val()
			}, function(data) {
				setMediate(data,authCode);
			});
		}
	});

	setMediate(data,authCode);

}



function setMediate(data,code) {
	$("#content").text("");
	$(data.list).each(function(i, n) {
		if (i < 10) {
			var str="<tr><td>"
				+ n.mediateRegisName + "</td><td>"
				+ n.mediateRegisBranch + "</td><td>"
				+ (n.areas?n.areas.name:"") + "</td><td>"
				+ n.mediateReason + "</td><td>"
				+ format(n.mediateRegisDate / 1) 
				+ "</td>";
			if(n.confId==null){
				str=str+"<td>未开启会议</td><td>无</td><td align='center'><a data-conoferid='' href='javascript:;' >无</a></td><td>未开启</td>"
			}else{
				if(n.conference.status==1){
					str=str+"<td>"+format(n.conference.beginTime / 1)+"</td><td>"+n.conference.duration+"</td><td align='center'><a data-conoferid='"+n.conference.accessCode+"' href='javascript:;' onclick='lookCode(event)'>查看</a></td><td align='center'><span data-conoferid='"+n.confId+"'>已结束</span></td>"
				}else{
					var time=timeAdd(n.conference.beginTime,n.conference.duration);
					var nowTime=new Date().getTime();
					if(time<nowTime){
						str=str+"<td>"+format(n.conference.beginTime / 1)+"</td><td>"+n.conference.duration+"</td><td align='center'><a data-conoferid='"+n.conference.accessCode+"' href='javascript:;' onclick='lookCode(event)'>查看</a></td><td align='center'><span data-conoferid='"+n.confId+"'>已结束</span></td>"
					}else{
						str=str+"<td>"+format(n.conference.beginTime / 1)+"</td><td>"+n.conference.duration+"</td><td align='center'><a data-conoferid='"+n.conference.accessCode+"' href='javascript:;' onclick='lookCode(event)'>查看</a></td><td align='center'><a data-conoferid='"+n.confId+"' href='javascript:;' onclick='endConfer(event)'>结束会议</a></td>";
					}
					
				}
			}
			if(code.toString().split('').length<6){
				if(n.mediaterStatus==1){
					str=str+"<td><span data-articleid='"+n.mediateid+"'>调解成功</span></td>";
				}
				if(n.mediaterStatus==0){
					str=str+"<td><span data-articleid='"+n.mediateid+"'>调解失败</span></td>";
				}
				if(n.mediaterStatus==2){
					str=str+"<td><a data-articleid='"+n.mediateid+"' id='status"+n.mediateid+"' onclick='changeStatus(event)' style='color:#028EC5;' href='javascript:;'>请选择</a></td>";
				}
				str=str+ "<td class='operation'><a href='mediation.html?look="+n.mediateid+"'><img src='../../images/lookinfo.png'></a>" 
				+"<a href='mediation.html?update="+n.mediateid+"' data-articleid=''>" 
				+"<img src='../../images/modification.png'></a><a onclick='deleteMediate(\"" + n.mediateid + "\")'><img src='../../images/delete.png'></a></td></tr>"
				$("#content").append(str);
				
			}else if(code.toString().split('').length>=6){
				if(n.mediaterStatus==1){
					str=str+"<td><span data-articleid='"+n.mediateid+"'>调解成功</span></td>";
				}
				if(n.mediaterStatus==0){
					str=str+"<td><span data-articleid='"+n.mediateid+"'>调解失败</span></td>";
				}
				if(n.mediaterStatus==2){
					str=str+"<td><a data-articleid='"+n.mediateid+"' id='status"+n.mediateid+"' onclick='changeStatus(event)' style='color:#028EC5;' href='javascript:;'>请选择</a></td>";
				}
				str=str+ "<td class='operation'><a href='mediation.html?look="+n.mediateid+"'><img src='../../images/lookinfo.png'></a></td></tr>";
				$("#content").append(str);
			}
		}
	});
}


function timeAdd(createTime, duration) {
	createTime = new Date(createTime).getTime();
	duration = new Date(duration*60*60*1000).getTime();
	return new Date(createTime + duration).getTime();
}

function lookCode(event) {
	var conoferid = $(event.target).data("conoferid");
	$("#lookCodeModal .modal-body").html(conoferid)
	$("#lookCodeModal").modal();
}


function endConfer(event) {
	var conoferid = $(event.target).data("conoferid");
	if(confirm("是否结束会议？")) {
		 $.ajax({
		 	type: 'POST',
		 	url: '../../conference/delConference.do',
		 	data: {
		 		id: conoferid
		 	},
		 	dataType: 'json',
		 	success: function(response) {
		 		ajaxLoading.hide();
				if(response.status == 1) {
					alert("成功结束会议")
					// 结束成功后从新渲染，把a标签换成span
					/*$(this).removeAttribute("onclick");
					$(this).text("已结束");*/
					init();
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

//修改状态
function changeStatus(event) {
	$("#changeStatusModal").modal();
	var articleId = $(event.target).data("articleid");
	$("#successType,#defeated").on("click", function() {
		var type = $(this).data("type");
		$.ajax({
			type: 'POST',
			url: '../../mediate/updateStatus.do',
			dataType: 'json',
			data: {
				type: type,
				id: articleId
			},
			success: function(response) {
				if(response.status == 1) {
					alert(response.msg)
					$("#changeStatusModal").modal("hide");
					init();
				}else{
					
				}
			}
		})
	})
}

function deleteMediate(id){
	var delSure = confirm('是否删除？');
	if(delSure) {
		$.post("../../mediate/delete.do", {
			id : id
		}, function(respose) {
			if (respose.status == 1) {
				alert(respose.msg);
				window.location.href = "viewMediation.html";
			} else {
				alert(respose.msg);
			}
		});
	}	
}


$("#search").on("click", function() {

	var startTime = $("#startTime").val() ? $("#startTime").val() : '1970-01-01';
	var endTime = $("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate() + 1)).format("yyyy-MM-dd") : new Date().format("yyyy-MM-dd");

	if(startTime && endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得大于开始时间");
		return;
	}

	$.post("../../mediate/getSearchPageList.do", {
		mediateRegisBranch : $("#department").val(),
		mediateRegisDate : startTime,
		stopTime : endTime,
		district : $("#district").val(),
		county : $("#county").val(),
		village : $("#village").val()
	}, function(data) {
		getSearchMediate(data);
	}, "json");

});


function add0(m) {
	return m < 10 ? '0' + m : m
}
function format(timestamp) {
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	return year + '-' + add0(month) + '-' + add0(date);
}


$("#export").on("click", function() {
	$("#district1").val($("#district").val());
	$("#county1").val($("#county").val());
	$("#village1").val($("#village").val());
	$("#mediateRegisBranch").val($("#department").val());
	$("#mediateRegisDate1").val($("#startTime").val());
	$("#stopTime").val($("#endTime").val());
	$("#FormExport").submit();
});

$("#searchBtn").on("click", function() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	if (startTime > endTime) {
		$("#endTime").testRemind("结束时间不得小于开始时间");
	}
	;

	var district = $("#district").val();
	var county = $("#county").val();
	var village = $("#village").val();
	if (district) {
		if (!county) {
			$("#county").testRemind("请选择镇");
		} else {
			if (!village) {
				$("#village").testRemind("请选择乡");
			}
		}
	}
});



//初始化渲染-区
//$.ajax({
//	type : 'POST',
//	url : '../../area/arealistByPartendId.do',
//	data : {
//		parentId : '0' //市
//	},
//	dataType : 'json',
//	success : function(response) {
//		ajaxLoading.hide();
//		var data = response.list;
//		for (var i = 0; i < data.length; i++) {
//			var str = '';
//			str += '<option value="' + data[i].code + '">' + data[i].name + '</option>';
//			$("#district").append(str)
//		}
//	},
//	error : function() {
//		ajaxLoading.hide();
//		alert("服务繁忙，请稍后再试")
//	},
//	beforeSend : function() {
//		ajaxLoading.show();
//	},
//	complete : function() {
//		ajaxLoading.hide();
//	}
//});



// function clearCounty() {
// 	$("#county").html('<option value="">请选择</option>');
// 	$("#village").html('<option value="">请选择</option>');
// }
// ;

// function clearVillage() {
// 	$("#village").html('<option value="">请选择</option>');
// }
// ;

// 选择区时获取县
//$("#district").on("change", function() {
//	var thisVal = $(this).val();
//
//	$.ajax({
//		type : 'POST',
//		url : '../../area/arealistByPartendId.do',
//		data : {
//			parentId : thisVal //
//		},
//		dataType : 'json',
//		success : function(response) {
//			ajaxLoading.hide();
//			clearCounty();
//			var data = response.list;
//				for (var i = 0; i < data.length; i++) {
//					var str = '';
//					str += '<option value="' + data[i].code+ '">' + data[i].name + '</option>';
//					$("#county").append(str)
//				}
//		},
//		error : function() {
//			ajaxLoading.hide();
//			alert("服务繁忙，请稍后再试")
//		},
//		beforeSend : function() {
//			ajaxLoading.show();
//		},
//		complete : function() {
//			ajaxLoading.hide();
//		}
//	});
//});

// 选择县时获取村
//$("#county").on("change", function() {
//	var thisVal = $(this).val();
//	$.ajax({
//		type : 'POST',
//		url : '../../area/arealistByPartendId.do',
//		data : {
//			parentId : thisVal //村
//		},
//		dataType : 'json',
//		success : function(response) {
//			ajaxLoading.hide();
//				clearVillage();
//				var data = response.list;
//					for (var i = 0; i < data.length; i++) {
//						var str = '';
//						str += '<option value="' + data[i].code + '">' + data[i].name + '</option>';
//						$("#village").append(str)
//					}
//		},
//		error : function() {
//			ajaxLoading.hide();
//			alert("服务繁忙，请稍后再试")
//		},
//		beforeSend : function() {
//			ajaxLoading.show();
//		},
//		complete : function() {
//			ajaxLoading.hide();
//		}
//	});
//})



// 修改状态


