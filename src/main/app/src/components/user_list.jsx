import React from 'react';
import {connect} from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';
function UserList(props) {

  let User = (prop) => {
    let follow = () => {
      if (prop.state.session) {
        props.dispatch({type: 'FOLLOW_USER', data: prop.user});
        if (prop.user.followee) {
          api.unfollow(prop.state.session.id, prop.user.id);
        } else {
          api.follow(prop.state.session.id, prop.user.id);

        }
      }
    }
    return (<div className="container mb-1 card card-body track-tile">
    <div className="d-flex justify-content-left flex-row flex-nowrap">
      <div className="track-info">
        <h2>{prop.user.firstName} {prop.user.lastName}</h2>


        <div>id : {prop.user.id}</div>
        <div>username : {prop.user.username}</div>
      </div>
      <Button onClick={follow} className="follow-btn">{
          prop.user.followee
          ? "UnFollow"
          : "Follow"
        }</Button>
      </div>
    </div>);
  }

  return (<div className="container">
  <ul className="list-group">
    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

      {props.userList.map((user, index) => <User key={index} user={user} state={props}/>)}
    </ReactCSSTransitionGroup>
  </ul>
</div>);

}

export default connect((state) => state)(UserList);
