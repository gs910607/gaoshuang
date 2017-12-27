var startTime = '',
endTime = '',
artiTitle = '';
	
$(function() {



	$.post("../../conference/getPageList.do",{type:1}, function(data) {
		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page2'), //指定的元素
			callback : function(n) { //回调函数
				$.post("../../conference/getPageList.do?pages=" + n,{type:1}, function(data) {
					
					setConference(data);
				})
			}
		});
		setConference(data);
	})
});


$("#searchBtn").on("click", function() {

	var endTimeStr = $("#endTime").val().toString();

	artiTitle = $("#exampleInputName2").val();
	startTime = $("#startTime").val() ? new Date(($("#startTime").val())) : new Date("1970-01-01");
	var endTime2 = endTimeStr ? new Date(new Date(endTimeStr).setDate(new Date(endTimeStr).getDate() + 1)) : '';
	endTime = endTimeStr ? new Date(new Date(endTime2).setHours(new Date(endTime2).getHours() - 8)) : new Date();

	if(startTime && endTime && startTime.getTime() > endTime.getTime()) {
		$("#endTime").testRemind("结束时间不得大于开始时间");
		return;
	}
	init(artiTitle, startTime, endTime);

});

function init(title, start, end) {
	$.post("../../conference/getPageList.do", {
		name : title,
		type:1,
		start: start,
		stop: end,
	}, function(data) {
		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page2'), //指定的元素
			callback : function(n) { //回调函数
				console.log(n)
				$.post("../../conference/getPageList.do?pages=" + n, {
					name : title,
					type:1,
					start: start,
					stop: end
				}, function(data) {
					setConference(data);
				})
			}
		});
		setConference(data);

	})
}

function timeToDate(time){
	time=time.replace(/-/g,':').replace(' ',':');
	time=time.split(':');
	var time1 = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
	return time1;
}


function setConference(data) {
	$("#content").text("");
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
	  $("#content").append(str);
		}
	});
}

handleClick(); //表格渲染完成后执行
function handleClick() {
	$(".modification").on("click", function() {
		var articleID = $(this).data("articleid");
		$(this).attr("href","postMessage.html?articleId="+articleID)
	})
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
					window.location.reload();
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

