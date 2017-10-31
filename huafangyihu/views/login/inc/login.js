// function initCheck() {
	//进行相关操作
	// var phone = $('#phone').val();
	// var passWord = $('#passWord').val();
  //   if(phone !== "" && passWord.length >= 6) {
  //       $(".loginBtn").css("background", "#ec9c00");
  //       $(".loginBtn").attr("disabled",false); //可用
  //   } else {
  //       $(".loginBtn").css("background", "#CCCCCC");
  //       $(".loginBtn").attr("disabled", true); //禁用
  //   }
// };

// $('.changeCheck').bind('input propertychange', function() {
// 	initCheck();
// });

// $(function() {
// 	initClick();
// });
//
// function initClick() {
// 	$('#login').click(function() {
// 		checkPhone();
//
// 	});
// }
//check校验
//校验手机号码
// function checkPhone() {
// 	var phone = $('#phone').val();
// 	if(!(/^1[34578]\d{9}$/.test(phone))) {
// 		$('.login-tooltip').removeClass('void').text("手机号码有误，请重新输入");
// 		setTimeout(function() {
// 			$('.login-tooltip').addClass('void').text("");
// 		}, 2000);
//
// 	} else {
// 		login();
// 	}
// 	checkPassword();
// };
//校验密码
// function checkPassword() {
// 	var passWord = $('#passWord').val();
//
// 	if(passWord.length >= 6 && passWord.length <= 12) {
//
// 	} else {
//
// 		$('.login-tooltip').removeClass('void').text("登录密码为6-12位字符");
// 		setTimeout(function() {
// 			$('.login-tooltip').addClass('void').text("");
// 		}, 2000);
//
// 	}
//
// };
//验证手机号和密码是否为空
function isNull(phone, password) {
	if(!(phone || password)) {
		return false;
	} else {
		return true;
	}
};

//验证手机号是否合法
function checkPhone(phone) {
	if(!(/^1[34578]\d{9}$/.test(phone))) {
		return false;
	} else {
		return true;
	}
};

//验证密码字数
function checkPassword(password) {
	if(password >= 6 && password <= 12) {
		return true;
	} else {
		return false;
	}
};

$("input").on("focus", function() {
	$(this).removeClass("error");
});

//点击登录
$('#login').on("click", function() {

	var phone = $("#phone").val();
	var passWord = $("#passWord").val();

	if(!isNull(phone, passWord)) {
		$("#phone, #passWord").addClass("error");
		alert("手机号和密码不得为空");
		return;
	};

	if(!checkPhone(phone)) {
		$("#phone").addClass("error");
		alert("手机号码有误，请重新输入");
		return;
	}

	if(!checkPassword(passWord.length)) {
		$("#passWord").addClass("error");
		alert("登录密码为6-12位字符")
		return;
	}

	login();

});


function login() {
	var phone = $("#phone").val();
	var passWord = $("#passWord").val();
	var validateCode = $("#validateCode").val();
	$.ajax({
		type: 'POST',
		url: config.applogin_url + "/appLogin/toLogin.json",
		data: {
			phone: phone,
			passWord: passWord,
			deviceType: 3, //微信固定值
			userType: 1
		},
		dataType: "JSON",
		success: function(e) {
			console.log(e);
			if(e.status == 1) {
				localStorage.setItem("user", JSON.stringify(e.data));
				if(sessionStorage.getItem("noLogin")) {
					var noLogin = sessionStorage.getItem("noLogin");
					sessionStorage.removeItem("noLogin");
					console.log('..' + noLogin)
					location.href = '..' + noLogin;
				} else {
					window.location.href = "../main/index.html";
				}
			} else {
				$('.login-tooltip').removeClass('void').text(e.errorMsg);
				setTimeout(function() {
					$('.login-tooltip').addClass('void').text("");
				}, 3000)
			}
		}
	});
}
