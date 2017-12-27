$(function(){
	$(".container .content .voteExplainTit").text();
	$(".container .content .voteExplain").text();
	$(".container .contMain ul li").remove();
	videoResearchload();
});
function videoResearchload(){
	var videoResearchId=GetQueryString("videoResearchId");
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
			var rlist=req.Rlist;
			var research=req.videoResearch;
			$(".container .content .voteExplainTit").text(research.videoResearchName);
			$(".container .content .voteExplain").text(research.videoResearchRemark);
//			$(".container .contMain ul li").remove();
			if(list!=null){
				for(var i=0;i<list.length;i++){
					var text='';
					text+='<li>';
					text+='<a href="javascript:;">';
					text+='<div>';
					text+='<div class="name">'+list[i].videoActiveName+'</div>';
					var Avote=list[i].videoActiveVote/200;
					text+='<div class="progressBar"><span style="width:'+Avote+'%"></span></div>';
					text+='<div class="poll">'+list[i].videoActiveVote+' Votes</div>';
					text+='<div class="picWrap">';
					var type=GetQueryString("type");
					if(type>0){
						text+='<img src="'+list[i].videoActivePath+'" onclick="videoResearchVote(\''+list[i].videoActiveId+"','"+videoResearchId+"','"+2+'\')">';
					}else{
						if(rlist==1){
							text+='<img src="'+list[i].videoActivePath+'" onclick="videoResearchVote(\''+list[i].videoActiveId+"','"+videoResearchId+"','"+1+"','"+research.videoResearchType+'\')">';
						}else{
							text+='<img src="'+list[i].videoActivePath+'" onclick="videoResearchVote(\''+list[i].videoActiveId+"','"+videoResearchId+"','"+rlist+'\')">';
						}
					}
					text+='</div>';
					text+='</div>';
					text+='</a>';
					text+='</li>';
					$(".container .contMain ul").append(text);
				}
			}
			var info = JSON.parse(localStorage.getItem("info"));
			if (info.usergroupid.toString().length <6) {
				$(".container .content .btnWrap").html('<a href="researchStat.html?videoResearchId='+videoResearchId+'" class="btn btn-primary">查看结果</a>');
			}else{
				$(".container .content .btnWrap").html("");
			}
			
		}
	})
}
function videoResearchVote(ActiveId,researchId,odd,obb){ 
	var flag=false;
	if(odd==1){  
		flag=true;
	}else if(odd==2){
		flag=false;
		alert("投票时间过期");
	}else if(odd==3){
		flag=false;
		alert("整场只能投一票，您已投过，不能重复投票");
	}else if(odd==4){
		flag=false;
		alert("一天投一票，您已投过，不能重复投票");
	}else if(odd==5){
		flag=false;
		alert("一天投五票，您已投过，不能重复投票");
	}
	if(flag){
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
	}
}