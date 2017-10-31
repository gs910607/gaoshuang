
//获取token
function getToken() {
    var myToekn = JSON.parse(localStorage.getItem("user"));  // token userId
    myToekn.longitude = sessionStorage.getItem("longitude");
    myToekn.latitude=sessionStorage.getItem("latitude");
    return myToekn;

}



$(document).ready($("#myClinicClinicIndex").on("click", function(){   
    
   myfun();
	
}
));

//$("#myClinicClinicIndex").on("click",function(){
//	myfun();
//})
function myfun(){
	var toekn = getToken();

    var param ={
        userid:toekn.userId,
	  	token:toekn.token
	  }


     $.ajax({
    	type:"get",
    	data: param,
    	url:config.appserver_url + "/hosPa/queryUserFocusHospitalNumber.json ",
    	dataType: "json",
    	async:false,
    	success: function(data){
            tokenLose(data.status)
            console.log(data)
			  if(data.data==0){
				  window.location.href="../myClinic/clinicSwitchNothing.html";
			  }else{
				   window.location.href="../myClinic/clinicIndex2.html?";
			  }
		   }
	 });
}


function gotoIndex(){
   window.location.href="../main/index.html";
}