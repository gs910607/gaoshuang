// $(function(){

var cityCode;
var token;
var id1;
var id2;
var hospitalId;


viewTabs();
getItems();

$(window).resize(function() {
	viewTabs();
});
function viewTabs() {
	var relaWrapW = $(".relaWrap").width();
	$(".moveEach").width(relaWrapW);
	$(".absoWrap").width(relaWrapW * 2);
};
// 底部切换
$(document).on("click", ".online-footer:not(':last')", function() {
	$(this).addClass("footer-hover").siblings().removeClass("footer-hover");
	// $("#fr_list, #articleListAll").html($("#fr_list li:first"));
	$(".fr_rightPos").html("");
	$("#titleContentAll").html("");
	id1 = $(this).data("id");
	init3(id1, 0)
})
// 左侧初始化渲染
// function init(id1) {
// 	var params = {
// 		cityCode: cityCode,
// 		id: id1,
// 		token: token
// 	};
// 	$("#"+id1).addClass("footer-hover")
//
// 	$.ajax({
// 		type: 'GET',
// 		url: config.appserver_url + '/serviceItem/queryServiceCategoryType.json',
// 		data: params,
// 		dataType: 'json',
// 		success: function(response) {
// 			tokenLose(response.status)
// 			// 二级菜单（左面）
// 			var arr = response.data;
// 			var params2;
// 			$("#fr_list").html($("#fr_list li:first"));
// 			var fr_list = $("#fr_list").html();
// 			var rightList = '';
//
// 			for(var i=0; i<arr.length; i++) {
// 				var obj = arr[i];
// 				fr_list += '<li data-id1="'+ params.id +'" data-id2="'+ obj.id +'">';
// 				fr_list += '<a href="javascript:;">';
// 				fr_list += '<div class="iconbox"><img class="icon1" src="'+ obj.picUrl +'" alt=""></div>';
// 				fr_list += '<div class="icondes">'+ obj.name +'</div>';
// 				fr_list += '</a>';
// 				fr_list += '</li>';
// 				$("#fr_list").html(fr_list);
// 			}
//
// 		},
// 		error: function() {
// 			alert("服务繁忙，请稍后再试！");
// 		}
// 	});
// };

hospitalId = GetQueryStr("hospitalId")
// 左侧初始化渲染
function init3(id1,id2) {
	var params = {
		cityCode: cityCode,
		id: id1,
		hospitalId:hospitalId,
		token: token
	};
	console.log(params);
	$("#"+id1).addClass("footer-hover");

    this.id1=id1;
    this.id2=id2;
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/serviceItem/queryServiceCategoryType.json',
		data: params,
		dataType: 'json',
		success: function(response) {
			console.log(response)
			// 二级菜单（左面）
			var arr = response.data;
			// console.log(arr)
			// var params2;
			// $("#fr_list").html($("#fr_list li:first"));
			// var fr_list = $("#fr_list").html();
			var fr_list = '';
			fr_list += '<li data-id1="'+ id1 +'" data-id2="0">';
			fr_list += '	<a href="javascript:;">';
			fr_list += '		<div class="iconbox"><img class="icon1" src="../../images/l-icon-1.png" alt=""></div>';
			fr_list += '		<div class="icondes">全部预约</div>';
			fr_list += '	</a>';
			fr_list += '</li>';
			for(var i=0; i<arr.length; i++) {
				var obj = arr[i];
				fr_list += '<li data-id1="'+ id1 +'" data-id2="'+ obj.id +'">';

                 if(obj.id==id2){
					 fr_list += '<a class=\"picactive\" href=\"javascript:;\">';
				 }
				 else{
					 fr_list += '<a  href=\"javascript:;\">';
				 }
				fr_list += '<div class="iconbox"><img class="icon1" src="'+ obj.picUrl +'" alt=""></div>';
				fr_list += '<div class="icondes">'+ obj.name +'</div>';
				fr_list += '</a>';
				fr_list += '</li>';
				$("#fr_list").html(fr_list);
				$("#articleListAll").html(fr_list);
			}

			init2(id1, id2);

			$("li[data-id2="+ id2 +"]").find("a").addClass("picactive");
			// 侧边切换
			$(document).on("click", "#fr_list > li > a, #articleListAll > li > a", function(){
				id1 = $(this).parent().data("id1");
				id2 = $(this).parent().data("id2");
				// $(this).addClass("picactive").parent().siblings().find("a").removeClass("picactive");
				$("li[data-id2="+ id2 +"]").find("a").addClass("picactive").parent().siblings().find("a").removeClass("picactive");

				$(".fr_rightPos").html("");
				$("#titleContentAll").html("");
				init2(id1, id2);
			});
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});
};

// 右侧初始化渲染
function init2(id1, id2) {
	var params2 = {
		hospitalId:hospitalId,
		cityCode: cityCode,
		id1: id1,
		id2: id2,
		token: token
	};
console.log(params2)
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/serviceItem/queryServiceItem.json',
		data: params2,
		dataType: 'json',
		success: function(response) {
			console.log(response)
			tokenLose(response.status)
			var list3 = "";
			var arr3 = response.data;
			for(var k=0; k<arr3.length; k++) {
				var obj1 = arr3[k];
				var arrHeads = obj1.head.split('-');
				list3 += '<div class="fr_ecovery">'
				if(arrHeads.length==1){
					list3 += '<h3><span>'+ arrHeads[0] +'</span></h3>';
				}else{
				list3 += '<h3><span>'+ arrHeads[0] +'</span> - '+ arrHeads[1] +'</h3>';
				}
				list3 += '<div class="fr_ecoverylist">';
				list3 += '<ul class="clearfix">'
				var obj2 = obj1.body;
				for(var j=0; j<obj2.length; j++) {
					var oBody = obj2[j]
					list3 += '<li data-serviceid="'+ oBody.serviceId +'">';
					list3 += '<a href="javascript:;">';
					list3 += '<div class="r_list_head">';
					list3 += '<span><img src="'+ oBody.picUrl +'" alt=""></span>';
					list3 += '</div>';
					list3 += '<div class="r_list_des">';
					list3 += '<p class="defaulticon">'+ oBody.serviceName +'</p>';
					list3 += '<p class="reserveper"><span>'+ oBody.useTimes +'</span>人预约</p>';
					list3 += '<p class="price">';
					list3 += '<span class="now"><span class="nowprice"><span class="symbol">￥</span>'+ oBody.price +'</span><span class="yuanTime">元/次</span></span><span class="old"></span>';
					list3 += '<div class="discountItem">血脂检验,在线报告</div>';
					list3 += '</p>';
					list3 += '</div>';
					list3 += '</a>';
					list3 += '</li>';
				}
				list3 += '</ul>';
				list3 += '</div>';
				list3 += '</div>';
				$(".fr_rightPos").html(list3);
				$("#titleContentAll").html(list3);

				$(document).on("click", ".fr_ecoverylist ul > li", function() {
					var hrefTo;
					var serviceId = $(this).data("serviceid");
					switch (id1) {
						case 'Home_service_class':
							hrefTo = '../myClinic/doordetails.html';
							break;
						case 'Booking_to_shop':
							hrefTo = '../myClinic/shopdetails.html';
							break;
					};
					var hospitalId = GetQueryStr("hospitalId");
					if(hospitalId){
						nextPage = hrefTo +'?serviceid='+ serviceId +'&id1='+ id1+'&hospitalId='+ hospitalId;
					}else{
						nextPage = hrefTo +'?serviceid='+ serviceId +'&id1='+ id1;
					}
					
					historyForward(nextPage);
				});
			}
		}
	})
};

// 获取本地数据
function getItems() {
	token = JSON.parse(localStorage.getItem("user")).token;
	cityCode = JSON.parse(sessionStorage.getItem("localCityInfo")).localCityCode;
};


$(document).on("click", "#share", function() {
	if($(".absoWrap").css("left") == "0px") {
		$(".absoWrap").css("left", "-100%");
	}else{
		$(".absoWrap").css("left", "0");
	};
})
