    var user;
var token;
var userId;

getItem();
init();
initClick();

// 上传头像
function initClick() {
//上传
    $("#logox").on("click", function () {
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

//     点击上传图片
//    $(document).on("click", ".uploadMain-address", function () {
//        $("#file").click();
//    })

};

//弹出拨打
$(".contact-customer-service-tel").on("click", function() {
  $("#phoneShade").show();
  $(".promptBtn > a").on("click", function() {
    $("#phoneShade").hide();
  })
})


// 初始化渲染
function init() {
    var params = {
        userId: userId,
        token: token
    };
    console.log(params)
    $.ajax({
        type: "GET",
        url: config.appserver_url + '/personal/queryUserInfo.json',
        dataType: 'json',
        contentType: 'application/json',
        data: params,
        success: function(response) {
        	console.log(response)
            tokenLose(response.status)
            var data = response.data;
            var myInfo = data.myInfo;
            var capitalAccount = data.capitalAccount;
            console.log(data)
			      var avatar = data.unfiedUser.avatar ? data.unfiedUser.avatar : '../../images/default-header.jpg';
            $("#logox").html('<img id="bgl" style="width:100%;height:100%;" src="'+ avatar +'" alt="">');
            if(!data.unfiedUser.realName){
            	$(".essential-information-name-p").text("请设置姓名");
            }else{
            	$(".essential-information-name-p").text(data.unfiedUser.realName);
            }
            
            $(".my-purse-a-span").text(response.data.capitalAccount.totalAmount ? response.data.capitalAccount.totalAmount: '0');
            $(".myadvisory span").text(data.zixunOrder);
            $(".mysubscribe span").text(data.yuyueOrder);
            $(".myclinic span").text(data.paintHos);
            $(".mymedic span").text(data.paintDoctor);
            skipUrl(data.paintHos,data.paintDoctor);
        },
        error: function() {
            alert('服务繁忙，请稍后再试！');
        }

    })
}

// 获取数据
function getItem() {
    user = JSON.parse(localStorage.getItem("user"));
    userId = user.userId;
    token = user.token;
}

function skipUrl(e,i){
	var paintHos=e;
	$(".myclinic").on("click",function(){
		if(paintHos==0){
			historyForward("../myClinic/clinicSwitchNothing.html");
		}else{
		 historyForward("../mine/mineclinic.html");
		}
	})


    var paintDoctor =i;
   	$(".mymedic").on("click",function(){
		if(paintDoctor==0){
			 historyForward("../mine/mineMedicNothing.html");
		}else{
		  historyForward("../mine/mineMedic.html");
		}
	})
};

$("#diagnosis").on("click", function() {
	historyForward("../mine/diagnosticianHave.html");
});
$(".common-address-name").on("click", function() {
	historyForward("../mine/oftenAddress.html");
});
$(".perfect-essential-information-a").on("click", function() {
	historyForward("../mine/mypersonalinformation.html");
});

if(sessionStorage.getItem("historyArr")) {
	var curPage = ".." + location.href.slice(location.href.indexOf("views")+"views".length);
	var historyArr = sessionStorage.getItem("historyArr").split(",");
	if(curPage !== historyArr[historyArr.length-1]) {
		historyArr.push(curPage);
	};

	sessionStorage.setItem("historyArr", historyArr);
};


$(".my-purse-a").on("click",function(){
	var balance = $(".my-purse-a-span").text();
	window.location.href="minewallet.html?balance="+balance;
})
