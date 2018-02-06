$(function(){
	var res=sessionStorage.getItem("info");
	console.log(res);
	if(res!=1){
		alert("尚未登录");
		window.location.href="register.html";
		return;
	}
	$.post("/xlhaBeta/area/getInfo.do",function(data){
		console.log(data)
		$("#accountNumber").text(data.usertel);
		$("#authority").text(data.auth);
//	$("#idNumber").val(res.usertel);
		$("#telephone").text(data.identity);
		new selectArea('body',{
			data: data.usergroupid
		})
	});
});