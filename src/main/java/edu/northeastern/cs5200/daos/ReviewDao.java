package edu.northeastern.cs5200.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Review;
import edu.northeastern.cs5200.models.Track;
import edu.northeastern.cs5200.repositories.ReviewRepository;

@Component
public class ReviewDao {
	@Autowired
	ReviewRepository rr;
	
	@Autowired
	ReviewerDao rd;
	
	@Autowired
	TrackDao td;
	
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
	
	public void addReviewForTrack(int reviewer_id, Track t, Review r) {
		if(rd.findReviewerById(reviewer_id).isPresent()) {
			if(td.findBySpotifyId(t.getSpotify_id()).isPresent()) {
				t.getReviews().add(r);
				td.updateTrack(t.getSpotify_id(), t);
				rd.findReviewerById(reviewer_id).get().getReviews().add(r);
				rd.updateReviewer(rd.findReviewerById(reviewer_id).get().getId(),
						rd.findReviewerById(reviewer_id).get());
				r.setTrack(t);
				r.setReviewer(rd.findReviewerById(reviewer_id).get());
				createReview(r);
			}
			else {
				td.createTrack(t);
				t.getReviews().add(r);
				td.updateTrack(t.getSpotify_id(), t);
				rd.findReviewerById(reviewer_id).get().getReviews().add(r);
				rd.updateReviewer(rd.findReviewerById(reviewer_id).get().getId(),
						rd.findReviewerById(reviewer_id).get());
				r.setTrack(t);
				r.setReviewer(rd.findReviewerById(reviewer_id).get());
				createReview(r);
			}
		}
	}
}
