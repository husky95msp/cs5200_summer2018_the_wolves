import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter , ListGroupItem ,ListGroup} from 'reactstrap';
// import Ratings from 'ratings';
import {Link} from 'react-router-dom';
import api from 'api.js';



class Song extends React.Component {
  constructor(props){
    super(props);
    this.preview = new Audio(this.props.song.preview_url);
    this.state = {
      play: false,
      playlistAdd: false,
    };
  }
  render(){
    let likeSong= ()=>{
      if (this.props.session){
        this.props.dispatch({type: 'LIKE_SONG', data: this.props.song});
        if (!this.props.song.like){
          api.likeSong(this.props.session.id, this.props.song);
        }else{
          api.unlikeSong(this.props.session.id, this.props.song);
        }
      }
      else{
        this.props.dispatch({type: 'TOGGLE_LOGIN_POPPER', data: this.props.song});


      }
    }
    let deleteSong=()=>{
      api.deleteTrackFromAlbum(this.props.albumForm.album.id, this.props.song)
      this.props.dispatch({type: 'DELETE_SONG_FROM_ALBUM', data: this.props.song});

    }
    let preview = new Audio(this.props.song.preview_url);
    // let trigger = false;
    let play = ()=>{
      this.setState({play: true});
      // trigger = true;
      this.preview.play();
    }
    let playlistSelect = ()=>{
      this.setState({playlistAdd: !this.state.playlistAdd});
      // trigger = true;

    }
    let pause = ()=>{
      // trigger = false;/
      this.setState({play: false});

      this.preview.pause();

    }
    let addToPlaylist = (id)=>{
      setTimeout(()=>this.setState({playlistAdd: false}), 300);
      api.addTrackToPlaylist(id, this.props.song);
    }
    return(
      <li className="show slide-fade list-group-item track-tile mb-1" key={this.props.song.spotify_id}>
        <div className="d-flex justify-content-left flex-row flex-nowrap">
          <div className="track-poster ">
            <img alt="cover" src={this.props.song.album_art} className="rounded-circle align-self-center"/>
          </div>

          <div className="track-info">
            <Link to={"/tracks/"+this.props.song.spotify_id}>
              <h5 className="track-name">{this.props.song.name}</h5>
            </Link>
            <div className="track-popularity">Popularity: {this.props.song.popularity}</div>
            <div className="track-album">Album: {this.props.song.album_name}</div>

          </div>
        </div>
        <div className="track-icons">

          {this.props.session?<div className="play-btn"  onClick={playlistSelect}>
          <i className="material-icons play" id={this.props.song.spotify_id}>playlist_add</i>

        </div>:<div></div>}
        <Modal isOpen={this.state.playlistAdd} toggle={playlistSelect} backdrop={false} >

          <ModalHeader toggle={playlistSelect}>Add to Playlist</ModalHeader>
          <ListGroup  className="playlist-pop">
            {this.props.playlists.length === 0? <ModalBody> No playlists created yet.</ModalBody>: <span></span>}
            {this.props.playlists.map((playlist)=><ListGroupItem action onClick={()=>addToPlaylist(playlist.id)}  key={playlist.id}>
              {playlist.name}</ListGroupItem>)}

          </ListGroup>
        </Modal>

        {this.props.song.preview_url?<div className="play-btn">
          {!this.state.play?<div className="" onClick={play}><i className="material-icons play">play_circle_outline</i></div>:
          <div className="" onClick={pause}> <i className="material-icons play">pause_circle_outline</i></div>}
          </div>: <div></div>}

          <div onClick={likeSong} className="like">
            {this.props.song.like?  <i className="material-icons like-btn like-active" >star</i> : <i className="material-icons like-btn " >star_border</i>}
          </div>
          <div onClick={deleteSong} className="delete">
            <i className="material-icons like-btn " >delete</i>
          </div>
        </div>
      </li>);
    }
  }

  export default connect((state)=> state)(Song);
