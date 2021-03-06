$(document).ready(function(){
	$(function(){
		$.ajax({
			type:"post",
			url:"/Exam-12647-20170106-1/operation/getFilmLanguage.json",
			success:function(datas){
				$.each(datas.list,function(index,data){
					$("#select").append("<option  value="+data.name+">"+data.name+"</option>");
				});
			}
		});
	});
	
	saveAddFilm();
	
	function saveAddFilm(){
	$("#saveButton").on("click",function(e){
		e.preventDefault(); 
		var data = {"title":$("#title").val(),"name":$("#select").val(),"description":$("#description").val()};
		$.ajax({
			type:"post",
			url:"/Exam-12647-20170106-1/operation/add.json",
			data:data,
			success:function(datas){
				alert(datas.msg);
			},
			error:function(){
				alert("添加数据失败");
			}
		});
	});
	}
});