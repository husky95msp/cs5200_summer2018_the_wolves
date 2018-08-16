import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';
// import User from 'user_list';

function UserList(props) {

  let User = (prop) => {
    let follow = () => {
      if (prop.state.session) {
        props.dispatch({type: 'FOLLOW_USER', data: prop.user});
        if ((props.session.followees.filter((fdata)=>prop.user.id===fdata.id)).length) {
          api.unfollow(prop.state.session.id, prop.user.id);
        } else {
          api.follow(prop.state.session.id, prop.user.id);

        }
      }
    }
    return (<div className="container mb-1 card card-body track-tile">
    <div className="d-flex justify-content-left flex-row flex-nowrap">
      <div className="track-info">
        <Link to={"/user/"+prop.user.id}>
          <h2>{prop.user.firstName} {prop.user.lastName}</h2>

        </Link>

        <div>id : {prop.user.id}</div>
        <div>username : {prop.user.username}</div>
      </div>
      <Button onClick={follow} className="follow-btn">{
          (props.session.followees.filter((fdata)=>prop.user.id===fdata.id)).length?
           "UnFollow"
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
