package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Track {
	
	
//	private int id;
	
	@Id
	private String spotify_id;
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
	private List<User> likes;
	
	@ManyToOne
	private Album album;
	
	@ManyToOne
	private Artist artist;
	
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
	public Track(String spotify_id, String track_data) {
		super();
	
		this.spotify_id = spotify_id;
		this.track_data = track_data;
	}
	public Track() {
		super();
	}
}
