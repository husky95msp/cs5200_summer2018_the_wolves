import React from 'react';
import {connect} from 'react-redux';
// import $ from 'jquery';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom';
import {Nav, NavItem} from 'reactstrap';

// import Ratings from 'ratings';
import api from 'api.js';

class PlayLists extends React.Component {
  render() {
    return (<div className="container-fluid">
      <h2>Your Playlists</h2>
      <hr></hr>

      <div className="d-flex flex-row align-items-stretch flex-wrap justify-content-flex-start">
      <div className="">

        <Nav vertical>
          <NavItem>
            <NavLink to="/playlist" exact={true} activeClassName="active" className="nav-link">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/playlist" exact={true} activeClassName="active" className="nav-link">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/playlist" exact={true} activeClassName="active" className="nav-link">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/playlist" exact={true} activeClassName="active" className="nav-link">Disabled Link</NavLink>
          </NavItem>
        </Nav>

      </div>
      <div className="d-flex">dcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc</div>
      </div>
    </div>);
  }
}

export default withRouter(connect((state) => state)(PlayLists));
