import store from './store';
// import $ from 'jquery';
import request from 'request'; // "Request" library
class TheServer {
  follow(u1, u2){
    fetch('/api/user/'+u1+'/'+u2);
  }
  unfollow(u1, u2){
    fetch('/api/user/'+u1+'/'+u2+'/unfollow');
  }
  loadNextPage(next, token, session){
    var options = {
      url: next,
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
        type: 'APPEND_SONGS',
        data: body,
      });
    });
  }
  getUsersByName(name){
    let state = store.getState();
    fetch('/api/user/key/'+name)
    .then(response => response.json())
    .then(dat => {
      dat.map((user, i)=>{
        dat[i]['follower']= false;
        dat[i]['followee']= false;
        state.session.followers.map((follower,j)=>{
          if(follower.id == user.id){
            dat[i]['follower']= true;
          }
        });
        state.session.followees.map((followee,j)=>{
          if(followee.id == user.id){
            dat[i]['followee']= true;
          }
        });
      });
      store.dispatch({
        type: 'USER_SEARCH_RESULTS',
        data: dat,
      });

    });
  }
  unlikeSong(userId, song){
    fetch('/api/user/'+userId+'/deletetrack',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      body: JSON.stringify(song)
    })
    // .then(()=> {
    //   store.dispatch({
    //     type:'UPDATE_LIKED_SONGS',
    //     data: song,
    //   });
    // })
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
  getFollowers(user){
    fetch('/api/user/'+user.id+'/followers')
    .then(response => response.json())
    .then(dat => {
      dat.map((user, i)=>dat[i]['follower']= true);
      store.dispatch({
        type: 'GET_FOLLOWERS',
        data: dat,
      });

    });
  }
  getFollows(user){
    fetch('/api/user/'+user.id+'/following')
    .then(response => response.json())
    .then(dat => {
      dat.map((user, i)=>dat[i]['followee']= true);
      store.dispatch({
        type: 'GET_FOLLOWEES',
        data: dat,
      });

    });
  }
  initializeUserData(user){
    this.getLikedSongs(user);
    this.getFollowers(user);
    this.getFollows(user);
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
        this.initializeUserData(dat.user)
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

  getSongsByArtist(token, kf, session){
    // props.songs.map((song,index)=>{
    //   props.session.likedtracks.map((mysong)={
    //     if (mysong.spotify_id === song.id){
    //       body.tracks.items[index]['like']= false;
    //     }
    //   });
    // });

    var options = {
      url: 'https://api.spotify.com/v1/search?q='+kf.key+'&type=track',
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
