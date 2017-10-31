// JavaScript Document
var user;
var userId;
var token;
var pageNo = 1;
var pageSize = 7;

getItem();
init();

function init() {
	var params = {
		userId: userId,
		token: token,
		pageNo: pageNo,
		pageSize: pageSize
	};
console.log(params);
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/msg/getMsgByPatientMsgHospVoListByUserId.json',
		data: params,
		dataType: 'json',
		contentType: 'application/json',
		success: function(response) {
			tokenLose(response.status);
			console.log(response)
			var data = response.data;
			var str = '';
			for(var i=0; i<data.length; i++) {
				var obj = data[i];
				str +='<div class="reminder-message">';
			    str +='  <div class="reminder-time">'+ obj.createTime +'</div>';
			    str +='  <div class="reminder-message-details">';
			    str +='    <div class="reminder-message-details-title">';
			    str +='      <h6 class="reminder-message-details-title-h6">'+ obj.title +'</h6>';
			    str +='    </div>';
			    str +='    <div class="reminder-message-details-content">';
			    str +='      <p class="reminder-content-p">'+ obj.content +'</p>';
			    str +='      <p class="reminder-content-p2"><span>备注：</span>'+ obj.remark   +'</p>';
			    str +='    </div>';
			    str +='    <div class="reminder-message-details-see">';
			    str +='      <a href="javascript:;">';
			    str +='        <p class="reminder-message-details-see-p">'+ obj.hospName +'</p>';
			    str +='      </a>';
			    str +='    </div>';
			    str +='  </div>';
			    str +='</div>';
			};
			$("#messageList").html(str);
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	})
};

function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
};