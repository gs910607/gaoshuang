
var numer = 1;
var cLegalTitle = '';

$(function() {

	$.post("../../legal/getPageList.do",{sizePage:config.sizePage} ,function(data) {

		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page'), //指定的元素
			callback : function(n) { //回调函数
				$.post("../../legal/getPageList.do?pages=" + n,{sizePage:config.sizePage}, function(data) {

					setLegal(data);

				});
			}
		});


		setLegal(data);

	});


});

function setLegal(data) {
	$("#content").text("");
	var txt='';
	$(data.list).each(function(i, n) {
		txt+='<tr><td class="text-left">'
		txt+='<a href="legalPublicityDetails.html?type='+n.CLegalType+'&id='+n.CLegalId+'" >· '+n.CLegalTitle + '</a></td>';
		txt+='<td width="180" align="right">'+ n.CLegalCreatetime + '</td>';
		// if(n.create!=null){
		// 	txt+='<td>'+ n.create + '</td>';
		// }else{
		// 	txt+='<td> </td>';
		// }
		// if(n.editor!=null){
		// 	txt+='<td>'+ n.editor + '</td>';
		// }else{
		// 	txt+='<td> </td>';
		// }
		txt+='</tr>';
//		$("#content").append("
//					"<td class='operation'><a id='modification' href='legalPublicityPublish.html?id="
//			+ n.CLegalId + "'><img src='../../images/modification.png'></a><a onclick='deleteLegal(\"" + n.CLegalId + "\")' data='" + n.CLegalId + "'><img src='../../images/delete.png'></a></td>" +
//					);
	});
	$("#content").html(txt);

}

function deleteLegal(data) {

	if(confirm("是否删除?")) {
		$.post("../../legal/deleteLegal.do", {
			id : data
		}, function(respose) {
			if (respose.status == 1) {
				alert(respose.msg);
				window.location.href = "legalPublicityList.html";
			} else {
				alert(respose.msg);
			}
		});
	}
}

function getSearch(n){

	var params = {
		cLegalTitle: cLegalTitle,
		sizePage: n,
		sizePage: config.sizePage
	};

	$.ajax({
		url : '../../legal/getPageList.do?',
		type : 'POST',
		data : params,
		dataType: 'json',
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(data) {
			ajaxLoading.hide();
			setLegal(data);
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


$("#searchBtn").on("click", function() {
	
	cLegalTitle = $("#title").val();
	var params = {
		cLegalTitle: cLegalTitle,
		sizePage: config.sizePage
	};

	// if($("#startTime").val() != "") {
	// 	params.start = new Date($("#startTime").val()),
	// 	params.stop = new Date($("#endTime").val())
	// };


	$.ajax({
		url : '../../legal/getPageList.do',
		type : 'POST',
		data : params,
		dataType: 'json',
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
					$.post("../../legal/getPageList.do?",{cLegalTitle: cLegalTitle,pages:n,sizePage:config.sizePage}, function(data) {

						setLegal(data);

					});
				}
			});
			setLegal(data);
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		},
		completed : function() {
			ajaxLoading.hide();
		}
	});
	

});