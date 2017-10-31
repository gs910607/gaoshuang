// JavaScript Document
var phone;
var userId;
var token;
var feedbackContent;
getItem();



$(".proposal-content-textraea").on('input propertychange', function() {
	var textraeaContent =$(this).val().length;
//	console.log(textraeaContent)
	var limitWords = 200 - textraeaContent;
	$(".contact_information_number_span").text(limitWords);
	if(limitWords < 0 ){
		$(".contact_information_number").css("color","red")
	}else{
		$(".contact_information_number").css("color","black")
	}

})
$(".contact_information_input").val(user.phone)
// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	phone = user.phone;
    token = user.token;

}
$(".proposal-content-textraea").on('input propertychange',function(){

})
$(".submit-button-a").on("click",function(){
	feedbackContent = $(".proposal-content-textraea").val();
	var parms ={
		feedbackContent : feedbackContent,
		tel:phone,
		userId:userId,
		token:token
	}
	console.log(parms)
	    $.ajax({
        type: "POST",
        url: config.appserver_url + '/feedBack/addFeedBack.json',
        data: parms,
        dataType: 'JSON',
        success: function (data) {
			if(data.status) {
	            alert("评价成功！")
	            setTimeout(function(){
	            	 history.back();
	            },2000)
						} else {
							alert("评价失败")
						}
        },
        error: function () {
            alert("服务繁忙，请稍后再试！");
        }
    });
})
