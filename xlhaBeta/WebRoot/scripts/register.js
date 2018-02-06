
$("#registerBtn1").on("click", function() {
	$(".registerForm").show();
	$(".loginForm").hide();
	$(".title").text("用户注册")
});
$("#loginBtn2").on("click", function() {
	$(".registerForm").hide();
	$(".loginForm").show();
	$(".title").text("用户登录")
});

new selectArea('body',{
	isSelect: true
})

// var curModule = location.hash;
// if(curModule == '#register') {
// 	$(".registerForm").show();
// 	$(".loginForm").hide();
// 	$(".title").text("用户注册")
// } else {
// 	$(".registerForm").hide();
// 	$(".loginForm").show();
// 	$(".title").text("用户登录")
// }

// $(window).on("hashchange", function() {//兼容ie8+和手机端
//     location.reload();
// });
// window.addEventListener('popstate', function() {// 前进后退触发
// 	location.reload();
// });

$("#loginBtn1").on("click", function() {

	var phone = $("#loginTelephone");
	var note = $("#note");

	if(phone.val() == '') {
		phone.focus().testRemind("请输入手机号码");
		return;
	}

	if(note.val() == '') {
		note.focus().testRemind("请输入短信验证");
		return;
	}

	if(!(/^1[34578]\d{9}$/.test(phone.val()))){
		phone.focus().testRemind("手机号码有误");
		return;
	}

	var params = {
		phone: phone.val(),
		verity: note.val()
	}

	$.ajax({
		url : '../../admin/webLogin.do',
		type : 'POST',
		data : params,
		dataType: 'json',
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(responseStr) {
			ajaxLoading.hide();
			if (responseStr.status == 1) {
				sessionStorage.setItem("info",1);
				sessionStorage.setItem("user", JSON.stringify(responseStr.user));
				location.href = "../../index.html"
			} else {
				alert(responseStr.msg);
			}
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		}
	});
});

$("#registerBtn2").on("click", function(){

	var phone = $("#telephone");
	var idNumber = $("#idNumber");
	var realname = $("#realname");
	var district = $("#district");

	if(phone.val() == '') {
		phone.focus().testRemind("请输入手机号码");
		return;
	}

	if(idNumber.val() == '') {
		idNumber.focus().testRemind("请输入身份证号码");
		return;
	}

	if(realname.val() == '') {
		realname.focus().testRemind("请输入真实姓名");
		return;
	}

	if(district.val() == '') {
		district.focus().testRemind("请选择所在地");
		return;
	}

	if(!(/^1[34578]\d{9}$/.test(phone.val()))){
		phone.focus().testRemind("手机号码有误")
		return; 
	}


	if(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idNumber.val())){
        idNumber.focus().testRemind("身份证号格式错误");
        return false;
    }

	var params = {
		usertel: $("#telephone").val(),
		username: $("#telephone").val(),
		identity: $("#idNumber").val(),
		realname: $("#realname").val(),
		District: $("#district").val(),
		County:  $("#county").val(),
		Village: $("#village").val()
	}

	$.ajax({
		url : '../../admin/register.do',
		type : 'POST',
		data : params,
		dataType: 'json',
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(responseStr) {
			ajaxLoading.hide();
			if (responseStr.status == 1) {
				alert(responseStr.msg);
				location.href="register.html"
			} else {
				alert(responseStr.msg);
			}
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		},
	});
});