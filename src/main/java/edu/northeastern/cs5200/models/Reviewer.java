package edu.northeastern.cs5200.models;

public class Reviewer extends User{
	private int id;
	private String org;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrg() {
		return org;
	}
	public void setOrg(String org) {
		this.org = org;
	}
	public Reviewer(int id, String username, String password, String email, int id2, String org) {
		super(id, username, password, email);
		id = id2;
		this.org = org;
	}
	public Reviewer() {
		super();
	}
}
