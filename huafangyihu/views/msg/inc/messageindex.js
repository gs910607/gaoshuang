var user;
var userId;
var token;

getItem();
init();

function init() {
	var params = {
		userId: "ea8404670be04ee3acbe5b424a2c0cd8",
		token: token
	};
	console.log(params)
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/msg/getMsgByPatientListById.json',
		data: params,
		dataType: 'json',
		success: function(response) {
			console.log(response)
			tokenLose(response.status);
			var data = response.data;
			if(data.length <= 0) {
				$("#nothingInfo").show();
			};

			var str = '';

			for(var i=0; i<data.length; i++) {
				var obj = data[i];
				var portraitIcon;
				var type = obj.type;
				if(type == 1) {portraitIcon = "message-news.png";}
				else if(type == 2) {portraitIcon = "message-remind.png";}
				else if(type == 3) {portraitIcon = "message-news.png";}
				else if(type == 4) {rtraitIcon = "message-news.png";}
				else if(type == 5) {portraitIcon = "message-scince.png";}
				else if(type == 6) {portraitIcon = "message-bell.png";}
				if(obj.type != 1) {
					str += '<li class="message-list-li" data-type="'+ obj.type +'" data-doctorid="'+ obj.doctorId +'">';
	                str += '	<a class="message-list-li-a" href="javascript:;">';
	                str += '    	<div class="message-list-head-portrait head-portrait-orange">';
	                str += '        	<div class="head-portrait-icon">';
	                str += '            	<img src="../../images/'+ portraitIcon +'" alt="">';
	                str += '            </div>';

	                parseInt(obj.num) ? str += '        	<div class="message-reminder"><span class="message-reminder-number">'+ parseInt(obj.num) +'</span></div>' : '';

	                str += '        </div>';
	                str += '        <div class="message-list-text">';
	                str += '        	<h6 class="message-list-text-h6">'+ obj.title +'</h6>';
	                str += '            <p class="message-list-text-p">'+ obj.content +'</p>';
	                str += '        </div>';
	                str += '        <div class="message-list-time">';
	                str += '        	<span class="message-list-time-span">'+ obj.createTime +'</span>';
	                str += '        </div>';
	                str += '    </a>';
	                str += '</li>';
				};
				$("#msgList").html(str);
			};
			$("[data-type=6]").find(".message-list-head-portrait").removeClass("head-portrait-orange");
			$(".message-list-li").on("click", function() {
				var type = $(this).data("type");
				var doctorId = $(this).data("doctorId");
				switch(type) {
					case 1 :
						var chatInfo = {
                doctorNurseId: doctorId
            };
          	sessionStorage.setItem("chatInfo", JSON.stringify(chatInfo));
						location.href = "message.html"  //咨询类
						break;
					case 2 :
						location.href = "messageappointment.html"  //预约类消息
						break;
					case 3 :
						location.href = "messageclinic.html"  //诊所类消息
						break;
					case 4 :
						location.href = "javascript:;" //医护消息
						break;
					case 5 :
						location.href = "messagehealthscience.html"  //健康科普消息
						break;
					case 6 :
						location.href = "messagesystem.html"  //系统消息
				}
			});
		}
	});
};

function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
}
