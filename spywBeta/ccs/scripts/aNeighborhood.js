
$("#datePic,#time").val(new Date().format('yyyy-MM-dd'));
$("#startTime").val(new Date().format('yyyy-MM-dd hh:mm:ss'));
$("#serialNumber").val('XF'+new Date().getTime());

$.ajax({
	type: 'post',
	url: '/spywBeta/area/arealistByPartendId.do',
	data: {
		parentId: 1 //村
	},
	dataType: 'json',
	success: function(response) {
		var data = response.list;
		if(data && data.length >= 0) {
			$("#cityLevel option").remove();
			for(var i=0;i<data.length;i++) {
				var str = '';
				str += '<option value="'+ data[i].code +'">'+ data[i].name +'</option>';
				$("#cityLevel").append(str)
			}
		}
	}
});
$.ajax({
	type: 'post',
	url: '/spywBeta/videoNeighborhood/VideoNeightTypeJson.do',
	data: {},
	dataType: 'json',
	success: function(req) {
		if(req.status==0){
			var list=req.list;
			$("#neightType option:not(:first)").remove();
			for(var i=0;i<list.length;i++){
				var txt='';
				txt='<option value="'+list[i].neightTypeId+'">'+list[i].neightTypeName+'</option>'
				$("#neightType").append(txt);
			}
		}
	}
})
		new selectArea('#petition',{  //信访人地址
			data: '',
			isSelect: true
		});

		new selectArea('#respondents',{  //受访人地址
			data: '',
			isSelect: true
		});

		new selectArea('#registerArea',{  //登记地点
			data: '',
			isSelect: true
		});
		
$(function(){
	var videoneihdId=GetQueryString("videoneihdId");
	var type=GetQueryString("type");
	if(videoneihdId!=null){
		$.ajax({
		    url:"/spywBeta/videoNeighborhood/videoNeighborhoodDetail.do",    //请求的url地址
		    dataType:"json",   //返回格式为json
		    data:{"videoneihdId":videoneihdId},    //参数值
		    type:"post",   //请求方式
		    success:function(req){
		    	var vh=req.videoNeighborhood;

		    	if(vh == undefined) {
		    		alert(config.errorArticleMsg);
		    		setTimeout(function(){
		    			location.href = 'neighborhoodNav.html';
		    		},1000);

		    		return;
		    	}

		    	$("#name").val(vh.videoneihdName);
		    	$("#voucherType").val(vh.videoneihdCardType);
		    	var vlp= vh.videoneihdLocationplace ? vh.videoneihdLocationplace.toString() : null ;
		    	if(vlp!=null){
		    		if(vlp.length>6){
			    		var url='/spywBeta/area/arealistByPartends.do';
			    		var data={
			    	 		code: vlp //县
			    	 	}
			    		selectvalue(url,data,1,"#petition");
			    	}else if(vlp.length>3){
			    		var url='/spywBeta/area/arealistByCode.do';
			    		var vlcode=vlp.substr(0,3);
			    		var data={
			    	 		code: vlp //县
			    	 	}
			    		selectvalue(url,data,2,"#petition");
			    		data={code:vlcode}
			    		selectvalue(url,data,3,"#petition");
			    	}else if(vlp.length>0){
			    		var url='/spywBeta/area/arealistByCode.do';
			    		var data={code: vlp }
			    		selectvalue(url,data,3,"#petition");
			    	}
		    	}
		    	$("#voucherNumber").val(vh.videoneihdCard);
		    	$("#fixedTelephone").val(vh.videoneihdtelephone);
		    	$("#phoneNumber").val(vh.videoneihdphone);
		    	$("#detailedAddress").val(vh.videoneihdplace);
//		    	$("#serialNumber").val(vh.videoneihdNum);
		    	$("#unitElement").val(vh.videoneihdCompany);
		    	$("#purpose").val(vh.videoneihdObjective);
		    	$("#datePic").val(new Date(vh.videoneihdDate).format('yyyy-MM-dd'));
		    	$("#registrant").val(vh.videoneihdRegistrant);
		    	$("#registrationAuthorities").val(vh.videoneihdRegistDepartment);
		    	$("#time").val(new Date(vh.videoneihdRegistDate).format('yyyy-MM-dd'));
		    	$("#personNumber").val(vh.videoneihdNumber);
		    	$("#reason").val(vh.videoneihdReason);
		    	//信息概况
		    	if(vh.videoneihdRemark){
		    		$("#overViewWrap").show();
		    		$("#Overview").val(vh.videoneihdRemark);
		    	}
		    	$("#postcode").val(vh.videoneihdPostCode);
		    	$("#nationality").val(vh.videoneihdNationality);
		    	$("#complainant").val(vh.videoneihdComplainant);
		    	$("#addressee").val(vh.videoneihdRespondent);
		    	$("#involveNumber").val(vh.videoneihdInvolveNumber);
		    	$("#public").val(vh.videoneihdAgreeOpen);
		    	var vlvp=vh.videoneihdVisitorPlace;
		    	if(vlvp!=null){
		    		if(vlvp.length>6){
			    		var url='/spywBeta/area/arealistByPartends.do';
			    		var data={
			    	 		code: vlvp //县
			    	 	}
			    		selectvalue(url,data,1,"#respondents");
			    	}else if(vlvp.length>3){
			    		var url='/spywBeta/area/arealistByCode.do';
			    		var vlcode=vlvp.substr(0,3);
			    		var data={
			    	 		code: vlvp //县
			    	 	}
			    		selectvalue(url,data,2,"#respondents");
			    		data={code:vlcode}
			    		selectvalue(url,data,3,"#respondents");
			    	}else if(vlvp.length>1){
			    		var url='/spywBeta/area/arealistByCode.do';
			    		var data={code: vlvp }
			    		selectvalue(url,data,3,"#respondents");
			    	}
		    	}

//		    	vh.resdistrict;
		    	$("#title").val(vh.videoneihdTitle);
		    	$("#anonymity").val(vh.videoneihdAnonymous);
		    	var videoneihdTypeId=$("#neightType").val(vh.videoneihdTypeId);
		    	//办理意见
		    	if(vh.videoneihdHandleOpinion){
		    		$("#opinionWrap").show();
		    		var videoneihdHandleOpinion=$("#opinion").val(vh.videoneihdHandleOpinion);
		    	}
//		    	//信息概况
//		    	console.log("@@"+vh.videoneihdInformProfile)
//		    	if(vh.videoneihdInformProfile){
//		    		
//		    		$("#overViewWrap").show();
//		    		var videoneihdInformProfile=$("#Overview").text(vh.videoneihdInformProfile);
//		    	}
		    	//接访人单位
		    	var videoneihdLiberateCompany=$("#neightUnit").val(vh.videoneihdLiberateCompany);
		    	var Redistrict=$("#registerArea #district").val(vh.Redistrict);
		    	var Recounty=$("#registerArea #county").val(vh.Recounty);
		    	if(vh.videoneihdRegistratePlace!=null){
		    		if(type!=null){
			    		new selectArea('#registerArea',{  //登记地点
				    		data:vh.videoneihdRegistratePlace,
							isSelect: false
						});
			    	}else{
			    		new selectArea('#registerArea',{  //登记地点
				    		data:vh.videoneihdRegistratePlace,
							isSelect: true
						});
			    	}
		    	}
		    	if(req.conference!=null){
		    		$("#startTime").val(new Date(req.conference.beginTime).format('yyyy-MM-dd hh:mm:ss'));
			    	$("#recorded").val(req.conference.isRecording);
			    	$("#duration").val(req.conference.duration);
		    	}else{
		    		$("#startTime").val();
			    	$("#recorded").val();
			    	$("#duration").val();
		    	}
		    	//视频接访人职务
		    	$("#neightJob").val(vh.videoneihdPeopleDuty);
		    	//接访人联系方式
		    	$("#neightPhone").val(vh.videoneihdPeopleContact);
		    }
		});
	}
	if(type!=null){
		$("input, select, textarea").attr("disabled", true);
		if(type==1){
			$(".btnWrap button").remove();
		}
	}else{
		if(videoneihdId!=null){
			$(".btnWrap button").text("保存接访");
			ifnotedit=1;
			$("#opinionWrap,#overViewWrap").show();
		}
	}
});
var ifnotedit=0;
function selectvalue(url,data,odd,vname){
	$.ajax({
	 	type: 'post',
	 	url: url,
	 	data:data,
	 	dataType: 'json',
	 	success: function(response) {
			var data = response.list;
			var str = '';

			if(odd==1){
				if(data && data.length >= 0) {
//					$("#district option").remove();
					$(vname+" #county option").remove();
					$(vname+" #village option").remove();
					str = '<option value="'+ data[0].code +'">'+ data[0].name +'</option>';
					$(vname+"  #district").val(data[0].code);
					str = '<option value="'+ data[1].code +'">'+ data[1].name +'</option>';
					$(vname+" #county").append(str);
					str = '<option value="'+ data[2].code +'">'+ data[2].name +'</option>';
					$(vname+" #village").append(str);
			}
			}else if(odd==2){
				$(vname+" #county option").remove();
				str = '<option value="'+ data.code +'">'+ data.name +'</option>';
				$(vname+" #county").append(str);
			}else if(odd==3){
				$(vname+" #district").val(data.code);
			}
			
	 	},
	 });
}

// 表单验证
$("#html5Form").html5Validate(function() {

	   
	//提交表单
	videoNeighborhoodbtn();
},{
	validate: function() {
		if($("#respondents #cityLevel").val() == '' && $("#respondents #district").val() == '' && $("#respondents #county").val() == '') {
			$("#respondents #cityLevel").testRemind("请选择接访人所在地");
			return false;
		}
		
		// 涉及人数
		var involveNumber = $("#involveNumber");
		if(!(/^[0-9]*$/.test(involveNumber.val()))) {
			$("html,body").scrollTop(involveNumber.offset().top - 100)
			involveNumber.testRemind("人数只能为数字");
			return false;
		}

		// 验证手机号
		var phone = $("#phoneNumber");
		if(!(/^1[34578]\d{9}$/.test(phone.val()))){
			$("html,body").scrollTop(phone.offset().top - 100)
			phone.testRemind("手机号码有误，请重填");
			return false; 
		}

		// 验证人数
		var personNumber = $("#personNumber");
		if(!(/^[0-9]*$/.test(personNumber.val()))) {
			$("html,body").scrollTop(personNumber.offset().top - 100)
			personNumber.testRemind("人数只能为数字");
			return false;
		}

		var voucherNumber = $("#voucherNumber");
		if($("#voucherType").val() == '身份证' && !(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(voucherNumber.val()))){
			$("html,body").scrollTop(voucherNumber.offset().top - 100);
			voucherNumber.testRemind("证件号码有误");
			return false;
		}
		return true;
	}
});


function videoNeighborhoodbtn(){
	var videoneihdId=GetQueryString("videoneihdId");
	var videoneihdName=$("#name").val();
	var videoneihdCardType=$("#voucherType").val();
	var petdistrict=$("#petition #district").val();
	var videoneihdLocationplace="";
	if(petdistrict!=null && petdistrict!=""){
		videoneihdLocationplace=petdistrict;
	}
	var petcounty=$("#petition #county").val();
	if(petcounty!=null && petcounty!=""){
		videoneihdLocationplace=petcounty;
	}
	var petvillage=$("#petition #village").val();
	if(petvillage!=null && petvillage!=""){
		videoneihdLocationplace=petvillage;
	}
	var videoneihdCard=$("#voucherNumber").val();
	var videoneihdtelephone=$("#fixedTelephone").val();
	var videoneihdphone=$("#phoneNumber").val();
	var videoneihdplace=$("#detailedAddress").val();
//	var videoneihdNum=$("#serialNumber").val();
	
	var videoneihdCompany=$("#unitElement").val();
	var videoneihdObjective=$("#purpose").val();
	var videoneihdDate=$("#datePic").val();
	var videoneihdRegistrant=$("#registrant").val();
	var videoneihdRegistDepartment=$("#registrationAuthorities").val();
	var videoneihdRegistDate=$("#time").val();
	var videoneihdNumber=$("#personNumber").val();
	if(videoneihdNumber==null || videoneihdNumber==""){
		videoneihdNumber=0;
	}
	var videoneihdReason=$("#reason").val();
	var videoneihdRemark=$("#Overview").val();
	//videoneihdRemark和videoneihdInformProfile重复  建议用videoneihdRemark
	var videoneihdPostCode=$("#postcode").val();
	var videoneihdNationality=$("#nationality").val();
	var videoneihdComplainant=$("#complainant").val();
	var videoneihdRespondent=$("#addressee").val();
	var videoneihdInvolveNumber=$("#involveNumber").val();
	if(videoneihdInvolveNumber==null && videoneihdInvolveNumber==""){
		videoneihdInvolveNumber=0;
	}
	var videoneihdAgreeOpen=$("#public").val();
	var videoneihdVisitorPlace="";
	var resvillage=$("#respondents #cityLevel").val();
	if(resvillage!=null && resvillage!=""){
		videoneihdVisitorPlace=resvillage;
	}
	var resdistrict=$("#respondents #district").val();
	if(resdistrict!=null && resdistrict!=""){
		videoneihdVisitorPlace=resdistrict;
	}
	var rescounty=$("#respondents #county").val();
	if(rescounty!=null && rescounty!=""){
		videoneihdVisitorPlace=rescounty;
	}
	
	var videoneihdTitle=$("#title").val();
	var videoneihdAnonymous=$("#anonymity").val();
//	if(videoDetail==null){
//		videoDetail="暂无简介";
//	}
	//视频会议
	var confstartTime=$("#startTime").val();
	var confduration=$("#duration").val();
	var confrecorded=$("#recorded").val();
	//信访类型
	var videoneihdTypeId=$("#neightType").val();
	//办理意见
	var videoneihdHandleOpinion=$("#opinion").val();
	//信息概况
	var videoneihdInformProfile=$("#Overview").val();
	//接访人单位
	var videoneihdLiberateCompany=$("#neightUnit").val();
	var Redistrict=$("#registerArea #district").val();
	var Recounty=$("#registerArea #county").val();
	var videoneihdRegistratePlace="";
	if(Redistrict!=null && Redistrict!=""){
		videoneihdRegistratePlace=Redistrict;
	}
	var Recounty=$("#petition #county").val();
	if(Recounty!=null && Recounty!=""){
		videoneihdRegistratePlace=Recounty;
	}
	//接访人职务
	var videoneihdPeopleDuty=$("#neightJob").val();
	//接访人联系方式
	var videoneihdPeopleContact=$("#neightPhone").val();
	var data={"videoneihdName":videoneihdName,"videoneihdCardType":videoneihdCardType,"videoneihdLocationplace":videoneihdLocationplace
			,"videoneihdCard":videoneihdCard,"videoneihdtelephone":videoneihdtelephone,"videoneihdphone":videoneihdphone,"videoneihdplace":videoneihdplace
//			,"videoneihdNum":videoneihdNum
			,"videoneihdCompany":videoneihdCompany,"videoneihdObjective":videoneihdObjective,"videoneihdDate":videoneihdDate
			,"videoneihdRegistrant":videoneihdRegistrant,"videoneihdRegistDepartment":videoneihdRegistDepartment,"videoneihdRegistDate":videoneihdRegistDate
			,"videoneihdNumber":videoneihdNumber,"videoneihdReason":videoneihdReason,"videoneihdRemark":videoneihdRemark
			,"videoneihdPostCode":videoneihdPostCode,"videoneihdNationality":videoneihdNationality,"videoneihdComplainant":videoneihdComplainant
			,"videoneihdRespondent":videoneihdRespondent,"videoneihdInvolveNumber":videoneihdInvolveNumber,"videoneihdAgreeOpen":videoneihdAgreeOpen
			,"videoneihdVisitorPlace":videoneihdVisitorPlace,"videoneihdTitle":videoneihdTitle,"videoneihdAnonymous":videoneihdAnonymous
			,"videoneihdTypeId":videoneihdTypeId,"videoneihdHandleOpinion":videoneihdHandleOpinion,"videoneihdInformProfile":videoneihdInformProfile
			,"videoneihdLiberateCompany":videoneihdLiberateCompany,"videoneihdRegistratePlace":videoneihdRegistratePlace
			,"videoneihdPeopleDuty":videoneihdPeopleDuty,"videoneihdPeopleContact":videoneihdPeopleContact
	};
	if(videoneihdId!=null){
		data.videoneihdId = videoneihdId
	}

	$.ajax({
	    url:"/spywBeta/videoNeighborhood/videoNeighborhoodSave.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:data,    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	if(req.status==0){
	    		var datatt={"videoneihdId":req.videoneihdId,"confstartTime":confstartTime,"duration":confduration,"isRecording":confrecorded,"type":3,"videoneihdLocationplace":videoneihdLocationplace,"videoneihdVisitorPlace":videoneihdVisitorPlace,"videoneihdTitle":videoneihdTitle};
	    		if(ifnotedit==1){
	    			ajaxLoading.hide();
	    			setTimeout(function() {
						location.href = "viewNeighborhood.html";
					}, 1000)
	    		}else{
	    			$.ajax({
		    		    url:"/spywBeta/videoNeighborhood/addConference.do",    //请求的url地址
		    		    dataType:"json",   //返回格式为json
		    		    data:datatt,    //参数值
		    		    type:"post",   //请求方式
		    		    success:function(responseStr){
		    		    	ajaxLoading.hide();
		    		    	if (responseStr.status == 1) {
		    					alert(responseStr.msg);
		    					setTimeout(function() {
		    						location.href = "viewNeighborhood.html";
		    					}, 1000)
		    				} else {
		    					alert(responseStr.msg);
		    				}
		    	     		
		    		    }
		    		});
	    		}
	    	}
     		
	    },
	    beforeSend: function() {
	    	ajaxLoading.show();
	    },
	    error: function() {
	    	ajaxLoading.hide();
	    	alert("服务繁忙，请稍后再试")
	    }
	});
}
