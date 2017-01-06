$(document).ready(function(){
	//全局变量
	var saveModify;
	//保存当前页
	var savePage;
	//获取film数据
	setOnePageNumber();
	getPage();
	queryData();
	deleteFilm();
	
	//查看是否为第一页
	$("#checkFirstPage").on("click",function(){
		var valp = $("#pageCurrent").val();
		if(valp==1){
			alert("当前已是第一页");
		}else{
			var pageCurrent = ($("#pageCurrent").val()-1);
			savePage = pageCurrent;
			getPage(pageCurrent);
		}
	});	
	
	//查看是否为最后一页
	$("#checkLastPage").on("click",function(){
		var valp = $("#pageCurrent").val();
		var valpn = $("#checkPageNum").val();
		if(valp==valpn){
			alert("当前已是最后一页");
		}else{
			var pageCurrent = parseInt($("#pageCurrent").val())+1;
			savePage = pageCurrent;
			getPage(pageCurrent);
		}
	});
	
	//换页
	$("#firstPage").on("click",function(){
		var pageCurrent = 1;
		savePage = pageCurrent;
		getPage(pageCurrent);
	});
	$("#lastPage").on("click",function(){
		var pageCurrent = $("#checkPageNum").val();
		savePage = pageCurrent;
		getPage(pageCurrent);
	});
	
	
	//查询
	function queryData(){
		$("#queryData").on("keyup",function(){
			var onePageNumSelect = $("#onePageNumSelect").val();
			var data ={"queryData":$(this).val(),"pageCurrent":1,"onePageNumSelect":onePageNumSelect};
			var querydata = $(this).val();
			$.ajax({
				type:"post",
				url:"/Exam-12647-20170106-1/operation/query.json",
				data:data,
				success:function(datas){		
					var list = datas.page.list;
					$("#tab").html("<tr class=tr1><th class=td1>filmId</th><th>title</th><th>description</th></th><th>language</th>languageName<th>修改</th><th>删除</th></tr>");
					$.each(list,function(index,data){
						$("#tab").append("<tr class=tr1><td class=td1>"+data.filmId+"</td><td class=td3>"+data.title+"</td><td class=td2>"+data.description+"</td><td class=td4>"+data.name+"</td><td><a class=myModal href=#>修改</a></td><td><a href=# class=dele onclick=\"if(confirm('确定删除testId为"+data.filmId+"的这条记录吗')) return true;else return false;\">删除</a></td></tr>");
				})		
	
				$("#tab tr .td2").css("width","300px");
				$("#tab tr .td3").css("width","200px");
				$("#tab tr .td4").css("width","150px");
				$("#tab tr .td1").css("width","60px");
				
				$("#checkPageNum").val(datas.page.pageNum);
				$("#pageCurrent").val(datas.page.pageCurrent);
				$("#checkFirstPage").attr("onclick","if("+(datas.page.pageCurrent==1)+")return false;else return true;");
				$("#checkLastPage").attr("onclick","if("+(datas.page.pageCurrent==datas.pageNum)+")return false;else return true;");
				$("#showPage").text("当前第"+datas.page.pageCurrent+"页共"+datas.page.pageNum+"页");
				deleteFilm();
				modifyFilm();
				}
			});
		});
	}
	
	//获取当前页
	function getPage(pageCurrent){
		var querydata = $("#queryData").val();
		var pageNum = $("#checkPageNum").val();
		var onePageNumSelect = $("#onePageNumSelect").val();
		var data ={"queryData":querydata,"pageCurrent":pageCurrent,"onePageNumSelect":onePageNumSelect};
		$.ajax({
			type:"POST",
			url:"/Exam-12647-20170106-1/operation/show.json",
			data:data,
			success:function(datas){
				var list = datas.page.list;
				$("#tab").html("<tr class=tr1><th class=td1>filmId</th><th>title</th><th>description</th></th><th>language</th>languageName<th>修改</th><th>删除</th></tr>");
				$.each(list,function(index,data){			
					$("#tab").append("<tr class=tr1><td class=td1>"+data.filmId+"</td><td class=td3>"+data.title+"</td><td class=td2>"+data.description+"</td><td class=td4>"+data.name+"</td><td><a class=myModal href=#>修改</a></td><td><a href=# class=dele onclick=\"if(confirm('确定删除testId为"+data.filmId+"的这条记录吗')) return true;else return false;\">删除</a></td></tr>");
			})		
			$("#tab tr .td2").css("width","300px");
			$("#tab tr .td3").css("width","200px");
			$("#tab tr .td4").css("width","150px");
			$("#tab tr .td1").css("width","60px");			
            //保存当前页到页面
			$("#checkPageNum").val(datas.page.pageNum);
			$("#pageCurrent").val(datas.page.pageCurrent);
			$("#checkFirstPage").attr("onclick","if("+(datas.page.pageCurrent==1)+")return false;else return true;");
			$("#checkLastPage").attr("onclick","if("+(datas.page.pageCurrent==datas.pageNum)+")return false;else return true;");
			$("#showPage").text("当前第"+datas.page.pageCurrent+"页共"+datas.page.pageNum+"页");
			deleteFilm();
			modifyFilm();
			},
		 	error:function(datas){	
		 	}
		});
	}	
	
	function deleteFilm(){
		$(".dele").on("click",function(){
			var this1 = $(this);
			var data = {"filmId":$(this).parent().siblings(".td1").text()};
			$.ajax({
				type:"POST",
				url:"/Exam-12647-20170106-1/operation/dele.json",
				data:data,
				success:function(data){
					if(data.msg=="success"){
						//alert(this1.parents(".tr1").siblings().length);
						this1.parents(".tr1").hide();
						//getPage(savePage);
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
	
	function modifyFilm(){
		$(".myModal").on("click",function(){
			var this1 = $(this);
			saveModify = $(this);
			var data = {"filmId":$(this).parent().siblings(".td1").text()};
		$.ajax({  
	            type: "POST",  
	            url: "/Exam-12647-20170106-1/operation/jumpModify.json",   
	            data:data,
	            beforeSend: function(){       
	                $('#myModalModify').modal({  
	                    backdrop:'static'      
	                });  
	                $('#myModalModify').modal('show');   
	            },  
	            success: function(datas) {  
	               $("#myModalLabel").text("修改序号为"+datas.film.filmId+"的数据");
	               $("#title").val(datas.film.title);
	               $("#description").val(datas.film.description);
	               $("#filmId").val(datas.film.filmId);
	               $("#select").html("<option  value="+datas.film.name+">"+datas.film.name+"</option>")
	               $.each(datas.list,function(index,data){
	            	   $("#select").append("<option  value="+data.name+">"+data.name+"</option>");
	               });
	            }  
	        }); 

		});
		}
	
	
	$("#modifyBtn").on("click",function(){
		if(checkValue()){
         var filmId =  $("#filmId").val();
         var title = $("#title").val();
         var description = $("#description").val();
         var name = $("#select").val();
         var data = {"filmId":filmId,"title":title,"description":description,"name":name};
         $.ajax({
        	 type:"post",
        	 url:"/Exam-12647-20170106-1/operation/modify.json",
        	 data:data,
        	 success:function(datas){
        		 alert(datas.msg);
        		 saveModify.parent().siblings(".td4").text(name);
        		 saveModify.parent().siblings(".td2").text(description);
        		 saveModify.parent().siblings(".td3").text(title);
        		 $('#myModalModify').modal('hide'); 
        	 },
        	 error:function(datas){
        		 alert("修改数据失败");
        	 }
         });
		}
	});
	
	
	function setOnePageNumber(){
		var  onePageNum = [10,20,50];
		for(i=0;i<onePageNum.length;i++){
			$("#onePageNumSelect").append("<option value="+onePageNum[i]+">"+onePageNum[i]+"</option>");
		}
		getOnePageNumber();
	}
	
	function getOnePageNumber(){
		$("#onePageNumSelect").on("change",function(){
			getPage();
		})
	}
		
	function checkPage(){
		var valp = $("#pageCurrent").val();
		var valpn = $("#checkPageNum").val();
		if(valp==valpn){
			alert("当前已是最后一页");
		}
	}
	
	function checkValue(){
		var title = document.getElementById("title").value;
		var description = document.getElementById("description").value;
		if(description==""){
			alert("description不能为空")
			return false;
		}else if(title==""){
			alert("title不能为空")
			return false;
		}else{
			return true;
		}			
	}
});

