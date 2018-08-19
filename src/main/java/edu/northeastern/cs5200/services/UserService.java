package edu.northeastern.cs5200.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.UserDao;
import edu.northeastern.cs5200.models.Artist;
import edu.northeastern.cs5200.models.Playlist;
import edu.northeastern.cs5200.models.Reviewer;
import edu.northeastern.cs5200.models.Track;
import edu.northeastern.cs5200.models.User;

@RestController
public class UserService {
	@Autowired
	UserDao userDao;

	@PostMapping("/api/user")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public void createUser(@RequestBody User user) {
		userDao.createUser(user);
	}
	
	@GetMapping("/api/user/{user_id}")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public Optional<User> findUserById(@PathVariable("user_id") int id){
		return userDao.findUserById(id);
	}
	@GetMapping("/api/user/key/{key}")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public Iterable<User> findUsersByKey(@PathVariable("key") String key){
		return userDao.findByKey(key);
	}
	
	@PutMapping("/api/user/{id}")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public User updateUser(@PathVariable("id") int id,
			@RequestBody User u) {
		return userDao.updateUser(id, u);
	}

	@PostMapping("/api/user/authenticate")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public Map<String, Object> AuthenticateUser(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		Object u;
		List<User> users = (List<User>) userDao.findByUserName(user.getUsername());
		
		
			if (users.size() != 0) {
				User ui = users.get(0);
				if (ui instanceof Artist) {
					 u = (Artist)ui;
				}else if (ui instanceof Reviewer) {
					 u = (Reviewer)ui;
				}else {
					 u = (User)ui;
				}
				if (users.get(0).getPassword().equals(user.getPassword())) {
					response.put("status", 200);
					response.put("user", ui);
					response.put("type", u.getClass().getSimpleName());
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
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public void addTracktoLikedTracks(@PathVariable("user_id") int id,
			@RequestBody Track t) {
		userDao.addTrackToLikedTracks(id, t);
	}
	
	@DeleteMapping("/api/user/{user_id}/deletetrack")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public void unlikeTrack(@PathVariable("user_id") int id,
			@RequestBody Track t) {
		userDao.unlikeTrack(id, t);
	}
	
	@GetMapping("/api/user/{user_id}/likedtracks")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<Track> getLikedTracks(@PathVariable("user_id") int id){
		return userDao.findLikedTracks(id);
	}
	
	@GetMapping("/api/user/{id1}/{id2}")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public void addFollowerFollowee(@PathVariable("id1") int id1,
			@PathVariable("id2") int id2) {
		userDao.addFollowerFollowee(id1, id2);
	}
	
	@GetMapping("/api/user/{user_id}/followers")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<User> getFollowers(@PathVariable("user_id") int id){
		return userDao.findFollowers(id);
	}
	
	@GetMapping("/api/user/{user_id}/following")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<User> getFollowing(@PathVariable("user_id") int id){
		return userDao.findFollowing(id);
	}
	
	@GetMapping("/api/user/{id1}/{id2}/unfollow")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public void unfollowUser(@PathVariable("id1") int id1,
			@PathVariable("id2") int id2) {
		userDao.unfollowUser(id1, id2);
	}
	
	@PostMapping("/api/user/playlist/{id}")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public Playlist createPlaylistForUser(@PathVariable("id") int id,
			@RequestBody Playlist p) {
		return userDao.createPlaylist(id, p);
	}
	
	@GetMapping("/api/user/all_playlists/{id}")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<Playlist> findAllPlaylistsForUser(@PathVariable("id") int id){
		return userDao.findAllPlaylistsForUser(id);
	}
	
	@GetMapping("/api/user")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<User> findAllUsers(){
        return userDao.findAllUser();
    }

}
