$("#skinIcon").on("click", function() {
	if($(".homeWrapper").hasClass("bg2")) {
		$(".homeWrapper").removeClass("bg2");
	} else {
		$(".homeWrapper").addClass("bg2");
	}
})
//进入首页获取session值并存入全局变量
$(function(){
	$.ajax({
	    url:"/spywBeta/area/getCode.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    type:"post",   //请求方式
	    success:function(req){
	    	if(req.status==0){
	    		return;
	    	}
	    	localStorage.setItem("info",JSON.stringify(req)); //存
	    	var info = JSON.parse(localStorage.getItem("info"));
	    	if(info.usergroupid.toString().split('').length==9){
	     		$("#informationNav").attr("data-href","../pages/informationPublish/informationPublish.html");
	     		$("#videoTrainNav").attr("data-href","../pages/videoTraining/videoTraining.html");
	    	}
	    	if(info.usergroupid.toString().split('').length>=6){
	    		$(".dropWrap").find($("#manager")).remove();
	    	}
	    }
	});
})

// $(".dropWrap #administ").on("click", function() {
	// window.open("./pages/administrator/userinfo.html");
// });

// $(".dropWrap li:first a").on("click", function() {
	// window.open("../pages/administrator/userinfo.html");
// });

var infoIsTemplete = false;  //用户信息是否完善  true完善  false未完善
$.ajax({
	 	type: 'POST',
	  async: false,
	 	url: '../area/getInfo.do',
	 	dataType: 'json',
	 	success: function(response) {
			if(response.status == 1) {
				 	infoIsTemplete = true;
				 	
			}else if(response.status==0){
				alert(response.user);
			}else{
				
				var datas = user.usergroupid;
				quanxian(datas);
				$("#infoFormDialog select").attr("disabled",true);
			 	$("#accountNumber").val(user.username).attr("disabled",true);
			 	$("#username").val(user.realname);
			 	$("#userid").val(user.userid);
			 	$("#idNumber").val(user.identity==null?"":user.identity);
			 	$("#telephone").val(user.usertel==null?"":user.userTel);
			 	$("#remark").val(user.remark).attr("disabled",true);
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试");
		},
		beforeSend: function() {
		}
	});


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
			} else {
				limitsList.splice(0, 1);
			}
			limits();
		} else if (dataLen == 6) {
			if(isAdd) {				
				limitsList.splice(0, 3);
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

function limits() {
	var str = '';
	for (var i = 0; i < limitsList.length; i++) {
		str += '<option value="' + limitsList[i].value + '">' + limitsList[i].text + '</option>';
	};
	$("#authority").html(str);
}

$(".childPageList a").on("click", function() {
	var _this = $(this);
	var thisHref = $(this).data("href");
	if(!infoIsTemplete) { //未完善
		$("#toCompleteModal").modal();
		$("#goCompleteBtn").on("click", function() {
			$("#toCompleteModal").modal("hide");
			$("#infoFormDialog").modal({
				backdrop: 'static',
				keyboard: true
			})
		});
	} else {  //完善
		window.open(thisHref);
	}
});


//--------------------提交表单 start----------------
$("#sava").on("click", function() {
	$("#html5Form").submit();
});

$("#html5Form").html5Validate(function() {
	// 提交内容
	$.post("../admin/userUpdate.do",{
		realname:$("#username").val(),
		identity:$("#idNumber").val(),
		usertel:$("#telephone").val(),
		userid:$("#userid").val(),
	},function(data){
		if(data.status==1){
			alert(data.msg);
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
//--------------------提交表单 end----------------