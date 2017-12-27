$(function(){
	var info = JSON.parse(localStorage.getItem("info"));
	if (info.usergroupid.toString().length >3) {
		$(".contentWrap .container .content .navList .insertDate").remove();
	}
})