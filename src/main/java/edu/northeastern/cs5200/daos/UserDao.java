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
	TrackDao trackDao;
	
	@Autowired
	PlaylistDao pd;
	
	@Autowired
	UserRepository userRepository;
	
    //CREATE

    public void createUser(User user) {
    	user.setType();
        userRepository.save(user);
    }

    //READ
    
    public Optional<User> findUserById(int id){
    	return userRepository.findById(id);
    }
    
    public Iterable<User> findByUserName(String username){
    	return userRepository.findByUserName(username);
    }
    
    public Iterable<User> findByKey(String key){
    	return userRepository.findByKey(key);
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
    		return opt.get().getFollower();
    	return null;
    }
    
    public List<User> findFollowing(int id){
    	Optional<User> opt = userRepository.findById(id);
    	if(opt.isPresent())
    		return opt.get().getFollows();
    	return null;
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
    		List<User> userlikes = t.getLikes();
    		userlikes.add(opt.get());
    		t.setLikes(userlikes);
    		
    		if(!trackDao.findBySpotifyId(t.getSpotify_id()).isPresent())
    			trackDao.createTrack(t);
    		user_tracks.add(t);
    		opt.get().setLikedTracks(user_tracks);
    		
    		updateUser(user_id, opt.get());
    	}
    }
    
    public void unlikeTrack(int user_id, Track t) {
    	Optional<User> opt = userRepository.findById(user_id);
    	Optional<Track> optTrack = trackDao.findBySpotifyId(t.getSpotify_id());
    	
    	if(opt.isPresent()) {
    		List<Track> user_tracks = opt.get().getLikedTracks();
    		List<User> userlikes = optTrack.get().getLikes();
    		userlikes.remove(opt.get());
    		optTrack.get().setLikes(userlikes);
    		
    		user_tracks.remove(optTrack.get());
    		opt.get().setLikedTracks(user_tracks);
    		trackDao.updateTrack(t.getSpotify_id(), optTrack.get());
    		updateUser(user_id, opt.get());
    	}
    }
    
    public void addFollowerFollowee(int id1, int id2) {
    	Optional<User> u1 = userRepository.findById(id1);
    	Optional<User> u2 = userRepository.findById(id2);
    	
    	if(u1.isPresent() && u2.isPresent()) {
    		List<User> u1_follows = u1.get().getFollows();
    		u1_follows.add(u2.get());
    		u1.get().setFollows(u1_follows);
    		updateUser(id1, u1.get());
    		
    		List<User> u2_followee = u2.get().getFollower();
    		u2_followee.add(u1.get());
    		u2.get().setFollower(u2_followee);
    		updateUser(id2, u2.get());
    	}
    }
    
    public void unfollowUser(int id1, int id2) {
    	Optional<User> u1 = userRepository.findById(id1);
    	Optional<User> u2 = userRepository.findById(id2);
    	
    	if(u1.isPresent() && u2.isPresent()) {
    	
    		List<User> u1_follows = u1.get().getFollows();
    		if(u1_follows.contains(u2.get())) {
    			u1_follows.remove(u2.get());
    			u1.get().setFollows(u1_follows);
        		updateUser(id1, u1.get());
        	
        	
    		}
    		
    		List<User> u2_followee = u2.get().getFollower();
    		if(u2_followee.contains(u1.get())) {
    			u2_followee.remove(u1.get());
        		u2.get().setFollower(u2_followee);
        		updateUser(id2, u2.get());
        		
    		}
    	}
    }
    
    public Playlist createPlaylist(int user_id, Playlist p) {
    	Optional<User> opt = userRepository.findById(user_id);
    	if(opt.isPresent()) {
    		opt.get().getPlaylists().add(p);
    		p.setCreator(opt.get());
    		return pd.createPlaylist(p);
    	}
    	return null;
    }
    
    public List<Playlist> findAllPlaylistsForUser(int id) {
    	Optional<User> u = userRepository.findById(id);
    	if(u.isPresent())
    		return u.get().getPlaylists();
    	return null;
    }

	public List<User> findAllUser() {
		// TODO Auto-generated method stub
		return (List<User>) userRepository.findAll();
	}
}
