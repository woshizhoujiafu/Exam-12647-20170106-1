package hand.zjf.service;

import java.util.List;
import hand.zjf.entity.Film;
import hand.zjf.entity.Language;


public interface UserOperationService {
	public boolean delete(int filmId);
	
	public boolean filmAdd(Film film);
	
	public boolean modifyFilm(Film film);
	
	public Film jumpModifyFilm(int filmId);
	
	public List<Language> getLanguageList();

}
