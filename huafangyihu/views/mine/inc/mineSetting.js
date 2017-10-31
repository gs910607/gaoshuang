$(".exit_login_button").on("click",function(){
	localStorage.removeItem("user");
	window.location.href="../login/login.html"
})
