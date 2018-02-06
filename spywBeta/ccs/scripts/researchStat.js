$(function(){
	var videoResearchId=GetQueryString("videoResearchId");
	var data={"videoResearchId":videoResearchId,"pagenum":10};
	researchVoteLoad(data);
})
function researchVoteLoad(data){
	$(".content .contList table tbody tr").remove();
	$.ajax({
		type: 'post',
		url: '/spywBeta/videoResearch/videoResearchVote.do',
		data: data,
		dataType: 'json',
		success: function(req) {
			if(req.status==0){
				var list=req.list;
				var allPoll = 0;
				for(var i=0;i<list.length;i++){
					
					allPoll += Number(list[i].videoActiveVote);
				};
				for(var i=0;i<list.length;i++){
					var count=list[i].videoActiveVote;
					var tt='';
					tt+='<tr>';
					tt+='<td></td>';
					tt+='<td width="600" class="text-left"><p style="width:600px"><a href="javascript:;">'+list[i].videoActiveName+'</a></p></td>';
					tt+='<td width="250" style="vertical-align:middle;">';
					tt+='<div class="progress">';
					tt+='<div class="progress-bar" role="progressbar" style="width:'+count/allPoll*100+'%;">';
					tt+='<span class="sr-only"></span>';
					tt+='</div>';
					tt+='</div>';
					tt+='</td>';
					if(allPoll!=0){
						tt+='<td>'+(count/allPoll*100).toFixed(2)+'%</td>';
					}else{
						tt+='<td>0%</td>';
					}
					tt+='<td>'+count+'</td>';
					tt+='</tr>';
					$(".content .contList table tbody").append(tt);
				}
			}else{ 
				alert("暂无数据")
			}
		}
	})
}
$("#researchVotejson").click(function(){
	var num=$("#quantity").val();
	var videoResearchId=GetQueryString("videoResearchId");
	var data={"videoResearchId":videoResearchId,"pagenum":num};
	researchVoteLoad(data);
})