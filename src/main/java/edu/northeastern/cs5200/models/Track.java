package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Track {
	
	@Id
	private String spotify_id;
	private String name;
	private String album_name;
	private String uri;
	private String album_art;
	private int popularity;
	private String preview_url;
	
	@ManyToMany(mappedBy="tracks", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Playlist> playlist = new ArrayList<Playlist>();
	
//	@ManyToMany(fetch = FetchType.LAZY)
//	@JoinTable(name = "likes",
//	joinColumns = @JoinColumn(name = "track_id", referencedColumnName = "spotify_id" ),
//	inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
	@ManyToMany(mappedBy = "likedTracks", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<User> likes = new ArrayList<User>();
	
	@ManyToOne
	@JsonIgnore
	private Album album;
	
	@OneToMany(mappedBy = "track", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Review> reviews;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	
	public Track() {
		super();
	}
	
	public String getAlbum_art() {
		return album_art;
	}
	public void setAlbum_art(String album_art) {
		this.album_art = album_art;
	}
	public int getPopularity() {
		return popularity;
	}
	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}
	
	public void set(Track t) {
		this.setAlbum(t.getAlbum());
		this.setAlbum_name(t.getAlbum_name());
		this.setLikes(t.getLikes());
		this.setReviews(t.getReviews());
		this.setName(t.getName());
		this.setUri(t.getUri());
		this.setAlbum_art(t.getAlbum_art());
		this.setPopularity(t.getPopularity());
		this.setPlaylist(t.getPlaylist());
		this.setPreview_url(t.getPreview_url());
	}
	public String getPreview_url() {
		return preview_url;
	}
	public void setPreview_url(String preview_url) {
		this.preview_url = preview_url;
	}
}
