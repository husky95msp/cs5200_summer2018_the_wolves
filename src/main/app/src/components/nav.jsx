import React from 'react';
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import {Nav, NavItem, NavbarBrand, Navbar, Collapse, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom'
// import $ from 'jquery';
import Login from 'login';
function NavBar(props) {
  let toggle_login_popper = ()=>{

    props.dispatch({type: 'TOGGLE_LOGIN_POPPER'});
  };
  let toggle_profile_dropper = ()=>{
    props.dispatch({type:'toggle_profile_dropper'})

  };

  return (
    <div>

      <Navbar color="light" light expand="md" fixed={`top`}>
        <NavbarBrand href="/">  Spotify<span className="text-success">++</span></NavbarBrand>
        <NavbarToggler onClick={()=>props.dispatch({type: 'TOGGLE_NAV'})} />
        <Collapse isOpen={props.navBar.collapse} navbar>
          <Nav className="ml-auto" navbar>
            {(props.session && props.user_type === "Admin")?<NavItem>
              <NavLink to="/panel" exact = {true} activeClassName="active" className="= nav-link"><i className="material-icons search-icon">build</i>Admin Panel</NavLink>
            </NavItem>: <div></div>}
            {(props.session && props.user_type === "Admin")?<NavItem>
              <NavLink to="/register" exact = {true} activeClassName="active" className=" nav-link"><i className="material-icons search-icon">add</i>Create User</NavLink>
            </NavItem>: <div></div>}

            <NavItem>
              <NavLink to="/" exact = {true} activeClassName="active" className="nav-link"><i className="material-icons search-icon">search</i>Search</NavLink>
            </NavItem>
            {props.session?
              <NavItem>
                <NavLink to="/favorites" exact = {true} activeClassName="active" className="nav-link"><i className="material-icons search-icon">star</i>Favorites</NavLink>
              </NavItem>: <div></div>}
              {props.session?
                <NavItem>
                  <NavLink to="/playlist" exact = {true} activeClassName="active" className="nav-link"><i className="material-icons search-icon">playlist_play</i>Playlists</NavLink>
                </NavItem>: <div></div>}
                {props.session && props.user_type === "Artist"?
                  <NavItem>
                    <NavLink to="/album" exact = {true} activeClassName="active" className="nav-link"><i className="material-icons search-icon">album</i>Albums</NavLink>
                  </NavItem>: <div></div>}

                <NavItem>
                  {props.session? <div>
                    <Dropdown isOpen={props.profileDropper} toggle={toggle_profile_dropper}>
                      <DropdownToggle className="nav-link dropper">

                        <i className="material-icons ">account_circle</i> Hi! {props.session.username}
                        </DropdownToggle>

                        <DropdownMenu>


                          <DropdownItem><NavLink to="/profile"  activeClassName="active"><i className="material-icons">settings</i> Profile</NavLink></DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={()=>props.dispatch({type:'LOGOUT'})}><Link to="/"><i className="material-icons text-danger">exit_to_app</i> Logout</Link> </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>


                    </div>
                    :
                    <div>
                      <div  onClick={toggle_login_popper} className="nav-link pt-0 pb-0">
                        <i className="material-icons login-icon">account_circle</i>
                        <div className="login-label"> Login</div>
                      </div>


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
