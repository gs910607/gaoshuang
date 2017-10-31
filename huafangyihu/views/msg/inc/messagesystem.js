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

	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/msg/getMsgByPatientMsgSystemVoListByUserId.json',
		data: params,
		dataType: 'json',
		contentType: 'application/json',
		success: function(response) {
			console.log(response)
			tokenLose(response.status);
			var data = response.data;
			var str = '';
			for(var i=0; i< data.length; i++) {
				var obj = data[i];
				str += '<div class="reminder-message">'
				str += '  <div class="reminder-time"><span>'+ obj.createTime +'</span></div>';
    			str += '  <div class="reminder-message-details">';
    			str += '	<div class="reminder-message-details-title">';
    			str += '    	<h6 class="reminder-message-details-title-h6">'+ obj.title +'</h6>';
    			str += '    </div>';
    			str += '    <div class="reminder-message-details-picture">';
    			str += '    	<img src="'+ obj.pic +'" alt="">';
    			str += '    </div>';
    			str += '    <div class="reminder-message-details-content">';
    			str += '    	<p class="reminder-content-p">'+ obj.content;
    			// str += '      &nbsp;&gt;</a></span>，您的个人信息只有您的医生可见，请放心填写！</p>';
    			// str += '        ';
    			str += '    </div>';
    			str += '    <div class="reminder-message-details-see" data-activeId="'+ obj.activeId +'">';
    			str += '      <a href="javascript:;">';
    			str += '    	<p class="reminder-message-details-see-p">查看详情</p>';
    			str += '        <span class="reminder-message-details-see-arrow"><img src="../../images/more-black.png" alt=""></span>';
    			str += '      </a>';
    			str += '    </div>';
    			str += '  </div>';
    			str += '</div>';
			};
			$("#messageList").html(str);

			$(".reminder-message-details-see").on('click', function() {
				var activeId = $(this).data("activeId");
				location.href = 'messagedetails.html?articleID=' + activeId;
			});
		}
	})
};



function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
};
