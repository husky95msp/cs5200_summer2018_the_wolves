import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button} from 'reactstrap';

function LoginForm(props){
  return(
    <Form>
      <FormGroup>
        <Input type="email" name="email" id="exampleEmail" placeholder="Email" bsSize="sm" />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="examplePassword" placeholder="Password" bsSize="sm" />
      </FormGroup>
      <Button onClick={()=>{console.log("log")} } className="btn-info btn-sm btn-block ">Login</Button>
    </Form>
  );
}


function Login(props){
  let toggle_login_popper = ()=>{props.dispatch({type: 'TOGGLE_LOGIN_POPPER'})};

  return(

    <div>
        <Modal isOpen={props.tog} toggle={toggle_login_popper} className="" backdrop={false}>
          <ModalHeader toggle={toggle_login_popper} >Login</ModalHeader>
          <ModalBody>
            <LoginForm/>
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
