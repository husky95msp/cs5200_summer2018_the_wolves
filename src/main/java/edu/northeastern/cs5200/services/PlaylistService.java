package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.PlaylistDao;
import edu.northeastern.cs5200.models.Playlist;
import edu.northeastern.cs5200.models.Track;

@RestController
public class PlaylistService {
	@Autowired
	PlaylistDao pd;
	
	@PostMapping("")
	public Playlist createPlaylist(Playlist p) {
		return pd.createPlaylist(p);
	}
	
	
	@GetMapping("/api/playlist/tracks/{id}")
	public List<Track> findAllTracksInPlaylist(@PathVariable("id") int id){
		return pd.getAllTracksInPlaylist(id);
	}
	
	@PostMapping("/api/playlist/addtrack/{id}")
	public void addTrackToPlaylist(@PathVariable("id") int id,
			@RequestBody Track t) {
		pd.addTrackToPlaylist(id, t);
	}
	
	@DeleteMapping("/api/playlist/delete_track/{id}")
	public void deleteTrackFromPlaylist(@PathVariable("id") int id,
			@RequestBody Track t) {
		pd.deleteTrackFromPlaylist(id, t);
	}
}
