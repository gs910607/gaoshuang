
// 表单验证
$("#html5Form").html5Validate(function() {
	//提交表单
	alert("验证通过")
},{
	validate: function() {
		// 验证固话
		var fixedTelephone = $("#fixedTelephone");
		if(!(/^([0-9]{3,4}-)?[0-9]{7,8}$/).test(fixedTelephone.val())) {
			$("html,body").scrollTop(fixedTelephone.offset().top)
			fixedTelephone.testRemind("固定电话有误，请重填");
			return false;
		}

		// 验证手机号
		var phone = $("#phoneNumber");
		if(!(/^1[34578]\d{9}$/.test(phone.val()))){
			$("html,body").scrollTop(phone.offset().top)
			phone.testRemind("手机号码有误，请重填");
			return false; 
		}

		// 验证人数
		var personNumber = $("#personNumber");
		if(!(/^[0-9]*$/.test(personNumber))) {
			$("html,body").scrollTop(personNumber.offset().top)
			personNumber.testRemind("人数只能为数字");
			return false;
		}

		return true;
	}
});