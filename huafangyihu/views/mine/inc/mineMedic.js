var userId;
var token;
var pageNo = 1;
var pageSize = 7;
var doctorId;

getItem();
init();

// 获取数据
function getItem() {
	user = JSON.parse(localStorage.getItem("user"));
	userId = user.userId;
	token = user.token;
	console.log(user)
}

// 初始化渲染
function init() {
	var params = {
		userId: userId,
		pageNo: pageNo,
		pageSize: pageSize,
		token: token
	};
	// console.log(params)
	$.ajax({
		type: "GET",
		url: config.appserver_url + '/docPa/queryFocusDoc.json',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function(data) {
			console.log(data)
			tokenLose(data.status);
			var listDoc = $(".list-ul").html();
			for(var i = 0; i < data.data.length; i++) {
				listDoc += '<li id="li" data-id="' + data.data[i].id + '" data-hospitalid="'+ data.data[i].hospitalId +'" class="list-li" style="position: relative;">';
				listDoc += '<div class="con">';
				listDoc += '<img class="userHead" src="' + (data.data[i].avatar || defaultVar.onerrorImg) + '" alt="" />';
				listDoc += ' <div class="medicMessage">';
				listDoc += '<div class="medicMessage-evaluate">';
				listDoc += '<span class="doctorName">' + data.data[i].realName + '</span>';
				listDoc += '<span class="evaluate">';
				gradeImg(data.data[i].evaluationScore);
				listDoc += '<span class="appraise">' + (data.data[i].evaluationScore ? data.data[i].evaluationScore : '&nbsp;&nbsp;0') + '分</span></span></div>';
				listDoc += '<div class="clear"></div>';
				listDoc += '<div class="medicMessage-post">';
				listDoc += '<span>' + data.data[i].title + '</span> <span>' + data.data[i].name + '</span> <span>' + data.data[i].workYear + '年工作经验</span></div>';
				listDoc += '<div class="clear"></div><div class="strongPoint"><span></span>';
				listDoc += '<span class="strongPoint-content">' + data.data[0].diseaseLabel + '</span></div>';
				listDoc += '<div class="clear"></div></div></div>';
				listDoc += '<div class="btn">咨询</div><div class="btn2">删除</div>';
				listDoc += '<div class="shade1" data-id=' + data.data[i].id + ' style="position: absolute; width: 100%; height: 100%; top: 0;"></div></li>';
			}
			$(".list-ul").html(listDoc);

			//分数
			function gradeImg(e) {
				if(e < 0.5) {
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 1) {
					listDoc += '<img class="evaluateImg" src="../../images/smallStar.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 1.5) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 2) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/smallStar.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 2.5) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 3) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/smallStar.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 3.5) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 4) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/smallStar.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 4.5) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star2.png" alt="" /> ';
				} else if(e < 5) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/smallStar.png" alt="" /> ';
				} else if(e == 5) {
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
					listDoc += '<img class="evaluateImg" src="../../images/star.png" alt="" /> ';
				} else {}
				return;
			};
			slideLeft();
			deleteDocPa();
			consultDoc();
			enterMedicIndex();
		},
		error: function() {
			alert('服务繁忙，请稍后再试！');
		},
		beforeSend: function() {
			$(".noMore").hide();
			$(".ajaxLoading").show();
		},
		complete: function() {
			$(".noMore").show();
			$(".ajaxLoading").hide();
		}

	})
}

//删除
function deleteDocPa() {
	$(".btn2").on("click",function(){
		var thisBtn = $(this);
		var doctorId = $(this).parent().data("id")
		var params = {
			userId: userId,
			doctorId: doctorId,
			token: token
		};
		isDelete(function() {
			$.ajax({
				type: "POST",
				url: config.appserver_url + '/docPa/focus.json',
				dataType: 'json',
				data: params,
				success: function(data) {
					tokenLose(data.status);
					thisBtn.parent().hide();
				},
				error: function() {
					alert('服务繁忙，请稍后再试！');
				}
			});
		});
	});
};

//咨询
function consultDoc() {
	$(".btn").on("click",function(){
	var doctorId =$(this).closest(".list-li").attr("data-id");
	var hospitalId = $(this).closest(".list-li").data("hospitalid");
    // sessionStorage.setItem("doctorId",doctorId);
    historyForward("../medic/onlineConsulting.html?doctorId=" + doctorId);
	})


}
//进入医护主页
function enterMedicIndex(){
	$(".shade").on("click",function(){
	 var doctorId =	$(this).data("id")
	//  sessionStorage.setItem("doctorId",doctorId)
	 historyForward("../medic/medicIndex.html?doctorId="+doctorId);
	})

}
