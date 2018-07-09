import home_init from 'containers/home';
import $ from 'jquery';
import store from 'store';
import api from 'api.js';
// import authenticate from 'SpotifyAuth'
function init(){
  let root = document.getElementById("root");
  api.authenticate();
  // console.log(token);
  home_init(root, store);
}

$(init);
