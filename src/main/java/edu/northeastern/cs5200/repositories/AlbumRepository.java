package edu.northeastern.cs5200.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.models.Album;

public interface AlbumRepository extends CrudRepository<Album, Integer>{

}
