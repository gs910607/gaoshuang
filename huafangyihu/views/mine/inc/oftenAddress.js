var user;
var token;
var userId;
var pageNo = 1;
var pageSize = 7;

getItem();
init();
initScrollBar();
// 初始化渲染
function init() {
	var params = {
		userId: userId,
		pageNo: pageNo,
		pageSize: pageSize,
		token: token
	};
	console.log(params)
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/address/queryPatAddress.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(data) {
			console.log(data)
			tokenLose(data.status);

			var addressList = $(".list-ul").html();

			for(var i = 0; i < data.data.length; i++) {
				var arr = data.data[i].connectName;
				var arrList = []
				arrList = arr.split("-");
				addressList += '<li data-id=' + data.data[i].id + ' class="list-li" style="position: relative;">';
				addressList += '<div class="con">';
				addressList += '<div class="">';
				if(arrList[4] == undefined) {
					addressList += '<span class="clinicName"></span>';
				} else {
					addressList += '<span class="clinicName">' + arrList[4] + '</span>';
				}
				addressList += '<span class="defaultAddress"></span></div>';
				addressList += '<div class="receivingAddress">';
				addressList += '<span>' + arrList[0] + '</span>&#x3000;';
				addressList += '<span>' + arrList[1] + '</span>&#x3000;';
				if(arrList[2] == "null") {
					addressList += '<span></span>&#x3000;';
					addressList += '<span></span></div>';
				} else {
					addressList += '<span>' + arrList[2] + '</span>&#x3000;';
					addressList += '<span>' + arrList[3] + '</span></div>';
				}
				addressList += ' <div class="nearbyAddress">';
				addressList += '<span>' + data.data[i].address + '</span></div></div>';
				addressList += '<div class="btn">删 除</div>';
				addressList += '<div class="shade1" style="position: absolute; width: 100%; height: 100%; top: 0;"></div></li>';
			}

			$(".list-ul").html(addressList)
			slideLeft1();
			//设置默认地址 删除地址操作
			$(".defaultAddress").eq(0).text("【默认】")
			//删除常用地址接口

			$(".btn").on("click", function() {
				var thisBtn = $(this);
				var adressId = $(this).parent().data("id")
				var params = {
					adressId: adressId,
					token: token
				};
				console.log(adressId)
				isDelete(function() {
					$.ajax({
						type: "POST",
						url: config.appserver_url + '/personal/delAdress.json',
						dataType: 'json',
						data: params,
						success: function(data) {
							console.log(data)
							if(data.data == 1) {
								thisBtn.parent().hide();
								alert("删除成功")
							} else {
								alert("删除失败")
							}
						},
						error: function() {
							alert('服务繁忙，请稍后再试！');
						}
					});
				})
			});
		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		},
		beforeSend: function() {
			$(".loading").show();
			$(".nomore").hide();
		},
		complete: function() {
			$(".loading").hide();
			$(".nomore").show();
		}

	})

}

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
}

function initScrollBar() {
	//下拉加载更多
	var stop = true;
	$(window).scroll(function() {
		totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		if($(document).height() <= totalheight) {
			if(stop == true) {
				stop = false;
				pageNo++;
				init();
				stop = true;
			}
		}
	});

};

$("#addAddressBtn").on("click", function() {
	historyForward("../mine/addoftenAddress.html");
});
