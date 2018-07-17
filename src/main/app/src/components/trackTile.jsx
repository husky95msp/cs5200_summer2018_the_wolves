import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';
import Ratings from 'ratings';



function Song(props){

  return(<li className="show slide-fade list-group-item d-flex mb-1 justify-content-between align-items-center" key={props.song.id}>
  <div>
    <h5>{props.song.name}</h5><hr/>
    Popularity: {props.song.popularity} <br/>
    Album: {props.song.album.name} <br/>
    Rating: <Ratings/>
</div>
<span className="badge badge-pill">
  <img alt="cover" src={props.song.album.images[0].url} className="rounded-circle" width='150px' height='150px'></img>
</span>
</li>);

}

export default connect((state)=> state)(Song);
