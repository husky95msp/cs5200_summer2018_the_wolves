package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Track {
	
	@Id
	private String spotify_id;
	private String title;
	private String album_name;
	private String uri;
	private String track_data;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "TrackPlaylist",
	joinColumns = @JoinColumn(name = "track_id", referencedColumnName = "spotify_id" ),
	inverseJoinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id"))
	@JsonIgnore
	private List<Playlist> playlist;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "likes",
	joinColumns = @JoinColumn(name = "track_id", referencedColumnName = "spotify_id" ),
	inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
	@JsonIgnore
	private List<User> likes = new ArrayList<User>();
	
	@ManyToOne
	private Album album;
	
	@ManyToOne
	private Artist artist;
	
	@OneToMany(mappedBy = "track", fetch = FetchType.LAZY)
	private List<Review> reviews;
	
	 
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAlbum_name() {
		return album_name;
	}
	public void setAlbum_name(String album_name) {
		this.album_name = album_name;
	}
	public String getUri() {
		return uri;
	}
	public void setUri(String uri) {
		this.uri = uri;
	}
	public List<Playlist> getPlaylist() {
		return playlist;
	}
	public void setPlaylist(List<Playlist> playlist) {
		this.playlist = playlist;
	}
	public List<User> getLikes() {
		return likes;
	}
	public void setLikes(List<User> likes) {
		this.likes = likes;
	}
	public Album getAlbum() {
		return album;
	}
	public void setAlbum(Album album) {
		this.album = album;
	}
	public Artist getArtist() {
		return artist;
	}
	public void setArtist(Artist artist) {
		this.artist = artist;
	}
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	public String getSpotify_id() {
		return spotify_id;
	}
	public void setSpotify_id(String spotify_id) {
		this.spotify_id = spotify_id;
	}
	public String getTrack_data() {
		return track_data;
	}
	public void setTrack_data(String track_data) {
		this.track_data = track_data;
	}
	
	public Track() {
		super();
	}
}
