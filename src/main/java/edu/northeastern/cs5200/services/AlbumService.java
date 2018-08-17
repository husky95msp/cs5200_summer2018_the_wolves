package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.AlbumDao;
import edu.northeastern.cs5200.models.Track;

@RestController
public class AlbumService {
	@Autowired
	AlbumDao ad;
	
	@PostMapping("/api/album/{id}/add_track")
	public Track addTrackToAlbum(@PathVariable("id") int id,
			@RequestBody Track t) {
		return ad.addTrackToAlbum(id, t);
	}
	
	@DeleteMapping("/api/album/{id}/delete_track")
	public void deleteTrackFromAlbum(@PathVariable("id") int id,
			@RequestBody Track t) {
		ad.removeTrackFromAlbum(id, t);
	}
	
	@GetMapping("/api/album/{id}/get_tracks")
	public List<Track> getAllTracksInAlbum(@PathVariable("id") int id){
		return ad.getAllTracksInAlbum(id);
	}
}
