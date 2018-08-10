import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Collapse } from 'reactstrap';
import $ from 'jquery';
import api from 'api.js';

function ReviewForm(props){
  let update = (ev)=>{
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();

    props.dispatch({
      type: 'UPDATE_REVIEW',
      data: data,
    });
  }
  let submit = ()=>{
    // let form_data =$('.review_form').serializeArray();
    // let review = form_data[0].value;

    if(props.reviewForm.review !== ""){
      props.dispatch({
        type: 'SUBMIT_REVIEW'
      });
      // props.dispatch({
      //   type: 'UPDATE_REVIEW_LIST',
      //   data: {
      //     "reviewer" : props.session,
      //     "review": props.reviewForm.review
      //   },
      // });
      api.submitReview({"review" : props.reviewForm.review}, props.session.id, props.songId, props.track);
    }
    else{
      props.dispatch({
        type: 'REVIEW_FORM_ERROR',
        data: {"error": 'Please enter something'},
      });
    }

  }
  return(
    <div>
      <Collapse isOpen={props.reviewForm.toggle}>
      <Form className="review_form">
        <FormGroup>
          <Label for="review"><h3 className="pt-3">Post your thoughts on this track..</h3></Label>
          <Input type="textarea" name="review" id="review" value = {props.reviewForm.review}  onChange={update} />
          <div className="error show">{props.reviewForm.error}</div>

        </FormGroup>
        <Button className="btn btn-outline-dark" onClick={submit}>Submit</Button>
      </Form>
    </Collapse>
    </div>
  );

}


export default withRouter(connect((state)=> state)(ReviewForm));
