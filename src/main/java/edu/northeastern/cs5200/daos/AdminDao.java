package edu.northeastern.cs5200.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Admin;
import edu.northeastern.cs5200.models.User;
import edu.northeastern.cs5200.repositories.AdminRepository;
import edu.northeastern.cs5200.repositories.UserRepository;

@Component
public class AdminDao {
	@Autowired
	UserRepository ur;
	
	@Autowired
	AdminRepository ar;
	
    public Iterable<User> findAllUsers(){
        return ur.findAll();
    }
    
    public void deleteAllUsers() {
    	ur.deleteAll();
    }
    
    public void deleteUser(int id) {
    	ur.deleteById(id);
    }
    
    public void createAdmin(Admin a) {
    	ar.save(a);
    }
    
}
