//关联医护ID
var pageNo;
var pageSize;
var user;
var hospitalId;
var dataLenght;


    initParams();
    initDoctor();
    initEvaluate();
    initScrollBar() 


function initParams() {
    user = JSON.parse(localStorage.getItem("user"));
    pageNo = 1;
    pageSize = 7;
   hospitalId =GetQueryStr("hospitalId")

    
}

function initDoctor() {
    var params = {
        hospitalId: hospitalId,
        token: user.token
    };
    $.ajax({
        url: config.appserver_url + '/myClinic/myClinicEvaluate.json',
        data: params,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            tokenLose(data.status);
            if (!Validator.validateNull(data.data)) {
                $("#theme").html(data.data.hospitalName + "的评价");
                $(".gradeMagnify").html(data.data.evaluateScore);
                calculateScore(data.data.evaluateScore, $(".evaluateScore-img-grade"), 5);
                $(".evaluate-number-count").html(data.data.evaluateCount);
            }
        }
    })
}

function initEvaluate() {
    var params = {
        id: hospitalId,
        type: 2,//类型（0:健康宣教，1：健康科普，2：机构，3：医护，4：咨询）
        pageNo: pageNo,
        pageSize: pageSize,
        token: user.token
    };
    $.ajax({
        url: config.appserver_url + '/userEvaluate/queryEvaluate.json',
        data: params,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
        	dataLenght = data.data.length;
            tokenLose(data.status);
            if (!Validator.validateNull(data.data)) {
                var evaluates = data.data;
                var $evaluateList = $(".evaluate-ul");
                for(var i =0;i<evaluates.length;i++){
                    var $evaluate = $evaluateList.find("li:first").clone();
                    $evaluate.css("display" , "block");
                    $evaluate.find(".evaluate-ul-li-img").attr("src" , evaluates[i].avatar);
                    $evaluate.find(".evaluate-ul-li-name").html(evaluates[i].userName);
                    $evaluate.find(".evaluate-ul-li-time").html(dateFormat(evaluates[i].createTime));
                    calculateScore(evaluates[i].score , $evaluate.find(".evaluateNumber") , 5);
                    $evaluate.find(".evaluateNumber-number").html(evaluates[i].score+ "分");
                    $evaluate.find(".evaluate-content-span").html(evaluates[i].content);
                    $evaluateList.append($evaluate);
                }
            }
        }
    })

}
//$("#goBack").on("click",function(){
////	$("header>a").attr("href","javascript:;");
//	var params = "default=default&hospitalId="+hospitalId;
//	location.href="clinicIndex.html?"+params;
//});
////下拉分页加载更多
//var stop = true;
//$(window).scroll(function () {
//  totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
//  if ($(document).height() <= totalheight) {
//      if (stop == true) {
//          stop = false;
//          pageNo++;
//          initEvaluate();
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
				if(dataLenght < 7) {
				} else {
					initEvaluate();
				}
				stop = true;
			}
		}
	});
}