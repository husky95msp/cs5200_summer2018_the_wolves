package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

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
    
    public void deleteAllUsers() {
    	ur.deleteAll();
    }
    
    public void deleteUser(int id) {
    	Optional<User> opt = ur.findById(id);
    	if(opt.isPresent()) {
    		System.out.println(opt.get().getClass().getSimpleName());
    		if(!opt.get().getClass().getSimpleName().equals(Admin.class.getSimpleName()))
    			ur.deleteById(id);
    	}
    }
    
    public void createAdmin(Admin a) {
    	a.setType();
    	ar.save(a);
    }
    
    public List<User> findAllUsers(){
    	return (List<User>) ar.findAllUsers();
    }
    
}
