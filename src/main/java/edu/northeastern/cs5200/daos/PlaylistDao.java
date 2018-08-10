package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Playlist;
import edu.northeastern.cs5200.models.Track;
import edu.northeastern.cs5200.repositories.PlaylistRepository;

@Component
public class PlaylistDao {
	@Autowired
	PlaylistRepository pr;
	
	@Autowired
	TrackDao td;
	
	public Playlist createPlaylist(Playlist p) {
		return pr.save(p);
	}
	
	public Optional<Playlist> findPlaylistById(int id){
		return pr.findById(id);
	}
	
	public Playlist updatePlaylist(int id, Playlist p) {
		Playlist temp = null;
		Optional<Playlist> opt = pr.findById(id);
		if(opt.isPresent())
			temp = opt.get();
		temp.set(p);
		return pr.save(temp);
	}
	
	public void addTrackToPlaylist(int id, Track t) {
		Optional<Playlist> opt = pr.findById(id);
		Optional<Track> track = td.findBySpotifyId(t.getSpotify_id());
		if(!track.isPresent()) {
			t.setPlaylist(t.getPlaylist());
			td.createTrack(t);
		}
		if(opt.isPresent()) {
			List<Track> pl_tracks = opt.get().getTracks();
			boolean flag = true;
			for(Track tr:pl_tracks)
				if(tr.getSpotify_id().equals(t.getSpotify_id())) {
					flag = false;
					break;
				}
			
			if(flag) {
				pl_tracks.add(t);
				opt.get().setTracks(pl_tracks);
				updatePlaylist(id, opt.get());
				
				t.getPlaylist().add(opt.get());
				td.updateTrack(t.getSpotify_id(), t);
			}
		}
	}
	
	public void deleteTrackFromPlaylist(int id, Track t) {
		Optional<Playlist> opt = pr.findById(id);
		Optional<Track> track = td.findBySpotifyId(t.getSpotify_id());
		if(opt.isPresent() && track.isPresent()) {
			List<Track> pl_tracks = opt.get().getTracks();
			pl_tracks.remove(track.get());
			opt.get().setTracks(pl_tracks);
			updatePlaylist(id, opt.get());
			
			if(track.get().getPlaylist().size() != 0) {
				System.out.println(track.get().getPlaylist());
				t.getPlaylist().remove(opt.get());
				td.updateTrack(track.get().getSpotify_id(), track.get());
			}
		}
	}
	
	public List<Track> getAllTracksInPlaylist(int id){
		Optional<Playlist> p = pr.findById(id);
		if(p.isPresent())
			return p.get().getTracks();
		return null;
	}
}
