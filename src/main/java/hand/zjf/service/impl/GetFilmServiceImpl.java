package hand.zjf.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import hand.zjf.dao.GetFilmDao;
import hand.zjf.dto.Page;
import hand.zjf.entity.Film;
import hand.zjf.service.GetFilmService;

@Service
public class GetFilmServiceImpl implements GetFilmService{

	@Autowired
	private GetFilmDao gfd;
	@Override
	@Transactional
	public Page getFilmList(int pageCurrent,String queryData,int onePageNumSelect) {
		Page page = new Page(pageCurrent,onePageNumSelect);
		int letterCount = gfd.getCount(queryData);
		page.setLetterCount(letterCount);
		List<Film> list = gfd.getFilmList(page.getPageStart(),page.getPageSize(),queryData);
		if(page.getPageNum()==0){
			page.setPageNum(1);
		}
		page.setList(list);
		return page;
	}

}
