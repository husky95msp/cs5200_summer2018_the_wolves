package edu.northeastern.cs5200.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.models.User;

public interface UserRepository  extends CrudRepository<User, Integer> {
    @Query("SELECT d FROM User d WHERE d.username=:username")
    public Iterable<User> findByUserName(
            @Param("username")String username);	
}