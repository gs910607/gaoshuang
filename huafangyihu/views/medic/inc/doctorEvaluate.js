//关联医护ID
var pageNo;
var pageSize;
var user;
var doctorId;
$(function () {
    initParams();
    initDoctor();
    initEvaluate();
});

function initParams() {
    user = JSON.parse(localStorage.getItem("user"));
    pageNo = 1;
    pageSize = 10;
    doctorId = sessionStorage.getItem("doctorId");
}

function initDoctor() {
    var params = {
        doctorId: doctorId,
        token: user.token
    };
    $.ajax({
            url: config.appserver_url + '/userEvaluate/doctorEvaluate.json',
            data: params,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                tokenLose(data.status)
                if (!Validator.validateNull(data.data)) {
                    $("#theme").html(data.data.realName + "的评价");
                    $(".gradeMagnify").html(data.data.evaluationScore);
                    calculateScore(data.data.evaluationScore, $(".evaluateScore-img-grade"), 5);
                    $(".evaluate-number-count").html(data.data.evaluateCount);
                }
            }
    })
}

function initEvaluate() {
    var params = {
        id: doctorId,
        type: 3,//类型（0:健康宣教，1：健康科普，2：机构，3：医护，4：咨询）
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
            tokenLose(data.status)
            if (!Validator.validateNull(data.data)) {
                var evaluates = data.data;
                var $evaluateList = $(".evaluate-ul");
                var $evaluate = '';
                console.log(data)
                // for(var i =0;i<evaluates.length;i++){
                //     var $evaluate = $evaluateList.find("li:first").clone();
                //     $evaluate.css("display" , "block");
                //     $evaluate.find(".evaluate-ul-li-img").attr("src" , evaluates[i].avatar);
                //     $evaluate.find(".evaluate-ul-li-name").html(evaluates[i].userName);
                //     $evaluate.find(".evaluate-ul-li-time").html(dateFormat(evaluates[i].createTime));
                //     calculateScore(evaluates[i].score , $evaluate.find(".evaluateNumber") , 5);
                //     $evaluate.find(".evaluateNumber-number").html(evaluates[i].score+ "分");
                //     $evaluate.find(".evaluate-content-span").html(evaluates[i].content);
                //     $evaluateList.append($evaluate);
                // }
                for(var i=0;i<evaluates.length;i++) {
                  $evaluate += '<li class="evaluate-ul-li">';
                  $evaluate += '    <img class="evaluate-ul-li-img" src="'+ evaluates[i].avatar +'"/>';
                  $evaluate += '    <div class="evaluate-ul-li-div">';
                  $evaluate += '        <span class="evaluate-ul-li-name">'+ evaluates[i].userName +'</span>';
                  $evaluate += '    </div>';
                  $evaluate += '    <span class="evaluate-ul-li-time">'+ evaluates[i].createTime +'</span>';
                  calculateScore(evaluates[i].score , $(".evaluateNumber") , 5);
                  $evaluate += '    <div class="evaluate-content">';
                  $evaluate += '        <span class="evaluate-content-span">'+ evaluates[i].content +'</span>';
                  $evaluate += '    </div>';
                  $evaluate += '</li>';
                }
                $evaluateList.html($evaluate)
            }
        }
    })

}
//下拉分页加载更多
var stop = true;
$(window).scroll(function () {
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if ($(document).height() <= totalheight) {
        if (stop == true) {
            stop = false;
            pageNo++;
            initEvaluate();
            stop = true;
        }
    }
});
