package edu.northeastern.cs5200.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.Track;
import edu.northeastern.cs5200.models.User;

public interface TrackRepository extends CrudRepository<Track, Integer>{
    @Query("SELECT t FROM Track t WHERE t.spotify_id=:id")
    public Optional<Track> findBySpotifyId(
            @Param("id")String id);	
}
