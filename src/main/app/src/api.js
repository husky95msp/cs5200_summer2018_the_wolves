import store from './store';
// import $ from 'jquery';
import request from 'request'; // "Request" library

class TheServer {
  updateMember(user){
    fetch('/api/user/'+user.id,{
      headers:{'Content-Type': 'application/json'},
      method: 'PUT',
      body: JSON.stringify(user)
    })
  }
  deleteMember(member){
    fetch('/api/user/'+member.id,{
      headers:{'Content-Type': 'application/json'},
      method: 'DELETE',
      body: JSON.stringify(member)
    })
    // .then(response => response.json());
    .then(()=>{
      store.dispatch({
        type: 'DELETE_USER',
        data: member,
      });
    });
  }
  ///////////////////////////////////////////////////////////////
  // Album

  addTrackToAlbum(id, track){
    fetch('/api/album/'+id+'/add_track/',{
      headers:{'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(track)
    })
    .then((track)=>track.json())
    .then((track)=>{
      store.dispatch({
        type: 'TOGGLE_CREATE_TRACK_FOR_ALBUM'
      });
      store.dispatch({
        type: 'UPDATE_ALBUM_TRACK',
        data: track
      });
    })
  }

  deleteTrackFromAlbum(aid, track){
    fetch('/api/album/'+aid+'/delete_track/',{
      headers:{'Content-Type': 'application/json'},
      method: 'delete',
      body: JSON.stringify(track)
    });
  }
  getTracksForAlbum(p, session){
    fetch('/api/album/'+p.id+'/get_tracks')
    .then(response => response.json())
    .then(dat => {
      if(session){
        dat.map((pSong, i)=>pSong['like']= false);
        session.likedTracks.map((mySong, j)=>{
          dat.map((pSong, i)=>{
            if(pSong.spotify_id===mySong.spotify_id){
              pSong['like']= true;
            }
          });
        });
      }
      store.dispatch({
        type: 'CURRENT_ALBUM_VIEW',
        data: dat,
      });
      store.dispatch({
        type: 'CURRENT_ALBUM_TITLE',
        data: p,
      });
    });
  }
  createAlbum(data, id){
    fetch('/api/artist/'+id+'/create_album',{
      headers:{'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((response)=>{
      if (response){

        store.dispatch({
          type: 'ADD_NEW_ALBUM',
          data: response,
        });
      }
    });
  }
  ///////////////////////////////////////////////////////////////

  addTrackToPlaylist(id, track){
    fetch('/api/playlist/addtrack/'+id,{
      headers:{'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(track)
    });
  }
  deleteTrackFromPlaylist(pid, track){
    fetch('/api/playlist/delete_track/'+pid,{
      headers:{'Content-Type': 'application/json'},
      method: 'delete',
      body: JSON.stringify(track)
    });
  }
  getTracksForPlaylist(p, session){
    fetch('/api/playlist/tracks/'+p.id)
    .then(response => response.json())
    .then(dat => {
      if(session){
        dat.map((pSong, i)=>pSong['like']= false);
        session.likedTracks.map((mySong, j)=>{
          dat.map((pSong, i)=>{
            if(pSong.spotify_id===mySong.spotify_id){
              pSong['like']= true;
            }
          });
        });
      }
      store.dispatch({
        type: 'CURRENT_PLAYLIST_VIEW',
        data: dat,
      });
      store.dispatch({
        type: 'CURRENT_PLAYLIST_TITLE',
        data: p,
      });
    });
  }
  createPlaylist(data, id){
    fetch('/api/user/playlist/'+id,{
      headers:{'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((response)=>{
      if (response){

        store.dispatch({
          type: 'ADD_NEW_PLAYLIST',
          data: response,
        });
      }
    });
  }
  createMember(data){
    if (data.type === "User"){
      this.createUser(data);
    }else if(data.type === "Artist"){
      this.createArtist(data);
    }else{
      this.createReviewer(data);
    }
  }
  createUser(data){
    fetch('/api/user/',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    .then(()=> {
      store.dispatch({
        type:'ACCOUNT_CREATED',

      });
    });
  }
  createArtist(data){
    fetch('/api/artist/',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    .then(()=> {
      store.dispatch({
        type:'ACCOUNT_CREATED',

      });
    });
  }
  createReviewer(data){
    fetch('/api/reviewer/',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    .then(()=> {
      store.dispatch({
        type:'ACCOUNT_CREATED',

      });
    });
  }
  deleteReview(id){
    fetch('/api/review/'+id+'/delete',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      body: null,
    })
    .then(()=> {
      store.dispatch({
        type:'REMOVE_FROM_REVIEW_LIST',
        data: id,
      });
    })
  }
  submitReview(review, reviewer_id, track_id, track){
    fetch('/api/track',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(track)
    })
    .then((response)=>response.json())
    .then((track)=>{
      fetch('/api/review/'+reviewer_id+'/'+track_id,{
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(review)
      })
      .then(response => response.json())
      .then((resp)=> {
        store.dispatch({
          type:'UPDATE_REVIEW_LIST',
          data: resp,
        });
      })});
    }

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
      console.log(userId);
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
    getPlaylists(user){
      fetch('/api/user/all_playlists/'+user.id)
      .then(response => response.json())
      .then(dat => {

        store.dispatch({
          type: 'GET_ALL_PLAYLISTS',
          data: dat,
        });

      });
    }
    getAlbums(user){
      fetch('/api/artist/'+user.id+'/get_albums')
      .then(response => response.json())
      .then(dat => {

        store.dispatch({
          type: 'GET_ALL_ALBUMS',
          data: dat,
        });

      });
    }
    initializeUserData(user){

      this.getLikedSongs(user);
      this.getFollowers(user);
      this.getFollows(user);
      this.getPlaylists(user);
      if(user.type === 'Artist') this.getAlbums(user);

    }
    getAllUsers(){
      return fetch('/api/admin/all_users').then((response)=> response.json());
    }
    getUserById(id, session){

      return fetch('/api/user/'+id)
      .then((response)=> response.json())
      .then((dat)=>{
        dat['follower']= false;
        dat['followee']= false;
        session.followers.map((follower,j)=>{
          if(follower.id == dat.id){
            dat['follower']= true;
          }
        });
        session.followees.map((followee,j)=>{
          if(followee.id == dat.id){
            dat['followee']= true;
          }
        });
        return dat;
      })

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
          store.dispatch({
            type: 'USER_TYPE',
            data: dat.type,
          });
          if(dat.type === "Admin"){
            this.getAllUsers()
            .then((response)=>{
              store.dispatch({
                type: 'GET_ALL_USERS',
                data: response,
              });
            });

          }
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


    getSongById(token, key, session){
      let track = null;
      var options = {
        url: 'https://api.spotify.com/v1/tracks/'+key,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, (error, response, body)=> {
        if(parseInt(response.statusCode) === 200){
          body['like']= false;
          body['spotify_id']= body.id;
          body['album_name']= body.album.name;
          body['album_art']= body.album.images[0].url;
          if(session){
            session.likedTracks.map((mySong, i)=>{
              if(body.id===mySong.spotify_id){
                body['like']= true;
              }
            });
          }
          return this.getReviewsByTrackId(body);
        }
      });


    }


    getReviewsByTrackId(track){
      fetch('/api/review/track/'+track.spotify_id)
      .then(response => (response? response.json(): null))
      .then(dat => {
        track['reviews'] = dat;
        store.dispatch({
          type: 'GET_A_SONG',
          data: track,
        });
      });
      return track;
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
