// JavaScript Document

//提示信息
//$("#prompt").on("click", function() {
//	$("#mask").css("display", "none")
//	$("#mask").css("display", "block")
//	var maskWidth = $(document).width()
//	var maskHeight = $(document).height()
//	$("#mask").css("background-color", "#111111")
//	$("#mask").width(maskWidth)
//	$("#mask").height(maskHeight)
//	$("#promptMain").css("display", "block")
//	//禁用滚动条事件
//	$("body").css("overflow", "hidden")
//
//	$("#promptMain-close").on("click", function() {
//		$("#promptMain").css("display", "none");
//		$("#mask").css("display", "none");
//		$("body").css("overflow", "auto");
//	})
//
//	//报错返回
//	$("#prompt").on("click", function() {
//		$("#mask").css("display", "none")
//		$("#mask").css("display", "block")
//		var maskWidth = $(document).width()
//		var maskHeight = $(document).height()
//		$("#mask").css("background-color", "#111111")
//		$("#mask").width(maskWidth)
//		$("#mask").height(maskHeight)
//		$("#returnMain").css("display", "block")
//		//禁用滚动条事件
//		$("body").css("overflow", "hidden")
//
//		$("#returnMain-close").on("click", function() {
//			$("#returnMain").css("display", "none")
//			$("#mask").css("display", "none")
//			$("body").css("overflow", "auto")
//		})
//
//		//模态框弹出层
//		$("#attention-img-yes").on("click", function() {
//			$("#mask").css("display", "block")
//			var maskWidth = $(document).width()
//			console.log(maskWidth)
//			var maskHeight = $(document).height()
//			console.log(maskHeight)
//			$("#mask").width(maskWidth)
//			$("#mask").height(maskHeight)
//			$("#mask").css("background-color", "#111111")
//			$("#mask-div").css("display", "block")
//			$("#mask-div").css("background-color", "white")
//		})
//		$("#mask-div-second").on('click', function() {
//			$("#mask-div").css("display", "none")
//			$("#mask").css("display", "none")
//		})
//		$("#mask-div-three").on('click', function() {
//			$("#mask-div").css("display", "none")
//			$("#mask").css("display", "none")
//		})
//	})
//})
/*倒计时*/
$("#prompt").on("click", function() {
	var s = document.getElementById("timeout");
	var count = 2;
	clearInterval(timer);
	var timer = setInterval(function() {
		count--;
		if(count <= 0) {
			count = 0;
			clearInterval(timer);
			location.reload();
		}
		s.innerHTML = count;

	}, 1000);
	// sessionStorage.removeItem("hospitalName");	
});
// $("header > a").on("click", function() {
// 	// sessionStorage.removeItem("hospitalName");
// })
//开关按钮
$(function() {
	$('.mwui-switch-btn').each(function() {
		$(this).bind("click", function() {
			var btn = $(this).find("span");
			var change = btn.attr("change");
			btn.toggleClass('off');

			if(btn.attr("class") == 'off') {
				$(this).find("input").val("0");
				btn.attr("change", btn.html());
				btn.html(change);
				$('.mwui-switch-btn').css("background", "#ec9c00")
			} else {
				$(this).find("input").val("1");
				btn.attr("change", btn.html());
				btn.html(change);

				$('.mwui-switch-btn').css("background", "#ccc")
			}

			return false;
		});
	});
})



//支付接口渲染

//判断支付的方式