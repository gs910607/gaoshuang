$(function() {
	$.post("../../admin/getInfo.do", function(data) {
		$("#accountNumber").text(data.username);
		$("#authority").text(data.auth);
		$("#username").text(data.realname);
		$("#idNumber").text(data.identity);
		$("#telephone").text(data.usertel);
		$("#remark").text(data.remark);
		new selectArea('body',{
			data: data.usergroupid
		})
	});
});