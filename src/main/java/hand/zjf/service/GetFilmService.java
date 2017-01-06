package hand.zjf.service;


import hand.zjf.dto.Page;


public interface GetFilmService {
	public Page getFilmList(int pageCurrent,String queryData,int onePageNumSelect);

}
