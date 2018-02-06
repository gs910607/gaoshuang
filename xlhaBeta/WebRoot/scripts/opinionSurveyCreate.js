var questionBank = [
	{
		question: '',
		answer: ['']
	}
];

var questionLen = 0;
// 渲染题目数量
quesnaireListDraw();
function quesnaireListDraw() {
	var str = '';
	for(var i=0;i<questionBank.length;i++) {
		var quesLen = questionBank.length == 1 ? 'active' : '';
		str += '<li onclick="lookItem('+ i +')" class="'+ quesLen +'"><i onclick="removeIndex('+ i +',event)">x</i><span>第'+ (i+1) +'题</span></li>';
	}
	str += '<li onclick="pushCount()" class="addQuest"><span>+</span></li>';
	$(".quesnaireList").html(str)
};
function pushCount() {
	questionBank.push({
		question: '',
		answer: ['']
	})
	questionLen = questionBank.length -1
	pushCont(questionLen);
	quesnaireListDraw();
	$("#questions").focus();
	$(".quesnaireList li:nth-last-child(2)").addClass("active");
};

// 查看/修改
function lookItem(index) {
	var _this = $(".quesnaireList li")[index];
	$(".quesnaireList li").removeClass("active");
	$(_this).addClass("active");
	questionLen = index;
	pushCont(questionLen)
};

// 删除题目
function removeIndex(index,e) {
	if(questionBank.length > 1 ) {
		var isDelete = confirm('是否删除');
		if(isDelete) {
			questionBank.splice(index,1);
			questionLen = questionBank.length-1
			quesnaireListDraw();
			lookItem(questionLen)
		}
	} else {
		alert("题目至少保留一个");
	}

	window.event? window.event.cancelBubble = true : e.stopPropagation();
};

// 渲染题目内容
pushCont(questionLen);
function pushCont(index) {
	var contStr = '';
	var data = questionBank[index];
	$("#questions").val(data.question);
	for(var i=0;i<data.answer.length;i++) {
		contStr += '<li><input type="text" value="'+ data.answer[i] +'" onchange="changeAnswer('+ i +')"><i onclick="removeAnswerItem('+ i +')">x</i></li>';
	}
	$(".answerList").html(contStr);
};

// 点击添加选项
$("#addAnsBtn").on("click", function() {
	questionBank[questionLen].answer.push('');
	pushCont(questionLen);
	$(".answerList li:last input").focus();
});

// 删除选项
function removeAnswerItem(index) {
	if(questionBank[questionLen].answer.length > 1 ) {
		questionBank[questionLen].answer.splice(index,1);
		pushCont(questionLen);
		$(".quesnaireList li").eq(questionLen).addClass("active");
	} else {
		alert("选项至少保留一个")
	}
}

// 填写答案
function changeAnswer(index) {
	var _this = $(".answerList li")[index]
	questionBank[questionLen].answer[index] = $(_this).find("input").val();
}

$("#questions").on("change", function() {
	changeQues(this)
});

// 填写题目
function changeQues(_this) {
	questionBank[questionLen].question = $(_this).val();
};


$("#html5Form").html5Validate(function() {
//	$("#evalutlsuse").click(function(){
		var title=$("#surveyTitle").val();
		console.log(title);
		console.log(questionBank);
		var dateStart=$("#dateStart").val();
		var dateEnd=$("#dateEnd").val();
		
		var dt=JSON.stringify(questionBank);
		console.log("dt:"+dt);
		$.ajax({
		    url:"/xlhaBeta/opinionSurvey/problemPaperSave.do",    //请求的url地址
		    dataType:"json",   //返回格式为json
		    data:{"title":title,"questionBank":JSON.stringify(questionBank),"dateStart":dateStart,"dateEnd":dateEnd},    //参数值
		    type:"post",   //请求方式
		    success:function(req){
		    	alert(req.success);
		    	setTimeout(function() {
	     			location.href = "opinionSurveyList.html"
	     		},1000)
		    }
		});
//	})
},{
	validate: function() {
		var isError = false;
		var quesErrArr = [];
		var ansLenArr = [];
		questionBank.map(function(obj,ind) {
			if(!obj.question) {
				quesErrArr.push(ind)
				
				isError = true;
			};
			var ansLen =  obj.answer.length;
			if(ansLen < 2) {
				ansLenArr.push(ind)
			}
			
			return isError;
		});

		if(isError) {
			$(".quesnaireList li").removeClass("active");
			$(".quesnaireList li").eq(quesErrArr[0]).addClass("active").testRemind("请输入试题");
			questionLen = quesErrArr[0];
			pushCont(quesErrArr[0]);

			return false;
		};


		if(ansLenArr.length > 0) {
			$(".quesnaireList li").removeClass("active");
			$(".quesnaireList li").eq(ansLenArr[0]).addClass("active").testRemind("选项至少两个");
			questionLen = ansLenArr[0];
			pushCont(questionLen);

			return false;
		}
		return true;
	}


});
