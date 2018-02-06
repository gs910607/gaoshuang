var startTime = '',
	endTime = '',
	artiTitle = '';

$(function() {

	$.post("../../conference/getPageList.do",{type:5}, function(data) {
		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page2'), //指定的元素
			callback : function(n) { //回调函数
				$.post("../../conference/getPageList.do?pages=" + n,{type:5}, function(data) {
					
					setConference(data);
				})
			}
		});
		setConference(data);
	})
});
handleClick(); //表格渲染完成后执行
function handleClick() {
	$(".modification").on("click", function() {
		var articleID = $(this).data("articleid");
		$(this).attr("href","postMessage.html?articleId="+articleID)
	})
}

$("#searchBtn").on("click", function() {
//	startTime = $("#startTime").val();
	var endTimeStr = $("#endTime").val().toString();

	artiTitle = $("#exampleInputName2").val();
	startTime = $("#startTime").val() ? new Date(($("#startTime").val())) : new Date("1970-01-01");
	var endTime2 = endTimeStr ? new Date(new Date(endTimeStr).setDate(new Date(endTimeStr).getDate() + 1)) : '';
	endTime = endTimeStr ? new Date(new Date(endTime2).setHours(new Date(endTime2).getHours() - 8)) : new Date();

	if(endTime && startTime > endTime) {
		$("#endTime").testRemind("结束时间不得大于开始时间");
		return;
	}
	init(artiTitle, startTime, endTime);
});

function init(title, start, end) {
	var params = {
		type:5
	}
	title?params.name = title : '';
	start?params.start = start : '';
	end?params.stop = end : '';
	$.post("../../conference/getPageList.do", params, function(data) {
		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page2'), //指定的元素
			callback : function(n) { //回调函数
				$.post("../../conference/getPageList.do?pages=" + n, {
					name : $("#exampleInputName2").val(),
					type:5
				}, function(data) {
					setConference(data);
				})
			}
		});
		setConference(data);

	})
}

function setConference(data) {
	$(".container .content .infoList table tbody").text("");
	$(data.list).each(function(i, n) {
		if (i < 10) {
			var str="<tr><td></td>" +
			"<td><p class='artTitle'>"+n.name+"</p></td>" +
			"<td align='center'>"+n.beginTime+"</td>" +
			"<td align='center'>"+n.duration+"</td>" +
			"<td align='center'>"+n.createName+"</td>" +
			"<td align='center'><a data-conoferid='"+n.accessCode+"' href='javascript:;' onclick='lookCode(event)'>查看</a></td>";
	        
			if(n.status==1){
				str=str+"<td align='center'><span data-conoferid='"+n.confId+"'>已结束</span></td></tr>";
			}else if(n.status!=1){
				var time=timeAdd(n.beginTime,n.duration);
				var nowTime=new Date().getTime();
				if(time<nowTime){
					str=str+"<td align='center'><span data-conoferid='"+n.confId+"'>已结束</span></td></tr>"
				}else{
					str=str+"<td align='center'><a data-conoferid='"+n.confId+"' href='javascript:;' onclick='endConfer(event)'>结束会议</a></td></tr>"
				}
			}
	  		$(".container .content .infoList table tbody").append(str);
		}
	});
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
					alert("成功结束会议");
					init(artiTitle, startTime, endTime);
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
	createTime = new Date(new Date(Date.parse(createTime.replace(/-/g,"/"))).getTime()).getTime();
	duration = new Date(duration*60*60*1000).getTime();
	return new Date(createTime + duration).getTime();
}
