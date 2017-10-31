var user;//用户参数
var token;
var localCityInfo;//主页传递参数
var doctorId;
var isFollowed;
var hospitalId;

// var hospitalid = GetQueryStr("hospitalid");
// console.log(hospitalid);
//初始化加载
$(function () {
    initParams();
    initPages();
    provisioning();
    initClick();
});

function initParams() {
    user = JSON.parse(localStorage.getItem("user"));
    token = user.token;
    localCityInfo = JSON.parse(sessionStorage.getItem("localCityInfo"));
    // doctorId = sessionStorage.getItem("doctorId");
    doctorId = GetQueryStr("doctorId");
}

function initClick() {

    //点击蒙版层关闭分享
    $(".modal-cancel").on("click", function () {
        $(".modal-cancel").css("display", "none")
        $("#shareMain").css("display", "none")
        $("#modal").css("display", "none")
        $("body").css("overflow", "auto")
    })
    //关闭分享
    $("#shareMain-close").on("click", function () {
        $(".modal-cancel").css("display", "none")
        $("#shareMain").css("display", "none")
        $("#modal").css("display", "none")
        $("body").css("overflow", "auto")
    })

    // 个人简介下拉加载
    $("#pull-down").on("click", function () {
        $(this).css("display", "none")
        $("#pull-up").css("display", "block")
        $(".introduction-particulars").css("-webkit-line-clamp", "100")

    })
    $("#pull-up").on("click", function () {
        $(this).css("display", "none")
        $("#pull-down").css("display", "block")
        $(".introduction-particulars").css("-webkit-line-clamp", "1")
    })

    //点击是否关注
    $(".attention").on("click", function () {
      console.log(isFollowed)
        if (isFollowed == 1) {
            //是否取消关注弹框
            cancelFocus.isFocusShow();

        }else if(isFollowed == 0){
            focusClick();
        }
        // focusClick();
    });

    $("#modal-div-three").on("click" , function(e){
      //确认取消
      cancelFocus.clickSure();

      e.stopPropagation();
    });
    $("#modal-div-second").on("click" , function(e){
      //关闭弹框
      cancelFocus.clickCancel();

      e.stopPropagation();
    })

    //更多评价
    $("#moreEvaluate").on("click",function(){
        window.location.href = "doctorEvaluate.html";
    });
}

//是否取消关注
var cancelFocus = {
  isFocusShow: function() {
    $("#modal").show();
    var modalWidth = $(document).width()
    var modalHeight = $(document).height()
    $("#modal").width(modalWidth)
    $("#modal").height(modalHeight)
    $("#modal").css("background-color", "#111111")
    $("#modal-div").show();
    $("#modal-div").css("background-color", "white")
  },
  clickSure: function() {
    focusClick();
  },
  clickCancel: function() {
    $("#modal-div").hide();
    $("#modal").hide();
  }
}

function focusClick() {
    $.ajax({
        type: 'POST',
        url: config.appserver_url + "/docPa/focus.json",
        data: {
            doctorId: doctorId,
            userId: user.userId,
            token: token
        },
        dataType: 'JSON',
        success: function (data) {

        	   console.log(data)
            tokenLose(data.status);
            // if (!Validator.validateNull(data.data)) {
                if (data.data == 0) {//未关注
                    $("#attention-img-yes").hide();
                    $("#attention-img-no").show();
                    $(".attention-content").text("加关注");
                    $("#modal-div").hide();
                    $("#modal").hide();
                    isFollowed = 0;
                    alert("取消关注成功");
                } else {
                    $("#attention-img-no").hide();
                    $("#attention-img-yes").show();
                    $(".attention-content").text("已关注");
                    $("#modal-div").hide();
                    $("#modal").hide();
                    isFollowed = 1;
                    alert("关注成功");
                }
            // }
        },
        error: function() {
          alert("服务繁忙，请稍后再试！")
        },
        beforeSend: function() {
          ajaxLoading.show();
        },
        complete: function() {
          ajaxLoading.hide();
        }
    });
}


//查询开通的服务
function provisioning(){
	
    var params = {
        doctorId: doctorId,
        token: token,
        userId: user.userId
    };
    console.log(params)
    $.ajax({
        type: "get",
        data: params,
        url: config.appserver_url + "/userEvaluate/queryDocIndexEvaluate.json",
        dataType: "json",
        success: function (data) {
        	console.log(data.data.docIndexVo)
        	//是否有咨询服务
        	if(data.data.docIndexVo.isAsk =="1"){
        		$(".isAsk").show();
        	}
        	//是否有电话服务
        	if(data.data.docIndexVo.isPhone =="1"){
        		$(".isPhone").show();
        	} 
        	//是否有上门服务
        	if(data.data.docIndexVo.isVisit =="1"){
        		$(".isVisit").show();
        	} 
        	//是否有门诊预约
        	if(data.data.docIndexVo.isReservation =="1"){
        		$(".isReservation").show();
        	} 
        },
        error:function(){
        	
        }
    })

}
//调用打电话
//telephoneCounseling(document);

function initPages() {
    var params = {
        doctorId: doctorId,
        token: token,
        userId: user.userId
    };
    console.log(params)
    $.ajax({
        type: "get",
        data: params,
        url: config.appserver_url + "/userEvaluate/queryDocIndexEvaluate.json",
        dataType: "json",
        success: function (data) {
        	console.log(data)

        	hospitalId = data.data.docIndexVo.hospitalId;
        	console.log(hospitalId)
            tokenLose(data.status);
            if (!Validator.validateNull(data.data)) {
                tokenLose(data.status);
                if (data.data.isFollowed == 1) {//是否关注
                    $("#attention-img-no").hide();
                    $("#attention-img-yes").show();
                    $(".attention-content").text("已关注");
                    isFollowed = 1;
                } else {
                    $("#attention-img-yes").hide();
                    $("#attention-img-no").show();
                    $(".attention-content").text("加关注");
                    isFollowed = 0;
                }
                var docIndexVo = data.data.docIndexVo;//医护信息
                $(".synopsis-img").attr("src", docIndexVo.avatar || defaultVar.onerrorImg)
                $("#doctorName").html(docIndexVo.realName);
                $(".doctor-main").html(docIndexVo.title);
                $(".doctor-major").html(docIndexVo.deptName);
                $(".doctor-suffer").html(docIndexVo.workYear + "年经验");
                $("#hospital-name").html(docIndexVo.hospitalName);

                    //分享
    $("#share").on("click", function () {
//  $("#modal1").css("background-color", "#111111")
    $("#modal1").css("display","block");
    var modalWidth = $(document).width()
    var modalHeight = $(document).height()
    $("#modal1").width(modalWidth)
    console.log(modalHeight)
    $("#modal1").height(modalHeight)
    alert("请点击右上角分享哟")
//      $("#modal").css("display", "none")

//      var modalWidth = $(document).width()
//      var modalHeight = $(document).height()
//      $("#modal").css("background-color", "#111111")
//      $("#modal").width(modalWidth)
//      $("#modal").height(modalHeight)
//      $("#shareMain").css("display", "block")
//      $("body").css("overflow", "hidden")
//      $(".modal-cancel").css("display", "block")
//      var modalCancel = $("#shareMain").offset().top
//      console.log(modalCancel)
//      $(".modal-cancel").height(modalCancel)
			var shareLink = window.location.href;
			var shareTitle = docIndexVo.realName;
			var shareImgUrl = docIndexVo.avatar;
			//微信分享操作
			shareInvoke(shareLink,shareTitle,shareImgUrl);

    })


    $("#modal1").on("click",function(){

    	$(this).hide()
    })

                if(docIndexVo.serviceNum){
                     $("#serviceNum").html(docIndexVo.serviceNum);
                }else{
                	$("#serviceNum").text("0");
                }
                if(data.data.doctorFans){
                     $("#doctorFans").html(data.data.doctorFans);
                }else{
                	 $("#doctorFans").html("0");
                }
                if(docIndexVo.evaluationScore){
                    $("#synthesize-grade").html(docIndexVo.evaluationScore);
                }else{
                	$("#synthesize-grade").html("0");
                }


                if(docIndexVo.diseaseLabel){
                $("#diseaseLabel").html(docIndexVo.diseaseLabel);               	
                }else{
                $("#diseaseLabel").html("暂无擅长");         	
                }
                if(docIndexVo.summary){
                 $("#introduction-content-span").html(docIndexVo.summary); 
                 if(docIndexVo.summary.length>19){
                 	$("#apostrophe").show();
                 }else{
                 	$("#apostrophe").hide();
                 }
                }else{
                 $("#introduction-content-span").html("暂无简介");   
                }
                // 设置科普文章
                if (Validator.validateNull(data.data.articleTitle)) {
                    $("#article").css("display", "none");
                } else {
                    var $articleList = $(".article-list");
                    var article = data.data.articleTitle;
                    for (var i = 0; i < article.length; i++) {
                        var $article = $articleList.find("li:first").clone();
                        $article.css("display", "block");
                        $article.find(".article-list-li-span").html(article[i].title)
                        $article.find("input").val(article[i].id);
                        $article.on("click", function () {//设置点击事件
                            var articleId = $(this).find("input").val();
                            historyForward("../healthPopularization/healthScience.html?articleId=" + articleId + "&userId=" + user.userId);
                        });
                        $articleList.append($article);
                    }
                }
                // 设置用户评价
                if (Validator.validateNull(data.data.evaluateVoList)) {
                	$("#levauateVoListlength").html("用户评价(" + 0 + ")");
                    $("#moreEvaluate").css("display", "none");
                    $("#nothing").css("display", "block");
                    $("#havaSomething").css("display", "none");
                } else {
                    $("#levauateVoListlength").html("用户评价(" + data.data.evaluateVoList.length + ")");
                    var $evaluateList = $(".evaluate-ul");
                    var evaluates = data.data.evaluateVoList;
                    if(evaluates.length<6){
                    	evaluates.length = evaluates.length
                    }else{
                    	evaluates.length =6
                    }
                    for (var i = 0; i < evaluates.length; i++) {
                        var $evaluate = $evaluateList.find("li:first").clone();
                        $evaluate.css("display", "block");
                        $evaluate.find(".evaluate-ul-li-img").attr("src", evaluates[i].avatar);
                        $evaluate.find(".evaluate-ul-li-name").html(evaluates[i].userName);
                        $evaluate.find(".evaluate-ul-li-time").html(dateFormat(evaluates[i].createTime));
                        calculateScore(evaluates[i].score, $evaluate.find(".evaluateNumber"), 5);
                        $evaluate.find(".evaluateNumber-number").html(evaluates[i].score + "分");
                        $evaluate.find(".evaluate-content-span").html(evaluates[i].content);
                        $evaluateList.append($evaluate);
                    }
                }
            }
        }
    })
}
$("header > a").on("click", function() {
	historyBack();
})
//图文咨询
$("#consulting").on("click", function() {
	historyForward("../medic/onlineConsulting.html?doctorId="+doctorId);
});
//跳转医护排班表
$("#outpatient").on("click",function(){

	var nextPage ="../medic/outpatientAppointment.html?hospitalId="+hospitalId+"&"+"doctorId="+doctorId;
	historyForward(nextPage);
});

//更多文章
$("#moreArticle").on("click", function() {
  historyForward("../medic/article.html?doctorId=" + doctorId);
})
