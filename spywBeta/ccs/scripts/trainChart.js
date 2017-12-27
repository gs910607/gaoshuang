var response = {
    status: 0,
    data: {
        area: ['淮阴区','淮安区','洪泽区','涟水县','金湖县','清江浦区','盱眙县'],
        list: [123,24,3,456,2,345,23],
    }
}

$("#statiArea").on("click", function() {
	statisticsChart.init({
	    type: 'POST',
	    url: '/spywBeta/videoTraining/queryVideotrainChartCode.do',
	});
	$(this).hide();
	$("#statiType").show();
});

$("#statiType").on("click", function() {
	statisticsChart.init({
	    type: 'POST',
	    url: '/spywBeta/videoTraining/queryVideotrainChartType.do',
	});
	$(this).hide();
	$("#statiArea").show();
});

$("#statiArea").click(); //初始化按地方排序

/*var trainEcharts = function(){
	var years = new Date().getFullYear();
	//入参
	var params = {};
	var quetyurl = "/spywBeta/videoTraining/queryVideotrainChartType.do";
	//地方或类型的判断	地方为1  类型为2
	var areaortype = 1;
	
	var _init = function(){
		//初始化年并绑定事件
		for(var i=0;i<=50;i++) {
            var str = '';
            str += '<option value="'+ (2000+i) +'">'+ (2000+i) +'</option>';
            $("#years").append(str);
        };
        $("#years").val(years).on("change",function(){
        	params.year = $(this).val();
        	getparams();
        });
        //地方与类型的切换
        $("#statiArea").on("click",function(){
        	quetyurl = '/spywBeta/videoTraining/queryVideotrainChartCode.do',
        	$(this).hide();
        	$("#statiType").show();
        	areaortype = 2;
        });
        
        $("#statiType").on("click", function() {
        	quetyurl = '/spywBeta/videoTraining/queryVideotrainChartType.do',
        	$(this).hide();
        	$("#statiArea").show();
        	areaortype = 1;
        });
        
        params.year = $("#years").val();
        getparams();
	};
	
	var getparams = function(){
		$.post(quetyurl,params,function(data){
			if(data.status == 0){
				data= {
    	        	area: ['淮阴区','淮安区','洪泽区','涟水县','金湖县','清江浦区','盱眙县'],
    	        	list: [123,24,3,456,2,345,23],
    			}
				if(data.data.list.length < 1){
					$("#echartsnodata").show();
					$("#videoChart").hide();
				}else{
					echartsinfo(data.data);
				}
			}else{
				alert("服务器繁忙,请稍后再试!")
			}
			
			
		},"json")
	};
	
	var echartsinfo = function(data){
		var heights = (window.innerHeight) > 662 ? 750 : 400;
	    var chart = '<div id="chart" style="width:1200px;height:'+ heights +'px;"></div>';
	    $("#videoChart").html(chart);
	    var myChart = echarts.init(document.getElementById('chart'));
		
		var year = $("#years").val();
		option = {
	        	color: ['#3398DB'],
	            title: {
	                text: year + '年'  +'视频培训统计表',
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
			        data:["次数"],
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
	            	//type : 'value',
	            	data :data.area,
		            axisTick: {
		                alignWithLabel: true
		            }
	            },
	            yAxis: {
	            	type : 'value',
	            	//type : 'category',
	            	//data :data.area,
	                axisTick: {
	                    alignWithLabel: true,
	                },
	                axisLabel: {
	                    fontSize: 16
	                },
	            },
	            series: [
	            	{
	                    name: '次数',
	                    type: 'bar',
	                    data: data.list,
	                    barCategoryGap :"60%",
	                }
	            ]
	        };
	        myChart.setOption(option);
	        
	        myChart.on('click', function (params) {
        		var areadistrict = [];
            	var hrefdata = "../videoNeighborhood/echartstotal.html";
            	var queryurl = "" ;
            	var htmlname = window.location.href.split("/pages/")[1].split("/")[1];
            	localStorage.echartsdata = htmlname +" "+ params.name + " " + queryurl;
            	window.location.href = hrefdata;
	        })
	};
	
	return {
		init : function(){
			_init();
		}
	}
}()


$(function(){
	trainEcharts.init();
})
*/