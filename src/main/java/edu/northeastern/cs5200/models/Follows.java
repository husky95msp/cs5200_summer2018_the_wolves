package edu.northeastern.cs5200.models;

public class Follows {
	private int id;
	private int follower;
	private int followee;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFollower() {
		return follower;
	}
	public void setFollower(int follower) {
		this.follower = follower;
	}
	public int getFollowee() {
		return followee;
	}
	public void setFollowee(int followee) {
		this.followee = followee;
	}
	public Follows(int id, int follower, int followee) {
		super();
		this.id = id;
		this.follower = follower;
		this.followee = followee;
	}
	public Follows() {
		super();
	}
}
