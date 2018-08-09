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
	
	
	public Artist(String username, String password, String email, List<Playlist> playlists, List<User> follows,
			List<User> follower, List<Track> likedTracks, String image, List<Album> albums) {
		super(username, password, email, playlists, follows, follower, likedTracks);
		this.image = image;
		this.albums = albums;
	}
	public List<Album> getAlbums() {
		return albums;
	}
	public void setAlbums(List<Album> albums) {
		this.albums = albums;
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
		this.setFollower(a.getFollower());
		this.setFollows(a.getFollows());
		this.setPlaylists(a.getPlaylists());
		this.setLikedTracks(a.getLikedTracks());
		this.setUsername(a.getUsername());
		this.setPassword(a.getPassword());
		this.setAlbums(a.getAlbums());
	}
	
}
