package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Artist extends User{
	
	private String image;

	@OneToMany(mappedBy="artist", fetch=FetchType.LAZY)
	@JsonIgnore
	private List<Album> albums;
	
	@OneToMany(mappedBy="artist", fetch=FetchType.LAZY)
	@JsonIgnore
	private List<Track> tracks;
	
	
	public Artist(String username, String password, String email, List<Playlist> playlists, List<User> follows,
			List<User> followee, List<Track> likedTracks, String image, List<Album> albums, List<Track> tracks) {
		super(username, password, email, playlists, follows, followee, likedTracks);
		this.image = image;
		this.albums = albums;
		this.tracks = tracks;
	}
	public List<Album> getAlbums() {
		return albums;
	}
	public void setAlbums(List<Album> albums) {
		this.albums = albums;
	}
	public List<Track> getTracks() {
		return tracks;
	}
	public void setTracks(List<Track> tracks) {
		this.tracks = tracks;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}

	public Artist() {
		super();
	}
	
	public void set(Artist a) {
		this.setEmail(a.getEmail());
		this.setFollowee(a.getFollowee());
		this.setFollows(a.getFollows());
		this.setPlaylists(a.getPlaylists());
		this.setLikedTracks(a.getLikedTracks());
		this.setUsername(a.getUsername());
		this.setPassword(a.getPassword());
		this.setAlbums(a.getAlbums());
		this.setTracks(a.getTracks());
	}
	
}
