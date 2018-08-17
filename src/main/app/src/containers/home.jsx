import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import 'scss/App.css';


import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from 'components/search';
import NavBar from 'components/nav';
import TrackView from 'components/trackview';
import UserView from 'components/user_view';
import Favorites from 'components/favorites';
import Profile from 'components/profile';
import UserList from 'user_list';
import PlayLists from 'components/playlists';
import Albums from 'components/albums';
import Register from 'components/register';
import Panel from 'components/panel';
import Editor from 'components/edit_user';


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
            <Route exact path="/register" render={()=> <Register/>}/>
            <Route exact path="/panel" render={()=> <Panel allusers = {[]}/>}/>
            <Route exact path="/" render={()=> <Home/>}/>
            <Route path="/tracks/:id" render={(match)=> <TrackView songId={match.match.params.id}/>}/>
            <Route path="/user/:id" render={(match)=> <UserView id={match.match.params.id}/>}/>
            <Route path="/panel/user/:id" render={(match)=> <Editor uid={match.match.params.id} type='PANEL'/>}/>
            <Route path="/edit/:id" render={(match)=> <Editor uid={match.match.params.id} type='PROFILE'/>}/>

          <Route exact path="/favorites" render={()=> <Favorites/>}/>
            <Route  path={`/profile`} render={()=> <Profile/>}/>
            <Route  path={`/playlist`} render={()=> <PlayLists/>}/>
            <Route  path={`/album`} render={()=> <Albums/>}/>
            <Route exact path='/profile/followers' component={()=> <div>
                {this.props.session?<UserList userList = {this.props.session.followers} />:<div></div>}
              </div>}/>
              <Route exact path='/profile/followees' component={()=> <div>
                  {this.props.session?<UserList userList = {this.props.session.followees} />:<div></div>}
                </div>}/>


              </div>
            </div>
          </Router>
        );
      }
    }

    let App = connect((state)=> state)(Routes);
