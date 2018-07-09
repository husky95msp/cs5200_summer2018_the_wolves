package edu.northeastern.cs5200;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.List;



import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController
public class AuthService {
	
	
	@GetMapping("/authenticate")
	@CrossOrigin(origins = "http://localhost:3000")
	public String authenticate() throws UnsupportedEncodingException{
		
//		Request token;
		String client_id = "8bc5b5b1681a42a98a5d62d03d59686c"; // Your client id
		String client_secret = "4336477226a54bb7bb0bc3ffd97aa5d9"; // Your secret
		String key = Base64.getEncoder().encodeToString((client_id+":"+client_secret).getBytes("utf-8"));
		String url = "https://accounts.spotify.com/api/token";
		System.out.println(key);
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Basic "+key);
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		
		
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("grant_type", "client_credentials");
		final HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<MultiValueMap<String, String>>(map ,
		        headers);
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		ResponseEntity<String> token = restTemplate.exchange(url, HttpMethod.POST, entity, String.class );
		
		String a = token.getBody();
		System.out.println(token.getBody());
		return a;
	}
}
