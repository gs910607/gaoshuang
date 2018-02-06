// 当事人所在调解地点
new selectArea('#partiesMediaArea',{
	isSelect: true
});

// 调解人调解所在地
new selectArea('#mediatorArea',{
	isSelect: true
});

// 书记员所在调解地
new selectArea('#clerkMediaArea',{
	isSelect: true
});


// ------------------------添加当事人start------------------------------
var partiesList = []; //当事人列表

init();
function init() {
	drowPartiesList();  //初始化渲染当事人列表
	$("#addPartiesBtn").on("click", function() {  //添加候选人按钮
		var partiesName = $("#partiesName");
		var partiesPhone = $("#partiesPhone");
		var partiesAddress = $("#partiesAddress");
		var district = $("#partiesWrapper #district");
		var partiesIdNumber = $("#partiesIdNumber");
		var partiesUnit = $("#partiesUnit");
		var partiespeople = $("#partiespeople");
		/*if(partiespeople.val() == '') {
			partiespeople.focus().testRemind('请输入旁听人数');
			return;
		};*/
		
		if(partiesName.val() == '') {
			partiesName.focus().testRemind('请输入姓名');
			return;
		};

		if(partiesPhone.val() == '') {
			partiesPhone.focus().testRemind('请输入手机号');
			return;
		};

		if(partiesAddress.val() == '') {
			partiesAddress.focus().testRemind('请输入地址');
			return;
		};

		if(partiesIdNumber.val() == '') {
			partiesIdNumber.focus().testRemind('请输入身份证号');
			return;
		};

		if(partiesUnit.val() == '') {
			partiesUnit.focus().testRemind('请输入单位名称');
			return;
		};

		if(district.val() == '') {
			district.focus().testRemind('请选择所在调解地');
			return;
		};

		

		if(!(/^1[34578]\d{9}$/.test(partiesPhone.val()))){
			partiesPhone.focus().testRemind('手机号码有误，请重填');
			return; 
		};

		if(!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(partiesIdNumber.val()))){
			partiesIdNumber.testRemind("身份证号码有误");
			return;
		}

		var isRepeat = true;
		var repeatIndex = false;
		for(var i=0;i<partiesList.length;i++) {
			if(partiesList[i].identity == $("#partiesIdNumber").val()) {
				isRepeat = false;
				repeatIndex = i
			}
		}
		if(!isRepeat) {
			var confirmSure = confirm('确定修改该当事人');
			if(confirmSure) {
				partiesList[repeatIndex] = {
					name: $("#partiesName").val(),
					tellPhone: $("#partiesPhone").val(),
					address: $("#partiesAddress").val(),
					mediationAddress: areaCodes(),
					identity: $("#partiesIdNumber").val(),
					unit: $("#partiesUnit").val(),
					partiespeople:$("#partiespeople").val()
				};
				drowPartiesList();
				$("#partiesWrapper input, #partiesWrapper select").val('');

				new selectArea('#partiesMediaArea',{
					isSelect: true
				});
			}
		} else {
			addParties();
		}

		function addParties() {
			var areaCode = areaCodes();
			partiesList.push({
				name: $("#partiesName").val(),
				tellPhone: $("#partiesPhone").val(),
				address: $("#partiesAddress").val(),
				mediationAddress: areaCode,
				identity: $("#partiesIdNumber").val(),
				unit: $("#partiesUnit").val(),
				partiespeople:$("#partiespeople").val()
			});
			drowPartiesList();

			$("#partiesWrapper input, #partiesWrapper select").val('');

			new selectArea('#partiesMediaArea',{
				isSelect: true
			});
		}
		
	});
};

function areaCodes() {
	var areaCode = '';
	if($("#partiesMediaArea #village").val() !== '') {
		areaCode = $("#partiesMediaArea #village").val();
	} else if($("#partiesMediaArea #county").val() !== '') {
		areaCode = $("#partiesMediaArea #county").val();
	} else if($("#partiesMediaArea #district").val() !== '') {
		areaCode = $("#partiesMediaArea #district").val();
	};
	return areaCode;
};

function drowPartiesList() { //渲染当事人列表
	var partiesStr = '';
	for(var i=0;i<partiesList.length;i++) {
		var obj = partiesList[i];
		var removeI = (look != null || update != null) ? '' : '<i onclick="removeParItem('+ i +',event)">x</i>';
		partiesStr += '<li onclick="clickparItem('+ i +')">'+ obj.name + '' + removeI + '</li>';
	};
	$("#partiesList").html(partiesStr);
}

function drowPartiesInfo(index) {  //渲染当事人详情
	var obj = partiesList[index];
	$("#download").attr({"href" : null});
	$(".mediationcnter").hide();
	if(look){
		if(obj.afterUrl){
			$("#download").attr({"href" : obj.afterUrl});
			$(".mediationcnter").show();
		}
	}
	
	$("#partiesName").val(obj.name);
	$("#partiesPhone").val(obj.tellPhone);
	$("#partiesAddress").val(obj.address);
	var isLookOrUpdate = (look != null || update != null) ? true : false;
	$("#partiesMediaArea #district, #partiesMediaArea #county, #partiesMediaArea #village").attr("disabled",isLookOrUpdate);
	$("#partiesIdNumber").val(obj.identity);
	$("#partiesUnit").val(obj.unit);
	$("#partiespeople").val(obj.partiespeople);
	new selectArea('#partiesMediaArea',{
		isSelect: true
	});

	var oPartiesMediaArea = obj.mediationAddress.toString();

	$("#partiesMediaArea #district").val(oPartiesMediaArea.slice(0,3));

	if(oPartiesMediaArea.length >= 6) {
		for(var i=0;i<areaList.length;i++) {
			var objArea6 = areaList[i];
			for(var j in objArea6) {
				var codeArr6 = j.toString();
				if(codeArr6.length == 6 && codeArr6.slice(0,3) == oPartiesMediaArea.slice(0,3)) {
					var disStr6 = '';
					disStr6 = '<option value="'+ j +'">'+ objArea6[j] +'</option>';
					$("#partiesMediaArea #county").append(disStr6);
				}
			}
		};
		setTimeout(function() {
			$("#partiesMediaArea #county").val(oPartiesMediaArea.slice(0,6) ? oPartiesMediaArea.slice(0,6) : '');
		},0)
	}

	if(oPartiesMediaArea.length == 9) {
		for(var i=0;i<areaList.length;i++) {
			var objArea9 = areaList[i];
			for(var j in objArea9) {
				var codeArr9 = j.toString();
				if(codeArr9.length == 9 && codeArr9.slice(0,6) == oPartiesMediaArea.slice(0,6)) {
					var disStr = '';
					disStr = '<option value="'+ j +'">'+ objArea9[j] +'</option>';
					$("#partiesMediaArea #village").append(disStr);
				}
			}
		};
		setTimeout(function() {
			$("#partiesMediaArea #village").val(oPartiesMediaArea.slice(0,9) ? oPartiesMediaArea.slice(0,9) : '');
		},0)
	}
}
// 查看当事人项
function clickparItem(index) {
	drowPartiesInfo(index);
};

// 删除当事人项
function removeParItem(index, event) {
	partiesList.splice(index,1);
	drowPartiesList();
	event.stopPropagation();
} //------------------添加当事人end------------------------------


// ------------------------------- 添加调解人start----------------------------
var partiesList2 = []; //当事人列表

init2();
function init2() {
	drowPartiesList2();  //初始化渲染当事人列表

	$("#addMediateBtn").on("click", function() {  //添加候选人按钮
		var mediateName = $("#mediateName");
		var mediateCellphone = $("#mediateCellphone");
		var district = $("#mediateWrapper #district");
		var mediatePidNumber = $("#mediatePidNumber");
		var mediatePid = $("#mediatePid");
		//var mediatepeople = $("#mediatepeople");
		var mediateunit = $("#mediateunit");
		
		if(mediateName.val() == '') {
			mediateName.focus().testRemind('请输入姓名');
			return;
		};

		if(mediateCellphone.val() == '') {
			mediateCellphone.focus().testRemind('请输入手机号');
			return;
		};

		if(mediateunit.val() == '') {
			mediateunit.focus().testRemind('请输入调解员单位');
			return;
		};
		
		/*if(mediatepeople.val() == '') {
			mediatepeople.focus().testRemind('请输入调解员人数');
			return;
		};*/
		
		
		

		/*if(mediatePid.val() == '') {
			mediatePid.focus().testRemind('请选择证件类型');
			return;
		};

		if(mediatePidNumber.val() == '') {
			mediatePidNumber.focus().testRemind('请输入证件号码');
			return;
		};*/



		if(district.val() == '') {
			district.focus().testRemind('请选择所在调解地');
			return;
		};

		

		if(!(/^1[34578]\d{9}$/.test(mediateCellphone.val()))){
			mediateCellphone.focus().testRemind('手机号码有误，请重填');
			return; 
		} 

		if(mediatePid.val() == '身份证' && mediatePidNumber.val() != '' && !(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(mediatePidNumber.val()))){
			mediatePidNumber.testRemind("身份证号码有误");
			return;
		}

		var isRepeat = true;
		var repeatIndex = false;
		for(var i=0;i<partiesList2.length;i++) {
			if(partiesList2[i].identity == $("#mediatePidNumber").val()) {
				isRepeat = false;
				repeatIndex = i
			}
		}
		if(!isRepeat) {
			var confirmSure = confirm('确定修改该调解人');
			if(confirmSure) {
				partiesList2[repeatIndex] = {
					name: $("#mediateName").val(),
					identityType: $("#mediatePid").val(),
					identity: $("#mediatePidNumber").val(),
					address: $("#mediateCompleteAdd").val(),
					tellPhone: $("#mediateTelephone").val(),
					mediationAddress: areaCodes2(),
					cellPhone: $("#mediateCellphone").val(),
					//mediatepeople:$("#mediatepeople").val(),
					mediateunit : $("#mediateunit").val()
				};
				drowPartiesList2();
				$("#mediateWrapper input, #mediateWrapper select").val('');

				new selectArea('#mediatorArea',{
					isSelect: true
				});
			}
		} else {
			addParties2();
		}

		function addParties2() {
			var areaCode = areaCodes2();
			partiesList2.push({
				name: $("#mediateName").val(),
				identityType: $("#mediatePid").val(),
				identity: $("#mediatePidNumber").val(),
				address: $("#mediateCompleteAdd").val(),
				tellPhone: $("#mediateTelephone").val(),
				mediationAddress: areaCode,
				cellPhone: $("#mediateCellphone").val(),
				//mediatepeople:$("#mediatepeople").val(),
				mediateunit : $("#mediateunit").val()
			});
			drowPartiesList2();

			$("#mediateWrapper input, #mediateWrapper select").val('');

			new selectArea('#mediatorArea',{
				isSelect: true
			});
		}
	});
};

function areaCodes2() {
	var areaCode = '';
	if($("#mediatorArea #village").val() !== '') {
		areaCode = $("#mediatorArea #village").val();
	} else if($("#mediatorArea #county").val() !== '') {
		areaCode = $("#mediatorArea #county").val();
	} else if($("#mediatorArea #district").val() !== '') {
		areaCode = $("#mediatorArea #district").val();
	};
	return areaCode;
};

function drowPartiesList2() { //渲染当事人列表
	var partiesStr = '';
	for(var i=0;i<partiesList2.length;i++) {
		var obj = partiesList2[i];
		var removeI2 = (look != null || update != null) ? '' : '<i onclick="removeParItem2('+ i +',event)">x</i>';
		partiesStr += '<li onclick="clickparItem2('+ i +')">'+ obj.name + '' + removeI2 + '</li>';
	};
	$("#mediateList").html(partiesStr);
}

function drowPartiesInfo2(index) {  //渲染当事人详情
	var obj = partiesList2[index];
	$("#mediateName").val(obj.name);
	$("#mediatePid").val(obj.identityType);
	$("#mediatePidNumber").val(obj.identity);
	var isLookOrUpdate2 = (look != null || update != null) ? true : false;
	$("#mediatorArea #district, #mediatorArea #county, #mediatorArea #village").attr("disabled",isLookOrUpdate2);
	$("#mediateCompleteAdd").val(obj.address);
	$("#mediateTelephone").val(obj.tellPhone);
	$("#mediateCellphone").val(obj.cellPhone);
	//$("#mediatepeople").val(obj.mediatepeople);
	$("#mediateunit").val(obj.mediateunit);
	new selectArea('#mediatorArea',{
		isSelect: true
	});

	var mediatorArea = obj.mediationAddress.toString();

	$("#mediatorArea #district").val(mediatorArea.slice(0,3));

	if(mediatorArea.length >= 6) {
		for(var i=0;i<areaList.length;i++) {
			var objArea6 = areaList[i];
			for(var j in objArea6) {
				var codeArr6 = j.toString();
				if(codeArr6.length == 6 && codeArr6.slice(0,3) == mediatorArea.slice(0,3)) {
					var disStr6 = '';
					disStr6 = '<option value="'+ j +'">'+ objArea6[j] +'</option>';
					$("#mediatorArea #county").append(disStr6);
				}
			}
		};
		setTimeout(function() {
			$("#mediatorArea #county").val(mediatorArea.slice(0,6) ? mediatorArea.slice(0,6) : '');
		},0)
	}

	if(mediatorArea.length == 9) {
		for(var i=0;i<areaList.length;i++) {
			var objArea9 = areaList[i];
			for(var j in objArea9) {
				var codeArr9 = j.toString();
				if(codeArr9.length == 9 && codeArr9.slice(0,6) == mediatorArea.slice(0,6)) {
					var disStr = '';
					disStr = '<option value="'+ j +'">'+ objArea9[j] +'</option>';
					$("#mediatorArea #village").append(disStr);
				}
			}
		};
		setTimeout(function() {
			$("#mediatorArea #village").val(mediatorArea.slice(0,9) ? mediatorArea.slice(0,9) : '');
		},0)
	}
}
// 查看当事人项
function clickparItem2(index) {
	drowPartiesInfo2(index);
};

// 删除当事人项
function removeParItem2(index, event) {
	partiesList2.splice(index,1);
	drowPartiesList2();
	event.stopPropagation();
}
//-------------------------------添加调解人end----------------------------------------


$("#mediateDate,#mediateRegisDate").val(new Date().format('yyyy-MM-dd'));
$("#startTime").val(new Date().format('yyyy-MM-dd hh:mm:ss'));

/*$("#mediateIdentifier").val('TJ'+ new Date().getTime());*/


var look = GetQueryString("look");
var update = GetQueryString("update");

function clearCounty() {
	$("#county").html('<option value="">请选择</option>');
	$("#village").html('<option value="">请选择</option>');
};

function clearVillage() {
	$("#village").html('<option value="">请选择</option>');
};


$("#html5Form").html5Validate(function() {
	if(partiesList.length <=0 ) {
		$("html,body").scrollTop($("#addPartiesBtn").offset().top-100);
		$("#addPartiesBtn").testRemind("请添加当事人");
		return;
	};

	if(partiesList2.length <=0 ) {
		$("html,body").scrollTop($("#addMediateBtn").offset().top-100);
		$("#addMediateBtn").testRemind("请添加调解人");
		return;
	};

	partiesList.map(function(o,i){
		o.personType=1
	});
	partiesList2.map(function(o,i){
		o.personType=2
	})
	var fixedTelephone = $("#mediateTelephone");
	var params = {
		mediateName:$("#clerkName").val(),
		mediateCompleteAdd:$("#clerkUnit").val(),
		mediateIdentifier:$("#mediateIdentifier").val(),
		mediateRegisUnit:$("#mediateRegisUnit").val(),
		mediatePurpose:$("#mediatePurpose").val(),
		mediateDate:$("#mediateDate").val(),
		mediateRegisName:$("#mediateRegisName").val(),
		mediateRegisBranch:$("#mediateRegisBranch").val(),
		mediateRegisDate:$("#mediateRegisDate").val(),
		mediateReason:$("#mediateReason").val(),
		mediateNumber:$("#mediateNumber").val(),
		/*district:$("#allAddress #district").val(),
		county:$("#allAddress #county").val(),
		village:$("#allAddress #village").val(),*/
		mediateProtocol:$("#disputeType").val(),
		title : $("#title").val(),
		information:JSON.stringify(partiesList.concat(partiesList2)),
	}

	if(update != null) {
		params.mediateContent = $("#Overview").val();
	}

	var begintime=formatDate($("#startTime").val());
	if($("#startTime").val()!=""||$("#startTime").val()!=null){
    	params.beginTime = begintime;
    	params.duration = $("#duration").val();
    	params.isRecording = $("#recorded").val();
	}
    if($("#mediateid").val()!=""||$("#mediateid").val()!=null){
    	params.mediateid = $("#mediateid").val();
    	params.mediateAddress = $("#mediateAddress").val();
    }
    
	$.ajax({
		url : "../../mediate/addMediate.do", //请求的url地址
		dataType : "json", //返回格式为json
		data : params, //参数值
		type : "post", //请求方式
		beforeSend : function() {
			ajaxLoading.show();
		},
		success : function(responseStr) {
			ajaxLoading.hide();
			if (responseStr.status > 0) {
				alert(responseStr.msg)
				var type = GetQueryString("type");
				$("#html5Form input, #html5Form select, #html5Form textarea").val('');
				setTimeout(function() {
					location.href = "viewMediation.html";
				}, 500)
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

		// 验证人数
		var mediateNumber = $("#mediateNumber");
		if(!(/^[0-9]*$/.test(mediateNumber.val()))) {
			$("html,body").scrollTop(mediateNumber.offset().top)
			mediateNumber.testRemind("只能输入数字");
			return false;
		}

		return true;
	}
});

//字符串转时间--解决ie不兼容
function formatDate(fDate){  
    var fullDate = fDate.split(" ")[0].split("-");  
    var fullTime = fDate.split(" ")[1].split(":");  
  
    return new Date(fullDate[0], fullDate[1]-1, fullDate[2], (fullTime[0] != null ? fullTime[0] : 0), (fullTime[1] != null ? fullTime[1] : 0), (fullTime[2] != null ? fullTime[2] : 0));  
}
//判断是否是查看或更新
if (look != null || update != null) {
	if (look != null) {
		getMediateById(look);
		$("#textupload").hide();
        $("input, select, textarea").attr("disabled",true)
        $("#create").css("display","none");
		$("#MediaResultWrap").show();
		$(".groupBtnWrap").remove();
		$("#partiesWrapper input, #partiesWrapper select").attr("disabled",true);
		$("#mediateWrapper input, #mediateWrapper select").attr("disabled",true);
	}
    
	if(update!=null){
		getMediateById(update);
		$("#overViewWrap").show();
		$("#textupload").show();
		$(".groupBtnWrap").remove();
		$("#partiesWrapper input, #partiesWrapper select").attr("disabled",true);
		$("#mediateWrapper input, #mediateWrapper select").attr("disabled",true);
		$("#startTime").attr("disabled",true);
		$("#duration").attr("disabled",true);
		$("#recorded").attr("disabled",true);
		$("#create").text("更新调解");
	}
}else{
	//$("#textDownload").css("display","none");
	$("#textupload").css("display","none");
	new selectArea('#html5Form',{
		data: '',
		isSelect: true
	})
}

function getMediateById(id) {
	$.post("../../mediate/getMediateById.do", {
		id : id
	}, function(data) {
		partiesList = data.mediated;
		drowPartiesList();
		partiesList2 = data.mediation;
		drowPartiesList2();
		$("#title").val(data.conference.name);
		$("#clerkName").val(data.mediate.mediateName);
		$("#clerkUnit").val(data.mediate.mediateCompleteAdd);
		$("#mediateIdentifier").val(data.mediate.mediateIdentifier);
		$("#mediateRegisUnit").val(data.mediate.mediateRegisUnit);
		$("#mediatePurpose").val(data.mediate.mediatePurpose);
		$("#mediateDate").val(data.mediate.mediateDate);
		$("#mediateRegisName").val(data.mediate.mediateRegisName);
		$("#mediateRegisBranch").val(data.mediate.mediateRegisBranch);
		$("#mediateRegisDate").val(data.mediate.mediateRegisDate);
		$("#mediateReason").val(data.mediate.mediateReason);
		look != null && data.mediate.mediateContent != null ? $("#overViewWrap").show() : '';
		$("#Overview").val(data.mediate.mediateContent);
		$("#mediateNumber").val(data.mediate.mediateNumber);
		$("#mediateid").val(data.mediate.mediateid);
		$("#disputeType").val(data.mediate.mediateProtocol);
		$("#startTime").val(formatDateTime(data.conference.beginTime));
		$("#duration").val(data.conference.duration);
		$("#recorded").val(data.conference.isRecording);
		$("#MediaResult").val(data.mediate.mediaterStatus==1?"调解成功":(data.mediate.mediaterStatus==2?"调解中":"调解失败"));
		$("#mediateAddress").val(data.mediate.mediateAddress)
		
	});
}
$("#uploadModal").modal({
	keyboard: false,
	backdrop : "static",
	show :false
})

$("#textDownload").on("click",function(){
	$("#downDocxForm").submit();
	
});
//上传窗口的显示
$("#textupload").click(function(){
	$("#uploadModal").modal("show");
});
//调用上传文件窗口
$("#chooseBtn").click(function(){
	$("#upExcel").click();
});
//调用上传文件窗口 把文件名称显示
$("#upExcel").on("change", function() {
    var filepath=$(this).val();
    $("#choose").val(filepath)
});
//上传文件
$("#uploadBtn").click(function(){
	if($("#upExcel").val() == null || $("#upExcel").val() == ""){
		alert("请先选择一个文件再上传!")
		return ;
	}
	
	ajaxLoading.show();
	var ids = "" ;
	for(i = 0 ; partiesList.length > i ; i++){
		ids += partiesList[i].id
		if((partiesList.length -1) != i){
			ids += "," ;
		}
	}
	$("#ids").val(ids);
	
	$("#upForm").ajaxSubmit({
        url : '/spywBeta/mediate/importProtocol.do',
        type : 'post',
        beforeSubmit:function (data) {
        },
        success:function(data){
            ajaxLoading.hide();
            if(data.status == 1){
                alert("上传成功");
                $("#uploadModal").modal("hide");
            } else {
                alert("上传失败")
            }
        },
        error:function (data) {
            ajaxLoading.hide();
            alert("服务繁忙，请稍后再试")
        }
    });
});

function formatDateTime(inputTime) {    
    var date = new Date(inputTime);  
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
};  