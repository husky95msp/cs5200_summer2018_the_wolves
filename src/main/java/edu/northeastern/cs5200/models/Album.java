package edu.northeastern.cs5200.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Album {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name;
	private int popularity;
	private String albumArt;
	
	@ManyToOne
	@JsonIgnore
	private Artist artist;
	
	@OneToMany(mappedBy="album", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Track> tracks;
	
	public Album() {
		super();
	}

	public Album(String name, int popularity, String albumArt, Artist artist, List<Track> tracks) {
		super();
		this.name = name;
		this.popularity = popularity;
		this.albumArt = albumArt;
		this.artist = artist;
		this.tracks = tracks;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPopularity() {
		return popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}

	public String getAlbumArt() {
		return albumArt;
	}

	public void setAlbumArt(String albumArt) {
		this.albumArt = albumArt;
	}

	public Artist getArtist() {
		return artist;
	}

	public void setArtist(Artist artist) {
		this.artist = artist;
	}

	public List<Track> getTracks() {
		return tracks;
	}

	public void setTracks(List<Track> tracks) {
		this.tracks = tracks;
	}
	
	public void set(Album a) {
		this.setAlbumArt(a.getAlbumArt());
		this.setArtist(a.getArtist());
		this.setName(a.getName());
		this.setPopularity(a.getPopularity());
		this.setTracks(a.getTracks());
	}
}
