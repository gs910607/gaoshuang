$(".contNav li > a").on("click", function() {
	$(this).parent().addClass("active").siblings("li").removeClass("active");
});