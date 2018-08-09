package edu.northeastern.cs5200.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String review;
	
	public Review() {
		super();
	}

	public Track getTrack() {
		return track;
	}

	public void setTrack(Track track) {
		this.track = track;
	}

	public Review(String review, int rating, Reviewer reviewer, Track track) {
		super();
		this.review = review;
		this.rating = rating;
		this.reviewer = reviewer;
		this.track = track;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Reviewer getReviewer() {
		return reviewer;
	}

	public void setReviewer(Reviewer reviewer) {
		this.reviewer = reviewer;
	}

	private int rating;
	
	@ManyToOne
	//@JsonIgnore
	private Reviewer reviewer;
	
	@ManyToOne
	@JsonIgnore
	private Track track;
	
	public void set(Review r) {
		this.setRating(r.getRating());
		this.setReview(r.getReview());
		this.setReviewer(r.getReviewer());
		this.setTrack(r.getTrack());
	}
}
