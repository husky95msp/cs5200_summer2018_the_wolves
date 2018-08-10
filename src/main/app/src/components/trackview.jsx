import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import $ from 'jquery';
import {Button, NavLink} from 'reactstrap';
// import Ratings from 'ratings';
import ReviewForm from 'review_form';
import api from 'api.js';
import ReviewList from 'review_list';
import Song from 'trackTile';


function TrackView(props){
  if ( props.trackView === null){
    api.getSongById(props.token, props.songId, props.session);
  } else if(props.songId !== props.trackView.spotify_id){
    api.getSongById(props.token, props.songId, props.session);
  }

  return(
    <div>
      {props.trackView?<div className="container">
          <Song  song = {props.trackView}/>
        {props.user_type === "Reviewer"? <NavLink onClick={()=>props.dispatch({type: 'TOGGLE_REVIEW_COLLAPSE'})} className="badge ">Add Review</NavLink>: <div></div>}

        <ReviewForm songId={props.trackView.spotify_id} track={props.trackView}/>
        <hr></hr>
        <h3>Reviews</h3>

      <ReviewList reviews = {props.trackView.reviews}/>
      </div>
      : <div></div>}
    </div>
  );

}

export default connect((state)=> state)(TrackView);
