var videoPlayer = function() {

	// 页面控件对象
	var _treeObject = "#treeDemo";
	var _videoControlBar = "#videoControlbar";
	var _videoObject = "#objPlayctrl";
	//	用于判断ztree是否添加子节点
	var ztreegroup = [];
	var ztreepoint = [];
	//var 乡镇 村
	var ztreecodedata = null ;
	// 用户登录后的tokenId值
	var _tokenId = null;
	
	//分屏初始化参控制
	var videocount = document.getElementById("addX") ;
	//分屏的大小及分屏的个数
	var setCountsize = 1;
	var setCountnum = 0;
	
	var PlayPoints = [ 16 ];
	var _zTreeObj = null;

	var _urlLogin = "/spywBeta/monitoring/login.do";
	var _urlgetGroupById = "/spywBeta/monitoring/getGroup.do";
	var _urlRealPlay = "/spywBeta/monitoring/realPlay.do";
	var _urlPTZControl = "/spywBeta/monitoring/ptzControl.do";
	var _urlTopGroup = "/spywBeta/monitoring/topGroup.do";

	// region 登录及检查
	var _initPlayer = function() {
		var ztreeheight ;
		try{
			var userdata = JSON.parse(localStorage.info||null) ;
			if(userdata && userdata.usergroupid.toString().length < 3){
				ztreeheight = $("#treeDemo").parent().parent().height()-2-10 -36 ;
				$(".videosite").click(function(){
					window.location.href = "./videoPointInfo.html?type=1" 
				});
			}else{
				$(".videosite").parent().hide();
				ztreeheight = $("#treeDemo").parent().parent().height()-2-10 ;
			}
			//ztree 高
			$("#treeDemo").css({height:ztreeheight+"px"});
			//初始化视频控件
			if(userdata && userdata.username){
				var userinit = userdata.username + "/" + userdata.realname ;
				var initdata = videocount.Init(userinit,1); 
			}
			videocount.SetWndCount(1);
		}catch(e){
			alert("视屏控件初始化失败,请选择ie浏览器并安装插件");
		}
		
		_loginServer();
		
		window.onbeforeunload = function(){
			videocount.StopAllPlay();
		};
	};

	var _loginServer = function() {
		var postData = {};
		if (_tokenId == null) {
			$.post(_urlLogin, postData, function(data) {
				if (data && data.code && data.code == 1) {
					_tokenId = data.data.token;
					_loadDeviceTree();
				} else {
					alert(data.message||"登陆失败!");
				}
			})
		} else {
			_loadDeviceTree();
		}
	};

	var _startPlay = function(videoUrl, treeId) {
		var eplayctrl = $(_videoObject)[0];
		var wndIndex = eplayctrl.APPGetCurWndIndex();
		eplayctrl.APPClosePlay(wndIndex);
		eplayctrl.APPOpenRealPlay(wndIndex, videoUrl);
		PlayPoints[wndIndex] = treeId;
	};
	
	var _loadDeviceTree = function() {

		/*$.post(_urlTopGroup, {
			token : _tokenId
		}, function(data) {
			if (data.code == "1") {
				var zTreeNodes = [];
				for (var i = 0; i < data.data.count; i++) {
					var node = data.data.groups[i];
					if (node.ParentId == null || node.ParentId == 0
							|| node.ParentId == "") {
						zTreeNodes.push({
							id : node.groupId,
							name : node.groupName,
							open : false,
							isParent : true,
							type : "group"
						});
					}
				}

				var setting = {
					callback : {
						onExpand : _zTreeOnExpand,
						onDblClick : _zTreeOnDblClick,
						onClick : _zTreeOnClick
					}
				};
				_zTreeObj = $.fn.zTree
						.init($(_treeObject), setting, zTreeNodes);
			} else {
				alert(data.message);
			}
		});*/
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
							onDblClick : _zTreeOnDblClick,
							onClick : _zTreeOnClick
						}
					};
					_zTreeObj = $.fn.zTree
							.init($(_treeObject), setting, zTreeNodes);
			}
			
		})
	};

	var _zTreeOnExpand = function(event, treeId, treeNode) {
		if(treeNode.code.length < 9){
			$.post("/spywBeta/area/arealistByChildrens.do", {parentId:treeNode.code}, function(data) {
				if(data.status == 1){
					$.post("/spywBeta/monitoring/selectInfo.do",{videoinfoType:1,videoinfoCode:treeNode.code},function(dataInfo){
						if(dataInfo.status == 1){      
							var groupNodeList = [];
							if(ztreecodedata && data.list[0].code.length == 6 && ztreecodedata.length >= 6 && data.list.length > 0){
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
								if(dataInfo.status == 1 && dataInfo.list.length > 0 && ( !ztreecodedata || ztreecodedata.length < 6)){
									for(i =0 ; dataInfo.list.length > i ; i++){
										groupNodeList.push({
											id : dataInfo.list[i].videoinfovideoId,
											name : dataInfo.list[i].videoinfoName,
											open : false,
											isParent : false,
											type : "group",
										});
									}
								}
							}else if(ztreecodedata && data.list[0].code.length == 9 && ztreecodedata.length == 9 && data.list.length > 0){
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
								if(dataInfo.status == 1 && dataInfo.list.length > 0 && ( !ztreecodedata || ztreecodedata.length < 9)){
									for(i =0 ; dataInfo.list.length > i ; i++){
										groupNodeList.push({
											id : dataInfo.list[i].videoinfovideoId,
											name : dataInfo.list[i].videoinfoName,
											open : false,
											isParent : false,
											type : "group",
										});
									}
								}
							}else{ 
								//市级单位 区县
								if(data.list.length > 0){
									for(i =0 ; data.list.length > i ; i++){
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
								
								if(dataInfo.status == 1 && dataInfo.list.length > 0){
									for(i =0 ; dataInfo.list.length > i ; i++){
										groupNodeList.push({
											id : dataInfo.list[i].videoinfovideoId,
											name : dataInfo.list[i].videoinfoName,
											open : false,
											isParent : false,
											type : "group",
										});
									}
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
					});
				}
			})
		}else{
			$.post("/spywBeta/monitoring/selectInfo.do", {videoinfoType:1,videoinfoCode:treeNode.code}, function(data) {
				if(data.status == 1){
					if(data.list.length > 0){
						var groupNodeList = [];
						for(i =0 ; data.list.length > i ; i++){
							groupNodeList.push({
								id : data.list[i].videoinfovideoId,
								name : data.list[i].videoinfoName,
								open : false,
								isParent : false,
								videoinfoType : data.list[i].videoinfoType,
								videoinfoCode : data.list[i].videoinfoCode,
								videoinfoStatus : data.list[i].videoinfoStatus
							});
						}
						var openb = false ;
						if(ztreepoint.length > 0){
							for( i = 0 ; ztreepoint.length > i ; i++){
								if(treeNode.code == ztreepoint[i]){
									openb = true ;
									break ;
								}
							}
						}
						if(openb == false){
							ztreepoint.push(treeNode.code);
							_zTreeObj.addNodes(treeNode, groupNodeList);
						}
					}
				}
			})
		}
		
		
		
		/*$.post(_urlgetGroupById, {
			token : _tokenId,
			groupId : treeNode.id
		}, function(data) {
			if (data && data.code && data.code == 1) {
				if (data.data.group && data.data.group.count > 0) {
					var groupNodeList = [];
					for (var i = 0; i < data.data.group.groups.length; i++) {
						var groupNode = data.data.group.groups[i];
						groupNodeList.push({
							id : groupNode.groupId,
							name : groupNode.groupName,
							open : false,
							isParent : true,
							type : "group"
						});
					}
					//_zTreeObj.removeChildNodes(treeNode);
					var openb = false ;
					if(ztreegroup.length > 0){
						for( i = 0 ; ztreegroup.length > i ; i++){
							if(data.data.group.groups[0].groupId == ztreegroup[i]){
								openb = true ;
								break ;
							}
						}
					}
					if(openb == false){
						ztreegroup.push(data.data.group.groups[0].groupId);
						_zTreeObj.addNodes(treeNode, groupNodeList);
					}
					
				}

				if (data.data.point && data.data.point.count > 0) {
					var pointNodeList = [];
					for (var j = 0; j < data.data.point.count; j++) {
						var pointNode = data.data.point.points[j];
						var statusMsg = "--在线";
						if (pointNode.status == 0) {
							statusMsg = "--离线";
						}
						if (pointNode.status == 2) {
							statusMsg = "--故障";
						}
						pointNodeList.push({
							id : pointNode.pointId,
							name : pointNode.pointName + statusMsg,
							isParent : false,
							status : pointNode.status,
							longitude : pointNode.longitude,
							latitude : pointNode.latitude,
							isControl : pointNode.isControl,// 1.表示可以控制，0.表示不可以控制
							type : "point"
						})
					}
					var openb = false ;
					if(ztreepoint.length > 0){
						for( i = 0 ; ztreepoint.length > i ; i++){
							if(data.data.point.points[0].pointId == ztreepoint[i]){
								openb = true ;
								break ;
							}
						}
					}
					if(openb == false){
						ztreepoint.push(data.data.point.points[0].pointId);
						_zTreeObj.addNodes(treeNode, pointNodeList);
					}
					
				}
			}
		});*/
	};

	var _zTreeOnDblClick = function(event, treeId, treeNode) {
		if (!treeNode.isParent) {
			$.post(_urlRealPlay, {
				pointId : treeNode.id,
				articulation : 2,
				token : _tokenId
			}, function(data) {
				if (data && data.code && data.code == 1) {
					//_startPlay(data.data.url, treeId);
					try{
						if(setCountnum > (setCountsize -1 )){
				    		videocount.StopPlay(setCountsize -1);
				    		videocount.StartPlay(data.data.url,setCountsize -1);
				    	}else{
				    		videocount.StartPlay(data.data.url,setCountnum);
				    	}
					}catch(e){
						console.log("插件初始化失败")
					}
			    	
			        setCountnum+= 1 ;
				} else {
					alert(data.message);
				}
			})
		}
	};

	var _zTreeOnClick = function(event, treeId, treeNode) {
		/*if (treeNode.type == "point" && treeNode.isControl == 1) {
			$(_videoControlBar).show();
		} else {
			$(_videoControlBar).hide();
		}*/
		/*if (!treeNode.isParent) {
			$(_videoControlBar).show();
		} else {
			$(_videoControlBar).hide();
		}*/
	};

	/**
	 * 控制摄像机云台
	 * 
	 * @param controlType
	 *            0 左，1 右 2 上 3下，4 放大 5 缩小 6 左上 7 右上 8 左下 9 右下 10 焦距增加 11 焦距减小
	 *            12 光圈放大 13 光圈缩小 14 设置预置位 15 删除预置位 16 执行预置位
	 * @param startOrStop
	 *            0 停止,1 慢速,2 中速,3 快速
	 * @private
	 */
	var _videoControl = function(controlType, startOrStop) {
		var selectedNode = _zTreeObj.getSelectedNodes();
		if (selectedNode != null && selectedNode.length > 0
				&& selectedNode[0].isControl == 1) {
			var pointId = selectedNode[0].id;
			$.post(_urlPTZControl, {
				pointId : pointId,
				ptzCtrlType : controlType,
				ptzCtrlValue : startOrStop,// 0 停止,1 慢速,2 中速,3 快速
				token : _tokenId
			}, function(data) {
				console.info(data);
			});
		}
	};
	// endregion
	
	//摄像头分屏
	var _SetWindowCount = function(count){
		try{
			videocount.StopAllPlay();
	        var sum2=videocount.SetWndCount(count); 
	        setCountsize = count;
	    	setCountnum = 0;
		}catch(e){  
	        alert(e);  
	    }
	};
	
				
	
	return {
		initPlayer : function() {
			_initPlayer()
		},
		SetWindowCount: function(count){
			_SetWindowCount(count);
		},
		videoUpStart : function() {
			_videoControl(2, 2);
		},
		videoUpStop : function() {
			_videoControl(2, 0);
		},
		videoDownStart : function() {
			_videoControl(3, 2);
		},
		videoDownStop : function() {
			_videoControl(3, 0);
		},
		videoLeftStart : function() {
			_videoControl(0, 2);
		},
		videoLeftStop : function() {
			_videoControl(0, 0);
		},
		videoRightStart : function() {
			_videoControl(1, 2);
		},
		videoRightStop : function() {
			_videoControl(1, 0);
		},
		videoLeftUpStart : function() {
			_videoControl(6, 2);
		},
		videoLeftUpStop : function() {
			_videoControl(6, 0);
		},
		videoRightUpStart : function() {
			_videoControl(7, 2);
		},
		videoRightUpStop : function() {
			_videoControl(7, 0);
		},
		videoLeftDownStart : function() {
			_videoControl(8, 2);
		},
		videoLeftDownStop : function() {
			_videoControl(8, 0);
		},
		videoRightDownStart : function() {
			_videoControl(9, 2);
		},
		videoRightDownStop : function() {
			_videoControl(9, 0);
		},
		videoZoomUpStart : function() {
			_videoControl(4, 2);
		},
		videoZoomUpStop : function() {
			_videoControl(4, 0);
		},
		videoZoomDownStart : function() {
			_videoControl(5, 2);
		},
		videoZoomDownStop : function() {
			_videoControl(5, 0);
		},
		videoFocusUpStart : function() {
			_videoControl(10, 2);
		},
		videoFocusUpStop : function() {
			_videoControl(10, 0);
		},
		videoFocusDownStart : function() {
			_videoControl(11, 2);
		},
		videoFocusDownStop : function() {
			_videoControl(11, 0);
		},
		videoApertureUpStart : function() {
			_videoControl(12, 2);
		},
		videoApertureUpStop : function() {
			_videoControl(12, 0);
		},
		videoApertureDownStart : function() {
			_videoControl(13, 2);
		},
		videoApertureDownStop : function() {
			_videoControl(13, 0);
		},
		videoControlStop : function() {
			_videoControl(0, 0);
		}
	}
}();

$(function() {
	videoPlayer.initPlayer();
});