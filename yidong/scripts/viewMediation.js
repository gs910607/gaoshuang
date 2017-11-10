Page({
	num: 100,				//页码数
	startnum:1,				//指定页码
	elem:$('#page2'),		//指定的元素
	callback:function(n){	//回调函数
		console.log(n) //当前点击的页码
		
	}
});

handeClick() //遍历表格后执行
function handeClick() {
	$(".toVideo").on("click", function() {
		var videoId = $(this).data("videoid");
		$(this).attr("href","http://www.baidu.com?videoId="+videoId) 
	})
}