package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Reviewer extends User{
	
	private String org;
	
	@OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Review> reviews;
	
	public Reviewer(String username, String password, String email, List<Playlist> playlists, List<User> follows,
			List<User> follower, List<Track> likedTracks, String org, List<Review> reviews) {
		super(username, password, email, playlists, follows, follower, likedTracks);
		this.org = org;
		this.reviews = reviews;
	}
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	public String getOrg() {
		return org;
	}
	public void setOrg(String org) {
		this.org = org;
	}
	public Reviewer() {
		super();
	}
	
	public void set(Reviewer r) {
		this.setEmail(r.getEmail());
		this.setFollower(r.getFollower());
		this.setFollows(r.getFollows());
		this.setPlaylists(r.getPlaylists());
		this.setLikedTracks(r.getLikedTracks());
		this.setUsername(r.getUsername());
		this.setPassword(r.getPassword());
		this.setOrg(r.getOrg());
		this.setReviews(r.getReviews());
	}
}
