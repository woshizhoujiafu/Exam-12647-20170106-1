package hand.zjf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/about")
public class AboutController {
	
	@RequestMapping(value="/aboutMine",method=RequestMethod.GET)
	public String aboutMine(){
		return "user/aboutMine";
	}

}
