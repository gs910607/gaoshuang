
var number = 1;

var type = GetQueryString("type");

var artiTitle = '';
var startTime = '1970-01-01';
var endTime = new Date(new Date().setDate(new Date().getDate() + 1)).format("yyyy-MM-dd");

var authCode=null;
$(function() {
	
	if (type != null) {
		$.post("../../information/getPageList.do?type=" + type, function(data) {

			$.ajax({
				type: 'GET',
				url: '../../information/getType.do',
				success: function(response) {
					var typeList = response.type
					typeList.map(function(o,i){
						$("#listType").append('<option value="'+ o.type +'">'+ o.name +'</option>')
					});
					$("#listType").val(type)
				}
			});
			
			getInformation(data);

		}, "json");
	}




});

$.ajax({
	type: 'POST',
	url: '../../area/getCode.do',
	dataType: 'json',
	success: function(response) {
	ajaxLoading.hide();
	 if(response!=null||response!="") {
		 var data = response.usergroupid;
		 authCode=data.toString().split('');
		 if(data.toString().split('').length==9){
			 $("#makeAll").find("#make").remove();
		 }
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

function getInformation(data) {
	number = data.num;
	Page({
		num : number, //页码数
		startnum : 1, //指定页码
		elem : $('#page2'), //指定的元素
		callback : function(n) { //回调函数
			$.post("../../information/getPageList.do?pages=" + n + "&type=" + type, function(data) {
				setInformation(data,authCode);
			}, "json");
		}
	});

	setInformation(data,authCode);

}


function getSearchInformation(data) {
	number = data.num;
	Page({
		num : number, //页码数
		startnum : 1, //指定页码
		elem : $('#page2'), //指定的元素
		callback : function(n) { //回调函数
			$.post("../../information/getSearchPageList.do?pages=" + n + "&type=" + type, {
				title : startTime,
				start : startTime,
				end : endTime,
				type : type,
				district : $("#district").val(),
				county : $("#county").val(),
				village : $("#village").val(),
			}, function(data) {
				setInformation(data,authCode);
			}, "json");
		}
	});

	setInformation(data,authCode);

}


$("#search").on("click", function() {
	artiTitle = $("#exampleInputName2").val();
	startTime = $("#startTime").val() ? $("#startTime").val() : '1970-01-01';
	endTime = $("#endTime").val() ? new Date(new Date($("#endTime").val()).setDate(new Date($("#endTime").val()).getDate() + 1)).format("yyyy-MM-dd") : new Date(new Date().setDate(new Date().getDate() + 1)).format("yyyy-MM-dd");
	type = $("#listType").val();

	if(startTime && endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得大于开始时间");
		return;
	}

	$.post("../../information/getSearchPageList.do", {
		title : artiTitle,
		start : startTime,
		end : endTime,
		type : type,
		district : $("#district").val(),
		county : $("#county").val(),
		village : $("#village").val(),
	}, function(data) {
		getSearchInformation(data);
	}, "json");

});

function setInformation(data,code) {
	$("#content").text("");
	$(data.list).each(function(i, n) {
		if (i < 10) {
			if(code.length<9){
				var str="<tr><td></td><td width='500'><p class='artTitle' style='width:500px;'><a href='particulars.html?type="+type+"&id="+n.informationid+"'>"
				+ n.title + "</a></p></td><td align='center'>"+n.createname+"</td><td align='center'>"+n.areas.name+"</td><td align='center'>"
				+ format(n.createtime) + "</td>";
				if(code.length == 1 || n.groupid.length >= code.length){
					str=str+"<td align='center' class='operation'><a class='modification' href='postMessage.html?Id="
					+ n.informationid + "'data-articleid="
					+ n.informationid + "><img src='../../images/modification.png'></a> <a class='delete' onclick='deleteMediate("+n.informationid+")' href='javascript:;'><img src='../../images/delete.png'></a></td></tr>";
						$("#content").append(str);
				}else{
					str=str+"<td align='center' class='operation'></td></tr>";
					$("#content").append(str);
				}
//				$("#content").append("<tr><td></td><td><p class='artTitle'><a href='particulars.html?type="+type+"&id="+n.informationid+"'>"
//						+ n.title + "</a></p></td><td>"+n.createname+"</td><td>"+n.areas.name+"</td><td align='center'>"
//						+ format(n.createtime) + "</td><td align='center' class='operation'><a class='modification' href='postMessage.html?Id="
//						+ n.informationid + "'data-articleid="
//						+ n.informationid + "><img src='../../images/modification.png'></a> <a class='delete' href='../../information/delete.do?id="
//						+ n.informationid + "&type=" + type + "'><img src='../../images/delete.png'></a></td></tr>");
			}else{
				$("#content").append("<tr><td></td><td width='500'><p class='artTitle' style='width:500px;'><a href='particulars.html?type="+type+"&id="+n.informationid+"'>"
						+ n.title + "</a></p></td><td align='center'>"+n.createname+"</td><td align='center'>"+n.areas.name+"</td><td align='center'>"
						+ format(n.createtime) + "</td></tr>");
			}
		}
	});
}


function deleteMediate(id){
	var delSure = confirm('是否删除？');
	if(delSure) {
		$.post("../../information/delete.do", {
			id : id,
			type:type
		}, function(respose) {
			if (respose.status == 1) {
				alert(respose.msg);
				window.location.href = "InformationReleaseLList.html?type=" + type;
			} else {
				alert(respose.msg);
			}
		});
	}	
}


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