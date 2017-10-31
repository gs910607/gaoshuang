var userId = GetQueryStr("userId");
init();

function init() {
  $.ajax({
    type: 'GET',
    url: config.appserver_url + '/doctor/doctorTwoBarCodes/getHospitalInfo.json',
    data: {
      userId: userId
    },
    dataType: 'json',
    contentType: 'application/json',
    success: function(response) {
      console.log(response);
      var obj = response.data;
      if(obj) {
        $(".header_pic > img").attr("src", obj.picURL);
        $(".hospital_tit").text(obj.hospitalName);
        $(".grade_orange").width(obj.score * $(".grade_gray").width()/5);
        $(".star_text").text(obj.score + "分");
        $(".hospital_address").text(obj.address);
        $(".piccode_pic > img").attr("src", obj.hospatilQrCode);
      }
    }
  })
}
