package edu.northeastern.cs5200;

import java.io.UnsupportedEncodingException;
import java.util.Base64;




import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController
public class AuthService {

	@GetMapping("/")
	public String helloWorld() {
		return "Hello World";
	}
	
	
	@GetMapping("api/authenticate")
//	@CrossOrigin(origins = "http://localhost:3000")
	public String authenticate() throws UnsupportedEncodingException{
		
//		Variables;
		String client_id = "8bc5b5b1681a42a98a5d62d03d59686c"; // Your client id
		String client_secret = "4336477226a54bb7bb0bc3ffd97aa5d9"; // Your secret
		String key = Base64.getEncoder().encodeToString((client_id+":"+client_secret).getBytes("utf-8"));
		String url = "https://accounts.spotify.com/api/token";

//		Construct a RestTemplate
		RestTemplate restTemplate = new RestTemplate();


//		Initialize headers
		HttpHeaders headers = new HttpHeaders();

		headers.add("Authorization", "Basic "+key);
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		
//		Initialize Body
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("grant_type", "client_credentials");
		final HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<MultiValueMap<String, String>>(map, headers);
		
//		Convert Strings to JSON
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
//		Actual Post Request with all the above parameters
		ResponseEntity<String> token = restTemplate.exchange(url, HttpMethod.POST, entity, String.class );
				
		return token.getBody();
	}
}
