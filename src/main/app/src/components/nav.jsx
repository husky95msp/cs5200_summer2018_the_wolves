import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Popover, PopoverHeader, PopoverBody ,Nav, NavItem, NavbarBrand, Navbar, Collapse, NavbarToggler } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import $ from 'jquery';

function NavBar(props) {
  let toggle_login_popper = ()=>{props.dispatch({type: 'TOGGLE_LOGIN_POPPER'})};
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

              <div id="Popover1" onClick={toggle_login_popper} className="nav-link pt-0 pb-0">
                <i onClick={()=>$(".login-icon").toggleClass("active")}  className="material-icons login-icon md-48">account_circle</i>

                <Popover placement="bottom" isOpen={props.tog} target="Popover1" toggle={toggle_login_popper}>
                  <PopoverHeader>Login</PopoverHeader>
                  <PopoverBody>
                    <Form>
                            <FormGroup>

                              <Input type="email" name="email" id="exampleEmail" placeholder="Email" bsSize="sm" />
                            </FormGroup>
                            <FormGroup>

                              <Input type="password" name="password" id="examplePassword" placeholder="Password" bsSize="sm" />
                            </FormGroup>
                             <Button onClick={()=>{console.log("log")} } className="btn-sm btn-block bg-info">Login</Button>
                          </Form>
                  </PopoverBody>
                </Popover>
              </div>

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
