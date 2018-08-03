package edu.northeastern.cs5200.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.models.Track;

public interface TrackRepository extends CrudRepository<Track, Integer>{

}
