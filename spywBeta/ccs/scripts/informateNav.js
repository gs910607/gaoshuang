
var code = '0';
$(function() {

	$.ajax({
		type : 'POST',
		url : '../../area/getCode.do',
		dataType : 'json',
		success : function(response) {
			ajaxLoading.hide();
			console.log(response)
			if (response != null || response != "") {
				code = response.usergroupid;
				if(code.toString().split('').length > 3){
					$("#informationPub li:nth-child(3)").remove();
				}
				if (code.toString().split('').length== 9) {
					// $("#informationPub").find("#addPub").remove();
				}
			}
		},
		error : function() {
			ajaxLoading.hide();
			alert("服务繁忙，请稍后再试")
		},
		beforeSend : function() {
			ajaxLoading.show();
		},
		complete : function() {
			ajaxLoading.hide();
		}
	});



});

// $("#postMessage").on("click", function() {

// 	if(code.toString().split('').length==9){
		
// 		isDelete("您没有信息发布的权限！", function() {});
// 	}



// });