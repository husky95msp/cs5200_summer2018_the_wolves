package edu.northeastern.cs5200.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.TrackDao;
import edu.northeastern.cs5200.models.Track;

@RestController
public class TrackService {
	@Autowired
	TrackDao td;
	
	@PostMapping("/api/track")
	public Track createTrack(@RequestBody Track t) {
		return td.createTrack(t);
	}
	
	@GetMapping("/api/track/{id}")
	public Optional<Track> findTrackById(@PathVariable("id") String id){
		return td.findBySpotifyId(id);
	}
}
