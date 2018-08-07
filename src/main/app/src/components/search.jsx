import React from 'react';
import { connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SongList from 'song_list';




class Home extends React.Component{
  constructor(props){
    super(props);
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);

  }
  search(token, key, session){
    if (key.length !== 0){

      api.getSongsByArtist(token, key, session);

    }
  }
  update(ev) {
    let tgt = $(ev.target);
    tgt.keypress((handler)=>{
      if (handler.which === 13){
        this.search(this.props.token, this.props.test.key, this.props.session)
      }
    })
    ;
    let data = {};
    data[tgt.attr('name')] = tgt.val();

    this.props.dispatch({
      type: 'UPDATE_SEARCH_FORM',
      data: data,
    });
  }
  render(){
    return(
      <div>
        <h2 className="text-center">Search Songs</h2>
        <div className = "container">

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button onClick={()=>this.props.dispatch({type: 'SEARCH_CLEAR'})} className="btn"><div className="material-icons search-bar-icon">clear</div></button>
            </div>
            <input className="form-control"  id= "search-bar" type="search" placeholder="Enter Artist/Band" name="key" aria-label="Search" onChange={this.update} />

            <div className="input-group-append">
              <button onClick={()=>{ document.getElementById('search-bar').value = ''; this.search(this.props.token, this.props.test.key, this.props.session);}} className="btn"><div className="material-icons search-bar-icon">search</div></button>
            </div>
          </div>
        </div>
        {<SongList songList = {this.props.songs?this.props.songs.tracks.items:null} artist = {this.props.test.key}/>}
      </div>)
    }
  }

  export default connect((state)=> state)(Home);
