package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    
}
