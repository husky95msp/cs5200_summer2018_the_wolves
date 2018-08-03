package edu.northeastern.cs5200.models;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
//		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//		String encryptedPass = bCryptPasswordEncoder.encode(password);
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Playlist> getPlaylists() {
		return playlists;
	}

	public void setPlaylists(List<Playlist> playlists) {
		this.playlists = playlists;
	}

	public List<User> getFollows() {
		return follows;
	}

	public void setFollows(List<User> follows) {
		this.follows = follows;
	}

	public List<User> getFollowee() {
		return followee;
	}

	public void setFollowee(List<User> followee) {
		this.followee = followee;
	}

	public List<Track> getLikedTracks() {
		return likedTracks;
	}

	public void setLikedTracks(List<Track> likedTracks) {
		this.likedTracks = likedTracks;
	}
	public Boolean checkPassword(String password) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder.matches(password, this.getPassword());
	}
	public User( String username, String password, String email, List<Playlist> playlists, List<User> follows,
			List<User> followee, List<Track> likedTracks) {
		super();
//		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//		String encryptedPass = bCryptPasswordEncoder.encode(password);
//		
		this.username = username;
		this.password = password;
		this.email = email;
		this.playlists = playlists;
		this.follows = follows;
		this.followee = followee;
		this.likedTracks = likedTracks;
	}

	public User() {
		super();
	}
	
	
	 
	
}
