$(".sphy0").off().on("click",function(){
	location.href = "https://112.1.17.177/ScheduledConference/New.aspx";
	//192.168.14.123/ScheduledConference/New.aspx
});
$(".spjk0").off().on("click",function(){
	//location.href = "spjk.html";
	location.href = "http://183.230.102.53:81";
});
/*视频接访
 * */
$(".spjf0").off().on("click",function(){
	location.href = "videoNeighborhood/viewNeighborhood.html";
});
/*视频调解
 * */
$(".sptj0").off().on("click",function(){
	location.href = "videoMediation/viewMediation.html";
});
/*视频培训
 * */
$(".sppx0").off().on("click",function(){
	location.href = "videoTraining/videoTraining.html";
});
/*信息发布
 * */
$(".xxfb0").off().on("click",function(){
	location.href = "informationPublish/informationPublish.html";
});
/*视频调研
 * */
$(".spdy0").off().on("click",function(){
	location.href = "videoResearch/videoResearch.html";
});
/*视频监督
 * */
$(".spjd0").off().on("click",function(){
	location.href = "spdc.html";
});
var i = 0;
$(".yjhf").off().on("click",function(){
	if(i%2==0){
		$(".bg").css("background-image","url(../images/bg02.png)");
	}else{
		$(".bg").css("background-image","url(../images/bg01.png)");
	}
	i++;
});