var id = GetQueryString("Id");
$(function() {
	if (id != null) {
		ajaxLoading.show();
		$.post("../../information/getInformationById.do", {
			id : id
		}, function(data) {
			ajaxLoading.hide();
			$("#title").val(data.title);
			$("#content").val(data.content);
			$("#select").val(data.type);
			$("#informationid").val(id);
		});
		$("#submitForm").html5Validate(function() {

			var flag = validPicture("#exampleInputFile");
			if (flag == false) {
				$("#exampleInputFile").addClass("error")
				return;
			}
			if ($("#exampleInputFile").val() == '') {
				$("#exampleInputFile").removeAttr("name");
			}
			var select = $("#select").val();
			$("#submitForm").ajaxSubmit({
				url : '../../information/updateInformation.do',
				type : 'post',
				beforeSubmit : function(data) {
					ajaxLoading.show();
				},
				success : function(data) {
					ajaxLoading.hide();
					data = JSON.parse(data);
					if (data.status == 1) {
	            		alert('上传成功')
	            		$("#submitForm").resetForm();
						location.href = "InformationReleaseLList.html?type=" + select;
					}
				},
				error : function(data) {
					ajaxLoading.hide();
					alert("服务繁忙，请稍后再试")
				}
			});

		});



	} else {
		$("#submitForm").html5Validate(function() {
			var flag = validPicture("#exampleInputFile");
			if (flag == false) {
				$("#exampleInputFile").addClass("error")
				return;
			}

			var select = $("#select").val();

			$("#submitForm").ajaxSubmit({
				url : '../../information/addInformation.do',
				type : 'post',
				beforeSubmit : function(data) {
					ajaxLoading.show();
				},
				success : function(data) {
					data = JSON.parse(data);
					ajaxLoading.hide();
					if (data.status == 1) {
	            		alert('上传成功')
	            		$("#submitForm").resetForm();
						location.href = "InformationReleaseLList.html?type=" + select;
					}
				},
				error : function(data) {
					ajaxLoading.hide();
					alert("服务繁忙，请稍后再试")
				}
			});
		});
	}
});

$("#exampleInputFile").on("change", function() {
	validPicture(this)
});

function validPicture(_this) {
	var flag = true;
	var filepath = $(_this).val();
	if (!filepath) {
		if (!id) {
			alert("请选择图片");
			flag = false;
		}
	} else {
		$(_this).removeClass("error")
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
			alert("图片限于bmp,png,gif,jpeg,jpg格式");
			$(_this).addClass("error")
			return false;
		} else {
			$(_this).text(ext)
		}

	}
	return flag;
}