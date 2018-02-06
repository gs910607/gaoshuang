
var number = 1;
 var user = JSON.parse(sessionStorage.getItem("user")) || null;

// user ? '' : location.href = "../../index.html";

// // //当用户等级大于2时，不能创建
// if(user){
// 	if(user.userlevel > 2){
// 		$(".btnWrap").remove();
// 	}
// } else {
// 	$(".btnWrap").remove();
// }

// $(function() {
// 	$.post("../../threeService/getPageList.do", function(data) {

// 		number = data.num;
// 		Page({
// 			num : number, //页码数
// 			startnum : 1, //指定页码
// 			elem : $('#page'), //指定的元素
// 			callback : function(n) { //回调函数

// 				$.post("../../threeService/getPageList.do?pages=" + n, function(data) {
// 					setThreeService(data);
// 				});
// 			}
// 		});

// 		setThreeService(data);
// 	});
// });

var startTime = '1970-01-01';
var endTime = new Date(new Date().setFullYear(new Date().getFullYear()+50,0,1)).format("yyyy-MM-dd");

var cThreeserviceTitle = '';
var cThreeserviceType = 6;

init();

$("#search").on("click", function() {

	startTime = $("#startTime").val() ? $("#startTime").val() : '1970-01-01';
	endTime = $("#endTime").val() ? $("#endTime").val() : new Date(new Date().setFullYear(new Date().getFullYear()+50,0,1)).format("yyyy-MM-dd");
	cThreeserviceTitle = $("#title").val();
	cThreeserviceType = $("#type").val();

	// if($("#endTime").val() && startTime > endTime) {
	// 	$("#endTime").testRemind("结束时间不得小于开始时间");
	// 	return;
	// }

	init();
});

function init() {
	$.post("/xlhaBeta/threeService/getPageList.do", {
		sizePage: config.sizePage,
		title : cThreeserviceTitle,
		type : cThreeserviceType,
		startTime: new Date(startTime),
		endTime: new Date(new Date(endTime).setDate(new Date(endTime).getDate()+1))
	}, function(data) {

		number = data.num;
		Page({
			num : number, //页码数
			startnum : 1, //指定页码
			elem : $('#page'), //指定的元素
			callback : function(n) { //回调函数
				$.post("/xlhaBeta/threeService/getPageList.do?pages=" + n, {
					sizePage: config.sizePage,
					title : cThreeserviceTitle,
					type : cThreeserviceType,
					startTime: new Date(startTime),
					endTime: new Date(new Date(endTime).setDate(new Date(endTime).getDate()+1))
				}, function(data) {
					setThreeService(data);
				});

			}
		});

		setThreeService(data);
	});
}


function setThreeService(data) {
	$("#content").text("");
	$(data.list).each(function(i, n) {
		 console.log(n)
		var htmldata = "" ;
			htmldata += "<tr>" ;
			htmldata += "<td class='text-left'>" ;
			htmldata += "<a href='threeServicePublicDetails.html?id=" + n.informationid + "'>· " + n.title + "</a></td>" ;
			htmldata += "<td width='120' align='right'>" + new Date(n.createtime).format("yyyy-MM-dd") + "</td>" ;
			// htmldata += "<td>" + n.type + "</td>" ;
			// if(user){
			// 	if(user.userlevel > 2 ){
			// 		$(".table td:nth-child(5)").remove();
			// 	}else{
			// 		htmldata += "<td class='operation' width='80' align='right'>" ;
			// 		htmldata += "<a id='modification' href='threeServicePublicPublish/threeServicePublicPublish.html?id=" + n.id + "'><img src='../../images/modification.png'></a>" ;
			// 		htmldata += "<a id='delete' onclick='deleteMediate("+n.id+")' href='javascript:;'>" ;
			// 		htmldata += "<img src='../../images/delete.png'></a></td>";
			// 	}
			// }else{
			// 	$(".table td:nth-child(5)").remove();
			// }
			htmldata += "</tr>";
			$("#content").append(htmldata);
	});


}

function deleteMediate(id){

	// if(confirm("是否删除?")) {
		$.post("/xlhaBeta/threeService/delById.do", {
			id : id
		}, function(respose) {
			if (respose.status == 1) {
				alert(respose.msg);
				init();
			} else {
				alert(respose.msg);
			}
		});
	// }
}

var parserDate = function(date) {
	var t = Date.parse(date);
	if (!isNaN(t)) {
		return new Date(Date.parse(date.replace(/-/g, "/")));
	} else {
		return new Date();
	}
};

$(".contTab li a").on("click", function() {
	cThreeserviceType = $(this).data("type");

	$(this).addClass("active").parent().siblings().find("a").removeClass("active");

	init();

})