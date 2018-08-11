import React from 'react';
import { connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function SongList(props){

    return(
      <div className = "container">
        <ul className="list-group">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>

            {props.songList.map((song, index) =>

              <Song key = {index} song = {song}/>

            )}
          </ReactCSSTransitionGroup>
        </ul>
      </div>);
    }




  export default connect((state)=>state)(SongList);
