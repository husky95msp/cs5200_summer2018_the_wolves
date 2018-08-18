import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input, FormText, Nav, NavItem, Collapse, Card, CardBody} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AlbumView from 'album_view';
// import Ratings from 'ratings';
import api from 'api.js';

class Albums extends React.Component {

  render() {
    let submit = (ev)=> {
      ev.preventDefault();
      let form_data =$('.create-album-form').serializeArray();
      let data = {};
      form_data.map((field)=>{
        if (field.value === ""){
          data[field.name] = null;
        }else {
          data[field.name] = field.value;

        }
      });
      api.createAlbum(data, this.props.session.id)
    }
    let onKeyPress = (event)=> {
      if (event.which === 13 /* Enter */) {
        event.preventDefault();
        submit(event);
      }
    }
    let toggle = ()=> this.props.dispatch({type: 'TOGGLE_CREATE_ALBUM'});
    return (<div className="container-fluid">
    <div className="d-flex justify-content-between">
      <h2>Your Albums </h2>
      <div  onClick={toggle} className="align-self-center btn  br btn-outline-dark badge-pill ">
        <i className="material-icons">create</i>
        <span>Create an Album</span>
      </div>
    </div>
    <Collapse isOpen={this.props.albumForm.toggle}>

      <Card className="">
        <CardBody>
          <Form className="create-album-form" onKeyPress={onKeyPress}>
            <div className="d-flex container  justify-content-around  align-items-center">
              <Label for="name"><div className="pt-3">Create a New Album..</div></Label>
              <Input type="text" name="name"  id="name" placeholder="Enter the name of your Album" />
              <Button type="button" className=" ml-2 btn btn-outline-dark" onClick={submit}>Create</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Collapse>
    <hr></hr>

    <div className="d-flex flex-row align-items-stretch flex-wrap justify-content-flex-start">
      <div className="border-right playlist-nav">

        <Nav vertical className="">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}
            >
            {this.props.albums.map((album)=>{ return(
              <NavItem key={album.id}>

                <NavLink to={'/album/'+album.id} exact={true} activeClassName="active" onClick={()=>api.getTracksForAlbum(album, this.props.session)} className="nav-link"><i className="material-icons">album</i> {album.name}</NavLink>
              </NavItem>
            )})}
          </ReactCSSTransitionGroup>
        </Nav>

      </div>
      <div className="d-flex playlist-area">
        <Route path="/album/:id" render={(match)=> <AlbumView aId={match.match.params.id} />}/>

      </div>
    </div>
  </div>);
}
}

export default withRouter(connect((state) => state)(Albums));
