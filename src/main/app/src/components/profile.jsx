import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';
import { Link } from 'react-router-dom';
import {Switch, Route,NavLink , withRouter} from 'react-router-dom';
import { Navbar} from 'reactstrap';
// import Ratings from 'ratings';
import api from 'api.js';
import User from 'user_tile';
import {Button} from 'reactstrap';


class Profile extends React.Component {
  render(){
    let User = (prop) => {

      return (<div className="container mb-1 card card-body track-tile">
      <div className="d-flex justify-content-left flex-row flex-wrap">
        <div className="track-info">
          <h2>{prop.user.firstName} {prop.user.lastName}</h2>


          <div>id : {prop.user.id}</div>
          <div>username : {prop.user.username}</div>
          <div>email : {prop.user.email}</div>
        </div>
        <Button className="mr-1 panel-btn btn-sm btn-outline-warning "><Link to={"/edit/"+prop.user.id} onClick={()=>this.props.dispatch({type: 'EDIT_USER', data: prop.user})} ><i className="material-icons search-icon">edit</i>Edit</Link></Button>

        </div>
      </div>);
    }
    return(
      <div>
        <User key={'key'} user={this.props.session} />
        <div className="card rounded-0 border-right-0 border-left-0 p-2 mb-2">
          <div className=" container d-flex justify-content-around">

            <NavLink to='/profile/followers'  exact = {true} activeClassName="active">People who Follow you</NavLink>
            <NavLink to="/profile/followees"  exact = {true} activeClassName="active">People who you Follow</NavLink>
          </div>
        </div>



        </div>);
      }
    }


    export default withRouter(connect((state)=> state)(Profile));
