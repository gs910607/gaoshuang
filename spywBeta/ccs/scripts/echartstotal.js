var echartstotal = function(){
	
	var yeardata = null;
	var areadata = null;
	var params = {};
	var queryurl ;
	//接访 调解 的判断
	var mediationb = false;
	
	//初始化数据
	var _init = function(){
		//下拉框change事件
		$("#years").on("change",function(){
			params.year = $(this).val();
			querydata();
		});
		var items = localStorage.echartsdata;
		areadata = items.split(" ")[1].split(",")[0] ;
		var areadatacode = items.split(" ")[1].split(",")[1] ;
		yeardata = items.split(" ")[2];
		if(items.split(" ")[0].indexOf("videoChart") >= 0){
			//调解
			$(".goBack a").attr({href : "../videoMediation/"+items.split(" ")[0]});
			mediationb = true ;
			document.title='统计数据';
			queryurl = "/spywBeta/mediate/getDataByCode.do";
			$(".infoPubWrapper h1 a").attr({"href":"../videoMediation/mediationNav.html"});
			$(".infoPubWrapper h1 img").attr({"src":"../../images/shipintiaojie.png"});
			
		}else if(items.split(" ")[0].indexOf("conferEcharts") >= 0){
			//会议
			$(".goBack a").attr({href : "../videoConference/"+items.split(" ")[0]});
			document.title='会议统计';
			queryurl = "/spywBeta/conference/getDataByCode.do";
			$(".infoPubWrapper h1 a").attr({"href":"../videoConference/conferNav.html"});
			$(".infoPubWrapper h1 img").attr({"src":"../../images/shipinhuiyi.png"});
		}else if(items.split(" ")[0].indexOf("trainChart") >= 0){
			//培训
			$(".goBack a").attr({href : "../videoTraining/"+items.split(" ")[0]});
			document.title='培训统计';
			queryurl = "";
			$(".infoPubWrapper h1 a").attr({"href":"../videoTraining/videoTrainNav.html"});
			$(".infoPubWrapper h1 img").attr({"src":"../../images/shipinpeixun.png"});
		}else{
			//接访
			$(".goBack a").attr({href : items.split(" ")[0]});
			mediationb = true ;
			document.title='统计数据';
			queryurl = "/spywBeta/videoNeighborhood/queryNeighMonth.do";
			$(".infoPubWrapper h1 a").attr({"href":"../videoNeighborhood/neighborhoodNav.html"});
			$(".infoPubWrapper h1 img").attr({"src":"../../images/shipinjiefang.png"});
		}
		//初始化年并给当前年
		for(var i=0;i<=10;i++) {
			var yearnumber = new Date().getFullYear();
            var str = '';
            str += '<option value="'+ (yearnumber-i) +'">'+ (yearnumber-i) +'</option>';
            $("#years").append(str);
        };
        $("#years").val(yeardata);
        
        //初始化图表
        var heights = (window.innerHeight) > 662 ? 750 : 400;
        $("#videoChart").css({"width":"100%","height":heights+"px"});
        params.year = yeardata;
        params.code = areadatacode;
        querydata();
        
	};
	
	var querydata = function(){
        $.post(queryurl,params,function(data){
        	if(data.status == 0){
        		data.data.area = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
        		echartsitem(data.data);
        		/*if(data.data.success.length < 1){
					$("#echartsnodata").show();
					$("#videoChart").hide();
				}else{
					
				}*/
        	}
        },"json");
        
	};
	
	
	var echartsitem = function(data){
		var legendata =[];
		var seriesdata = [];
		if(mediationb){
			data.total = [];
	        for(i = 0 ; data.success.length > i ; i++){
	        	var totalnumber = parseInt(data.success[i]) + parseInt(data.defeated[i]) + parseInt(data.unknown[i]);
	        	data.total.push(totalnumber);
	        }
	        if(localStorage.echartsdata.split(" ")[0] == "videoChart.html"){
	        	legendata = ["总次数","成功次数","失败次数","未确定次数","调解时长"];
        		seriesdata = [{  name: '总次数',type: 'bar',data: data.total,barCategoryGap :"40%"},{name: '成功次数',type: 'bar',data: data.success,barCategoryGap :"40%"},{name: '失败次数',type: 'bar',data: data.defeated,barCategoryGap :"40%"},{name: '未确定次数',type: 'bar',data: data.unknown,barCategoryGap :"40%"},{name: '调解时长',type: 'bar',data: data.duration,barCategoryGap :"40%"}];
	        }else if(localStorage.echartsdata.split(" ")[0] == "neighChart.html"){
	        	legendata = ["总次数","已解决次数","未解决次数","未确定次数","信访时长","信访次数"];
        		seriesdata = [{  name: '总次数',type: 'bar',data: data.total},{name: '已解决次数',type: 'bar',data: data.success},{name: '未解决次数',type: 'bar',data: data.defeated},{name: '未确定次数',type: 'bar',data: data.unknown},{name: '信访时长',type: 'bar',data: data.hover},{name: '信访次数',type: 'bar',data: data.neightcount}];
        	}else{
        		legendata = ["总次数","成功次数","失败次数","未确定次数"] ;
		        seriesdata = [{name:'总次数',type:'bar',data:data.total,barCategoryGap :"40%"},{name:'成功次数',type:'bar',data:data.success,barCategoryGap :"40%"},{name:'失败次数',type:'bar',data:data.defeated,barCategoryGap :"40%"},{name:'未确定次数',type:'bar',data:data.unknown,barCategoryGap :"40%"}];
	        }
	        
		}else{
			legendata = ["次数"];
			seriesdata = [{name:'次数',type:'bar',data:data.count,barCategoryGap :"40%"}];
			
		}
		
		var myChart = echarts.init(document.getElementById('videoChart'));
        option = {
            	color: ['#3398DB',"#f9084a","#08f9f9","#f9db08"],
                title: {
                    text: yeardata + '年'+ areadata +'统计表',
                    padding: [0, 35],
                    textStyle: {
                        align: 'center',
                        fontSize: 24,
                    }
                },
                legend:{
                	show: true,
                	bottom:true,
                	itemWidth:25,
                    itemHeight:15,
                    right:30,
                    top:10,
    		        data:legendata,
    		    },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                	axisLabel: { 
                		fontSize: 16,
                        interval: 0, 
                    },
                	data :data.area,
    	            axisTick: {
    	                alignWithLabel: true
    	            }
                },
                yAxis: {
                	type : 'value',
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLabel: {
                        fontSize: 16
                    },
                },
                series: seriesdata
            };
            myChart.setOption(option);
	};
	
	return {
		init : function(){
			_init()
		}
	}
}();






$(function(){
	
	echartstotal.init();
})




