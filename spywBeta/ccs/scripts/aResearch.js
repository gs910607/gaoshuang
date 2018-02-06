var candidateData = []; //候选人数组
$("#votetypenumber").html("")
for(var i=1;i<=50;i++) {
	$("#votetypenumber").append('<option value="'+ i +'">'+ i +'票</option>')
};
//告诉后台这个页面执行了，后台做垃圾图片处理
$.ajax({
	type: 'GET',
	url: '/spywBeta/videoResearch/videoResearchActivefiledeleteAll.do',
	data: {},
	dataType: 'json',
	success: function(response) {
		console.log(response.success+"临时上传文件初始化");
	}
})
var videoResearchId=GetQueryString("videoResearchId");
if(videoResearchId!=null && videoResearchId!=''){
	$.ajax({
		type: 'post',
		url: '/spywBeta/videoResearch/videoResearchdetail.do',
		data: {videoResearchId:videoResearchId},
		dataType: 'json',
		success: function(req) {
			if(req.status==0){
				var research=req.videoResearch
				var list=req.listResearchActives
				$("#activeTitle").val(research.videoResearchName);
				$("#dateStart").val(new Date(research.videoResearchStarttime).format('yyyy-MM-dd'));
				$("#dateEnd").val(new Date(research.videoResearchStoptime).format('yyyy-MM-dd'));
				$("#detailedAddress").val(research.videoResearchRemark);
				for(var i=0;i<list.length;i++){
					list[i].videoActiveName
					list[i].videoActiveCard
					candidateData.push({
	            		name: list[i].videoActiveName,
	            		phone: list[i].videoActivephone,
						idNumber: list[i].videoActiveCard,
						pictureUrl: list[i].videoActivePath  //图片链接
	            	});
					candidateList(candidateData);
				}
			}
		}
	})
}else{
	videoResearchId="null";
}

// 提交表单并验证
$("#html5Form").html5Validate(function() {
	if(videoResearchId!=null && videoResearchId!=''){
		console.log(videoResearchId);
	}else{
		console.log("空");
	}
	var activeTitle = $("#activeTitle").val(),
		dateStart = $("#dateStart").val(),
		dateEnd = $("#dateEnd").val(),
		votetype = $("#votetype").val(),
		detailedAddress = $("#detailedAddress").val(),
		votetypenumber = null;
	// if(votetype == 3 ){
		votetypenumber = $("#votetypenumber").val();
	// }
	$.ajax({
		type: 'POST',
		url: '/spywBeta/videoResearch/videoResearchSave.do',
		data: {
			activeTitle: activeTitle,  //标题
			dateStart: dateStart,   //开始日期
			dateEnd: dateEnd,    //结束日期
			votetype: votetype,	//投票类型
			detailedAddress: detailedAddress,  //调研内容
			videoResearchId:videoResearchId,//调研ID
			candidateData: JSON.stringify(candidateData), //候选人列表
			votetypenumber : votetypenumber  //投票次数
		},
		dataType: 'json',
		success: function(response) {
			ajaxLoading.hide();
			if(response.status==0){
				alert(response.success);
				location.href = "/spywBeta/videoResearch/join.do";
			}else{
				alert(response.success);
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试");
			ajaxLoading.hide();
		},
		beforeSend: function() {
			ajaxLoading.show();
		},
		completed: function() {
			ajaxLoading.hide();
		}
	})
},{
	validate: function() {
		var dateStart = $("#dateStart").val(),
			dateEnd = $("#dateEnd").val();

		if(dateStart > dateEnd) {
			$("#dateEnd").focus().testRemind("结束日期不得小于开始日期");
			$("html,body").scrollTop($("#dateEnd").offset().top)
			return false;
		}

		if(candidateData.length <= 1) {
			$("#candidateList").testRemind("候选人不得少于两位")
			return false;
		}
		return true;
	}
});

// 提交图片获取图片链接
$("#addPersonBtn").on("click", function() {

	var userName = $("#userName").val();
	var phone = $("#phone").val();
	var idNumber = $("#idNumber").val();
	if(!userName) {
		$("#userName").focus().testRemind("请输入候选人姓名");
		return;
	};

	if(!phone) {
		$("#phone").focus().testRemind("请输入手机号");
		return;
	};

	if(!idNumber) {
		$("#idNumber").focus().testRemind("请输入身份证号");
		return;
	};

	var flag = validPicture("#upImage");
	if(!flag) {
		return;
	};

	if(!(/^1[34578]\d{9}$/.test(phone))){
		$("html,body").scrollTop($("#phone").offset().top)
		$("#phone").focus().testRemind("手机号码有误，请重填");
		return false;
	}

    $("#html5Form").ajaxSubmit({
        url : '/spywBeta/videoResearch/videoResearchActivefileupload.do',
        type : 'post',
        beforeSubmit:function (data) {
        	ajaxLoading.show();
        },
        success:function(response){
        	response = JSON.parse(response);
        	ajaxLoading.hide();
            if(response.status===0){
    			var isRepeat = false;
    			candidateData.map(function(o,i) {
    				if(o.idNumber == idNumber) {
    					alert("候选人已存在");
    					isRepeat = true;
    				}
    			});
    			if(!isRepeat) {
	            	candidateData.push({
	            		name: userName,
	            		phone: phone,
						idNumber: idNumber,
						pictureUrl: response.url  //图片链接
	            	});
	            	candidateList(candidateData);
	            	alert("添加成功")
    			}

    			$("#userName").val("");
    			$("#phone").val("");
    			$("#idNumber").val("");
    			emptyFile("file", "fileWrap") //清空file的值

            }else{
                alert("新增失败")
            }
        },
        error:function (data) {
        	ajaxLoading.hide();
        	alert("服务繁忙，请稍后再试")
        }
    });

});

candidateList(candidateData);
//渲染候选人
function candidateList(candidateData) {
	var str = '';
	for(var i=0;i<candidateData.length;i++) {
		str += '<tr>';
		str += '	<td>'+ (i+1) +'</td>'
		str += '	<td>'+ candidateData[i].name +'</td>';
		str += '	<td>'+ candidateData[i].idNumber +'</td>';
		str += '	<td><a href="javascript:;" onclick="removeCandidate(\''+ candidateData[i].pictureUrl +'\','+ i +')">删除</a></td>';
		str += '</tr>';
	}
	$("#candidateList").html(str)
}

// 删除候选人
function removeCandidate(url,index) {
	$.ajax({
		type: 'GET',
		url: '/spywBeta/videoResearch/videoResearchActivefiledelete.do',
		data: {
			url: url
		},
		dataType: 'json',
		success: function(responses) {
			ajaxLoading.hide();
			if(responses.status == 0) {
				candidateData.splice(index,1);
				candidateList(candidateData);
			} else {
				alert("删除失败")
			}
		},
		error: function() {
			ajaxLoading.hide();
			alert("服务繁忙，请稍后再试");
		},
		completed: function() {
            ajaxLoading.hide();
        },
        beforeSend:function(){
            ajaxLoading.show();
        }
	})
};

$("#upImage").on("change", function() {
	validPicture(this)
});

function validPicture(_this) {
	var flag = true;
	var filepath=$(_this).val();
	if(!filepath) {
		$(_this).testRemind("请选择图片");
		flag = false;
	} else {
		var extStart=filepath.lastIndexOf(".");
		var ext=filepath.substring(extStart,filepath.length).toUpperCase();
		if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
			$(_this).testRemind("图片限于bmp,png,gif,jpeg,jpg格式");
			return false;
		}else{
			$(_this).text(ext)
		}

	}
	return flag;
} 

//$("#votetypenumber").parent().parent().hide();
//$("#votetype").on("change",function(){
//	if($(this).val() == 3){
//		$("#votetypenumber").parent().parent().show();
//	}else{
//		$("#votetypenumber").parent().parent().hide();
//	}
//})

// 清空file值
function emptyFile(name,target){  
   var f=$("input[name='"+name+"']:file");  
   f.val("");  
   var cf=f.clone();  
   f.remove();  
   cf.appendTo("#"+target);  
}  

$(window).scroll(function(){
	currentScroll();
});

currentScroll();
function currentScroll(){
	if($(this).scrollTop() >= 80) {
		$(".goBack").css({
			"position":"fixed",
			"top":"10px"
		})
	} else {
		$(".goBack").css({
			"position":"absolute",
			"top":"90px"
		})
	}
};