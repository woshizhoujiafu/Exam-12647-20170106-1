package hand.zjf.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import hand.zjf.entity.Film;


public interface GetFilmDao {
	public List<Film> getFilmList(@Param("pageStart")int pageStart,@Param("pageSize")int pageSize,@Param("queryData")String queryData);
	public int getCount(String queryData);

}
