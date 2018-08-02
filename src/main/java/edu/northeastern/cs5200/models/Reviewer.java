package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

@Entity
public class Reviewer extends User{
	
	private String org;
	
	@OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY)
	private List<Review> reviews;
	
	public String getOrg() {
		return org;
	}
	public void setOrg(String org) {
		this.org = org;
	}

	
	public Reviewer() {
		super();
	}
}
