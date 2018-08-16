import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';

class User extends React.Component {
  render(){

    let follow = () => {
      if (this.props.session) {
        this.props.dispatch({type: 'FOLLOW_USER', data: this.props.user});
        if ((this.props.session.followees.filter((fdata)=>this.props.user.id===fdata.id)).length) {
          api.unfollow(this.props.session.id, this.props.user.id);
        } else {
          api.follow(this.props.session.id, this.props.user.id);
        }
      }
    }
    return (<div className="container mb-1 card card-body track-tile">
    <div className="d-flex justify-content-left flex-row flex-nowrap">
      <div className="track-info">
        <Link to={"/user/"+this.props.user.id}>
          <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>

        </Link>

        <div>id : {this.props.user.id}</div>
        <div>username : {this.props.user.username}</div>
      </div>
      <Button onClick={follow} className="follow-btn">{
          (this.props.session.followees.filter((fdata)=>this.props.user.id===fdata.id)).length?

           "UnFollow"
          : "Follow"
        }</Button>
      </div>
    </div>);
  }
}
export default connect((state) => state)(User);
