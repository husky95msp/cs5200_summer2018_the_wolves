import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import {loadState} from 'containers/localStorage';

const persistedState = loadState();



let empty_search = {
  key: "",
  filter: "song",
};
function token(state = null, action) {

  // console.log(action.data);
  switch(action.type) {
    case 'TOKEN':
    return action.data;
    default:
    return state;
  }
}
function songs(state = null, action) {

  switch(action.type) {
    case 'APPEND_SONGS':
    return Object.assign({},
      state,
      { tracks:
        {
          items: [...state.tracks.items, ...action.data.tracks.items],
          href:action.data.tracks.href,
          limit:action.data.tracks.limit,
          next:action.data.tracks.next,
          previous:action.data.tracks.previous,
          total:action.data.tracks.total,
        }
      }
    );

    case 'GET_SONGS':

    return action.data;
    case 'SEARCH_CLEAR' :
    return null;
    case 'LIKE_SONG':
    let tempState = JSON.parse(JSON.stringify(state));
    let likes = null;
    let key = null;
    if (state != null){
    state.tracks.items.map((song,index)=>{
      if (song.spotify_id === action.data.spotify_id) {
        likes = song.like; key = index;
        tempState.tracks.items[key].like = !likes
      }
      return null;
    });
  }
    return tempState;
    case 'LOGOUT':
      return null;
      case 'LOGIN_SUCCESS':
      return null;
    default:
    return state;
  }
}

function test(state=empty_search, action) {

  switch(action.type) {

    case 'SEARCH_FILTER':
    return Object.assign({}, state, {filter: action.data});
    case 'UPDATE_SEARCH_FORM' :
    return Object.assign({}, state, action.data);
    case 'SEARCH_CLEAR' :
    return empty_search;
    case 'LOGOUT':
      return empty_search;
    default:
    return state;
  }
}

let empty_navbar={
  collapse: false
}
function navBar(state=empty_navbar, action) {

  switch(action.type) {

    case 'TOGGLE_NAV' :
    return Object.assign({}, state, {collapse: !state.collapse});

    default:
    return state;
  }

}

let empty_login={
  username: "",
  password: "",
  label: 200,
}
function loginForm(state=empty_login, action){
  switch(action.type) {

    case 'UPDATE_LOGIN_FORM' :
    return Object.assign({}, state, action.data);
    case 'UPDATE_LOGIN_FORM_LABEL' :
    return Object.assign({}, state, action.data);
    case 'LOGOUT':
      return empty_login;
    default:
    return state;
  }
}
function tog(state=false, action) {

  switch(action.type) {

    case 'TOGGLE_LOGIN_POPPER' :
    return !state;
    case 'LOGIN_SUCCESS':
    return false;
    case 'LOGOUT':
      return false;
    default:
    return state;
  }
}
function session(state=null, action){

  switch (action.type) {

    case 'GET_FOLLOWERS':
    return Object.assign({}, state, {followers: [...action.data]});
    case 'LIKE_SONG':

    return Object.assign({}, state, {likedTracks: state.likedTracks.filter((value)=> !(value.spotify_id === action.data.spotify_id))});

    case 'GET_LIKED_SONGS':
      return Object.assign({}, state, {likedTracks: action.data});
      case 'UPDATE_LIKED_SONGS':
      let song = JSON.parse(JSON.stringify(action.data));
      song.like=true;
        return Object.assign({}, state, {likedTracks: [...state.likedTracks,song]});
    case 'LOGIN_SUCCESS':
      return action.data;
      break;
      case 'LOGOUT':
        return null;
        break;
    default:
      return state;
  }
}
function profileDropper(state=false, action){
  switch (action.type) {
    case 'toggle_profile_dropper':
      return !state;
    default:
      return state;
  }
}
function userSearch(state=[], action){
  switch (action.type) {
    case 'USER_SEARCH_RESULTS':
      return [...action.data];
    case 'SEARCH_CLEAR' :
      return [];
    default:
      return state;
  }
}
  function root_reducer(state0 = persistedState, action) {
    let reducer = combineReducers({test, songs, token, navBar, tog, loginForm, session, profileDropper, userSearch});
    let state1 = reducer(state0, action);
    console.log("ReduxState", state1);
    return deepFreeze(state1);
  };

  let store = createStore(root_reducer);
  export default store;
