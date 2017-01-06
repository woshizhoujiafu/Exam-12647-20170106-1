package hand.zjf.service;

import hand.zjf.entity.Customer;

public interface UserLoginService {
	public Customer cheakLogin(String firstName,String lastName,String userPassword);

}
