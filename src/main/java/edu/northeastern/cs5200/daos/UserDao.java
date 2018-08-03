package edu.northeastern.cs5200.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.User;
import edu.northeastern.cs5200.repositories.UserRepository;

@Component
public class UserDao {
	
	@Autowired
	UserRepository userRepository;
	
    //CREATE

    public User createUser(User user) {
//    	System.out.println(user.getPassword());
        return userRepository.save(user);
    }

    //READ

    public Iterable<User> findAllUsers(){
        return userRepository.findAll();
    }
    
    public Iterable<User> findByUserName(String username){
    	return userRepository.findByUserName(username);
    }
    
}
