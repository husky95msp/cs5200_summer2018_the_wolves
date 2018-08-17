import React from 'react';
import { connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'albumtile';
import {Button, Form, FormGroup, Label, Input, FormText, Nav, NavItem, Collapse, Card, CardBody} from 'reactstrap';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function AlbumView(props){
  let submit = (ev)=> {
    ev.preventDefault();
    let form_data =$('.create-album-form').serializeArray();
    let data = {};
    data['album_id'] = props.albumForm.album.id;
    data['album_name'] = props.albumForm.album.name;

    form_data.map((field)=>{
      if (field.value === ""){
        data[field.name] = null;
      }else {
        data[field.name] = field.value;

      }
    });
    api.addTrackToAlbum(props.albumForm.album.id, data)
  }
  let onKeyPress = (event)=> {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
      submit(event);
    }
  }
  let toggle = ()=> props.dispatch({type: 'TOGGLE_CREATE_TRACK_FOR_ALBUM'});
  return(
    <div className = "container">

      <div className="d-flex justify-content-between">
        <h2>
          {props.albumForm.album.name}
        </h2>
        <div  onClick={toggle} className="align-self-center btn  br btn-outline-dark badge-pill ">
          <i className="material-icons">create</i>
          <span>Add your Own Track for this Album</span>
        </div>
      </div>
      <Collapse isOpen={props.albumForm.newTrackToggle}>

        <Card className="border-0">
          <CardBody>
            <Form className="create-album-form" onKeyPress={onKeyPress}>
              <Label><h3 className="">Enter Track Details..</h3></Label>
              <div className="d-flex container flex-column">
                <FormGroup>
                <Input type="text" name="name"  id="name" placeholder="Enter the name of your Track" />
                </FormGroup>
                <FormGroup>
                <Button type="button" className="btn badge-pill btn-success" onClick={submit}>Create Track</Button>
                </FormGroup>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Collapse>

      <ul className="list-group">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
          >

          {props.albumView.map((song, index) =>

            <Song key = {index} song = {song}/>

          )}
        </ReactCSSTransitionGroup>
      </ul>
    </div>);
  }




  export default connect((state)=>state)(AlbumView);
