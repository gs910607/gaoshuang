var articleId = GetQueryString("articleId");

// 表单验证
$("#html5Form").html5Validate(function() {
	var flag = validPicture("#exampleInputFile");
	if(flag == false) {
		$("#exampleInputFile").addClass("error")
		return;
	}
	var formData = new FormData();
    var messageDigest = $("#messageDigest").val();
    var msgHeader = $("#msgHeader").val();
    var exampleInputFile = $("#messageContent").val();
    formData.append("file",$("#exampleInputFile")[0].files[0]);
    formData.append("messageDigest",messageDigest);
    formData.append("msgHeader",msgHeader);
    formData.append("messageContent",messageContent);

    $.ajax({ 
        url : 'http://www.baidu.com', 
        type : 'POST', 
        data : formData, 
        // 告诉jQuery不要去处理发送的数据
        processData : false, 
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend:function(){
            ajaxLoading.show();
            $("#upStatus").text("上传中,请稍后...").css("color","#ff6600");
        },
        success : function(responseStr) {
            if(responseStr.status===0){
                $("#upStatus").text("上传成功").css("color","green");
                location.href = "videoDetails.html"
            }else{
                $("#upStatus").text("上传失败").css("color","red");
            }
        }, 
        error : function(responseStr) {
        	alert("服务繁忙，请稍后再试")
            ajaxLoading.hide();
            $("#upStatus").text("上传失败").css("color","red");
        },
        completed: function() {
            ajaxLoading.hide();
        }
    });
})

$("#exampleInputFile").on("change", function() {
	validPicture(this)
});

function validPicture(_this) {
	var flag = true;
	var filepath=$(_this).val();
	if(!filepath) {
		if(!articleId) {
			alert("请选择图片");
			flag = false;
		}
	} else {
		$(_this).removeClass("error")
		var extStart=filepath.lastIndexOf(".");
		var ext=filepath.substring(extStart,filepath.length).toUpperCase();
		if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
			alert("图片限于bmp,png,gif,jpeg,jpg格式");
			$(_this).addClass("error")
			return false;
		}else{
			$(_this).text(ext)
		}

	}
	return flag;
} 