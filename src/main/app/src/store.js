import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';



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

  console.log(action.data);
  switch(action.type) {
    case 'GET_SONGS':
    // console.log([...action.data]);
    return action.data;
    default:
    return state;
  }
}

function test(state=empty_search, action) {

  switch(action.type) {

    case 'UPDATE_SEARCH_FORM' :
    return Object.assign({}, state, action.data);
    default:
    return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({test, songs, token});
  let state1 = reducer(state0, action);
  console.log("ReduxState", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
