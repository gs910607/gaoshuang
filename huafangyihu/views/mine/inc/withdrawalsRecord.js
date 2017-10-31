// JavaScript Document

getItem();
init()

// 初始化渲染
function init() {
	var params = {
		userId: userId,
		userType: "1"
	};
	console.log(params)
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/withdrawal/queryWithdrawalDetail.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(data) {
			console.log(data.data)

if(!data.data.length){
	$("#incarnate").show();
}else{
        var dataList = $(".record_list_ul").html();
        for(var i=0;i<data.data.length;i++){
         var newTime = convertTime(data.data[i].createTime,"","");
         dataList +='<li class="record_list_li">';
         dataList +='<div class="record_list_li_left">';
         dataList +='<h6 class="record_list_li_left_h6">提现</h6>';
         dataList +='<p class="record_list_li_left_p">'+newTime+'</p>';
         dataList +='</div>';
         dataList +='<div class="record_list_li_right">';
         dataList +='<h6 class="record_list_li_right_h6">-'+data.data[i].price+'</h6>';
         judgeStatus(data.data[i].status)
         dataList +='</div>';
         dataList +='</li>';
        }
         $(".record_list_ul").html(dataList);
    }     
         
    function judgeStatus(e) {
	if(e == "0") {
	dataList +='<p class="record_list_li_right_p extract_ing">申请中</p>';
	};
	if(e == "1") {
		
	dataList +='<p class="record_list_li_right_p extract_true">已打款</p>';
	};
	if(e == "2") {
	dataList +='<p class="record_list_li_right_p extract_false">申请失败</p>';
	};
}
		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		}

	})
}



// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	console.log(user)
	userId = user.userId;
	//	name = user.name;
	token = user.token;
}