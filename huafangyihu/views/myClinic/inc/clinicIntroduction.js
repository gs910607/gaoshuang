//弹出拨打
$("#dial").on("click", function() {
	$("#modal").css("display", "none")
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	console.log(modalWidth)
	var modalHeight = $(document).height()
	console.log(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#dialMain").css("display", "block")
//禁用滚动条事件
	$("body").css("overflow","hidden")


$(".dialMain-address").on("click", function() {
	$("#dialMain").css("display", "none")
	$("#modal").css("display", "none")
	$("body").css("overflow","auto")
})

//模态框弹出层
$("#attention-img-yes").on("click", function() {
	$("#modal").css("display", "block")
	var modalWidth = $(document).width()
	var modalHeight = $(document).height()
	$("#modal").width(modalWidth)
	$("#modal").height(modalHeight)
	$("#modal").css("background-color", "#111111")
	$("#modal-div").css("display", "block")
	$("#modal-div").css("background-color", "white")
})
$("#modal-div-second").on('click', function() {
	$("#modal-div").css("display", "none")
	$("#modal").css("display", "none")
})
$("#modal-div-three").on('click', function() {
	$("#modal-div").css("display", "none")
	$("#modal").css("display", "none")
})
})





var token;
var userId;
var longitude;
var latitude;
var hospitalId;





//参数的传入
hospitalId = GetQueryStr("hospitalId")
user = JSON.parse(localStorage.getItem("user"));
token =user.token;
userId = user.userId;
latitude = sessionStorage.getItem("latitude");
longitude = sessionStorage.getItem("longitude");

initPage();
function initPage(){
        var param = {
            hospitalId: hospitalId,
            token: token,
            latitude:latitude,
            longitude:longitude
        }
        console.log(param)
        $.ajax({
            type: "get",
            data: param,
            url: config.appserver_url + "/myClinic/hospitalIntroduce.json",
            dataType: "json",
            async: true,
            success: function (data) {
             tokenLose(data.status);
             console.log(data)
             $(".clinic-introduce-p").text(data.data.hospitalVo.summary)
//           $(".first-img").attr("src",data.data.hospitalVo.picUrl)
             var picList = $(".clinic-environmental").html();
             if(data.data.picList.length ==0){
             	
             }else{

             for( var i = 0; i < data.data.picList.length; i++){
             console.log(data.data.picList[i])
             picList +='<span class="clinic-environmental-span">';
             picList +='<img class="clinic-environmental-img" src="'+data.data.picList[i].imageUrl+'" alt="">';
             picList +='</span>';
             }
               }
             $(".clinic-environmental").html(picList)
            $(".clinic-title>h6").text(data.data.hospitalVo.name)
            $(".address>span").eq(0).text(data.data.hospitalVo.address)
             $(".clinic-title>span").text(data.data.hospitalVo.typeName)
             var tel = "您确认要拨打"+data.data.hospitalVo.tel+"吗？";
             $("#dialMain-first>p").text(tel)
             $(".clinic-number").text(data.data.hospitalVo.evaluationScore+"分")
             judgeGrade1(data.data.hospitalVo.evaluationScore);
            function judgeGrade1(e) {
                if (e < 0.5) {

                } else if (e < 1) {	
                } else if (e < 1.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                } else if (e < 2) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/bigStar.png")
                } else if (e < 2.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                } else if (e < 3) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/bigStar.png")
                } else if (e < 3.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                } else if (e < 4) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(3).attr("src", "../../images/bigStar.png")
                } else if (e < 4.5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(3).attr("src", "../../images/star.png")
                } else if (e < 5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(3).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(4).attr("src", "../../images/bigStar.png")
                } else if (e == 5) {
                    $(".clinic-img").eq(0).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(1).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(2).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(3).attr("src", "../../images/star.png")
                    $(".clinic-img").eq(4).attr("src", "../../images/star.png")
                } else {
                    //alert("综合评分返回0~5")
                }
                return;
            }

            },

            error: function () {

            }
        })
        
}        
        
