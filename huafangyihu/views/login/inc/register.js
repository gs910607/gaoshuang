var weixinCode;
var recommendId;
$(function () {
    weixinCode = GetQueryString("code");
    recommendId = GetQueryString("state");
    console.log(weixinCode);
    initClick();
    userProtocol();
});

var clinicStatus = GetQueryStr("status");
if(clinicStatus == 'shareRegister' && JSON.parse(localStorage.getItem("user"))) {
  location.href = '../myClinic/clinicIndex.html'
}

// function initCheck2() {
//     //进行相关操作
//     var phone = $('#phone').val();
//     var passWord = $('#password').val();
//     var smsCode = $("#smsCode").val();
//     if (phone !== "" && passWord.length >= 6 && smsCode !== "") {
//         $(".loginBtn").css("background", "#ec9c00");
//         $(".loginBtn").attr("disabled", false); //可用
//     } else {
//         $(".loginBtn").css("background", "#CCCCCC");
//         $(".loginBtn").attr("disabled", true); //禁用
//     }
// };

// $('.changeCheck').on('input propertychange', function () {
//     initCheck2();
// });

// $('.phoneNumber').on('input propertychange', function () {
//     var phone = $('#phone').val();
//     if (phone !== "" && phone.length >= 11) {
//         $("#getCode").css("color", "#ec9c00");
//         $("#getCode").attr("disabled", false); //可用
//     } else {
//         $("#getCode").css("color", "#CCCCCC");
//         $("#getCode").attr("disabled", true); //禁用
//     }
// });

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

function initClick() {

    //获取验证码
    $('.getReq').click(function () {

        var phone = $("#phone").val();

        if (phone == "") {
            alert("请输入手机号码");
            return;
        } else if (!(/^1[34578]\d{9}$/.test(phone))) {
            alert("手机号码有误，请重新输入")
            return;
        };

        $.ajax({
            type: 'GET',
            url: config.applogin_url + "/sms/getSmsCode.json",
            data: {
                phone: phone,
                type: 1 //1:居家医护 2：医护社区
            },
            dataType: "JSON",
            success: function (e) {
                console.log(e)
                if (e.status == 1) {
                    // 成功(需要进行页面提示),页面开始倒计时1min
                    // 初始化计时器
                    count = 59;
                    // 开始计时
                    $('.getReq').addClass('void');
                    $('.sendReq').removeClass('void');
                    setInterval(function () {
                        --count;
                        if (count <= 0) {
                            $('.getReq').removeClass('void');
                            $('.sendReq').addClass('void');
                            count = 59;
                        }
                        $('.reciprocal').text(count);

                    }, 1000);

                } else {
                    alert(e.errorMsg)
                }
            }
        });
    });
};
$("#registerBtn").on("click", function () {
  var passWord =$("#password").val();
  var phone = $("#phone").val();
  var smsCode = $("#smsCode").val();
  var checkConsent = $(".responsive-yes").attr("data-id");

  if(!isNull(phone, smsCode, passWord)) {
    $("#phone, #smsCode, #password").addClass("error");
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
    $("#password").addClass("error");
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
    var passWord = $("#password").val();
    var smsCode = $("#smsCode").val();
    var checkConsent = $(".responsive-yes").attr("data-id");


    $.ajax({
        type: 'POST',
        url: config.applogin_url + "/appLogin/register.json",
        data: {
            phone: phone,
            passWord: passWord,
            smsCode: smsCode,
            deviceType: 3, //微信
            userType: 1, //用户
            code: weixinCode, //微信CODE
            recommendId : recommendId //邀请人ID
        },
        dataType: "JSON",
        success: function (e) {
            console.log(e)
            if (e.status == 1) {
                new TipBox({
                    type: 'success',
                    str: '注册成功',
                    hasBtn: true
                });
                setTimeout(function () {
                    var phone = $("#phone").val();
                    var password = $("#password").val();

                    //如果注册成功直接进入主页
                    if (phone && passWord) {
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
                            success: function (e) {
                                console.log(e);
                                if (e.status == 1) {
                                    localStorage.setItem("user", JSON.stringify(e.data));
                                    window.location.href = "../main/index.html";
                                } else {
                                    $('.login-tooltip').removeClass('void').text(e.errorMsg);
                                    setTimeout(function () {
                                        $('.login-tooltip').addClass('void').text("");
                                    }, 1)
                                }
                            }
                        });
                    }
                }, 2000);
            } else {
                new TipBox({
                    type: 'error',
                    str: e.errorMsg,
                    hasBtn: true
                });
                $('.login-tooltip').addClass('void');
            }
        }

    });
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function userProtocol() {
    $(".responsive-yes").on("click", function () {
        $(this).attr("data-id", 0);
        $(this).hide();
        $(".responsive-no").show();
    })
    $(".responsive-no").on("click", function () {
        $(this).hide();
        $(".responsive-yes").show();
        $(".responsive-yes").attr("data-id", 1);
    })
}
