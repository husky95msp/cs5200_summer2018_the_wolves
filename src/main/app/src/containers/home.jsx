import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import 'scss/App.css';


import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from 'components/search';
import NavBar from 'components/nav';




export default function home_init(root, store){
  ReactDOM.render(<Provider store={store}><App state={store.getState()} /></Provider>, root);
}

class Routes extends React.Component{

  render(){
    return(
      <Router>
        <div>
          <NavBar/>

          <Route path="/search" render={()=> <Home/>}/>
        </div>
      </Router>
    );
    }
  }

  let App = connect((state)=> state)(Routes);
