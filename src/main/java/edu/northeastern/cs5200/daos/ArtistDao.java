package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Album;
import edu.northeastern.cs5200.models.Artist;
import edu.northeastern.cs5200.models.Track;
import edu.northeastern.cs5200.models.User;
import edu.northeastern.cs5200.repositories.ArtistRepository;

@Component
public class ArtistDao {
	
	@Autowired
	ArtistRepository ar;
	
	public Artist createArtist(Artist a) {
		return ar.save(a);
	}
	
	public List<Artist> findAllArtists(){
		return (List<Artist>) ar.findAll();
	}
	
	public Optional<Artist> findArtistById(int id) {
		return ar.findById(id);
	}
	
	public List<Track> getTracksByArtist(int id){
		Optional<Artist> opt = ar.findById(id);
		if(opt.isPresent())
			return opt.get().getTracks();
		return null;
	}
	
	public List<Album> getAlbumsByArtist(int id){
		Optional<Artist> opt = ar.findById(id);
		if(opt.isPresent())
			return opt.get().getAlbums();
		return null;
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

}
