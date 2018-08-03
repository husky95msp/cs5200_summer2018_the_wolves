package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.ArtistDao;
import edu.northeastern.cs5200.models.Artist;

@RestController
public class ArtistService {
	@Autowired
	ArtistDao artistDao;

	@GetMapping("/api/artist")
	public List<Artist> findAllUsers() {

		return artistDao.findAllArtists();
	}

	@PostMapping("/api/artist")
	public Artist createUser(@RequestBody Artist a) {
		return artistDao.createArtist(a);
	}


}
