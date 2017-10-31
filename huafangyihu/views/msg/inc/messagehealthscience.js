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
        url: config.appserver_url + '/msg/getMsgByPatientMsgHealthyVoListByUserId.json',
        data: params,
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            tokenLose(response.status);
            console.log(response)
            var data = response.data;
            var str = '';

            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                str += '<div class="reminder-time"><span>' + obj.createTime + '</span></div>';
                str += '<div class="reminder-message-details">';
                str += ' 	<div class="reminder-message-details-title">';
                str += '     	<h6 class="reminder-message-details-title-h6"><span class="reminder-message-details-title-span">' + obj.title + '</h6>';
                str += '   </div>';
                str += '   <div class="reminder-message-details-content">';
                str += '      <p class="reminder-content-p2">' + obj.content + '</p>';
                str += '   </div>';
                str += '   <div class="reminder-message-details-see" data-articleid="' + obj.articleID + '" onclick="goDeatil(this)">';
                str += '      <input type="hidden" value="' + obj.articleID + '" id="articleID"/>';
                str += '      <a href="javascript:;">';
                str += '         <p class="reminder-message-details-see-p">查看详情</p>';
                str += '         <span class="reminder-message-details-see-arrow"><img src="../../images/more-black.png" alt=""></span>';
                str += '      </a>';
                str += '   </div>';
                str += '</div>';
            }
            $(".reminder-message").html(str);

        },
        error: function () {
            alert("服务繁忙，请稍后再试！")
        }
    })
};

function getItem() {
    user = JSON.parse(localStorage.getItem("user"));
    userId = user.userId;
    token = user.token;
};

function goDeatil(detail) {
    var id = $(detail).find("#articleID").val();
    location.href = 'messagedetails.html?articleID=' + id;
}
