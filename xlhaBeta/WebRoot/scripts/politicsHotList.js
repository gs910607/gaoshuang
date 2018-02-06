
var numer = 1;

$(function() {

	$.post("../../politics/getPageList.do", function(data) {

		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page'), //指定的元素
			callback : function(n) { //回调函数
				$.post("../../politics/getPageList.do?pages=" + n, function(data) {
					setPolitics(data);
				});
			}
		});
		setPolitics(data);
	});


});

function setPolitics(data) {
	$("#content").text("");
	$(data.list).each(function(i, n) {
		$("#content").append("<tr><td></td><td width='650' class='text-left'><p style='width:650px'><a href='politicsHotDetails.html?type="
			+ n.type + "&id="
			+ n.id + "'>"
			+ n.title + "</a></p></td><td>"
			+ n.createTime + "</td><td class='operation'><a id='modification' href='politicsHotCreate.html?id="
			+ n.id + "'><img src='../../images/modification.png'></a><a onclick='deleteLegal(\"" + n.id + "\")' data='" + n.id + "'><img src='../../images/delete.png'></a></td></tr>");
	});

}




function deleteLegal(data) {
	isDelete("是否删除？", function() {
		$.post("../../politics/deletePolitics.do", {
			id : data
		}, function(respose) {
			if (respose.status == 1) {
				alert(respose.msg);
				window.location.href = "politicsHotList.html";
			} else {
				alert(respose.msg);
			}
		});
	});

}

function getSearch(n){
	// var formData = new FormData();
	// formData.append("cPoliticsType", $("#title").val());
	// if ($("#startTime").val() != "") {
	// 	formData.append("start", new Date($("#startTime").val()));
	// 	formData.append("stop", new Date($("#endTime").val()));
	// }

	var params = {
		cPoliticsType:$("#title").val(),
	}
	if ($("#startTime").val() != "") {
		params.start = new Date($("#startTime").val())
		params.stop = new Date($("#endTime").val())
	}

	$.ajax({
		url : '../../politics/getPageList.do?pages='+n,
		type : 'POST',
		data : params,
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(data) {
			ajaxLoading.hide();
			setPolitics(data);
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		},
		completed : function() {
			ajaxLoading.hide();
		}
	});
	
	
}

$("#html5Form").html5Validate(function() {
	// 搜索
	// var formData = new FormData();
	// formData.append("cPoliticsType", $("#title").val());
	// if ($("#startTime").val() != "") {
	// 	formData.append("start", new Date($("#startTime").val()));
	// 	formData.append("stop", new Date($("#endTime").val()));
	// }

	var params= {
		cPoliticsType: $("#title").val()
	}
	if ($("#startTime").val() != "") {
		params.start = new Date($("#startTime").val());
		params.stop = new Date($("#endTime").val());
	}

	$.ajax({
		url : '../../politics/getPageList.do',
		type : 'POST',
		data : params,
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(data) {
			ajaxLoading.hide();
			Page({
				num : data.num, //页码数
				startnum : 1, //指定页码
				elem : $('#page'), //指定的元素
				callback : function(n) { //回调函数
					getSearch(n);
				}
			});
			setPolitics(data);
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		},
		completed : function() {
			ajaxLoading.hide();
		}
	});

}, {
	validate : function() {
		if ($("#startTime").val() > $("#endTime").val()) {
			$("#endTime").testRemind("结束时间不得小于开始时间");
			return false;
		}

		return true;
	}
});