
var articleId = GetQueryString("id");
var ue = null;
function editor() {
	ue = UE.getEditor('editor',{
		toolbars: [
			[
				// 'anchor', //锚点
				'undo', //撤销
				'redo', //重做
				'bold', //加粗
				'indent', //首行缩进
				// 'snapscreen', //截图
				'italic', //斜体
				'underline', //下划线
				'strikethrough', //删除线
				// 'subscript', //下标
				// 'fontborder', //字符边框
				// 'superscript', //上标
				// 'formatmatch', //格式刷
				// 'source', //源代码
				// 'blockquote', //引用
				// 'pasteplain', //纯文本粘贴模式
				// 'selectall', //全选
				// 'print', //打印
				// 'horizontal', //分隔线
				// 'removeformat', //清除格式
				// 'time', //时间
				// 'date', //日期
				// 'unlink', //取消链接
				'insertrow', //前插入行
				'insertcol', //前插入列
				'mergeright', //右合并单元格
				'mergedown', //下合并单元格
				'deleterow', //删除行
				'deletecol', //删除列
				'splittorows', //拆分成行
				'splittocols', //拆分成列
				'splittocells', //完全拆分单元格
				'deletecaption', //删除表格标题
				'inserttitle', //插入标题
				'mergecells', //合并多个单元格
				'deletetable', //删除表格
				// 'cleardoc', //清空文档
				'insertparagraphbeforetable', //"表格前插入行"
				// 'insertcode', //代码语言
				'fontfamily', //字体
				'fontsize', //字号
				'paragraph', //段落格式
				// 'simpleupload', //单图上传
				// 'insertimage', //多图上传
				'edittable', //表格属性
				'edittd', //单元格属性
				'inserttable', //插入表格
				// 'link', //超链接
				// 'emotion', //表情
				// 'spechars', //特殊字符
				'searchreplace', //查询替换
				// 'map', //Baidu地图
				// 'gmap', //Google地图
				// 'insertvideo', //视频
				// 'help', //帮助
				'justifyleft', //居左对齐
				'justifyright', //居右对齐
				'justifycenter', //居中对齐
				'justifyjustify', //两端对齐
				'forecolor', //字体颜色
				'backcolor', //背景色
				'insertorderedlist', //有序列表
				'insertunorderedlist', //无序列表
				'fullscreen', //全屏
				'directionalityltr', //从左向右输入
				'directionalityrtl', //从右向左输入
				'rowspacingtop', //段前距
				'rowspacingbottom', //段后距
				// 'pagebreak', //分页
				// 'insertframe', //插入Iframe
				'imagenone', //默认
				'imageleft', //左浮动
				'imageright', //右浮动
				// 'attachment', //附件
				'imagecenter', //居中
				// 'wordimage', //图片转存
				'lineheight', //行间距
				'edittip ', //编辑提示
				'customstyle', //自定义标题
				'autotypeset', //自动排版
				// 'webapp', //百度应用
				'touppercase', //字母大写
				'tolowercase', //字母小写
				// 'background', //背景
				// 'template', //模板
				// 'scrawl', //涂鸦
				// 'music', //音乐
				// 'drafts', // 从草稿箱加载
				// 'charts', // 图表
				'preview', //预览
			]
		],
		autoHeight: true
	});

}
//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
function getContent() {
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());

    return arr.join("\n");
}


//修改时初始化渲染页面
if (articleId) {
	$.ajax({
		type : 'POST',
		url : '/xlhaBeta/threeService/getInfoById.do',
		data : {
			id : articleId
		},
		dataType : 'json',
		success : function(response) {

			ajaxLoading.hide();
			// 修改时填充数据
			$("#select").val(response.type);
			$("#msgHeader").val(response.title);
			// $("#edui1_iframeholder").val(response.content);

			editor();
			UE.getEditor('editor').ready(function() {
			    //this是当前创建的编辑器实例
			    this.setContent(response.content)
			})
		},
		error : function() {
			ajaxLoading.hide();
			alert("服务繁忙，请稍后再试")
		},
		beforeSend : function() {
			ajaxLoading.show();
		},
		completed : function() {
			ajaxLoading.hide();
		}
	})
} else {
	editor();
}


// 表单验证
$("#subBtn").on("click", function() {

	var select = $("#select");
	var msgHeader = $("#msgHeader");
	var content = getContent();

	if(select.val() == '') {
		select.focus().testRemind("请选择发布类型");
		$("html,body").scrollTop(select.offset().top - 120)
		return;
	}

	if(msgHeader.val() == '') {
		msgHeader.focus().testRemind("请输入标题");
		$("html,body").scrollTop(msgHeader.offset().top - 120)
		return;
	}

	if(content == '') {
		$("#edui1_iframeholder").focus().testRemind("请输入标题");
		$("html,body").scrollTop($("#edui1_iframeholder").offset().top)
		return;
	}



	$.post("/xlhaBeta/threeService/addThreeService.do", {
		cThreeserviceType : select.val(),
		cThreeserviceTitle : msgHeader.val(),
		cThreeserviceContent : content,
		cThreeserviceId : articleId
	}, function(data) {
		alert(data.msg);
		window.location.href="../threeServicePublicList.html"
	});

});