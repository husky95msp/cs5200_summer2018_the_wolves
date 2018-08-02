package edu.northeastern.cs5200.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.User;
import edu.northeastern.cs5200.repositories.UserRepository;

@Component
public class UserDao {
	
	@Autowired
	UserRepository userRepository;
	
    //CREATE

    public User createUser(User user) {
        return userRepository.save(user);
    }

    //READ

    public Iterable<User> findAllUsers(){
        return userRepository.findAll();
    }
    
    public Iterable<User> findByUserNamePassword(String username, String password){
    	return userRepository.findUserNameAndPassword(username, password);
    }
    
}
