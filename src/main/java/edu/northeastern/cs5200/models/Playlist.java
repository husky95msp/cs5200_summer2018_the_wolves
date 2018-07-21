package edu.northeastern.cs5200.models;

public class Playlist {

	private int id;
	private int user_id;
	private int track_spotify_id;
	private String name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getTrack_spotify_id() {
		return track_spotify_id;
	}
	public void setTrack_spotify_id(int track_spotify_id) {
		this.track_spotify_id = track_spotify_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Playlist(int id, int user_id, int track_spotify_id, String name) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.track_spotify_id = track_spotify_id;
		this.name = name;
	}
	public Playlist() {
		super();
	}
}
