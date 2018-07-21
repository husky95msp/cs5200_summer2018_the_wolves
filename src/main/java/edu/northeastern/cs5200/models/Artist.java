package edu.northeastern.cs5200.models;

public class Artist extends User{
	private int id;
	private int followers;
	private String image;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFollowers() {
		return followers;
	}
	public void setFollowers(int followers) {
		this.followers = followers;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Artist(int id, String username, String password, String email, int id2, int followers, String image) {
		super(id, username, password, email);
		id = id2;
		this.followers = followers;
		this.image = image;
	}
	public Artist() {
		super();
	}
	
}
