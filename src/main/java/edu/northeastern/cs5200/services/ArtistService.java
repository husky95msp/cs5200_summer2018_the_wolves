package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.ArtistDao;
import edu.northeastern.cs5200.models.Album;
import edu.northeastern.cs5200.models.Artist;

@RestController
public class ArtistService {
	@Autowired
	ArtistDao artistDao;

	@GetMapping("/api/artist")
	public List<Artist> findAllArtists() {

		return artistDao.findAllArtists();
	}

	@PostMapping("/api/artist")
	public Artist createArtist(@RequestBody Artist a) {
		return artistDao.createArtist(a);
	}
	
	@PostMapping("/api/artist/{id}/create_album")
	public Album createAlbumForArtist(@PathVariable("id") int id,
			@RequestBody Album a) {
		return artistDao.createAlbumForArtist(id, a);
	}
	
	@GetMapping("/api/artist/{id}/get_albums")
	public List<Album> getAllAlbumsByArtist(@PathVariable("id") int id){
		return artistDao.getAllAlbumsByArtist(id);
	}
	
	@DeleteMapping("/api/artist/{id}/delete_album")
	public void deleteAlbumByArtist(@PathVariable("id") int id,
			@RequestBody Album a) {
		artistDao.removeAlbumForArtist(id, a);
	}
}
