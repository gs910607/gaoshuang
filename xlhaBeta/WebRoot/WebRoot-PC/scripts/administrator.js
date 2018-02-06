$(function() {

	$.post("/xlhaBeta/admin/getPageList.do",{sizePage: config.sizePage}, function(data) {
		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page2'), //指定的元素
			callback : function(n) { //回调函数
				$.post("../../admin/getPageList.do?pages=" + n,{sizePage: config.sizePage}, function(data) {
					
					setAdmin(data);
				})
			}
		});
		setAdmin(data);
	})
});

$("#searchBtn").on("click", function() {

	$.post("/xlhaBeta/admin/getPageList.do", {
		sizePage: config.sizePage,
		district : $("#district").val(),
		county : $("#county").val(),
		village : $("#village").val(),
		username : $("#listCount").val(),
		userlevel : $("#auth1").val(),
		realname : $("#listName").val(),
		usertel : $("#listPhone").val(),
	}, function(data) {
		Page({
			num : data.num, //页码数
			startnum : 1, //指定页码
			elem : $('#page2'), //指定的元素
			callback : function(n) { //回调函数
				$.post("/xlhaBeta/admin/getPageList.do?pages=" + n, {
					sizePage: config.sizePage,
					district : $("#district").val(),
					county : $("#county").val(),
					village : $("#village").val(),
					username : $("#accountNumber").val(),
					userlevel : $("#auth1").val(),
					realname : $("#username").val(),
					usertel : $("#telephone").val(),
				}, function(data) {
					setAdmin(data);
				})
			}
		});
		setAdmin(data);

	})


});


function setAdmin(data) {
	$("#content").text("");
	$(data.list).each(function(i, n) {
		if (i < 10) {
			$("#content").append("<tr><td></td><td>"
				+ n.username + "</td><td class='text-left'><p>"
				+ checkName(n.areas) + "</p></td><td>"+n.auth+"</td><td>"
				+ (n.realname==null?"":n.realname) + "</td><td>" + (n.usertel==null?"":n.usertel) + "</td>" +
				"<td class='operation'><a class='modification' onclick='modification(\""+n.userid+"\")' href='javascript:;'>" +
				"<img src='../../images/modification.png'></a><a class='delete' onclick='deleteAdmin(\""+n.userid+"\")' href='javascript:;''>" +
				"<img src='../../images/delete.png'></a></td></tr>");
		}
	});
}
function checkName(area){
	if(area!=null){
		return area.name;
	}else{
		return "市级";
	}
}

function deleteAdmin(id){
	if(confirm("是否确定删除该用户？")) {
		$.post("/xlhaBeta/admin/deleteAdmin.do",{id:id},function(respose){
			if (respose.status == 1) {
				alert(respose.msg);
				window.location.reload();
			} else {
				alert(respose.msg);
			}
		});
	}
	
}
// --------------------新增 start-----------------------------

var limitsList = [];

// 新增
$("#addInfo").on("click", function() {
	$("#infoFormDialog h4").text("新增用户");
	$("input#accountNumber").val("");
	$("input#password").val("");
	$("#infoFormDialog input").val("").attr("disabled",false);
	$("#infoFormDialog select").val("").attr("disabled",false);
	$("#infoFormDialog select#authority").attr("disabled",true);
	$("#passwordWrap").hide();
	areaSelect(true);
	$("#infoFormDialog").modal({
		backdrop : 'static',
		keyboard : false
	})
})

// 修改
function modification(id) {

	$("#passwordWrap").show();
	$("#infoFormDialog").modal({
		backdrop : 'static',
		keyboard : false
	})
	$("#infoFormDialog h4").text("修改用户");
	$.post("/xlhaBeta/admin/getAdmin.do",{id:id},function(data){

		if(data.status==0){
			alert(data.msg)
		}else{
			$("#infoFormDialog input").val("");
			$("#infoFormDialog select#district, #infoFormDialog select#county, #infoFormDialog select#village, #infoFormDialog select#authority").attr("disabled", true);
			var datas = data.areas!= undefined ? data.areas.code : '10';

			quanxian(datas);
			$("#accountNumber").val(data.username==null?"":data.username);
			$("#password").val(data.password==null?"":data.password);
			$("#username").val(data.realname==null?"":data.realname);
			$("#telephone").val(data.usertel==null?"":data.usertel);
			$("#remark").val(data.remark==null?"":data.remark);
			$("#idNumber").val(data.identity==null?"":data.identity);
			$("#userid").val(data.userid==null?"":data.userid);
		}
	});
}

function limits() {
	console.log(limitsList)
	var str = '';
	for(var i=0;i<limitsList.length;i++) {
		str += '<option value="'+ limitsList[i].value +'">'+ limitsList[i].text +'</option>';
	};
	$("#authority").html(str);
}

areaSelect()
function areaSelect(isAdd) {
	limitsList = [
		{
			value: '0',
			text: '最高权限'
		},
		{
			value: '1',
			text: '区/县级'
		},
		{
			value: '2',
			text: '乡/镇级'
		},
		{
			value: '3',
			text: '村级'
		}
	]
	 $.ajax({
	 	type: 'POST',
	 	url: '/xlhaBeta/area/getCode.do',
	 	dataType: 'json',
	 	success: function(response) {
	 		ajaxLoading.hide();
			if(response!=null) {
				var data = response.usergroupid;
				var dataLen = data.toString().split('').length;
				// 查询

				var qxHeight = data == 1 ? true : false;

				new selectArea('.inputWrapper', {
					data : data,
					isSelect : qxHeight
				});
				quanxian(data,isAdd)
//				new selectArea('.inputWrapper',{
//					data: data,
//					isSelect: true
//				});
				// if(dataLen == 3 || dataLen == 6) {
				// 	new selectArea('#infoFormDialog',{
				// 		data: data,
				// 		isSelect: false
				// 	});
				// 	if(dataLen == 3) {
				// 		limitsList.splice(0,2);
				// 		limits();
				// 	} else if(dataLen == 6) {
				// 		limitsList.splice(0,3);
				// 		limits();
				// 	}
				// } else {
				// 	new selectArea('#infoFormDialog',{
				// 		data: data,
				// 		isSelect: true
				// 	});
				// 	limits();
				// }
			}
	 	},
	 	error: function() {
	 		ajaxLoading.hide();
	 	},
	 	beforeSend: function() {
	 		ajaxLoading.show();
	 	}
	 })
}

$("#infoFormDialog #district").on("change", function() {
	var thisVal = $(this).val();
	if(thisVal) {
		$("#infoFormDialog select#authority").val('1')
	} else {
		$("#infoFormDialog select#authority").val('0')
	}
})
$("#infoFormDialog #county").on("change", function() {
	var thisVal = $(this).val();
	if(thisVal) {
		$("#infoFormDialog select#authority").val('2')
	} else {
		$("#infoFormDialog select#authority").val('1')
	}
})
$("#infoFormDialog #village").on("change", function() {
	var thisVal = $(this).val();
	if(thisVal) {
		$("#infoFormDialog select#authority").val('3')
	} else {
		$("#infoFormDialog select#authority").val('2')
	}
})


function quanxian(data,isAdd) {
	limitsList = [
		{
			value : '0',
			text : '市级管理员'
		},
		{
			value : '1',
			text : '区/县级管理员'
		},
		{
			value : '2',
			text : '乡/镇级管理员'
		},
		{
			value : '3',
			text : '街道/村级管理员'
		}
	];
	
	var dataLen = data.toString().split('').length;

	if (dataLen == 3 || dataLen == 6 || dataLen == 9) {
		new selectArea('#infoFormDialog', {
			data : data,
			isSelect : false
		});
		if (dataLen == 3) {
			if(isAdd) {
				limitsList.splice(0, 2);
				$("#infoFormDialog #county").attr("required", true);
			} else {
				limitsList.splice(0, 1);
			}
			limits();
		} else if (dataLen == 6) {
			if(isAdd) {				
				limitsList.splice(0, 3);
				$("#infoFormDialog #village").attr("required", true);
			} else {
				limitsList.splice(0, 2);
			}
			limits();
		} else if (dataLen == 9) {
			if(!isAdd) {
				limitsList.splice(0, 3);
			}
			limits();
		}
	} else {
		new selectArea('#infoFormDialog', {
			data : data,
			isSelect : true
		});
		limits();
	}
}
// --------------------新增/修改 end-----------------------------



// --------------------导入 start-----------------------
// 导入
$("#batchExport").on("click", function() {
	$("#importDialog").modal({
		backdrop: 'static',
		keyboard: false
	})
})

$("#chooseBtn,#choose").on("click", function() {
	$("#upExcel").click();
});

// 下载模板
$("#exportTemp").on("click", function(){
	location.href = "/xlhaBeta/admin/exportModel.do";
})

// 表单验证
$("#importSure").on("click",function() {
    var flag = validExcel("#upExcel");
    if(flag == false) {
        return;
    }

	$("#upForm").ajaxSubmit({
	    url : '/xlhaBeta/admin/import.do',
	    type : 'post',
	    beforeSubmit:function (data) {
	    	ajaxLoading.show();
	    },
	    success:function(response){
	    	response = JSON.parse(response)
	    	ajaxLoading.hide();
	    	if(response.status==1){
                ajaxLoading.hide();
            	alert("上传成功");
            	location.reload();
            } else {
            	alert(response.msg)
            }
	    },
	    error:function (data) {
	    	ajaxLoading.hide();
	    	alert("服务繁忙，请稍后再试")
	    }
	});

})

$("#upExcel").on("change", function() {
	validExcel(this);
    var filepath=$(this).val();
    $("#choose").val(filepath)
});
function validExcel(_this) {
	var flag = true;
	var filepath=$(_this).val();
	if(!filepath) {
		$("#choose").testRemind("请选择文件");
		flag = false;
	} else {
		var extStart=filepath.lastIndexOf(".");
		var ext=filepath.substring(extStart,filepath.length).toUpperCase();
		if(ext!=".XLS"&&ext!=".XLSX"){
			$("#choose").testRemind("文件限于xls,xlsx格式");
			flag = false;
			return false;
		}else{
			$(_this).text(ext)
		}
	}
	return flag;
} 

// --------------------导入 end-----------------------


// --------------------提交表单 start----------------
$("#sava").on("click", function() {
	$("#html5Form").submit();
});

$("#html5Form").html5Validate(function() {

	// var formData = new FormData();
	// formData.append("district", $("#infoFormDialog select#district").val());
	// formData.append("county", $("#infoFormDialog select#county").val());
	// formData.append("village", $("#infoFormDialog select#village").val());
	// formData.append("username", $("#accountNumber").val());
	// formData.append("password", $("#password").val());
	// formData.append("userlevel", $("#authority").val());
	// formData.append("realname", $("#username").val());
	// formData.append("usertel", $("#telephone").val());
	// formData.append("remark", $("#remark").val());
	// formData.append("identity", $("#idNumber").val());
	// if ($("#userid").val() != "") {
	// 	formData.append("userid", $("#userid").val());
	// }
	var params = {
		district: $("#infoFormDialog select#district").val(),
		county: $("#infoFormDialog select#county").val(),
		village: $("#infoFormDialog select#village").val(),
		username: $("#accountNumber").val(),
		password: $("#password").val(),
		userlevel: $("#authority").val(),
		realname: $("#username").val(),
		usertel:  $("#telephone").val(),
		remark: $("#remark").val(),
		identity:  $("#idNumber").val()
	}
	if ($("#userid").val() != "") {
		params.userid = $("#userid").val()
	}

	$.ajax({
		url : '/xlhaBeta/admin/addAdmin.do',
		type : 'POST',
		data : params,
		beforeSend : function(response) {
			ajaxLoading.show();
		},
		success : function(responseStr) {
			if (responseStr.status == 1) {
				ajaxLoading.hide();
				alert(responseStr.msg)
				location.reload();
			}
		},
		error : function(responseStr) {
			alert("服务繁忙，请稍后再试")
			ajaxLoading.hide();
		},
		completed : function() {
			ajaxLoading.hide();
		}
	});
	
},{
	validate: function() {
		var password = $("#password");
		if(password.val() && !(/^(\w){6,16}$/).test(password.val())) {
			password.testRemind("只能输入6-16个字母、数字、下划线").focus();
			return false;
		}

		// 身份证号
		var idNumber = $("#idNumber");
		if(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idNumber.val())){
            idNumber.testRemind("身份证号格式错误");
            return false;
        }

		// 验证手机号
		var phone = $("#telephone");
		if(!(/^1[34578]\d{9}$/.test(phone.val()))){
			$("html,body").scrollTop(phone.offset().top)
			phone.testRemind("手机号码有误，请重填");
			return false; 
		}

		return true;
	}
})
// --------------------提交表单 end----------------