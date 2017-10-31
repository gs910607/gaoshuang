//打电话
$("#telephone1").on("click", function() {
	$("#phoneShade").show();
	$(".promptBtn > a").on("click", function() {
		$("#phoneShade").hide();
	})
})

//点击关注
$(".follow").on("click", function() {
	attentionHos();

	$(".add-follow").css("display", "block");
	$(".follow").css("display", "none");
	alert("取消关注成功")
})
//取消关注
$(".add-follow").on("click", function() {
	attentionHos();
	$(".add-follow").css("display", "none");
	$(".follow").css("display", "block");
	alert("关注成功")
})
//跳转更多评论
$("#moreEvaluate").on("click", function() {
	var pramer = "hospitalId=" + hospitalId;
	window.location.href = "clinicEvaluate.html?" + pramer;
});

//解析url参数数据
function analysisUrl() {
	var haveDefault = GetQueryStr("default")
	var haveHospitalId = GetQueryStr("hospitalId")
	if(!haveHospitalId) {
		hospitalId = sessionStorage.getItem("hospitalId")
	};
	if(haveDefault) {
		$(".bar").hide();
	} else {
		$(".bar").show();
		$(".return").hide();
	};
	if(haveDefault, haveHospitalId) {
		$(".switch-clinic").hide();
		hospitalId = haveHospitalId
		initMyHospital();
	} else {
		$(".switch-clinic").show()
		initMyHospital();
	};
}

analysisUrl();

var defaultUrl = GetQueryStr("default");

//定义全局变量
var type = "2";
var token;
var longitude;
var latitude;
var hospitalId;
var pageNo = 1;
var pageSize = 10;
var user;
var defaultUrl;

latitude = sessionStorage.getItem("latitude");
//(function() {
if(!latitude) {
	getLocalCity();
} else {

}

var initHospitalId = localStorage.getItem("hospitalId1");
var ententType = GetQueryStr("type");
if(initHospitalId && ententType) {
	hospitalId = initHospitalId;
	console.log(hospitalId);
}
init();
myfun();
//})();

//轮播图同步加载
function init() {
	var param = {
		hospitalId: hospitalId,
		userId: user.userId,
		token: user.token
	}
	console.log(param)
	$.ajax({
		type: "get",
		data: param,
		url: config.appserver_url + "/article/queryArticleAdv.json",
		dataType: "json",
		async: false,
		success: function(data) {
			console.log(data)
			if(!data.data) {} else {
				tokenLose(data.status);
				var sliderList = $(".sliderCarousel").html()
				if(!data.data.picList.length) {

				} else {
					$("#first-bg").attr("src", data.data.picList.imageUrl)
					for(var i = 0; i < data.data.picList.length; i++) {
						sliderList += '<li style="float: left; display: inline; width: 320px; height: 160px;"><a class="slider_a" href=' + data.data.picList[i].linkUrl + ' target="_blank"><img src=' + data.data.picList[i].imageUrl + '></a></li>';
					}
				}
				$(".sliderCarousel").html(sliderList)
			}
		}

	});
};

function attentIsFollow1() {
	var param = {
		hospitalId: hospitalId,
		userId: user.userId,
		token: user.token
	}
	$.ajax({
		type: "get",
		data: param,
		url: config.appserver_url + "/myClinic/queryMyClinicNoDis.json",
		dataType: "json",
		async: true,
		success: function(data) {

		}

	});
}

attentIsFollow1();

function attentIsFollow() {
	//			console.log(data.data)
	//点击切换诊所
	$(".switch-clinic").on("click", function() {

		if(data.data.hospitalVo.isFollow == 1) {
			location.href = "clinicSwitch.html"
		} else {
			location.href = "clinicSwitchNothing.html"
		}
	});
}

//查询是否有关注的诊所
function myfun() {
	var param = {
		userId: JSON.parse(localStorage.getItem("user")).userId,
		token: JSON.parse(localStorage.getItem("user")).token,
		latitude: sessionStorage.getItem("latitude"),
		longitude: sessionStorage.getItem("longitude"),
		pageNo: 1,
		pageSize: 10
	}
	$.ajax({
		type: "get",
		data: param,
		url: config.appserver_url + "/hosPa/queryFocusHospital.json",
		dataType: "json",
		async: false,
		success: function(data) {
			// 点击切换诊所
			$(".switch-clinic").on("click", function() {
				if(!data.data.length == 0) {
					location.href = "clinicSwitch.html?"
				} else {
					location.href = "clinicSwitchNothing.html?"
				}
			})
		}
	});
}

//关注医院接口
function attentionHos() {
	var param = {
		hospitalId: hospitalId,
		userId: user.userId,
		token: user.token
	}
	$.ajax({
		type: "post",
		data: param,
		url: config.appserver_url + "/hosPa/focus.json",
		dataType: "json",
		async: true,
		success: function(data) {
			attentIsFollow();
			attentIsFollow1();
		},
		error: function(data) {

		}
	});
}

//推荐医院信息加载
function queryLast() {
	var params = {
		hospitalId: hospitalId,
		userId: user.userId,
		token: user.token
	}
	console.log(params)
	var hospitalId1 = hospitalId
	$.ajax({
		type: "get",
		data: params,
		url: config.appserver_url + "/myClinic/queryMyClinicNoDis.json",
		dataType: "json",
		async: true,
		success: function(data) {
			tokenLose(data.status);
			console.log(data)
			if(data.data.orgIndexIcons.length == 0) {

			} else {
				$(".address").css("border-bottom", "1rem solid #F2F2F2");
											console.log(data.data.orgIndexIcons)
				for(var i = 0; i < data.data.orgIndexIcons.length; i++) {
					if(data.data.orgIndexIcons[i].appName == "在线咨询") {
						$("#onLine-consult").show();
					}
					if(data.data.orgIndexIcons[i].appName == "预约就诊") {
						$("#appointDoctor").show();
					}
					if(data.data.orgIndexIcons[i].appName == "预约上门") {
						$("#dropIn").show();
					}
					if(data.data.orgIndexIcons[i].appName == "专项服务") {
						$("#specificSupport").show();
					}
					if(data.data.orgIndexIcons[i].appName == "送药到家") {
						$("#buyMedicine").show();
					}
					if(data.data.orgIndexIcons[i].appName == "健康产品") {
						$("#healthPro").show();
					}
					if(data.data.orgIndexIcons[i].appName == "诊所介绍") {
						$("#clinicIntroduction").show();
					}
					if(data.data.orgIndexIcons[i].appName == "一键电话") {
						$("#telephone1").show();
					}
					if(data.data.orgIndexIcons[i].appName == "诊所医护") {
						$(".health-clinic").show();
						$(".article").show();
					}
				}
			}
			localStorage.setItem("hospitalId1", hospitalId1);
			sessionStorage.setItem("cityCode", data.data.hospitalVo.cityCode);
			mapLocation();
			//判断是否关注
			if(data.data.hospitalVo.isFollow == 1) {
				$(".add-follow").css("display", "none");
				$(".follow").css("display", "block");
			} else {
				$(".add-follow").css("display", "block");
				$(".follow").css("display", "none");

			}
      $(".promptContent>h4").text("拨号");
			$(".promptContent>p").text("您确认要拨打" + data.data.hospitalVo.tel + "吗？")
			//轮播图首图片更换
			var picUrl = data.data.hospitalVo.picUrl
			$("#first-bg").attr("src", picUrl)

			//遍历诊所动态
			var articleAndActiveVoList = data.data.articleAndActiveVoList;
			if(articleAndActiveVoList.length == 0) {
				$(".article-header").eq(0).hide();
			} else {
				$(".article-header").eq(0).show();
			}
			var recommendEssay = $(".article-list").html()
			for(var i = 0; i < articleAndActiveVoList.length; i++) {
				//				recommendEssay += '<li class="article-list-li"><a href="dynamicArticle.html">';
				recommendEssay += '<li class="article-list-li"><a href="javascript:;">';
				recommendEssay += '<img class="article-list-li-img" src="../../images/recommendation.png" />';
				recommendEssay += '<span class="article-list-li-span">' + articleAndActiveVoList[i].name + '</span></a></li>';
			}
			$(".article-list").html(recommendEssay);

			//遍历热门推荐
			var hospitalServiceItemVoList = data.data.hospitalServiceItemVoList;
			if(hospitalServiceItemVoList.length == 0) {
				$("#recommend").hide();
			} else {
				$("#recommend").show();
			}
			var recommendList = $(".recommend-list").html();
			//如果没有推荐服务的话 隐藏该推荐服务
			if(hospitalServiceItemVoList[0] == null) {
				$("#recommend").hide();
			} else {
				for(var i = 0; i < hospitalServiceItemVoList.length; i++) {
					recommendList += '<li data-id1="' + hospitalServiceItemVoList[i].categoryPid + '" data-id=' + hospitalServiceItemVoList[i].id + ' class="recommend-list-li">';

					//判断是否有图片传入
					if(hospitalServiceItemVoList[i].picUrl) {
						var hospitalServiceItemPicUrl = hospitalServiceItemVoList[i].picUrl;
					} else {
						var hospitalServiceItemPicUrl = "../../images/default-img7070.png";
					}
					recommendList += '<img  class="recommend-img" src="' + hospitalServiceItemVoList[i].picUrl + '" />';
					recommendList += '<div class="recommend-text"><h6>' + hospitalServiceItemVoList[i].name + '</h6> <p class="servGetDetails">' + hospitalServiceItemVoList[i].desp + '</p>';
					recommendList += '<div class="discount"><span class="discount-price">' + hospitalServiceItemVoList[i].oldRete + '元/次</span>';
					recommendList += '<img src="../../images/discount_identification.png" alt=""></div>';
					recommendList += '<span class="original-price">门店价：' + hospitalServiceItemVoList[i].rate + '元/次</span></div></li><div class="clear"></div>';
				}
				$(".recommend-list").html(recommendList);
			}
			$(".hospitalName").text(data.data.hospitalVo.name);
			$(".address span").eq(0).text(data.data.hospitalVo.address);
			//微信分享
			var shareLink = window.location.href;
			var shareTitle = data.data.hospitalVo.name;
			var shareImgUrl = data.data.hospitalVo.picUrl;
			//微信分享操作
			shareInvoke(shareLink, shareTitle, shareImgUrl);

			$(".clinic-number").text((data.data.hospitalVo.evaluationScore ? data.data.hospitalVo.evaluationScore : "0") + "分");
			judgeGrade1(data.data.hospitalVo.evaluationScore);
			$(".recommend-list-li").on("click", function() {
				var serviceId = $(this).data("id")
				var id1 = $(this).data("id1");
				var serviceInfoPage;
				if(id1 == 'Home_service_class') {
					serviceInfoPage = "../myClinic/doordetails";
				} else if(id1 == 'Booking_to_shop') {
					serviceInfoPage = "../myClinic/shopdetails";
				} else if(id1 == 'Health_products') {
					serviceInfoPage = "../myClinic/healthdetails";
				} else if(id1 == 'Drug_delivery') {
					serviceInfoPage = "../myClinic/drugIntroduction";
				}
				historyForward(serviceInfoPage + ".html?id1=" + id1 + "&serviceId=" + serviceId + "&hospitalId=" + hospitalId);
			});

			function judgeGrade1(e) {
				if(e < 0.5) {

				} else if(e < 1) {
					//			$(".clinic-img").eq(0).attr("src", "../../images/bigStar.png")
				} else if(e < 1.5) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
				} else if(e < 2) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/bigStar.png")
				} else if(e < 2.5) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/star.png")
				} else if(e < 3) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/star.png")
					$(".clinic-img").eq(2).attr("src", "../../images/bigStar.png")
				} else if(e < 3.5) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/star.png")
					$(".clinic-img").eq(2).attr("src", "../../images/star.png")
				} else if(e < 4) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/star.png")
					$(".clinic-img").eq(2).attr("src", "../../images/star.png")
					$(".clinic-img").eq(3).attr("src", "../../images/bigStar.png")
				} else if(e < 4.5) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/star.png")
					$(".clinic-img").eq(2).attr("src", "../../images/star.png")
					$(".clinic-img").eq(3).attr("src", "../../images/star.png")
				} else if(e < 5) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/star.png")
					$(".clinic-img").eq(2).attr("src", "../../images/star.png")
					$(".clinic-img").eq(3).attr("src", "../../images/star.png")
					$(".clinic-img").eq(4).attr("src", "../../images/bigStar.png")
				} else if(e == 5) {
					$(".clinic-img").eq(0).attr("src", "../../images/star.png")
					$(".clinic-img").eq(1).attr("src", "../../images/star.png")
					$(".clinic-img").eq(2).attr("src", "../../images/star.png")
					$(".clinic-img").eq(3).attr("src", "../../images/star.png")
					$(".clinic-img").eq(4).attr("src", "../../images/star.png")
				} else {
					//alert("综合评分返回0~5")
				}
				return;
			}
			var evaluateNum = '用户评价(' + data.data.evaluateCount + ')';
			if(!data.data.evaluateList.length) {
				$("#moreEvaluate>span").hide();
				$("#MoreEvaluateNone").css("display", "block");
			} else {
				$("#moreEvaluate>span").show();
				$("#MoreEvaluateNone").css("display", "none")
			}
			$("#levauateVoListlength").text(evaluateNum);
			var mailList = $(".evaluate-ul").html();
			var evaluateVoList = data.data.evaluateList;
			if(evaluateVoList.length == "0") {

			} else {
				console.log(evaluateVoList)
				//默认两条评价
				for(var i = 0; i < evaluateVoList.length; i++) {
					mailList += '<li class="evaluate-ul-li">';
					mailList += '<img class="evaluate-ul-li-img" src="' + evaluateVoList[i].avatar + '" />';
					mailList += '<div class="evaluate-ul-li-div">';
					mailList += '<span class="evaluate-ul-li-name">' + evaluateVoList[i].userName + '</span></div>';

					mailList += '<span class="evaluate-ul-li-time">' + dateFormat(evaluateVoList[i].createTime) + '</span>';

					mailList += '<div class="evaluateNumber">';
					judgeGrade(evaluateVoList[i].score)
					mailList += '<span id="evaluateId" class="evaluate-content-span">' + evaluateVoList[i].score + '分</span></div>';
					mailList += '<div class="evaluate-content">';
					mailList += '<span  class="evaluate-content-span">' + evaluateVoList[i].content + '</span>';
					mailList += '</div></li>';
				}
			}
			$(".evaluate-ul").html(mailList);
			//定位地图
			function mapLocation() {
				var latitude = data.data.hospitalVo.latitude;
				var longitude = data.data.hospitalVo.longitude;

				// 跳转至诊所定位
				$("#location").on("click", function() {
					sessionStorage.setItem("local_longitude", longitude);
					sessionStorage.setItem("local_latitude", latitude);
					var pramars = "clinicIndex.html=clinicIndex.html" + "&" + "default=" + defaultUrl + "&" + "hospitalId=" + hospitalId;
					window.location.href = "../location/location.html?" + pramars;
				});
			}

			function judgeGrade(score) {
				if(score == 1) {
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
				} else if(score == 2) {
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'

				} else if(score == 3) {
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
				} else if(score == 4) {
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
				} else if(score == 5) {
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
					mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
				} else {
					alert("评分范围1~5")
				}
			}

			initDoctor();
		},
		error: function() {}
	});

	function initDoctor() {
		var parmas = {
			hospitalId: hospitalId,
			pageNo: pageNo,
			pageSize: pageSize,
			token: user.token
		}
		$.ajax({
			type: "get",
			data: parmas,
			url: config.appserver_url + "/myClinic/hospitalDoctor.json",
			dataType: "json",
			async: true,
			success: function(data) {
				//遍历诊所医护
				var healthUlList = $(".health-ul").html()
				for(var i = 0; i < data.data.length; i++) {
					healthUlList += '<li class="health-ul-li" onclick="doctorDetail(this)"><div class="recommendDoctor-list">';
					healthUlList += '<input type="hidden" value="' + data.data[i].id + '"/>';
					healthUlList += '<img class="health-ul-li-img" src="' + (data.data[i].avatar || defaultVar.onerrorImg) + '"/>';
					healthUlList += '<div class="health-ul-li-div"><span class="health-ul-li-name">' + data.data[i].realName + '</span></div></li>';
				}
				$(".health-ul").html(healthUlList);

			},
			error: function() {

			}
		})

	}

};

function doctorDetail(doctor) {
	var doctorId = $(doctor).find("input").val();
	sessionStorage.setItem("doctorId", doctorId);
	historyForward("../medic/medicIndex.html?doctorId=" + doctorId);
}

$(".return").on("click", function() {
	//	history.back(-1)
})

function initMyHospital() {
	//	   console.log(hospitalId)
	if(hospitalId) {
		user = JSON.parse(localStorage.getItem("user"));
		var param = {
			userId: user.userId,
			token: user.token
		}
		queryLast();
	} else {

		user = JSON.parse(localStorage.getItem("user"));
		var param = {
			userId: user.userId,
			token: user.token
		}
		$.ajax({
			type: "get",
			data: param,
			url: config.appserver_url + "/hosPa/queryLastUpdatehos.json",
			dataType: "json",
			async: true,
			success: function(data) {
				hospitalId = data.data.focusHospitalVo.hospitalId;
				queryLast();

			},

			error: function() {

			}
		})
	}
	$(".return > a").on("click", function() {
		historyBack();
	});
	//在线咨询
	$("#onLine-consult").on("click", function() {
		var pramas = "../myClinic/onlineSearch.html?hospitalId=" + hospitalId;
		historyForward(pramas);
	});
	//诊所介绍
	$(".model").eq(6).on("click", function() {
		var pramas = "hospitalId=" + hospitalId;
		location.href = "clinicIntroduction.html?" + pramas;
	})
	//预约上门
	$(".model").eq(2).on("click", function() {
		var pramas = "../medic/homecare.html?hospitalId=" + hospitalId;
		historyForward(pramas);
	});
	//专项服务
	$(".model").eq(3).on("click", function() {
		var pramas = "../medic/homecare.html?hospitalId=" + hospitalId + "&id1=Booking_to_shop";
		historyForward(pramas);
	});
	//送药到家
	$("#sendHome").on("click", function() {
		var pramas = "../myClinic/drugDelivery.html?hospitalId=" + hospitalId;
		historyForward(pramas);
	})
	// 健康产品
	$("#healthPro").on("click", function() {
		var pramas = '../myClinic/healthproject.html?hospitalId=' + hospitalId;
		historyForward(pramas);
	})
	//预约就诊
	$("#appointDoctor").on("click", function() {
		historyForward("../myClinic/clinicHealthCare.html?hospitalId=" + hospitalId);
	})

}

user = JSON.parse(localStorage.getItem("user"));
token = user.token;
latitude = sessionStorage.getItem("latitude");
longitude = sessionStorage.getItem("longitude");

// function goHealthproject() {
// 	window.location = "../medic/healthproject.html?hospitalId=" + hospitalId;
// }

function goonlineofficina() {
	window.location = "../medic/onlineofficina.html?hospitalId=" + hospitalId;
};

if(sessionStorage.getItem("historyArr")) {
	var curPage = ".." + location.href.slice(location.href.indexOf("views") + "views".length);
	var historyArr = sessionStorage.getItem("historyArr").split(",");
	if(curPage !== historyArr[historyArr.length - 1]) {
		historyArr.push(curPage);
	};

	sessionStorage.setItem("historyArr", historyArr);
};

function getLocalCity() {
	//定位坐标
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			latitude = r.point.lat;
			longitude = r.point.lng;
			sessionStorage.setItem("latitude", latitude);
			sessionStorage.setItem("longitude", longitude);

			//根据经纬度获取地址信息
			localCityCode = sessionStorage.getItem("localCityCode");
			localCityName = sessionStorage.getItem("localCityName");
			if(!Validator.validateNull(localCityCode) && !Validator.validateNull(localCityName)) {
				$(".indexMenuText").text(localCityName);

				initPages(); //初始化页面
				initClick(); //初始化点击事件
			} else {
				var url = "http://api.map.baidu.com/geocoder/v2/?ak=3kuyg6SrGTgmTe4ZAOYpKciZzEH9PArY&callback=renderReverse&output=json&location=" + latitude + "," + longitude
				$.ajax({
					type: "get",
					async: false,
					url: url,
					dataType: "jsonp",
					jsonp: "renderReverse", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
					jsonpCallback: "success_jsonpCallback" //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				});

			}
		} else {}
	}, {
		enableHighAccuracy: true
	});
}
