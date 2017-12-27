// 接访 和 调解
var info = JSON.parse(localStorage.getItem("info"));
var usergroupid;
if(info) {
    if(info.usergroupid) {
         usergroupid = info.usergroupid
    }
};
var dropbl = false;
var typebl ;
var droplistdata = [];
var statisticsChart = {
    options: {
        type: 'get',
        url:'',
        data: {
            types: 0,
            category: false,
        }
    },
    date: {
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth()+1).toString(),
        category: '0',
        pie: false
    },
    init: function(options) {
        options = $.extend(this.options,options);

        var _this = this;
        // 年份
        for(var i=0;i <= 10;i++) {
            var str = '';
            str += '<option value="'+ (_this.date.year-i) +'">'+ (_this.date.year-i) +'</option>';
            $("#years").append(str);
        };
        $("#years").val(_this.date.year);
        
        // 月份
        var monthstr = '';
        /*for(var i=0;i<statisticsChart.months.length;i++) {
            monthstr += '<option value="'+ this.formatMonth(i+1) +'">'+ statisticsChart.months[i] +'</option>';
            
        };
        $("#month").html(monthstr);
        $("#month").val(_this.date.month);*/

        // 初始化渲染图标
        statisticsChart.getData();

        // 按区县 or  乡镇 分
        $("#category").on("change", function() {
            var category = $(this).val();
            if(category == 1) {
                $("#districts").hide();
                _this.date.category = '0';
            } else if(category == 2) {
                $("#districts").show();
                
                //usergroupid ? $("#districtsSel").html('<option value="'+ usergroupid +'">'+ _this.districtList[usergroupid] +'</option>').attr("disabled",true) : '';            
                if(usergroupid == 1){
                	_this.date.category = '101';
                	var drophtmldata = '';
                	$('#districts').removeAttr("disabled"); 
                	$("#districtsSel option").remove();
                	for(i = 0 ; droplistdata.length > i ; i++){
                		//drophtmldata+='<option value="'+ droplistdata[i].key +'">'+ droplistdata[i].value +'</option>';
                		var options = document.createElement("option");
                        options.value = droplistdata[i].key ;
                        options.innerHTML = droplistdata[i].value ;
                        $("#districtsSel").append(options)
                    }
                	//$("#districtsSel").html(drophtmldata)
                }else{
                	_this.date.category = usergroupid ? usergroupid : '101';
                	for(i = 0 ; droplistdata.length > i ; i++){
                    	if(usergroupid.toString().substr(0,3) == droplistdata[i].key){
                    		$("#districtsSel").html('<option value="'+ usergroupid +'">'+ droplistdata[i].value +'</option>').attr("disabled",true)
                    	}
                    }
                }
                
            }
            statisticsChart.getData();
        });

        // 展示哪个区县
        $("#districtsSel").on("change", function() {
            var distVal = $(this).val();
            _this.date.category = distVal;
            statisticsChart.getData();
        });

        // 选择年份
        $("#years").on("change", function() {
            _this.date.year = $(this).val();
            statisticsChart.getData();
        });

        // 选择月份
        /*$("#month").on("change", function() {
            _this.date.month = $(this).val();
            statisticsChart.getData();
        });*/
    },
    formatMonth: function(month) {
        if(month < 10) {
            return '0' + month;
        } else {
            return month;
        }
    },
    createContainer: function(success) {
        $("#videoChart").empty();
        var heights = (window.innerHeight) > 662 ? 750 : 400;
        return '<div id="chart" style="width:1200px;height:'+ heights +'px;"></div>'
    },
    districtList: {
    	101:'淮安区',
    	102:'淮阴区',
    	103:'金湖县',
    	104:'涟水县',
    	105:'洪泽区',
    	106:'清江浦区',
    	107:'盱眙县'
    },
    //months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    getData:function () {
        
        var _this = this;
        var data = {
            year: _this.date.year,
          //  month: _this.date.month,
        }
        if(this.options.data.types) {
           data.types = this.options.data.types;
        }
        if(this.options.data.category) {
            data.category = this.date.category;
        }
        $.ajax({
            type: this.options.type,
            url: this.options.url,
            dataType: 'json',
            data: data,
            success: function(response) {
                ajaxLoading.hide();
                if(response.status == 0) {
                    var data = response.data;
                    /*data={
                        area: ['淮阴区','淮安区','洪泽区','涟水县','金湖县','清江浦区','盱眙县'],
                        success: [123,24,3,456,2,345,23],
                        defeated: [11,33,4,4,560,66,7],
                        unknown : [1,1,3,1,1,1,2]
                    };*/
                    droplistdata = [];
                    for(i = 0 ; data.code.length > i ; i++){
                    	droplistdata.push({
                    		key:data.code[i],
                    		value:data.area[i]
                    	})
                    }
                    
                    typebl = _this.options.url.indexOf("conference");
                    if(typebl < 0){
                    	data.total = [];
                        for(i = 0 ; data.success.length > i ; i++){
                        	var totalnumber = parseInt(data.success[i]) + parseInt(data.defeated[i]) + parseInt(data.unknown[i]);
                        	data.total.push(totalnumber);
                        }
                    }
                    //statisticsChart.videoChart(data, _this.date.year, _this.date.month)//图标
                    statisticsChart.videoChart(data, _this.date.year)
                }
            },
            error: function() {
                ajaxLoading.hide();
                alert("服务繁忙，请稍后再试");
            },
            beforeSend: function() {
                ajaxLoading.show();
            },
            completed: function() {
                ajaxLoading.hide();
            }
        })
    },
    videoChart: function(data, year) {
        var _this = this
        var chart = _this.createContainer(data.success);
        $("#videoChart").html(chart);
        var myChart = echarts.init(document.getElementById('chart'));
        
        var areaName;
        if($("#category").val() == 1) {
            areaName = '各区县';
        } else {
            areaName = $("#districtsSel option:selected").text()
        }
        
        var legenddata = [];
        var seriesdata = []
        if(typebl >= 0){
        	legenddata = ["次数"];
        	seriesdata = [{name: '次数',type: 'bar',data: data.count,barCategoryGap :"40%"}];
        }else{
        	legenddata = ["总次数","成功次数","失败次数","未确定次数"];
        	seriesdata = [{  name: '总次数',type: 'bar',data: data.total},{name: '成功次数',type: 'bar',data: data.success},{name: '失败次数',type: 'bar',data: data.defeated},{name: '未确定次数',type: 'bar',data: data.unknown}]
        }
        option = {
        	color: ['#3398DB',"#f9084a","#08f9f9","#f9db08"],
            title: {
                text: year + '年' + areaName +'统计表',
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
		        data:legenddata,
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
                /*type : 'value',*/
                /*axisLabel: {
                    fontSize: 16
                },*/
            	/*axisLabel: {  
            		   interval:0,  
            		   rotate:40  
            	},*/
            	axisLabel: {  
            		fontSize: 14,
                    interval: 0, 
                    formatter:function(value)  
                    {  
                        return value.split("").join("\n");  
                    }  
                },
            	data :data.area,
	            axisTick: {
	                alignWithLabel: true
	            }
            },
            yAxis: {
            	type : 'value',
                /*type : 'category',
                data : area,*/
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
        myChart.on('click', function (params) {
        	var category = $("#category").val();
        	var areaname = null;
        	if( category == 1){
        		if(data.code && data.code.length > 0 ){
        			for(i = 0 ; data.code.length > i ; i++){
            			if(params.name == data.area[i]){
            				areaname = data.code[i]
            			}
            		}
        		}
            	var hrefdata = "./echartstotal.html";
            	var htmlname = window.location.href.split("/pages/")[1].split("/")[1];
            	if(htmlname.indexOf("videoChart") >= 0  ){
            		hrefdata = "../videoNeighborhood/echartstotal.html";
            	}
            	if(htmlname.indexOf("conferEcharts") >= 0){
            		hrefdata = "../videoNeighborhood/echartstotal.html";
            	}
            	localStorage.echartsdata = htmlname +" "+ params.name+","+ areaname + " " + $("#years").val();
            	window.location.href = hrefdata;
        	}
        })

    },
}