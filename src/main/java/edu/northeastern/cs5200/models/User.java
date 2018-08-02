package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
	private String email;
	
	@OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
	private List<Playlist> playlists;
	
	@ManyToMany(mappedBy = "followee", fetch = FetchType.LAZY)
	private List<User> follows;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "Follows",
	joinColumns = @JoinColumn(name = "follower_id", referencedColumnName = "id" ),
	inverseJoinColumns = @JoinColumn(name = "followee_id", referencedColumnName = "id"))
	@JsonIgnore
	 private List<User> followee;
	
	@ManyToMany(mappedBy = "likes", fetch = FetchType.LAZY)
	private List<Track> likedTracks;
	
	
	 
	
}
