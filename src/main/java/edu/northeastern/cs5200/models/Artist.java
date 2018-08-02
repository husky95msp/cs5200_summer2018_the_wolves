package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

@Entity
public class Artist extends User{
	
	private String image;

	@OneToMany(mappedBy="artist", fetch=FetchType.LAZY)
	private List<Album> albums;
	
	@OneToMany(mappedBy="artist", fetch=FetchType.LAZY)
	private List<Track> tracks;
	
	
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}

	public Artist() {
		super();
	}
	
}
