$("#addVideo").on("click", function() {
	$("#selectFile").click();
})

$("#selectFile").on("change", function() {

    var flag = validPicture(this);

    if(flag) {
        var video;
        $("#html5Form").ajaxSubmit({
            beforeSubmit:function (data) {
                data.map(function(obj,ind){
                    if(obj.name == "videofile") {
                        video = obj.value;
                    }
                });
                console.log(data)

                return false;
            }
        });

        $("#videoVname").val(video.name ? video.name : video.slice(video.lastIndexOf("\\")+1))
        $("#videoVsize").val(video.size ? ((video.size/1024/1024).toFixed(2))+'MB' : '---')

        
        $("#videoList").html('<tr><td width="350"><div class="videoName clearfix"><img src="../../images/video-icon.png"><span id="vName">'+ (video.name ? video.name : video.slice(video.lastIndexOf("\\")+1)) +'</span></div></td><td><span id="vSize">'+ (video.size ? ((video.size/1024/1024).toFixed(2))+'MB' : '---') +'</span></td><td id="upStatus">待上传</td></tr>')
        $(".videoListWrap").show();
    } else {
        $(".videoListWrap").hide();
    }
})

// 表单验证
$("#html5Form").html5Validate(function() {
    var flag = validPicture("#selectFile");
    if(flag == false) {
        $("#addVideo").addClass("error")
        return;
    }

	var videoDetail=$("#messageContent").val();
	var videoId=GetQueryString("articleId");
	var videoVname=$("#vName").text();
	var videoVsize=$("#vSize").text();
	if(videoDetail==null){
		videoDetail="暂无简介";
	}

    videoId!=null ? $("#videoId").attr('name','videoId') : '';
    videoId!=null ? $("#videoId").val(videoId) : '';

    $("#html5Form").ajaxSubmit({
        url : '/spywBeta/videoTraining/videoTrainSave.do',
        type : 'post',
        data: params,
        beforeSubmit:function (data) {
            ajaxLoading.show();
            $("#upStatus").text("上传中,请稍后...").css("color","#ff6600");
        },
        success:function(data){
            data = JSON.parse(data);
            ajaxLoading.hide();
            if(data.status===0){
                $("#upStatus").text("上传成功").css("color","green");
                var type=GetQueryString("type");
                if(type!=null){
                    setTimeout(function() {
                        location.href = "/spywBeta/videoTraining/videotrainjoin.do?type="+type;
                    },500)
                }else{
                    setTimeout(function() {
                        location.href = "/spywBeta/videoTraining/join.do"
                    },500)
                }
            }else{
                $("#upStatus").text("上传失败").css("color","red");
            };

            $("#html5Form").resetForm();
        },
        error:function (data) {
            ajaxLoading.hide();
            alert("服务繁忙，请稍后再试")
            $("#upStatus").text("上传失败").css("color","red");
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
var videoId=GetQueryString("articleId");
$(function(){
	videoTypeselect();
	
	if(videoId!=null){
		$(".videoListWrap").show();
		videoTrainload(videoId);

	}
});
function videoTypeselect(){
	$.ajax({
	    url:"/spywBeta/videoTraining/videoTypejoin.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:{},    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	$("#messageDigest option").remove();
	    	var list=req.List;
	    	for(var i=0;i<list.length;i++){
	    		$("#messageDigest").append('<option value="'+list[i].videoTypeId+'">'+list[i].videoTypeName+'</option>');
	    	}
	    }
	});
}
function videoTrainload(videoId){
	$.ajax({
	    url:"/spywBeta/videoTraining/videoTrainDetail.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:{"videoId":videoId},    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	$("#messageHeader").val(req.videoTrain.videoName);
	    	$("#messageContent").val(req.videoTrain.videoRemark);
	    	$("#messageDigest").val(req.videoTrain.videoTypeId);
	    	$("#videoList").html('<tr><td width="350"><div class="videoName clearfix"><img src="../../images/video-icon.png"><span id="vName">'+ req.videoTrain.videoVname +'</span></div></td><td><span id="vSize">'+ req.videoTrain.videoVsize +'</span></td><td id="upStatus">已完成</td></tr>')
	    }
	});
}
