import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';
// import {Button} from 'reactstrap';
// import Ratings from 'ratings';
import api from 'api.js';



function TrackView(props){
  let song= {};
  if (props.songs){
    song = props.songs.tracks.items.find((element)=>{
      return (element.id == props.songId);
    });

  }
  return(
    <div className="container card card-body">

      <div className="d-flex" key={song.id}>
        <div className="d-flex justify-content-left flex-row flex-nowrap">
          <div className="track-poster">
            <img alt="cover" src={song.album.images[0].url} className="rounded-circle align-self-center"/>
          </div>

          <div className="track-info">
              <h5 className="track-name">{song.name}</h5>

            <div className="track-popularity">Popularity: {song.popularity}</div>
            <div className="track-album">Album: {song.album.name}</div>
          </div>
        </div>
        <div onClick={()=>props.dispatch({type: 'LIKE_SONG', data: song.id})} className="like-btn">
          {song.like?  <i className="material-icons like-active" >star</i> : <i className="material-icons " >star_border</i>}
        </div>
      </div>

    </div>
  );

  }

  export default connect((state)=> state)(TrackView);
