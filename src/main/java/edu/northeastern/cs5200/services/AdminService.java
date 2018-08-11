package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.AdminDao;
import edu.northeastern.cs5200.models.Admin;
import edu.northeastern.cs5200.models.User;

@RestController
public class AdminService {
	@Autowired
	AdminDao ad;
	
	@PostMapping("/api/admin")
	public void createAdmin(@RequestBody Admin a) {
		ad.createAdmin(a);
	}
	
	@GetMapping("/api/admin/all_users")
	public List<User> findAllUsers(){
		return ad.findAllUsers();
	}
	
	@DeleteMapping("/api/user")
	public void deleteAllUsers() {
		ad.deleteAllUsers();
	}
	
	@DeleteMapping("/api/user/{id}")
	public void deleteUserById(@PathVariable("id") int id) {
		ad.deleteUser(id);
	}
}
