import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {Nav, NavItem, NavbarBrand, Navbar, Collapse, NavbarToggler } from 'reactstrap';
import { withRouter } from 'react-router-dom'
// import $ from 'jquery';
import Login from 'login';
function NavBar(props) {
  let toggle_login_popper = ()=>{

    props.dispatch({type: 'TOGGLE_LOGIN_POPPER'});
  };


  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed={`top`}>
        <NavbarBrand href="/">  Spotify++</NavbarBrand>
        <NavbarToggler onClick={()=>props.dispatch({type: 'TOGGLE_NAV'})} />
        <Collapse isOpen={props.navBar.collapse} navbar>
          <Nav className="ml-auto" navbar>

            <NavItem>
              <NavLink to="/" exact = {true} activeClassName="active" className="nav-link"><i className="material-icons search-icon">search</i>Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/favorites" exact = {true} activeClassName="active" className="nav-link"><i className="material-icons search-icon">star</i>Favorites</NavLink>
            </NavItem>

            <NavItem>
                {props.session?   <NavLink to="/profile" exact = {true} activeClassName="active" className="nav-link">
                <div>Hi! {props.session.username}</div></NavLink>:
                  <div>
                    <div id="Popover1" onClick={toggle_login_popper} className="nav-link pt-0 pb-0">
                   <i className="material-icons login-icon">account_circle</i>
                   </div>
                <div className="login-label"> Login</div>

                <Login/>
            </div>
}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}



// <NavLink to="/*" exact activeClassName="active" className="nav-link pt-0 pb-0">
// <i onClick={()=>console.log("hello")}className="material-icons md-48">account_box</i>
// </NavLink>

export default withRouter(connect((state)=>state)(NavBar));
