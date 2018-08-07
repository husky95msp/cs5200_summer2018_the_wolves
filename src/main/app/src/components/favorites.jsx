import React from 'react';
import { connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SongList from 'song_list';

function Favorites(props){

    return(

      <div className = "container">
      {<SongList songList = {props.session.likedTracks}/>}

      </div>);


  }


  export default connect((state)=>state)(Favorites);
