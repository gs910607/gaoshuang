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
		url: config.appserver_url + '/msg/getMsgByPatientMsgAppointmentVoListByUserId.json',
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
			    str +='  <div class="reminder-time"><span>'+ obj.createTime +'</span></div>';
			    str +='  <div class="reminder-message-details">';
			    str +='    <div class="reminder-message-details-title">';
			    str +='      <h6 class="reminder-message-details-title-h6">'+ obj.title +'</h6>';
			    str +='    </div>';
			    str +='    <div class="reminder-message-details-content">';
			    str +='      <p class="reminder-content-p">'+ obj.content +'</p>';
			    // str +='      <p class="reminder-content-p2">感谢您使用居家医护！您的健康，我们为您保驾护航。</p>';
			    str +='    </div>';
			    str +='    <div class="reminder-message-details-see" data-orderno="'+ obj.orderNo +'">';
			    str +='      <a href="javascript:;">';
			    str +='        <p class="reminder-message-details-see-p">查看详情</p>';
			    str +='        <span class="reminder-message-details-see-arrow"><img src="../../images/more-black.png" alt=""></span>';
			    str +='      </a>';
			    str +='    </div>';
			    str +='  </div>';
			};

			$(".reminder-message").html(str);

			$(".reminder-message-details-see").on("click", function() {
				var orderNo = $(this).data("orderno");
				// location.href = "../myClinic/payment.html?orderNo=" + orderNo;
			})
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
