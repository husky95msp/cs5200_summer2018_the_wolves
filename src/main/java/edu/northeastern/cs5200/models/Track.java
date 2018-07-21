package edu.northeastern.cs5200.models;

public class Track {
	private int id;
	private String spotify_id;
	private String track_data;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public Track(int id, String spotify_id, String track_data) {
		super();
		this.id = id;
		this.spotify_id = spotify_id;
		this.track_data = track_data;
	}
	public Track() {
		super();
	}
}
