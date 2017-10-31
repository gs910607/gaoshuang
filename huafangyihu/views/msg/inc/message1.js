/**
 * Created by XuanMing on 2017/4/7.
 */
///弹出确认取消
$(".dialogue").on("click", function() {
	$("#modalOut").css("display", "none");
	$("#modalOut").css("display", "block");
	var modalWidth = $(document).width();
	var modalHeight = $(document).height();
	$("#modalOut").css("background-color", "#111111");
	$("#modalOut").width(modalWidth);
	$("#modalOut").height(modalHeight);
	$("#orderMain").css("display", "block");
	//禁用滚动条事件
	$("body").css("overflow", "hidden");

	$("#orderMain-close").on("click", function() {
		$("#orderMain").css("display", "none");
		$("#modalOut").css("display", "none");
		$("body").css("overflow", "auto");
		$("#model").css("display", "none");

	});

	//模态框弹出层
	$("#attention-img-yes").on("click", function() {
		$("#modalOut").css("display", "block");
		var modalWidth = $(document).width();
		var modalHeight = $(document).height();
		$("#modalOut").width(modalWidth);
		$("#modalOut").height(modalHeight);
		$("#modalOut").css("background-color", "#111111");
		$("#modal-div").css("display", "block");
		$("#modal-div").css("background-color", "white");
	});
	$("#modal-div-second").on('click', function() {
		$("#modal-div").css("display", "none");
		$("#modalOut").css("display", "none");
	});
	$("#modal-div-three").on('click', function() {
		$("#modal-div").css("display", "none");
		$("#modalOut").css("display", "none");
	})

});

//蒙版层高度
var windowHeight = $(window).height();
console.log(windowHeight)
$("#model").css("height", windowHeight);
var user; //用户信息
var chatInfo; //咨询信息
var doctorId; //医生ID
var targetId
var serviceOrder; //订单信息
//var baseImg //图片转成base的格式；
$(function() {
	initParams(); //初始化参数
	initClick(); //绑定点击事件
	initPages(); //初始化页面
	initChat(); //初始化融云聊天插件
	sendMsg(); //绑定消息发送按钮

});

function initParams() {
	user = JSON.parse(localStorage.getItem("user"));
	chatInfo = JSON.parse(sessionStorage.getItem("chatInfo"));
	doctorId = sessionStorage.getItem("doctorId");
	serviceOrder = sessionStorage.getItem("serviceOrder");
	targetId = sessionStorage.getItem("targetId");
}

function initClick() {
	$(".synopsis-icon").on("click", function() {
		sessionStorage.setItem("doctorId", doctorId);
		historyForward("../medic/medicIndex.html?doctorId=" + doctorId);
	});
	$("#magnifyImg").on("click", function() {
		$("#deleteImg").css("display", "none");
		$("#model").css("display", "none");
		$("#magnifyImg").css("display", "none");
	});
	$("#deleteImg").on("click", function() {
		$("#deleteImg").css("display", "none");
		$("#model").css("display", "none");
		$("#magnifyImg").css("display", "none");
	});
	$("#stop").on("click", function() {
		$("#model").css("display", "block");
	});
	$("#send").on("click", function() {
		var content = $("#content").html();
		sendMsg(content);
	});
	//$("#model").on("click", function () {
	//    $("#deleteImg").css("display", "none");
	//    $(this).css("display", "none");
	//    $("#magnifyImg").css("display", "none");
	//});

	$("#orderMain-confirm").on("click", function() {
		$.ajax({
			type: 'POST',
			url: config.appserver_url + "/order/closeOrder.json",
			data: {
				token: user.token,
				orderNo: serviceOrder
			},
			dataType: 'JSON',
			success: function(data) {
				tokenLose(data.status);
				if(data.status == "1") {
					timer();
				}
			}
		});
		$("#orderMain").css("display", "none");
		$("#modalOut").css("display", "none");
		$("body").css("overflow", "auto");
		$("#model").css("display", "none");

		//      $("#returnMain").show();
	});

}

function initChat() {
	//初始化
	RongIMClient.init("pgyu6atqpfvmu");
	//设置状态监听器
	RongIMClient.setConnectionStatusListener({
		onChanged: function(status) {
			switch(status) {
				//链接成功
				case RongIMLib.ConnectionStatus.CONNECTED:
					console.log('链接成功');
					break;
					//正在链接
				case RongIMLib.ConnectionStatus.CONNECTING:
					console.log('正在链接');
					break;
					//重新链接
				case RongIMLib.ConnectionStatus.DISCONNECTED:
					console.log('断开连接');
					break;
					//其他设备登录
				case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
					console.log('其他设备登录');
					break;
					//网络不可用
				case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
					console.log('网络不可用');
					break;
			}
		}
	});

	//  // 消息监听器
	//  RongIMClient.setOnReceiveMessageListener({
	//      // 接收到的消息
	//      onReceived: function (message) {
	//          // 判断消息类型
	//          switch (message.messageType) {
	//              case RongIMClient.MessageType.TextMessage:
	//                  // 发送的消息内容将会被打印
	//                  console.log(message.content.content);
	//                  var $msgContent = $("#msg_content");
	//                  var $msg_left = $msgContent.find("#msg_content_left").clone();
	//                  $msg_left.css("display", "block");
	//                  $msg_left.find("img").attr("src", user.avatar);
	//                  $msg_left.find(".dialogTime").html(dateFormat(message.sentTime));
	//                  $msg_left.find("#content_left").html(message.content.content);
	//                  $msgContent.append($msg_left);
	//                  break;
	//              default:
	//          }
	//      }
	//  });
	//医护的头像
	var doctorImg = $(".synopsis-person>img").attr("src")
	// 消息监听器
	RongIMClient.setOnReceiveMessageListener({
		// 接收到的消息
		onReceived: function(message) {
			// 判断消息类型
			switch(message.messageType) {
				case RongIMClient.MessageType.TextMessage:
					// message.content.content => 消息内容
					// 发送的消息内容将会被打印
					console.log(message.content.content);
					var $msgContent = $("#msg_content");
					var $msg_left = $msgContent.find("#msg_content_left").clone();
					$msg_left.css("display", "block");
					$msg_left.find("img").attr("src", doctorImg);
					$msg_left.find(".dialogTime").html(dateFormat(message.sentTime));
					$msg_left.find("#content_left").html(message.content.content);
					$msgContent.append($msg_left);
					break;
				case RongIMClient.MessageType.VoiceMessage:
					// 对声音进行预加载
					// message.content.content 格式为 AMR 格式的 base64 码
					break;
				case RongIMClient.MessageType.ImageMessage:
					// message.content.content => 图片缩略图 base64。
					// message.content.imageUri => 原图 URL。
					var $msgContent = $("#msg_content");
					var $msg_left = $msgContent.find("#msg_content_left").clone();
					$msg_left.css("display", "block");
					$msg_left.find("img").attr("src", doctorImg);
					$msg_left.find(".dialogTime").html(dateFormat(message.sentTime));
					var img = '<div class="consultImg" ><img class="imagesContent" data-base64="" src="' + message.content.imageUri + '"></div>'
					$msg_left.find("#content_left").html(img);
					$msgContent.append($msg_left);
					$(".consultImg").parent().parent().parent().addClass("imgMaxWidth-judge");
					$(".imagesContent").on("click", function() {
						var imgSrc = $(this).attr("src");
						$("<div onclick='this.remove()' class='corner'><img src='" + imgSrc + "' alt=''></div>").appendTo("body");
					});
					break;
			}
		}
	});
	// 连接融云服务器
	RongIMClient.connect(user.rongCloudToken, {
		onSuccess: function(userId) {
			console.log("Login successfully." + userId);
			var conversationType = RongIMLib.ConversationType.PRIVATE; //私聊.
			var targetIds = targetId; // 目标 Id
			var timestrap = 0; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
			var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
			RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetIds, timestrap, count, {
				onSuccess: function(list, hasMsg) {
					console.log(list);
					for(var i = 0; i < list.length; i++) {

						if(list[i].senderUserId != user.phone) {
							var $msgContent = $("#msg_content");
							var $msg_left = $msgContent.find("#msg_content_left").clone();
							$msg_left.css("display", "block");
							$msg_left.find("img").attr("src", user.avatar);
							$msg_left.find(".dialogTime").html(dateFormat(list[i].sentTime));
							if(list[i].messageType == "TextMessage") {
								$msg_left.find("#content_left").html(list[i].content.content);
							} else if(list[i].messageType == "ImageMessage") {
								var img = '<div class="consultImg" ><img class="imagesContent" data-base64="" src="' + list[i].content.imageUri + '"></div>'
								$msg_left.find("#content_left").html(img);
							}
							$msgContent.append($msg_left);
							// list => Message 数组。
							// hasMsg => 是否还有历史消息可以获取。
						} else {
							var $msgContent = $("#msg_content");
							var $msg_right = $msgContent.find("#msg_content_right").clone();
							$msg_right.css("display", "block");
							$msg_right.find("img").attr("src", user.avatar);
							$msg_right.find(".dialogTime").html(dateFormat(list[i].sentTime));
							if(list[i].messageType == "TextMessage") {
								$msg_right.find("#content_right").html(list[i].content.content);
							} else if(list[i].messageType == "ImageMessage") {
								var img = '<div class="consultImg" ><img class="imagesContent" data-base64="" src="' + list[i].content.imageUri + '"></div>'
								$msg_right.find("#content_right").html(img);
							}
							$msgContent.append($msg_right);
						}
					}
					$(".consultImg").parent().parent().parent().addClass("imgMaxWidth-judge");
					$(".imagesContent").on("click", function() {
						var imgSrc = $(this).attr("src");
						$("<div onclick='this.remove()' class='corner'><img src='" + imgSrc + "' alt=''></div>").appendTo("body");
					});
				},
				onError: function(error) {
					console.log("GetHistoryMessages,errorcode:" + error);
				}
			});
		},
		onTokenIncorrect: function() {
			console.log('token无效');
		},
		onError: function(errorCode) {
			var info = '';
			switch(errorCode) {
				case RongIMLib.ErrorCode.TIMEOUT:
					info = '超时';
					break;
				case RongIMLib.ErrorCode.UNKNOWN_ERROR:
					info = '未知错误';
					break;
				case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
					info = '不可接受的协议版本';
					break;
				case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
					info = 'appkey不正确';
					break;
				case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
					info = '服务器不可用';
					break;
			}
			console.log(errorCode);
		}
	});
}
//发送图片消息
function sendMsgImg(filePathUrl, base64Str) {
	var base64Str = base64Str;
	var imageUri = filePathUrl; // 上传到自己服务器的 URL。
	var msg = new RongIMLib.ImageMessage({
		content: base64Str,
		imageUri: imageUri
	});
	console.log(msg);
	var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊,其他会话选择相应的消息类型即可。
	//	var targetId = targetId; // 目标 Id
	RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
		onSuccess: function(message) {
			//message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
			console.log(message);
			console.log("Send successfully");
			var consultationRequest = {
				token: user.token,
				picUrl: message.content.imageUri,
				createTime: new Date().getTime(),
				type: 1,
				serviceOrderNo: serviceOrder,
				patientId: user.userId,
				doctorNurseId: doctorId,
				senderId: user.userId
			}
			uploadMsg(consultationRequest); //上传咨询信息到服务器
			var $msgContent = $("#msg_content");
			var $msg_right = $msgContent.find("#msg_content_right").clone();
			$msg_right.css("display", "block");
			$msg_right.find("img").attr("src", user.avatar);
			$msg_right.find(".dialogTime").html(dateFormat(chatInfo.sentTime));
			var img = '<div class="consultImg" ><img class="imagesContent" data-base64="" src="' + imageUri + '"></div>'
			$msg_right.find("#content_right").html(img);
			$msgContent.append($msg_right);
			$(".consultImg").parent().parent().parent().addClass("imgMaxWidth-judge")

			var scrollTop = $("#msg_content")[0].scrollHeight;
			//延迟100ms刷新动画
			$("body").animate({
				"scrollTop": scrollTop
			}, 100);

			//点击放大图片
			$(".imagesContent").on("click", function() {
				var imgSrc = $(this).attr("src");
				$("<div onclick='this.remove()' class='corner'><img src='" + imgSrc + "' alt=''></div>").appendTo("body");
			});
		},
		onError: function(errorCode, message) {
			var info = '';
			switch(errorCode) {
				case RongIMLib.ErrorCode.TIMEOUT:
					info = '超时';
					break;
				case RongIMLib.ErrorCode.UNKNOWN_ERROR:
					info = '未知错误';
					break;
				case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
					info = '在黑名单中，无法向对方发送消息';
					break;
				case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
					info = '不在讨论组中';
					break;
				case RongIMLib.ErrorCode.NOT_IN_GROUP:
					info = '不在群组中';
					break;
				case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
					info = '不在聊天室中';
					break;
				default:
					info = x;
					break;
			}
			console.log('发送失败:' + info);
		}
	});
}

function sendMsg(content) {
	// 发送消息
	if(!Validator.validateNull(content)) {
		var msg = new RongIMLib.TextMessage({
			content: content,
			extra: "附加信息"
		});
		var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
		//          var targetId = "xxx"; // 目标 Id
		RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
			// 发送消息成功
			onSuccess: function(message) {
				//message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
				console.log("Send successfully");
				console.log(message);
				var consultationRequest = {
					token: user.token,
					content: message.content.content,
					createTime: new Date().getTime(),
					type: 0,
					serviceOrderNo: serviceOrder,
					patientId: user.userId,
					doctorNurseId: doctorId,
					senderId: user.userId
				}
				uploadMsg(consultationRequest); //上传咨询信息到服务器
				var $msgContent = $("#msg_content");
				var $msg_right = $msgContent.find("#msg_content_right").clone();
				$msg_right.css("display", "block");
				$msg_right.find("img").attr("src", user.avatar);
				$msg_right.find(".dialogTime").html(dateFormat(message.sentTime));
				$msg_right.find("#content_right").html(message.content.content);
				$msgContent.append($msg_right);
				$("#content").html("");

				var scrollTop = $("#msg_content")[0].scrollHeight;
				//延迟100ms刷新动画
				$("body").animate({
					"scrollTop": scrollTop
				}, 100);
			},
			onError: function(errorCode, message) {
				var info = '';
				switch(errorCode) {
					case RongIMLib.ErrorCode.TIMEOUT:
						info = '超时';
						break;
					case RongIMLib.ErrorCode.UNKNOWN_ERROR:
						info = '未知错误';
						break;
					case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
						info = '在黑名单中，无法向对方发送消息';
						break;
					case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
						info = '不在讨论组中';
						break;
					case RongIMLib.ErrorCode.NOT_IN_GROUP:
						info = '不在群组中';
						break;
					case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
						info = '不在聊天室中';
						break;
					default:
						info = x;
						break;
				}
				console.log('发送失败:' + info);
			}
		});
	}
}

function initPages() {
	// 初始化医护简介
	var params = {
		doctorId: doctorId,
		//      doctorId: "zk1",
		token: user.token
	};
	console.log(params)
	$.ajax({
		type: "get",
		data: params,
		url: config.appserver_url + "/doctorNurse/queryDocInfoWhereAsk.json",
		dataType: "json",
		async: true,
		success: function(data) {
			console.log(data)
			tokenLose(data.status);
			if(!Validator.validateNull(data)) {
				$(".doctor-name").html(data.data.realName);
				calculateScore(data.data.score, $(".evaluateNumber"), 5);
				$(".evaluateNumber-number").html(data.data.score + "分");
				$(".doctor-main").html(data.data.title);
				$(".doctor-major").html(data.data.hdtName);
				$("#workYear").html(data.data.workYear + "年经验");
				$(".synopsis-person").find("img").attr("src", data.data.avatar || defaultVar.onerrorImg);
			}
		}
	});
}

function timer() {
	$("#returnMain").show();
	var s = $("#returnMain-first > p > span");
	var count = 2;
	clearInterval(timer)
	var timer = setInterval(function() {
		count--;
		if(count <= 0) {
			count = 0;
			// window.location.href=""
			$("#returnMain").hide();
			historyBack();
		};
		s.text(count)
	}, 1000)
};
//点击拍照
$("#upload_photo").on("click", function() {
	//  weixinUpImages();
	$("#testFile").click();
	$("#file").click();
})
//点击上传
$("#upload_image").on("click", function() {

	$("#testFile").click();
	$("#file").click();
})
//点击录音
$("#upload_voice").on("click", function() {

	//	$("#testFile").click();
	//	$("#file").click();
})

$("#goBack").on("click", function() {
	historyBack();
});

//转化base64;
$("#testPhone").click(function() {
	$("#testFile").click(function() {
		uploadPic();
	});
});
//$.ajax({
//	url: "/usercenter/testbaseaction",
//	type: "post",
//	dataType: "json",
//	data: {
//		"content": $("#testArea").val(),
//	},
//	async: false,
//	success: function(result) {
//		if(result.Code == 200) {
//			alert(result.Data);
//		} else {}
//	}
//});

//上传图片到自己的服务器
function uploadPic() {
	var formData = new FormData($("#picUp")[0]);
	$.ajax({
		type: 'POST',
		url: config.appserver_url + '/file/fileUpload.json',
		data: formData,
		dataType: 'JSON',
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
			var filePathUrl = data.data.filePath;
			var base64Str = data.data.base64Str;
			sendMsgImg(filePathUrl, base64Str);
		}
	});
};

//上传消息到自己的服务器
function uploadMsg(params) {
	$.ajax({
		type: 'POST',
		url: config.appserver_url + "/consultation/uploadConsultationInfo.json",
		data: JSON.stringify(params),
		dataType: 'JSON',
		contentType: 'application/json',
		success: function(data) {
			return data;
		},
		error: function() {}
	});
}

//转化图片格式
function convertImgToBase64(url, callback, outputFormat) {
	var canvas = document.createElement('CANVAS'),
		ctx = canvas.getContext('2d'),
		img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
		callback.call(this, dataURL);
		canvas = null;
	};
	img.src = url;
}

convertImgToBase64('http://bit.ly/18g0VNp', function(base64Img) {
	// Base64DataURL
});