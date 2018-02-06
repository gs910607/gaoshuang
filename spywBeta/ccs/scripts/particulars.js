
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
		$(".artText").html(data.content);
//		$(".artPic").append("<img src="+data.image+">");
		
	});
	var userinfo = JSON.parse(localStorage.info) ;
	if(userinfo && userinfo.usergroupid.toString().length > 3){
		$("#forward").parent().hide();
	}else{
		$("#forward").on("click",function(){
			$.post("/spywBeta/information/reply.do",{id:id},function(data){
				if(data.status == 1){
					alert(data.msg);
				}else{
					alert(data.msg);
				}
			})
		})
	}
	
	
	
});