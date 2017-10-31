//初始化
var pageNo;
var pagesize;
var user;
var type;
var token;
var dataListLenght;
var userId;
var params = {
	type: "0"
}

$.ajax({
	type: "GET",
	data: params,
	url: config.appserver_url + "/article/queryArticleAdv.json",
	dataType: "JSON",
	async: false,
	success: function(data) {
		tokenLose(data.status)
		dataListLenght = data.data.length;
		var sliderList = $(".sliderCarousel").html();
		for(var i = 0; i < data.data.length; i++) {
			sliderList += '<li style="float: left; display: inline; width: 320px; height: 160px;"><a class="slider_a" href=' + data.data[i].linkUrl + ' target="_blank"><img src=' + data.data[i].imageUrl + '></a></li>';
		}
		$(".sliderCarousel").html(sliderList)

	},
	error: function() {
		alert("服务繁忙，请稍后再试！")
	}
});

//顶部下拉刷新代码
var pullTop = $("#pull-loading").height();

function pullTopAll() {
	slide(".container", pullTop, function(e) {
		var that = this;
		//如果少于6条不发送请求
		if(dataListLenght < 7) {

		} else {

			setTimeout(function() {
				initParams();
				that.back.call();
			}, 2000);

		}
	});
}
$(function() {
	initParams();
	initTitle();
	init();
	announcement()
	//  pullTopAll();
	initScrollBar()
});

function initParams() {
	pageNo = 1;
	pagesize = 7;
	type = -1;
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
	userId = user.userId;
}

function init() {
	var prams = {
		isCollect: "0", //0：查询所有文章跟类型的文章 1：查询我收藏的文章
		type: type,
		userId: userId,
		pageNo: pageNo,
		pageSize: pagesize,
		token: token
	};
	console.log(prams)
	//页面打开时候加载的接口 查询
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/article/queryArticle.json',
		data: prams,
		dataType: 'json',
		success: function(data) {
			          tokenLose(data.status)
			//遍历文章列表
			if(!Validator.validateNull(data.data)) {
				var articleList = $("#articleParticulars-ul").html();
				for(var i = 0; i < data.data.length; i++) {
					articleList += '<li class="articleParticulars-li" onclick="linkArticleDetail(this)">';
					articleList += '<input type="hidden" id="article_id" value=' + data.data[i].id + ' />';
					articleList += '<div class="articleParticulars-li-list clearfix">';
					articleList += '<img class="articleParticulars-img" src="' + data.data[i].picUrl + '" />';
					//测试图片
					//		articleList+='<img class="articleParticulars-img" src="http://n.sinaimg.cn/tech/transform/20170318/1K2A-fycnyhk8824096.jpg" />';
					articleList += '<div class="articleParticulars-title">';
					articleList += '<h4>' + data.data[i].title + '</h4>';
					if(!data.data[i].contentAbstract){}else{
					articleList += '<section>' + data.data[i].contentAbstract + '</section></div></div>';
					}
					articleList += '<div class="creatTime">';
					articleList += '<img class="publishTime" src="../../images/publishTime.png" />';

					articleList += '<span class="creatTime-span">' + format(data.data[i].updateTime) + '</span>';
					articleList += '<div class="admire"><img class="eye" src="../../images/eye.png" />';
					articleList += '<span class="examine">' + data.data[i].click + '</span>';
					appreciate(data.data[i].isFabulous, data.data[i].count);
					articleList += '</div></div></li>';
				}
				$("#articleParticulars-ul").html(articleList);

				function appreciate(isFabulous, count) {
					//点赞
					if(isFabulous == 0) {
						articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeNo.png" />';
						articleList += '<span class="appreciate appreciate-affirm">' + count + '</span></span>';
					} else {
						articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeYes.png" />';
						articleList += '<span class="appreciate appreciate-affirm" style="color: #EC9C00 !important;">' + count + '</span></span>';
					}
				}

				//遍历标题列表
				function add0(m) {
					return m < 10 ? '0' + m : m
				}

				function format(e) {
					//时间戳是整数，否则要parseInt转换
					var time = new Date(e);
					var y = time.getFullYear();
					var m = time.getMonth() + 1;
					var d = time.getDate();
					return y + '-' + add0(m) + '-' + add0(d);
				}
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		},
		beforeSend: function() {
			$("#loading").show();
			$("#nomore").hide();
		},
		complete: function() {
			$("#loading").hide();
			$("#nomore").show();
		}
	})

}

function initTitle() {
	var prams = {
		token: token
	};
	$.get(config.appserver_url + '/article/queryArticleType.json', prams, function(data) {
		console.log(data.data)
		//遍历标题列表
		if(!Validator.validateNull(data.data)) {
			var titleAllList = $(".articleList").html();
			for(var i = 0; i < data.data.length; i++) {
				titleAllList += '<li  class="articleList-li articleList-li-left">';
				titleAllList += '<div class="articleList-li-div">' + data.data[i].name;
				titleAllList += '<input type="hidden" value=' + data.data[i].code + '>';
				titleAllList += '</div></li>';
			}
			$(".articleList").html(titleAllList);

			titlePanel();
		}
	})
}

function titlePanel() {
	//标题栏点击更换
	$(".articleList-li-div").on("click", function() {
		$(".articleList-li-div").css({
			"color": "#333333",
			"border-bottom": "0 solid  #EC9B01"
		})
		$(this).css({
			"color": "#EC9B01",
			"border-bottom": ".2rem solid  #EC9B01"
		})
		$(".articleParticulars-li").remove();
		type = $(this).find("input:first").val();
		console.log(type);
		pageNo = 1;
		init()
	})
}

//下拉分页加载更多
//var stop = true;
//$(window).scroll(function () {
//  totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
//  if ($(document).height() <= totalheight) {
//      if (stop == true) {
//          stop = false;
//          pageNo++;
//          init();
//          stop = true;
//      }
//  }
//});

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
				if(dataListLenght < 7) {

				} else {
					init();
				}
				stop = true;
			}
			$("#bottom").show();
		}
	});
}


//渲染推荐文章
function announcement() {
	var prams = {
		userId:userId,
		token:token
	};
	console.log(prams)
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/article/queryArticlePush.json',
		data: prams,
		dataType: 'json',
		success: function(data) {
			console.log(222222)
			console.log(data)
			if(data.data ==null){
				$(".recommended-articles").hide();
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
		
	})

}


function linkArticleDetail(article) {
	var articleId = $(article).find("#article_id").val()
	historyForward("../healthPopularization/healthScience.html?articleId=" + articleId + "&userId=" + user.userId);
}