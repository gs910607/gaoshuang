var videoId = GetQueryString("articleId");
if(videoId) {
    $(".videoListWrap").show();
}

$("#addVideo").on("click", function() {
	$("#selectFile").click();
})

$("#selectFile").on("change", function() {
    var video = this.files[0];
    var flag = validPicture(this);
    $("#videoList").html('<tr><td width="350"><div class="videoName clearfix"><img src="../../images/video-icon.png">'+ video.name +'</div></td><td>'+ (video.size/1024/1024).toFixed(2) +'MB</td><td id="upStatus">待上传</td></tr>')
    $(".videoListWrap").show();
})

// 表单验证
$("#html5Form").html5Validate(function() {
    var flag = validPicture("#selectFile");
    if(flag == false) {
        $("#addVideo").addClass("error")
        return;
    }

    var formData = new FormData();
    var messageDigest = $("#messageDigest").val();
    var messageHeader = $("#messageHeader").val();
    var messageContent = $("#messageContent").val();
    formData.append("file",$("#selectFile")[0].files[0]);
    formData.append("messageDigest",messageDigest);
    formData.append("messageHeader",messageHeader);
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

function validPicture(_this) {
    var flag = true;
    var filepath=$(_this).val();
    if(!filepath) {
        if(!videoId) {
            alert("请选择视频");
            flag = false;
        }
    } else {
        $("#addVideo").removeClass("error")
        var extStart=filepath.lastIndexOf(".");
        var ext=filepath.substring(extStart,filepath.length).toUpperCase();
        if(ext!=".MP4"){
            alert("视频限于MP4格式");
            $("#addVideo").addClass("error")
            return false;
        }else{
            $(_this).text(ext)
        }

    }
    return flag;
}