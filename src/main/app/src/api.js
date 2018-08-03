import store from './store';
// import $ from 'jquery';
import request from 'request'; // "Request" library
class TheServer {

  authenticateUser(username, password){

    fetch('/api/user/authenticate',{
      headers: {
     'Content-Type': 'application/json'
   },
      method: 'post',
      body: JSON.stringify({'username': username, 'password': password})
    })
        .then(response => response.json())
        .then(dat => {
          if(dat.status === 200){
            store.dispatch({
              type: 'LOGIN_SUCCESS',
              data: dat.user,
            });
          }

          store.dispatch({
            type: 'UPDATE_LOGIN_FORM_LABEL',
            data: {label : dat.status},
          });

        });

  }

  getSongsByArtist(token, key){

    var options = {
      url: 'https://api.spotify.com/v1/search?q='+key+'&type=track',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      body.tracks.items.map((song, index) =>{
          body.tracks.items[index]['like']= false;
          return null;
      });
      store.dispatch({
        type: 'GET_SONGS',
        data: body,
      });
    });
  }


  getSongById(token, key){

    var options = {
      url: 'https://api.spotify.com/v1/tracks/'+key,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      if(parseInt(response.statusCode) === 200){

        return body;
      }
      else{
        return null;
      }
    });
  }

  authenticate(){

  fetch('/api/authenticate')
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
