package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Review;
import edu.northeastern.cs5200.repositories.ReviewRepository;

@Component
public class ReviewDao {
	@Autowired
	ReviewRepository rr;
	
	public Review createReview(Review r) {
		return rr.save(r);
	}
	
	public List<Review> findAllReviews(){
		return (List<Review>) rr.findAll();
	}
	
	public Optional<Review> findReviewById(int id) {
		return rr.findById(id);
	}
	
	public void deleteReviewById(int id) {
		rr.deleteById(id);
	}
	
	public Review updateReview(int id, Review r) {
		Review temp = null;
		Optional<Review> opt = rr.findById(id);
		if(opt.isPresent())
			temp = opt.get();
		temp.set(r);
		return rr.save(temp);
	}
}
