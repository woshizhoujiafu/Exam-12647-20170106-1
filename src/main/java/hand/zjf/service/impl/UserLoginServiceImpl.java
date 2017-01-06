package hand.zjf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hand.zjf.dao.UserLoginDao;
import hand.zjf.entity.Customer;
import hand.zjf.service.UserLoginService;

@Service
public class UserLoginServiceImpl implements UserLoginService {

	@Autowired
	private UserLoginDao tld;
	@Override
	public Customer cheakLogin(String firstName,String lastName, String userPassword) {
		// TODO Auto-generated method stub
		Customer customer = new Customer();
		customer = tld.checkLogin(firstName);	
		return customer;
	}
}
