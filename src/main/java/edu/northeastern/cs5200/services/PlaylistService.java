package edu.northeastern.cs5200.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.PlaylistDao;
import edu.northeastern.cs5200.models.Playlist;

@RestController
public class PlaylistService {
	@Autowired
	PlaylistDao pd;
	
	@PostMapping("")
	public Playlist createPlaylist(Playlist p) {
		return pd.createPlaylist(p);
	}
}
