import * as types from './constants';

const initialState = {};

export default function wallmartReducer(state = initialState, action){
  switch (action.type) {
    case types.REQUEST_WALLMART_DATA:
        console.log("request");
        return Object.assign({}, state, {"loading": true});
    case types.REQUEST_WALLMART_DATA_SUCCESS:
        console.log("success:",action);
        return Object.assign({}, state, {"loading": false, response: action.response});
    case types.REQUEST_WALLMART_DATA_ERROR:
        console.log("error:",action);
        return Object.assign({}, state, {"loading": false});
    default:
        return state;
  }
}
