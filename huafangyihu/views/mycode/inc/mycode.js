var doctorId;


//解析url上的医护ID参数
doctorId = GetQueryStr("doctorId");
//doctorId = '6182dc56c4734c819f897b3e6049e892';
var pramas = {
	doctorId: doctorId
}
$.ajax({
	url: config.appserver_url + '/doctor/doctorTwoBarCodes/getDoctorInfo.json',
	data: "GET",
	dataType: "JSON",
	data: pramas,
	contentType: 'application/json',
	success: function(data) {
         console.log(data)
         $(".doctor_name").text(data.data.name);
         $(".doctor_post").text(data.data.position);
         $(".doctor_division").text(data.data.departmentType);
         $(".doctor_address").text(data.data.hospitalName);
         $(".doctor_head").attr("src",data.data.headPictureURL);
         $(".my_code").attr("src",data.data.twoBarCodesURL);
	},
	error: function() {
		alert("服务繁忙，请稍后再试！");
	}
});