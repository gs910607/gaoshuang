// JavaScript Document
var user;
var userId;
var token;
var username;
var birthday;
var sex;
var age;
var phone;
var servicePeopleId;
var ageFlag;
var deptName;
var doctorName;
var department;
var clinicId;
var hospitalName;
var cloudClinicDoctorId;
var class_name;
var week;
var doctorId;
var cloudHosId;
var date;
var userBirthday;

getItem();
//sex = user.sex;
//birthday = user.birthday;
//计算用户年龄
var arr1 = [];
arr1 = user.birthday.split("-");
var oldTime = arr1[0];
//切换性别
$(".sex.recognition-affirm").on("click", function() {
	$(this).addClass("currentSex").siblings(".sex.recognition-affirm").removeClass("currentSex");
	$(".sex-person").css("color", "#999");
	$(".currentSex").children(".sex-person").css("color", "#EC9C00");
	$(".sex-img").attr("src", "../../images/off.png");
	$(".currentSex").children(".sex-img").attr("src", "../../images/on.png");
});

init();
gainMessage();
if(sex == "女") {
	sex = "1";
} else {
	sex = "0";
}

function init() {
	$(".attending-person > span").text(username);
	$(".telephone-number").val(phone);
};

function getItem() {
	username = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : "请选择受诊人";
	phone = sessionStorage.getItem("phone");
	birthday = unescape(sessionStorage.getItem("birthday"));
	userBirthday = birthday.split("日")[0];
	var cancelCharacter = userBirthday.replace("年", "-").replace("月", "-");
	birthday = cancelCharacter;
	doctorId = GetQueryStr("doctorId");
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	sex = sessionStorage.getItem("sex");
	servicePeopleId = sessionStorage.getItem("servicePeopleId")
	class_name = sessionStorage.getItem("class_name");
	week = sessionStorage.getItem("week");
	date = sessionStorage.getItem("date");
};

// 验证身份证
$("input").on("focus", function() {
	$(this).removeClass("error");
});

function isCardNo(card) {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if($(".identity").val() && reg.test(card) === false) {
		$(".identity").addClass("error");
	}
};

// 验证手机号
function checkPhone(id) {
	var phone = $(id).val();
	if(!(/^1[34578]\d{9}$/.test(phone))) {
		$(id).addClass("error");
	};
};

$(".submit-button-a").on("click", function() {
	var identity = $(".identity").val();
	var name = $(".attending-person span").text();
	var phone = $(".telephone-number").val();
	if(!name) {
		alert("请选择受诊人");
		return;
	};
	isCardNo(identity);
	if(identity && $(".identity").hasClass("error")) {
		alert("身份证输入不合法");
		return;
	}

	checkPhone(".telephone-number");
	if($(".telephone-number").hasClass("error")) {
		if($(".telephone-number").val() == "") {
			alert("请输入手机号码!");
		} else {
			alert("手机号码有误，请重填！");
		}
		return;
	};
	initOrder();

});

$("header > a").on("click", function() {
	removeItem();
});

function removeItem() {
	sessionStorage.removeItem("username");
	sessionStorage.removeItem("sex");
	sessionStorage.removeItem("age");
	sessionStorage.removeItem("phone");
	sessionStorage.removeItem("servicePeopleId");
	sessionStorage.removeItem("birthday");
	sessionStorage.removeItem("class_name");
	sessionStorage.removeItem("week");
	sessionStorage.removeItem("date");
};
var yuyueTime;
if(new Date().getMonth + 1 > parseInt(date)) {
	yuyueTime = new Date().getFullYear() + 1 + '-' + date + ' ' + week + ' ' + class_name;
} else {
	yuyueTime = new Date().getFullYear() + '-' + date + ' ' + week + ' ' + class_name;
}

function gainMessage() {
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;

	var parmas = {
		userId: userId,
		doctorId: doctorId,
		token: token
	}

	$.ajax({
		type: "get",
		data: parmas,
		url: config.appserver_url + "/userEvaluate/queryDocIndexEvaluate.json",
		dataType: "json",
		async: true,
		success: function(data) {
			console.log(data)
			var data = data.data;
			cloudClinicDoctorId = data.docIndexVo.cloudDocTorId;
			clinicId = data.docIndexVo.cloudHosId;
			doctorId = data.docIndexVo.id;
			deptName = data.docIndexVo.deptName;
			doctorName = data.docIndexVo.realName;
			hospitalId = data.docIndexVo.hospitalId;
			department = data.docIndexVo.cloudDeptId;
			hospitalName = data.docIndexVo.hospitalName;
			$(".hospitalName").text(data.docIndexVo.hospitalName);
			$(".appointment-time").text(yuyueTime)
			$(".realName").text(doctorName);
		}
	})
}

//页面渲染
function initOrder() {
	user = JSON.parse(localStorage.getItem("user"));

	userId = user.userId;

	var servicePeopleId = sessionStorage.getItem("servicePeopleId")
	var diseaseDesp = $(".patient-message>textarea").val();
	var patientName = $(".attending-person>span").text();
	var mobile = $(".telephone-number").val();
	var parms = {
		userId: userId,
		mobile: mobile,
		sex: sex,
		name: patientName,
		orderStartTime: new Date().getFullYear() + '-' + date,
		doctorId: doctorId,
		cloudClinicDoctorId: cloudClinicDoctorId,
		birthday: birthday,
		department: department,
		ageFlag: ageFlag,
		clinicId: clinicId,
		hospitalId: hospitalId,
		clinicName: hospitalName,
		diseaseDesp: diseaseDesp,
		servicePeopleId: servicePeopleId
	};
	console.log(parms)
	var parmasList = JSON.stringify(parms);
	console.log(parmasList)
	//页面打开时候加载的接口 查询
	$.ajax({
		type: "POST",
		url: config.appserver_url + '/doc/workTable/scheduling/appointmentDoctor.json',
		data: parmasList,
		contentType: "application/json",
		dataType: 'JSON',
		success: function(data) {
			console.log(data)
			if(data.status == 1) {
				alert("预约成功")
				//2秒后跳回主页
				removeItem();
				setTimeout(function() {
					window.location.href = "../../views/main/index.html?"
				}, 2000)

			} else {
				alert("预约失败")
			}

			//						console.log(data)
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});
}

//当天日期渲染
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

var orderTime = getNowFormatDate();
console.log(orderTime)

var arr2 = [];
arr2 = orderTime.split("-");
var nowTime = arr2[0];
age = nowTime - oldTime;

if(age > 2) {
	ageFlag = "N";
} else {
	ageFlag = "Y";
}

//当天日期渲染
function getNowFormatDate1() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + "年" + month + "月" + strDate;
	return currentdate;
}
$("header > a").on("click", function() {
	historyBack();
});

$(".attending-person").on("click", function() {
	historyForward("../medic/attendingPerson.html");
});