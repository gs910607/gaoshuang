//var response = {
//    status: 0,
//    data: {
//        area: ['淮阴区','淮安区','洪泽区','涟水县','金湖县','清江浦区','盱眙县'],
//        list: [123,24,3,456,2,345,23],
//    }
//}

$("#statiArea").on("click", function() {
	statisticsChart.init({
	    type: 'POST',
	    url: '../../information/getData.do',
	    data: {
	    	types: '1'
	    },  //按类型统计  
	});
	$(this).hide();
	$("#statiType").show();
});

$("#statiType").on("click", function() {
	statisticsChart.init({
	    type: 'POST',
	    url: '../../information/getData.do',
	    data: {
	    	types: '2'
	    },  //按类型统计  
	});
	$(this).hide();
	$("#statiArea").show();
});

$("#statiArea").click(); //初始化按地方排序
