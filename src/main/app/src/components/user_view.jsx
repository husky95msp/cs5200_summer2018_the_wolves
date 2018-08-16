import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import $ from 'jquery';
import {Button, NavLink} from 'reactstrap';
// import Ratings from 'ratings';
// import ReviewForm from 'review_form';
import api from 'api.js';
// import ReviewList from 'review_list';
import User from 'user_tile';
import SongList from 'song_list';


class UserView extends React.Component{
  constructor(props){
    super(props);

    api.getUserById(props.id, props.session).then(resp => this.props.dispatch({type:'POPULATE_USER_VIEW', data: resp}));
  }
  render(){
    return(<div>{this.props.userView?<div>
        <User user={this.props.userView}/>
        <div className = "container">
          <hr></hr>
        <h2>Songs Liked by {this.props.userView.firstName}</h2>
        <SongList songList = {this.props.userView.likedTracks}/>
        </div>
    </div>:<div></div>}
      </div>
    );

  }
}

export default connect((state)=> state)(UserView);
