package edu.northeastern.cs5200.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.UserDao;
import edu.northeastern.cs5200.models.Artist;
import edu.northeastern.cs5200.models.Reviewer;
import edu.northeastern.cs5200.models.Track;
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
	
	@GetMapping("/api/user/{user_id}")
	public Optional<User> findUserById(@PathVariable("user_id") int id){
		return userDao.findUserById(id);
	}

	@PostMapping("/api/user/authenticate")
	public Map<String, Object> AuthenticateUser(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		Object u;
		List<User> users = (List<User>) userDao.findByUserName(user.getUsername());
		if (users.get(0) instanceof Artist) {
			 u = (Artist)users.get(0);
		}else if (users.get(0) instanceof Reviewer) {
			 u = (Reviewer)users.get(0);
		}else {
			 u = users.get(0);
		}
			if (users.size() != 0) {
				if (users.get(0).getPassword().equals(user.getPassword())) {
					response.put("status", 200);
					response.put(u.getClass().getSimpleName(), u);
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
	
	@PostMapping("/api/user/{user_id}/addtrack")
	public void addTracktoLikedTracks(@Param("user_id") int id,
			@RequestBody Track t) {
		userDao.addTrackToLikedTracks(id, t);
	}
	
	@GetMapping("/api/user/{user_id}/likedtracks")
	public List<Track> getLikedTracks(@Param("user_id") int id){
		return userDao.findLikedTracks(id);
	}

}
