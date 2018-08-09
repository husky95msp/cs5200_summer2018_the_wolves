package edu.northeastern.cs5200.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.ReviewDao;
import edu.northeastern.cs5200.models.Review;

@RestController
public class ReviewService {
	@Autowired
	ReviewDao rd;
	
	@PostMapping("/api/review/{reviewer_id}/{track_id}")
	public Review addReviewForTrack(@PathVariable("reviewer_id") int reviewer_id,
			@PathVariable("track_id") String track_id,
			@RequestBody Review r) {
		return rd.addReviewForTrack(reviewer_id, track_id, r);
	}
	
	@GetMapping("api/review/reviewer/{reviewer_id}")
	public List<Review> getReviewsByReviewer(@PathVariable("reviewer_id") int id){
		return rd.getAllReviewsByReviewer(id);
	}
	
	@GetMapping("api/review/track/{track_id}")
	public List<Review> getReviewsForTrack(@PathVariable("track_id") String id){
		return rd.getAllReviewsForTrack(id);
	}
	
	@DeleteMapping("api/review/{id}/delete")
	public void deleteReview(@PathVariable("id") int id) {
		rd.deleteReview(id);
	}
}
