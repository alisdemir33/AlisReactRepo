import * as actionTypes from "../actions/actionTypes";
import {updateObject } from '../util'

const initialState = {
  isUserAuthenticed:false,
  loading:false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStarted(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFailed(state, action);    
    default: return state;
  }
};

const authStarted = (state,action) => {
    return {...state, loading:true};
}
const authSuccess = (state,action) => {
    return {...state, isUserAuthenticed:true, loading:false};
}
const authFailed = (state,action) => {
    return {...state, loading:false};
}