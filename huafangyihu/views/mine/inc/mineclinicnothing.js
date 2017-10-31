// JavaScript Document
//分享
$(".clinic-more").on("click", function() {
	$("#modal").css("display", "none")
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#shareMain").css("display", "block")
//禁用滚动条事件
	$("body").css("overflow","hidden")

$(".modal-cancel").css("display","block")
    var modalCancel =$("#shareMain").offset().top
    console.log(modalCancel)   
    $(".modal-cancel").height(modalCancel)
})
//点击蒙版层关闭分享
$(".modal-cancel").on("click",function(){
	$(".modal-cancel").css("display","none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})
//关闭分享
$("#shareMain-close").on("click", function() {
	$(".modal-cancel").css("display","none")
	$("#shareMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})

