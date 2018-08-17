import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';

function Panel(props) {

  let User = (prop) => {
    let view = () => {

    }
    let edit = () => {

    }
    let deleteUser = () => {
      api.deleteMember(prop.user);
    }
    return (<div className="container mb-1 card card-body track-tile">
    <div className="d-flex justify-content-left flex-row flex-wrap">
      <div className="track-info">
        <h2>{prop.user.firstName} {prop.user.lastName}</h2>


        <div>id : {prop.user.id}</div>
        <div>username : {prop.user.username}</div>
      </div>
      <Button className="mr-1 panel-btn btn-sm btn-outline-warning "><Link to={"/panel/user/"+prop.user.id} onClick={()=>props.dispatch({type: 'EDIT_USER', data: prop.user})} ><i className="material-icons search-icon">edit</i>Edit</Link></Button>
      <Button  onClick={deleteUser} className="panel-btn btn-sm btn-outline-danger "><i className="material-icons search-icon">delete</i>Delete</Button>
      </div>
    </div>);
  }

  return (<div className="container">
  <ul className="list-group">
    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

      {props.allUsers.map((user, index) => <User key={index} user={user} state={props}/>)}
    </ReactCSSTransitionGroup>
  </ul>
</div>);

}

export default connect((state) => state)(Panel);
