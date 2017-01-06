package hand.zjf.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hand.zjf.dao.UserOperationDao;
import hand.zjf.entity.Film;
import hand.zjf.entity.Language;
import hand.zjf.service.UserOperationService;

@Service
public class UserOperationServiceImpl implements UserOperationService {

	
	@Autowired
	private UserOperationDao tod;
	@Transactional
	public boolean delete(int filmId) {
		boolean flag = false;
		try {
			if(tod.delete(filmId)>0){
				flag = true;
		}else{
			flag = false;
		}
		} catch (Exception e) {
			throw new RuntimeException("删除filmId为"+filmId+"的数据失败");
		}
		return flag;
	}
	
	@Override
	public boolean filmAdd(Film film) {
		// TODO Auto-generated method stub
		boolean flag;
		int languageId = tod.getLanguageIdByLanguageName(film.getName());
		film.setLanguageId(languageId);
		if(tod.filmAdd(film)>0){
			flag = true;
		}else{
			flag = false;
		}
		return flag;
	}
	
	@Override
	public boolean modifyFilm(Film film) {
		// TODO Auto-generated method stub
		boolean flag;
		int languageId = tod.getLanguageIdByLanguageName(film.getName());
		film.setLanguageId(languageId);
		if(tod.modifyFilm(film)>0){
			flag = true;
		}else{
			flag = false;
		}
		return flag;
	}
	@Override
	public Film jumpModifyFilm(int filmId) {
		// TODO Auto-generated method stub
		Film film = new Film();
		film = tod.jumpModifyFilm(filmId);
		return film;
	}
	@Override
	public List<Language> getLanguageList() {
		List<Language> list = tod.getLanguageList();
		return list;
	}

}
