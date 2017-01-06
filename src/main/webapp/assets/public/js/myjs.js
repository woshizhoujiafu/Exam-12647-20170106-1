$(document).ready(function(){

	$("#checkFirstPage").on("click",function(){
		var valp = $("#checkPage").val();
		if(valp==1){
			alert("当前已是第一页");
		}
	});	
	
	$("#checkLastPage").on("click",function(){
		var valp = $("#checkPage").val();
		var valpn = $("#checkPageNum").val();
		if(valp==valpn){
			alert("当前已是最后一页");
		}
	});
	
	
	$(".dele").on("click",function(){
		var this1 = $(this);
		var data = {"filmId":$(this).parent().siblings(".td1").text()};
		$.ajax({
			type:"POST",
			url:"/Exam-12647-20170106-1/operation/dele.json",
			data:data,
			success:function(data){
				if(data.msg=="success"){
					this1.parents(".tr1").hide();
				}else{
					alert("数据删除失败");
			}
			},
			error:function(data){
				alert("数据删除失败");
		    }
		});
	});
	
	$("#queryData").on("keyup",function(){
		var data ={"queryData":$(this).val(),"pageCurrent":1};
		var querydata = $(this).val();
		$.ajax({
			type:"post",
			url:"/Exam-12647-20170106-1/operation/query.json",
			data:data,
			success:function(datas){		
				var list = datas.page.list;
				$("#tab").html("<tr class=tr1><th class=td1>filmId</th><th>title</th><th>description</th></th><th>description</th>languageName<th>修改</th><th>删除</th></tr>");
				$.each(list,function(index,data){
					$("#tab").append("<tr class=tr1><td class=td1>"+data.filmId+"</td><td class=td3>"+data.title+"</td><td class=td2>"+data.description+"</td><td class=td4>"+data.name+"</td><td><a href=/Exam-12647-20170106-1/operation/jumpModify?filmId="+data.filmId+"&pageCurrent="+datas.page.pageCurrent+"&queryData="+querydata+">修改</a></td><td><a href=# class=dele onclick=\"if(confirm('确定删除testId为"+data.filmId+"的这条记录吗')) return true;else return false;\">删除</a></td></tr>");
			})		

			$("#tab tr .td2").css("width","300px");
			$("#tab tr .td3").css("width","200px");
			$("#tab tr .td4").css("width","150px");
			$("#tab tr .td1").css("width","60px");
			
			$("#change").html("<p><a href=/Exam-12647-20170106-1/operation/show?pageCurrent=1&queryData="+querydata+">首页</a><a id=checkFirstPage href=/Exam-12647-20170106-1/operation/show?pageCurrent="+(datas.page.pageCurrent-1)+"&queryData="+querydata+" onclick=\"if("+(datas.page.pageCurrent==1)+")return false;else return true;\">上一页</a><a>当前第"+datas.page.pageCurrent+"页共"+datas.page.pageNum+"页</a><a id=checkLastPage href=/Exam-12647-20170106-1/operation/show?pageCurrent="+(datas.page.pageCurrent+1)+"&queryData="+querydata+"  onclick=\"if("+(datas.page.pageCurrent==datas.page.pageNum)+")return false;else return true;\">下一页</a><a href=/Exam-12647-20170106-1/operation/show?pageCurrent="+datas.page.pageNum+"&queryData="+querydata+"  onclick=checkPage()>尾页</a><input type=hidden id=checkPage value="+datas.page.pageCurrent+"><input type=hidden id=checkPageNum value="+datas.page.pageNum+"></p>");				
            
				$("#checkFirstPage").on("click",function(){
					var valp = $("#checkPage").val();
					if(valp==1){
						alert("当前已是第一页");
					}
				});	
				
				$("#checkLastPage").on("click",function(){
					var valp = $("#checkPage").val();
					var valpn = $("#checkPageNum").val();
					if(valp==valpn){
						alert("当前已是最后一页");
					}
				});
				
				
				$(".dele").on("click",function(){
					var this1 = $(this);
					var data = {"filmId":$(this).parent().siblings(".td1").text()};
					$.ajax({
						type:"POST",
						url:"/Exam-12647-20170106-1/operation/dele.json",
						data:data,
						success:function(data){
							if(data.msg=="success"){
								this1.parents(".tr1").hide();
							}else{
								alert("数据删除失败");
						}
						},
						error:function(data){
							alert("数据删除失败");
					    }
					});
				});
				
			}
		});
	});
});


function cheak(){
	var r = document.getElementById("checkPage").value;
	if(r==1){
		alert("当前已是第一页");
		return false;
	}
}
