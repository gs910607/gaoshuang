var conferNav = function(){
	
	var _init = function(){
		//获取用户信息
		var info = JSON.parse(localStorage.getItem("info"));
		if(info && info.usergroupid.toString().length > 3){
			$(".clearfix li:nth-child(3)").remove();
		}
	};
	
	return {
		init:function(){
			_init();
		}
	}
}()



$(function(){
	//初始化  根据用户来判断是否显示统计
	conferNav.init();
})
