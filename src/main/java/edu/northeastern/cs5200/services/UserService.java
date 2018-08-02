package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.UserDao;
import edu.northeastern.cs5200.models.User;

@RestController
public class UserService {
    @Autowired
    UserDao userDao;

    @GetMapping("/api/user")
    public Iterable<User> findAllUsers(){

        return userDao.findAllUsers();
    }
    
    @PostMapping("/api/user")
    public User createUser
            (@RequestBody User user) {
        return userDao.createUser(user);
    }
    
    @PostMapping("/api/user/authenticate")
    public Boolean AuthenticateUser
            (@RequestBody User user) {
    	List<User> users = (List<User>)userDao.findByUserNamePassword(user.getUsername(), user.getPassword());
    	if(users.size() != 0) {
    	return true;
    	}
    	return false;
    }	
    
}
