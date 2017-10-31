// JavaScript Document
var user;
var userId;
var token;


 var balance = GetQueryStr("balance");
 $(".account_balance_number").text(balance);
 
getItem();
init();
initBalance();






function init() {
    var params = {
        userId: userId,
        token: token
    };
 console.log(params)
    $.ajax({
        type: "GET",
        url: config.appserver_url + '/personal/queryUserInfo.json',
        dataType: 'json',
        contentType: 'application/json',
        data: params,
        success: function(response) {
        	console.log(response)
            tokenLose(response.status);
            var data = response.data;
			var capitalAccount = data.capitalAccount;
//			 $(".account_balance_number").text(capitalAccount.totalAmount);
//			 $(".cash_withdrawal_amount_number").text(capitalAccount.balance);     
        },
        error: function() {
            alert('服务繁忙，请稍后再试！');
        }

    })
}

// 初始化渲染（可使用余额）
function initBalance() {
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
        	$("#canBalance").text(data.data);
        },
        error: function() {
            alert('服务繁忙，请稍后再试！');
        }

    })
}

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
}


$("#canWithdraw").on("click",function(){
	window.location.href="withdrawals.html?"
})

//收支明细页面
$("#income").on("click",function(){
	window.location.href="collectPay.html?"
})
