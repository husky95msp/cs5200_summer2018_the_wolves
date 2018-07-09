import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, NavbarBrand, Navbar, Collapse, NavbarToggler } from 'reactstrap';
import { withRouter } from 'react-router-dom'

function NavBar(props) {

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">  MusicfreaK</NavbarBrand>
        <NavbarToggler onClick={()=>props.dispatch({type: 'TOGGLE_NAV'})} />
        <Collapse isOpen={props.navBar.collapse} navbar>
          <Nav className="ml-auto" navbar>

            <NavItem>
              <NavLink to="/search" activeClassName="active" className="nav-link">Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/" exact activeClassName="active" className="nav-link pt-0 pb-0"><i className="material-icons md-48">account_circle</i></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}



export default withRouter(connect((state)=>state)(NavBar));
