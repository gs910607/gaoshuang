//初始化参数
var user;
var token;
var userId;
var longitude;
var latitude;
var pageNo = 1;
var pageSize = 7;

//顶部下拉刷新代码
var pullTop = $("#pull-loading").height();

//function pullTopAll() {
//	slide(".container", pullTop, function(e) {
//
//		var that = this;
//		setTimeout(function() {
//			pageNo = 1;
//			$(".clickAllList").html("");
//			init();
//			that.back.call();
//		}, 2000);
//	});
//};

//pullTopAll();
getItem();
init();
initScrollBar();

// 初始化渲染
function init() {
	var params = {
		userId: userId,
		longitude: longitude,
		latitude: latitude,
		pageNo: pageNo,
		pageSize: pageSize,
		token: token
	};
	console.log(params)
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/hosPa/queryFocusHospital.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(data) {
			tokenLose(data.status);
			var clickAllList = $(".clickAllList").html();
			for(var i = 0; i < data.data.length; i++) {
				clickAllList += '<li class="cliniclist" data-hospitalId="' + data.data[i].hospitalId + '"><div class="cliniclist_picture">';
				clickAllList += '<img src="' + data.data[i].hosPic + '" alt="">';
//				clickAllList += '<div class="cliniclist_picture_text">';
//				clickAllList += '<span class="cliniclist_picture_text_span">' + data.data[i].hospitalTypeName + '</span></div>';
				clickAllList += '</div><div class="cliniclist_text">';
				clickAllList += '<h6 class="cliniclist_text_title">' + data.data[i].hospitalName + '</h6>';
				clickAllList += '<p class="cliniclist_text_address">' + data.data[i].address + '</p>';
				clickAllList += '<div class="cliniclist_text_prompt">';
				clickAllList += '<ul><li class="cliniclist_text_prompt_ul_li cliniclist_text_prompt_healthcare">';
				clickAllList += '<p class="cliniclist_text_prompt_healthcare_p">医护<span class="cliniclist_text_prompt_healthcare_p_span">' + data.data[i].docNum + '</span>人</p></li>';
				clickAllList += '<li class="cliniclist_text_prompt_ul_li cliniclist_text_prompt_reception">';
				clickAllList += '<p class="cliniclist_text_prompt_reception_p">接诊<span class="cliniclist_text_prompt_reception_p_span">' + data.data[i].orderNum + '</span>单</p></li>';
				clickAllList += '<li class="cliniclist_text_prompt_ul_li cliniclist_text_prompt_distance">';
				clickAllList += '<p class="cliniclist_text_prompt_distance_p">距我<span class="cliniclist_text_prompt_distance_p_span">' + data.data[i].distance + '</span>km</p></li>';
				clickAllList += '</ul></div></div></li>';
			}
			$(".clickAllList").html(clickAllList);

			$(".cliniclist").on("click", function() {
				var currentHospitalId = $(this).data("hospitalid");
				var pramra = "hospitalId=" + currentHospitalId
				historyForward("../myClinic/clinicIndex.html?default=default&" + pramra);
			})
		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		},
		beforeSend: function() {
			$(".noMore").hide();
			$(".ajaxLoading").show();
		},
		complete: function() {
			$(".noMore").show();
			$(".ajaxLoading").hide();
		}
		//
	})
}

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	longitude = sessionStorage.getItem("longitude");
	latitude = sessionStorage.getItem("latitude");
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
}
