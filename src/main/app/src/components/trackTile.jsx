import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';
// import {Button} from 'reactstrap';
// import Ratings from 'ratings';
import {Link} from 'react-router-dom';
import api from 'api.js';



function Song(props){
  let likeSong= ()=>{
    props.dispatch({type: 'LIKE_SONG', data: props.song})
    api.likeSong(props.session.id, props.song);
  }

  return(
    <li className="show slide-fade list-group-item track-tile mb-1" key={props.song.id}>
      <div className="d-flex justify-content-left flex-row flex-nowrap">
        <div className="track-poster ">
          <img alt="cover" src={props.song.album.images[0].url} className="rounded-circle align-self-center"/>
        </div>

        <div className="track-info">
          <Link to={"/tracks/"+props.song.id}>
        <h5 className="track-name">{props.song.name}</h5>
</Link>
          <div className="track-popularity">Popularity: {props.song.popularity}</div>
          <div className="track-album">Album: {props.song.album.name}</div>
        </div>
      </div>
      <div onClick={likeSong} className="like-btn">
        {props.song.like?  <i className="material-icons like-active" >star</i> : <i className="material-icons " >star_border</i>}
      </div>
    </li>);

  }

  export default connect((state)=> state)(Song);
