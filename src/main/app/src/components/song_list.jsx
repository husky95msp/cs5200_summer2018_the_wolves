import React from 'react';
import { connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function SongList(props){
  if (props.songList != null){

    return(
      <div className = "container">
        <ul className="list-group">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>

            {props.songList.map((song) =>

              <Song key = {song.id} song = {song}/>

            )}
          </ReactCSSTransitionGroup>
        </ul>
      </div>);
    }
    return null;
  }


  export default connect((state)=>state)(SongList);
