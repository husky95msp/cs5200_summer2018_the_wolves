import React from 'react';
import {connect} from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';
function ReviewList(props) {

  let Review = (prop) => {

    return (<div className="container mb-1 card card-body track-tile">
    <div className="d-flex justify-content-left flex-row flex-nowrap">
      <div className="track-info">


      <h5>{prop.review.reviewer.firstName} {prop.review.reviewer.lastName}</h5>

      {prop.review.review}
      </div>
      </div>
    </div>);
  }

  return (<div className="container">
  <ul className="list-group">
    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

      {props.reviews.map((review, index) => <Review key={index} review={review} state={props}/>)}
    </ReactCSSTransitionGroup>
  </ul>
</div>);

}

export default connect((state) => state)(ReviewList);
