//初始化显示页数为1；
var pageNo = 1;
var pageSize = 7;
var longitude;
var latitude;
var localCityInfo;
var patId;
var token;
var serviceItemId;
var typeId = null;
var cityCodes = null;
var orderParam = null;

var id1;

initParams();
initClick();
initPages(typeId, cityCodes, orderParam);
initScrollBar();
var documentWidth = $(document).width();

//手机端禁用滚动条事件
// $(document).on("touchmove", "#coverLayer", function(event) {
// 	event.preventDefault();
// }, false)

//if (documentWidth > 412) {
//  $("#coverLayer").css("margin-top", "13.8rem");//更改
//}
//if (documentWidth > 479) {
//  $("#coverLayer").css("margin-top", "13.8rem");//更改
//}
//var documentHeight = $(document).height() - 196;
//
//$("#coverLayer").height(documentHeight);

function initClick() {
	//选择框
	$(".type-name-ul-type").on("click", function() {
		$(".type-name-ul-type").css("background-color", "#F5F5F5");
		$(".type-name-ul-type").css("color", "#666666");
		$(".type-name-ul-type2").css("color", "#666666");
		$(this).css("background-color", "white");
		$(this).css("color", "#EB9C01");
	});
	$(".type-name-ul-type2").on("click", function() {
		$(".type-name-ul-type2").css("color", "#666666");
		$(this).css("color", "#EB9C01");
	});

	//下滑菜单
	$("#tab1-a").on("click", function() {
		$(this).hide();
		$('#tab2-a-fold,#tab3-a-fold').hide();
		$('#tab2-a,#tab3-a,#tab1-a-fold').show();
		$("#tab1-a-fold .tab-button").css("color", "#999");
		$("#tab-button-span1-up1").css("color", "#EB9C01");
		$(".tab-img").attr("src", "../../images/arrows1.png");
		$("#tab1-a-fold .tab-img").css("transform", "rotate(0deg)");
		$("#tab1-a-fold .tab-img").attr("src", "imgs/arrows2.png");
		$("#tab-img1").attr("src", "imgs/arrows2.png");
		$("#tab-img1").css("transform", "rotate(0deg)");
		$("#coverLayer").css("display", "block");
		$(window).scrollTop(0);
		$("body").css("overflow", "hidden");
		$(".content-block").css("display", "block");
		$("#tab1 div").css("display", "block");
		$("#tab2 div").css("display", "none");
		$("#tab3 div").css("display", "none");
	});
	$("#tab1-a-fold").on("click", function() {
		$(this).hide();
		$("#tab1-a").show();
		$("body").css("overflow", "auto");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$(".tab-button").css("color", "#999");
		$("#coverLayer").css("display", "none");
		$(".content-block").css("display", "none");
		$(".tab-img").css("transform", "rotate(0deg)");
	});
	$("#tab2-a").on("click", function() {
		$(this).hide();
		$('#tab1-a-fold,#tab3-a-fold').hide();
		$('#tab1-a,#tab3-a,#tab2-a-fold').show();
		$("#tab2-a-fold .tab-button").css("color", "#999");
		$("#tab-button-span2-up2").css("color", "#EB9C01");
		$(".tab-img").attr("src", "../../images/arrows1.png");
		$("#tab2-a-fold .tab-img").css("transform", "rotate(0deg)");
		$("#tab2-a-fold .tab-img").attr("src", "imgs/arrows2.png");
		$("#tab-img2").attr("src", "imgs/arrows2.png");
		$("#tab-img2").css("transform", "rotate(0deg)");
		$("#coverLayer").css("display", "block");
		$(window).scrollTop(0);
		$("body").css("overflow", "hidden");
		$(".content-block").css("display", "block");
		$("#tab2 div").css("display", "block");
		$("#tab1 div").css("display", "none");
		$("#tab3 div").css("display", "none");
	});
	$("#tab2-a-fold").on("click", function() {
		$(this).hide();
		$("#tab2-a").show();
		$("body").css("overflow", "auto");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$(".tab-button").css("color", "#999");
		$("#coverLayer").css("display", "none");
		$(".content-block").css("display", "none");
		$(".tab-img").css("transform", "rotate(0deg)");
	});
	$("#tab3-a").on("click", function() {
		$(this).hide();
		$('#tab1-a-fold,#tab2-a-fold').hide();
		$('#tab1-a,#tab2-a,#tab3-a-fold').show();
		$("#tab3-a-fold .tab-button").css("color", "#999");
		$("#tab-button-span3-up3").css("color", "#EB9C01");
		$(".tab-img").attr("src", "../../images/arrows1.png");
		$("#tab3-a-fold .tab-img").css("transform", "rotate(0deg)");
		$("#tab3-a-fold .tab-img").attr("src", "imgs/arrows2.png");
		$("#tab-img3").attr("src", "imgs/arrows2.png");
		$("#tab-img3").css("transform", "rotate(0deg)");
		$("#coverLayer").css("display", "block");
		$(window).scrollTop(0);
		$("body").css("overflow", "hidden");
		$(".content-block").css("display", "block");
		$("#tab3 div").css("display", "block");
		$("#tab1 div").css("display", "none");
		$("#tab2 div").css("display", "none");
	});
	$("#tab3-a-fold").on("click", function() {
		$(this).hide();
		$("#tab3-a").show();
		$("body").css("overflow", "auto");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$(".tab-button").css("color", "#999");
		$("#coverLayer").css("display", "none");
		$(".content-block").css("display", "none");
		$(".tab-img").css("transform", "rotate(0deg)");
	});

	//遮盖层
	$("#coverLayer").on("click", function() {
		$("body").css("overflow", "auto");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$(".tab-button").css("color", "#999");
		$("#coverLayer").css("display", "none");
		$(".content-block").css("display", "none");
		$(".tab-img").css("transform", "rotate(0deg)");
		$(".buttons-tab>a").css("display", "none")
		$("#tab1-a").show();
		$("#tab2-a").show();
		$("#tab3-a").show();
	});

	$(document).on("click", ".type-name-ul-type", function() {
		$("body").css("overflow", "scroll")
	})

	//下拉框渲染接口
	//品牌 
	var brand = [{
			typeName: "加盟",
			typeId: "1"
		},
		{
			typeName: "自营",
			typeId: "2"
		}
	];
	// $("#tab2-a").on("click", function () {
	//隐藏科室
	// $(".type-name-ul-type2").hide();
	// $("#tab2-ul-list").find("li:gt(0)").remove();

	$("#tab2-a").on("click", function(e) {
		pageNo = 1;
		var brandHtml = '';
		for(var i = 0; i < brand.length; i++) {
			var objBrand = brand[i];
			brandHtml += '<li data-typeid="' + objBrand.typeId + '"><span class="type-name-ul-type">' + objBrand.typeName + '</span></li>';
		}
		$("#tab2-ul-list2").html(brandHtml);

		$(".type-name-ul-type").on("click", function(e) {
			$(".buttons-tab>a").css("display", "none")
			$("#tab1-a").show();
			$("#tab2-a").show();
			$("#tab3-a").show();
			typeId = $(this).parent().data("typeid");
			console.log(typeId)
			$(".type-name-ul-type").css("background-color", "#F5F5F5");
			$(".type-name-ul-type").css("color", "#666666");
			$(e.target).css("background-color", "white");
			$(e.target).css("color", "#EC9C00");

			var spanText = $(this).text();

			$(".list-container-li").remove();
			$(".tab-img").attr("src", "imgs/arrows1.png");
			$(".tab-button").css("color", "#999");
			$("#coverLayer").css("display", "none");
			$(".content-block").css("display", "none");
			$(".tab-img").css("transform", "rotate(0deg)");

			initPages(typeId, null, null)
		});
	});

	// });

	//地区
	$("#tab1-a").on("click", function(e) {
		pageNo = 1;
		$("#tab1-ul-list1>li").remove();
		var pramas = {
			token: token
		}
		$.ajax({
			url: config.appserver_url + '/hospital/getAllCity.json',
			data: "GET",
			dataType: "JSON",
			data: pramas,
			contentType: 'application/json',
			success: function(data) {
				tokenLose(data.status)
				var keys = data.data.key;
				var allCity = data.data.city
				var citydataList;
				var areaList = $("#tab1-ul-list1").html()
				areaList += '<li><span class="type-name-ul-type">全部</span></li>'
				for(var i = 0; i < keys.length; i++) {
					citydataList = keys[i]
					var allCityList = allCity[citydataList]
					for(var j = 0; j < allCityList.length; j++) {
						var $allCityList = allCityList[j]
						areaList += '<li><span id="' + $allCityList.code + '" class="type-name-ul-type">' + $allCityList.name + '</span></li>'
					}
					$("#tab1-ul-list1").html(areaList);
				}
				//点击发送code
				$(document).on("click", ".type-name-ul-type", function() {
					console.log(333333)
					$(".buttons-tab>a").css("display", "none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					cityCodes = $(this).attr("id")
					console.log(cityCodes)
					$(".list-container-li").remove();
					$(".tab-img").attr("src", "imgs/arrows1.png")
					$(".tab-button").css("color", "#999")
					$("#coverLayer").css("display", "none")
					$(".content-block").css("display", "none")
					$(".tab-img").css("transform", "rotate(0deg)")
					initPages(null, cityCodes, null);

				});

				var tab4 = $('#tab1-ul-list1');
				for(var i = 0; i < citydataList.length; i++) {
					var obj2 = citydataList[i];
					var $lic2 = tab4.find('li:first').clone();
					$lic2.css('display', 'block');
					$lic2.find('.type-name-ul-type').html(obj2.name);
					tab4.append($lic2);
				}

				$(".type-name-ul-type").on("click", function(e) {
					$(".type-name-ul-type").css("background-color", "#F5F5F5");
					$(".type-name-ul-type").css("color", "#666666");
					$(e.target).css("background-color", "white");
					$(e.target).css("color", "#EC9C00");
				});
				$("#tab1-ul-list1>li:last").remove();
			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			}
		});

	});

	//排序
	var sortdataList = [{
			distance: "根据距离排序",
			orderParam: "1"
		},
		{
			distance: "根据评分排序",
			orderParam: "2"
		}
	];

	$("#tab3-a").on("click", function(e) {
		pageNo = 1;
		var $lic3 = '';
		for(var i = 0; i < sortdataList.length; i++) {
			var obj3 = sortdataList[i];
			$lic3 += '<li data-orderparam="' + obj3.orderParam + '"><span class="type-name-ul-type">' + obj3.distance + '</span></li>';
		}
		$("#tab3-ul-list3").html($lic3);

		$(document).on("click", ".type-name-ul-type", function(e) {
			$(".buttons-tab>a").css("display", "none")
			$("#tab1-a").show();
			$("#tab2-a").show();
			$("#tab3-a").show();
			orderParam = $(this).parent().data("orderparam");

			$(".type-name-ul-type").css("background-color", "#F5F5F5");
			$(".type-name-ul-type").css("color", "#666666");
			$(e.target).css("background-color", "white");
			$(e.target).css("color", "#EC9C00");

			var spanText = $(this).text();

			$(".list-container-li").remove();
			$(".tab-img").attr("src", "imgs/arrows1.png");
			$(".tab-button").css("color", "#999");
			$("#coverLayer").css("display", "none");
			$(".content-block").css("display", "none");
			$(".tab-img").css("transform", "rotate(0deg)");

			initPages(null, null, orderParam)
		});
	});
}

function initPages(typeId, cityCodes, orderParam) {
	var params = {
		typeId: typeId,
		code: cityCodes,
		pageNo: pageNo,
		pageSize: pageSize,
		longitude: longitude,
		latitude: latitude,
		serviceItemId: serviceItemId,
		orderParam: orderParam,
		token: token
	};
	console.log(params)
	//页面打开时候加载的接口 查询
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/hospital/getHospitalPage.json',
		data: params,
		dataType: 'JSON',
		contentType: 'application/json',
		success: function(data) {
			tokenLose(data.status);
			var dataList = data.data;
			var mailList = '';
			for(var i = 0; i < dataList.length; i++) {
				var obj = dataList[i];
				var goal = obj.evaluationScore;
				var typeName = obj.typeName ? obj.typeName : "";
				mailList += '<li class="list-container-li" data-id="' + obj.id + '" data-serviceItemid="' + obj.serviceItemId + '" data-rate="' + obj.rate + '" data-name="' + obj.name + '" data-serviceName="' + obj.serviceName + '">';
				mailList += '<a href="javascript:;">';
				mailList += '<div class="div-content">';
				mailList += '<div class="div-content-introduce">';
				mailList += '<div class="fixation-img">';
				mailList += '<img class="div-img" src="' + obj.picUrl + '">';
				mailList += '</div>';
				mailList += '<h3 class="div-content-name"><span class="hospitalName">' + obj.name + '</span><span class="brand_' + obj.typeId + '">' + typeName + '</span></h3>';
				if(obj.distance == '10000000') {} else {
					mailList += '<span class="distance">距我' + obj.distance + 'km</span>';
				}
				mailList += '<div class="grade">';
				gradeImg()
				mailList += '<span class="goal">' + goal + '分</span>';
				mailList += '</div>';
				mailList += '<div class="content-address">' + obj.address + '</div>';
				mailList += '</div>';
				mailList += '<div class="div-content-function">';
				mailList += '<div class="function-title">';
				mailList += '<h6 class="function-title-h6">' + obj.serviceName + '</h6>';
				mailList += '<p class="function-title-p">已预约' + obj.hosUseTimes + '次</p>';
				mailList += '</div>';
				mailList += '<div class="function-price">';
				mailList += '<h6 class="function-price-h6"><span id="rate">' + obj.oldRate + '</span>元/次</h6>';
				mailList += '<p class="function-price-p"><span>' + obj.rate + '</span>元/次</p>';
				mailList += '</div>';
				mailList += '<span class="function-button" data-id="' + obj.id + '" href="bloodTestNews.html">预约</span>';
				mailList += '</div>';
				mailList += '</div>';
				mailList += '</a>';
				mailList += '</li>';
				$(".list-container").html(mailList);
			}

			//分数
			function gradeImg() {
				if(goal == 1) {
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
				} else if(goal == 2) {
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';

				} else if(goal == 3) {
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
				} else if(goal == 4) {
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorNone.png" alt="" />';
				} else if(goal == 5) {
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
					mailList += '<img class="grade-img" src="imgs/colorYellow.png" alt="" />';
				} else {
					//alert("评分范围1~5");
				}

			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		},
		boforeSend: function() {
			$(".nomore").hide();
			$(".loading").show();
		},
		complete: function() {
			$(".nomore").show();
			$(".loading").hide();
		}

	});
}

function initParams() {
	localCityInfo = JSON.parse(sessionStorage.getItem("localCityInfo"));
	longitude = localCityInfo.longitude;
	latitude = localCityInfo.latitude;
	patId = JSON.parse(localStorage.getItem("user")).userId;
	token = JSON.parse(localStorage.getItem("user")).token;
	serviceItemId = GetQueryStr("serviceId");
	id1 = GetQueryStr("id1");
}
console.log(patId)

function initScrollBar() {
	//下拉加载更多
	var stop = true;
	$(window).scroll(function() {
		totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		if($(document).height() <= totalheight) {
			if(stop == true) {
				stop = false;
				pageNo++;
				initPages();
				stop = true;
			}
		}
	});
}
$("header > a").on("click", function() {
	historyBack();
})
$(document).on("click", ".function-button", function() {
	var hospitalId = $(this).data("id");
	var hrefTo = '';
	if(id1 == 'Home_service_class') {
		hrefTo = '../medic/doorservicesubm.html';
	} else if(id1 == 'Booking_to_shop') {
		hrefTo = '../medic/shopservicesubm.html';
	}

	var nextPage = hrefTo + '?id1=' + id1 + '&serviceId=' + serviceItemId + '&hospitalId=' + hospitalId;
	historyForward(nextPage);

});