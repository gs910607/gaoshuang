
var articleId = GetQueryString("id");

//修改时初始化渲染页面
if (articleId) {
	$.ajax({
		type : 'POST',
		url : '../../legal/getLegalById.do',
		data : {
			id : articleId
		},
		dataType : 'json',
		success : function(response) {
			ajaxLoading.hide();
			// 修改时填充数据

			$("#messageDigest").val(response.CLegalType);
			$("#msgHeader").val(response.CLegalTitle);
			$("#messageContent").val(response.CLegalContent);
			$("#LegalId").val(response.CLegalId);
			selectChange();
		},
		error : function() {
			ajaxLoading.hide();
			alert("服务繁忙，请稍后再试")
		},
		beforeSend : function() {
			ajaxLoading.show();
		},
		completed : function() {
			ajaxLoading.hide();
		}
	})
} else {
	selectChange();
}

$("#messageDigest").on("change", function() {
//	$("#upPicture")[0].outerHTML = $("#upPicture")[0].outerHTML;
//	$("#upVideo")[0].outerHTML = $("#upVideo")[0].outerHTML;
	selectChange();
})

function selectChange() {
	var messageDigest = $("#messageDigest").val();

	if (messageDigest !== '' && messageDigest == 0) {
		//图片
		$("#pictureItem").show();
		$("#videoItem").hide();
		$(".videoListWrap").hide();
	} else if (messageDigest !== '' && messageDigest == 1) {
		//视频
		$("#pictureItem").hide();
		$("#videoItem").show();
		$(".videoListWrap").show();
	} else if (messageDigest == '') {
		$("#pictureItem").hide();
		$("#videoItem").hide();
		$(".videoListWrap").hide();
	}
}

// 表单验证
$("#html5Form").html5Validate(function() {
	var messageDigest = $("#messageDigest").val();
	if (messageDigest == 0) {
		//图片
		submitPicture();
	} else if (messageDigest == 1) {
		//视频
		submitVideo();
	}

}, {
	validate : function() {
		var messageDigest = $("#messageDigest").val();
		if (messageDigest == 0) {
			//图片
			var validPic = validPicture("#upPicture");
			if (!validPic) {
				return false;
			}
			;
		} else if (messageDigest == 1) {
			//视频
			var validVid = validVideo("#upVideo");
			if (!validVid) {
				return false;
			}
			;
		}

		return true;
	}
});

// ----------------------------------图片+文字 start-----------------------------------------

// 图片+文字 提交
function submitPicture() {
	var formData = new FormData();
	var cLegalType = $("#messageDigest").val(); //类别
	var cLegalTitle = $("#msgHeader").val(); //标题
	var cLegalContent = $("#messageContent").val(); //内容
	var id = $("#LegalId").val();
	if (id != null && id != "") {
		formData.append("cLegalId", id);
	}
	if ($("#upPicture")[0].files[0] != undefined) {
		formData.append("file", $("#upPicture")[0].files[0]); //图片
	}
	formData.append("cLegalType", cLegalType);
	formData.append("cLegalTitle", cLegalTitle);
	formData.append("cLegalContent", cLegalContent);

	$.ajax({
		url : '../../legal/addLegal.do',
		type : 'POST',
		data : formData,
		// 告诉jQuery不要去处理发送的数据
		processData : false,
		// 告诉jQuery不要去设置Content-Type请求头
		contentType : false,
		beforeSend : function() {
			ajaxLoading.show();
		// $("#upStatus").text("上传中,请稍后...").css("color","#ff6600");
		},
		success : function(responseStr) {
			if (responseStr.status == 1) {
				$("#upStatus").text(responseStr.msg).css("color", "green");
				location.href = "legalPublicityList.html"
			} else {
				$("#upStatus").text(responseStr.msg).css("color", "red");
			}
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		// $("#upStatus").text("上传失败").css("color","red");
		},
		completed : function() {
			ajaxLoading.hide();
		}
	});
}

$("#upPicture").on("change", function() {
	validPicture(this)
});

// 图片验证
function validPicture(_this) {
	var flag = true;
	var filepath = $(_this).val();
	if (!filepath) {
		if (!articleId) {
			$(_this).testRemind("请选择图片");
			flag = false;
		}
	} else {
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
			$(_this).testRemind("图片限于bmp,png,gif,jpeg,jpg格式");
			return false;
		} else {
			$(_this).text(ext)
		}

	}
	return flag;
}
// ----------------------------------图片+文字 end-----------------------------------------



// ----------------------------------视频+文字 start-----------------------------------------

// 视频改变时
$("#upVideo").on("change", function() {
	videoChange(this)
});

function videoChange(_this_) {
	var video = _this_.files[0];
	var flag = validVideo(_this_);
	$("#videoList").html('<tr><td width="700" class="text-left"><div style="width:700px;" class="videoName clearfix"><img style="margin-right:5px;vertical-align:middle;" src="../../images/video-icon.png">' + video.name + '</div></td><td>' + (video.size / 1024 / 1024).toFixed(2) + 'MB</td><td id="upStatus">待上传</td></tr>')
}

// 视频验证
function validVideo(_this) {
	var flag = true;
	var filepath = $(_this).val();
	if (!filepath) {
		if (!articleId) {
			$(_this).testRemind("请选择视频");
			flag = false;
		}
	} else {
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".MP4"&&ext != ".AVI") {
			$(_this).testRemind("视频限于MP4格式");
			return false;
		} else {
			$(_this).text(ext)
		}
	}
	return flag;
}

// 视频+文字 提交
function submitVideo() {
	var formData = new FormData();

	var cLegalType = $("#messageDigest").val(); //类别
	var cLegalTitle = $("#msgHeader").val(); //标题
	var cLegalContent = $("#messageContent").val(); //内容
	var id = $("#LegalId").val();
	if (id != null && id != "") {
		formData.append("cLegalId", id);
	}
	if ($("#upVideo")[0].files[0] != undefined) {
		formData.append("file", $("#upVideo")[0].files[0]); //图片
	}
	formData.append("cLegalType", cLegalType);
	formData.append("cLegalTitle", cLegalTitle);
	formData.append("cLegalContent", cLegalContent);

	$.ajax({
		url : '../../legal/addLegal.do',
		type : 'POST',
		data : formData,
		// 告诉jQuery不要去处理发送的数据
		processData : false,
		// 告诉jQuery不要去设置Content-Type请求头
		contentType : false,
		beforeSend : function() {
			ajaxLoading.show();
			$("#upStatus").text("上传中,请稍后...").css("color", "#ff6600");
		},
		success : function(responseStr) {
			if (responseStr.status == 1) {
				$("#upStatus").text(responseStr.msg).css("color", "green");
				location.href = "videoDetails.html"
			} else {
				$("#upStatus").text(responseStr.msg).css("color", "red");
			}
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
			$("#upStatus").text("上传失败").css("color", "red");
		},
		completed : function() {
			ajaxLoading.hide();
		}
	});
}
;

// ----------------------------------视频+文字 end-----------------------------------------