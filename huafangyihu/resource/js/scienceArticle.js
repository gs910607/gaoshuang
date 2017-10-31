// JavaScript Document
//分享

var id = 1;
var userId = 1;
var token = 1;
var articleId = 1;
var acticleId = 1;
var isFabulous = 0;
var isCollect = 0;
var timer = null;

//分享
$("#share").on("click", function() {
	$("#modal").css("display", "none")
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#shareMain").css("display", "block")
//禁用滚动条事件
	$("body").css("overflow","hidden")

$(".modal-cancel").css("display","block")
    var modalCancel =$("#shareMain").offset().top
    console.log(modalCancel)   
    $(".modal-cancel").height(modalCancel)
})
//点击蒙版层关闭分享
$(".modal-cancel").on("click",function(){
	$(".modal-cancel").css("display","none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})
//关闭分享
$("#shareMain-close").on("click", function() {
	$(".modal-cancel").css("display","none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
});



;(function(){
init()
})();

function init() {
	// body...
var prams = {
	id: id,
	userId: userId,
	token: token
};

// 页面初始化渲染
// config.appserver_url
$.ajax({
	type: "GET",
	url: "http://192.168.3.222:8080/api/article/queryArticlePeople.json",
	dataType: "json",
	data:prams,
	success: function(data) {
		tokenLose(data.status)
		// 医护信息
		var mailList = '';
		var doctorNurse = data.data.doctorNurse;
		var score = doctorNurse.evaluationScore;

		$("#synopsis-person img").attr("src", doctorNurse.avatar);
		$("#doctor-name").text(doctorNurse.realName);
		judgeGrade2(score)
		$("#evaluateNumber-number").text(score)
		$("#doctor-main").text(doctorNurse.deptName);
		$("#doctor_title").text(doctorNurse.title);

		$("#doctor_time").text(data.data.workYear);

		// 文章
		var articles = data.data.articles[0];
		var updateTime = articles.updateTime;
		$("#article-part1 p").text(articles.title)
		$("#function-button-read").text(articles.click);
		$("#function-button-thumbs-up").text(articles.count);
		$("#function-button-time").text(format(updateTime));
		$("#article-part2 img").attr("src", articles.picUrl);
		$("#article-part2 p").text(articles.content);	

		// 点赞初始状态
		var acticleFabulous = data.data.acticleFabulous;
		if(acticleFabulous == 1) {
			$("#click_like").find("img").attr("src", "../../images/zan-orange.png");
		} else if(acticleFabulous == 0) {
			$("#click_like").find("img").attr("src", "../../images/zan-gray.png");
		};

		// 收藏初始状态
		var acticleCollection = data.data.acticleCollection;
		if(acticleCollection == 1) {
			$("#click_collect").find("img").attr("src", "../../images/collection_active.png");
		} else if(acticleCollection == 0) {
			$("#click_collect").find("img").attr("src", "../../images/collection.png");
		};

		function add0(m) { return m < 10 ? '0' + m : m }

		function format(e) {
			//时间戳是整数，否则要parseInt转换
			var time = new Date(e);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			return y + '-' + add0(m) + '-' + add0(d);
		}

		function judgeGrade2(e) {
			if(e < 0.5) {

			} else if(e < 1) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/smallStar.png")
			} else if(e < 1.5) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
			} else if(e < 2) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/smallStar.png")
			} else if(e < 2.5) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/star.png")
			} else if(e < 3) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(2).attr("src", "../../images/smallStar.png")
			} else if(e < 3.5) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(2).attr("src", "../../images/star.png")
			} else if(e < 4) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(2).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(3).attr("src", "../../images/smallStar.png")
			} else if(e < 4.5) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(2).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(3).attr("src", "../../images/star.png")
			} else if(e < 5) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(2).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(3).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(4).attr("src", "../../images/smallStar.png")
			} else if(e == 5) {
				$(".evaluateScore-img-star").eq(0).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(1).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(2).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(3).attr("src", "../../images/star.png")
				$(".evaluateScore-img-star").eq(4).attr("src", "../../images/star.png")
			} else {
				alert("综合评分返回0~5")
			}
			return;
		}
		// };

	},
	error: function(){
		alert("系统繁忙，请稍后再试！");
	},
	// beforeSend: function(){    
 //        $('<div class="loadingWrap"></div>').appendTo("body");    
 //    },   
 //    complete: function(){    
 //        $(".loadingWrap").remove();    
 //    }  
});


// 点赞
var prams2 = {
	acticleId: acticleId,
	userId: userId,
	isFabulous: isFabulous,
	token: token
};

$("#click_like").on("click", function() {
	$.ajax({
		type: "GET",
		url: "http://192.168.3.222:8080/api/article/fabulousArticle.json",
		dataType: "json",
		data: prams2,
		success: function(data) {
			tokenLose(data.status);
			var click_like = data.data.fabulousStatus;
			
			if(click_like == 1) {
				$("#click_like").find("img").attr("src", "../../images/zan-orange.png");
				$("#model_likecollect").text("点赞成功").show();
				clearTimeout(timer)
				timer = setTimeout(function(){
					$("#model_likecollect").text("").hide();
				},2000);
			} else if(click_like == 0) {
				$("#click_like").find("img").attr("src", "../../images/zan-gray.png");
				$("#model_likecollect").text("取消点赞成功").show();
				clearTimeout(timer)
				timer = setTimeout(function(){
					$("#model_likecollect").text("").hide();
				},2000);
			}
		},
		error: function(){
			alert("系统繁忙，请稍后再试！");
		},
		// beforeSend: function(){    
	 //        $(this).off("click");
	 //    },   
	 //    complete: function(){    
	 //        $(this).on("click");
	 //    }  
	});
});

// 收藏
var prams3 = {
	articleId: articleId,
	userId: userId,
	isCollect: isCollect,
	token: token
};

$("#click_collect").on("click", function() {
	$.ajax({
		type: "GET",
		url: "http://192.168.3.222:8080/api/article/collectionArticle.json",
		dataType: "json",
		data: prams3,
		success: function(data) {
			tokenLose(data.status);
			var click_like = data.data.count;
			if(click_like == 1) {
				$("#click_collect").find("img").attr("src", "../../images/collection_active.png");
				$("#model_likecollect").text("收藏成功").show();
				clearTimeout(timer)
				timer = setTimeout(function(){
					$("#model_likecollect").text("").hide();
				},2000)
			} else if(click_like == 0) {
				$("#click_collect").find("img").attr("src", "../../images/collection.png");
				$("#model_likecollect").text("取消收藏成功").show();
				clearTimeout(timer)
				timer = setTimeout(function(){
					$("#model_likecollect").text("").hide();
				},2000)
			}
		},
		error: function(){
			alert("系统繁忙，请稍后再试！");
		},
		// beforeSend: function(){    
	 //        // $(this).off("click");
	 //    },   
	 //    complete: function(){    
	 //        $(this).on("click");
	 //    }  
	});
});
};