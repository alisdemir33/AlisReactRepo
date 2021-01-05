import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/util'
//import { setRedirectPath } from "../actions/authActionCreator";


const initialState = {
 // token: null,
  user: null,
  error: null,
  loading: false,
  authRedirectPath:'/'
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogOut(state,action);
    case actionTypes.SET_AUTH_REDIRECT_PATH : return setRedirect (state,action);
    default: return state;
  }
};

const setRedirect =(state,action) => {
  return updateObject(state,
    {
      authRedirectPath:action.payload
    });
}

const authStart = (state, action) => {
  return updateObject(state, 
    { 
      error:null,
      loading: true 
    });
}
const authSuccess = (state, action) => {

  return updateObject(state,
    {
      user: action.payload,
      //token: action.payload.token,
      error:null,
      loading: false
    });
}

const authLogOut = (state,action) => {
  return updateObject(state,
    {
      user: null
     // token: null     
    });

}

const authFail = (state, action) => {
  return updateObject(state,
    {
      error: action.payload,
      loading: false
    });
}
export default authReducer;

