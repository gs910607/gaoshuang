var id = GetQueryString("Id");
var itemAddEditor;
var newsPicture = false;
var selectType = 1;

function newsPic() {
	if(selectType == 1) {
		newsPicture = true;
	} else {
		newsPicture = false;
	};
	upFileShow();
}

function upFileShow() {
	if(newsPicture) {
		$("#upPic").show();
	} else {
		$("#upPic").hide();
	}
}

//页面初始化完毕后执行此方法
$(function(){
    //创建富文本编辑器
    itemAddEditor = SPYW.createEditor("#content");
    //初始化类目选择和图片上传器
    SPYW.init({fun:function(node){
    }});
});

//初始化渲染类型列表
$(function() {
	$.ajax({
		type: 'GET',
		url: '../../information/getType.do',
		success: function(response) {
			var type = response.type

			$.ajax({ //获取用户权限
				type : 'POST',
				url : '../../area/getCode.do',
				dataType : 'json',
				success : function(response) {
					ajaxLoading.hide();
					if (response != null || response != "") {
						code = response.usergroupid;
						if(code.toString().length == 9){
							type = type.filter(function(value){
								if(value.type == 6 || value.type == 7 || value.type == 8) {
									return value;
								}
							})
						};

						type.map(function(o,i){
							$("#select").append('<option value="'+ o.type +'">'+ o.name +'</option>')
						});

						if(code.toString().length == 9){
							selectType = 6;
							newsPic();
						}

						if(id != null) {
							ajaxLoading.show();
							$.post("../../information/getInformationById.do", {
								id : id
							}, function(data) {
								ajaxLoading.hide();

								if(data == null) {
									alert(config.errorArticleMsg);
									setTimeout(function(){
										location.href = 'informateNav.html';
									},1000)
									return;
								};

								$("#title").val(data.title);
								$("#select").val(data.type);
								$("#informationid").val(id);

								selectType = data.type;
								newsPic();

								setTimeout(function(){
									itemAddEditor.html(data.content);
								})

							});
						}
					}
				},
				beforeSend : function() {
					ajaxLoading.show();
				}
			});
			
		}
	})
	
	if (id != null) {
		$("#submitForm").html5Validate(function() {
			itemAddEditor.sync();

			if(newsPicture) {
				var flag = validPicture("#exampleInputFile");
				if (flag == false) {
					$("#exampleInputFile").addClass("error")
					return;
				}

				if ($("#exampleInputFile").val() == '') {
					$("#exampleInputFile").removeAttr("name");
				}
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
		newsPic();
		
		$("#submitForm").html5Validate(function() {
			itemAddEditor.sync();

			if(newsPicture) {
				var flag = validPicture("#exampleInputFile");
				if (flag == false) {
					$("#exampleInputFile").addClass("error")
					return;
				}
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

// 改变类别时
$("#select").on("change", function() {
	var value = $(this).val();
	if(value == 1) {
		newsPicture = true;
	} else {
		newsPicture = false;
	}
	upFileShow();
});

// 改变图片时
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