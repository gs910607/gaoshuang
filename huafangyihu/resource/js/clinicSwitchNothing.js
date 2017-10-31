// JavaScript Document
//分享

//点击蒙版层关闭分享
$(".modal-cancel").on("click", function() {
	$(".modal-cancel").css("display", "none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow", "auto")

	$("#shareImg").css("display", "none")
})
$("#shareImg").on("click", function() {
	$("#modal").css("display", "none")
	$(this).css("display", "none")
})

//关闭分享
$("#shareMain-close").on("click", function() {
	$(".modal-cancel").css("display", "none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow", "auto")
})

////分享
//$("#share1").on("click", function() {
////	$("#modal").css("display", "none")
////	$("#modal").css("display", "block")
////	var modalWidth = $(document).width()
////	var modalHeight = $(document).height()
////	$("#modal").css("background-color", "#111111")
////	$("#modal").width(modalWidth)
////	$("#modal").height(modalHeight)
////	$("#shareMain1").css("display", "block")
////	//禁用滚动条事件
////	$("body").css("overflow", "hidden")
////
////	$(".modal-cancel").css("display", "block")
////	var modalCancel = $("#shareMain").offset().top
////	console.log(modalCancel)
////	$(".modal-cancel").height(modalCancel)
//alert("请点击右上角分享哟");
////关闭弹窗
//	$(".modal-cancel").css("display", "none")
//	$("#shareMain").css("display", "none")
//	$("#modal").css("display", "none")
//	$("body").css("overflow", "auto")
//
//})

var user;
var token;
var userId;

//获取用户存储信息
function initParams() {
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
	userId = user.userId;
}

$(document).ready(
	function() {
		initParams();
		myfun3();
	}

);

function myfun3() {
	var cityCOde = JSON.parse(sessionStorage.getItem("localCityInfo")).localCityCode;
	var myToekn = JSON.parse(localStorage.getItem("user"));
	var param = {
		deptCode: "",
		code: cityCOde,
		pageNo: 1,
		pageSize: 3,
		longitude: sessionStorage.getItem("longitude"),
		latitude: sessionStorage.getItem("latitude"),
		orderParam: 1,
		token: myToekn.token
	}
	$.ajax({
		type: "get",
		data: param,
		url: config.appserver_url + "/hospital/getHospitalPageByVo.json",
		dataType: "json",
		async: false,
		success: function(data) {
			tokenLose(data.status)
			var text = "";

			for(var i = 0; i < data.data.length; i++) {
				var o = data.data[i];
				score = o.evaluationScore;
				var temp = "<li id='" + o.id + "' data-title='" + o.name + "' data-image='" + o.picUrl + "' class=\"recommend-clinic-ul-li\">" +
					"<div class=\"clinic-profile\">" +
					"<span class=\"clinic-profile-img\"><img src='" + o.picUrl + "' alt=\"\"></span>" +
					"<div class=\"clinic-profile-div\">" +
					"<h6>" + o.name + "</h6>" +
					" <div class=\"clinic-profile-distance\">" +
					"距我<span>" + o.distance + "</span>km" +
					"</div>" +
					"<div class=\"score-star\">" +
					"<i>" +
					"<img src=\"../../images/" + imageStar() + "\"/>" +
					"</i>" +
					"<i>" +
					"<img src=\"../../images/" + imageStar() + "\"/>" +
					"</i>" +
					"<i>" +
					"<img src=\"../../images/" + imageStar() + "\"/>" +
					"</i>" +
					"<i>" +
					"<img src=\"../../images/" + imageStar() + "\"/>" +
					"</i>" +
					"<i>" +
					"<img src=\"../../images/" + imageStar() + "\"/>" +
					"</i>" +
					"<span class=\"score-text\">" + o.evaluationScore + "分</span>" +
					"</div>" +
					"<div class=\"clinic-address\">" +
					"" + o.address + "" +
					"</div>" +
					"<div id=\"share\" class=\"clinic-more\">" +
					"<a href=\"javascript:;\">" +
					"<img src=\"../../images/more-spot.png\" />" +
					"</a>" +
					"</div>   " +
					"</div>" +
					"</div>" +
					"</li>";

				text = text + temp;

			}
			$("#hospital").html(text);
			switchover();
			$('head').append('<link rel=\"stylesheet\" type=\"text/css\" href=\"../../css/clinicSwitchNothing.css\" />');

			var profileDistance1 = $(".clinic-profile-distance>span").eq(0).text();
			var profileDistance2 = $(".clinic-profile-distance>span").eq(1).text();
			var profileDistance3 = $(".clinic-profile-distance>span").eq(2).text();
			if(profileDistance1 == '10000000') {
				$(".clinic-profile-distance").eq(0).hide();
			}
			if(profileDistance2 == '10000000') {
				$(".clinic-profile-distance").eq(1).hide();
			}
			if(profileDistance3 == '10000000') {
				$(".clinic-profile-distance").eq(2).hide();
			}
			$(".clinic-profile-div>h6 .score-star .clinic-address").on("click", function() {
				var hospitalId = $(this).parent().parent().attr("id");
				var parameter = "hospitalId=" + hospitalId;
				historyForward('../myClinic/clinicIndex.html?' + parameter);
			})
			$(".score-star").on("click", function() {
				var hospitalId = $(this).parent().parent().attr("id");
				var parameter = "hospitalId=" + hospitalId;
				historyForward('../myClinic/clinicIndex.html?' + parameter);
			})
			$(".clinic-address").on("click", function() {
				var hospitalId = $(this).parent().parent().attr("id");
				var parameter = "hospitalId=" + hospitalId;
				historyForward('../myClinic/clinicIndex.html?' + parameter);
			})
			$(".clinic-profile-img").on("click", function() {
				var hospitalId = $(this).parent().parent().parent().attr("id");
				var parameter = "hospitalId=" + hospitalId;
				historyForward('../myClinic/clinicIndex.html?' + parameter);
			})
			$(".clinic-more").on("click", function() {
				$("#modal").css("display", "none")
				$("#modal").css("display", "block")
				var modalWidth = $(document).width()
				var modalHeight = $(document).height()
				$("#modal").css("background-color", "#111111")
				$("#modal").width(modalWidth)
				$("#modal").height(modalHeight)
				$("#shareMain").css("display", "block")
				var hospitalId = $(this).parent().parent().parent().attr("id");
				var titleName = $(this).parent().parent().parent().attr("data-title");
				var imgId = $(this).parent().parent().parent().attr("data-image");
				$(".shareMain-address").attr("data-id", hospitalId)
				$(".shareMain-address").attr("data-img", imgId);
				$(".shareMain-address").attr("data-titleName", titleName)
				//禁用滚动条事件
				$("body").css("overflow", "hidden")
				$(".modal-cancel").css("display", "block")
				var modalCancel = $("#shareMain").offset().top;
				$(".modal-cancel").height(modalCancel)
			})
		}
	});
}
var score;

function imageStar() {
	if(score >= 1) {
		score--;
		return "star.png";
	}

	if(score >= 0.5 && score < 1) {
		score--;
		return "smallStar.png";
	}
	score--;
	return "star2.png";

}

function switchover() {

	//点击跳转诊所
	$(".shareMain-address").eq(0).on("click", function() {
		hospitalId = $(this).data("id");
		sessionStorage.setItem("hospitalId", hospitalId);
		var parameter = "hospitalId=" + hospitalId;
		historyForward('../myClinic/clinicIndex.html?' + parameter);
	})

	//点击关注诊所
	$(".addAttent").on("click", function() {
		hospitalId = $(this).data("id");
		$(this).css("display", "none");
		$(".cancelAttent").css("display", "block");
		attentionHos();
	})
	//点击取消关注
	$(".cancelAttent").on("click", function() {
		hospitalId = $(this).data("id");
		$(this).css("display", "none");
		$(".addAttent").css("display", "block");
		attentionHos();
	})

	//关注医院接口
	function attentionHos() {
		var param = {
			hospitalId: hospitalId,
			userId: user.userId,
			token: user.token
		}
		console.log(param)
		$.ajax({
			type: "post",
			data: param,
			url: config.appserver_url + "/hosPa/focus.json",
			dataType: "json",
			async: true,
			success: function(data) {

			},
			error: function(data) {

			}
		});
	}

	//点击分享诊所
	$(".shareMain-address").eq(2).on("click", function() {
		hospitalId = $(this).data("id");
		sessionStorage.setItem("hospitalId", hospitalId);
		var parameter = "hospitalId=" + hospitalId;
		//获取页面分享信息
		var shareLink = '../myClinic/clinicIndex.html?' + parameter;
		console.log(shareLink);
		var shareTitle = $(this).data("titlename");
		var shareImgUrl = $(this).data("img");
		console.log(shareTitle)
		console.log(shareImgUrl)
		//			//微信分享操作
		shareInvoke(shareLink, shareTitle, shareImgUrl);
	})

	//分享
	$("#share1").on("click", function() {
		$("#shareImg").css("display", "block")
		//	$("#modal").css("display", "none")
		//	$("#modal").css("display", "block")
		//	var modalWidth = $(document).width()
		//	var modalHeight = $(document).height()
		//	$("#modal").css("background-color", "#111111")
		//	$("#modal").width(modalWidth)
		//	$("#modal").height(modalHeight)
		//	$("#shareMain1").css("display", "block")
		//	//禁用滚动条事件
		//	$("body").css("overflow", "hidden")
		//
		//	$(".modal-cancel").css("display", "block")
		//	var modalCancel = $("#shareMain").offset().top
		//	console.log(modalCancel)
		//	$(".modal-cancel").height(modalCancel)
		alert("请点击右上角分享哟");
		//关闭弹窗
		//	$(".modal-cancel").css("display", "none")
		//	$("#shareMain").css("display", "none")
		$("#shareMainPosition").css("display", "block")
		//	$("#modal").css("display", "none")
		//	$("body").css("overflow", "auto")

		hospitalId = $(this).data("id");
		sessionStorage.setItem("hospitalId", hospitalId);
		var parameter = "hospitalId=" + hospitalId;
		//获取页面分享信息
		var shareLink = 'http://test.hofonehu.com/APP2.0/views/myClinic/clinicIndex.html?' + parameter;
		console.log(shareLink);
		var shareTitle = $(this).data("titlename");
		var shareImgUrl = $(this).data("img");
		console.log(shareTitle)
		console.log(shareImgUrl)
		//微信分享操作
		shareInvoke(shareLink, shareTitle, shareImgUrl);

	})

}