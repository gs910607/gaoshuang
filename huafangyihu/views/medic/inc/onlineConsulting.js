var doctorId;
var hospitalId;
var user;
var targetId;//咨询聊天发送信息的医生ID，一般为医生的电话号码
var servicePeopleId;//受诊人ID
var sex;
var age;
var username;
var picList = new Array();//保存上传图片的路径
var picListSize = 0;

//防止输入法把底部按钮顶上来
var bodyH = $("body").height();
$("input, textarea").on("focus", function() {
  $("body").height(bodyH);
});
$("input, textarea").on("blur", function() {

  $("body").height("100%");
});
$("#diseaseDesp").on("blur",function(){
  var textareaContent = $(this).val();
  sessionStorage.setItem("textareaContent",textareaContent);
})
$(function () {
	var textareaContent1 = sessionStorage.getItem("textareaContent");
	if(textareaContent1){
	$("#diseaseDesp").val(textareaContent1)
	}

    initParams();
    initPages();
    initClick();
    submitOrder();
});

function initPages() {
    // 查询医护简介
    var params = {
        doctorId: doctorId,
        token: user.token
    };
    console.log(params)
    $.ajax({
        type: "get",
        data: params,
        url: config.appserver_url + "/doctorNurse/queryDocInfoWhereAsk.json",
        dataType: "json",
        async: true,
        success: function (data) {
        	console.log(data)
            tokenLose(data.status);
            if (!Validator.validateNull(data)) {
                targetId = data.data.docPhone;
                $("#doctorName").find("span:first").html(data.data.realName);
                calculateScore(data.data.score, $(".evaluateNumber"), 5);
                $(".evaluateNumber-number").html(data.data.score + "分");
                $(".doctor-main").html(data.data.title);
                $(".doctor-major").html(data.data.hdtName);
                $("#doctor-specialty").html(data.data.diseaseLabel);
                $(".synopsis-img").attr("src", data.data.avatar || defaultVar.onerrorImg);
            }
        }
    });
    //查询受诊人信息
    var params = {
        token: user.token,
        userId: user.userId
    };
    console.log(params)
    $.ajax({
        type: "get",
        data: params,
        url: config.appserver_url + "/getServicePeople/queryServicePeople.json",
        dataType: "json",
        async: true,
        success: function (data) {
           tokenLose(data.status);
            if (username && sex && servicePeopleId && age) {

                $(".attending-person-details").find("span").html(username + " " + sex + " " + age);

            } else if (!Validator.validateNull(data)) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].isDefault == "1") {
                        servicePeopleId = data.data[i].id;
                        $(".attending-person-details").find("span").html(data.data[i].name + " " + data.data[i].sex + " " + data.data[i].age);
                    }
                }
            }
        }
    });
}


function initClick() {
//上传
    $("#upload").on("click", function () {
        $("#modal").css("display", "none")
        $("#modal").css("display", "block")
        var modalWidth = $(document).width()
        // console.log(modalWidth)
        var modalHeight = $(document).height()
        // console.log(modalHeight)
        $("#modal").css("background-color", "#111111")
        $("#modal").width(modalWidth)
        $("#modal").height(modalHeight)
        $("#uploadMain").css("display", "block")
//禁用滚动条事件
        $("body").css("overflow", "hidden")

        $(".modal-cancel").css("display", "block")
        var modalCancel = $("#uploadMain").offset().top
        // console.log(modalCancel)
        $(".modal-cancel").height(modalCancel)
    })

//点击蒙版层关闭
    $(".modal-cancel").on("click", function () {
        $(".modal-cancel").css("display", "none")
        $("#uploadMain").css("display", "none")
        $("#modal").css("display", "none")
        $("body").css("overflow", "auto")
    })
//关闭
    $("#uploadMain-close, .uploadMain-address").on("click", function () {
        $(".modal-cancel").css("display", "none")
        $("#uploadMain").css("display", "none")
        $("#modal").css("display", "none")
        $("body").css("overflow", "auto")
    })

    // 点击上传图片
    $(document).on("click", ".uploadMain-address", function () {
        $("#file").click();

    })

    // 返回时清除浏览器数据
    $(document).on("click", "header > a", function () {
        removeItem()
        historyBack();
    });
}

function submitOrder() {

    //提交订单
    $("#prompt").on("click", function () {
        var slectPer = $(".attending-person-details > span").text();
        var diseaseDesp =$("#diseaseDesp").val();
        if(!slectPer || slectPer == "请选择受诊人") {
            alert("请选择受诊人");
            return;
        };
        if(!diseaseDesp) {
            alert("请详细描述您的病症、疾病和身体状况")
            return;
        };

        var diseaseDesp = $("#diseaseDesp").val();
        var orderRequest = {
            userId: user.userId,
            token: user.token,
            doctorNurseId: doctorId,
            hospitalId: hospitalId,
            type: 1,//在线咨询
            phone: user.phone,
            diseaseDesp: diseaseDesp,
            servicePeopleId: servicePeopleId
        };
        console.log(orderRequest);
           console.log(JSON.stringify(orderRequest));
        $.ajax({
            type: 'POST',
            url: config.appserver_url + "/order/perOrder.json",
            data: JSON.stringify(orderRequest),
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                tokenLose(data.status);
                if (data.status == 1) {//成功
                    removeItem();
                    //绑定咨询信息到聊天页面
                    var chatInfo = {
                        sentTime: new Date().getTime(),
                        content: diseaseDesp,
                        serviceOrderNo: data.data.orderNo,
                        targetId: targetId,
                        doctorNurseId: doctorId,
                        picList : picList,
                        picListSize : picListSize
                    };
                    console.log(chatInfo)
                    sessionStorage.setItem("chatInfo", JSON.stringify(chatInfo));
                    sessionStorage.setItem("doctorId" , doctorId);
                    sessionStorage.setItem("serviceOrder" , JSON.stringify(data.data));
                    timer();
                } else {
                	//失败
                    alert(data.errorMsg);
                    console.log(data)
                }
            }, error: function () {
              alert("服务繁忙，请稍后再试！")
            },
            beforeSend: function() {
              ajaxLoading.show();
            },
            complete: function() {
              ajaxLoading.hide();
            }
        });

        removeItem()

        // location.href="../main/index.html";
    });
}

function timer() {
    $("#mask").css("display", "none")
    $("#mask").css("display", "block")
    var maskWidth = $(document).width()
    var maskHeight = $(document).height()
    $("#mask").css("background-color", "#111111")
    $("#mask").width(maskWidth)
    $("#mask").height(maskHeight)
    $("#promptMain").css("display", "block")
    $("body").css("overflow", "hidden")
    var s = document.getElementById("timeout");
    var count = 2;
    clearInterval(timer);
    var timer = setInterval(function () {
        count--;
        if (count <= 0) {
            count = 0;
            clearInterval(timer);
            historyForward("../msg/message.html");
        }
        s.innerHTML = count;

    }, 1000);
}

// 获取浏览器数据
function initParams() {
    // doctorId = sessionStorage.getItem("doctorId");
    doctorId = GetQueryStr("doctorId");
    // hospitalId = sessionStorage.getItem("hospitalId");
    hospitalId = GetQueryStr("hospitalId");
    user = JSON.parse(localStorage.getItem("user"));
    token = JSON.parse(localStorage.getItem("user")).token;
    userId = JSON.parse(localStorage.getItem("user")).userId;
    servicePeopleId = sessionStorage.getItem("servicePeopleId");
    sex = sessionStorage.getItem("sex");
    age = sessionStorage.getItem("age");
    if (sessionStorage.getItem("username")) {
        username = sessionStorage.getItem("username")
    };
    sessionStorage.removeItem("textareaContent");
}

function removeItem() {
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("sex");
    sessionStorage.removeItem("age");
    sessionStorage.removeItem("servicePeopleId");
    sessionStorage.removeItem("textareaContent");
}

function uploadPic(picUrl) {
//  var formData = new FormData($("#picUp")[0]);
//  $.ajax({
//      type: 'POST',
//      url: config.appserver_url + '/file/fileUpload.json',
//      data: formData,
//      dataType: 'JSON',
//      async: false,
//      cache: false,
//      contentType: false,
//      processData: false,
//      success: function (data) {
//          var json = {
//              filePath : data.data.filePath,
//              fileBase64: data.data.base64Str
//          }
//          console.log(json)
//          picList[picListSize] = JSON.stringify(json);
//          picListSize++;
//      }
//  });

	var json = {
		filePath: picUrl,
		fileBase64: ''
	}
	console.log(json)
	picList[picListSize] = JSON.stringify(json);
	picListSize++;

};

$("#choicePerson").on("click", function(){
	historyForward("../medic/attendingPerson.html")
});
