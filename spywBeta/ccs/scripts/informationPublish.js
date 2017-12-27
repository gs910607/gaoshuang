
$(function() {
	var code = '0';
	$.ajax({
		type : 'POST',
		url : '../../area/getCode.do',
		dataType : 'json',
		success : function(response) {
			ajaxLoading.hide();
			if (response != null || response != "") {
				code = response.usergroupid;
				if (code.toString().split('').length== 9) {
					$("#postMessage").attr("href", "javascript:;");
					$("#postMessage").css("display","none");
				}
			}
		},
		error : function() {
			ajaxLoading.hide();
			alert("服务繁忙，请稍后再试")
		},
		beforeSend : function() {
			ajaxLoading.show();
		}
//		complete : function() {
//			ajaxLoading.hide();
//		}
	});



});