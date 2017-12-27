
var id = GetQueryString("id");
var type = GetQueryString("type");

$(function(){
	
	$.post("../../information/getInformationById.do",{id:id},function(data){
		if(type==1){
			$(".iconTitle").text("热点新闻");
		}
		if(type==2){
			$(".iconTitle").text("平安淮安");
		}
		if(type==3){
			$(".iconTitle").text("政法新闻");
		}
		if(type==4){
			$(".iconTitle").text("社会治理");
		}
		
		$(".artTitle").text(data.title);
		$(".artText").text(data.content);
		$(".artPic").append("<img src="+data.image+">");
		
	});
	
});