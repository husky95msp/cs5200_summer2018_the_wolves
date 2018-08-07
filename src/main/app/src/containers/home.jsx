import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import 'scss/App.css';


import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from 'components/search';
import NavBar from 'components/nav';
import TrackView from 'components/trackview';
import Favorites from 'components/favorites';



export default function home_init(root, store){
  ReactDOM.render(<Provider store={store}><App state={store.getState()} /></Provider>, root);
}

class Routes extends React.Component{

  render(){
    // const TrackView = ({match}) => {
    //   return (<h1>{match.params.id}</h1>)
    // }
    return(
      <Router>
        <div>
          <NavBar/>
          <div className="content-wrapper">
          <Route exact path="/" render={()=> <Home/>}/>
          <Route path="/tracks/:id" render={(match)=> <TrackView songId={match.match.params.id}/>}/>
          <Route exact path="/favorites" render={()=> <Favorites/>}/>
          </div>
        </div>
      </Router>
    );
    }
  }

  let App = connect((state)=> state)(Routes);
