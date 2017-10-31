//初始化显示页数为1；
var localCityCode;
var localCityName;
var pageNo = 1;
var pageSize =7;
var longitude;
var latitude;
var user;
var localCityInfo;
var token;
var regionCode = null;
var typeCode = null;
var title = null;
var distance = null;
var evaluationScore = null;
var orderNum = null;
var workYear = null;
var dataListLenght;
//顶部下拉刷新代码
var pullTop = $("#pull-loading").height();

function pullTopAll() {
	slide(".container", pullTop, function(e) {

		var that = this;
		setTimeout(function() {
			$(".list-container").html("")
			$(window).scrollTop(0);
			pageNo = 1;

			initPages(regionCode ,typeCode, title, distance, evaluationScore, orderNum, workYear);

            $("#bottom").hide();
			that.back.call();
		}, 2000);
	});
};

initParams();
initPages(regionCode ,typeCode, title, distance, evaluationScore, orderNum, workYear);
initClick();
initScrollBar();
//pullTopAll();

//提取储存信息
function initParams() {
	user = JSON.parse(localStorage.getItem("user"));
	token =user.token
	localCityInfo = JSON.parse(sessionStorage.getItem("localCityInfo"));
	longitude = localCityInfo.longitude;
	latitude = localCityInfo.latitude;
	localCityCode = localCityInfo.localCityCode;
	localCityName = localCityInfo.localCityName;
}

var documentWidth = $(document).width();



function initClick() {
    //选择框
    $(".type-name-ul-type").on("click", function () {
        $("body").css("overflow", "auto")
        $(".type-name-ul-type").css("background-color", "#F5F5F5");
        $(".type-name-ul-type").css("color", "#666666");
        $(".type-name-ul-type2").css("color", "#666666");
        $(this).css("background-color", "white");
        $(this).css("color", "#EB9C01");
    });
    $(".type-name-ul-type2").on("click", function () {
        $(".type-name-ul-type2").css("color", "#666666");
        $(this).css("color", "#EB9C01");
    });

//下滑菜单
    $("#tab1-a").on("click", function () {
        $(this).hide();
        $('#tab2-a-fold,#tab3-a-fold,#tab4-a-fold').hide();
        $('#tab2-a,#tab3-a,#tab4-a,#tab1-a-fold').show();
        $("#tab1-a-fold .tab-button").css("color", "#999");
        $("#tab-button-span1-up1").css("color", "#EB9C01");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $("#tab1-a-fold .tab-img").css("transform", "rotate(0deg)");
        $("#tab1-a-fold .tab-img").attr("src", "../../images/arrows2.png");
        $("#tab-img1").attr("src", "../../images/arrows2.png");
        $("#tab-img1").css("transform", "rotate(0deg)");
        $("#coverLayer").css("display", "block");
        $(window).scrollTop(0);
        $("body").css("overflow", "hidden");
        $(".content-block").css("display", "block");
        $("#tab1 div").css("display", "block");
        $("#tab2 div").css("display", "none");
        $("#tab3 div").css("display", "none");
		$("#tab4 div").css("display", "none");
    });
    $("#tab1-a-fold").on("click",function () {
        $(this).hide();
        $("#tab1-a").show();
        $("body").css("overflow", "auto");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $(".tab-button").css("color", "#999");
        $("#coverLayer").css("display", "none");
        $(".content-block").css("display", "none");
        $(".tab-img").css("transform", "rotate(0deg)");
    })
    $("#tab2-a").on("click", function () {
        $(this).hide();
        $('#tab1-a-fold,#tab3-a-fold,#tab4-a-fold').hide();
        $('#tab1-a,#tab3-a,#tab4-a,#tab2-a-fold').show();
        $("#tab2-a-fold .tab-button").css("color", "#999");
        $("#tab-button-span2-up2").css("color", "#EB9C01");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $("#tab2-a-fold .tab-img").css("transform", "rotate(0deg)");
        $("#tab2-a-fold .tab-img").attr("src", "../../images/arrows2.png");
        $("#tab-img2").attr("src", "../../images/arrows2.png");
        $("#tab-img2").css("transform", "rotate(0deg)");
        $("#coverLayer").css("display", "block");
        $(window).scrollTop(0);
        $("body").css("overflow", "hidden");
        $(".content-block").css("display", "block");
        $("#tab2 div").css("display", "block");
        $("#tab1 div").css("display", "none");
        $("#tab3 div").css("display", "none");
		$("#tab4 div").css("display", "none");
    });
    $("#tab2-a-fold").on("click",function () {
        $(this).hide();
        $("#tab2-a").show();
        $("body").css("overflow", "auto");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $(".tab-button").css("color", "#999");
        $("#coverLayer").css("display", "none");
        $(".content-block").css("display", "none");
        $(".tab-img").css("transform", "rotate(0deg)");
    })
    $("#tab3-a").on("click", function () {
        $(this).hide();
        $('#tab1-a-fold,#tab2-a-fold,#tab4-a-fold').hide();
        $('#tab1-a,#tab2-a,#tab4-a,#tab3-a-fold').show();
        $("#tab3-a-fold .tab-button").css("color", "#999");
        $("#tab-button-span3-up3").css("color", "#EB9C01");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $("#tab3-a-fold .tab-img").css("transform", "rotate(0deg)");
        $("#tab3-a-fold .tab-img").attr("src", "../../images/arrows2.png");
        $("#tab-img3").attr("src", "../../images/arrows2.png");
        $("#tab-img3").css("transform", "rotate(0deg)");
        $("#coverLayer").css("display", "block");
        $(window).scrollTop(0);
        $("body").css("overflow", "hidden");
        $(".content-block").css("display", "block");
        $("#tab3 div").css("display", "block");
        $("#tab1 div").css("display", "none");
        $("#tab2 div").css("display", "none");
		$("#tab4 div").css("display", "none");
    });
    $("#tab3-a-fold").on("click",function () {
        $(this).hide();
        $("#tab3-a").show();
        $("body").css("overflow", "auto");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $(".tab-button").css("color", "#999");
        $("#coverLayer").css("display", "none");
        $(".content-block").css("display", "none");
        $(".tab-img").css("transform", "rotate(0deg)");
    })
	$("#tab4-a").on("click", function () {
        $(this).hide();
        $('#tab1-a-fold,#tab2-a-fold,#tab3-a-fold').hide();
        $('#tab1-a,#tab2-a,#tab3-a,#tab4-a-fold').show();
        $("#tab4-a-fold .tab-button").css("color", "#999");
        $("#tab-button-span4-up4").css("color", "#EB9C01");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $("#tab4-a-fold .tab-img").css("transform", "rotate(0deg)");
        $("#tab4-a-fold .tab-img").attr("src", "../../images/arrows2.png");
        $("#tab-img4").attr("src", "../../images/arrows2.png");
        $("#tab-img4").css("transform", "rotate(0deg)");
        $("#coverLayer").css("display", "block");
        $(window).scrollTop(0);
        $("body").css("overflow", "hidden");
        $(".content-block").css("display", "block");
        $("#tab4 div").css("display", "block");
        $("#tab1 div").css("display", "none");
        $("#tab2 div").css("display", "none");
		$("#tab3 div").css("display", "none");
    });
    $("#tab4-a-fold").on("click",function () {
        $(this).hide();
        $("#tab4-a").show();
        $("body").css("overflow", "auto");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $(".tab-button").css("color", "#999");
        $("#coverLayer").css("display", "none");
        $(".content-block").css("display", "none");
        $(".tab-img").css("transform", "rotate(0deg)");
    })

    //遮盖层
    $("#coverLayer").on("click", function () {
        $("body").css("overflow", "auto");
        $(".tab-img").attr("src", "../../images/arrows1.png");
        $(".tab-button").css("color", "#999");
        $("#coverLayer").css("display", "none");
        $(".content-block").css("display", "none");
        $(".tab-img").css("transform", "rotate(0deg)");
        		$(".buttons-tab>a").css("display", "none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					$("#tab4-a").show();
    });


    //阻止默认拖动
       $("#coverLayer").on("touchmove",function(){
       	return false;
       })
       $(".buttons-tab").on("touchmove" ,function(){
       	return false;
       })
//     $(".content-block").on("touchmove" ,function(){
//     	return false;
//     })

    //下拉框渲染接口
    $( "#tab2-a").on("click", function () {
    	pageNo = 1;
        //类型（科室）接口
        $.ajax({
            type: "GET",
            url: config.appserver_url + '/doctorNurse/queryAllInfo.json',
            dataType: "JSON",
            contentType: 'application/json',
            success: function (data) {
                tokenLose(data.status);
                var arrType = data.data.hospitalDepartmentsTypes;
                var typeList = '';
                    typeList += '<li><span class="type-name-ul-type">全部类型</span></li>';
                for(var i=0; i<arrType.length; i++) {
                    var obj = arrType[i];
                    typeList  += '<li data-code="'+ obj.code +'"><span class="type-name-ul-type">'+ obj.name +'</span></li>'
                }
                $("#tab2-ul-list2").html(typeList);

                $(".type-name-ul-type").on("click", function() {
                	 $("body").css("overflow", "auto");
                	$(".buttons-tab>a").css("display","none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					$("#tab4-a").show();
                    $(".list-container-li").remove();
                    $(".tab-img").attr("src", "../../images/arrows1.png");
                    $(".tab-button").css("color", "#999");
                    $("#coverLayer").css("display", "none");
                    $(".content-block").css("display", "none");
                    $(".tab-img").css("transform", "rotate(0deg)");

                    typeCode = $(this).parent().data("code");

                    initPages(null ,typeCode, null, null, null,null,null);
                })
            },
            error: function () {
                alert("服务繁忙，请稍后再试！");
            }
        });

    });

//地区
    $("#tab1-a").on("click", function (e) {
    	pageNo = 1;
        $.ajax({
            url: config.appserver_url + '/doctorNurse/queryAllInfo.json',
            data: "GET",
            dataType: "JSON",
            contentType: 'application/json',
            success: function (data) {
                var allCity = data.data.cityCodeAndNames;
                var cityList = '';
                    cityList += '<li><span class="type-name-ul-type">全国</span></li>';
                for(var i=0; i<allCity.length; i++) {
                    var obj = allCity[i];
                    cityList  += '<li data-code="'+ obj.code +'"><span class="type-name-ul-type">'+ obj.name +'</span></li>'
                }
                $("#tab1-ul-list1").html(cityList);

                $(".type-name-ul-type").on("click", function () {
										// $("#tab-button-span1-up1, #tab-button-span1").text($(this).text())
                     $("body").css("overflow", "auto");
		     $(".buttons-tab>a").css("display", "none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					$("#tab4-a").show();
                    regionCode = $(this).parent().data("code")
                    $(".list-container-li").remove();
                    $(".tab-img").attr("src", "../../images/arrows1.png")
                    $(".tab-button").css("color", "#999")
                    $("#coverLayer").css("display", "none")
                    $(".content-block").css("display", "none")
                    $(".tab-img").css("transform", "rotate(0deg)")

                    initPages(regionCode ,null, null, null, null,null,null);
                });
            },
            error: function () {
                alert("服务繁忙，请稍后再试！");
            }
        });
    });

    //排序
    var sortdataList = [
        {name: "按评分排序", workYear: " ", orderNum: " ", evaluationScore: "1"},
        {name: "按订单数排序", workYear: " ", orderNum: "1", evaluationScore: " "},
        {name: "按从业经验排序", workYear: "1", orderNum: " ", evaluationScore: " "}
    ];

    $("#tab3-a").on("click", function (e) {
    	pageNo = 1;
        var sortList = '';
        for (var i = 0; i < sortdataList.length; i++) {
            var obj = sortdataList[i];
            sortList += '<li data-workyear="'+ obj.workYear +'" data-ordernum="'+ obj.orderNum +'" data-evaluationscore="'+ obj.evaluationScore +'"><span class="type-name-ul-type">'+ obj.name +'</span></li>';
        }
        $("#tab3-ul-list3").html(sortList);

        $(".type-name-ul-type").on("click", function (e) {
            $("body").css("overflow", "auto")
                	$(".buttons-tab>a").css("display", "none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					$("#tab4-a").show();
            $(".list-container-li").remove();
            $(".type-name-ul-type").css("background-color", "#F5F5F5");
            $(".type-name-ul-type").css("color", "#666666");
            $(e.target).css("background-color", "white");
            $(e.target).css("color", "#EC9C00");
            $(".tab-img").attr("src", "../../images/arrows1.png");
            $(".tab-button").css("color", "#999");
            $("#coverLayer").css("display", "none");
            $(".content-block").css("display", "none");
			$(".tab-img").css("transform", "rotate(0deg)");

            orderNum = $(this).parent().data("ordernum");
            evaluationScore = $(this).parent().data("evaluationscore");
            workYear = $(this).parent().data("workyear");
            console.log(orderNum +"--"+evaluationScore +"--"+ workYear)
            if(orderNum == 1) {
                initPages(null ,null, null, null, null, orderNum, null);
            }else if(evaluationScore == 1) {
                initPages(null ,null, null, null, evaluationScore,null,null);
            }else if(workYear == 1) {
                initPages(null ,null, null, null, null, null, workYear);
            };

        });
    });
    // 筛选
    $("#tab4-a").on("click", function (e) {
    	pageNo = 1;
        $.ajax({
            url: config.appserver_url + '/doctorNurse/queryAllInfo.json',
            data: "GET",
            dataType: "JSON",
            contentType: 'application/json',
            success: function (data) {
                console.log(data)
                var selList = data.data.docTitleVos;
                var selectList = '';
                    selectList += '<li class="doctorTitle-list-li active">不限</li>';
                for(var i=0; i<selList.length; i++) {
                    var obj = selList[i];
                    selectList  += '<li class="doctorTitle-list-li" data-code="'+ obj.code +'">'+ obj.name +'</li>'
                }
                $("#doctorTitle_list").html(selectList);

                $(".doctorTitle-list-li").on("click", function () {
                    $("body").css("overflow", "auto");
                	        		$(".buttons-tab>a").css("display", "none")
					$("#tab1-a").show();
					$("#tab2-a").show();
					$("#tab3-a").show();
					$("#tab4-a").show();
                    title = $(this).data("code")
                    $(".list-container-li").remove();
                    $(".tab-img").attr("src", "../../images/arrows1.png")
                    $(".tab-button").css("color", "#999")
                    $("#coverLayer").css("display", "none")
                    $(".content-block").css("display", "none")
                    $(".tab-img").css("transform", "rotate(0deg)")
                    $(this).addClass("active").siblings().removeClass("active");
                    initPages(null ,null, title, null, null,null,null);
                });
            },
            error: function () {
                alert("服务繁忙，请稍后再试！");
            }
        });
    });
}




///////////////////地区/////   //科室////职称// /距离排序////评分数排序///订单数排序//工作年限排序
function initPages(regionCode ,typeCode, title, distance, evaluationScore, orderNum,  workYear) {

    var params = {
        regionCode: regionCode,
        typeCode:typeCode,
        title: title,
        distance: distance,
        evaluationScore: evaluationScore,
        orderNum: orderNum,
        pageNo: pageNo,
        workYear: workYear,
        pageSize: pageSize,
        longitude: longitude,
        latitude: latitude,
        token: token
    };
	 console.log(params);
    //页面打开时候加载的接口 查询
    $.ajax({
        type: "GET",
        url: config.appserver_url + '/doctorNurse/queryAllDoc.json',

        data: params,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (data) {
          	 console.log(data)
            var dataList = data.data;
            dataListLenght = dataList.length;


            // var mailList =  $(".list-container").html();

            for (var i = 0; i < dataList.length; i++) {
								var mailList = '';
                var obj = dataList[i];
                var goal = dataList[i].evaluationScore;
                mailList += '<li data-hospitalId="'+data.data[i].hospitalId+'" class="list-container-li" data-id="'+ obj.id +'">';
                mailList += '<div class="div-content"><div class="div-content-introduce">';
                mailList += '<div class="fixation-img"><img class="div-img" src="'+(dataList[i].avatar || defaultVar.onerrorImg)+'"></div>';
//              mailList += '<div class="clear" style="clear:both"></div>';
                mailList += '<h3 class="div-content-name"><span class="realName">'+dataList[i].realName+'</span><span class="div-content-position">'+dataList[i].title+'</span><span class="div-content-department">'+dataList[i].name+'</span></h3>';
                mailList += '<span class="distance">已诊'+dataList[i].orderNum+'人</span><div class="grade">';
                gradeImg(dataList[i].evaluationScore);
                if(dataList[i].evaluationScore){
                mailList += '<span class="goal">'+dataList[i].evaluationScore+'分</span></div>';
                }else{
                mailList += '<span class="goal">0.0分</span></div>';
                }
                if(dataList[i].diseaseLabel == null){
                mailList += '<div class="content-address">擅长：<span>暂无</span></div></div></div></li>';
                }else{
                mailList += '<div class="content-address">擅长：<span>'+dataList[i].diseaseLabel+'</span></div></div></div></li>';
                }
                //渲染
                $(".list-container").append(mailList);

            }

            //分数
            function gradeImg(e) {
        		if(e < 0.5) {
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
                    mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 1) {
        			mailList+='<img class="grade-img" src="../../images/smallStar.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 1.5) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 2) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/smallStar.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 2.5) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 3) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/smallStar.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 3.5) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 4) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/smallStar.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 4.5) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star2.png" alt="" />';
        		} else if(e < 5) {
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/smallStar.png" alt="" />';
        		} else if(e == 5) {
        			console.log(12)
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        			mailList+='<img class="grade-img" src="../../images/star.png" alt="" />';
        		} else {
        			alert("综合评分返回0~5")
        		}
        		return;
        	};
   $(".list-container-li").on("click", function() {
    var doctorId = $(this).data("id");
    // sessionStorage.removeItem("doctorId");
    // sessionStorage.setItem("doctorId", doctorId);
    var hospitalid =  $(this).data("hospitalid");
    var nextPage = '../medic/medicIndex.html?hospitalid='+hospitalid + '&doctorId='+ doctorId;
		historyForward(nextPage);
	})
        },
        error: function () {
            alert("服务繁忙，请稍后再试！");
        },
        beforeSend: function() {
            $("#bottom").show();
            $(".nomore").hide();
            $(".loading").show();
        },
        complete: function() {
            // $("#bottom").hide();
            $(".nomore").show();
            $(".loading").hide();

        }

    });
}

function initScrollBar() {
    //下拉加载更多
    var stop = true;
    $(window).scroll(function () {
        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        if ($(document).height() <= totalheight) {
            if (stop == true) {
                stop = false;
                pageNo++;
                //如果少于6条不发送请求
                         if(dataListLenght <7){

                         }else{
                         	initPages();
                         }

                stop = true;
            }
        }
        // $("#bottom").show();
    });
};

$("header > a").on("click", function() {
	historyBack();
});
