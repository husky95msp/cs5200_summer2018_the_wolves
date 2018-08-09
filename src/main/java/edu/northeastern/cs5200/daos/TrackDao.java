package edu.northeastern.cs5200.daos;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Track;
import edu.northeastern.cs5200.repositories.TrackRepository;

@Component
public class TrackDao {
	@Autowired
	TrackRepository trackRepository;
	
	
	public Track createTrack(Track t) {
//		if (trackRepository.findBySpotifyId(t.getSpotify_id()).isPresent()) {
//			return t;
//		}
		
		return trackRepository.save(t);
	}
	
	public Optional<Track> findBySpotifyId(String id){
		return trackRepository.findBySpotifyId(id);
	}
	
	public void updateTrack(String id, Track t) {
		Optional<Track> opt = trackRepository.findBySpotifyId(id);
		if(opt.isPresent()) {
			Track temp = opt.get();
			temp.set(t);
			trackRepository.save(temp);
		}
	}
	
	public void deleteTrack(String id) {
		trackRepository.deleteBySpotifyId(id);
	}
}
