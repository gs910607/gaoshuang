var province;
var newCity;
var district;
var nearlyStreet;
//隐藏搜索栏
//$(".search").hide();

var headerHeight = $("header").height();
var searchHeight = $(".search").height();
var allHeight = $(window).height();
var MapHeight = allHeight - headerHeight - searchHeight - 13;
$("#l-map").height(MapHeight);

var sample_listHeight = $(".sample_list").height();
$("#l-map").height(MapHeight - sample_listHeight);
$(".seekAddress").css("display", "none")
var longitude = sessionStorage.getItem("local_longitude");
var latitude = sessionStorage.getItem("local_latitude");

var map = new BMap.Map("l-map");
var point = new BMap.Point(longitude, latitude);
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom();

//定位本地地址
function positionLocation() {
	var mOption = {
		poiRadius: 1000,
		numPois: 12
	}

	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			var myGeo = new BMap.Geocoder();
			myGeo.getLocation(r.point,
				function mCallback(rs) {
					var allAddress = rs.addressComponents;
					var allPois = rs.surroundingPois;
					var nearbyList = $(".sample_list_ul").html();
					nearbyList = '';
					for(var i = 0; i < 7; i++) {
						//						console.log(rs.addressComponents.district)
						nearbyList += '<li class="sample_list_li" >';
						nearbyList += '<div class="sample_list_li_div">';
						nearbyList += '<img class="sample_list_li_div_img" src="../../images/map_black.png" alt="">';
						nearbyList += '<h6 class="sample_list_li_div_h6" data-aaa=' + allPois[i].point.lat + '>' + allPois[i].title + '</h6>';
						nearbyList += '</div>';
						nearbyList += '<p class="sample_list_li_p">' + allPois[i].address + '</p>';
						nearbyList += '</li>';
					}
					$(".sample_list_ul").html(nearbyList);

					var sample_listHeight = $(".sample_list").height();
					$("#l-map").height(MapHeight - sample_listHeight);

					$(".sample_list_li").on("click", function() {
						var dataProvince = $(this).data("province");
						var dataCity = $(this).data("city");
						var particularAddress = $(this).children(".sample_list_li_p").text();
						var buildAddress = $(this).children().children(".sample_list_li_div_h6").text();
						var esParticularAddress = escape(particularAddress);
						if(dataProvince) {
							province = dataProvince;
							newCity = dataCity;
							// var prarams = "particularAddress=" + esParticularAddress + "&" + "province=" + escape(province) + "&" + "newCity=" + escape(newCity) + "&" + "district=&" + "buildAddress=" + escape(buildAddress) + "&" + "nearlyStreet=";
							removeItemAddress();
							sessionStorage.setItem("particularAddress", esParticularAddress);
							sessionStorage.setItem("province", escape(province));
							sessionStorage.setItem("newCity", escape(newCity));
							sessionStorage.setItem("buildAddress", escape(buildAddress));

							// window.location.href = "addoftenAddress.html?" + prarams;
							historyBack()
							// history.go(-1);
						} else {
							removeItemAddress();
							//							 var prarams = "particularAddress=" + esParticularAddress + "&" + "province=" + escape(province) + "&" + "newCity=" + escape(newCity) + "&" + "district=" + escape(district) + "&" + "buildAddress=" + escape(buildAddress) + "&" + "nearlyStreet=" + escape(nearlyStreet);
							sessionStorage.setItem("particularAddress", esParticularAddress);
							sessionStorage.setItem("province", escape(province));
							sessionStorage.setItem("newCity", escape(newCity));
							sessionStorage.setItem("district", escape(district));
							sessionStorage.setItem("buildAddress", escape(buildAddress));
							sessionStorage.setItem("nearlyStreet", escape(nearlyStreet));

							// window.location.href = "addoftenAddress.html?" + prarams;
							historyBack()
							// history.go(-1);

						}
					})
				}, mOption
			);
		} else {
			alert('failed' + this.getStatus());
		}
	}, {
		enableHighAccuracy: true
	})

}
positionLocation();

var mapCity = sessionStorage.getItem("mapCity");

// 百度地图API功能
//	function G(id) {
//		return document.getElementById(id);
//	}
//
//	var map = new BMap.Map("l-map");
//	map.centerAndZoom(mapCity,12);                   // 初始化地图,设置城市和地图级别。
//
//	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
//		{"input" : "suggestId"
//		,"location" : map
//	});
//
//	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
//	var str = "";
//		var _value = e.fromitem.value;
//		var value = "";
//		if (e.fromitem.index > -1) {
//			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
//		}    
//		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
//		
//		value = "";
//		if (e.toitem.index > -1) {
//			_value = e.toitem.value;
//			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
//		}    
//		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
////		G("searchResultPanel").innerHTML = str;
//	});
//
//	var myValue;
//	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
//	    var _value = e.item.value;
//		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
////		$(".search_button").on("click",function(){
//			setPlace();
////		})	
//	});
//
//	function setPlace(){
//		map.clearOverlays();    //清除地图上所有覆盖物
//		function myFun(){
//			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
//			console.log(pp)
//			map.centerAndZoom(pp, 18);
//			map.addOverlay(new BMap.Marker(pp));    //添加标注
//		}
//		var local = new BMap.LocalSearch(map, { //智能搜索
//		  onSearchComplete: myFun
//		  
//		});
//		local.search(myValue);
//	}

//skipUrl();
// function  skipUrl(){
//监听input事件
$('#suggestId').on('input propertychange', function() {

	var contentVal = $(this).val();
	if(!contentVal) {

		//如果输入框为空 重新定位该位置
		//	positionLocation();
	} else {

		var options = {
			onSearchComplete: function(results) {
				// 判断状态是否正确
				if(local.getStatus() == BMAP_STATUS_SUCCESS) {
					var s = [];
					for(var i = 0; i < results.getCurrentNumPois(); i++) {
						s.push(results.getPoi(i).title + ", " + results.getPoi(i).address + ", " + results.getPoi(i).province + ", " + results.getPoi(i).city);
						//					console.log(results.getPoi(i))
					}
					if(!s) {

					} else {

						var sampleList = $(".sample_list_ul").html();
						sampleList = "";
						for(var i = 0; i < 7; i++) {

							if(s[i]) {
								$(".sample_list").show();
								var addressTitle = s[i].split(',');

								sampleList += '<li class="sample_list_li"  data-province ="' + addressTitle[2] + '" data-city ="' + addressTitle[3] + '">';
								sampleList += '<div class="sample_list_li_div">';
								sampleList += '<img class="sample_list_li_div_img" src="../../images/map_black.png" alt="">';
								sampleList += '<h6 class="sample_list_li_div_h6">' + addressTitle[0] + '</h6>';
								sampleList += '</div>';
								sampleList += '<p class="sample_list_li_p">' + addressTitle[1] + '</p>';
								sampleList += '</li>';
							} else {
								$(".sample_list").hide();
								//								alert("未能搜出您所需要地址 请重输！")
							}
						}
						$(".sample_list_ul").html(sampleList);
						$(".sample_list_li").on("click", function() {
							var dataProvince = $(this).data("province");
							var dataCity = $(this).data("city");
							var particularAddress = $(this).children(".sample_list_li_p").text();
							var buildAddress = $(this).children().children(".sample_list_li_div_h6").text();
							var esParticularAddress = escape(particularAddress);
							if(dataProvince) {
								province = dataProvince;
								newCity = dataCity;
								//							var prarams = "particularAddress=" + esParticularAddress + "&" + "province=" + escape(province) + "&" + "newCity=" + escape(newCity) + "&" + "district=&" + "buildAddress=" + escape(buildAddress) + "&" + "nearlyStreet=";
								removeItemAddress();
								sessionStorage.setItem("particularAddress", esParticularAddress);
								sessionStorage.setItem("province", escape(province));
								sessionStorage.setItem("newCity", escape(newCity));
								sessionStorage.setItem("buildAddress", escape(buildAddress));

								//							window.location.href = "addoftenAddress.html?" + prarams;

								historyBack();
							} else {
								removeItemAddress();
								//							var prarams = "particularAddress=" + esParticularAddress + "&" + "province=" + escape(province) + "&" + "newCity=" + escape(newCity) + "&" + "district=" + escape(district) + "&" + "buildAddress=" + escape(buildAddress) + "&" + "nearlyStreet=" + escape(nearlyStreet);
								sessionStorage.setItem("particularAddress", esParticularAddress);
								sessionStorage.setItem("province", escape(province));
								sessionStorage.setItem("newCity", escape(newCity));
								sessionStorage.setItem("district", escape(district));
								sessionStorage.setItem("buildAddress", escape(buildAddress));
								sessionStorage.setItem("nearlyStreet", escape(nearlyStreet));

								//							window.location.href = "addoftenAddress.html?" + prarams;

								historyBack();

							}
						})
					}
				} else {

				}
			}
		};
		var local = new BMap.LocalSearch(map, options);
		local.search(contentVal);
	}
});

$(".search_button").on("click", function() {
	$("#suggestId").val("");
})

//获取地理信息“省-市-区”
var longitude = sessionStorage.getItem("longitude");
var latitude = sessionStorage.getItem("latitude");
var url = "http://api.map.baidu.com/geocoder/v2/?ak=3kuyg6SrGTgmTe4ZAOYpKciZzEH9PArY&callback=renderReverse&output=json&location=" + latitude + "," + longitude
$.ajax({
	type: "get",
	async: false,
	url: url,
	dataType: "jsonp",
	jsonp: "renderReverse", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
	jsonpCallback: "success_jsonpCallback" //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
});

var renderReverse = function(data) {
	province = data.result.addressComponent.province;
	newCity = data.result.addressComponent.city;
	district = data.result.addressComponent.district;
	nearlyStreet = data.result.addressComponent.street;
	//	$(".sample_list_li").on("click", function() {
	//		var dataProvince = $(this).data("province");
	//		var dataCity = $(this).data("city");
	//		var particularAddress = $(this).children(".sample_list_li_p").text();
	//      var buildAddress = $(this).children().children(".sample_list_li_div_h6").text();
	//		var esParticularAddress = escape(particularAddress);
	//		if(dataProvince){
	//			province = dataProvince;
	//			newCity = dataCity;
	//			var prarams = "particularAddress=" + esParticularAddress + "&" + "province=" + escape(province) + "&" + "newCity=" + escape(newCity) + "&" + "district=&" + "buildAddress=" + escape(buildAddress) + "&" + "nearlyStreet=";
	//			// sessionStorage.setItem("particularAddress", esParticularAddress);
	//			// sessionStorage.setItem("province", escape(province));
	//			// sessionStorage.setItem("newCity", escape(newCity));
	//			// sessionStorage.setItem("buildAddress", escape(buildAddress));
	//
	//			window.location.href = "addoftenAddress.html?" + prarams;
	//
	//			// history.go(-1);
	//		}else{
	//
	//			var prarams = "particularAddress=" + esParticularAddress + "&" + "province=" + escape(province) + "&" + "newCity=" + escape(newCity) + "&" + "district=" + escape(district)+ "&" + "buildAddress=" + escape(buildAddress) + "&" + "nearlyStreet=" + escape(nearlyStreet);
	//		
	//			sessionStorage.setItem("particularAddress", esParticularAddress);
	//			sessionStorage.setItem("province", escape(province));
	//			sessionStorage.setItem("newCity", escape(newCity));
	//			sessionStorage.setItem("district", escape(district));
	//			sessionStorage.setItem("buildAddress", escape(buildAddress));
	//			sessionStorage.setItem("nearlyStreet", escape(nearlyStreet));
	//
	//			window.location.href = "addoftenAddress.html?" + prarams;
	//
	//			// history.go(-1);
	//
	//     }
	//	})
}

//}

// 添加带有定位的导航控件
var navigationControl = new BMap.NavigationControl({
	// 靠右下角位置
	anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
	// LARGE类型
	type: BMAP_NAVIGATION_CONTROL_LARGE,
	// 启用显示定位
	enableGeolocation: true
});
map.addControl(navigationControl);
// 添加定位控件
var geolocationControl = new BMap.GeolocationControl();
geolocationControl.addEventListener("locationSuccess", function(e) {
	// 定位成功事件
	var address = '';
	address += e.addressComponent.province;
	address += e.addressComponent.city;
	address += e.addressComponent.district;
	address += e.addressComponent.street;
	address += e.addressComponent.streetNumber;
	alert("当前定位地址为：" + address);
});
geolocationControl.addEventListener("locationError", function(e) {
	// 定位失败事件
	alert(e.message);
});
map.addControl(geolocationControl);

//清楚上一次的地址
function removeItemAddress() {
	sessionStorage.removeItem("particularAddress")
	sessionStorage.removeItem("province")
	sessionStorage.removeItem("newCity")
	sessionStorage.removeItem("district")
	sessionStorage.removeItem("buildAddress")
	sessionStorage.removeItem("nearlyStreet")
};

$("header > a").on("click", function() {
	historyBack();
})