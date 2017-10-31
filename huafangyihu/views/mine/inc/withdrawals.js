// JavaScript Document
//弹出拨打
$(".explain").on("click", function() {
	$("#modal").css("display", "none")
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#dialMain").css("display", "block")
	//禁用滚动条事件
	$("body").css("overflow", "hidden")

	$(".dialMain-address").on("click", function() {
		$("#dialMain").css("display", "none")
		$("#modal").css("display", "none")
		$("body").css("overflow", "auto")
	})

	//模态框弹出层
	$("#attention-img-yes").on("click", function() {
		$("#modal").css("display", "block")
		var modalWidth = $(document).width()
		var modalHeight = $(document).height()
		$("#modal").width(modalWidth)
		$("#modal").height(modalHeight)
		$("#modal").css("background-color", "#111111")
		$("#modal-div").css("display", "block")
		$("#modal-div").css("background-color", "white")
	})
	$("#modal-div-second").on('click', function() {
		$("#modal-div").css("display", "none")
		$("#modal").css("display", "none")
	})
	$("#modal-div-three").on('click', function() {
		$("#modal-div").css("display", "none")
		$("#modal").css("display", "none")
	})
})

var user;
var userId;
var token;
var price;
var name;
var withdrawalAccount;
var bankName;
var smsValidateCode;

getItem();
init();
initClick();

function checkValid(data) {
	$(".account_balance_number_price").on("input propertychange", function() {
		var money = $(".account_balance_number_price").val();
		this.value=this.value.replace(/\D/g,'')
		// var limit_span = $(".limit_span").text();
		if(money > parseFloat(data)) {
			this.value = parseFloat(data);
		}
	})
	$(".account_balance_number_price").on("blur", function(){
		var money = $(".account_balance_number_price").val();
		if(money < 50) {
			alert("提现金额应大于等于50元");
		}
	});
	function checkUser(str){

	};

	//隐藏号码关键字段
	function encMobile(mobile) {
		return mobile.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
	}
	var mobile = encMobile(user.phone);
	$(".bind_phone_span").text(mobile);


	$(".withdrawals_button_p").on("click", function() {
		// var limit_span = $(".limit_span").text();
		var money = $(".account_balance_number_price").val();
		if(money > parseFloat(data)) {
			alert("超出可提现金额");
			return;
		}
		if(money < 50) {
			alert("提现金额应大于等于50元");
			return;
		};
		withdrawalAccount = $("#alipayAccount").val();
		price = $(".account_balance_number_price").val();
		name = $("#alipayName").val();
		console.log(name)
		smsValidateCode = $(".mine_wallet_list_verification_box>input").val();
		initWithdraw();
	})
}
//账户提现
function initWithdraw() {

	var params = {
		userId: userId,
		price: price,
		type: "1",
		name: name,
		phone: user.phone,
		way: "0",
		//提现账户
		withdrawalAccount: withdrawalAccount,
		//开户名称
		bankName: "",
		//短信验证码
		smsValidateCode: smsValidateCode
	}
	console.log(params)
	$.ajax({
		type: "POST",
		url: config.appserver_url + '/withdrawal/applyWithdrawal.json',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(params),
		success: function(data) {
			console.log(data)
			$(".account_balance_number").text(data.data);
			location.href="withdrawalsRecord.html?"
		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		}

	})
}

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	console.log(user)
	userId = user.userId;
	//	name = user.name;
	token = user.token;
}

function initClick() {

	//获取验证码
	$(".confirm_button").on("click", function() {
		var phone = user.phone;
		if(phone == "") {
			alert("请输入手机号码");
			return;
		} else if(!(/^1[34578]\d{9}$/.test(phone))) {
			alert("手机号码有误，请重新输入")
			return;
		};

		$.ajax({
			type: 'GET',
			url: config.appserver_url + "/smsTemplate/getSmsValidateCode.json",
			data: {
				phone: phone,
				smsTemplateCode: "SMS_66765131"
			},
			dataType: "JSON",
			success: function(e) {
				console.log(e)
				if(e.status == 1) {
					// 成功(需要进行页面提示),页面开始倒计时1min
					// 初始化计时器
					count = 59;
					// 开始计时
					clearInterval(timer);
					var timer = setInterval(function() {
						$(".confirm_button").val('重新发送（' + count + '）')
						count--;
						if(count <= 0) {

							count = 59;
							$(".confirm_button").attr("disabled",false).css("color","#ec9c00").val('重新发送');
							clearInterval(timer);
						}

					}, 1000);

				} else {
					alert(e.errorMsg)
				}
			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			},
			beforeSend: function() {
				$(".confirm_button").attr("disabled", true).css("color","#ccc");
			}
		});
	});

};




// 初始化渲染
function init() {
    var params = {
        userId: userId
    };
 console.log(params)
    $.ajax({
        type: "GET",
        url: config.appserver_url + '/withdrawal/queryBalance.json',
        dataType: 'json',
//      contentType: 'application/json',
        data: params,
        success: function(data) {
        	console.log(data)
			var data = data.data ? data.data : "0"
        	$(".limit").text("可提现金额："+ data +"元");
			checkValid(data);
        },
        error: function() {
            alert('服务繁忙，请稍后再试！');
        }

    })
}
