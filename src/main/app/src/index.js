import home_init from 'containers/home';
import $ from 'jquery';
import store from 'store';
import api from 'api.js';
import {saveState} from 'containers/localStorage';
// import authenticate from 'SpotifyAuth'
function init(){
  let root = document.getElementById("root");
  console.log();
  if (store.getState().token == null){
    api.authenticate();
  }
  // console.log(token);
  store.subscribe(() =>{
    saveState(store.getState());
  });
  home_init(root, store);
}

$(init);
