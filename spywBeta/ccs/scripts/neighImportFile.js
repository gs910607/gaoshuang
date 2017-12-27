
$("#chooseBtn,#choose").on("click", function() {
	$("#upExcel").click();
});

// 表单验证
$("#upBtn").on("click",function() {
    
    var flag = validExcel("#upExcel");
    if(flag == false) {
        return;
    }
    
    var select = $("#select").val();

    $("#upForm").ajaxSubmit({
        url : '/spywBeta/videoNeighborhood/videoNeighborhoodReadExcel.do',
        type : 'post',
        beforeSubmit:function (data) {

            ajaxLoading.show();
        },
        success:function(data){

            ajaxLoading.hide();
            data = JSON.parse(data);
            if(data.status==0){
                alert("上传成功")
                setTimeout(function(){
                    location.href="viewNeighborhood.html";
                },500);

                $("#upForm").resetForm();
            } else {
                alert(data.success);
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
$("#downTemplate").click(function(){
	location.href="/spywBeta/videoNeighborhood/videoNeighborhoodexport.do?videoneihdTypeExport=2";
});