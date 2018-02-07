var videoResearchType;
var videoResearchId=GetQueryString("videoResearchId");
var type=GetQueryString("type");

$(function(){
	$(".container .content .voteExplainTit").text("");
	$(".container .content .voteExplain").text("");
	$(".container .contMain ul li").remove();
	videoResearchload();
});

$("#voteBtn").on("click", function() {
	var videoActiveIdArr = voteCount();
	if(videoActiveIdArr.length <=0) {
		alert("请选择候选人");
		return;
	}
	videoActiveIdArr = videoActiveIdArr.join(",")
	videoResearchVote(videoActiveIdArr,videoResearchId,videoResearchType)
});

function voteCount() {
	var videoActiveIdArr = [];
	$(".presonList li.active").each(function(index,value) {
		var id = $(value).data("id");
		videoActiveIdArr.push(id);
	});
	return videoActiveIdArr;
}

function videoResearchload(){
	$.ajax({ 
		type: 'post',
		url: '/spywBeta/videoResearch/videoResearchActivelistjoin.do',
		data: {"videoResearchId":videoResearchId},
		dataType: 'json',
		beforeSend : function() {
			$(".container .content .voteExplainTit").text();
			$(".container .content .voteExplain").text();
			$(".container .contMain ul li").remove();
		},
		success: function(req) {
			var list=req.list;

			if(list == undefined) {
				alert(config.errorArticleMsg);
	    		setTimeout(function(){
	    			location.href = 'researchNav.html';
	    		},1000);

	    		return;
			}

			var rlist=req.Rlist;
			var research=req.videoResearch;
			videoResearchType = research.videoResearchType;
			$(".container .content .voteExplainTit").text(research.videoResearchName);
			$(".container .content .voteExplain").text(research.videoResearchRemark);
//			$(".container .contMain ul li").remove();
			if(list!=null){
				for(var i=0;i<list.length;i++){
					var text='';
					text+='<li data-id="'+ list[i].videoActiveId +'">';
					text+='<a href="javascript:;" onclick="selectSelf(event,'+ research.videoResearchVoteNumber +','+rlist+')">';
					text+='<div>';
					text+='<i class="selectIcon"></i>';
					text+='<div class="name">'+list[i].videoActiveName+'</div>';
					var Avote=list[i].videoActiveVote/200;
					text+='<div class="progressBar"><span style="width:'+Avote+'%"></span></div>';
					text+='<div class="poll">'+list[i].videoActiveVote+' Votes</div>';
					text+='<div class="picWrap">';
					text+='<img src="'+list[i].videoActivePath+'">';
					// if(type>0){
					// 	text+='<img src="'+list[i].videoActivePath+'" onclick="videoResearchVote(\''+list[i].videoActiveId+"','"+videoResearchId+"','"+2+'\')">';
					// }else{
					// 	if(rlist==1){
					// 		text+='<img src="'+list[i].videoActivePath+'" onclick="videoResearchVote(\''+list[i].videoActiveId+"','"+videoResearchId+"','"+1+"','"+research.videoResearchType+'\')">';
					// 	}else{
					// 		text+='<img src="'+list[i].videoActivePath+'" onclick="videoResearchVote(\''+list[i].videoActiveId+"','"+videoResearchId+"','"+rlist+'\')">';
					// 	}
					// }
					text+='</div>';
					text+='</div>';
					text+='</a>';
					text+='</li>';
					$(".container .contMain ul").append(text);
				}
			}
			// var info = JSON.parse(localStorage.getItem("info"));
			// if (info.usergroupid.toString().length <6) {
			$("#looResult").attr('href', 'researchStat.html?videoResearchId='+videoResearchId);
			// }else{
			// 	$("#looResult").remove();
			// }
		}
	})
}
function videoResearchVote(ActiveId,researchId,obb){ 
	// var flag=false;
	// if(odd==1){  
	// 	flag=true;
	// }else if(odd==2){
	// 	flag=false;
	// 	alert("投票时间过期");
	// }else if(odd==3){
	// 	flag=false;
	// 	alert("整场只能投一票，您已投过，不能重复投票");
	// }else if(odd==4){
	// 	flag=false;
	// 	alert("一天投一票，您已投过，不能重复投票");
	// }else if(odd==5){
	// 	flag=false;
	// 	alert("一天投五票，您已投过，不能重复投票");
	// }
	// if(flag){
		$.ajax({
			type: 'post',
			url: '/spywBeta/videoResearch/videoResearchActiveVote.do',
			data: {"videoResearchId":ActiveId,"researchId":researchId,"videoResearchType":obb},
			dataType: 'json',
			success: function(req) {
				if(req.status==0){
					alert("投票成功");
					$(".container .content .voteExplainTit").text();
					$(".container .content .voteExplain").text();
					$(".container .contMain ul li").remove();
					videoResearchload();
				}else{ 
					alert("投票失败")
				}
			}
		})
	// }
}

function selectSelf(event,VoteNum,odd){ //多选
	var activeIdArr = voteCount();

	var Count = activeIdArr.length;
	var _this = event.target;
	if(odd==1){
		if($(_this).parents("li").hasClass("active")) {
			$(_this).parents("li").removeClass("active");
		} else {
			if(Count>=VoteNum){
				alert("单次投票最多只能选择"+ VoteNum +"票")
			}else{
				$(_this).parents("li").addClass("active");
			}
		}
	}else if(odd==2){
		alert("投票时间已截止")
	}else if(odd==3){
		alert("整场投票仅限投一次")
	}else if(odd==4){
		alert("每天仅限投一次")
	}else if(odd==5){
		alert("每天仅限投五次")
	}
}