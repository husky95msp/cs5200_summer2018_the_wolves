package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Album;
import edu.northeastern.cs5200.repositories.AlbumRepository;

@Component
public class AlbumDao {
	@Autowired
	AlbumRepository ar;
	
	public Album createAlbum(Album a) {
		return ar.save(a);
	}
	
	public List<Album> findAllAlbums(){
		return (List<Album>) ar.findAll();
	}
	
	public Optional<Album> findAlbumById(int id) {
		return ar.findById(id);
	}
	
	public void deleteAlbum(int id) {
		ar.deleteById(id);
	}
}
