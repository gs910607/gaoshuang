// JavaScript Document
//分享

var id = 1;
var userId = 1;
var token = 1;
var acticleId = 1;
var isFabulous = 0;

/*$("#share").on("click", function() {
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


$("#shareMain-close").on("click", function() {
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})

//模态框弹出层
$("#attention-img-yes").on("click", function() {
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
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
});*/

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

$.ajax({
	type: "GET",
	url: "http://192.168.3.222:8080/api/article/queryArticlePeople.json",
	dataType: "json",
	data:prams,
	success: function(data) {
		tokenLose(data.status)
		var arrStr = "";
		var results = data.data[1];
		if(results) {
			$("#person_src").attr("src", results.avatar);
			$("#doctor_name").text(results.title)
		}
	},
	// error: function(){
	// 	alert("加载失败！")
	// },
	// beforeSend: function(){    
 //        $('<div class="loadingWrap"></div>').appendTo("body");    
 //    },   
 //    complete: function(){    
 //        $(".loadingWrap").remove();    
 //    }  
});


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
			var click_like = data.data;
			if(click_like == 1) {
				$("#click_like").find("img").attr("src", "../../images/zan-orange.png");
				$("#model_like").hide();
				$("#model_like").text("点赞成功").show().fadeOut(3000);
			} else if(click_like == 0) {
				$("#click_like").find("img").attr("src", "../../images/zan-gray.png");
				$("#model_like").hide();
				$("#model_like").text("取消点赞成功").show().fadeOut(3000);
			}
		},
		// error: function(){
		// 	alert("加载失败！")
		// },
		// beforeSend: function(){    
	 //        $(this).off("click");
	 //    },   
	 //    complete: function(){    
	 //        $(this).on("click");
	 //    }  
	});
});

var prams3 = {
	acticleId: acticleId,
	userId: userId,
	isFabulous: isFabulous,
	token: token
};
$("#click_collect").on("click", function() {
	$.ajax({
		type: "GET",
		url: "http://192.168.3.222:8080/api/article/fabulousArticle.json",
		dataType: "json",
		data: prams2,
		success: function(data) {
			tokenLose(data.status);
			var click_like = data.data;
			if(click_like == 1) {
				$("#click_collect").find("img").attr("src", "../../images/collection_active.png");
				$("#model_collect").hide();
				$("#model_collect").text("收藏成功").show().fadeOut(3000);
			} else if(click_like == 0) {
				$("#click_collect").find("img").attr("src", "../../images/collection.png");
				$("#model_collect").hide();
				$("#model_collect").text("取消收藏成功").show().fadeOut(3000);
			}
		},
		// error: function(){
		// 	alert("加载失败！")
		// },
		// beforeSend: function(){    
	 //        $(this).off("click");
	 //    },   
	 //    complete: function(){    
	 //        $(this).on("click");
	 //    }  
	});
});


};

