package hand.zjf.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import hand.zjf.dto.Page;
import hand.zjf.entity.Customer;
import hand.zjf.entity.Film;
import hand.zjf.entity.Language;
import hand.zjf.service.UserOperationService;
import hand.zjf.service.GetFilmService;


@Controller
@RequestMapping("/operation")
public class UserOperationController {
	@Autowired
	private UserOperationService uos;	
	@RequestMapping(value="/dele",method=RequestMethod.POST)
	public @ResponseBody Map<String,String> testShow(Model model,String filmId){
		Map<String, String> map = new HashMap<>();
		int film_id = Integer.parseInt(filmId);
		try {
			if(uos.delete(film_id)){
				map.put("msg", "success");
			}else{
				map.put("msg", "error");
			}
		} catch (Exception e) {
			map.put("msg", "error");
			System.out.println(e.getMessage());
		}
		return map;
	}
	
	@RequestMapping(value="/jumpAdd",method=RequestMethod.GET)
	public String jumpFilmAdd(Model model){
		return "user/myAddInformation";
	}
	
	
	@Autowired
	private UserOperationService uos1;
	@RequestMapping(value="/getFilmLanguage",method=RequestMethod.POST)
	public @ResponseBody Map<String, List<Language>> getFilmLanguage(Model model){
		model.addAttribute("msg", "null");
		List<Language> list = new ArrayList<>();
		list = uos1.getLanguageList();
		Map<String, List<Language>> map = new HashMap<>();
		map.put("list", list);
		return map;
	}
	
	@Autowired
	private UserOperationService tos1;
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> filmAdd(Model model,@Param("film")Film film){
		Map<String,Object> map = new HashMap<>();
		if(tos1.filmAdd(film)){
			map.put("msg","添加数据成功");
		}else{
			map.put("msg","添加数据失败");
		}
		return map;
	}
	
	
	@Autowired
	private UserOperationService tos3;
	@RequestMapping(value="/jumpModify",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> jumpFilmModify(Model model,String filmId){
		Film film = new Film();
		film = tos3.jumpModifyFilm(Integer.parseInt(filmId));
		List<Language> list = new ArrayList<>();
		list = uos1.getLanguageList();
		model.addAttribute("list",list);
		model.addAttribute("film", film);
		Map<String, Object> map = new HashMap<>();
		map.put("film", film);
		map.put("list", list);
		return map;
	}
	
	@Autowired
	private UserOperationService tos2;
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> modifyFilm(Model model,@Param("film")Film film){
		Map<String, Object> map = new HashMap<>();
		if(tos2.modifyFilm(film)){
			map.put("msg", "数据修改成功");
		}else{
			map.put("msg", "数据修改成功");
		}
		return map;
	}
	
	
	@RequestMapping(value="/jumpshow",method=RequestMethod.GET)
	public String jumpfilmShow(){	
		return "/user/myShowInformation";
	}
	
	@Autowired
	private GetFilmService gfs;	
	@RequestMapping(value="/show",method=RequestMethod.POST)
	public @ResponseBody Map<String, Page> filmShow(Model model,@Param("pageCurrent")Integer pageCurrent,@Param("queryData")String queryData,@Param("onePageNumSelect")Integer onePageNumSelect){
		if(queryData==null||queryData.equals("")){
			queryData="null";
		}
		if(pageCurrent==null){
			pageCurrent=1;
		}
		System.out.println(onePageNumSelect);
		Page page = gfs.getFilmList(pageCurrent,queryData,onePageNumSelect);
		if(queryData.equals("null")){
			queryData="";
		}
		Map<String,Page> map = new HashMap<>(); 
		map.put("page", page);	
		return map;
	}
	
	
	@Autowired
	private GetFilmService gfs2;	
	@RequestMapping(value="/query",method=RequestMethod.POST)
	public @ResponseBody Map<String,Page> queryShow(Model model,Integer pageCurrent,String queryData,int onePageNumSelect){
		if(queryData==null||queryData.equals("")){
			queryData="null";
		}
		if(pageCurrent==null){
			pageCurrent=1;
		}
		Page page = gfs2.getFilmList(pageCurrent,queryData,onePageNumSelect);
		Map< String, Page> map =new HashMap<>();
		map.put("page", page);
		return map;
	}
	
	
	@RequestMapping(value="/returnHome",method=RequestMethod.GET)
	public String returnHome(Model model){
		return "/user/myHome";
	}
	
	@RequestMapping(value="/iframeRight",method=RequestMethod.GET)
	public String iframeRight(Model model){
		return "/user/iframeRight";
	}
	
	@RequestMapping(value="/quit",method=RequestMethod.GET)
	public String quit(Model model,HttpSession session){
		session.removeAttribute("actor");
		return "redirect:/login.html";
	}
	
	@RequestMapping(value="/getUserName",method=RequestMethod.GET)
	public @ResponseBody Map<String, String> getUserName(Model model,HttpSession session){
		Customer customer= (Customer)session.getAttribute("customer");
		Map<String, String> map = new HashMap<>();
		map.put("userName", customer.getFirstName()+" "+customer.getLastName());
		return map;
	}
	
}
