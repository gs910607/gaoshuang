
var user = JSON.parse(sessionStorage.getItem("user")) || null;

user ? '' : location.href = "../../index.html";

var problempaperId=GetQueryString("problempaperId");
 $.ajax({
 	type: 'post',
 	url: '/xlhaBeta/opinionSurvey/problemPaperDetial.do',
 	data: {"problempaperId":problempaperId},
 	dataType: 'json',
 	success: function(response) {
 		ajaxLoading.hide();

 		if(response.problempaper == null) {
			alert(config.errorArticleMsg);

			setTimeout(function(){
				location.href = "../../index.html"
			},1000);

			return;
		};

		if(response.status == 0) {
			$(".detailTit").text(response.problempaper.problempaperName);
			var str = '';
			for(var i=0;i<response.problempaper.problemPaperQuestlist.length;i++) {
				str += '<li class="quesItem">';
				str += '	<dl>';
				str += '		<dt data-quesid="'+ response.problempaper.problemPaperQuestlist[i].paperquestId +'">'+ response.problempaper.problemPaperQuestlist[i].paperquestName +'</dt>';
				str += '		<dd class="clearfix">';
				str += '			<ul class="answerList clearfix">';
										for(var j=0;j<response.problempaper.problemPaperQuestlist[i].problemPaperQuestOptionlist.length;j++) {
											str += '<li class="answerItem">';
											str += ' <a href="javascript:;" onclick="selectRadio(event)">';
											// str += '	<label class="radio-inline">';
											str += '<i data-value="'+ response.problempaper.problemPaperQuestlist[i].problemPaperQuestOptionlist[j].paperquestOptionId +'"></i><span>'+response.problempaper.problemPaperQuestlist[i].problemPaperQuestOptionlist[j].paperquestOptionName +'</span>';
											// str += '	</label>';
											str += ' </a>';
											str += '</li>';
										}
				str += '			</ul>';
				str += '		</dd>';
				str += '	</dl>';
				str += '</li>';
			}
			$(".questionsList").html(str)
			$("#lookStat").on("click", function() {
				$(this).attr("href", "opinionSurveyStat.html?problempaperId="+problempaperId);
			})
		}
		
		
 	},
 	error: function() {
 		ajaxLoading.hide();
 		alert("服务繁忙，请稍后再试")
 	},
 	beforeSend: function() {
 		ajaxLoading.show();
 	}
 })

$("#subAnsBtn").on("click", function() {
	var ansArr = [];  //提交的题目
	var errArr = [];  //没选择题目
	$(".questionsList > li").each(function(ind, ele) {
		var quesId = $(ele).find("dt").data("quesid");
		var answerId = $(ele).find(".answerList li.active i").data("value");

        var isError = false;
		if(!answerId) {
			isError = true;
		};

        if(isError) {
            errArr.push(ele);
            $(errArr[0]).testRemind("请选择答案");
            $("html,body").scrollTop($(errArr[0]).offset().top - 120);
            return;
        }
		ansArr.push({
			quesId: quesId,
			answerId: answerId
		});
	});
    if(errArr.length > 0) {
        return;
    };
	var problempaperId=GetQueryString("problempaperId");

	$.ajax({
	    url:"/xlhaBeta/opinionSurvey/problemPaperrecordSave.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:{
	    	ansArr:JSON.stringify(ansArr),
	    	problempaperId:problempaperId,
	   	 	areaCode: user&&user.areas.code ? user.areas.code : '',
	   	 	realName: user&&user.realname ? user.realname : ''
	   	 },    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	if(req.status==0){
	    		alert(req.success);
	    		setTimeout(function() {
	     			location.href = "opinionSurveyList.html"
	     		},500)
	    	}else{
	    		alert(req.success);
	    	}
	    }
	});
});

function selectRadio(event) {
	$(event.target).parents(".answerList").find(".answerItem").removeClass("active");
	$(event.target).parents(".answerItem").addClass("active");
}

