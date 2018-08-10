import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader,FormText, ModalBody, Form, FormGroup, Input, Button} from 'reactstrap';
import api from 'api.js';
import $ from 'jquery';

function LoginForm(props){
  let toggle_login_popper = ()=>{props.props.dispatch({type: 'TOGGLE_LOGIN_POPPER'})};
  function update(ev) {
    let tgt = $(ev.target);

    let data = {
      label:200
    };
    data[tgt.attr('name')] = tgt.val();

    props.props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }
  let onKeyPress = (event)=> {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
      api.authenticateUser(props.props.loginForm.username, props.props.loginForm.password);
    }
  }
  return(<div>
    <Form onKeyPress={onKeyPress}>
      <FormGroup>
        <Input type="text" name="username" id="username" value = {props.props.loginForm.username} placeholder="User Name" bsSize="sm" onChange={update} />
        <div className={"error "+ (props.props.loginForm.label == 404? "show": "")}>No such username!</div>
    </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="examplePassword" value = {props.props.loginForm.password} placeholder="Password" bsSize="sm" onChange={update}/>
        <div className={"error "+ (props.props.loginForm.label == 401? "show": "")}>Invalid Password!</div>
    </FormGroup>
      <Button  onClick={()=>{api.authenticateUser(props.props.loginForm.username, props.props.loginForm.password)} } className="btn-info btn-sm btn-block ">Login</Button>
  </Form>
  <div className="text-center">No account? | <Link to="/register" onClick={toggle_login_popper} className="text-primary">Register</Link></div>
  </div>
  );
}


function Login(props){
  let toggle_login_popper = ()=>{props.dispatch({type: 'TOGGLE_LOGIN_POPPER'})};

  return(

    <div>
        <Modal isOpen={props.tog} className="" modalTransition={{ timeout: 0 }} backdropTransition={{ timeout: 700 }}>
          <ModalHeader toggle={toggle_login_popper} >Login</ModalHeader>
          <ModalBody>
            <LoginForm props = {props}/>

          </ModalBody>

        </Modal>
      </div>


  );
}
export default connect((state)=> state)(Login);

// <Popover placement="bottom" isOpen={props.tog} target="Popover1" toggle={toggle_login_popper}>
//   <PopoverHeader>Login</PopoverHeader>
//   <PopoverBody>
//     <LoginForm />
//   </PopoverBody>
// </Popover>
