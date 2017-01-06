package hand.zjf.dao;

import org.apache.ibatis.annotations.Param;
import hand.zjf.entity.Customer;

public interface UserLoginDao {
	public Customer checkLogin(@Param("firstName")String firstName);
	

}
