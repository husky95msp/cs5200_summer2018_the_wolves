import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import 'scss/App.css';
import $ from 'jquery';
import api from 'api.js';


export default function home_init(root, store){
  ReactDOM.render(<Provider store={store}><App state={store.getState()} /></Provider>, root);
}



function SongList(props){
  if (props.songs != null){

    return(<div className = "container">
    <h2>Song List</h2>
    <ul className="list-group">
      {props.songs.tracks.items.map((song) =>
        <li className="list-group-item d-flex justify-content-between align-items-center" key={song.id}>
          <div>
            <h5>{song.name}</h5>
            Popularity: {song.popularity}
          </div>
          <span class="badge badge-pill">
            <img alt="cover" src={song.album.images[0].url} className="rounded-circle" width='150px' height='150px'></img>
          </span>
        </li>
      )}
    </ul>
  </div>);
}
return null;
}
class Home extends React.Component{
  constructor(props){
    super(props);
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
  
  }
  search(token, key){
    api.getSongsByArtist(token, key);
  }
  update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    console.log(data);
    this.props.dispatch({
      type: 'UPDATE_SEARCH_FORM',
      data: data,
    });
  }
  render(){
    return(
      <div>
        <h1>Search Songs by artist</h1>
        <div className="form-inline align-items-center">
          <input className="form-control mr-sm-2 ml-sm-2" type="search" placeholder="Search" name="key" aria-label="Search" onChange={this.update} />
          <button onClick={()=>this.search(this.props.token, this.props.test.key)} className="btn btn-primary">Search</button>
        </div>
        {<SongList songs = {this.props.songs}/>}
      </div>)
    }
  }

  let App = connect((state)=> state)(Home);
