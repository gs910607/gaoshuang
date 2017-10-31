var pageNo = 1;
var pageSize = 6;
var doctorId = 1;
var token = 1;
var cateName;
var cityCode = 315;
var id1 = 4;
var id2 = 0;

// 底部导航
$(document).on("click", ".online-footer:not(':last')", function() {
	$(this).addClass("footer-hover").siblings().removeClass("footer-hover");
	$(".articleList-li:first").addClass("picactive")
	$("#articleListAll").html($("#articleListAll li:first"));
	$(".titleContent-all").html("");
	id1 = $(this).data("id1");
	init(id1);
	init2(id1, id2);
});

$(document).on("click", ".articleList-li:first", function(){
	$(".titleContent-all").html("");
	init2(id1, id2);
});


init(id1);

// 顶部导航初始化渲染
function init(id1) {
	var params = {
		cityCode: cityCode,
		id: id1,
		token: token
	};

	$.ajax({
		type: 'GET',
		url: 'http://192.168.3.53:8080/api/serviceItem/queryServiceCategoryType.json',
		data: params,
		dataType: 'json',
		success: function(response) {
			tokenLose(response.status);
			// 二级菜单（左面）
			var arr = response.data;
			// console.log(arr)
			var params2;
			$("#articleListAll").html($("#articleListAll li:first"));
			var fr_list = '';
			fr_list = $("#articleListAll").html();
			var rightList = '';
			for(var i=0; i<arr.length; i++) {
				var obj = arr[i];
				fr_list += '<li class="articleList-li articleList-li-left" data-id1="'+ params.id +'" data-id2="'+ obj.id +'">';
				fr_list += '<div class="articleList-li-div">'+ obj.name +'</div>';
				fr_list += '</li>';
				$("#articleListAll").html(fr_list);
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});
};
// 顶部切换
$(document).on("click", ".articleList-li", function(){
	$(this).addClass("picactive").siblings().removeClass("picactive");
});

$(document).on("click", ".articleList-li:not(':first')", function() {
	var id1 = $(this).data("id1");
	var id2 = $(this).data("id2");
	$(".titleContent-all").html("");
	init2(id1, id2);
});

init2(id1, id2)
// 主体内容初始化渲染
function init2(id1, id2) {
	var params2 = {
		cityCode: cityCode,
		id1: id1,
		id2: id2,
		token: token
	};

	$.ajax({
		type: 'GET',
		url: 'http://192.168.3.53:8080/api/serviceItem/queryServiceItem.json',
		data: params2,
		dataType: 'json',
		success: function(response) {
			tokenLose(response.status)
			list3 = '';
			var list3 = $(".titleContent-all").html();
			var arr3 = response.data;
			for(var k=0; k<arr3.length; k++) {
				var obj1 = arr3[k].body;
				for(var j=0; j<obj1.length; j++) {
					var oBody = obj1[j];
					console.log(oBody)
					list3 += '<li class="titleContent-list" data-serviceid="'+ oBody.serviceId +'">';
					list3 += '<a href="../myClinic/testdetails.html">';
					list3 += '<img class="titleContent-list-img" src="'+ oBody.picUrl +'" />';
					list3 += '<div class="discountPrice">';
					list3 += '<span class="discountPrice-after">￥'+ oBody.price +'</span>';
					// list3 += '<span class="discountPrice-before-sans">(<span class="discountPrice-before">￥998</span>)</span>';
					list3 += '<span class="orderPeople">'+ oBody.useTimes +'预约</span>';
					list3 += '</div>';
					list3 += '<div class="discountTitle">'+ oBody.serviceName +'</div>';
					list3 += '<div class="discountItem">血脂检验,在线报告</div>';
					list3 += '</a>';
					list3 += '</li>';
				}
				$(".titleContent-all").html(list3);
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		},
		// beforeSend: function() {
		// 	$("#loading").show();
		// 	$("#nomore").hide();
		// },
		// complete: function() {
		// 	$("#loading").hide();
		// 	$("#nomore").show();
		// }
	})
}

//下拉分页加载更多
// var stop = true;
// $(window).scroll(function() {
// 	totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
// 	if($(document).height() <= totalheight) {
// 		if(stop == true) {
// 			stop = false;
// 			pageNo++;
// 			init()
// 			stop = true;
// 		}
// 	}
// });
