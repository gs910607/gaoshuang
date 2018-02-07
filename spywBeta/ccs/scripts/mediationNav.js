var info = JSON.parse(localStorage.getItem("info"));
	if (info.usergroupid.toString().length >3) {
		$("#auth").find($("#export")).remove();
		$("#auth").find($("#import")).remove();
		$("#auth").find($("#chart")).remove();
	}
