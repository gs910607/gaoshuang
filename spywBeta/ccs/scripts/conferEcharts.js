var conferEcharts = function(){
	
	var _init = function(){
		//初始化下拉框以及图表
		statisticsChart.init({
		    type: 'POST',
		    url: '/spywBeta/conference/getData.do',
		    data: {
		        category: true
		    }
		})
		
	};
	
	return {
		init : function(){
			_init();
		}
	}
}()


$(function(){
	conferEcharts.init();
	
})