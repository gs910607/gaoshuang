// 全局js
var config = {
	sizePage: 10
};

$("header > .pull-left > a").focus();

//获取url参数
function GetQueryString(name) {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

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

// 是否删除弹窗
function isDelete(message, callback) {
	var str = '';
	str += '<div id="isDelete" style="display: none;position: fixed;top: 0;left:0;right:0;bottom:0;z-index: 1030;background: rgba(0,0,0,0.5);">';
	str += '    <div id="dialMain" style="position: fixed;z-index:9999;top: 30%;left: 50%;margin-left:-150px;width: 300px;border-radius: 10px;text-align: center;background-color: #FFFFFF;">';
	str += '        <div id="dialMain-first">';
	str += '            <h4 style="color: #000;font-size: 16px;text-align: center;margin: 20px 0 20px 0;">'+ message +'</h4>';
	// str += '            <p style="color: #999;font-size: 1.2rem;text-align: center;margin-bottom: 1rem;">您确认要拨打400-900-1515吗？</p>';
	str += '        </div>';
	str += '        <div id="dialMain-second" style="border-top: 1px solid #f2f2f2;">';
	str += '            <div id="dialMain-close" class="dialMain-address" style="float: left;width: 50%;color: #ec9c00;">';
	str += '                <a href="javascript:;" style="border-right:1px solid #f2f2f2;font-size: 14px;padding: 10px 0;display: block;">取消</a>';
	str += '            </div>';
	str += '            <div id="dialMain-sure" class="dialMain-address" style="float: left;width: 50%;color: #ec9c00;">';
	str += '                <a href="javascript:;" style="font-size: 14px;padding: 10px 0;display: block;" style="font-size: 14pxm;padding: 10px 0;display: block;">确认</a>';
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
		$("#isDelete").hide();
		callback();
	})
};
// demo
// $(".btnWrap").on("click", function() {
// 	isDelete("是否删除",function() {
// 		alert(123123)
// 	})
// })

// 时间转换
Date.prototype.format = function(format) {
    var date = {
       "M+": this.getMonth() + 1,
       "d+": this.getDate(),
       "h+": this.getHours(),
       "m+": this.getMinutes(),
       "s+": this.getSeconds(),
       "q+": Math.floor((this.getMonth() + 3) / 3),
       "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
       format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
       if (new RegExp("(" + k + ")").test(format)) {
           format = format.replace(RegExp.$1, RegExp.$1.length == 1
              ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
       }
    }
    return format;
}

// ajax加载中
ajaxLoading = {
	show: function() {
		var loadingStr = '';
		loadingStr += '<div id="loading" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:rgba(255,255,255,0.3);">';
		loadingStr += '	<div style="position:absolute;top:50%;margin-top:-50px;width:100%;height:100px;line-height:100px;text-align:center;">';
		loadingStr += '		<img height="100%" src="../../images/loading.gif" alt="" >';
		loadingStr += '	</div>';
		loadingStr += '</div>';
		$("body").append(loadingStr)
	},
	hide: function() {
		$("#loading").remove();
	}
}
