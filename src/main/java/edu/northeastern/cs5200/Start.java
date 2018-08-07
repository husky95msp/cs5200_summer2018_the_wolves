package edu.northeastern.cs5200;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import edu.northeastern.cs5200.daos.AdminDao;
import edu.northeastern.cs5200.models.Admin;

public class Start implements CommandLineRunner{
	@Autowired
	AdminDao ad;
	
	public void run(String...args) {
		Admin a = new Admin("Admin","admin",null,null,null,null,null, "Admin");
		ad.createAdmin(a);
	}
	
	public static void main(String[] args) {
		SpotifyApplication.main(args);
	}
}
