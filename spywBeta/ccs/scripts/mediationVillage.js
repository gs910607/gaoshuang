var mediationVillage = function(){
	
	var tabledatas ;
	var uploadid ;
	//初始化事件
	var _init = function(){
		//区域三级联动
		new selectArea('#area',{
			isSelect: true
		});
		
		$("#uploadModal").modal({
			keyboard: false,
			backdrop : "static",
			show :false
		})
		$("#infoModal").modal({
			keyboard: false,
			backdrop : "static",
			show :false
		})
		
		tableinit();
		
		//详细信息展示后
		$('#infoModal').on('shown.bs.modal', function () {
			//上传事件
			$("#infoUpload").click(function(){
				$("#uploadModal").modal("show");
			});
			upload();
		})
		
	};
	
	//表格初始化
	var tableinit = function(){
		var params = {} ;
		$.post("/spywBeta/mediate/getProtocol.do" , params ,function(data){
			if(data.list.length > 0){
				tabledata(data.list);
				tabledatas = data.list ;
				Page({
					num : data.num, //页码数
					startnum : 1, //指定页码
					elem : $('#page2'), //指定的元素
					callback : function(n) { //回调函数
						$.post("/spywBeta/mediate/getProtocol.do",{pages:n}, function(data) {
							if(data.list.length > 0){
								tabledata(data.list);
								tabledatas = data.list ;
							}
						});
					}
				});
			}
		})
		
	}
	
	//渲染table
	var tabledata = function(data){
		var tablehtml = "" ;
		if(data.length > 0){
			for(i = 0 ; data.length > i ; i++){
				tablehtml += "<tr>" ;
				tablehtml += "<td>" + data[i].name + "</td>";
				var cellPhone = ""; 
				if(data[i].cellPhone){
					cellPhone = data[i].cellPhone
				}
				tablehtml += "<td>"  + cellPhone + "</td>";
				tablehtml += "<td>"  + data[i].tellPhone + "</td>";
				var codearea = areacodetoname(data[i].mediationAddress)||"";
				
				tablehtml += "<td>"  + codearea + "</td>";
				tablehtml += "<td>"  + data[i].address + "</td>";
				tablehtml += "<td>"  + data[i].unit + "</td>";
				if(data[i].personType && data[i].personType == 1){
					var personTypedata = "被调解人";
				}else if(data[i].personType && data[i].personType == 2){
					var personTypedata = "调解人";
				}else{
					var personTypedata = "";
				}
				tablehtml += "<td>"  + personTypedata + "</td>";
				tablehtml += "<td><img src='../../images/modification.png'  onclick = 'mediationVillage.modalinfo("+i +")'></td>";
				tablehtml += "</tr>" ;
			}
			$("#content").html(tablehtml);
			
		}
	}
	//弹窗
	var _modalinfo = function(i){
		infoinitdata(tabledatas[i])
		$("#infoModal").modal("show");
	}
	
	var upload = function(){
		$("#textupload").unbind();
		$("#chooseBtn").unbind();
		$("#upExcel").unbind();
		$("#uploadBtn").unbind();
		//上传窗口的显示
		$("#textupload").click(function(){
			$("#uploadModal").modal("show");
		});
		//调用上传文件窗口
		$("#chooseBtn").click(function(){
			$("#upExcel").click();
		});
		//调用上传文件窗口 把文件名称显示
		$("#upExcel").on("change", function() {
		    var filepath=$(this).val();
		    $("#choose").val(filepath)
		});
		//上传文件
		$("#uploadBtn").click(function(){
			$("#id").val(uploadid);
			ajaxLoading.show();
			$("#upForm").ajaxSubmit({
		        url : '/spywBeta/mediate/importAfterProtocol.do',
		        type : 'post',
		        success:function(data){
		            ajaxLoading.hide();
		            if(data.status == 1){
		                alert("上传成功");
		                $("#uploadModal").modal("hide");
		            } else {
		                alert("上传失败")
		            }
		        },
		        error:function (data) {
		            ajaxLoading.hide();
		            alert("服务繁忙，请稍后再试")
		        }
		    });
		});
	}
	
	//根据code获取区域
	var areacodetoname = function(code){
		for(var i=0;i<areaList.length;i++) {
			var objArea9 = areaList[i];
			for(var j in objArea9) {
				if(j == code) {
					return JSON.stringify(objArea9).split(":\"")[1].split("\"}")[0]
				}
			}
		};
	}
	
	//弹框展示数据
	var infoinitdata = function(data){
		//上传id
		uploadid = data.id ;
		//下载链接
		data.beforeUrl ? $("#infoDownload").show().attr({"href":data.beforeUrl}) : '';
		$("#name").val(data.name);
		$("#cellPhone").val(data.cellPhone);
		$("#tellPhone").val(data.tellPhone);
		$("#unit").val(data.unit);
		$("#address").val(data.address);
		$("#idEntityType").val(data.identityType);
		$("#idEntity").val(data.identity);
		$("#personType").val(data.personType);
		var areacode = data.mediationAddress ;
		if(areacode != 1){
			$("#district").val(areacode.substr(0,3));
			if(areacode.length >= 6) {
				for(var i=0;i<areaList.length;i++) {
					var objArea6 = areaList[i];
					for(var j in objArea6) {
						var codeArr6 = j.toString();
						if(codeArr6.length == 6 && codeArr6.slice(0,3) == areacode.slice(0,3)) {
							var disStr6 = '';
							disStr6 = '<option value="'+ j +'">'+ objArea6[j] +'</option>';
							$("#county").append(disStr6);
						}
					}
				};
				setTimeout(function() {
					$("#county").val(areacode.slice(0,6) ? areacode.slice(0,6) : '');
				},0)
			}

			if(areacode.length == 9) {
				for(var i=0;i<areaList.length;i++) {
					var objArea9 = areaList[i];
					for(var j in objArea9) {
						var codeArr9 = j.toString();
						if(codeArr9.length == 9 && codeArr9.slice(0,6) == areacode.slice(0,6)) {
							var disStr = '';
							disStr = '<option value="'+ j +'">'+ objArea9[j] +'</option>';
							$("#village").append(disStr);
						}
					}
				};
				setTimeout(function() {
					$("#village").val(areacode.slice(0,9) ? areacode.slice(0,9) : '');
				},0)
			}
		}
		
		
		
		/*$("#infoFix").click(function(){
			var data = {};
			data.name = $("#name").val();
			data.cellPhone = $("#cellPhone").val();
			data.tellPhone = $("#tellPhone").val();
			data.address = $("#address").val();
			data.idEntityType = $("#idEntityType").val();
			data.idEntity = $("#idEntity").val();
			data.personType = $("#personType").val();
			if($("#village").val() !=null && $("#village").val() != ""){
				data.area = $("#village").val() ;
			}else{
				if($("#county").val() !=null && $("#county").val() != ""){
					data.area = $("#county").val() ;
				}else{
					if($("#district").val() !=null && $("#district").val() != ""){
						data.area = $("#district").val() ;
					}else{
						data.area = null ;
					}
				}
			}
		});*/
	}
	
	return {
		
		init : function(){
			_init();
		},
	
		modalinfo:function(index){
			_modalinfo(index)
		}
	}
}();
	
	
$(function(){
	mediationVillage.init();
})