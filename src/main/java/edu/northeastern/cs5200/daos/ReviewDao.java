package edu.northeastern.cs5200.daos;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.models.Review;
import edu.northeastern.cs5200.models.Reviewer;
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
	
	public Review addReviewForTrack(int reviewer_id, String track_id, Review r) {
		if(rd.findReviewerById(reviewer_id).isPresent()) {
			if(td.findBySpotifyId(track_id).isPresent()) {
				Track t = td.findBySpotifyId(track_id).get();
				t.getReviews().add(r);
				td.updateTrack(t.getSpotify_id(), t);
				rd.findReviewerById(reviewer_id).get().getReviews().add(r);
				rd.updateReviewer(rd.findReviewerById(reviewer_id).get().getId(),
						rd.findReviewerById(reviewer_id).get());
				r.setTrack(t);
				r.setReviewer(rd.findReviewerById(reviewer_id).get());
				return createReview(r);
			}
			else {
				Track t = new Track();
				t.setSpotify_id(track_id);
				t.setName("My track");
				td.createTrack(t);
				t.getReviews().add(r);
				td.updateTrack(t.getSpotify_id(), t);
				rd.findReviewerById(reviewer_id).get().getReviews().add(r);
				rd.updateReviewer(rd.findReviewerById(reviewer_id).get().getId(),
						rd.findReviewerById(reviewer_id).get());
				r.setTrack(t);
				r.setReviewer(rd.findReviewerById(reviewer_id).get());
				return createReview(r);
			}
		}
		return null;
	}
	
	public List<Review> getAllReviewsForTrack(String track_id) {
		Optional<Track> t = td.findBySpotifyId(track_id);
		if(t.isPresent()) {
			return t.get().getReviews();
		}
		return new ArrayList<>();
	}
	
	public List<Review> getAllReviewsByReviewer(int reviewer_id) {
		Optional<Reviewer> r = rd.findReviewerById(reviewer_id);
		if(r.isPresent()) {
			return r.get().getReviews();
		}
		return null;
	}
	
	public void deleteReview(int id) {
		Optional<Review> r = rr.findById(id);
		if(r.isPresent()) {
			Track t = r.get().getTrack();
			Reviewer rev = r.get().getReviewer();
			
			List<Review> revs = t.getReviews();
			revs.remove(r.get());
			t.setReviews(revs);
			td.updateTrack(t.getSpotify_id(), t);
			
			revs = rev.getReviews();
			revs.remove(r.get());
			rev.setReviews(revs);
			rd.updateReviewer(rev.getId(), rev);
			
			rr.deleteById(id);
		}
	}
}
