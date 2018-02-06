var echartsType = function(){
	var yeardata = null;
	var params = {};
	var queryurl ;
	var areadata ;
	var datatype ;
	var htmlurl ;
	var _init = function(){
		$("#years").on("change",function(){
			params.year = $(this).val();
			querydata();
		});
		var items = localStorage.echartsType;
		htmlurl = items.split(" ")[0] ;
		if(htmlurl == "videoChart.html"){
			//调解
			params.type = items.split(" ")[1].split(",")[0] ;
			datatype = items.split(" ")[1].split(",")[1];
			$(".goBack a").attr({href : "../videoMediation/"+items.split(" ")[0]});
			document.title='统计数据';
			queryurl = "/spywBeta/mediate/queryDisputeByType.do";
			$(".infoPubWrapper h1 a").attr({"href":"../videoMediation/mediationNav.html"});
			$(".infoPubWrapper h1 img").attr({"src":"../../images/shipintiaojie.png"});
		}else{
			//接访
			params.code = items.split(" ")[1].split(",")[0] ;
			datatype = items.split(" ")[1].split(",")[1];
			$(".goBack a").attr({href : items.split(" ")[0]});
			document.title='统计数据';
			queryurl = "/spywBeta/videoNeighborhood/queryTypeNeighMonth.do";
			$(".infoPubWrapper h1 a").attr({"href":"../videoNeighborhood/neighborhoodNav.html"});
			$(".infoPubWrapper h1 img").attr({"src":"../../images/shipinjiefang.png"});
		}
		
		yeardata = items.split(" ")[2];
		
		
		
		for(var i=0;i<=10;i++) {
			var yearnumber = parseInt(yeardata);
            var str = '';
            str += '<option value="'+ (yearnumber-i) +'">'+ (yearnumber-i) +'</option>';
            $("#years").append(str);
        };
        $("#years").val(yeardata);
        
        var heights = (window.innerHeight) > 662 ? 750 : 400;
        $("#videoChart").css({"width":"100%","height":heights+"px"});
        params.year = yeardata;
        querydata();
	}
	
	//调接口获取数据
	var querydata = function(){
        $.post(queryurl,params,function(data){
        	if(data.status == 0){
        		//图标设置
        		data.data.area = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
        		echartsitem(data.data);
        	}
        },"json");
        
	};
	
	var echartsitem = function(data){
		var legendata =[];
		var seriesdata = [];
		var xAxisdata ;
		if(true){
			data.total = [];
	        for(i = 0 ; data.success.length > i ; i++){
	        	var totalnumber = parseInt(data.success[i]) + parseInt(data.defeated[i]) + parseInt(data.unknown[i]);
	        	data.total.push(totalnumber);
	        }
	        
	        if(htmlurl == "videoChart.html"){
	        	legendata = ["总次数","成功次数","失败次数","未确定次数"] ;
		        seriesdata = [{name:'总次数',type:'bar',data:data.total,barCategoryGap :"40%"},{name:'成功次数',type:'bar',data:data.success,barCategoryGap :"40%"},{name:'失败次数',type:'bar',data:data.defeated,barCategoryGap :"40%"},{name:'未确定次数',type:'bar',data:data.unknown,barCategoryGap :"40%"}];
	        }else{
	        	legendata = ["总次数","已解决次数","未解决次数","未确定次数"] ;
		        seriesdata = [{name:'总次数',type:'bar',data:data.total,barCategoryGap :"40%"},{name:'已解决次数',type:'bar',data:data.success,barCategoryGap :"40%"},{name:'未解决次数',type:'bar',data:data.defeated,barCategoryGap :"40%"},{name:'未确定次数',type:'bar',data:data.unknown,barCategoryGap :"40%"}];
	        }
	        
	        xAxisdata = data.area;
		}else{
			legendata = ["次数"];
			seriesdata = [{name:'次数',type:'bar',data:data.count,barCategoryGap :"40%"}];
			xAxisdata = data.area;
		}
		var myChart = echarts.init(document.getElementById('videoChart'));
        option = {
            	color: ['#3398DB',"#f9084a","#08f9f9","#f9db08"],
                title: {
                    text: yeardata + '年'+ datatype +'统计表',
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
                	data :xAxisdata,
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
			_init();
		}
	}
}()


$(function(){
	echartsType.init();
})