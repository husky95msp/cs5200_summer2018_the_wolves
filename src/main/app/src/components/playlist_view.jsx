import React from 'react';
import { connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'playlistile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function PlaylistView(props){

    return(
      <div className = "container">
<h2>
        {props.playlistForm.playlist.name}
        </h2>

        <ul className="list-group">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}
            >

            {props.playlistView.map((song, index) =>

              <Song key = {index} song = {song}/>

            )}
          </ReactCSSTransitionGroup>
        </ul>
      </div>);
    }




  export default connect((state)=>state)(PlaylistView);
