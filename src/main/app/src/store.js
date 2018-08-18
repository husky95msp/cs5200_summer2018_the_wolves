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

    case 'FOLLOW_USER':
    let tempState = JSON.parse(JSON.stringify(state));
    let followee = null;
    let key = null;
    tempState = Object.assign({}, tempState, {followees: [...state.followees, action.data]});
    if (state != null){
      state.followees.map((user,index)=>{
        if (user.id === action.data.id) {
            tempState = Object.assign({}, state, {followees: state.followees.filter((value)=> !(value.id == action.data.id))});
        }
      });
    }
      return tempState;
    // if(action.data.followee){
    //   return Object.assign({}, state, {followees: state.followees.filter((value)=> !(value.id == action.data.id))});
    // }else{
    //   let tempState = JSON.parse(JSON.stringify(action.data));
    //   tempState.followee = true;
    //   return Object.assign({}, state, {followees: [...state.followees, tempState]});
    //
    // }
    case 'UPDATE_SESSION_USER':

    return Object.assign({}, state, action.data);
    case 'GET_FOLLOWERS':
    return Object.assign({}, state, {followers: [...action.data]});
    case 'GET_FOLLOWEES':
    return Object.assign({}, state, {followees: [...action.data]});
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
function user_type(state=null, action){
  switch (action.type) {
    case 'USER_TYPE':
    return action.data;
    case 'LOGOUT':
    return null;
    default:
    return state;
  }
}
function trackView(state=null, action){
  switch (action.type) {
    case 'LIKE_SONG':
    if ( state != null){
      return Object.assign({}, state, {like : !action.data.like});
    }else{
      return state;
    }
    case 'GET_A_SONG':
    return action.data;
    case 'REMOVE_FROM_REVIEW_LIST':
    return Object.assign({}, state, {reviews: state.reviews.filter((value)=> !(value.id === action.data))});
    case 'UPDATE_REVIEW_LIST':
    return Object.assign({}, state, {reviews: [action.data, ...state.reviews]});
    case 'LOGOUT':
    return null;
    default:
    return state;
  }
}
let empty_reviewForm={
  review: "",
  error: "",
  toggle: false,
}
function reviewForm(state=empty_reviewForm, action){
  switch (action.type) {
    case 'TOGGLE_REVIEW_COLLAPSE':
    return Object.assign({}, state,{toggle: !state.toggle});
    case 'UPDATE_REVIEW':
    return Object.assign({}, state,action.data);
    case 'REVIEW_FORM_ERROR':
    return Object.assign({}, state,action.data);
    case 'SUBMIT_REVIEW':
    return empty_reviewForm;
    case 'LOGOUT':
    return empty_reviewForm;
    default:
    return state;
  }
}
function userSearch(state=[], action){
  switch (action.type) {
    case 'FOLLOW_USER':
    let tempState = JSON.parse(JSON.stringify(state));
    let followee = null;
    let key = null;
    if (state != null){
      state.map((user,index)=>{
        if (user.id === action.data.id) {
          followee = user.followee ;
          key = index;
          tempState[key].followee = !followee
        }
        return null;
      });
    }
    return tempState;
    return
    case 'USER_SEARCH_RESULTS':
    return [...action.data];
    case 'SEARCH_CLEAR' :
    return [];
    default:
    return state;
  }
}
function create_account(state=false, action){
  switch (action.type) {
    case 'ACCOUNT_CREATED':
    return true;
    default:
    return false;
  }
}
let empty_playlistForm = {
toggle: false,
playlist:{
  name:"",
  id:0,
},
}

function playlistForm(state=empty_playlistForm, action){
  switch (action.type) {
    case 'TOGGLE_CREATE_PLAYLIST':
    return Object.assign({}, state, {toggle: !state.toggle});
    case 'ADD_NEW_PLAYLIST':
    return Object.assign({}, state, {toggle: !state.toggle});
    case 'CURRENT_PLAYLIST_TITLE':
    return Object.assign({}, state, {playlist: action.data});
    default:
    return state;
  }
}

let empty_albumForm = {
newTrackToggle: false,
toggle: false,
album:{
  name:"",
  id:0,
},
}
function albumForm(state=empty_albumForm, action){
  switch (action.type) {
    case 'TOGGLE_CREATE_TRACK_FOR_ALBUM':
    return Object.assign({}, state, {newTrackToggle: !state.newTrackToggle});
    case 'TOGGLE_CREATE_ALBUM':
    return Object.assign({}, state, {toggle: !state.toggle});
    case 'ADD_NEW_ALBUM':
    return Object.assign({}, state, {toggle: !state.toggle});
    case 'CURRENT_ALBUM_TITLE':
    return Object.assign({}, state, {album: action.data});
    default:
    return state;
  }
}

function albums(state=[], action){
  switch (action.type) {
    case 'GET_ALL_ALBUMS':
    return action.data;
    case 'ADD_NEW_ALBUM':
    return [...state, action.data];
    default:
    return state;
  }
}

function playlists(state=[], action){
  switch (action.type) {
    case 'GET_ALL_PLAYLISTS':
    return action.data;
    case 'ADD_NEW_PLAYLIST':
    return [...state, action.data];
    default:
    return state;
  }
}
function albumView(state=[], action){
  switch (action.type) {
    case 'UPDATE_ALBUM_TRACK':
    return [...state, action.data];
    case 'LIKE_SONG':
    let tempState = JSON.parse(JSON.stringify(state));
    let likes = null;
    let key = null;
    if (state != null){
      state.map((song,index)=>{
        if (song.spotify_id === action.data.spotify_id) {
          likes = song.like; key = index;
          tempState[key].like = !likes
        }
        return null;
      });
    }
    return tempState;
    case 'CURRENT_ALBUM_VIEW':
    return action.data;
    case 'DELETE_SONG_FROM_ALBUM':
    return state.filter((song)=> song.spotify_id !== action.data.spotify_id);
    default:
    return state;
  }
}
function playlistView(state=[], action){
  switch (action.type) {
    case 'LIKE_SONG':
    let tempState = JSON.parse(JSON.stringify(state));
    let likes = null;
    let key = null;
    if (state != null){
      state.map((song,index)=>{
        if (song.spotify_id === action.data.spotify_id) {
          likes = song.like; key = index;
          tempState[key].like = !likes
        }
        return null;
      });
    }
    return tempState;
    case 'CURRENT_PLAYLIST_VIEW':
    return action.data;
    case 'DELETE_SONG_FROM_PLAYLIST':
    return state.filter((song)=> song.spotify_id !== action.data.spotify_id);
    default:
    return state;
  }
}
function allUsers(state=[], action){
  switch (action.type) {
    case 'GET_ALL_USERS':
    return action.data;
    case 'UPDATE_ALL_USERS':
    return action.data;
    case 'DELETE_USER':
    return state.filter((user)=> user.id !== action.data.id);
    case 'LOGOUT':
    return null;
    default:
    return state;
  }
}
function userView(state=null, action){
  switch (action.type) {
    case 'POPULATE_USER_VIEW':
    return action.data;
    case 'LOGOUT':
    return null;
    default:
    return state;
  }
}
let empty_user={
  username: "",
  password: "",
  firstName: "",
  lastName:"",
  email:"",
}
function editUserForm(state=empty_user, action){
  switch (action.type) {
    case 'EDIT_USER':
    return Object.assign({}, state, action.data);
    case 'LOGOUT':
    return empty_user;
    default:
    return state;
  }
}


function root_reducer(state0 = persistedState, action) {
  let reducer = combineReducers({test, songs, token, navBar, tog, loginForm, session, profileDropper, userSearch, user_type, trackView, reviewForm, create_account, playlistForm, playlists, playlistView, albumForm, albums, albumView,allUsers, userView, editUserForm});
  let state1 = reducer(state0, action);
  console.log("ReduxState", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
