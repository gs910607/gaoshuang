var articleId = GetQueryString("articleId");
$(function(){
	var videoResearchId=GetQueryString("articleId");
	var data={"videoResearchId":videoResearchId,"pagenum":10};
	researchVoteLoad(data);
})

var user = JSON.parse(sessionStorage.getItem("user")) || null;

user ? '' : location.href = "../../index.html";


function researchVoteLoad(data){
	// $(".content .contList table tbody tr").remove();
	$.ajax({
		type: 'post',
		url: '/xlhaBeta/onlineEvaluating/videoResearchVote.do',
		data: data,
		dataType: 'json',
		success: function(req) {
			if(req.status==0){
				var list=req.list;
				var allPoll = 0;
				for(var i=0;i<list.length;i++){
					allPoll += list[i].videoActiveVote
				};
				
				var tt='';
				for(var i=0;i<list.length;i++){
					var count=list[i].videoActiveVote;
					tt+='<tr>';
					tt+='<td></td>';
					tt+='<td width="600" class="text-left"><p style="width:600px">'+list[i].videoActiveName+'</p></td>';
					tt+='<td width="250" style="vertical-align:middle;">';
					tt+='<div class="progress">';
					tt+='<div class="progress-bar" role="progressbar" style="width:'+count/allPoll*100+'%;">';
					tt+='<span class="sr-only"></span>';
					tt+='</div>';
					tt+='</div>';
					tt+='</td>';
					tt+='<td>'+( allPoll ? (count/allPoll*100).toFixed(2) : 0 )+'%</td>';
					tt+='<td>'+count+'</td>';
					tt+='</tr>';
				}
				$(".content .contList table tbody").html(tt);
			}else{ 
				alert("暂无数据")
			}
		}
	})
}
$("#researchVotejson").click(function(){
	var num=$("#quantity").val();
	var videoResearchId=GetQueryString("articleId");
	var data={"videoResearchId":videoResearchId,"pagenum":num};
	researchVoteLoad(data);
})