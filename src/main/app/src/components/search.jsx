import React from 'react';
import {connect} from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';
import Song from 'trackTile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SongList from 'song_list';
import UserList from 'user_list';
import {Button, NavbarBrand} from 'reactstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
    this.badge = this.badge.bind(this);


  }

  search(token, kf, session) {
    if (kf.key.length !== 0) {
      if (kf.filter === 'song') {
        api.getSongsByArtist(token, kf, session);
      } else if (kf.filter === 'user') {
        api.getUsersByName(kf.key);
      }
    }
  }
  update(ev) {
    let tgt = $(ev.target);
    tgt.keypress((handler) => {
      if (handler.which === 13) {
        this.search(this.props.token, this.props.test, this.props.session)
      }
    });
    let data = {};
    data[tgt.attr('name')] = tgt.val();

    this.props.dispatch({type: 'UPDATE_SEARCH_FORM', data: data});
  }
  badge(b) {
    this.props.dispatch({type: 'SEARCH_FILTER', data: b});
    $('.badge').removeClass('badge-active');
    $('.' + b).addClass('badge-active');
  }
  render() {
    return (<div>

      <div className={this.props.songs?"banner":"banner show-banner"}>
        <h1> Spotify<span className="text-success">++</span></h1>

Find millions of popular songs, check what your friends listen to, create playlists, write reviews and more..</div>

      <div className="container search-content">
<br></br>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button onClick={() => this.props.dispatch({type: 'SEARCH_CLEAR'})} className="btn btn-outline-secondary">
              <div className="material-icons search-bar-icon">clear</div>
            </button>
          </div>
          <input className="form-control" id="search-bar" type="search" value= {this.props.test.key} placeholder={"Type the " + this.props.test.filter+"'s name to search"} name="key" aria-label="Search" onChange={this.update}/>

          <div className="input-group-append">
            <button onClick={() => {
                document.getElementById('search-bar').value = '';
                this.search(this.props.token, this.props.test, this.props.session);
              }} className="btn btn-outline-secondary">
              <div className="material-icons search-bar-icon">search</div>
            </button>
          </div>
        </div>
        <div>
          <i>Search for:
          </i>
          <span className="badge song badge-secondary" onClick={() => this.badge("song")}>Songs</span>

          {this.props.session?<span className="badge user badge-secondary" onClick={() => this.badge("user")}>Users</span>:<span></span>}
        </div>

        {
          this.props.test.filter === 'song'
            ? <div><SongList songList={this.props.songs
                  ? this.props.songs.tracks.items
                  : []} />
                <div className="d-flex justify-content-center pb-1">
                {this.props.songs && this.props.songs.tracks.next !== null?  <Button className="load" onClick={() => api.loadNextPage(this.props.songs.tracks.next, this.props.token, this.props.session)}>Load More</Button>:<div>{(this.props.songs && !this.props.songs.tracks.items.length)? <h2 className="text-muted">Sorry No Songs Match your search !</h2>:<div></div>}</div>}
                </div>
                <div>{!this.props.songs?<div><h2 className="trending">Trending</h2><SongList songList= {this.props.newReleases} /></div>: <div></div>}</div>
              </div>
            : <div></div>
        }
        {
          this.props.test.filter === 'user'
            ? <UserList userList={this.props.userSearch}/>
            : <div></div>
        }

      </div>
    </div>)
  }
}

export default connect((state) => state)(Home);
