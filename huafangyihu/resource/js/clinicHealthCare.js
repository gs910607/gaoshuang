//解析url 数据
 var doctorId = GetQueryStr("doctorId");
 var hospitalId = GetQueryStr("hospitalId");
 var token = JSON.parse(localStorage.getItem("user")).token;
 var pageNo = 1;
 var pageSize = 100;
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

//初始化页面宣然
init()
function init() {

	var parmas1 = {
		hospitalId: hospitalId,
		pageNo: pageNo,
		pageSize: pageSize,
		token: token
	}
  var dataArr = 0;
	$.ajax({
		type: "get",
		data: parmas1,
		url: config.appserver_url + "/myClinic/hospitalDoctor.json",
		dataType: "json",
		async: false,
		success: function(response) {
			tokenLose(response.status);
			var data = response.data;
			console.log(data)
      //医护信息
			for(var i=0;i<data.length;i++) {
        var list = '';
				var obj = data[i];
        var docPhone = obj.docPhone ? '' : 'hidden';
        var isPhone = obj.isPhone ? '' : 'hidden';
				list += '<li class="composing-li" data-realname="'+ obj.realName +'" data-phone="'+ obj.docPhone +'" data-index="'+i+'" data-doctorid="'+ obj.id +'" data-doctorcloudclinicid ="'+ obj.doctorCloudClinicId +'" data-hospitalcloudclinicid="'+ obj.hospitalCloudClinicId +'" >';
				list += '	<div class="synopsis"> <img class="synopsis-img" src="'+ (obj.avatar || defaultVar.onerrorImg) +'" />';
				list += '		<div class="synopsis-text">';
				list += '			<div class="doctor" id="doctorName"> <span>'+ obj.realName +'</span> <span>';
				list += '				<ul class="evaluate-ul">';
				list += '					<li class="evaluate-ul-li">';
				list += '						<div class="evaluateNumber"> <img class="evaluateNumber-img evaluateNumber-img-left" src="../../images/information.png" alt="" /> <img class="evaluateNumber-img '+ docPhone +'  evaluateNumber-img-right '+ isPhone +'" src="../../images/telephone-blue.png" alt="" /> </div>';
				list += '					</li>';
				list += '				</ul>';
				list += '			</span>';
				list += '			</div>';
				list += '			<div class="doctor"> <span class="doctor-main">'+ obj.title +'</span> <span class="doctor-major">'+ obj.deptName +'</span> </div>';
				list += '			<div class="doctor" id="doctor-specialty">擅长：'+ obj.diseaseLabel +'</div>';
				list += '		</div>';
				list += '	</div>';
				list += '	<div class="schedule">';
				list += '		<div id="composeWrapper" class="distable">';

				doctorId = obj.id;
				doctorCloudClinicId = obj.doctorCloudClinicId;
				hospitalCloudClinicId =obj.hospitalCloudClinicId;
        var index = i;

				$.ajax({
					type: 'GET',
					url: config.appserver_url + '/doc/workTable/scheduling/queryOrgScheduling.json',
					data: {
						doctorId: doctorId,
						token: token
					},
					dataType: 'json',
					async: false,
					contentType: 'application/json',
					success: function(response) {
						tokenLose(response.status);
						var data = response.data;
            if(data.length > 0) {
              dataArr+=data.length;
  						list += '<div id="composeType" class="distablerow">';
  						list += '<div class="distablecell">排班</div>';
  						var dataname = [];
              //获取排班时间 白班/夜班...
  						for(var i=0;i<data.length;i++) {
  							var obj = data[i];
  							list += '	<div class="distablecell tableTitle" data-name="'+ obj.class_name +'">'+ obj.class_name +'</div>';
  							dataname.push(obj.class_name);
  						}
  						list += '</div>';

              //一周的日期
  						for(var i=0;i<7;i++) {
  							list += '<div class="distablerow">';
  							list += '	<div class="distablecell">';
  							list += '		<div class="week_list">';
  							list += '			<div>'+ getNowNewTime(i) +'</div>';
  							list += '			<div data-week="'+ weekDate(i) +'">'+ weekDate(i) +'</div>';
  							list += '		</div>';
  							list += '	</div>';
                //一周的排班信息
  							for(var j=0;j<data.length;j++) {
                  list += '<div class="distablecell" data-date="'+ getNowNewTime(i) +'" data-doctor_id="'+ doctorCloudClinicId +'" data-week="'+ weekDate(i) +'" data-name="'+dataname[j]+'"></div>';
  							}
  							list += '</div>';
  						}
              list += '		</div>';
      				list += '	</div>';
      				list += '	<div class="clear"></div>';
      				list += '</li>';

      				$(".composing-ul").append(list);

              $(".evaluateNumber-img-left").on("click", function() {
                doctorId = $(this).closest(".composing-li").data("doctorid");
                historyForward('../medic/onlineConsulting.html?doctorId='+ doctorId);
              });

              $(".evaluateNumber-img-right").on("click", function() {
                var docPhone = $(this).closest(".composing-li").data("phone");
                var realName = $(this).closest(".composing-li").data("realname");
                $(".model_phone_shade").show();
                $(".model_tip > h3").text("是否联系医护"+ realName);
                $(".model_tip > p").text(docPhone);
                $(".model_btn .confirm").attr("href", "tel:" + docPhone)
              })

              $(".model_btn > a").on("click", function() {
                $(".model_phone_shade").hide();
              })

  						$.ajax({
  							type: 'GET',
  							url: config.appserver_url + '/doc/workTable/scheduling/queryDoctorSchedulingListByDate.json',
  							data: {
  								doctorId: doctorId
  							},
  							dataType: 'json',
  							async: false,
  							contentType: 'application/json',
  							success: function(response) {
                  console.log(response)
  								tokenLose(response.status);
  								var data = response.data;
  								for(var k=0;k<data.weekSchedulingVoList.length;k++) {
  									var obj = data.weekSchedulingVoList[k];
  									$("[data-doctor_id='"+ obj.doctor_ID +"'][data-name='"+ obj.class_name +"'][data-week='"+ weekDate2(parseInt(obj.week)) +"']").addClass("subscribe_lattice");
  									$("[data-doctor_id='"+ obj.doctor_ID +"'][data-name='"+ obj.class_name +"'][data-week='"+ weekDate2(parseInt(obj.week)) +"']").html(
  										'<a href="javascript:;">'+
  											'<div>预约</div>'+
  											'<div>剩余:'+ obj.keyuyueshu +'</div>'+
  										'</a>'
  									)
                    .on("click", function() {
                      var class_name = $(this).data("name");
          						var week = $(this).data("week");
                      var date = $(this).data("date");
          						sessionStorage.setItem("class_name", class_name);
          						sessionStorage.setItem("week", week);
          						sessionStorage.setItem("date", date);
                      historyForward('../medic/reservationInformation.html?doctorId=' + doctorId);
                    })
  								}
  							},
  							error: function() {
  								alert("服务繁忙，请稍后再试！")
  							}
  						})
            }
					},
					error: function() {
						alert("服务繁忙，请稍后再试！")
					}
				});
			}
		},
		error: function() {
			alert("服务繁忙，请稍后再试！");
		}
	});

  if(dataArr <= 0) {
    $("#content_wrapper").html("<div style='padding-top:3rem;text-align:center;font-size:1.4rem;color:#999;'>暂无数据</div>")
  }
};
function forward(ele){
	var doctorId = $(ele).closest(".composing-li").data("doctorid");
	var doctorcloudclinicid = $(ele).closest(".composing-li").data("doctorcloudclinicid");
	var hospitalcloudclinicid = $(ele).closest(".composing-li").data("hospitalcloudclinicid");
	var index = $(ele).closest(".composing-li").data("index");
	console.log(index)
	var class_name = $(ele).data("class_name");
	var week = $(ele).data("week");
	sessionStorage.setItem("class_name", class_name);
	sessionStorage.setItem("week", week);
	console.log('hospitalId='+ hospitalId +'&doctorId='+ doctorId+ '&doctorcloudclinicid=' + doctorcloudclinicid+ '&hospitalcloudclinicid=' + hospitalcloudclinicid)
	historyForward('../medic/reservationInformation.html?hospitalId='+ hospitalId +'&doctorId='+ doctorId+ '&doctorcloudclinicid=' + doctorcloudclinicid+ '&hospitalcloudclinicid=' + hospitalcloudclinicid+ '&index=' + index);
}
