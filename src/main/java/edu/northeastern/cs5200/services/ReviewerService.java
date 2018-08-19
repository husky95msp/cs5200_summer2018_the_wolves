package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.ReviewerDao;
import edu.northeastern.cs5200.models.Reviewer;

@RestController
public class ReviewerService {
	
	@Autowired
	ReviewerDao rd;
	
	@GetMapping("/api/reviewer")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public List<Reviewer> findAllReviewers() {

		return rd.findAllReviewers();
	}

	@PostMapping("/api/reviewer")
	@CrossOrigin(origins = "http://cs5200-summer-wolves-spp.s3-website-us-east-1.amazonaws.com")
	public Reviewer createReviewer(@RequestBody Reviewer r) {
		return rd.createReviewer(r);
	}

}
