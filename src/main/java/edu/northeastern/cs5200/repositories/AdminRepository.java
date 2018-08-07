package edu.northeastern.cs5200.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.models.Admin;

public interface AdminRepository extends CrudRepository<Admin, Integer>{

}
