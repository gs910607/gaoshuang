$(function(){
	var delParent;
	var upspanIndex;
	var defaults = {
		fileType         : ["jpg","png","bmp","jpeg","gif","JPG","PNG","BMP","JPEG","GIF"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
	};
		/*点击图片的文本框*/
	var picUrl = '';
	$(".file").click(function() {
//		weixinUpImages();
		var params;
		$.ajax({
			type: 'GET',
			url: config.appserver_url + '/wechat/getSignParams.json',
			async: false,
			data: {
				url: location.href
			},
			dataType: 'JSON',
			success: function(data) {
				params = data.data;
				console.log(params)
			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			}
		})
		console.log(location.href)
		//appid
		var appId;
		//时间戳
		var timestamp;
		//随机字符串
		var nonceStr;
		//签名
		var signature;
		var jsApiList;
		//信息配置
	
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: params.appid, // 必填，公众号的唯一标识
			timestamp: params.timestamp, // 必填，生成签名的时间戳
			nonceStr: params.nonceStr, // 必填，生成签名的随机串
			signature: params.signature, // 必填，签名，见附录1
			jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
		});
		
		wx.ready(function() {

			wx.chooseImage({

				count: 5, // 默认9

				sizeType: ['original', 'compressed'], // 压缩图

				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

				success: function(res) {
					var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					picUrl = localIds;
					upImages();
				}

			});

		});

	})

	function upImages(){
//		if(picUrl) {

			$(".img-box").show();
			var idFile = $(".file").attr("id");
			var file = document.getElementById(idFile);
			var imgContainer = $(".file").parents(".z_photo"); //存放图片的父亲元素
			var fileList = picUrl; //获取的图片文件
			// console.log(fileList+"======filelist=====");
			var input = $(".file").parent();//文本框的父亲元素
			var imgArr = [];
			//遍历得到的图片文件
			var numUp = imgContainer.find(".up-section").length;
			var totalNum = numUp + 1;  //总的数量
			if(totalNum > 5 ){
				alert("上传图片数目不可以超过5个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
			}
			else if(numUp < 5){
//				fileList = validateUp(fileList);
				for(var i = 0;i<1;i++){
				 var imgUrl = picUrl;
				     imgArr.push(imgUrl);
				 var $section = $("<section class='up-section fl loading'>");
				     imgContainer.append($section);
				 var $span = $("<span class='up-span'>");
				     $span.appendTo($section);

			     var $img0 = $("<img class='close-upimg'>").on("click",function(event){
					    event.preventDefault();
						event.stopPropagation();
						$(".works-mask").show();
						delParent = $(".file").parent();
					});

//					 $img0.attr("src","../../images/a7.png").appendTo($section);
			     var $img = $("<img class='up-img up-opcity'>");
			         $img.attr("src",imgArr[i]);
			         $img.appendTo($section);
			     var $p = $("<p class='img-name-p'>");
//			         $p.html(fileList[i].name).appendTo($section);
			     var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
			         $input.appendTo($section);
			     var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
			         $input2.appendTo($section);
	                //上传图片
	                uploadPic(picUrl);
			   }
				 $(".up-span").on("click",function(){
						 $(".works-mask").show();
						 delParent = $(this).parent();
						 upspanIndex = $(this).parent().index();
				 });
			}
			setTimeout(function(){
	       $(".up-section").removeClass("loading");
			 	 $(".up-img").removeClass("up-opcity");
			 },450);
			 numUp = imgContainer.find(".up-section").length;
			if(numUp >= 5){
				$(this).parent().hide();
			}

			//input内容清空
			$(this).val("");
//		}
	};
	//
	// function removeByValue(arr, val) {
	// 	for(var i=0; i<arr.length; i++) {
	// 		if(arr[i] == val) {
	// 			arr.splice(i, 1)
	// 		}
	// 	}
	// }

	$(".wsdel-ok").on("click", function() {
		if($(".up-section").length <= 1) {
			$(".img-box").hide();
		}
		$(".works-mask").hide();
		// picList.splice(picList[upspanIndex], 1);
		console.log(picList);
		picList.splice(upspanIndex-1 , 1);

		var numUp = delParent.siblings().length;
		if(numUp < 6){
		delParent.parent().find(".z_file").show();
		}
		 delParent.remove();
	})

	$(".wsdel-no").click(function(){
		$(".works-mask").hide();
	});

//		function validateUp(files){
//			var arrFiles = [];//替换的文件数组
//			for(var i = 0, file; file = files[i]; i++){
//				//获取文件上传的后缀名
//				var newStr = file.name.split("").reverse().join("");
//				if(newStr.split(".")[0] != null){
//						var type = newStr.split(".")[0].split("").reverse().join("");
//						// console.log(type+"===type===");
//						if(jQuery.inArray(type, defaults.fileType) > -1){
//							// 类型符合，可以上传
//							if (file.size >= defaults.fileSize) {
//								// alert(file.size);
//								alert('您这个"'+ file.name +'"文件大小过大');
//							} else {
//								// 在这里需要判断当前所有文件中
//								arrFiles.push(file);
//							}
//						}else{
//							alert('您这个"'+ file.name +'"上传类型不符合');
//						}
//					}else{
//						alert('您这个"'+ file.name +'"没有类型, 无法识别');
//					}
//			}
//			return arrFiles;
//		}
})
