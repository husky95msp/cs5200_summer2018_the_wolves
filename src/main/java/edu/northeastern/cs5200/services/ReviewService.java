package edu.northeastern.cs5200.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.ReviewDao;

@RestController
public class ReviewService {
	@Autowired
	ReviewDao rd;
	
	@PostMapping("/api/")
}
