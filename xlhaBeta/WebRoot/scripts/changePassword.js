$(function(){
	var res=sessionStorage.getItem("info");
	console.log(res);
	if(res!=1){
		alert("尚未登录");
		window.location.href="register.html";
		return;
	}
	$.post("../../area/getInfo.do",function(data){
		$("#userid").val(data.userid);
		$("#telephone").text(data.usertel);
	})
});

$("#changePassForm").html5Validate(function() {
	// var formData = new FormData();
	// formData.append("id", $("#userid").val());
	// formData.append("oldPassword", $("#oldPass").val());
	// formData.append("password", $("#surePass").val());

	var params = {
		id:$("#userid").val(),
		oldPassword:$("#oldPass").val(),
		password:$("#surePass").val()
	}

	$.ajax({
		url : '../../admin/updatePassword.do',
		type : 'POST',
		data : params,
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(responseStr) {
			ajaxLoading.hide();
			if (responseStr.status == 1) {
				alert(responseStr.msg);
				localStorage.removeItem("info");
				sessionStorage.removeItem("user");
				location.href = "register.html"
			} else {
				alert(responseStr.msg);
			}
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		},
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