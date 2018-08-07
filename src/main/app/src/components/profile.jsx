import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';
import {Switch, Route,NavLink , withRouter} from 'react-router-dom';
import { Navbar} from 'reactstrap';
// import Ratings from 'ratings';
import api from 'api.js';



class Profile extends React.Component {
  render(){
    return(
      <div>
        <div className="container card card-body mb-2">
          <div className="d-flex justify-content-around">

            <NavLink to='/profile/followers'  exact = {true} activeClassName="active">People who Follow you</NavLink>
            <NavLink to="/profile/followees"  exact = {true} activeClassName="active">People who you Follow</NavLink>
          </div>
        </div>



        </div>);
      }
    }


    export default withRouter(connect((state)=> state)(Profile));
