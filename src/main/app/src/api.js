import store from './store';
// import $ from 'jquery';
import request from 'request'; // "Request" library
class TheServer {

  unlikeSong(userId, song){
    console.log("unliked");
  }
  likeSong(userId, song){

    fetch('/api/user/'+userId+'/addtrack',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(song)
    })
    .then(()=> {
      store.dispatch({
        type:'UPDATE_LIKED_SONGS',
        data: song,
      });
    })


  }
  getLikedSongs(user){
    fetch('/api/user/'+user.id+'/likedtracks')
    .then(response => response.json())
    .then(dat => {
      dat.map((mySong, i)=>{

        dat[i]['like']= true;


      });
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

    var options = {
      url: 'https://api.spotify.com/v1/search?q='+key+'&type=track',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, (error, response, body)=> {
      body.tracks.items.map((song, index) =>{
        body.tracks.items[index]['like']= false;
        body.tracks.items[index]['spotify_id']= body.tracks.items[index].id;
        body.tracks.items[index]['album_name']= body.tracks.items[index].album.name;
        body.tracks.items[index]['album_art']= body.tracks.items[index].album.images[0].url;
      });
      if (session){
      body.tracks.items.map((song, index) =>{
        session.likedTracks.map((mySong, i)=>{
          if(song.id===mySong.spotify_id){
            body.tracks.items[index]['like']= true;

          }

        });

        return null;
      });
    }
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
