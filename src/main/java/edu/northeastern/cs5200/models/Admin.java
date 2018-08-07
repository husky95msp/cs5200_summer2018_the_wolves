package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;

@Entity
public class Admin extends User{

	private String admin_name;
	public Admin(String username, String password, String email, List<Playlist> playlists, List<User> follows,
			List<User> follower, List<Track> likedTracks, String admin_name) {
		super(username, password, email, playlists, follows, follower, likedTracks);
		this.admin_name = admin_name;
	}
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getAdmin_name() {
		return admin_name;
	}
	public void setAdmin_name(String admin_name) {
		this.admin_name = admin_name;
	}	
}
