package hand.zjf.dao;

import java.util.List;
import hand.zjf.entity.Film;
import hand.zjf.entity.Language;


public interface UserOperationDao {
	public int delete(int filmId);
	
	public String getLanguageNameByFilmId(int filmId);
	
	public int filmAdd(Film film);
	
	public int modifyFilm(Film Film);
	
	public Film jumpModifyFilm(int filmId);
	
	public List<Language> getLanguageList();
	
	public int getLanguageIdByLanguageName(String name);

}
