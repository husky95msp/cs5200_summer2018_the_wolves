import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


function Editor(props){

  let update=()=>{
    let form_data =$('.update_user_form').serializeArray();
    let data = {};
    data['id']= props.uid;
    form_data.map((field)=>{
      if (field.value === ""){
        data[field.name] = null;
      }else {
        data[field.name] = field.value;

      }
    });

    api.updateMember(data);
    if(props.type==='PANEL')api.getAllUsers().then((users)=> props.dispatch({type:'UPDATE_ALL_USERS', data: users}));
    else api.getUserById(props.uid, props.session).then((user)=> props.dispatch({type:'UPDATE_SESSION_USER', data: data}));
  }
  return(
    <div className = "container">
      <h1>Edit This User,</h1>

      <Form className="update_user_form">
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" id="fname" defaultValue={props.editUserForm.firstName}  placeholder="First Name" />

        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>
          <Input type="text" name="lastName" id="lname" defaultValue={props.editUserForm.lastName}  placeholder="Last Name" />

        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" defaultValue={props.editUserForm.username} placeholder="Enter a unique Username"  />

        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" defaultValue={props.editUserForm.password}  placeholder="Enter a strong password"  />

        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" defaultValue={props.editUserForm.email}  placeholder="Enter emailID"  />

        </FormGroup>

        <Link to={props.type==='PANEL'? "/panel": "/profile"}><Button onClick={update} className="btn-danger btn-sm btn-block ">Update</Button></Link>
      </Form>

    </div>);


  }


  export default connect((state)=>state)(Editor);
