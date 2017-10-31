WindowsWidth = $(window).width();
WindowsHeight = $(window).height();
$(".allBoforeSend").height(WindowsHeight);
$(".allBoforeSend").width(WindowsWidth);

//var loadingLeft = (WindowsWidth - 30) / 2
//$(".loading").css({
//	"left": loadingLeft/2,
//	"top": "20%"
//})
$(".allBoforeSend").height(WindowsHeight)
$("body").css("overflow", "hidden");

var type;
var token;
var userId;
var openId;
var localCityName;
var localCityCode;
var longitude;
var latitude;
var id;
var doctorId;
var hospitalId;
//同步加载
var params = {
	type: "2" //首页轮播图
}
$.ajax({
	type: "get",
	data: params,
	url: config.appserver_url + "/article/queryArticleAdv.json",
	dataType: "json",
	async: false,
	success: function(data) {
		if(data.status == 2) {
			location.href = '../login/login.html';
		}
		tokenLose(data.status)
		var sliderList = $(".sliderCarousel").html()
		for(var i = 0; i < data.data.length; i++) {
			sliderList += '<li style="float: left; display: inline; width: 320px; height: 160px;"><a class="slider_a" href=' + data.data[i].linkUrl + ' target="_blank"><img src=' + data.data[i].imageUrl + '></a></li>';
		}
		$(".sliderCarousel").html(sliderList)
	}
});

$(function() {
	initParams();
	getLocalCity(); //定位城市
});

function getLocalCity() {
	//如果没有选择城市 自动定位
	//localCityCode = sessionStorage.getItem("localCityCode");
	//localCityName = sessionStorage.getItem("localCityName");
	//if (!Validator.validateNull(localCityCode) && !Validator.validateNull(localCityName)) {
	//    $(".indexMenuText").text(localCityName);
	//} else {
	//    var localCity = new BMap.LocalCity();
	//    localCity.get(myCity);
	//    function myCity(result) {
	//        localCityName = result.name;
	//        localCityCode = result.code;
	//        $(".indexMenuText").text(result.name);
	//    }
	//}
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

var renderReverse = function(data) {
	localCityName = data.result.addressComponent.city;
	localCityCode = data.result.cityCode;
	$(".indexMenuText").text(data.result.addressComponent.city);
	initPages(); //初始化页面
	initClick(); //初始化点击事件
}

function initParams() {
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
	userId = user.userId;
	openId = user.openId;
	console.log(openId)
	sessionStorage.setItem("openId",openId)
}

function initPages() {
	var params = {
		longitude: longitude,
		latitude: latitude,
		token: token,
		userId: userId
	}
	console.log(params)
	//主页推荐医院（我的诊所）

	$.ajax({
		type: "get",
		data: params,
		url: config.appserver_url + "/hosPa/queryLastUpdatehos.json",
		dataType: "json",
		async: true,
		success: function(data) {
			console.log(data)
			if(data.status == 2) {
				location.href = "../login/login.html";
			}
			tokenLose(data.status);
			var mapCity = $(".indexMenuText").text();
			sessionStorage.setItem("mapCity", mapCity);
			sessionStorage.removeItem("hospitalId");
			if(data.data) {
//				console.log(data.data[0].focusHospitalVo.distance)
				hospitalId = data.data[0].focusHospitalVo.hospitalId;
				sessionStorage.setItem("hospitalId", hospitalId);
				var dataList = $("#attentionC-info").html();
				for(var i = 0; i < data.data.length; i++) {
					 dataList += '<div class="recommendList" data-hospitalId="' + data.data[i].focusHospitalVo.hospitalId + '">';
					// dataList += '<div class="recommend"><img src="../../images/recommend.png" class="img-responsive"></div>';
					dataList += '<a href="javascript:;" class="sec-info-link">';
					dataList += '<div class="sec-info-wrapper">';
					dataList += '<div class="sec-info-shop">';
					dataList += '<img id="recommendHospital-img" src="' + data.data[i].focusHospitalVo.hosPic + '" class="img-responsive data-picUrl">';
					dataList += '</div>';
					dataList += '<div class="sec-info-company">';
					if(data.data[i].focusHospitalVo.distance ==null ||data.data[i].focusHospitalVo.distance =="10000000"){
						console.log(data.data[i].focusHospitalVo.distance)
						dataList += '<div class="distance"></div>';
					}else{
					dataList += '<div class="distance">'+data.data[i].focusHospitalVo.distance+'km</div>';
					}
					dataList += '<div class="company-title data-name">' + data.data[i].focusHospitalVo.hospitalName + '</div>';
					dataList += '<div id="hospitalGoal" class="star-point">';
					judgeGrade(data.data[i].focusHospitalVo.score)
					dataList += '<span class="score data-evaluationScore">' + (data.data[i].focusHospitalVo.score ? data.data[i].focusHospitalVo.score : '0') + '分</span></div>';
					dataList += '<div class="address data-address">' + data.data[i].focusHospitalVo.address + '</div>';
					dataList += '</div>';
					dataList += '</div>';
//					dataList += '<div class="blood-service">';
//					if(data.data[i].serviceItem) {
//						dataList += '<div class="blood-service-title">' + data.data[i].serviceItem.itemName + '</div>';
//                     if(data.data[i].hospitalServiceItem){
//						dataList += '<div class="blood-service-price"><span class="nowPrice"><span class="data-rate">' + data.data[i].hospitalServiceItem.rate + '</span>元/次</span>';
//						dataList += '<span class="purchase"> (原价<span class="data-oldRete">' + data.data[i].hospitalServiceItem.oldRete + '</span>元) </span>';
//						}
//						dataList += '</div>';
//					}
//					dataList += '</div>';
					dataList += '</a>';
					dataList += '</div>';
				}

				$("#attentionC-info").html(dataList);

				function judgeGrade(e) {
					if(e < 0.5) {
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 1) {
						dataList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 1.5) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 2) {

						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 2.5) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 3) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 3.5) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 4) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 4.5) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 5) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
					} else if(e == 5) {
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
					} else {
						//alert("综合评分返回0~5")
					}
					return;
				}
				//点击关注的诊所
				$(".recommendList").on("click", function() {
					var hospitalId = $(this).data("hospitalid")
					var parameter = "default=" + "default" + "&hospitalId=" + hospitalId;
					historyForward("../myClinic/clinicIndex.html?" + parameter);
				})
				//					hospitalId = data.data.focusHospitalVo.hospitalId;
				//					sessionStorage.setItem("hospitalId", hospitalId);
				//					$("#attentionC-info").css("display", "block")
				//					$("#recommendHospital-img").attr("src", data.data.focusHospitalVo.hosPic)
				//					$(".distance").html(data.data.focusHospitalVo.distance ? ' 距我<span id="distance-mine" class="data-distance">' + data.data.focusHospitalVo.distance +'</span>km' : '')
				//					$(".data-name").text(data.data.focusHospitalVo.hospitalName)
				//					$(".data-address").text(data.data.focusHospitalVo.address)
				//					if(!Validator.validateNull(data.data.serviceItem) && !Validator.validateNull(data.data.hospitalServiceItem)) {
				//						$(".blood-service-title").text(data.data.serviceItem.itemName)
				//						$(".data-oldRete").text(data.data.hospitalServiceItem.oldRete)
				//						$(".data-rate").text(data.data.hospitalServiceItem.rate)
				//					} else {
				//	//					$(".blood-service").css("display", "block");
				//					}
				//					var evaluationScore = data.data.focusHospitalVo.score ? data.data.focusHospitalVo.score + "分" : "0";
				//					$(".data-evaluationScore").text(evaluationScore)
				//					calculateScore(data.data.focusHospitalVo.score, $("#hospitalGoal"), 5)

			} else {
				$("#attentionC-info").css("display", "none")
				$("#attentionClinic").css("display", "block")
			}
		},
		error: function() {
			$("#attentionC-info").css("display", "none")
			$("#attentionClinic").css("display", "block")
		}
	})
	//医生推荐
	var params = {
		token: token,
		userId: userId
	}
	$.ajax({
		type: "get",
		data: params,
		url: config.appserver_url + "/docPa/queryLastUpdateDoc.json",
		dataType: "json",
		async: true,
		success: function(data) {
			if(!Validator.validateNull(data.data)) {

				//						<div class="recommend-doc"><img src="../../images/recommend.png" class="img-responsive"></div>
				//						<a href="javascript:;" class="sec-info-link">
				//							<div class="sec-info">
				//
				//								<div class="sec-info-wrapper">
				//									<div class="sec-info-avatar"><img id="doctorHead-photo" src="../../images/avatar.png" class="img-responsive"></div>
				//									<div class="sec-info-company_bot">
				//										<div class="star-point star-point2" id="doctorScore">
				//											<i class="star2"><img src="../../images/star2.png"/></i>
				//											<i class="star2"><img src="../../images/star2.png"/></i>
				//											<i class="star2"><img src="../../images/star2.png"/></i>
				//											<i class="star2"><img src="../../images/star2.png"/></i>
				//											<i class="star2"><img src="../../images/star2.png"/></i>
				//											<span class="score"><span class="data-evaluationScore2"></span>分</span>
				//										</div>
				//										<div class="company-title data-userId"></div>
				//										<div class="doctor-info"><span class="data-title"></span><span>&#x3000;</span><span class="data-ke"></span></div>
				//										<div class="goodAt data-diseaseLabel">
				//										</div>
				//									</div>
				//								</div>
				//							</div>
				//						</a>

				var dataList = $("#recommend-doctor").html();
				for(var i = 0; i < data.data.length; i++) {
					dataList += '<div class="docList" data-id="'+data.data[i].id+'">';
					// dataList += '<div class="recommend-doc"><img src="../../images/recommend.png" class="img-responsive"></div>';
					dataList += '<a href="javascript:;" class="sec-info-link">';
					dataList += '<div class="sec-info">';
					dataList += '<div class="sec-info-wrapper">';
					dataList += '<div class="sec-info-avatar"><img id="doctorHead-photo" src="' + (data.data[i].avatar || defaultVar.onerrorImg) + '" class="img-responsive"></div>';
					dataList += '<div class="sec-info-company_bot">';
					dataList += '<div class="star-point star-point2" id="doctorScore">';
					judgeGrade1(data.data[i].score);
					console.log(data.data[i].score)
					dataList += '<span class="score"><span class="data-evaluationScore2">' + data.data[i].score + '</span>分</span>';
					dataList += '</div>';
					dataList += '<div class="company-title data-userId">' + data.data[i].realName + '</div>';
					dataList += '<div class="doctor-info"><span class="data-title"></span>' + data.data[i].title + '<span>&#x3000;</span>' + data.data[i].hdtName + '<span class="data-ke"></span></div>';
					dataList += '<div class="goodAt data-diseaseLabel">擅长：' + data.data[i].diseaseLabel + '';
					dataList += '</div></div></div></div>';
					dataList += '</a>';
					dataList += '</div>';
				}
				$("#recommend-doctor").html(dataList);


	//跳转我的医护
	$(".docList").on('click', function() {
		doctorId =$(this).data("id");
		// sessionStorage.setItem("doctorId",doctorId);
		historyForward("../medic/medicIndex.html?doctorId="+ doctorId);

	});
				function judgeGrade1(e) {
					if(e < 0.5) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 1) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 1.5) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 2) {

						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 2.5) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 3) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 3.5) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 4) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 4.5) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 5) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
					} else if(e == 5) {
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
						dataList += '<i class="star2"><img class="clinic-img"  src="../../images/star.png"/></i>';
					} else {
						//alert("综合评分返回0~5")
					}
					return;
				}



			} else {

								$("#recommend-doctor").css("display", "none");
								$("#attentionDoctor").css("display", "block");
			}

		},
		error: function() {
						$("#recommend-doctor").css("display", "none");
						$("#attentionDoctor").css("display", "block");

		},
		boforeSend: function() {},
		complete: function() {
			$(".concealData").css("display", "none");
			$("body").css("overflow", "auto")

		}
	})

	//附近诊所
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/hospital/getHospitalPageByVo.json',
		data: {
			deptCode: '',
			code: '',
			pageNo: 1,
			pageSize: 3,
			longitude: longitude,
			latitude: latitude,
			orderParam: 1,
			token: token
		},
		dataType: 'json',
		contentType: 'application/json',
		success: function(response) {
			console.log(response);
			tokenLose(response.status);
			if(response.data) {
				var nearbyArr = response.data;
				var nearbyList = '';
				for(var i = 0; i < nearbyArr.length; i++) {
					nearbyList += '<div class="recommendList" data-hospitalid="' + nearbyArr[i].id + '">';
					// nearbyList += '<div class="recommend"><img src="../../images/recommend.png" class="img-responsive"></div>';
					nearbyList += '<a href="javascript:;" class="sec-info-link">';
					nearbyList += '<div class="sec-info-wrapper">';
					nearbyList += '<div class="sec-info-shop">';
					nearbyList += '<img id="recommendHospital-img" src="' + nearbyArr[i].picUrl + '" class="img-responsive data-picUrl">';
					nearbyList += '</div>';
					nearbyList += '<div class="sec-info-company">';
					if(nearbyArr[i].distance == null || nearbyArr[i].distance =="10000000"){
						nearbyList += '<div class="distance"></div>';
					}else{
					nearbyList += '<div class="distance">'+ nearbyArr[i].distance +'km</div>';
					}
					nearbyList += '<div class="company-title data-name">' + nearbyArr[i].name + '</div>';
					nearbyList += '<div id="hospitalGoal" class="star-point">';
					judgeGrade(nearbyArr[i].evaluationScore)
					nearbyList += '<span class="score data-evaluationScore">' + (nearbyArr[i].evaluationScore  ? nearbyArr[i].evaluationScore : '0') + '分</span></div>';
					nearbyList += '<div class="address data-address">' + nearbyArr[i].address + '</div>';
					nearbyList += '</div>';
					nearbyList += '</div>';
					nearbyList += '</a>';
					nearbyList += '</div>';
				}

				$("#nearbyClinic_info").html(nearbyList);

				function judgeGrade(e) {
					if(e < 0.5) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 1) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 1.5) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 2) {

						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 2.5) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 3) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 3.5) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 4) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 4.5) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star2.png"/></i>';
					} else if(e < 5) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/bigStar.png"/></i>';
					} else if(e == 5) {
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
						nearbyList += '<i><img class="clinic-img"  src="../../images/star.png"/></i>';
					} else {
						//alert("综合评分返回0~5")
					}
					return;
				}
				//点击附近的诊所
				$(".recommendList").on("click", function() {
					var hospitalId = $(this).data("hospitalid")
					var parameter = "default=" + "default" + "&hospitalId=" + hospitalId;
					historyForward("../myClinic/clinicIndex.html?" + parameter);
				})

			} else {
				$("#nearbyClinic_none").css("display", "none")
				$("#nearbyClinic_info").css("display", "block")
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		}
	})
};

function initClick() {
	var params = {
		longitude: longitude,
		latitude: latitude,
		localCityCode: localCityCode,
		localCityName: localCityName
	}
	var paramsJson = JSON.stringify(params);
	sessionStorage.setItem("localCityInfo", paramsJson);
	//跳转到选择城市
	$(".indexMenu").on("click", function() {
		var currentCity = $(".indexMenuText").text();
		var parameter = "currentCity=" + escape(currentCity);
		window.location.href = "selectCity.html?" + parameter;
	})
	//跳转到机构
	$("#organization").on("click", function() {

		window.location.href = "../organization/organization.html";
	});

	$(document).ready($("#secs-find-bg").on("click", function() {
		myfun();
	}));

	$(document).on("click", function() {

		var params = {
			longitude: longitude,
			latitude: latitude,
			localCityCode: localCityCode,
			localCityName: localCityName
		}
		var paramsJson = JSON.stringify(params);
		sessionStorage.setItem("localCityInfo", paramsJson);
	});

};

if(sessionStorage.getItem("historyArr")) {
	var curPage = ".." + location.href.slice(location.href.indexOf("views")+"views".length);
	var historyArr = sessionStorage.getItem("historyArr").split(",");
	if(curPage !== historyArr[historyArr.length-1]) {
		historyArr.push(curPage);
	};

	sessionStorage.setItem("historyArr", historyArr);
};

// 是否拨打电话弹窗
$("#service_phone").on("click", function() {
	$("#model_phone").show();
});
$(".phone_btn").on("click", function() {
	$("#model_phone").hide();
})
