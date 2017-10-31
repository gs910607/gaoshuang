//解析url 数据
 var doctorId = GetQueryStr("doctorId");
 var hospitalId = GetQueryStr("hospitalId");
 var token = JSON.parse(localStorage.getItem("user")).token;
//当天日期渲染
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

var arr1=[1,3,5,7,8,10,12]
var arr2=[4,6,9,11]
function isLeapYear(Year){
	//判断是不是闰年
if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
    return true;
} else {
    return false;
}
}
//没有年份日期格式
function getNowNewTime(e) {
    var date = new Date();
    var seperator1 = "-";
     var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate()+e;
    //判断是不是闰年
    var judge = isLeapYear(year);
    if(judge == false){
    if(month == 2){
    	if(strDate > 28){
    		strDate = strDate-28;
    		month = month+1;
    	}
    }
    }else{
    if(month == 2){
    	if(strDate > 29){
    		strDate = strDate-29;
    		month = month+1;
    	}
    }
    }
   for(var i=0;i<arr1.length;i++){
   	if(month == arr1[i]){
   		if(strDate > 31){
    		strDate = strDate-31;
    		month = month+1;
    	}
   	   }
   }
    for(var i=0;i<arr1.length;i++){
   	if(month == arr2[i]){
   		if(strDate > 30){
    		strDate = strDate-30;
    		 month = month+1;
    	}
   	}
}
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = month + seperator1 + strDate;
    return currentdate;
}

//日期 星期几？
function weekDate(e){
var str = "";
var week = new Date().getDay() + e;
if(week > 6){
	week = week - 7;
}
if (week == 0) {
        str = "星期日";
} else if (week == 1) {
        str = "星期一";
} else if (week == 2) {
        str = "星期二";
} else if (week == 3) {
        str = "星期三";
} else if (week == 4) {
        str = "星期四";
} else if (week == 5) {
        str = "星期五";
} else if (week == 6) {
        str = "星期六";
}
return str;
}

function weekDate2(e){
var str = "";
var week = e;
if(week > 6){
	week = week - 7;
}
if (week == 0) {
        str = "星期日";
} else if (week == 1) {
        str = "星期一";
} else if (week == 2) {
        str = "星期二";
} else if (week == 3) {
        str = "星期三";
} else if (week == 4) {
        str = "星期四";
} else if (week == 5) {
        str = "星期五";
} else if (week == 6) {
        str = "星期六";
}
return str;
}
var newDate = getNowFormatDate();

var dataname = [];
init2();
function init2() {
	var params = {
		doctorId: doctorId,
		token: token
	};
	console.log(params)
	$.ajax({
		type: 'GET',
		url: config.appserver_url + '/doc/workTable/scheduling/queryOrgScheduling.json',
		data: params,
		dataType: 'json',
		contentType: 'application/json',
		success: function(response) {
			console.log(response)
			tokenLose(response.status);
			var data = response.data;
      if(data.length > 0) {
  			var composeType = '';
  			composeType += '<div class="distablecell">排班</div>'
  			for(var i=0;i<data.length;i++) {
  				var obj = data[i];
  				composeType += '<div class="distablecell tableTitle" data-name="'+ obj.class_name +'">'+ obj.class_name +'</div>';

  				dataname.push(obj.class_name);
  			}

  			$("#composeType").html(composeType);

  			var weekList = '';
  			for(var i=0;i<7;i++) {
  				weekList += '<div class="distablerow">';
  				weekList += '	<div class="distablecell">';
  				weekList += '		<div class="week_list">';
  				weekList += '			<div>'+ getNowNewTime(i) +'</div>';
  				weekList += '			<div data-week="'+ weekDate(i) +'">'+ weekDate(i) +'</div>';
  				weekList += '		</div>';
  				weekList += '	</div>';
  				for(var j=0;j<data.length;j++) {
  					weekList += '<div class="distablecell" data-date="'+ getNowNewTime(i) +'" data-week="'+ weekDate(i) +'" data-name="'+dataname[j]+'"></div>'
  				}
  				weekList += '</div>';
  			}
  			$("#composeWrapper").html($("#composeWrapper").html() + weekList);

  			$.ajax({
  				type: 'GET',
  				url: config.appserver_url + '/doc/workTable/scheduling/queryDoctorSchedulingListByDate.json',
  				data: {
  					doctorId: doctorId
  				},
  				dataType: 'json',
  				contentType: 'application/json',
  				success: function(response) {
  					tokenLose(response.status);
  					console.log(response);
            if(response.data) {
              var deptCloudId =  response.data.deptCloudId;
              console.log(deptCloudId)
    					var data = response.data;
    					$("#doctorName").text(data.doctorName);
    					$(".synopsis-img").attr("src", data.avatar || defaultVar.onerrorImg);
    					$(".doctor-main").text(data.title);
    					$(".doctor-major").text(data.deptName);
    					$(".evaluateNumber-number").text((data.evaluationScore || 0) + "分");
    					calculateScore(data.evaluationScore, $(".evaluateNumber") , 5);
    					for(var i=0;i<data.weekSchedulingVoList.length;i++) {
    						var obj = data.weekSchedulingVoList[i];

    						$("[data-name='"+ obj.class_name +"'][data-week='"+ weekDate2(parseInt(obj.week)) +"']").addClass("subscribe_lattice");
    						$("[data-name='"+ obj.class_name +"'][data-week='"+ weekDate2(parseInt(obj.week)) +"']").html(
    							'<a href="javascript:;">'+
    								'<div>预约</div>'+
    								'<div>剩余:'+ obj.keyuyueshu +'</div>'+
    							'</a>'
    						)
    					}
    					console.log(response.data.weekSchedulingVoList[0].doctor_ID);
    					var doctor_ID = response.data.weekSchedulingVoList[0].doctor_ID;
    					$(".subscribe_lattice").on("click", function(){
    						var class_name = $(this).data("name");
    						var week = $(this).data("week");
                var date = $(this).data("date");
    						sessionStorage.setItem("class_name", class_name);
    						sessionStorage.setItem("week", week);
    						sessionStorage.setItem("date", date);
    						historyForward('../medic/reservationInformation.html?doctorId=' + doctorId);
    					})
            } else {
              $("#content_Wrapper").html("<div style='text-align:center; padding-top:3rem; font-size:1.4rem; color:#999;'>暂无数据</div>")
            }
  				},
  				error: function() {
  					alert("服务繁忙，请稍后再试！")
  				}
  			});
      } else {
        $("#content_Wrapper").html("<div style='text-align:center; padding-top:3rem; font-size:1.4rem; color:#999;'>暂无数据</div>")
      }
		},
		error: function() {
			alert("服务繁忙，请稍后再试！")
		}
	});


}
$("header > a").on("click", function() {
	historyBack();
});
