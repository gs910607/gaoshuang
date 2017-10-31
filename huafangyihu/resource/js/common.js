//配置文件
var config = {
	//"packageAUrl": "http://36.7.72.88:8128/appserver/",
	"packageAUrl": "http://114.55.64.234:8202/appserver/",
	"KeFuUrl": "http://120.27.203.234:8203/hcss/",
	//"KeFuUrl":"http://192.168.0.111:8080/hcss-web-home/",
	//"url":"http://10.0.81.4:8168/appbasis/"
	//"url": "http://192.168.0.112:8080/appbasis-web-home/",
	//"url": "http://192.168.0.109:8080/appbasis-web-home/",
	A_url: "http://114.55.64.234:8055/appbasis/",
	/*服务器服务*/
	  appserver_url:"http://192.168.200.73:8080/appserver/api",
	/*服务地登录*/
	  applogin_url: "http://192.168.200.73:8080/applogin/api",

	callBack_Url: "http://test.hofonehu.com/APP2.0/views/login/register.html",
	/*华方机器*/

	/*服务地登录*/
	applogin_url: "http://test.hofonehu.com/applogin/api",
	/*服务器服务*/
	 appserver_url: "http://test.hofonehu.com/appserver/api",

	//url: "http://114.55.64.234:8055/appbasis/",
	//url: "http://120.27.203.234:8055/appbasis/",
	//contentUrl: "http://127.0.0.1:8020/PackageABack/pages/contentManage/contentViewer.html"
	contentUrl: "http://120.27.203.234:8100/static/appbasis/pages/contentManage/contentViewer.html"
};
var weixinConfig = {
	APPID: "wxc41046bbb30d06ac",
	APPSECRET: "64dae8983cf9ccb5f082ae74981a4561"
};
var gridHeight = 500;
if(parent.document.getElementById('content-main')) {
	gridHeight = parent.document.getElementById('content-main').clientHeight - 40;
	var rows = $('.row.form-group');
	for(var i = 0; i < rows.length; i++) {
		gridHeight -= $(rows[i]).outerHeight(true);
	}
	gridHeight -= 90;
}
/*重写alert方法*/
function alert(message) {
	$("#alertDiv").remove();

	var html = '<div id="alertDiv" data-id="'+ new Date().getTime() +'" style="font-size:16px;width: 80%; padding: 5px;margin: auto;bottom: 100px;left: 0;right: 0;background-color: rgba(0,0,0,.7);position: fixed;text-align: center;color: #fff;font-weight: 400;border-radius: 8px; z-index:99999999999;">' +
		message +
		'</div>';
	$("body").append(html);
	var dataId = $("#alertDiv").data("id");
	var timer = setTimeout(function() {
		$("#alertDiv[data-id="+ dataId +"]").remove();
	}, 3000)
}

var globalData = {
	'svcType': {
		'1': '找护士',
		'2': '找医生',
		'3': '找服务',
		'6': '医护车'
	},
	'orderType': {
		'1': '上门服务',
		'2': '在线服务'
	},
	'serviceType': {
		'1': '在线',
		'2': '上门',
		'3': '皆可'
	},
	'sex': {
		'1': '男',
		'2': '女'
	},
	'goodsUnit': {
		'1': '台',
		'2': '本',
		'3': '个',
		'4': '架'
	},
	'drugUnit': {
		'1': '包',
		'2': '盒',
		'3': '瓶',
		'4': '袋'
	},
	'usage': {
		'1': '口服',
		'2': '外用',
		'3': '雾化吸入',
		'4': '鼻饲'
	},
	'frequentness': {
		'1': '一日一次',
		'2': '一日二次',
		'3': '一日三次'
	},
	'payModel': {
		'1': '钱包支付',
		'2': '现金支付'
	},
	'getStatus': {
		'0': '未领取',
		'1': '已领取',
		'2': '无库存'
	},
	'itemPriceType': {
		'1': '次',
		'2': '天',
		'3': '小时',
		'4': '周',
		'5': '月',
		'6': '季度',
		'7': '半年',
		'8': '年'
	},
	'inspectsItem': {
		'1': '血压',
		'2': '血糖',
		'3': '体温',
		'4': '心率'
	},
	'role': {
		"1": "受诊人",
		"2": "医生",
		"3": "护士"
	},
	'roleName': {
		"patient": "1",
		"doctor": "2",
		"nurse": "3"
	},
	'vocationalLevel': {
		"1": "执业医师",
		"2": "主治医师",
		"3": "副主任医师",
		"4": "主任医师",
		"11": "护士",
		"12": "护师",
		"13": "主管护师",
		"14": "副主任护师",
		"15": "主任护师"
	},
	'memberRole': {
		"3": "护士",
		"2": "医生",
		"5": "护工",
		"7": "药师",
		"8": "营养师",
		"6": "医护车"
	},
	'memberRoleName': {
		'nurse': '3', // 护士
		'doctor': '2', // 医生
		'attendants': '5', // 护工
		'apothecary': '7', // 药师
		'dietitian': '8' // 营养师
	},
	'diseaseTag': {
		'1': '常见病',
		'2': '慢性病',
		'3': '呼吸性疾病',
		'4': '神经性疾病',
		'5': '其他'
	},
	'status': {
		'0': '无效',
		'1': '有效'
	},
	/* siteType：站点类型（1：护理院，2：医护站，3：药店）*/
	'siteType': {
		'1': '护理院',
		'2': '医护站',
		'3': '药店'
	},
	'appClient': {
		'0': '所有端',
		'1': '医护端',
		'2': '患者端'
	},
	state: {
		"0": "已停用",
		"1": "使用中"
	},
	"item": {
		"0": "基本出诊费",
		"1": "服务项目费",
		"2": "药品费",
		"3": "机构服务分润"
	},
	bizType: {
		"1": "建议咨询",
		"2": "投诉维权",
		"3": "上门处理"
	}
};

$.extend({
	doAjaxPost: function(Method, prames, callback, packageA, errCall) {
		$.startLoading();
		$.ajax({
			url: $.getServerURL(Method, packageA),
			type: "post",
			data: "jsonReq=" + JSON.stringify(this.addParmes(prames, packageA)),
			timeout: 2000000,
			success: function(R) {
				var r = {};
				if(R.responseBean) {
					r = R.responseBean;
				} else {
					r = R;
				}
				console.log("----------------------请求失败分隔线开始--------------------------------");
				console.log("接口名:" + Method);
				console.log(prames);
				console.log(r);
				console.log("----------------------请求成功分隔线结束--------------------------------");
				$.stopLoading();
				if(typeof r == "object") {
					//1 表示超时
					if(r.data) {
						if(r.data.timeover == 1) {
							location.href = "login.html"
						} else {
							if(r.status == 1) {
								callback(r);
							} else {
								if(errCall) {
									errCall(r.errorMsg);
								} else {
									$.alert(r.errorMsg, 0);
								}
							}
						}
					} else {
						if(r.status == 1) {
							callback(r);
						} else {
							if(errCall) {
								errCall(r.errorMsg);
							} else {
								$.alert(r.errorMsg, 0);
							}
						}
					}

				} else {
					console.log('返回参数错误');
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$.stopLoading();
				if(errCall) {
					errCall(r.errorMsg);
				} else {
					alert("连接服务器错误，请重试");
				}
				console.log("----------------------请求失败分隔线开始--------------------------------");
				console.log("接口名:" + Method);
				console.log("prames" + prames);
				console.log("errorThrown" + errorThrown);
				console.log("XMLHttpRequest.status" + XMLHttpRequest.status);
				console.log("XMLHttpRequest.readyState" + XMLHttpRequest.readyState);
				console.log("textStatus" + textStatus);
				console.log("----------------------请求成功分隔线结束--------------------------------");
			}
		});
	},
	/*兼容调多个服务处理*/
	doAjaxPost2: function(Method, prames, callback, url) {
		if(url) {
			config.url = url;
		}
		$.startLoading();
		$.ajax({
			url: $.getServerURL(Method),
			type: "post",
			data: "jsonReq=" + JSON.stringify(this.addParmes(prames)),
			timeout: 2000000,
			success: function(R) {
				var r = {};
				if(R.responseBean) {
					r = R.responseBean;
				} else {
					r = R;
				}
				console.log("----------------------请求失败分隔线开始--------------------------------");
				console.log("接口名:" + Method);
				console.log(prames);
				console.log(r);
				console.log("----------------------请求成功分隔线结束--------------------------------");
				$.stopLoading();
				if(typeof r == "object") {
					//1 表示超时
					if(r.data) {
						if(r.data.timeover == 1) {
							location.href = "login.html"
						} else {
							if(r.status == 1) {
								callback(r);
							} else {
								if(errCall) {
									errCall(r.errorMsg);
								} else {
									$.alert(r.errorMsg, 0);
								}
							}
						}
					} else {
						if(r.status == 1) {
							callback(r);
						} else {
							if(errCall) {
								errCall(r.errorMsg);
							} else {
								$.alert(r.errorMsg, 0);
							}
						}
					}

				} else {
					console.log('返回参数错误');
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$.stopLoading();
				alert("连接服务器错误，请重试");
				console.log("----------------------请求失败分隔线开始--------------------------------");
				console.log("接口名:" + Method);
				console.log("prames" + prames);
				console.log("errorThrown" + errorThrown);
				console.log("XMLHttpRequest.status" + XMLHttpRequest.status);
				console.log("XMLHttpRequest.readyState" + XMLHttpRequest.readyState);
				console.log("textStatus" + textStatus);
				console.log("----------------------请求成功分隔线结束--------------------------------");
			}
		});
	},
	addParmes: function(prames) {
		prames.token = localStorage.getItem("token");
		return prames;
	},
	getServerURL: function(Method) { //获取服务端地址
		return config.appserver_url + Method + "?" + new Date().getTime();
	},
	startLoading: function() {},
	stopLoading: function() {},
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return decodeURI(r[2]);
		return null;
	},
	trim: function(s) {
		return s.replace(/^\s+|\s+$/g, "");
	},
	// 1 弹出普通信息  0 弹出错误提示信息
	alert: function(message, type) {
		if(type == 1) {
			alert(message);
		} else {
			alert("发生错误：" + message)
		}

	},
	setSelected: function(idName, className, colortype, callback) {
		$("#" + idName + " ." + className).on("click", function() {
			$("#" + idName + " ." + className).attr('class', 'vm ml15');
			$(this).attr('class', 'vm btn-sm btn-' + colortype + ' ml15 selected_flag');
			callback();
		})
	},
	getSelected: function(idName) {
		return $("#" + idName + " .selected_flag").text();
	},
	getSelectedValue: function(idName) {
		return $("#" + idName + " option:selected").val();
	},
	getSelectedText: function(idName) {
		return $("#" + idName + " option:selected").text();
	},
	//导出报表
	exportingTheReport: function(name) {
		$("table:first").append($("table:eq(1) tbody"));
		$("table:first").table2excel({
			exclude: ".noExl",
			name: name,
			filename: name + (new Date()).pattern("yyyy-MM-dd HH:mm:ss"),
			exclude_img: true,
			exclude_links: true,
			exclude_inputs: true
		});
		flush();
	},
	//添加序号字段
	addXid: function(data) {
		for(var i = 0, j = data.length; i < j; i++) {
			data[i].xid = i + 1;
		}
		return data;
	},
	//将下拉选项写入html
	setSelectHtml: function(id, dataList) {
		var html = '';
		for(var i = 0; i < dataList.length; i++) {
			html += ' <option value="' + dataList[i].id + '">' + dataList[i].name + '</option>'
		}
		$("#" + id).html(html);
	},
	setSelectHtmlBySelf: function(id, dataList, index, value) {
		var html = '';
		for(var i = 0; i < dataList.length; i++) {
			html += ' <option value="' + dataList[i][index] + '">' + dataList[i][value] + '</option>'
		}
		$("#" + id).html(html);
	},
	setDefaultCheckedValue: function(id, value) {
		$("#" + id + " input[value='" + value + "']").attr("checked", true);
	},
	setDefaultSelectValue: function(id, value) {
		$("#" + id + " option[value='" + value + "']").attr("selected", true);
	},
	timeToDate: function(time) {
		return new Date(time).pattern("yyyy-MM-dd HH:mm:ss");
	}

});

//自适应高度
function adaptHeight(id, constant) {
	return parseInt($(document).height()) - parseInt($("#" + id).height()) - constant;
}

//弹出框封装函数 prams：type title url prams callback
function alertPage(prams) {
	layer.config({
		extend: "extend/layer.ext.js"
	});
	var Url = prams.url + "?data=" + encodeURI(JSON.stringify(prams.prams));
	layer.open({
		type: prams.type,
		title: prams.title,
		shadeClose: false,
		shade: 0.4,
		area: prams.area,
		content: Url,
		end: prams.callback
	});
}
//弹出确认框 prams {title btn
/* layer.msg('删除成功',{icon:1});*/
//layer.msg('取消删除',{icon:2});

function alertConfirm(prams) {
	layer.confirm(prams.title, {
		btn: prams.btn
	}, prams.sureCallback, prams.notSureCallback)
}

//============================
// 查找id对应的数据
function getData(id, arrayData) {
	console.log(arrayData.length);
	if(id && arrayData) {
		for(var i = 0; i < arrayData.length; i++) {
			if(id == arrayData[i].id) {
				return arrayData[i];
			}
		}
	} else {
		console.log("没有传id 或者 数值对象");
		return null;
	}
}
// 查找id对应的数据
function getDataByindex(id, arrayData, attr) {
	if(id && arrayData && attr) {
		for(var i = 0; i < arrayData.length; i++) {
			if(id == arrayData[i][attr]) {
				return arrayData[i];
			}
		}
	} else {
		console.log("没有传id 或者 数值对象");
		return null;
	}
}
//根据dom对象获取id值
function getID(obj) {
	if(obj) {
		return $(obj).attr("id");
	} else {
		console.log("没有传dom对象");
		return null;
	}

}
//关闭弹出窗口的方法
function closeIframe(type) {
	if(type == 1) {
		$(".layui-layer-close").trigger('click');
		location.reload();
	} else {
		$(".layui-layer-close").trigger('click');
	}

}
//节点树处理
function getTreeData(data) {
	var treeData = {
		"core": {
			"data": []
		}
	};
	var temp = [];
	for(var i = 0; i < data.length; i++) {
		if(!setTreeData(treeData.core.data, data[i])) temp.push(data[i]);
	}
	for(var i = 0; i < temp.length; i++) {
		setTreeData(treeData.core.data, temp[i]);
	}
	return treeData;
}

//数据结构
/*  dataDepartment = [{
 id : 1000,
 name : "总经理办公室",
 parentid: ""
 },
 {
 id : 1001,
 name : "总经理办",
 parentid: 1000
 },
 {
 id : 1002,
 name : "总经理办",
 parentid: ''
 },
 ];*/

function setTreeData(data, customData) {
	if(customData.parentid == "") {
		data.push({
			"text": customData.name,
			"icon": "none",
			"id": customData.id
		});
		return true;
	}
	for(var i = 0; i < data.length; i++) {
		if(data[i].id == customData.parentid) {
			if(data[i].children == undefined || data[i].children == "") {
				data[i].state = {
					"opened": true
				};
				data[i].children = [{
					"text": customData.name,
					"icon": "none",
					"id": customData.id
				}];
			} else {
				data[i].children.push({
					"text": customData.name,
					"icon": "none",
					"id": customData.id
				});
			}
			return true;
		}
		if(data[i].children != undefined && data[i].children != "") {
			if(setTreeData(data[i].children, customData)) return true;
		}
	}
	return false;
}
// 更新jqgrid中的数据
function reloadGrid($doc, d) {
	$doc.jqGrid('clearGridData');
	$doc.jqGrid('setGridParam', {
		data: d
	}).trigger('reloadGrid');
}

//刷新方法
function flush() {
	location.reload();
}
//tyep == 1 本页面刷新
//type == 2 返回父页面 刷新
function doajaxsuccess(message, type) {
	if(type == 1) {
		layer.msg(message, {
			icon: 1
		});
		location.reload();
	} else {
		$.alert(message, 1);
		parent.closeIframe(1);
	}
}

// 服务类型转换
function convertSvcType(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.svcType[rowObject.svcType];
}

// 订单状态转换
function convertBizStatus(cellValue, options, rowObject) {
	switch(cellValue) {
		case '100100': // 已预约上门  （待处理订单-----待确认）
		case '300100': // 可接订单 -------服务订单
			return '待接单';
		case '100200': // 已确认上门   （待处理订单-----服务中）
		case '100101': // 已付上门费
		case '100201': // 准备用物      （待处理订单-----服务中）
		case '100205': // 医护-已发送病情摘要      （待处理订单-----服务中）
		case '100202': // 开始服务      （待处理订单-----服务中）
		case '100203': // 医护-已发送评估处理      （待处理订单-----服务中）
		case '100204': // 患者-已确认评估处理      （待处理订单-----服务中）
		case '100206': // 患者-已确认病情摘要      （待处理订单-----服务中）
		case '300200': // 在线咨询中       （待处理订单-----服务中）
			return '服务中';
		case '100300': // 医护-结束服务      （已完成订单-----未付款）
			return '未付款';
		case '200100': // 患者-已付款         （已完成订单-----未评价）
		case '200101': // 患者-已评价         （已完成订单-----已评价）
			return '已完成';
		case '800000': // 订单已取消        （已完成订单-----已取消）
			return '已取消';
		case '800001': // 订单已取消        （已完成订单-----已取消）
			return '已取消';
		case '800002': // 订单已取消        （已完成订单-----已取消）
			return '申请退款';
		case '800003': // 订单已取消        （已完成订单-----已取消）
			return '同意退款';
		case '800004': // 订单已取消        （已完成订单-----已取消）
			return '不予退款';
	}
	return '';
}

function getDateString(d, isEnd) {
	if(!d || d == '') {
		return d;
	} else {
		var dd = new Date(d);
		if(isEnd) {
			dd = dd.addDay(1);
		}
		return dd.pattern('yyyy-MM-dd HH:mm:ss', true);
	}
}

// 订单类型转换
function convertOrderType(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.orderType[cellValue];
}

// 时间转换
function convertTime(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return new Date(cellValue).pattern('yyyy-MM-dd HH:mm:ss');
}

// 性别转换
function convertSex(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.sex[cellValue];
}

// 年龄转换
function convertAge(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	var bornYear = new Date(cellValue).getFullYear();
	var curYear = new Date().getFullYear();
	return curYear - bornYear;
}

// 转换接单状态
function convertDemandStatus(cellValue, options, rowObject) {
	switch(cellValue) {
		case 0:
			return '未接单';
		case 1:
			return '已接单';
		case 2:
			return '系统锁定';
		case 3:
			return '已取消';
	}
	return '';
}

// 转换角色
function convertRole(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.role[cellValue];
}

// 转换职称
function convertVocLevel(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.vocationalLevel[cellValue];
}

// 转换服务类型
function convertServiceType(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.serviceType[cellValue];
}

// 转换计费方式
function convertitemPriceType(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.itemPriceType[cellValue];
}

//类别归属
function convertServiceRole(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.memberRole[cellValue];
}

// 疾病标签
function convertDiseaseTag(cellValue, options, rowObject) {
	if(!cellValue) {
		return '';
	}
	return globalData.diseaseTag[cellValue];
}

function convertStatus(cellValue, options, rowObject) {
	if(!cellValue) {
		return '无效';
	}
	return globalData.status[cellValue];
}

function nullToEmpty(data) {
	$.each(data, function(k, v) {
		if(!v) {
			data[k] = '';
		}
	});
	return data;
}

Date.prototype.pattern = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if(/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};
Date.prototype.addDay = function(day) {
	var n = this.getTime() + day * 24 * 60 * 60 * 1000;
	return new Date(n);
};
Date.prototype.getTimeStamp = function() {
	return parseInt(this.getTime() / 1000);
};
Date.prototype.timeStamp = function(sdate) {
	return new Date(parseInt(sdate) * 1000);
};
Date.prototype.getAge = function(bornYear) {
	var d = new Date();
	var y = d.getFullYear();
	var b = bornYear.substring(0, 4);
	return y - parseInt(b);
};

String.prototype.endsWith = function(searchString, position) {
	var subjectString = this.toString();
	if(typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
		position = subjectString.length;
	}
	position -= searchString.length;
	var lastIndex = subjectString.indexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position;
};

function reloadGridPaging($doc, d, count, pageNum, call) {
	var params = {
		localReader: {
			total: function(obj) {
				return parseInt(parseInt(count) / parseInt(pageNum)) + 1;
			},
			records: function(obj) {
				return parseInt(count);
			}
		}
	};
	if(!$doc.jqGrid('getGridParam', 'onPaging')) {
		params.onPaging = function(pgButton) {
			var paging = getPaging($doc, pgButton);
			call(paging.rowNum, paging.page);
		}
	}
	$doc.jqGrid('setGridParam', params).trigger("reloadGrid");
	$doc[0].addJSONData(d);
}
// 获取分页信息
function getPaging($doc, pgButton) {
	var paging = {};
	var page = $doc.jqGrid('getGridParam', 'page');
	var rowNum = $doc.jqGrid('getGridParam', 'rowNum');
	switch(pgButton) {
		case 'first':
			page = 1;
			break;
		case 'last':
			page = $doc.jqGrid('getGridParam', 'lastpage');;
			break;
		case 'next':
			page++;
			break;
		case 'prev':
			page--;
			break;
		default:
			var pager = $doc.jqGrid('getGridParam', 'pager');
			page = $(pager).find('.ui-pg-input').val();
			break;
	}
	paging.page = page;
	paging.rowNum = rowNum;
	return paging;
}

var query = function(formid, url, callback, paging) {
	var grid = $("#" + formid),
		self = this,
		page = 1,
		rowNum = 10,
		total,
		records,
		m_formid = formid,
		m_url = url,
		m_callback = callback,
		m_param;
	if(!callback) {
		callback = function(data) {
			if(data.status == 0) {
				alert("错误")
			} else {
				self.fullJQGird(data.data);
			}
		}
	}

	this.queryData = function(_parm, _url, _callback, _pages) {
		m_url = _url;
		m_param = _parm;
		m_callback = _callback;

		if(!_pages) {
			_pages = {};
			_pages.page = 1;
			_pages.rowNum = grid.jqGrid('getGridParam', 'rowNum');
		}
		if(!_parm) {
			_parm = {};
		}
		_parm.pageSize = 10;
		_parm.currentPage = _pages.page;
		if(!_callback) {
			_callback = callback;
		}
		if(!_url) {
			_url = url;
		}
		$.doAjaxPost(url, _parm, function(data) {
			_callback(data);
		})
	};

	this.fullJQGird = function(data) {
		total = Math.ceil(data.count / 10);
		records = data.count;

		grid.jqGrid('setGridParam', {
			localReader: {
				total: function(obj) {
					return total;
				},
				records: function(obj) {
					return records;
				}
			}
		}).trigger("reloadGrid");
		grid[0].addJSONData(data.resultList);
	};

	this.getPages = function() {
		return {
			"total": total,
			"records": records
		}
	};

	this.paging = function(pgButton) {
		var page = grid.jqGrid('getGridParam', 'page');
		var rowNum = grid.jqGrid('getGridParam', 'rowNum');
		switch(pgButton) {
			case 'first':
				page = 1;
				break;
			case 'last':
				page = total;
				break;
			case 'next':
				page++;
				break;
			case 'prev':
				page--;
				break;
			case 'records':
				page = 1;
				break;
		}
		console.log(page);
		this.queryData(m_url, m_param, m_callback, {
			"page": page,
			"rowNum": rowNum
		});
	}

};

function removeEmpty(param) {
	$.each(param, function(k, v) {
		if(v == null || v == '') {
			//	param[k] = undefined;
			delete param[k];
		}
	});
}
//
//========================
/*
 function test(){
 data={
 "ident":"f_get_article",
 "procname":"f_get_article",
 "params":[4,0,0,'']
 };
 function callback(data,locat){
 console.log(locat);
 console.log(data)
 }
 var url ="?data=+"+JSON.stringify(data);
 $.doAjaxget(url,callback,'aaaa')
 }
 test();*/

function calculateScore(score, images, sum) {
	var integer = Math.floor(score); // 向下取整
	var decimals = score % integer;
	var count = 0;
	for(var i = 0; i < integer; i++) {
		images.find("img").eq(count).attr("src", "../../images/star.png");
		count++;
	}
	if(decimals != undefined && (decimals > 0 && decimals <= 0.5)) { //半颗星
		images.find("img").eq(count).attr("src", "../../images/bigStar.png");
		count++;
	} else if(decimals != undefined && (decimals > 0.5 && decimals <= 0.9)) {
		images.find("img").eq(count).attr("src", "../../images/star.png");
		count++;
	}
	var residue = Math.floor(sum - score); //向下取整
	for(var i = 0; i < residue; i++) {
		images.find("img").eq(count).attr("src", "../../images/star2.png");
		count++;
	}
}

//时间戳解析
function add0(m) {
	return m < 10 ? '0' + m : m
}

function dateFormat(e) {
	//时间戳是整数，否则要parseInt转换
	var time = new Date(e);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '年' + add0(m) + '月' + add0(d) + '日 ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
function dateFormat1(e) {
	//时间戳是整数，否则要parseInt转换
	var time = new Date(e);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d);
}
//解析url参数数据

function GetQueryStr(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	//获取url中"?"符后的字符串并正则匹配
	var r = window.location.search.substr(1).match(reg);
	var context = "";
	if(r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? "" : context;
}

//token丢失跳到登录
function tokenLose(status) {
	if(status == 2) {
		var str = '';
		str += '<div style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:1030;">'
		str += '<div style="font-size:16px;width: 80%; padding: 5px;margin: auto;bottom: 100px;left: 0;right: 0;background-color: rgba(0,0,0,.7);position: fixed;text-align: center;color: #fff;font-weight: 400;border-radius: 8px; z-index:99999999999;">';
		str += '	<div style="font-size:16px; color:#fff;">登录过期，<span class="tokenCount">3</span>秒后跳转至登录页</div>';
		str += '</div>';
		str += '</div>';
		$("body").append(str);
		var count = 3;
		var timer = setInterval(function(){
			count--;
			if(count <= 0) {
				count = 0;
				clearInterval(timer);
			}
			$(".tokenCount").text(count);
			if(count <= 0) {
				window.location.href = "../login/login.html";
			}
		},1000)

	}
};

// 是否删除弹窗
function isDelete(callback) {
	var str = '';
	str += '<div id="isDelete" style="display: none;position: fixed;top: 0;left:0;right:0;bottom:0;z-index: 1030;background: rgba(0,0,0,0.5);">';
	str += '    <div id="dialMain" style="position: fixed;z-index:1040;top: 30%;left: 20%;width: 60%;border-radius: 1rem;text-align: center;background-color: #FFFFFF;">';
	str += '        <div id="dialMain-first">';
	str += '            <h4 style="color: #000;font-size: 1.4rem;text-align: center;margin: 1rem 0 .5rem 0;">是否删除</h4>';
	// str += '            <p style="color: #999;font-size: 1.2rem;text-align: center;margin-bottom: 1rem;">您确认要拨打400-900-1515吗？</p>';
	str += '        </div>';
	str += '        <div id="dialMain-second" style="border-top: 1px solid #f2f2f2;">';
	str += '            <div id="dialMain-close" class="dialMain-address" style="float: left;width: 50%;color: #ec9c00;">';
	str += '                <a href="javascript:;" style="border-right:1px solid #f2f2f2;font-size: 1.3rem;padding: .5rem 0;display: block;">取消</a>';
	str += '            </div>';
	str += '            <div id="dialMain-sure" class="dialMain-address" style="float: left;width: 50%;color: #ec9c00;">';
	str += '                <a href="javascript:;" style="font-size: 1.3rem;padding: .5rem 0;display: block;" style="font-size: 1.3rem;padding: .5rem 0;display: block;">确认</a>';
	str += '            </div>';
	str += '            ';
	str += '        </div>';
	str += '    </div>';
	str += '</div>';
	$("body").append(str)
	// $(clickSHow).on("click", function() {
	$("#isDelete").show();
	// });
	$("#dialMain-close").on("click", function() {
		$("#isDelete").hide();
	});
	$("#dialMain-sure").on("click", function() {
		callback();
		$("#isDelete").hide();
	})
	$(".dialMain-address").on("click", function() {
		location.reload();
	})
};

//倒计时跳转
function countDown(picUrl, tip, callback) {
		var str = '';
		str += '<div id="returnMain" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:1030;">';
		str += '	<div id="returnMain-first" style="padding:1rem 0;border-radius:10px;width:20rem;background:#fff;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">';
		str += '		<img src="'+ (picUrl ? picUrl : '../../images/dialog-tick.png') +'" alt="" style="width:10rem;height:10rem;vertical-align:middle;">';
		str += '		<h6 class="success" style="color:#1dcc92;font-size:1.5rem;margin:.3rem 0;">'+ tip +'</h6>';
		str += '		<p style="font-size:1.2rem;color:#9A9A9A;"><span>2</span>秒后关闭</p>';
		str += '	</div>';
		str += '</div>';
		$("body").append(str);
    var s = $("#returnMain-first > p > span");
    var count = 2;
    clearInterval(timer)
    var timer = setInterval(function () {
        count--;
        if (count <= 0) {
            count = 0;
          	callback();
        };
        s.text(count)
    }, 1000)
};

//ajax加载动画
var ajaxLoading = {
	show: function() {
		var str = '';
		str += '<div id="ajaxLoading" style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(255,255,255,0.2); z-index:1030;">';
		str += '	<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1040;"><img style="width:4rem; height:4rem;" src="../../images/loading.gif"/></div>';
		str += '</div>';
		$("body").append(str)
	},
	hide: function() {
		$("#ajaxLoading").remove();
	}
};

//返回上一页
function historyBack() {
	// function isHasElementOne(arr,value){
		// for(var i = arr.length-1; i >= 0; i--){
			// if(arr[i] == value){
				// return i;
			// }
		// }
	// }
	var curPage = ".." + location.href.slice(location.href.indexOf("views")+"views".length);
	var historyArr = sessionStorage.getItem("historyArr");
	historyArr = historyArr.slice(0, historyArr.lastIndexOf(curPage)+curPage.length);

	historyArr = historyArr.split(",");
	// if(curPage == historyArr[isHasElementOne(historyArr,curPage)]) {
	if(curPage == historyArr[historyArr.length-1]) {
		historyArr.pop();
		sessionStorage.setItem("historyArr", historyArr)
		// location.href = historyArr[isHasElementOne(historyArr,curPage)-1];
		location.href = historyArr[historyArr.length-1];
	} else {
		location.href = "../main/index.html";
	};
};

//进入下一页
function historyForward(nextPage) {
	var curPage = ".." + location.href.slice(location.href.indexOf("views")+"views".length);

	if(sessionStorage.getItem("historyArr")) {
		var historyArr = sessionStorage.getItem("historyArr").split(",");
		if(nextPage !== historyArr[historyArr.length-1]) {
			if(historyArr.length >= 50) {
				historyArr.shift();
			}
			historyArr.push(nextPage);
			sessionStorage.setItem("historyArr", historyArr);
		}
	} else {
		var historyArr = [curPage];
		if(nextPage !== historyArr[historyArr.length-1]) {
			historyArr.push(nextPage);
		};

		sessionStorage.setItem("historyArr", historyArr);
	}
	location.href = nextPage;
};

//默认变量
var defaultVar = {
	onerrorImg: '../../images/defaultHeader.png', //默认头像
}
