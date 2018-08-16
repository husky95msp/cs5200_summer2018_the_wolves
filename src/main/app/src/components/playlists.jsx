import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input, FormText, Nav, NavItem, Collapse, Card, CardBody} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PlaylistView from 'playlist_view';
// import Ratings from 'ratings';
import api from 'api.js';

class PlayLists extends React.Component {

  render() {
    let submit = (ev)=> {
      ev.preventDefault();
      let form_data =$('.create-playlist-form').serializeArray();
      let data = {};
      form_data.map((field)=>{
        if (field.value === ""){
          data[field.name] = null;
        }else {
          data[field.name] = field.value;

        }
      });
      api.createPlaylist(data, this.props.session.id)
    }
    let onKeyPress = (event)=> {
      if (event.which === 13 /* Enter */) {
        event.preventDefault();
        submit(event);
      }
    }
    let toggle = ()=> this.props.dispatch({type: 'TOGGLE_CREATE_PLAYLIST'});
    return (<div className="container-fluid">
    <div className="d-flex justify-content-between">
      <h2>Your Playlists </h2>
      <div  onClick={toggle} className="align-self-center btn  br btn-outline-dark badge-pill ">
        <i className="material-icons">create</i>
        <span>Create a Playlist</span>
      </div>
    </div>
    <Collapse isOpen={this.props.playlistForm.toggle}>

      <Card className="border-0">
        <CardBody>
          <Form className="create-playlist-form" onKeyPress={onKeyPress}>
            <div className="d-flex container  justify-content-around  align-items-center">
              <Label for="name"><div className="pt-3">Create a New Playlist..</div></Label>
              <Input type="text" name="name"  id="name" placeholder="Enter the name of your Playlist" />
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
            {this.props.playlists.map((playlist)=>{ return(
              <NavItem key={playlist.id}>

                <NavLink to={'/playlist/'+playlist.id} exact={true} activeClassName="active" onClick={()=>api.getTracksForPlaylist(playlist, this.props.session)} className="nav-link"><i className="material-icons">playlist_play</i> {playlist.name}</NavLink>
              </NavItem>
            )})}
          </ReactCSSTransitionGroup>
        </Nav>

      </div>
      <div className="d-flex playlist-area">
        <Route path="/playlist/:id" render={(match)=> <PlaylistView pId={match.match.params.id} />}/>

      </div>
    </div>
  </div>);
}
}

export default withRouter(connect((state) => state)(PlayLists));
