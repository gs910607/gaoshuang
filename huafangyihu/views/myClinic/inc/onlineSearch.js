//打电话
$(".consultation").on("click", function() {
	$("#phoneShade").show();
	$(".promptBtn > a").on("click", function() {
		$("#phoneShade").hide();
	})
})

//定义全局变量
var token;
var hospitalId;
var pageNo = 1;
var pageSize = 7;
(function () {
    initParams()
//	queryLast()
    init()


})();


//提取储存信息
function initParams() {
    user = JSON.parse(localStorage.getItem("user"));
    token = user.token;
    patId = user.userId;
    userId = user.userId;
    //解析url
    hospitalId = GetQueryStr("hospitalId")
}

function init() {
    var param = {
        hospitalId: hospitalId,
        pageNo: pageNo,
        pageSize: pageSize,
        token: token
    }
    $.ajax({
        type: "get",
        data: param,
        url: config.appserver_url + "/myClinic/hospitalDoctor.json",
        dataType: "json",
        async: true,
        success: function (data) {
            tokenLose(data.status);
            if (data.data.length == 0) {
                $(".another-doctor-none").css("display", "none");
                $(".another-doctor").css("border-bottom", "0")
            } else {
                $("#synopsis-none").css("display", "none")
                var synopsisList = $(".synopsis").html();
                for (var i = 0; i < data.data.length; i++) {
                    synopsisList += '<img class="synopsis-img" src="' + (data.data[i].avatar || defaultVar.onerrorImg) + '" />';
                    synopsisList += '<div class="synopsis-text">';
                    synopsisList += '<div class="doctor" id="doctorName"><span>' + data.data[i].realName + '</span><span>';
                    synopsisList += '<ul class="evaluate-ul">	<li class="evaluate-ul-li">';
                    synopsisList += '<div class="evaluateNumber">';
                    var evaluationScore = data.data[i].evaluationScore;
                    judgeGrade(evaluationScore)
                    synopsisList += '<span class="evaluateNumber-number">' + (data.data[i].evaluationScore || 0) + '分</span></div> </li></ul></span></div>';
                    synopsisList += '<div class="doctor"><span class="doctor-main">' + data.data[i].title + '&#x3000;</span>';
                    synopsisList += '<span class="doctor-major">' + data.data[i].deptName + '</span></div>';
                    if(data.data[i].diseaseLabel){
                    	synopsisList += '<div class="doctor-specialty">' + data.data[i].diseaseLabel + '</div></div>';
                    }else{
                    	synopsisList += '<div class="doctor-specialty">暂无</div></div>';
                    }
                    
                    synopsisList += '<div class="clear"></div><div class="consulting-method">';
                    synopsisList += '<div class="consulting-model chat" onclick="onlineChat(this)">';
                    synopsisList += '<input type="hidden" id="doctorId" value=' + data.data[i].id + '></input>';
                    synopsisList += '<input type="hidden" id="hospitalId" value=' + data.data[i].hospitalId + '></input>';
                    synopsisList += '<div class="cousulting-method-img"><img src="../../images/information.png" alt=""></div>';
                    synopsisList += '<div class="cousulting-method-text">';
                    synopsisList += '<h6>图文咨询</h6><span>免费</span><p>通过文字、图片、语音和医生在线问诊</p>';
                    synopsisList += '</div></div><div class="clear"></div><div class="consulting-model telephone">';
                    synopsisList += '<div class="cousulting-method-img"><img src="../../images/telephone-blue.png" alt=""></div>';
                    synopsisList += '<div class="cousulting-method-text">';
                    synopsisList += '<h6>电话咨询</h6><span class="price"><i>￥15</i>/10分钟</span><p>预约医生，与医生通过电话在线问诊</p>';
                    synopsisList += '</div></div></div></div>';
                    synopsisList += '<div class="clear">';
                }
                $(".synopsis").html(synopsisList);
            }

            function judgeGrade(e) {
                if (e < 0.5) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 1) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/bigStar.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 1.5) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 2) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/bigStar.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 2.5) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 3) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/bigStar.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 3.5) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 4) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/bigStar.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 4.5) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />';
                } else if (e < 5) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/bigStar.png" alt="" />';
                } else if (e == 5) {
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                    synopsisList += '<img class="evaluateNumber-img" src="../../images/star.png" alt="" />';
                } else {
                    //alert("综合评分返回0~5")
                }
                return;
            }

        }


    });
}


var backUrl = GetQueryStr("url");

$("#goBack").on("click", function () {
    // if (backUrl) {
        // window.location.href = "organizationClinicIndex.html";
    // } else {
        // window.location.href = "clinicIndex.html"
    // }
	historyBack();
})

$("#allDoctor").on('click', function () {
    historyForward("../myClinic/clinicWholeDoctor.html");
});

//$(document).on('click', ".consulting-method .chat", function () {
//  location.href = "../medic/onlineConsulting.html";
//})

function onlineChat(doctor) {
    var doctorId = $(doctor).find("#doctorId").val();
    var hospitalId = $(doctor).find("#hospitalId").val();
    sessionStorage.setItem("doctorId", doctorId);
    sessionStorage.setItem("hospitalId", hospitalId);
    historyForward("../medic/onlineConsulting.html?doctorId=" + doctorId);
}
