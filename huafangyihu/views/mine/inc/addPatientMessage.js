// JavaScript Document
var user;
var token;
var id;  //受诊人ID
var sex;  //受诊人性别
var mobile;  //手机号
var userId;   //患者ID
var isDefault;   //是否默认0否 1是
var name;  //受诊人姓名
var birthday; //受诊人生日

getItem();

//切换性别
 $(".sex.recognition-affirm").on("click",function(){
	$(this).addClass("currentSex").siblings(".sex.recognition-affirm").removeClass("currentSex");
	$(".sex-person").css("color","#999");
	$(".currentSex").children(".sex-person").css("color","#EC9C00");
    $(".sex-img").attr("src","../../images/off.png");
	$(".currentSex").children(".sex-img").attr("src","../../images/on.png");
});

// 输入验证
function checkPhone(id){
    var phone = $(id).val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
    	$(id).addClass("error");
    };
};
$("input").on("focus", function() {
	$(this).removeClass("error")
})
function infoValid(id) {
	var thisVal = $.trim($(id).val());
	if(!thisVal) {
		$(id).addClass("error")
	};
};
$("#birthday input").on("change blur", function() {
	var ageVal = $(this).val();
	var mistiming = new Date().getTime() - new Date(ageVal).getTime();
	if(mistiming < 0){
		$(this).addClass("error");
		alert("选择日期超出时间范围");
	};
});


$("#name input").on("blur", function() {
	infoValid("#name input")
});
$("#phone input").on("blur", function() {
	infoValid("#phone input")
	checkPhone("#phone input");
});

// 保存
$(document).on("click", ".submit-button-a", function() {
	infoValid("#name input");
	infoValid("#phone input");
	checkPhone("#phone input");
	if($("#name input").hasClass("error")){
		alert("请输入姓名!");
		return;
	};
	if($(".currentSex").length <= 0) {
		alert("请选择性别！")
		return;
	};
	if($("#birthday input").val() == "") {
		alert("请选择出生日期！");
		return;
	};
	var ageVal = $("#birthday input").val();
	var mistiming = new Date().getTime() - new Date(ageVal).getTime();
	if(mistiming < 0){
		$("#birthday input").addClass("error");
		alert("选择日期超出时间范围");
		return;
	} else {
		$("#birthday input").removeClass("error");
	};

	if($("#phone input").hasClass("error")){
		if($("#phone input").val() == ""){
			alert("请输入手机号码!");
		} else {
			alert("手机号码有误，请重填！");
		}
		return;
	};
	if($("#birthday input").hasClass("error")) {
		alert("选择日期超出时间范围");
		return;
	};

	var params = {
		token: token,
		sex: $(".currentSex .sex-person").text(),
		mobile: $("#phone input").val(),
		isDefault: '0',
		patientId: userId,
		name: $("#name input").val(),
		birthday: new Date($("#birthday input").val()).getTime()
	};
	// console.log(JSON.stringify(params))
	$.ajax({
		type: 'POST',
		url: config.appserver_url + '/personal/addServicePeople.json',
		data: JSON.stringify(params),
		dataType: 'json',
		contentType: 'application/json',
		success: function(response) {
			tokenLose(response.status);
			$(this).off("click");
			historyBack();
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});
})

// 获取数据
function getItem() {
    user = JSON.parse(localStorage.getItem("user"));
    token = user.token;
    userId = user.userId;
};

$("header > a").on("click", function() {
	historyBack();
})
