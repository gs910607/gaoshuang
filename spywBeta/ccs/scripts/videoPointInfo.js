var videoPointInfo = function(){
	
	var ztreeid = "#tree";
	var _zTreeObj = null;
	//var 乡镇 村
	var ztreecodedata = null ;
	//	用于判断ztree是否添加子节点
	var ztreegroup = [];
	var ztreepoint = [];
	var type ;
	var update = true;
	
	var _init = function(){
		type = GetQueryString("type");
		
		//ztree 高 
		$("#tree").css({"height": $(".content").height()-10+"px"})
		if(type == 1 ){
			document.title='视频监控配置';
			$(".pull-left img").attr("src","../../images/shipinjiankong.png");
		}else{
			document.title='视频督察配置';
			$(".pull-left").css({"font-size": "34px", "margin-top": "0", "color": "white", "font-weight": "500"}).text("视频督察");
		}
		_loadDeviceTree();
		
		tableinit();
		
		$("#videosite").click(function(){
			site();
		});
		
		$("#videoresite").click(function(){
			$.post("/spywBeta/monitoring/saveVideoInfo.do",function(datas){
				if(datas.status == 1){
					alert("同步数据成功!");
					tableinit();
				}
			})
		});
	};
	
	//视频区域配置
	var site = function(){
		var ztreedata = _zTreeObj.getSelectedNodes();
		var videodata = $(".asd:checked") ;
		if(ztreedata.length > 0){
			if(videodata.length > 0){
				for(i = 0 ; videodata.length > i ; i++){
					var params = {};
					params.videoinfoId = videodata[i].value ;
					params.videoinfoCode = ztreedata[0].code ;
					params.videoinfoCodeName = ztreedata[0].name ;
					params.videoinfoType = type ;
					updatenum = i ;
					$.post("/spywBeta/monitoring/updateInfo.do",params,function(data){
						if(data.status == 1 ){
							if(update){
								alert("修改成功!");
								tableinit();
							}
						}else{
							update = false ;
						}
					});
				}
				
				
			}else{
				alert("请您至少选择一个摄像机！");
			}
		}else{
			alert("请您先选择一个地区！");
		}
	};
	
	/*重写alert方法*/
	function alert(message) {
		$("#alertDiv").remove();
		var html = '<div id="alertDiv" data-id="'+ new Date().getTime() +'" style="font-size:16px;width: 50%; padding: 5px;margin: auto;bottom: 200px;left: 0;right: 0;background-color: rgba(0,0,0,.7);position: fixed;text-align: center;color: #fff;font-weight: 400;border-radius: 8px; z-index:99999999999;">' +
			message +
			'</div>';
		$("body").append(html);
		var dataId = $("#alertDiv").data("id");
		var timer = setTimeout(function() {
			$("#alertDiv[data-id="+ dataId +"]").remove();
		}, 2000)
	}
	
	//初始化表格
	var tableinit = function(){
		$.post("/spywBeta/monitoring/selectInfo.do",{pagesize:10,codeStatus:"1"},function(data){
			if(data.status == 1){
				tabledata(data.list);
				
				Page({
					num : Math.ceil(data.total/10), //页码数
					startnum : 1, //指定页码
					elem : $('#page2'), //指定的元素
					callback : function(n) { //回调函数
						$.post("/spywBeta/monitoring/selectInfo.do?pagesize=10&codeStatus=1&pagenumber=" + n, function(data) {
							if(data.status == 1){
								tabledata(data.list);
							}
						});
					}
				});
			}
		})
	};
	
	//渲染数据
	var tabledata = function(list){
		$("#tbody").html("");
		var tbodydata = ""
		if(list.length > 0){
			for(i = 0 ; list.length > i ; i++){
				tbodydata += "<tr>";
				tbodydata += "<td>"+ "<input class='asd' type='checkbox' value = "+ list[i].videoinfoId+ ">" + "</td>";
				tbodydata += "<td>"+ list[i].videoinfoName + "</td>";
				/*if(list[i].videoinfoCodeName){
					tbodydata += "<td>" + list[i].videoinfoCodeName + "</td>";
				}else{
					tbodydata += "<td></td>";
				}*/
				/*if(list[i].videoinfoStatus == 1){
					tbodydata += "<td>" + "在线 "+ "</td>";
				}else{
					tbodydata += "<td>" + "不在线" + "</td>";
				}*/
				tbodydata += "</tr>";
			}
		}
		$("#tbody").html(tbodydata);
	};
	
	//获取url参数
	var GetQueryString = function(name) {
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	};
	
	//ztree初始化
	var _loadDeviceTree = function() {
		$.post("/spywBeta/area/arealistByChildrens.do", {parentId:0},function(data){
			if(data.status == 1){
				var zTreeNodes = [];
				var codeid = null;
				if(localStorage.info && JSON.parse(localStorage.info)){
					if(JSON.parse(localStorage.info).usergroupid){
						codeid = JSON.parse(localStorage.info).usergroupid;
					}
				}
				if(codeid && codeid == 1){
					for(i =0 ; data.list.length > i ; i++){
						zTreeNodes.push({
							id : data.list[i].id,
							name : data.list[i].name,
							open : false,
							isParent : true,
							type : "group",
							parentId:data.list[i].parentId,
							code:data.list[i].code
						});
					}
				}else if(codeid && codeid.toString().length == 3){
					for(i =0 ; data.list.length > i ; i++){
						if(codeid == data.list[i].code){
							zTreeNodes.push({
								id : data.list[i].id,
								name : data.list[i].name,
								open : false,
								isParent : true,
								type : "group",
								parentId:data.list[i].parentId,
								code:data.list[i].code
							});
						}
					}
				}else if(codeid && codeid.toString().length >= 6){
					ztreecodedata = codeid.toString() ;
					for(i =0 ; data.list.length > i ; i++){
						if(codeid.toString().substr(0,3) == data.list[i].code){
							zTreeNodes.push({
								id : data.list[i].id,
								name : data.list[i].name,
								open : false,
								isParent : true,
								type : "group",
								parentId:data.list[i].parentId,
								code:data.list[i].code
							});
						}
					}
				}
				var setting = {
						callback : {
							onExpand : _zTreeOnExpand,
							onClick : _zTreeOnClick
						}
					};
					_zTreeObj = $.fn.zTree.init($(ztreeid), setting, zTreeNodes);
			}
			
		})
	};
	
	//ztree 展开事件
	var _zTreeOnExpand = function(event, treeId, treeNode) {
		if(treeNode.code.length < 9){
			$.post("/spywBeta/area/arealistByChildrens.do", {parentId:treeNode.code}, function(data) {
				if(data.status == 1){
					if(data.list.length > 0){
						var groupNodeList = [];
						if(ztreecodedata && data.list[0].code.length == 6 && ztreecodedata.length >= 6){
							for(i =0 ; data.list.length > i ; i++){
								if(ztreecodedata.substr(0,6) == data.list[i].code){
									groupNodeList.push({
										id : data.list[i].id,
										name : data.list[i].name,
										open : false,
										isParent : true,
										type : "group",
										parentId:data.list[i].parentId,
										code:data.list[i].code
									});
								}
							}
						}else if(ztreecodedata && data.list[0].code.length == 9 && ztreecodedata.length == 9){
							for(i =0 ; data.list.length > i ; i++){
								if(ztreecodedata == data.list[i].code){
									groupNodeList.push({
										id : data.list[i].id,
										name : data.list[i].name,
										open : false,
										isParent : true,
										type : "group",
										parentId:data.list[i].parentId,
										code:data.list[i].code
									});
								}
							}
						}else{
							for(i =0 ; data.list.length > i ; i++){
								var parentdata = treeNode.code.length == 6 ? false : true ;
								groupNodeList.push({
									id : data.list[i].id,
									name : data.list[i].name,
									open : false,
									isParent : parentdata,
									type : "group",
									parentId:data.list[i].parentId,
									code:data.list[i].code
								});
							}
						}
						var openb = false ;
						if(ztreegroup.length > 0){
							for( i = 0 ; ztreegroup.length > i ; i++){
								if(data.parentId == ztreegroup[i]){
									openb = true ;
									break ;
								}
							}
						}
						if(openb == false){
							ztreegroup.push(data.parentId);
							_zTreeObj.addNodes(treeNode, groupNodeList);
						}
					}
				}
			})
		}
	};
	
	var _zTreeOnClick = function(event, treeId, treeNode) {
		
	};
	
	return {
		init :function(){
			_init();
		}
	}
}();

$(function(){
	videoPointInfo.init();
})