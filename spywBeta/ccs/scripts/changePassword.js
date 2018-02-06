$(function(){
	
	$.post("../../area/getCode.do",function(data){
		$("#username").text(data.username);
		$("#realname").text(data.realname);
		$("#userid").val(data.userid);
	});
});





$("#changePassForm").html5Validate(function() {
	// 提交内容
	
	var params = {
		id: $("#userid").val(),
		password:$("#surePass").val(),
		oldPassword:$("#oldPass").val()
	}
	$.ajax({
		url : "../../admin/updatePassword.do", //请求的url地址
		dataType : "json", //返回格式为json
		data : params, //参数值
		type : "post", //请求方式
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(responseStr) {
			ajaxLoading.hide();
			if (responseStr.status == 1) {
				alert("密码修改成功")
				setTimeout(function() {
					window.location.href =responseStr.msg;
				}, 500)
			} else {
				alert(responseStr.msg);
			}
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		},
		completed : function() {
			ajaxLoading.hide();
		}
	});
},{
	validate: function() {
		var password = $("#newPass");
		if(password.val() && !(/^(\w){6,16}$/).test(password.val())) {
			password.testRemind("只能输入6-16个字母、数字、下划线").focus();
			return false;
		}

		var surePass = $("#surePass");
		if(surePass.val() !== password.val()) {
			surePass.testRemind("两次密码不一致")
			return false;
		}

		return true;
	}
})