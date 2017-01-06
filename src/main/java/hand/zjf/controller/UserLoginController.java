package hand.zjf.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import hand.zjf.entity.Customer;
import hand.zjf.service.UserLoginService;


@Controller
@RequestMapping("/mylogin")
public class UserLoginController {
	@RequestMapping(value="/customerLogin",method=RequestMethod.GET)
	public String actorLogin(){		
		return "user/myHome";
	}
	
	@Autowired
	private UserLoginService tls;
	@RequestMapping(value="/checkLogin",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object>  checkLogin(HttpSession session,Model model,@Param("firstName")String firstName,@Param("lastName")String lastName,@Param("userPassword")String userPassword){		
			Customer customer = new Customer();
			Map<String,Object> map = new HashMap<>();
			customer = tls.cheakLogin(firstName,lastName,userPassword);
			if(customer!=null){
				map.put("msg","success");
				session.setAttribute("customer",customer);
			}else{
				map.put("msg", "error");
			}
			return map;
	}
}