// JavaScript Document
var user;
var userId;
var token;
var articleID;

getItem();
init();

function init() {
	var params = {
		id: articleID,
		userId: userId,
		token: token
	};

	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/article/queryArticleDetil.json',
		data: params,
		dataType: 'json',
		contentType: 'application/json',
		success: function(response) {
			tokenLose(response.status);
			console.log(response);
			var data = response.data;
			var doctorNurse = data.doctorNurse;
			$(".content-title-h6").text(doctorNurse.acticleTitle);
			$(".content-title-time").text(dateFormat(doctorNurse.updateTime));
			$(".text-part-p:first").text(doctorNurse.contentAbstract);
			$(".text-part-picture img").attr("src", doctorNurse.picUrl)
			$(".text-part-p:last").text(doctorNurse.content);

		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		}
	})
};

function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	token = user.token;
	userId = user.userId;
	articleID = GetQueryStr("articleID");
}
// ac5c02a157fb4f4ab614bd7634a54933
