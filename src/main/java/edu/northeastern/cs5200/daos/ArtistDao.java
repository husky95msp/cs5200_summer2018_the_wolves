package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Album;
import edu.northeastern.cs5200.models.Artist;
import edu.northeastern.cs5200.repositories.ArtistRepository;

@Component
public class ArtistDao {
	
	@Autowired
	ArtistRepository ar;
	
	@Autowired
	AlbumDao ad;
	
	public Artist createArtist(Artist a) {
		a.setType();
		return ar.save(a);
	}
	
	public List<Artist> findAllArtists(){
		return (List<Artist>) ar.findAll();
	}
	
	public Optional<Artist> findArtistById(int id) {
		return ar.findById(id);
	}
	
	public void deleteAllArtists() {
		ar.deleteAll();
	}
	
	public void deleteArtistById(int id) {
		ar.deleteById(id);
	}
	
	public Artist updateArtist(int id, Artist a) {
		Artist temp = null;
		Optional<Artist> opt = ar.findById(id);
		if(opt.isPresent())
			temp = opt.get();
		temp.set(a);
		return ar.save(temp);
	}
	
	public Album createAlbumForArtist(int id, Album a) {
		Optional<Artist> art = ar.findById(id);
		if(art.isPresent()) {
			List<Album>  albums = art.get().getAlbums();
			a.setArtist(art.get());
			albums.add(a);
			art.get().setAlbums(albums);
			updateArtist(id, art.get());
			return ad.createAlbum(a);
		}
		return null;
	}
	
	public void removeAlbumForArtist(int id, Album a) {
		Optional<Artist> art = ar.findById(id);
		if(art.isPresent()) {
			ad.deleteAlbum(a.getId());
			List<Album>  albums = art.get().getAlbums();
			if(albums.contains(a))
				albums.remove(a);
			art.get().setAlbums(albums);
			updateArtist(id, art.get());
		}
	}
	
	public List<Album> getAllAlbumsByArtist(int id){
		Optional<Artist> opt = ar.findById(id);
		if(opt.isPresent())
			return opt.get().getAlbums();
		return null;
	}

}
