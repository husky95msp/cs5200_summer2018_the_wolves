import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import {loadState} from 'containers/localStorage';

 const persistedState = loadState();



let empty_search = {
  key: ""
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
    case 'GET_SONGS':
    // console.log([...action.data]);
    return action.data;
    case 'SEARCH_CLEAR' :
    return null;
    default:
    return state;
  }
}

function test(state=empty_search, action) {

  switch(action.type) {

    case 'UPDATE_SEARCH_FORM' :
    return Object.assign({}, state, action.data);
    case 'SEARCH_CLEAR' :
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

function root_reducer(state0 = persistedState, action) {
  let reducer = combineReducers({test, songs, token, navBar});
  let state1 = reducer(state0, action);
  console.log("ReduxState", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
