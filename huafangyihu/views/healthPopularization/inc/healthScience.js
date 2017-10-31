var user;
var articleId; //文章ID
var timer = null;
var token;
var hospitalId;
var shareImgUrl; //分享图片的地址；
initParams();
initPages();
initClick();

function initParams() {
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
	// articleId = sessionStorage.getItem("article_id");
	articleId = GetQueryStr("articleId");
}

function initPages() {
	var articleId = GetQueryStr("articleId");
	var params = {
		id: articleId,
		userId: user.userId,
		token: token
	}
	console.log(params);
	$.ajax({
		type: "GET",
		url: config.appserver_url + "/article/queryArticleDetil.json",
		dataType: "JSON",
		data: params,
		success: function(data) {
			console.log(data);
			//			tokenLose(data.status);
			if(!Validator.validateNull(data.data)) {
				var doctorNurse = data.data.doctorNurse;
				console.log(doctorNurse.hospitalId)
				$(".synopsis-person").find("img").attr("src", doctorNurse.avatar || defaultVar.onerrorImg);
				$(".doctor-name").html(doctorNurse.realName);
				$(".doctor-introduce span").eq(0).html(doctorNurse.deptName);
				$(".doctor-introduce span").eq(1).html(doctorNurse.title);
				$(".doctor-introduce span").eq(2).html(data.data.workYear + "年经验");
				calculateScore(doctorNurse.evaluationScore, $(".evaluateNumber"), 5);
				$(".evaluateNumber-number").html(doctorNurse.evaluationScore + "分");
				$(".article-part1").find("p").html(doctorNurse.acticleTitle);
				$(".article-part1").find("p").attr('data-p', doctorNurse.acticleTitle);
				$(".function-button-read").find("span").html(doctorNurse.click);
				$(".function-button-thumbs-up").find("span").html(data.data.allFabulousCount);
				$(".function-button-time").find("span").html(format(doctorNurse.updateTime));
				$(".article-part2 p").eq(0).html(doctorNurse.contentAbstract);
				$(".article-part2").find("img").attr("src", doctorNurse.picUrl);
				shareImgUrl = doctorNurse.picUrl;
				$(".article-part2").find("img").attr("data-src", doctorNurse.picUrl);
				$(".article-part2 p").eq(1).html(doctorNurse.content);
				$(".footer-function-template").attr("data-id", doctorNurse.doctorId)
				$(".footer-function-template").attr("data-hospitalId", doctorNurse.hospitalId)
				hospitalId = doctorNurse.hospitalId;
				$(".synopsis-icon").attr("data-id", doctorNurse.doctorId)
				if(data.data.acticleFabulous == 1) {
					$("#click_like").find("img").attr("src", "../../images/zan-orange.png");
				}
				if(data.data.acticleCollection == 1) {
					$("#click_collect").find("img").attr("src", "../../images/collection_active.png");
				}
				$("table").attr("width", "auto");
			}
			//获取页面分享信息
			var shareLink = window.location.href;
			var shareTitle = $(".article-part1").find("p").attr('data-p');
			var shareImgUrl = $(".article-part2").find("img").attr('data-src');
			//微信分享操作

		    shareInvoke(shareLink,shareTitle,shareImgUrl);


		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		}
	});
}

function initClick() {
	$("#click_like").on("click", function() {
		$.ajax({
			type: 'POST',
			url: config.appserver_url + "/article/fabulousArticle.json",
			data: {
				articleId: articleId,
				userId: user.userId,
				token: token
			},
			dataType: "JSON",
			success: function(data) {
				tokenLose(data.status);
				if(!Validator.validateNull(data)) {
					var click_like = data.data.fabulousStatus;
					if(click_like == 1) {
						$("#click_like").find("img").attr("src", "../../images/zan-orange.png");
						alert("点赞成功!")
					} else if(click_like == 0) {
						$("#click_like").find("img").attr("src", "../../images/zan-gray.png");
						alert("取消点赞成功!")
					}
				}
			}
		});
	});
	$("#click_collect").on("click", function() {
		$.ajax({
			type: 'POST',
			url: config.appserver_url + "/article/collectionArticle.json",
			data: {
				articleId: articleId,
				userId: user.userId,
				token: token
			},
			dataType: "JSON",
			success: function(data) {
				if(!Validator.validateNull(data)) {
					var click_like = data.data.count;
					if(click_like == 1) {
						$("#click_collect").find("img").attr("src", "../../images/collection_active.png");
						alert("收藏成功！")

					} else if(click_like == 0) {
						$("#click_collect").find("img").attr("src", "../../images/collection.png");
						alert("取消收藏成功！")

					}
				}
			}
		});
	});
};
$("#modal1").on("click",function(){
	$(this).css("display","none");
})
//分享
$("#share").on("click", function() {
	//	$("#modal").css("display", "none")
		    $("#modal1").css("display","block");
    var modalWidth = $(document).width()
    var modalHeight = $(document).height()
    $("#modal1").width(modalWidth)
    console.log(modalHeight)
    $("#modal1").height(modalHeight)
	//	var modalWidth = $(document).width()
	//	var modalHeight = $(document).height()
	//	$("#modal").css("background-color", "#111111")
	//	$("#modal").width(modalWidth)
	//	$("#modal").height(modalHeight)
	//	$("#shareMain").css("display", "block");
	//	//禁用滚动条事件
	//	$("body").css("overflow", "hidden")
	//
	//	$(".modal-cancel").css("display", "block")
	//	var modalCancel = $("#shareMain").offset().top
	//	console.log(modalCancel)
	//	$(".modal-cancel").height(modalCancel)
	alert("请点击右上角分享哟")
})
//点击蒙版层关闭分享
$(".modal-cancel").on("click", function() {
	$(".modal-cancel").css("display", "none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow", "auto")
})
//关闭分享
$("#shareMain-close").on("click", function() {
	$(".modal-cancel").css("display", "none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow", "auto")
});

function add0(m) {
	return m < 10 ? '0' + m : m
}

function format(e) {
	//时间戳是整数，否则要parseInt转换
	var time = new Date(e);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	return y + '-' + add0(m) + '-' + add0(d);
}

//页面跳转

//跳转到咨询页面
$(".footer-function-template").eq(0).on("click", function() {
	doctorId = $(this).attr("data-id")
	// sessionStorage.setItem("doctorId",doctorId);
	historyForward("../medic/onlineConsulting.html?doctorId=" + doctorId);
})
//跳转到预约页面
$(".footer-function-template").eq(1).on("click", function() {
	doctorId = $(this).attr("data-id");
	var hospitalId = $(this).attr("data-hospitalId");
	console.log(hospitalId)
	historyForward("../medic/outpatientAppointment.html?hospitalId=" + hospitalId + "&" + "doctorId=" + doctorId);
})
$(".synopsis-icon").on("click", function() {
	doctorId = $(this).attr("data-id")
	// sessionStorage.setItem("doctorId",doctorId);
	historyForward("../medic/medicIndex.html?doctorId=" + doctorId);
})
