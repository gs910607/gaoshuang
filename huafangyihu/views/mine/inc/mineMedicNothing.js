
//调用微信的扫一扫
//$(".consultation").eq(1).on("click", function() {
//	wx.scanQRCode({
//		// 默认为0，扫描结果由微信处理，1则直接返回扫描结果
//		needResult: 1,
//		desc: 'scanQRCode desc',
//		success: function(res) {
//			//扫码后获取结果参数赋值给Input
//			var url = res.resultStr;
//			//商品条形码，取","后面的
//			if(url.indexOf(",") >= 0) {
//				var tempArray = url.split(',');
//				var tempNum = tempArray[1];
//				$("#id_securityCode_input").val(tempNum);
//			} else {
//				$("#id_securityCode_input").val(url);
//			}
//		}
//	});
//})