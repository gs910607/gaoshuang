
var number = 1;

$(function() {
	$.post("../../information/getPageList.do", function(data) {
		console.log(data);
		number = data.num;
		Page({
			num : number, //页码数
			startnum : 1, //指定页码
			elem : $('#page2'), //指定的元素
			callback : function(n) { //回调函数
				console.log(n) //当前点击的页码
				$.post("../../information/getPageList.do?pages=" + n, function(data) {
					setInformation(data);
				}, "json");
			}
		});

		setInformation(data);
	}, "json");



});
function setInformation(data) {
	$("#content").text("");
	$(data.list).each(function(i, n) {
		if (i < 10) {
			$("#content").append("<tr><td></td><td><p class='artTitle'>" + n.title + "</p></td><td align='center'>" + n.createtime + "</td><td align='center' class='operation'><aclass='modification' href='javascript:;'data-articleid=" + n.informationid + "><img src='../../images/modification.png'></a> <a class='delete' href='javascript:;'><img src='../../images/delete.png'></a></td></tr>");
		}
		console.log(i);
	});
}

handleClick(); //表格渲染完成后执行
function handleClick() {
	$(".modification").on("click", function() {
		var articleID = $(this).data("articleid");
		$(this).attr("href", "postMessage.html?articleId=" + articleID)
	})
}