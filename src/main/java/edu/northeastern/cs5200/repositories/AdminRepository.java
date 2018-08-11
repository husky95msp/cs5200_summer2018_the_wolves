package edu.northeastern.cs5200.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.models.Admin;
import edu.northeastern.cs5200.models.User;

public interface AdminRepository extends CrudRepository<Admin, Integer>{
	@Query("select u from User u where u.type <> 'Admin'")
	public List<User> findAllUsers();
}
