import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader,FormText, ModalBody, Form, FormGroup, Input, Button} from 'reactstrap';
import api from 'api.js';
import $ from 'jquery';

function LoginForm(props){
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
  return(
    <Form>
      <FormGroup>
        <Input type="text" name="username" id="username" value = {props.props.login.username} placeholder="User Name" bsSize="sm" onChange={update} />
        <div className={"error "+ (props.props.login.label == 404? "show": "")}>No such username!</div>
    </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="examplePassword" value = {props.props.login.password} placeholder="Password" bsSize="sm" onChange={update}/>
        <div className={"error "+ (props.props.login.label == 401? "show": "")}>Invalid Password!</div>
    </FormGroup>
      <Button onClick={()=>{api.authenticateUser(props.props.login.username, props.props.login.password)} } className="btn-info btn-sm btn-block ">Login</Button>
    </Form>
  );
}


function Login(props){
  let toggle_login_popper = ()=>{props.dispatch({type: 'TOGGLE_LOGIN_POPPER'})};

  return(

    <div>
        <Modal isOpen={props.tog} className="" backdrop={false}>
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
