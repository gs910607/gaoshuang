$(function () {
    initClick();
});

// function initCheck() {
//     //进行相关操作
//     var phone = $('#phone').val();
//     var passWord = $('#newPwd').val();
//     if(phone !== "" && passWord.length >= 6) {
//         $(".loginBtn").css("background", "#ec9c00");
//         $(".loginBtn").attr("disabled",false); //可用
//     } else {
//         $(".loginBtn").css("background", "#CCCCCC");
//         $(".loginBtn").attr("disabled", true); //禁用
//     }
// };

// $('.changeCheck').on('input propertychange', function() {
//     initCheck();
// });

// $('.phoneNumber').on('input propertychange', function() {
//     var phone = $('#phone').val();
//     if(phone !== "" && phone.length >= 11) {
//         $("#getCode").css("color", "#ec9c00");
//         $("#getCode").attr("disabled",false); //可用
//     } else {
//         $("#getCode").css("color", "#CCCCCC");
//         $("#getCode").attr("disabled", true); //禁用
//     }
// });

function initClick() {
    $('#getCode').click(function(){
        var phone = $("#phone").val();
        if(phone == "") {
            $('.login-tooltip').removeClass('void').text("请输入手机号码");
            setTimeout(function() {
                $('.login-tooltip').addClass('void').text("");
            }, 2000);
            return;
        } else if(!(/^1[34578]\d{9}$/.test(phone))) {
            $('.login-tooltip').removeClass('void').text("手机号码有误，请重新输入");
            setTimeout(function() {
                $('.login-tooltip').addClass('void').text("");
            }, 2000);
            return;
        };
        getCode();
    });
};

//验证手机号、验证、密码是否为空
function isNull(phone, smsCode, password) {
	if(!(phone || smsCode || password)) {
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

//验证验证码是否为空
function checkCode(smsCode) {
	if(!smsCode) {
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

$('#phone').on('input propertychange', function () {
  var phone = $("#phone").val();
  if(phone && checkPhone(phone)) {
    $("#getCode").attr("disabled", false).css("color","#ec9c00");
  } else {
    $("#getCode").attr("disabled", true).css("color","#ccc");
  }
});


function getCode(){
    //获取验证码
    var phone = $("#phone").val();

    $.ajax({
        type: 'GET',
        url: config.applogin_url + "/sms/getSmsCode.json",
        data: {
            phone: phone,
            type:1
        },
        dataType: "JSON",
        success: function (e) {
            if (e.status == 1) {
                // 成功(需要进行页面提示),页面开始倒计时1min
                // 初始化计时器
                count = 59;
                // 开始计时
                $('.getReq').addClass('void');
                $('.sendReq').removeClass('void');
                setInterval(function () {
                    --count;
                    if(count<=0) {
                        $('.getReq').removeClass('void');
                        $('.sendReq').addClass('void');
                        count = 59;
                    }
                    $('.reciprocal').text(count);

                },1000);

            } else {
                $('.login-tooltip').removeClass('void').text(e.errorMsg);
                setTimeout(function() {
                    $('.login-tooltip').addClass('void').text("");
                }, 2000);
            }
        }
    });
}

$("#confirm").on("click", function () {
  var passWord =$("#newPwd").val();
  var phone = $("#phone").val();
  var smsCode = $("#smsCode").val();
  var checkConsent = $(".responsive-yes").attr("data-id");

  if(!isNull(phone, smsCode, passWord)) {
    $("#phone, #smsCode, #newPwd").addClass("error");
    alert("手机号 密码 验证码不得为空");
    return;
  };

  if(!checkPhone(phone)) {
    $("#phone").addClass("error");
    alert("手机号码有误，请重新输入");
    return;
  }

  if(!checkCode(smsCode)) {
    $("#smsCode").addClass("error");
    alert("验证码不得为空");
    return;
  }

  if(!checkPassword(passWord.length)) {
    $("#newPwd").addClass("error");
    alert("登录密码为6-12位字符")
    return;
  }

  if (checkConsent == "0") {
      alert("请勾选用户使用协议");
      return;
  };

  confirm();

});

function confirm() {
    var phone = $("#phone").val();
    var newPwd = $("#newPwd").val();
    var smsCode = $("#smsCode").val();

    $.ajax({
        type: 'POST',
        url: config.applogin_url + "/appLogin/findPwd.json",
        data: {
            phone: phone,
            newPwd: newPwd,
            smsCode: smsCode,
            userType:constant.userType
        },
        dataType: "JSON",
        success: function (e) {
            console.log(e);
            if(e.status == 1){
                new TipBox({type:'success',str:'重置成功',hasBtn:true});
                setTimeout(function () {
                    window.location.href =  "./login.html";
                },3000);
            }else{
                // setTimeout(function () {
                    new TipBox({type:'error',str:e.errorMsg,hasBtn:true});
                    $('.login-tooltip').addClass('void');
                // },3000)
            }
        }
    });
};
