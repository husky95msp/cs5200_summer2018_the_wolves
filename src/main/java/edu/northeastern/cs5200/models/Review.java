package edu.northeastern.cs5200.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String review;
	
	private int rating;
	
	@ManyToOne
	private Reviewer reviewer;
	

}
