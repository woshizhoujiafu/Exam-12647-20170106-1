$(document).ready(function(){
	$(".hov").on("click",function(e){
		e.preventDefault();
		var classshow = $(this).children("a").attr("href");
		$(".show").removeClass("show");
		$(".active").removeClass("active");
		$(this).addClass("active");
		$(classshow).addClass("show");
		
	});
});
