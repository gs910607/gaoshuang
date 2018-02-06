
var AndriodReqStr;  //安卓返回的用户信息

// if(sessionStorage.getItem("user")){
// 	var json=JSON.parse(sessionStorage.getItem("user"));
// 	$(".userName").text(json.username);
// }

// 政法新闻
$.ajax({
	type : 'POST',
	url : '/xlhaBeta/information/selectFor.do',
	dataType : 'json',
	success : function(response) {
		var str = '';
		$(response.list).each(function(i, n) {
			var obj = n;
			str += '<li><a onfocus="hideDripList()" href="pages/politicsNews/politicsDetails.html?type=1&id=' + obj.informationid + '"><img src="./images/paragraph-icon.png"><div class="itemtext" >' + obj.title + '</div><div class="listInfo pull-right"><span class="itemPer">发布人：' + obj.createname + '</span><span class="itemTime">' + format(obj.createtime) + '</span></div></a></li>';
		});
		$(".contListWrap > ul").html(str);
	}
});

// 书画摄影
$.ajax({
	type : 'POST',
	url : '/xlhaBeta/information/selectDraw.do',
	dataType : 'json',
	success : function(response) {
		var str = '';
		$(response.list).each(function(i, n) {
			var obj = n;
			str += '<li><a onfocus="hideDripList()" href="pages/politicsNews/politicsDetails.html?type=2&id=' + obj.informationid + '"><img src="./images/paragraph-icon.png">' + obj.title + '</a></li>';
		});
		$(".rightList > ul").html(str);
	}
});

function add0(m) {
	return m < 10 ? '0' + m : m
}
function format(timestamp) {
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	return year + '-' + add0(month) + '-' + add0(date);
}


// $("#logout").on("click",function(){
	
// 	$.post("/xlhaBeta/admin/logout.do",function(data){
		
// 		if(data.status==1){
// 			alert(data.msg);
// 			sessionStorage.removeItem("user");
// 			window.location.reload();
// 		}
		
// 	});
	
// });
AndroidAction.checkLoginStatus();

function receiveLoginInfo(userJsonStr){
	AndriodReqStr = userJsonStr;
	sessionStorage.setItem("user", JSON.stringify(userJsonStr));

	if(!!AndriodReqStr && AndriodReqStr.userid) {
		$(".loginWrap").show();
	} else {
		$(".loginWrap").hide();
	}

}

function callJs() {
	location.reload();
}

$("#videourl ,#online ,#opinion").on("click",function(){
	if(!!AndriodReqStr && AndriodReqStr.userid) {
		if(this.id == "online"){
			location.href = "./pages/onlineEvaluating/onlineEvaluatingList.html";
		}else if(this.id == "opinion"){
			location.href = "./pages/opinionSurvey/opinionSurveyList.html";
		}else if(this.id == "videourl") {
			AndroidAction.openVideo();
		}
	} else {
		AndroidAction.openLogin(); //跳到登录页
	}
});

$("#loginIn").on("click", function() {
	AndroidAction.openLogin(); //跳到登录页
});

$("#loginOut").on("click", function() {
	AndroidAction.logout()
	sessionStorage.removeItem("user")
	alert("退出成功");
	location.reload();
})


// var index = function(){
// 	var user = JSON.parse(sessionStorage.user||null);
// 	// AndroidAction.openVideo();
// 	// console.log(user)
// 	var _init = function(){
// 		//对视频 监控 调查 登陆判断处理
// 		$("#videourl ,#online ,#opinion").on("click",function(){
// 			// AndroidAction.openLogin();
// 			AndroidAction.checkLoginStatus()

// 			function receiveLoginInfo(userJsonStr){
// 				alert("userInfo:" + userJsonStr)
// 				// if(userJsonStr) {
// 				// 	if(this.id == "online"){
// 				// 		window.location.href = "./pages/onlineEvaluating/onlineEvaluatingList.html"
// 				// 	}else if(this.id == "opinion"){
// 				// 		window.location.href = "./pages/opinionSurvey/opinionSurveyList.html"
// 				// 	} else if(this.id == "videourl") {
// 				// 		AndroidAction.openVideo()
// 				// 	}
// 				// } else {
// 				// 	AndroidAction.openLogin(); //调到登录页
// 				// }
// 			}

// 			// if(user && user.username){
// 			// 	if(this.id == "online"){
// 			// 		window.location.href = "./pages/onlineEvaluating/onlineEvaluatingList.html"
// 			// 	}else if(this.id == "opinion"){
// 			// 		window.location.href = "./pages/opinionSurvey/opinionSurveyList.html"
// 			// 	} else if(this.id == "videourl") {

// 			// 	}else{
// 			// 		window.location.href = "index.html"
// 			// 	}
// 			// }else{
// 			// 	var confirmdata = confirm("您没有登陆,登陆后才能进入,是否登录?");
// 			// 	if(confirmdata){
// 			// 		window.location.href = "./pages/administrator/register.html"
// 			// 	}
				
// 			// }
// 		});
// 		//登陆头像
// 		// $(".userIcon img").css({cursor: "pointer"});
// 		// $(".usernameWrap").on("click",function(){
// 		// 	if(!user || !user.username){
// 		// 		window.location.href = "./pages/administrator/register.html"
// 		// 	}
// 		// });
// 		// //普通用户 村级单位 移除用户管理
// 		// if(user){
// 		// 	if(user.userlevel > 2 ){
// 		// 		$(".droplist li:nth-child(2)").remove();
// 		// 	}
// 		// }else{
// 		// 	$(".droplist li:nth-child(2)").remove();
// 		// }
		
// 		// $(".usernameWrap").on("mouseenter focus",function() {
// 		// 	if(user && user.username){
// 		// 		$(".droplist").show();
// 		// 	}else{
// 		// 		$(".droplist").hide();
// 		// 	}
// 		// });

// 		// $(".usernameWrap").on("mouseleave", function() {
// 		// 	$(".droplist").hide();
// 		// })

// 		// $("section a,.onekey, footer a").on("mouseenter focus", function(){
// 		// 	hideDripList();
// 		// })
// 	}
	
// 	return {
		
// 		init: function(){
// 			_init();
// 		}
// 	}
	
// }()

// function hideDripList() {
// 	$(".droplist").hide();
// }

// $(function(){
// 	//初始化,对视频 监控 调查 判断处理 及 登陆头像处理
// 	index.init();
// })
