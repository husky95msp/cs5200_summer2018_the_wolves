import store from './store';
import $ from 'jquery';
import request from 'request'; // "Request" library
class TheServer {

  getSongsByArtist(token, key){
    var token = token;
    var options = {
      url: 'https://api.spotify.com/v1/search?q='+key+'&type=track',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
      store.dispatch({
        type: 'GET_SONGS',
        data: body,
      });
    });
  }
  authenticate(){

  fetch('http://localhost:8080/authenticate')
      .then(response => response.json())
      .then(dat => {
        store.dispatch({
          type: 'TOKEN',
          data: dat.access_token,
        });

      });
  }
}

export default new TheServer();
