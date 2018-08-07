import React from 'react';
import {connect} from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';
function UserList(props) {

  let User = (props) => {
    let follow=()=>{
      if(props.state.session){
        props.dispatch({type: 'FOLLOW_USER', data: props.user})

      }
    }
    return (<div className="container mb-1 card card-body">
      <h2>{props.user.firstName}
        {props.user.lastName}</h2>
      <div><Button onClick={follow}>Follow</Button></div>

      <div>id : {props.user.id}</div>
      <div>username : {props.user.username}</div>
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
