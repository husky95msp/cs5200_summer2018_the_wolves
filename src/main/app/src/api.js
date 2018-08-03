import store from './store';
// import $ from 'jquery';
import request from 'request'; // "Request" library
class TheServer {
  likeSong(userId, song){
    fetch('/api/user/'+userId+'/addtrack',{
      headers: {
     'Content-Type': 'application/json'
   },
      method: 'post',
      body: JSON.stringify({'spotify_id': song.id, 'title': song.name, 'uri': song.uri, 'album_name': song.album.name})
    })
        .then(response => response.json())
        .then(response => {return response});

  }
  getLikedSongs(user){
    fetch('/api/user/'+user.id+'/likedtracks')
        .then(response => response.json())
        .then(dat => {
          store.dispatch({
            type: 'GET_LIKED_SONGS',
            data: dat,
          });

        });
  }
  initializeUserData(user){
    this.getLikedSongs(user);
  }
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
            this.initializeUserData(dat.User)
            store.dispatch({
              type: 'LOGIN_SUCCESS',
              data: dat.User,
            });
          }

          store.dispatch({
            type: 'UPDATE_LOGIN_FORM_LABEL',
            data: {label : dat.status},
          });

        });

  }

  getSongsByArtist(token, key, session){
    // props.songs.map((song,index)=>{
    //   props.session.likedtracks.map((mysong)={
    //     if (mysong.spotify_id === song.id){
    //       body.tracks.items[index]['like']= false;
    //     }
    //   });
    // });
    console.log(session);
    var options = {
      url: 'https://api.spotify.com/v1/search?q='+key+'&type=track',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, (error, response, body)=> {
      body.tracks.items.map((song, index) =>{
          session.likedTracks.map((mySong, i)=>{
            if(song.id===mySong.spotify_id){
              body.tracks.items[index]['like']= true;
            return null;
          }
          body.tracks.items[index]['like']= false;
          });

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
