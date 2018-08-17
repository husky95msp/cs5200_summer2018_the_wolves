package edu.northeastern.cs5200.models;

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
	private String firstName;
	private String lastName;
	private String username;
	private String password;
	private String email;
	private String type;
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@OneToMany(mappedBy = "creator", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	//@JsonIgnore
	private List<Playlist> playlists;
	
	@ManyToMany(mappedBy = "follows", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<User> follower;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "Follows",
	joinColumns = @JoinColumn(name = "follower_id", referencedColumnName = "id" ),
	inverseJoinColumns = @JoinColumn(name = "followee_id", referencedColumnName = "id"))
	@JsonIgnore
	 private List<User> follows;
	
//	@ManyToMany(mappedBy = "likes", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	//@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "likes",
	joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id" ),
	inverseJoinColumns = @JoinColumn(name = "track_id", referencedColumnName = "spotify_id"))
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

	public List<User> getFollower() {
		return follower;
	}

	public void setFollower(List<User> followee) {
		this.follower = followee;
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
			List<User> follower, List<Track> likedTracks) {
		super();
//		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//		String encryptedPass = bCryptPasswordEncoder.encode(password);
//		
		this.username = username;
		this.password = password;
		this.email = email;
		this.playlists = playlists;
		this.follows = follows;
		this.follower = follower;
		this.likedTracks = likedTracks;
	}

	public User() {
		super();
	}
	
	public void set(User u) {
		this.setEmail(u.getEmail());
		this.setFirstName(u.getFirstName());
		this.setLastName(u.getLastName());
		this.setUsername(u.getUsername());
		this.setPassword(u.getPassword());
	}

	public String getType() {
		return type;
	}

	public void setType() {
		this.type = this.getClass().getSimpleName();
	}
	 
	
}
