

//初始化参数
var user;
var token;
var userId;


getItem();
init();


// 初始化渲染
function init() {
	var params = {
		userId: userId,
		token: token
	};
	console.log(params)
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/getServicePeople/queryServicePeople.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(data) {
			tokenLose(data.status);
			if(data.data.length == 0){
				$(".patient_list").show();
			}else{
			var patientList = $(".list-ul").html()
			for(var i=0;i<data.data.length;i++){
				patientList+='<li id="li" data-id="'+data.data[i].id+'" class="list-li" style="position: relative;">';
				patientList+='<div class="con">';
				patientList+='<span class="doctorName">'+data.data[i].name+'</span>';
				patientList+='<span class="doctorContent">';
				patientList+='<span>'+data.data[i].sex+'</span> / ';
				patientList+='<span>'+data.data[i].age+'岁</span> / ';
				patientList+='<span>'+data.data[i].mobile+'</span>';
				patientList+='</span>';
				patientList+='</div>';
				patientList+='<div class="btn">删 除</div>';
				patientList+='<div class="shade1" style="position: absolute; width: 100%; height: 100%; top: 0;"></div>';
				patientList+='</li>';
			}
			$(".list-ul").html(patientList)
			}
			slideLeft1();

			//删除用户接口

			$(".btn").on("click",function(){
					var thisBtn = $(this);
					var patientId = $(this).parent().data("id")
					var params = {
						id: patientId,
						token: token
					};
					isDelete(function() {
						$.ajax({
							type: "POST",
							url: config.appserver_url + '/getServicePeople/delServicePeople.json',
							dataType: 'json',
							data: params,
							success: function(data) {
								thisBtn.parent().hide();
							},
							error: function() {
								alert('服务繁忙，请稍后再试！');
							}
						});
						
					})
			});


		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		}
	})
}

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	longitude = sessionStorage.getItem("longitude");
	latitude = sessionStorage.getItem("latitude");
	userId = user.userId;
	token = user.token;
};

$("#addPerson").on("click", function() {
	historyForward("../mine/addPatientMessage.html");
});


