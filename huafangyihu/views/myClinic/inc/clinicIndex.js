//弹出拨打
$("#dial").on("click", function () {
    $("#modal").css("display", "none")
    $("#modal").css("display", "block")
    var modalWidth = $(document).width()
    console.log(modalWidth)
    var modalHeight = $(document).height()
    console.log(modalHeight)
    $("#modal").css("background-color", "#111111")
    $("#modal").width(modalWidth)
    $("#modal").height(modalHeight)
    $("#dialMain").css("display", "block")
//禁用滚动条事件
    $("body").css("overflow", "hidden")


    $("#dialMain-close").on("click", function () {
        $("#dialMain").css("display", "none")
        $("#modal").css("display", "none")
        $("body").css("overflow", "auto")
    })

    $(".dialMain-address").on("click", function() {
        $("#dialMain-close").trigger("click")
    })

//模态框弹出层
    $("#attention-img-yes").on("click", function () {
        $("#modal").css("display", "block")
        var modalWidth = $(document).width()
        console.log(modalWidth)
        var modalHeight = $(document).height()
        console.log(modalHeight)
        $("#modal").width(modalWidth)
        $("#modal").height(modalHeight)
        $("#modal").css("background-color", "#111111")
        $("#modal-div").css("display", "block")
        $("#modal-div").css("background-color", "white")
    })
    $("#modal-div-second").on('click', function () {
        $("#modal-div").css("display", "none")
        $("#modal").css("display", "none")
    })
    $("#modal-div-three").on('click', function () {
        $("#modal-div").css("display", "none")
        $("#modal").css("display", "none")
    })
})

//var isFabulou;
//点击关注
$(".follow").on("click", function () {
    attentionHos()
//		isFabulou = "0";
})
//取消关注
$(".add-follow").on("click", function () {
    attentionHos()
//	   isFabulou = "1";
})
//跳转更多评论
$("#moreEvaluate").on("click", function(){
   window.location.href = "clinicEvaluate.html";
});


//轮播
$(".health-ul").css("width", $(".health-ul-li").length * parseInt($(".health-ul-li").css("width")));


//解析url参数数据
function analysisUrl() {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        //获取url中"?"符后的字符串并正则匹配
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }

    haveDefault = GetQueryString("default")
    if (haveDefault) {
        $(".bar").hide();
    } else {
        $(".bar").show();
    }
}

analysisUrl();


//定义全局变量
var hospitalId;
var pageNo = 1;
var pageSize = 10;
var user;
var localCityInfo;
(function () {
    initParams()
    queryLast()

    init()

})();


//提取储存信息
function initParams() {
    user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    //sessionStorage存储
    localCityInfo = JSON.parse(sessionStorage.getItem("localCityInfo"));
    console.log(localCityInfo.longitude)
//  sessionStorage.getItem("hospitalId")

}


//轮播图同步加载
function init() {
    hospitalId = sessionStorage.getItem("hospitalId");
    var param = {
        hospitalId: hospitalId,
        userId: user.userId,
        token: user.token
    }
    console.log(param)
    $.ajax({
        type: "get",
        data: param,
        url: config.appserver_url + "/myClinic/queryMyClinicNoDis.json",
        dataType: "json",
        async: false,
        success: function (data) {
            tokenLose(data.status);
            if (data.data.hospitalVo.isFollow == 1) {
                $(".add-follow").css("display", "none");
                $(".follow").css("display", "block");
            } else {
                $(".add-follow").css("display", "block");
                $(".follow").css("display", "none");

            }


            var sliderList = $(".sliderCarousel").html()
            for (var i = 0; i < data.data.picList.length; i++) {
                sliderList += '<li style="float: left; display: inline; width: 320px; height: 160px;"><a class="slider_a" href="" target="_blank"><img  src=' + data.data.picList[i].imageUrl + '></a></li>';
            }
            $(".sliderCarousel").html(sliderList)
            //点击切换诊所
            $(".switch-clinic").on("click", function () {
                console.log(data.data.hospitalVo.isFollow)
                if (data.data.hospitalVo.isFollow == 1) {
                    location.href = "clinicSwitch.html"
                } else {
                    location.href = "clinicSwitchNothing.html"
                }
//	var parameter ="default="+"default"
//	location.href ='../myClinic/clinicIndex.html?'+parameter;
            })
        }

    });

    //功能图标

}

//关注医院接口
function attentionHos() {
    hospitalId = sessionStorage.getItem("hospitalId");
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
        success: function (data) {
            init();

        },
        error: function (data) {

        }
    });
}


//推荐医院信息加载
function queryLast() {
    hospitalId = sessionStorage.getItem("hospitalId");
    var params = {
        hospitalId: hospitalId,
        userId: user.userId,
//		pageNo: pageNo,
//		pageSize:pageSize,
//		latitude: latitude,
//		longitude:longitude,
        token: user.token
    }
    console.log(params)
    $.ajax({
        type: "get",
        data: params,
        url: config.appserver_url + "/myClinic/queryMyClinicNoDis.json",
        dataType: "json",
        async: true,
        success: function (data) {
//  	   alert(data.errorMsg)
//         hospitalId=data.data[0].id;
            //存储到浏览器
//         sessionStorage.setItem("hospitalId", hospitalId);
            $(".hospitalName").text(data.data.hospitalVo.name);
            $(".hospitalTypeName").text(data.data.hospitalVo.typeName);
            $(".address span").eq(0).text(data.data.hospitalVo.address);
            $(".clinic-number").text(data.data.hospitalVo.evaluationScore + "分");
            judgeGrade(data.data.hospitalVo.evaluationScore);
            var evaluateNum = '用户评价(' + data.data.evaluateList.length + ')';
            $("#levauateVoListlength").text(evaluateNum);
            var mailList = $(".evaluate-ul").html();
            var evaluateVoList = data.data.evaluateList;
            for (var i = 0; i < evaluateVoList.length; i++) {
                var score = evaluateVoList[i].score
                mailList += '<li class="evaluate-ul-li">';
                mailList += '<img class="evaluate-ul-li-img" src="' + evaluateVoList[i].avatar + '" />';

                mailList += '<div class="evaluate-ul-li-div">';
                mailList += '<span class="evaluate-ul-li-name">' + evaluateVoList[i].userName + '</span></div>';

                mailList += '<span class="evaluate-ul-li-time">' + dateFormat(evaluateVoList[i].createTime) + '</span>';

                mailList += '<div class="evaluateNumber">';
                judgeGrade()
                mailList += '<span id="evaluateId" class="evaluate-content-span">' + evaluateVoList[i].score + '分</span></div>';
                mailList += '<div class="evaluate-content">';
                mailList += '<span  class="evaluate-content-span">' + evaluateVoList[i].content + '</span>';
                mailList += '</div></li>';
            }
            $(".evaluate-ul").html(mailList);

            var latitude = data.data.hospitalVo.latitude;
            var longitude = data.data.hospitalVo.longitude;

            // 跳转至诊所定位
            $("#location").on("click" , function(){
                sessionStorage.setItem("local_longitude" , longitude);
                sessionStorage.setItem("local_latitude" , latitude);
                window.location.href = "../location/location.html";
            });

            function judgeGrade(e) {
                if (e < 0.5) {

                } else if (e < 1) {
//			$(".clinic-img").eq(0).attr("src", "../../images/bigStar.png")
                } else if (e < 1.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                } else if (e < 2) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/bigStar.png")
                } else if (e < 2.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                } else if (e < 3) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/bigStar.png")
                } else if (e < 3.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                } else if (e < 4) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(3).attr("src", "../../images/bigStar.png")
                } else if (e < 4.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(3).attr("src", "../../images/star.png")
                } else if (e < 5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(3).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(4).attr("src", "../../images/bigStar.png")
                } else if (e == 5) {
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

            //initHospital()
            initDoctor()
        },
        error: function () {
        }
    });


//推荐医院信息详情加载
    function initHospital() {
        var param = {
            hospitalId: hospitalId,
            pageNo: pageNo,
            pageSize: pageSize,
            longitude: localCityInfo.longitude,
            latitude: localCityInfo.latitude,
            token: user.token
        }
        $.ajax({
            type: "get",
            data: param,
            url: config.appserver_url + "/myClinic/queryMyClinic.json",
            dataType: "json",
            async: true,
            success: function (data) {
                console.log(data)

                //遍历诊所动态
                var articleAndActiveVoList = data.data.articleAndActiveVoList;
                var recommendEssay = $(".article-list").html()
                for (var i = 0; i < articleAndActiveVoList.length; i++) {
                    recommendEssay += '<li class="article-list-li"><a href="dynamicArticle.html">';
                    recommendEssay += '<img class="article-list-li-img" src="../../images/recommendation.png" />';
                    recommendEssay += '<span class="article-list-li-span">' + articleAndActiveVoList[i].name + '</span></a></li>';
                }
                $(".article-list").html(recommendEssay)

                //遍历热门推荐
                var hospitalServiceItemVoList = data.data.hospitalServiceItemVoList
                var recommendList = $(".recommend-list").html()
                for (var i = 0; i < hospitalServiceItemVoList.length; i++) {
                    recommendList += '<li class="recommend-list-li">';
                    //判断是否有图片传入
                    if (hospitalServiceItemVoList[i].picUrl) {
                        var hospitalServiceItemPicUrl = hospitalServiceItemVoList[i].picUrl;
                    } else {
                        var hospitalServiceItemPicUrl = "../../images/default-img7070.png";
                    }
                    recommendList += '<img  class="recommend-img" src="' + hospitalServiceItemVoList[i].picUrl + '" />';
                    recommendList += '<div class="recommend-text"><h6>' + hospitalServiceItemVoList[i].name + '</h6> <p>' + hospitalServiceItemVoList[i].serviceActive + '</p>';
                    recommendList += '<div class="discount"><span class="discount-price">' + hospitalServiceItemVoList[i].rate + '元/次</span>';
                    recommendList += '<img src="../../images/discount_identification.png" alt=""></div>';
                    recommendList += '<span class="original-price">门店价：' + hospitalServiceItemVoList[i].oldRete + '元/次</span></div></li><div class="clear"></div>';
                }

                $(".recommend-list").html(recommendList);

                //遍历评价列表
                var evaluateNum = '用户评价(' + data.data.evaluateList.length + ')';
                $("#levauateVoListlength").text(evaluateNum);


                var mailList = $(".evaluate-ul").html()
                var evaluateVoList = data.data.evaluateList
                for (var i = 0; i < evaluateVoList.length; i++) {
                    var score = evaluateVoList[i].score
                    mailList += '<li class="evaluate-ul-li">';
                    mailList += '<img class="evaluate-ul-li-img" src="' + evaluateVoList[i].avatar + '" />';

                    mailList += '<div class="evaluate-ul-li-div">';
                    mailList += '<span class="evaluate-ul-li-name">' + evaluateVoList[i].userName + '</span></div>'

                    mailList += '<span class="evaluate-ul-li-time">' + format(evaluateVoList[i].createTime) + '</span>'

                    mailList += '<div class="evaluateNumber">';
                    judgeGrade(evaluateVoList[i].score)
                    mailList += '<span id="evaluateId" class="evaluate-content-span">' + evaluateVoList[i].score + '分</span></div>'
                    mailList += '<div class="evaluate-content">'
                    mailList += '<span  class="evaluate-content-span">' + evaluateVoList[i].content + '</span>'
                    mailList += '</div></li>'
                }
                $(".evaluate-ul").html(mailList)

                function judgeGrade(score) {
                    if (score == 1) {
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                    } else if (score == 2) {

                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'

                    } else if (score == 3) {
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                    } else if (score == 4) {
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
                    } else if (score == 5) {
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                        mailList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
                    } else {
                        alert("评分范围1~5")
                    }
                }


//时间戳解析
                function add0(m) {
                    return m < 10 ? '0' + m : m
                }

                function format(e) {
                    //时间戳是整数，否则要parseInt转换
                    var time = new Date(e);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    return y + '年' + add0(m) + '月' + add0(d) + '日 ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
                }


            },

            error: function () {

            }
        })

    }

    function initDoctor() {
        var params = {
            hospitalId: hospitalId,
            pageNo: pageNo,
            pageSize: pageSize,
            token: user.token
        }
        $.ajax({
            type: "get",
            data: params,
            url: config.appserver_url + "/myClinic/hospitalDoctor.json",
            dataType: "json",
            async: true,
            success: function (data) {
                //遍历诊所医护
                var healthUlList = $(".health-ul").html()
                for (var i = 0; i < data.data.length; i++) {
                    healthUlList += '<li class="health-ul-li" onclick="doctorDetail(this)"><div class="recommendDoctor-list">';
                    healthUlList += '<input type="hidden" value="'+data.data[i].id+'"/>';
                    healthUlList += '<img class="health-ul-li-img" src="' + data.data[i].avatar + '"/>';
                    healthUlList += '<img class="recommendDoctor-chat" class="" src="../../images/health-clinic_news.png"/></div>';
                    healthUlList += '<div class="health-ul-li-div"><span class="health-ul-li-name">' + data.data[i].realName + '</span></div></li>';
                }
                $(".health-ul").html(healthUlList)


            },
            error: function () {

            }
        })

    }
}

function doctorDetail(doctor){
    var doctorId = $(doctor).find("input").val();
    sessionStorage.setItem("doctorId" , doctorId);
    window.location.href = "../medic/medicIndex.html?doctorId="+doctorId;
}

$(".return").on("click", function () {
//	history.back(-1)
})

//$(".modal").("click",function(){
//	console.log(2131)
//})
$(".model").eq(0).on("click",function(){
//	console.log(21321313)
    var prams =hospitalId +"&"+"url=myClinic/onlineSearch.html"
	location.href="onlineSearch.html?hospitalId="+prams;
})
$(".model").eq(1).on('click',function(){
    var prams =hospitalId +"&"+"url=myClinic/onlineSearch.html"
//	location.href="onlineSearch.html?hospitalId="+prams;
	location.href="clinicHealthCare.html?hospitalId="+prams;
})
