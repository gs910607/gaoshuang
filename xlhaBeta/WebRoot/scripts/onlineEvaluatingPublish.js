var candidateData = []; //候选人数组

//告诉后台这个页面执行了，后台做垃圾图片处理
$.ajax({
    type: 'GET',
    url: '/xlhaBeta/onlineEvaluating/videoResearchActivefiledeleteAll.do',
    data: {},
    dataType: 'json',
    success: function(response) {
    	console.log(response.success+"临时上传文件初始化");
    }
})

// 提交表单并验证
$("#html5Form").html5Validate(function() {
    //提交表单
    alert("验证通过");
    var activeTitle = $("#activeTitle").val(),
        dateStart = $("#dateStart").val(),
        dateEnd = $("#dateEnd").val(),
        detailedAddress = $("#detailedAddress").val();
    $.ajax({
        type: 'POST',
        url: '/xlhaBeta/onlineEvaluating/videoResearchSave.do',
        data: {
            activeTitle: activeTitle,  //标题
            dateStart: dateStart,   //开始日期
            dateEnd: dateEnd,    //结束日期
            detailedAddress: detailedAddress,  //调研内容
            candidateData: JSON.stringify(candidateData) //候选人列表
        },
        dataType: 'json',
        success: function(response) {
            ajaxLoading.hide();
            if(response.status==0){
				alert(response.success);
				location.href = "/xlhaBeta/pages/onlineEvaluating/onlineEvaluatingList.html";
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

    var formData = new FormData();
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

    formData.append("file",$("#upImage")[0].files[0]);

    $.ajax({ 
        url : '/xlhaBeta/onlineEvaluating/videoResearchActivefileupload.do', 
        type : 'POST', 
        data : formData, 
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend:function(){
            ajaxLoading.show();
        },
        success : function(response) {
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
                    $("#userName").val("");
                    $("#phone").val("");
                    $("#idNumber").val("");
                    $("#upImage")[0].outerHTML=$("#upImage")[0].outerHTML; 
                }
            }else{
                alert("新增失败")
            }
        }, 
        error : function(response) {
            alert("服务繁忙，请稍后再试")
            ajaxLoading.hide();
        },
        completed: function() {
            ajaxLoading.hide();
        }
    });
});

candidateList(candidateData);
//渲染候选人
function candidateList(candidateData) {
    var str = '';
    for(var i=0;i<candidateData.length;i++) {
        str += '<tr>';
        str += '    <td>'+ (i+1) +'</td>'
        str += '    <td>'+ candidateData[i].name +'</td>';
        str += '    <td>'+ candidateData[i].idNumber +'</td>';
        str += '    <td><a href="javascript:;" onclick="removeCandidate(\''+ candidateData[i].pictureUrl +'\','+ i +')">删除</a></td>';
        str += '</tr>';
    }
    $("#candidateList").html(str)
}

// 删除候选人
function removeCandidate(url,index) {
	$.ajax({
		type: 'GET',
		url: '/xlhaBeta/onlineEvaluating/videoResearchActivefiledelete.do',
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