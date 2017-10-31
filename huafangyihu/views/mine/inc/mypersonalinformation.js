// JavaScript Document
var user;
var userId;
var token;

var label;
var sex;

getItem();
init();

//切换性别
 $(".sex.recognition-affirm").on("click",function(){
 	sex = $(this).data("sex");
	$(this).addClass("currentSex").siblings(".sex.recognition-affirm").removeClass("currentSex");
	$(".sex-person").css("color","#999");
	$(".currentSex").children(".sex-person").css("color","#EC9C00");
    $(".sex-img").attr("src","../../images/off.png");
	$(".currentSex").children(".sex-img").attr("src","../../images/on.png");
});
function selectSex(sex) {
	if(sex == "0") {
		$("#male").addClass("currentSex").siblings("#female").removeClass("currentSex");
	} else if(sex == "1") {
		$("#female").addClass("currentSex").siblings("#male").removeClass("currentSex");
	};
	$(".sex-person").css("color","#999");
	$(".currentSex").children(".sex-person").css("color","#EC9C00");
    $(".sex-img").attr("src","../../images/off.png");
	$(".currentSex").children(".sex-img").attr("src","../../images/on.png");
}

function init() {
	// 姓名性别生日
	var params1 = {
		userId: userId
	};
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/unfiedUser/queryUnfiedUser.json',
		dataType: 'json',
		data: params1,
		async: false,
		contentType: 'application/json',
		success: function(response) {
			console.log(response.data)
			tokenLose(response.status);
			if(response.data ==null){}else{
			var data = response.data;
			label = data.diseaseFlag;
			sex = data.sex;
			$("#name > input").val(data.realName);
			selectSex(sex);
			$("#birthday > input").val(formattingDate(data.birthday));
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});

	// 慢病标签
	var params2 = {
		token: token
	};
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/unfiedUser/queryAllSlowTag.json',
		dataType: 'json',
		data: params2,
		contentType: 'application/json',
		success: function(response) {
			tokenLose(response.status);
			var data = response.data;
			var dataCode = [];
			var str = '';
			var dataLength = data.length;
			for( var r=0; r<dataLength; r++) {
				var obj = data[r];
				dataCode.push(obj.code)
			};

	      var dataLength1 = dataLength < 15 ? dataLength : 15;
			str += '<div class="contents">';
	      str += '   <ul class="clearfix">';
			for(var i=0; i<dataLength1; i++) {
				var obj = data[i];
				str += '		<li class="item" data-code="'+ obj.code +'"><span>'+ obj.name +'</span></li>';
			};
			str += '   </ul>';
         	str += '</div>';
			$(".eachcircle").html("");

			if(dataLength >= 15 ) {
		      var dataLength2 = dataLength < 30 ? dataLength : 30;
				str += '<div class="contents">';
		      str += '   <ul class="clearfix">';
				for(var j=15; j<dataLength2; j++) {
					var obj = data[j];
					str += '		<li class="item" data-code="'+ obj.code +'"><span>'+ obj.name +'</span></li>';
				};
				str += '   </ul>';
	         str += '</div>';
				$(".eachcircle").html(
					'<a class="current" href="javascript:;"></a>'+
	          	'<a href="javascript:;"></a>'
				);
			};

			if(dataLength >= 30) {
				str += '<div class="contents">';
		      str += '   <ul class="clearfix">';
		      var dataLength3 = dataLength < 45 ? dataLength : 45;
				for(var k=30; k<dataLength3; k++) {
					var obj = data[k];
					str += '		<li class="item" data-code="'+ obj.code +'"><span>'+ obj.name +'</span></li>';
				};
				str += '   </ul>';
	         str += '</div>';
				$(".eachcircle").html(
					'<a class="current" href="javascript:;"></a>'+
	          	'<a href="javascript:;"></a>'+
	          	'<a href="javascript:;"></a>'
				);
			};
			$(".absosport").html(str);

			if(label) {
				label = label.split(",");
				for(var i=0; i<label.length; i++) {
					var lab = label[i];
					var labIndex = isHasElementOne(dataCode, lab);
					$(".contents .item").eq(labIndex).find("span").addClass("curselect");
					$(".labellength > span").text($(".curselect").length)
				};
			};

			$(".contents .item span").on("click", function() {
				var curSize = $(".curselect").size();

				if($(this).hasClass("curselect")) {
					$(this).removeClass("curselect");
					curSize = $(".curselect").size()
				} else {
					if(curSize >= 5) {
						alert("最多只能选取5个");
						return;
					};
					$(this).addClass("curselect");
					curSize = $(".curselect").size()
				};

				$(".labellength > span").text(curSize)

			});

			carousel('.statuslabel', '.relawrapper', '.absosport', '.contents', '.eachcircle > a', 'current', '', '', '', 500, 500);
			$(window).resize(function() {
				carousel('.statuslabel', '.relawrapper', '.absosport', '.contents', '.eachcircle > a', 'current', '', '', '', 500, 500);
			})
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});
};

// 输入验证
$("input").on("focus", function() {
	$(this).removeClass("error")
})
function infoValid(id) {
	var thisVal = $(id).val();
	if(!thisVal) {
		$(id).addClass("error")
	};
};
$("#name input").on("blur", function() {
	infoValid("#name input")
});

$("#birthday input").on("change", function() {
	var ageVal = $(this).val();
	var mistiming = new Date().getTime() - new Date(ageVal).getTime();
	if(mistiming < 0){
		$(this).addClass("error");
		alert("选择日期超出时间范围");
	}
})
// 提交
$(document).on("click", ".submit-button-a", function() {
	infoValid("#name input");
	infoValid("#phone input");
	if($("#name input").hasClass("error")){
		alert("请输入姓名!");
		return;
	};
	if($(".currentSex").length <= 0) {
		alert("请选择性别！")
		return;
	};
	if($("#birthday input").val() == "") {
		alert("请选择出生日期！");
		return;
	};
	if($("#birthday input").hasClass("error")) {
		alert("选择日期超出时间范围");
		return;
	};

	var codes = [];
	var curLabel = $(".curselect").parent("li");

	for(var i=0; i<curLabel.length; i++) {
		codes.push(curLabel.eq(i).data("code"));
	};

	var params = {
		userId: userId,
		realName: $("#name > input").val(),  //用户姓名
		birthday: $("#birthday > input").val(),  //用户生日
		sex: sex,      //用户性别
		diseaseFlag: codes.join(",")//用户慢性标签
	};

	$.ajax({
		type: 'POST',
		url: config.appserver_url + '/unfiedUser/updateUnfiedUser.json',
		data: params,
		dataType: 'json',
		success: function(response) {
			tokenLose(response.status);
			location.href = "../mine/mineIndex.html";
		}
	});
})

// 获取数据
function getItem() {
    user = JSON.parse(localStorage.getItem("user"));
    userId = user.userId;
    token = user.token;
};

// 格式化时期
function formattingDate(timer) {
	var date = new Date(timer);
	var years = date.getFullYear();
	var months = date.getMonth() + 1;
	var days = date.getDate();
	return years +"-"+ checkTime(months) +"-"+ checkTime(days);
};
function checkTime(timer) {
	return timer < 10 ? '0' + timer : timer;
};

// 返回某个数在数组中的下标
function isHasElementOne(arr,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i] == value){
			return i;
		}
	};
	return -1;
};

// 轮播
function carousel(wrapper, movewrapper, movebox, moveeach, diandian, current, next, prev, ifauto, timing, waiting){
	var wrapperWid = $(wrapper).width();
	var wrapperHei = $(wrapper).height();
	$(movewrapper).width(wrapperWid);
	$(movewrapper).height(wrapperHei);
	$(moveeach).width(wrapperWid);
	$(moveeach).height(wrapperHei);
	$(movebox).width($(moveeach).length * wrapperWid);
	$(movebox).height(wrapperHei);
	var aA = $(diandian);
	var timer = null;
	var curIndex = 0;

	touch.on(movewrapper, "swipeleft", function(e) {
		curIndex++;
		if(curIndex >= $(moveeach).length)curIndex = $(moveeach).length - 1;
		move();
	});

	touch.on(movewrapper, "swiperight", function(e) {
		curIndex--;
			if(curIndex < 0)curIndex = 0;
			move();
	});

	aA.on("click", function(){
		// curIndex = $(this).parent().index();
		curIndex = $(this).index();
		move();
	});
	if(next) {
		$(next).on("click", function(){
			curIndex++;
			if(curIndex >= $(moveeach).length)curIndex = 0;
			move();
		})
	}
	if(prev) {
		$(prev).on("click", function(){
			curIndex--;
			if(curIndex < 0)curIndex = $(moveeach).length - 1;
			move();
		})
	}

	function move() {
		aA.eq(curIndex).addClass(current).siblings().removeClass(current);
		$(movebox).animate({
			left : -wrapperWid * curIndex
		},timing)
	}
	if(ifauto) {
		timer = setInterval(function(){
			$(next).trigger("click");
		},waiting)

		$(wrapper).hover(function(){
			clearInterval(timer)
		},function(){
			timer = setInterval(function(){
				$(next).trigger("click");
			},waiting)
		})
	}
}
