package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Playlist;
import edu.northeastern.cs5200.models.Track;
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
    
    public Optional<User> findUserById(int id){
    	return userRepository.findById(id);
    }
    
    public Iterable<User> findByUserName(String username){
    	return userRepository.findByUserName(username);
    }
    
    public List<Track> findLikedTracks(int id){
    	Optional<User> opt = userRepository.findById(id);
    	if(opt.isPresent())
    		return opt.get().getLikedTracks();
    	return null;
    }
    
    public List<Playlist> findCreatedPlaylists(int id){
    	Optional<User> opt = userRepository.findById(id);
    	if(opt.isPresent())
    		return opt.get().getPlaylists();
    	return null;
    }
    
    public List<User> findFollowers(int id){
    	Optional<User> opt = userRepository.findById(id);
    	if(opt.isPresent())
    		return opt.get().getFollows();
    	return null;
    }
    
    public List<User> findFollowing(int id){
    	Optional<User> opt = userRepository.findById(id);
    	if(opt.isPresent())
    		return opt.get().getFollowee();
    	return null;
    }
    
    public void deleteAllUsers() {
    	userRepository.deleteAll();
    }
    
    public void deleteUser(int id) {
    	userRepository.deleteById(id);
    }
    
    public User updateUser(int id, User u) {
    	User temp = null;
		Optional<User> opt = userRepository.findById(id);
		if(opt.isPresent())
			temp = opt.get();
		temp.set(u);
		return userRepository.save(temp);
    }
    
    public void addTrackToLikedTracks(int user_id, Track t) {
    	Optional<User> opt = userRepository.findById(user_id);
    	if(opt.isPresent()) {
    		List<Track> user_tracks = opt.get().getLikedTracks();
    		user_tracks.add(t);
    		opt.get().setLikedTracks(user_tracks);
    		
    		updateUser(user_id, opt.get());
    	}
    }
    
    public void addFollowerFollowee(int id1, int id2) {
    	Optional<User> u1 = userRepository.findById(id1);
    	Optional<User> u2 = userRepository.findById(id2);
    	
    	if(u1.isPresent() && u2.isPresent()) {
    		List<User> u1_followees = u1.get().getFollowee();
    		u1_followees.add(u2.get());
    		u1.get().setFollowee(u1_followees);
    		
    		List<User> u2_followers = u2.get().getFollows();
    		u2_followers.add(u1.get());
    		u2.get().setFollows(u2_followers);
    		
    		updateUser(id1, u1.get());
    		updateUser(id2, u2.get());
    	}
    }
}
