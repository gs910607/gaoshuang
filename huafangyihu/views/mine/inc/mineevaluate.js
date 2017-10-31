var token;
var userId;
var doctorId = GetQueryStr("doctorId");
var orderNo = GetQueryStr("orderNo");
var hospitalId = GetQueryStr("hospitalId");
var type;
var relationId;
getItem()
if(doctorId) {
	type = 3; //评价医护
	relationId = doctorId;
	init();
} else if(hospitalId) {
	type = 2; //评价机构
	relationId = hospitalId;
	init2();
}

// 初始化渲染
function init() {
	var params = {
		doctorId: doctorId,
		token: token
	};
	console.log(params)
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/docPa/selectPersonal.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(data) {
			console.log(data)
			tokenLose(data.status);
			//			if(data.data.realName == null) {
			//				console.log(data.data.realName)
			//				$("#doctorName>span").text("未能查询到该医生姓名");
			//			} else {
			$("#doctorName>span").text(data.data.realName);
			//			}
			$(".synopsis-img").attr("src", data.data.avatar)
			$(".doctor-main").text(data.data.title)
			$(".doctor-major").text(data.data.deptName)
			$(".working-years").text(data.data.workYear + "年工作经验");
			$("#doctor-specialty").text('擅长：' + data.data.diseaseLabel);
		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		}

	})
};

function init2() {
	var params = {
		hospitalId: hospitalId,
		userId: user.userId,
		token: user.token
	};
	$.ajax({
		type: "get",
		data: params,
		url: config.appserver_url + "/myClinic/queryMyClinicNoDis.json",
		dataType: "json",
		async: true,
		success: function(response) {
			console.log(response)
			var data = response.data;
			var oHospital = data.hospitalVo;
			$(".synopsis-text").css("margin-left", "11rem")
			$("#doctorName span").html('<span data-id="' + oHospital.id + '">' + oHospital.name + '</span>');
			$("#telepHone").html('<span class="doctor-main" style="font-size:1.2rem;">电话：' + oHospital.tel + '</span>');
			$("#doctor-specialty").text(oHospital.address);
			$(".synopsis-img").attr("src", oHospital.picUrl)
			$(".synopsis-img").css({
				"border-radius": "5px",
				"width": "10rem"
			})

		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});
}

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
};

var evaluateScore;
var submitNumber;
//评价列表渲染
$(".evaluateScore-img-star").on("mouseenter click", function() {
	$(".evaluateScore-img-star").attr("src", "../../images/star2.png")
	var starLenght = $(this).index();
	$(".evaluateNumber-number").text(starLenght + 1 + "分")
	$(this).attr("src", "../../images/star.png")
	evaluateScore = starLenght;
	//            	console.log(starLenght)
	for(var i = 0; i < starLenght; i++) {
		$(".evaluateScore-img-star").eq(i).attr("src", "../../images/star.png")
	}
})

$(".proposal-content-textraea").on('input propertychange', function() {

	var textNumber = $(this).val();
	submitNumber = textNumber;
	if(textNumber.length == 0) {

	} else {
		var newTextNumber = 100 - textNumber.length;

		$("#importNumber").text("还可以输入" + newTextNumber + "字")
		if(newTextNumber < 0) {
			$("#importNumber").css("color", "red")
		} else {
			$("#importNumber").css("color", "#999")
		}
	}
})
$(".submit-button-a").on("click", function() {
	console.log(evaluateScore)
	console.log(submitNumber)
	if(!(evaluateScore + 1) || evaluateScore == undefined) {
		alert("请输入评价分数")
	} else {
		if(!submitNumber) {
			alert("请对医生输入10-100字评价")
		} else if(submitNumber) {
			if(submitNumber.length < 10 || submitNumber.length > 100) {
				alert("输入文字的范围10~100字")
			} else {
				medicEvaluate();

			}
		}
	}

})

function medicEvaluate() {
	var params = {
		type: type,
		relationId: relationId,
		content: submitNumber,
		score: evaluateScore + 1,
		userId: userId,
		orderNo: orderNo,
		token: token
	};
	console.log(params)
	$.ajax({
		type: "POST",
		url: config.appserver_url + '/userEvaluate/addEvaluate.json',
		dataType: 'json',
		//		contentType: 'application/json',
		data: params,
		success: function(data) {
			tokenLose(data.status);
			if(data.status == 1) {
				sessionStorage.setItem(orderNo, orderNo);
				alert("评价成功")
				setTimeout(function() {
					countDown(null, '评论成功', goBack);
				}, 1000)

				function goBack() {
					history.back();
				}
			}

		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		}

	})

}