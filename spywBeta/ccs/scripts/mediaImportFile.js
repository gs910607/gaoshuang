
$("#chooseBtn,#choose").on("click", function() {
	$("#upExcel").click();
});


$("#downTemplate").on("click",function(){
	location.href = '../../mediate/exportModel.do';
});
// 表单验证
$("#upBtn").on("click",function() {
    var flag = validExcel("#upExcel");
    if(flag == false) {
        return;
    }
    $("#result").html("");
    $("#upForm").ajaxSubmit({
        url : '../../mediate/import.do',
        type : 'post',
        beforeSubmit:function (data) {
            ajaxLoading.show();
        },
        success:function(data){
            data = JSON.parse(data);
            ajaxLoading.hide();
            if(data.status>0){
                alert("上传成功");
                $("#upForm").resetForm();

                setTimeout(function() {
                    location.href = 'viewMediation.html?type=search'
                },500);

            } else {
            	alert("上传失败");
                if(data.info){
                	var strresult = "";
                	for(i = 0 ;data.info.length > i ;i++ ){
                		strresult += "<p style =" + "\"color:red\""+ ">"+ data.info[i] + "</p>"
                	}
                	$("#result").append(strresult);
                }
                $("#upForm").resetForm();
            }
        },
        error:function (data) {
            ajaxLoading.hide();
            alert("服务繁忙，请稍后再试")
        }
    });
})

$("#upExcel").on("change", function() {
	validExcel(this);
    var filepath=$(this).val();
    $("#choose").val(filepath)
});
function validExcel(_this) {
	var flag = true;
	var filepath=$(_this).val();
	if(!filepath) {
		$("#choose").testRemind("请选择文件");
		flag = false;
	} else {
		var extStart=filepath.lastIndexOf(".");
		var ext=filepath.substring(extStart,filepath.length).toUpperCase();
		if(ext!=".XLS"&&ext!=".XLSX"){
			$("#choose").testRemind("文件限于xls,xlsx格式");
			flag = false;
			return false;
		}else{
			$(_this).text(ext)
		}
	}
	return flag;
} 