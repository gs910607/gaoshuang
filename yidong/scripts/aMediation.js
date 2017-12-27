
// 表单验证
$("input").on("focus", function() {
	$(this).removeClass("error");
});
$("#html5Form").html5Validate(function() {

	var fixedTelephone = $("#fixedTelephone");
	if(!(/^([0-9]{3,4}-)?[0-9]{7,8}$/).test(fixedTelephone.val())) {
		fixedTelephone.addClass("error");
		alert("固定电话有误，请重填");
		return false;
	}

	var phone = $("#phoneNumber");
	if(!(/^1[34578]\d{9}$/.test(phone.val()))){ 
		phone.addClass("error");
		alert("手机号码有误，请重填");
		return false; 
	} 

	//提交表单
	alert("验证通过")
});