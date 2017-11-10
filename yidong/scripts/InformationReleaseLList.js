
Page({
	num: 100,				//页码数
	startnum:1,				//指定页码
	elem:$('#page2'),		//指定的元素
	callback:function(n){	//回调函数
		console.log(n) //当前点击的页码
		
	}
});

handleClick(); //表格渲染完成后执行
function handleClick() {
	$(".modification").on("click", function() {
		var articleID = $(this).data("articleid");
		$(this).attr("href","postMessage.html?articleId="+articleID)
	})
}
