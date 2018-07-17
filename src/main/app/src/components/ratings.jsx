import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';

function Ratings(props){
  let x;
  let testp = (ev)=>{
    let tgt = $(ev.target);
    x = ev.clientX - tgt.offset().left;
    if (x < 0){
      x = 0;
    }
    if (x > 198){
      x = 200;
    }
    console.log((x | 0)/20 | 0);


  }
  return(<div onMouseMove={testp} className="rating-box" data-role="ratingbar" data-steps="3">

  

  </div>);
}


export default connect((state)=> state)(Ratings);
