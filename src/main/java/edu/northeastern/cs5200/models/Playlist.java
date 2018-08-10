package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Playlist {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "TrackPlaylist",
	joinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id" ),
	inverseJoinColumns = @JoinColumn(name = "track_id", referencedColumnName = "spotify_id"))
	@JsonIgnore
	private List<Track> tracks = new ArrayList<Track>();
	
	@ManyToOne
	@JsonIgnore
	private User creator;

	public Playlist(String name, List<Track> tracks, User creator) {
		super();
		this.name = name;
		this.tracks = tracks;
		this.creator = creator;
	}

	public Playlist() {
		super();
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

	public List<Track> getTracks() {
		return tracks;
	}

	public void setTracks(List<Track> tracks) {
		this.tracks = tracks;
	}

	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

	public void set(Playlist p) {
		this.setName(p.getName());
		this.setCreator(p.getCreator());
		this.setTracks(p.getTracks());
	}
}
