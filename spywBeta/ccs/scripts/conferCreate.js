var user=JSON.parse(localStorage.getItem("info"));

var nowTimeStr = new Date().getTime().toString().split('').reverse().slice(0,6).reverse('').join('');
$("#conferCode").val(nowTimeStr);

$("#startTime").val(new Date().format("yyyy-MM-dd hh:mm:ss"));

$("#html5Form").html5Validate(function() {
	$("#assembly").modal({
		keyboard: false,
		backdrop: 'static'
	});

	
	
	
	
	
	
},{
	validate: function() {
		var duration = $("#duration");
		if(isNaN(duration.val())) {
			duration.testRemind("只能输入数字")
			return false;
		}
		return true;
	}
});

var vm = new Vue({
	el:"#assembly",
	data: function() {
		return {
			areaItems: [], //列表
			checkedNames: [],  //选中的列表
			checkAll: false,  //部分全选按钮
			district: '', //区县
			county: '', //乡镇
			areaList: areaObjList, //地区列表
			allCity: false, //选择全市
			selectedCount: '0个', //选择的个数
			allArea: '全选'
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			var _this = this;
			new areaObj({
				districtId: "#district",
				countyId: "#county"
			})

			this.areaList.sort(function(a,b){
				return a.areaCode - b.areaCode;
			})

			Page({
				num: Math.ceil(_this.areaList.length/10),				//页码数
				startnum:1,				//指定页码
				elem:$('#page2'),		//指定的元素
				callback:function(n){	//回调函数
					_this.showItem(n)
				}
			});

		    areaObjList.push({
		        areaName: "全部地区",
		        areaCode: "0",
		        areaId: "0"
		    });

			areaObjList.sort(function(a,b){
				return a.areaCode - b.areaCode;
			});

			areaObjList.map(function(o,i){
				if(o.areaCode == 0) {
					o.pid = 0;
					o.id = '9999';
				}
				if(o.areaCode == 1) {
					o.pid = 0;
					o.id = o.areaCode;
				}
				if(o.areaCode.toString().length == 3) {
					o.pid = 1;
					o.id = o.areaCode;
				}
				if(o.areaCode.toString().length == 6) {
					o.pid = o.areaCode.toString().slice(0,3);
					o.id = o.areaCode;
				}
				if(o.areaCode.toString().length == 9) {
					o.pid = o.areaCode.toString().slice(0,6);
					o.id = o.areaCode;
				}
				
				o.name = o.areaName;
			});

			$(".innerUl").ProTree({
				arr: areaObjList,
				simIcon: "fa fa-file-o",//单个标题字体图标 不传默认glyphicon-file
				mouIconOpen: "fa fa-folder-open-o",//含多个标题的打开字体图标  不传默认glyphicon-folder-open
				mouIconClose:"fa fa-folder-o",//含多个标题的关闭的字体图标  不传默认glyphicon-folder-close
				callback: function(id,name) {
					_this.searchArea(id)
				}
			});

			$(".innerUl .menuUl li span:first").addClass("active").click();
			$(".innerUl .menuUl li span").on('click', function() {
				$(".innerUl .menuUl li span").removeClass("active");
				$(this).addClass("active");
			});
		});
	},
	methods: {
		showItem: function(n) { //分页数据
			var _this = this;

			if(n == 1) {
				this.areaItems = _this.areaList.filter(function(value){
					if(value.areaCode != 0) {
						return value;
					}
				}).slice(0,10);
			} else if(n > 1) {
				this.areaItems = _this.areaList.filter(function(value){
					if(value.areaCode != 0) {
						return value;
					}
				}).slice((n-1)*10 ,n*10);
			}
		},
		ischeckAll: function() { //全选
			var _this = this;
			if(_this.checkAll) {
				if(_this.areaList.length >= areaObjList.length - 1) {
					_this.checkedNames = _this.areaList;
				} else {
					_this.areaList.map(function(obj,ind) {
						if(obj.areaCode != 0) {
							_this.checkedNames.map(function(o,i){
								if(obj == o) {
									_this.checkedNames.splice(i,1);
								};
							});
							_this.checkedNames.push(obj);
						};
					});
				};
			} else {
				if(_this.areaList.length >= areaObjList.length - 1) {
					_this.checkedNames = [];
				} else {
					_this.areaList.map(function(obj,ind){
						_this.checkedNames.map(function(o,i){
							if(obj == o) {
								_this.checkedNames.splice(i,1)
							}
						})
					})
				}
			}
			_this.selectedCount = this.checkedNames.length + '个';

			_this.checkedNamesSort();
		},
		searchArea: function(areaCode) {  //查询
			var _this = this;
			var areaIdList = areaCode; //查询条件

			if(areaIdList != '9999' && areaIdList != 1) {
				var newAreaList = [];
				var areaIdLen = areaIdList.toString().length;
				areaObjList.map(function(obj,ind) {
					if(obj.areaCode.length == areaIdLen+3 && obj.areaCode.substr(0,areaIdLen) == areaIdList) {
						newAreaList.push(obj)
					}
				});
			
				this.areaList = newAreaList;

				this.showItem(1);

				Page({
					num: Math.ceil(_this.areaList.length/10),				//页码数
					startnum:1,				//指定页码
					elem:$('#page2'),		//指定的元素
					callback:function(n){	//回调函数
						_this.showItem(n)
					}
				});
			} else {
				if(areaIdList == 1) {
					_this.areaList = areaObjList.filter(function(value){
						if(value.areaCode.length == 3) {
							return value;
						}
					});
				} else {
					_this.areaList = areaObjList.filter(function(value){
						if(value.areaCode != 0) {
							return value;
						}
					});
				}

				this.showItem(1);

				Page({
					num: Math.ceil(_this.areaList.length/10),	//页码数
					startnum:1,				//指定页码
					elem:$('#page2'),		//指定的元素
					callback:function(n){	//回调函数
						_this.showItem(n)
					}
				});
			};

			var isSelArr = [];
			_this.areaList.map(function(o,i){
				_this.checkedNames.map(function(obj,ind){
					if(o == obj){
						isSelArr.push(obj);
					};
				});
			});

			var sortAreaList = _this.areaList;
			if(JSON.stringify(isSelArr.sort(function(a,b){
					return a.areaCode - b.areaCode;
				})) == JSON.stringify(sortAreaList.sort(function(a,b){
					return a.areaCode - b.areaCode;
				})) && sortAreaList.length > 0) {
				_this.checkAll = true;
			} else {
				_this.checkAll = false;
			}
		},
		removeItem: function(item) {
			this.checkedNames = this.checkedNames.filter(function(obj){
				if(obj != item) {
					return obj
				}
			});
			alert(item.areaName+'已删除');
		},
		checkedNamesSort: function() {
			this.checkedNames.sort(function(a,b){
				return a.areaCode - b.areaCode;
			})
		},
		selectOne: function(event) {
			var _this = this;
			var selArr = [];

			if(event.target.checked) {
				if(_this.areaList.length == areaObjList.length-1) {
					if(_this.checkedNames.length == _this.areaList.length) {
						_this.checkAll = true;
					}
				} else {
					_this.areaList.map(function(o,i){
						_this.checkedNames.map(function(obj,ind){
							if(o == obj) {
								selArr.push(o);
							}
						})
					});
					var newAreaList = _this.areaList;
					if(JSON.stringify(selArr.sort(function(a,b){
						return a.areaCode - b.areaCode;
					})) == JSON.stringify(newAreaList.sort(function(a,b){
						return a.areaCode - b.areaCode;
					}))) {
						_this.checkAll = true;
					}
				}
			} else {
				_this.checkAll = false;
			}

			_this.checkedNamesSort();
		},
		createSureBtn: function() { //确认创建
			var _this = this;
			if(this.checkedNames.length <= 0) {
				alert("至少选择一个");
			} else {
				var checkedNames = [];
				areaObjList.map(function(o,i){
					var isRepeat = false;
					_this.checkedNames.map(function(obj,ind){

						if(obj.areaCode == o.areaCode){
							isRepeat = true;
							return;
						};
					});

					if(isRepeat) {
						checkedNames.push({
							areaId: o.areaId,
							mcu: o.mcu
						})
					}

				});
				
				var params = {
					name: $("#conferName").val(),
					beginTime: timeToDate($("#startTime").val()),
					duration: $("#duration").val(),
					accessCode: $("#conferCode").val(),
					isRecording: $("#recorded").val(),
					allId: checkedNames.toString()
				}
				$.ajax({
					url : "../../conference/addConference.do", //请求的url地址
					dataType : "json", //返回格式为json
					data : params, //参数值
					type : "post", //请求方式
					beforeSend : function() {
						ajaxLoading.show();
					},
					success : function(responseStr) {
						ajaxLoading.hide();
						if (responseStr.status == 1) {
							alert(responseStr.msg)
							setTimeout(function() {
								location.href = "conferList.html";
							}, 1000)
						} else {
							alert(responseStr.msg);
						}
					},
					error : function(responseStr) {
						alert("服务繁忙，请稍后再试")
						ajaxLoading.hide();
					},
					completed : function() {
						ajaxLoading.hide();
					}
				});
			}
		}
	},
	watch: {
		checkedNames: function() {
			var _this = this;
			_this.selectedCount = _this.checkedNames.length + '个';
		}
	}
})

function timeToDate(time){
	time=time.replace(/-/g,':').replace(' ',':');
	time=time.split(':');
	var time1 = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
	return time1;
}
