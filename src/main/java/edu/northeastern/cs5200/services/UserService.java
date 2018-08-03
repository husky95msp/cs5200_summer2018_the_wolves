package edu.northeastern.cs5200.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public Iterable<User> findAllUsers() {

		return userDao.findAllUsers();
	}

	@PostMapping("/api/user")
	public User createUser(@RequestBody User user) {
		return userDao.createUser(user);
	}

	@PostMapping("/api/user/authenticate")
	public Map<String, Object> AuthenticateUser(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		List<User> users = (List<User>) userDao.findByUserName(user.getUsername());
							
			if (users.size() != 0) {
				if (users.get(0).getPassword().equals(user.getPassword())) {
					response.put("status", 200);
					response.put("user", users.get(0));
					return response;
				}
				// Invalid password
				response.put("status", 401);
				
				return response;
			}
			// Invalid User name
			response.put("status", 404);
		

		return response;
	}

}
