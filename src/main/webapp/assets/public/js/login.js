$(document).ready(function(){
	$("#welcome").show(2000);
});




function checkLogin(){
	var biaoji;
	var firstName = $("#firstName").val();
	var lastName = $("#lastName").val();
	var userPassword = $("#password").val();
	var data = {"firstName":firstName,"lastName":lastName,"userPassword":userPassword};
	$.ajax({
		type:"post",
		url:"/Exam-12647-20170106-1/mylogin/checkLogin.json",
		data:data,
		async:false,
		success:function(datas){
			if(datas.msg=="success"){
				$("#err")[0].innerHTML="登录成功";
				$("#err").css("color","#00ff40");
				setTimeout(function () {
			        $("#err").text("");
			    }, 3000);
				biaoji=1;
			}else{
				$("#err")[0].innerHTML="登录失败";
				setTimeout(function () {
			        $("#err").text("");
			    }, 2000);
				biaoji=2;
			}				
		},
		error:function(){
			alert("shibai");
			biaoji=2;
		}
	});
	if(biaoji==1){
		return true;
	}else{
		return false;
	}
}