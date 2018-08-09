package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Album;
import edu.northeastern.cs5200.models.Track;
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
	
	public void updateAlbum(int id, Album a) {
		Optional<Album> opt = ar.findById(id);
		if(opt.isPresent()) {
			opt.get().set(a);
			ar.save(opt.get());
		}
	}
	
	public void addTrackToAlbum(int id, Track t) {
		Optional<Album> a = ar.findById(id);
		if(a.isPresent()) {
			List<Track>  tracks = a.get().getTracks();
			tracks.add(t);
			a.get().setTracks(tracks);
			updateAlbum(id, a.get());
		}
	}
	
	public void removeTrackFromAlbum(int id, Track t) {
		Optional<Album> a = ar.findById(id);
		if(a.isPresent()) {
			List<Track>  tracks = a.get().getTracks();
			if(tracks.contains(t))
				tracks.remove(t);
			a.get().setTracks(tracks);
			updateAlbum(id, a.get());
		}
	}
	
	public List<Track> getAllTracksInAlbum(int id){
		Optional<Album> a = ar.findById(id);
		if(a.isPresent())
			return a.get().getTracks();
		return null;
	}
}
