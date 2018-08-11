package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Review;
import edu.northeastern.cs5200.models.Reviewer;
import edu.northeastern.cs5200.repositories.ReviewerRepository;

@Component
public class ReviewerDao {
	@Autowired
	ReviewerRepository rr;
	
	public Reviewer createReviewer(Reviewer r) {
		r.setType();
		return rr.save(r);
	}
	
	public List<Reviewer> findAllReviewers(){
		return (List<Reviewer>) rr.findAll();
	}
	
	public Optional<Reviewer> findReviewerById(int id) {
		return rr.findById(id);
	}
	
	public List<Review> getReviewsByReviewer(int id){
		Optional<Reviewer> opt = rr.findById(id);
		if(opt.isPresent())
			return opt.get().getReviews();
		return null;
	}
	
	public void deleteAllReviewers() {
		rr.deleteAll();
	}
	
	public void deleteReviewerById(int id) {
		rr.deleteById(id);
	}
	
	public Reviewer updateReviewer(int id, Reviewer r) {
		Reviewer temp = null;
		Optional<Reviewer> opt = rr.findById(id);
		if(opt.isPresent())
			temp = opt.get();
		temp.set(r);
		return rr.save(temp);
	}
}
