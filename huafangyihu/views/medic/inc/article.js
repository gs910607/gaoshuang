//初始化
var pageNo;
var pageSize;
var user;
var doctorId;
var titleKey;
$(function () {
    initParams();
    initPages(titleKey);
});

function initParams() {
    user = JSON.parse(localStorage.getItem("user"));
    // doctorId = sessionStorage.getItem("doctorId");
    doctorId = GetQueryStr("doctorId");
    pageNo = 1;
    pageSize = 7;
    titleKey = -1;
}

function initPages(articleKey) {
    var params = {
        pageSize: pageSize,
        pageNo: pageNo,
        doctorId: doctorId,
        userId: user.userId,
        token: user.token,
        articleKey: articleKey
    }
    $.ajax({
        type: 'GET',
        url: config.appserver_url + '/doctorNurse/queryAllArticle.json',
        data: params,
        dataType: 'json',
        success: function (data) {
          console.log(data)
            tokenLose(data.status);
            //遍历标题列表
            var titleList = data.data.list;
            $(".articleList-li-left").remove();
            // if(articleKey != -1){
            //     $("#articleListAll").find("div").removeClass("articleList-li-div");
            // }
            var titleAllList = '';
            titleAllList += '<li class="articleList-li">';
    				titleAllList += '	<div id="article-all" class="articleList-li-div">全部文章</div>';
            titleAllList += '	<input type="hidden" value="-1">';
    				titleAllList += '</li>';
            for (var i = 0; i < titleList.length; i++) {
                titleAllList += '<li class="articleList-li articleList-li-left">';
                if(articleKey == titleList[i].code){
                    titleAllList += '<div class="articleList-li-div">' + titleList[i].name + '</div>';
                }else{
                    titleAllList += '<div class="">' + titleList[i].name + '</div>';
                }
                titleAllList += '<input type="hidden" value="' + titleList[i].code + '" />';
                titleAllList += '</li>';
            }
            $("#articleListAll").html(titleAllList);

            //遍历文章列表
            var articleContent = data.data.articleList;
            var articleList = $("#articleParticulars-ul").html();
            for (var i = 0; i < articleContent.length; i++) {
                articleList += '<a onclick="articleDetail(this)" style="text-decoration: none; color: #000000;"><li class="articleParticulars-li">';
                articleList += '<input type="hidden" id="articleId" value="'+articleContent[i].id+'" />';
                articleList += '<div class="articleParticulars-li-list">';
                articleList += '<img class="articleParticulars-img" src="' + articleContent[i].picUrl + '" />';
                articleList += '<div class="articleParticulars-title">';
                articleList += '<h4>' + articleContent[i].title + '</h4>';
                articleList += '<section>' + articleContent[i].contentAbstract + '</section></div></div>';
                articleList += '<div class="creatTime">';
                articleList += '<img class="publishTime" src="../../images/publishTime.png" />';
                articleList += '<span class="creatTime-span">' + dateFormat(articleContent[i].updateTime) + '</span>';
                articleList += '<div class="admire"><img class="eye" src="../../images/eye.png" />';
                articleList += '<span class="examine"style="color: #CCCCCC;">' + articleContent[i].click + '</span></a>';
                appreciate(articleContent[i].isFabulous , articleContent[i].fabulous);
                function appreciate(isFabulous , fabulous) {
                    if (isFabulous == 0) {
                        articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeNo.png" />';
                        articleList += '<span class="appreciate appreciate-affirm">' + fabulous + '</span></span>';
                    } else {
                        articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeYes.png" />';
                        articleList += '<span class="appreciate appreciate-affirm" style="color: #EC9C00 !important;">' + fabulous + '</span></span>';
                    }
                }


                articleList += '</div></div></li>';
            }
            $("#articleParticulars-ul").html(articleList);

            $(".articleList-li").on("click", function(){
                var key = $(this).find("input").val();
                titleKey = key;
                // $("#articleListAll").find("div").removeClass("articleList-li-div");
                $(this).find("div").addClass("articleList-li-div").parent().siblings().find("div").removeClass("articleList-li-div");
                $("#articleParticulars-ul").html("");
                initPages2(titleKey);

            });
        },
        error: function () {
            alert("服务繁忙，请稍后再试！")
        }
    })
}

function initPages2(articleKey) {
    var params = {
        pageSize: pageSize,
        pageNo: pageNo,
        doctorId: doctorId,
        userId: user.userId,
        token: user.token,
        articleKey: articleKey
    }
    $.ajax({
        type: 'GET',
        url: config.appserver_url + '/doctorNurse/queryAllArticle.json',
        data: params,
        dataType: 'json',
        success: function (data) {
          console.log(data)
            tokenLose(data.status);

            //遍历文章列表
            var articleContent = data.data.articleList;
            var articleList = $("#articleParticulars-ul").html();
            for (var i = 0; i < articleContent.length; i++) {
                articleList += '<a onclick="articleDetail(this)" style="text-decoration: none; color: #000000;"><li class="articleParticulars-li">';
                articleList += '<input type="hidden" id="articleId" value="'+articleContent[i].id+'" />';
                articleList += '<div class="articleParticulars-li-list">';
                articleList += '<img class="articleParticulars-img" src="' + articleContent[i].picUrl + '" />';
                articleList += '<div class="articleParticulars-title">';
                articleList += '<h4>' + articleContent[i].title + '</h4>';
                articleList += '<section>' + articleContent[i].contentAbstract + '</section></div></div>';
                articleList += '<div class="creatTime">';
                articleList += '<img class="publishTime" src="../../images/publishTime.png" />';
                articleList += '<span class="creatTime-span">' + dateFormat(articleContent[i].updateTime) + '</span>';
                articleList += '<div class="admire"><img class="eye" src="../../images/eye.png" />';
                articleList += '<span class="examine"style="color: #CCCCCC;">' + articleContent[i].click + '</span></a>';
                appreciate(articleContent[i].isFabulous , articleContent[i].fabulous);
                function appreciate(isFabulous , fabulous) {
                    if (isFabulous == 0) {
                        articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeNo.png" />';
                        articleList += '<span class="appreciate appreciate-affirm">' + fabulous + '</span></span>';
                    } else {
                        articleList += '<span class="recognition  recognition-affirm"><img class="admire-img" src="../../images/likeYes.png" />';
                        articleList += '<span class="appreciate appreciate-affirm" style="color: #EC9C00 !important;">' + fabulous + '</span></span>';
                    }
                }


                articleList += '</div></div></li>';
            }
            $("#articleParticulars-ul").html(articleList);


        },
        error: function () {
            alert("服务繁忙，请稍后再试！")
        }
    })
}

// 跳转详情
function articleDetail(article){
    var articleId =  $(article).find("#articleId").val();
    historyForward("../healthPopularization/healthScience.html?articleId=" + articleId + "&userId=" + user.userId);
}

//下拉分页加载更多
var stop = true;
$(window).scroll(function () {
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if ($(document).height() <= totalheight) {
        if (stop == true) {
            stop = false;
            pageNo++;
            initPages();
            stop = true;
        }
    }
});
