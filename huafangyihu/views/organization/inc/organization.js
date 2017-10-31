//初始化显示页数为1；
var localCityCode;
var localCityName;
var pageNo;
var pageSize;
var longitude;
var latitude;
var user;
var token;
var localCityInfo;
var hospitalId;
var orderParam;
var dataListLenght;
var cityCode;
var cityName;
//顶部下拉刷新代码
// var pullTop = $("#pull-loading").height();

// function pullTopAll() {
	// slide(".container", pullTop, function(e) {

		// var that = this;
		// setTimeout(function() {
			// $(".list-container").html("")
			// pageNo = 1;
			// initPages("", localCityCode);
			// $("#bottom").hide();
			// that.back.call();
		// }, 2000);
	// });
// };
$(function() {
	initParams();
	initClick();
	if(GetQueryStr("nearby") == 1) {
		console.log(111)
		initPages("", "", "1");
	} else {
		initPages("", localCityCode);
	}
	initScrollBar();
	// pullTopAll();
});



//var documentWidth = $(window).width();
//
//if(documentWidth > 412) {
//	$("#coverLayer").css("margin-top", "13.8rem");
//}
//if(documentWidth > 479) {
//	$("#coverLayer").css("margin-top", "13.8rem");
//}
//var documentHeight = $(window).height() - 196;
//$("#coverLayer").height(documentHeight);

function initClick() {
	//选择框
	$(".type-name-ul-type").on("click", function() {
		$(".type-name-ul-type").css("background-color", "#F5F5F5");
		$(".type-name-ul-type").css("color", "#666666");
		$(".type-name-ul-type2").css("color", "#666666");
		$(this).css("background-color", "white");
		$(this).css("color", "#EB9C01");
	})
	$(".type-name-ul-type2").on("click", function() {
		$(".type-name-ul-type2").css("color", "#666666");
		$(this).css("color", "#EB9C01");
	})
	//下滑菜单
	//地区选择
	$("#tab1-a").on("click", function() {
		$(this).hide();
		$('#tab2-a-fold').hide();
		$('#tab3-a-fold').hide();
		$('#tab2-a-fold').hide();
		$('#tab3-a-fold').hide();
		$('#tab2-a').show();
		$('#tab3-a').show();
		$("#tab1-a-fold").show();
		$("#tab1-a-fold .tab-button").css("color", "#999");
		$("#tab-button-span1-up1").css("color", "#EB9C01");
		$(".tab-img").attr("src", "imgs/arrows1.png");
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
	})
	$("#tab1-a-fold").on("click", function() {
		$(this).hide();
		$("#tab1-a").show();
		$("body").css("overflow", "auto");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$(".tab-button").css("color", "#999");
		$("#coverLayer").css("display", "none");
		$(".content-block").css("display", "none");
		$(".tab-img").css("transform", "rotate(0deg)");
	})
	//类型选择
	$("#tab2-a").on("click", function() {
		$(this).hide();
		$('#tab1-a-fold').hide();
		$('#tab3-a-fold').hide();
		$('#tab1-a-fold').hide();
		$('#tab3-a-fold').hide();
		$('#tab1-a').show();
		$('#tab3-a').show();
		$("#tab2-a-fold").show();
		$("#tab2-a-fold .tab-button").css("color", "#999");
		$("#tab-button-span2-up2").css("color", "#EB9C01");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$("#tab2-a-fold .tab-img").css("transform", "rotate(0deg)");
		$("#tab2-a-fold .tab-img").attr("src", "imgs/arrows2.png");
		$("#tab-img2").attr("src", "imgs/arrows2.png");
		$("#tab-img2").css("transform", "rotate(0deg)");
		$("#coverLayer").css("display", "block");
		$(window).scrollTop(0)
		$("body").css("overflow", "hidden");
		$(".content-block").css("display", "block");
		$("#tab2 div").css("display", "block");
		$("#tab1 div").css("display", "none");
		$("#tab3 div").css("display", "none");
	})
	$('#tab2-a-fold').on('click', function() {
		$(this).hide();
		$("#tab2-a").show();
		$("body").css("overflow", "auto");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$(".tab-button").css("color", "#999");
		$("#coverLayer").css("display", "none");
		$(".content-block").css("display", "none");
		$(".tab-img").css("transform", "rotate(0deg)");
	})
	//综合排序选择
	$("#tab3-a").on("click", function() {
		$(this).hide();
		$('#tab1-a-fold').hide();
		$('#tab2-a-fold').hide();
		$('#tab1-a-fold').hide();
		$('#tab2-a-fold').hide();
		$('#tab1-a').show();
		$('#tab2-a').show();
		$("#tab3-a-fold").show();
		$("#tab3-a-fold .tab-button").css("color", "#999");
		$("#tab-button-span3-up3").css("color", "#EB9C01");
		$(".tab-img").attr("src", "imgs/arrows1.png");
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
	})
	$('#tab3-a-fold').on('click', function() {
		$(this).hide();
		$("#tab3-a").show();
		$("body").css("overflow", "auto");
		$(".tab-img").attr("src", "imgs/arrows1.png");
		$(".tab-button").css("color", "#999");
		$("#coverLayer").css("display", "none");
		$(".content-block").css("display", "none");
		$(".tab-img").css("transform", "rotate(0deg)");
	})
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

	//禁用滚动事件
	$("#coverLayer").on("touchmove", function(e) {
		e.preventDefault();
	})
	$(".buttons-tab").on("touchmove", function(e) {
		e.preventDefault();
	})
	//下拉框渲染接口
	$("#tab2-a").on("click", function() {
		//隐藏科室
		$(".type-name-ul-type2").hide();
		$("#tab2-ul-list").find("li:gt(0)").remove();
		var prams = {
			token: user.token
		}
 		console.log(prams)
		//类型（科室）接口
		$.ajax({
			type: "GET",
			url: config.appserver_url + '/hospital/getAllHospitalType.json',
			data: prams,
			dataType: "JSON",
			contentType: 'application/json',
			success: function(data) {
				console.log(data)
				tokenLose(data.status);
				$(".type-name-ul-type").show();
				var dataList = data.data;
				var ul1 = $("#tab2-ul-list");
				// var ul2 = $("#tab2-ul-list2");
				var objStr1 = "";
				var objStr2 = "";
				objStr1 = ul1.html();
				for(var i = 0; i < dataList.length; i++) {
					var dataLists = dataList[i];
					objStr1 += '<li><span class="type-name-ul-type" data-code="'+ dataLists.code +'">' + dataLists.name + '</span></li>';
				}

				ul1.html(objStr1);

				$("li", ul1).on("click", function() {
					$(this).addClass("activity").siblings("li").removeClass("activity");

					return false;
				})

				// $("li:first", ul1).on("click", function(e) {
				// 	objStr2 = "";
				// 	for(var i = 0; i < dataList.length; i++) {
				// 		var dataListsall = dataList[i];
				// 		var childLists = dataListsall.childList;
				// 		//						for(var j = 0; j < childLists.length; j++) {
				// 		//							var childListsall = childLists[j];
				// 		//							objStr2 += '<li data-deptcode="' + dataList[i].childList[j].code + '"><span class="type-name-ul-type2">' + childListsall.name + '</span></li>';
				// 		//						}
				// 	}
				// 	ul2.html(objStr2);

				// 	return false;
				// });

				// $("li:first", ul1).trigger("click");

				// $("li:not(':first')", ul1).on("click", function(e) {
				// 	objStr2 = "";
				// 	$("#tab2-ul-list2").html("");
				// 	var index = $(this).index() - 1;
				// 	console.log(dataList[index].childList)
				// 	for(var i = 0; i < dataList[index].childList.length; i++) {
				// 		objStr2 += '<li data-deptcode="' + dataList[index].childList[i].code + '"><span class="type-name-ul-type2">' + dataList[index].childList[i].name + '</span></li>'
				// 		console.log(dataList[index].childList[i].code)
				// 	}
				// 	ul2.html(objStr2);
				//
				// 	return false;
				// });

				$(".type-name-ul-type").off().on("click", function() {
					$(".buttons-tab>a").css("display", "none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					$("body").css("overflow", "auto");
					var list2deptCode = $(this).data("code");
					$(".list-container-li").remove();
					$(".tab-img").attr("src", "imgs/arrows1.png")
					$(".tab-button").css("color", "#999")
					$("#coverLayer").css("display", "none")
					$(".content-block").css("display", "none")
					$(".tab-img").css("transform", "rotate(0deg)")
					pageNo = 1;
					initPages(list2deptCode, localCityCode, "");

					return false;
				})

			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			}
		})

	})

	//地区
	$("#tab1-a").on("click", function(e) {
		$("#tab1-ul-list1>li").remove();
		var pramas = {
			token: user.token
		}
		$.ajax({
			url: config.appserver_url + '/hospital/getAllCity.json',
			data: "GET",
			dataType: "JSON",
			data: pramas,
			contentType: 'application/json',
			success: function(data) {
				tokenLose(data.status);
				var keys = data.data.key;
				var allCity = data.data.city
				var citydataList;
				var nationwide =  cityCode ? "" : "activity";
				var areaList = '<li class="'+ nationwide +'"><span id="" class="type-name-ul-type">全国</span></li>'
				for(var i = 0; i < keys.length; i++) {
					citydataList = keys[i]
					var allCityList = allCity[citydataList]
					for(var j = 0; j < allCityList.length; j++) {
						var $allCityList = allCityList[j]
						var isCurrent = $allCityList.code == cityCode ? "activity" : "";
						areaList += '<li class="'+ isCurrent +'"><span class="type-name-ul-type" id="'+ $allCityList.code +'">' + $allCityList.name + '</span></li>'
					}
					$("#tab1-ul-list1").html(areaList)
				}
				//点击发送code
				$(".type-name-ul-type").on("click", function() {
					orderParam = null;
					localCityName = $(this).text();
					cityCode = $(this).attr("id")
					$("#tab-button-span1, #tab-button-span1-up1").text(localCityName);
					$(".list-container-li").remove();
					$(".tab-img").attr("src", "imgs/arrows1.png")
					$(".tab-button").css("color", "#999")
					$("#coverLayer").css("display", "none")
					$(".content-block").css("display", "none")
					$(".tab-img").css("transform", "rotate(0deg)")
					pageNo = 1;
					localCityCode = cityCode;
					initPages("", localCityCode, "");

				});

				// $("#coverLayer").on("mouseover", function() {
				// 	$(".list-container-li").remove();
				// 	$(".tab-img").attr("src", "imgs/arrows1.png")
				// 	$(".tab-button").css("color", "#999")
				// 	$("#coverLayer").css("display", "none")
				// 	$(".content-block").css("display", "none")
				// 	$(".tab-img").css("transform", "rotate(0deg)")
				// });

				var tab4 = $('#tab1-ul-list1');
				for(var i = 0; i < citydataList.length; i++) {
					var obj2 = citydataList[i];
					var $lic2 = tab4.find('li:first').clone();
					$lic2.css('display', 'block');
					$lic2.find('.type-name-ul-type').html(obj2.name);
					tab4.append($lic2);
				}

				$(".type-name-ul-type").on("click", function(e) {
					$(".buttons-tab>a").css("display", "none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					$("body").css("overflow", "auto");
					// $(".type-name-ul-type").css("background-color", "#F5F5F5")
					$(".type-name-ul-type").css("color", "#666666")
					// $(e.target).css("background-color", "white")
					$(e.target).css("color", "#EC9C00")
				})
				$("#tab1-ul-list1>li:last").remove()
			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			}
		})

	});
	//折叠回去
	//	$("#tab1-a-fold").on("click",function(){
	//		console.log(3333)
	//  $("#tab-button-span1").css("color","red")
	//  $(".content-block").hide();
	//  $("#coverLayer").hide()
	//  	$(this).hide();
	//		$("#tab1-a").show()
	//	})

	var sortdataList = [{
			distance: "距我最近"
		},
		{
			distance: "评分最高"
		},
		{
			distance: "关注最多"
		}

	];

	//排序
	$("#tab3-a").on("click", function(e) {
		$("#tab3-ul-list3").find("li:gt(0)").remove();
		var tab5 = $('#tab3-ul-list3');
		var tab3List = '';
		for(var i = 0; i < sortdataList.length; i++) {
			console.log()
			var obj3 = sortdataList[i];
			// var $lic3 = tab5.find('li:first').clone();
			// $lic3.css('display', 'block');
			// $lic3.find('.type-name-ul-type').html(obj3.distance);
			var curOrderParam = i+1 == orderParam ? "activity" : "";
			tab3List +='<li  class="synthesizeSort '+ curOrderParam +'" data-orderparam="'+ (i+1) +'"><span class="type-name-ul-type">'+ obj3.distance +'</span></li>';
			tab5.html(tab3List);
		}
		// $(".synthesizeSort").eq(0).attr("data-evaluationscore", "1");
		// $(".synthesizeSort").eq(1).attr("data-distance", "1");
		// $(".synthesizeSort").eq(2).attr("data-distance", "2");
		$(".type-name-ul-type").on("click", function(e) {
			$("body").css("overflow","auto")
			$(".buttons-tab>a").css("display", "none")
			$("#tab1-a").show();
			$("#tab2-a").show();
			$("#tab3-a").show();
			pageNo = 1;
			// $(".type-name-ul-type").css("background-color", "#F5F5F5")
			// $(".type-name-ul-type").css("color", "#666666")
			// $(e.target).css("background-color", "white")
			// $(e.target).css("color", "#EC9C00")

			// var spanText = $(this).text();

			$(".list-container-li").remove();
			$(".tab-img").attr("src", "imgs/arrows1.png")
			$(".tab-button").css("color", "#999")
			$("#coverLayer").css("display", "none")
			$(".content-block").css("display", "none")
			$(".tab-img").css("transform", "rotate(0deg)")

			// distance = $(this).parent().data("distance");
			// evaluationScore = $(this).parent().data("evaluationscore");
			// console.log(distance)
			orderParam = $(this).parent().data("orderparam");
			initPages("", localCityCode, orderParam);
		})
	});

};

//orderParam排序字段
function initPages(deptCode, localCityCode, orderParam) {
	console.log(deptCode)
	var params = {
		hospitalTypeCode: deptCode,
		code: localCityCode,
		pageNo: pageNo,
		orderParam: orderParam,
		pageSize: pageSize,
		longitude: longitude,
		latitude: latitude,
		token: user.token
	};
	console.log(params)
	//页面打开时候加载的接口 查询
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/hospital/getHospitalPageByVo.json',
		data: params,
		dataType: 'JSON',
		contentType: 'application/json',
		success: function(data) {
			console.log(data)
			tokenLose(data.status);
			var dataList = data.data;
			dataListLenght = dataList.length;
			$("#tab-button-span1, #tab-button-span1-up1").text(localCityName);
			var mailList = $(".list-container").html()
			for(var i = 0; i < dataList.length; i++) {
				var obj = dataList[i];
				var goal = dataList[i].evaluationScore ? dataList[i].evaluationScore : 0;
				mailList += '<li id=' + dataList[i].id + ' class="list-container-li">';
				mailList += '<div class="div-content">';
				mailList += '<div class="fixation-img">';
				mailList += '<img class="div-img" src="' + obj.picUrl + '" />';
//				data.data[i].typeName ? mailList += '<span class="span-img">' + data.data[i].typeName + '</span>' : "";
				mailList += '</div>';
				mailList += '<h3 class="div-content-name">' + obj.name + '</h3>';
				if(obj.distance == "10000000") {
					obj.distance ? mailList += '<span class="distance"></span>' : "";
				} else {
					obj.distance ? mailList += '<span class="distance">' + obj.distance + "km" + '</span>' : "";
				}
				mailList += '<div class="grade">';
				gradeImg(goal)
				mailList += '<span class="goal">' + goal + "分" + '</span></div>';
				mailList += '<div class="content-address">' + obj.address + '</div>';
				mailList += '<div class="content-footer">';
				//遍历服务项目
				for(var j = 0; j < dataList[i].tagNameList.length; j++) {
					mailList += '<span class="content-footer-serve">' + dataList[i].tagNameList[j] + '</span>';
				}
				mailList += '</div></div></li>';
				//渲染
				$(".list-container").html(mailList);
			}

			function gradeImg(e) {

				if(e < 0.5) {
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 1) {
					mailList += '<img class="grade-img"  src="../../images/bigStar.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 1.5) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 2) {

					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/bigStar.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 2.5) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 3) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/bigStar.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 3.5) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 4) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/bigStar.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 4.5) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star2.png"/>';
				} else if(e < 5) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/bigStar.png"/>';
				} else if(e == 5) {
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
					mailList += '<img class="grade-img"  src="../../images/star.png"/>';
				} else {
					//alert("综合评分返回0~5")
				}
				return;

			}
			switchover()
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		},
		beforeSend: function() {
			$(".noMore").hide();
			$(".ajaxLoading").show();
		},
		complete: function() {
			$(".noMore").show();
			$(".ajaxLoading").hide();
		}
	});

}

function initParams() {
	user = JSON.parse(localStorage.getItem("user"));
	localCityInfo = JSON.parse(sessionStorage.getItem("localCityInfo"));
	longitude = localCityInfo.longitude;
	latitude = localCityInfo.latitude;
	localCityCode = localCityInfo.localCityCode;
	cityCode = localCityInfo.localCityCode;
	localCityName = localCityInfo.localCityName;
	pageNo = 1;
	pageSize = 7;

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
				//如果少于6条不发送请求
				if(dataListLenght < 6) {

				} else {

					if(orderParam) {
						initPages("", localCityCode, orderParam);
					} else {
						initPages("", localCityCode, "");
					}
				}
				stop = true;
			}
			$("#bottom").show();
		}
	});
}

function switchover() {

	//点击跳转诊所
	$(".list-container-li").on('click', function() {

		//			sessionStorage.removeItem("hospitalId")
		var hospitalId = $(this).attr("id")

		hospitalId = hospitalId
		//    var paramsJson = JSON.stringify(params);
		//  sessionStorage.setItem("hospitalId", hospitalId);
		var parameter = "default=" + "default" + "&" + "hospitalId=" + hospitalId
		//	  location.href ='../myClinic/clinicIndex.html?'+parameter;
		var nextPage = '../myClinic/clinicIndex.html?' + parameter;
		historyForward(nextPage)
	})

	$("#myClinicClinicIndex").on("click", function() {
		var hospitalIdList = sessionStorage.getItem("hospitalId");
		if(hospitalIdList == null) {
			window.location.href = "../myClinic/clinicSwitchNothing.html";
		} else {
			window.location.href = "../myClinic/clinicIndex2.html";
		}
	})

};

if(sessionStorage.getItem("historyArr")) {
	var curPage = ".." + location.href.slice(location.href.indexOf("views")+"views".length);
	var historyArr = sessionStorage.getItem("historyArr").split(",");
	if(curPage !== historyArr[historyArr.length-1]) {
		historyArr.push(curPage);
	};

	sessionStorage.setItem("historyArr", historyArr);
};
