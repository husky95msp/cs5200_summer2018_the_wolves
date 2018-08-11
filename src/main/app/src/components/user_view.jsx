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


class UserView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user : null,
    };
    api.getUserById(props.id, props.session).then(resp => this.setState({user: resp}));
  }
  render(){
    console.log(this.state.user);
    return(<div>{this.state.user?<div>
        <User user={this.state.user}/>
    </div>:<div></div>}
      </div>
    );

  }
}

export default connect((state)=> state)(UserView);
