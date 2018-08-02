package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Album {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private int popularity;
	
	private String albumArt;
	
	@ManyToOne
	private Artist artist;
	
	@OneToMany(mappedBy="album", fetch = FetchType.LAZY)
	private List<Track> tracks;
	
	
}
