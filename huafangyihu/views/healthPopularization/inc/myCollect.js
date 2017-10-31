//	   //点赞
//  $(".recognition-affirm").on("click",function(){ 	
//		$(this).css("display","none")
//		$(this).next().css("display","block")	
//		isFabulou = "0";
//  })
//  //取消点赞
//	$(".recognition-cancel").on("click",function(){
//		$(this).css("display","none")
//  	$(this).prev().css("display","block")
//  	isFabulou = "1";
//  })
//	

//初始化
var pageNo;
var pageSize;
var user;
$(function() {
    initParams();
	init();
	
});

function initParams(){
    pageNo = 1;
    pageSize = 10;
    user = JSON.parse(localStorage.getItem("user"));

}

function init() {
    var prams = {
        isCollect : "1",//0：查询所有文章跟类型的文章 1：查询我收藏的文章
        userId: user.userId,
        pageNo: pageNo,
        pageSize: pageSize,
        token: user.token
    };
	console.log(prams)
	//页面打开时候加载的接口 查询
	$.ajax({
		type: 'GET',
		url: config.appserver_url+'/article/queryArticle.json',
		data: prams,
		dataType: 'json',
		success: function(data) {
			console.log(data)
            if(!Validator.validateNull(data.data)){
                var articleContent = data.data;

                //遍历文章列表
                var articleList = $("#articleParticulars-ul").html();
                for(var i = 0; i < articleContent.length; i++) {
                    articleList += '<a href="healthScience.html?articleId='+articleContent[i].id+'&userId='+user.userId+'" style="text-decoration: none; color: #000000;"><li class="articleParticulars-li">';
                    articleList += '<div class="articleParticulars-li-list clearfix">';
                    articleList += '<img class="articleParticulars-img" src="' + articleContent[i].picUrl + '" />';
                    //测试图片
                    //		articleList+='<img class="articleParticulars-img" src="http://n.sinaimg.cn/tech/transform/20170318/1K2A-fycnyhk8824096.jpg" />';
                    articleList += '<div class="articleParticulars-title">';
                    articleList += '<h4>' + articleContent[i].title + '</h4>';
                    articleList += '<section>' + articleContent[i].contentAbstract + '</section></div></div>';
                    articleList += '<div class="creatTime">';
                    articleList += '<img class="publishTime" src="../../images/publishTime.png" />';

                    articleList += '<span class="creatTime-span">' + format(articleContent[i].updateTime) + '</span>';
                    articleList += '<div class="admire"><img class="eye" src="../../images/eye.png" />';
                    articleList += '<span class="examine">' + articleContent[i].click + '</span>';
                    appreciate(articleContent[i].isFabulous , articleContent[i].count);

                    articleList += '</div></div></li></a>';
                }
                $("#articleParticulars-ul").html(articleList);

                function appreciate(isFabulous , count) {
                    //点赞
                    if(isFabulous == 0) {
                        articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeNo.png" />';
                        articleList += '<span class="appreciate appreciate-affirm">' + count + '</span></span>';
                    } else {
                        articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeYes.png" />';
                        articleList += '<span class="appreciate appreciate-affirm" style="color: #EC9C00 !important;">' + count + '</span></span>';
                    }
                }

                function add0(m) { return m < 10 ? '0' + m : m }

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
			alert("服务繁忙，请稍后再试！")
		}
	})
}

//下拉分页加载更多
var stop = true;
$(window).scroll(function() {
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if($(document).height() <= totalheight) {
        if(stop == true) {
            stop = false;
            pageNo++;
            init()
            stop = true;
        }
    }
});
