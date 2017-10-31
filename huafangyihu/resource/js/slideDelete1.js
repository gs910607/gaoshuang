function slideLeft1() {

	//向左滑动删除
	var WebkitTransformWidth = $(".btn").width()/1.3;
	var WebkitTransformWidthAll = $(".btn").width();
	//	window.addEventListener('load', function() {
	var initX;
	var moveX;
	var X = 0;
	var objX = 0;
	var list = false;
	$(".list-li").on("touchstart touchmove", function(event) {
		
		list = true;

		touchAllstart();
	})
	$(".list-li").on("touchend", function(event) {
		list = false;
		touchAllend();
	})

	function touchAllstart() {

		window.addEventListener('touchstart', function(event) {
			var obj = event.target.parentNode;
			if(obj.className == "list-li") {
				initX = event.targetTouches[0].pageX;
				objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;

			}
			if(objX == 0) {
				window.addEventListener('touchmove', function(event) {
					//					event.preventDefault();
					var obj = event.target.parentNode;
					if(obj.className == "con" || obj.className == "medicMessage") {
						var obj = event.target.parentNode.parentNode;

					}
					if(obj.className == "list-li") {
						moveX = event.targetTouches[0].pageX;
						X = moveX - initX;
						if(X > 0) {
							//							obj.style.WebkitTransform = "translateX(" + 0 + "px)";

							obj.style.WebkitTransform = "translateX(" + 0 + "px)";

						} else if(X < 0) {
							var l = Math.abs(X);
							obj.style.WebkitTransform = "translateX(" + -l * 1.3 + "px)";
							if(l > WebkitTransformWidth) {
								l = WebkitTransformWidth;
								obj.style.WebkitTransform = "translateX(" + -l * 1.3 + "px)";
								obj.style.WebkitTransform = "translateX(" + -l * 1.3 + "px)";
							}
						}
					}
				});
			} else if(objX < 0) {
				window.addEventListener('touchmove', function(event) {
					//					event.preventDefault();
					var obj = event.target.parentNode;
					if(obj.className == "con" || obj.className == "medicMessage") {
						var obj = event.target.parentNode.parentNode;
					}
					if(obj.className == "list-li") {
						moveX = event.targetTouches[0].pageX;
						X = moveX - initX;
						if(X > 0) {
							var r = -WebkitTransformWidthAll + Math.abs(X);
							obj.style.WebkitTransform = "translateX(" + r + "px)";
							if(r > 0) {
								r = 0;
								obj.style.WebkitTransform = "translateX(" + r + "px)";

							}
						} else {
							//向左滑动
							obj.style.WebkitTransform = "translateX(" + -WebkitTransformWidthAll + "px)";
						}
					}
				});
			}

		})

	}

	function touchAllend() {

		window.addEventListener('touchend', function(event) {
			//			event.preventDefault();
			var obj = event.target.parentNode;
			if(obj.className == "con" || obj.className == "medicMessage") {
				var obj = event.target.parentNode.parentNode;
			}
			if(obj.className == "list-li") {
				objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
				if(objX > -WebkitTransformWidth) {
					obj.style.WebkitTransform = "translateX(" + 0 + "px)";
				} else {
					obj.style.WebkitTransform = "translateX(" + -WebkitTransformWidthAll + "px)";
				}
			}
		})

	}



}
