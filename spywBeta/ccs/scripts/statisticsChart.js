// 培训 和 新闻
var statisticsChart = {
    options: {
        type: 'get',
        url:'',
        data: {
            types: 0,
            category: false
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
        for(var i=0;i<=50;i++) {
            var str = '';
            str += '<option value="'+ (2000+i) +'">'+ (2000+i) +'</option>';
            $("#years").append(str);
        };
        $("#years").val(_this.date.year);

        // 月份
        var monthstr = '';
        for(var i=0;i<statisticsChart.months.length;i++) {
            monthstr += '<option value="'+ this.formatMonth(i+1) +'">'+ statisticsChart.months[i] +'</option>';
        };
        $("#month").html(monthstr);
        $("#month").val(_this.date.month);

        // 初始化渲染图标
        statisticsChart.getData();

        // 按区县 or  乡镇 分
        $("#category").on("change", function() {
            var category = $(this).val();
            if(category == 1) {
                $("#districts").hide();
                _this.date.category = '0';
                _this.date.pie = false;
            } else if(category == 2) {
                $("#districts").show();
                _this.date.category = '101';
                _this.date.pie = true;
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
        $("#month").on("change", function() {
            _this.date.month = $(this).val();
            statisticsChart.getData();
        });
    },
    formatMonth: function(month) {
        if(month < 10) {
            return '0' + month;
        } else {
            return month;
        }
    },
    months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    getData:function () {

        var _this = this;
        var data = {
            year: _this.date.year,
            month: _this.date.month,
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
                    statisticsChart.videoChart(data.area, data.list, _this.date.year, _this.date.month)//图标
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
    videoChart: function(area, dataList, year,  month) {
        var myChart = echarts.init(document.getElementById('videoChart'));
        if(document.getElementById('videoChartPie')) {
            var myChartPie = echarts.init(document.getElementById('videoChartPie'));
        };
        var _this = this
        var dataArr = [];
        var areaCount = area.map(function(obj,ind) {
            dataArr.push({
                value: dataList[ind],
                name: obj+'：'+ dataList[ind]
            })
            return obj+'：'+ dataList[ind]
        });

        var dataTotal = 0;
        dataList.map(function(o,i) {
            dataTotal += o
        });
        
        if(area.length > 4){
        	var axisLabeldata = {
                	interval: 0, 
                    fontSize: 14,
                    formatter:function(value)  
                    {  
                        return value.split("").join("\n");  
                    }
                }
        }else{
        	var axisLabeldata = {
                    fontSize: 16,
                    formatter:function(value)  
                    {  
                        return value;  
                    }
                }
        }
        
        
        option = {
            color: ['#3398DB'],
            title: {
                text: year + '年' + month + '月统计表',
                padding: [0, 35],
                textStyle: {
                    align: 'center',
                    fontSize: 24,
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow',  // 默认为直线，可选为：'line' | 'shadow'
                    label: {
                        show: false,
                    }
                },
                textStyle: {
                    fontSize: 16
                }
            },
            axisPointer: {
                label: {
                    textStyle: {
                        fontSize: 16
                    }
                }
            },
            textStyle: {
                color: '#000',
                fontSize: 16
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : area,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: axisLabeldata,
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        fontSize: 16
                    }
                }
            ],
            series : [
                {
                    name:'次数',
                    type:'bar',
                    barWidth: '40%',
                    data:dataList,
                    /*label: {
                        normal: {
                            show: false,
                            fontSize: 16,
                            position: 'top',
                            formatter: '{b}: {c}',
                        },
                        emphasis: {
                            show: false,
                            position: 'top',
                            formatter: function(params) {
                                return (isNaN((params.value / dataTotal) * 100)?0:((params.value / dataTotal) * 100).toFixed(2))  + '%';
                            }
                        }
                    }*/
                }
            ]
        };

        optionPie = {
            title: {
                text: year + '年' + month + '月接访统计表',
                padding: [0, 35],
                textStyle: {
                    align: 'center',
                    fontSize: 24,
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: areaCount
            },
            textStyle: {
                fontSize: 14,
            },
            series : [
                {
                    name: '地区',
                    type: 'pie',
                    radius : '60%',
                    data: dataArr,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        if(_this.date.pie) {
            $("#videoChart").css("display","none");
            $("#videoChartPie").css("display","block");
            myChartPie.setOption(optionPie);
        } else {
            $("#videoChart").css("display","block");
            $("#videoChartPie").css("display","none");
            myChart.setOption(option);
        }
    },
}