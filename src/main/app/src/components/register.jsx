import React from 'react';
import { connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


function Register(props){
  let register=()=>{
    let form_data =$('.register_form').serializeArray();
    let data = {};
    form_data.map((field)=>{
      if (field.value === ""){
        data[field.name] = null;
      }else {
        data[field.name] = field.value;

      }
    });
    console.log(data);
    api.createMember(data);
  }
  return(
    <div className = "container">
      <h1>Enter credentials,</h1>
      {(!props.create_account)?<Form className="register_form">
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" id="fname"  placeholder="First Name" />

        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>
          <Input type="text" name="lastName" id="lname"  placeholder="Last Name" />

        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username"  placeholder="Enter a unique Username"  />

        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Password</Label>
          <Input type="password" name="password" id="password"  placeholder="Enter a strong password"  />

        </FormGroup>
        <FormGroup>
         <Label for="exampleSelect">Register as:</Label>
         <Input type="select" name="type" id="type">
           <option value = "User">Normal User</option>
           <option value = "Artist">An Artist</option>
           <option value = "Reviewer">A Reviewer</option>
         </Input>
       </FormGroup>
        <Button onClick={register} className="btn-info btn-sm btn-block ">Register</Button>
      </Form> : <h1 className="alert alert-success">Account created Successfully! you can login now.</h1>}

    </div>);


  }


  export default connect((state)=>state)(Register);
