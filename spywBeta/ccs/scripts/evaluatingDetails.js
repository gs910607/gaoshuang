$(function(){
	var problempaperId=GetQueryString("problempaperId");
	$(".container .content .formWrap div").remove();
	$.ajax({
	    url:"/spywBeta/videoResearch/problemPaperDetial.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:{"problempaperId":problempaperId},    //参数值
	    type:"post",   //请求方式
	    success:function(req){

	    	if(req.status==0){
	    		if(req.problempaper == null) {
	    			alert(config.errorArticleMsg)
	    			setTimeout(function(){
	    				location.href = 'researchNav.html';
	    			},1000);
	    			return;
	    		}

	    		var paper=req.problempaper;
	    		var tt='';
	    		tt+='<div class="contWrap">';
	    		tt+='<h3 class="detailTit">'+paper.problempaperName+'</h3>';
				tt+='<div class="detailCont">';
				tt+='<ul class="questionsList">';
				var questlist=paper.problemPaperQuestlist;
				if(questlist!=null){
					if(questlist.length>0){
						for(var i=0;i<questlist.length;i++){
							tt+='<li class="quesItem">';
				    		tt+='<dl>';
				    		tt+='<dt data-quesid="'+questlist[i].paperquestId+'">'+(i+1)+'、'+questlist[i].paperquestName+'</dt>';
				    		tt+='<dd class="clearfix">';
				    		tt+='<ul class="answerList clearfix">';
				    		var optionlist=questlist[i].problemPaperQuestOptionlist;
				    		if(optionlist!=null){
				    			if(optionlist.length>0){
				    				for(var j=0;j<optionlist.length;j++){
				    					tt+='<li class="answerItem">';
						    			tt+='<label class="radio-inline">';
						    			tt+='<input type="radio" name="ques'+(i)+'" value="'+optionlist[j].paperquestOptionId+'">'+optionlist[j].paperquestOptionName+'';
						    			tt+='</label>';
						    			tt+='</li>';
				    				}
				    			}
				    		}
				    		tt+='</ul>';
				    		tt+='</dd>';
				    		tt+='</dl>';
				    		tt+='</li>';
						}
					}
				}
	    		tt+='</ul>';
	    		tt+='</div>';
	    		tt+='</div>';
	    		$(".container .content .formWrap").append(tt);
	    		
	    		var txt='';
	    		txt+='<a href="javascript:;" onclick="submitBtn()" class="btn btn-primary">提交</a>';
	    		var info = JSON.parse(localStorage.getItem("info"));
				if (info.usergroupid.toString().length <6) {
	    		txt+='<a style="margin-left:10px;" href="evaluatingStat.html?problempaperId='+problempaperId+'" class="btn btn-primary">统计</a>';
				}
	    		$(".btnWrap").html(txt);
	    	}
	    }
	});
	
})

function submitBtn() {
	var ansArr = [];  //提交的题目
	var errArr = [];  //没选择题目
	$(".questionsList > li").each(function(ind, ele) {
		var quesId = $(ele).find("dt").data("quesid");
		var answerId = $(ele).find(".answerList li input:checked").val();
		if(!answerId) {
			errArr.push(ele);
			$(errArr[0]).testRemind("请选择答案");
		};
		ansArr.push({
			quesId: quesId,
			answerId: answerId
		});
	});
	var problempaperId=GetQueryString("problempaperId");
	$.ajax({
	    url:"/spywBeta/videoResearch/problemPaperrecordSave.do",    //请求的url地址
	    dataType:"json",   //返回格式为json
	    data:{"ansArr":JSON.stringify(ansArr),"problempaperId":problempaperId},    //参数值
	    type:"post",   //请求方式
	    success:function(req){
	    	if(req.status==0){
	    		alert(req.success);
	    		setTimeout(function() {
	     			location.href = "/spywBeta/pages/videoResearch/evaluatingList.html"
	     		},1000)
	    	}else{
	    		alert(req.success);
	    	}
	    }
	});
}
