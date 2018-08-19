package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<Artist> findAllArtists() {

		return artistDao.findAllArtists();
	}

	@PostMapping("/api/artist")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public Artist createArtist(@RequestBody Artist a) {
		return artistDao.createArtist(a);
	}
	
	@PostMapping("/api/artist/{id}/create_album")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public Album createAlbumForArtist(@PathVariable("id") int id,
			@RequestBody Album a) {
		return artistDao.createAlbumForArtist(id, a);
	}
	
	@GetMapping("/api/artist/{id}/get_albums")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<Album> getAllAlbumsByArtist(@PathVariable("id") int id){
		return artistDao.getAllAlbumsByArtist(id);
	}
	
	@DeleteMapping("/api/artist/{id}/delete_album")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public void deleteAlbumByArtist(@PathVariable("id") int id,
			@RequestBody Album a) {
		artistDao.removeAlbumForArtist(id, a);
	}
}
