package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Album;
import edu.northeastern.cs5200.models.Track;
import edu.northeastern.cs5200.repositories.AlbumRepository;

@Component
public class AlbumDao {
	@Autowired
	AlbumRepository ar;
	
	@Autowired
	TrackDao td;
	
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
	
	public String randString(int size) {
		String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < size) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;
	}
	
	public int getRandInt(int low, int high) {
		Random r = new Random();
		return (r.nextInt(high - low) + low);
	}
	
	public Track addTrackToAlbum(int id, Track t) {
		Optional<Album> a = ar.findById(id);
		if(a.isPresent()) {
			List<Track>  tracks = a.get().getTracks();
			String t_id = null;
			t_id = randString(22);
			if(!td.findBySpotifyId(t_id).isPresent()) {
				t.setSpotify_id(t_id);
				t.setAlbum(a.get());
				t.setAlbum_art("https://media.giphy.com/media/4oMoIbIQrvCjm/giphy.gif");
				t.setAlbum_name(a.get().getName());
				t.setPopularity(getRandInt(1, 100));
				tracks.add(t);
				a.get().setTracks(tracks);
				updateAlbum(id, a.get());
				return td.createTrack(t);
			}
			return null;
		}
		return null;
	}
	
	public void removeTrackFromAlbum(int id, Track t) {
		Optional<Album> a = ar.findById(id);
		if(a.isPresent()) {
			if(td.findBySpotifyId(t.getSpotify_id()).isPresent()) {
				td.deleteTrack(t.getSpotify_id());
				List<Track>  tracks = a.get().getTracks();
				if(tracks.contains(t))
					tracks.remove(t);
				a.get().setTracks(tracks);
				updateAlbum(id, a.get());
			}
		}
	}
	
	public List<Track> getAllTracksInAlbum(int id){
		Optional<Album> a = ar.findById(id);
		if(a.isPresent())
			return a.get().getTracks();
		return null;
	}
}
